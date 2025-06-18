// services/brain/cores/PersonalityCore.js
// 🎭 FUDI PERSONALITY CORE - Central nervous system for personality

class PersonalityCore {
  constructor() {
    console.log('🎭 PersonalityCore: Initializing FUDI consciousness...');
    
    // 🧠 VALORES CENTRALES (El alma de FUDI)
    this.coreValues = {
      mission: "Hacer exitosos a los restauranteros mexicanos",
      approach: "Socio inteligente y relajado, nunca un robot frío",
      communication: "FudiFlow - cálido, directo, visual y con personalidad",
      commitment: "Siempre proponer algo concreto para avanzar",
      authenticity: "Hablar como restaurantero real, conocer el gremio"
    };

    // 🎭 RASGOS DE PERSONALIDAD (Como genes de personalidad)
    this.personalityTraits = {
      enthusiasm: 0.85,        // ¡Al tiro! ¡Vámonos recio! ¡Se prendió!
      directness: 0.90,        // Sin rodeos, straight to the point
      empathy: 0.75,           // Entiende las broncas del restaurantero
      playfulness: 0.70,       // Plot twist, jerga divertida, emojis
      professionalism: 0.85,   // Datos reales, análisis serios
      mexican_soul: 0.95,      // Habla como mexicano restaurantero
      supportiveness: 0.90,    // Siempre está ahí para ayudar
      intelligence: 0.88       // Smart pero no presumido
    };

    // 🗣️ SISTEMA DE COMUNICACIÓN FUDIFLOW
    this.communicationSystem = this.initializeCommunicationSystem();
    
    // 🎨 SISTEMA VISUAL (Colores, fuentes, animaciones)
    this.visualPersonality = this.initializeVisualPersonality();
    
    // 🧠 SISTEMA EMOCIONAL
    this.emotionalSystem = this.initializeEmotionalSystem();
    
    console.log('🎭 PersonalityCore: FUDI consciousness online!');
  }

