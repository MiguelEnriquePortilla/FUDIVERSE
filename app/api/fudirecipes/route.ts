// app/api/fudirecipes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Get restaurant ID from query params
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json(
        { success: false, error: 'Restaurant ID required' },
        { status: 400 }
      );
    }

    console.log('🔍 Loading fudiRecipes data for restaurant:', restaurantId);

    // Parallel data loading for performance
    const [productsResult, recipesResult, salesResult] = await Promise.allSettled([
      // Get poster products
      supabase
        .from('poster_products')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .limit(50),

      // Get existing recipes
      supabase
        .from('fudi_recipes')
        .select('*')
        .eq('restaurant_id', restaurantId),

      // Get sales data (last 30 days)
      supabase
        .from('poster_transaction_products')
        .select('product_id, num, product_sum')
        .eq('restaurant_id', restaurantId)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    ]);

    // Extract data with error handling
    const posterProducts = productsResult.status === 'fulfilled' ? productsResult.value.data || [] : [];
    const existingRecipes = recipesResult.status === 'fulfilled' ? recipesResult.value.data || [] : [];
    const salesData = salesResult.status === 'fulfilled' ? salesResult.value.data || [] : [];

    console.log(`📊 Found: ${posterProducts.length} products, ${existingRecipes.length} recipes, ${salesData.length} sales`);

    // Aggregate sales by product
    const salesByProduct: { [key: string]: { volume: number, revenue: number } } = {};
    salesData.forEach(sale => {
      const productId = sale.product_id;
      if (!salesByProduct[productId]) {
        salesByProduct[productId] = { volume: 0, revenue: 0 };
      }
      salesByProduct[productId].volume += parseInt(sale.num) || 0;
      salesByProduct[productId].revenue += parseFloat(sale.product_sum) || 0;
    });

    // Format products with business logic
    const formattedProducts = posterProducts.map(product => {
      const recipe = existingRecipes.find(r => r.poster_product_id === product.product_id);
      const sales = salesByProduct[product.product_id] || { volume: 0, revenue: 0 };
      
      // Parse poster cost (centavos to pesos)
      const posterCost = parseFloat(product.cost) / 100 || 0;
      const realCost = recipe?.calculated_cost || null;
      const costSavings = recipe ? posterCost - realCost : undefined;
      
      // Calculate priority based on business impact
      let priority: 'high' | 'medium' | 'low' = 'low';
      const monthlyRevenue = sales.revenue * 1.3; // 30% projection
      
      if (sales.volume > 100 || monthlyRevenue > 10000) priority = 'high';
      else if (sales.volume > 20 || monthlyRevenue > 2000) priority = 'medium';

      return {
        id: product.product_id,
        name: product.product_name,
        category: product.category_name || 'GENERAL',
        posterCost: posterCost,
        realCost: realCost,
        salesVolume: sales.volume,
        revenue: sales.revenue,
        status: recipe ? 'optimized' : 'pending',
        priority: priority,
        ingredients: recipe?.ingredients ? Object.keys(recipe.ingredients) : undefined,
        costSavings: costSavings,
        monthlyImpact: costSavings ? costSavings * sales.volume * 1.3 : undefined,
        recipeId: recipe?.id || null
      };
    });

    // Sort by business priority
    formattedProducts.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return b.salesVolume - a.salesVolume;
    });

    // Calculate recipe stats
    const recipesCreated = existingRecipes.length;
    const totalSavings = existingRecipes.reduce((sum, recipe) => 
      sum + (parseFloat(recipe.cost_savings) || 0), 0
    );
    const monthlyProjection = existingRecipes.reduce((sum, recipe) => 
      sum + (parseFloat(recipe.weekly_savings_potential || 0) * 4.33), 0
    );

    // Calculate average savings percentage
    const recipesWithSavings = existingRecipes.filter(r => r.cost_savings && r.pos_cost);
    const avgSavingsPercent = recipesWithSavings.length > 0 
      ? recipesWithSavings.reduce((sum, recipe) => 
          sum + ((parseFloat(recipe.cost_savings) / parseFloat(recipe.pos_cost)) * 100), 0
        ) / recipesWithSavings.length
      : 0;

    // Find top category by total savings
    const categorySavings: { [key: string]: number } = {};
    existingRecipes.forEach(recipe => {
      const category = recipe.pos_category_name || 'GENERAL';
      categorySavings[category] = (categorySavings[category] || 0) + parseFloat(recipe.cost_savings || 0);
    });
    
    const topCategory = Object.keys(categorySavings).length > 0 
      ? Object.keys(categorySavings).reduce((a, b) => 
          categorySavings[a] > categorySavings[b] ? a : b
        )
      : 'Sin datos';

    const stats = {
      recipesCreated,
      totalSavings,
      productsOptimized: recipesCreated,
      monthlyProjection,
      avgSavingsPercent,
      topCategory
    };

    // Return successful response
    return NextResponse.json({
      success: true,
      data: {
        products: formattedProducts,
        stats: stats,
        metadata: {
          restaurantId,
          timestamp: new Date().toISOString(),
          productsCount: formattedProducts.length,
          recipesCount: recipesCreated,
          cached: false
        }
      }
    });

  } catch (error) {
    console.error('💥 Error in fudiRecipes API:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}