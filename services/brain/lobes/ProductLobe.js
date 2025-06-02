// 📁 services/brain/lobes/ProductLobe.js - TEMPORAL ENHANCED WITH NEURAL INTELLIGENCE + DEBUG

const { createClient } = require('@supabase/supabase-js');

class ProductLobe {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('🍽️ ProductLobe initializing with TEMPORAL INTELLIGENCE...');
    
    // 🚀 TRY TO LOAD AI SUPERPOWERS
    try {
      console.log('🔍 ATTEMPTING to load EnhancedProductAnalyzer...');
      
      // Try different import paths
      let EnhancedProductAnalyzer;
      try {
        console.log('📁 Trying path: ../../intelligence/EnhancedProductAnalyzer');
        const module1 = require('../../intelligence/EnhancedProductAnalyzer');
        EnhancedProductAnalyzer = module1.EnhancedProductAnalyzer;
        console.log('✅ Path 1 SUCCESS');
      } catch (e1) {
        console.log('❌ Path 1 failed:', e1.message);
        try {
          console.log('📁 Trying path: ../../../services/intelligence/EnhancedProductAnalyzer');
          const module2 = require('../../../services/intelligence/EnhancedProductAnalyzer');
          EnhancedProductAnalyzer = module2.EnhancedProductAnalyzer;
          console.log('✅ Path 2 SUCCESS');
        } catch (e2) {
          console.log('❌ Path 2 failed:', e2.message);
          try {
            console.log('📁 Trying direct require...');
            EnhancedProductAnalyzer = require('../../../services/intelligence/EnhancedProductAnalyzer').EnhancedProductAnalyzer;
            console.log('✅ Direct require SUCCESS');
          } catch (e3) {
            console.log('❌ All paths failed:', e3.message);
            throw new Error('Cannot load EnhancedProductAnalyzer');
          }
        }
      }
      
      this.enhancedAnalyzer = new EnhancedProductAnalyzer();
      this.aiSuperpowersActive = true;
      console.log('🚀 AI SUPERPOWERS ACTIVATED in ProductLobe');
      
    } catch (error) {
      console.error('💥 FAILED to load AI superpowers:', error.message);
      this.enhancedAnalyzer = null;
      this.aiSuperpowersActive = false;
      console.log('🛡️ ProductLobe will use FALLBACK mode');
    }
    
