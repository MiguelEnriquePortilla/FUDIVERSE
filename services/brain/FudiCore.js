// Using Vercel AI SDK for Anthropic
const BabyBrain = require('./baby/BabyBrain');
const { FudiIntelligenceEngine } = require('./FudiIntelligenceEngine');
const { generateText } = require('ai');

class FudiCore {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('[CORE] Initializing FudiCore - The most advanced restaurant AI...');
    
    // Initialize the brain FIRST - it's the boss now
    this.brain = new BabyBrain();
    console.log('[CORE] Baby Brain initialized as primary decision maker');
    
    // Intelligence engine for data analysis when needed
    this.intelligenceEngine = new FudiIntelligenceEngine(supabaseUrl, supabaseKey);
    console.log('[CORE] Intelligence Engine ready for deep analysis');
    
    // Store the API key for later use
    this.anthropicKey = anthropicKey;
    console.log('[CORE] Anthropic API ready for support');
    
    // Connect brain to core
    this.brain.connectToFudi(this);
    
    console.log('[FIRE] FudiCore ready - Restaurant AI Revolution begins!');
  }

  async processQuery(message, restaurantId, context = {}) {
    console.log('[CORE] Processing query through FudiCore...');
    
    try {
      // 1. Let the brain analyze the message first
      const brainAnalysis = await this.brain.process(message, {
        restaurantId,
        ...context
      });
      
      // 2. Brain remembers the interaction
      this.brain.remember({
        type: 'user_message',
        message: message,
        restaurantId: restaurantId,
        timestamp: new Date(),
        context: context
      });
      
      // 3. Determine response strategy based on brain analysis
      const responseStrategy = this.determineStrategy(message, brainAnalysis);
      console.log(`[CORE] Strategy selected: ${responseStrategy.type}`);
      
      // 4. Generate response based on strategy
      let response;
      switch (responseStrategy.type) {
        case 'casual_greeting':
          response = await this.handleCasualGreeting(message, restaurantId);
          break;
          
        case 'simple_question':
          response = await this.handleSimpleQuestion(message, restaurantId, context);
          break;
          
        case 'business_analysis':
          response = await this.handleBusinessAnalysis(message, restaurantId, context);
          break;
          
        case 'complex_query':
          response = await this.handleComplexQuery(message, restaurantId, context);
          break;
          
        default:
          response = await this.handleGeneralQuery(message, restaurantId, context);
      }
      
      // 5. Brain remembers the response
      this.brain.remember({
        type: 'fudi_response',
        response: response,
        strategy: responseStrategy.type,
        timestamp: new Date()
      });
      
      // 6. Return the response
      return {
        success: true,
        response: response,
        metadata: {
          architecture: 'FudiCore',
          brainMemories: this.brain.recall().length,
          strategy: responseStrategy.type,
          processingTime: new Date() - context.startTime || 0
        }
      };
      
    } catch (error) {
      console.error('[CORE] Error in processQuery:', error);
      return {
        success: false,
        response: "Disculpa, tuve un pequeño problema. ¿Puedes intentar de nuevo?",
        error: error.message
      };
    }
  }

  determineStrategy(message, brainAnalysis) {
    const lowerMessage = message.toLowerCase();
    
    // Casual greetings
    if (lowerMessage.match(/^(hola|hey|que tal|buenas|saludos)/)) {
      return { type: 'casual_greeting', confidence: 0.95 };
    }
    
    // Simple questions
    if (lowerMessage.includes('?') && lowerMessage.split(' ').length < 10) {
      if (lowerMessage.match(/(como estas|que tal|como te va)/)) {
        return { type: 'casual_greeting', confidence: 0.9 };
      }
      return { type: 'simple_question', confidence: 0.8 };
    }
    
    // Business analysis keywords
    if (lowerMessage.match(/(ventas|ingresos|analiza|reporte|estadisticas|metricas|platillo|producto)/)) {
      return { type: 'business_analysis', confidence: 0.9 };
    }
    
    // Complex queries
    if (message.split(' ').length > 20 || lowerMessage.includes('comparar') || lowerMessage.includes('tendencia')) {
      return { type: 'complex_query', confidence: 0.85 };
    }
    
    return { type: 'general', confidence: 0.5 };
  }

  async handleCasualGreeting(message, restaurantId) {
    console.log('[CORE] Handling casual greeting...');
    
    const greetings = [
      "¡Hola! ¿Cómo va todo en el restaurante hoy?",
      "¡Hey! ¿Qué tal el servicio hoy?",
      "¡Buenas! ¿En qué puedo ayudarte con tu restaurante?",
      "¡Saludos! ¿Todo bien con el negocio?",
      "¡Hola! Aquí andamos, listo para ayudarte con lo que necesites.",
      "¡Qué onda! ¿Cómo van las cosas en el restaurante?"
    ];
    
    // Get memories to personalize if possible
    const memories = this.brain.recall();
    console.log('[DEBUG] Memories:', memories);
    const hasInteractedBefore = memories.length > 2;
    
    if (hasInteractedBefore) {
      const personalizedGreetings = [
        "¡Hola de nuevo! ¿Cómo ha estado todo desde la última vez?",
        "¡Qué gusto verte por aquí otra vez! ¿Cómo va el restaurante?",
        "¡Hey, qué tal! ¿Alguna novedad en el negocio?"
      ];
      return personalizedGreetings[Math.floor(Math.random() * personalizedGreetings.length)];
    }
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  async handleSimpleQuestion(message, restaurantId, context) {
    console.log('[CORE] Handling simple question...');
    
    // For now, use Vercel AI SDK for simple questions
    const intelligence = await this.intelligenceEngine.transformRestaurantData(restaurantId, null);
    const restaurantName = intelligence.restaurantContext?.identity?.name || 'tu restaurante';
    const prompt = `Eres Fudi, un asistente amigable para restaurantes mexicanos. 
    Responde esta pregunta de manera casual y breve, en español mexicano natural: "${message}"
    
    Importante:
    - NO te presentes como Claude
    - NO menciones que eres un analista
    - Responde como un amigo que ayuda con el restaurante
    - Mantén la respuesta corta y al punto`;
    
    try {
      // Set the API key for this request
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      
      // Import anthropic from ai-sdk
      const { anthropic } = require('@ai-sdk/anthropic');
      
      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        prompt: prompt,
        maxTokens: 200,
      });
      
      return text;
    } catch (error) {
      console.error('[CORE] Error with Claude:', error);
      return "Perdón, no pude procesar tu pregunta. ¿Puedes repetirla?";
    }
  }

  async handleBusinessAnalysis(message, restaurantId, context) {
    console.log('[CORE] Handling business analysis...');
    
    // Get restaurant intelligence
    const intelligence = await this.intelligenceEngine.transformRestaurantData(restaurantId, null);
    console.log('[DEBUG] Intelligence data:', JSON.stringify(intelligence, null, 2));
    console.log('[DEBUG] Main keys:', Object.keys(intelligence));
    console.log('[DEBUG] Generated Intelligence keys:', Object.keys(intelligence.generatedIntelligence || {}));
    console.log('[DEBUG] First product:', intelligence.generatedIntelligence?.products?.[0]);
    console.log('[DEBUG] Full generatedIntelligence:', JSON.stringify(intelligence.generatedIntelligence, null, 2));
    
    // Create a focused prompt for Claude
    console.log('[DEBUG] Product name:', intelligence.generatedIntelligence?.products?.topPerformers?.[0]?.product_name);
    console.log('[DEBUG] Avg ticket:', intelligence.generatedIntelligence?.sales?.avgTicket);
    
    const prompt = `Eres Fudi, un experto en restaurantes mexicanos. 
    El usuario pregunta: "${message}"
    
    Datos del restaurante:
    - Ventas totales: $${intelligence.generatedIntelligence?.financial?.totalRevenue || 'No disponible'}
    - Tickets promedio: $${intelligence.generatedIntelligence?.sales?.avgTicket || 'No disponible'}
    - Producto estrella: ${intelligence.generatedIntelligence?.products?.topPerformers?.[0]?.product_name || 'No identificado'}
    - Hora pico: ${intelligence.generatedIntelligence?.temporal?.peakHour || 'No determinada'}
    
    Responde de manera profesional pero amigable. 
    NO te presentes, ve directo al grano.
    Usa bullets si es necesario para claridad.`;
    console.log('[DEBUG] FULL PROMPT:', prompt);
    
    try {
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      const { anthropic } = require('@ai-sdk/anthropic');
      
      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        prompt: prompt,
        maxTokens: 500,
      });
      
      return text;
    } catch (error) {
      console.error('[CORE] Error with Claude:', error);
      return "Hubo un problema al analizar los datos. ¿Puedes intentar de nuevo?";
    }
  }

  async handleComplexQuery(message, restaurantId, context) {
    console.log('[CORE] Handling complex query...');
    
    // For complex queries, we need full intelligence + Claude's reasoning
    const intelligence = await this.intelligenceEngine.transformRestaurantData(restaurantId, null);
    console.log('[DEBUG] Intelligence data:', JSON.stringify(intelligence, null, 2));
    console.log('[DEBUG] Main keys:', Object.keys(intelligence));
    console.log('[DEBUG] Generated Intelligence keys:', Object.keys(intelligence.generatedIntelligence || {}));
    console.log('[DEBUG] First product:', intelligence.generatedIntelligence?.products?.[0]);
    console.log('[DEBUG] Full generatedIntelligence:', JSON.stringify(intelligence.generatedIntelligence, null, 2));
    
    const prompt = `Eres Fudi, el sistema de inteligencia para restaurantes más avanzado.
    
    Query compleja del usuario: "${message}"
    
    Inteligencia del restaurante disponible:
    ${JSON.stringify(intelligence, null, 2)}
    
    Proporciona un análisis profundo y accionable.
    Estructura tu respuesta con claridad.
    Incluye insights específicos y recomendaciones.`;
    
    try {
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      const { anthropic } = require('@ai-sdk/anthropic');
      
      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        prompt: prompt,
        maxTokens: 1000,
      });
      
      return text;
    } catch (error) {
      console.error('[CORE] Error with Claude:', error);
      return "No pude completar el análisis complejo. Por favor, intenta con una consulta más específica.";
    }
  }

  async handleGeneralQuery(message, restaurantId, context) {
    console.log('[CORE] Handling general query...');
    
    // For general queries, let Claude handle with guidance
    const prompt = `Eres Fudi, asistente inteligente para restaurantes.
    Usuario dice: "${message}"
    
    Responde de manera útil y natural.
    NO te presentes como Claude.
    Mantén un tono amigable y profesional.`;
    
    try {
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      const { anthropic } = require('@ai-sdk/anthropic');
      
      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        prompt: prompt,
        maxTokens: 300,
      });
      
      return text;
    } catch (error) {
      console.error('[CORE] Error with Claude:', error);
      return "¿Puedes reformular tu pregunta? Quiero asegurarme de ayudarte correctamente.";
    }
  }

  // Make this compatible with how route.ts expects it
  async processWithBrain(message, restaurantId, context = {}) {
    // This method exists for compatibility with the route
    return this.processQuery(message, restaurantId, context);
  }

  // Get insights about the brain's state
  getBrainInsights() {
    return this.brain.getInsights();
  }
  
  // Get memory count
  getMemoryCount() {
    return this.brain.getMemoryCount();
  }
}

module.exports = { FudiCore };

