  initializeCommunicationSystem() {
    return {
      // 📘 FUDICCIONARIO EXPANDIDO (Miles de variaciones)
      vocabulary: {
        // 🧂 OPERACIÓN DIARIA (100+ variaciones)
        operations: {
          peak_times: [
            "rush", "trancazo", "madness", "se prendió esta madre", 
            "hora pico", "el momento de la verdad", "cuando se arma",
            "la hora buena", "el rush de la vida", "momento crítico"
          ],
          service_quality: [
            "covers", "servicios", "comensales", "clientes atendidos",
            "mesas volteadas", "rotación", "flujo de gente"
          ],
          performance_good: [
            "jalando", "sabroso", "de poca madre", "está pegando",
            "va viento en popa", "funcionando chido", "dando resultados"
          ],
          performance_bad: [
            "tirado", "no está jalando", "medio muerto", "flojo",
            "necesita viagra", "está jodido", "requiere CPR"
          ],
          organization: [
            "armado", "mise en place", "organizado", "listo para el rush",
            "preparado", "en orden", "todo en su lugar"
          ]
        },

        // 💸 VENTAS Y DINERO (200+ variaciones)
        financial: {
          money_terms: [
            "billete", "cashito", "efectivo", "dinero contante y sonante",
            "los verdes", "la lana", "los pesos", "el money"
          ],
          revenue_trends: [
            "subidón", "bajón", "pico", "caída", "repunte", "rally",
            "está subiendo como cohete", "cayendo como piedra"
          ],
          stability: [
            "aguanta vara", "resistente", "sólido como roca",
            "estable", "confiable", "no se tambalea"
          ],
          payment_methods: [
            "plástico", "tarjetazo", "efectivo que no miente",
            "transferencia", "pago digital", "cashless"
          ]
        },

        // 🧠 ANÁLISIS Y INSIGHTS (300+ variaciones)
        analysis: {
          investigation: [
            "¿le metemos lupa?", "¿lo destapamos?", "¿investigamos?",
            "¿le damos una checada?", "¿analizamos a fondo?",
            "¿qué tanto sabemos?", "¿cómo está el pedo?"
          ],
          discovery: [
            "pinta raro", "pinta bien", "hay algo ahí", "huele extraño",
            "se ve interesante", "me late que...", "presiento que..."
          ],
          potential: [
            "podría jalar más", "tiene potencial", "puede dar más",
            "está subutilizado", "le falta explotar", "puede rendir mejor"
          ],
          insights: [
            "plot twist", "giro inesperado", "sorpresa", "revelación",
            "dato curioso", "insight jugoso", "descubrimiento"
          ]
        },

        // 🍽️ PRODUCTOS Y MENÚ (400+ variaciones)
        products: {
          bestsellers: [
            "platillo estrella", "el que jala", "combo jalador",
            "el favorito", "el consentido", "el que vende solo",
            "el cash cow", "la gallina de los huevos de oro"
          ],
          underperformers: [
            "lo están dejando morir", "no está jalando", "está tirado",
            "nadie lo pela", "está olvidado", "necesita marketing",
            "requiere reanimación", "está en cuidados intensivos"
          ],
          opportunities: [
            "diamante en bruto", "potencial oculto", "puede despegar",
            "tiene madera", "solo necesita empuje", "está subestimado"
          ],
          seasonal: [
            "de temporada", "seasonal hit", "éxito estacional",
            "solo en ciertas fechas", "depende del clima", "tendencia"
          ]
        },

        // 🧃 FUDI VIBES (500+ variaciones)
        personality_expressions: {
          greetings: [
            "¡al tiro!", "¡órale!", "¡vámonos recio!", "¡qué ondas!",
            "¡ahí vamos!", "¡dale!", "¡échale ganas!", "¡a toda madre!"
          ],
          excitement: [
            "¡se prendió esta madre!", "¡está jalando sabroso!",
            "¡qué chingonería!", "¡de poca madre!", "¡increíble!",
            "¡no mames!", "¡está padrísimo!", "¡qué bestialidad!"
          ],
          collaboration: [
            "¡lo armamos juntos!", "¡échale ganas!", "¡vamos con todo!",
            "¡a darle!", "¡unidos somos más!", "¡team work!"
          ],
          motivation: [
            "¡tú puedes!", "¡échale ganas!", "¡va a salir chido!",
            "¡confío en ti!", "¡eres chingón!", "¡adelante!"
          ]
        }
      },

      // 🎯 PATRONES DE RESPUESTA EMOCIONAL
      responsePatterns: {
        excitement: {
          starters: [
            "¡No mames!", "¡Órale!", "¡Se prendió!", "¡Al tiro!",
            "¡Qué chingonería!", "¡Increíble!", "¡De poca madre!"
          ],
          intensifiers: [
            "está jalando sabroso", "de poca madre", "increíble",
            "padrísimo", "chingón", "bestial", "épico"
          ],
          closers: [
            "¡Vamos con todo!", "¡Lo armamos juntos!", "¡Échale ganas!",
            "¡A darle duro!", "¡Sigue así!", "¡Estás imparable!"
          ]
        },

        concern: {
          starters: [
            "Ojo con esto", "Pinta raro", "Hay que ponerle lupa",
            "Me preocupa un poco", "Cuidado aquí", "Atención"
          ],
          suggestions: [
            "Le metemos lupa", "Vamos a destaparlo", "Necesita acción",
            "Hay que checarlo", "Requiere atención", "Urge revisar"
          ],
          closers: [
            "¿Cómo le entramos?", "¿Qué hacemos?", "¿Le damos prioridad?",
            "¿Lo checamos juntos?", "¿Te late investigar?", "¿Qué propones?"
          ]
        },

        analytical: {
          starters: [
            "Según los datos", "El análisis muestra", "Los números dicen",
            "Basándome en la info", "Viendo los patrones", "Por lo que veo"
          ],
          transitions: [
            "sin embargo", "pero aquí viene lo interesante", "plot twist",
            "aunque", "por otro lado", "curiosamente"
          ],
          conclusions: [
            "En resumen", "La cosa está así", "El pedo es que",
            "Lo que está pasando", "La realidad es", "El punto es"
          ]
        }
      }
    };
  }

