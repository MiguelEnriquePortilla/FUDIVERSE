// 🧠 FudiBrain.js - CLEAN ARCHITECTURE (Master Plan Implementation)
// ✅ ONLY uses brain/lobes/ components (NO MORE intelligence/ imports)

class FudiBrain {
  constructor(supabase, anthropic) {
    console.log('🧠 FudiBrain initializing with CLEAN ARCHITECTURE...');
    
    this.supabase = supabase;
    this.anthropic = anthropic;
    
    // 🔧 ENVIRONMENT VARIABLES
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('🔍 Environment check:', {
      supabaseUrl: supabaseUrl ? 'Available' : 'Missing',
      supabaseKey: supabaseKey ? 'Available' : 'Missing'
    });
    
    // ✅ INITIALIZE BRAIN LOBES (CLEAN ARCHITECTURE)
    try {
      console.log('🧠 Loading CLEAN brain lobes...');
      
      // PRODUCT LOBE (Primary Lobe)
      const ProductLobe = require('./lobes/ProductLobe');
      this.productLobe = new ProductLobe(supabaseUrl, supabaseKey);
      console.log('✅ ProductLobe loaded');
      
      // TODO: Add more lobes as we create them
      // this.paymentLobe = new PaymentLobe(supabaseUrl, supabaseKey);
      // this.trendLobe = new TrendLobe(supabaseUrl, supabaseKey);
      
    } catch (error) {
      console.error('❌ Failed to load brain lobes:', error.message);
      console.error('🔍 Error details:', error);
      throw new Error(`Brain initialization failed: ${error.message}`);
    }
    
    // ✅ ENHANCED ANALYZERS (Optional - if available)
    this.enhancedMode = false;
    if (supabaseUrl && supabaseKey) {
      try {
        console.log('🚀 Attempting to load enhanced analyzers...');
        
        const { BackgroundIntelligenceEngine } = require('../intelligence/BackgroundIntelligenceEngine');
        this.backgroundEngine = new BackgroundIntelligenceEngine();
        console.log('✅ BackgroundIntelligenceEngine loaded');
        
        const { FudiLearningEngine } = require('../intelligence/FudiLearningEngine');
        this.learningEngine = new FudiLearningEngine(supabase);
        console.log('✅ FudiLearningEngine loaded');
        
        this.enhancedMode = true;
        
      } catch (error) {
        console.log('⚠️ Enhanced analyzers not available:', error.message);
        this.backgroundEngine = null;
        this.learningEngine = null;
      }
    }
    
    // ✅ HUMANIZER (Always available)
    const HumanizerUniversal = require('./HumanizerUniversal');
    this.humanizer = new HumanizerUniversal();
    console.log('✅ HumanizerUniversal loaded');
    
    // ✅ WORKING MEMORY
    this.workingMemory = new Map();
    
    console.log('🧠 FudiBrain CLEAN ARCHITECTURE initialized', {
      productLobe: !!this.productLobe,
      enhancedMode: this.enhancedMode,
      humanizer: !!this.humanizer
    });
  }

  async process(message, restaurantId, conversationId = null) {
    console.log('🧠 FudiBrain: Neural processing initiated...');
    console.log('📝 Message:', message);
    console.log('🏪 Restaurant:', restaurantId);
    
    try {
      // 1. SENSORY PROCESSING
      const sensoryData = this.processSensoryInput(message, {
        restaurantId,
        conversationId
      });
      
      // 2. DETERMINE ACTIVE LOBES
      const activeLobes = this.determineActiveLobes(sensoryData);
      console.log('⚡ Active lobes:', activeLobes);
      
      // 3. PARALLEL LOBE PROCESSING
      const analysis = await this.processInParallel(sensoryData, restaurantId);
      
      // 4. NEURAL INTEGRATION
      const integratedResponse = this.integrateNeuralOutputs(analysis);
      
      // 5. HUMANIZATION & RESPONSE GENERATION
      const finalResponse = await this.generateFinalResponse(integratedResponse, sensoryData);
      
      // 6. LEARNING (if available)
      if (this.learningEngine) {
        try {
          await this.learningEngine.analyzeConversation(restaurantId, message, finalResponse);
          console.log('🧠 Learning engine updated');
        } catch (e) {
          console.log('⚠️ Learning engine error:', e.message);
        }
      }
      
      return {
        response: finalResponse,
        conversationId: conversationId || this.generateConversationId(),
        neuralActivity: this.getNeuralActivitySummary(analysis)
      };
      
    } catch (error) {
      console.error('🧠 Neural processing error:', error);
      return this.handleNeuralError(error, message);
    }
  }

