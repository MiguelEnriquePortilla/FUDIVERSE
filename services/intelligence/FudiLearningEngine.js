// 📁 services/intelligence/FudiLearningEngine.js

class FudiLearningEngine {
  constructor(supabase) {
    this.supabase = supabase;
    this.learningVersion = 'v1.0';
  }

  // 🧠 ANALYZE CONVERSATION QUALITY
  async analyzeConversation(restaurantId, question, response, userFeedback = null) {
    console.log(`🧠 Analyzing conversation for ${restaurantId}`);
    
    const conversationAnalysis = {
      question_intent: await this.classifyQuestionIntent(question),
      response_accuracy: await this.scoreResponseAccuracy(response),
      pattern_usage: await this.analyzePatternUsage(restaurantId, response),
      user_satisfaction: userFeedback ? this.parseUserFeedback(userFeedback) : null,
      conversation_timestamp: new Date().toISOString()
    };

    // Store conversation for learning
    await this.storeConversationLearning(restaurantId, {
      question,
      response,
      analysis: conversationAnalysis,
      feedback: userFeedback
    });

    // Update FUDI's restaurant-specific intelligence
    await this.updateRestaurantIntelligence(restaurantId, conversationAnalysis);

    return conversationAnalysis;
  }

  // 🎯 CLASSIFY QUESTION INTENT
  async classifyQuestionIntent(question) {
    const intentPatterns = {
      product_analysis: [
        'platillo estrella', 'producto top', 'más vendido', 'bestseller',
        'star product', 'performance', 'análisis producto'
      ],
      temporal_analysis: [
        'temporada', 'mes', 'semana', 'ayer', 'hoy', 'tendencia',
        'comparar', 'vs', 'histórico', 'seasonal'
      ],
      forecasting: [
        'predice', 'predicción', 'forecast', 'proyección', 'futuro',
        'esperar', 'próximo', 'siguiente'
      ],
      optimization: [
        'mejorar', 'optimizar', 'recomendar', 'sugerir', 'estrategia',
        'aumentar', 'incrementar', 'boost'
      ],
      pattern_discovery: [
        'patrón', 'pattern', 'tendencia', 'comportamiento', 'cuando',
        'hora pico', 'día mejor', 'frecuencia'
      ]
    };

    const questionLower = question.toLowerCase();
    const detectedIntents = [];

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      const matches = patterns.filter(pattern => 
        questionLower.includes(pattern.toLowerCase())
      );
      
      if (matches.length > 0) {
        detectedIntents.push({
          intent,
          confidence: matches.length / patterns.length,
          matched_patterns: matches
        });
      }
    }

