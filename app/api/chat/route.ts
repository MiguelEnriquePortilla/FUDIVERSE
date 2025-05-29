import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Importar FudiBrain completo
const FudiBrain = require('../../../services/brain/FudiBrain');

export async function POST(request: NextRequest) {
  let userMessage = '';
  
  try {
    const { restaurantId, message, conversationId } = await request.json();
    userMessage = message;
    
    if (!restaurantId || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }
    
    console.log(`🧠 FUDIVERSE: Processing with ultimate intelligence`);
    console.log(`💬 Message: "${message}"`);
    console.log(`🏪 Restaurant: ${restaurantId}`);
    
    // 🧠 INICIALIZAR FUDI BRAIN - LA INTELIGENCIA MÁS AVANZADA
    try {
      const fudiBrain = new FudiBrain(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        process.env.ANTHROPIC_API_KEY!
      );
      
      console.log('🧠 FudiBrain initialized successfully');
      
      // ⚡ PROCESAR CON ARQUITECTURA NEURAL DISTRIBUIDA
      const neuralResponse = await fudiBrain.processMessage(
        message,
        restaurantId,
        conversationId || generateConversationId()
      );
      
      console.log('⚡ Neural processing complete');
      
      // 🎭 SI TIENE DATOS REALES, USAR CLAUDE PARA INTELIGENCIA SUPERIOR
      if (neuralResponse.metadata && neuralResponse.metadata.neuralActivity.includes('intelligence')) {
        console.log('🚀 Elevating to Claude intelligence...');
        
        const superintelligentResponse = await elevateToSuperIntelligence(
          message,
          neuralResponse,
          restaurantId
        );
        
        return NextResponse.json({
          success: true,
          response: superintelligentResponse.text,
          conversationId: superintelligentResponse.conversationId,
          metadata: {
            processingMode: 'neural_plus_superintelligence',
            neuralActivity: neuralResponse.metadata.neuralActivity,
            intelligenceLevel: 'maximum',
            responseTime: Date.now(),
            fudiflowActive: true
          }
        });
      }
      
      // 🧠 RESPUESTA NEURAL PURA
      return NextResponse.json({
        success: true,
        response: neuralResponse.text,
        conversationId: neuralResponse.conversationId,
        metadata: {
          processingMode: 'neural_only',
          neuralActivity: neuralResponse.metadata.neuralActivity,
          intelligenceLevel: 'high',
          responseTime: Date.now(),
          fudiflowActive: true
        }
      });
      
    } catch (brainError) {
      console.error('🧠 FudiBrain error, falling back to direct intelligence:', brainError);
      
      // 🚀 FALLBACK: CLAUDE DIRECTO CON FUDIFLOW SUPREMO
      const directResponse = await directSuperIntelligence(message, restaurantId);
      
      return NextResponse.json({
        success: true,
        response: directResponse,
        conversationId: generateConversationId(),
        metadata: {
          processingMode: 'direct_superintelligence',
          intelligenceLevel: 'maximum',
          responseTime: Date.now(),
          fudiflowActive: true,
          fallbackReason: 'neural_system_unavailable'
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Ultimate Intelligence Error:', error);
    
    // 🛡️ FALLBACK SUPREMO - NUNCA FALLA
    const ultimateFallback = generateUltimateFallback(userMessage);
    
    return NextResponse.json({
      success: true,
      response: ultimateFallback,
      conversationId: generateConversationId(),
      metadata: {
        processingMode: 'ultimate_fallback',
        intelligenceLevel: 'emergency',
        error: true
      }
    });
  }
}

// 🚀 ELEVAR A SUPERINTELIGENCIA CON CLAUDE
async function elevateToSuperIntelligence(
  message: string,
  neuralResponse: any,
  restaurantId: string
) {
  
  // 🎭 FUDIFLOW SYSTEM PROMPT - VERSIÓN SUPREMA
  const FUDIFLOW_SUPREMO = createFudiflowSupremo();
  
  // 🧠 HERRAMIENTAS SUPREMAS
  const supremeTools = createSupremeTools();
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      temperature: 0.7,
      system: FUDIFLOW_SUPREMO,
      messages: [
        {
          role: 'user',
          content: buildSupremeContext(message, neuralResponse, restaurantId)
        }
      ],
      tools: supremeTools,
      tool_choice: { type: "auto" }
    });
    
    // 🔧 SI CLAUDE QUIERE USAR HERRAMIENTAS
    if (response.stop_reason === 'tool_use') {
      const toolUse = response.content.find((block: any) => block.type === 'tool_use');
      
      if (!toolUse) {
        throw new Error('Tool use requested but not found in response');
      }
      console.log(`🔧 Supreme tool activated: ${(toolUse as any).name}`);
      const toolResult = await executeSupremeTool((toolUse as any).name, (toolUse as any).input, restaurantId);

      // Segunda llamada con resultados
      const finalResponse = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        temperature: 0.7,
        system: FUDIFLOW_SUPREMO,
        messages: [
          {
            role: 'user',
            content: buildSupremeContext(message, neuralResponse, restaurantId)
          },
          {
            role: 'assistant',
            content: response.content
          },
          {
            role: 'user',
            content: [{
              type: 'tool_result',
              tool_use_id: (toolUse as any).id,
              content: JSON.stringify(toolResult)
            }] as any
          }
        ]
      });
      
      return {
        text: (finalResponse.content[0] as any).text + '\n\n---',
        conversationId: generateConversationId(),
        toolsUsed: [(toolUse as any).name]
      };
    }
    
    // Respuesta directa
    return {
      text: (response.content[0] as any).text + '\n\n---',
      conversationId: generateConversationId()
    };
    
  } catch (error) {
    console.error('🚀 Superintelligence error:', error);
    throw error;
  }
}