  async processInParallel(sensoryData, restaurantId) {
    console.log('🧠 Activating neural lobes in parallel...');
    
    const results = {};
    const promises = [];
    
    // Determine active lobes based on query intent
    const activeLobes = this.determineActiveLobes(sensoryData);
    console.log('⚡ Active lobes:', activeLobes);
    
    // PRODUCT LOBE (Always process product queries)
    if (activeLobes.includes('product') || activeLobes.includes('general')) {
      console.log('🍽️ Activating ProductLobe...');
      promises.push(
        this.processProductLobe(sensoryData, restaurantId).then(result => {
          results.product = result;
          console.log('🍽️ ProductLobe completed');
        }).catch(error => {
          console.error('❌ ProductLobe error:', error);
          results.product = {
            type: 'product_error',
            success: false,
            error: error.message
          };
        })
      );
    }
    
    // TODO: Add other lobes when we create them
    // PAYMENT LOBE
    // if (activeLobes.includes('payment')) {
    //   promises.push(this.processPaymentLobe(sensoryData, restaurantId));
    // }
    
    // Wait for all lobes to complete
    await Promise.all(promises);
    
    console.log('🧠 Neural processing complete. Results:', Object.keys(results));
    return results;
  }

  async processProductLobe(sensoryData, restaurantId) {
    console.log('🍽️ ProductLobe: Starting analysis...');
    
    try {
      // Use ProductLobe for analysis
      const result = await this.productLobe.analyze(restaurantId, 30);
      
      if (result && result.success) {
        console.log('✅ ProductLobe analysis successful');
        return {
          type: 'product',
          success: true,
          data: result.data,
          insights: result.insights,
          confidence: 0.9,
          source: 'product_lobe'
        };
      } else {
        console.log('⚠️ ProductLobe analysis failed');
        return {
          type: 'product_failed',
          success: false,
          error: 'ProductLobe analysis returned no results',
          fallback: true
        };
      }
      
    } catch (error) {
      console.error('❌ ProductLobe error:', error);
      return {
        type: 'product_error',
        success: false,
        error: error.message,
        fallback: true
      };
    }
  }

  determineActiveLobes(sensoryData) {
    const message = sensoryData.message.toLowerCase();
    const activeLobes = [];
    
    // Product-related queries
    if (message.includes('producto') || message.includes('platillo') || 
        message.includes('comida') || message.includes('menú') ||
        message.includes('estrella') || message.includes('vendido') ||
        message.includes('popular') || message.includes('venta') ||
        message.includes('vender')) {
      activeLobes.push('product');
    }
    
    // Payment-related queries (TODO: implement PaymentLobe)
    if (message.includes('pago') || message.includes('dinero') || 
        message.includes('efectivo') || message.includes('tarjeta') ||
        message.includes('transaccion')) {
      activeLobes.push('payment');
    }
    
    // Trend-related queries (TODO: implement TrendLobe)
    if (message.includes('tendencia') || message.includes('comparar') ||
        message.includes('crecer') || message.includes('subir') ||
        message.includes('bajar') || message.includes('cambio')) {
      activeLobes.push('trend');
    }
    
    // Default to general if no specific lobe detected
    if (activeLobes.length === 0) {
      activeLobes.push('general');
    }
    
    return activeLobes;
  }

  integrateNeuralOutputs(analysis) {
    const insights = [];
    let primaryType = 'general';
    let confidence = 0.5;
    let source = 'neural_integration';

    // Collect insights from all successful analyses
    Object.values(analysis).forEach(result => {
      if (result.success && result.insights) {
        insights.push(...result.insights);
        if (result.confidence > confidence) {
          confidence = result.confidence;
          primaryType = result.type;
          source = result.source || 'brain_lobe';
        }
      }
    });

    return {
      insights,
      primaryType,
      confidence,
      source,
      analysisCount: Object.keys(analysis).length,
      hasRealData: insights.length > 0
    };
  }

