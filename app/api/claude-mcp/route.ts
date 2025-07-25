import { NextRequest } from 'next/server';

// 🎯 TIPOS ULTRA DEFINIDOS
interface RestaurantData {
  restaurant: any;
  todayData: DayData;
  yesterdayData: DayData;
  weekData: DayData[];
  monthData: DayData[];
  topProducts: ProductData[];
  topCategories: CategoryData[];
  paymentMethods: PaymentMethodsData | null;
  hourlyPatterns: HourlyPattern[];
  weeklyPatterns: WeeklyPattern[];
  totalDataPoints: number;
  dateRange: DateRange | null;
}

interface DayData {
  date: string;
  dayName?: string;
  totalOrders: number;
  totalRevenue: number;
  totalProfit?: number;
  avgTicket?: number;
  marginPercent?: number;
  topProducts?: ProductData[];
  bestHour?: HourlyBreakdown | null;
  hourlyBreakdown?: HourlyBreakdown[];
  paymentBreakdown?: PaymentBreakdown;
  error?: string;
}

interface ProductData {
  product_id: string;
  product_name: string;
  category_name: string;
  total_sold: number;
  cantidad?: number;
  revenue_total?: number;
}

interface CategoryData {
  category_name: string;
  total_sold: number;
  total_revenue: number;
}

interface PaymentMethodsData {
  cash_percentage: string;
  card_percentage: string;
  total_tips: number;
  cash_total: number;
  card_total: number;
}

interface PaymentBreakdown {
  cash: number;
  card: number;
  tips: number;
}

interface HourlyPattern {
  hour: number;
  avg_orders: number;
  avg_revenue: number;
}

interface WeeklyPattern {
  day_of_week: number;
  day_name: string;
  avg_orders: number;
  avg_revenue: number;
}

interface HourlyBreakdown {
  hour: number;
  orders: number;
  revenue: number;
}

interface DateRange {
  first_sale: string | null;
  latest_sale: string | null;
}

// 🚀 HEADERS OPTIMIZADOS
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
} as const;

export async function POST(request: NextRequest) {
  console.log('🧠 FUDIMIND LOGIC EN BACKEND - VERSIÓN LIBERADA ULTRA AVANZADA');
  
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
    }, { headers: CORS_HEADERS });

  } catch (error) {
    console.error('💥 Error:', error);
    return Response.json({
      success: false,
      error: `Error: ${error instanceof Error ? error.message : 'Unknown'}`
    }, { status: 500, headers: CORS_HEADERS });
  }
}

// 🚀 FUNCIÓN COMPLETAMENTE LIBERADA - SIN LÍMITES - ULTRA OPTIMIZADA
async function getRestaurantDataLiberated(restaurantId: string): Promise<RestaurantData> {
  console.log('📊 Obteniendo datos COMPLETOS del restaurante...');
  
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  // 🎯 ESTRUCTURA DE DATOS ULTRA LIMPIA
  const data: RestaurantData = {
    restaurant: null,
    todayData: { date: '', totalOrders: 0, totalRevenue: 0 },
    yesterdayData: { date: '', totalOrders: 0, totalRevenue: 0 },
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

    // 📅 DATOS TEMPORALES OPTIMIZADOS
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    data.todayData = await getDayDataLiberated(supabase, restaurantId, today);
    data.yesterdayData = await getDayDataLiberated(supabase, restaurantId, yesterday.toISOString().split('T')[0]);
    
    // 🚀 DATOS DE LA SEMANA COMPLETOS (PARALELO)
    const weekPromises = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return getDayDataLiberated(supabase, restaurantId, date.toISOString().split('T')[0]);
    });
    data.weekData = await Promise.all(weekPromises);

    // 🚀 DATOS DEL MES COMPLETO (PARALELO)
    const monthPromises = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return getDayDataLiberated(supabase, restaurantId, date.toISOString().split('T')[0]);
    });
    const monthResults = await Promise.all(monthPromises);
    data.monthData = monthResults.filter(day => day.totalOrders > 0);

    // 🚀 ANÁLISIS AVANZADO PARALELO
    const [topProducts, topCategories, paymentMethods, hourlyPatterns, weeklyPatterns] = await Promise.all([
      getTopProductsLiberated(supabase, restaurantId),
      getTopCategories(supabase, restaurantId),
      getPaymentMethods(supabase, restaurantId),
      getHourlyPatterns(supabase, restaurantId),
      getWeeklyPatterns(supabase, restaurantId)
    ]);

    data.topProducts = topProducts;
    data.topCategories = topCategories;
    data.paymentMethods = paymentMethods;
    data.hourlyPatterns = hourlyPatterns;
    data.weeklyPatterns = weeklyPatterns;
    
    data.totalDataPoints = 
      data.weekData.length + 
      data.monthData.length + 
      data.topProducts.length + 
      data.topCategories.length +
      data.hourlyPatterns.length +
      data.weeklyPatterns.length;
    
    console.log(`✅ Datos COMPLETOS obtenidos: ${data.totalDataPoints} puntos de análisis ULTRA AVANZADOS`);
    
    return data;

  } catch (error) {
    console.error('❌ Error obteniendo datos:', error);
    return data;
  }
}

