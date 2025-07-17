import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('restaurants').select('count').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
}

// ✅ ARREGLO PRINCIPAL: SSE que responde a comandos JSON-RPC
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  const connected = await testConnection();
  
  const stream = new ReadableStream({
    start(controller) {
      // 1. Enviar server info inicial
      const serverInfo = {
        jsonrpc: "2.0",
        id: 0,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { 
            tools: {},  // ← Claude necesita esto
            resources: {} 
          },
          serverInfo: {
            name: "fudigpt-restaurant-intelligence",
            version: "1.0.0",
            description: "Full Restaurant Intelligence - Complete access to POSTER POS data with flexible analysis capabilities"
          }
        }
      };
      
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(serverInfo)}\n\n`));
      
      // 2. ✅ NUEVO: Enviar tools/list automáticamente después del handshake
      const toolsList = {
        jsonrpc: "2.0",
        id: 1,
        result: {
          tools: [
            {
              name: 'query_restaurant_data',
              description: 'Query ANY restaurant data with complete flexibility - sales, products, profits, trends, comparisons, hourly analysis, or any business intelligence question.',
              inputSchema: {
                type: 'object',
                properties: {
                  restaurant_id: { 
                    type: 'string', 
                    description: 'Restaurant identifier from POSTER POS system' 
                  },
                  query_type: { 
                    type: 'string', 
                    description: 'What to analyze - stats, trends, products, profits, hourly, etc.', 
                    default: 'stats' 
                  },
                  parameters: { 
                    type: 'object', 
                    description: 'Flexible parameters for analysis', 
                    default: {} 
                  }
                },
                required: ['restaurant_id']
              }
            }
          ]
        }
      };
      
      // ✅ Enviar tools después de 100ms (simula que Claude pidió tools/list)
      setTimeout(() => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(toolsList)}\n\n`));
      }, 100);
      
      // ✅ MANTENER CONEXIÓN ABIERTA con heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`data: {"jsonrpc":"2.0","id":999,"result":{"ping":"pong"}}\n\n`));
        } catch (e) {
          clearInterval(heartbeat);
        }
      }, 30000); // Cada 30 segundos
      
      // ✅ Cleanup cuando se cierre la conexión
      const cleanup = () => {
        clearInterval(heartbeat);
      };
      
      // Simular que la conexión se mantiene
      setTimeout(cleanup, 300000); // 5 minutos max
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, anthropic-beta',  // ← Agregar anthropic-beta
    },
  });
}

// POST mantiene la misma funcionalidad
export async function POST(request: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, anthropic-beta',  // ← Agregar anthropic-beta
  };

  try {
    const body = await request.json();
    
    if (body.method === 'tools/list') {
      return Response.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            {
              name: 'query_restaurant_data',
              description: 'Query ANY restaurant data with complete flexibility - sales, products, profits, trends, comparisons, hourly analysis, or any business intelligence question.',
              inputSchema: {
                type: 'object',
                properties: {
                  restaurant_id: { type: 'string', description: 'Restaurant identifier from POSTER POS system' },
                  query_type: { type: 'string', description: 'What to analyze - stats, trends, products, profits, hourly, etc.', default: 'stats' },
                  parameters: { type: 'object', description: 'Flexible parameters for analysis', default: {} }
                },
                required: ['restaurant_id']
              }
            }
          ]
        }
      }, { headers });
    }
    
    if (body.method === 'tools/call') {
      const { name, arguments: args } = body.params;
      const restaurantId = String(args.restaurant_id);
      
      if (name === 'query_restaurant_data') {
        const queryType = String(args.query_type || 'stats');
        const result = await queryRestaurantData(restaurantId, queryType, args.parameters || {});
        
        return Response.json({
          jsonrpc: "2.0",
          id: body.id,
          result: result
        }, { headers });
      }
      
      throw new Error(`Unknown tool: ${name}`);
    }
    
    return Response.json({
      jsonrpc: "2.0", 
      id: body.id,
      result: { message: 'FUDIVERSE Restaurant Intelligence MCP Server' }
    }, { headers });
    
  } catch (error) {
    return Response.json({
      jsonrpc: "2.0",
      id: 1,
      error: {
        code: -32603,
        message: 'Internal error',
        data: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { headers });
  }
}

// ✅ Agregar OPTIONS para CORS
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, anthropic-beta',
    },
  });
}

// El resto de las funciones se mantienen igual...
async function queryRestaurantData(restaurantId: string, queryType: string, parameters: any) {
  try {
    switch (queryType.toLowerCase()) {
      case 'stats':
        return await getRestaurantStats(restaurantId, parameters.date_range || 'today');
      case 'trends':
        return await analyzeSalesTrends(restaurantId, Number(parameters.days_back || 7));
      case 'products':
        return await getProductInsights(restaurantId, Number(parameters.limit || 10));
      default:
        return await getRestaurantStats(restaurantId, parameters.date_range || 'today');
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    };
  }
}

