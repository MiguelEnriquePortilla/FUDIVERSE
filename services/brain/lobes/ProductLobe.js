// 📁 services/brain/lobes/ProductLobe.js - ENHANCED WITH AI SUPERPOWERS

const { EnhancedProductAnalyzer } = require('../../intelligence/EnhancedProductAnalyzer');

class ProductLobe {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    
    // 🚀 AI SUPERPOWERS ACTIVATED
    this.enhancedAnalyzer = new EnhancedProductAnalyzer();
    this.neuralActivity = 'PRODUCT_ANALYSIS_AI_ENHANCED';
    
    console.log('🍽️ ProductLobe initialized with AI superpowers');
  }

  async analyze(restaurantId, userMessage) {
    console.log(`🍽️ ProductLobe analyzing: "${userMessage}"`);
    console.log(`🧠 Neural activity: ${this.neuralActivity}`);
    
    try {
      // 🚀 ACTIVATE AI SUPERPOWERS
      console.log('🤖 Activating Enhanced AI Analysis...');
      
      const aiAnalysis = await this.enhancedAnalyzer.analyze(restaurantId, 30);
      
      if (aiAnalysis.success) {
        console.log(`✅ AI Analysis complete: ${aiAnalysis.data.products.length} products analyzed`);
        
        // 🧠 NEURAL INSIGHT GENERATION
        const neuralInsight = this.generateNeuralInsight(aiAnalysis, userMessage);
        
        return {
          success: true,
          type: 'product',
          neuralActivity: 'AI_ENHANCED_ANALYSIS_COMPLETE',
          data: {
            aiInsights: aiAnalysis.insights,
            products: aiAnalysis.data.products,
            summary: aiAnalysis.data.summary,
            processingMode: 'ai_enhanced'
          },
          summary: neuralInsight,
          confidence: this.calculateConfidence(aiAnalysis),
          timestamp: new Date().toISOString()
        };
        
      } else {
        // 🛡️ FALLBACK TO BASIC ANALYSIS
        console.log('⚠️ AI Analysis failed, using fallback');
        return await this.basicProductAnalysis(restaurantId, userMessage);
      }
      
    } catch (error) {
      console.error('❌ ProductLobe AI error:', error);
      
      // 🛡️ GRACEFUL DEGRADATION
      return await this.basicProductAnalysis(restaurantId, userMessage);
    }
  }

  // 🧠 GENERATE NEURAL INSIGHT FROM AI DATA
  generateNeuralInsight(aiAnalysis, userMessage) {
    const products = aiAnalysis.data.products;
    const insights = aiAnalysis.insights;
    
    if (products.length === 0) {
      return "ProductLobe detectó que no hay datos suficientes para análisis AI";
    }

    const starProduct = products[0];
    const intelligenceScore = (starProduct.intelligence_score * 100).toFixed(0);
    const marketPosition = starProduct.ai_insights.market_position;
    const recommendation = starProduct.ai_insights.recommendation;
    
    // 🎯 NEURAL INSIGHT GENERATION BASED ON QUESTION TYPE
    if (this.isStarProductQuestion(userMessage)) {
      return `ProductLobe AI identificó: ${starProduct.product_name} es tu estrella absoluta con ${intelligenceScore}% intelligence score, posición ${marketPosition.toUpperCase()}, generando $${starProduct.performance_metrics.total_revenue} (${starProduct.performance_metrics.total_quantity} unidades)`;
    }
    
    if (this.isPerformanceQuestion(userMessage)) {
      const dominantProducts = products.filter(p => p.ai_insights.market_position === 'dominant').length;
      const strongProducts = products.filter(p => p.ai_insights.market_position === 'strong').length;
      return `ProductLobe AI analizó ${products.length} productos: ${dominantProducts} dominantes, ${strongProducts} fuertes. Top performer: ${starProduct.product_name} (${intelligenceScore}% score)`;
    }
    
    if (this.isRecommendationQuestion(userMessage)) {
      const promoteHeavily = products.filter(p => p.ai_insights.recommendation === 'promote_heavily');
      return `ProductLobe AI recomienda promocionar intensamente: ${promoteHeavily.map(p => p.product_name).join(', ')} - basado en intelligence scores y market positioning`;
    }
    
    // 🎯 GENERAL INSIGHT
    return `ProductLobe AI procesó ${products.length} productos con inteligencia artificial: líder ${starProduct.product_name} (${intelligenceScore}% intelligence), posición ${marketPosition}, recomendación ${recommendation.replace('_', ' ')}`;
  }

  // 🎯 QUESTION TYPE DETECTION
  isStarProductQuestion(message) {
    const starKeywords = ['estrella', 'star', 'mejor', 'top', 'platillo', 'producto'];
    return starKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  isPerformanceQuestion(message) {
    const performanceKeywords = ['performance', 'rendimiento', 'análisis', 'como van', 'resumen'];
    return performanceKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  isRecommendationQuestion(message) {
    const recKeywords = ['recomienda', 'suggest', 'promocionar', 'estrategia', 'que hago'];
    return recKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // 📊 CALCULATE CONFIDENCE BASED ON AI DATA
  calculateConfidence(aiAnalysis) {
    const products = aiAnalysis.data.products;
    
    if (products.length === 0) return 0.3;
    
    // Base confidence on number of products and their confidence levels
    const avgConfidence = products.reduce((sum, p) => sum + p.confidence_level, 0) / products.length;
    const dataRichness = Math.min(products.length / 10, 1); // More products = higher confidence
    
    return Math.min(avgConfidence * dataRichness + 0.2, 1.0);
  }

  // 🛡️ FALLBACK: BASIC PRODUCT ANALYSIS
  async basicProductAnalysis(restaurantId, userMessage) {
    console.log('🛡️ ProductLobe fallback mode');
    
    return {
      success: true,
      type: 'product',
      neuralActivity: 'BASIC_ANALYSIS_FALLBACK',
      data: {
        message: 'Análisis básico - AI superpowers no disponibles'
      },
      summary: `ProductLobe detectó la pregunta "${userMessage}" pero necesita reconectar sistemas AI para análisis completo`,
      confidence: 0.5,
      timestamp: new Date().toISOString()
    };
  }

  // 🧠 NEURAL STATUS CHECK
  getStatus() {
    return {
      lobe: 'ProductLobe',
      status: 'AI_ENHANCED',
      capabilities: [
        'Enhanced AI Analysis',
        'Intelligence Scoring',
        'Market Positioning',
        'AI Recommendations',
        'Pattern Recognition'
      ],
      aiSuperpowers: true,
      confidence: 0.95
    };
  }
}

module.exports = ProductLobe;