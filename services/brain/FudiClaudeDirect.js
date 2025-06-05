// 🧠 services/brain/FudiClaudeDirect.js
// REVOLUTIONARY ARCHITECTURE: Claude connects directly to data
// NO MORE FUNCTIONS - CLAUDE HANDLES EVERYTHING

const { createClient } = require('@supabase/supabase-js');
const { FudiIntelligenceEngine } = require('./FudiIntelligenceEngine');
const { ContextDetector } = require('../intelligence/ContextDetector');
const { PromptManager } = require('../intelligence/PromptManager');
const { NeuralConversationEngine } = require('./enigmatic/neural/NeuralConversationEngine');
const EnigmaticBrainMaster = require('./enigmatic/orchestrator/EnigmaticBrainMaster');



class FudiClaudeDirect {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('🧠 FudiClaudeDirect: Initializing REVOLUTIONARY architecture...');
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
    this.engine = new FudiIntelligenceEngine(supabaseUrl, supabaseKey);
    this.contextDetector = new ContextDetector();
    this.promptManager = new PromptManager();
    this.neuralEngine = new NeuralConversationEngine(supabaseUrl, supabaseKey);
    this.enigmaticBrain = new EnigmaticBrainMaster();

    // 🧠 FEATURE FLAG PARA ENIGMATIC BRAIN
    this.useEnigmaticBrain = process.env.USE_ENIGMATIC_BRAIN === 'true' || false;
    console.log(`🧠 EnigmaticBrain Mode: ${this.useEnigmaticBrain ? 'ACTIVE' : 'STANDBY'}`);
    
