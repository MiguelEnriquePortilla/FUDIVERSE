// /app/api/dashboard/metricas-principales-28dias/route.ts
// NUEVO ENDPOINT: Métricas principales con datos históricos de 28 días

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// ✅ INTERFACE - Métricas Principales 28 Días
interface MetricasPrincipales28DiasResponse {
  ventasHoy: number;
  margenReal: number;
  transacciones: number;
  progreso: number;
  objetivoDinamico: number;
  vsAyer: number;
  ticketPromedio: number;
  
  metricas28Dias: Array<{
    fecha: string;
    nombreDia: string;
    ventas: number;
    ganancia: number;
    ordenes: number;
    objetivo: number;
    diaSemana: number;
  }>;
  
  insights: {
    ventasInsight: string;
    mejorDiaSemana: string;
    peorDiaSemana: string;
    tendenciaGeneral: string;
    recomendacion: string;
  };
}

interface CacheRow {
  fecha_cierre: string;
  ventas_dia: number;
  profit_dia_real: number;
  transacciones: number;
  objetivo_dinamico: number;
  ticket_promedio: number;
  dia_semana: number;
  vs_anterior: number;
  margen_dia_real: number;
  progreso: number;
}

// ✅ HELPER: Formatear dinero correctamente
function formatMoney(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// ✅ HELPER: Plurales correctos de días
function getPluralDay(dia: string): string {
  const plurales: Record<string, string> = {
    'Domingo': 'los domingos',
    'Lunes': 'los lunes',
    'Martes': 'los martes',
    'Miércoles': 'los miércoles',
    'Jueves': 'los jueves',
    'Viernes': 'los viernes',
    'Sábado': 'los sábados'
  };
  return plurales[dia] || `los ${dia.toLowerCase()}`;
}

// ✅ FUNCIÓN CORREGIDA: Generar insights automáticos
function generateInsights(historicalData: CacheRow[], currentData: CacheRow): any {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  // Agrupar por día de semana
  const ventasPorDia = historicalData.reduce((acc, day) => {
    const dia = day.dia_semana;
    if (!acc[dia]) acc[dia] = [];
    acc[dia].push(day.ventas_dia);
    return acc;
  }, {} as Record<number, number[]>);

  // Calcular promedios por día
  const promediosPorDia = Object.keys(ventasPorDia).map(dia => ({
    dia: parseInt(dia),
    nombre: diasSemana[parseInt(dia)],
    promedio: ventasPorDia[parseInt(dia)].reduce((a, b) => a + b, 0) / ventasPorDia[parseInt(dia)].length
  }));

  // Encontrar mejor y peor día
  const mejorDia = promediosPorDia.reduce((a, b) => a.promedio > b.promedio ? a : b);
  const peorDia = promediosPorDia.reduce((a, b) => a.promedio < b.promedio ? a : b);
  
  // Variación entre días
  const variacion = ((mejorDia.promedio - peorDia.promedio) / peorDia.promedio * 100).toFixed(1);
  
  // Tendencia general
  const ultimosSieteDias = historicalData.slice(-7);
  const primerosSieteDias = historicalData.slice(-14, -7);
  
  if (ultimosSieteDias.length >= 7 && primerosSieteDias.length >= 7) {
    const promedioReciente = ultimosSieteDias.reduce((sum, day) => sum + day.ventas_dia, 0) / 7;
    const promedioAnterior = primerosSieteDias.reduce((sum, day) => sum + day.ventas_dia, 0) / 7;
    const cambioTendencia = ((promedioReciente - promedioAnterior) / promedioAnterior * 100).toFixed(1);
    
    return {
      ventasInsight: `La variación es de ${variacion}% entre los días más fuertes y más bajos. ${getPluralDay(mejorDia.nombre)} promedian ${formatMoney(mejorDia.promedio)}, mientras que ${getPluralDay(peorDia.nombre)} generan ${formatMoney(peorDia.promedio)}.`,
      mejorDiaSemana: mejorDia.nombre,
      peorDiaSemana: peorDia.nombre,
      tendenciaGeneral: `${parseFloat(cambioTendencia) >= 0 ? 'Crecimiento' : 'Declive'} del ${Math.abs(parseFloat(cambioTendencia))}% en los últimos 7 días vs la semana anterior.`,
      recomendacion: parseFloat(variacion) > 30 
        ? `${getPluralDay(peorDia.nombre)} tienen gran potencial de mejora. Una estrategia específica podría incrementar significativamente los ingresos semanales.`
        : `Hay consistencia en las ventas. Se recomienda enfocarse en incrementar el ticket promedio en todos los días.`
    };
  }
  
  // Fallback si no hay suficientes datos
  return {
    ventasInsight: `La variación es de ${variacion}% entre los días más fuertes y más bajos. ${getPluralDay(mejorDia.nombre)} son más fuertes que ${getPluralDay(peorDia.nombre)}.`,
    mejorDiaSemana: mejorDia.nombre,
    peorDiaSemana: peorDia.nombre,
    tendenciaGeneral: `Analizando tendencias con ${historicalData.length} días de datos disponibles.`,
    recomendacion: `Se recomienda optimizar la consistencia entre todos los días de la semana.`
  };
}

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Cargando métricas principales 28 días...');

    // =============================================
    // 1. OBTENER DATOS HISTÓRICOS (28 DÍAS)
    // =============================================
    const { data: historicalData, error: historicalError } = await supabase
      .from('cierre_dia_cache')
      .select(`
        fecha_cierre,
        ventas_dia,
        profit_dia_real,
        transacciones,
        objetivo_dinamico,
        ticket_promedio,
        dia_semana,
        vs_anterior,
        margen_dia_real,
        progreso
      `)
      .eq('restaurant_id', RESTAURANT_ID)
      .order('fecha_cierre', { ascending: true })
      .limit(28);

    if (historicalError) {
      console.error('❌ Error obteniendo datos históricos:', historicalError);
      return NextResponse.json({
        success: false,
        error: 'Error obteniendo datos históricos'
      }, { status: 500 });
    }

    if (!historicalData || historicalData.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No hay datos disponibles. El cache debe generarse primero.'
      }, { status: 404 });
    }

    // =============================================
    // 2. DATOS ACTUALES (DÍA MÁS RECIENTE)
    // =============================================
    const currentData = historicalData[historicalData.length - 1] as CacheRow;
    
    // =============================================
    // 3. PROCESAR DATOS PARA GRÁFICA MULTILINE
    // =============================================
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    const metricas28Dias = historicalData.map(row => ({
      fecha: row.fecha_cierre,
      nombreDia: diasSemana[row.dia_semana],
      ventas: row.ventas_dia,
      ganancia: row.profit_dia_real,
      ordenes: row.transacciones,
      objetivo: row.objetivo_dinamico,
      diaSemana: row.dia_semana
    }));

    // =============================================
    // 4. GENERAR INSIGHTS CORREGIDOS
    // =============================================
    const insights = generateInsights(historicalData, currentData);

    // =============================================
    // 5. RESPUESTA FINAL
    // =============================================
    const response: MetricasPrincipales28DiasResponse = {
      ventasHoy: currentData.ventas_dia,
      margenReal: currentData.margen_dia_real,
      transacciones: currentData.transacciones,
      progreso: currentData.progreso,
      objetivoDinamico: currentData.objetivo_dinamico,
      vsAyer: currentData.vs_anterior,
      ticketPromedio: currentData.ticket_promedio,
      metricas28Dias,
      insights
    };

    console.log(`✅ Métricas principales cargadas: ${historicalData.length} días`);
    console.log(`🎯 Insight corregido: ${insights.ventasInsight.substring(0, 50)}...`);

    return NextResponse.json({
      success: true,
      data: response,
      lastUpdated: new Date().toISOString(),
      dataPoints: historicalData.length
    });

  } catch (error) {
    console.error('💥 Error en API métricas-principales-28dias:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}