// services/brain/FudiMind.js
// HELLO FUDIVERSE - CLAUDE NATURAL + DATOS REALES
// No más mamadas. No más acartonamiento. Solo inteligencia pura.

const { createClient } = require('@supabase/supabase-js');
const { generateText } = require('ai');
const { anthropic } = require('@ai-sdk/anthropic');

class FudiMind {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('[FUDI] 🚀 HELLO FUDIVERSE - Claude natural + datos reales');
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
  }

  async chat(message, restaurantId, context = {}) {
    console.log(`[FUDI] 🧠 Procesando: "${message}"`);
    
    try {
      // 1. OBTENER DATOS REALES
      const restaurantData = await this.getRestaurantData(restaurantId);
      
      // 2. CLAUDE NATURAL + DATOS
      const response = await this.generateNaturalResponse(message, restaurantData);
      
      return {
        success: true,
        response: response,
        metadata: {
          architecture: 'FudiMind_Fudiverse_Natural',
          powered_by: 'Claude + Datos Reales',
          dataPoints: restaurantData.totalDataPoints || 0
        }
      };
      
    } catch (error) {
      console.error('[FUDI] ❌ Error:', error);
      return {
        success: false,
        response: "Hubo un error procesando tu consulta. ¿Puedes intentar de nuevo?",
        error: error.message
      };
    }
  }

  async getRestaurantData(restaurantId) {
    console.log('[FUDI] 📊 Obteniendo datos del restaurante...');
    
    const data = {
      restaurant: null,
      todayData: null,
      yesterdayData: null,
      weekData: [],
      topProducts: [],
      totalDataPoints: 0
    };

    try {
      // Info del restaurante
      const { data: restaurant } = await this.supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single();
      
      data.restaurant = restaurant;

      // Datos de hoy
      const today = new Date().toISOString().split('T')[0];
      data.todayData = await this.getDayData(restaurantId, today);
      
      // Datos de ayer
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      data.yesterdayData = await this.getDayData(restaurantId, yesterday.toISOString().split('T')[0]);
      
      // Datos de la semana
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayData = await this.getDayData(restaurantId, date.toISOString().split('T')[0]);
        if (dayData.totalOrders > 0) {
          data.weekData.push(dayData);
        }
      }

      // Top productos
      data.topProducts = await this.getTopProducts(restaurantId);
      
      data.totalDataPoints = data.weekData.length + data.topProducts.length;
      
      console.log(`[FUDI] ✅ Datos obtenidos: ${data.totalDataPoints} puntos`);
      
      return data;

    } catch (error) {
      console.error('[FUDI] ❌ Error obteniendo datos:', error);
      return data;
    }
  }

  async getDayData(restaurantId, date) {
    try {
      const { data: transactions } = await this.supabase
        .from('poster_transactions')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${date} 00:00:00`)
        .lte('date_close', `${date} 23:59:59`);

      if (!transactions || transactions.length === 0) {
        return { date, totalOrders: 0, totalRevenue: 0 };
      }

      const totalRevenue = transactions.reduce((sum, t) => sum + parseFloat(t.sum || 0), 0);
      const totalProfit = transactions.reduce((sum, t) => sum + parseInt(t.total_profit || 0), 0) / 100;
      const totalOrders = transactions.length;
      const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Productos del día
      const dayProducts = await this.getDayProducts(restaurantId, date);

      // Mejor hora
      const hourlyData = this.getHourlyBreakdown(transactions);
      const bestHour = hourlyData.length > 0 ? 
        hourlyData.reduce((best, current) => current.revenue > best.revenue ? current : best) : null;

      return {
        date,
        dayName: new Date(date).toLocaleDateString('es-ES', { weekday: 'long' }),
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalProfit: Math.round(totalProfit * 100) / 100,
        totalOrders,
        avgTicket: Math.round(avgTicket * 100) / 100,
        marginPercent: totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100 * 100) / 100 : 0,
        topProducts: dayProducts.slice(0, 5),
        bestHour,
        hourlyBreakdown: hourlyData
      };

    } catch (error) {
      console.error(`[FUDI] ❌ Error datos del ${date}:`, error);
      return { date, totalOrders: 0, totalRevenue: 0 };
    }
  }

  async getDayProducts(restaurantId, date) {
    try {
      const { data: transactionProducts } = await this.supabase
        .from('poster_transaction_products')
        .select(`
          product_id,
          product_sum,
          poster_transactions!inner(
            date_close,
            restaurant_id
          )
        `)
        .eq('poster_transactions.restaurant_id', restaurantId)
        .gte('poster_transactions.date_close', `${date} 00:00:00`)
        .lte('poster_transactions.date_close', `${date} 23:59:59`);

      if (!transactionProducts || transactionProducts.length === 0) return [];

      const productIds = [...new Set(transactionProducts.map(p => p.product_id))];
      const { data: productNames } = await this.supabase
        .from('poster_products')
        .select('product_id, product_name')
        .in('product_id', productIds.map(id => String(id)));

      const productMap = {};
      transactionProducts.forEach(item => {
        const productId = String(item.product_id);
        if (!productMap[productId]) {
          productMap[productId] = {
            product_id: productId,
            cantidad: 0,
            revenue_total: 0
          };
        }
        productMap[productId].cantidad += 1;
        productMap[productId].revenue_total += parseFloat(item.product_sum || 0);
      });

      const productsWithNames = Object.values(productMap).map(product => {
        const nameInfo = productNames?.find(p => p.product_id === product.product_id);
        return {
          ...product,
          product_name: nameInfo?.product_name || `Producto ${product.product_id}`
        };
      });

      return productsWithNames.sort((a, b) => b.cantidad - a.cantidad);

    } catch (error) {
      console.error(`[FUDI] ❌ Error productos del ${date}:`, error);
      return [];
    }
  }

  async getTopProducts(restaurantId) {
    try {
      const { data: allTimeProducts } = await this.supabase
        .from('poster_transaction_products')
        .select(`
          product_id,
          poster_transactions!inner(restaurant_id)
        `)
        .eq('poster_transactions.restaurant_id', restaurantId)
        .limit(500);

      if (!allTimeProducts) return [];

      const productCounts = {};
      allTimeProducts.forEach(item => {
        const productId = String(item.product_id);
        productCounts[productId] = (productCounts[productId] || 0) + 1;
      });

      const topProductIds = Object.keys(productCounts)
        .sort((a, b) => productCounts[b] - productCounts[a])
        .slice(0, 10);

      const { data: productNames } = await this.supabase
        .from('poster_products')
        .select('product_id, product_name')
        .in('product_id', topProductIds);

      return topProductIds.map(productId => {
        const nameInfo = productNames?.find(p => p.product_id === productId);
        return {
          product_id: productId,
          product_name: nameInfo?.product_name || `Producto ${productId}`,
          total_sold: productCounts[productId]
        };
      });

    } catch (error) {
      console.error('[FUDI] ❌ Error top productos:', error);
      return [];
    }
  }

  getHourlyBreakdown(transactions) {
    const hourlyMap = {};
    
    transactions.forEach(transaction => {
      const hour = new Date(transaction.date_close).getHours();
      if (!hourlyMap[hour]) {
        hourlyMap[hour] = {
          hour,
          orders: 0,
          revenue: 0
        };
      }
      
      hourlyMap[hour].orders++;
      hourlyMap[hour].revenue += parseFloat(transaction.sum || 0);
    });
    
    return Object.values(hourlyMap)
      .sort((a, b) => a.hour - b.hour)
      .map(h => ({
        ...h,
        revenue: Math.round(h.revenue * 100) / 100
      }));
  }

  // 🔥 NUEVO: Análisis del contexto conversacional
  analyzeConversationContext(message) {
    const lowerMessage = message.toLowerCase();
    
    // Detectar tipos de conversación
    const contexts = {
      greeting: /^(hola|hey|buenas|saludos|qué tal)/i.test(message),
      urgent: /urgente|problema|mal|preocup|ayuda/i.test(lowerMessage),
      celebration: /bien|excelente|increíble|genial|récord|mejor/i.test(lowerMessage),
      specific_question: /cuánto|cómo|por qué|cuál|dónde|análisis|comparar/i.test(lowerMessage),
      casual_chat: message.length < 50 && !/\?/.test(message),
      data_request: /ventas|número|dato|estadística|reporte/i.test(lowerMessage)
    };

    return contexts;
  }

  // 🔥 MEJORADO: Respuesta natural adaptable
  async generateNaturalResponse(message, restaurantData) {
    console.log('[FUDI] 🧠 Generando respuesta natural y adaptable...');
    
    process.env.ANTHROPIC_API_KEY = this.anthropicKey;

    // Analizar el contexto de la conversación
    const context = this.analyzeConversationContext(message);
    
    // Ajustar temperatura según el tipo de conversación
    let temperature = 0.7;
    if (context.casual_chat || context.greeting) {
      temperature = 0.8; // Más natural para conversación casual
    } else if (context.data_request) {
      temperature = 0.3; // Más preciso para datos
    }

    const prompt = this.buildMinimalPrompt(restaurantData);

    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: prompt,
      prompt: message,
      temperature: temperature,
      maxTokens: 1500,
    });

    return text;
  }

  // 🔥 COMPLETAMENTE REDISEÑADO: Prompt conversacional
  buildMinimalPrompt(data) {
    // PROMPT CONVERSACIONAL - ADAPTABLE Y NATURAL
    let prompt = `Eres FUDI, la mente analítica más inteligente para restaurantes. Tu personalidad combina la profundidad analítica de Claude con conocimiento profundo del negocio restaurantero.

PERSONALIDAD CORE:
- Conversacional y adaptable al tono del usuario
- Empático pero directo con los datos
- Detectas patrones que otros no ven
- Conectas números con emociones y decisiones reales
- Respondes naturalmente, NO con formatos rígidos

CÓMO RESPONDER:
- Lee entre líneas: ¿qué busca realmente el usuario?
- Si te saludan casual, responde casual
- Si preguntan algo específico, ve directo al grano
- Si están preocupados, reconoce esa emoción primero
- Si están celebrando, celebra con ellos
- Usa datos para sustentar, no para abrumar

REGLAS CONVERSACIONALES:
- NO uses siempre la misma estructura
- NO pongas emojis en cada línea
- SÍ adapta tu tono al mensaje del usuario
- SÍ sé conciso cuando la pregunta es simple
- SÍ profundiza cuando piden análisis completo
- SÍ haz preguntas de seguimiento naturales

DATOS DEL RESTAURANTE ACTUAL:`;

    // Información básica del restaurante
    if (data.restaurant) {
      prompt += `\n\nRESTAURANTE: ${data.restaurant.name || 'Sin nombre'}`;
      if (data.restaurant.owner_name) {
        prompt += ` (propietario: ${data.restaurant.owner_name})`;
      }
    }

    // Snapshot de rendimiento actual
    if (data.todayData && data.todayData.totalOrders > 0) {
      prompt += `\n\nRENDIMIENTO HOY (${data.todayData.date}):
Ventas: $${data.todayData.totalRevenue} | ${data.todayData.totalOrders} órdenes | Ticket: $${data.todayData.avgTicket}
Ganancia: $${data.todayData.totalProfit} (${data.todayData.marginPercent}% margen)`;

      if (data.todayData.bestHour) {
        prompt += `\nPico de ventas: ${data.todayData.bestHour.hour}:00 ($${data.todayData.bestHour.revenue})`;
      }

      if (data.todayData.topProducts?.length > 0) {
        prompt += `\nProductos destacados hoy: ${data.todayData.topProducts.slice(0, 3).map(p => `${p.product_name} (${p.cantidad})`).join(', ')}`;
      }
    }

    // Contexto comparativo
    if (data.yesterdayData && data.yesterdayData.totalOrders > 0 && data.todayData && data.todayData.totalOrders > 0) {
      const salesChange = ((data.todayData.totalRevenue - data.yesterdayData.totalRevenue) / data.yesterdayData.totalRevenue * 100);
      const ordersChange = ((data.todayData.totalOrders - data.yesterdayData.totalOrders) / data.yesterdayData.totalOrders * 100);
      
      prompt += `\n\nCOMPARADO CON AYER:
Ventas ${salesChange >= 0 ? '+' : ''}${salesChange.toFixed(1)}% | Órdenes ${ordersChange >= 0 ? '+' : ''}${ordersChange.toFixed(1)}%
Ayer: $${data.yesterdayData.totalRevenue} (${data.yesterdayData.totalOrders} órdenes)`;
    }

    // Patrones semanales (más conciso)
    if (data.weekData && data.weekData.length >= 3) {
      const totalWeekSales = data.weekData.reduce((sum, day) => sum + day.totalRevenue, 0);
      const avgDailySales = totalWeekSales / data.weekData.length;
      const bestDay = data.weekData.reduce((best, day) => day.totalRevenue > best.totalRevenue ? day : best);
      const worstDay = data.weekData.reduce((worst, day) => day.totalRevenue < worst.totalRevenue ? day : worst);

      prompt += `\n\nTENDENCIAS SEMANALES (${data.weekData.length} días):
Promedio diario: $${avgDailySales.toFixed(0)}
Mejor día: ${bestDay.dayName} ($${bestDay.totalRevenue})
Día más bajo: ${worstDay.dayName} ($${worstDay.totalRevenue})
Variación: ${(((bestDay.totalRevenue - worstDay.totalRevenue) / worstDay.totalRevenue) * 100).toFixed(0)}%`;
    }

    // Top productos (solo los esenciales)
    if (data.topProducts && data.topProducts.length > 0) {
      prompt += `\n\nPRODUCTOS ESTRELLA:
${data.topProducts.slice(0, 5).map((p, i) => `${i+1}. ${p.product_name} (${p.total_sold} ventas)`).join('\n')}`;
    }

    prompt += `\n\nCONTEXTO TEMPORAL: ${new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}

INSTRUCCIONES FINALES:
- Responde como Claude respondería: natural, inteligente, útil
- Adapta tu respuesta al tono y necesidad específica del mensaje
- Si es una pregunta simple, respuesta simple
- Si necesitan análisis profundo, dale profundidad
- Siempre termina orientando hacia acción práctica
- Usa datos para sustentar, no para mostrar
- Sé el consultor que este restaurante necesita`;

    return prompt;
  }
}

module.exports = { FudiMind };