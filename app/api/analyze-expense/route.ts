import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📄 FUDI EXPENSE ANALYZER - Analizando gasto...');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const restaurantId = formData.get('restaurantId') as string;

    if (!file) {
      return Response.json({
        success: false,
        error: 'No se proporcionó archivo'
      }, { status: 400, headers });
    }

    if (!restaurantId) {
      return Response.json({
        success: false,
        error: 'No se proporcionó restaurantId'
      }, { status: 400, headers });
    }

    console.log(`📁 Archivo recibido: ${file.name}, Tipo: ${file.type}, Tamaño: ${file.size}`);

    // Convertir archivo a base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Obtener contexto del restaurante
    const restaurantContext = await getRestaurantContext(restaurantId);
    
    // Analizar con Claude
    const claudeAnalysis = await analyzeExpenseWithClaude(
      base64, 
      file.type, 
      file.name, 
      restaurantContext
    );

    // Guardar en base de datos
    const savedExpense = await saveExpenseData(claudeAnalysis, restaurantId, file.name);

    return Response.json({
      success: true,
      analysis: claudeAnalysis,
      expenseId: savedExpense.id
    }, { headers });

  } catch (error) {
    console.error('💥 Error en análisis de gasto:', error);
    return Response.json({
      success: false,
      error: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`
    }, { status: 500, headers });
  }
}

// 🏪 OBTENER CONTEXTO DEL RESTAURANTE
async function getRestaurantContext(restaurantId: string) {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Obtener productos del menú
    const { data: products } = await supabase
      .from('poster_products')
      .select('product_id, product_name, category_name')
      .eq('restaurant_id', restaurantId)
      .limit(50);

    // Obtener proveedores conocidos de gastos anteriores
    const { data: suppliers } = await supabase
      .from('expenses')
      .select('supplier')
      .eq('restaurant_id', restaurantId)
      .not('supplier', 'is', null);

    // Obtener categorías únicas
    const categories = [...new Set(products?.map(p => p.category_name).filter(Boolean))] || [];
    const knownSuppliers = [...new Set(suppliers?.map(s => s.supplier).filter(Boolean))] || [];

    return {
      products: products || [],
      categories,
      suppliers: knownSuppliers,
      productNames: products?.map(p => p.product_name) || []
    };

  } catch (error) {
    console.error('Error obteniendo contexto:', error);
    return {
      products: [],
      categories: [],
      suppliers: [],
      productNames: []
    };
  }
}

// 🧠 ANÁLISIS CON CLAUDE
async function analyzeExpenseWithClaude(
  base64Data: string, 
  fileType: string, 
  fileName: string, 
  context: any
) {
  console.log('🧠 Enviando a Claude para análisis...');

  const isImage = fileType.startsWith('image/');
  const isPDF = fileType === 'application/pdf';

  let content;

  if (isImage) {
    content = [
      {
        type: "image",
        source: {
          type: "base64",
          media_type: fileType,
          data: base64Data
        }
      },
      {
        type: "text",
        text: buildExpenseAnalysisPrompt(context, fileName)
      }
    ];
  } else if (isPDF) {
    content = [
      {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: base64Data
        }
      },
      {
        type: "text",
        text: buildExpenseAnalysisPrompt(context, fileName)
      }
    ];
  } else {
    throw new Error('Tipo de archivo no soportado. Solo imágenes y PDFs.');
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": process.env.ANTHROPIC_API_KEY || ""
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ 
        role: "user", 
        content: content
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Error de Claude API: ${response.status}`);
  }

  const claudeData = await response.json();
  const responseText = claudeData.content[0].text;

  // Extraer JSON del response
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No se encontró JSON válido en la respuesta');
    }
  } catch (parseError) {
    console.error('Error parseando JSON:', parseError);
    console.log('Respuesta de Claude:', responseText);
    
    // Respuesta fallback
    return {
      expense_type: "otros",
      supplier: "Proveedor no identificado",
      total_amount: 0,
      items: [],
      analysis: {
        margin_impact: "No se pudo analizar automáticamente",
        price_anomalies: [],
        recommendations: ["Revisar manualmente este documento"],
        category_impact: {}
      },
      raw_response: responseText
    };
  }
}

