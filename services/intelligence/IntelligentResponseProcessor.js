// 🧠 services/intelligence/IntelligentResponseProcessor.js
// FUDI HISTORICAL FUNCTION: Transform Claude Model insights into structured responses
// PURPOSE: Bridge between DATA (IntelligentQueryRouter) and SOUL (HumanizerUniversal)
// VISION: Claude-level intelligence with restaurant brain

class IntelligentResponseProcessor {
  constructor() {
    this.responseTemplates = {
      sales_analysis: 'sales_deep_dive',
      product_performance: 'product_spotlight',
      temporal_analysis: 'time_intelligence',
      revenue_breakdown: 'financial_intelligence',
      comparative_analysis: 'competitive_intelligence'
    };
  }

  // 🎯 MAIN PROCESSOR: Transform insights into structured intelligence
  async processIntelligentResponse(insights, queryContext, userData = {}) {
    console.log('🧠 IntelligentResponseProcessor: Starting intelligence processing...');
    console.log('📊 Input insights count:', insights.length);
    console.log('🎯 Query context:', queryContext);

    try {
      // 1. VECTORIZE INSIGHTS (organize by relevance and context)
      const vectorizedInsights = this.vectorizeInsights(insights, queryContext);
      
      // 2. STRUCTURE RESPONSE (convert to coherent narrative)
      const structuredResponse = this.structureIntelligentResponse(vectorizedInsights, queryContext);
      
      // 3. ADD INTELLIGENCE LAYERS (context, predictions, recommendations)
      const enhancedResponse = this.addIntelligenceLayers(structuredResponse, userData);
      
      console.log('✅ IntelligentResponseProcessor: Processing complete');
      return enhancedResponse;

    } catch (error) {
      console.error('❌ IntelligentResponseProcessor error:', error);
      return this.fallbackResponse(insights, queryContext);
    }
  }

  // 📊 VECTORIZE INSIGHTS: Organize by importance and context
  vectorizeInsights(insights, queryContext) {
    console.log('🔍 Vectorizing insights for context:', queryContext.type);
    
    const vectors = {
      primary: [],      // Main insights (most important)
      secondary: [],    // Supporting insights  
      contextual: [],   // Background context
      actionable: []    // Recommendations/predictions
    };

    insights.forEach((insight, index) => {
      const insightType = this.classifyInsight(insight);
      const relevanceScore = this.calculateRelevance(insight, queryContext);
      
      const vectorizedInsight = {
        content: insight,
        type: insightType,
        relevance: relevanceScore,
        position: index,
        weight: this.calculateWeight(insight, queryContext)
      };

      // Distribute insights into vectors based on importance
      if (relevanceScore >= 0.8) {
        vectors.primary.push(vectorizedInsight);
      } else if (relevanceScore >= 0.6) {
        vectors.secondary.push(vectorizedInsight);
      } else if (relevanceScore >= 0.4) {
        vectors.contextual.push(vectorizedInsight);
      } else {
        vectors.actionable.push(vectorizedInsight);
      }
    });

    // Sort each vector by weight
    Object.keys(vectors).forEach(key => {
      vectors[key].sort((a, b) => b.weight - a.weight);
    });

    console.log('📊 Vectorization complete:', {
      primary: vectors.primary.length,
      secondary: vectors.secondary.length,
      contextual: vectors.contextual.length,
      actionable: vectors.actionable.length
    });

    return vectors;
  }

  // 🏗️ STRUCTURE INTELLIGENT RESPONSE: Convert vectors into coherent narrative
  structureIntelligentResponse(vectors, queryContext) {
    console.log('🏗️ Structuring intelligent response...');
    
    const responseStructure = {
      headline: this.generateHeadline(vectors.primary, queryContext),
      mainInsight: this.buildMainInsight(vectors.primary),
      supportingData: this.buildSupportingData(vectors.secondary),
      contextualInfo: this.buildContextualInfo(vectors.contextual),
      actionableItems: this.buildActionableItems(vectors.actionable),
      intelligenceSignature: this.buildIntelligenceSignature(queryContext)
    };

    // Convert structure to narrative flow
    const narrativeResponse = this.convertToNarrative(responseStructure, queryContext);
    
    console.log('✅ Response structure complete');
    return narrativeResponse;
  }

  // 🎯 CLASSIFY INSIGHT: Determine insight type for vectorization
  classifyInsight(insight) {
    const insightText = insight.toLowerCase();
    
    if (insightText.includes('estrella') || insightText.includes('star') || insightText.includes('top')) {
      return 'star_product';
    }
    if (insightText.includes('revenue') || insightText.includes('$') || insightText.includes('peso')) {
      return 'financial';
    }
    if (insightText.includes('peak') || insightText.includes('hora') || insightText.includes('time')) {
      return 'temporal';
    }
    if (insightText.includes('claude model') || insightText.includes('intelligence')) {
      return 'system_info';
    }
    if (insightText.includes('velocity') || insightText.includes('margin')) {
      return 'performance_metric';
    }
    
    return 'general';
  }

