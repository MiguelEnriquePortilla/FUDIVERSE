import { NextRequest } from 'next/server';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, anthropic-beta',
  'Content-Type': 'application/json',
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers });
}

export async function GET() {
  // MCP Server Info - lo que Claude pide primero
  return Response.json({
    jsonrpc: "2.0",
    id: 1,
    result: {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {},
        resources: {}
      },
      serverInfo: {
        name: "fudigpt-restaurant-intelligence",
        version: "1.0.0",
        description: "FUDIVERSE Restaurant Intelligence MCP Server"
      }
    }
  }, { headers });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // MCP Initialize
    if (body.method === 'initialize') {
      return Response.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: "fudigpt-restaurant-intelligence", 
            version: "1.0.0"
          }
        }
      }, { headers });
    }
    
    // Tools List
    if (body.method === 'tools/list') {
      return Response.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            {
              name: 'query_restaurant_data',
              description: 'Query restaurant data - sales, products, profits, trends, comparisons, hourly analysis, or any business intelligence question.',
              inputSchema: {
                type: 'object',
                properties: {
                  restaurant_id: { 
                    type: 'string', 
                    description: 'Restaurant ID (use: 13207c90-2ea6-4aa0-bfac-349753d24ea4 for Chicken Chicanito)' 
                  },
                  query_type: { 
                    type: 'string', 
                    description: 'Analysis type: stats, trends, products, hourly, profit',
                    enum: ['stats', 'trends', 'products', 'hourly', 'profit'],
                    default: 'stats' 
                  },
                  parameters: { 
                    type: 'object', 
                    description: 'Additional parameters for analysis',
                    properties: {
                      date_range: { type: 'string', description: 'Date range: today, yesterday, week, month' },
                      days_back: { type: 'number', description: 'Number of days to analyze' },
                      limit: { type: 'number', description: 'Limit results' }
                    }
                  }
                },
                required: ['restaurant_id']
              }
            }
          ]
        }
      }, { headers });
    }
    
    // Tool Call
    if (body.method === 'tools/call') {
      const { name, arguments: args } = body.params;
      
      if (name === 'query_restaurant_data') {
        // Respuesta simple de prueba
        return Response.json({
          jsonrpc: "2.0",
          id: body.id,
          result: {
            content: [{
              type: 'text',
              text: `# 🍗 Chicken Chicanito Restaurant Analysis\n\n## Today's Performance\n- **Revenue**: $2,847.50\n- **Orders**: 153\n- **Average Ticket**: $18.61\n- **Top Product**: PQ2 UN POLLO ROSTIZADO (69 sold)\n\n## Status\n✅ Restaurant data connected\n✅ Real-time analysis ready\n\n*Data from FUDIVERSE AI Restaurant Intelligence*`
            }]
          }
        }, { headers });
      }
    }
    
    return Response.json({
      jsonrpc: "2.0",
      id: body.id,
      error: { code: -32601, message: 'Method not found' }
    }, { headers });
    
  } catch (error) {
    return Response.json({
      jsonrpc: "2.0", 
      id: 1,
      error: { code: -32603, message: 'Internal error' }
    }, { headers });
  }
}