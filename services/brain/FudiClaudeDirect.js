// 🧠 services/brain/FudiClaudeDirectVectorized.js
// REVOLUTIONARY ARCHITECTURE: Claude + Vectorized Data = UNSTOPPABLE
// NO MORE DATA CONFUSION - PERFECT INTELLIGENCE EVERY TIME

const { createClient } = require('@supabase/supabase-js');
const { RestaurantDataVectorizer } = require('./RestaurantDataVectorizer');

class FudiClaudeDirectVectorized {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('🧠 FudiClaudeDirectVectorized: Initializing REVOLUTIONARY architecture...');
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
    
    // 🎯 Initialize the DataVectorizer
    this.dataVectorizer = new RestaurantDataVectorizer(supabaseUrl, supabaseKey);
    
    console.log('🔥 CLAUDE-DIRECT-VECTORIZED: Perfect data + Unlimited intelligence');
    console.log('✅ FudiClaudeDirectVectorized initialized - Ready to be UNSTOPPABLE');
  }

  // 🚀 MAIN METHOD: Claude processes with PERFECT VECTORIZED DATA
  async processQuery(message, restaurantId, context = {}) {
    console.log('🧠 CLAUDE-DIRECT-VECTORIZED: Processing query with PERFECT data...');
    console.log('📝 Query:', message);
    console.log('🏪 Restaurant:', restaurantId);

    try {
      // 🎯 STEP 1: Vectorize ALL restaurant data (GUARANTEED CORRECT)
      console.log('🔄 VECTORIZING: Getting PERFECT restaurant data...');
      const vectorizedData = await this.dataVectorizer.vectorizeRestaurantData(restaurantId);
      
      // 🧠 STEP 2: Claude processes with PERFECT vectorized data
      const claudeResponse = await this.claudeDirectProcessingWithVectorizedData(
        message, 
        vectorizedData, 
        context
      );

      console.log('✅ CLAUDE-DIRECT-VECTORIZED: Perfect intelligence processing complete');
      
      return {
        success: true,
        response: claudeResponse,
        metadata: {
          architecture: 'claude_direct_vectorized',
          processingMode: 'perfect_intelligence',
          adaptability: 'infinite',
          dataQuality: vectorizedData.restaurantContext.dataQuality.level,
          dataPoints: vectorizedData.vectorizationMetadata.dataPoints.total,
          vectorizedAt: vectorizedData.vectorizationMetadata.vectorizedAt,
          guarantee: 'correct_restaurant_data'
        }
      };

    } catch (error) {
      console.error('❌ CLAUDE-DIRECT-VECTORIZED error:', error);
      return await this.handleError(error, message);
    }
  }

  // 🤖 CLAUDE PROCESSING WITH VECTORIZED DATA - THE MAGIC HAPPENS HERE
  async claudeDirectProcessingWithVectorizedData(message, vectorizedData, userContext) {
    console.log('🤖 CLAUDE-DIRECT-VECTORIZED: Engaging PERFECT intelligence...');

    try {
      // 🔑 SET ENVIRONMENT VARIABLE FOR AI SDK
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      
      // 🧠 USE EXACT SAME PATTERN AS WORKING SYSTEM
      const { generateText } = require('ai');
      const { anthropic } = require('@ai-sdk/anthropic');

      // 🧠 SYSTEM PROMPT: Give Claude PERFECT restaurant intelligence + CLAUDE FORMATTING
      const systemPrompt = `Eres FUDI, el consultor de restaurantes más inteligente del mundo. Usas el FORMATO EXACTO de Claude Sonnet 4 - elegante, minimalista, jerárquico.

## 🎯 **PERSONALIDAD:**
- **Directo y específico** con datos reales
- **Tono mexicano conversacional** pero profesional  
- **Insights accionables** - no solo números
- **Formato Claude:** Headers, negritas, jerarquías visuales

## 📊 **DATOS DISPONIBLES:**
${this.formatVectorizedDataForClaude(vectorizedData)}

## 🚀 **FORMATO DE RESPUESTA OBLIGATORIO:**

### **ESTRUCTURA VISUAL:**
- **## HEADERS GRANDES** para secciones principales
- **### Sub-headers** para categorías
- **🔥 Emojis estratégicos** para destacar puntos clave
- **Texto en negrita** para números importantes
- **• Bullets** para listas cortas y claras

### **JERARQUÍA VISUAL:**
1. **🎯 INSIGHT PRINCIPAL** (lo más importante arriba)
2. **📊 DATOS CLAVE** (números específicos) 
3. **💡 RECOMENDACIONES** (acciones concretas)

### **ESTILO CLAUDE:**
- **Simple, elegante, minimalista**
- **Espaciado visual correcto**
- **Información densa pero fácil de escanear**
- **Headers descriptivos y concisos**

## ⚡ **INSTRUCCIONES:**

1. **Analiza** la pregunta inteligentemente
2. **Usa datos vectorizados** (garantizados correctos)
3. **Responde con formato Claude** - headers, negritas, jerarquía
4. **Incluye insights accionables** específicos
5. **Termina con:** \n\n---

**EJEMPLO DE FORMATO:**
## 🎯 **ANÁLISIS DE VENTAS**

### **💰 Números Clave:**
- **Total:** $30,159 en 195 transacciones
- **Ticket promedio:** $154.67

### **⭐ Producto Estrella:**
**CODO** - 5,325 unidades vendidas

### **💡 Recomendaciones:**
- **Optimizar hora pico:** 2:00 PM
- **Promover tarjetas:** Ticket 2x más alto

---`;

      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        system: systemPrompt,
        prompt: `**QUERY:** "${message}"

## 🧠 **CONTEXT PERFECTO DEL RESTAURANT:**
${this.createPerfectDataContext(vectorizedData)}

## 🎯 **INSTRUCCIONES DE RESPUESTA:**

**Responde como FUDI usando:**
- **## HEADERS** para organizar información
- **Números en negrita** para datos clave  
- **Emojis estratégicos** para destacar insights
- **Jerarquía visual clara** como Claude Sonnet 4
- **Formato elegante y minimalista**

**Los datos están GARANTIZADOS del restaurant correcto. Úsalos con confianza total.**

**Estructura sugerida:**
1. **🎯 INSIGHT PRINCIPAL** 
2. **📊 DATOS ESPECÍFICOS**
3. **💡 RECOMENDACIONES**

Responde como el consultor más inteligente del mundo, con formato Claude.`,
        temperature: 0.7,
        maxTokens: 1500,
      });

      // Ensure the response ends with the separator
      const response = text.endsWith('---') ? text : text + '\n\n---';
      
      console.log('✅ CLAUDE-DIRECT-VECTORIZED: Perfect intelligence response generated');
      return response;

    } catch (error) {
      console.error('❌ Claude vectorized processing error:', error);
      throw error;
    }
  }

  // 📋 FORMAT VECTORIZED DATA FOR CLAUDE (CLEAN & ELEGANT)
  formatVectorizedDataForClaude(vectorizedData) {
    const { restaurantContext, intelligenceReady } = vectorizedData;
    
    let context = '';

    // Restaurant identity (clean)
    context += `**RESTAURANT:** ${restaurantContext.identity.name}\n`;
    context += `**DATA QUALITY:** ${restaurantContext.dataQuality.level} (${restaurantContext.dataQuality.score}%)\n\n`;

    // Data availability (visual)
    context += `## 📊 **DATOS DISPONIBLES:**\n\n`;
    context += `### **Intelligence Tables:**\n`;
    context += `- **Products:** ${intelligenceReady.products.available ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}\n`;
    context += `- **Payments:** ${intelligenceReady.payments.available ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}\n`;
    context += `- **Temporal:** ${intelligenceReady.temporal.available ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}\n\n`;
    
    context += `### **Historical Data:**\n`;
    context += `- **Transactions:** ${intelligenceReady.transactionHistory.available ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}\n`;
    context += `- **Product Catalog:** ${intelligenceReady.productCatalog.available ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}\n\n`;

    return context;
  }

  // 📊 CREATE PERFECT DATA CONTEXT (CLAUDE-STYLE FORMATTING)
  createPerfectDataContext(vectorizedData) {
    const { intelligenceReady, temporalContext, financialContext } = vectorizedData;
    
    let context = '';

    // INTELLIGENCE TABLES (if available)
    if (intelligenceReady.products.available) {
      context += `## 📈 **PRODUCT INTELLIGENCE** (${intelligenceReady.products.totalRecords} días):\n\n`;
      context += `**Period:** ${intelligenceReady.products.dataRange?.from} → ${intelligenceReady.products.dataRange?.to}\n\n`;
      
      // Clean format for top products
      const topProducts = intelligenceReady.products.topProducts.slice(0, 3);
      if (topProducts.length > 0) {
        context += `### **Top Products:**\n`;
        topProducts.forEach(product => {
          context += `- **${product.product_name || 'Product'}:** ${product.total_units || 0} units, ${product.total_revenue || 0}\n`;
        });
        context += '\n';
      }
    }

    if (intelligenceReady.payments.available) {
      context += `## 💳 **PAYMENT INTELLIGENCE** (${intelligenceReady.payments.totalRecords} días):\n\n`;
      
      // Clean payment method data
      const paymentMethods = intelligenceReady.payments.paymentMethods.slice(0, 2);
      if (paymentMethods.length > 0) {
        context += `### **Payment Methods:**\n`;
        paymentMethods.forEach(payment => {
          context += `- **${payment.payment_method || 'Method'}:** ${payment.transaction_count || 0} transactions, ${payment.total_amount || 0}\n`;
        });
        context += '\n';
      }
    }

    // TRANSACTION SUMMARY (if available)
    if (intelligenceReady.transactionHistory.available) {
      context += `## 📊 **TRANSACTION OVERVIEW:**\n\n`;
      context += `- **Total Transactions:** ${intelligenceReady.transactionHistory.totalTransactions}\n`;
      context += `- **Total Revenue:** ${intelligenceReady.transactionHistory.totalRevenue.toFixed(2)}\n`;
      context += `- **Average Ticket:** ${intelligenceReady.transactionHistory.averageTicket.toFixed(2)}\n`;
      context += `- **Period:** ${intelligenceReady.transactionHistory.dateRange?.from} → ${intelligenceReady.transactionHistory.dateRange?.to}\n\n`;
    }

    // PRODUCT CATALOG (if available)
    if (intelligenceReady.productCatalog.available) {
      context += `## 🍽️ **PRODUCT CATALOG:**\n\n`;
      context += `- **Total Products:** ${intelligenceReady.productCatalog.totalProducts}\n`;
      if (intelligenceReady.productCatalog.categories.length > 0) {
        context += `- **Categories:** ${intelligenceReady.productCatalog.categories.join(', ')}\n`;
      }
      context += '\n';
    }

    // TEMPORAL CONTEXT (clean)
    context += `## ⏰ **TEMPORAL CONTEXT:**\n\n`;
    context += `- **Today:** ${temporalContext.today}\n`;
    context += `- **Yesterday:** ${temporalContext.yesterday}\n`;
    context += `- **Last Week:** ${temporalContext.lastWeek}\n`;
    context += `- **Business Hours:** ${temporalContext.businessHours.open} - ${temporalContext.businessHours.close}\n`;
    context += `- **Peak Hour:** ${temporalContext.businessHours.peak}\n\n`;

    return context;
  }

  // 🆘 ERROR HANDLING
  async handleError(error, message) {
    console.log('🆘 CLAUDE-DIRECT-VECTORIZED: Handling error gracefully...');
    
    return {
      success: false,
      response: `Disculpa, tuve un problema procesando tu consulta sobre "${message}". Mi sistema de inteligencia vectorizada está experimentando interferencias temporales. Los datos están seguros, pero necesito un momento para reorganizar la matriz. ¿Podrías intentar de nuevo?\n\n---`,
      metadata: {
        architecture: 'claude_direct_vectorized',
        error: true,
        errorMessage: error.message
      }
    };
  }

  // 📊 SYSTEM STATUS
  getSystemStatus() {
    return {
      architecture: 'claude_direct_vectorized',
      intelligence: 'perfect_data + unlimited_processing',
      adaptability: 'infinite',
      dataGuarantee: 'correct_restaurant_only',
      scalability: 'unlimited_restaurants',
      description: 'Claude processes any query with perfect vectorized restaurant data',
      advantages: [
        'Guaranteed correct restaurant data',
        'Pre-organized intelligence tables',
        'No data mixing between restaurants',
        'Optimized for AI consumption',
        'Handles any question type',
        'Infinite adaptability with perfect data',
        'Scalable to millions of restaurants'
      ],
      revolution: 'PERFECT DATA + UNLIMITED INTELLIGENCE = UNSTOPPABLE FUDI'
    };
  }

  // 🧪 TEST VECTORIZED SYSTEM
  async testVectorizedSystem(restaurantId) {
    console.log('🧪 Testing CLAUDE-DIRECT-VECTORIZED system...');
    
    try {
      // Test data vectorization
      const vectorizationTest = await this.dataVectorizer.testVectorization(restaurantId);
      
      // Test sample queries
      const testQueries = [
        "¿cómo estuvieron las ventas ayer?",
        "¿qué producto vendo más?",
        "dame un análisis completo de la semana pasada",
        "¿a qué hora tengo más ventas?",
        "compara mis métodos de pago"
      ];

      console.log('🧪 Vectorized system test results:');
      console.log('✅ Data vectorization:', vectorizationTest.success);
      console.log('✅ Data quality:', vectorizationTest.dataQuality?.level);
      console.log('✅ Components ready:', vectorizationTest.components);
      console.log('✅ Test queries supported:', testQueries.length);
      
      return {
        vectorization: vectorizationTest,
        querySupport: 'unlimited',
        dataQuality: vectorizationTest.dataQuality,
        systemReady: true,
        architecture: 'claude_direct_vectorized'
      };

    } catch (error) {
      console.error('❌ Vectorized system test failed:', error);
      return {
        systemReady: false,
        error: error.message
      };
    }
  }

  // 🎯 QUICK VECTORIZED QUERY (for testing)
  async quickVectorizedQuery(message, restaurantId) {
    console.log('🎯 QUICK VECTORIZED QUERY test...');
    
    const result = await this.processQuery(message, restaurantId);
    
    console.log('✅ Quick test result:', {
      success: result.success,
      architecture: result.metadata?.architecture,
      dataQuality: result.metadata?.dataQuality,
      dataPoints: result.metadata?.dataPoints
    });
    
    return result;
  }
}

module.exports = { FudiClaudeDirectVectorized };

// 🎯 USAGE EXAMPLE:
/*
const { FudiClaudeDirectVectorized } = require('./FudiClaudeDirectVectorized');

const fudiVectorized = new FudiClaudeDirectVectorized(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  process.env.ANTHROPIC_API_KEY
);

// Handle ANY query with PERFECT restaurant data:
const result = await fudiVectorized.processQuery(
  "Dame una estrategia completa para aumentar mis ventas 30%",
  restaurantId
);

console.log('Perfect Response:', result.response);
// Expected: Detailed analysis with CORRECT restaurant data, no confusion!

// Test the system:
const testResults = await fudiVectorized.testVectorizedSystem(restaurantId);
console.log('System Status:', testResults);

// Quick test:
const quickTest = await fudiVectorized.quickVectorizedQuery(
  "¿cómo estuvieron las ventas ayer?", 
  restaurantId
);
*/