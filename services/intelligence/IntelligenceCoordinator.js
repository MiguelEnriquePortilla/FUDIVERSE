const TrendAnalyzer = require('./TrendAnalyzer');
const PeakHourAnalyzer = require('./PeakHourAnalyzer');
const PaymentAnalyzer = require('./PaymentAnalyzer');
const ProductPerformanceAnalyzer = require('./ProductPerformanceAnalyzer');

class IntelligenceCoordinator {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    
    this.analyzers = {
      trend: new TrendAnalyzer(),
      peakHour: new PeakHourAnalyzer(),
      payment: new PaymentAnalyzer(supabaseUrl, supabaseKey),
      product: new ProductPerformanceAnalyzer(supabaseUrl, supabaseKey)
    };
  }

  // Análisis básico del dashboard (mantener compatibilidad)
  analyzeSalesData(data) {
    const results = {};

    // Análisis de tendencia
    if (data.todayTotal && data.yesterdayTotal) {
      results.trend = this.analyzers.trend.analyzeTrend(
        data.todayTotal,
        data.yesterdayTotal
      );
    }

    // Análisis de hora pico
    if (data.hourlyArray) {
      results.peakHours = this.analyzers.peakHour.analyzePeakHours(
        data.hourlyArray
      );
    }

    return results;
  }

  // Nuevo: Análisis para el chat
  async analyzeQuery(query, restaurantId) {
    console.log('🧠 IntelligenceCoordinator analizando:', query);
    
    const intent = this.detectIntent(query);
    console.log('🎯 Intent detectado:', intent);
    
    const response = {
      intent,
      insights: [],
      data: {},
      fudiStyle: true
    };

    try {
      switch (intent) {
        case 'payment_analysis':
          const paymentResults = await this.analyzers.payment.analyze(restaurantId, 30);
          response.data = paymentResults.data;
          response.insights = paymentResults.insights;
          break;

        case 'product_analysis':
          const productResults = await this.analyzers.product.analyze(restaurantId, 30);
          response.data = productResults.data;
          response.insights = productResults.insights;
          break;

        case 'employee_analysis':
          response.insights = [
            "👥 Análisis de empleados en desarrollo",
            "Pronto verás quién está rompiendo récords"
          ];
          break;
          
        case 'inventory_analysis':
          response.insights = [
            "📦 Análisis de inventario próximamente",
            "Te avisaré cuando necesites reabastecer"
          ];
          break;
          
        case 'customer_analysis':
          response.insights = [
            "🎯 Análisis de clientes en construcción",
            "Pronto conocerás mejor a tus comensales"
          ];
          break;
          
        case 'trend_analysis':
          response.insights = [
            "📈 Análisis de tendencias en desarrollo",
            "Pronto podré mostrarte tendencias detalladas"
          ];
          break;
          
        case 'peak_hours':
          response.insights = [
            "⏰ Análisis de horas pico en desarrollo",
            "Pronto identificaré tus mejores horarios"
          ];
          break;
          
        default:
          response.insights = [
            "🤔 No estoy seguro de qué análisis necesitas",
            "Puedo ayudarte con: métodos de pago, productos, empleados, inventario, clientes, tendencias y horas pico"
          ];
      }
    } catch (error) {
      console.error('❌ Error en análisis:', error);
      response.insights = [
        "😅 Ups, tuve un problemita técnico",
        "Intenta de nuevo en un momento"
      ];
    }

    // ✨ NUEVO: Detectar estado emocional y aplicar personalidad
    const emotionalState = this.detectEmotionalState(query, intent, response);
    console.log('🎭 Estado emocional:', emotionalState);
    
    // ✨ NUEVO: Aplicar tono emocional a la respuesta
    response.emotionalState = emotionalState;
    response.insights = this.applyEmotionalTone(response.insights, emotionalState, response.data);

    return response;
  }

  detectIntent(query) {
    const lowerQuery = query.toLowerCase();
    
    // Detectar análisis de pagos
    if (lowerQuery.match(/pago|payment|método|tarjeta|efectivo|transferencia|cash|card|cobr/i)) {
      return 'payment_analysis';
    }
    
    // Detectar análisis de productos
    if (lowerQuery.match(/producto|platillo|vend|estrella|popular|combo|menu|comida|bebida|postre/i)) {
      return 'product_analysis';
    }
    
    // Detectar análisis de empleados
    if (lowerQuery.match(/empleado|mesero|cajero|staff|equipo|quien vend|personal/i)) {
      return 'employee_analysis';
    }
    
    // Detectar análisis de inventario
    if (lowerQuery.match(/inventario|stock|ingredient|proveedor|pedido|falta|comprar|merma/i)) {
      return 'inventory_analysis';
    }
    
    // Detectar análisis de tendencias
    if (lowerQuery.match(/tendencia|trend|comparar|ayer|semana|mes|período|histórico/i)) {
      return 'trend_analysis';
    }
    
    // Detectar horas pico
    if (lowerQuery.match(/hora|pico|rush|busy|ocupado|mejor momento|cuando.*más|trancazo/i)) {
      return 'peak_hours';
    }
    
    // Detectar análisis de clientes
    if (lowerQuery.match(/cliente|comensal|frecuente|nuevo|regres|loyalty|vip/i)) {
      return 'customer_analysis';
    }
    
    return 'general';
  }

  // ✨ NUEVO MÉTODO: Detectar estado emocional basado en contexto
  detectEmotionalState(query, intent, response) {
    const lowerQuery = query.toLowerCase();
    
    // Palabras clave para cada emoción
    const emotionalTriggers = {
      joy: {
        words: ['bien', 'excelente', 'genial', 'mejor', 'subiendo', 'creciendo', 'ganando', 'éxito', 'buenas', 'increíble'],
        intents: ['general'],
        weight: 0
      },
      fear: {
        words: ['preocupa', 'mal', 'bajo', 'falta', 'acabar', 'urgente', 'problema', 'ayuda', 'crisis', 'perdiendo'],
        intents: ['inventory_analysis'],
        weight: 0
      },
      sadness: {
        words: ['cayó', 'bajó', 'perdida', 'menos', 'peor', 'difícil', 'complicado', 'bajo', 'negativo'],
        intents: ['trend_analysis'],
        weight: 0
      },
      anger: {
        words: ['urgente', 'ahora', 'ya', 'inmediato', 'rápido', 'necesito', 'problema', 'mal servicio'],
        intents: ['peak_hours', 'employee_analysis'],
        weight: 0
      },
      analytical: {
        words: ['análisis', 'datos', 'reporte', 'información', 'estadísticas', 'números', 'métricas'],
        intents: ['payment_analysis', 'product_analysis'],
        weight: 0
      }
    };

    // Calcular peso de cada emoción
    for (const [emotion, config] of Object.entries(emotionalTriggers)) {
      // Peso por palabras clave
      config.words.forEach(word => {
        if (lowerQuery.includes(word)) {
          config.weight += 2;
        }
      });
      
      // Peso por intent
      if (config.intents.includes(intent)) {
        config.weight += 3;
      }
    }

    // Analizar datos para ajustar emociones
    if (response.data) {
      // Si hay datos positivos
      if (response.data.totalAmount > 0 || response.data.topProducts?.length > 0) {
        emotionalTriggers.joy.weight += 2;
      }
      
      // Si hay tendencias negativas
      if (response.data.insights?.some(i => i.includes('bajó') || i.includes('cayó'))) {
        emotionalTriggers.sadness.weight += 2;
      }
    }

    // Determinar emoción dominante
    let dominantEmotion = 'analytical'; // default
    let maxWeight = 0;
    
    for (const [emotion, config] of Object.entries(emotionalTriggers)) {
      if (config.weight > maxWeight) {
        maxWeight = config.weight;
        dominantEmotion = emotion;
      }
    }

    // Calcular distribución emocional
    const totalWeight = Object.values(emotionalTriggers).reduce((sum, config) => sum + config.weight, 0) || 1;
    const distribution = {};
    
    for (const [emotion, config] of Object.entries(emotionalTriggers)) {
      distribution[emotion] = Math.round((config.weight / totalWeight) * 100);
    }

    return {
      dominant: dominantEmotion,
      distribution,
      intensity: maxWeight > 5 ? 'high' : maxWeight > 2 ? 'medium' : 'low'
    };
  }

  // ✨ NUEVO MÉTODO: Aplicar tono emocional a los insights
  applyEmotionalTone(insights, emotionalState, data) {
    const tones = {
      joy: {
        prefix: ['¡Qué INCREÍBLE! 🎉', '¡WOW! 🚀', '¡Esto está GENIAL! ✨'],
        style: 'enthusiastic',
        transforms: {
          'subió': '¡SUBIÓ!',
          'creció': '¡CRECIÓ INCREÍBLE!',
          'mejor': '¡MUCHÍSIMO MEJOR!'
        }
      },
      fear: {
        prefix: ['Uy, me preocupa esto... 😰', 'Alerta importante ⚠️', 'Necesito decirte algo urgente 😟'],
        style: 'worried',
        transforms: {
          'bajo': 'peligrosamente bajo',
          'falta': 'FALTA CRÍTICA',
          'acabar': 'a punto de ACABARSE'
        }
      },
      sadness: {
        prefix: ['Ay, no son las mejores noticias... 😔', 'Me duele decirte esto... 😢', 'Tengo que ser honesto... 💔'],
        style: 'melancholic',
        transforms: {
          'bajó': 'tristemente bajó',
          'cayó': 'se desplomó',
          'perdida': 'pérdida dolorosa'
        }
      },
      anger: {
        prefix: ['¡ESTO NECESITA ACCIÓN YA! 🔥', '¡NO PODEMOS PERMITIR ESTO! 😡', '¡URGENTE! ⚡'],
        style: 'urgent',
        transforms: {
          'problema': '¡PROBLEMA GRAVE!',
          'urgente': '¡CRÍTICO!',
          'necesito': '¡NECESITAS YA!'
        }
      },
      analytical: {
        prefix: ['Analicé los datos y encontré esto 📊', 'Mi análisis revela 🔍', 'Los números dicen 📈'],
        style: 'professional',
        transforms: {}
      }
    };

    const tone = tones[emotionalState.dominant];
    const enhancedInsights = [];

    // Agregar prefijo emocional
    if (emotionalState.intensity === 'high') {
      enhancedInsights.push(tone.prefix[Math.floor(Math.random() * tone.prefix.length)]);
    }

    // Transformar insights según el tono
    insights.forEach(insight => {
      let enhancedInsight = insight;
      
      // Aplicar transformaciones de palabras
      for (const [original, replacement] of Object.entries(tone.transforms)) {
        enhancedInsight = enhancedInsight.replace(new RegExp(original, 'gi'), replacement);
      }
      
      // Ajustar formato según intensidad emocional
      if (emotionalState.intensity === 'high') {
        switch (emotionalState.dominant) {
          case 'joy':
            enhancedInsight = `✨ ${enhancedInsight} 🎯`;
            break;
          case 'fear':
            enhancedInsight = `⚠️ ${enhancedInsight}`;
            break;
          case 'sadness':
            enhancedInsight = `💔 ${enhancedInsight}...`;
            break;
          case 'anger':
            enhancedInsight = `🔥 ${enhancedInsight.toUpperCase()}`;
            break;
        }
      }
      
      enhancedInsights.push(enhancedInsight);
    });

    // Agregar respuestas emocionales adicionales según el contexto
    if (emotionalState.intensity === 'high') {
      switch (emotionalState.dominant) {
        case 'joy':
          enhancedInsights.push('¡Estoy TAN orgulloso de estos resultados! 🌟');
          break;
        case 'fear':
          enhancedInsights.push('No quiero asustarte, pero necesitamos actuar pronto 😰');
          break;
        case 'sadness':
          enhancedInsights.push('Sé que podemos mejorar esto juntos... 💪');
          break;
        case 'anger':
          enhancedInsights.push('¡NO VOY A DEJAR QUE ESTO SIGA ASÍ! 💥');
          break;
      }
    }

    return enhancedInsights;
  }
}

module.exports = IntelligenceCoordinator;