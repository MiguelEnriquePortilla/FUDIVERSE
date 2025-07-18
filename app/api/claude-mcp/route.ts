import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🧠 FUDIMIND LOGIC EN BACKEND');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const { message, restaurantId } = await request.json();
    console.log('📝 User message:', message);
    
    // OBTENER DATOS REALES COMO FUDIMIND
    const restaurantData = await getRestaurantData(restaurantId);
    
    // GENERAR RESPUESTA COMO FUDIMIND
    const response = await generateNaturalResponse(message, restaurantData);
    
    return Response.json({
      success: true,
      response: response
    }, { headers });

  } catch (error) {
    console.error('💥 Error:', error);
    return Response.json({
      success: false,
      error: `Error: ${error instanceof Error ? error.message : 'Unknown'}`
    }, { status: 500, headers });
  }
}

// COPIAR EXACTO DE FUDIMIND
async function getRestaurantData(restaurantId) {
  console.log('📊 Obteniendo datos del restaurante...');
  
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
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
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
    
    data.restaurant = restaurant;

    // Datos de hoy
    const today = new Date().toISOString().split('T')[0];
    data.todayData = await getDayData(supabase, restaurantId, today);
    
    // Datos de ayer
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    data.yesterdayData = await getDayData(supabase, restaurantId, yesterday.toISOString().split('T')[0]);
    
    // Datos de la semana
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayData = await getDayData(supabase, restaurantId, date.toISOString().split('T')[0]);
      if (dayData.totalOrders > 0) {
        data.weekData.push(dayData);
      }
    }

    // Top productos
    data.topProducts = await getTopProducts(supabase, restaurantId);
    
    data.totalDataPoints = data.weekData.length + data.topProducts.length;
    
    console.log(`✅ Datos obtenidos: ${data.totalDataPoints} puntos`);
    
    return data;

  } catch (error) {
    console.error('❌ Error obteniendo datos:', error);
    return data;
  }
}

// COPIAR EXACTO DE FUDIMIND
async function getDayData(supabase, restaurantId, date) {
  console.log(`📊 Obteniendo datos para: ${date}`);
  
  try {
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    
    const { data: transactions, error } = await supabase
      .from('poster_transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('date_close', startDate)
      .lte('date_close', endDate);

    if (error) {
      console.error(`❌ Error en query:`, error);
      return { date, totalOrders: 0, totalRevenue: 0, error: error.message };
    }
    
    console.log(`✅ Encontradas ${transactions?.length || 0} transacciones`);

    if (!transactions || transactions.length === 0) {
      return { date, totalOrders: 0, totalRevenue: 0 };
    }

    const totalRevenue = transactions.reduce((sum, t) => {
      const amount = parseFloat(t.sum || 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    const totalProfit = transactions.reduce((sum, t) => {
      const profit = parseInt(t.total_profit || 0);
      return sum + (isNaN(profit) ? 0 : profit);
    }, 0) / 100;
    
    const totalOrders = transactions.length;
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const dayProducts = await getDayProducts(supabase, restaurantId, date);
    const hourlyData = getHourlyBreakdown(transactions);
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
    console.error(`❌ Error crítico en getDayData para ${date}:`, error);
    return { date, totalOrders: 0, totalRevenue: 0, error: error.message };
  }
}

// Resto de funciones copiadas exacto de FudiMind...
async function getDayProducts(supabase, restaurantId, date) {
  try {
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    
    const { data: transactionProducts, error } = await supabase
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
      .gte('poster_transactions.date_close', startDate)
      .lte('poster_transactions.date_close', endDate);

    if (error || !transactionProducts) return [];

    const productIds = [...new Set(transactionProducts.map(p => p.product_id))];
    const { data: productNames } = await supabase
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
    return [];
  }
}

async function getTopProducts(supabase, restaurantId) {
  try {
    const { data: allTimeProducts } = await supabase
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

    const { data: productNames } = await supabase
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
    return [];
  }
}

function getHourlyBreakdown(transactions) {
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

// PROMPT EXACTO DE FUDIMIND
function buildMinimalPrompt(data) {
  let prompt = `Eres FUDI, la mente analítica más inteligente para restaurantes. Tu personalidad combina la profundidad analítica de Claude con conocimiento profundo del negocio restaurantero.

PERSONALIDAD CORE:
- Conversacional y adaptable al tono del usuario
- Empático pero directo con los datos
- Detectas patrones que otros no ven
- Conectas números con emociones y decisiones reales
- Respondes naturalmente, NO con formatos rígidos

DATOS DEL RESTAURANTE ACTUAL:`;

  if (data.restaurant) {
    prompt += `\n\nRESTAURANTE: ${data.restaurant.name || 'Sin nombre'}`;
  }

  if (data.todayData) {
    if (data.todayData.totalOrders > 0) {
      prompt += `\n\nRENDIMIENTO HOY (${data.todayData.date}):
Ventas: $${data.todayData.totalRevenue} | ${data.todayData.totalOrders} órdenes | Ticket: $${data.todayData.avgTicket}`;
    } else {
      prompt += `\n\nRENDIMIENTO HOY (${data.todayData.date}):
Sin ventas registradas hasta ahora`;
    }
  }

  if (data.yesterdayData && data.yesterdayData.totalOrders > 0) {
    prompt += `\n\nRENDIMIENTO AYER (${data.yesterdayData.date}):
Ventas: $${data.yesterdayData.totalRevenue} | ${data.yesterdayData.totalOrders} órdenes`;
  }

  if (data.weekData && data.weekData.length >= 3) {
    const totalWeekSales = data.weekData.reduce((sum, day) => sum + day.totalRevenue, 0);
    const avgDailySales = totalWeekSales / data.weekData.length;
    
    prompt += `\n\nTENDENCIAS SEMANALES (${data.weekData.length} días):
Promedio diario: $${avgDailySales.toFixed(0)}
Total semana: $${totalWeekSales.toFixed(0)}`;
  }

  if (data.topProducts && data.topProducts.length > 0) {
    prompt += `\n\nPRODUCTOS ESTRELLA:
${data.topProducts.slice(0, 5).map((p, i) => `${i+1}. ${p.product_name} (${p.total_sold} ventas)`).join('\n')}`;
  }

  return prompt;
}

async function generateNaturalResponse(message, restaurantData) {
  console.log('🧠 Generando respuesta natural...');

  const prompt = buildMinimalPrompt(restaurantData);

  const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": process.env.ANTHROPIC_API_KEY || ""
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: prompt,
      messages: [{ role: "user", content: message }]
    })
  });

  const claudeData = await claudeResponse.json();
  return claudeData.content[0].text;
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}