async function getRestaurantStats(restaurantId: string, dateRange: string) {
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single();

  if (!restaurant) {
    throw new Error(`Restaurant ${restaurantId} not found`);
  }

  const today = new Date().toISOString().split('T')[0];
  const todayData = await getDayData(restaurantId, today);
  
  let compareData = null;
  if (dateRange === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    compareData = await getDayData(restaurantId, yesterday.toISOString().split('T')[0]);
  }

  const topProducts = await getTopProducts(restaurantId);

  return {
    content: [{
      type: 'text',
      text: formatRestaurantStats(restaurant, todayData, compareData, topProducts, dateRange)
    }]
  };
}

async function analyzeSalesTrends(restaurantId: string, daysBack: number) {
  const trends = [];
  const today = new Date();
  
  for (let i = 0; i < daysBack; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayData = await getDayData(restaurantId, dateStr);
    if (dayData.totalOrders > 0) {
      trends.push(dayData);
    }
  }

  return {
    content: [{
      type: 'text',
      text: formatSalesTrends(trends, daysBack)
    }]
  };
}

async function getProductInsights(restaurantId: string, limit: number) {
  const topProducts = await getTopProducts(restaurantId);
  return {
    content: [{
      type: 'text',
      text: formatProductInsights(topProducts.slice(0, limit))
    }]
  };
}

