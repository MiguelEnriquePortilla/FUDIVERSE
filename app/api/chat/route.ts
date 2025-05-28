import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { restaurantId, message, conversationId } = await request.json();
    
    if (!restaurantId || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }
    
    console.log(`💬 Simple response for: ${message}`);
    
    // Respuesta temporal mientras conectamos el cerebro
    const simpleResponse = `¡Hola! Tu mensaje "${message}" fue recibido. 

🧠 **FUDI Neural está en construcción** 
└─ Pronto tendrás el cerebro completo

🎯 *Mientras tanto:*
→ Sigue probando el chat
→ El cerebro neural viene en camino

¿Qué más quieres saber? 💪

---`;
    
    return NextResponse.json({
      success: true,
      response: simpleResponse,
      conversationId: conversationId || 'temp-' + Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({
      success: true,
      response: '😅 Ups, hubo un error. ¿Puedes repetir?\n\n---',
      error: true
    });
  }
}