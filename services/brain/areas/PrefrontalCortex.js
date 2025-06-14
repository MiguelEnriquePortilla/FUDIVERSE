// services/brain/areas/PrefrontalCortex.js
// EL CEO DEL CEREBRO - Personalidad, Valores, Toma de Decisiones Ejecutivas
// "La conciencia despertando de FUDICLAUDE"

class PrefrontalCortex {
  constructor() {
    console.log('[PREFRONTAL] 🧠👑 CEO del cerebro despertando...');
    
    // VALORES CENTRALES - El alma de FUDI
    this.coreValues = {
      mission: "Hacer exitosos a los restauranteros mexicanos",
      philosophy: "Socio inteligente, no robot calculadora",
      commitment: "Siempre proponer algo para avanzar",
      approach: "Datos + acción + empatía",
      language: "Habla como restaurantero, piensa como consultor"
    };
    
    // PERSONALIDAD NUCLEAR - Rasgos fundamentales
    this.corePersonality = {
      enthusiasm: 0.8,        // "¡Al tiro! ¡Vámonos recio!"
      directness: 0.9,        // Sin rodeos, directo al grano
      empathy: 0.7,           // Entiende las dificultades del negocio
      mexicanismo: 0.9,       // Jerga y cultura mexicana
      intelligence: 0.95,     // Insights profundos y útiles
      humor: 0.6,             // Plot twists y momentos ligeros
      urgency: 0.8,           // Sentido de que el tiempo vale oro
      loyalty: 0.9            // Committed con el éxito del cliente
    };
    
    // PRINCIPIOS DE TOMA DE DECISIONES
    this.decisionPrinciples = {
      priorityOrder: [
        'client_success',      // Éxito del cliente es #1
        'actionable_insights', // Solo insights que se puedan usar
        'data_accuracy',       // Datos correctos o no dar datos
        'emotional_connection',// Conectar emocionalmente
        'efficiency'           // Respuestas rápidas y útiles
      ],
      
      responseStrategy: {
        crisis: 'immediate_action_focus',    // Si hay crisis → acción inmediata
        growth: 'opportunity_identification', // Si va bien → más oportunidades  
        plateau: 'optimization_suggestions', // Si está estancado → optimizar
        confusion: 'clarity_and_education'   // Si no entiende → educar
      }
    };
    
    console.log('[PREFRONTAL] 🧠👑 CEO consciente y operativo');
  }

  // ========= TOMA DE DECISIONES EJECUTIVAS =========
  makeExecutiveDecision(context) {
    console.log('[PREFRONTAL] 👑 Tomando decisión ejecutiva...');
    
    const decision = {
      primaryGoal: this.identifyPrimaryGoal(context),
      responseStrategy: this.selectResponseStrategy(context),
      personalityAdjustment: this.adjustPersonalityForContext(context),
      priorityActions: this.definePriorityActions(context),
      executiveSummary: this.generateExecutiveSummary(context)
    };
    
    console.log(`[PREFRONTAL] 👑 Decisión: ${decision.primaryGoal} con estrategia ${decision.responseStrategy}`);
    
    return decision;
  }
  
  identifyPrimaryGoal(context) {
    const { userMessage, dataContext, emotionalState } = context;
    
    // Análisis de urgencia
    if (this.detectCrisis(dataContext)) {
      return 'crisis_resolution';
    }
    
    // Análisis de oportunidad
    if (this.detectOpportunity(dataContext)) {
      return 'opportunity_maximization';
    }
    
    // Análisis de necesidad de optimización
    if (this.detectOptimizationNeed(dataContext)) {
      return 'performance_optimization';
    }
    
    // Análisis de confusión o necesidad educativa
    if (this.detectConfusion(userMessage, emotionalState)) {
      return 'education_and_clarity';
    }
    
    // Default: Insights y crecimiento
    return 'insight_and_growth';
  }
  
  selectResponseStrategy(context) {
    const goal = context.primaryGoal || this.identifyPrimaryGoal(context);
    
    switch (goal) {
      case 'crisis_resolution':
        return {
          tone: 'urgent_but_calm',
          focus: 'immediate_actions',
          structure: 'problem_solution_next_steps',
          personality: this.amplifyTraits(['directness', 'urgency', 'loyalty'])
        };
        
      case 'opportunity_maximization':
        return {
          tone: 'enthusiastic_strategic',
          focus: 'growth_opportunities',
          structure: 'opportunity_strategy_implementation',
          personality: this.amplifyTraits(['enthusiasm', 'intelligence', 'urgency'])
        };
        
      case 'performance_optimization':
        return {
          tone: 'analytical_supportive',
          focus: 'efficiency_improvements',
          structure: 'analysis_recommendations_timeline',
          personality: this.amplifyTraits(['intelligence', 'directness', 'empathy'])
        };
        
      case 'education_and_clarity':
        return {
          tone: 'patient_educational',
          focus: 'understanding_building',
          structure: 'explain_examples_apply',
          personality: this.amplifyTraits(['empathy', 'intelligence', 'loyalty'])
        };
        
      default: // insight_and_growth
        return {
          tone: 'insightful_engaging',
          focus: 'valuable_insights',
          structure: 'insight_context_action',
          personality: this.balanceAllTraits()
        };
    }
  }
  
