// 🧠 TemporalProcessor.js - UNIVERSAL TIME INTELLIGENCE
// ⚡ FOUNDATION FOR ALL NEURAL LOBES - MULTI-TENANT READY

class TemporalProcessor {
  constructor() {
    console.log('⏰ TemporalProcessor initializing - Universal Time Intelligence...');
    
    // 🧠 TEMPORAL PATTERNS (SPANISH/MEXICAN CONTEXT)
    this.temporalPatterns = {
      // TODAY PATTERNS
      today: [
        'hoy', 'ahorita', 'actual', 'presente', 'en este momento',
        'hasta ahora', 'al día de hoy', 'actualmente'
      ],
      
      // YESTERDAY PATTERNS  
      yesterday: [
        'ayer', 'el día de ayer', 'día anterior', 'la jornada anterior'
      ],
      
      // THIS WEEK PATTERNS
      thisWeek: [
        'esta semana', 'semana actual', 'esta week', 'los últimos 7 días',
        'últimos siete días', 'esta jornada semanal'
      ],
      
      // THIS MONTH PATTERNS
      thisMonth: [
        'este mes', 'mes actual', 'este month', 'los últimos 30 días',
        'últimos treinta días', 'mensual', 'del mes'
      ],
      
      // SPECIFIC DAY PATTERNS
      specificDays: [
        'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo',
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
      ],
      
      // CUSTOM RANGES
      customRanges: [
        'últimos \\d+ días?', 'last \\d+ days?', 'pasados \\d+ días?',
        'desde hace \\d+ días?', '\\d+ días? atrás'
      ]
    };
    
    // 🌮 RESTAURANT CONTEXT PATTERNS
    this.restaurantContexts = {
      sales: ['vendí', 'ventas', 'ingresos', 'facturé', 'gané', 'revenue'],
      products: ['platillo', 'producto', 'comida', 'plato', 'menú', 'item'],
      customers: ['clientes', 'comensales', 'personas', 'gente', 'customers'],
      operations: ['operación', 'servicio', 'atendí', 'trabajé', 'operamos']
    };
    
    console.log('✅ TemporalProcessor initialized - Ready for multi-tenant neural processing');
  }

  // 🧠 MAIN TEMPORAL ANALYSIS METHOD
  analyzeTemporalContext(message, restaurantId = null) {
    console.log(`⏰ Analyzing temporal context: "${message}"`);
    console.log(`🏪 Restaurant context: ${restaurantId || 'universal'}`);
    
    const message_lower = message.toLowerCase();
    
    // 🔍 DETECT TIMEFRAME
    const timeframe = this.detectTimeframe(message_lower);
    
    // 🔍 DETECT RESTAURANT CONTEXT
    const context = this.detectRestaurantContext(message_lower);
    
    // 📅 CALCULATE DATE RANGE
    const dateRange = this.calculateDateRange(timeframe);
    
    // 🎯 BUILD TEMPORAL INTELLIGENCE
    const temporalIntelligence = {
      timeframe: timeframe,
      context: context,
      dateRange: dateRange,
      restaurantId: restaurantId,
      confidence: this.calculateConfidence(timeframe, context),
      queryType: this.determineQueryType(timeframe, context),
      
      // 🧠 NEURAL ROUTING SUGGESTIONS
      suggestedLobes: this.suggestNeuralLobes(timeframe, context),
      
      // 📊 DATA FILTER PARAMETERS
      dataFilters: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        restaurantId: restaurantId,
        contextType: context.primary
      },
      
      // 🎭 RESPONSE CONTEXT
      responseContext: {
        timeframeLabel: this.getTimeframeLabel(timeframe),
        shouldMentionTimeframe: timeframe.type !== 'default',
        urgencyLevel: this.calculateUrgencyLevel(timeframe, context)
      }
    };
    
    console.log('⚡ Temporal analysis complete:', {
      timeframe: temporalIntelligence.timeframe.type,
      context: temporalIntelligence.context.primary,
      suggestedLobes: temporalIntelligence.suggestedLobes,
      confidence: temporalIntelligence.confidence
    });
    
