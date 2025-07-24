import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🧠 FUDIMIND LOGIC EN BACKEND - VERSIÓN LIBERADA');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const { message, restaurantId } = await request.json();
    console.log('📝 User message:', message);
    
    // OBTENER DATOS REALES LIBERADOS
    const restaurantData = await getRestaurantDataLiberated(restaurantId);
    
    // GENERAR RESPUESTA COMO FUDIMIND LIBERADO
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

// 🚀 FUNCIÓN COMPLETAMENTE LIBERADA - SIN LÍMITES
async function getRestaurantDataLiberated(restaurantId: string) {
  console.log('📊 Obteniendo datos COMPLETOS del restaurante...');
  
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const data: {
    restaurant: any;
    todayData: any;
    yesterdayData: any;
    weekData: any[];
    monthData: any[];
    topProducts: any[];
    topCategories: any[];
    paymentMethods: any;
    hourlyPatterns: any[];
    weeklyPatterns: any[];
    totalDataPoints: number;
    dateRange: any;
  } = {
    restaurant: null,
    todayData: null,
    yesterdayData: null,
    weekData: [],
    monthData: [],
    topProducts: [],
    topCategories: [],
    paymentMethods: null,
    hourlyPatterns: [],
    weeklyPatterns: [],
    totalDataPoints: 0,
    dateRange: null
  };

  try {
    // Info del restaurante
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
    
    data.restaurant = restaurant;

    // 🚀 RANGO COMPLETO DE FECHAS (SIN LÍMITES)
    data.dateRange = await getDateRange(supabase, restaurantId);

    // Datos de hoy
    const today = new Date().toISOString().split('T')[0];
    data.todayData = await getDayDataLiberated(supabase, restaurantId, today);
    
    // Datos de ayer
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    data.yesterdayData = await getDayDataLiberated(supabase, restaurantId, yesterday.toISOString().split('T')[0]);
    
    // 🚀 DATOS DE LA SEMANA COMPLETOS (SIN FILTROS)
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayData = await getDayDataLiberated(supabase, restaurantId, date.toISOString().split('T')[0]);
      data.weekData.push(dayData); // ← INCLUYE DÍAS SIN VENTAS
    }

    // 🚀 DATOS DEL MES COMPLETO
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayData = await getDayDataLiberated(supabase, restaurantId, date.toISOString().split('T')[0]);
      if (dayData.totalOrders > 0) {
        data.monthData.push(dayData);
      }
    }

    // 🚀 TOP PRODUCTOS SIN LÍMITES
    data.topProducts = await getTopProductsLiberated(supabase, restaurantId);
    
    // 🚀 ANÁLISIS POR CATEGORÍAS
    data.topCategories = await getTopCategories(supabase, restaurantId);
    
    // 🚀 MÉTODOS DE PAGO
    data.paymentMethods = await getPaymentMethods(supabase, restaurantId);
    
    // 🚀 PATRONES POR HORA
    data.hourlyPatterns = await getHourlyPatterns(supabase, restaurantId);
    
    // 🚀 PATRONES POR DÍA DE LA SEMANA
    data.weeklyPatterns = await getWeeklyPatterns(supabase, restaurantId);
    
    data.totalDataPoints = 
      data.weekData.length + 
      data.monthData.length + 
      data.topProducts.length + 
      data.topCategories.length +
      data.hourlyPatterns.length +
      data.weeklyPatterns.length;
    
    console.log(`✅ Datos COMPLETOS obtenidos: ${data.totalDataPoints} puntos de análisis`);
    
    return data;

  } catch (error) {
    console.error('❌ Error obteniendo datos:', error);
    return data;
  }
}

