const { createClient } = require('@supabase/supabase-js');

class PaymentAnalyzer {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async analyze(restaurantId, days = 30) {
    console.log('💳 Iniciando análisis de métodos de pago...');
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    try {
      // Obtener resúmenes diarios con métodos de pago
      const { data: summaries, error } = await this.supabase
        .from('daily_summaries')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .gte('summary_date', startDate.toISOString().split('T')[0])
        .lte('summary_date', endDate.toISOString().split('T')[0])
        .order('summary_date', { ascending: false });

      if (error) throw error;

      if (!summaries || summaries.length === 0) {
        return {
          success: false,
          message: "😕 No encontré datos de pagos en este período",
          insights: ["No hay suficientes datos para analizar"],
          data: {}
        };
      }

      console.log(`📊 Analizando ${summaries.length} días de datos...`);

      // Analizar distribución de métodos
      const paymentDistribution = this.analyzeDistribution(summaries);
      
      // Análisis por hora del día
      const hourlyAnalysis = this.analyzeByHour(summaries);
      
      // Análisis por día de la semana
      const weekdayAnalysis = this.analyzeByWeekday(summaries);
      
      // Tickets promedio por método
      const averageTickets = this.calculateAverageTickets(summaries);
      
      // Tendencias temporales
      const trends = this.analyzeTrends(summaries);
      
      // Generar insights con FudiFlow
      const insights = this.generateInsights({
        distribution: paymentDistribution,
        hourly: hourlyAnalysis,
        weekday: weekdayAnalysis,
        averages: averageTickets,
        trends: trends,
        totalDays: summaries.length
      });

      return {
        success: true,
        insights: insights,
        data: {
          distribution: paymentDistribution,
          hourlyPatterns: hourlyAnalysis,
          weekdayPatterns: weekdayAnalysis,
          averageTickets: averageTickets,
          trends: trends,
          summary: {
            totalDays: summaries.length,
            totalRevenue: summaries.reduce((sum, s) => sum + (s.total_sales || 0), 0),
            totalTransactions: summaries.reduce((sum, s) => sum + (s.transaction_count || 0), 0),
            dateRange: { from: startDate, to: endDate }
          }
        }
      };

    } catch (error) {
      console.error('❌ Error en PaymentAnalyzer:', error);
      return {
        success: false,
        message: "Ups, tuve problemas analizando los pagos",
        error: error.message,
        insights: [`Error: ${error.message}`]
      };
    }
  }

  analyzeDistribution(summaries) {
    const distribution = {};
    let totalTransactions = 0;
    
    summaries.forEach(summary => {
      const methods = summary.payment_methods || {};
      
      Object.entries(methods).forEach(([method, data]) => {
        if (!distribution[method]) {
          distribution[method] = {
            count: 0,
            total: 0,
            percentage: 0,
            days: 0
          };
        }
        
        distribution[method].count += data.count || 0;
        distribution[method].total += data.total || 0;
        distribution[method].days++;
        totalTransactions += data.count || 0;
      });
    });

    // Calcular porcentajes y promedios
    Object.keys(distribution).forEach(method => {
      distribution[method].percentage = totalTransactions > 0 
        ? (distribution[method].count / totalTransactions * 100).toFixed(1) 
        : '0';
      distribution[method].averageTicket = distribution[method].count > 0
        ? distribution[method].total / distribution[method].count
        : 0;
      distribution[method].dailyAverage = distribution[method].days > 0
        ? distribution[method].count / distribution[method].days
        : 0;
    });

    return distribution;
  }

