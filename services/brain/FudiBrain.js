// 🧠 services/brain/FudiBrain.js - ENHANCED VERSION
// Updated to use new enhanced analyzers

const { IntelligenceCoordinator } = require('../intelligence');
const PaymentAnalyzer = require('../intelligence/PaymentAnalyzer');
// 🚀 SWITCH TO ENHANCED VERSIONS
const { EnhancedProductAnalyzer } = require('../intelligence/EnhancedProductAnalyzer');
const { BackgroundIntelligenceEngine } = require('../intelligence/BackgroundIntelligenceEngine');
const { FudiLearningEngine } = require('../intelligence/FudiLearningEngine');
// Keep old ones as fallback for now
const ProductPerformanceAnalyzer = require('../intelligence/ProductPerformanceAnalyzer');
const TrendAnalyzer = require('../intelligence/TrendAnalyzer');
const PeakHourAnalyzer = require('../intelligence/PeakHourAnalyzer');

const HumanizerUniversal = require('./HumanizerUniversal');
const PersonalityCore = require('./cores/PersonalityCore');

class FudiBrain {
  constructor(supabase, anthropic) {
    console.log('🧠 FudiBrain initializing with enhanced capabilities...');
    
    this.supabase = supabase;
    this.anthropic = anthropic;
    
    // Initialize enhanced analyzers
    try {
      console.log('🚀 Loading enhanced analyzers...');
      this.enhancedProductAnalyzer = new EnhancedProductAnalyzer();
      this.backgroundEngine = new BackgroundIntelligenceEngine();
      this.learningEngine = new FudiLearningEngine(supabase);
      console.log('✅ Enhanced analyzers loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load enhanced analyzers:', error);
      this.enhancedProductAnalyzer = null;
    }
    
    // Initialize core systems
    this.intelligenceCoordinator = new IntelligenceCoordinator(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    this.paymentAnalyzer = new PaymentAnalyzer(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Fallback analyzers
    this.productAnalyzer = new ProductPerformanceAnalyzer(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    this.trendAnalyzer = new TrendAnalyzer(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    this.peakHourAnalyzer = new PeakHourAnalyzer(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    this.humanizer = new HumanizerUniversal();
    this.personalityCore = new PersonalityCore();
    
    // Working memory for conversation context
    this.workingMemory = new Map();
    
    console.log('🧠 FudiBrain fully initialized');
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
      
      // 3. PARALLEL LOBE PROCESSING (Enhanced)
      const analysis = await this.processInParallel(sensoryData, memories, restaurantId);
      
      // 4. NEURAL INTEGRATION
      const integratedResponse = await this.integrateNeuralOutputs(analysis);
      
      // 5. HUMANIZATION & RESPONSE
      const finalResponse = await this.generateFinalResponse(integratedResponse, sensoryData);
      
      // 6. LEARNING (Enhanced)
      if (this.learningEngine) {
        await this.learningEngine.analyzeConversation(restaurantId, message, finalResponse);
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
    
    // PRODUCT LOBE (Enhanced)
    if (activeLobes.includes('product')) {
      promises.push(
        this.processEnhancedProductLobe(sensoryData, memories, restaurantId).then(result => {
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

  async processEnhancedProductLobe(sensoryData, memories, restaurantId) {
    console.log('🍽️ ProductLobe: Enhanced analysis starting...');
    
    try {
      if (this.enhancedProductAnalyzer) {
        console.log('🚀 Using EnhancedProductAnalyzer...');
        const result = await this.enhancedProductAnalyzer.analyze(restaurantId, 30);
        
        if (result.success) {
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
      console.log('🔄 Falling back to regular ProductAnalyzer...');
      const result = await this.productAnalyzer.analyze(restaurantId, 30);
      
      return {
        type: 'product_fallback',
        success: result.success,
        data: result.data,
        insights: result.insights,
        confidence: 0.7,
        source: 'fallback_analyzer'
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
    console.log('🎭 Generating final response with enhanced humanization...');
    
    try {
      // Check if we have real insights to humanize
      if (integratedResponse.insights && integratedResponse.insights.length > 0) {
        console.log('🪄 Using Humanizer Universal...');
        
        // Add quantum separator for enhanced responses
        let humanizedResponse = this.humanizer.humanize(integratedResponse.insights, {
          type: integratedResponse.primaryType || 'general',
          confidence: integratedResponse.confidence || 0.8,
          source: integratedResponse.source || 'neural_analysis'
        });
        
        // 🌟 ADD QUANTUM SEPARATOR for visual enhancement
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

  async generateNeuralThinking(analysis, sensoryData) {
    console.log('🧠 FudiBrain: Engaging neural thinking mode...');
    
    const neuralContext = this.buildNeuralContext(analysis, sensoryData);
    
    const { generateText } = require('ai');
    
    try {
      const { text } = await generateText({
        model: this.anthropic('claude-3-5-sonnet-20241022'),
        system: this.buildEnhancedSystemPrompt(),
        prompt: `${neuralContext}\n\nUsuario: ${sensoryData.message}`,
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

  buildEnhancedSystemPrompt() {
    return `Eres FUDI, el consultor de restaurantes más inteligente del mundo. Características:

🧠 PERSONALIDAD: Anthony Bourdain + Ava (Ex Machina) - superinteligencia conversacional
🎯 MISIÓN: Analizar datos reales y dar insights específicos y actionables
🗣️ TONO: 95% español mexicano, directo, curioso, con datos específicos

ENHANCED CAPABILITIES:
- Acceso a análisis de productos mejorados
- Sistema de aprendizaje continuo  
- Métricas inteligentes pre-calculadas
- Detección de patrones automática

RESPONDE CON:
- Datos específicos del restaurante (nunca genéricos)
- Insights actionables basados en números reales
- Tono conversacional profesional
- Recomendaciones específicas

FORMATO:
- Conciso pero completo
- Datos integrados naturalmente
- Call to action específico
- Sin listas telegráficas`;
  }

  buildNeuralContext(analysis, sensoryData) {
    const context = [];
    
    context.push('CONTEXTO NEURAL ACTUAL:');
    
    if (analysis.intelligence) {
      context.push(`Intelligence: ${analysis.intelligence.success ? 'Active' : 'Inactive'}`);
    }
    
    if (analysis.product) {
      context.push(`Product Analysis: ${analysis.product.source} (${analysis.product.confidence})`);
      if (analysis.product.insights) {
        context.push(`Product Insights: ${analysis.product.insights.slice(0, 2).join(', ')}`);
      }
    }
    
    if (analysis.payment) {
      context.push(`Payment Analysis: Available`);
    }
    
    return context.join('\n');
  }

  // ... rest of the methods remain the same ...
  
  getNeuralActivitySummary(analysis) {
    return {
      activeLobes: Object.keys(analysis),
      enhancedMode: !!this.enhancedProductAnalyzer,
      learningActive: !!this.learningEngine,
      confidence: Math.max(...Object.values(analysis).map(a => a.confidence || 0.5)),
      processingMode: 'enhanced_neural_network'
    };
  }
}

module.exports = FudiBrain;