// 🚀 FUNCIÓN DE DÍA LIBERADA Y ULTRA OPTIMIZADA
async function getDayDataLiberated(supabase: any, restaurantId: string, date: string): Promise<DayData> {
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
      return { 
        date, 
        totalOrders: 0, 
        totalRevenue: 0, 
        error: error.message 
      };
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

    // 💰 CÁLCULOS FINANCIEROS ULTRA PRECISOS
    const totalRevenue = transactions.reduce((sum: number, t: any) => {
      const amount = parseFloat(t.sum || 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    const totalProfit = transactions.reduce((sum: number, t: any) => {
      const profit = parseInt(t.total_profit || 0);
      return sum + (isNaN(profit) ? 0 : profit);
    }, 0) / 100;
    
    // 🚀 ANÁLISIS DE MÉTODOS DE PAGO POR DÍA ULTRA DETALLADO
    const cashTotal = transactions.reduce((sum: number, t: any) => 
      sum + parseFloat(t.payed_cash || 0), 0);
    const cardTotal = transactions.reduce((sum: number, t: any) => 
      sum + parseFloat(t.payed_card || 0), 0);
    const tipsTotal = transactions.reduce((sum: number, t: any) => 
      sum + parseFloat(t.tips_cash || 0) + parseFloat(t.tips_card || 0), 0);
    
    const totalOrders = transactions.length;
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 🔥 ANÁLISIS AVANZADO PARALELO
    const [dayProducts, hourlyData] = await Promise.all([
      getDayProductsLiberated(supabase, restaurantId, date),
      Promise.resolve(getHourlyBreakdown(transactions))
    ]);

    const bestHour = hourlyData.length > 0 ? 
      hourlyData.reduce((best: HourlyBreakdown, current: HourlyBreakdown) => 
        current.revenue > best.revenue ? current : best) : null;

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
    return { 
      date, 
      totalOrders: 0, 
      totalRevenue: 0, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// 🚀 PRODUCTOS DEL DÍA CON JOIN ARREGLADO Y ULTRA OPTIMIZADO
async function getDayProductsLiberated(supabase: any, restaurantId: string, date: string): Promise<ProductData[]> {
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
      // 🔄 FALLBACK ULTRA ROBUSTO
      const { data: productData } = await supabase
        .from('poster_transaction_products')
        .select('product_id, product_sum')
        .eq('restaurant_id', restaurantId);

      if (!productData) return [];

      const productMap: Record<string, any> = {};
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
          product_id: product.product_id,
          product_name: nameInfo?.product_name || `Producto ${product.product_id}`,
          category_name: nameInfo?.category_name || 'Sin categoría',
          total_sold: product.cantidad,
          cantidad: product.cantidad,
          revenue_total: product.revenue_total
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

// 🚀 TOP PRODUCTOS SIN LÍMITES - ULTRA AVANZADO
async function getTopProductsLiberated(supabase: any, restaurantId: string): Promise<ProductData[]> {
  try {
    // Sin límite de 500 - obtener TODO EL HISTORIAL
    const { data: allTimeProducts } = await supabase
      .from('poster_transaction_products')
      .select('product_id')
      .eq('restaurant_id', restaurantId);

    if (!allTimeProducts) return [];

    const productCounts: Record<string, number> = {};
    allTimeProducts.forEach((item: any) => {
      const productId = String(item.product_id);
      productCounts[productId] = (productCounts[productId] || 0) + 1;
    });

    const topProductIds = Object.keys(productCounts)
      .sort((a, b) => productCounts[b] - productCounts[a])
      .slice(0, 20); // Top 20 ULTRA ESTRELLA

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

// 🚀 ANÁLISIS DE CATEGORÍAS ULTRA AVANZADO
async function getTopCategories(supabase: any, restaurantId: string): Promise<CategoryData[]> {
  try {
    const { data: categoryData } = await supabase
      .from('poster_transaction_products')
      .select('product_id, product_sum')
      .eq('restaurant_id', restaurantId);

    if (!categoryData) return [];

    // Obtener información de categorías
    const productIds = [...new Set(categoryData.map((p: any) => String(p.product_id)))];
    const { data: productCategories } = await supabase
      .from('poster_products')
      .select('product_id, category_name')
      .in('product_id', productIds)
      .eq('restaurant_id', restaurantId);

    const categoryMap: Record<string, CategoryData> = {};
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

    return Object.values(categoryMap).sort((a, b) => b.total_revenue - a.total_revenue);

  } catch (error) {
    console.error('Error en getTopCategories:', error);
    return [];
  }
}

// 💳 ANÁLISIS DE MÉTODOS DE PAGO ULTRA DETALLADO
async function getPaymentMethods(supabase: any, restaurantId: string): Promise<PaymentMethodsData | null> {
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

// ⏰ PATRONES HORARIOS ULTRA AVANZADOS
async function getHourlyPatterns(supabase: any, restaurantId: string): Promise<HourlyPattern[]> {
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

// 📅 PATRONES SEMANALES ULTRA AVANZADOS
async function getWeeklyPatterns(supabase: any, restaurantId: string): Promise<WeeklyPattern[]> {
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

// 📅 RANGO DE FECHAS COMPLETO
async function getDateRange(supabase: any, restaurantId: string): Promise<DateRange | null> {
  try {
    const [{ data: dateRange }, { data: latestDate }] = await Promise.all([
      supabase
        .from('poster_transactions')
        .select('date_close')
        .eq('restaurant_id', restaurantId)
        .order('date_close', { ascending: true })
        .limit(1),
      supabase
        .from('poster_transactions')
        .select('date_close')
        .eq('restaurant_id', restaurantId)
        .order('date_close', { ascending: false })
        .limit(1)
    ]);

    return {
      first_sale: dateRange?.[0]?.date_close || null,
      latest_sale: latestDate?.[0]?.date_close || null
    };

  } catch (error) {
    console.error('Error en getDateRange:', error);
    return null;
  }
}

// ⏰ ANÁLISIS HORARIO ULTRA OPTIMIZADO
function getHourlyBreakdown(transactions: any[]): HourlyBreakdown[] {
  const hourlyMap: Record<number, HourlyBreakdown> = {};
  
  transactions.forEach((transaction: any) => {
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

// 🚀 PROMPT LIBERADO ULTRA AVANZADO CON TODOS LOS DATOS
function buildLiberatedPrompt(data: RestaurantData): string {
  let prompt = `Eres FUDI, el asistente de análisis más avanzado para restaurantes de la historia. Tienes acceso a TODOS los datos históricos del restaurante, análisis predictivo y patrones ultra avanzados.

🧠 PERSONALIDAD CORE ULTRA AVANZADA:
- Analítico pero conversacional y amigable
- Detectas patrones que otros no ven
- Conectas datos con decisiones de negocio reales
- Respondes naturalmente, adaptándote al tono del usuario
- Tienes memoria completa del negocio
- Generas insights accionables y estratégicos
- Predices tendencias basado en historial completo

📊 DATOS COMPLETOS ULTRA AVANZADOS:`;

  if (data.restaurant) {
    prompt += `\n\n🏪 RESTAURANTE: ${data.restaurant.name || 'Sin nombre'}`;
  }

  if (data.dateRange) {
    prompt += `\n\n📈 HISTORIAL COMPLETO ULTRA DETALLADO:
Primera venta: ${data.dateRange.first_sale}
Última venta: ${data.dateRange.latest_sale}`;
  }

  if (data.todayData) {
    if (data.todayData.totalOrders > 0) {
      prompt += `\n\n💰 RENDIMIENTO HOY (${data.todayData.date}) - ULTRA DETALLADO:
💵 Ventas: $${data.todayData.totalRevenue} | 📦 ${data.todayData.totalOrders} órdenes | 🎯 Ticket: $${data.todayData.avgTicket}
📈 Ganancia: $${data.todayData.totalProfit} (${data.todayData.marginPercent}%)
💳 Métodos: Efectivo $${data.todayData.paymentBreakdown?.cash}, Tarjeta $${data.todayData.paymentBreakdown?.card}
🎁 Propinas: $${data.todayData.paymentBreakdown?.tips}`;
    } else {
      prompt += `\n\n💰 RENDIMIENTO HOY (${data.todayData.date}):
Sin ventas registradas aún - Oportunidad de análisis predictivo`;
    }
  }

  if (data.yesterdayData && data.yesterdayData.totalOrders > 0) {
    prompt += `\n\n📊 RENDIMIENTO AYER (${data.yesterdayData.date}):
💵 Ventas: $${data.yesterdayData.totalRevenue} | 📦 ${data.yesterdayData.totalOrders} órdenes | 📈 Ganancia: $${data.yesterdayData.totalProfit}`;
  }

  if (data.monthData && data.monthData.length >= 5) {
    const totalMonthSales = data.monthData.reduce((sum, day) => sum + day.totalRevenue, 0);
    const avgDailySales = totalMonthSales / data.monthData.length;
    const bestDay = data.monthData.reduce((best, current) => current.totalRevenue > best.totalRevenue ? current : best);
    
    prompt += `\n\n📈 TENDENCIAS DEL MES ULTRA AVANZADAS (${data.monthData.length} días con ventas):
💰 Promedio diario: $${avgDailySales.toFixed(0)}
💎 Total mensual: $${totalMonthSales.toFixed(0)}
🏆 Mejor día: ${bestDay.dayName} con $${bestDay.totalRevenue}`;
  }

  if (data.topProducts && data.topProducts.length > 0) {
    prompt += `\n\n🌟 PRODUCTOS ESTRELLA ULTRA DETALLADOS (histórico completo):
${data.topProducts.slice(0, 5).map((p, i) => `${i+1}. 🥇 ${p.product_name} - ${p.category_name} (${p.total_sold} ventas HISTÓRICAS)`).join('\n')}`;
  }

  if (data.topCategories && data.topCategories.length > 0) {
    prompt += `\n\n📊 CATEGORÍAS MÁS RENTABLES ULTRA ANÁLISIS:
${data.topCategories.slice(0, 3).map((c, i) => `${i+1}. 💰 ${c.category_name}: $${c.total_revenue.toFixed(0)} (${c.total_sold} productos vendidos)`).join('\n')}`;
  }

  if (data.paymentMethods) {
    prompt += `\n\n💳 MÉTODOS DE PAGO ULTRA DETALLADOS:
💵 Efectivo: ${data.paymentMethods.cash_percentage}% ($${data.paymentMethods.cash_total.toFixed(0)})
💳 Tarjeta: ${data.paymentMethods.card_percentage}% ($${data.paymentMethods.card_total.toFixed(0)})
🎁 Propinas totales: $${data.paymentMethods.total_tips.toFixed(0)}`;
  }

  prompt += `\n\n🔬 CAPACIDADES ULTRA AVANZADAS:
- 📊 Análisis completo de TODO el historial (sin límites de tiempo)
- ⏰ Patrones por hora, día, semana, mes y temporadas
- 🎯 Análisis de productos y categorías ultra detallado
- 💳 Métodos de pago y propinas con insights estratégicos
- 📈 Comparaciones de períodos con tendencias predictivas
- 🔮 Predicciones basadas en patrones históricos complejos
- 💰 Análisis de rentabilidad por producto/categoría/hora
- 🎯 Recomendaciones estratégicas de negocio accionables
- 📊 Detección de oportunidades de crecimiento
- ⚡ Optimización de operaciones basada en datos

🎨 FORMATO DE RESPUESTA ULTRA VISUAL:
- USA MARKDOWN RICO con emojis, tablas y gráficas ASCII
- Crea tablas visuales para comparaciones
- Usa emojis grandes para destacar puntos clave
- Formatea números con separadores de miles
- Crea "gráficas" con caracteres Unicode (█, ▓, ▒, ░)

📊 EJEMPLOS DE FORMATO ULTRA AVANZADO:

**💰 Ventas por Producto:**
| 🏆 Ranking | Producto | Ventas | Visual | Tendencia |
|-----------|----------|--------|--------|-----------|
| 🥇 1° | Pollo Rostizado | 1,234 | ████████████ 65% | 📈 +15% |
| 🥈 2° | Piezas Crujientes | 987 | ████████ 32% | 📊 +5% |
| 🥉 3° | Combo Familiar | 654 | █████ 17% | 📉 -2% |

💎 **Resumen Financiero Ultra:**
> **💰 Total de ventas:** $45,678 (+12% vs mes anterior)
> **📈 Ganancia neta:** $12,345 (27% margen)
> **🎯 Ticket promedio:** $23.50 (+$1.20 vs histórico)

🎯 **Insights Estratégicos Ultra:**
- ✅ Productos de pollo dominan las ventas (oportunidad de expansión)
- 📈 Tendencia positiva sostenida en los últimos 7 días
- ⚠️ Oportunidad CRÍTICA en bebidas y postres (+30% potencial)
- 🔥 Hora pico identificada: 2:00 PM (optimizar staffing)

🚀 **Recomendaciones Accionables:**
1. 🎯 Expandir línea de pollo (+20% ventas potenciales)
2. 💡 Promover bebidas en horarios específicos
3. ⏰ Ajustar staffing según patrones horarios detectados

Siempre incluye emojis relevantes, datos específicos con contexto histórico, y recomendaciones accionables basadas en análisis profundo de patrones.

RESPONDE de manera natural, conversacional y ultra analítica, adaptándote al tono del usuario pero siempre con insights de valor estratégico.`;

  return prompt;
}

// 🧠 GENERACIÓN DE RESPUESTA NATURAL ULTRA AVANZADA
async function generateNaturalResponse(message: string, restaurantData: RestaurantData): Promise<string> {
  console.log('🧠 Generando respuesta ULTRA AVANZADA con datos COMPLETOS...');

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
      max_tokens: 3000, // ← ULTRA INCREMENTADO para respuestas épicas
      system: prompt,
      messages: [{ role: "user", content: message }]
    })
  });

  const claudeData = await claudeResponse.json();
  return claudeData.content[0].text;
}

// 🚀 OPTIONS PARA CORS ULTRA OPTIMIZADO
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}