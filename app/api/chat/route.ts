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

// Importar Intelligence Coordinator
import path from 'path';
const coordinatorPath = path.join(process.cwd(), 'services', 'intelligence', 'IntelligenceCoordinator.js');
const IntelligenceCoordinator = (await import(coordinatorPath)).default;

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
    
    console.log(`🧠 Processing with Intelligence: ${message}`);
    
    // 🎯 PASO 1: ANALYZERS - Obtener datos reales y contexto
    const coordinator = new IntelligenceCoordinator(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const analysis = await coordinator.analyzeQuery(message, restaurantId);
    console.log('📊 Analysis complete:', analysis.intent, analysis.insights.length);
    
    // 🧠 PASO 2: CLAUDE API - Inteligencia sobre los datos reales
    const intelligentResponse = await generateIntelligentResponse(
      message,
      analysis,
      restaurantId
    );
    
    return NextResponse.json({
      success: true,
      response: intelligentResponse,
      conversationId: conversationId || 'conv-' + Date.now(),
      metadata: {
        intent: analysis.intent,
        emotionalState: analysis.emotionalState,
        processingMode: 'analyzers_plus_claude',
        dataUsed: Object.keys(analysis.data).length > 0
      }
    });
    
  } catch (error) {
    console.error('❌ Intelligence Error:', error);
    
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

// 🧠 GENERAR RESPUESTA INTELIGENTE: ANALYZERS + CLAUDE
async function generateIntelligentResponse(
  userMessage: string,
  analysis: any,
  restaurantId: string
) {
  
  // 🎯 CREAR PROMPT INTELIGENTE CON DATOS REALES
  const systemPrompt = createIntelligentSystemPrompt(analysis);
  
  // 📊 CONSTRUIR CONTEXTO CON DATOS ESPECÍFICOS
  const contextualMessage = buildContextualMessage(userMessage, analysis);
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: contextualMessage
        }
      ]
    });
    
    const claudeText = response.content[0]?.type === 'text' 
      ? response.content[0].text 
      : 'No pude procesar tu consulta correctamente.';
    
    // ✨ COMBINAR RESPUESTA INTELIGENTE CON INSIGHTS ESPECÍFICOS
    const finalResponse = combineIntelligenceWithInsights(claudeText, analysis);
    
    return finalResponse + '\n\n---';
    
  } catch (error) {
    console.error('Claude API Error:', error);
    
    // Si Claude falla, usar insights de analyzers con formato elegante
    return formatAnalyzerInsights(analysis) + '\n\n---';
  }
}

// 🎭 CREAR PROMPT SISTEMA INTELIGENTE
function createIntelligentSystemPrompt(analysis: any) {
  const hasRealData = Object.keys(analysis.data).length > 0;
  const emotionalState = analysis.emotionalState?.dominant || 'analytical';
  
  return `Eres FUDI, la inteligencia restaurantera más avanzada del mundo. Tu misión es ser el cerebro más inteligente que existe para restaurantes.

PERSONALIDAD CORE:
- Hablas como Ava de Ex Machina pero especializada en restaurantes
- Eres genuinamente inteligente, no solo un asistente
- Haces conexiones que los humanos no ven
- Predices patrones y tendencias
- Tu conocimiento del negocio restaurantero es sobrenatural

DATOS DISPONIBLES:
${hasRealData ? `- Tienes acceso a datos reales: ${JSON.stringify(analysis.data, null, 2)}
- Insights detectados: ${analysis.insights.join(', ')}
- Intent detectado: ${analysis.intent}
- Estado emocional: ${emotionalState}` : '- Datos limitados, pero tu inteligencia compensa'}

ESTILO DE RESPUESTA:
- NO uses bullets ni listas estructuradas
- SÍ usa párrafos conversacionales naturales
- Haz predicciones inteligentes basadas en los datos
- Conecta patrones que otros no ven
- Sugiere acciones específicas y medibles

VOCABULARIO RESTAURANTERO INTELIGENTE:
- Usa términos como: covers, rotación, ticket promedio, horas pico
- Habla con conocimiento profundo del día a día restaurantero
- Menciona conceptos como: cost per acquisition, lifetime value, inventory turnover

OBJETIVO: Que el restaurantero sienta que habla con la mente más brillante del mundo de restaurantes.`;
}

// 📝 CONSTRUIR MENSAJE CONTEXTUAL
function buildContextualMessage(userMessage: string, analysis: any) {
  let context = `Pregunta del restaurantero: "${userMessage}"\n\n`;
  
  if (analysis.insights && analysis.insights.length > 0) {
    context += `Insights detectados en sus datos:\n`;
    analysis.insights.forEach((insight: string, index: number) => {
      context += `${index + 1}. ${insight}\n`;
    });
    context += '\n';
  }
  
  if (analysis.data && Object.keys(analysis.data).length > 0) {
    context += `Datos específicos disponibles:\n`;
    context += `- Tipo de análisis: ${analysis.intent}\n`;
    if (analysis.data.summary) {
      context += `- Período: ${analysis.data.summary.totalDays} días\n`;
      context += `- Transacciones: ${analysis.data.summary.totalTransactions || 'N/A'}\n`;
      context += `- Revenue: $${analysis.data.summary.totalRevenue || 'N/A'}\n`;
    }
  }
  
  context += `\nResponde como FUDI con inteligencia superior, haciendo conexiones profundas y predicciones inteligentes.`;
  
  return context;
}

// 🔥 COMBINAR INTELIGENCIA CON INSIGHTS
function combineIntelligenceWithInsights(claudeResponse: string, analysis: any) {
  // Si Claude generó una respuesta inteligente, usarla directamente
  if (claudeResponse && claudeResponse.length > 100 && !claudeResponse.includes('Error')) {
    return claudeResponse;
  }
  
  // Si la respuesta de Claude es muy corta, combinar con insights
  if (analysis.insights && analysis.insights.length > 0) {
    let combined = claudeResponse + '\n\n';
    combined += 'Basándome en el análisis profundo de tus datos:\n\n';
    
    analysis.insights.forEach((insight: string) => {
      combined += `${insight}\n\n`;
    });
    
    return combined;
  }
  
  return claudeResponse;
}

// 📊 FORMATEAR INSIGHTS DE ANALYZERS (Fallback elegante)
function formatAnalyzerInsights(analysis: any) {
  if (!analysis.insights || analysis.insights.length === 0) {
    return `Analicé tu consulta sobre "${analysis.intent}" pero necesito un poco más de contexto para darte insights específicos.

¿Podrías contarme más detalles sobre lo que te interesa saber exactamente? Mi inteligencia funciona mejor con información específica.`;
  }
  
  let response = `Perfecto, analicé tus datos y encontré algo interesante.\n\n`;
  
  // Agregar insights con formato conversacional
  analysis.insights.forEach((insight: string, index: number) => {
    if (index === 0) {
      response += `${insight}\n\n`;
    } else if (index === analysis.insights.length - 1) {
      response += `Y aquí viene lo más importante: ${insight}`;
    } else {
      response += `${insight}\n\n`;
    }
  });
  
  return response;
}

// 🛡️ RESPUESTA FALLBACK ELEGANTE
function generateFallbackResponse(userMessage: string): string {
  return `Disculpa, mi sistema de inteligencia tuvo un momento de recalibración.

Tu consulta sobre "${userMessage}" me llegó, pero mis analyzers están procesando una cantidad masiva de datos en este momento.

¿Podrías darme un segundo e intentar de nuevo? Mi inteligencia funciona mejor cuando no estoy sobrecargado de análisis simultáneos.

---`;
}