    return {
      primary_intent: detectedIntents.length > 0 ? detectedIntents[0].intent : 'general_inquiry',
      all_intents: detectedIntents,
      intent_confidence: detectedIntents.length > 0 ? detectedIntents[0].confidence : 0.5
    };
  }

  // 📊 SCORE RESPONSE ACCURACY
  async scoreResponseAccuracy(response) {
    const qualityIndicators = {
      has_specific_numbers: /\d+(\.\d+)?/.test(response),
      has_product_names: /\*\*[^*]+\*\*/.test(response),
      has_insights: /🌟|🔥|📊|📈|🏆/.test(response),
      has_confidence_indicator: /confianza|confiabilidad|confidence/.test(response.toLowerCase()),
      has_actionable_advice: /recomiend|suger|optim|mejor/.test(response.toLowerCase()),
      appropriate_length: response.length > 100 && response.length < 2000
    };

    const score = Object.values(qualityIndicators).filter(Boolean).length / Object.keys(qualityIndicators).length;

    return {
      accuracy_score: score,
      quality_indicators: qualityIndicators,
      response_length: response.length,
      contains_data: qualityIndicators.has_specific_numbers,
      contains_insights: qualityIndicators.has_insights
    };
  }

  // 🔍 ANALYZE PATTERN USAGE
  async analyzePatternUsage(restaurantId, response) {
    // Get restaurant's learned patterns
    const { data: patterns } = await this.supabase
      .from('fudi_learned_patterns')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('confidence', 0.7);

    const usedPatterns = [];
    const responseLower = response.toLowerCase();

    if (patterns) {
      patterns.forEach(pattern => {
        const patternName = pattern.pattern_name.toLowerCase();
        const patternType = pattern.pattern_type;
        
        // Check if pattern was referenced in response
        if (responseLower.includes(patternName) || 
            responseLower.includes(patternType) ||
            (pattern.pattern_data.peak_day_name && 
             responseLower.includes(pattern.pattern_data.peak_day_name.toLowerCase()))) {
          
          usedPatterns.push({
            pattern_id: pattern.id,
            pattern_name: pattern.pattern_name,
            pattern_type: pattern.pattern_type,
            confidence: pattern.confidence,
            strength: pattern.strength
          });
        }
      });
    }

    return {
      patterns_available: patterns ? patterns.length : 0,
      patterns_used: usedPatterns.length,
      pattern_usage_rate: patterns && patterns.length > 0 ? usedPatterns.length / patterns.length : 0,
      used_patterns: usedPatterns
    };
  }

  // 💾 STORE CONVERSATION LEARNING
  async storeConversationLearning(restaurantId, conversationData) {
    const { error } = await this.supabase
      .from('fudi_conversation_learning')
      .insert({
        restaurant_id: restaurantId,
        question: conversationData.question,
        response: conversationData.response,
        conversation_analysis: conversationData.analysis,
        user_feedback: conversationData.feedback,
        learning_version: this.learningVersion,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error storing conversation learning:', error);
    }
  }

  // 🧠 UPDATE RESTAURANT-SPECIFIC INTELLIGENCE
  async updateRestaurantIntelligence(restaurantId, analysis) {
    const currentIntelligence = await this.getRestaurantIntelligence(restaurantId);
    
    const updatedIntelligence = {
      ...currentIntelligence,
      total_conversations: (currentIntelligence.total_conversations || 0) + 1,
      avg_response_accuracy: this.calculateRunningAverage(
        currentIntelligence.avg_response_accuracy || 0.5,
        analysis.response_accuracy.accuracy_score,
        currentIntelligence.total_conversations || 0
      ),
      pattern_usage_rate: this.calculateRunningAverage(
        currentIntelligence.pattern_usage_rate || 0,
        analysis.pattern_usage.pattern_usage_rate,
        currentIntelligence.total_conversations || 0
      ),
      primary_question_types: this.updateQuestionTypeFrequency(
        currentIntelligence.primary_question_types || {},
        analysis.question_intent.primary_intent
      ),
      last_updated: new Date().toISOString(),
      learning_version: this.learningVersion
    };

    await this.supabase
      .from('fudi_restaurant_intelligence')
      .upsert({
        restaurant_id: restaurantId,
        intelligence_data: updatedIntelligence,
        updated_at: new Date().toISOString()
      });
  }

  // 📊 UTILITY FUNCTIONS
  calculateRunningAverage(currentAvg, newValue, count) {
    if (count === 0) return newValue;
    return (currentAvg * count + newValue) / (count + 1);
  }

  updateQuestionTypeFrequency(currentTypes, newType) {
    const updated = { ...currentTypes };
    updated[newType] = (updated[newType] || 0) + 1;
    return updated;
  }

  async getRestaurantIntelligence(restaurantId) {
    const { data } = await this.supabase
      .from('fudi_restaurant_intelligence')
      .select('intelligence_data')
      .eq('restaurant_id', restaurantId)
      .single();

    return data ? data.intelligence_data : {};
  }

  parseUserFeedback(feedback) {
    // Simple feedback parsing - can be enhanced with NLP
    const positive = ['good', 'great', 'excellent', 'helpful', 'perfect', 'correct'];
    const negative = ['bad', 'wrong', 'incorrect', 'unhelpful', 'useless'];
    
    const feedbackLower = feedback.toLowerCase();
    
    if (positive.some(word => feedbackLower.includes(word))) {
      return { sentiment: 'positive', confidence: 0.8 };
    } else if (negative.some(word => feedbackLower.includes(word))) {
      return { sentiment: 'negative', confidence: 0.8 };
    }
    
    return { sentiment: 'neutral', confidence: 0.5 };
  }
}

module.exports = { FudiLearningEngine };