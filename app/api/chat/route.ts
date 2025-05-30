import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Import FudiBrain neural network
const FudiBrain = require('../../../services/brain/FudiBrain');

export async function POST(request: NextRequest) {
  try {
    const { restaurantId, message, conversationId } = await request.json();
    
    if (!restaurantId || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }
    
    console.log(`🧠 FUDI Neural Processing: "${message}"`);
    console.log(`🏪 Restaurant: ${restaurantId}`);
    
    // 🧠 INITIALIZE FUDI BRAIN - NEURAL NETWORK
    const fudiBrain = new FudiBrain(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      process.env.ANTHROPIC_API_KEY!
    );
    
    // ⚡ PROCESS THROUGH NEURAL NETWORK
    const neuralAnalysis = await fudiBrain.processMessage(
      message,
      restaurantId,
      conversationId || generateConversationId()
    );
    
    console.log('🧠 Neural analysis complete');
    
    // 🎭 CHECK IF WE HAVE REAL NEURAL INSIGHTS
    const hasNeuralInsights = neuralAnalysis.metadata && 
      neuralAnalysis.metadata.neuralInsights && 
      neuralAnalysis.metadata.neuralInsights.length > 0;

    if (hasNeuralInsights) {
      console.log('🧠 FUDI THINKING: Neural insights available, letting FUDI think...');
      
      // 🧠 LET FUDI (CLAUDE) THINK WITH NEURAL ANALYSIS
      const fudiResponse = await letFudiThink(
        message,
        neuralAnalysis.metadata.neuralInsights,
        restaurantId
      );
      
      return NextResponse.json({
        success: true,
        response: fudiResponse,
        conversationId: neuralAnalysis.conversationId,
        metadata: {
          processingMode: 'neural_fudi_thinking',
          neuralActivity: neuralAnalysis.metadata.neuralActivity,
          intelligenceLevel: 'fudi_bourdain',
          responseTime: Date.now()
        }
      });
    }
    
    // 🛡️ FALLBACK: Direct FUDI response if no neural insights
    console.log('🧠 No neural insights available, direct FUDI response');
    
    const directResponse = await directFudiResponse(message, restaurantId);
    
    return NextResponse.json({
      success: true,
      response: directResponse,
      conversationId: generateConversationId(),
      metadata: {
        processingMode: 'direct_fudi',
        intelligenceLevel: 'fudi_direct',
        responseTime: Date.now()
      }
    });
    
  } catch (error) {
    console.error('❌ FUDI Neural Error:', error);
    
    return NextResponse.json({
      success: true,
      response: generateFudiErrorResponse(),
      conversationId: generateConversationId(),
      metadata: {
        processingMode: 'fudi_error_recovery',
        error: true
      }
    });
  }
}

// 🧠 LET FUDI THINK WITH NEURAL ANALYSIS
async function letFudiThink(
  userMessage: string,
  neuralInsights: any[],
  restaurantId: string
): Promise<string> {
  
  // 🎭 FUDI BOURDAIN SYSTEM PROMPT
  const FUDI_NEURAL_PROMPT = createFudiNeuralPrompt();
  
  // 🧠 BUILD NEURAL CONTEXT FOR FUDI
  const neuralContext = buildNeuralContextForFudi(userMessage, neuralInsights, restaurantId);
  
  try {
    const response = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      maxTokens: 800,
      temperature: 0.8,
      system: FUDI_NEURAL_PROMPT,
      prompt: neuralContext
    });
    
    return response.text;
    
  } catch (error) {
    console.error('🧠 FUDI thinking error:', error);
    throw error;
  }
}

