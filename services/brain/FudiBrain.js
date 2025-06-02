// 🧠 services/brain/FudiBrain.js
// FUDI NEURAL ARCHITECTURE - INTEGRATED WITH INTELLIGENTRESPONSEPROCESSOR
// ARCHITECTURE: Data → Logic → Soul (IntelligentQueryRouter → IntelligentResponseProcessor → HumanizerUniversal)

const { TemporalProcessor } = require('./processors/TemporalProcessor');
const { ProductLobe } = require('./lobes/ProductLobe');
const { PaymentLobe } = require('./lobes/PaymentLobe');
const { TrendLobe } = require('./lobes/TrendLobe');
const { HumanizerUniversal } = require('./personality/HumanizerUniversal');

// 🔥 NEW INTEGRATION: CLAUDE MODEL INTELLIGENCE
const { IntelligentQueryRouter } = require('../intelligence/IntelligentQueryRouter');
const { IntelligentResponseProcessor } = require('../intelligence/IntelligentResponseProcessor');

class FudiBrain {
  constructor(supabaseUrl, supabaseKey) {
    console.log('🧠 FUDI Brain initializing with Claude Model architecture...');
    
    // Core processors
    this.temporalProcessor = new TemporalProcessor();
    
    // Neural lobes
    this.productLobe = new ProductLobe(supabaseUrl, supabaseKey);
    this.paymentLobe = new PaymentLobe(supabaseUrl, supabaseKey);
    this.trendLobe = new TrendLobe(supabaseUrl, supabaseKey);
    
    // Personality layer
    this.humanizer = new HumanizerUniversal();
    
    // 🚀 CLAUDE MODEL INTELLIGENCE LAYER
    this.intelligentQueryRouter = new IntelligentQueryRouter(supabaseUrl, supabaseKey);
    this.intelligentResponseProcessor = new IntelligentResponseProcessor();
    
    console.log('✅ FUDI Brain initialized with Intelligence Processing Pipeline');
  }

  // 🎯 MAIN PROCESSING METHOD - UPDATED WITH INTELLIGENT ARCHITECTURE
  async processQuery(query, context = {}) {
    console.log('🧠 FudiBrain: Processing query with Claude Model intelligence...');
    console.log('📝 Query:', query);
    console.log('🎯 Context:', context);

    try {
      // STEP 1: TEMPORAL INTELLIGENCE (what timeframe?)
      const temporalIntelligence = await this.temporalProcessor.analyzeQuery(query, context);
      console.log('⏰ Temporal intelligence:', temporalIntelligence);

      // STEP 2: CHOOSE PROCESSING PATH (Claude Model vs Traditional)
      const processingPath = this.chooseProcessingPath(query, temporalIntelligence, context);
      console.log('🚀 Processing path chosen:', processingPath);

      let response;

      if (processingPath === 'claude_model') {
        // 🧠 CLAUDE MODEL PATH: Pre-calculated intelligence (FAST & ACCURATE)
        response = await this.processWithClaudeModel(query, temporalIntelligence, context);
      } else {
        // 🔄 TRADITIONAL PATH: Real-time analysis (FALLBACK)
        response = await this.processWithTraditionalLobes(query, temporalIntelligence, context);
      }

      console.log('✅ FudiBrain: Query processing complete');
      return response;

    } catch (error) {
      console.error('❌ FudiBrain processing error:', error);
      return await this.generateErrorResponse(query, error);
    }
  }

