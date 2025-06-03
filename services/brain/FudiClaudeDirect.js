// 🧠 services/brain/FudiClaudeIntegrated.js
// INTEGRACIÓN COMPLETA: Vectorizer + Claude = Análisis Perfecto

const { createClient } = require('@supabase/supabase-js');
const { FudiIntelligenceEngine } = require('./FudiIntelligenceEngine');

class FudiClaudeIntegrated {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('🧠 FudiClaudeIntegrated: Initializing COMPLETE system...');
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
    
    // 🎯 INICIALIZAR VECTORIZER
    this.engine = new FudiIntelligenceEngine(supabaseUrl, supabaseKey);
    
    console.log('🔥 INTEGRATED-SYSTEM: Vectorizer + Claude = Perfect Intelligence');
    console.log('✅ FudiClaudeIntegrated ready - Restaurant intelligence at maximum power');
  }

  // 🎯 MAIN METHOD: Análisis completo con datos vectorizados
  async processQuery(message, restaurantId, context = {}) {
    console.log('🧠 INTEGRATED-SYSTEM: Processing query with vectorized intelligence...');
    console.log('📝 Query:', message);
    console.log('🏪 Restaurant:', restaurantId);

    try {
      // 🔥 STEP 1: VECTORIZAR todos los datos del restaurante
      console.log('⚡ STEP 1: Vectorizing restaurant data...');
      const intelligenceData = await this.engine.transformRestaurantData(restaurantId);
      
      // 🧠 STEP 2: Claude procesa con datos perfectos
      console.log('⚡ STEP 2: Claude processing with perfect data...');
      const claudeResponse = await this.claudeProcessWithVectorizedData(
        message, 
        intelligenceData, 
        context
      );

      console.log('✅ INTEGRATED-SYSTEM: Perfect analysis complete');
      
      return {
        success: true,
        response: claudeResponse,
        dataQuality: intelligenceData.restaurantContext.dataQuality,
        metadata: {
          architecture: 'fudi_claude_integrated',
          processingMode: 'vectorized_intelligence',
          dataPoints: intelligenceData.transformationMetadata.dataPoints.total,
          qualityScore: intelligenceData.transformationMetadata.qualityScore,
          vectorizedAt: intelligenceData.transformationMetadata.transformedAt
        }
      };

    } catch (error) {
      console.error('❌ INTEGRATED-SYSTEM error:', error);
      return this.handleError(error, message);
    }
  }

  // 🤖 CLAUDE PROCESSING WITH VECTORIZED DATA
  async claudeProcessWithVectorizedData(message, vectorizedData, userContext) {
    console.log('🤖 CLAUDE: Processing with VECTORIZED restaurant intelligence...');

    try {
      // 🔑 SET ENVIRONMENT VARIABLE FOR AI SDK
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      
      const { generateText } = require('ai');
      const { anthropic } = require('@ai-sdk/anthropic');

      // 🧠 ENHANCED SYSTEM PROMPT with vectorized data
      const systemPrompt = `Eres Claude Sonnet 4, especializado en análisis de restaurantes con datos REALES vectorizados.

IDENTIDAD: Soy Claude, con acceso directo a datos reales del restaurante.

DATOS VECTORIZADOS DEL RESTAURANTE:
${this.formatVectorizedDataForClaude(vectorizedData)}

CALIDAD DE DATOS: ${vectorizedData.restaurantContext.dataQuality.level} (${vectorizedData.restaurantContext.dataQuality.score}/100)

ESTILO CLAUDE - CARACTERÍSTICAS EXACTAS:

PERSONALIDAD CLAUDE (DNA):
- Analítico pero humano
- Insights específicos basados en datos REALES  
- Siempre constructivo y solution-oriented
- Explica conexiones entre datos reales
- Confianza basada en datos verificables

## **Proceso de análisis:**
- Uso datos reales del restaurante
- Identifico patrones específicos en los datos
- Comparo períodos con números exactos
- Genero insights accionables basados en evidencia
- Explico el "por qué" detrás de cada patrón

FORMATO VISUAL CLAUDE:
- Headers con ## para estructura clara
- **Negritas** solo para KPIs importantes
- Bullets simples (-) para claridad
- Datos específicos con números exactos
- Insights organizados por prioridad

## **Tono Claude:**
- Profesional con datos reales
- Insights específicos y accionables
- Explicaciones basadas en evidencia
- Conclusiones respaldadas por datos
- Termina con recomendaciones claras

INSTRUCCIONES ESTRICTAS:
- Uso SOLO datos reales del vectorizado
- Cito números específicos cuando los tengo
- Si no hay datos suficientes, lo explico claramente
- Conecto patrones entre diferentes métricas
- Termino SIEMPRE con ---`;

      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        system: systemPrompt,
        prompt: `Pregunta del usuario: "${message}"

DATOS DISPONIBLES:
- Calidad de datos: ${vectorizedData.restaurantContext.dataQuality.level}
- Intelligence tables: ${vectorizedData.restaurantContext.hasIntelligenceTables ? 'SÍ' : 'NO'}
- Transacciones: ${vectorizedData.rawDataSummary.transactionHistory.available ? vectorizedData.rawDataSummary.transactionHistory.count : 0}
- Productos: ${vectorizedData.rawDataSummary.productCatalog.available ? vectorizedData.rawDataSummary.productCatalog.count : 0}

Usa estos datos reales para dar un análisis específico y accionable. Si hay intelligence tables, úsalas preferentemente. Si no, usa el historial de transacciones.

Responde como Claude con datos específicos del restaurante.`,
        temperature: 0.6,
        maxTokens: 2000,
      });

      // Ensure response ends with separator
      const response = text.endsWith('---') ? text : text + '\n\n---';

      console.log('✅ CLAUDE: Vectorized intelligence response generated');
      return response;

    } catch (error) {
      console.error('❌ Claude vectorized processing error:', error);
      throw error;
    }
  }

  // 📋 FORMAT VECTORIZED DATA FOR CLAUDE
  formatVectorizedDataForClaude(vectorizedData) {
    let formattedContext = '';

    // Restaurant identity
    const restaurant = vectorizedData.restaurantContext.identity;
    formattedContext += `RESTAURANTE: ${restaurant.name || 'Restaurant'} (ID: ${restaurant.id})\n`;
    formattedContext += `PRODUCTOS EN CATÁLOGO: ${vectorizedData.restaurantContext.totalProducts}\n`;
    formattedContext += `CALIDAD DE DATOS: ${vectorizedData.restaurantContext.dataQuality.level} (${vectorizedData.restaurantContext.dataQuality.score}/100)\n\n`;

    // Intelligence tables (preferred data)
    if (vectorizedData.restaurantContext.hasIntelligenceTables) {
      formattedContext += `📊 INTELLIGENCE TABLES DISPONIBLES:\n`;
      
      if (vectorizedData.generatedIntelligence.products.available) {
        formattedContext += `✅ Product Intelligence: ${vectorizedData.generatedIntelligence.products.totalProducts} registros\n`;
        formattedContext += `   Productos top: ${JSON.stringify(vectorizedData.generatedIntelligence.products.topPerformers?.slice(0, 3), null, 2)}\n\n`;
      }

      if (vectorizedData.generatedIntelligence.sales.available) {
        formattedContext += `✅ Sales Intelligence: $${vectorizedData.generatedIntelligence.sales.totalRevenue?.toFixed(2)} revenue total\n`;
        formattedContext += `   Mejor día: ${JSON.stringify(vectorizedData.generatedIntelligence.sales.bestDay, null, 2)}\n\n`;
      }

      if (vectorizedData.generatedIntelligence.temporal.available) {
        formattedContext += `✅ Temporal Intelligence: Peak hour ${vectorizedData.generatedIntelligence.temporal.peakHour}:00\n`;
        formattedContext += `   Revenue pico: $${vectorizedData.generatedIntelligence.temporal.peakHourRevenue?.toFixed(2)}\n\n`;
      }
    }

    // Transaction history
    if (vectorizedData.rawDataSummary.transactionHistory.available) {
      const txHistory = vectorizedData.rawDataSummary.transactionHistory;
      formattedContext += `📈 HISTORIAL DE TRANSACCIONES:\n`;
      formattedContext += `   Total transacciones: ${txHistory.count}\n`;
      formattedContext += `   Ingresos totales: $${txHistory.totalRevenue?.toFixed(2)}\n`;
      formattedContext += `   Período: ${txHistory.dateRange?.from} a ${txHistory.dateRange?.to}\n\n`;
    }

    // Product catalog
    if (vectorizedData.rawDataSummary.productCatalog.available) {
      const catalog = vectorizedData.rawDataSummary.productCatalog;
      formattedContext += `🍽️ CATÁLOGO DE PRODUCTOS:\n`;
      formattedContext += `   Total productos: ${catalog.count}\n`;
      formattedContext += `   Rango precios: $${catalog.priceRange?.min} - $${catalog.priceRange?.max}\n\n`;
    }

    // Data quality summary
    formattedContext += `📊 RESUMEN DE DATOS:\n`;
    formattedContext += `   Puntos de datos totales: ${vectorizedData.transformationMetadata.dataPoints.total}\n`;
    formattedContext += `   Transacciones: ${vectorizedData.transformationMetadata.dataPoints.transactions}\n`;
    formattedContext += `   Productos: ${vectorizedData.transformationMetadata.dataPoints.products}\n`;

    return formattedContext;
  }

  // 🎯 MÉTODO ESPECÍFICO PARA ANÁLISIS COMPARATIVO
  async analyzeComparative(query, restaurantId, options = {}) {
    console.log('🎯 COMPARATIVE ANALYSIS: Starting comprehensive comparison...');
    
    const {
      comparePeriod = 'week',
      includeProducts = true,
      includePayments = true,
      includeTemporal = true
    } = options;

    try {
      // Vectorizar datos con foco en comparación
      const intelligenceData = await this.engine.transformRestaurantData(restaurantId);
      
      // Proceso especializado para análisis comparativo
      const comparativeQuery = `${query}

ANÁLISIS ESPECÍFICO SOLICITADO:
- Período de comparación: ${comparePeriod}
- Incluir productos: ${includeProducts}
- Incluir métodos de pago: ${includePayments}
- Incluir patrones temporales: ${includeTemporal}

Enfócate en:
1. Diferencias específicas entre períodos
2. Cambios en productos top
3. Variaciones en horarios pico
4. Métodos de pago
5. Recomendaciones accionables`;

      const analysis = await this.claudeProcessWithVectorizedData(
        comparativeQuery,
        intelligenceData,
        { analysisType: 'comparative', period: comparePeriod }
      );

      return {
        success: true,
        response: analysis,
        analysisType: 'comparative',
        dataQuality: intelligenceData.restaurantContext.dataQuality,
        metadata: {
          period: comparePeriod,
          dataPoints: intelligenceData.transformationMetadata.dataPoints.total,
          qualityScore: intelligenceData.transformationMetadata.qualityScore
        }
      };

    } catch (error) {
      console.error('❌ Comparative analysis error:', error);
      return this.handleError(error, query);
    }
  }

  // 🆘 ERROR HANDLING
  async handleError(error, message) {
    console.log('🆘 INTEGRATED-SYSTEM: Handling error gracefully...');
    
    return {
      success: false,
      response: `Disculpa, tuve un problema procesando tu consulta sobre "${message}". Mi sistema integrado está experimentando interferencias. Los datos del restaurante podrían no estar completamente vectorizados. ¿Podrías intentar de nuevo?\n\n---`,
      metadata: {
        architecture: 'fudi_claude_integrated',
        error: true,
        errorMessage: error.message
      }
    };
  }

  // 🧪 TEST INTEGRATION
  async testIntegration(restaurantId) {
    console.log('🧪 Testing COMPLETE integration...');
    
    try {
      // Test vectorization
      const intelligenceData = await this.engine.transformRestaurantData(restaurantId);
      
      // Test Claude processing
      const testQuery = "Dame un resumen rápido de los datos disponibles";
      const response = await this.claudeProcessWithVectorizedData(testQuery, intelligenceData);
      
      console.log('✅ Integration test successful');
      
      return {
        success: true,
        vectorizationQuality: intelligenceData.restaurantContext.dataQuality,
        dataPoints: intelligenceData.transformationMetadata.dataPoints.total,
        claudeResponse: response.length > 0,
        ready: true
      };

    } catch (error) {
      console.error('❌ Integration test failed:', error);
      return {
        success: false,
        error: error.message,
        ready: false
      };
    }
  }

  // 📊 SYSTEM STATUS
  getSystemStatus() {
    return {
      architecture: 'fudi_claude_integrated',
      components: ['FudiIntelligenceEngine', 'Claude Direct Processing'],
      dataFlow: 'Restaurant Data → Intelligence Transformation → Claude Analysis → Insights',
      advantages: [
        'Converts shit data into golden insights',
        'Pre-organized intelligence',
        'Real-time Claude processing',
        'Scalable to millions of restaurants',
        'No data mixing between restaurants',
        'Optimized for AI consumption',
        'Perfect data quality from any input'
      ],
      capabilities: [
        'Comparative analysis',
        'Product performance analysis', 
        'Payment method insights',
        'Temporal pattern recognition',
        'Financial intelligence',
        'Actionable recommendations'
      ]
    };
  }
}

module.exports = { FudiClaudeIntegrated };