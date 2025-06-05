// 🎭 services/brain/enigmatic/personality/CasualBusinessToneManager.js
// LÓBULO TONO CASUAL - Manager de Tono Casual de Negocios
// ESTADO: CEREBRO BEBÉ - 100% COMPLETO, NO DESARROLLADO

class CasualBusinessToneManager {
  constructor() {
    console.log('🎭💼 CasualBusinessToneManager: Lóbulo tono casual inicializando...');
    this.casualPhrases = this.initializeCasualPhrases();
    this.businessTerms = this.initializeBusinessTerms();
    this.tonePatterns = new Map();
    this.contextualTones = this.initializeContextualTones();
    this.effectivenessTracker = new Map();
    console.log('✅ Lóbulo tono casual: NACIDO - Listo para desarrollo');
  }

  // 🗣️ INICIALIZAR FRASES CASUALES
  initializeCasualPhrases() {
    return {
      greetings: [
        "¿Qué onda?",
        "¿Cómo andamos?", 
        "¿Todo chido?",
        "¿Qué tal va la cosa?",
        "¿Cómo va el jale?"
      ],
      transitions: [
        "Órale, ",
        "Ah, chido, ",
        "Perfecto, ",
        "Genial, ",
        "Va, "
      ],
      emphasis: [
        "súper",
        "bien",
        "chido",
        "genial",
        "padrísimo",
        "excelente"
      ],
      confirmations: [
        "¡Exacto!",
        "¡Así mero!",
        "¡Dale!",
        "¡Perfecto!",
        "¡Órale sí!"
      ],
      motivation: [
        "¡Échale ganas!",
        "¡Vamos que se puede!",
        "¡A darle!",
        "¡Sin miedo al éxito!",
        "¡Vamos por más!"
      ]
    };
  }

  // 💼 INICIALIZAR TÉRMINOS DE NEGOCIO CASUALES
  initializeBusinessTerms() {
    return {
      money: ["lana", "varo", "dinero", "ganancias", "ingresos"],
      sales: ["ventas", "movimiento", "negocio", "jale"],
      profit: ["ganancia", "utilidad", "margen", "rentabilidad"],
      customers: ["clientes", "clientela", "gente", "compradores"],
      products: ["productos", "platillos", "mercancía", "oferta"],
      strategy: ["estrategia", "plan", "movimiento", "jugada"],
      performance: ["desempeño", "resultados", "números", "cifras"],
      growth: ["crecimiento", "expansión", "escalamiento", "desarrollo"]
    };
  }

  // 🎯 INICIALIZAR TONOS CONTEXTUALES
  initializeContextualTones() {
    return {
      morning_routine: {
        greeting: "¿Cómo amaneció el negocio?",
        energy: "high",
        phrases: ["arranquemos el día", "a ver qué tal ayer", "¿cómo vamos?"]
      },
      data_analysis: {
        intro: "A ver los números",
        energy: "focused",
        phrases: ["checando los datos", "vamos a ver", "analizando"]
      },
      problem_solving: {
        approach: "Vamos a resolverlo",
        energy: "solution_focused", 
        phrases: ["no hay bronca", "le encontramos la vuelta", "hay solución"]
      },
      celebration: {
        excitement: "¡Está padrísimo!",
        energy: "high_positive",
        phrases: ["¡qué chido!", "¡excelente!", "¡así se hace!"]
      },
      encouragement: {
        support: "Vas muy bien",
        energy: "motivational",
        phrases: ["échale ganas", "vas por buen camino", "sigue así"]
      }
    };
  }