  // 🧠 CLAUDE MODEL PROCESSING PATH (NEW!)
  async processWithClaudeModel(query, temporalIntelligence, context) {
    console.log('🧠 Processing with Claude Model intelligence...');

    try {
      // STEP 1: INTELLIGENT QUERY ROUTING (DATA LAYER)
      const intelligentInsights = await this.intelligentQueryRouter.routeQuery(query, temporalIntelligence, context);
      console.log('🔍 Intelligent insights generated:', intelligentInsights.length);

      // STEP 2: INTELLIGENT RESPONSE PROCESSING (LOGIC LAYER)
      const queryContext = {
        type: this.determineQueryType(query),
        timeframe: temporalIntelligence.timeframe?.type || 'unknown',
        userId: context.userId || 'restaurant_owner',
        restaurantId: context.restaurantId
      };

      const structuredResponse = await this.intelligentResponseProcessor.processIntelligentResponse(
        intelligentInsights, 
        queryContext, 
        {
          restaurantName: context.restaurantName || 'tu restaurante',
          userPreferences: context.userPreferences || {}
        }
      );

      console.log('🏗️ Structured response ready for humanization');

      // STEP 3: HUMANIZATION (SOUL LAYER)
      const humanizedResponse = await this.humanizer.humanizeResponse(
        structuredResponse.text,
        temporalIntelligence,
        {
          responseType: 'claude_model_intelligence',
          confidenceLevel: 'high',
          processingSpeed: 'instant',
          dataQuality: 'pre_calculated'
        }
      );

      return {
        success: true,
        response: humanizedResponse,
        metadata: {
          processingPath: 'claude_model',
          processingTime: '<100ms',
          insightsProcessed: intelligentInsights.length,
          intelligenceLevel: 'advanced',
          structuredData: structuredResponse.structured,
          humanizationLevel: 'fudiResto'
        }
      };

    } catch (error) {
      console.error('❌ Claude Model processing error:', error);
      // Fallback to traditional processing
      return await this.processWithTraditionalLobes(query, temporalIntelligence, context);
    }
  }

  // 🔄 TRADITIONAL PROCESSING PATH (FALLBACK)
  async processWithTraditionalLobes(query, temporalIntelligence, context) {
    console.log('🔄 Processing with traditional lobes (fallback mode)...');

    // Determine which lobe should handle the query
    const primaryLobe = this.determinePrimaryLobe(query, temporalIntelligence);
    console.log('🎯 Primary lobe selected:', primaryLobe);

    let analysis;
    switch (primaryLobe) {
      case 'product':
        analysis = await this.productLobe.analyzeWithTemporal(context.restaurantId, temporalIntelligence);
        break;
      case 'payment':
        analysis = await this.paymentLobe.analyzeWithTemporal(context.restaurantId, temporalIntelligence);
        break;
      case 'trend':
        analysis = await this.trendLobe.analyzeWithTemporal(context.restaurantId, temporalIntelligence);
        break;
      default:
        analysis = await this.productLobe.analyzeWithTemporal(context.restaurantId, temporalIntelligence);
    }

    // Humanize traditional analysis
    const humanizedResponse = await this.humanizer.humanizeResponse(
      JSON.stringify(analysis),
      temporalIntelligence,
      {
        responseType: 'traditional_analysis',
        confidenceLevel: 'medium',
        processingSpeed: 'standard'
      }
    );

    return {
      success: true,
      response: humanizedResponse,
      metadata: {
        processingPath: 'traditional_lobes',
        primaryLobe: primaryLobe,
        processingTime: '1-3s',
        analysisData: analysis
      }
    };
  }

  // 🚀 CHOOSE PROCESSING PATH (Claude Model vs Traditional)
  chooseProcessingPath(query, temporalIntelligence, context) {
    // Prefer Claude Model for supported queries
    const claudeModelSupported = this.isClaudeModelSupported(query, temporalIntelligence);
    
    if (claudeModelSupported) {
      console.log('🧠 Claude Model path selected: Pre-calculated intelligence available');
      return 'claude_model';
    } else {
      console.log('🔄 Traditional path selected: Falling back to real-time analysis');
      return 'traditional';
    }
  }

  // 🔍 CHECK CLAUDE MODEL SUPPORT
  isClaudeModelSupported(query, temporalIntelligence) {
    // Claude Model supports yesterday queries (pre-calculated data)
    if (temporalIntelligence.timeframe?.type === 'yesterday') {
      return true;
    }

    // Claude Model supports today queries (if intelligence tables exist)
    if (temporalIntelligence.timeframe?.type === 'today') {
      return true; // We'll let IntelligentQueryRouter handle fallback
    }

    // For other timeframes, use traditional processing
    return false;
  }

