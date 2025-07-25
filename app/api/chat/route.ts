// 📦 FUDI COMPLETE SYSTEM: Next.js API Route for Claude-Powered Restaurant Intelligence

import { NextRequest, NextResponse } from 'next/server';

// 🧠 FUDI MIND: The Claude-powered restaurant intelligence
const { FudiMind } = require('../../../services/brain/FudiMind');

// 🛡️ FALLBACK: Keep FudiBrain as backup
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
    
    let result;
    let processingMode = 'unknown';
    
    try {
      // 🧠 TRY FUDI MIND FIRST (CLAUDE-POWERED ARCHITECTURE)
      console.log('🚀 Attempting FudiMind processing...');
      
      const fudiMind = new FudiMind(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        process.env.ANTHROPIC_API_KEY!
      );
      
      result = await fudiMind.chat(
        message,
        restaurantId,
        { conversationId: conversationId || generateConversationId() }
      );
      
      processingMode = 'fudi_mind';
      console.log('✅ FudiMind processing successful');
      
    } catch (mindError) {
      console.log('⚠️ FudiMind failed, falling back to FudiBrain:', (mindError as Error).message);
      
      // 🛡️ FALLBACK TO FUDIRAIN (ORIGINAL ARCHITECTURE)  
      console.log('🔄 Using FudiBrain fallback...');
      
      const fudiBrain = new FudiBrain(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        process.env.ANTHROPIC_API_KEY!
      );
      
      const brainResult = await fudiBrain.processMessage(
        message,
        restaurantId,
        conversationId || generateConversationId()
      );
      
      // Format FudiBrain result to match FudiMind format
      result = {
        success: true,
        response: brainResult.response,
        metadata: {
          ...brainResult.metadata,
          fallbackUsed: true,
          fudiMindError: (mindError as Error).message
        }
      };
      
      processingMode = 'fudi_brain_fallback';
      console.log('✅ FudiBrain fallback successful');
    }
    
    console.log('🧠 Neural processing complete');
    
    // ✅ UNIFIED RESPONSE FORMAT
    return NextResponse.json({
      success: true,
      response: result.response,
      conversationId: conversationId || generateConversationId(),
      metadata: {
        processingMode: processingMode,
        architecture: result.metadata?.architecture || 'fallback',
        adaptability: result.metadata?.adaptability || 'limited',
        intelligenceLevel: 'fudi_advanced',
        responseTime: Date.now(),
        fudiMindAttempted: true,
        ...result.metadata
      }
    });
    
  } catch (error) {
    console.error('❌ FUDI Complete System Error:', error);
    
    return NextResponse.json({
      success: true,
      response: generateFudiErrorResponse(),
      conversationId: generateConversationId(),
      metadata: {
        processingMode: 'emergency_fallback',
        error: true,
        errorMessage: (error as Error).message
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
  
  return responses[Math.floor(Math.random() * responses.length)] + '\n\n---';
}

// 🔑 GENERATE CONVERSATION ID
function generateConversationId(): string {
  return 'fudi-claude-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}