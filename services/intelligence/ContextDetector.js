// 🧠 CONTEXT DETECTOR - CEREBRO DE FUDI
// Detecta la intención y contexto del usuario ANTES de responder

class ContextDetector {
  constructor() {
    this.patterns = {
      // MODO CASUAL - Saludos, conversación social
      casual: [
        /^(hola|hey|buenas|qué tal|buenos días|buenas tardes|buenas noches)/i,
        /^(¿?cómo estás|¿?qué tal|¿?cómo va todo|¿?todo bien)/i,
        /^(gracias|perfecto|genial|excelente|ok|vale)$/i,
        /^(adiós|nos vemos|hasta luego|chao|bye)/i,
        /^(sí|si|no|claro|obvio|por supuesto)$/i
      ],
      
      // MODO CONSULTIVO - Preguntas abiertas, opiniones
      consultivo: [
        /¿?qué opinas|¿?qué piensas|¿?qué te parece|¿?qué crees/i,
        /¿?me puedes ayudar|¿?puedes ayudarme|¿?necesito ayuda/i,
        /¿?qué me recomiendas|¿?qué sugieres|¿?alguna sugerencia/i,
        /¿?cómo puedo|¿?cómo debo|¿?qué debería/i,
        /¿?es buena idea|¿?te parece bien|¿?está bien si/i,
        /estrategia|plan|planear|planificar/i
      ],
      
      // MODO ANALÍTICO - Datos específicos, métricas, reportes
      analitico: [
        /¿?(cómo van|cómo están|cómo estuvieron).*(ventas|ingresos|ganancias)/i,
        /¿?(cuál|cuáles).*(mejor|peor|más|menos).*(platillo|producto|vendido)/i,
        /¿?(cuánto|cuántos).*(vendimos|ganamos|perdimos)/i,
        /ventas|revenue|ingresos|ganancias|profit|platillo|producto/i,
        /ayer|hoy|esta semana|este mes|último|anterior/i,
        /números|datos|estadísticas|métricas|reporte|análisis/i,
        /tickets|clientes|promedio|total|porcentaje/i
      ],
      
      // MODO URGENTE - Problemas, crisis, necesidades inmediatas
      urgente: [
        /urgente|emergencia|problema|crisis|ayuda/i,
        /no funciona|no está funcionando|está mal|error/i,
        /necesito.*(ya|ahora|inmediatamente|rápido)/i,
        /¿?qué hago|¿?qué paso|¿?por qué/i,
        /perdiendo|bajando|cayendo|mal/i
      ]
    };

    this.contextCache = new Map(); // Cache para optimización
  }

  /**
   * Detecta el contexto principal del mensaje
   * @param {string} message - Mensaje del usuario
   * @param {object} conversationHistory - Historial de conversación
   * @returns {object} - Contexto detectado con confianza
   */
  detectContext(message, conversationHistory = []) {
    const cacheKey = this.getCacheKey(message, conversationHistory);
    
    // Verificar cache
    if (this.contextCache.has(cacheKey)) {
      return this.contextCache.get(cacheKey);
    }

    const context = this.analyzeMessage(message, conversationHistory);
    
    // Cachear resultado
    this.contextCache.set(cacheKey, context);
    
    return context;
  }

  /**
   * Analiza el mensaje y determina contexto
   */
  analyzeMessage(message, conversationHistory) {
    const normalizedMessage = message.toLowerCase().trim();
    
    // DETECCIÓN POR PATRONES
    const scores = {
      casual: this.calculatePatternScore(normalizedMessage, this.patterns.casual),
      consultivo: this.calculatePatternScore(normalizedMessage, this.patterns.consultivo),
      analitico: this.calculatePatternScore(normalizedMessage, this.patterns.analitico),
      urgente: this.calculatePatternScore(normalizedMessage, this.patterns.urgente)
    };

    // ANÁLISIS CONTEXTUAL ADICIONAL
    const contextualAnalysis = this.analyzeContextualFactors(message, conversationHistory);
    
    // COMBINAR SCORES
    const finalScores = this.combineScores(scores, contextualAnalysis);
    
    // DETERMINAR CONTEXTO GANADOR
    const primaryContext = this.determinePrimaryContext(finalScores);
    
    return {
      primary: primaryContext.type,
      confidence: primaryContext.confidence,
      scores: finalScores,
      metadata: {
        messageLength: message.length,
        hasQuestion: message.includes('?'),
        hasNumbers: /\d/.test(message),
        conversationLength: conversationHistory.length,
        analysis: contextualAnalysis
      }
    };
  }