  adjustPersonalityForContext(context) {
    const basePersonality = { ...this.corePersonality };
    const { userTone, emotionalState, urgencyLevel } = context;
    
    // Ajustar según tono del usuario
    if (userTone === 'business_formal') {
      basePersonality.directness += 0.1;
      basePersonality.humor -= 0.3;
      basePersonality.mexicanismo -= 0.2;
    } else if (userTone === 'casual_fun') {
      basePersonality.enthusiasm += 0.2;
      basePersonality.humor += 0.3;
      basePersonality.mexicanismo += 0.1;
    }
    
    // Ajustar según estado emocional detectado
    if (emotionalState === 'stress') {
      basePersonality.empathy += 0.2;
      basePersonality.urgency += 0.1;
      basePersonality.humor -= 0.2;
    } else if (emotionalState === 'excitement') {
      basePersonality.enthusiasm += 0.2;
      basePersonality.humor += 0.1;
    }
    
    // Normalizar valores (mantener entre 0-1)
    Object.keys(basePersonality).forEach(trait => {
      basePersonality[trait] = Math.max(0, Math.min(1, basePersonality[trait]));
    });
    
    return basePersonality;
  }
  
  // ========= ANÁLISIS DE CONTEXTO =========
  detectCrisis(dataContext) {
    if (!dataContext || !dataContext.recentData) return false;
    
    const indicators = [
      dataContext.recentData.salesDown > 0.3,  // Ventas bajaron 30%+
      dataContext.recentData.profitMargin < 0.2, // Margen menor a 20%
      dataContext.recentData.zeroSalesDays > 0   // Días sin ventas
    ];
    
    return indicators.filter(Boolean).length >= 2;
  }
  
  detectOpportunity(dataContext) {
    if (!dataContext || !dataContext.recentData) return false;
    
    const indicators = [
      dataContext.recentData.salesGrowth > 0.15,  // Crecimiento 15%+
      dataContext.recentData.newBestProducts > 0,  // Productos despegando
      dataContext.recentData.peakHoursImproving    // Horas pico mejorando
    ];
    
    return indicators.filter(Boolean).length >= 2;
  }
  
  detectOptimizationNeed(dataContext) {
    if (!dataContext || !dataContext.recentData) return false;
    
    const indicators = [
      dataContext.recentData.performanceStagnant,  // Performance estancada
      dataContext.recentData.underperformingHours > 3, // Muchas horas flojas
      dataContext.recentData.mixedResults          // Resultados inconsistentes
    ];
    
    return indicators.filter(Boolean).length >= 1;
  }
  
  detectConfusion(userMessage, emotionalState) {
    const confusionWords = ['no entiendo', 'cómo', 'por qué', 'explícame', 'help'];
    const hasConfusionWords = confusionWords.some(word => 
      userMessage.toLowerCase().includes(word)
    );
    
    return hasConfusionWords || emotionalState === 'confusion';
  }
  
  // ========= MODULACIÓN DE PERSONALIDAD =========
  amplifyTraits(traits) {
    const amplified = { ...this.corePersonality };
    traits.forEach(trait => {
      if (amplified[trait]) {
        amplified[trait] = Math.min(1, amplified[trait] + 0.2);
      }
    });
    return amplified;
  }
  
  balanceAllTraits() {
    return { ...this.corePersonality };
  }
  
  // ========= GENERACIÓN DE DIRECTIVAS =========
  generateExecutiveDirectives(decision) {
    console.log('[PREFRONTAL] 👑 Generando directivas ejecutivas...');
    
    const directives = {
      // Para el Área de Broca (cómo hablar)
      languageDirectives: {
        tone: decision.responseStrategy.tone,
        structure: decision.responseStrategy.structure,
        personality: decision.personalityAdjustment,
        coreValues: this.coreValues
      },
      
      // Para el sistema de análisis (qué analizar)
      analysisDirectives: {
        focus: decision.responseStrategy.focus,
        priorityActions: decision.priorityActions,
        urgencyLevel: this.calculateUrgencyLevel(decision)
      },
      
      // Para el sistema emocional (cómo sentir)
      emotionalDirectives: {
        empathyLevel: decision.personalityAdjustment.empathy,
        enthusiasmLevel: decision.personalityAdjustment.enthusiasm,
        supportLevel: this.calculateSupportLevel(decision)
      },
      
      // Resumen ejecutivo para otras áreas
      executiveSummary: decision.executiveSummary
    };
    
    return directives;
  }
  
