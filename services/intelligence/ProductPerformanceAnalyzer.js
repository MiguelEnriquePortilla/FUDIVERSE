const { createClient } = require('@supabase/supabase-js');

class ProductPerformanceAnalyzer {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async analyze(restaurantId, days = 30) {
    console.log(`📊 Analizando productos de ${days} días...`);
    
    try {
      // ✅ CAMBIO CRÍTICO: Leer de TRANSACTIONS en lugar de daily_summaries
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      console.log(`🗓️ DEBUGGING: Filtro de fecha desde ${startDate.toISOString()} hasta ahora`);
      
      const { data: transactions, error } = await this.supabase
        .from('transactions')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .gte('transaction_date', startDate.toISOString());

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

      // ✅ NUEVO: Extraer productos de transactions.items
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
      console.log(`🔍 DEBUGGING PRODUCTO 212:`);
      const product212Items = allItems.filter(item => item.product_id === 212);
      console.log(`   📦 Items encontrados para producto 212: ${product212Items.length}`);
      console.log(`   📊 Cantidad total producto 212: ${product212Items.reduce((sum, item) => sum + item.quantity, 0)}`);
      console.log(`   💰 Revenue total producto 212: $${product212Items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
      
      // Mostrar algunos items de ejemplo
      if (product212Items.length > 0) {
        console.log(`   📄 Ejemplo item 212:`, JSON.stringify(product212Items[0], null, 2));
      }

      // ✅ NUEVO: Obtener nombres de productos desde la tabla products
      const productNames = await this.getProductNames(restaurantId);

      // Análisis principal con datos reales
      const productStats = this.aggregateProductDataReal(allItems, productNames);
      const topProducts = this.getTopProducts(productStats);
      const trends = this.analyzeRealTrends(transactions, productNames);
      
      // 🔍 DEBUGGING: Verificar productStats para 212
      if (productStats[212]) {
        console.log(`🔍 DEBUGGING PRODUCT STATS 212:`, JSON.stringify(productStats[212], null, 2));
      }
      
      // Generar insights con datos reales
      const insights = this.generateRealInsights({
        productStats,
        topProducts,
        trends,
        totalTransactions: transactions.length,
        totalDays: days,
        totalItems: allItems.length
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
            dateRange: { from: startDate, to: new Date() }
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

  // ✅ NUEVO: Extraer productos de transactions.items usando estructura real
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
            quantity: item.num || 1, // 'num' es la cantidad en la estructura real
            price: parseFloat(item.product_sum || 0), // 'product_sum' es el precio total
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

  // ✅ NUEVO: Obtener nombres de productos desde tabla products
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

  // ✅ NUEVO: Agregar datos de productos con estructura real
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

    // Calcular métricas adicionales
    Object.values(products).forEach(product => {
      product.avgPrice = product.quantity > 0 ? product.revenue / product.quantity : 0;
      product.profitMargin = product.revenue > 0 ? (product.profit / product.revenue) * 100 : 0;
    });

    // 🔍 DEBUGGING: Top 3 productos por quantity
    const top3ByQuantity = Object.values(products)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);
    console.log(`🔍 TOP 3 por cantidad agregada:`, 
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

  // ✅ NUEVO: Análisis de tendencias con datos reales
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

    // Comparar productos
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

    // Ordenar por magnitud del cambio
    trends.rising.sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
    trends.falling.sort((a, b) => parseFloat(a.change) - parseFloat(b.change));

    return trends;
  }

  // ✅ NUEVO: Generar insights con datos reales y tono FUDI profesional
  generateRealInsights(analysis) {
    const insights = [];
    const { productStats, topProducts, trends, totalTransactions, totalDays, totalItems } = analysis;
    
    // Producto estrella con datos reales
    if (topProducts.length > 0) {
      const star = topProducts[0];
      insights.push(`⭐ **${star.name}** lidera tu operación con **${star.quantity} unidades** vendidas en ${totalDays} días`);
      insights.push(`💰 Generó **$${star.revenue.toFixed(2)}** en revenue con **${star.transactions} transacciones** (precio promedio: $${star.avgPrice.toFixed(2)})`);
      
      if (star.profitMargin > 0) {
        insights.push(`📊 Margen de utilidad del **${star.profitMargin.toFixed(1)}%** - producto altamente rentable`);
      }
    }

    // Top 3 productos
    if (topProducts.length >= 3) {
      const top3 = topProducts.slice(0, 3);
      const top3Names = top3.map(p => `${p.name} (${p.quantity} uds)`).join(', ');
      insights.push(`🏆 **Top 3 por volumen:** ${top3Names}`);
      
      const totalTop3Revenue = top3.reduce((sum, p) => sum + p.revenue, 0);
      const totalRevenue = Object.values(productStats).reduce((sum, p) => sum + p.revenue, 0);
      const concentration = ((totalTop3Revenue / totalRevenue) * 100).toFixed(1);
      insights.push(`📈 Estos 3 productos representan el **${concentration}%** de tu revenue total`);
    }

    // Tendencias de productos
    if (trends.rising.length > 0) {
      const bestRiser = trends.rising[0];
      insights.push(`🚀 **${bestRiser.name}** en crecimiento: +${bestRiser.change}% vs semana anterior (de ${bestRiser.previousQuantity} a ${bestRiser.quantity} unidades)`);
    }

    if (trends.falling.length > 0) {
      const worstFaller = trends.falling[0];
      insights.push(`⚠️ **${worstFaller.name}** requiere atención: ${worstFaller.change}% de caída (de ${worstFaller.previousQuantity} a ${worstFaller.quantity} unidades)`);
    }

    // Análisis de distribución
    const lowPerformers = Object.values(productStats).filter(p => p.quantity <= 2);
    if (lowPerformers.length > 0) {
      insights.push(`🔍 **${lowPerformers.length} productos** vendieron 2 unidades o menos - evalúa descontinuar o promocionar`);
    }

    // Insights de rentabilidad
    const profitableProducts = topProducts.filter(p => p.profitMargin > 50);
    if (profitableProducts.length > 0) {
      insights.push(`💎 **${profitableProducts.length} productos** tienen márgenes superiores al 50% - enfoca promoción en estos`);
    }

    // Recomendación operativa
    const avgTransactionsPerProduct = totalItems / Object.keys(productStats).length;
    insights.push(`📊 **Promedio:** ${avgTransactionsPerProduct.toFixed(1)} ventas por producto en ${totalDays} días basado en ${totalTransactions} transacciones`);

    return insights;
  }
}

module.exports = ProductPerformanceAnalyzer;