// services/brain/FudiBrain.js
// 🧠 FUDI NEURAL BRAIN - Neural Architecture for FUDI Bourdain

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
    
    // Initialize neural lobes (our "emotions" like Intensamente)
    this.initializeNeuralLobes();
    
    // Initialize neural cores
    this.initializeNeuralCores();
    
    console.log('🧠 FudiBrain: Neural network online!');
  }

  initializeNeuralLobes() {
    console.log('🧠 Initializing neural lobes...');
    
    // 🧠 Intelligence Coordinator (Central coordination)
    this.intelligenceCoordinator = new IntelligenceCoordinator(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // 💰 Payment Lobe (Like "Joy" - gets excited about money)
    this.paymentLobe = new PaymentAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // 🍽️ Product Lobe (Like "Anger" - passionate about product performance)
    this.productLobe = new ProductPerformanceAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // 📈 Trend Lobe (Like "Fear" - worried about trends and changes)
    this.trendLobe = new TrendAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
    
    // ⏰ Peak Hour Lobe (Like "Sadness" - focused on operational difficulties)
    this.peakHourLobe = new PeakHourAnalyzer(
      this.config.supabaseUrl,
      this.config.supabaseKey
    );
  }

  initializeNeuralCores() {
    console.log('🧠 Initializing neural cores...');
    
    // 🎭 Personality system (simplified for now)
    this.personalityCore = {
      currentMood: 'analytical',
      expertise: 'restaurant_operations'
    };
    
    // 💾 Memory system (will expand later)
    this.memorySystem = {
      workingMemory: new Map(),
      conversationContext: new Map()
    };
  }

  async processMessage(message, restaurantId, conversationId) {
    console.log(`🧠 FudiBrain: Processing neural analysis for restaurant ${restaurantId}`);
    console.log(`💬 Message: "${message}"`);
    
    try {
      // 1. SENSORY PROCESSING (Analyze what user wants)
      const sensoryData = await this.processSensoryInput(message, restaurantId);
      
      // 2. MEMORY ACTIVATION (Context from previous conversations)
      const memories = await this.activateMemories(sensoryData, conversationId);
      
      // 3. NEURAL LOBE PROCESSING (The "emotions" analyze in parallel)
      const neuralAnalysis = await this.processNeuralLobes(sensoryData, memories);
      
      // 4. MOTOR CORTEX (Prepare analysis for FUDI to think)
      const motorResponse = await this.generateMotorResponse(neuralAnalysis, sensoryData);
      
      // 5. MEMORY CONSOLIDATION (Learning)
      await this.consolidateMemories(sensoryData, neuralAnalysis, motorResponse, conversationId);
      
      return motorResponse;
      
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
      
      // Detect what user wants to know
      intent: this.detectIntent(message),
      
      // Detect emotional context
      emotion: this.detectEmotion(message),
      
      // Classify topics
      topics: this.classifyTopics(message)
    };
    
    console.log('👁️ Sensory analysis:', sensoryData);
    return sensoryData;
  }

  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('platillo') || lowerMessage.includes('producto') || lowerMessage.includes('estrella') || lowerMessage.includes('menú')) {
      return 'product_inquiry';
    }
    if (lowerMessage.includes('ventas') || lowerMessage.includes('dinero') || lowerMessage.includes('ingresos')) {
      return 'sales_inquiry';
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
      return 'excitement';
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
      restaurantContext: await this.getRestaurantContext(sensoryData.restaurantId)
    };
    
    return memories;
  }

  async getRestaurantContext(restaurantId) {
    return {
      restaurantId: restaurantId,
      lastAnalysisTime: new Date()
    };
  }

  async processNeuralLobes(sensoryData, memories) {
    console.log('⚡ Neural Lobes: Processing in parallel like Intensamente emotions...');
    
    // Determine which "emotions" (lobes) should activate
    const activeLobes = this.determineActiveLobes(sensoryData.intent, sensoryData.topics);
    
    const lobeResults = {};
    const lobePromises = [];
    
    // Activate relevant lobes in parallel
    if (activeLobes.includes('intelligence')) {
      lobePromises.push(
        this.processIntelligenceLobe(sensoryData, memories).then(result => {
          lobeResults.intelligence = result;
        })
      );
    }
    
    if (activeLobes.includes('payment')) {
      lobePromises.push(
        this.processPaymentLobe(sensoryData, memories).then(result => {
          lobeResults.payment = result;
        })
      );
    }
    
    if (activeLobes.includes('product')) {
      lobePromises.push(
        this.processProductLobe(sensoryData, memories).then(result => {
          lobeResults.product = result;
        })
      );
    }
    
    if (activeLobes.includes('trend')) {
      lobePromises.push(
        this.processTrendLobe(sensoryData, memories).then(result => {
          lobeResults.trend = result;
        })
      );
    }
    
    // Wait for all active lobes to complete
    await Promise.all(lobePromises);
    
    console.log('⚡ Neural processing complete:', Object.keys(lobeResults));
    return lobeResults;
  }

  determineActiveLobes(intent, topics) {
    const activeLobes = ['intelligence']; // Always include intelligence coordinator
    
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
        data: result,
        summary: this.createIntelligenceSummary(result)
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
    console.log('💰 Payment Lobe: Getting excited about money...');
    
    try {
      const result = await this.paymentLobe.analyze(sensoryData.restaurantId, 30);
      
      return {
        type: 'payment',
        success: true,
        data: result,
        summary: this.createPaymentSummary(result)
      };
    } catch (error) {
      console.error('💰 Payment Lobe error:', error);
      return {
        type: 'payment',
        success: false,
        error: error.message
      };
    }
  }

  async processProductLobe(sensoryData, memories) {
    console.log('🍽️ Product Lobe: Getting passionate about products...');
    
    try {
      const result = await this.productLobe.analyze(sensoryData.restaurantId, 30);
      
      return {
        type: 'product',
        success: true,
        data: result,
        summary: this.createProductSummary(result)
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

  async processTrendLobe(sensoryData, memories) {
    console.log('📈 Trend Lobe: Analyzing patterns...');
    
    try {
      const result = await this.trendLobe.analyze(sensoryData.restaurantId, 30);
      
      return {
        type: 'trend',
        success: true,
        data: result,
        summary: this.createTrendSummary(result)
      };
    } catch (error) {
      console.error('📈 Trend Lobe error:', error);
      return {
        type: 'trend',
        success: false,
        error: error.message
      };
    }
  }

  // 🧠 CREATE SUMMARIES FOR FUDI TO THINK WITH
  createIntelligenceSummary(result) {
    if (!result || !result.success) return "Análisis general no disponible";
    return "Contexto general del restaurante analizado";
  }

  createPaymentSummary(result) {
    if (!result || !result.success || !result.data) return "Datos de pagos no disponibles";
    
    const summary = result.data.summary || {};
    return `${summary.totalTransactions || 0} transacciones, $${(summary.totalRevenue || 0).toFixed(2)} en revenue, ${summary.dominantMethod || 'método'} dominante`;
  }

  createProductSummary(result) {
    if (!result || !result.success || !result.data) return "Datos de productos no disponibles";
    
    const topProducts = result.data.topProducts || [];
    if (topProducts.length === 0) return "No hay datos de productos";
    
    const star = topProducts[0];
    return `${star.name || `Producto ${star.id}`} lidera con ${star.quantity} unidades, $${star.revenue.toFixed(2)} en revenue`;
  }

  createTrendSummary(result) {
    if (!result || !result.success || !result.data) return "Datos de tendencias no disponibles";
    
    return "Análisis de tendencias completado";
  }

  async generateMotorResponse(neuralAnalysis, sensoryData) {
    console.log('🗣️ MotorCortex: Preparing neural insights for FUDI...');
    
    // 🧠 PREPARE NEURAL INSIGHTS FOR FUDI TO THINK WITH
    const neuralInsights = [];
    
    // Extract insights from each successful lobe
    Object.values(neuralAnalysis).forEach(lobeResult => {
      if (lobeResult.success && lobeResult.data) {
        neuralInsights.push({
          type: lobeResult.type,
          data: lobeResult.data,
          summary: lobeResult.summary
        });
      }
    });
    
    return {
      text: "Neural analysis complete - ready for FUDI thinking",
      conversationId: this.generateConversationId(),
      metadata: {
        neuralActivity: Object.keys(neuralAnalysis),
        neuralInsights: neuralInsights, // 🧠 THIS IS WHAT FUDI WILL THINK WITH
        processingTime: Date.now(),
        sensoryData: sensoryData
      }
    };
  }

  async consolidateMemories(sensoryData, neuralAnalysis, response, conversationId) {
    console.log('💾 Memory Consolidation: Storing neural experience...');
    
    const experience = {
      input: sensoryData,
      neuralAnalysis: neuralAnalysis,
      response: response,
      timestamp: new Date()
    };
    
    let conversationHistory = this.memorySystem.conversationContext.get(conversationId) || [];
    conversationHistory.push(experience);
    
    // Keep only last 10 interactions
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }
    
    this.memorySystem.conversationContext.set(conversationId, conversationHistory);
  }

  generateConversationId() {
    return 'neural-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generateErrorResponse(error) {
    console.log('🧠 Generating neural error response...');
    
    return {
      text: "Neural processing error",
      conversationId: this.generateConversationId(),
      metadata: {
        error: true,
        neuralActivity: ['error_handler'],
        processingTime: Date.now()
      }
    };
  }

  // Health check
  async neuralHealthCheck() {
    console.log('🧠 FudiBrain: Running neural health check...');
    
    const health = {
      status: 'healthy',
      neuralLobes: {
        intelligenceCoordinator: this.intelligenceCoordinator ? 'online' : 'offline',
        paymentLobe: this.paymentLobe ? 'online' : 'offline',
        productLobe: this.productLobe ? 'online' : 'offline',
        trendLobe: this.trendLobe ? 'online' : 'offline',
        peakHourLobe: this.peakHourLobe ? 'online' : 'offline'
      },
      memoryUsage: {
        conversationContexts: this.memorySystem.conversationContext.size
      }
    };
    
    console.log('🧠 Neural health:', health);
    return health;
  }
}

module.exports = FudiBrain;