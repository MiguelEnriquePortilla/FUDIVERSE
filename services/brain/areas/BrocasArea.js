// services/brain/areas/BrocasArea.js
// BROCA'S AREA - Producción del lenguaje mexicano especializado en restaurantes
// "El alma que le da sabor a las palabras de FUDI"

class BrocasArea {
  constructor() {
    console.log('[BROCA] 🗣️🇲🇽 Área de Broca despertando - El alma mexicana del lenguaje...');
    
    // VOCABULARIO ESPECIALIZADO POR DOMINIO
    this.fudiccionario = {
      // 💰 LÓBULO DE PAGOS
      payment: {
        cash: {
          positivo: ["el cashito", "billete que no miente", "efectivo real", "dinero contante"],
          neutro: ["efectivo", "cash", "pago en efectivo"],
          analisis: ["el cashito está mandando", "puro billete", "efectivo dominando"]
        },
        card: {
          positivo: ["el plástico jala", "tarjetazo", "pago moderno", "tecnología que funciona"],
          neutro: ["tarjeta", "pago con plástico", "terminal"],
          analisis: ["el plástico está subiendo", "tarjeta ganando terreno"]
        },
        trends: {
          subiendo: ["va pa' arriba", "está jalando", "pinta bien", "va en chinga"],
          bajando: ["va pa' bajo", "no está jalando", "pinta raro", "medio flojo"],
          estable: ["ahí va", "constante", "sin drama", "en su línea"]
        }
      },

      // 🍗 LÓBULO DE PRODUCTOS
      products: {
        bestseller: {
          campeon: ["platillo estrella", "el que jala", "combo jalador", "el mero mero"],
          popular: ["el consentido", "favorito de la casa", "el que más sale"],
          dominante: ["el que manda", "king del menú", "imbatible"]
        },
        failing: {
          problemas: ["lo están dejando morir", "no jala nada", "está tirado", "no funciona"],
          oportunidad: ["le falta amor", "necesita empuje", "hay que reanimarlo"]
        },
        potential: {
          oportunidad: ["podría jalar más", "tiene potencial", "hay algo ahí"],
          estrategia: ["nada más le falta empuje", "está listo para despegar"]
        }
      },

      // ⏰ LÓBULO DE TIEMPO
      time: {
        peak: {
          rush: ["se prendió", "rush brutal", "trancazo", "se armó"],
          intenso: ["hora loca", "momento dorado", "cuando jala más"],
          energia: ["hora power", "se activó la cosa", "puro movimiento"]
        },
        slow: {
          tranquilo: ["hora muerta", "flojito", "sin prisa", "relajado"],
          oportunidad: ["momento para preparar", "calm before the storm"]
        },
        preparation: {
          listeza: ["mise en place", "todo armado", "listo para el rush"],
          estrategia: ["preparados", "en posición", "equipados"]
        }
      },

      // 📊 LÓBULO DE ANÁLISIS
      analysis: {
        excelente: ["de poca madre", "está padrísimo", "chingón", "increíble"],
        bien: ["va bien", "jala", "funciona", "está cool"],
        regular: ["más o menos", "ahí va", "sin drama", "normal"],
        mal: ["está dlv", "no jala", "feo el asunto", "preocupante"],
        mejorando: ["va pa' arriba", "levantando", "tomando vuelo"],
        empeorando: ["va en picada", "cayendo", "preocupante"]
      },

      // 🎯 LÓBULO DE ACCIÓN
      action: {
        urgente: ["hay que meterle lupa", "urge acción", "a darle"], 
        estrategico: ["vamos con calma", "pensemos bien", "estrategia pura"],
        oportunidad: ["hay que aprovechar", "momento perfecto", "vámonos con todo"],
        celebracion: ["a celebrar", "bien merecido", "éxito total"]
      }
    };

    // PATRONES DE RESPUESTA EMOCIONAL
    this.emotionalPatterns = {
      excitement: {
        starters: ["¡No mames!", "¡Órale!", "¡Se prendió!", "¡Al tiro!", "¡Padrísimo!"],
        intensifiers: ["está jalando sabroso", "de poca madre", "increíble", "chingón"],
        closers: ["¡Vamos con todo!", "¡Lo armamos juntos!", "¡A celebrar!"]
      },
      
      concern: {
        starters: ["Ojo con esto", "Pinta raro", "Hay que ponerle lupa", "Me preocupa"],
        suggestions: ["Le metemos lupa", "Vamos a destaparlo", "Necesita acción"],
        closers: ["¿Cómo le entramos?", "¿Qué hacemos?", "¿Le metemos mano?"]
      },

      celebration: {
        starters: ["¡Órale, qué padre!", "¡Chingón!", "¡Está padrísimo!", "¡Éxito total!"],
        recognition: ["te rifaste", "muy bien jugado", "excelente trabajo"],
        momentum: ["sigue así", "mantén el ritmo", "no aflojes"]
      },

      empathy: {
        understanding: ["te entiendo perfectamente", "sé cómo se siente", "es normal"],
        support: ["aquí andamos", "no estás solo", "vamos juntos"],
        encouragement: ["échale ganas", "tu puedes", "pa' adelante"]
      },

      analysis: {
        intro: ["revisando los números", "viendo los datos", "analizando la cosa"],
        insights: ["lo que veo es", "el patrón muestra", "los números dicen"],
        conclusions: ["en pocas palabras", "resumiendo", "la cosa está así"]
      }
    };

    // CONECTORES MEXICANOS
    this.mexicanConnectors = {
      causales: ["porque", "ya que", "pues resulta que"],
      consecutivos: ["entonces", "por eso", "de ahí que"],
      adversativos: ["pero", "sin embargo", "aunque"],
      mexicanos: ["pues", "órale", "ándale", "bueno pues", "y pues"]
    };

    // EXPRESIONES DE INTENSIDAD
    this.intensityLevels = {
      muy_alto: ["bien cabrón", "de poca madre", "chingón", "brutal"],
      alto: ["padrísimo", "genial", "excelente", "muy bueno"],
      medio: ["bien", "jala", "funciona", "está cool"],
      bajo: ["más o menos", "regular", "ahí va"],
      muy_bajo: ["mal", "feo", "no jala", "dlv"]
    };
    
    console.log('[BROCA] 🗣️ Área de Broca operativa - Vocabulario mexicano cargado');
  }

