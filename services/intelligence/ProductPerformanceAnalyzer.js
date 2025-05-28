const { createClient } = require('@supabase/supabase-js');

class ProductPerformanceAnalyzer {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async analyze(restaurantId, days = 30) {
    console.log('🍽️ Iniciando análisis de productos...');
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    try {
      // Obtener resúmenes con ventas de productos
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
          message: "😕 No encontré datos de productos en este período",
          insights: ["No hay suficientes datos para analizar"],
          data: {}
        };
      }

      console.log(`📊 Analizando productos de ${summaries.length} días...`);

      // Análisis principal
      const productStats = this.aggregateProductData(summaries);
      const topProducts = this.getTopProducts(productStats);
      const categories = this.analyzeByCategory(productStats);
      const trends = this.analyzeTrends(summaries);
      const combos = this.findProductCombos(summaries);
      
      // Generar insights con FudiFlow
      const insights = this.generateInsights({
        productStats,
        topProducts,
        categories,
        trends,
        combos,
        totalDays: summaries.length
      });

      return {
        success: true,
        insights: insights,
        data: {
          topProducts,
          categories,
          trends,
          combos,
          summary: {
            totalProducts: Object.keys(productStats).length,
            totalUnits: Object.values(productStats).reduce((sum, p) => sum + p.quantity, 0),
            totalRevenue: Object.values(productStats).reduce((sum, p) => sum + p.revenue, 0),
            dateRange: { from: startDate, to: endDate }
          }
        }
      };

    } catch (error) {
      console.error('❌ Error en ProductPerformanceAnalyzer:', error);
      return {
        success: false,
        message: "Ups, tuve problemas analizando los productos",
        error: error.message,
        insights: [`Error: ${error.message}`]
      };
    }
  }

  aggregateProductData(summaries) {
    const products = {};
    
    summaries.forEach(summary => {
      const productSales = summary.product_sales || {};
      
      Object.entries(productSales).forEach(([productName, data]) => {
        if (!products[productName]) {
          products[productName] = {
            name: productName,
            quantity: 0,
            revenue: 0,
            days: 0,
            category: data.category || 'Sin categoría',
            price: data.price || 0,
            dailySales: []
          };
        }
        
        products[productName].quantity += data.quantity || 0;
        products[productName].revenue += data.total || 0;
        products[productName].days++;
        products[productName].dailySales.push({
          date: summary.summary_date,
          quantity: data.quantity || 0,
          revenue: data.total || 0
        });
        
        // Actualizar precio promedio
        if (data.quantity > 0) {
          products[productName].avgPrice = products[productName].revenue / products[productName].quantity;
        }
      });
    });

    // Calcular métricas adicionales
    Object.values(products).forEach(product => {
      product.dailyAverage = product.quantity / product.days;
      product.revenuePerDay = product.revenue / product.days;
    });

    return products;
  }

  getTopProducts(productStats, limit = 10) {
    return Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit)
      .map((product, index) => ({
        rank: index + 1,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        revenue: product.revenue,
        avgPrice: product.avgPrice || 0,
        dailyAverage: product.dailyAverage,
        trend: this.calculateProductTrend(product.dailySales)
      }));
  }

  analyzeByCategory(productStats) {
    const categories = {};
    
    Object.values(productStats).forEach(product => {
      const cat = product.category || 'Sin categoría';
      
      if (!categories[cat]) {
        categories[cat] = {
          name: cat,
          products: 0,
          quantity: 0,
          revenue: 0,
          topProduct: null
        };
      }
      
      categories[cat].products++;
      categories[cat].quantity += product.quantity;
      categories[cat].revenue += product.revenue;
      
      if (!categories[cat].topProduct || product.revenue > categories[cat].topProduct.revenue) {
        categories[cat].topProduct = {
          name: product.name,
          revenue: product.revenue
        };
      }
    });

    return Object.values(categories)
      .sort((a, b) => b.revenue - a.revenue);
  }

  analyzeTrends(summaries) {
    const recentWeek = summaries.slice(0, 7);
    const previousWeek = summaries.slice(7, 14);
    
    if (previousWeek.length === 0) {
      return { rising: [], falling: [], newProducts: [] };
    }

    const recentProducts = this.aggregateWeekProducts(recentWeek);
    const previousProducts = this.aggregateWeekProducts(previousWeek);
    
    const trends = {
      rising: [],
      falling: [],
      newProducts: []
    };

    // Productos en alza
    Object.entries(recentProducts).forEach(([name, recentData]) => {
      if (previousProducts[name]) {
        const change = ((recentData.quantity - previousProducts[name].quantity) / previousProducts[name].quantity * 100);
        
        if (change > 20) {
          trends.rising.push({
            name,
            change: change.toFixed(1),
            recentQuantity: recentData.quantity,
            previousQuantity: previousProducts[name].quantity
          });
        } else if (change < -20) {
          trends.falling.push({
            name,
            change: change.toFixed(1),
            recentQuantity: recentData.quantity,
            previousQuantity: previousProducts[name].quantity
          });
        }
      } else {
        trends.newProducts.push({
          name,
          quantity: recentData.quantity,
          revenue: recentData.revenue
        });
      }
    });

    // Ordenar por cambio
    trends.rising.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
    trends.falling.sort((a, b) => parseFloat(a.change) - parseFloat(b.change));

    return trends;
  }

  aggregateWeekProducts(weekSummaries) {
    const products = {};
    
    weekSummaries.forEach(summary => {
      const productSales = summary.product_sales || {};
      
      Object.entries(productSales).forEach(([name, data]) => {
        if (!products[name]) {
          products[name] = { quantity: 0, revenue: 0 };
        }
        products[name].quantity += data.quantity || 0;
        products[name].revenue += data.total || 0;
      });
    });

    return products;
  }

  findProductCombos(summaries) {
    // Por ahora retornamos combos vacíos
    // En el futuro, analizar qué productos se venden juntos
    return {
      popular: [],
      suggested: []
    };
  }

  calculateProductTrend(dailySales) {
    if (dailySales.length < 3) return 'stable';
    
    const recent = dailySales.slice(0, 3).reduce((sum, d) => sum + d.quantity, 0) / 3;
    const older = dailySales.slice(-3).reduce((sum, d) => sum + d.quantity, 0) / 3;
    
    const change = ((recent - older) / older * 100);
    
    if (change > 10) return 'rising';
    if (change < -10) return 'falling';
    return 'stable';
  }

  generateInsights(analysis) {
    const insights = [];
    const { productStats, topProducts, categories, trends, totalDays } = analysis;
    
    // Producto estrella
    if (topProducts.length > 0) {
      const star = topProducts[0];
      insights.push(`⭐ **${star.name}** es tu mero mero platillo estrella con **$${star.revenue.toFixed(2)}** en ${totalDays} días`);
      insights.push(`🔥 Se movieron **${star.quantity}** unidades (~${Math.round(star.dailyAverage)}/día) a **$${star.avgPrice.toFixed(2)}** promedio`);
    }

    // Top 3
    if (topProducts.length >= 3) {
      const top3Names = topProducts.slice(0, 3).map(p => p.name).join(', ');
      insights.push(`🏆 Tu podio ganador: ${top3Names} (¡estos tres están jalando con todo!)`);
    }

    // Categoría dominante
    if (categories.length > 0) {
      const topCat = categories[0];
      insights.push(`📊 La categoría **${topCat.name}** está rompiéndola con **$${topCat.revenue.toFixed(2)}** (${topCat.products} productos)`);
    }

    // Tendencias
    if (trends.rising.length > 0) {
      const bestRiser = trends.rising[0];
      insights.push(`📈 **${bestRiser.name}** tuvo un subidón del **${bestRiser.change}%** esta semana (¡se está prendiendo!)`);
    }

    if (trends.falling.length > 0) {
      const worstFaller = trends.falling[0];
      insights.push(`📉 Ojo: **${worstFaller.name}** anda medio tirado con -${Math.abs(worstFaller.change)}% (¿lo checamos?)`);
    }

    if (trends.newProducts.length > 0) {
      insights.push(`🆕 Lanzaste ${trends.newProducts.length} productos nuevos esta semana. ${trends.newProducts[0].name} ya vendió ${trends.newProducts[0].quantity} unidades`);
    }

    // Productos muertos
    const deadProducts = Object.values(productStats)
      .filter(p => p.dailyAverage < 0.5)
      .sort((a, b) => a.dailyAverage - b.dailyAverage);
    
    if (deadProducts.length > 0) {
      insights.push(`⚠️ **${deadProducts[0].name}** lo están dejando morir (menos de 1 venta al día). ¿Lo sacamos o le metemos promo?`);
    }

    // Oportunidades
    const midPerformers = topProducts.slice(3, 6);
    if (midPerformers.length > 0) {
      const opportunity = midPerformers[0];
      insights.push(`💡 **${opportunity.name}** podría estar jalando más. Está en el lugar #${opportunity.rank} pero tiene potencial`);
    }

    // Recomendación de precio
    const avgPrices = topProducts.map(p => p.avgPrice).filter(p => p > 0);
    if (avgPrices.length > 0) {
      const avgTicket = avgPrices.reduce((a, b) => a + b, 0) / avgPrices.length;
      insights.push(`💰 Tu ticket promedio en top productos es **$${avgTicket.toFixed(2)}**. Los productos arriba de esto dejan más billete`);
    }

    return insights;
  }
}

module.exports = ProductPerformanceAnalyzer;