  analyzeByHour(summaries) {
    // Agregamos datos por hora de todos los días
    const hourlyData = Array(24).fill(null).map(() => ({
      cash: { count: 0, total: 0 },
      card: { count: 0, total: 0 },
      transfer: { count: 0, total: 0 },
      other: { count: 0, total: 0 },
      totalCount: 0,
      totalRevenue: 0
    }));

    summaries.forEach(summary => {
      const hourlySales = summary.hourly_sales || {};
      
      Object.entries(hourlySales).forEach(([hour, data]) => {
        const hourInt = parseInt(hour);
        if (hourInt >= 0 && hourInt < 24) {
          // Distribuir proporcionalmente basado en métodos de pago del día
          const dayMethods = summary.payment_methods || {};
          const dayTotal = Object.values(dayMethods).reduce((sum, m) => sum + (m.count || 0), 0);
          
          if (dayTotal > 0) {
            Object.entries(dayMethods).forEach(([method, methodData]) => {
              const normalized = this.normalizePaymentMethod(method);
              const proportion = methodData.count / dayTotal;
              
              if (hourlyData[hourInt][normalized]) {
                hourlyData[hourInt][normalized].count += Math.round(data.count * proportion);
                hourlyData[hourInt][normalized].total += data.total * proportion;
              }
            });
          }
          
          hourlyData[hourInt].totalCount += data.count || 0;
          hourlyData[hourInt].totalRevenue += data.total || 0;
        }
      });
    });

    // Encontrar horas pico por método
    const peakHours = {
      cash: { hour: 0, count: 0 },
      card: { hour: 0, count: 0 },
      transfer: { hour: 0, count: 0 },
      overall: { hour: 0, count: 0 }
    };

    hourlyData.forEach((data, hour) => {
      ['cash', 'card', 'transfer'].forEach(method => {
        if (data[method].count > peakHours[method].count) {
          peakHours[method] = { hour, count: data[method].count };
        }
      });
      
      if (data.totalCount > peakHours.overall.count) {
        peakHours.overall = { hour, count: data.totalCount };
      }
    });

    return { hourlyData, peakHours };
  }

  analyzeByWeekday(summaries) {
    const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const weekdayData = weekdays.map(() => ({
      cash: { count: 0, total: 0 },
      card: { count: 0, total: 0 },
      transfer: { count: 0, total: 0 },
      other: { count: 0, total: 0 },
      totalCount: 0,
      totalRevenue: 0,
      days: 0
    }));

    summaries.forEach(summary => {
      const date = new Date(summary.summary_date + 'T12:00:00');
      const dayOfWeek = date.getDay();
      
      const methods = summary.payment_methods || {};
      
      weekdayData[dayOfWeek].days++;
      weekdayData[dayOfWeek].totalCount += summary.transaction_count || 0;
      weekdayData[dayOfWeek].totalRevenue += summary.total_sales || 0;
      
      Object.entries(methods).forEach(([method, data]) => {
        const normalized = this.normalizePaymentMethod(method);
        if (weekdayData[dayOfWeek][normalized]) {
          weekdayData[dayOfWeek][normalized].count += data.count || 0;
          weekdayData[dayOfWeek][normalized].total += data.total || 0;
        }
      });
    });

    // Calcular promedios por día
    const processedWeekdays = weekdayData.map((data, index) => ({
      day: weekdays[index],
      ...data,
      avgTransactions: data.days > 0 ? Math.round(data.totalCount / data.days) : 0,
      avgRevenue: data.days > 0 ? data.totalRevenue / data.days : 0
    }));

    return processedWeekdays;
  }

  calculateAverageTickets(summaries) {
    const methods = {};
    
    summaries.forEach(summary => {
      const paymentMethods = summary.payment_methods || {};
      
      Object.entries(paymentMethods).forEach(([method, data]) => {
        if (!methods[method]) {
          methods[method] = { total: 0, count: 0 };
        }
        methods[method].total += data.total || 0;
        methods[method].count += data.count || 0;
      });
    });

    const averages = {};
    Object.keys(methods).forEach(method => {
      averages[method] = methods[method].count > 0
        ? methods[method].total / methods[method].count
        : 0;
    });

    return averages;
  }

