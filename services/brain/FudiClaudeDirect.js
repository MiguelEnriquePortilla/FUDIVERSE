const { createClient } = require('@supabase/supabase-js');
const { generateText } = require('ai');

class FudiDirect {
  constructor(supabaseUrl, supabaseKey, anthropicKey) {
    console.log('[FUDI] Initializing FudiDirect - Simple, Clean, Powerful...');
    
    // Direct Supabase connection
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.anthropicKey = anthropicKey;
    
    console.log('[FUDI] Ready to help restaurants with natural intelligence!');
  }

  async chat(message, restaurantId, context = {}) {
    console.log(`[FUDI] Processing: "${message}" for restaurant ${restaurantId}`);
    
    try {
      // 1. Get restaurant context - DIRECT from Supabase
      const restaurantData = await this.getRestaurantContext(restaurantId, message);
      
      // 2. Create a natural prompt with ALL context
      const prompt = this.createPrompt(message, restaurantData);
      
      // 3. Let Claude respond naturally
      const response = await this.askClaude(prompt);
      
      return {
        success: true,
        response: response,
        metadata: {
          architecture: 'FudiDirect',
          processingTime: new Date() - (context.startTime || new Date())
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

  async getRestaurantContext(restaurantId, message) {
    console.log('[FUDI] Getting restaurant context from Supabase...');
    
    const context = {};
    
    // 1. Restaurant basic info
    const { data: restaurant, error: restaurantError } = await this.supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
      
    if (restaurant) {
      context.restaurant = {
        name: restaurant.name,
        owner: restaurant.owner_name,
        created: restaurant.created_at,
        currency: restaurant.currency || 'MXN'
      };
    }
    
    // 2. Analyze the message to determine what data we need
    const needsSalesData = /venta|ingreso|dinero|ganancia|revenue/i.test(message);
    const needsProductData = /producto|platillo|comida|menu|vendido|popular/i.test(message);
    const needsTimeData = /ayer|hoy|semana|mes|hora|cuando/i.test(message);
    
    // 3. Get sales data if needed
    if (needsSalesData || needsProductData) {
      // Get recent transactions
      const { data: transactions } = await this.supabase
        .from('transactions')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false })
        .limit(1000);
        
      if (transactions) {
        // Calculate basic metrics
        context.sales = {
          totalRevenue: transactions.reduce((sum, t) => sum + (t.total || 0), 0),
          transactionCount: transactions.length,
          averageTicket: transactions.length > 0 
            ? transactions.reduce((sum, t) => sum + (t.total || 0), 0) / transactions.length 
            : 0,
          recentTransactions: transactions.slice(0, 10).map(t => ({
            date: t.created_at,
            total: t.total,
            items: t.items_count
          }))
        };
        
        // Get today's sales if asking about "hoy"
        if (/hoy/i.test(message)) {
          const today = new Date().toISOString().split('T')[0];
          const todayTransactions = transactions.filter(t => 
            t.created_at.startsWith(today)
          );
          context.todaySales = {
            revenue: todayTransactions.reduce((sum, t) => sum + (t.total || 0), 0),
            count: todayTransactions.length
          };
        }
        
        // Get yesterday's sales if asking about "ayer"
        if (/ayer/i.test(message)) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          const yesterdayTransactions = transactions.filter(t => 
            t.created_at.startsWith(yesterdayStr)
          );
          context.yesterdaySales = {
            revenue: yesterdayTransactions.reduce((sum, t) => sum + (t.total || 0), 0),
            count: yesterdayTransactions.length
          };
        }
      }
    }
    
    // 4. Get product data if needed
    if (needsProductData) {
      const { data: products } = await this.supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('revenue', { ascending: false })
        .limit(10);
        
      if (products) {
        context.topProducts = products.map(p => ({
          name: p.name,
          revenue: p.revenue || 0,
          quantity: p.quantity_sold || 0
        }));
      }
    }
    
    // 5. Get time patterns if needed
    if (needsTimeData) {
      const { data: hourlyData } = await this.supabase
        .from('hourly_sales')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('hour');
        
      if (hourlyData && hourlyData.length > 0) {
        const peakHour = hourlyData.reduce((max, h) => 
          h.revenue > max.revenue ? h : max
        );
        context.timePatterns = {
          peakHour: peakHour.hour,
          peakRevenue: peakHour.revenue
        };
      }
    }
    
    console.log('[FUDI] Context gathered successfully');
    return context;
  }

  createPrompt(message, context) {
    // Build a natural, comprehensive prompt
    let prompt = `Eres Fudi, un asistente experto y amigable para restaurantes mexicanos.
    
CONTEXTO DEL RESTAURANTE:
${context.restaurant ? `
- Nombre: ${context.restaurant.name}
- Dueño: ${context.restaurant.owner}
- Moneda: ${context.restaurant.currency}
` : ''}

${context.sales ? `
MÉTRICAS GENERALES:
- Ventas totales: $${context.sales.totalRevenue.toFixed(2)}
- Total de transacciones: ${context.sales.transactionCount}
- Ticket promedio: $${context.sales.averageTicket.toFixed(2)}
` : ''}

${context.todaySales ? `
VENTAS DE HOY:
- Ingresos: $${context.todaySales.revenue.toFixed(2)}
- Transacciones: ${context.todaySales.count}
` : ''}

${context.yesterdaySales ? `
VENTAS DE AYER:
- Ingresos: $${context.yesterdaySales.revenue.toFixed(2)}
- Transacciones: ${context.yesterdaySales.count}
` : ''}

${context.topProducts ? `
PRODUCTOS MÁS VENDIDOS:
${context.topProducts.map((p, i) => 
  `${i + 1}. ${p.name} - $${p.revenue.toFixed(2)} (${p.quantity} vendidos)`
).join('\n')}
` : ''}

${context.timePatterns ? `
PATRONES DE TIEMPO:
- Hora pico: ${context.timePatterns.peakHour}:00
- Ventas en hora pico: $${context.timePatterns.peakRevenue.toFixed(2)}
` : ''}

PREGUNTA DEL USUARIO: "${message}"

INSTRUCCIONES:
- Responde de manera natural y amigable
- Sé específico con los datos cuando los tengas
- Si no tienes algún dato, sé honesto al respecto
- Mantén un tono profesional pero cercano
- NO te presentes como Claude
- Ve directo al grano con la respuesta`;

    return prompt;
  }

  async askClaude(prompt) {
    try {
      // Set API key
      process.env.ANTHROPIC_API_KEY = this.anthropicKey;
      
      // Import anthropic
      const { anthropic } = require('@ai-sdk/anthropic');
      
      // Generate response
      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        prompt: prompt,
        maxTokens: 500,
      });
      
      return text;
    } catch (error) {
      console.error('[FUDI] Claude error:', error);
      throw error;
    }
  }
}

module.exports = { FudiDirect };