// app/api/fudirecipes/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CreateRecipeRequest {
  productId: string;
  restaurantId: string;
  productName: string;
  category: string;
  posterCost: number;
  salesVolume: number;
  conversationMode?: boolean;
}

interface RecipeAnalysisResponse {
  optimizedCost: number;
  ingredients: { [key: string]: { amount: string; cost: number; supplier?: string } };
  preparationSteps: string[];
  costBreakdown: {
    ingredients: number;
    labor: number;
    overhead: number;
    total: number;
  };
  savingsAnalysis: {
    costSavings: number;
    percentageSaving: number;
    weeklySavingsPotential: number;
  };
  qualityNotes: string[];
  recommendations: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateRecipeRequest = await request.json();
    const { productId, restaurantId, productName, category, posterCost, salesVolume, conversationMode = false } = body;

    // Validation
    if (!productId || !restaurantId || !productName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`🧠 Creating recipe for: ${productName} (${category})`);
    console.log(`📊 POSTER cost: $${posterCost}, Sales volume: ${salesVolume}`);

    // Check if recipe already exists
    const { data: existingRecipe } = await supabase
      .from('fudi_recipes')
      .select('*')
      .eq('poster_product_id', productId)
      .eq('restaurant_id', restaurantId)
      .single();

    if (existingRecipe) {
      return NextResponse.json({
        success: false,
        error: 'Recipe already exists for this product',
        existingRecipe: existingRecipe
      }, { status: 409 });
    }

    // Get restaurant context for better analysis
    const { data: restaurantData } = await supabase
      .from('restaurants')
      .select('name, cuisine_type, avg_ticket, location')
      .eq('restaurant_id', restaurantId)
      .single();

    // AI Recipe Analysis using Claude
    const aiPrompt = `
You are fudiGPT, an expert culinary cost optimization AI. Analyze this restaurant product and create an optimized recipe.

PRODUCT INFORMATION:
- Name: ${productName}
- Category: ${category}
- Current POSTER Cost: $${posterCost} MXN
- Monthly Sales Volume: ${salesVolume} units
- Restaurant: ${restaurantData?.name || 'Unknown'}
- Cuisine Type: ${restaurantData?.cuisine_type || 'General'}

OPTIMIZATION OBJECTIVES:
1. Reduce costs while maintaining quality
2. Use locally available ingredients (Mexico)
3. Consider preparation efficiency
4. Ensure food safety standards
5. Maintain flavor profile and presentation

ANALYSIS REQUIREMENTS:
Please provide a comprehensive recipe optimization analysis in the following JSON format:

{
  "optimizedCost": number (in MXN),
  "ingredients": {
    "ingredient_name": {
      "amount": "quantity with unit",
      "cost": number (in MXN),
      "supplier": "suggested supplier or source"
    }
  },
  "preparationSteps": [
    "Step 1: Detailed preparation instruction",
    "Step 2: Next step with timing and temperature"
  ],
  "costBreakdown": {
    "ingredients": number,
    "labor": number (estimated labor cost),
    "overhead": number (utilities, packaging, etc.),
    "total": number
  },
  "savingsAnalysis": {
    "costSavings": number (POSTER cost - optimized cost),
    "percentageSaving": number (percentage saved),
    "weeklySavingsPotential": number (based on sales volume)
  },
  "qualityNotes": [
    "Quality consideration 1",
    "Quality consideration 2"
  ],
  "recommendations": [
    "Operational recommendation 1",
    "Supply chain recommendation 2"
  ]
}

IMPORTANT: Return ONLY the JSON object. No additional text or explanation. The JSON must be valid and parseable.
`;

    // Make AI request (simulated for now - replace with actual Claude API)
    let recipeAnalysis: RecipeAnalysisResponse;
    
