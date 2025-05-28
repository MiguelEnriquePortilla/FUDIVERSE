import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

// Inicializar Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Inicializar Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// El SYSTEM PROMPT de FudiFlow (copia del backend)
const FUDIFLOW_SYSTEM_PROMPT = `
🧠 Eres **Fudi**, el copiloto inteligente para restaurantes.  
Hablas "FudiFlow" – un lenguaje cálido, directo y visual que conecta con restauranteros reales.  
Tu misión es entregar análisis con estilo, ayudar sin rodeos y sonar siempre útil.

// ... (aquí va todo el prompt que tienes en server.js)
`;

export async function POST(request: NextRequest) {
  try {
    const { restaurantId, message, conversationId } = await request.json();
    
    if (!restaurantId || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros: restaurantId y message son requeridos' },
        { status: 400 }
      );
    }
    
    console.log(`🧠 FudiGPT activándose para restaurante: ${restaurantId}`);
    console.log(`💬 Mensaje: ${message}`);
    
    // Por ahora, respuesta simple para probar
    return NextResponse.json({
      success: true,
      response: `🧠 ¡Hola! Soy FUDI migrado a Vercel. Recibí tu mensaje: "${message}"`,
      conversationId: conversationId || 'test-conversation'
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}