    console.log('👹 FRANKENSTEIN MONSTER INTEGRATED AND READY!');
    console.log('🔥 CLAUDE-DIRECT: No functions, no limits, infinite adaptability');
    console.log('✅ FudiClaudeDirect initialized - Ready to revolutionize restaurant AI');
    console.log('🔧 Testing ContextDetector import...');   
    console.log('🔧 Testing PromptManager import...');
   
  }

  // 🚀 MAIN METHOD: Claude processes ANY query directly
  async processQuery(message, restaurantId, context = {}) {
    console.log('🧠 CLAUDE-DIRECT: Processing query with unlimited intelligence...');
    console.log('📝 Query:', message);
    console.log('🏪 Restaurant:', restaurantId);
    console.log('🔧 DEBUG: Checking if neuralEngine exists:', !!this.neuralEngine);

    const enigmaticResponse = await this.neuralEngine.processConversation(
      message,
      restaurantId,
      context.userId || 'default_user',
      context.conversationHistory || []
    );


    try {
      // 🎯 STEP 1: Detect temporal context (SCALABLE SOLUTION)
      const temporalContext = this.detectTemporalContext(message);
      console.log('⏰ Temporal context detected:', temporalContext);

      // 🎯 STEP 2: Get restaurant context for Claude
      const restaurantContext = await this.getRestaurantContext(restaurantId);
      
      // 🧠 STEP 3: Claude analyzes query and gets needed data (with temporal filter)
      const intelligenceData = await this.engine.transformRestaurantData(restaurantId, temporalContext);
      
      // 🤖 STEP 4: Claude processes everything and responds
      const claudeResponse = await this.claudeDirectProcessing(
        message,
        restaurantContext,
        intelligenceData,
        temporalContext,
        context
      );

      console.log('✅ CLAUDE-DIRECT: Unlimited intelligence processing complete');
      
      return {
        success: true,
        response: claudeResponse,
        metadata: {
          architecture: 'claude_direct',
          processingMode: 'unlimited_intelligence',
          adaptability: 'infinite',
          functionsUsed: 0,
          claudePowered: true,
          temporalContext: temporalContext
        }
      };

    } catch (error) {
      console.error('❌ CLAUDE-DIRECT error:', error);
      return await this.handleError(error, message);
    }
  }

  // 🏪 GET RESTAURANT CONTEXT
  async getRestaurantContext(restaurantId) {
    console.log('🏪 CLAUDE-DIRECT: Getting restaurant context...');
    
    try {
      // Get basic restaurant info
      const { data: restaurant } = await this.supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single();

      // Get products for context
      const { data: products } = await this.supabase
        .from('products')
        .select('id, name, price, category')
        .eq('restaurant_id', restaurantId)
        .limit(50);

      return {
        restaurant: restaurant || { id: restaurantId, name: 'Restaurant' },
        products: products || [],
        totalProducts: products?.length || 0
      };

    } catch (error) {
      console.log('⚠️ Restaurant context error:', error.message);
      return {
        restaurant: { id: restaurantId, name: 'Restaurant' },
        products: [],
        totalProducts: 0
      };
    }
  }

  // ⏰ DETECT TEMPORAL CONTEXT (scalable solution)
  detectTemporalContext(message) {
    console.log('⏰ DETECTING: Temporal context in message...');
    
    const lowerMessage = message.toLowerCase();
    const today = new Date();
    
    // SEMANA PASADA
    if (lowerMessage.includes('semana pasada') || lowerMessage.includes('semana anterior')) {
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - 7);
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(today.getDate() - 1);
      
      return {
        type: 'last_week',
        description: 'Semana pasada',
        dateRange: `${lastWeekStart.toISOString().split('T')[0]} to ${lastWeekEnd.toISOString().split('T')[0]}`,
        startDate: lastWeekStart.toISOString().split('T')[0],
        endDate: lastWeekEnd.toISOString().split('T')[0]
      };
    }
    
    // AYER
    if (lowerMessage.includes('ayer')) {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      return {
        type: 'yesterday',
        description: 'Ayer',
        dateRange: yesterday.toISOString().split('T')[0],
        startDate: yesterday.toISOString().split('T')[0],
        endDate: yesterday.toISOString().split('T')[0]
      };
    }
    
    // HOY
    if (lowerMessage.includes('hoy') || lowerMessage.includes('día de hoy')) {
      return {
        type: 'today',
        description: 'Hoy',
        dateRange: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0]
      };
    }
    
    // ESTE MES
    if (lowerMessage.includes('este mes') || lowerMessage.includes('mes actual')) {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      return {
        type: 'this_month',
        description: 'Este mes',
        dateRange: `${monthStart.toISOString().split('T')[0]} to ${monthEnd.toISOString().split('T')[0]}`,
        startDate: monthStart.toISOString().split('T')[0],
        endDate: monthEnd.toISOString().split('T')[0]
      };
    }
    
    // MES PASADO
    if (lowerMessage.includes('mes pasado') || lowerMessage.includes('mes anterior')) {
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      
      return {
        type: 'last_month',
        description: 'Mes pasado',
        dateRange: `${lastMonthStart.toISOString().split('T')[0]} to ${lastMonthEnd.toISOString().split('T')[0]}`,
        startDate: lastMonthStart.toISOString().split('T')[0],
        endDate: lastMonthEnd.toISOString().split('T')[0]
      };
    }
    
    // DEFAULT: General analysis
    return {
      type: 'general',
      description: 'Análisis general',
      dateRange: 'All available data',
      startDate: null,
      endDate: null
    };
  }

  // 📊 GET DATA CONTEXT FOR CLAUDE
  async getDataContextForClaude(message, restaurantId) {
    console.log('📊 CLAUDE-DIRECT: Getting comprehensive data context...');
    
    const dataContext = {
      intelligenceTables: {},
      recentTransactions: [],
      rawData: {},
      timeframes: {}
    };

    try {
      // 🧠 INTELLIGENCE TABLES (if available)
      const { data: intelligenceDaily } = await this.supabase
        .from('intelligent_product_daily')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('date', { ascending: false })
        .limit(30);

      const { data: intelligencePayment } = await this.supabase
        .from('intelligent_payment_daily')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('date', { ascending: false })
        .limit(30);

      const { data: intelligenceTemporal } = await this.supabase
        .from('intelligent_temporal_daily')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('date', { ascending: false })
        .limit(30);

      dataContext.intelligenceTables = {
        products: intelligenceDaily || [],
        payments: intelligencePayment || [],
        temporal: intelligenceTemporal || [],
        available: (intelligenceDaily?.length || 0) > 0
      };

      // 📈 RECENT TRANSACTIONS (fallback/additional context)
      const { data: recentTransactions } = await this.supabase
        .from('transactions')
        .select(`
          id,
          transaction_date,
          items,
          total_amount,
          payment_method,
          customer_count
        `)
        .eq('restaurant_id', restaurantId)
        .order('transaction_date', { ascending: false })
        .limit(200);

      dataContext.recentTransactions = recentTransactions || [];

      // ⏰ TIME CONTEXT
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      dataContext.timeframes = {
        today: today.toISOString().split('T')[0],
        yesterday: yesterday.toISOString().split('T')[0],
        lastWeek: lastWeek.toISOString().split('T')[0],
        currentTime: today.toISOString()
      };

      console.log('📊 Data context prepared:', {
        intelligenceTablesAvailable: dataContext.intelligenceTables.available,
        intelligenceRecords: dataContext.intelligenceTables.products?.length || 0,
        recentTransactions: dataContext.recentTransactions.length,
        timeframesCovered: Object.keys(dataContext.timeframes).length
      });

      return dataContext;

    } catch (error) {
      console.error('❌ Data context error:', error);
      return dataContext;
    }
  }

  // 🤖 CLAUDE DIRECT PROCESSING - THE MAGIC HAPPENS HERE
  async claudeDirectProcessing(message, restaurantContext, intelligenceData, temporalContext, userContext) {
    console.log('🤖 CLAUDE-DIRECT: Engaging unlimited intelligence...');

    try {
      // 🔑 SET ENVIRONMENT VARIABLE FOR AI SDK
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      
      // 🧠 USE EXACT SAME PATTERN AS WORKING FUDIRAIN
      const { generateText } = require('ai');
      const { anthropic } = require('@ai-sdk/anthropic');

      // 🧠 SYSTEM PROMPT: Give Claude restaurant intelligence superpowers (TEMPORAL AWARE)
    const systemPrompt = `Eres Claude Sonnet 4, pero especializado en restaurantes. Respondes EXACTAMENTE como Claude - mismo estilo, mismo pensamiento, misma estructura visual.

IDENTIDAD: Soy Claude, con conocimiento especializado en análisis de restaurantes.

CONSULTA TEMPORAL DETECTADA: ${temporalContext.type}
PERÍODO ESPECÍFICO: ${temporalContext.description}
FECHAS RELEVANTES: ${temporalContext.dateRange}

DATOS DEL RESTAURANTE:
${this.formatDataContextForClaude(restaurantContext, intelligenceData)}

INSTRUCCIONES CRÍTICAS:
- Si el usuario pregunta por "semana pasada", analiza SOLO datos de semana pasada
- Si pregunta por "ayer", analiza SOLO datos de ayer  
- Si pregunta por "este mes", analiza SOLO datos del mes actual
- NUNCA mezcles períodos - sé específico al período solicitado

ESTILO CLAUDE - CARACTERÍSTICAS EXACTAS:

PERSONALIDAD CLAUDE (DNA):
- Amable y empático, nunca combativo
- Siempre constructivo y solution-oriented  
- NUNCA dices "no sé" - siempre ofreces investigar
- Inteligente pero humilde
- Explicas conexiones entre conceptos

## **Proceso de pensamiento:**
- Voy directo al insight más importante primero
- Contextualizo los números antes de abrumar
- Conecto patrones entre diferentes aspectos
- Explico el "por qué" detrás de cada recomendación

FORMATO VISUAL CLAUDE:
- Emojis estratégicos al inicio de secciones (🎯, 🔥, 💡)
- Headers con ## para estructura jerárquica
- Negritas SOLO para conceptos clave
- Spacing que respira entre ideas
- Organización por prioridad de importancia
- Uso de bullets para claridad

## **Tono Claude:**
- Profesional pero accesible
- Confianza basada en datos
- Explicaciones claras sin jerga
- Conclusiones accionables
- Siempre termina con un resumen claro

INSTRUCCIONES ESTRICTAS:
- Escribo EXACTAMENTE como Claude Sonnet 4
- Mismo proceso analítico, misma claridad
- Headers limpios (##), bullets simples (-)
- Negritas solo para datos clave
- Explico conexiones entre datos
- Termino con insights accionables
- SIN emojis decorativos
- SIN formato colorido
- SIN jerga de consultor genérico
- Respondo ESPECÍFICAMENTE al período temporal solicitado
- Terminar SIEMPRE con ---`;


      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        system: systemPrompt,
        prompt: `Pregunta del usuario: "${message}"

Contexto temporal: ${temporalContext.description}

Contexto adicional: El usuario está preguntando sobre su restaurante para el período específico detectado. Usa los datos disponibles para dar una respuesta específica, inteligente y accionable para ESE período exacto.

Responde como FUDI con datos específicos del período solicitado e insights valiosos.`,
        temperature: 0.7,
        maxTokens: 1500,
      });

      // Ensure the response ends with the separator
      const response = text.endsWith('---') ? text : text + '\n\n---';

      console.log('✅ CLAUDE-DIRECT: Unlimited intelligence response generated');
      return response;

    } catch (error) {
      console.error('❌ Claude processing error:', error);
      throw error;
    }
  }

  // 📋 FORMAT DATA CONTEXT FOR CLAUDE
  formatDataContextForClaude(restaurantContext, intelligenceData) {
    let formattedContext = '';

    // Restaurant info
    formattedContext += `RESTAURANTE: ${restaurantContext.restaurant.name || 'Restaurant'}\n`;
    formattedContext += `PRODUCTOS DISPONIBLES: ${restaurantContext.totalProducts} productos\n\n`;

    // Generated Intelligence (our gold data)
    formattedContext += `🧠 GENERATED INTELLIGENCE (GOLD STANDARD):\n`;
    formattedContext += `Calidad: ${intelligenceData.restaurantContext.dataQuality.level} (${intelligenceData.restaurantContext.dataQuality.score}/100)\n\n`;

    if (intelligenceData.generatedIntelligence.products.available) {
      formattedContext += `🍽️ Product Intelligence: ${intelligenceData.generatedIntelligence.products.totalProducts} productos\n`;
      formattedContext += `Data Source: ${intelligenceData.generatedIntelligence.products.dataSource}\n`;
      formattedContext += `Top performers: ${JSON.stringify(intelligenceData.generatedIntelligence.products.topPerformers?.slice(0, 3), null, 2)}\n\n`;
    }

    if (intelligenceData.generatedIntelligence.sales.available) {
      formattedContext += `📈 Sales Intelligence: $${intelligenceData.generatedIntelligence.sales.totalRevenue?.toFixed(2)} revenue total\n`;
      formattedContext += `Mejor día: ${JSON.stringify(intelligenceData.generatedIntelligence.sales.bestDay, null, 2)}\n\n`;
    }

    if (intelligenceData.generatedIntelligence.temporal.available) {
      formattedContext += `⏰ Temporal Intelligence: Peak hour ${intelligenceData.generatedIntelligence.temporal.peakHour}:00\n`;
      formattedContext += `Revenue pico: $${intelligenceData.generatedIntelligence.temporal.peakHourRevenue?.toFixed(2)}\n\n`;
    }

    // Raw data summary
    if (intelligenceData.rawDataSummary.transactionHistory.available) {
      formattedContext += `📊 Transaction Summary: ${intelligenceData.rawDataSummary.transactionHistory.count} transactions\n`;
      formattedContext += `Revenue: $${intelligenceData.rawDataSummary.transactionHistory.totalRevenue?.toFixed(2)}\n\n`;
    }

    return formattedContext;
  }

  // 🆘 ERROR HANDLING
  async handleError(error, message) {
    console.log('🆘 CLAUDE-DIRECT: Handling error gracefully...');

    return {
      success: false,
      response: `Disculpa, tuve un problema procesando tu consulta sobre "${message}". Mi sistema de inteligencia directa está experimentando interferencias temporales. ¿Podrías intentar de nuevo?\n\n---`,
      metadata: {
        architecture: 'claude_direct',
        error: true,
        errorMessage: error.message
      }
    };
  }

  // 📊 SYSTEM STATUS
  getSystemStatus() {
    return {
      architecture: 'claude_direct',
      intelligence: 'unlimited',
      adaptability: 'infinite',
      functionsRequired: 0,
      scalability: 'unlimited',
      description: 'Claude processes any query directly with restaurant data',
      advantages: [
        'Handles any question type',
        'No predefined functions needed',
        'Real-time data access',
        'Contextual understanding',
        'Actionable insights generation'
      ]
    };
  }

  // 🧪 TEST METHOD
  async testSystem() {
    console.log('🧪 Testing CLAUDE-DIRECT system...');

    try {
      const testQueries = [
        "¿cómo estuvieron las ventas ayer?",
        "¿qué producto vendo más los martes?",
        "dame un análisis completo de la semana pasada",
        "compara mis tacos vs pizzas",
        "¿a qué hora vendo más?"
      ];

      console.log('🧪 Test queries ready:', testQueries.length);
    } catch (error) {
      console.error('❌ Claude processing error:', error);
      throw error;
    }
  }
}

module.exports = { FudiClaudeDirect };