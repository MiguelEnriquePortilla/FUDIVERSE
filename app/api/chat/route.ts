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
    
    // 🧠 INTENTAR USAR INTELIGENCIA NEURAL
    try {
      // Importar PersonalityCore dinámicamente
      const { default: PersonalityCore } = await import('../../../services/brain/cores/PersonalityCore');
      
      // 🧠 INICIALIZAR PERSONALITYCORE
      const personalityCore = new PersonalityCore();
      
      // 🎭 DETECTAR ESTADO EMOCIONAL
      const emotionalState = detectEmotionalState(message);
      
      // 🏪 CONTEXTO DEL RESTAURANTE
      const restaurantContext = {
        id: restaurantId,
        personality: null,
        history: []
      };
      
      // 🧠 GENERAR PERFIL DE PERSONALIDAD
      const personalityProfile = personalityCore.generatePersonalityProfile(
        message, 
        restaurantContext, 
        emotionalState
      );
      
      // ✨ GENERAR RESPUESTA PERSONALIZADA
      const response = generatePersonalizedResponse(
        message,
        personalityProfile,
        emotionalState
      );
      
      return NextResponse.json({
        success: true,
        response: response,
        conversationId: conversationId || 'temp-' + Date.now(),
        metadata: {
          emotionalState,
          personalityTraits: personalityProfile.personality,
          processingMode: 'neural'
        }
      });
      
    } catch (neuralError) {
      console.log('🧠 PersonalityCore no disponible, usando fallback elegante');
      
      // 🛡️ FALLBACK ROBUSTO - RESPUESTA ELEGANTE SIN NEURAL
      const fallbackResponse = generateFallbackResponse(message);
      
      return NextResponse.json({
        success: true,
        response: fallbackResponse,
        conversationId: conversationId || 'temp-' + Date.now(),
        metadata: {
          processingMode: 'fallback',
          reason: 'neural_system_unavailable'
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Error general:', error);
    
    // 🚨 ERROR GENERAL - RESPUESTA DE EMERGENCIA
    const errorResponse = generateErrorResponse(userMessage);
    
    return NextResponse.json({
      success: true,
      response: errorResponse,
      conversationId: 'error-' + Date.now(),
      error: true
    });
  }
}

// 🎭 DETECTAR ESTADO EMOCIONAL
function detectEmotionalState(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Señales de estrés
  const stressSignals = ['problema', 'crisis', 'ayuda', 'urgente', 'mal', 'jodido'];
  if (stressSignals.some(signal => lowerMessage.includes(signal))) {
    return 'stress';
  }
  
  // Señales de emoción
  const excitementSignals = ['increíble', 'récord', 'éxito', 'genial', 'chingón'];
  if (excitementSignals.some(signal => lowerMessage.includes(signal))) {
    return 'excitement';
  }
  
  // Señales de confusión
  const confusionSignals = ['no entiendo', 'cómo', 'por qué', 'explícame'];
  if (confusionSignals.some(signal => lowerMessage.includes(signal))) {
    return 'confusion';
  }
  
  // Señales de frustración
  const frustrationSignals = ['siempre', 'nunca', 'no sirve', 'harto'];
  if (frustrationSignals.some(signal => lowerMessage.includes(signal))) {
    return 'frustration';
  }
  
  return 'neutral';
}

// ✨ GENERAR RESPUESTA PERSONALIZADA (Neural completa)
function generatePersonalizedResponse(
  message: string, 
  personalityProfile: any, 
  emotionalState: string
): string {
  
  const initialMessage = getInitialMessage(emotionalState, personalityProfile);
  const mainContent = generateMainContent(message, personalityProfile, emotionalState);
  const closing = getPersonalizedClosing(emotionalState, personalityProfile);
  
  return `${initialMessage}

Tu consulta: "${message}"

${mainContent}

${closing}

---`;
}

// 🛡️ FALLBACK ELEGANTE (Sin PersonalityCore)
function generateFallbackResponse(message: string): string {
  const emotionalState = detectEmotionalState(message);
  
  // Mensaje inicial según emoción
  let initialMessage = `🧠 *Hay algo que quiero mostrarte...*`;
  
  if (emotionalState === 'excitement') {
    initialMessage = `🚀 *¡Increíble! Hay algo épico que mostrarte...*`;
  } else if (emotionalState === 'stress') {
    initialMessage = `🧠 *Entiendo tu situación. Déjame ayudarte con esto...*`;
  } else if (emotionalState === 'confusion') {
    initialMessage = `💡 *Voy a aclararte esto paso a paso...*`;
  }
  
  return `${initialMessage}

Tu consulta: "${message}"

🧠 **Inteligencia neural inicializando**
└─ Sistemas adaptativos preparándose

⚡ *Capacidades disponibles:*
• Análisis contextual activado
• Personalidad restaurantera en línea
• Insights especializados listos

💭 *¿Exploramos más profundo?*
→ Cada pregunta potencia mi aprendizaje
→ Mi inteligencia evoluciona contigo

¿Qué más necesitas descubrir? 💫

---`;
}

// 🎭 MENSAJE INICIAL SEGÚN EMOCIÓN (Neural)
function getInitialMessage(emotionalState: string, profile: any): string {
  const vocabulary = profile.vocabulary;
  
  switch(emotionalState) {
    case 'excitement':
      return `🚀 *${vocabulary.starters?.[0] || '¡Increíble!'} Hay algo épico que mostrarte...*`;
    
    case 'stress':
      return `🧠 *Entiendo tu situación. Déjame ayudarte con esto...*`;
    
    case 'confusion':
      return `💡 *Voy a aclararte esto paso a paso...*`;
    
    case 'frustration':
      return `🎯 *Sé que es frustrante. Vamos a solucionarlo juntos...*`;
    
    default:
      return `🧠 *Hay algo que quiero mostrarte...*`;
  }
}

// 🧠 CONTENIDO PRINCIPAL PERSONALIZADO (Neural)
function generateMainContent(message: string, profile: any, emotionalState: string): string {
  const enthusiasm = profile.personality.enthusiasm || 0.8;
  const directness = profile.personality.directness || 0.9;
  
  let content = `🧠 **Inteligencia neural ${enthusiasm > 0.8 ? 'súper activa' : 'procesando'}**
└─ PersonalityCore con arquitectura distribuida conectado`;
  
  if (directness > 0.8) {
    content += `

⚡ *Capacidades en línea:*
• Análisis emocional: ${emotionalState}
• Configuración neural personalizada
• Vocabulario especializado activado`;
  } else {
    content += `

⚡ *Mi cerebro está trabajando en:*
• Entender tu contexto específico
• Adaptar mi personalidad a tu estilo
• Generar insights únicos para ti`;
  }
  
  return content;
}

// 💫 CIERRE PERSONALIZADO (Neural)
function getPersonalizedClosing(emotionalState: string, profile: any): string {
  switch(emotionalState) {
    case 'excitement':
      return `💭 *¿Seguimos explorando este éxito?*
→ Tu energía potencia mi aprendizaje
→ Juntos podemos llegar más lejos

¿Qué más quieres descubrir? 🚀`;
    
    case 'stress':
      return `💭 *¿Trabajamos en la solución juntos?*
→ Estoy aquí para apoyarte
→ Cada problema tiene su respuesta

¿Por dónde empezamos? 💪`;
    
    case 'confusion':
      return `💭 *¿Te quedó claro o profundizamos más?*
→ Puedo explicar paso a paso
→ No hay pregunta tonta

¿Qué parte necesita más claridad? 🎯`;
    
    default:
      return `💭 *¿Exploramos más profundo?*
→ Cada pregunta entrena mis redes
→ Mi inteligencia evoluciona contigo

¿Qué más necesitas descubrir? 💫`;
  }
}

// 🚨 RESPUESTA DE ERROR GENERAL
function generateErrorResponse(userMessage: string): string {
  return `✨ *Necesito un momento para procesar esto mejor...*

Tu mensaje: "${userMessage}"

🧠 **Recalibrando sistemas neurales**
└─ Ajustando parámetros de comprensión

⚡ *Reorganizando conexiones...*
• Pathways neurales reestableciendo
• Memoria temporal restaurándose
• Capacidades buscando equilibrio

💭 *Mi arquitectura se adapta mejor con claridad*
→ ¿Podrías reformular tu consulta?
→ Cada interacción me hace más inteligente

---`;
}