async function getDayData(restaurantId: string, date: string) {
  try {
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    
    const { data: transactions, error } = await supabase
      .from('poster_transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('date_close', startDate)
      .lte('date_close', endDate);

    if (error || !transactions || transactions.length === 0) {
      return { date, totalOrders: 0, totalRevenue: 0 };
    }

    const totalRevenue = transactions.reduce((sum, t) => sum + parseFloat(t.sum || 0), 0);
    const totalProfit = transactions.reduce((sum, t) => sum + parseInt(t.total_profit || 0), 0) / 100;
    const totalOrders = transactions.length;
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const dayProducts = await getDayProducts(restaurantId, date);
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
    return { date, totalOrders: 0, totalRevenue: 0, error: (error as Error).message };
  }
}

async function getDayProducts(restaurantId: string, date: string) {
  try {
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;
    
    const { data: transactionProducts, error } = await supabase
      .from('poster_transaction_products')
      .select(`
        product_id,
        product_sum,
        poster_transactions!inner(date_close, restaurant_id)
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

    const productMap: any = {};
    transactionProducts.forEach(item => {
      const productId = String(item.product_id);
      if (!productMap[productId]) {
        productMap[productId] = { product_id: productId, cantidad: 0, revenue_total: 0 };
      }
      productMap[productId].cantidad += 1;
      productMap[productId].revenue_total += parseFloat(item.product_sum || 0);
    });

    return Object.values(productMap).map((product: any) => {
      const nameInfo = productNames?.find(p => p.product_id === product.product_id);
      return {
        ...product,
        product_name: nameInfo?.product_name || `Producto ${product.product_id}`
      };
    }).sort((a: any, b: any) => b.cantidad - a.cantidad);
  } catch (error) {
    return [];
  }
}

async function getTopProducts(restaurantId: string) {
  try {
    const { data: allTimeProducts } = await supabase
      .from('poster_transaction_products')
      .select(`product_id, poster_transactions!inner(restaurant_id)`)
      .eq('poster_transactions.restaurant_id', restaurantId)
      .limit(500);

    if (!allTimeProducts) return [];

    const productCounts: any = {};
    allTimeProducts.forEach(item => {
      const productId = String(item.product_id);
      productCounts[productId] = (productCounts[productId] || 0) + 1;
    });

    const topProductIds = Object.keys(productCounts)
      .sort((a, b) => productCounts[b] - productCounts[a])
      .slice(0, 15);

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

function getHourlyBreakdown(transactions: any[]) {
  const hourlyMap: any = {};
  
  transactions.forEach(transaction => {
    const hour = new Date(transaction.date_close).getHours();
    if (!hourlyMap[hour]) {
      hourlyMap[hour] = { hour, orders: 0, revenue: 0 };
    }
    hourlyMap[hour].orders++;
    hourlyMap[hour].revenue += parseFloat(transaction.sum || 0);
  });
  
  return Object.values(hourlyMap)
    .sort((a: any, b: any) => a.hour - b.hour)
    .map((h: any) => ({ ...h, revenue: Math.round(h.revenue * 100) / 100 }));
}

function formatRestaurantStats(restaurant: any, todayData: any, compareData: any, topProducts: any[], dateRange: string): string {
  let response = `# ${restaurant.name || 'Restaurant'} Performance\n\n`;

  response += `## Today's Performance (${todayData.date})\n`;
  if (todayData.totalOrders > 0) {
    response += `- **Revenue**: ${todayData.totalRevenue.toLocaleString()}\n`;
    response += `- **Orders**: ${todayData.totalOrders}\n`;
    response += `- **Average Ticket**: ${todayData.avgTicket.toFixed(2)}\n`;
    response += `- **Profit**: ${todayData.totalProfit.toFixed(2)} (${todayData.marginPercent}% margin)\n\n`;

    if (todayData.bestHour) {
      response += `**Peak Hour**: ${todayData.bestHour.hour}:00 (${todayData.bestHour.revenue})\n\n`;
    }
  } else {
    response += `No sales recorded yet today.\n\n`;
  }

  if (compareData && compareData.totalOrders > 0) {
    const revenueChange = ((todayData.totalRevenue - compareData.totalRevenue) / compareData.totalRevenue * 100);
    const ordersChange = ((todayData.totalOrders - compareData.totalOrders) / compareData.totalOrders * 100);
    
    response += `## vs Yesterday\n`;
    response += `- Revenue: ${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}%\n`;
    response += `- Orders: ${ordersChange >= 0 ? '+' : ''}${ordersChange.toFixed(1)}%\n\n`;
  }

  if (topProducts.length > 0) {
    response += `## Top Products (All Time)\n`;
    topProducts.slice(0, 5).forEach((product, index) => {
      response += `${index + 1}. **${product.product_name}** - ${product.total_sold} sold\n`;
    });
    response += '\n';
  }

  if (todayData.topProducts && todayData.topProducts.length > 0) {
    response += `## Today's Best Sellers\n`;
    todayData.topProducts.slice(0, 3).forEach((product: any, index: number) => {
      response += `${index + 1}. **${product.product_name}** - ${product.cantidad} sold (${product.revenue_total.toFixed(2)})\n`;
    });
  }

  response += `\n---\n*Real-time data from FUDIVERSE AI*`;
  return response;
}

function formatSalesTrends(trends: any[], daysBack: number): string {
  if (trends.length === 0) {
    return `# Sales Trends (${daysBack} days)\n\nNo sales data found for the specified period.`;
  }

  let response = `# Sales Trends (Last ${trends.length} days with sales)\n\n`;

  const totalRevenue = trends.reduce((sum, day) => sum + day.totalRevenue, 0);
  const totalOrders = trends.reduce((sum, day) => sum + day.totalOrders, 0);
  const avgDailyRevenue = totalRevenue / trends.length;
  const avgDailyOrders = totalOrders / trends.length;

  response += `## Summary\n`;
  response += `- **Total Revenue**: ${totalRevenue.toLocaleString()}\n`;
  response += `- **Total Orders**: ${totalOrders}\n`;
  response += `- **Avg Daily Revenue**: ${avgDailyRevenue.toFixed(2)}\n`;
  response += `- **Avg Daily Orders**: ${avgDailyOrders.toFixed(1)}\n\n`;

  const bestDay = trends.reduce((best, day) => day.totalRevenue > best.totalRevenue ? day : best);
  const worstDay = trends.reduce((worst, day) => day.totalRevenue < worst.totalRevenue ? day : worst);

  response += `## Performance Highlights\n`;
  response += `- **Best Day**: ${bestDay.dayName} (${bestDay.date}) - ${bestDay.totalRevenue}\n`;
  response += `- **Lowest Day**: ${worstDay.dayName} (${worstDay.date}) - ${worstDay.totalRevenue}\n\n`;

  response += `## Daily Breakdown\n`;
  trends.reverse().forEach(day => {
    response += `**${day.dayName} (${day.date})**\n`;
    response += `  Revenue: ${day.totalRevenue} | Orders: ${day.totalOrders} | Avg: ${day.avgTicket.toFixed(2)}\n`;
  });

  response += `\n---\n*Analysis based on real transaction data*`;
  return response;
}

function formatProductInsights(topProducts: any[]): string {
  let response = `# Product Performance Insights\n\n`;

  if (topProducts.length > 0) {
    response += `## Top Performing Products\n`;
    topProducts.forEach((product, index) => {
      response += `${index + 1}. **${product.product_name}** - ${product.total_sold} total sales\n`;
    });
    response += '\n';
  }

  response += `---\n*Product analysis from FUDIVERSE AI*`;
  return response;
}