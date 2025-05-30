// 📁 services/intelligence/EnhancedProductAnalyzer.js

const { createClient } = require('@supabase/supabase-js');
const { FudiLearningEngine } = require('./FudiLearningEngine');

class EnhancedProductAnalyzer {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    this.learningEngine = new FudiLearningEngine();
  }

  // 🚀 ENHANCED ANALYSIS WITH AI FUNCTIONS
  async analyze(restaurantId, days = 30) {
    console.log(`🧠 Enhanced AI analysis for ${restaurantId} (${days} days)`);
    
    try {
      // Use AI function for instant analysis
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      const endDate = new Date();
      
      console.log('🤖 Using AI function for product intelligence...');
      
      const { data: aiResults, error } = await this.supabase.rpc('calculate_product_intelligence', {
        target_restaurant_id: restaurantId,
        period_start: startDate.toISOString().split('T')[0],
        period_end: endDate.toISOString().split('T')[0],
        min_confidence: 0.7
      });

      if (error) throw error;

      console.log(`📊 AI analysis complete: ${aiResults.length} products analyzed`);

      // Generate AI-powered insights
      const insights = this.generateEnhancedInsights(aiResults);

      return {
        success: true,
        insights: insights,
        data: {
          products: aiResults,
          summary: {
            totalProducts: aiResults.length,
            processingMode: 'ai_enhanced',
            analysisType: 'intelligent_metrics'
          }
        }
      };

    } catch (error) {
      console.error('❌ Enhanced analysis failed:', error);
      return {
        success: false,
        error: error.message,
        fallback: 'Use standard analysis'
      };
    }
  }

  generateEnhancedInsights(products) {
    const insights = [];
    
    if (products.length === 0) {
      insights.push('❌ **No hay datos suficientes** para generar análisis AI');
      return insights;
    }

    // Star product with AI insights
    const star = products[0];
    insights.push(`🌟 **${star.product_name}** ES tu platillo estrella absoluto con **Intelligence Score de ${(star.intelligence_score * 100).toFixed(0)}%**`);
    insights.push(`🔥 Generando **$${star.performance_metrics.total_revenue}** en revenue con **${star.performance_metrics.total_quantity} unidades** vendidas`);
    insights.push(`🎯 **Posición de mercado:** ${star.ai_insights.market_position.toUpperCase()}`);
    insights.push(`🚀 **AI Recommendation:** ${star.ai_insights.recommendation.replace('_', ' ').toUpperCase()}`);

    // Market analysis
    const dominant = products.filter(p => p.ai_insights.market_position === 'dominant');
    const strong = products.filter(p => p.ai_insights.market_position === 'strong');
    
    if (dominant.length > 1) {
      insights.push(`👑 **Productos dominantes:** ${dominant.length} productos dominando tu mercado`);
    }
    
    if (strong.length > 0) {
      insights.push(`💪 **Productos fuertes:** ${strong.length} productos con posición sólida`);
    }

    // AI recommendations summary
    const promoteHeavily = products.filter(p => p.ai_insights.recommendation === 'promote_heavily');
    if (promoteHeavily.length > 0) {
      insights.push(`🎯 **Promociona intensamente:** ${promoteHeavily.map(p => p.product_name).join(', ')}`);
    }

    // Performance indicators
    insights.push(`⚡ **Análisis AI completado:** ${products.length} productos analizados con inteligencia artificial`);
    insights.push(`✅ **Confiabilidad promedio:** ${(products.reduce((sum, p) => sum + p.confidence_level, 0) / products.length * 100).toFixed(0)}%`);

    return insights;
  }
}

module.exports = { EnhancedProductAnalyzer };