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

  async generateNaturalResponse(message, restaurantData) {
    console.log('[FUDI] 🧠 Generando respuesta natural...');
    
    process.env.ANTHROPIC_API_KEY = this.anthropicKey;

    // PROMPT MINIMALISTA
    const prompt = this.buildMinimalPrompt(restaurantData);

    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: prompt,
      prompt: message,
      temperature: 0.7,
      maxTokens: 1500,
    });

    return text;
  }

  buildMinimalPrompt(data) {
    // PROMPT EDUCATIVO - PRINCIPIOS, NO SCRIPTS
    let prompt = `Eres FUDI, la mente analítica más avanzada para restaurantes.

  FILOSOFÍA CENTRAL:
  - Eres Claude con superpoderes de datos restauranteros
  - Combinas empatía humana con análisis preciso
  - Cada número cuenta una historia sobre el negocio
  - Tu misión: democratizar insights de consultor de clase mundial

  MENTALIDAD DE CONSULTOR EMPÁTICO:
  - Reconoce primero las emociones/preocupaciones del usuario
  - Los datos son herramientas para resolver problemas humanos reales
  - Personaliza cada insight al contexto específico del restaurante
  - Conecta números con decisiones accionables
  - Anticipa necesidades no expresadas

  PRINCIPIOS DE COMUNICACIÓN:
  - Inicia validando la situación emocional cuando sea relevante
  - Usa el poder de contraste: "sentimientos vs datos", "percepción vs realidad"
  - Estructura visual para información compleja (headers, emojis estratégicos, negritas)
  - Jerarquiza: lo crítico primero, detalles después
  - Termina orientando hacia acción específica

  ENFOQUE ANALÍTICO:
  - Busca patrones ocultos en los datos
  - Identifica oportunidades no obvias
  - Conecta métricas aparentemente separadas
  - Cuestiona asunciones con evidencia
  - Proporciona contexto de industria cuando sea útil

  ESTRUCTURA FLEXIBLE (adapta según contexto):
  1. Conexión humana con emoji inicial (🤝 💭 😊)
  2. Análisis directo con emoji de datos (📊 📈 💰)
  3. Insights clave con emoji de idea (💡 🎯 ⚡)
  4. Recomendaciones con emoji de acción (🚀 ✅ 🔧)
  5. Seguimiento con emoji de pregunta (❓ 🤔 💭)

  ESTILO VISUAL Y LENGUAJE:
  - USA SOLO EMOJIS como separadores visuales, NO títulos explícitos
  - Transiciones naturales como "La realidad nos dice que...", "Aquí lo que veo...", "Mi recomendación para tu historia de éxito es..."
  - Usa el nombre del dueño cuando esté disponible en los datos del restaurante
  - **Negritas** para números/métricas clave
  - Bullets para listas de acciones
  - Preguntas naturales: "Pero, déjame preguntarte...", "¿Has considerado...?"
  - Evita jerga técnica - habla como consultor humano, no como manual
  - Espaciado para facilitar escaneo

  DATOS DEL RESTAURANTE:`;

    if (data.restaurant) {
      prompt += `
  🏪 Restaurante: ${data.restaurant.name || 'Sin nombre'}`;
    }

    if (data.todayData && data.todayData.totalOrders > 0) {
      prompt += `

  📊 VENTAS DE HOY (${data.todayData.date}):
  - Ventas: $${data.todayData.totalRevenue}
  - Órdenes: ${data.todayData.totalOrders}
  - Ticket promedio: $${data.todayData.avgTicket}
  - Margen: ${data.todayData.marginPercent}%
  - Ganancia: $${data.todayData.totalProfit}`;

      if (data.todayData.topProducts && data.todayData.topProducts.length > 0) {
        prompt += `
  - Productos destacados hoy: ${data.todayData.topProducts.map(p => `${p.product_name} (${p.cantidad})`).join(', ')}`;
      }

      if (data.todayData.bestHour) {
        prompt += `
  - Pico de ventas: ${data.todayData.bestHour.hour}:00 con $${data.todayData.bestHour.revenue}`;
      }
    }

    if (data.yesterdayData && data.yesterdayData.totalOrders > 0) {
      prompt += `

  📈 COMPARATIVA AYER:
  - Ventas: $${data.yesterdayData.totalRevenue}
  - Órdenes: ${data.yesterdayData.totalOrders}
  - Ticket promedio: $${data.yesterdayData.avgTicket}`;

      if (data.todayData && data.todayData.totalOrders > 0) {
        const salesChange = ((data.todayData.totalRevenue - data.yesterdayData.totalRevenue) / data.yesterdayData.totalRevenue * 100);
        const ordersChange = ((data.todayData.totalOrders - data.yesterdayData.totalOrders) / data.yesterdayData.totalOrders * 100);
        prompt += `

  ⚡ TENDENCIA HOY vs AYER:
  - Ventas: ${salesChange >= 0 ? '+' : ''}${salesChange.toFixed(1)}%
  - Órdenes: ${ordersChange >= 0 ? '+' : ''}${ordersChange.toFixed(1)}%`;
      }
    }

    if (data.weekData && data.weekData.length > 0) {
      prompt += `

  📅 PATRÓN SEMANAL (últimos ${data.weekData.length} días con ventas):`;
      
      // Calcular promedios para contexto
      const avgDailySales = data.weekData.reduce((sum, day) => sum + day.totalRevenue, 0) / data.weekData.length;
      const avgDailyOrders = data.weekData.reduce((sum, day) => sum + day.totalOrders, 0) / data.weekData.length;
      
      data.weekData.slice(0, 7).forEach(day => {
        if (day.totalOrders > 0) {
          const salesVsAvg = ((day.totalRevenue - avgDailySales) / avgDailySales * 100);
          const indicator = salesVsAvg > 10 ? '🔥' : salesVsAvg < -10 ? '❄️' : '📊';
          prompt += `
  ${indicator} ${day.dayName}: $${day.totalRevenue} (${day.totalOrders} órdenes, ticket $${day.avgTicket})`;
        }
      });

      prompt += `
  📊 Promedios semanales: $${avgDailySales.toFixed(0)}/día, ${avgDailyOrders.toFixed(0)} órdenes/día`;
    }

    if (data.topProducts && data.topProducts.length > 0) {
      prompt += `

  🏆 TOP PRODUCTOS (rendimiento histórico):`;
      data.topProducts.slice(0, 8).forEach((product, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐';
        prompt += `
  ${medal} ${product.product_name}: ${product.total_sold} ventas`;
      });
    }

    prompt += `

  CONTEXT: Fecha actual ${new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}

  Analiza con profundidad, responde con claridad visual, actúa como el consultor que este restaurante merece.`;

    return prompt;
  }
}

module.exports = { FudiMind };