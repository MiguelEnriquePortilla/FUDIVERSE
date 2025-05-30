// 🔧 FudiBrain.js - ENV VARIABLE NAME FIX

class FudiBrain {
  constructor(supabase, anthropic) {
    console.log('🧠 FudiBrain initializing with enhanced capabilities...');
    
    this.supabase = supabase;
    this.anthropic = anthropic;
    
    // 🔧 CORRECT ENVIRONMENT VARIABLE NAMES (match Vercel)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;  // ✅ CHANGED
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ✅ SAME
    
    console.log('🔍 Environment check:', {
      supabaseUrl: supabaseUrl ? 'Available' : 'Missing',
      supabaseKey: supabaseKey ? 'Available' : 'Missing'
    });
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing environment variables for enhanced analyzers');
      this.enhancedMode = false;
    } else {
      this.enhancedMode = true;
    }
    
    // Initialize enhanced analyzers with proper error handling
    try {
      if (this.enhancedMode) {
        console.log('🚀 Loading enhanced analyzers...');
        
        // Try to load enhanced versions
        try {
          const { EnhancedProductAnalyzer } = require('../intelligence/EnhancedProductAnalyzer');
          this.enhancedProductAnalyzer = new EnhancedProductAnalyzer(supabaseUrl, supabaseKey);
          console.log('✅ EnhancedProductAnalyzer loaded');
        } catch (e) {
          console.log('⚠️ EnhancedProductAnalyzer failed, using fallback:', e.message);
          this.enhancedProductAnalyzer = null;
        }
        
        try {
          const { BackgroundIntelligenceEngine } = require('../intelligence/BackgroundIntelligenceEngine');
          this.backgroundEngine = new BackgroundIntelligenceEngine();
          console.log('✅ BackgroundIntelligenceEngine loaded');
        } catch (e) {
          console.log('⚠️ BackgroundIntelligenceEngine failed:', e.message);
          this.backgroundEngine = null;
        }
        
        try {
          const { FudiLearningEngine } = require('../intelligence/FudiLearningEngine');
          this.learningEngine = new FudiLearningEngine(supabase);
          console.log('✅ FudiLearningEngine loaded');
        } catch (e) {
          console.log('⚠️ FudiLearningEngine failed:', e.message);
          this.learningEngine = null;
        }
      }
    } catch (error) {
      console.error('❌ Failed to load enhanced analyzers:', error.message);
      this.enhancedMode = false;
    }
    
    // Initialize core systems (always available)
    this.intelligenceCoordinator = new IntelligenceCoordinator(
      supabaseUrl,    // ✅ CHANGED
      supabaseKey
    );
    
    this.paymentAnalyzer = new PaymentAnalyzer(
      supabaseUrl,    // ✅ CHANGED
      supabaseKey
    );
    
    this.productAnalyzer = new ProductPerformanceAnalyzer(
      supabaseUrl,    // ✅ CHANGED
      supabaseKey
    );
    
    this.trendAnalyzer = new TrendAnalyzer(
      supabaseUrl,    // ✅ CHANGED
      supabaseKey
    );
    
    this.peakHourAnalyzer = new PeakHourAnalyzer(
      supabaseUrl,    // ✅ CHANGED
      supabaseKey
    );
    
    this.humanizer = new HumanizerUniversal();
    this.personalityCore = new PersonalityCore();
    
    // Working memory for conversation context
    this.workingMemory = new Map();
    
