const { createClient } = require('@supabase/supabase-js');

class ProductPerformanceAnalyzer {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async analyze(restaurantId, days = 30) {
    console.log(`📊 Analizando productos de ${days} días...`);
    
    try {
      // 🔧 FIX 1: FECHA SIN TIMEZONE ISSUES
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      // Format dates properly for Supabase
      const startDateStr = startDate.toISOString().split('T')[0] + 'T00:00:00Z';
      const endDateStr = endDate.toISOString();
      
      console.log(`🗓️ DEBUGGING: Filtro de fecha desde ${startDateStr} hasta ${endDateStr}`);
      
      const { data: transactions, error } = await this.supabase
        .from('transactions')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .gte('transaction_date', startDateStr)
        .lte('transaction_date', endDateStr);

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

      // Extract products from transactions
      const allItems = this.extractProductsFromTransactions(transactions);
      
      if (allItems.length === 0) {
        return {
          success: false,
          message: "😕 No encontré productos en las transacciones",
          insights: ["Las transacciones no contienen items de productos"],
          data: {}
        };
      }

      // 🔍 DEBUGGING: Verificar datos específicos de producto 212
      console.log(`🔍 DEBUGGING PRODUCTO 212 (AFTER DATE FIX):`);
      const product212Items = allItems.filter(item => item.product_id === 212);
      console.log(`   📦 Items encontrados para producto 212: ${product212Items.length}`);
      console.log(`   📊 Cantidad total producto 212: ${product212Items.reduce((sum, item) => sum + item.quantity, 0)}`);
      console.log(`   💰 Revenue total producto 212: $${product212Items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);

      // Get product names
      const productNames = await this.getProductNames(restaurantId);

      // Main analysis
      const productStats = this.aggregateProductDataReal(allItems, productNames);
      const topProducts = this.getTopProducts(productStats);
      const trends = this.analyzeRealTrends(transactions, productNames);
      
      // 🔍 DEBUGGING: Verificar productStats para 212 después del fix
      if (productStats[212]) {
        console.log(`🔍 PRODUCT STATS 212 (AFTER FIX):`, JSON.stringify({
          id: productStats[212].id,
          name: productStats[212].name,
          quantity: productStats[212].quantity,
          revenue: productStats[212].revenue,
          transactions: productStats[212].transactions
        }, null, 2));
      }
      
      // 🎯 FIX 2: CONTEXT-AWARE INSIGHTS GENERATION
      const insights = this.generateContextualInsights({
        productStats,
        topProducts,
        trends,
        totalTransactions: transactions.length,
        totalDays: days,
        totalItems: allItems.length,
        query_context: 'star_product' // Add context for response generation
      });

      return {
        success: true,
        insights: insights,
        data: {
          topProducts,
          trends,
          summary: {
            totalProducts: Object.keys(productStats).length,
            totalUnits: Object.values(productStats).reduce((sum, p) => sum + p.quantity, 0),
            totalRevenue: Object.values(productStats).reduce((sum, p) => sum + p.revenue, 0),
            totalTransactions: transactions.length,
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

  extractProductsFromTransactions(transactions) {
    const allItems = [];
    
    console.log(`🔍 DEBUGGING: Procesando ${transactions.length} transacciones...`);
    
    transactions.forEach((transaction, index) => {
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach(item => {
          // 🔍 DEBUGGING: Log para los primeros items
          if (index < 3 && item.product_id === 212) {
            console.log(`🔍 SAMPLE ITEM 212:`, JSON.stringify(item, null, 2));
          }
          
          allItems.push({
            product_id: item.product_id,
            quantity: item.num || 1,
            price: parseFloat(item.product_sum || 0),
            cost: parseFloat(item.product_cost || 0),
            profit: parseFloat(item.product_profit || 0),
            transaction_date: transaction.transaction_date,
            transaction_id: transaction.pos_transaction_id
          });
        });
      }
    });
    
    console.log(`📦 Extraídos ${allItems.length} items de productos`);
    
    // 🔍 DEBUGGING: Distribución por product_id
    const productDistribution = {};
    allItems.forEach(item => {
      productDistribution[item.product_id] = (productDistribution[item.product_id] || 0) + 1;
    });
    console.log(`🔍 Top 5 productos por frecuencia:`, 
      Object.entries(productDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([id, count]) => `${id}: ${count}`)
        .join(', ')
    );
    
    return allItems;
  }

  async getProductNames(restaurantId) {
    try {
      const { data: products } = await this.supabase
        .from('products')
        .select('id, name, category_id')
        .eq('restaurant_id', restaurantId);
      
      const productMap = {};
      if (products) {
        products.forEach(product => {
          productMap[product.id] = {
            name: product.name || `Producto ${product.id}`,
            category: product.category_id || 'Sin categoría'
          };
        });
      }
      
      console.log(`🏷️ Cargados nombres de ${Object.keys(productMap).length} productos`);
      
      // 🔍 DEBUGGING: Verificar si producto 212 tiene nombre
      if (productMap[212]) {
        console.log(`🔍 Producto 212 nombre: "${productMap[212].name}"`);
      }
      
      return productMap;
    } catch (error) {
      console.log('⚠️ No se pudieron cargar nombres de productos, usando IDs');
      return {};
    }
  }

  aggregateProductDataReal(allItems, productNames) {
    const products = {};
    
    console.log(`🔍 DEBUGGING: Agregando datos de ${allItems.length} items...`);
    
    allItems.forEach(item => {
      const productId = item.product_id;
      const productInfo = productNames[productId] || { name: `Producto ${productId}`, category: 'Sin categoría' };
      
      if (!products[productId]) {
        products[productId] = {
          id: productId,
          name: productInfo.name,
          category: productInfo.category,
          quantity: 0,
          revenue: 0,
          cost: 0,
          profit: 0,
          transactions: 0,
          dailySales: []
        };
      }
      
      products[productId].quantity += item.quantity;
      products[productId].revenue += item.price;
      products[productId].cost += item.cost;
      products[productId].profit += item.profit;
      products[productId].transactions++;
      
      products[productId].dailySales.push({
        date: item.transaction_date,
        quantity: item.quantity,
        revenue: item.price
      });
    });

    // Calculate additional metrics
    Object.values(products).forEach(product => {
      product.avgPrice = product.quantity > 0 ? product.revenue / product.quantity : 0;
      product.profitMargin = product.revenue > 0 ? (product.profit / product.revenue) * 100 : 0;
    });

    // 🔍 DEBUGGING: Top 3 productos por quantity
    const top3ByQuantity = Object.values(products)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);
    console.log(`🔍 TOP 3 por cantidad agregada (AFTER FIX):`, 
      top3ByQuantity.map(p => `${p.name}: ${p.quantity} uds, $${p.revenue.toFixed(2)}`).join(' | ')
    );

    return products;
  }

  getTopProducts(productStats, limit = 10) {
    return Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit)
      .map((product, index) => ({
        rank: index + 1,
        id: product.id,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        revenue: product.revenue,
        profit: product.profit,
        profitMargin: product.profitMargin,
        avgPrice: product.avgPrice,
        transactions: product.transactions
      }));
  }

  analyzeRealTrends(transactions, productNames) {
    // Dividir en semanas
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    const recentWeek = transactions.filter(t => new Date(t.transaction_date) >= oneWeekAgo);
    const previousWeek = transactions.filter(t => 
      new Date(t.transaction_date) >= twoWeeksAgo && new Date(t.transaction_date) < oneWeekAgo
    );
    
    console.log(`📈 DEBUGGING TRENDS: Semana reciente: ${recentWeek.length} transacciones, Semana anterior: ${previousWeek.length} transacciones`);
    
    const recentItems = this.extractProductsFromTransactions(recentWeek);
    const previousItems = this.extractProductsFromTransactions(previousWeek);
    
    const recentProducts = this.aggregateProductDataReal(recentItems, productNames);
    const previousProducts = this.aggregateProductDataReal(previousItems, productNames);
    
    const trends = {
      rising: [],
      falling: [],
      stable: []
    };

    // Compare products
    Object.keys(recentProducts).forEach(productId => {
      const recent = recentProducts[productId];
      const previous = previousProducts[productId];
      
      if (previous) {
        const change = ((recent.quantity - previous.quantity) / previous.quantity) * 100;
        
        if (change > 20) {
          trends.rising.push({
            ...recent,
            change: change.toFixed(1),
            previousQuantity: previous.quantity
          });
        } else if (change < -20) {
          trends.falling.push({
            ...recent,
            change: change.toFixed(1),
            previousQuantity: previous.quantity
          });
        } else {
          trends.stable.push(recent);
        }
      }
    });

    // Sort by magnitude of change
    trends.rising.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
    trends.falling.sort((a, b) => parseFloat(a.change) - parseFloat(b.change));

    return trends;
  }

  // 🎯 FIX 2: CONTEXT-AWARE INSIGHTS WITH SPECIFIC STAR PRODUCT IDENTIFICATION
  generateContextualInsights(analysis) {
    const insights = [];
    const { productStats, topProducts, trends, totalTransactions, totalDays, totalItems } = analysis;
    
    // 🌟 STAR PRODUCT - SPECIFIC IDENTIFICATION (Fix for context)
    if (topProducts.length > 0) {
      const star = topProducts[0];
      
      // 🎯 CONTEXT-SPECIFIC: "¿Cuál es mi platillo estrella?" response
      insights.push(`🌟 **${star.name}** ES tu platillo estrella absoluto con **${star.quantity} unidades** vendidas en ${totalDays} días`);
      insights.push(`🔥 Lidera tu operación generando **$${star.revenue.toFixed(2)}** en revenue (precio promedio: $${star.avgPrice.toFixed(2)})`);
      
      // Add daily rate for context
      const dailyRate = (star.quantity / totalDays).toFixed(1);
      insights.push(`📊 Ritmo de venta: **${dailyRate} unidades diarias** - este producto está on fire, cabrón`);
      
      if (star.profitMargin > 0) {
        insights.push(`💰 Margen de utilidad del **${star.profitMargin.toFixed(1)}%** - tu goldmine personal`);
      }
    }

    // Top 3 comparison for context
    if (topProducts.length >= 3) {
      const top3 = topProducts.slice(0, 3);
      const runner_up = topProducts[1];
      const third = topProducts[2];
      
      insights.push(`🏆 **Dominio total:** ${top3[0].name} (${top3[0].quantity} uds) vs ${runner_up.name} (${runner_up.quantity} uds) vs ${third.name} (${third.quantity} uds)`);
      
      const starDominance = ((top3[0].quantity / (top3[0].quantity + runner_up.quantity + third.quantity)) * 100).toFixed(1);
      insights.push(`👑 **${top3[0].name}** domina el top 3 con ${starDominance}% de participación`);
    }

    // Growth trends for star product
    if (trends.rising.length > 0) {
      const starInTrends = trends.rising.find(p => p.id === topProducts[0]?.id);
      if (starInTrends) {
        insights.push(`🚀 **Bonus:** Tu estrella está en crecimiento +${starInTrends.change}% vs semana anterior`);
      } else {
        const bestRiser = trends.rising[0];
        insights.push(`📈 **En crecimiento:** ${bestRiser.name} +${bestRiser.change}% (de ${bestRiser.previousQuantity} a ${bestRiser.quantity} unidades)`);
      }
    }

    // Operational insights
    const avgTransactionsPerProduct = totalItems / Object.keys(productStats).length;
    insights.push(`📊 **Contexto:** ${avgTransactionsPerProduct.toFixed(1)} ventas promedio por producto en ${totalDays} días (${totalTransactions} transacciones totales)`);

    return insights;
  }
}

module.exports = ProductPerformanceAnalyzer;