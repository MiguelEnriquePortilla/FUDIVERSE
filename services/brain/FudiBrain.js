// services/brain/FudiBrain.js
// 🧠 FUDI NEURAL BRAIN - Main Orchestrator

const { IntelligenceCoordinator } = require('../intelligence');
const PaymentAnalyzer = require('../intelligence/PaymentAnalyzer');
const ProductPerformanceAnalyzer = require('../intelligence/ProductPerformanceAnalyzer');
const TrendAnalyzer = require('../intelligence/TrendAnalyzer');
const PeakHourAnalyzer = require('../intelligence/PeakHourAnalyzer');

class FudiBrain {
  constructor(supabaseUrl, supabaseKey, anthropicApiKey) {
    console.log('🧠 FudiBrain: Initializing neural network...');
    
    // Store configuration
    this.config = {
      supabaseUrl,
      supabaseKey,
      anthropicApiKey
    };
    
    // Initialize existing analyzers (our neural lobes)
    this.initializeNeuralLobes();
    
    // Initialize new neural components
    this.initializeNeuralCores();
    
    console.log('🧠 FudiBrain: Neural network online!');
  }

  initializeNeuralLobes() {
    console.log('🧠 Initializing neural lobes...');
    
    // 🧠 Intelligence Coordinator (Central nervous system)
    this.intelligenceCoordinator = new IntelligenceCoordinator(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // 💳 Payment Lobe (Financial cortex)
    this.paymentLobe = new PaymentAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // 🍽️ Product Lobe (Menu cortex)
    this.productLobe = new ProductPerformanceAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // 📈 Trend Lobe (Pattern recognition cortex)
    this.trendLobe = new TrendAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // ⏰ Peak Hour Lobe (Temporal cortex)
    this.peakHourLobe = new PeakHourAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
  }

  initializeNeuralCores() {
    console.log('🧠 Initializing neural cores...');
    
    // 🎭 Simple personality for now (will expand)
    this.personalityCore = {
      currentMood: 'analytical',
      traits: {
        enthusiasm: 0.8,
        helpfulness: 0.9,
        directness: 0.7,
        empathy: 0.6
      }
    };
    
    // 💾 Simple memory system (will expand)
    this.memorySystem = {
      workingMemory: new Map(),
      conversationContext: new Map()
    };
  }

  async processMessage(message, restaurantId, conversationId) {
    console.log(`🧠 FudiBrain: Processing message for restaurant ${restaurantId}`);
    console.log(`💬 Message: "${message}"`);
    
    try {
      // 1. SENSORY PROCESSING (Analyze input)
      const sensoryData = await this.processSensoryInput(message, restaurantId);
      
      // 2. MEMORY ACTIVATION (Context)
      const memories = await this.activateMemories(sensoryData, conversationId);
      
      // 3. NEURAL LOBE PROCESSING (Analysis)
      const analysis = await this.processNeuralLobes(sensoryData, memories);
      
      // 4. PERSONALITY FILTERING (Tone & Style)
      const personalizedResponse = await this.applyPersonality(analysis, sensoryData);
      
      // 5. RESPONSE GENERATION (Output)
      const finalResponse = await this.generateResponse(personalizedResponse);
      
      // 6. MEMORY CONSOLIDATION (Learning)
      await this.consolidateMemories(sensoryData, analysis, finalResponse, conversationId);
      
      return finalResponse;
      
    } catch (error) {
      console.error('🧠 Neural processing error:', error);
      return this.generateErrorResponse(error);
    }
  }

  async processSensoryInput(message, restaurantId) {
    console.log('👁️ SensoryCortex: Processing input...');
    
    const sensoryData = {
      originalMessage: message,
      restaurantId: restaurantId,
      timestamp: new Date(),
      
      // Basic intent detection
      intent: this.detectIntent(message),
      
      // Basic emotion detection
      emotion: this.detectEmotion(message),
      
      // Topic classification
      topics: this.classifyTopics(message)
    };
    
    console.log('👁️ Sensory analysis:', sensoryData);
    return sensoryData;
  }

  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ventas') || lowerMessage.includes('dinero') || lowerMessage.includes('ingresos')) {
      return 'sales_inquiry';
    }
    if (lowerMessage.includes('platillo') || lowerMessage.includes('producto') || lowerMessage.includes('menú')) {
      return 'product_inquiry';
    }
    if (lowerMessage.includes('pago') || lowerMessage.includes('efectivo') || lowerMessage.includes('tarjeta')) {
      return 'payment_inquiry';
    }
    if (lowerMessage.includes('tendencia') || lowerMessage.includes('comparar') || lowerMessage.includes('análisis')) {
      return 'trend_inquiry';
    }
    if (lowerMessage.includes('hora') || lowerMessage.includes('pico') || lowerMessage.includes('rush')) {
      return 'time_inquiry';
    }
    
