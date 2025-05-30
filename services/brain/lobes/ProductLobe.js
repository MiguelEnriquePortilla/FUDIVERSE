// 📁 services/brain/lobes/ProductLobe.js - FIXED WITH DEBUG LOGS

const { createClient } = require('@supabase/supabase-js');

class ProductLobe {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('🍽️ ProductLobe initializing...');
    
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

  async analyze(restaurantId, days = 30) {
    console.log(`🍽️ ProductLobe analyzing for ${restaurantId} (${days} days)`);
    console.log(`🤖 AI Superpowers Status: ${this.aiSuperpowersActive ? 'ACTIVE' : 'INACTIVE'}`);
    
    try {
      // 🚀 TRY AI SUPERPOWERS FIRST
      if (this.aiSuperpowersActive && this.enhancedAnalyzer) {
        console.log('🚀 AI SUPERPOWERS ATTEMPT - Starting Enhanced Analysis...');
        console.log('🤖 Enhanced Analyzer available:', !!this.enhancedAnalyzer);
        
        try {
          const aiAnalysis = await this.enhancedAnalyzer.analyze(restaurantId, days);
          console.log('🎯 AI Analysis result success:', aiAnalysis.success);
          console.log('📊 AI Analysis products found:', aiAnalysis.data?.products?.length || 0);
          
          if (aiAnalysis.success && aiAnalysis.data?.products?.length > 0) {
            console.log('✅ AI ANALYSIS SUCCESS - Converting to neural format...');
            
            // 🧠 CONVERT AI INSIGHTS TO NEURAL FORMAT
            const neuralInsights = this.convertAIToNeuralInsights(aiAnalysis);
            console.log('🧠 Neural insights generated:', neuralInsights.length);
            
            return {
              success: true,
              insights: neuralInsights,
              data: {
                topProducts: this.formatTopProducts(aiAnalysis.data.products),
                aiMetadata: {
                  processingMode: 'ai_enhanced',
                  intelligenceScores: true,
                  marketPositioning: true,
                  aiRecommendations: true
                },
                summary: {
                  totalProducts: aiAnalysis.data.products.length,
                  processingMode: 'ai_enhanced'
                }
              }
            };
          } else {
            console.log('⚠️ AI Analysis returned no products, falling back');
          }
          
        } catch (aiError) {
          console.error('💥 AI Analysis FAILED:', aiError.message);
          console.error('🔍 Error details:', aiError);
        }
      } else {
        console.log('🛡️ AI Superpowers not available, using original analysis');
      }
      
      // 🛡️ FALLBACK TO ORIGINAL ANALYSIS
      console.log('🔄 FALLING BACK to original ProductLobe analysis...');
      return await this.originalProductAnalysis(restaurantId, days);
      
    } catch (error) {
      console.error('❌ ProductLobe analyze error:', error);
      
      // 🛡️ ULTIMATE FALLBACK
      return {
        success: false,
        insights: ['❌ Error en análisis de productos'],
        data: { topProducts: [], summary: { totalProducts: 0 } }
      };
    }
  }

