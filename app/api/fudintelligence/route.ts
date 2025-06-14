import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESTAURANT_TEST_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

export async function GET(request: NextRequest) {
  try {
    console.log('🧠 FUDINTELLIGENCE API llamada recibida');

    // 1. Extraer restaurantId (por ahora usar el test)
    const restaurantId = RESTAURANT_TEST_ID;

    // 2. Buscar insights existentes (últimas 48 horas para incluir los de ayer)
    const { data: existingInsights, error: searchError } = await supabase
      .from('fudi_insights')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('generated_at', new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString())
      .order('generated_at', { ascending: false });

    console.log('📊 Insights encontrados:', existingInsights?.length || 0);

    if (searchError) {
      console.error('❌ Error buscando insights:', searchError);
      throw searchError;
    }

    // 3. Si hay insights, procesarlos y retornarlos
    if (existingInsights && existingInsights.length > 0) {
      console.log('✅ Retornando insights existentes');
      
      const processedInsights = existingInsights.map(insight => ({
        type: insight.insight_type,
        title: insight.insight_data.title,
        description: insight.insight_data.description,
        metric: insight.insight_data.metric_value,
        confidence: insight.confidence_score,
        action: insight.insight_data.action_suggested || 'Revisar datos para más detalles',
        impact: insight.insight_data.priority || 'medium',
        category: insight.insight_type.includes('business') ? 'operations' : 'operations'
      }));

      return NextResponse.json({
        success: true,
        message: 'FUDINTELLIGENCE insights loaded',
        insights: processedInsights,
        cached: true,
        generated_at: existingInsights[0].generated_at,
        total_found: existingInsights.length
      });
    }

    // 4. Si no hay insights, llamar a la Edge Function para generar nuevos
    console.log('🔄 No hay insights, llamando a Edge Function...');
    
    const edgeFunctionUrl = `${process.env.SUPABASE_URL}/functions/v1/fudintelligence`;
    
    const generateResponse = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        restaurantId: restaurantId 
      })
    });

    if (!generateResponse.ok) {
      throw new Error(`Edge Function error: ${generateResponse.status}`);
    }

    const edgeResult = await generateResponse.json();
    console.log('✅ Edge Function response:', edgeResult);

    // 5. Buscar los insights recién generados
    const { data: newInsights, error: newError } = await supabase
      .from('fudi_insights')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('generated_at', { ascending: false })
      .limit(10);

    if (newError) {
      console.error('❌ Error obteniendo insights nuevos:', newError);
      throw newError;
    }

    const processedNewInsights = (newInsights || []).map(insight => ({
      type: insight.insight_type,
      title: insight.insight_data.title,
      description: insight.insight_data.description,
      metric: insight.insight_data.metric_value,
      confidence: insight.confidence_score,
      action: insight.insight_data.action_suggested || 'Revisar datos para más detalles',
      impact: insight.insight_data.priority || 'medium',
      category: insight.insight_type.includes('business') ? 'operations' : 'operations'
    }));

    return NextResponse.json({
      success: true,
      message: 'FUDINTELLIGENCE analysis complete!',
      insights: processedNewInsights,
      cached: false,
      generated_at: new Date().toISOString(),
      edge_function_result: edgeResult
    });

  } catch (error: any) {
    console.error('❌ FUDINTELLIGENCE API Error:', error);
    
    // En caso de error, retornar respuesta sin insights
    return NextResponse.json({
      success: false,
      message: 'Error connecting to FUDINTELLIGENCE',
      insights: [],
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}