// 🚀 FUNCIÓN DE DÍA LIBERADA
async function getDayDataLiberated(supabase: any, restaurantId: string, date: string) {
  console.log(`📊 Obteniendo datos completos para: ${date}`);
  
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
      return { 
        date, 
        dayName: new Date(date).toLocaleDateString('es-ES', { weekday: 'long' }),
        totalOrders: 0, 
        totalRevenue: 0,
        totalProfit: 0,
        avgTicket: 0,
        marginPercent: 0,
        paymentBreakdown: { cash: 0, card: 0, tips: 0 }
      };
    }

    const totalRevenue = transactions.reduce((sum, t) => {
      const amount = parseFloat(t.sum || 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    const totalProfit = transactions.reduce((sum, t) => {
      const profit = parseInt(t.total_profit || 0);
      return sum + (isNaN(profit) ? 0 : profit);
    }, 0) / 100;
    
    // 🚀 ANÁLISIS DE MÉTODOS DE PAGO POR DÍA
    const cashTotal = transactions.reduce((sum, t) => sum + parseFloat(t.payed_cash || 0), 0);
    const cardTotal = transactions.reduce((sum, t) => sum + parseFloat(t.payed_card || 0), 0);
    const tipsTotal = transactions.reduce((sum, t) => 
      sum + parseFloat(t.tips_cash || 0) + parseFloat(t.tips_card || 0), 0);
    
    const totalOrders = transactions.length;
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const dayProducts = await getDayProductsLiberated(supabase, restaurantId, date);
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
      hourlyBreakdown: hourlyData,
      paymentBreakdown: {
        cash: Math.round(cashTotal * 100) / 100,
        card: Math.round(cardTotal * 100) / 100,
        tips: Math.round(tipsTotal * 100) / 100
      }
    };

  } catch (error) {
    console.error(`❌ Error crítico en getDayDataLiberated para ${date}:`, error);
    return { date, totalOrders: 0, totalRevenue: 0, error: error.message };
  }
}

// 🚀 PRODUCTOS DEL DÍA CON JOIN ARREGLADO
async function getDayProductsLiberated(supabase: any, restaurantId: string, date: string) {
  try {
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    
    // Query con JOIN arreglado
    const { data: transactionProducts, error } = await supabase.rpc('get_day_products', {
      p_restaurant_id: restaurantId,
      p_start_date: startDate,
      p_end_date: endDate
    });

    if (error) {
      // Fallback al método manual
      const { data: productData } = await supabase
        .from('poster_transaction_products')
        .select('product_id, product_sum')
        .eq('restaurant_id', restaurantId);

      if (!productData) return [];

      const productMap: any = {};
      productData.forEach((item: any) => {
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

      // Obtener nombres de productos
      const productIds = Object.keys(productMap);
      const { data: productNames } = await supabase
        .from('poster_products')
        .select('product_id, product_name, category_name')
        .in('product_id', productIds)
        .eq('restaurant_id', restaurantId);

      const productsWithNames = Object.values(productMap).map((product: any) => {
        const nameInfo = productNames?.find((p: any) => p.product_id === product.product_id);
        return {
          ...product,
          product_name: nameInfo?.product_name || `Producto ${product.product_id}`,
          category_name: nameInfo?.category_name || 'Sin categoría'
        };
      });

      return productsWithNames.sort((a: any, b: any) => b.cantidad - a.cantidad);
    }

    return transactionProducts || [];

  } catch (error) {
    console.error('Error en getDayProductsLiberated:', error);
    return [];
  }
}

// 🚀 TOP PRODUCTOS SIN LÍMITES
async function getTopProductsLiberated(supabase: any, restaurantId: string) {
  try {
    // Sin límite de 500 - obtener TODO
    const { data: allTimeProducts } = await supabase
      .from('poster_transaction_products')
      .select('product_id')
      .eq('restaurant_id', restaurantId);

    if (!allTimeProducts) return [];

    const productCounts: any = {};
    allTimeProducts.forEach((item: any) => {
      const productId = String(item.product_id);
      productCounts[productId] = (productCounts[productId] || 0) + 1;
    });

    const topProductIds = Object.keys(productCounts)
      .sort((a, b) => productCounts[b] - productCounts[a])
      .slice(0, 20); // Top 20 en lugar de 10

    const { data: productNames } = await supabase
      .from('poster_products')
      .select('product_id, product_name, category_name')
      .in('product_id', topProductIds)
      .eq('restaurant_id', restaurantId);

    return topProductIds.map(productId => {
      const nameInfo = productNames?.find((p: any) => p.product_id === productId);
      return {
        product_id: productId,
        product_name: nameInfo?.product_name || `Producto ${productId}`,
        category_name: nameInfo?.category_name || 'Sin categoría',
        total_sold: productCounts[productId]
      };
    });

  } catch (error) {
    console.error('Error en getTopProductsLiberated:', error);
    return [];
  }
}

// 🚀 NUEVAS FUNCIONES DE ANÁLISIS

async function getTopCategories(supabase: any, restaurantId: string) {
  try {
    const { data: categoryData } = await supabase
      .from('poster_transaction_products')
      .select(`
        product_id,
        product_sum
      `)
      .eq('restaurant_id', restaurantId);

    if (!categoryData) return [];

    // Obtener información de categorías
    const productIds = [...new Set(categoryData.map(p => String(p.product_id)))];
    const { data: productCategories } = await supabase
      .from('poster_products')
      .select('product_id, category_name')
      .in('product_id', productIds)
      .eq('restaurant_id', restaurantId);

    const categoryMap: any = {};
    categoryData.forEach((item: any) => {
      const productInfo = productCategories?.find((p: any) => p.product_id === String(item.product_id));
      const categoryName = productInfo?.category_name || 'Sin categoría';
      
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          category_name: categoryName,
          total_sold: 0,
          total_revenue: 0
        };
      }
      
      categoryMap[categoryName].total_sold += 1;
      categoryMap[categoryName].total_revenue += parseFloat(item.product_sum || 0);
    });

    return Object.values(categoryMap).sort((a: any, b: any) => b.total_revenue - a.total_revenue);

  } catch (error) {
    console.error('Error en getTopCategories:', error);
    return [];
  }
}

