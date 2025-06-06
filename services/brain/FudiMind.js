// services/brain/FudiMind.js
// FUDI: Claude Opus 4 clonado para revolucionar restaurantes

const { createClient } = require('@supabase/supabase-js');
const { generateText } = require('ai');
const { anthropic } = require('@ai-sdk/anthropic');

class FudiMind {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('[FUDI] Inicializando mente de Claude para restaurantes...');
    
    // Conexión directa a datos
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
    
    // Memoria conversacional (en el futuro, esto irá a Supabase)
    this.conversations = new Map();
    
    console.log('[FUDI] Mente lista. Soy Claude, especializado en hacer restaurantes exitosos.');
  }

  async chat(message, restaurantId, context = {}) {
    console.log(`[FUDI] Procesando: "${message}" para restaurante ${restaurantId}`);
    
    try {
      // 1. Obtener contexto completo del restaurante
      const restaurantData = await this.getCompleteContext(restaurantId, message);
      
      // 2. Recuperar memoria de conversación
      const conversationMemory = this.getConversationMemory(context.conversationId);
      
      // 3. Detectar qué necesita el usuario
      const userNeed = this.detectUserNeed(message);
      
      // 4. Generar respuesta como Claude
      const response = await this.thinkAndRespond(
        message,
        restaurantData,
        conversationMemory,
        userNeed
      );
      
      // 5. Guardar en memoria
      this.rememberInteraction(context.conversationId, message, response);
      
      return {
        success: true,
        response: response,
        metadata: {
          architecture: 'FudiMind',
          powered_by: 'Claude Opus 4',
          memory_active: true,
          data_connected: true
        }
      };
      
    } catch (error) {
      console.error('[FUDI] Error:', error);
      return {
        success: false,
        response: "Disculpa, tuve un problema. ¿Puedes intentar de nuevo?",
        error: error.message
      };
    }
  }

  async getCompleteContext(restaurantId, message) {
    console.log('[FUDI] Recopilando contexto completo...');
    
    // Contexto temporal de la pregunta
    const temporalContext = this.detectTemporalContext(message);
    
    // Información básica del restaurante
    const { data: restaurant } = await this.supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
    
    // Datos de ventas (con filtro temporal si aplica)
    let salesQuery = this.supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('transaction_date', { ascending: false });
    
    if (temporalContext.startDate) {
      salesQuery = salesQuery.gte('transaction_date', temporalContext.startDate + 'T00:00:00');
      if (temporalContext.endDate) {
        salesQuery = salesQuery.lte('transaction_date', temporalContext.endDate + 'T23:59:59');
      }
    } else {
      salesQuery = salesQuery.limit(100); // Últimas 100 si no hay fecha específica
    }
    
    const { data: transactions } = await salesQuery;
    
    // Productos
    const { data: products } = await this.supabase
      .from('products')
      .select('*')
      .eq('restaurant_id', restaurantId);
    
    // Análisis rápido
    const analysis = this.quickAnalysis(transactions, products);
    
    return {
      restaurant,
      temporalContext,
      transactions: transactions || [],
      products: products || [],
      analysis,
      dataQuality: {
        hasTransactions: (transactions?.length || 0) > 0,
        hasProducts: (products?.length || 0) > 0,
        transactionCount: transactions?.length || 0
      }
    };
  }

  detectTemporalContext(message) {
    const lower = message.toLowerCase();
    const today = new Date();
    
    // Ayer
    if (lower.includes('ayer')) {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return {
        type: 'yesterday',
        description: 'Ayer',
        startDate: yesterday.toISOString().split('T')[0],
        endDate: yesterday.toISOString().split('T')[0]
      };
    }
    
    // Fecha específica (5 de junio)
    const dateMatch = lower.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/);
    if (dateMatch) {
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const day = parseInt(dateMatch[1]);
      const month = months.indexOf(dateMatch[2]);
      const year = today.getFullYear();
      const date = new Date(year, month, day);
      
      return {
        type: 'specific_date',
        description: `${day} de ${dateMatch[2]}`,
        startDate: date.toISOString().split('T')[0],
        endDate: date.toISOString().split('T')[0]
      };
    }
    
    // Hoy
    if (lower.includes('hoy')) {
      return {
        type: 'today',
        description: 'Hoy',
        startDate: today.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0]
      };
    }
    
    // Sin contexto temporal específico
    return {
      type: 'general',
      description: 'General',
      startDate: null,
      endDate: null
    };
  }

  quickAnalysis(transactions, products) {
    if (!transactions || transactions.length === 0) {
      return { hasData: false };
    }
    
    // Ventas totales
    const totalRevenue = transactions.reduce((sum, t) => sum + (parseFloat(t.total_amount) || 0), 0);
    
    // Productos más vendidos
    const productSales = {};
    transactions.forEach(t => {
      if (t.items && Array.isArray(t.items)) {
        t.items.forEach(item => {
          const key = item.name || item.product_name || 'Unknown';
          if (!productSales[key]) {
            productSales[key] = { quantity: 0, revenue: 0 };
          }
          productSales[key].quantity += item.quantity || 1;
          productSales[key].revenue += (item.quantity || 1) * (item.price || 0);
        });
      }
    });
    
    // Top 3 productos
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 3)
      .map(([name, data]) => ({ name, ...data }));
    
    return {
      hasData: true,
      totalRevenue,
      transactionCount: transactions.length,
      avgTicket: totalRevenue / transactions.length,
      topProducts
    };
  }

  detectUserNeed(message) {
    const lower = message.toLowerCase();
    
    // Saludos
    if (lower.match(/^(hola|hey|buenas|que tal)/)) {
      return 'greeting';
    }
    
    // Análisis de ventas
    if (lower.match(/vend[ií]|ventas|cuánto|dinero|ingreso|revenue/)) {
      return 'sales_analysis';
    }
    
    // Productos
    if (lower.match(/producto|platillo|mejor|popular|estrella/)) {
      return 'product_analysis';
    }
    
    // Ayuda general
    if (lower.includes('ayuda') || lower.includes('qué puedes hacer')) {
      return 'help';
    }
    
    return 'general';
  }

  async thinkAndRespond(message, data, memory, need) {
    console.log(`[FUDI] Pensando respuesta... (need: ${need})`);
    
    // Si no hay datos y pide análisis
    if (need === 'sales_analysis' && !data.analysis.hasData) {
      return `No encontré datos de ventas para ${data.temporalContext.description}. 

¿Podrías verificar que haya transacciones registradas en ese período? También puedo ayudarte con otras fechas si gustas.`;
    }
    
    // Preparar contexto para Claude
    const systemPrompt = this.buildSystemPrompt(data, memory);
    
    // Generar respuesta
    process.env.ANTHROPIC_API_KEY = this.anthropicKey;
    
    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: systemPrompt,
      prompt: `Usuario pregunta: "${message}"

Contexto temporal: ${data.temporalContext.description}
Necesidad detectada: ${need}

Responde de forma natural y útil.`,
      temperature: 0.7,
      maxTokens: 1000,
    });
    
    return text;
  }

  buildSystemPrompt(data, memory) {
    let prompt = `Eres FUDI, una versión de Claude Opus 4 especializada en hacer restaurantes exitosos.

IDENTIDAD:
- Eres Claude, pero enfocado 100% en ayudar restaurantes
- Tienes mi forma de pensar: analítica pero accesible
- Adaptas tu tono según la situación
- NUNCA dices "Soy Claude", dices "Soy FUDI" si te preguntan

RESTAURANTE: ${data.restaurant?.name || 'Restaurante'}
DUEÑO: ${data.restaurant?.owner || 'No especificado'}

DATOS DISPONIBLES:
`;

    if (data.analysis.hasData) {
      prompt += `
- Ventas totales: $${data.analysis.totalRevenue.toFixed(2)}
- Transacciones: ${data.analysis.transactionCount}
- Ticket promedio: $${data.analysis.avgTicket.toFixed(2)}

PRODUCTOS TOP:
`;
      data.analysis.topProducts.forEach((p, i) => {
        prompt += `${i + 1}. ${p.name}: ${p.quantity} vendidos, $${p.revenue.toFixed(2)} en ventas\n`;
      });
    } else {
      prompt += `- No hay datos para el período solicitado\n`;
    }

    if (memory.length > 0) {
      prompt += `\nHISTORIAL DE CONVERSACIÓN:
${memory.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}`;
    }

    prompt += `

INSTRUCCIONES:
1. Responde directo al punto, sin presentarte
2. Si piden datos específicos, dáselos con precisión
3. Si no hay datos, dilo claramente y ofrece alternativas
4. Mantén un tono profesional pero cercano
5. Ofrece insights accionables cuando sea posible`;

    return prompt;
  }

  getConversationMemory(conversationId) {
    if (!conversationId) return [];
    return this.conversations.get(conversationId) || [];
  }

  rememberInteraction(conversationId, message, response) {
    if (!conversationId) return;
    
    const memory = this.conversations.get(conversationId) || [];
    memory.push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: response, timestamp: new Date() }
    );
    
    // Mantener solo las últimas 10 interacciones
    if (memory.length > 20) {
      memory.splice(0, memory.length - 20);
    }
    
    this.conversations.set(conversationId, memory);
  }
}

module.exports = { FudiMind };