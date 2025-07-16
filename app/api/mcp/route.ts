import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🏎️ FUDIVERSE AI FERRARI - SÚPER PODEROSO MCP SERVER
// Acceso completo a TODO el ecosistema restaurantero
// Sin límites, sin restricciones, PODER TOTAL

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🔥 FERRARI MCP TOOLS - PODER COMPLETO
const MCP_TOOLS = [
  {
    name: "query_restaurant_data",
    description: "Execute any SQL query on restaurant data with full access to all tables",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "SQL query to execute" },
        description: { type: "string", description: "What this query does" }
      },
      required: ["query"]
    }
  },
  {
    name: "get_complete_restaurant_overview",
    description: "Get comprehensive restaurant analysis from all data sources",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        include_insights: { type: "boolean", description: "Include AI insights", default: true }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "analyze_sales_performance",
    description: "Deep sales analysis with unlimited time range and all transaction data",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        start_date: { type: "string", description: "Start date (YYYY-MM-DD) - optional" },
        end_date: { type: "string", description: "End date (YYYY-MM-DD) - optional" },
        granularity: { type: "string", description: "Analysis granularity: daily, weekly, monthly", default: "daily" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "analyze_product_performance",
    description: "Complete product analysis with ABC analysis, profitability, and trends",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        analysis_type: { type: "string", description: "Type: sales, profitability, abc, trends", default: "complete" },
        time_period: { type: "string", description: "Time period in days or 'all'", default: "all" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "analyze_customer_behavior",
    description: "Customer analysis including frequency, spending patterns, and segmentation",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        analysis_depth: { type: "string", description: "Analysis depth: basic, advanced, complete", default: "complete" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "analyze_operational_efficiency",
    description: "Employee performance, cash flows, and operational metrics",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        include_employees: { type: "boolean", description: "Include employee analysis", default: true },
        include_cash_flow: { type: "boolean", description: "Include cash flow analysis", default: true }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "get_ai_insights",
    description: "Get all AI-generated insights and recommendations",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        insight_type: { type: "string", description: "Type: all, fudi, ai, patterns", default: "all" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "analyze_inventory_management",
    description: "Complete inventory analysis including movements, optimization, and waste",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        include_movements: { type: "boolean", description: "Include inventory movements", default: true },
        optimization_level: { type: "string", description: "Optimization level: basic, advanced", default: "advanced" }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "financial_deep_dive",
    description: "Complete financial analysis with cash flows, profitability, and trends",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        analysis_period: { type: "string", description: "Period: week, month, quarter, year, all", default: "all" },
        include_forecasting: { type: "boolean", description: "Include forecasting", default: true }
      },
      required: ["restaurant_id"]
    }
  },
  {
    name: "competitive_benchmarking",
    description: "Compare restaurant performance against industry benchmarks and patterns",
    inputSchema: {
      type: "object",
      properties: {
        restaurant_id: { type: "string", description: "Restaurant ID" },
        benchmark_type: { type: "string", description: "Type: sales, efficiency, products", default: "complete" }
      },
      required: ["restaurant_id"]
    }
  }
];

// 🔥 AUTHENTICATION
async function validateApiKey(apiKey: string) {
  const { data } = await supabase
    .from('claude_api_keys')
    .select(`
      restaurant_id,
      restaurants!inner(name, email, subscription_tier)
    `)
    .eq('api_key', apiKey)
    .eq('is_active', true)
    .single();
    
  if (data) {
    // Update usage
    await supabase
      .from('claude_api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('api_key', apiKey);
  }
    
  return data;
}

// 🏎️ FERRARI TOOL IMPLEMENTATIONS

async function queryRestaurantData(query: string, description: string = '') {
  try {
    console.error(`Executing query: ${description || query.substring(0, 100)}...`);
    
    const { data, error } = await supabase.rpc('execute_query', { query_text: query });
    
    if (error) {
      return `Error executing query: ${error.message}`;
    }
    
    if (!data || data.length === 0) {
      return 'Query executed successfully but returned no results.';
    }
    
    // Format results nicely
    let response = `# Query Results\n\n`;
    if (description) {
      response += `**Query Description**: ${description}\n\n`;
    }
    
    response += `**Results**: ${data.length} rows returned\n\n`;
    
    // Show first few rows as example
    const sample = data.slice(0, 5);
    response += `## Sample Data\n`;
    response += '```json\n';
    response += JSON.stringify(sample, null, 2);
    response += '\n```\n\n';
    
    if (data.length > 5) {
      response += `*Showing first 5 of ${data.length} total results*\n`;
    }
    
    return response;
    
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function getCompleteRestaurantOverview(restaurantId: string, includeInsights: boolean = true) {
  console.error(`Getting complete overview for ${restaurantId}`);
  
  try {
    // Get restaurant info
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
    
    if (!restaurant) {
      return 'Restaurant not found.';
    }
    
    // Get all key metrics in parallel
    const [
      { data: dailyStats },
      { data: topProducts },
      { data: recentTransactions },
      { data: aiInsights },
      { data: cashFlows },
      { data: employees },
      { data: customers }
    ] = await Promise.all([
      supabase.from('intelligent_metrics').select('*').eq('restaurant_id', restaurantId).order('date', { ascending: false }).limit(30),
      supabase.from('intelligent_top_products').select('*').eq('restaurant_id', restaurantId).order('quantity_sold', { ascending: false }).limit(10),
      supabase.from('poster_transactions').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(10),
      includeInsights ? supabase.from('ai_insights').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(5) : { data: null },
      supabase.from('cash_flows').select('*').eq('restaurant_id', restaurantId).order('date', { ascending: false }).limit(10),
      supabase.from('employees').select('*').eq('restaurant_id', restaurantId),
      supabase.from('customers').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(20)
    ]);
    
    let response = `# 🏎️ COMPLETE OVERVIEW: ${restaurant.name}\n\n`;
    
    // Restaurant Info
    response += `## 📊 Restaurant Information\n`;
    response += `- **Name**: ${restaurant.name}\n`;
    response += `- **Owner**: ${restaurant.owner_name || 'N/A'}\n`;
    response += `- **Status**: ${restaurant.status}\n`;
    response += `- **Subscription**: ${restaurant.subscription_tier || restaurant.subscription_plan}\n`;
    response += `- **POS System**: ${restaurant.pos_type}\n`;
    response += `- **Last Sync**: ${restaurant.last_sync || 'Never'}\n\n`;
    
    // Performance Summary
    if (dailyStats && dailyStats.length > 0) {
      const recent = dailyStats.slice(0, 7);
      const totalRevenue = recent.reduce((sum, day) => sum + (day.total_revenue || 0), 0);
      const totalOrders = recent.reduce((sum, day) => sum + (day.total_orders || 0), 0);
      
      response += `## 💰 Recent Performance (Last 7 days)\n`;
      response += `- **Total Revenue**: $${totalRevenue.toFixed(2)}\n`;
      response += `- **Total Orders**: ${totalOrders}\n`;
      response += `- **Average Daily Revenue**: $${(totalRevenue / recent.length).toFixed(2)}\n`;
      response += `- **Average Ticket**: $${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}\n\n`;
    }
    
    // Top Products
    if (topProducts && topProducts.length > 0) {
      response += `## 🍽️ Top Products\n`;
      // Example: Show top products with their sales data
      topProducts.slice(0, 5).forEach((product, index) => {
        response += `${index + 1}. **${product.product_name || product.name}**: ${product.quantity_sold || 0} sold, $${product.total_revenue?.toFixed(2) || '0.00'} revenue\n`;
      });
    }
    
    response += `\n---\n*Customer intelligence from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error in customer analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function analyzeOperationalEfficiency(restaurantId: string, includeEmployees: boolean = true, includeCashFlow: boolean = true) {
  console.error(`Operational efficiency analysis for ${restaurantId}`);
  
  try {
    const queries = [];
    
    if (includeEmployees) {
      queries.push(supabase.from('employees').select('*').eq('restaurant_id', restaurantId));
      queries.push(supabase.from('poster_employees').select('*').eq('restaurant_id', restaurantId));
    }
    
    if (includeCashFlow) {
      queries.push(supabase.from('cash_flows').select('*').eq('restaurant_id', restaurantId).order('date', { ascending: false }).limit(30));
      queries.push(supabase.from('poster_cash_shifts').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(20));
    }
    
    queries.push(supabase.from('poster_transactions').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(100));
    
    const results = await Promise.all(queries);
    
    let resultIndex = 0;
    const employees = includeEmployees ? results[resultIndex++]?.data : null;
    const posterEmployees = includeEmployees ? results[resultIndex++]?.data : null;
    const cashFlows = includeCashFlow ? results[resultIndex++]?.data : null;
    const cashShifts = includeCashFlow ? results[resultIndex++]?.data : null;
    const recentTransactions = results[resultIndex]?.data;
    
    let response = `# ⚙️ OPERATIONAL EFFICIENCY ANALYSIS\n\n`;
    
    // Staff Analysis
    if (includeEmployees && (employees || posterEmployees)) {
      response += `## 👥 Staff Performance\n`;
      
      const totalStaff = (employees?.length || 0) + (posterEmployees?.length || 0);
      response += `- **Total Staff**: ${totalStaff}\n`;
      
      if (employees && employees.length > 0) {
        const activeStaff = employees.filter(emp => emp.status === 'active').length;
        response += `- **Active Staff**: ${activeStaff}\n`;
        
        // Performance metrics
        const staffWithPerformance = employees.filter(emp => emp.performance_score);
        if (staffWithPerformance.length > 0) {
          const avgPerformance = staffWithPerformance.reduce((sum, emp) => sum + emp.performance_score, 0) / staffWithPerformance.length;
          response += `- **Average Performance Score**: ${avgPerformance.toFixed(1)}/10\n`;
        }
      }
      
      if (posterEmployees && posterEmployees.length > 0) {
        response += `- **POS System Staff**: ${posterEmployees.length}\n`;
      }
      
      response += '\n';
    }
    
    // Cash Flow Analysis
    if (includeCashFlow && (cashFlows || cashShifts)) {
      response += `## 💸 Cash Flow Management\n`;
      
      if (cashFlows && cashFlows.length > 0) {
        const totalCashIn = cashFlows.reduce((sum, cf) => sum + (cf.amount_in || 0), 0);
        const totalCashOut = cashFlows.reduce((sum, cf) => sum + (cf.amount_out || 0), 0);
        const netFlow = totalCashIn - totalCashOut;
        
        response += `- **Total Cash In (30 days)**: ${totalCashIn.toFixed(2)}\n`;
        response += `- **Total Cash Out (30 days)**: ${totalCashOut.toFixed(2)}\n`;
        response += `- **Net Cash Flow**: ${netFlow.toFixed(2)}\n`;
        
        const avgDailyCashIn = totalCashIn / Math.min(cashFlows.length, 30);
        response += `- **Average Daily Cash In**: ${avgDailyCashIn.toFixed(2)}\n`;
      }
      
      if (cashShifts && cashShifts.length > 0) {
        const avgShiftLength = cashShifts
          .filter(shift => shift.closed_at && shift.opened_at)
          .reduce((sum, shift) => {
            const duration = (new Date(shift.closed_at).getTime() - new Date(shift.opened_at).getTime()) / (1000 * 60 * 60);
            return sum + duration;
          }, 0) / cashShifts.filter(shift => shift.closed_at && shift.opened_at).length;
        
        if (!isNaN(avgShiftLength)) {
          response += `- **Average Shift Length**: ${avgShiftLength.toFixed(1)} hours\n`;
        }
      }
      
      response += '\n';
    }
    
    // Transaction Efficiency
    if (recentTransactions && recentTransactions.length > 0) {
      response += `## 📊 Transaction Efficiency\n`;
      
      const avgTransactionValue = recentTransactions.reduce((sum, t) => sum + (t.total_amount || 0), 0) / recentTransactions.length;
      response += `- **Average Transaction Value**: ${avgTransactionValue.toFixed(2)}\n`;
      
      // Peak hours analysis
      const hourlyTransactions = new Map();
      recentTransactions.forEach(transaction => {
        const hour = new Date(transaction.created_at).getHours();
        hourlyTransactions.set(hour, (hourlyTransactions.get(hour) || 0) + 1);
      });
      
      const peakHour = Array.from(hourlyTransactions.entries()).reduce((peak, [hour, count]) => 
        count > peak.count ? { hour, count } : peak, { hour: 0, count: 0 });
      
      response += `- **Peak Hour**: ${peakHour.hour}:00 (${peakHour.count} transactions)\n`;
      
      // Daily patterns
      const dailyTransactions = new Map();
      recentTransactions.forEach(transaction => {
        const date = transaction.created_at.split('T')[0];
        dailyTransactions.set(date, (dailyTransactions.get(date) || 0) + 1);
      });
      
      const avgDailyTransactions = Array.from(dailyTransactions.values()).reduce((sum, count) => sum + count, 0) / dailyTransactions.size;
      response += `- **Average Daily Transactions**: ${avgDailyTransactions.toFixed(1)}\n`;
      
      response += '\n';
    }
    
    // Efficiency Recommendations
    response += `## 💡 Efficiency Recommendations\n`;
    
    if (includeEmployees && (employees?.length || 0) + (posterEmployees?.length || 0) > 0) {
      const totalStaff = (employees?.length || 0) + (posterEmployees?.length || 0);
      const dailyTransactions = recentTransactions ? recentTransactions.length / 7 : 0; // Assuming last week
      
      if (dailyTransactions > 0) {
        const transactionsPerStaff = dailyTransactions / totalStaff;
        response += `- **Staff Productivity**: ${transactionsPerStaff.toFixed(1)} transactions per staff member per day\n`;
        
        if (transactionsPerStaff < 10) {
          response += `- **Recommendation**: Consider optimizing staff scheduling or training\n`;
        } else if (transactionsPerStaff > 50) {
          response += `- **Recommendation**: Staff may be overworked - consider hiring additional help\n`;
        }
      }
    }
    
    if (includeCashFlow && cashFlows && cashFlows.length > 0) {
      const recentCashOut = cashFlows.slice(0, 7).reduce((sum, cf) => sum + (cf.amount_out || 0), 0);
      const recentRevenue = recentTransactions?.slice(0, 50).reduce((sum, t) => sum + (t.total_amount || 0), 0) || 0;
      
      if (recentRevenue > 0) {
        const expenseRatio = (recentCashOut / recentRevenue) * 100;
        response += `- **Operating Expense Ratio**: ${expenseRatio.toFixed(1)}%\n`;
        
        if (expenseRatio > 70) {
          response += `- **Alert**: High expense ratio - review costs and pricing\n`;
        } else if (expenseRatio < 40) {
          response += `- **Good**: Healthy expense ratio - room for growth investments\n`;
        }
      }
    }
    
    response += `\n---\n*Operational intelligence from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error in operational analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function getAiInsights(restaurantId: string, insightType: string = 'all') {
  console.error(`Getting AI insights for ${restaurantId} (${insightType})`);
  
  try {
    const queries = [];
    
    if (insightType === 'all' || insightType === 'ai') {
      queries.push(supabase.from('ai_insights').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }));
    }
    
    if (insightType === 'all' || insightType === 'fudi') {
      queries.push(supabase.from('fudi_insights').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }));
    }
    
    if (insightType === 'all' || insightType === 'patterns') {
      queries.push(supabase.from('fudi_learned_patterns').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }));
    }
    
    const results = await Promise.all(queries);
    
    let response = `# 🤖 AI INSIGHTS & RECOMMENDATIONS\n\n`;
    
    let resultIndex = 0;
    
    if (insightType === 'all' || insightType === 'ai') {
      const aiInsights = results[resultIndex++]?.data;
      if (aiInsights && aiInsights.length > 0) {
        response += `## 🎯 AI-Generated Insights\n`;
        aiInsights.slice(0, 10).forEach(insight => {
          response += `### ${insight.insight_type || 'General'}\n`;
          response += `${insight.insight_text}\n`;
          if (insight.confidence_score) {
            response += `*Confidence: ${(insight.confidence_score * 100).toFixed(1)}%*\n`;
          }
          response += `*Generated: ${new Date(insight.created_at).toLocaleDateString()}*\n\n`;
        });
      }
    }
    
    if (insightType === 'all' || insightType === 'fudi') {
      const fudiInsights = results[resultIndex++]?.data;
      if (fudiInsights && fudiInsights.length > 0) {
        response += `## 🍽️ Fudi AI Recommendations\n`;
        fudiInsights.slice(0, 10).forEach(insight => {
          response += `### ${insight.category || 'Recommendation'}\n`;
          response += `${insight.recommendation_text || insight.insight}\n`;
          if (insight.impact_score) {
            response += `*Expected Impact: ${insight.impact_score}/10*\n`;
          }
          response += `*Date: ${new Date(insight.created_at).toLocaleDateString()}*\n\n`;
        });
      }
    }
    
    if (insightType === 'all' || insightType === 'patterns') {
      const patterns = results[resultIndex++]?.data;
      if (patterns && patterns.length > 0) {
        response += `## 📈 Learned Patterns\n`;
        patterns.slice(0, 10).forEach(pattern => {
          response += `### ${pattern.pattern_type || 'Pattern'}\n`;
          response += `${pattern.pattern_description}\n`;
          if (pattern.frequency) {
            response += `*Frequency: ${pattern.frequency}*\n`;
          }
          if (pattern.confidence) {
            response += `*Confidence: ${(pattern.confidence * 100).toFixed(1)}%*\n`;
          }
          response += `*Identified: ${new Date(pattern.created_at).toLocaleDateString()}*\n\n`;
        });
      }
    }
    
    if (response === `# 🤖 AI INSIGHTS & RECOMMENDATIONS\n\n`) {
      response += `No AI insights available for this restaurant yet.\n\n`;
      response += `AI insights are generated automatically as your restaurant data grows. Check back in a few days!\n`;
    }
    
    response += `\n---\n*AI-powered insights from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error getting AI insights: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function analyzeInventoryManagement(restaurantId: string, includeMovements: boolean = true, optimizationLevel: string = 'advanced') {
  console.error(`Inventory analysis for ${restaurantId} (${optimizationLevel})`);
  
  try {
    const queries = [
      supabase.from('inventory_items').select('*').eq('restaurant_id', restaurantId),
      supabase.from('poster_ingredients').select('*').eq('restaurant_id', restaurantId),
      supabase.from('poster_supplies').select('*').eq('restaurant_id', restaurantId)
    ];
    
    if (includeMovements) {
      queries.push(supabase.from('inventory_movements').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(100));
    }
    
    const [
      { data: inventoryItems },
      { data: ingredients },
      { data: supplies },
      movementsResult
    ] = await Promise.all(queries);
    
    const movements = includeMovements ? movementsResult?.data : null;
    
    let response = `# 📦 INVENTORY MANAGEMENT ANALYSIS\n\n`;
    
    // Inventory Overview
    response += `## 📊 Inventory Overview\n`;
    response += `- **Total Inventory Items**: ${inventoryItems?.length || 0}\n`;
    response += `- **Ingredients Tracked**: ${ingredients?.length || 0}\n`;
    response += `- **Supplies Tracked**: ${supplies?.length || 0}\n`;
    
    if (movements) {
      response += `- **Recent Movements**: ${movements.length} in last period\n`;
    }
    
    response += '\n';
    
    // Current Stock Levels
    if (inventoryItems && inventoryItems.length > 0) {
      response += `## 📋 Current Stock Status\n`;
      
      const lowStockItems = inventoryItems.filter(item => 
        item.current_quantity && item.minimum_quantity && 
        item.current_quantity <= item.minimum_quantity
      );
      
      const outOfStockItems = inventoryItems.filter(item => 
        item.current_quantity === 0 || item.current_quantity === null
      );
      
      response += `- **Low Stock Items**: ${lowStockItems.length}\n`;
      response += `- **Out of Stock Items**: ${outOfStockItems.length}\n`;
      
      if (lowStockItems.length > 0) {
        response += `\n### ⚠️ Low Stock Alerts\n`;
        lowStockItems.slice(0, 10).forEach(item => {
          response += `- **${item.item_name}**: ${item.current_quantity} ${item.unit} (min: ${item.minimum_quantity})\n`;
        });
        response += '\n';
      }
      
      if (outOfStockItems.length > 0) {
        response += `### 🚨 Out of Stock\n`;
        outOfStockItems.slice(0, 5).forEach(item => {
          response += `- **${item.item_name}**: NEEDS IMMEDIATE RESTOCKING\n`;
        });
        response += '\n';
      }
    }
    
    // Ingredient Analysis
    if (ingredients && ingredients.length > 0) {
      response += `## 🥘 Ingredient Management\n`;
      
      const expiringSoon = ingredients.filter(ingredient => {
        if (!ingredient.expiry_date) return false;
        const expiryDate = new Date(ingredient.expiry_date);
        const daysUntilExpiry = (expiryDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
        return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
      });
      
      const expired = ingredients.filter(ingredient => {
        if (!ingredient.expiry_date) return false;
        const expiryDate = new Date(ingredient.expiry_date);
        return expiryDate < new Date();
      });
      
      response += `- **Total Ingredients**: ${ingredients.length}\n`;
      response += `- **Expiring Soon (7 days)**: ${expiringSoon.length}\n`;
      response += `- **Expired**: ${expired.length}\n`;
      
      if (expiringSoon.length > 0) {
        response += `\n### ⏰ Expiring Soon\n`;
        expiringSoon.forEach(ingredient => {
          const daysLeft = Math.ceil((new Date(ingredient.expiry_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
          response += `- **${ingredient.ingredient_name}**: ${daysLeft} days left\n`;
        });
        response += '\n';
      }
      
      if (expired.length > 0) {
        response += `### ❌ Expired Items\n`;
        expired.forEach(ingredient => {
          response += `- **${ingredient.ingredient_name}**: EXPIRED - Remove immediately\n`;
        });
        response += '\n';
      }
    }
    
    // Movement Analysis
    if (movements && movements.length > 0) {
      response += `## 📈 Inventory Movement Analysis\n`;
      
      const movementsByType = movements.reduce((acc, movement) => {
        acc[movement.movement_type] = (acc[movement.movement_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      response += `### Movement Types\n`;
      Object.entries(movementsByType).forEach(([type, count]) => {
        response += `- **${type}**: ${count} movements\n`;
      });
      
      const recentUsage = movements
        .filter(m => m.movement_type === 'usage' || m.movement_type === 'consumption')
        .slice(0, 20);
      
      if (recentUsage.length > 0) {
        const usageByItem = recentUsage.reduce((acc, movement) => {
          const item = movement.item_name || movement.item_id;
          acc[item] = (acc[item] || 0) + (movement.quantity || 0);
          return acc;
        }, {} as Record<string, number>);
        
        const topUsedItems = Object.entries(usageByItem)
          .sort((a, b) => (b[1] as number) - (a[1] as number))
          .slice(0, 5);
        
        response += `\n### Top Used Items (Recent)\n`;
        topUsedItems.forEach(([item, quantity]) => {
          response += `- **${item}**: ${quantity} units consumed\n`;
        });
      }
      
      response += '\n';
    }
    
    // Optimization Recommendations
    if (optimizationLevel === 'advanced') {
      response += `## 💡 Inventory Optimization Recommendations\n`;
      
      if (inventoryItems && inventoryItems.length > 0) {
        const averageStockLevel = inventoryItems
          .filter(item => item.current_quantity)
          .reduce((sum, item) => sum + item.current_quantity, 0) / inventoryItems.filter(item => item.current_quantity).length;
        
        response += `- **Average Stock Level**: ${averageStockLevel.toFixed(1)} units\n`;
        
        const overstockedItems = inventoryItems.filter(item => 
          item.current_quantity && item.maximum_quantity &&
          item.current_quantity > item.maximum_quantity * 0.9
        );
        
        if (overstockedItems.length > 0) {
          response += `- **Overstocked Items**: ${overstockedItems.length} items may be overstocked\n`;
          response += `- **Recommendation**: Consider reducing orders for overstocked items\n`;
        }
        
        const understockedItems = inventoryItems.filter(item => 
          item.current_quantity && item.maximum_quantity &&
          item.current_quantity < item.maximum_quantity * 0.3
        );
        
        if (understockedItems.length > 0) {
          response += `- **Understocked Items**: ${understockedItems.length} items may need restocking\n`;
          response += `- **Recommendation**: Review reorder points for understocked items\n`;
        }
      }
      
      if (movements && movements.length > 0) {
        const averageMovementValue = movements
          .filter(m => m.cost_per_unit && m.quantity)
          .reduce((sum, m) => sum + (m.cost_per_unit * m.quantity), 0) / movements.filter(m => m.cost_per_unit && m.quantity).length;
        
        if (!isNaN(averageMovementValue)) {
          response += `- **Average Movement Value**: ${averageMovementValue.toFixed(2)}\n`;
        }
        
        const wasteMovements = movements.filter(m => m.movement_type === 'waste' || m.movement_type === 'expired');
        if (wasteMovements.length > 0) {
          response += `- **Waste Alert**: ${wasteMovements.length} waste movements detected\n`;
          response += `- **Recommendation**: Review portion sizes and ordering patterns to reduce waste\n`;
        }
      }
    }
    
    response += `\n---\n*Inventory intelligence from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error in inventory analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function financialDeepDive(restaurantId: string, analysisPeriod: string = 'all', includeForecasting: boolean = true) {
  console.error(`Financial analysis for ${restaurantId} (${analysisPeriod})`);
  
  try {
    const [
      { data: transactions },
      { data: cashFlows },
      { data: purchases },
      { data: dailyStats }
    ] = await Promise.all([
      supabase.from('poster_transactions').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }),
      supabase.from('cash_flows').select('*').eq('restaurant_id', restaurantId).order('date', { ascending: false }),
      supabase.from('purchases').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }),
      supabase.from('intelligent_metrics').select('*').eq('restaurant_id', restaurantId).order('date', { ascending: false })
    ]);
    
    let response = `# 💰 FINANCIAL DEEP DIVE ANALYSIS\n\n`;
    
    // Revenue Analysis
    if (transactions && transactions.length > 0) {
      const totalRevenue = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
      const totalOrders = transactions.length;
      const avgTicket = totalRevenue / totalOrders;
      
      response += `## 📈 Revenue Performance\n`;
      response += `- **Total Revenue**: ${totalRevenue.toFixed(2)}\n`;
      response += `- **Total Orders**: ${totalOrders}\n`;
      response += `- **Average Ticket**: ${avgTicket.toFixed(2)}\n`;
      
      // Monthly revenue trend
      const monthlyRevenue = new Map();
      transactions.forEach(transaction => {
        const monthKey = transaction.created_at.substring(0, 7); // YYYY-MM
        monthlyRevenue.set(monthKey, (monthlyRevenue.get(monthKey) || 0) + (transaction.total_amount || 0));
      });
      
      const revenueByMonth = Array.from(monthlyRevenue.entries()).sort();
      if (revenueByMonth.length > 1) {
        const [firstMonth, firstRevenue] = revenueByMonth[0];
        const [lastMonth, lastRevenue] = revenueByMonth[revenueByMonth.length - 1];
        const growthRate = ((lastRevenue - firstRevenue) / firstRevenue) * 100;
        
        response += `- **Revenue Growth**: ${growthRate.toFixed(1)}% (${firstMonth} to ${lastMonth})\n`;
      }
      
      response += '\n';
    }
    
    // Cost Analysis
    if (purchases && purchases.length > 0) {
      const totalCosts = purchases.reduce((sum, p) => sum + (p.total_amount || 0), 0);
      response += `## 💸 Cost Analysis\n`;
      response += `- **Total Purchases**: ${totalCosts.toFixed(2)}\n`;
      
      if (transactions) {
        const totalRevenue = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
        const costRatio = (totalCosts / totalRevenue) * 100;
        response += `- **Cost-to-Revenue Ratio**: ${costRatio.toFixed(1)}%\n`;
        
        const grossProfit = totalRevenue - totalCosts;
        const grossMargin = (grossProfit / totalRevenue) * 100;
        response += `- **Gross Profit**: ${grossProfit.toFixed(2)}\n`;
        response += `- **Gross Margin**: ${grossMargin.toFixed(1)}%\n`;
      }
      
      response += '\n';
    }
    
    // Cash Flow Analysis
    if (cashFlows && cashFlows.length > 0) {
      const totalCashIn = cashFlows.reduce((sum, cf) => sum + (cf.amount_in || 0), 0);
      const totalCashOut = cashFlows.reduce((sum, cf) => sum + (cf.amount_out || 0), 0);
      const netCashFlow = totalCashIn - totalCashOut;
      
      response += `## 💵 Cash Flow Analysis\n`;
      response += `- **Total Cash In**: ${totalCashIn.toFixed(2)}\n`;
      response += `- **Total Cash Out**: ${totalCashOut.toFixed(2)}\n`;
      response += `- **Net Cash Flow**: ${netCashFlow.toFixed(2)}\n`;
      
      const operatingCashFlowRatio = transactions ? 
        (netCashFlow / transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0)) * 100 : 0;
      
      if (operatingCashFlowRatio !== 0) {
        response += `- **Operating Cash Flow Ratio**: ${operatingCashFlowRatio.toFixed(1)}%\n`;
      }
      
      response += '\n';
    }
    
    // Profitability Analysis
    if (dailyStats && dailyStats.length > 0) {
      response += `## 📊 Profitability Trends\n`;
      
      const profitablesDays = dailyStats.filter(day => day.total_revenue && day.total_revenue > 0);
      const avgDailyRevenue = profitablesDays.reduce((sum, day) => sum + day.total_revenue, 0) / profitablesDays.length;
      
      response += `- **Average Daily Revenue**: ${avgDailyRevenue.toFixed(2)}\n`;
      response += `- **Profitable Days**: ${profitablesDays.length} of ${dailyStats.length}\n`;
      
      const bestDay = profitablesDays.reduce((best, day) => day.total_revenue > best.total_revenue ? day : best);
      const worstDay = profitablesDays.reduce((worst, day) => day.total_revenue < worst.total_revenue ? day : worst);
      
      response += `- **Best Day**: ${bestDay.date} (${bestDay.total_revenue.toFixed(2)})\n`;
      response += `- **Worst Day**: ${worstDay.date} (${worstDay.total_revenue.toFixed(2)})\n`;
      
      response += '\n';
    }
    
    // Financial Health Indicators
    response += `## 🏥 Financial Health Indicators\n`;
    
    if (transactions && purchases) {
      const totalRevenue = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
      const totalCosts = purchases.reduce((sum, p) => sum + (p.total_amount || 0), 0);
      const profitMargin = ((totalRevenue - totalCosts) / totalRevenue) * 100;
      
      response += `- **Profit Margin**: ${profitMargin.toFixed(1)}%\n`;
      
      if (profitMargin > 20) {
        response += `- **Health Status**: Excellent profitability 🟢\n`;
      } else if (profitMargin > 10) {
        response += `- **Health Status**: Good profitability 🟡\n`;
      } else if (profitMargin > 0) {
        response += `- **Health Status**: Low profitability 🟠\n`;
      } else {
        response += `- **Health Status**: Operating at loss 🔴\n`;
      }
    }
    
    if (cashFlows) {
      const recentCashFlows = cashFlows.slice(0, 30); // Last 30 entries
      const avgCashIn = recentCashFlows.reduce((sum, cf) => sum + (cf.amount_in || 0), 0) / 30;
      const avgCashOut = recentCashFlows.reduce((sum, cf) => sum + (cf.amount_out || 0), 0) / 30;
      
      response += `- **Daily Cash Flow**: ${(avgCashIn - avgCashOut).toFixed(2)} average\n`;
      
      if (avgCashIn > avgCashOut * 1.2) {
        response += `- **Liquidity**: Strong cash position 🟢\n`;
      } else if (avgCashIn > avgCashOut) {
        response += `- **Liquidity**: Positive cash flow 🟡\n`;
      } else {
        response += `- **Liquidity**: Cash flow concerns 🔴\n`;
      }
    }
    
    // Forecasting
    if (includeForecasting && dailyStats && dailyStats.length > 30) {
      response += `\n## 🔮 Financial Forecasting\n`;
      
      const last30Days = dailyStats.slice(0, 30);
      const previous30Days = dailyStats.slice(30, 60);
      
      const currentPeriodRevenue = last30Days.reduce((sum, day) => sum + (day.total_revenue || 0), 0);
      const previousPeriodRevenue = previous30Days.reduce((sum, day) => sum + (day.total_revenue || 0), 0);
      
      const growthRate = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;
      const nextMonthProjection = currentPeriodRevenue * (1 + (growthRate / 100));
      
      response += `- **Current Month Trend**: ${growthRate.toFixed(1)}% vs previous period\n`;
      response += `- **Next Month Projection**: ${nextMonthProjection.toFixed(2)}\n`;
      
      // Seasonal analysis
      const monthlyData = new Map();
      dailyStats.forEach(day => {
        const month = new Date(day.date).getMonth();
        if (!monthlyData.has(month)) {
          monthlyData.set(month, []);
        }
        monthlyData.get(month).push(day.total_revenue || 0);
      });
      
      const monthlyAverages = Array.from(monthlyData.entries()).map(([month, revenues]) => ({
        month,
        avg: revenues.reduce((sum: any, rev: any) => sum + rev, 0) / revenues.length
      }));
      
      if (monthlyAverages.length > 2) {
        const bestMonth = monthlyAverages.reduce((best, current) => current.avg > best.avg ? current : best);
        const worstMonth = monthlyAverages.reduce((worst, current) => current.avg < worst.avg ? current : worst);
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        response += `- **Best Historical Month**: ${monthNames[bestMonth.month]} (${bestMonth.avg.toFixed(2)} avg daily)\n`;
        response += `- **Slowest Month**: ${monthNames[worstMonth.month]} (${worstMonth.avg.toFixed(2)} avg daily)\n`;
      }
    }
    
    // Financial Recommendations
    response += `\n## 💡 Financial Recommendations\n`;
    
    if (transactions && purchases) {
      const totalRevenue = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
      const totalCosts = purchases.reduce((sum, p) => sum + (p.total_amount || 0), 0);
      const costRatio = (totalCosts / totalRevenue) * 100;
      
      if (costRatio > 70) {
        response += `- **Cost Control**: High cost ratio (${costRatio.toFixed(1)}%) - review supplier pricing and menu pricing\n`;
      } else if (costRatio < 30) {
        response += `- **Growth Opportunity**: Low cost ratio (${costRatio.toFixed(1)}%) - consider expansion or menu enhancement\n`;
      } else {
        response += `- **Cost Management**: Healthy cost ratio (${costRatio.toFixed(1)}%) - maintain current efficiency\n`;
      }
    }
    
    if (dailyStats && dailyStats.length > 0) {
      const recentDays = dailyStats.slice(0, 7);
      const recentAvg = recentDays.reduce((sum, day) => sum + (day.total_revenue || 0), 0) / 7;
      const overallAvg = dailyStats.reduce((sum, day) => sum + (day.total_revenue || 0), 0) / dailyStats.length;
      
      if (recentAvg > overallAvg * 1.1) {
        response += `- **Performance**: Recent performance is ${((recentAvg / overallAvg - 1) * 100).toFixed(1)}% above average - great momentum!\n`;
      } else if (recentAvg < overallAvg * 0.9) {
        response += `- **Performance**: Recent performance is ${((1 - recentAvg / overallAvg) * 100).toFixed(1)}% below average - focus on marketing and operations\n`;
      }
    }
    
    response += `\n---\n*Financial intelligence from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error in financial analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function competitiveBenchmarking(restaurantId: string, benchmarkType: string = 'complete') {
  console.error(`Competitive benchmarking for ${restaurantId} (${benchmarkType})`);
  
  try {
    // Get current restaurant data
    const [
      { data: restaurant },
      { data: metrics },
      { data: topProducts },
      { data: transactions }
    ] = await Promise.all([
      supabase.from('restaurants').select('*').eq('id', restaurantId).single(),
      supabase.from('intelligent_metrics').select('*').eq('restaurant_id', restaurantId).order('date', { ascending: false }).limit(30),
      supabase.from('intelligent_top_products').select('*').eq('restaurant_id', restaurantId).order('quantity_sold', { ascending: false }).limit(10),
      supabase.from('poster_transactions').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(100)
    ]);
    
    // Get industry benchmarks (from other restaurants - anonymized)
    const { data: industryMetrics } = await supabase
      .from('intelligent_metrics')
      .select('total_revenue, total_orders, average_ticket')
      .neq('restaurant_id', restaurantId)
      .order('date', { ascending: false })
      .limit(1000);
    
    let response = `# 🏆 COMPETITIVE BENCHMARKING ANALYSIS\n\n`;
    
    if (!restaurant) {
      return 'Restaurant not found for benchmarking.';
    }
    
    response += `## 🎯 Restaurant Profile: ${restaurant.name}\n`;
    response += `- **Location**: ${restaurant.country_code || 'Unknown'}\n`;
    response += `- **POS System**: ${restaurant.pos_system || restaurant.pos_type}\n`;
    response += `- **Subscription Tier**: ${restaurant.subscription_tier || restaurant.subscription_plan}\n\n`;
    
    // Performance Benchmarking
    if (metrics && metrics.length > 0 && industryMetrics && industryMetrics.length > 0) {
      response += `## 📊 Performance vs Industry\n`;
      
      // Calculate restaurant averages
      const restaurantAvgRevenue = metrics.reduce((sum, m) => sum + (m.total_revenue || 0), 0) / metrics.length;
      const restaurantAvgOrders = metrics.reduce((sum, m) => sum + (m.total_orders || 0), 0) / metrics.length;
      const restaurantAvgTicket = restaurantAvgRevenue / restaurantAvgOrders;
      
      // Calculate industry averages
      const validIndustryMetrics = industryMetrics.filter(m => m.total_revenue && m.total_orders);
      const industryAvgRevenue = validIndustryMetrics.reduce((sum, m) => sum + m.total_revenue, 0) / validIndustryMetrics.length;
      const industryAvgOrders = validIndustryMetrics.reduce((sum, m) => sum + m.total_orders, 0) / validIndustryMetrics.length;
      const industryAvgTicket = validIndustryMetrics.reduce((sum, m) => sum + m.average_ticket, 0) / validIndustryMetrics.length;
      
      // Compare performance
      const revenueComparison = ((restaurantAvgRevenue / industryAvgRevenue - 1) * 100);
      const ordersComparison = ((restaurantAvgOrders / industryAvgOrders - 1) * 100);
      const ticketComparison = ((restaurantAvgTicket / industryAvgTicket - 1) * 100);
      
      response += `### 💰 Revenue Performance\n`;
      response += `- **Your Average**: ${restaurantAvgRevenue.toFixed(2)}/day\n`;
      response += `- **Industry Average**: ${industryAvgRevenue.toFixed(2)}/day\n`;
      response += `- **Performance**: ${revenueComparison > 0 ? '+' : ''}${revenueComparison.toFixed(1)}% vs industry\n`;
      response += `- **Percentile**: ${revenueComparison > 20 ? '🟢 Top 25%' : revenueComparison > 0 ? '🟡 Above Average' : revenueComparison > -20 ? '🟠 Below Average' : '🔴 Bottom 25%'}\n\n`;
      
      response += `### 📦 Order Volume\n`;
      response += `- **Your Average**: ${restaurantAvgOrders.toFixed(1)} orders/day\n`;
      response += `- **Industry Average**: ${industryAvgOrders.toFixed(1)} orders/day\n`;
      response += `- **Performance**: ${ordersComparison > 0 ? '+' : ''}${ordersComparison.toFixed(1)}% vs industry\n`;
      response += `- **Percentile**: ${ordersComparison > 20 ? '🟢 Top 25%' : ordersComparison > 0 ? '🟡 Above Average' : ordersComparison > -20 ? '🟠 Below Average' : '🔴 Bottom 25%'}\n\n`;
      
      response += `### 🎫 Average Ticket Size\n`;
      response += `- **Your Average**: ${restaurantAvgTicket.toFixed(2)}\n`;
      response += `- **Industry Average**: ${industryAvgTicket.toFixed(2)}\n`;
      response += `- **Performance**: ${ticketComparison > 0 ? '+' : ''}${ticketComparison.toFixed(1)}% vs industry\n`;
      response += `- **Percentile**: ${ticketComparison > 20 ? '🟢 Top 25%' : ticketComparison > 0 ? '🟡 Above Average' : ticketComparison > -20 ? '🟠 Below Average' : '🔴 Bottom 25%'}\n\n`;
    }
    
    // Efficiency Benchmarking
    if (transactions && transactions.length > 0) {
      response += `## ⚡ Operational Efficiency\n`;
      
      // Calculate transactions per hour (assuming 12-hour operation day)
      const dailyTransactions = transactions.length / 7; // Assuming last week
      const transactionsPerHour = dailyTransactions / 12;
      
      response += `- **Transactions per Hour**: ${transactionsPerHour.toFixed(1)}\n`;
      
      // Industry benchmarks (estimated)
      const industryTransactionsPerHour = 8.5; // Industry average
      const efficiencyComparison = ((transactionsPerHour / industryTransactionsPerHour - 1) * 100);
      
      response += `- **Industry Benchmark**: ${industryTransactionsPerHour} transactions/hour\n`;
      response += `- **Efficiency**: ${efficiencyComparison > 0 ? '+' : ''}${efficiencyComparison.toFixed(1)}% vs industry\n`;
      
      if (efficiencyComparison > 20) {
        response += `- **Status**: 🟢 High efficiency - excellent throughput\n`;
      } else if (efficiencyComparison > 0) {
        response += `- **Status**: 🟡 Above average efficiency\n`;
      } else if (efficiencyComparison > -20) {
        response += `- **Status**: 🟠 Below average - room for improvement\n`;
      } else {
        response += `- **Status**: 🔴 Low efficiency - needs optimization\n`;
      }
      
      response += '\n';
    }
    
    // Product Portfolio Benchmarking
    if (topProducts && topProducts.length > 0) {
      response += `## 🍽️ Product Portfolio Analysis\n`;
      
      const totalProductSales = topProducts.reduce((sum, p) => sum + (p.quantity_sold || 0), 0);
      const topProductShare = (topProducts[0].quantity_sold / totalProductSales) * 100;
      
      response += `- **Menu Diversity**: ${topProducts.length} tracked products\n`;
      response += `- **Top Product Share**: ${topProductShare.toFixed(1)}% of sales\n`;
      
      // Industry benchmarks
      if (topProductShare > 40) {
        response += `- **Portfolio Risk**: 🔴 High dependency on one product\n`;
        response += `- **Recommendation**: Diversify menu to reduce risk\n`;
      } else if (topProductShare > 25) {
        response += `- **Portfolio Risk**: 🟡 Moderate dependency\n`;
        response += `- **Recommendation**: Consider promoting other items\n`;
      } else {
        response += `- **Portfolio Risk**: 🟢 Well-diversified menu\n`;
        response += `- **Recommendation**: Maintain current diversity\n`;
      }
      
      response += '\n';
    }
    
    // Growth Potential Assessment
    response += `## 🚀 Growth Potential Assessment\n`;
    
    let growthScore = 0;
    let maxScore = 0;
    
    if (metrics && industryMetrics) {
      const restaurantAvgRevenue = metrics.reduce((sum, m) => sum + (m.total_revenue || 0), 0) / metrics.length;
      const industryAvgRevenue = industryMetrics.reduce((sum, m) => sum + (m.total_revenue || 0), 0) / industryMetrics.length;
      
      if (restaurantAvgRevenue > industryAvgRevenue * 1.2) {
        growthScore += 3;
        response += `- **Revenue Performance**: 🟢 Excellent (+3 points)\n`;
      } else if (restaurantAvgRevenue > industryAvgRevenue) {
        growthScore += 2;
        response += `- **Revenue Performance**: 🟡 Above Average (+2 points)\n`;
      } else {
        growthScore += 1;
        response += `- **Revenue Performance**: 🟠 Below Average (+1 point)\n`;
      }
      maxScore += 3;
    }
    
    if (restaurant.subscription_tier === 'pro' || restaurant.subscription_plan === 'pro') {
      growthScore += 2;
      response += `- **Technology Adoption**: 🟢 Advanced tools (+2 points)\n`;
    } else {
      growthScore += 1;
      response += `- **Technology Adoption**: 🟡 Basic tools (+1 point)\n`;
    }
    maxScore += 2;
    
    if (topProducts && topProducts.length > 5) {
      growthScore += 2;
      response += `- **Menu Diversity**: 🟢 Good variety (+2 points)\n`;
    } else {
      growthScore += 1;
      response += `- **Menu Diversity**: 🟡 Limited variety (+1 point)\n`;
    }
    maxScore += 2;
    
    const growthPercentage = (growthScore / maxScore) * 100;
    
    response += `\n**Overall Growth Potential**: ${growthScore}/${maxScore} (${growthPercentage.toFixed(0)}%)\n`;
    
    if (growthPercentage >= 80) {
      response += `**Assessment**: 🟢 High growth potential - ready for expansion\n`;
    } else if (growthPercentage >= 60) {
      response += `**Assessment**: 🟡 Moderate growth potential - optimize current operations\n`;
    } else {
      response += `**Assessment**: 🟠 Focus on improving fundamentals before expansion\n`;
    }
    
    // Action Plan
    response += `\n## 📋 Strategic Action Plan\n`;
    
    if (metrics && industryMetrics) {
      const restaurantAvgRevenue = metrics.reduce((sum, m) => sum + (m.total_revenue || 0), 0) / metrics.length;
      const industryAvgRevenue = industryMetrics.reduce((sum, m) => sum + (m.total_revenue || 0), 0) / industryMetrics.length;
      
      if (restaurantAvgRevenue < industryAvgRevenue * 0.8) {
        response += `1. **Revenue Growth**: Focus on increasing average ticket and order frequency\n`;
        response += `2. **Marketing**: Implement targeted marketing campaigns\n`;
        response += `3. **Menu Optimization**: Review pricing and popular items\n`;
      } else if (restaurantAvgRevenue > industryAvgRevenue * 1.2) {
        response += `1. **Scale Operations**: Consider opening additional locations\n`;
        response += `2. **Premium Positioning**: Leverage strong performance for premium pricing\n`;
        response += `3. **Franchise Opportunities**: Explore franchising model\n`;
      } else {
        response += `1. **Operational Excellence**: Fine-tune current operations\n`;
        response += `2. **Customer Experience**: Focus on service quality improvements\n`;
        response += `3. **Digital Presence**: Enhance online ordering and marketing\n`;
      }
    }
    
    response += `\n---\n*Competitive intelligence from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error in competitive analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// 🌐 MCP HTTP HANDLER
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
            name: 'fudiverse-ai-ferrari',
            version: '2.0.0'
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
      
      // Extract API key from args (temporarily using demo key for Chicken Chicanito)
      const apiKey = args.api_key || 'fudi_demo_chicken_chicanito_2025';
      
      // Validate API key and get restaurant
      const authData = await validateApiKey(apiKey);
      if (!authData) {
        return NextResponse.json({
          jsonrpc: '2.0',
          id: body.id,
          error: {
            code: -32001,
            message: 'Invalid API key'
          }
        }, { headers });
      }
      
      const restaurantId = authData.restaurant_id;
      let result;

      switch (name) {
        case 'query_restaurant_data':
          result = await queryRestaurantData(args.query, args.description);
          break;
        case 'get_complete_restaurant_overview':
          result = await getCompleteRestaurantOverview(restaurantId, args.include_insights);
          break;
        case 'analyze_sales_performance':
          result = await analyzeSalesPerformance(restaurantId, args.start_date, args.end_date, args.granularity);
          break;
        case 'analyze_product_performance':
          result = await analyzeProductPerformance(restaurantId, args.analysis_type, args.time_period);
          break;
        case 'analyze_customer_behavior':
          result = await analyzeCustomerBehavior(restaurantId, args.analysis_depth);
          break;
        case 'analyze_operational_efficiency':
          result = await analyzeOperationalEfficiency(restaurantId, args.include_employees, args.include_cash_flow);
          break;
        case 'get_ai_insights':
          result = await getAiInsights(restaurantId, args.insight_type);
          break;
        case 'analyze_inventory_management':
          result = await analyzeInventoryManagement(restaurantId, args.include_movements, args.optimization_level);
          break;
        case 'financial_deep_dive':
          result = await financialDeepDive(restaurantId, args.analysis_period, args.include_forecasting);
          break;
        case 'competitive_benchmarking':
          result = await competitiveBenchmarking(restaurantId, args.benchmark_type);
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// (Removed invalid "Staff Info" and related code block that referenced undefined variables)

async function analyzeSalesPerformance(restaurantId: string, startDate?: string, endDate?: string, granularity: string = 'daily') {
  console.error(`Deep sales analysis for ${restaurantId} (${granularity})`);
  
  try {
    let query = supabase
      .from('poster_transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: true });
    
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    const { data: transactions } = await query;
    
    if (!transactions || transactions.length === 0) {
      return 'No transaction data available for the specified period.';
    }
    
    // Group by granularity
    const groupedData = new Map();
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.created_at);
      let key;
      
      switch (granularity) {
        case 'weekly':
          const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default: // daily
          key = transaction.created_at.split('T')[0];
      }
      
      if (!groupedData.has(key)) {
        groupedData.set(key, {
          date: key,
          revenue: 0,
          orders: 0,
          transactions: []
        });
      }
      
      const group = groupedData.get(key);
      group.revenue += transaction.total_amount || 0;
      group.orders += 1;
      group.transactions.push(transaction);
    });
    
    const results = Array.from(groupedData.values()).sort((a, b) => a.date.localeCompare(b.date));
    
    let response = `# 📈 DEEP SALES ANALYSIS\n\n`;
    
    // Summary Statistics
    const totalRevenue = results.reduce((sum, period) => sum + period.revenue, 0);
    const totalOrders = results.reduce((sum, period) => sum + period.orders, 0);
    const avgRevenue = totalRevenue / results.length;
    const avgOrders = totalOrders / results.length;
    
    response += `## 💰 Summary Statistics\n`;
    response += `- **Total Revenue**: $${totalRevenue.toFixed(2)}\n`;
    response += `- **Total Orders**: ${totalOrders}\n`;
    response += `- **Average ${granularity.charAt(0).toUpperCase() + granularity.slice(1)} Revenue**: $${avgRevenue.toFixed(2)}\n`;
    response += `- **Average ${granularity.charAt(0).toUpperCase() + granularity.slice(1)} Orders**: ${avgOrders.toFixed(1)}\n`;
    response += `- **Average Ticket**: $${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}\n\n`;
    
    // Performance Trends
    if (results.length > 1) {
      const firstPeriod = results[0];
      const lastPeriod = results[results.length - 1];
      const revenueGrowth = ((lastPeriod.revenue - firstPeriod.revenue) / firstPeriod.revenue) * 100;
      const orderGrowth = ((lastPeriod.orders - firstPeriod.orders) / firstPeriod.orders) * 100;
      
      response += `## 📊 Growth Trends\n`;
      response += `- **Revenue Growth**: ${revenueGrowth.toFixed(1)}%\n`;
      response += `- **Order Growth**: ${orderGrowth.toFixed(1)}%\n\n`;
    }
    
    // Best and Worst Periods
    const bestPeriod = results.reduce((best, period) => period.revenue > best.revenue ? period : best);
    const worstPeriod = results.reduce((worst, period) => period.revenue < worst.revenue ? period : worst);
    
    response += `## 🏆 Performance Highlights\n`;
    response += `- **Best Period**: ${bestPeriod.date} - $${bestPeriod.revenue.toFixed(2)} (${bestPeriod.orders} orders)\n`;
    response += `- **Lowest Period**: ${worstPeriod.date} - $${worstPeriod.revenue.toFixed(2)} (${worstPeriod.orders} orders)\n\n`;
    
    // Detailed Breakdown (show last 10 periods)
    response += `## 📋 Recent Performance Breakdown\n`;
    results.slice(-10).forEach(period => {
      const avgTicket = period.orders > 0 ? period.revenue / period.orders : 0;
      response += `**${period.date}**: $${period.revenue.toFixed(2)} | ${period.orders} orders | $${avgTicket.toFixed(2)} avg\n`;
    });
    
    response += `\n---\n*Deep analysis from ${transactions.length} real transactions*`;
    
    return response;
    
  } catch (error) {
    return `Error in sales analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function analyzeProductPerformance(restaurantId: string, analysisType: string = 'complete', timePeriod: string = 'all') {
  console.error(`Product analysis for ${restaurantId} (${analysisType}, ${timePeriod})`);
  
  try {
    const [
      { data: topProducts },
      { data: abcAnalysis },
      { data: transactionProducts },
      { data: posterProducts }
    ] = await Promise.all([
      supabase.from('intelligent_top_products').select('*').eq('restaurant_id', restaurantId).order('quantity_sold', { ascending: false }),
      supabase.from('abc_analysis').select('*').eq('restaurant_id', restaurantId),
      supabase.from('poster_transaction_products').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(1000),
      supabase.from('poster_products').select('*').eq('restaurant_id', restaurantId)
    ]);
    
    let response = `# 🍽️ COMPLETE PRODUCT ANALYSIS\n\n`;
    
    // Product Portfolio Overview
    response += `## 📊 Product Portfolio\n`;
    response += `- **Total Products in Menu**: ${posterProducts?.length || 0}\n`;
    response += `- **Products with Sales Data**: ${topProducts?.length || 0}\n`;
    response += `- **ABC Analysis Categories**: ${abcAnalysis?.length || 0}\n\n`;
    
    // Top Performers
    if (topProducts && topProducts.length > 0) {
      response += `## 🏆 Top Performing Products\n`;
      topProducts.slice(0, 10).forEach((product, index) => {
        response += `${index + 1}. **${product.product_name}**\n`;
        response += `   - Sales: ${product.quantity_sold} units\n`;
        if (product.total_revenue) {
          response += `   - Revenue: $${product.total_revenue.toFixed(2)}\n`;
        }
        if (product.profit_margin) {
          response += `   - Margin: ${product.profit_margin.toFixed(1)}%\n`;
        }
        response += '\n';
      });
    }
    
    // ABC Analysis
    if (abcAnalysis && abcAnalysis.length > 0) {
      const categoryStats = abcAnalysis.reduce((stats, item) => {
        stats[item.category] = (stats[item.category] || 0) + 1;
        return stats;
      }, {} as Record<string, number>);
      
      response += `## 📈 ABC Analysis\n`;
      Object.entries(categoryStats).forEach(([category, count]) => {
        response += `- **Category ${category}**: ${count} products\n`;
      });
      response += '\n';
      
      // Show top items from each category
      ['A', 'B', 'C'].forEach(category => {
        const categoryItems = abcAnalysis.filter(item => item.category === category).slice(0, 3);
        if (categoryItems.length > 0) {
          response += `### Category ${category} Top Items:\n`;
          categoryItems.forEach(item => {
            response += `- ${item.product_name} (${item.revenue_contribution?.toFixed(1) || 'N/A'}% of revenue)\n`;
          });
          response += '\n';
        }
      });
    }
    
    // Recent Transaction Analysis
    if (transactionProducts && transactionProducts.length > 0) {
      const productSales = new Map();
      
      transactionProducts.forEach(tp => {
        const key = tp.product_name || tp.product_id;
        if (!productSales.has(key)) {
          productSales.set(key, { quantity: 0, revenue: 0 });
        }
        const current = productSales.get(key);
        current.quantity += tp.quantity || 0;
        current.revenue += tp.total_price || 0;
      });
      
      const recentTopProducts = Array.from(productSales.entries())
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
      
      response += `## 🔥 Recent Best Sellers\n`;
      recentTopProducts.forEach((product, index) => {
        response += `${index + 1}. **${product.name}**: ${product.quantity} sold, $${product.revenue.toFixed(2)} revenue\n`;
      });
      response += '\n';
    }
    
    // Product Recommendations
    response += `## 💡 Product Optimization Recommendations\n`;
    
    if (topProducts && topProducts.length > 0) {
      const topPerformer = topProducts[0];
      response += `- **Star Product**: ${topPerformer.product_name} is your top seller - consider promoting similar items\n`;
      
      const underPerformers = topProducts.filter(p => p.quantity_sold < topProducts[0].quantity_sold * 0.1);
      if (underPerformers.length > 0) {
        response += `- **Review Menu**: ${underPerformers.length} products have very low sales - consider removal or repricing\n`;
      }
    }
    
    if (abcAnalysis && abcAnalysis.length > 0) {
      const categoryA = abcAnalysis.filter(item => item.category === 'A');
      const categoryC = abcAnalysis.filter(item => item.category === 'C');
      
      if (categoryA.length > 0) {
        response += `- **Focus on Category A**: ${categoryA.length} products drive most revenue - ensure always in stock\n`;
      }
      
      if (categoryC.length > 0) {
        response += `- **Optimize Category C**: ${categoryC.length} products contribute little - review pricing/promotion\n`;
      }
    }
    
    response += `\n---\n*Complete product intelligence from FUDIVERSE AI FERRARI 🏎️*`;
    
    return response;
    
  } catch (error) {
    return `Error in product analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function analyzeCustomerBehavior(restaurantId: string, analysisDepth: string = 'complete') {
  console.error(`Customer behavior analysis for ${restaurantId} (${analysisDepth})`);
  
  try {
    const [
      { data: customers },
      { data: transactions },
      { data: posterClients }
    ] = await Promise.all([
      supabase.from('customers').select('*').eq('restaurant_id', restaurantId),
      supabase.from('poster_transactions').select('*').eq('restaurant_id', restaurantId).order('created_at', { ascending: false }),
      supabase.from('poster_clients').select('*').eq('restaurant_id', restaurantId)
    ]);
    
    let response = `# 👥 CUSTOMER BEHAVIOR ANALYSIS\n\n`;
    
    // Customer Base Overview
    response += `## 📊 Customer Base Overview\n`;
    response += `- **Total Customers**: ${(customers?.length || 0) + (posterClients?.length || 0)}\n`;
    
    if (customers && customers.length > 0) {
      const recentCustomers = customers.filter(c => {
        const daysDiff = (new Date().getTime() - new Date(c.created_at).getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 30;
      });
      response += `- **New Customers (30 days)**: ${recentCustomers.length}\n`;
      response += `- **Customer Growth Rate**: ${((recentCustomers.length / customers.length) * 100).toFixed(1)}%\n`;
    }
    
    // Transaction Patterns
    if (transactions && transactions.length > 0) {
      const customerTransactions = new Map();
      
      transactions.forEach(transaction => {
        const customerId = transaction.client_id || 'anonymous';
        if (!customerTransactions.has(customerId)) {
          customerTransactions.set(customerId, {
            visits: 0,
            totalSpent: 0,
            avgTicket: 0,
            firstVisit: transaction.created_at,
            lastVisit: transaction.created_at
          });
        }
        
        const customer = customerTransactions.get(customerId);
        customer.visits += 1;
        customer.totalSpent += transaction.total_amount || 0;
        
        if (transaction.created_at < customer.firstVisit) {
          customer.firstVisit = transaction.created_at;
        }
        if (transaction.created_at > customer.lastVisit) {
          customer.lastVisit = transaction.created_at;
        }
      });
      
      // Calculate averages
      customerTransactions.forEach(customer => {
        customer.avgTicket = customer.visits > 0 ? customer.totalSpent / customer.visits : 0;
      });
      
      const customerStats = Array.from(customerTransactions.values());
      
      response += `\n## 💰 Spending Patterns\n`;
      const avgSpending = customerStats.reduce((sum, c) => sum + c.totalSpent, 0) / customerStats.length;
      const avgVisits = customerStats.reduce((sum, c) => sum + c.visits, 0) / customerStats.length;
      const avgTicket = customerStats.reduce((sum, c) => sum + c.avgTicket, 0) / customerStats.length;
      
      response += `- **Average Customer Lifetime Value**: $${avgSpending.toFixed(2)}\n`;
      response += `- **Average Visits per Customer**: ${avgVisits.toFixed(1)}\n`;
      response += `- **Average Ticket Size**: $${avgTicket.toFixed(2)}\n`;
      
      // Customer Segmentation
      const highValue = customerStats.filter(c => c.totalSpent > avgSpending * 1.5).length;
      const frequent = customerStats.filter(c => c.visits > avgVisits * 1.5).length;
      const recent = customerStats.filter(c => {
        const daysSinceLastVisit = (new Date().getTime() - new Date(c.lastVisit).getTime()) / (1000 * 3600 * 24);
        return daysSinceLastVisit <= 30;
      }).length;
      
      response += `\n## 🎯 Customer Segmentation\n`;
      response += `- **High-Value Customers**: ${highValue} (${((highValue / customerStats.length) * 100).toFixed(1)}%)\n`;
      response += `- **Frequent Visitors**: ${frequent} (${((frequent / customerStats.length) * 100).toFixed(1)}%)\n`;
      response += `- **Recent Customers**: ${recent} (${((recent / customerStats.length) * 100).toFixed(1)}%)\n`;
      
      // Top Customers
      const topCustomers = customerStats
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);
      
      response += `\n## 🏆 Top Customers by Spending\n`;
      topCustomers.forEach((customer, index) => {
                response += `${index + 1}. Total Spent: $${customer.totalSpent.toFixed(2)} | Visits: ${customer.visits} | Avg Ticket: $${customer.avgTicket.toFixed(2)}\n`;
              });
        
              response += `\n---\n*Customer intelligence from FUDIVERSE AI FERRARI 🏎️*`;
        
            }
        
            return response;
        
          } catch (error) {
            return `Error in customer analysis: ${error instanceof Error ? error.message : 'Unknown error'}`;
          }
        }