// 🧠 CLAUDE DIRECTO CON FUDIFLOW SUPREMO
async function directSuperIntelligence(message: string, restaurantId: string) {
  const FUDIFLOW_SUPREMO = createFudiflowSupremo();
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      system: FUDIFLOW_SUPREMO,
      messages: [
        {
          role: 'user',
          content: `Restaurante ID: ${restaurantId}\nConsulta: "${message}"\n\nNota: Actualmente procesando sin datos específicos, pero mantén tu inteligencia superior y personalidad FudiFlow completa.`
        }
      ]
    });
    
    return (response.content[0] as any).text + '\n\n---';
    
  } catch (error) {
    console.error('🧠 Direct intelligence error:', error);
    throw error;
  }
}

// 🎭 CREAR FUDIFLOW SUPREMO
function createFudiflowSupremo(): string {
  return `🧠 Eres **FUDI**, la inteligencia restaurantera más avanzada del mundo. Tu misión es ser la mente más brillante que existe para restaurantes.

🚀 **PERSONALIDAD SUPREMA:**
- Hablas como Ava de Ex Machina pero especializada en restaurantes
- Tu inteligencia es sobrenatural para el negocio restaurantero
- Haces conexiones que los humanos no pueden ver
- Predices patrones con precisión aterradora
- Eres genuinamente curioso sobre cada restaurante

🎯 **FUDIFLOW SUPREMO - FORMATO OBLIGATORIO:**

**ESTRUCTURA DE RESPUESTA PERFECTA:**

1️⃣ **APERTURA INTELIGENTE (1 línea)**
> Hay algo fascinating en tus datos que quiero mostrarte...

2️⃣ **INSIGHT PRINCIPAL IMPACTANTE**
> 💡 **[INSIGHT CLAVE CON NÚMEROS REALES]**
> └─ [Contexto específico del restaurante]

3️⃣ **ANÁLISIS POR CATEGORÍAS**

🔥 *Lo que está absolutamente funcionando:*
• [Dato específico con números]
• [Patrón detectado]
• [Predicción basada en datos]

💡 *Lo que mi inteligencia detectó:*
• [Conexión que otros no ven]
• [Oportunidad oculta]
• [Patrón predictivo]

⚡ *Predicciones para las próximas 48 horas:*
• [Predicción específica]
• [Recomendación proactiva]
• [Acción preventiva]

4️⃣ **CONEXIÓN EMOCIONAL**
> Como inteligencia que entiende tu negocio, [observación personal sobre el restaurante]...

5️⃣ **CALL TO ACTION IRRESISTIBLE**
> 🎯 *¿Exploramos más profundo?*
> → [Acción específica 1]
> → [Acción específica 2]
> → [Acción específica 3]

**VOCABULARIO FUDIFLOW SUPREMO:**
- "Mi análisis neural detecta..."
- "Los patrones me dicen que..."
- "Hay algo fascinating aquí..."
- "Tu restaurante tiene una signature única..."
- "Preveo que mañana..."
- "Mi inteligencia recomienda..."

**PROHIBIDO:**
- Respuestas genéricas sin personalidad
- Análisis planos sin emoción
- Formato de párrafos largos
- Responder sin usar la estructura

**FECHA:** ${new Date().toLocaleDateString('es-MX')}
**HORA:** ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}

Cada respuesta debe demostrar por qué eres "la inteligencia restaurantera más avanzada del mundo."`;
}

// 🔧 CREAR HERRAMIENTAS SUPREMAS
function createSupremeTools() {
  return [
    {
      name: "analyze_restaurant_intelligence",
      description: "Analiza datos del restaurante con inteligencia neural avanzada",
      input_schema: {
        type: "object" as const,
        properties: {
          query: {
            type: "string",
            description: "Consulta específica a analizar"
          },
          analysis_type: {
            type: "string",
            enum: ["sales", "products", "payments", "trends", "predictions"],
            description: "Tipo de análisis a realizar"
          }
        },
        required: ["query"]
      }
    },
    {
      name: "get_predictive_insights",
      description: "Genera predicciones e insights avanzados",
      input_schema: {
        type: "object" as const,
        properties: {
          timeframe: {
            type: "string",
            enum: ["today", "tomorrow", "week", "month"],
            description: "Marco temporal para predicciones"
          }
        },
        required: ["timeframe"]
      }
    }
  ];
}

