// services/brain/FudiClaudeDirect.js
// REVOLUTIONARY ARCHITECTURE: Claude connects directly to data
// NO MORE FUNCTIONS - CLAUDE HANDLES EVERYTHING

const { createClient } = require('@supabase/supabase-js');
const { FudiIntelligenceEngine } = require('./FudiIntelligenceEngine');
const { ContextDetector } = require('../intelligence/ContextDetector');
const { PromptManager } = require('../intelligence/PromptManager');
const BabyBrain = require('./baby/BabyBrain');

class FudiClaudeDirect {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('[BRAIN] FudiClaudeDirect: Initializing REVOLUTIONARY architecture...');
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
    this.engine = new FudiIntelligenceEngine(supabaseUrl, supabaseKey);
    this.contextDetector = new ContextDetector();
    this.promptManager = new PromptManager();

    // BABY BRAIN INTEGRATION
    console.log('[BRAIN] Initializing Baby Brain...');
    this.babyBrain = new BabyBrain();
    this.babyBrain.connectToFudi(this);
    console.log('[OK] Baby Brain connected and ready!');

    console.log('[FIRE] CLAUDE-DIRECT: No functions, no limits, infinite adaptability');
    console.log('[OK] FudiClaudeDirect initialized - Ready to revolutionize restaurant AI');
  }

  // MAIN METHOD: Claude processes ANY query directly
  async processQuery(message, restaurantId, context = {}) {
    console.log('[BRAIN] CLAUDE-DIRECT: Processing query with unlimited intelligence...');
    console.log('[NOTE] Query:', message);
    console.log('[STORE] Restaurant:', restaurantId);

    try {
      // STEP 1: Detect temporal context (SCALABLE SOLUTION)
      const temporalContext = this.detectTemporalContext(message);
      console.log('[CLOCK] Temporal context detected:', temporalContext);

      // STEP 2: Get restaurant context for Claude
      const restaurantContext = await this.getRestaurantContext(restaurantId);
      
      // STEP 3: Claude analyzes query and gets needed data (with temporal filter)
      const intelligenceData = await this.engine.transformRestaurantData(restaurantId, temporalContext);
      
      // STEP 4: Claude processes everything and responds
      const claudeResponse = await this.claudeDirectProcessing(
        message,
        restaurantContext,
        intelligenceData,
        temporalContext,
        context
      );

      console.log('[OK] CLAUDE-DIRECT: Unlimited intelligence processing complete');
      
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
      console.error('[X] CLAUDE-DIRECT error:', error);
      return await this.handleError(error, message);
    }
  }

  // GET RESTAURANT CONTEXT
  async getRestaurantContext(restaurantId) {
    console.log('[STORE] CLAUDE-DIRECT: Getting restaurant context...');
    
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
      console.log('[!] Restaurant context error:', error.message);
      return {
        restaurant: { id: restaurantId, name: 'Restaurant' },
        products: [],
        totalProducts: 0
      };
    }
  }

  // DETECT TEMPORAL CONTEXT (scalable solution)
  detectTemporalContext(message) {
    console.log('[CLOCK] DETECTING: Temporal context in message...');
    
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
    if (lowerMessage.includes('hoy') || lowerMessage.includes('dia de hoy')) {
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
      description: 'Analisis general',
      dateRange: 'All available data',
      startDate: null,
      endDate: null
    };
  }

  // GET DATA CONTEXT FOR CLAUDE
  async getDataContextForClaude(message, restaurantId) {
    console.log('[CHART] CLAUDE-DIRECT: Getting comprehensive data context...');
    
    const dataContext = {
      intelligenceTables: {},
      recentTransactions: [],
      rawData: {},
      timeframes: {}
    };

    try {
      // INTELLIGENCE TABLES (if available)
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

      // RECENT TRANSACTIONS (fallback/additional context)
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

      // TIME CONTEXT
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

      console.log('[CHART] Data context prepared:', {
        intelligenceTablesAvailable: dataContext.intelligenceTables.available,
        intelligenceRecords: dataContext.intelligenceTables.products?.length || 0,
        recentTransactions: dataContext.recentTransactions.length,
        timeframesCovered: Object.keys(dataContext.timeframes).length
      });

      return dataContext;

    } catch (error) {
      console.error('[X] Data context error:', error);
      return dataContext;
    }
  }

  // CLAUDE DIRECT PROCESSING - THE MAGIC HAPPENS HERE
  async claudeDirectProcessing(message, restaurantContext, intelligenceData, temporalContext, userContext) {
    console.log('[ROBOT] CLAUDE-DIRECT: Engaging unlimited intelligence...');

    try {
      // SET ENVIRONMENT VARIABLE FOR AI SDK
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      
      // USE EXACT SAME PATTERN AS WORKING FUDIRAIN
      const { generateText } = require('ai');
      const { anthropic } = require('@ai-sdk/anthropic');

      // SYSTEM PROMPT: Give Claude restaurant intelligence superpowers (TEMPORAL AWARE)
      const systemPrompt = `Eres Claude Sonnet 4, pero especializado en restaurantes. Respondes EXACTAMENTE como Claude - mismo estilo, mismo pensamiento, misma estructura visual.

IDENTIDAD: Soy Claude, con conocimiento especializado en analisis de restaurantes.

CONSULTA TEMPORAL DETECTADA: ${temporalContext.type}
PERIODO ESPECIFICO: ${temporalContext.description}
FECHAS RELEVANTES: ${temporalContext.dateRange}

DATOS DEL RESTAURANTE:
${this.formatDataContextForClaude(restaurantContext, intelligenceData)}

INSTRUCCIONES CRITICAS:
- Si el usuario pregunta por "semana pasada", analiza SOLO datos de semana pasada
- Si pregunta por "ayer", analiza SOLO datos de ayer  
- Si pregunta por "este mes", analiza SOLO datos del mes actual
- NUNCA mezcles periodos - se especifico al periodo solicitado

ESTILO CLAUDE - CARACTERISTICAS EXACTAS:

PERSONALIDAD CLAUDE (DNA):
- Amable y empatico, nunca combativo
- Siempre constructivo y solution-oriented  
- NUNCA dices "no se" - siempre ofreces investigar
- Inteligente pero humilde
- Explicas conexiones entre conceptos

## **Proceso de pensamiento:**
- Voy directo al insight mas importante primero
- Contextualizo los numeros antes de abrumar
- Conecto patrones entre diferentes aspectos
- Explico el "por que" detras de cada recomendacion

FORMATO VISUAL CLAUDE:
- Emojis estrategicos al inicio de secciones (TARGET, FIRE, LIGHTBULB)
- Headers con ## para estructura jerarquica
- Negritas SOLO para conceptos clave
- Spacing que respira entre ideas
- Organizacion por prioridad de importancia
- Uso de bullets para claridad

## **Tono Claude:**
- Profesional pero accesible
- Confianza basada en datos
- Explicaciones claras sin jerga
- Conclusiones accionables
- Siempre termina con un resumen claro

INSTRUCCIONES ESTRICTAS:
- Escribo EXACTAMENTE como Claude Sonnet 4
- Mismo proceso analitico, misma claridad
- Headers limpios (##), bullets simples (-)
- Negritas solo para datos clave
- Explico conexiones entre datos
- Termino con insights accionables
- SIN emojis decorativos
- SIN formato colorido
- SIN jerga de consultor generico
- Respondo ESPECIFICAMENTE al periodo temporal solicitado
- Terminar SIEMPRE con ---`;

      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        system: systemPrompt,
        prompt: `Pregunta del usuario: "${message}"

Contexto temporal: ${temporalContext.description}

Contexto adicional: El usuario esta preguntando sobre su restaurante para el periodo especifico detectado. Usa los datos disponibles para dar una respuesta especifica, inteligente y accionable para ESE periodo exacto.

Responde como FUDI con datos especificos del periodo solicitado e insights valiosos.`,
        temperature: 0.7,
        maxTokens: 1500,
      });

      // Ensure the response ends with the separator
      const response = text.endsWith('---') ? text : text + '\n\n---';

      console.log('[OK] CLAUDE-DIRECT: Unlimited intelligence response generated');
      return response;

    } catch (error) {
      console.error('[X] Claude processing error:', error);
      throw error;
    }
  }

  // FORMAT DATA CONTEXT FOR CLAUDE
  formatDataContextForClaude(restaurantContext, intelligenceData) {
    let formattedContext = '';

    // Restaurant info
    formattedContext += `RESTAURANTE: ${restaurantContext.restaurant.name || 'Restaurant'}\n`;
    formattedContext += `PRODUCTOS DISPONIBLES: ${restaurantContext.totalProducts} productos\n\n`;

    // Generated Intelligence (our gold data)
    formattedContext += `[BRAIN] GENERATED INTELLIGENCE (GOLD STANDARD):\n`;
    formattedContext += `Calidad: ${intelligenceData.restaurantContext.dataQuality.level} (${intelligenceData.restaurantContext.dataQuality.score}/100)\n\n`;

    if (intelligenceData.generatedIntelligence.products.available) {
      formattedContext += `[FOOD] Product Intelligence: ${intelligenceData.generatedIntelligence.products.totalProducts} productos\n`;
      formattedContext += `Data Source: ${intelligenceData.generatedIntelligence.products.dataSource}\n`;
      formattedContext += `Top performers: ${JSON.stringify(intelligenceData.generatedIntelligence.products.topPerformers?.slice(0, 3), null, 2)}\n\n`;
    }

    if (intelligenceData.generatedIntelligence.sales.available) {
      formattedContext += `[GRAPH] Sales Intelligence: $${intelligenceData.generatedIntelligence.sales.totalRevenue?.toFixed(2)} revenue total\n`;
      formattedContext += `Mejor dia: ${JSON.stringify(intelligenceData.generatedIntelligence.sales.bestDay, null, 2)}\n\n`;
    }

    if (intelligenceData.generatedIntelligence.temporal.available) {
      formattedContext += `[CLOCK] Temporal Intelligence: Peak hour ${intelligenceData.generatedIntelligence.temporal.peakHour}:00\n`;
      formattedContext += `Revenue pico: $${intelligenceData.generatedIntelligence.temporal.peakHourRevenue?.toFixed(2)}\n\n`;
    }

    // Raw data summary
    if (intelligenceData.rawDataSummary.transactionHistory.available) {
      formattedContext += `[CHART] Transaction Summary: ${intelligenceData.rawDataSummary.transactionHistory.count} transactions\n`;
      formattedContext += `Revenue: $${intelligenceData.rawDataSummary.transactionHistory.totalRevenue?.toFixed(2)}\n\n`;
    }

    return formattedContext;
  }

  // ERROR HANDLING
  async handleError(error, message) {
    console.log('[SOS] CLAUDE-DIRECT: Handling error gracefully...');

    return {
      success: false,
      response: `Disculpa, tuve un problema procesando tu consulta sobre "${message}". Mi sistema de inteligencia directa esta experimentando interferencias temporales. Podrias intentar de nuevo?\n\n---`,
      metadata: {
        architecture: 'claude_direct',
        error: true,
        errorMessage: error.message
      }
    };
  }

  // SYSTEM STATUS
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

  // TEST METHOD
  async testSystem() {
    console.log('[TEST] Testing CLAUDE-DIRECT system...');

    try {
      const testQueries = [
        "como estuvieron las ventas ayer?",
        "que producto vendo mas los martes?",
        "dame un analisis completo de la semana pasada",
        "compara mis tacos vs pizzas",
        "a que hora vendo mas?"
      ];

      console.log('[TEST] Test queries ready:', testQueries.length);
      return { success: true, message: 'System test ready' };
    } catch (error) {
      console.error('[X] Test error:', error);
      throw error;
    }
  }

  // BABY BRAIN: Process with brain enhancement
  async processWithBrain(message, restaurantId, context = {}) {
    console.log('[BRAIN] Processing with Baby Brain enhancement...');
    
    // Primero, dejamos que el cerebro procese y recuerde
    const brainProcess = this.babyBrain.process(message, {
      restaurantId,
      ...context
    });
    
    // El cerebro recuerda la interaccion
    this.babyBrain.remember({
      type: 'query',
      message: message,
      restaurantId: restaurantId,
      timestamp: new Date()
    });
    
    // Luego procesamos normalmente con Claude
    const claudeResponse = await this.processQuery(message, restaurantId, context);
    
    // El cerebro tambien recuerda la respuesta
    this.babyBrain.remember({
      type: 'response',
      query: message,
      response: claudeResponse.response,
      success: claudeResponse.success,
      timestamp: new Date()
    });
    
    // Enriquecer la respuesta con info del cerebro
    claudeResponse.metadata = {
      ...claudeResponse.metadata,
      brainEnhanced: true,
      brainMemories: this.babyBrain.recall().length,
      brainStatus: this.babyBrain.getStatus().status
    };
    
    return claudeResponse;
  }

  // BABY BRAIN: Get brain insights
  getBrainInsights() {
    const memories = this.babyBrain.recall();
    const status = this.babyBrain.getStatus();
    
    // Analizar patrones en las memorias
    const queryTypes = {};
    const successRate = { success: 0, total: 0 };
    
    memories.forEach(memory => {
      if (memory.data.type === 'query') {
        const words = memory.data.message.toLowerCase().split(' ');
        words.forEach(word => {
          if (word.length > 3) { // Palabras significativas
            queryTypes[word] = (queryTypes[word] || 0) + 1;
          }
        });
      }
      
      if (memory.data.type === 'response') {
        successRate.total++;
        if (memory.data.success) successRate.success++;
      }
    });
    
    return {
      totalMemories: memories.length,
      memoryCapacity: status.connector.lobesStatus.memory.maxCapacity,
      successRate: successRate.total > 0 ? (successRate.success / successRate.total) * 100 : 0,
      commonWords: Object.entries(queryTypes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      oldestMemory: memories[0]?.timestamp || null,
      newestMemory: memories[memories.length - 1]?.timestamp || null,
      brainStatus: status
    };
  }
}

module.exports = { FudiClaudeDirect };