  // 🎯 DETERMINE QUERY TYPE
  determineQueryType(query) {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('venta') || queryLower.includes('revenue') || queryLower.includes('dinero')) {
      return 'sales_analysis';
    }
    if (queryLower.includes('producto') || queryLower.includes('platillo') || queryLower.includes('estrella')) {
      return 'product_performance';
    }
    if (queryLower.includes('hora') || queryLower.includes('tiempo') || queryLower.includes('peak')) {
      return 'temporal_analysis';
    }
    if (queryLower.includes('pago') || queryLower.includes('transacci') || queryLower.includes('payment')) {
      return 'payment_analysis';
    }
    if (queryLower.includes('trend') || queryLower.includes('tendencia') || queryLower.includes('patron')) {
      return 'trend_analysis';
    }
    
    return 'general_analysis';
  }

  // 🎯 DETERMINE PRIMARY LOBE (for traditional processing)
  determinePrimaryLobe(query, temporalIntelligence) {
    const queryLower = query.toLowerCase();
    
    // Product-related queries
    if (queryLower.includes('producto') || queryLower.includes('platillo') || 
        queryLower.includes('estrella') || queryLower.includes('top') ||
        queryLower.includes('mejor') || queryLower.includes('vendido')) {
      return 'product';
    }
    
    // Payment-related queries
    if (queryLower.includes('pago') || queryLower.includes('dinero') || 
        queryLower.includes('revenue') || queryLower.includes('efectivo') ||
        queryLower.includes('tarjeta') || queryLower.includes('total')) {
      return 'payment';
    }
    
    // Trend-related queries
    if (queryLower.includes('tendencia') || queryLower.includes('patron') || 
        queryLower.includes('comparar') || queryLower.includes('vs') ||
        queryLower.includes('cambio') || queryLower.includes('diferencia')) {
      return 'trend';
    }
    
    // Default to product analysis
    return 'product';
  }

  // 🆘 ERROR RESPONSE GENERATION
  async generateErrorResponse(query, error) {
    console.log('🆘 Generating error response...');
    
    const errorResponse = "Lo siento, tuve un problema procesando tu consulta. ¿Podrías intentar de nuevo con una pregunta más específica?";
    
    const humanizedError = await this.humanizer.humanizeResponse(
      errorResponse,
      { timeframe: { type: 'unknown' } },
      {
        responseType: 'error',
        confidenceLevel: 'low'
      }
    );

    return {
      success: false,
      response: humanizedError,
      error: error.message,
      metadata: {
        processingPath: 'error_handling',
        originalQuery: query
      }
    };
  }

  // 🧪 TESTING UTILITIES
  async testClaudeModelIntegration() {
    console.log('🧪 Testing Claude Model integration...');
    
    const testQuery = "¿cuál fue mi platillo estrella ayer?";
    const testContext = {
      restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4',
      userId: 'test_user',
      restaurantName: 'Test Restaurant'
    };

    const result = await this.processQuery(testQuery, testContext);
    console.log('🧪 Test result:', result);
    
    return result;
  }

  // 📊 SYSTEM STATUS
  getSystemStatus() {
    return {
      brain: 'active',
      intelligenceProcessors: {
        queryRouter: this.intelligentQueryRouter ? 'active' : 'inactive',
        responseProcessor: this.intelligentResponseProcessor ? 'active' : 'inactive'
      },
      lobes: {
        product: this.productLobe ? 'active' : 'inactive',
        payment: this.paymentLobe ? 'active' : 'inactive',
        trend: this.trendLobe ? 'active' : 'inactive'
      },
      personality: {
        humanizer: this.humanizer ? 'active' : 'inactive'
      },
      architecture: 'claude_model_integrated'
    };
  }
}

module.exports = { FudiBrain };

// 🎯 USAGE EXAMPLE:
/*
const { FudiBrain } = require('./FudiBrain');

const brain = new FudiBrain(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Test Claude Model integration
const result = await brain.processQuery("¿cómo estuvieron las ventas ayer?", {
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4',
  userId: 'restaurant_owner'
});

console.log('FUDI Response:', result.response);
// Expected: "🌟 PQ2 UN POLLO ROSTIZADO dominó tu negocio..."
*/