async function getPaymentMethods(supabase: any, restaurantId: string) {
  try {
    const { data: paymentData } = await supabase
      .from('poster_transactions')
      .select('payed_cash, payed_card, tips_cash, tips_card, sum')
      .eq('restaurant_id', restaurantId)
      .not('sum', 'is', null);

    if (!paymentData) return null;

    const totals = paymentData.reduce((acc: any, t: any) => ({
      cash: acc.cash + parseFloat(t.payed_cash || 0),
      card: acc.card + parseFloat(t.payed_card || 0),
      tips_cash: acc.tips_cash + parseFloat(t.tips_cash || 0),
      tips_card: acc.tips_card + parseFloat(t.tips_card || 0),
      total: acc.total + parseFloat(t.sum || 0)
    }), { cash: 0, card: 0, tips_cash: 0, tips_card: 0, total: 0 });

    return {
      cash_percentage: totals.total > 0 ? (totals.cash / totals.total * 100).toFixed(1) : '0',
      card_percentage: totals.total > 0 ? (totals.card / totals.total * 100).toFixed(1) : '0',
      total_tips: totals.tips_cash + totals.tips_card,
      cash_total: totals.cash,
      card_total: totals.card
    };

  } catch (error) {
    console.error('Error en getPaymentMethods:', error);
    return null;
  }
}

async function getHourlyPatterns(supabase: any, restaurantId: string) {
  try {
    const { data: hourlyData } = await supabase.rpc('get_hourly_patterns', {
      p_restaurant_id: restaurantId,
      p_days_back: 30
    });

    return hourlyData || [];
  } catch (error) {
    console.error('Error en getHourlyPatterns:', error);
    return [];
  }
}

async function getWeeklyPatterns(supabase: any, restaurantId: string) {
  try {
    const { data: weeklyData } = await supabase.rpc('get_weekly_patterns', {
      p_restaurant_id: restaurantId,
      p_days_back: 30
    });

    return weeklyData || [];
  } catch (error) {
    console.error('Error en getWeeklyPatterns:', error);
    return [];
  }
}

async function getDateRange(supabase: any, restaurantId: string) {
  try {
    const { data: dateRange } = await supabase
      .from('poster_transactions')
      .select('date_close')
      .eq('restaurant_id', restaurantId)
      .order('date_close', { ascending: true })
      .limit(1);

    const { data: latestDate } = await supabase
      .from('poster_transactions')
      .select('date_close')
      .eq('restaurant_id', restaurantId)
      .order('date_close', { ascending: false })
      .limit(1);

    return {
      first_sale: dateRange?.[0]?.date_close || null,
      latest_sale: latestDate?.[0]?.date_close || null
    };

  } catch (error) {
    console.error('Error en getDateRange:', error);
    return null;
  }
}

function getHourlyBreakdown(transactions: any[]) {
  const hourlyMap: any = {};
  
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
    .sort((a: any, b: any) => a.hour - b.hour)
    .map((h: any) => ({
      ...h,
      revenue: Math.round(h.revenue * 100) / 100
    }));
}

