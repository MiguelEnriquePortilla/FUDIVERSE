import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    
    // Respuesta temporal con formato FudiFlow
    const response = `¡Al tiro! Procesé tu mensaje: "${message}"

🧠 **Sistema Neural en construcción**
└─ PersonalityCore con miles de líneas listo

🔥 *Lo que viene:*
• Cerebro distribuido activándose
• Personalidades especializadas  
• Visual configs dinámicos

🎯 *¿Le metemos lupa?*
→ Sigue probando preguntas
→ El cerebro evoluciona contigo

¿Qué más quieres saber? 💪

---`;
    
    return NextResponse.json({
      success: true,
      response: response,
      conversationId: conversationId || 'temp-' + Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    
    return NextResponse.json({
      success: true,
      response: `😅 Mi cerebro tuvo un cortocircuito con: "${userMessage}"

🧠 **Modo seguro activado**
└─ Reiniciando sistemas neurales

¿Puedes repetir? 💪

---`,
      conversationId: 'error-' + Date.now(),
      error: true
    });
  }
}