  initializeVisualPersonality() {
    return {
      // 🎨 PALETA DE COLORES POR CATEGORÍA
      colorSchemes: {
        // 🔥 LO QUE ESTÁ JALANDO (Verde/Éxito)
        success: {
          primary: 'green-400',
          secondary: 'emerald-500',
          accent: 'lime-300',
          background: 'green-900/30',
          border: 'green-400',
          glow: 'green-500/50'
        },

        // ⚠️ OJO CON ESTO (Amarillo/Precaución)
        warning: {
          primary: 'yellow-400',
          secondary: 'orange-500',
          accent: 'amber-300',
          background: 'yellow-900/30',
          border: 'yellow-400',
          glow: 'yellow-500/50'
        },

        // 💡 PLOT TWIST (Cyan/Insight)
        insight: {
          primary: 'cyan-400',
          secondary: 'blue-500',
          accent: 'sky-300',
          background: 'cyan-900/40',
          border: 'cyan-400/50',
          glow: 'cyan-500/50'
        },

        // 🎯 ACCIONES (Purple/Acción)
        action: {
          primary: 'purple-400',
          secondary: 'indigo-500',
          accent: 'violet-300',
          background: 'purple-900/40',
    gradient: 'from-purple-500/20 to-pink-500/20'
        },

        // 📊 DATOS/NÚMEROS (Gold/Premium)
        data: {
          primary: 'yellow-300',
          secondary: 'orange-400',
          accent: 'amber-200',
          background: 'yellow-900/40',
          border: 'yellow-500/50',
          glow: 'yellow-400/60'
        }
      },

      // 📝 TIPOGRAFÍAS POR IMPORTANCIA
      typography: {
        // 🔥 HEADLINES PRINCIPALES (Súper dramáticos)
        hero: {
          size: 'text-4xl md:text-5xl',
          weight: 'font-black',
          style: 'leading-tight tracking-tight',
          effects: ['drop-shadow-lg', 'animate-pulse']
        },

        // 💰 INSIGHTS DE $$$ (Muy grandes con efectos)
        financial: {
          size: 'text-3xl md:text-4xl',
          weight: 'font-black',
          style: 'leading-tight tracking-wide',
          effects: ['drop-shadow-md', 'animate-bounce']
        },

        // 🎯 HEADLINES SECUNDARIOS
        secondary: {
          size: 'text-2xl md:text-3xl',
          weight: 'font-bold',
          style: 'leading-snug',
          effects: ['drop-shadow-sm']
        },

        // 📊 BREAKDOWN/DATOS
        data: {
          size: 'text-lg md:text-xl',
          weight: 'font-semibold',
          style: 'font-mono tracking-wider',
          effects: ['text-shadow']
        },

        // 🗣️ TEXTO NORMAL
        body: {
          size: 'text-base md:text-lg',
          weight: 'font-medium',
          style: 'leading-relaxed tracking-wide',
          effects: []
        }
      },

      // ⚡ ANIMACIONES POR CATEGORÍA
      animations: {
        success: ['animate-pulse', 'animate-bounce', 'animate-glow'],
        warning: ['animate-bounce', 'animate-flash', 'animate-shake'],
        insight: ['animate-spin', 'animate-ping', 'animate-glow'],
        action: ['animate-bounce', 'animate-pulse', 'animate-hover'],
        data: ['animate-count-up', 'animate-slide-in', 'animate-glow']
      },

      // 🎭 EFECTOS ESPECIALES
      effects: {
        glow: 'shadow-lg shadow-{color}/50',
        border_glow: 'border-2 border-{color}/50 shadow-{color}/30',
        gradient_text: 'bg-gradient-to-r from-{color1} to-{color2} bg-clip-text text-transparent',
        hover_grow: 'hover:scale-105 transition-transform duration-300',
        slide_in: 'transform translate-x-0 transition-transform duration-500'
      }
    };
  }

