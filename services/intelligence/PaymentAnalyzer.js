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
      // ✅ USAR TRANSACTIONS EN VEZ DE DAILY_SUMMARIES
      const { data: transactions, error } = await this.supabase
        .from('transactions')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .gte('transaction_date', startDate.toISOString())
        .lte('transaction_date', endDate.toISOString())
        .order('transaction_date', { ascending: false });

      if (error) throw error;

      if (!transactions || transactions.length === 0) {
        return {
          success: false,
          message: "😕 No encontré transacciones en este período",
          insights: ["No hay suficientes datos para analizar"],
          data: {}
        };
      }

      console.log(`📊 Analizando ${transactions.length} transacciones...`);

      // Analizar distribución de métodos REAL
      const paymentDistribution = this.analyzeDistribution(transactions);
      
      // Análisis por hora del día REAL
      const hourlyAnalysis = this.analyzeByHour(transactions);
      
      // Análisis por día de la semana REAL
      const weekdayAnalysis = this.analyzeByWeekday(transactions);
      
      // Tickets promedio por método REAL
      const averageTickets = this.calculateAverageTickets(transactions);
      
      // Tendencias temporales REAL
      const trends = this.analyzeTrends(transactions);
      
      // Generar insights con FudiFlow
      const insights = this.generateInsights({
        distribution: paymentDistribution,
        hourly: hourlyAnalysis,
        weekday: weekdayAnalysis,
        averages: averageTickets,
        trends: trends,
        totalDays: days,
        totalTransactions: transactions.length
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
            totalDays: days,
            totalTransactions: transactions.length,
            totalRevenue: transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0),
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

  // ✅ ANÁLISIS REAL DE DISTRIBUCIÓN
  analyzeDistribution(transactions) {
    const distribution = {};
    let totalTransactions = transactions.length;
    
    transactions.forEach(transaction => {
      const method = transaction.payment_method || 'cash';
      
      if (!distribution[method]) {
        distribution[method] = {
          count: 0,
          total: 0,
          percentage: 0
        };
      }
      
      distribution[method].count += 1;
      distribution[method].total += parseFloat(transaction.total_amount || 0);
    });

    // Calcular porcentajes
    Object.keys(distribution).forEach(method => {
      distribution[method].percentage = totalTransactions > 0 
        ? (distribution[method].count / totalTransactions * 100).toFixed(1) 
        : '0';
      distribution[method].averageTicket = distribution[method].count > 0
        ? distribution[method].total / distribution[method].count
        : 0;
    });

    return distribution;
  }

  // ✅ ANÁLISIS REAL POR HORA
  analyzeByHour(transactions) {
    const hourlyData = Array(24).fill(null).map(() => ({
      cash: { count: 0, total: 0 },
      card: { count: 0, total: 0 },
      third_party: { count: 0, total: 0 },
      other: { count: 0, total: 0 },
      totalCount: 0,
      totalRevenue: 0
    }));

    transactions.forEach(transaction => {
      const date = new Date(transaction.transaction_date);
      const hour = date.getHours();
      const method = transaction.payment_method || 'cash';
      const amount = parseFloat(transaction.total_amount || 0);
      
      // Normalizar método de pago
      const normalized = this.normalizePaymentMethod(method);
      
      if (hour >= 0 && hour < 24) {
        hourlyData[hour][normalized].count += 1;
        hourlyData[hour][normalized].total += amount;
        hourlyData[hour].totalCount += 1;
        hourlyData[hour].totalRevenue += amount;
      }
    });

    // Encontrar horas pico
    const peakHours = {
      cash: { hour: 0, count: 0 },
      card: { hour: 0, count: 0 },
      third_party: { hour: 0, count: 0 },
      overall: { hour: 0, count: 0 }
    };

    hourlyData.forEach((data, hour) => {
      ['cash', 'card', 'third_party'].forEach(method => {
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

  // ✅ ANÁLISIS REAL POR DÍA DE SEMANA
  analyzeByWeekday(transactions) {
    const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const weekdayData = weekdays.map(() => ({
      cash: { count: 0, total: 0 },
      card: { count: 0, total: 0 },
      third_party: { count: 0, total: 0 },
      other: { count: 0, total: 0 },
      totalCount: 0,
      totalRevenue: 0
    }));

    transactions.forEach(transaction => {
      const date = new Date(transaction.transaction_date);
      const dayOfWeek = date.getDay();
      const method = transaction.payment_method || 'cash';
      const amount = parseFloat(transaction.total_amount || 0);
      
      const normalized = this.normalizePaymentMethod(method);
      
      weekdayData[dayOfWeek][normalized].count += 1;
      weekdayData[dayOfWeek][normalized].total += amount;
      weekdayData[dayOfWeek].totalCount += 1;
      weekdayData[dayOfWeek].totalRevenue += amount;
    });

    return weekdayData.map((data, index) => ({
      day: weekdays[index],
      ...data
    }));
  }

  // ✅ TICKETS PROMEDIO REALES
  calculateAverageTickets(transactions) {
    const methods = {};
    
    transactions.forEach(transaction => {
      const method = transaction.payment_method || 'cash';
      const amount = parseFloat(transaction.total_amount || 0);
      
      if (!methods[method]) {
        methods[method] = { total: 0, count: 0 };
      }
      methods[method].total += amount;
      methods[method].count += 1;
    });

    const averages = {};
    Object.keys(methods).forEach(method => {
      averages[method] = methods[method].count > 0
        ? methods[method].total / methods[method].count
        : 0;
    });

    return averages;
  }

  // ✅ TENDENCIAS REALES
  analyzeTrends(transactions) {
    // Dividir en dos semanas
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.transaction_date) - new Date(b.transaction_date)
    );

    const midPoint = Math.floor(sortedTransactions.length / 2);
    const olderTransactions = sortedTransactions.slice(0, midPoint);
    const recentTransactions = sortedTransactions.slice(midPoint);

    const olderMethods = this.getMethodCounts(olderTransactions);
    const recentMethods = this.getMethodCounts(recentTransactions);

    const comparison = {};
    
    Object.keys(recentMethods).forEach(method => {
      if (olderMethods[method]) {
        const change = ((recentMethods[method] - olderMethods[method]) / olderMethods[method] * 100);
        comparison[method] = {
          trend: change > 0 ? 'up' : 'down',
          percentage: Math.abs(change).toFixed(1),
          recent: recentMethods[method],
          previous: olderMethods[method]
        };
      }
    });
    
    return { weeklyComparison: comparison };
  }

  getMethodCounts(transactions) {
    const counts = {};
    transactions.forEach(t => {
      const method = t.payment_method || 'cash';
      counts[method] = (counts[method] || 0) + 1;
    });
    return counts;
  }

  normalizePaymentMethod(method) {
    const normalized = (method || '').toLowerCase().trim();
    if (normalized.includes('efectivo') || normalized.includes('cash')) return 'cash';
    if (normalized.includes('tarjeta') || normalized.includes('card')) return 'card';
    if (normalized.includes('transfer') || normalized.includes('third')) return 'third_party';
    return 'other';
  }

generateInsights(analysis) {
  const insights = [];
  const { distribution, hourly, weekday, averages, trends, totalDays, totalTransactions } = analysis;
  
  
  // 🔧 FIX: Definir topMethod desde el inicio
    let topMethod = null;
  
  // Método dominante con datos REALES
  const methods = Object.entries(distribution)
    .filter(([_, data]) => data.count > 0)
    .sort((a, b) => b[1].count - a[1].count);
  
  if (methods.length > 0) {
    topMethod = methods[0]; // ✅ Ahora SÍ está definido
    insights.push(`💳 **${topMethod[0]}** domina con el **${topMethod[1].percentage}%** de las transacciones (${topMethod[1].count} de ${totalTransactions} totales)`);

    // Ticket promedio REAL
      insights.push(`💰 Ticket promedio con ${topMethod[0]}: **$${topMethod[1].averageTicket.toFixed(2)}**`);
    }

    // Hora pico REAL
    if (hourly.peakHours.overall.count > 0) {
      insights.push(`🔥 Tu hora pico REAL es a las **${hourly.peakHours.overall.hour}:00** con ${hourly.peakHours.overall.count} transacciones`);
    }
    
    // Comparación de métodos
    if (methods.length > 1) {
      const second = methods[1];
      insights.push(`⚖️ ${topMethod[0]} vs ${second[0]}: **${topMethod[1].percentage}%** vs **${second[1].percentage}%**`);
    }

    // Tendencias REALES
    if (trends.weeklyComparison) {
      const trending = Object.entries(trends.weeklyComparison)
        .filter(([_, data]) => parseFloat(data.percentage) > 10);
      
      if (trending.length > 0) {
        const topTrend = trending[0];
        if (topTrend[1].trend === 'up') {
          insights.push(`📈 ${topTrend[0]} subió **${topTrend[1].percentage}%** (de ${topTrend[1].previous} a ${topTrend[1].recent} transacciones)`);
        } else {
          insights.push(`📉 ${topTrend[0]} bajó **${topTrend[1].percentage}%** (de ${topTrend[1].previous} a ${topTrend[1].recent} transacciones)`);
        }
      }
    }

    return insights;
  }
}

module.exports = PaymentAnalyzer;