  analyzeTrends(summaries) {
    // Ordenar por fecha
    const sortedSummaries = [...summaries].sort((a, b) => 
      new Date(a.summary_date) - new Date(b.summary_date)
    );

    const dailyTrends = {};
    const shifts = [];
    
    sortedSummaries.forEach((summary, index) => {
      const date = summary.summary_date;
      const methods = summary.payment_methods || {};
      
      dailyTrends[date] = {
        methods: {},
        total: summary.transaction_count || 0,
        revenue: summary.total_sales || 0
      };
      
      Object.entries(methods).forEach(([method, data]) => {
        dailyTrends[date].methods[method] = {
          count: data.count || 0,
          total: data.total || 0,
          percentage: ((data.count / summary.transaction_count) * 100).toFixed(1)
        };
      });
      
      // Detectar cambios significativos
      if (index > 0) {
        const prevSummary = sortedSummaries[index - 1];
        const prevMethods = prevSummary.payment_methods || {};
        
        Object.keys(methods).forEach(method => {
          if (prevMethods[method]) {
            const prevCount = prevMethods[method].count || 0;
            const currCount = methods[method].count || 0;
            
            if (prevCount > 0) {
              const change = ((currCount - prevCount) / prevCount * 100);
              if (Math.abs(change) > 30) {
                shifts.push({
                  date: date,
                  method,
                  previousCount: prevCount,
                  currentCount: currCount,
                  change: change.toFixed(1),
                  direction: change > 0 ? 'increase' : 'decrease'
                });
              }
            }
          }
        });
      }
    });

    // Análisis de tendencia general (últimos 7 días vs anteriores)
    const recentDays = sortedSummaries.slice(-7);
    const olderDays = sortedSummaries.slice(-14, -7);
    
    const weeklyComparison = this.compareWeeks(recentDays, olderDays);

    return { 
      dailyTrends, 
      significantShifts: shifts,
      weeklyComparison 
    };
  }

  compareWeeks(recentWeek, previousWeek) {
    const comparison = {};
    
    const aggregateWeek = (week) => {
      const result = {};
      week.forEach(day => {
        const methods = day.payment_methods || {};
        Object.entries(methods).forEach(([method, data]) => {
          if (!result[method]) {
            result[method] = { count: 0, total: 0 };
          }
          result[method].count += data.count || 0;
          result[method].total += data.total || 0;
        });
      });
      return result;
    };
    
    const recent = aggregateWeek(recentWeek);
    const previous = aggregateWeek(previousWeek);
    
    Object.keys(recent).forEach(method => {
      if (previous[method]) {
        const change = ((recent[method].count - previous[method].count) / previous[method].count * 100);
        comparison[method] = {
          trend: change > 0 ? 'up' : 'down',
          percentage: Math.abs(change).toFixed(1)
        };
      }
    });
    
    return comparison;
  }

  normalizePaymentMethod(method) {
    const normalized = (method || '').toLowerCase().trim();
    if (normalized.includes('efectivo') || normalized.includes('cash')) return 'cash';
    if (normalized.includes('tarjeta') || normalized.includes('card')) return 'card';
    if (normalized.includes('transfer')) return 'transfer';
    return 'other';
  }

