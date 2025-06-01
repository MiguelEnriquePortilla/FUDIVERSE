import { NextRequest, NextResponse } from 'next/server';

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
    
    // 🧠 INITIALIZE FUDI BRAIN - CLEAN ARCHITECTURE
    const fudiBrain = new FudiBrain(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      process.env.ANTHROPIC_API_KEY!
    );
    
    // ⚡ PROCESS THROUGH NEURAL NETWORK (CLEAN)
    const result = await fudiBrain.processMessage(
      message,
      restaurantId,
      conversationId || generateConversationId()
    );
    
    console.log('🧠 Neural processing complete');
    
    // ✅ SIMPLE PASSTHROUGH - LET FUDIBRAIN HANDLE EVERYTHING
    return NextResponse.json({
      success: true,
      response: result.response,
      conversationId: result.conversationId,
      metadata: {
        processingMode: 'clean_neural_architecture',
        neuralActivity: result.neuralActivity,
        intelligenceLevel: 'fudi_systematic',
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