  // 🧠 CONVERT AI INSIGHTS TO NEURAL FORMAT
  convertAIToNeuralInsights(aiAnalysis) {
    console.log('🧠 Converting AI insights to neural format...');
    
    const products = aiAnalysis.data.products;
    const starProduct = products[0];
    
    const neuralInsights = [
      `🌟 **${starProduct.product_name}** ES tu platillo estrella absoluto con **Intelligence Score del ${(starProduct.intelligence_score * 100).toFixed(0)}%**`,
      `🚀 Posición de mercado: **${starProduct.ai_insights.market_position.toUpperCase()}** - generando **$${starProduct.performance_metrics.total_revenue}**`,
      `🤖 AI Recommendation: **${starProduct.ai_insights.recommendation.replace('_', ' ').toUpperCase()}** (${starProduct.performance_metrics.total_quantity} unidades vendidas)`,
      `📊 Análisis AI: **${products.length} productos** procesados con inteligencia artificial avanzada`,
      `🧠 Confiabilidad: **${(starProduct.confidence_level * 100).toFixed(0)}%** - datos súper confiables para tomar decisiones`
    ];

    // Add market analysis
    const dominant = products.filter(p => p.ai_insights.market_position === 'dominant');
    const strong = products.filter(p => p.ai_insights.market_position === 'strong');
    
    if (dominant.length > 1) {
      neuralInsights.push(`👑 **Productos dominantes:** ${dominant.length} productos dominando tu mercado`);
    }
    
    if (strong.length > 0) {
      neuralInsights.push(`💪 **Portfolio fuerte:** ${strong.length} productos con posición sólida en el mercado`);
    }

    // Add AI recommendations summary
    const promoteHeavily = products.filter(p => p.ai_insights.recommendation === 'promote_heavily');
    if (promoteHeavily.length > 0) {
      neuralInsights.push(`🎯 **AI Strategy:** Promociona intensamente → ${promoteHeavily.map(p => p.product_name).slice(0, 3).join(', ')}`);
    }

    neuralInsights.push(`⚡ **AI SUPERPOWERS ACTIVOS:** Análisis completado con Enhanced AI + Intelligence Scoring`);

    console.log('✅ Neural insights conversion complete');
    return neuralInsights;
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

  // 🛡️ ORIGINAL PRODUCT ANALYSIS (FALLBACK)
  async originalProductAnalysis(restaurantId, days) {
    console.log('🛡️ Using original ProductLobe analysis');
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    console.log(`📊 Analizando productos de ${days} días...`);
    console.log(`🗓️ DEBUGGING: Filtro de fecha desde ${startDate.toISOString()} hasta ${endDate.toISOString()}`);

    // Get transactions for the period
    const { data: transactions, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('transaction_date', startDate.toISOString())
      .lte('transaction_date', endDate.toISOString())
      .limit(1000);

    if (error) {
      console.error('❌ Error fetching transactions:', error);
      throw error;
    }

    console.log(`📊 Analizando ${transactions.length} transacciones...`);
    console.log(`🔍 DEBUGGING: Procesando ${transactions.length} transacciones...`);

    // Extract items from transactions
    const allItems = [];
    transactions.forEach(transaction => {
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach(item => {
          allItems.push({
            product_id: item.product_id,
            quantity: item.num || 1,
            price: parseFloat(item.product_sum || 0),
            transaction_date: transaction.transaction_date
          });
        });
      }
    });

    console.log(`📦 Extraídos ${allItems.length} items de productos`);

    // Aggregate by product
    const productStats = {};
    allItems.forEach(item => {
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

    // Get top products by quantity
    const topProductsByQuantity = Object.values(productStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    console.log(`🔍 Top 5 productos por frecuencia: ${topProductsByQuantity.map(p => `${p.id}: ${p.transactions}`).join(', ')}`);

    if (topProductsByQuantity.length === 0) {
      return {
        success: false,
        insights: ['❌ No se encontraron datos de productos para el período especificado'],
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

    // Add names to stats
    Object.values(productStats).forEach(stat => {
      stat.name = productNames[stat.id] || `Producto ${stat.id}`;
      stat.avgPrice = stat.quantity > 0 ? stat.revenue / stat.quantity : 0;
      stat.dailyAverage = stat.quantity / days;
    });

    const starProduct = topProductsByQuantity[0];
    const starProductName = productNames[starProduct.id] || `Producto ${starProduct.id}`;

    console.log(`🔍 Producto ${starProduct.id} nombre: "${starProductName}"`);
    console.log(`🔍 PRODUCT STATS ${starProduct.id} (AFTER FIX): ${JSON.stringify({
      id: starProduct.id,
      name: starProductName,
      quantity: starProduct.quantity,
      revenue: starProduct.revenue,
      transactions: starProduct.transactions
    }, null, 2)}`);

    // Generate insights
    const insights = [
      `🌟 **${starProductName}** ES tu platillo estrella absoluto con **${starProduct.quantity} unidades** vendidas en ${days} días`,
      `🔥 Lidera tu operación generando **$${starProduct.revenue.toFixed(2)}** en revenue (precio promedio: $${starProduct.avgPrice.toFixed(2)})`,
      `📊 Ritmo de venta: **${starProduct.dailyAverage.toFixed(1)} unidades diarias** - este producto está on fire, cabrón`,
      `🛡️ **Modo original:** Análisis completado sin AI superpowers (Enhanced AI falló o no disponible)`
    ];

    console.log('✅ Original analysis complete');

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
            dailyAverage: product.dailyAverage,
            transactions: product.transactions
          })),
        summary: {
          totalProducts: Object.keys(productStats).length,
          processingMode: 'original_fallback'
        }
      }
    };
  }
}

module.exports = ProductLobe;