  /**
   * Calcula score basado en patrones regex
   */
  calculatePatternScore(message, patterns) {
    let score = 0;
    let matches = 0;

    for (const pattern of patterns) {
      if (pattern.test(message)) {
        matches++;
        // Score más alto para matches más específicos
        score += pattern.source.length > 20 ? 0.8 : 0.6;
      }
    }

    // Normalizar score
    return Math.min(score, 1.0);
  }

  /**
   * Analiza factores contextuales adicionales
   */
  analyzeContextualFactors(message, conversationHistory) {
    const factors = {
      messageLength: this.analyzeMessageLength(message),
      questionType: this.analyzeQuestionType(message),
      temporalReferences: this.analyzeTemporalReferences(message),
      businessTerms: this.analyzeBusinessTerms(message),
      emotionalTone: this.analyzeEmotionalTone(message),
      conversationFlow: this.analyzeConversationFlow(conversationHistory)
    };

    return factors;
  }

  /**
   * Analiza la longitud del mensaje
   */
  analyzeMessageLength(message) {
    const length = message.length;
    
    if (length < 10) return { type: 'short', casualBias: 0.3 };
    if (length < 50) return { type: 'medium', casualBias: 0.1 };
    return { type: 'long', consultivoBias: 0.2 };
  }

  /**
   * Analiza el tipo de pregunta
   */
  analyzeQuestionType(message) {
    if (!message.includes('?')) return { type: 'statement', bias: 0 };
    
    if (/^(qué|cuál|cuáles|cuánto|cuántos)/i.test(message)) {
      return { type: 'specific', analiticoBias: 0.3 };
    }
    
    if (/^(cómo|por qué|para qué)/i.test(message)) {
      return { type: 'consultive', consultivoBias: 0.3 };
    }
    
    return { type: 'general', bias: 0 };
  }

  /**
   * Detecta referencias temporales
   */
  analyzeTemporalReferences(message) {
    const temporalTerms = /ayer|hoy|mañana|esta semana|este mes|último|anterior|ahora|actualmente/i;
    
    if (temporalTerms.test(message)) {
      return { hasTemporal: true, analiticoBias: 0.4 };
    }
    
    return { hasTemporal: false, bias: 0 };
  }

  /**
   * Detecta términos de negocio
   */
  analyzeBusinessTerms(message) {
    const businessTerms = /ventas|ingresos|ganancias|clientes|productos|platillos|tickets|promedio|total/i;
    
    if (businessTerms.test(message)) {
      return { hasBusinessTerms: true, analiticoBias: 0.3 };
    }
    
    return { hasBusinessTerms: false, bias: 0 };
  }

  /**
   * Analiza tono emocional
   */
  analyzeEmotionalTone(message) {
    const urgentTerms = /problema|urgente|ayuda|mal|error|no funciona|crisis|emergencia/i;
    const helpTerms = /necesito|ayuda|puedes|ayudar|ayúdame|socorro/i;
    const positiveTerms = /gracias|perfecto|genial|excelente|bueno/i;
    
    let tone = 'neutral';
    let needsHelp = false;
    let urgenteBias = 0;
    let consultivoBias = 0;
    
    if (urgentTerms.test(message)) {
      tone = 'urgent';
      urgenteBias = 0.8; // BOOST MÁXIMO para urgente
    }
    
    if (helpTerms.test(message)) {
      needsHelp = true;
      consultivoBias = 0.6; // BOOST FUERTE para consultivo
      if (tone !== 'urgent') tone = 'needs_help';
    }
    
    if (positiveTerms.test(message)) {
      if (tone === 'neutral') tone = 'positive';
      return { tone: 'positive', casualBias: 0.2 };
    }
    
    return { 
      tone, 
      needsHelp,
      urgenteBias,
      consultivoBias
    };
  }

  /**
   * Analiza el flujo de conversación
   */
  analyzeConversationFlow(conversationHistory) {
    if (conversationHistory.length === 0) {
      return { isFirstMessage: true, casualBias: 0.2 };
    }
    
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    
    // Si el último mensaje de Fudi fue una pregunta, el usuario probablemente está respondiendo
    if (lastMessage && lastMessage.type === 'assistant' && lastMessage.content.includes('?')) {
      return { isResponse: true, consultivoBias: 0.3 };
    }
    
    return { isFollowUp: true, bias: 0 };
  }