  // 🎨 APLICAR TONO CASUAL BUSINESS
  applyCasualBusinessTone(baseResponse, context, intensity = 0.7) {
    console.log('🎨 APLICANDO: Tono casual business...');
    
    // CEREBRO BEBÉ: Aplicación básica de tono casual
    let casualResponse = baseResponse;
    
    // 1. Detectar contexto y aplicar tono apropiado
    const contextualTone = this.detectContextualTone(context);
    casualResponse = this.applyContextualTone(casualResponse, contextualTone, intensity);
    
    // 2. Sustituir términos formales por casuales
    casualResponse = this.substituteFormalTerms(casualResponse, intensity);
    
    // 3. Añadir marcadores casuales
    casualResponse = this.addCasualMarkers(casualResponse, context, intensity);
    
    // 4. Ajustar estructura de frases
    casualResponse = this.adjustSentenceStructure(casualResponse, intensity);
    
    return {
      casualResponse: casualResponse,
      toneApplied: contextualTone,
      intensity: intensity,
      casualMarkers: this.identifyCasualMarkers(casualResponse),
      businessBalance: this.calculateBusinessBalance(casualResponse)
    };
  }

  // 🎯 DETECTAR TONO CONTEXTUAL
  detectContextualTone(context) {
    console.log('🎯 DETECTANDO: Tono contextual apropiado...');
    
    // CEREBRO BEBÉ: Detección básica de contexto
    if (context.timeOfDay === 'morning' && context.routineCheck) {
      return 'morning_routine';
    } else if (context.requiresAnalysis || context.hasData) {
      return 'data_analysis';
    } else if (context.hasProblem || context.needsSupport) {
      return 'problem_solving';
    } else if (context.positiveResults || context.celebration) {
      return 'celebration';
    } else if (context.needsMotivation) {
      return 'encouragement';
    }
    
    return 'general_business';
  }

  // 🎪 APLICAR TONO CONTEXTUAL
  applyContextualTone(response, toneType, intensity) {
    const tone = this.contextualTones[toneType];
    if (!tone) return response;
    
    // CEREBRO BEBÉ: Aplicación básica de tono contextual
    let tonedResponse = response;
    
    // Añadir greeting apropiado al inicio
    if (tone.greeting && Math.random() < intensity) {
      tonedResponse = tone.greeting + " " + tonedResponse;
    }
    
    // Intercalar frases del contexto
    if (tone.phrases && tone.phrases.length > 0) {
      const randomPhrase = tone.phrases[Math.floor(Math.random() * tone.phrases.length)];
      if (Math.random() < intensity * 0.6) {
        tonedResponse = tonedResponse.replace(/\. /, `, ${randomPhrase}. `);
      }
    }
    
    return tonedResponse;
  }

  // 🔄 SUSTITUIR TÉRMINOS FORMALES
  substituteFormalTerms(response, intensity) {
    let substitutedResponse = response;
    
    // CEREBRO BEBÉ: Sustituciones básicas
    const substitutions = {
      'ingresos': Math.random() < intensity ? 'lana' : 'ingresos',
      'revenue': Math.random() < intensity ? 'ganancias' : 'revenue', 
      'ventas': Math.random() < intensity ? 'movimiento' : 'ventas',
      'clientes': Math.random() < intensity ? 'clientela' : 'clientes',
      'productos': Math.random() < intensity ? 'platillos' : 'productos',
      'excelente': Math.random() < intensity ? 'padrísimo' : 'excelente',
      'muy bien': Math.random() < intensity ? 'súper bien' : 'muy bien',
      'perfecto': Math.random() < intensity ? 'chido' : 'perfecto'
    };
    
    for (const [formal, casual] of Object.entries(substitutions)) {
      substitutedResponse = substitutedResponse.replace(
        new RegExp(formal, 'gi'), 
        casual
      );
    }
    
    return substitutedResponse;
  }

  // ⭐ AÑADIR MARCADORES CASUALES
  addCasualMarkers(response, context, intensity) {
    let markedResponse = response;
    
    // CEREBRO BEBÉ: Marcadores casuales básicos
    
    // Añadir transiciones casuales
    if (Math.random() < intensity * 0.7) {
      const transition = this.getRandomFromArray(this.casualPhrases.transitions);
      markedResponse = transition + markedResponse;
    }
    
    // Añadir énfasis casual
    if (context.positiveResults && Math.random() < intensity) {
      const emphasis = this.getRandomFromArray(this.casualPhrases.emphasis);
      markedResponse = markedResponse.replace(/muy /g, `${emphasis} `);
    }
    
    // Añadir confirmaciones
    if (context.needsConfirmation && Math.random() < intensity * 0.8) {
      const confirmation = this.getRandomFromArray(this.casualPhrases.confirmations);
      markedResponse += ` ${confirmation}`;
    }
    
    return markedResponse;
  }