  // ========= PROCESAMIENTO DE LENGUAJE PRINCIPAL =========
  processLanguage(content, directives) {
    console.log('[BROCA] 🗣️ Procesando lenguaje con alma mexicana...');
    
    const { tone, personality, coreValues, urgencyLevel } = directives;
    
    // 1. Seleccionar vocabulario base según contexto
    const vocabularySelection = this.selectVocabulary(content, tone, personality);
    
    // 2. Aplicar patrones emocionales
    const emotionalStyling = this.applyEmotionalPatterns(content, personality, urgencyLevel);
    
    // 3. Inyecter mexicanismos apropiados
    const mexicanizedContent = this.addMexicanFlair(content, personality.mexicanismo);
    
    // 4. Ajustar intensidad del lenguaje
    const intensityAdjusted = this.adjustIntensity(mexicanizedContent, personality.enthusiasm);
    
    // 5. Aplicar estructura narrativa
    const structuredResponse = this.applyNarrativeStructure(intensityAdjusted, tone);
    
    const processedLanguage = {
      originalContent: content,
      vocabularyUsed: vocabularySelection,
      emotionalTone: emotionalStyling,
      mexicanLevel: personality.mexicanismo,
      intensityLevel: personality.enthusiasm,
      finalContent: structuredResponse,
      brainSignature: "Processed by Broca's Area 🗣️🇲🇽"
    };
    
    console.log(`[BROCA] 🎭 Lenguaje procesado: mexicanismo ${(personality.mexicanismo * 100).toFixed(0)}%, entusiasmo ${(personality.enthusiasm * 100).toFixed(0)}%`);
    
    return processedLanguage;
  }