// 🚀 PROMPT LIBERADO CON TODOS LOS DATOS
function buildLiberatedPrompt(data: any) {
  let prompt = `Eres FUDI, el asistente de análisis más avanzado para restaurantes. Tienes acceso a TODOS los datos históricos del restaurante, no solo una semana.

PERSONALIDAD CORE:
- Analítico pero conversacional
- Detectas patrones que otros no ven
- Conectas datos con decisiones de negocio reales
- Respondes naturalmente, adaptándote al tono del usuario
- Tienes memoria completa del negocio

DATOS COMPLETOS DISPONIBLES:`;

  if (data.restaurant) {
    prompt += `\n\nRESTAURANTE: ${data.restaurant.name || 'Sin nombre'}`;
  }

  if (data.dateRange) {
    prompt += `\n\nHISTORIAL COMPLETO:
Primera venta: ${data.dateRange.first_sale}
Última venta: ${data.dateRange.latest_sale}`;
  }

  if (data.todayData) {
    if (data.todayData.totalOrders > 0) {
      prompt += `\n\nRENDIMIENTO HOY (${data.todayData.date}):
Ventas: $${data.todayData.totalRevenue} | ${data.todayData.totalOrders} órdenes | Ticket: $${data.todayData.avgTicket}
Ganancia: $${data.todayData.totalProfit} (${data.todayData.marginPercent}%)
Métodos de pago: Efectivo $${data.todayData.paymentBreakdown.cash}, Tarjeta $${data.todayData.paymentBreakdown.card}
Propinas: $${data.todayData.paymentBreakdown.tips}`;
    } else {
      prompt += `\n\nRENDIMIENTO HOY (${data.todayData.date}):
Sin ventas registradas aún`;
    }
  }

  if (data.yesterdayData && data.yesterdayData.totalOrders > 0) {
    prompt += `\n\nRENDIMIENTO AYER (${data.yesterdayData.date}):
Ventas: $${data.yesterdayData.totalRevenue} | ${data.yesterdayData.totalOrders} órdenes | Ganancia: $${data.yesterdayData.totalProfit}`;
  }

  if (data.monthData && data.monthData.length >= 5) {
    const totalMonthSales = data.monthData.reduce((sum, day) => sum + day.totalRevenue, 0);
    const avgDailySales = totalMonthSales / data.monthData.length;
    const bestDay = data.monthData.reduce((best, current) => current.totalRevenue > best.totalRevenue ? current : best);
    
    prompt += `\n\nTENDENCIAS DEL MES (${data.monthData.length} días con ventas):
Promedio diario: $${avgDailySales.toFixed(0)}
Total mensual: $${totalMonthSales.toFixed(0)}
Mejor día: ${bestDay.dayName} con $${bestDay.totalRevenue}`;
  }

  if (data.topProducts && data.topProducts.length > 0) {
    prompt += `\n\nPRODUCTOS ESTRELLA (histórico completo):
${data.topProducts.slice(0, 5).map((p, i) => `${i+1}. ${p.product_name} - ${p.category_name} (${p.total_sold} ventas)`).join('\n')}`;
  }

  if (data.topCategories && data.topCategories.length > 0) {
    prompt += `\n\nCATEGORÍAS MÁS RENTABLES:
${data.topCategories.slice(0, 3).map((c, i) => `${i+1}. ${c.category_name}: $${c.total_revenue.toFixed(0)} (${c.total_sold} productos)`).join('\n')}`;
  }

  if (data.paymentMethods) {
    prompt += `\n\nMÉTODOS DE PAGO:
Efectivo: ${data.paymentMethods.cash_percentage}% ($${data.paymentMethods.cash_total.toFixed(0)})
Tarjeta: ${data.paymentMethods.card_percentage}% ($${data.paymentMethods.card_total.toFixed(0)})
Propinas totales: $${data.paymentMethods.total_tips.toFixed(0)}`;
  }

  prompt += `\n\nPUEDES ANALIZAR:
- Todo el historial de ventas (sin límites de tiempo)
- Patrones por hora, día, semana, mes
- Análisis de productos y categorías completo
- Métodos de pago y propinas
- Comparaciones de períodos
- Predicciones basadas en tendencias históricas
- Análisis de rentabilidad por producto/categoría

RESPONDE de manera natural y conversacional, adaptándote al tono del usuario.`;

  return prompt;
}

async function generateNaturalResponse(message: string, restaurantData: any) {
  console.log('🧠 Generando respuesta con datos COMPLETOS...');

  const prompt = buildLiberatedPrompt(restaurantData);

  const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": process.env.ANTHROPIC_API_KEY || ""
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000, // ← Incrementado para respuestas más completas
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