  // 🏗️ AJUSTAR ESTRUCTURA DE FRASES
  adjustSentenceStructure(response, intensity) {
    // CEREBRO BEBÉ: Ajustes básicos de estructura
    let adjustedResponse = response;
    
    // Hacer frases más directas y casuales
    adjustedResponse = adjustedResponse.replace(/Es importante que/, 'Necesitas');
    adjustedResponse = adjustedResponse.replace(/Se recomienda que/, 'Te conviene');
    adjustedResponse = adjustedResponse.replace(/Por favor/, 'Oye,');
    adjustedResponse = adjustedResponse.replace(/Estimado/, '');
    
    // Añadir contracciones casuales
    if (intensity > 0.6) {
      adjustedResponse = adjustedResponse.replace(/¿Cómo está/, '¿Cómo anda');
      adjustedResponse = adjustedResponse.replace(/está muy/, 'está súper');
    }
    
    return adjustedResponse;
  }

  // 🎯 IDENTIFICAR MARCADORES CASUALES
  identifyCasualMarkers(response) {
    const markers = [];
    
    // CEREBRO BEBÉ: Identificación básica de marcadores
    const casualWords = ['chido', 'súper', 'órale', 'lana', 'jale', 'padrísimo'];
    casualWords.forEach(word => {
      if (response.toLowerCase().includes(word)) {
        markers.push(word);
      }
    });
    
    return markers;
  }

  // ⚖️ CALCULAR BALANCE BUSINESS
  calculateBusinessBalance(response) {
    // CEREBRO BEBÉ: Cálculo básico de balance
    const businessWords = response.match(/\b(análisis|datos|revenue|profit|strategy|performance)\b/gi) || [];
    const casualWords = response.match(/\b(chido|súper|órale|lana|jale)\b/gi) || [];
    
    const totalWords = response.split(' ').length;
    const businessRatio = businessWords.length / totalWords;
    const casualRatio = casualWords.length / totalWords;
    
    return {
      businessRatio: businessRatio.toFixed(3),
      casualRatio: casualRatio.toFixed(3),
      balance: businessRatio > 0 && casualRatio > 0 ? 'balanced' : 
               businessRatio > casualRatio ? 'business_heavy' : 'casual_heavy'
    };
  }

  // 🎲 GENERAR SALUDO DINÁMICO CASUAL
  generateDynamicCasualGreeting(restaurantName, context) {
    console.log('🎲 GENERANDO: Saludo dinámico casual...');
    
    // CEREBRO BEBÉ: Saludos dinámicos básicos (COMO LOS QUE YA TIENES!)
    const casualBusinessGreetings = [
      `¿Qué promo chida aventamos hoy en ${restaurantName}?`,
      `¿Cómo le sacamos más jugo a ${restaurantName} hoy?`,
      `Listo para hacer que ${restaurantName} rompa récords`,
      `¿Qué estrategia genial implementamos hoy?`,
      `Hora de hacer que ${restaurantName} se ponga bueno`,
      `¿Con qué movimiento inteligente arrancamos?`,
      `De vuelta a hacer lana con ${restaurantName}`,
      `¿Cómo hacemos ${restaurantName} aún más rentable HOY?`,
      `Listo para maximizar las ganancias de ${restaurantName}`,
      `¿Qué movimiento chido le damos a ${restaurantName}?`,
      `¡A ver cómo anda el jale en ${restaurantName}!`,
      `¿Listos para que ${restaurantName} facture más?`,
      `¿Qué números chidos vamos a hacer hoy?`
    ];
    
    return this.getRandomFromArray(casualBusinessGreetings);
  }