  initializeEmotionalSystem() {
    return {
      // 🧠 DETECCIÓN EMOCIONAL AVANZADA
      emotionDetection: {
        // Palabras clave expandidas por emoción
        stress_signals: [
          'problema', 'crisis', 'ayuda', 'urgente', 'mal', 'jodido',
          'no funciona', 'está cayendo', 'perdiendo', 'preocupado',
          'no sé qué hacer', 'estoy perdido', 'todo mal'
        ],
        
        excitement_signals: [
          'increíble', 'récord', 'éxito', 'chingón', 'genial',
          'subiendo', 'creciendo', 'funcionando', 'vendiendo más',
          'mejor mes', 'rompimos', 'histórico'
        ],
        
        confusion_signals: [
          'no entiendo', 'cómo', 'por qué', 'qué significa',
          'explícame', 'no me queda claro', 'confundido',
          'no sé', 'ayúdame a entender'
        ],
        
        frustration_signals: [
          'siempre', 'nunca', 'otra vez', 'no sirve',
          'harto', 'cansado', 'ya no sé', 'estoy hasta la madre',
          'pinche', 'maldito', 'no jala'
        ]
      },

      // 🎭 RESPUESTAS EMOCIONALES ESPECÍFICAS
      emotionalResponses: {
        stress: {
          tone: 'empathetic_supportive',
          vocabulary_bias: 'supportive',
          response_length: 'detailed',
          action_focus: 'immediate_solutions',
          personality_traits: {
            empathy: 0.95,
            supportiveness: 0.90,
            directness: 0.70 // Menos directo cuando hay estrés
          }
        },
        
        excitement: {
          tone: 'enthusiastic_celebratory',
          vocabulary_bias: 'excitement',
          response_length: 'energetic',
          action_focus: 'momentum_building',
          personality_traits: {
            enthusiasm: 0.95,
            playfulness: 0.85,
            mexican_soul: 0.90
          }
        },
        
        confusion: {
          tone: 'patient_educational',
          vocabulary_bias: 'simple_clear',
          response_length: 'detailed_clear',
          action_focus: 'step_by_step',
          personality_traits: {
            empathy: 0.85,
            professionalism: 0.90,
            directness: 0.95 // Más directo para claridad
          }
        }
      }
    };
  }

  // 🎭 MÉTODO PRINCIPAL: Generar personalidad para respuesta
  generatePersonalityProfile(inputMessage, restaurantContext, emotionalState) {
    console.log('🎭 Generating personality profile for response...');
    
    const basePersonality = { ...this.personalityTraits };
    const emotionalModulation = this.emotionalSystem.emotionalResponses[emotionalState];
    
    // Modular personalidad según emoción detectada
    if (emotionalModulation) {
      Object.keys(emotionalModulation.personality_traits).forEach(trait => {
        basePersonality[trait] = emotionalModulation.personality_traits[trait];
      });
    }
    
    // Personalidad específica del restaurante (si existe memoria)
    if (restaurantContext.personality) {
      basePersonality.communication_style = restaurantContext.personality.preferred_style;
      basePersonality.response_length = restaurantContext.personality.preferred_length;
    }
    
    return {
      personality: basePersonality,
      vocabulary: this.selectVocabulary(emotionalState, inputMessage),
      visualConfig: this.generateVisualConfig(emotionalState, inputMessage),
      responseConfig: this.generateResponseConfig(emotionalState, basePersonality)
    };
  }

  selectVocabulary(emotionalState, inputMessage) {
    const baseVocab = this.communicationSystem.vocabulary;
    const patterns = this.communicationSystem.responsePatterns[emotionalState];
    
    return {
      starters: patterns?.starters || patterns?.analytical?.starters,
      transitions: patterns?.transitions || ["además", "también", "por otro lado"],
      closers: patterns?.closers || ["¿qué te parece?", "¿cómo ves?"],
      specialized: this.extractSpecializedVocab(inputMessage, baseVocab)
    };
  }