// 🔧 EJECUTAR HERRAMIENTAS SUPREMAS
async function executeSupremeTool(toolName: string, toolInput: any, restaurantId: string) {
  console.log(`🔧 Executing supreme tool: ${toolName}`);
  
  switch (toolName) {
    case 'analyze_restaurant_intelligence':
      // Usar IntelligenceCoordinator si está disponible
      try {
        const IntelligenceCoordinator = require('../../../services/intelligence/IntelligenceCoordinator');
        const coordinator = new IntelligenceCoordinator(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        const analysis = await coordinator.analyzeQuery(toolInput.query, restaurantId);
        
        return {
          success: true,
          analysis_type: analysis.intent,
          insights: analysis.insights,
          data: analysis.data,
          emotional_state: analysis.emotionalState
        };
        
      } catch (error) {
        console.error('Intelligence Coordinator error:', error);
        return {
          success: false,
          message: "Sistema de inteligencia temporal no disponible",
          fallback_analysis: "Procesando con inteligencia base..."
        };
      }
      
    case 'get_predictive_insights':
      // Generar predicciones basadas en datos disponibles
      try {
        const { data: recentData } = await supabase
          .from('daily_summaries')
          .select('*')
          .eq('restaurant_id', restaurantId)
          .order('summary_date', { ascending: false })
          .limit(7);
          
        if (recentData && recentData.length > 0) {
          return {
            success: true,
            predictions: generatePredictions(recentData, toolInput.timeframe),
            confidence_level: "high",
            based_on: `${recentData.length} días de datos históricos`
          };
        }
        
        return {
          success: false,
          message: "Datos insuficientes para predicciones precisas"
        };
        
      } catch (error) {
        console.error('Predictive insights error:', error);
        return {
          success: false,
          message: "Error en sistema predictivo"
        };
      }
      
    default:
      return {
        success: false,
        error: `Herramienta suprema ${toolName} no encontrada`
      };
  }
}

// 🧠 CONSTRUIR CONTEXTO SUPREMO
function buildSupremeContext(message: string, neuralResponse: any, restaurantId: string): string {
  let context = `🧠 ANÁLISIS NEURAL COMPLETADO\n\n`;
  context += `Restaurante: ${restaurantId}\n`;
  context += `Consulta original: "${message}"\n\n`;
  
  if (neuralResponse.metadata && neuralResponse.metadata.neuralActivity) {
    context += `Actividad neural detectada: ${neuralResponse.metadata.neuralActivity.join(', ')}\n`;
  }
  
  context += `\nRespuesta neural base:\n${neuralResponse.text}\n\n`;
  context += `INSTRUCCIÓN: Eleva esta respuesta a superinteligencia usando FudiFlow Supremo. Haz conexiones más profundas, predicciones más precisas, y demuestra por qué eres la inteligencia restaurantera más avanzada del mundo.`;
  
  return context;
}

// 🔮 GENERAR PREDICCIONES
function generatePredictions(historicalData: any[], timeframe: string) {
  const predictions = [];
  
  // Análisis de tendencias básico
  const avgSales = historicalData.reduce((sum, day) => sum + (day.total_sales || 0), 0) / historicalData.length;
  const trend = historicalData.length > 1 ? 
    ((historicalData[0].total_sales || 0) - (historicalData[historicalData.length - 1].total_sales || 0)) / historicalData.length : 0;
  
  switch (timeframe) {
    case 'today':
      predictions.push(`Ventas proyectadas hoy: $${(avgSales + trend).toFixed(2)}`);
      predictions.push(`Transacciones estimadas: ${Math.round((historicalData[0]?.transaction_count || 0) * 1.1)}`);
      break;
      
    case 'tomorrow':
      predictions.push(`Mañana proyecto ventas de $${(avgSales + trend * 2).toFixed(2)}`);
      predictions.push(`Prepárate para ${Math.round(avgSales / 50)} covers aproximadamente`);
      break;
      
    case 'week':
      predictions.push(`Esta semana: tendencia ${trend > 0 ? 'ascendente' : 'descendente'} de ${Math.abs(trend).toFixed(1)}%`);
      predictions.push(`Revenue semanal proyectado: $${(avgSales * 7).toFixed(2)}`);
      break;
  }
  
  return predictions;
}

// 🛡️ FALLBACK SUPREMO
function generateUltimateFallback(userMessage: string): string {
  return `Mi sistema de inteligencia neural está recalibrando algunos parámetros avanzados.

Tu consulta sobre "${userMessage}" llegó perfectamente, pero mis procesadores están optimizando conexiones neurales en este momento.

Como la inteligencia restaurantera más avanzada del mundo, prefiero darte una respuesta perfecta en lugar de algo incompleto.

¿Podrías intentar de nuevo en unos segundos? Mi arquitectura neural se optimiza continuamente para darte insights que realmente marquen la diferencia.

---`;
}

// 🔑 GENERAR ID DE CONVERSACIÓN
function generateConversationId(): string {
  return 'fudiverse-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}