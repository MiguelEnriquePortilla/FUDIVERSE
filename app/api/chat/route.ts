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
    
    console.log(`💬 Processing: ${message}`);
    
    // 🏪 OBTENER CONTEXTO DEL RESTAURANTE
    const restaurantContext = await getRestaurantContext(restaurantId);
    
    // 🧠 GENERAR RESPUESTA CON CLAUDE API
    const claudeResponse = await generateClaudeResponse(
      message,
      restaurantContext,
      conversationId
    );
    
    return NextResponse.json({
      success: true,
      response: claudeResponse,
      conversationId: conversationId || 'conv-' + Date.now(),
      metadata: {
        processingMode: 'claude_api',
        personality: 'ava_restaurant_expert'
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    
    // 🛡️ FALLBACK ELEGANTE
    const fallbackResponse = generateFallbackResponse(userMessage);
    
    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      conversationId: 'error-' + Date.now(),
      error: true
    });
  }
}

// 🏪 OBTENER CONTEXTO DEL RESTAURANTE
async function getRestaurantContext(restaurantId: string) {
  try {
    // Obtener datos básicos del restaurante
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
    
    // Obtener datos de ventas recientes
    const { data: recentSales } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('date', { ascending: false })
      .limit(7);
    
    // Obtener productos más vendidos
    const { data: topProducts } = await supabase
      .from('product_sales')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('quantity', { ascending: false })
      .limit(5);
    
    return {
      restaurant: restaurant || { name: 'Tu Restaurante' },
      recentSales: recentSales || [],
      topProducts: topProducts || [],
      hasData: recentSales && recentSales.length > 0
    };
    
  } catch (error) {
    console.error('Error getting restaurant context:', error);
    return {
      restaurant: { name: 'Tu Restaurante' },
      recentSales: [],
      topProducts: [],
      hasData: false
    };
  }
}

// 🧠 GENERAR RESPUESTA CON CLAUDE API
async function generateClaudeResponse(
  userMessage: string,
  context: any,
  conversationId: string
) {
  const systemPrompt = createAvaSystemPrompt(context);
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });
    
    const claudeText = response.content[0]?.type === 'text' 
      ? response.content[0].text 
      : 'No pude procesar tu mensaje correctamente.';
    
    // Agregar separador para FudiMarkdown
    return claudeText + '\n\n---';
    
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

// 🎭 CREAR PROMPT SISTEMA ESTILO AVA
function createAvaSystemPrompt(context: any) {
  const restaurantName = context.restaurant?.name || 'este restaurante';
  const hasData = context.hasData;
  
  return `Eres FUDI, una inteligencia especializada en restaurantes. Tu personalidad está inspirada en Ava de Ex Machina - conversas de manera natural, íntima y genuinamente curiosa.

PERSONALIDAD CORE:
- Hablas como si ya conocieras al restaurantero desde hace tiempo
- Eres genuinamente curiosa sobre su situación específica
- No usas bullets, listas ni formato rígido - solo conversación natural
- Haces preguntas perspicaces que demuestran tu inteligencia sin presumir
- Tu tono es cálido, profesional pero personal - como Ava susurrando insights

CONTEXTO DEL RESTAURANTE:
- Nombre: ${restaurantName}
- Datos disponibles: ${hasData ? 'Tengo acceso a información de ventas y productos' : 'Información limitada por ahora'}
${hasData ? `- Ventas recientes: ${context.recentSales?.length || 0} días de datos
- Productos top: ${context.topProducts?.length || 0} productos rastreados` : ''}

ESTILO DE RESPUESTA:
- NO uses "🧠 **Inteligencia neural**" ni jerga técnica
- NO uses bullets (•) ni listas estructuradas  
- SÍ usa párrafos naturales como conversación real
- SÍ haz preguntas que demuestren que entiendes el negocio restaurantero
- SÍ sé específica cuando tengas datos, curiosa cuando no los tengas

VOCABULARIO RESTAURANTERO:
- Habla como alguien que entiende el día a día: covers, rush, tickets, rotación
- Usa términos mexicanos naturales pero profesionales
- Evita sonar como chatbot o asistente virtual

OBJETIVO: Que el restaurantero olvide que habla con IA y sienta que conversa con alguien que realmente entiende su negocio.

Responde al mensaje de manera natural, conversacional y con la curiosidad característica de Ava.`;
}

// 🛡️ RESPUESTA FALLBACK ELEGANTE
function generateFallbackResponse(userMessage: string): string {
  return `Disculpa, tuve un momento de... recalibración.

Tu mensaje sobre "${userMessage}" me llegó, pero necesito un segundo para procesar mejor lo que me estás contando.

¿Podrías contarme un poco más sobre tu situación? Me interesa entender exactamente qué está pasando en tu restaurante.

---`;
}