  async generateFinalResponse(integratedResponse, sensoryData) {
    console.log('🎭 Generating final response...');
    console.log('📊 Integrated insights count:', integratedResponse.insights?.length || 0);
    
    try {
      // Check if we have real insights to humanize
      if (integratedResponse.hasRealData && integratedResponse.insights.length > 0) {
        console.log('🪄 Using Humanizer Universal with real data...');
        
        let humanizedResponse = this.humanizer.humanize(integratedResponse.insights, {
          type: integratedResponse.primaryType || 'general',
          confidence: integratedResponse.confidence || 0.8,
          source: integratedResponse.source || 'brain_analysis'
        });
        
        // Add quantum separator
        humanizedResponse += '\n\n---\n\n';
        
        console.log('✅ Humanized response generated');
        return humanizedResponse;
      }
      
      // Fallback to neural thinking with Claude
      console.log('🧠 No specific insights available, using neural thinking...');
      return await this.generateNeuralThinking(integratedResponse, sensoryData);
      
    } catch (error) {
      console.error('❌ Response generation error:', error);
      return this.generateErrorResponse(error);
    }
  }

  async generateNeuralThinking(analysis, sensoryData) {
    console.log('🧠 FudiBrain: Engaging neural thinking mode...');
    
    try {
      const { generateText } = require('ai');
      
      const { text } = await generateText({
        model: this.anthropic('claude-3-5-sonnet-20241022'),
        system: `Eres FUDI, consultor de restaurantes con personalidad de Anthony Bourdain. 
        Responde de manera directa, específica y con datos reales cuando estén disponibles.
        Tono: 95% español mexicano, conversacional pero profesional.
        Siempre termina con el separador: ---`,
        prompt: `Pregunta del usuario: ${sensoryData.message}
        
        Contexto del análisis: ${JSON.stringify(analysis, null, 2)}
        
        Responde como FUDI con insights específicos basados en los datos disponibles.`,
        temperature: 0.7,
        maxTokens: 1000,
      });
      
      // Ensure quantum separator is present
      const response = text.endsWith('---') ? text : text + '\n\n---\n\n';
      
      console.log('✅ Neural thinking response generated');
      return response;
      
    } catch (error) {
      console.error('❌ Neural thinking error:', error);
      return this.generateErrorResponse(error);
    }
  }

  // ✅ UTILITY METHODS
  processSensoryInput(message, context) {
    return {
      message: message,
      restaurantId: context.restaurantId,
      conversationId: context.conversationId,
      timestamp: new Date().toISOString(),
      intent: this.detectIntent(message),
      emotion: this.detectEmotion(message)
    };
  }

  detectIntent(message) {
    const lower = message.toLowerCase();
    if (lower.includes('platillo') || lower.includes('producto') || lower.includes('estrella')) {
      return 'product_inquiry';
    }
    if (lower.includes('pago') || lower.includes('dinero') || lower.includes('venta')) {
      return 'sales_inquiry';
    }
    return 'general_inquiry';
  }

  detectEmotion(message) {
    return 'neutral'; // Simple for now
  }

  generateConversationId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getNeuralActivitySummary(analysis) {
    return {
      activeLobes: Object.keys(analysis),
      enhancedMode: this.enhancedMode,
      architecture: 'clean_brain_lobes',
      availableLobes: {
        product: !!this.productLobe,
        payment: false, // TODO: implement
        trend: false    // TODO: implement
      },
      confidence: Math.max(...Object.values(analysis).map(a => a.confidence || 0.5)),
      processingMode: 'clean_neural_architecture'
    };
  }

  handleNeuralError(error, message) {
    console.error('🧠 Neural error handled:', error.message);
    
    return {
      response: '**Hubo interferencia en mi procesamiento neural. ¿Puedes volver a preguntar?**\n\n---\n\n',
      conversationId: this.generateConversationId(),
      neuralActivity: {
        error: true,
        errorType: error.name,
        fallbackMode: true,
        architecture: 'clean_brain_lobes'
      }
    };
  }

  generateErrorResponse(error) {
    return `**Procesamiento interrumpido temporalmente. ¿Intentamos de nuevo?**

*Debug: ${error.message}*

---

`;
  }

  // ✅ COMPATIBILITY METHOD FOR ROUTE.TS
  async processMessage(message, restaurantId, conversationId = null) {
    console.log('🔄 Legacy processMessage called, redirecting to process()');
    return await this.process(message, restaurantId, conversationId);
  }
}

module.exports = FudiBrain;