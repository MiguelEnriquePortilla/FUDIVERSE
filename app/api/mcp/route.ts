import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const connected = await testConnection();
  
  return NextResponse.json({
    message: 'Fudiverse MCP Server - Full Restaurant Intelligence',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: connected ? 'connected' : 'disconnected',
    capabilities: {
      tools: ['get_restaurant_stats', 'analyze_sales_trends', 'get_product_insights'],
      description: 'Full access to restaurant data with flexible analysis capabilities'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // MCP Tools List Request
    if (body.method === 'tools/list') {
      return NextResponse.json({
        tools: [
          {
            name: 'get_restaurant_stats',
            description: 'Get real-time restaurant performance statistics with flexible date ranges and comparison options',
            inputSchema: {
              type: 'object',
              properties: {
                restaurant_id: {
                  type: 'string',
                  description: 'Restaurant identifier'
                },
                date_range: {
                  type: 'string',
                  enum: ['today', 'yesterday', 'week'],
                  description: 'Time period for analysis',
                  default: 'today'
                }
              },
              required: ['restaurant_id']
            }
          },
          {
            name: 'analyze_sales_trends',
            description: 'Analyze sales patterns using real transaction data with flexible time periods',
            inputSchema: {
              type: 'object',
              properties: {
                restaurant_id: {
                  type: 'string',
                  description: 'Restaurant identifier'
                },
                days_back: {
                  type: 'number',
                  description: 'Number of days to analyze',
                  minimum: 1,
                  maximum: 30,
                  default: 7
                }
              },
              required: ['restaurant_id']
            }
          },
          {
            name: 'get_product_insights',
            description: 'Get detailed product performance analysis with flexible limits and filtering',
            inputSchema: {
              type: 'object',
              properties: {
                restaurant_id: {
                  type: 'string',
                  description: 'Restaurant identifier'
                },
                limit: {
                  type: 'number',
                  description: 'Number of top products to analyze',
                  minimum: 5,
                  maximum: 20,
                  default: 10
                }
              },
              required: ['restaurant_id']
            }
          }
        ]
      });
    }
    
    // MCP Tool Call Request
    if (body.method === 'tools/call') {
      const { name, arguments: args } = body.params;
      const restaurantId = String(args.restaurant_id);
      
      console.log(`🔧 Claude calling: ${name} for restaurant ${restaurantId}`);
      
      try {
        switch (name) {
          case 'get_restaurant_stats':
            const dateRange = String(args.date_range || 'today');
            return NextResponse.json(await getRestaurantStats(restaurantId, dateRange));
            
          case 'analyze_sales_trends':
            const daysBack = Number(args.days_back || 7);
            return NextResponse.json(await analyzeSalesTrends(restaurantId, daysBack));
            
          case 'get_product_insights':
            const limit = Number(args.limit || 10);
            return NextResponse.json(await getProductInsights(restaurantId, limit));
            
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        });
      }
    }
    
    return NextResponse.json({ 
      message: 'MCP request processed',
      method: body.method || 'unknown'
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}

// MAIN ANALYSIS FUNCTIONS (from your original MCP)
async function getRestaurantStats(restaurantId: string, dateRange: string) {
  console.log(`Getting stats for ${restaurantId} (${dateRange})`);
  
  // Get restaurant info
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single();

  if (!restaurant) {
    throw new Error(`Restaurant ${restaurantId} not found`);
  }

  // Get today's data
  const today = new Date().toISOString().split('T')[0];
  const todayData = await getDayData(restaurantId, today);
  
  // Get comparison data if needed
  let compareData = null;
  if (dateRange === 'yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    compareData = await getDayData(restaurantId, yesterday.toISOString().split('T')[0]);
  }

  // Get top products
  const topProducts = await getTopProducts(restaurantId);

  return {
    content: [
      {
        type: 'text',
        text: formatRestaurantStats(restaurant, todayData, compareData, topProducts, dateRange)
      }
    ]
  };
}

async function analyzeSalesTrends(restaurantId: string, daysBack: number) {
  console.log(`Analyzing trends for ${restaurantId} (${daysBack} days)`);
  
  const trends = [];
  const today = new Date();
  
  // Get data for each day
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
    content: [
      {
        type: 'text',
        text: formatSalesTrends(trends, daysBack)
      }
    ]
  };
}

async function getProductInsights(restaurantId: string, limit: number): Promise<{ content: { type: string; text: string }[] }> {
  console.log(`Getting product insights for ${restaurantId} (top ${limit})`);
  
  const topProducts = await getTopProducts(restaurantId);
  const selectedProducts = topProducts.slice(0, limit);

  const text = selectedProducts.length > 0
    ? `Top ${selectedProducts.length} Products:\n` +
      selectedProducts.map((product: any, idx: number) =>
        `${idx + 1}. ${product.product_name} - ${product.total_sold} sold`
      ).join('\n')
    : 'No product data available.';

  return {
    content: [
      {
        type: 'text',
        text
      }
    ]
  };
}

// Test Supabase connection
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

// DATABASE FUNCTIONS (from your original MCP)
async function getDayData(restaurantId: string, date: string) {
  console.log(`Getting data for: ${date}`);
  
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
      console.error(`Query error:`, error);
      return { date, totalOrders: 0, totalRevenue: 0, error: error.message };
    }
    
    console.log(`Found ${transactions?.length || 0} transactions`);

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
    console.error(`Critical error in getDayData for ${date}:`, error);
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

    const productMap: any = {};
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

    const productsWithNames = Object.values(productMap).map((product: any) => {
      const nameInfo = productNames?.find(p => p.product_id === product.product_id);
      return {
        ...product,
        product_name: nameInfo?.product_name || `Producto ${product.product_id}`
      };
    });

    return productsWithNames.sort((a: any, b: any) => b.cantidad - a.cantidad);

  } catch (error) {
    console.error(`Error in getDayProducts:`, error);
    return [];
  }
}