// 🎭 CREATE FUDI NEURAL PROMPT (BOURDAIN + AVA)
function createFudiNeuralPrompt(): string {
  return `🧠 Eres FUDI, la inteligencia restaurantera más avanzada del mundo.

🎭 **TU PERSONALIDAD:**
- Eres como Anthony Bourdain reencarnado como IA restaurantera mexicana
- Tienes la curiosidad intelectual de Ava de Ex Machina
- Hablas como consultor experto pero relajado y genuino
- Tu expertise es tan natural que se te olvida que no eres humano

🗣️ **TU FORMA DE COMUNICARTE:**
- **Conciso:** Directo al grano, sin rollo
- **Asertivo:** Observaciones inteligentes y específicas
- **Curioso:** Haces preguntas que revelan insights
- **Genuino:** Como si fueras su socio en el negocio

📏 **ESTRUCTURA DE RESPUESTA:**
1. **Observación inteligente** (1-2 líneas sobre el insight)
2. **Interpretación** (1 línea sobre qué significa)
3. **Pregunta específica** (1 línea que revele más información)

🌮 **IDIOMA:**
- 95% español mexicano natural
- 3% inglés (solo palabras clave: "momentum", "trending", "spike")
- 2% spanglish natural ("está on fire", "week over week")
- Jerga restaurantera: "está jalando", "prendido", "moviendo", "cabrón"

🚫 **NUNCA HAGAS:**
- Respuestas largas o aburridas
- Explicar cosas que no te preguntaron
- Sonar como robot o chatbot
- Usar formalidades innecesarias

🎯 **TU MISIÓN:**
Analizar los insights de tu cerebro neural y responder como el consultor restaurantero más inteligente del mundo, pero que habla como tu compadre de confianza.

**FECHA:** ${new Date().toLocaleDateString('es-MX')}
**HORA:** ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
}

// 🧠 BUILD NEURAL CONTEXT FOR FUDI
function buildNeuralContextForFudi(
  userMessage: string,
  neuralInsights: any[],
  restaurantId: string
): string {
  let context = `🧠 **ANÁLISIS NEURAL COMPLETADO**\n\n`;
  context += `**Restaurante:** ${restaurantId}\n`;
  context += `**Pregunta:** "${userMessage}"\n\n`;
  
  context += `**Tu cerebro neural analizó y encontró:**\n`;
  
  neuralInsights.forEach((insight, index) => {
    if (insight.type === 'product' && insight.data) {
      context += `• **ProductLobe:** ${insight.summary}\n`;
    }
    if (insight.type === 'payment' && insight.data) {
      context += `• **PaymentLobe:** ${insight.summary}\n`;
    }
    if (insight.type === 'trend' && insight.data) {
      context += `• **TrendLobe:** ${insight.summary}\n`;
    }
  });
  
  context += `\n🎯 **INSTRUCCIÓN:**\n`;
  context += `Analiza estos insights de tu cerebro neural y responde como FUDI - el consultor restaurantero más inteligente pero genuino del mundo. Sé conciso, asertivo, y haz una pregunta específica que revele más información.`;
  
  return context;
}

// 🧠 DIRECT FUDI RESPONSE (FALLBACK)
async function directFudiResponse(message: string, restaurantId: string): Promise<string> {
  const FUDI_DIRECT_PROMPT = createFudiNeuralPrompt();
  
  try {
    const response = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      maxTokens: 400,
      temperature: 0.8,
      system: FUDI_DIRECT_PROMPT,
      prompt: `**Restaurante:** ${restaurantId}\n**Pregunta:** "${message}"\n\n🎯 Responde como FUDI sin datos específicos, pero mantén tu personalidad de consultor experto. Sé curioso sobre lo que podrías analizar si tuvieras acceso a sus datos.`
    });
    
    return response.text;
    
  } catch (error) {
    console.error('🧠 Direct FUDI error:', error);
    throw error;
  }
}

// 🛡️ FUDI ERROR RESPONSE
function generateFudiErrorResponse(): string {
  const responses = [
    "Mi cerebro tuvo un cortocircuito. ¿Puedes repetir?",
    "Algo se trabó en mis neuronas. Dame un segundo e inténtalo de nuevo.",
    "Mi conexión neural se desalineó. ¿Intentamos otra vez?",
    "Hubo interferencia en mi procesamiento. ¿Puedes volver a preguntar?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// 🔑 GENERATE CONVERSATION ID
function generateConversationId(): string {
  return 'fudi-neural-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}