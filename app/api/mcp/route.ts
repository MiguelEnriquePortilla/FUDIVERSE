import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🚀 FUDIVERSE AI MCP SERVER - HTTP ENDPOINT
// First restaurant intelligence connector for Claude AI
// Historic code that will change the restaurant industry forever

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🎯 MCP TOOLS DEFINITION
const MCP_TOOLS = [
  {
    name: "get_restaurant_stats",
    description: "Get real-time restaurant performance statistics",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        date_range: { type: "string", description: "Date range (today, week, month)" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "analyze_sales_trends",
    description: "Analyze sales patterns using real transaction data",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        days_back: { type: "number", description: "Number of days to analyze" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "get_product_insights",
    description: "Get detailed product performance analysis",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        limit: { type: "number", description: "Number of products to analyze" }
      },
      required: ["restaurant_id"]
    }
  }
];

// 🔥 TOOL IMPLEMENTATIONS
async function getRestaurantStats(restaurantId: string, dateRange: string = 'today') {
  console.error(`Getting stats for ${restaurantId} (${dateRange})`);
  
  const today = new Date().toISOString().split('T')[0];
  
  let dateFilter = '';
  if (dateRange === 'today') {
    dateFilter = `date = '${today}'`;
  } else if (dateRange === 'week') {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    dateFilter = `date >= '${weekAgo}'`;
  } else if (dateRange === 'month') {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    dateFilter = `date >= '${monthAgo}'`;
  }

  // Get daily stats
  const { data: dailyStats } = await supabase
    .from('daily_restaurant_stats')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .gte('date', dateFilter)
    .order('date', { ascending: false });

  // Get top products
  const { data: topProducts } = await supabase
    .from('intelligent_top_products')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('quantity_sold', { ascending: false })
    .limit(5);

  // Get restaurant name
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name')
    .eq('id', restaurantId)
    .single();

  const restaurantName = restaurant?.name || 'Unknown Restaurant';
  
  let response = `# ${restaurantName} Performance\n\n`;
  
  if (dateRange === 'today') {
    const todayStats = dailyStats?.[0];
    if (todayStats && todayStats.total_revenue > 0) {
      response += `## Today's Performance (${today})\n`;
      response += `- **Revenue**: $${todayStats.total_revenue.toFixed(2)}\n`;
      response += `- **Orders**: ${todayStats.total_orders}\n`;
      response += `- **Avg Ticket**: $${todayStats.average_ticket.toFixed(2)}\n\n`;
    } else {
      response += `## Today's Performance (${today})\n`;
      response += `No sales recorded yet today.\n\n`;
    }
  }

  if (topProducts && topProducts.length > 0) {
    response += `##  Top Products (All Time)\n`;
    topProducts.forEach((product, index) => {
      response += `${index + 1}. **${product.product_name}** - ${product.quantity_sold} sold\n`;
    });
    response += `\n`;
  }

  response += `\n---\n*Real-time data from FUDIVERSE AI*`;
  
  return response;
}

async function analyzeSalesTrends(restaurantId: string, daysBack: number = 7) {
  console.error(`Analyzing trends for ${restaurantId} (${daysBack} days)`);
  
  const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const { data: salesData } = await supabase
    .from('daily_restaurant_stats')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .gte('date', startDate)
    .order('date', { ascending: true });

  if (!salesData || salesData.length === 0) {
    return 'No sales data available for the specified period.';
  }

  const validSales = salesData.filter(day => day.total_revenue > 0);
  
  if (validSales.length === 0) {
    return 'No sales recorded in the specified period.';
  }

  const totalRevenue = validSales.reduce((sum, day) => sum + day.total_revenue, 0);
  const totalOrders = validSales.reduce((sum, day) => sum + day.total_orders, 0);
  const avgDailyRevenue = totalRevenue / validSales.length;
  const avgDailyOrders = totalOrders / validSales.length;

  const bestDay = validSales.reduce((best, day) => 
    day.total_revenue > best.total_revenue ? day : best
  );
  
  const worstDay = validSales.reduce((worst, day) => 
    day.total_revenue < worst.total_revenue ? day : worst
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  let response = `# Sales Trends (Last ${validSales.length} days with sales)\n\n`;
  response += `## Summary\n`;
  response += `- **Total Revenue**: $${totalRevenue.toFixed(2)}\n`;
  response += `- **Total Orders**: ${totalOrders}\n`;
  response += `- **Avg Daily Revenue**: $${avgDailyRevenue.toFixed(2)}\n`;
  response += `- **Avg Daily Orders**: ${avgDailyOrders.toFixed(1)}\n\n`;
  
  response += `## Performance Highlights\n`;
  response += `- **Best Day**: ${formatDateShort(bestDay.date)} (${bestDay.date}) - $${bestDay.total_revenue.toFixed(2)}\n`;
  response += `- **Lowest Day**: ${formatDateShort(worstDay.date)} (${worstDay.date}) - $${worstDay.total_revenue.toFixed(2)}\n\n`;
  
  response += `## Daily Breakdown\n`;
  validSales.forEach(day => {
    const avgTicket = day.total_orders > 0 ? day.total_revenue / day.total_orders : 0;
    response += `**${formatDateShort(day.date)} (${day.date})**\n`;
    response += `  Revenue: $${day.total_revenue.toFixed(2)} | Orders: ${day.total_orders} | Avg: $${avgTicket.toFixed(2)}\n`;
  });

  response += `\n---\n*Analysis based on real transaction data*`;
  
  return response;
}

async function getProductInsights(restaurantId: string, limit: number = 10) {
  console.error(`Getting product insights for ${restaurantId} (top ${limit})`);
  
  const { data: products } = await supabase
    .from('intelligent_top_products')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('quantity_sold', { ascending: false })
    .limit(limit);

  if (!products || products.length === 0) {
    return 'No product data available.';
  }

  let response = `# Product Performance Insights\n\n`;
  response += `## Top Performing Products\n`;
  
  products.forEach((product, index) => {
    response += `${index + 1}. **${product.product_name}** - ${product.quantity_sold} total sales\n`;
  });

  response += `\n---\n*Product analysis from FUDIVERSE AI*`;
  
  return response;
}

// 🌐 MCP HTTP HANDLER
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Handle MCP protocol messages
    if (body.method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'fudiverse-restaurant-intelligence',
            version: '1.0.0'
          }
        }
      }, { headers });
    }

    if (body.method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          tools: MCP_TOOLS
        }
      }, { headers });
    }

    if (body.method === 'tools/call') {
      const { name, arguments: args } = body.params;
      let result;

      switch (name) {
        case 'get_restaurant_stats':
          result = await getRestaurantStats(args.restaurant_id, args.date_range);
          break;
        case 'analyze_sales_trends':
          result = await analyzeSalesTrends(args.restaurant_id, args.days_back);
          break;
        case 'get_product_insights':
          result = await getProductInsights(args.restaurant_id, args.limit);
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return NextResponse.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          content: [
            {
              type: 'text',
              text: result
            }
          ]
        }
      }, { headers });
    }

    // Default response for unknown methods
    return NextResponse.json({
      jsonrpc: '2.0',
      id: body.id,
      error: {
        code: -32601,
        message: 'Method not found'
      }
    }, { headers });

  } catch (error) {
    console.error('MCP Server Error:', error);
    return NextResponse.json({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32603,
        message: 'Internal error',
        data: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 