    console.log('🧠 FudiBrain fully initialized', {
      enhancedMode: this.enhancedMode,
      enhancedAnalyzers: {
        product: !!this.enhancedProductAnalyzer,
        background: !!this.backgroundEngine,
        learning: !!this.learningEngine
      }
    });
  }

  async process(message, restaurantId, conversationId = null) {
    console.log('🧠 FudiBrain: Neural processing initiated...');
    
    try {
      // 1. SENSORY PROCESSING
      const sensoryData = await this.processSensoryInput(message, {
        restaurantId,
        conversationId
      });
      
      // 2. MEMORY ACTIVATION
      const memories = await this.activateMemories(sensoryData, restaurantId);
      
      // 3. PARALLEL LOBE PROCESSING
      const analysis = await this.processInParallel(sensoryData, memories, restaurantId);
      
      // 4. NEURAL INTEGRATION
      const integratedResponse = await this.integrateNeuralOutputs(analysis);
      
      // 5. HUMANIZATION & RESPONSE
      const finalResponse = await this.generateFinalResponse(integratedResponse, sensoryData);
      
      // 6. LEARNING (if available)
      if (this.learningEngine) {
        try {
          await this.learningEngine.analyzeConversation(restaurantId, message, finalResponse);
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

  async processInParallel(sensoryData, memories, restaurantId) {
    console.log('🧠 Activating neural lobes in parallel...');
    
    const results = {};
    const promises = [];
    
    // Determine active lobes based on query intent
    const activeLobes = this.determineActiveLobes(sensoryData);
    console.log('⚡ Active lobes:', activeLobes);
    
    // INTELLIGENCE LOBE (Always active)
    if (activeLobes.includes('intelligence')) {
      promises.push(
        this.processIntelligenceLobe(sensoryData, memories, restaurantId).then(result => {
          results.intelligence = result;
        })
      );
    }
    
    // PRODUCT LOBE (Enhanced if available)
    if (activeLobes.includes('product')) {
      promises.push(
        this.processProductLobe(sensoryData, memories, restaurantId).then(result => {
          results.product = result;
        })
      );
    }
    
    // PAYMENT LOBE
    if (activeLobes.includes('payment')) {
      promises.push(
        this.processPaymentLobe(sensoryData, memories, restaurantId).then(result => {
          results.payment = result;
        })
      );
    }
    
    // TREND LOBE
    if (activeLobes.includes('trend')) {
      promises.push(
        this.processTrendLobe(sensoryData, memories, restaurantId).then(result => {
          results.trend = result;
        })
      );
    }
    
    // Wait for all lobes to complete
    await Promise.all(promises);
    
    console.log('🧠 Neural processing complete. Results:', Object.keys(results));
    return results;
  }

  async processProductLobe(sensoryData, memories, restaurantId) {
    console.log('🍽️ ProductLobe: Starting analysis...');
    
    try {
      // Try enhanced analyzer first
      if (this.enhancedProductAnalyzer) {
        console.log('🚀 Using EnhancedProductAnalyzer...');
        const result = await this.enhancedProductAnalyzer.analyze(restaurantId, 30);
        
        if (result && result.success) {
          console.log('✅ Enhanced product analysis successful');
          return {
            type: 'enhanced_product',
            success: true,
            data: result.data,
            insights: result.insights,
            confidence: result.confidence || 0.9,
            source: 'enhanced_analyzer'
          };
        }
      }
      
      // Fallback to regular analyzer
      console.log('🔄 Using regular ProductAnalyzer...');
      const result = await this.productAnalyzer.analyze(restaurantId, 30);
      
      return {
        type: 'product_standard',
        success: result.success,
        data: result.data,
        insights: result.insights,
        confidence: 0.7,
        source: 'standard_analyzer'
      };
      
    } catch (error) {
      console.error('❌ ProductLobe error:', error);
      return {
        type: 'product_error',
        success: false,
        error: error.message,
        fallback: 'neural_thinking_required'
      };
    }
  }

  // Keep all other methods the same...
  determineActiveLobes(sensoryData) {
    const message = sensoryData.message.toLowerCase();
    const activeLobes = ['intelligence']; // Intelligence coordinator always active
    
    // Product-related queries
    if (message.includes('producto') || message.includes('platillo') || 
        message.includes('comida') || message.includes('menú') ||
        message.includes('estrella') || message.includes('vendido') ||
        message.includes('popular')) {
      activeLobes.push('product');
    }
    
    // Payment-related queries
    if (message.includes('pago') || message.includes('dinero') || 
        message.includes('efectivo') || message.includes('tarjeta') ||
        message.includes('transaccion') || message.includes('venta')) {
      activeLobes.push('payment');
    }
    
    // Trend-related queries
    if (message.includes('tendencia') || message.includes('comparar') ||
        message.includes('crecer') || message.includes('subir') ||
        message.includes('bajar') || message.includes('cambio')) {
      activeLobes.push('trend');
    }
    
    return activeLobes;
  }

  async generateFinalResponse(integratedResponse, sensoryData) {
    console.log('🎭 Generating final response...');
    
    try {
      // Check if we have real insights to humanize
      if (integratedResponse.insights && integratedResponse.insights.length > 0) {
        console.log('🪄 Using Humanizer Universal...');
        
        let humanizedResponse = this.humanizer.humanize(integratedResponse.insights, {
          type: integratedResponse.primaryType || 'general',
          confidence: integratedResponse.confidence || 0.8,
          source: integratedResponse.source || 'neural_analysis'
        });
        
        // Add quantum separator
        humanizedResponse += '\n\n---\n\n';
        
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

  // ... rest of methods remain the same
  
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

  activateMemories(sensoryData, restaurantId) {
    // Simple memory activation for now
    return {
      workingMemory: this.workingMemory.get(restaurantId) || {},
      conversationContext: sensoryData,
      restaurantProfile: { id: restaurantId }
    };
  }

  detectIntent(message) {
    const lower = message.toLowerCase();
    if (lower.includes('platillo') || lower.includes('producto') || lower.includes('estrella')) {
      return 'product_inquiry';
    }
    if (lower.includes('pago') || lower.includes('dinero')) {
      return 'payment_inquiry';
    }
    return 'general_inquiry';
  }

  detectEmotion(message) {
    return 'neutral'; // Simple for now
  }

  async processIntelligenceLobe(sensoryData, memories, restaurantId) {
    try {
      const result = await this.intelligenceCoordinator.analyzeQuery(
        sensoryData.message,
        restaurantId
      );
      
      return {
        type: 'intelligence',
        success: result.success,
        data: result.data,
        insights: result.insights,
        confidence: 0.8
      };
    } catch (error) {
      console.error('❌ Intelligence lobe error:', error);
      return {
        type: 'intelligence_error',
        success: false,
        error: error.message
      };
    }
  }

  async processPaymentLobe(sensoryData, memories, restaurantId) {
    try {
      const result = await this.paymentAnalyzer.analyze(restaurantId, 30);
      
      return {
        type: 'payment',
        success: result.success,
        data: result.data,
        insights: result.insights,
        confidence: 0.8
      };
    } catch (error) {
      console.error('❌ Payment lobe error:', error);
      return {
        type: 'payment_error',
        success: false,
        error: error.message
      };
    }
  }

  async processTrendLobe(sensoryData, memories, restaurantId) {
    try {
      const result = await this.trendAnalyzer.analyze(restaurantId, 30);
      
      return {
        type: 'trend',
        success: result.success,
        data: result.data,
        insights: result.insights,
        confidence: 0.8
      };
    } catch (error) {
      console.error('❌ Trend lobe error:', error);
      return {
        type: 'trend_error',
        success: false,
        error: error.message
      };
    }
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
          source = result.source || 'analyzer';
        }
      }
    });

    return {
      insights,
      primaryType,
      confidence,
      source,
      analysisCount: Object.keys(analysis).length
    };
  }

  async generateNeuralThinking(analysis, sensoryData) {
    console.log('🧠 FudiBrain: Engaging neural thinking mode...');
    
    const { generateText } = require('ai');
    
    try {
      const { text } = await generateText({
        model: this.anthropic('claude-3-5-sonnet-20241022'),
        system: `Eres FUDI, consultor de restaurantes con personalidad de Anthony Bourdain. 
        Responde de manera directa, específica y con datos reales cuando estén disponibles.
        Tono: 95% español mexicano, conversacional pero profesional.`,
        prompt: `Pregunta del usuario: ${sensoryData.message}
        
        Contexto del análisis: ${JSON.stringify(analysis, null, 2)}
        
        Responde como FUDI con insights específicos basados en los datos disponibles.`,
        temperature: 0.7,
        maxTokens: 1000,
      });
      
      // Add quantum separator
      return text + '\n\n---\n\n';
      
    } catch (error) {
      console.error('❌ Neural thinking error:', error);
      return this.generateErrorResponse(error);
    }
  }

  generateConversationId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getNeuralActivitySummary(analysis) {
    return {
      activeLobes: Object.keys(analysis),
      enhancedMode: this.enhancedMode,
      enhancedAnalyzers: {
        product: !!this.enhancedProductAnalyzer,
        background: !!this.backgroundEngine,
        learning: !!this.learningEngine
      },
      confidence: Math.max(...Object.values(analysis).map(a => a.confidence || 0.5)),
      processingMode: this.enhancedMode ? 'enhanced_neural_network' : 'standard_neural_network'
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
        fallbackMode: true
      }
    };
  }

  generateErrorResponse(error) {
    return `**Procesamiento interrumpido temporalmente. ¿Intentamos de nuevo?**

*Debug: ${error.message}*

---

`;
  }
}

module.exports = FudiBrain;