  // 📈 CALCULATE RELEVANCE: Score insight relevance to query context
  calculateRelevance(insight, queryContext) {
    let score = 0.5; // Base score
    
    const insightText = insight.toLowerCase();
    const queryType = queryContext.type?.toLowerCase() || '';
    
    // Boost score based on query context match
    if (queryType.includes('ventas') || queryType.includes('sales')) {
      if (insightText.includes('revenue') || insightText.includes('$')) score += 0.3;
      if (insightText.includes('estrella') || insightText.includes('star')) score += 0.2;
    }
    
    if (queryType.includes('producto') || queryType.includes('product')) {
      if (insightText.includes('estrella') || insightText.includes('star')) score += 0.4;
      if (insightText.includes('velocity') || insightText.includes('margin')) score += 0.2;
    }
    
    // Penalize system/technical info for user-facing queries
    if (insightText.includes('claude model') || insightText.includes('pre-calculada')) {
      score -= 0.2;
    }
    
    return Math.min(1.0, Math.max(0.0, score));
  }

  // ⚖️ CALCULATE WEIGHT: Determine insight importance
  calculateWeight(insight, queryContext) {
    let weight = 50; // Base weight
    
    const insightText = insight.toLowerCase();
    
    // High value insights
    if (insightText.includes('$') && insightText.match(/\$[\d,]+/)) weight += 30;
    if (insightText.includes('estrella') || insightText.includes('star')) weight += 25;
    if (insightText.includes('unidades') && insightText.match(/\d+ unidades/)) weight += 20;
    
    // Medium value insights  
    if (insightText.includes('peak') || insightText.includes('hora')) weight += 15;
    if (insightText.includes('velocity') || insightText.includes('margin')) weight += 10;
    
    // Low value insights
    if (insightText.includes('claude model')) weight -= 20;
    if (insightText.includes('respuesta instantánea')) weight -= 15;
    
    return weight;
  }

  // 📰 GENERATE HEADLINE: Create compelling opening
  generateHeadline(primaryInsights, queryContext) {
    if (primaryInsights.length === 0) return "Análisis de intelligence completado";
    
    const starProduct = primaryInsights.find(i => i.type === 'star_product');
    if (starProduct) {
      // Extract product name and key metrics
      const match = starProduct.content.match(/(\w+[\w\s]*) fue tu ESTRELLA.*?(\d+) unidades.*?\$?([\d,]+)/);
      if (match) {
        const [, productName, units, revenue] = match;
        return `🌟 ${productName.trim()} dominó tu negocio`;
      }
    }
    
    const financialInsight = primaryInsights.find(i => i.type === 'financial');
    if (financialInsight) {
      const match = financialInsight.content.match(/\$?([\d,]+\.?\d*)/);
      if (match) {
        return `💰 $${match[1]} en revenue analizado`;
      }
    }
    
    return "📊 Intelligence de negocio lista";
  }

  // 🏗️ BUILD MAIN INSIGHT: Core message
  buildMainInsight(primaryInsights) {
    if (primaryInsights.length === 0) return null;
    
    const starProduct = primaryInsights.find(i => i.type === 'star_product');
    const financial = primaryInsights.find(i => i.type === 'financial');
    
    let mainInsight = "";
    
    if (starProduct) {
      // Clean up the star product insight
      const cleanInsight = starProduct.content
        .replace(/🌟\s*\*?\*?/, '')
        .replace(/\*?\*?\s*fue tu ESTRELLA/, ' fue tu producto estrella')
        .replace(/\(\$?([0-9,]+\.?\d*)\)/, 'generando $$$1');
      
      mainInsight = cleanInsight;
    }
    
    if (financial && !mainInsight.includes('Revenue Total')) {
      const revenueMatch = financial.content.match(/Revenue Total:\s*\$?([\d,]+\.?\d*)/);
      if (revenueMatch) {
        const totalRevenue = revenueMatch[1];
        if (mainInsight) {
          mainInsight += `. Revenue total del período: $${totalRevenue}`;
        } else {
          mainInsight = `Revenue total analizado: $${totalRevenue}`;
        }
      }
    }
    
    return mainInsight || primaryInsights[0].content;
  }

  // 📊 BUILD SUPPORTING DATA: Additional context
  buildSupportingData(secondaryInsights) {
    if (secondaryInsights.length === 0) return [];
    
    return secondaryInsights
      .slice(0, 3) // Limit to top 3 supporting insights
      .map(insight => {
        // Clean up technical jargon
        return insight.content
          .replace(/Intelligence:/g, 'Métricas:')
          .replace(/Velocity/g, 'Velocidad')
          .replace(/Peak:/g, 'Pico:')
          .replace(/Peak Intelligence:/g, 'Hora pico:');
      });
  }