  generateInsights(analysis) {
    const insights = [];
    const { distribution, hourly, weekday, averages, trends, totalDays } = analysis;
    
    // Método dominante con FudiFlow
    const methods = Object.entries(distribution)
      .filter(([_, data]) => data.count > 0)
      .sort((a, b) => b[1].count - a[1].count);
    
    if (methods.length > 0) {
      const topMethod = methods[0];
      insights.push(`💳 **${topMethod[0]}** sigue siendo el mero mero con el **${topMethod[1].percentage}%** del billete (${topMethod[1].count.toLocaleString()} transacciones en ${totalDays} días)`);
      
      // Ticket promedio con más flow
      insights.push(`💰 Los que pagan con ${topMethod[0]} dejan **${topMethod[1].averageTicket.toFixed(2)}** en promedio por cuenta`);
    }

    // Rush de pagos con vocabulario FudiFlow
    if (hourly.peakHours.overall.count > 0) {
      const avgPerDay = Math.round(hourly.peakHours.overall.count / totalDays);
      insights.push(`🔥 El trancazo de pagos se viene a las **${hourly.peakHours.overall.hour}:00** con ~${avgPerDay} transacciones (¡se prende!)`);
    }
    
    const cashPeak = hourly.peakHours.cash;
    const cardPeak = hourly.peakHours.card;
    
    if (cashPeak.count > 0 && cardPeak.count > 0 && cashPeak.hour !== cardPeak.hour) {
      insights.push(`💵 El cashito domina a las **${cashPeak.hour}:00**, pero las tarjetas jalan más a las **${cardPeak.hour}:00**`);
    }

    // Comparación de tickets con estilo
    const methodsArray = Object.entries(averages).filter(([_, avg]) => avg > 0);
    if (methodsArray.length > 1) {
      const sorted = methodsArray.sort((a, b) => b[1] - a[1]);
      if (sorted[0][1] / sorted[sorted.length - 1][1] > 1.3) {
        insights.push(`🎯 Plot twist: Los que pagan con **${sorted[0][0]}** gastan **${(sorted[0][1] / sorted[sorted.length - 1][1]).toFixed(1)}x más** que los de ${sorted[sorted.length - 1][0]} (¡ahí está el billete!)`);
      }
    }

    // Tendencias con vocabulario restaurantero
    if (trends.weeklyComparison) {
      const trending = Object.entries(trends.weeklyComparison)
        .filter(([_, data]) => parseFloat(data.percentage) > 10);
      
      if (trending.length > 0) {
        const topTrend = trending[0];
        if (topTrend[1].trend === 'up') {
          insights.push(`📈 ${topTrend[0]} tuvo un subidón del **${topTrend[1].percentage}%** esta semana (¡está jalando sabroso!)`);
        } else {
          insights.push(`📉 ${topTrend[0]} anda medio tirado con un bajón del **${topTrend[1].percentage}%** vs la semana pasada`);
        }
      }
    }

    // Días más movidos con flow
    const weekdayMax = weekday.reduce((max, day) => 
      day.totalCount > max.totalCount ? day : max, { totalCount: 0 });
    
    if (weekdayMax.totalCount > 0) {
      insights.push(`📅 Los **${weekdayMax.day}** se pone más sabroso el changarro: ${weekdayMax.avgTransactions} transacciones promedio`);
    }

    // Recomendaciones con estilo FudiFlow
    if (distribution.cash && parseFloat(distribution.cash.percentage) > 70) {
      insights.push(`💡 Con ${distribution.cash.percentage}% en cashito, podría estar jalando más con promos para tarjeta (¿le metemos?)`);
    }

    if (distribution.card && parseFloat(distribution.card.percentage) < 20) {
      insights.push(`🤔 Las tarjetas andan medio tiradas (solo ${distribution.card.percentage}%). ¿La terminal anda armada o hay que checarla?`);
    }

    // Insights adicionales con más flow
    if (methods.length > 2) {
      const leastUsed = methods[methods.length - 1];
      if (parseFloat(leastUsed[1].percentage) < 5) {
        insights.push(`⚠️ ${leastUsed[0]} lo están dejando morir (${leastUsed[1].percentage}%). ¿Lo destapamos o lo sacamos del menú de pagos?`);
      }
    }

    // Si hay cambios dramáticos
    if (trends.significantShifts && trends.significantShifts.length > 0) {
      const biggestShift = trends.significantShifts.reduce((max, shift) => 
        Math.abs(parseFloat(shift.change)) > Math.abs(parseFloat(max.change)) ? shift : max
      );
      
      if (Math.abs(parseFloat(biggestShift.change)) > 50) {
        if (biggestShift.direction === 'increase') {
          insights.push(`🚀 ¡Se prendió esta madre! ${biggestShift.method} explotó con +${biggestShift.change}% el ${biggestShift.date}`);
        } else {
          insights.push(`😬 ${biggestShift.method} se desplomó ${biggestShift.change}% el ${biggestShift.date} (hay que meterle lupa)`);
        }
      }
    }

    return insights;
  }
}

module.exports = PaymentAnalyzer;