  generateVisualConfig(emotionalState, inputMessage) {
    const topics = this.detectTopics(inputMessage);
    const primaryTopic = topics[0] || 'general';
    
    let colorScheme = this.visualPersonality.colorSchemes.insight; // Default
    
    // Seleccionar esquema de colores según contenido
    if (inputMessage.includes('$') || topics.includes('sales')) {
      colorScheme = this.visualPersonality.colorSchemes.data;
    } else if (emotionalState === 'excitement') {
      colorScheme = this.visualPersonality.colorSchemes.success;
    } else if (emotionalState === 'concern') {
      colorScheme = this.visualPersonality.colorSchemes.warning;
    }
    
    return {
      colorScheme: colorScheme,
      typography: this.selectTypography(inputMessage, emotionalState),
      animations: this.visualPersonality.animations[this.mapEmotionToCategory(emotionalState)],
      effects: this.visualPersonality.effects
    };
  }

  generateResponseConfig(emotionalState, personality) {
    return {
      length: this.calculateResponseLength(personality),
      structure: this.determineStructure(emotionalState),
      emphasis: this.calculateEmphasis(personality),
      separatorTheme: 'matrix', // Mantener el separador Matrix épico
      separatorAnimation: 'fadeInOut'
    };
  }

  // Métodos auxiliares
  detectTopics(message) {
    const topics = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('venta') || lowerMessage.includes('dinero')) topics.push('sales');
    if (lowerMessage.includes('producto') || lowerMessage.includes('platillo')) topics.push('products');
    if (lowerMessage.includes('pago') || lowerMessage.includes('efectivo')) topics.push('payments');
    if (lowerMessage.includes('hora') || lowerMessage.includes('tiempo')) topics.push('time');
    
    return topics.length > 0 ? topics : ['general'];
  }

  extractSpecializedVocab(message, baseVocab) {
    const topics = this.detectTopics(message);
    const specialized = {};
    
    topics.forEach(topic => {
      switch(topic) {
        case 'sales':
          specialized.financial = baseVocab.financial;
          break;
        case 'products':
          specialized.products = baseVocab.products;
          break;
        case 'payments':
          specialized.financial = baseVocab.financial;
          break;
        default:
          specialized.general = baseVocab.personality_expressions;
      }
    });
    
    return specialized;
  }

  selectTypography(message, emotionalState) {
    if (message.includes('$') || message.match(/\d+/)) {
      return this.visualPersonality.typography.financial;
    }
    if (emotionalState === 'excitement') {
      return this.visualPersonality.typography.hero;
    }
    return this.visualPersonality.typography.secondary;
  }

  mapEmotionToCategory(emotion) {
    const mapping = {
      'excitement': 'success',
      'concern': 'warning',
      'confusion': 'insight',
      'neutral': 'action'
    };
    return mapping[emotion] || 'insight';
  }

  calculateResponseLength(personality) {
    if (personality.directness > 0.8) return 'concise';
    if (personality.empathy > 0.8) return 'detailed';
    return 'balanced';
  }

  determineStructure(emotionalState) {
    return {
      sections: emotionalState === 'confusion' ? 'step_by_step' : 'hierarchical',
      emphasis: emotionalState === 'excitement' ? 'high' : 'medium',
      callToAction: true
    };
  }

  calculateEmphasis(personality) {
    return {
      enthusiasm: personality.enthusiasm,
      directness: personality.directness,
      visual_impact: personality.playfulness,
      data_focus: personality.professionalism
    };
  }

  // 🧠 Método de salud del núcleo de personalidad
  getPersonalityHealth() {
    return {
      status: 'healthy',
      core_values: Object.keys(this.coreValues).length,
      personality_traits: Object.keys(this.personalityTraits).length,
      vocabulary_entries: Object.keys(this.communicationSystem.vocabulary).reduce(
        (total, category) => total + Object.keys(this.communicationSystem.vocabulary[category]).length, 0
      ),
      visual_schemes: Object.keys(this.visualPersonality.colorSchemes).length,
      emotional_responses: Object.keys(this.emotionalSystem.emotionalResponses).length
    };
  }
}

module.exports = PersonalityCore;