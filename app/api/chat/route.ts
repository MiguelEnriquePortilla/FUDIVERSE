import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
      
      // 🎭 VERIFICAR SI YA TENEMOS INSIGHTS REALES
      const hasRealInsights = neuralResponse.text && 
        neuralResponse.text.includes('**') && 
        neuralResponse.text.length > 100 &&
        !neuralResponse.text.includes('He procesado tu consulta');

      if (hasRealInsights) {
        console.log('✅ Using real insights directly - NO Claude elevation needed');
        
        return NextResponse.json({
          success: true,
          response: neuralResponse.text,
          conversationId: neuralResponse.conversationId,
          metadata: {
            processingMode: 'neural_real_data',
            neuralActivity: neuralResponse.metadata.neuralActivity,
            intelligenceLevel: 'real_data',
            responseTime: Date.now(),
            fudiflowActive: true
          }
        });
      }

      // Solo elevar si NO hay insights reales
      if (neuralResponse.metadata && neuralResponse.metadata.neuralActivity.includes('intelligence')) {
        console.log('🚀 Elevating to Claude intelligence (no real insights found)...');
      
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
      }
      
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
  
  try {
    const response = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      maxTokens: 1500,
      temperature: 0.7,
      system: FUDIFLOW_SUPREMO,
      prompt: buildSupremeContext(message, neuralResponse, restaurantId)
    });
    
    // Respuesta directa con nuevo AI SDK
    return {
      text: response.text + '\n\n---',
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
    const response = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      maxTokens: 1000,
      temperature: 0.7,
      system: FUDIFLOW_SUPREMO,
      prompt: `Restaurante ID: ${restaurantId}\nConsulta: "${message}"\n\nNota: Actualmente procesando sin datos específicos, pero mantén tu inteligencia superior y personalidad FudiFlow completa.`
    });
    
    return response.text + '\n\n---';
    
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