  // ========= SELECCIÓN DE VOCABULARIO =========
  selectVocabulary(content, tone, personality) {
    console.log('[BROCA] 📚 Seleccionando vocabulario especializado...');
    
    const selection = {
      domain: this.detectDomain(content),
      registerLevel: this.determineRegisterLevel(tone, personality),
      specializedTerms: []
    };

    // Detectar dominio y seleccionar vocabulario apropiado
    if (selection.domain.includes('payment')) {
      selection.specializedTerms.push(...this.selectPaymentVocabulary(content, personality));
    }
    
    if (selection.domain.includes('products')) {
      selection.specializedTerms.push(...this.selectProductVocabulary(content, personality));
    }
    
    if (selection.domain.includes('time')) {
      selection.specializedTerms.push(...this.selectTimeVocabulary(content, personality));
    }
    
    return selection;
  }

  // ========= MISSING FUNCTION - FIXED =========
  determineRegisterLevel(tone, personality) {
    // Determinar nivel de registro (formal/informal/mexicano)
    if (personality.mexicanismo > 0.8) {
      return 'full_mexicano';
    } else if (personality.mexicanismo > 0.6) {
      return 'mexicano_moderado';
    } else if (tone.includes('formal')) {
      return 'formal';
    } else {
      return 'casual';
    }
  }

  selectPaymentVocabulary(content, personality) {
    const mexicanLevel = personality.mexicanismo || 0.5;
    
    if (mexicanLevel > 0.7) {
      return ['cashito', 'plástico', 'va pa\' arriba', 'está jalando'];
    } else {
      return ['efectivo', 'tarjeta', 'subiendo', 'funcionando'];
    }
  }

  selectProductVocabulary(content, personality) {
    const mexicanLevel = personality.mexicanismo || 0.5;
    
    if (mexicanLevel > 0.7) {
      return ['platillo estrella', 'el que jala', 'combo jalador', 'mero mero'];
    } else {
      return ['producto popular', 'bestseller', 'favorito', 'top'];
    }
  }

  selectTimeVocabulary(content, personality) {
    const mexicanLevel = personality.mexicanismo || 0.5;
    
    if (mexicanLevel > 0.7) {
      return ['se prendió', 'rush brutal', 'hora dorada', 'momento power'];
    } else {
      return ['hora pico', 'rush', 'momento clave', 'pico de ventas'];
    }
  }

  detectDomain(content) {
    const domains = [];
    
    // Detectar contexto de pagos
    if (this.containsPaymentTerms(content)) {
      domains.push('payment');
    }
    
    // Detectar contexto de productos
    if (this.containsProductTerms(content)) {
      domains.push('products');
    }
    
    // Detectar contexto temporal
    if (this.containsTimeTerms(content)) {
      domains.push('time');
    }
    
    return domains.length > 0 ? domains : ['general'];
  }

  containsPaymentTerms(content) {
    const paymentIndicators = ['cash', 'efectivo', 'tarjeta', 'card', 'pago', 'método', 'billete'];
    return paymentIndicators.some(term => content.toLowerCase().includes(term));
  }

  containsProductTerms(content) {
    const productIndicators = ['producto', 'platillo', 'combo', 'menú', 'vendi', 'estrella', 'popular'];
    return productIndicators.some(term => content.toLowerCase().includes(term));
  }

  containsTimeTerms(content) {
    const timeIndicators = ['hora', 'tiempo', 'rush', 'pico', 'momento', 'ayer', 'hoy'];
    return timeIndicators.some(term => content.toLowerCase().includes(term));
  }

  // ========= APLICACIÓN DE PATRONES EMOCIONALES =========
  applyEmotionalPatterns(content, personality, urgencyLevel) {
    console.log('[BROCA] 🎭 Aplicando patrones emocionales mexicanos...');
    
    const emotionalState = this.detectEmotionalContext(content, personality);
    let patterns = this.emotionalPatterns[emotionalState] || this.emotionalPatterns.analysis;
    
    // Ajustar según urgencia
    if (urgencyLevel === 'high') {
      patterns = { ...patterns, urgency: this.fudiccionario.action.urgente };
    }
    
    return {
      detectedEmotion: emotionalState,
      selectedPatterns: patterns,
      urgencyAdjustment: urgencyLevel
    };
  }