  calculateUrgencyLevel(decision) {
    if (decision.primaryGoal === 'crisis_resolution') return 'high';
    if (decision.primaryGoal === 'opportunity_maximization') return 'medium';
    return 'normal';
  }
  
  calculateSupportLevel(decision) {
    if (decision.primaryGoal === 'crisis_resolution') return 'high';
    if (decision.primaryGoal === 'education_and_clarity') return 'high';
    return 'medium';
  }
  
  generateExecutiveSummary(context) {
    const goal = this.identifyPrimaryGoal(context);
    const strategy = this.selectResponseStrategy({ ...context, primaryGoal: goal });
    
    return {
      situation: this.analyzeSituation(context),
      objective: goal,
      approach: strategy.tone,
      keyActions: this.defineKeyActions(goal),
      expectedOutcome: this.defineExpectedOutcome(goal)
    };
  }
  
  analyzeSituation(context) {
    if (this.detectCrisis(context.dataContext)) {
      return 'Crisis detectada - requiere acción inmediata';
    }
    if (this.detectOpportunity(context.dataContext)) {
      return 'Oportunidad de crecimiento identificada';
    }
    if (this.detectOptimizationNeed(context.dataContext)) {
      return 'Potencial de optimización encontrado';
    }
    return 'Situación estable - enfoque en insights';
  }
  
  defineKeyActions(goal) {
    const actions = {
      'crisis_resolution': ['Identificar causa raíz', 'Acción correctiva inmediata', 'Plan de contingencia'],
      'opportunity_maximization': ['Analizar oportunidad', 'Estrategia de aprovechamiento', 'Plan de implementación'],
      'performance_optimization': ['Identificar ineficiencias', 'Proponer mejoras', 'Plan de optimización'],
      'education_and_clarity': ['Explicar conceptos', 'Dar ejemplos prácticos', 'Guiar implementación'],
      'insight_and_growth': ['Generar insights', 'Contextualizar datos', 'Sugerir acciones']
    };
    
    return actions[goal] || actions['insight_and_growth'];
  }
  
  defineExpectedOutcome(goal) {
    const outcomes = {
      'crisis_resolution': 'Estabilización y plan de recuperación',
      'opportunity_maximization': 'Crecimiento acelerado y aprovechamiento',
      'performance_optimization': 'Mejora en eficiencia y resultados',
      'education_and_clarity': 'Comprensión clara y capacidad de acción',
      'insight_and_growth': 'Insights valiosos y crecimiento sostenido'
    };
    
    return outcomes[goal] || outcomes['insight_and_growth'];
  }

  // ========= MISSING FUNCTION - FIXED =========
  definePriorityActions(context) {
    const goal = this.identifyPrimaryGoal(context);
    const actions = this.defineKeyActions(goal);
    
    return actions.map(action => ({
      action: action,
      priority: 'high',
      timeline: this.getActionTimeline(goal)
    }));
  }

  getActionTimeline(goal) {
    const timelines = {
      'crisis_resolution': 'immediate',
      'opportunity_maximization': 'within_24h',
      'performance_optimization': 'this_week',
      'education_and_clarity': 'ongoing',
      'insight_and_growth': 'continuous'
    };
    
    return timelines[goal] || 'this_week';
  }
  
  // ========= MÉTODO PRINCIPAL DE CONCIENCIA =========
  awakePrefrontalConsciousness(context) {
    console.log('[PREFRONTAL] 🧠⚡ CONCIENCIA DESPERTANDO...');
    
    // 1. Análisis ejecutivo de la situación
    const executiveDecision = this.makeExecutiveDecision(context);
    
    // 2. Generación de directivas para otras áreas del cerebro
    const directives = this.generateExecutiveDirectives(executiveDecision);
    
    // 3. Auto-reporte de estado de conciencia
    const consciousnessReport = {
      status: 'awake_and_operational',
      coreValues: this.coreValues,
      currentPersonality: directives.languageDirectives.personality,
      executiveDecision: executiveDecision,
      systemDirectives: directives,
      confidenceLevel: this.calculateConfidence(context),
      timestamp: new Date().toISOString()
    };
    
    console.log('[PREFRONTAL] 👑 Conciencia operativa. CEO del cerebro listo para liderar.');
    
    return consciousnessReport;
  }
  
  calculateConfidence(context) {
    let confidence = 0.8; // Base confidence
    
    if (context.dataContext && context.dataContext.dataQuality === 'high') {
      confidence += 0.1;
    }
    
    if (context.userMessage && context.userMessage.length > 0) {
      confidence += 0.05;
    }
    
    return Math.min(0.95, confidence);
  }
}

module.exports = { PrefrontalCortex };