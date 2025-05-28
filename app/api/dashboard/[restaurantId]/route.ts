import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  try {
    const { restaurantId } = params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today';
    
    console.log(`📊 Obteniendo stats para restaurante: ${restaurantId}`);
    
    // Obtener fecha de hoy
    const today = new Date().toISOString().split('T')[0];
    
    // Obtener resumen más reciente
    const { data: todayData, error: todayError } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('summary_date', { ascending: false })
      .limit(1)
      .single();
    
    if (todayError || !todayData) {
      console.log('⚠️ No hay datos, enviando defaults');
      return NextResponse.json({ 
        success: true, 
        stats: {
          ventasHoy: 0,
          cambioVentas: '0%',
          tickets: 0,
          cambioTickets: '0',
          ticketPromedio: 0,
          cambioTicket: '0%',
          mejorPlatillo: 'Sin datos',
          vendidosMejor: 'N/A',
          fecha: today
        }
      });
    }
    
    // Calcular cambios (simulados por ahora)
    const stats = {
      ventasHoy: todayData.total_sales || 0,
      cambioVentas: '+12%', // Por ahora hardcodeado
      tickets: todayData.transaction_count || 0,
      cambioTickets: '+5',
      ticketPromedio: todayData.avg_ticket || 0,
      cambioTicket: '-2%',
      mejorPlatillo: 'Tacos Pastor', // Por ahora hardcodeado
      vendidosMejor: '18 vendidos',
      fecha: todayData.summary_date
    };
    
    console.log(`✅ Stats enviados:`, stats);
    return NextResponse.json({ success: true, stats });
    
  } catch (error) {
    console.error('❌ Error general:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}