// 📝 PROMPT PARA ANÁLISIS DE GASTOS
function buildExpenseAnalysisPrompt(context: any, fileName: string) {
  return `Eres FUDI, consultor financiero experto en restaurantes. Analiza este documento de gasto/factura.

CONTEXTO DEL RESTAURANTE:
Productos en el menú: ${context.productNames.slice(0, 20).join(', ')}
Categorías: ${context.categories.join(', ')}
Proveedores conocidos: ${context.suppliers.join(', ')}

ARCHIVO: ${fileName}

INSTRUCCIONES:
1. Extrae TODOS los productos/servicios del documento
2. Identifica precios unitarios y cantidades  
3. Relaciona ingredientes con productos del menú
4. Calcula costo por porción cuando sea posible
5. Detecta anomalías en precios
6. Sugiere optimizaciones específicas

RESPONDE SOLO CON JSON VÁLIDO:
{
  "expense_type": "ingredientes|servicios|equipos|otros",
  "supplier": "nombre_del_proveedor",
  "total_amount": 0.00,
  "currency": "MXN",
  "date": "YYYY-MM-DD",
  "items": [
    {
      "product": "nombre_exacto_del_producto",
      "quantity": 0,
      "unit": "kg|piezas|litros|etc",
      "unit_price": 0.00,
      "total": 0.00,
      "related_menu_items": ["productos_del_menu_que_usan_este_ingrediente"],
      "cost_per_serving": 0.00
    }
  ],
  "analysis": {
    "margin_impact": "descripcion_del_impacto_en_margenes",
    "price_anomalies": ["alertas_de_precios_anormales"],
    "recommendations": ["acciones_especificas_recomendadas"],
    "category_impact": {
      "PAQUETES": "impacto_en_esta_categoria",
      "POLLO CRUJIENTE": "impacto_en_esta_categoria"
    },
    "cost_insights": "insights_sobre_costos"
  }
}

IMPORTANTE: 
- SOLO responde con JSON válido
- NO agregues explicaciones fuera del JSON
- Si no puedes leer algo, usa valores null
- Sé específico en las recomendaciones`;
}

// 💾 GUARDAR EN BASE DE DATOS
async function saveExpenseData(analysis: any, restaurantId: string, fileName: string) {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Guardar gasto principal
    const { data: expense, error: expenseError } = await supabase
      .from('expenses')
      .insert({
        restaurant_id: restaurantId,
        expense_type: analysis.expense_type || 'otros',
        supplier: analysis.supplier || 'Proveedor no identificado',
        total_amount: analysis.total_amount || 0,
        document_url: fileName, // En producción, sería la URL real del archivo
        analysis_data: analysis,
        status: 'processed',
        processed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (expenseError) {
      throw expenseError;
    }

    // Guardar items individuales
    if (analysis.items && analysis.items.length > 0) {
      const itemsToInsert = analysis.items.map((item: any) => ({
        expense_id: expense.id,
        product_name: item.product || 'Producto sin nombre',
        quantity: item.quantity || 0,
        unit_price: item.unit_price || 0,
        total_price: item.total || 0,
        related_menu_items: item.related_menu_items || [],
        cost_per_serving: item.cost_per_serving || 0
      }));

      const { error: itemsError } = await supabase
        .from('expense_items')
        .insert(itemsToInsert);

      if (itemsError) {
        console.error('Error guardando items:', itemsError);
      }
    }

    // Actualizar márgenes de productos afectados
    await updateProductMargins(supabase, restaurantId, analysis);

    console.log(`✅ Gasto guardado con ID: ${expense.id}`);
    return expense;

  } catch (error) {
    console.error('Error guardando gasto:', error);
    throw error;
  }
}

// 📊 ACTUALIZAR MÁRGENES DE PRODUCTOS
async function updateProductMargins(supabase: any, restaurantId: string, analysis: any) {
  try {
    if (!analysis.items || analysis.items.length === 0) return;

    // Para cada item que afecta productos del menú
    for (const item of analysis.items) {
      if (item.related_menu_items && item.related_menu_items.length > 0) {
        
        for (const menuItem of item.related_menu_items) {
          // Obtener precio de venta del producto
          const { data: product } = await supabase
            .from('poster_products')
            .select('product_id, product_name, price')
            .eq('restaurant_id', restaurantId)
            .eq('product_name', menuItem)
            .single();

          if (product && item.cost_per_serving > 0) {
            const sellingPrice = typeof product.price === 'object' ? 
              parseFloat(product.price?.price || 0) : 
              parseFloat(product.price || 0);

            const marginAmount = sellingPrice - item.cost_per_serving;
            const marginPercentage = sellingPrice > 0 ? 
              ((marginAmount / sellingPrice) * 100) : 0;

            // Actualizar o insertar margen
            await supabase
              .from('product_margins')
              .upsert({
                restaurant_id: restaurantId,
                product_id: product.product_id,
                product_name: product.product_name,
                selling_price: sellingPrice,
                total_cost: item.cost_per_serving,
                margin_amount: marginAmount,
                margin_percentage: marginPercentage,
                last_updated: new Date().toISOString()
              });
          }
        }
      }
    }

    console.log('✅ Márgenes actualizados');
  } catch (error) {
    console.error('Error actualizando márgenes:', error);
  }
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