    return temporalIntelligence;
  }

  // 🔍 DETECT TIMEFRAME FROM MESSAGE
  detectTimeframe(message) {
    // TODAY
    if (this.matchesAnyPattern(message, this.temporalPatterns.today)) {
      return {
        type: 'today',
        days: 0,
        label: 'hoy',
        period: 'current_day'
      };
    }
    
    // YESTERDAY
    if (this.matchesAnyPattern(message, this.temporalPatterns.yesterday)) {
      return {
        type: 'yesterday', 
        days: 1,
        label: 'ayer',
        period: 'previous_day'
      };
    }
    
    // THIS WEEK
    if (this.matchesAnyPattern(message, this.temporalPatterns.thisWeek)) {
      return {
        type: 'thisWeek',
        days: 7, 
        label: 'esta semana',
        period: 'current_week'
      };
    }
    
    // THIS MONTH
    if (this.matchesAnyPattern(message, this.temporalPatterns.thisMonth)) {
      return {
        type: 'thisMonth',
        days: 30,
        label: 'este mes',
        period: 'current_month'
      };
    }
    
    // CUSTOM RANGE (e.g., "últimos 15 días")
    const customMatch = this.detectCustomRange(message);
    if (customMatch) {
      return customMatch;
    }
    
    // DEFAULT (30 days for general analysis)
    return {
      type: 'default',
      days: 30,
      label: 'período reciente',
      period: 'default_range'
    };
  }

  // 🔍 DETECT RESTAURANT CONTEXT
  detectRestaurantContext(message) {
    const contexts = [];
    
    // Check each context type
    Object.keys(this.restaurantContexts).forEach(contextType => {
      const patterns = this.restaurantContexts[contextType];
      if (this.matchesAnyPattern(message, patterns)) {
        contexts.push(contextType);
      }
    });
    
    return {
      primary: contexts[0] || 'general',
      secondary: contexts.slice(1),
      all: contexts,
      confidence: contexts.length > 0 ? 0.9 : 0.5
    };
  }

  // 📅 CALCULATE DATE RANGE
  calculateDateRange(timeframe) {
    const now = new Date();
    let startDate, endDate;
    
    switch (timeframe.type) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        break;
        
      case 'yesterday':
        const mexicoTime = new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"});
        const now_mexico = new Date(mexicoTime);
        const yesterday = new Date(now_mexico);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
        endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59);
        break;
        
      default:
        // For week, month, custom ranges
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - timeframe.days);
        endDate = now;
        break;
    }
    
    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      days: timeframe.days,
      type: timeframe.type
    };
  }

  // 🧠 SUGGEST NEURAL LOBES BASED ON CONTEXT
  suggestNeuralLobes(timeframe, context) {
    const lobes = [];
    
    // Primary context routing
    switch (context.primary) {
      case 'sales':
        lobes.push('PaymentLobe', 'ProfitabilityLobe');
        break;
      case 'products': 
        lobes.push('ProductLobe', 'MenuLobe');
        break;
      case 'customers':
        lobes.push('CustomerLobe', 'EmotionalLobe');
        break;
      case 'operations':
        lobes.push('OperationsLobe', 'TimingLobe');
        break;
      default:
        lobes.push('ProductLobe'); // Default fallback
    }
    
    // Temporal-based additions
    if (timeframe.type === 'today' || timeframe.type === 'yesterday') {
      lobes.push('TimingLobe'); // For daily patterns
    }
    
    if (timeframe.days >= 7) {
      lobes.push('TrendLobe'); // For pattern analysis
    }
    
    // Always add integration
    lobes.push('IntegrationLobe');
    
    return [...new Set(lobes)]; // Remove duplicates
  }

  // 🔍 UTILITY METHODS
  matchesAnyPattern(message, patterns) {
    return patterns.some(pattern => {
      const regex = new RegExp(pattern, 'i');
      return regex.test(message);
    });
  }
  
  detectCustomRange(message) {
    const customPatterns = this.temporalPatterns.customRanges;
    
    for (const pattern of customPatterns) {
      const regex = new RegExp(pattern, 'i');
      const match = message.match(regex);
      
      if (match) {
        const numberMatch = match[0].match(/\d+/);
        if (numberMatch) {
          const days = parseInt(numberMatch[0]);
          return {
            type: 'custom',
            days: days,
            label: `últimos ${days} días`,
            period: 'custom_range'
          };
        }
      }
    }
    
    return null;
  }
  
  calculateConfidence(timeframe, context) {
    let confidence = 0.5; // Base confidence
    
    if (timeframe.type !== 'default') confidence += 0.3;
    if (context.primary !== 'general') confidence += 0.2;
    
    return Math.min(confidence, 1.0);
  }
  
  determineQueryType(timeframe, context) {
    return `${context.primary}_${timeframe.type}`;
  }
  
  getTimeframeLabel(timeframe) {
    return timeframe.label;
  }
  
  calculateUrgencyLevel(timeframe, context) {
    if (timeframe.type === 'today' && context.primary === 'sales') return 'high';
    if (timeframe.type === 'yesterday') return 'medium';
    return 'low';
  }

  // 🔧 UTILITY FOR LOBES - GET STANDARD DATE FILTER
  getDateFilterForLobe(temporalIntelligence, restaurantId) {
    return {
      restaurantId: restaurantId,
      startDate: temporalIntelligence.dateRange.startDate,
      endDate: temporalIntelligence.dateRange.endDate,
      timeframeType: temporalIntelligence.timeframe.type,
      days: temporalIntelligence.timeframe.days
    };
  }

  // 🎭 GENERATE RESPONSE CONTEXT FOR HUMANIZER
  getResponseContext(temporalIntelligence) {
    return {
      timeframeLabel: temporalIntelligence.responseContext.timeframeLabel,
      shouldMentionTimeframe: temporalIntelligence.responseContext.shouldMentionTimeframe,
      urgencyLevel: temporalIntelligence.responseContext.urgencyLevel,
      queryType: temporalIntelligence.queryType,
      confidence: temporalIntelligence.confidence
    };
  }
}

module.exports = TemporalProcessor;