    console.log(`🍽️ ProductLobe initialized. AI Superpowers: ${this.aiSuperpowersActive ? 'ACTIVE' : 'INACTIVE'}`);
  }

  // 🧠 NEW: TEMPORAL-AWARE ANALYSIS
  async analyzeWithTemporal(restaurantId, temporalIntelligence) {
    console.log(`🍽️ ProductLobe TEMPORAL ANALYSIS for ${restaurantId}`);
    console.log(`⏰ Timeframe: ${temporalIntelligence.timeframe.type} (${temporalIntelligence.timeframe.days} days)`);
    console.log(`🧠 Context: ${temporalIntelligence.context.primary}`);
    
    try {
      // 📅 EXTRACT TEMPORAL PARAMETERS
      const { startDate, endDate, days } = temporalIntelligence.dateRange;
      const { type: timeframeType, label: timeframeLabel } = temporalIntelligence.timeframe;
      
      // 🚀 TRY AI SUPERPOWERS FIRST (if available)
      if (this.aiSuperpowersActive && this.enhancedAnalyzer) {
        console.log('🚀 AI SUPERPOWERS TEMPORAL ATTEMPT...');
        
        try {
          const aiAnalysis = await this.enhancedAnalyzer.analyzeWithDateRange(
            restaurantId, 
            startDate, 
            endDate
          );
          
          if (aiAnalysis.success && aiAnalysis.data?.products?.length > 0) {
            console.log('✅ AI TEMPORAL ANALYSIS SUCCESS');
            
            // 🧠 CONVERT AI INSIGHTS TO TEMPORAL-AWARE FORMAT
            const temporalInsights = this.convertAIToTemporalInsights(
              aiAnalysis, 
              temporalIntelligence
            );
            
            return {
              success: true,
              insights: temporalInsights,
              data: {
                topProducts: this.formatTopProducts(aiAnalysis.data.products),
                temporalMetadata: {
                  processingMode: 'ai_temporal_enhanced',
                  timeframe: temporalIntelligence.timeframe,
                  context: temporalIntelligence.context,
                  dateRange: temporalIntelligence.dateRange
                },
                summary: {
                  totalProducts: aiAnalysis.data.products.length,
                  processingMode: 'ai_temporal_enhanced',
                  timeframeLabel: timeframeLabel
                }
              }
            };
          } else {
            console.log('⚠️ AI Temporal Analysis returned no products, falling back');
          }
          
        } catch (aiError) {
          console.error('💥 AI Temporal Analysis FAILED:', aiError.message);
        }
      }
      
      // 🛡️ FALLBACK TO ORIGINAL TEMPORAL ANALYSIS
      console.log('🔄 FALLING BACK to original temporal analysis...');
      return await this.originalTemporalAnalysis(restaurantId, temporalIntelligence);
      
    } catch (error) {
      console.error('❌ ProductLobe temporal analyze error:', error);
      
      // 🛡️ ULTIMATE FALLBACK
      return {
        success: false,
        insights: ['❌ Error en análisis temporal de productos'],
        data: { topProducts: [], summary: { totalProducts: 0 } }
      };
    }
  }

  // 🛡️ ORIGINAL TEMPORAL ANALYSIS (WITH DATE RANGE SUPPORT)
  async originalTemporalAnalysis(restaurantId, temporalIntelligence) {
    console.log('🛡️ Using original ProductLobe temporal analysis');
    
    const { startDate, endDate, days } = temporalIntelligence.dateRange;
    const { type: timeframeType, label: timeframeLabel } = temporalIntelligence.timeframe;
    
    console.log(`📊 Analizando productos para ${timeframeLabel}...`);
    console.log(`🗓️ TEMPORAL DEBUG: Filtro de fecha desde ${startDate} hasta ${endDate}`);

    // Get transactions for the specific temporal period
    const { data: transactions, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('transaction_date', startDate)
      .lte('transaction_date', endDate)
      .limit(1000);

    if (error) {
      console.error('❌ Error fetching temporal transactions:', error);
      throw error;
    }

    console.log(`📊 Analizando ${transactions.length} transacciones para ${timeframeLabel}...`);

    // 🔍 DEBUG: Log sample transactions to see structure
    if (transactions.length > 0) {
      console.log('🔍 SAMPLE TRANSACTION STRUCTURE:');
      console.log('Transaction 0:', {
        id: transactions[0].pos_transaction_id,
        date: transactions[0].transaction_date,
        items_count: transactions[0].items?.length || 0,
        items_sample: transactions[0].items?.slice(0, 2) || 'NO ITEMS'
      });
    }

    // Extract items from transactions
    const allItems = [];
    transactions.forEach(transaction => {
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach(item => {
          allItems.push({
            product_id: item.product_id,
            quantity: item.num || 1,
            price: parseFloat(item.product_sum || 0),
            transaction_date: transaction.transaction_date,
            // 🔍 DEBUG: Keep original data for inspection
            originalItem: item
          });
        });
      }
    });

    console.log(`📦 Extraídos ${allItems.length} items de productos para ${timeframeLabel}`);

    // 🔍 DEBUG: Ver primeros 5 items para diagnóstico
    console.log('🔍 PRIMEROS 5 ITEMS DEBUG:');
    allItems.slice(0, 5).forEach((item, i) => {
      console.log(`Item ${i + 1}:`, {
        product_id: item.product_id,
        product_sum_original: item.originalItem.product_sum,
        quantity: item.quantity,
        price_parsed: item.price,
        originalItem: item.originalItem
      });
    });

    // 🔍 DEBUG: Suma total de todos los items
    const totalItemsValue = allItems.reduce((sum, item) => sum + item.price, 0);
    console.log('💰 SUMA TOTAL DE TODOS LOS ITEMS:', totalItemsValue);

    // 🔍 DEBUG: Verificar items con precio 0
    const zeroValueItems = allItems.filter(item => item.price === 0);
    const validValueItems = allItems.filter(item => item.price > 0);
    console.log('🔍 ITEMS SIN VALOR (price = 0):', zeroValueItems.length);
    console.log('🔍 ITEMS CON VALOR (price > 0):', validValueItems.length);

    // 🚨 BUG FIX: Filtrar items anómalos (quantity > 50 es sospechoso)
    const anomalousItems = allItems.filter(item => item.quantity > 50);
    const normalItems = allItems.filter(item => item.quantity <= 50 && item.price > 0);
    
    console.log('🚨 ITEMS ANÓMALOS (quantity > 50):', anomalousItems.length);
    if (anomalousItems.length > 0) {
      console.log('🔍 SAMPLE ANOMALOUS ITEM:', {
        product_id: anomalousItems[0].product_id,
        quantity: anomalousItems[0].quantity,
        price: anomalousItems[0].price,
        suspicious: 'QUANTITY_TOO_HIGH'
      });
    }
    
    console.log('✅ ITEMS NORMALES (quantity <= 50, price > 0):', normalItems.length);

    if (validValueItems.length > 0) {
      console.log('🔍 SAMPLE VALID ITEM:', {
        product_id: validValueItems[0].product_id,
        price: validValueItems[0].price,
        originalItem: validValueItems[0].originalItem
      });
    }

    // 🔧 BUG FIX: Aggregate ONLY normal items (no anomalous quantities)
    const productStats = {};
    normalItems.forEach(item => {
      const productId = item.product_id;
      
      if (!productStats[productId]) {
        productStats[productId] = {
          id: productId,
          quantity: 0,
          revenue: 0,
          transactions: 0
        };
      }
      
      productStats[productId].quantity += item.quantity;
      productStats[productId].revenue += item.price;
      productStats[productId].transactions++;
    });

    // 🔍 DEBUG: Verificar aggregation results
    console.log('📊 PRODUCT STATS DEBUG (Top 3):');
    const topProductsForDebug = Object.entries(productStats)
      .sort(([,a], [,b]) => b.revenue - a.revenue)
      .slice(0, 3);
    
    topProductsForDebug.forEach(([id, stats]) => {
      console.log(`Product ${id}:`, {
        quantity: stats.quantity,
        revenue: stats.revenue,
        transactions: stats.transactions,
        avgPrice: stats.revenue / stats.quantity
      });
    });

    const totalRevenue = Object.values(productStats).reduce((sum, stat) => sum + stat.revenue, 0);
    console.log('💰 TOTAL CALCULATED REVENUE FROM PRODUCT STATS (NORMAL ITEMS ONLY):', totalRevenue);
    console.log('📊 ANOMALOUS ITEMS EXCLUDED REVENUE:', anomalousItems.reduce((sum, item) => sum + item.price, 0));

    // 🔧 BUG FIX: Get top products by REVENUE (not quantity) - more reliable
    const topProductsByRevenue = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    if (topProductsByRevenue.length === 0) {
      return {
        success: false,
        insights: [`❌ No se encontraron datos de productos para ${timeframeLabel}`],
        data: { topProducts: [], summary: { totalProducts: 0 } }
      };
    }

    // Get product names
    const productIds = Object.keys(productStats).map(id => parseInt(id));
    const { data: products } = await this.supabase
      .from('products')
      .select('id, name')
      .in('id', productIds);

    console.log(`🏷️ Cargados nombres de ${products?.length || 0} productos`);

    // Create product name mapping
    const productNames = {};
    if (products) {
      products.forEach(product => {
        productNames[product.id] = product.name;
      });
    }

    // Add names to stats and calculate metrics
    Object.values(productStats).forEach(stat => {
      stat.name = productNames[stat.id] || `Producto ${stat.id}`;
      stat.avgPrice = stat.quantity > 0 ? stat.revenue / stat.quantity : 0;
      
      // 📅 TEMPORAL-AWARE METRICS
      if (timeframeType === 'today' || timeframeType === 'yesterday') {
        stat.dailyMetric = stat.quantity; // Already daily
      } else {
        stat.dailyAverage = stat.quantity / days;
      }
    });

    const starProduct = topProductsByRevenue[0];
    const starProductName = productNames[starProduct.id] || `Producto ${starProduct.id}`;

    // 🔍 DEBUG: Star product details (now by REVENUE, not quantity)
    console.log('🌟 STAR PRODUCT DEBUG (BY REVENUE)::', {
      id: starProduct.id,
      name: starProductName,
      quantity: starProduct.quantity,
      revenue: starProduct.revenue,
      avgPrice: starProduct.avgPrice,
      transactions: starProduct.transactions,
      reason: 'HIGHEST_REVENUE'
    });

    // 🧠 GENERATE TEMPORAL-AWARE INSIGHTS
    const insights = this.generateTemporalInsights(
      starProduct, 
      starProductName, 
      temporalIntelligence, 
      Object.keys(productStats).length
    );

    console.log('✅ Original temporal analysis complete');

    return {
      success: true,
      insights: insights,
      data: {
        topProducts: Object.values(productStats)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10)
          .map((product, index) => ({
            rank: index + 1,
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            revenue: product.revenue,
            avgPrice: product.avgPrice,
            dailyAverage: product.dailyAverage || product.quantity,
            transactions: product.transactions
          })),
        temporalMetadata: {
          processingMode: 'original_temporal',
          timeframe: temporalIntelligence.timeframe,
          context: temporalIntelligence.context,
          dateRange: temporalIntelligence.dateRange
        },
        summary: {
          totalProducts: Object.keys(productStats).length,
          processingMode: 'original_temporal',
          timeframeLabel: timeframeLabel
        }
      }
    };
  }

  // 🧠 GENERATE TEMPORAL-AWARE INSIGHTS
  generateTemporalInsights(starProduct, starProductName, temporalIntelligence, totalProducts) {
    const { timeframe, context } = temporalIntelligence;
    const { type: timeframeType, label: timeframeLabel } = timeframe;
    
    const insights = [];
    
    // 🌟 STAR PRODUCT WITH TEMPORAL CONTEXT
    if (timeframeType === 'today') {
      insights.push(`🌟 **${starProductName}** está dominando HOY con **${starProduct.quantity} unidades** vendidas`);
      insights.push(`🔥 Revenue del día: **$${starProduct.revenue.toFixed(2)}** (precio promedio: $${starProduct.avgPrice.toFixed(2)})`);
    } else if (timeframeType === 'yesterday') {
      insights.push(`🌟 **${starProductName}** fue tu estrella AYER con **${starProduct.quantity} unidades** vendidas`);
      insights.push(`📊 Performance de ayer: **$${starProduct.revenue.toFixed(2)}** en revenue total`);
    } else if (timeframeType === 'thisWeek') {
      insights.push(`🌟 **${starProductName}** lidera ESTA SEMANA con **${starProduct.quantity} unidades** vendidas`);
      insights.push(`📈 Ritmo semanal: **${(starProduct.quantity / 7).toFixed(1)} unidades diarias** de promedio`);
    } else if (timeframeType === 'thisMonth') {
      insights.push(`🌟 **${starProductName}** ES tu platillo estrella del MES con **${starProduct.quantity} unidades** vendidas`);
      insights.push(`🚀 Performance mensual: **$${starProduct.revenue.toFixed(2)}** en revenue`);
    } else {
      insights.push(`🌟 **${starProductName}** ES tu platillo estrella en ${timeframeLabel} con **${starProduct.quantity} unidades** vendidas`);
    }
    
    // 📊 TEMPORAL CONTEXT
    insights.push(`📊 Análisis temporal: **${totalProducts} productos** analizados para ${timeframeLabel}`);
    
    // 🧠 TEMPORAL MODE INDICATOR
    insights.push(`⏰ **Análisis temporal activo:** Datos específicos de ${timeframeLabel} procesados con inteligencia temporal`);
    
    return insights;
  }

  // 🧠 CONVERT AI INSIGHTS TO TEMPORAL-AWARE FORMAT
  convertAIToTemporalInsights(aiAnalysis, temporalIntelligence) {
    console.log('🧠 Converting AI insights to temporal-aware format...');
    
    const products = aiAnalysis.data.products;
    const starProduct = products[0];
    const { timeframe } = temporalIntelligence;
    const { type: timeframeType, label: timeframeLabel } = timeframe;
    
    const temporalInsights = [];
    
    // 🌟 TEMPORAL-AWARE STAR PRODUCT
    temporalInsights.push(`🌟 **${starProduct.product_name}** domina ${timeframeLabel} con **Intelligence Score del ${(starProduct.intelligence_score * 100).toFixed(0)}%**`);
    
    // 🚀 TEMPORAL PERFORMANCE
    if (timeframeType === 'today') {
      temporalInsights.push(`🔥 Performance HOY: **$${starProduct.performance_metrics.total_revenue}** en revenue actual`);
    } else if (timeframeType === 'yesterday') {
      temporalInsights.push(`📊 Performance AYER: **$${starProduct.performance_metrics.total_revenue}** en revenue total`);
    } else {
      temporalInsights.push(`🚀 Performance en ${timeframeLabel}: **$${starProduct.performance_metrics.total_revenue}** generados`);
    }
    
    // 🤖 AI RECOMMENDATIONS WITH TEMPORAL CONTEXT
    temporalInsights.push(`🤖 AI Recommendation para ${timeframeLabel}: **${starProduct.ai_insights.recommendation.replace('_', ' ').toUpperCase()}**`);
    
    // 📊 TEMPORAL ANALYSIS SUMMARY
    temporalInsights.push(`📊 Análisis AI temporal: **${products.length} productos** procesados para ${timeframeLabel}`);
    
    // ⚡ AI SUPERPOWERS INDICATOR
    temporalInsights.push(`⚡ **AI SUPERPOWERS TEMPORAL:** Análisis completado con Enhanced AI + Temporal Intelligence`);

    console.log('✅ AI temporal insights conversion complete');
    return temporalInsights;
  }

  // 🛡️ LEGACY ANALYZE METHOD (FOR COMPATIBILITY)
  async analyze(restaurantId, days = 30) {
    console.log(`🍽️ ProductLobe legacy analyze for ${restaurantId} (${days} days)`);
    
    // Create a basic temporal intelligence object for compatibility
    const basicTemporal = {
      timeframe: {
        type: 'default',
        days: days,
        label: `últimos ${days} días`,
        period: 'default_range'
      },
      context: {
        primary: 'products',
        confidence: 0.7
      },
      dateRange: {
        startDate: new Date(Date.now() - (days * 24 * 60 * 60 * 1000)).toISOString(),
        endDate: new Date().toISOString(),
        days: days,
        type: 'default'
      }
    };
    
    return await this.analyzeWithTemporal(restaurantId, basicTemporal);
  }

  // 📊 FORMAT TOP PRODUCTS FOR NEURAL PIPELINE
  formatTopProducts(aiProducts) {
    return aiProducts.slice(0, 10).map((product, index) => ({
      rank: index + 1,
      id: product.product_id,
      name: product.product_name,
      quantity: product.performance_metrics.total_quantity,
      revenue: product.performance_metrics.total_revenue,
      avgPrice: product.performance_metrics.avg_price || (product.performance_metrics.total_revenue / product.performance_metrics.total_quantity),
      intelligenceScore: (product.intelligence_score * 100).toFixed(1),
      marketPosition: product.ai_insights.market_position,
      aiRecommendation: product.ai_insights.recommendation,
      confidenceLevel: (product.confidence_level * 100).toFixed(0)
    }));
  }
}

module.exports = ProductLobe;