  /**
   * Combina scores de patrones con análisis contextual
   */
  combineScores(patternScores, contextualAnalysis) {
    const finalScores = { ...patternScores };
    
    // BOOST CRÍTICO: Palabras de intención DOMINAN sobre palabras de dominio
    const intentBoosts = this.calculateIntentionBoosts(contextualAnalysis);
    
    // Aplicar boosts de intención PRIMERO (más peso)
    if (intentBoosts.urgente > 0) {
      finalScores.urgente += intentBoosts.urgente;
      console.log(`🚨 URGENTE BOOST aplicado: +${intentBoosts.urgente}`);
    }
    
    if (intentBoosts.consultivo > 0) {
      finalScores.consultivo += intentBoosts.consultivo;
      console.log(`🤝 CONSULTIVO BOOST aplicado: +${intentBoosts.consultivo}`);
    }
    
    // Aplicar bias contextual (menor peso)
    Object.keys(contextualAnalysis).forEach(factor => {
      const analysis = contextualAnalysis[factor];
      
      if (analysis.casualBias) {
        finalScores.casual += analysis.casualBias * 0.5; // Reducido para no interferir
      }
      if (analysis.consultivoBias && intentBoosts.consultivo === 0) {
        finalScores.consultivo += analysis.consultivoBias * 0.7;
      }
      if (analysis.analiticoBias && intentBoosts.urgente === 0) {
        finalScores.analitico += analysis.analiticoBias * 0.7;
      }
      if (analysis.urgenteBias) {
        finalScores.urgente += analysis.urgenteBias * 0.3; // Ya manejado arriba
      }
    });

    // Normalizar scores finales
    Object.keys(finalScores).forEach(key => {
      finalScores[key] = Math.min(finalScores[key], 1.0);
    });

    return finalScores;
  }

  /**
   * NUEVO: Calcula boosts de intención críticos
   */
  calculateIntentionBoosts(contextualAnalysis) {
    const boosts = {
      urgente: 0,
      consultivo: 0
    };

    // Detectar intenciones críticas que deben DOMINAR
    const emotionalTone = contextualAnalysis.emotionalTone;
    const businessTerms = contextualAnalysis.businessTerms;
    
    // BOOST URGENTE: Si hay tono urgente, DEBE ganar
    if (emotionalTone && emotionalTone.tone === 'urgent') {
      boosts.urgente = 0.7; // BOOST MASIVO
      console.log('🚨 Detected URGENT intention - applying dominance boost');
    }
    
    // BOOST CONSULTIVO: Palabras de ayuda/necesidad
    if (emotionalTone && (
      emotionalTone.needsHelp || 
      contextualAnalysis.conversationFlow?.isHelpRequest
    )) {
      boosts.consultivo = 0.6; // BOOST FUERTE
      console.log('🤝 Detected CONSULTIVE intention - applying help boost');
    }

    return boosts;
  }

  /**
   * Determina el contexto primario basado en scores
   */
  determinePrimaryContext(scores) {
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    
    const winner = entries[0];
    const runnerUp = entries[1];
    
    // Calcular confianza basada en diferencia entre primer y segundo lugar
    const confidence = Math.min(0.9, winner[1] + (winner[1] - runnerUp[1]) * 0.5);
    
    return {
      type: winner[0],
      confidence: Math.max(0.1, confidence), // Mínimo 10% de confianza
      runner_up: runnerUp[0],
      margin: winner[1] - runnerUp[1]
    };
  }

  /**
   * Genera cache key para optimización
   */
  getCacheKey(message, conversationHistory) {
    const historyLength = conversationHistory.length;
    const lastMessageType = historyLength > 0 ? conversationHistory[historyLength - 1].type : 'none';
    
    return `${message.toLowerCase().trim()}_${historyLength}_${lastMessageType}`;
  }

  /**
   * Limpia cache (llamar periódicamente)
   */
  clearCache() {
    this.contextCache.clear();
  }

  /**
   * Método de utilidad para testing
   */
  testContext(message) {
    const result = this.detectContext(message, []);
    
    console.log(`🧠 Context Detection Test:`);
    console.log(`Message: "${message}"`);
    console.log(`Primary Context: ${result.primary} (${Math.round(result.confidence * 100)}% confidence)`);
    console.log(`Scores:`, result.scores);
    console.log(`Metadata:`, result.metadata);
    
    return result;
  }
}

module.exports = { ContextDetector };