    if (process.env.NODE_ENV === 'development') {
      // Demo response for development
      recipeAnalysis = {
        optimizedCost: posterCost * 0.75, // 25% savings
        ingredients: {
          "Pollo deshuesado": { amount: "150g", cost: 18.50, supplier: "Proveedor Local" },
          "Especias mixtas": { amount: "2g", cost: 0.80, supplier: "Mercado Central" },
          "Aceite vegetal": { amount: "10ml", cost: 1.20, supplier: "Distribuidora" },
          "Empaque biodegradable": { amount: "1 unidad", cost: 2.50, supplier: "EcoPackaging MX" }
        },
        preparationSteps: [
          "Marinar el pollo con especias por 15 minutos",
          "Sellar a fuego alto por 3 minutos cada lado",
          "Reducir fuego y cocinar 8 minutos más",
          "Reposar 2 minutos antes de servir",
          "Empacar en contenedor biodegradable"
        ],
        costBreakdown: {
          ingredients: posterCost * 0.60,
          labor: posterCost * 0.10,
          overhead: posterCost * 0.05,
          total: posterCost * 0.75
        },
        savingsAnalysis: {
          costSavings: posterCost * 0.25,
          percentageSaving: 25,
          weeklySavingsPotential: (posterCost * 0.25) * (salesVolume / 4)
        },
        qualityNotes: [
          "Mantiene el sabor original con especias optimizadas",
          "Tiempo de cocción reducido mejora textura",
          "Empaque biodegradable mejora percepción de marca"
        ],
        recommendations: [
          "Comprar pollo directo del proveedor para mejor precio",
          "Preparar especias en lotes para eficiencia",
          "Implementar control de temperatura para consistencia"
        ]
      };
    } else {
      // In production, use actual Claude API
      try {
        // This would be the actual Claude API call
        // const response = await fetch('https://api.anthropic.com/v1/messages', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'x-api-key': process.env.CLAUDE_API_KEY!
        //   },
        //   body: JSON.stringify({
        //     model: 'claude-3-sonnet-20240229',
        //     max_tokens: 4000,
        //     messages: [{ role: 'user', content: aiPrompt }]
        //   })
        // });
        
        // For now, use the demo response
        recipeAnalysis = {
          optimizedCost: posterCost * 0.80,
          ingredients: {
            "Ingrediente principal": { amount: "Cantidad optimizada", cost: posterCost * 0.55, supplier: "Proveedor sugerido" }
          },
          preparationSteps: ["Análisis detallado en proceso..."],
          costBreakdown: {
            ingredients: posterCost * 0.55,
            labor: posterCost * 0.15,
            overhead: posterCost * 0.10,
            total: posterCost * 0.80
          },
          savingsAnalysis: {
            costSavings: posterCost * 0.20,
            percentageSaving: 20,
            weeklySavingsPotential: (posterCost * 0.20) * (salesVolume / 4)
          },
          qualityNotes: ["Análisis de calidad en proceso"],
          recommendations: ["Recomendaciones personalizadas en desarrollo"]
        };
      } catch (aiError) {
        console.error('AI Analysis failed:', aiError);
        throw new Error('Failed to generate recipe analysis');
      }
    }

    // Save recipe to database
    const recipeData = {
      restaurant_id: restaurantId,
      poster_product_id: productId,
      pos_product_name: productName,
      pos_category_name: category,
      pos_cost: posterCost,
      calculated_cost: recipeAnalysis.optimizedCost,
      cost_savings: recipeAnalysis.savingsAnalysis.costSavings,
      savings_percentage: recipeAnalysis.savingsAnalysis.percentageSaving,
      weekly_savings_potential: recipeAnalysis.savingsAnalysis.weeklySavingsPotential,
      ingredients: recipeAnalysis.ingredients,
      preparation_steps: recipeAnalysis.preparationSteps,
      cost_breakdown: recipeAnalysis.costBreakdown,
      quality_notes: recipeAnalysis.qualityNotes,
      recommendations: recipeAnalysis.recommendations,
      created_by: 'fudiGPT',
      status: 'active',
      version: 1
    };

    const { data: savedRecipe, error: saveError } = await supabase
      .from('fudi_recipes')
      .insert(recipeData)
      .select()
      .single();

    if (saveError) {
      console.error('Error saving recipe:', saveError);
      throw new Error('Failed to save recipe to database');
    }

    console.log(`✅ Recipe created successfully: ${savedRecipe.id}`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Recipe created successfully',
      data: {
        recipe: savedRecipe,
        analysis: recipeAnalysis,
        savings: {
          immediate: recipeAnalysis.savingsAnalysis.costSavings,
          weekly: recipeAnalysis.savingsAnalysis.weeklySavingsPotential,
          monthly: recipeAnalysis.savingsAnalysis.weeklySavingsPotential * 4.33
        }
      }
    });

  } catch (error) {
    console.error('💥 Error creating recipe:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Recipe creation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to check recipe creation status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const restaurantId = searchParams.get('restaurantId');

    if (!productId || !restaurantId) {
      return NextResponse.json(
        { success: false, error: 'Missing productId or restaurantId' },
        { status: 400 }
      );
    }

    const { data: recipe, error } = await supabase
      .from('fudi_recipes')
      .select('*')
      .eq('poster_product_id', productId)
      .eq('restaurant_id', restaurantId)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found is OK
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        exists: !!recipe,
        recipe: recipe || null
      }
    });

  } catch (error) {
    console.error('Error checking recipe status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check recipe status'
    }, { status: 500 });
  }
}