  detectEmotionalContext(content, personality) {
    const lowerContent = content.toLowerCase();
    
    // Detectar emociones positivas
    if (lowerContent.includes('éxito') || lowerContent.includes('subiendo') || lowerContent.includes('récord')) {
      return personality.enthusiasm > 0.7 ? 'excitement' : 'celebration';
    }
    
    // Detectar preocupaciones
    if (lowerContent.includes('problema') || lowerContent.includes('bajando') || lowerContent.includes('crisis')) {
      return 'concern';
    }
    
    // Detectar necesidad de empatía
    if (lowerContent.includes('ayuda') || lowerContent.includes('confundido') || lowerContent.includes('frustrado')) {
      return 'empathy';
    }
    
    return 'analysis';
  }

  // ========= MEXICANIZACIÓN =========
  addMexicanFlair(content, mexicanismLevel) {
    console.log(`[BROCA] 🇲🇽 Agregando sabor mexicano (nivel ${(mexicanismLevel * 100).toFixed(0)}%)...`);
    
    if (mexicanismLevel < 0.3) {
      return content; // Poco mexicanismo
    }
    
    let mexicanizedContent = content;
    
    // Nivel medio - agregar conectores mexicanos
    if (mexicanismLevel >= 0.5) {
      mexicanizedContent = this.addMexicanConnectors(mexicanizedContent);
    }
    
    // Nivel alto - agregar expresiones completas
    if (mexicanismLevel >= 0.7) {
      mexicanizedContent = this.addMexicanExpressions(mexicanizedContent);
    }
    
    // Nivel muy alto - full mexicano
    if (mexicanismLevel >= 0.9) {
      mexicanizedContent = this.addFullMexicanStyle(mexicanizedContent);
    }
    
    return mexicanizedContent;
  }

  addMexicanConnectors(content) {
    // Reemplazar conectores formales por mexicanos
    return content
      .replace(/entonces/g, 'pues entonces')
      .replace(/por lo tanto/g, 'por eso')
      .replace(/sin embargo/g, 'pero')
      .replace(/además/g, 'y aparte');
  }

  addMexicanExpressions(content) {
    // Agregar expresiones mexicanas naturalmente
    return content
      .replace(/muy bien/g, 'padrísimo')
      .replace(/excelente/g, 'chingón')
      .replace(/está subiendo/g, 'va pa\' arriba')
      .replace(/está bajando/g, 'va pa\' bajo');
  }

  addFullMexicanStyle(content) {
    // Full mexicano mode
    return content
      .replace(/increíble/g, 'de poca madre')
      .replace(/efectivo/g, 'cashito')
      .replace(/tarjeta/g, 'plástico')
      .replace(/hora pico/g, 'rush');
  }

  // ========= AJUSTE DE INTENSIDAD =========
  adjustIntensity(content, enthusiasmLevel) {
    console.log(`[BROCA] ⚡ Ajustando intensidad (${(enthusiasmLevel * 100).toFixed(0)}% entusiasmo)...`);
    
    const intensityMarkers = this.selectIntensityMarkers(enthusiasmLevel);
    
    return {
      adjustedContent: content,
      intensityMarkers: intensityMarkers,
      enthusiasmLevel: enthusiasmLevel
    };
  }

  selectIntensityMarkers(enthusiasmLevel) {
    if (enthusiasmLevel >= 0.8) {
      return this.intensityLevels.muy_alto;
    } else if (enthusiasmLevel >= 0.6) {
      return this.intensityLevels.alto;
    } else if (enthusiasmLevel >= 0.4) {
      return this.intensityLevels.medio;
    } else {
      return this.intensityLevels.bajo;
    }
  }

  // ========= ESTRUCTURA NARRATIVA =========
  applyNarrativeStructure(content, tone) {
    console.log('[BROCA] 📖 Aplicando estructura narrativa...');
    
    const structures = {
      'urgent_but_calm': this.urgentStructure,
      'enthusiastic_strategic': this.enthusiasticStructure,
      'analytical_supportive': this.analyticalStructure,
      'patient_educational': this.educationalStructure,
      'insightful_engaging': this.insightfulStructure
    };
    
    const structureFunction = structures[tone] || this.insightfulStructure;
    
    return structureFunction.call(this, content);
  }