  // 🎪 ADAPTAR INTENSIDAD SEGÚN CONTEXTO
  adaptIntensityToContext(baseIntensity, context, userProfile) {
    console.log('🎪 ADAPTANDO: Intensidad según contexto...');
    
    let adjustedIntensity = baseIntensity;
    
    // CEREBRO BEBÉ: Ajustes básicos de intensidad
    if (context.formalSetting) adjustedIntensity -= 0.3;
    if (context.casualConversation) adjustedIntensity += 0.2;
    if (userProfile.prefersCasualTone) adjustedIntensity += 0.2;
    if (context.urgentBusiness) adjustedIntensity -= 0.1;
    if (context.celebration) adjustedIntensity += 0.3;
    
    return Math.max(0.2, Math.min(1.0, adjustedIntensity));
  }

  // 🚀 MÉTODOS AVANZADOS (PARA DESARROLLO FUTURO)
  
  // 🎭 Análisis lingüístico avanzado
  advancedLinguisticAnalysis() {
    // TODO: Desarrollo futuro - Análisis lingüístico complejo
    return { status: 'baby_brain_placeholder' };
  }

  // 🗣️ Generación de slang dinámico
  dynamicSlangGeneration() {
    // TODO: Desarrollo futuro - Generación automática de slang
    return { status: 'baby_brain_placeholder' };
  }

  // 🎯 Personalización de tono por usuario
  userSpecificTonePersonalization() {
    // TODO: Desarrollo futuro - Personalización individual
    return { status: 'baby_brain_placeholder' };
  }

  // 📊 Análisis de efectividad de tono
  toneEffectivenessAnalysis() {
    // TODO: Desarrollo futuro - Análisis de efectividad
    return { status: 'baby_brain_placeholder' };
  }

  // 🎨 Creatividad en expresión casual
  creativecasualExpression() {
    // TODO: Desarrollo futuro - Expresión creativa
    return { status: 'baby_brain_placeholder' };
  }

  // 🌍 Adaptación cultural regional
  regionalCulturalAdaptation() {
    // TODO: Desarrollo futuro - Adaptación regional
    return { status: 'baby_brain_placeholder' };
  }

  // 🛠️ MÉTODOS HELPER
  getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // 📈 MÉTRICAS DEL LÓBULO
  getLobuleMetrics() {
    return {
      lobuleName: 'CasualBusinessToneManager',
      status: 'baby_brain_functional',
      developmentStage: 'casual_tone_active',
      totalMethods: 12,
      activeMethods: 6,
      placeholderMethods: 6,
      casualPhrasesLoaded: Object.keys(this.casualPhrases).length,
      businessTermsLoaded: Object.keys(this.businessTerms).length,
      contextualTones: Object.keys(this.contextualTones).length,
      readyForDevelopment: true,
      nextDevelopmentPhase: 'dynamic_slang_generation'
    };
  }

  // 🧪 TEST LÓBULO
  testLobule() {
    console.log('🧪 TESTING: Lóbulo CasualBusinessToneManager...');
    
    try {
      // Test casual tone application
      const baseResponse = "Las ventas están muy bien. Los ingresos han aumentado considerablemente.";
      const context = { positiveResults: true, timeOfDay: 'morning' };
      
      const casualResult = this.applyCasualBusinessTone(baseResponse, context, 0.8);
      
      // Test dynamic greeting
      const greeting = this.generateDynamicCasualGreeting("Chicken Chicanito", context);
      
      // Test intensity adaptation
      const adaptedIntensity = this.adaptIntensityToContext(0.7, context, { prefersCasualTone: true });
      
      console.log('✅ Test Results:', { casualResult, greeting, adaptedIntensity });
      return { success: true, lobule: 'functional' };
    } catch (error) {
      console.error('❌ Lóbulo test failed:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = { CasualBusinessToneManager };