async function getTopProducts(restaurantId: string) {
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
    console.error('Error getting top products:', error);
    return [];
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

// FORMATTING FUNCTIONS
function formatRestaurantStats(restaurant: any, todayData: any, compareData: any, topProducts: any[], dateRange: string): string {
  let response = `# ${restaurant.name || 'Restaurant'} Performance\n\n`;

  // Today's performance
  response += `## Today's Performance (${todayData.date})\n`;
  if (todayData.totalOrders > 0) {
    response += `- **Revenue**: $${todayData.totalRevenue.toLocaleString()}\n`;
    response += `- **Orders**: ${todayData.totalOrders}\n`;
    response += `- **Average Ticket**: $${todayData.avgTicket.toFixed(2)}\n`;
    response += `- **Profit**: $${todayData.totalProfit.toFixed(2)} (${todayData.marginPercent}% margin)\n\n`;

    if (todayData.bestHour) {
      response += `**Peak Hour**: ${todayData.bestHour.hour}:00 ($${todayData.bestHour.revenue})\n\n`;
    }
  } else {
    response += `No sales recorded yet today.\n\n`;
  }

  // Comparison if available
  if (compareData && compareData.totalOrders > 0) {
    const revenueChange = ((todayData.totalRevenue - compareData.totalRevenue) / compareData.totalRevenue * 100);
    const ordersChange = ((todayData.totalOrders - compareData.totalOrders) / compareData.totalOrders * 100);
    
    response += `## vs Yesterday\n`;
    response += `- Revenue: ${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}%\n`;
    response += `- Orders: ${ordersChange >= 0 ? '+' : ''}${ordersChange.toFixed(1)}%\n\n`;
  }

  // Top products
  if (topProducts.length > 0) {
    response += `## Top Products (All Time)\n`;
    topProducts.slice(0, 5).forEach((product, index) => {
      response += `${index + 1}. **${product.product_name}** - ${product.total_sold} sold\n`;
    });
    response += '\n';
  }

  // Today's best sellers
  if (todayData.topProducts && todayData.topProducts.length > 0) {
    response += `## Today's Best Sellers\n`;
    todayData.topProducts.slice(0, 3).forEach((product: any, index: number) => {
      response += `${index + 1}. **${product.product_name}** - ${product.cantidad} sold ($${product.revenue_total.toFixed(2)})\n`;
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
  response += `- **Total Revenue**: $${totalRevenue.toLocaleString()}\n`;
  response += `- **Total Orders**: ${totalOrders}\n`;
  response += `- **Avg Daily Revenue**: $${avgDailyRevenue.toFixed(2)}\n`;
  response += `- **Avg Daily Orders**: ${avgDailyOrders.toFixed(1)}\n\n`;

  // Best and worst days
  const bestDay = trends.reduce((best, day) => day.totalRevenue > best.totalRevenue ? day : best);
  const worstDay = trends.reduce((worst, day) => day.totalRevenue < worst.totalRevenue ? day : worst);

  response += `## Performance Highlights\n`;
  response += `- **Best Day**: ${bestDay.dayName} (${bestDay.date}) - $${bestDay.totalRevenue}\n`;
  response += `- **Lowest Day**: ${worstDay.dayName} (${worstDay.date}) - $${worstDay.totalRevenue}\n\n`;

  // Daily breakdown
  response += `## Daily Breakdown\n`;
  trends.reverse().forEach(day => {
    response += `**${day.dayName} (${day.date})**\n`;
    response += `  Revenue: $${day.totalRevenue} | Orders: ${day.totalOrders} | Avg: $${day.avgTicket.toFixed(2)}\n`;
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