    return 'general_inquiry';
  }

  detectEmotion(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.match(/problema|mal|perdiendo|cayó|bajó|crisis|preocupa/)) {
      return 'concern';
    }
    if (lowerMessage.match(/bien|excelente|subiendo|ganando|éxito|increíble/)) {
      return 'positive';
    }
    if (lowerMessage.match(/urgente|ahora|ya|rápido|ayuda|necesito/)) {
      return 'urgent';
    }
    
    return 'neutral';
  }

  classifyTopics(message) {
    const topics = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ventas') || lowerMessage.includes('dinero')) topics.push('sales');
    if (lowerMessage.includes('producto') || lowerMessage.includes('platillo')) topics.push('products');
    if (lowerMessage.includes('pago') || lowerMessage.includes('efectivo')) topics.push('payments');
    if (lowerMessage.includes('hora') || lowerMessage.includes('tiempo')) topics.push('time');
    if (lowerMessage.includes('cliente') || lowerMessage.includes('mesero')) topics.push('people');
    
    return topics.length > 0 ? topics : ['general'];
  }

  async activateMemories(sensoryData, conversationId) {
    console.log('💾 MemorySystem: Activating memories...');
    
    // Simple memory system for now
    const memories = {
      conversationHistory: this.memorySystem.conversationContext.get(conversationId) || [],
      restaurantContext: await this.getRestaurantContext(sensoryData.restaurantId),
      relevantPatterns: this.findRelevantPatterns(sensoryData)
    };
    
    return memories;
  }

  async getRestaurantContext(restaurantId) {
    // For now, return basic context
    return {
      restaurantId: restaurantId,
      lastAnalysisTime: new Date(),
      knownPatterns: []
    };
  }

  findRelevantPatterns(sensoryData) {
    // For now, return empty - will expand later
    return [];
  }

  async processNeuralLobes(sensoryData, memories) {
    console.log('⚡ Neural Lobes: Processing in parallel...');
    
    const results = {};
    
    // Determine which lobes to activate based on intent
    const activeLobes = this.determineActiveLobes(sensoryData.intent, sensoryData.topics);
    
    // Process with active lobes in parallel
    const lobePromises = [];
    
    if (activeLobes.includes('intelligence')) {
      lobePromises.push(
        this.processIntelligenceLobe(sensoryData, memories).then(result => {
          results.intelligence = result;
        })
      );
    }
    
    if (activeLobes.includes('payment')) {
      lobePromises.push(
        this.processPaymentLobe(sensoryData, memories).then(result => {
          results.payment = result;
        })
      );
    }
    
    if (activeLobes.includes('product')) {
      lobePromises.push(
        this.processProductLobe(sensoryData, memories).then(result => {
          results.product = result;
        })
      );
    }
    
    // Wait for all active lobes to complete
    await Promise.all(lobePromises);
    
    console.log('⚡ Neural processing complete:', Object.keys(results));
    return results;
  }

  determineActiveLobes(intent, topics) {
    const activeLobes = ['intelligence']; // Intelligence coordinator always active
    
    if (intent === 'payment_inquiry' || topics.includes('payments')) {
      activeLobes.push('payment');
    }
    
    if (intent === 'product_inquiry' || topics.includes('products')) {
      activeLobes.push('product');
    }
    
    if (intent === 'sales_inquiry' || topics.includes('sales')) {
      activeLobes.push('payment', 'product'); // Sales needs both
    }
    
    if (intent === 'trend_inquiry') {
      activeLobes.push('trend');
    }
    
    if (intent === 'time_inquiry') {
      activeLobes.push('peakHour');
    }
    
    return [...new Set(activeLobes)]; // Remove duplicates
  }

  async processIntelligenceLobe(sensoryData, memories) {
    console.log('🧠 Intelligence Lobe: Processing...');
    
    try {
      const result = await this.intelligenceCoordinator.analyzeQuery(
        sensoryData.originalMessage,
        sensoryData.restaurantId
      );
      
      return {
        type: 'intelligence',
        success: true,
        data: result
      };
    } catch (error) {
      console.error('🧠 Intelligence Lobe error:', error);
      return {
        type: 'intelligence',
        success: false,
        error: error.message
      };
    }
  }

  async processPaymentLobe(sensoryData, memories) {
    console.log('💳 Payment Lobe: Processing...');
    console.log('💳 PaymentLobe result:', JSON.stringify(result, null, 2));
    
    try {
      const result = await this.paymentLobe.analyze(sensoryData.restaurantId, 30);
      console.log('💳 PaymentLobe result:', JSON.stringify(result, null, 2));
      return {
        type: 'payment',
        success: true,
        data: result
      };
    } catch (error) {
      console.error('💳 Payment Lobe error:', error);
      return {
        type: 'payment',
        success: false,
        error: error.message
      };
    }
  }

  async processProductLobe(sensoryData, memories) {
    console.log('🍽️ Product Lobe: Processing...');
    
    try {
      const result = await this.productLobe.analyze(
        sensoryData.restaurantId,
        30 // días
      );

      return {
        type: 'product',
        success: true,
        data: result
      };
    } catch (error) {
      console.error('🍽️ Product Lobe error:', error);
      return {
        type: 'product',
        success: false,
        error: error.message
      };
    }
  }

  async applyPersonality(analysis, sensoryData) {
    console.log('🎭 PersonalityCore: Applying personality filter...');
    
    // Simple personality application for now
    const personalizedAnalysis = {
      ...analysis,
      tone: this.determineTone(sensoryData.emotion),
      enthusiasm: this.personalityCore.traits.enthusiasm,
      directness: this.personalityCore.traits.directness
    };
    
    return personalizedAnalysis;
  }

  determineTone(emotion) {
    switch (emotion) {
      case 'concern':
        return 'empathetic';
      case 'positive':
        return 'enthusiastic';
      case 'urgent':
        return 'action-oriented';
      default:
        return 'professional';
    }
  }

  async generateResponse(personalizedAnalysis) {
    console.log('🗣️ Response Generator: Creating response...');
    
    // For now, use the intelligence coordinator response
    // Later we'll integrate with Anthropic for more sophisticated generation
    
    const response = {
      text: this.formatResponse(personalizedAnalysis),
      conversationId: this.generateConversationId(),
      metadata: {
        neuralActivity: Object.keys(personalizedAnalysis),
        processingTime: Date.now(),
        tone: personalizedAnalysis.tone
      }
    };
    
    return response;
  }

  formatResponse(analysis) {
    // Simple response formatting - will be enhanced with proper FudiFlow formatting
    if (analysis.intelligence && analysis.intelligence.success) {
      return analysis.intelligence.data.response || 
             'Análisis completado - datos procesados exitosamente.\n\n---';
    }
    
    return 'He procesado tu consulta con mi red neural. Los datos están siendo analizados.\n\n---';
  }

  generateConversationId() {
    return 'conv-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  async consolidateMemories(sensoryData, analysis, response, conversationId) {
    console.log('💾 Memory Consolidation: Storing experience...');
    
    // Store in working memory
    const experience = {
      input: sensoryData,
      analysis: analysis,
      response: response,
      timestamp: new Date()
    };
    
    // Add to conversation context
    let conversationHistory = this.memorySystem.conversationContext.get(conversationId) || [];
    conversationHistory.push(experience);
    
    // Keep only last 10 interactions per conversation
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }
    
    this.memorySystem.conversationContext.set(conversationId, conversationHistory);
  }

  generateErrorResponse(error) {
    console.log('🧠 Generating error response...');
    
    return {
      text: '😅 Mi cerebro neural tuvo un pequeño cortocircuito. ¿Puedes repetir la pregunta?\n\n---',
      conversationId: this.generateConversationId(),
      metadata: {
        error: true,
        neuralActivity: ['error_handler'],
        processingTime: Date.now()
      }
    };
  }

  // Health check method
  async neuralHealthCheck() {
    console.log('🧠 FudiBrain: Running neural health check...');
    
    const health = {
      status: 'healthy',
      components: {
        intelligenceCoordinator: this.intelligenceCoordinator ? 'online' : 'offline',
        paymentLobe: this.paymentLobe ? 'online' : 'offline',
        productLobe: this.productLobe ? 'online' : 'offline',
        trendLobe: this.trendLobe ? 'online' : 'offline',
        peakHourLobe: this.peakHourLobe ? 'online' : 'offline'
      },
      memoryUsage: {
        conversationContexts: this.memorySystem.conversationContext.size
      },
      personality: this.personalityCore.traits
    };
    
    console.log('🧠 Neural health:', health);
    return health;
  }
}

module.exports = FudiBrain;