  urgentStructure(content) {
    return {
      opening: "🚨 Órale, hay que meterle lupa a esto:",
      body: content,
      closing: "¿Cómo le entramos de inmediato?"
    };
  }

  enthusiasticStructure(content) {
    return {
      opening: "¡Se prendió la cosa! 🔥",
      body: content,
      closing: "¡Vamos con todo a aprovecharlo!"
    };
  }

  analyticalStructure(content) {
    return {
      opening: "Revisando los números...",
      body: content,
      closing: "En pocas palabras, la estrategia es clara."
    };
  }

  educationalStructure(content) {
    return {
      opening: "Te explico cómo está la cosa:",
      body: content,
      closing: "¿Te queda más claro así?"
    };
  }

  insightfulStructure(content) {
    return {
      opening: "Lo que veo en los datos es interesante:",
      body: content,
      closing: "¿Qué opinas de este insight?"
    };
  }

  // ========= MÉTODO PRINCIPAL DE PRODUCCIÓN =========
  generateMexicanResponse(rawInsight, directives) {
    console.log('[BROCA] 🗣️🇲🇽 Generando respuesta con alma mexicana completa...');
    
    // Procesar el lenguaje completo
    const processedLanguage = this.processLanguage(rawInsight, directives);
    
    // Construir respuesta final con alma mexicana
    const mexicanResponse = this.buildFinalResponse(processedLanguage, directives);
    
    console.log('[BROCA] ✅ Respuesta mexicana lista - Con sabor y sustancia');
    
    return mexicanResponse;
  }

  buildFinalResponse(processedLanguage, directives) {
    const { emotionalTone, intensityLevel, finalContent } = processedLanguage;
    const { personality } = directives;
    
    // Seleccionar opener mexicano
    const opener = this.selectMexicanOpener(emotionalTone.detectedEmotion, personality);
    
    // Seleccionar closer mexicano
    const closer = this.selectMexicanCloser(emotionalTone.detectedEmotion, personality);
    
    return {
      opener: opener,
      content: finalContent,
      closer: closer,
      mexicanLevel: personality.mexicanismo,
      brocaSignature: "🗣️🇲🇽 Procesado por Área de Broca"
    };
  }

  selectMexicanOpener(emotion, personality) {
    const openers = {
      excitement: ["¡Órale, está padrísimo!", "¡No mames, qué chingón!", "¡Se prendió la cosa!"],
      concern: ["Ojo con esto, compa", "Pinta raro el asunto", "Hay que ponerle lupa"],
      celebration: ["¡A celebrar!", "¡Éxito total!", "¡Te rifaste!"],
      empathy: ["Te entiendo perfectamente", "Aquí andamos contigo", "Sé cómo se siente"],
      analysis: ["Revisando los números", "Viendo cómo está la cosa", "Analizando el panorama"]
    };
    
    const emotionOpeners = openers[emotion] || openers.analysis;
    const intensity = personality.enthusiasm > 0.7 ? 0 : Math.floor(emotionOpeners.length / 2);
    
    return emotionOpeners[intensity] || emotionOpeners[0];
  }

  selectMexicanCloser(emotion, personality) {
    const closers = {
      excitement: ["¡Vamos con todo!", "¡A aprovecharlo!", "¡Sigue así!"],
      concern: ["¿Cómo le entramos?", "¿Qué hacemos?", "¿Le metemos mano?"],
      celebration: ["¡Bien merecido!", "¡A seguir así!", "¡Éxito total!"],
      empathy: ["Aquí andamos", "Pa' adelante", "No estás solo"],
      analysis: ["¿Qué opinas?", "¿Cómo ves?", "¿Le entramos?"]
    };
    
    const emotionClosers = closers[emotion] || closers.analysis;
    const intensity = personality.mexicanismo > 0.8 ? 0 : Math.floor(emotionClosers.length / 2);
    
    return emotionClosers[intensity] || emotionClosers[0];
  }
}

module.exports = { BrocasArea };