  // 🔍 BUILD CONTEXTUAL INFO: Background information
  buildContextualInfo(contextualInsights) {
    return contextualInsights
      .filter(insight => !insight.content.includes('Claude Model')) // Remove technical references
      .slice(0, 2)
      .map(insight => insight.content);
  }

  // 🎯 BUILD ACTIONABLE ITEMS: Recommendations and next steps
  buildActionableItems(actionableInsights) {
    // For now, generate smart recommendations based on data patterns
    const recommendations = [];
    
    // This would be enhanced with ML recommendations in the future
    recommendations.push("💡 Optimiza inventario basado en patrones detectados");
    recommendations.push("📈 Considera promociones en horas de menor actividad");
    
    return recommendations;
  }

  // ⚡ BUILD INTELLIGENCE SIGNATURE: System signature
  buildIntelligenceSignature(queryContext) {
    return {
      processor: 'IntelligentResponseProcessor',
      model: 'claude_restaurant_brain',
      processingTime: '<100ms',
      confidence: 'high',
      dataSource: 'pre_calculated_intelligence'
    };
  }

  // 📝 CONVERT TO NARRATIVE: Transform structure into flowing text
  convertToNarrative(structure, queryContext) {
    const narrative = {
      opening: structure.headline,
      core: structure.mainInsight,
      details: structure.supportingData,
      context: structure.contextualInfo,
      actions: structure.actionableItems,
      signature: "⚡ Procesado con intelligence pre-calculada"
    };
    
    // Combine into coherent response
    let response = narrative.opening;
    
    if (narrative.core) {
      response += `\n\n${narrative.core}`;
    }
    
    if (narrative.details && narrative.details.length > 0) {
      response += `\n\n📊 Detalles adicionales:\n${narrative.details.join('\n')}`;
    }
    
    if (narrative.actions && narrative.actions.length > 0) {
      response += `\n\n🎯 Recomendaciones:\n${narrative.actions.join('\n')}`;
    }
    
    response += `\n\n${narrative.signature}`;
    
    return {
      structured: narrative,
      text: response,
      readyForHumanizer: true
    };
  }

  // 🔄 ADD INTELLIGENCE LAYERS: Enhance with predictions and context
  addIntelligenceLayers(structuredResponse, userData) {
    // Add user-specific context if available
    if (userData.restaurantName) {
      structuredResponse.text = structuredResponse.text.replace(
        /tu negocio/g, 
        `${userData.restaurantName}`
      );
    }
    
    // Add intelligence metadata
    structuredResponse.metadata = {
      processingModel: 'claude_restaurant_brain',
      intelligenceLevel: 'advanced',
      personalizedFor: userData.restaurantName || 'restaurant_owner',
      processingTimestamp: new Date().toISOString(),
      readyForPersonalization: true
    };
    
    return structuredResponse;
  }

  // 🆘 FALLBACK RESPONSE: Safety net for errors
  fallbackResponse(insights, queryContext) {
    console.log('🆘 Using fallback response');
    
    // Try to extract basic information from insights
    const basicInfo = insights.slice(0, 2).join('\n');
    
    return {
      structured: {
        opening: "📊 Análisis completado",
        core: basicInfo,
        signature: "⚡ Procesado con sistema de respaldo"
      },
      text: `📊 Análisis completado\n\n${basicInfo}\n\n⚡ Procesado con sistema de respaldo`,
      readyForHumanizer: true,
      fallback: true
    };
  }

  // 🧪 TEST UTILITIES: For development and debugging
  async testProcessor(sampleInsights, queryContext) {
    console.log('🧪 Testing IntelligentResponseProcessor...');
    
    const result = await this.processIntelligentResponse(sampleInsights, queryContext, {
      restaurantName: 'Fudiverse Test Restaurant'
    });
    
    console.log('🧪 Test Result:', result);
    return result;
  }
}

module.exports = { IntelligentResponseProcessor };

// 🎯 USAGE EXAMPLE:
/*
const { IntelligentResponseProcessor } = require('./IntelligentResponseProcessor');

const processor = new IntelligentResponseProcessor();

const sampleInsights = [
  '🌟 PQ2 UN POLLO ROSTIZADO fue tu ESTRELLA ayer con 45 unidades ($9405.00)',
  '💰 Revenue Total: 30159.96 en 195 transacciones',
  '⏰ Peak Intelligence: 14:00 horas con 5353.00 en revenue',
  '⚡ Claude Model: Respuesta instantánea con inteligencia pre-calculada'
];

const queryContext = {
  type: 'sales_analysis',
  timeframe: 'yesterday',
  userId: 'restaurant_owner'
};

const result = await processor.processIntelligentResponse(sampleInsights, queryContext);
console.log('Final Response:', result.text);
*/