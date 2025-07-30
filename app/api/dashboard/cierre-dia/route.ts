// /app/api/dashboard/cierre-dia/route.ts
// MODIFICADO: Incluye datos históricos de 28 días para gráficas

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// ✅ INTERFACE EXTENDIDA - Incluye datos históricos
interface CierreDiaResponse {
  // DATOS DEL DÍA ACTUAL (existente)
  ventasHoy: number;
  transacciones: number;
  ticketPromedio: number;
  velocidadVenta: number;
  profitReal: number;
  margenReal: number;
  profitPorTransaccion: number;
  
  // OBJETIVOS
  objetivo: number;
  objetivoDinamico: number;
  progreso: number;
  progresoVsRecord: number;
  objetivoAlcanzable: boolean;
  
  // COMPARACIONES
  vsAyer: number;
  vsSemanaAnterior: number;
  vsPromedio30Dias: number;
  vsMismoDiaSemana: number;
  
  // RÉCORDS Y RANKINGS
  recordHistorico: number;
  diasDesdeRecord: number;
  rankingDelMes: number;
  totalDiasMes: number;
  percentilHistorico: number;
  
  // TENDENCIAS
  tendencia7Dias: number;
  tendencia30Dias: number;
  direccionTendencia: string;
  
  // PATRONES
  diaSemana: number;
  promedioMismoDia: number;
  mejorMismoDiaHistorico: number;
  rankingMismoDiaMes: number;
  
  // FORMAS DE PAGO
  pagoEfectivoPct: number;
  pagoTarjetaPct: number;
  propinasTotales: number;
  propinasPromedio: number;

  // ✅ NUEVO: DATOS HISTÓRICOS PARA GRÁFICAS
  ventasHistoricas28Dias: Array<{
    fecha: string;
    ventas: number;
    transacciones: number;
    ticketPromedio: number;
    diaSemana: number;
    nombreDia: string;
  }>;
  
  // ✅ NUEVO: INSIGHTS AUTOMÁTICOS
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
  transacciones: number;
  ticket_promedio: number;
  dia_semana: number;
  vs_anterior: number;
  vs_semana_pasada: number;
  vs_promedio_30_dias: number;
  vs_mismo_dia_semana: number;
  record_ventas_historico: number;
  dias_desde_record_ventas: number;
  ranking_del_mes: number;
  total_dias_mes: number;
  percentil_historico: number;
  tendencia_7_dias: number;
  tendencia_30_dias: number;
  promedio_mismo_dia_semana: number;
  mejor_mismo_dia_historico: number;
  ranking_mismo_dia_mes: number;
  pago_efectivo_pct: number;
  pago_tarjeta_pct: number;
  propinas_totales: number;
  propinas_promedio: number;
  velocidad_venta: number;
  profit_dia_real: number;
  margen_dia_real: number;
  profit_por_transaccion: number;
  objetivo: number;
  objetivo_dinamico: number;
  objetivo_alcanzable: boolean;
  progreso: number;
  progreso_vs_record: number;
}

// ✅ FUNCIÓN HELPER: Generar insights automáticos
function generateInsights(historicalData: any[], currentData: CacheRow): any {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  // Agrupar por día de semana
  const ventasPorDia = historicalData.reduce((acc, day) => {
    const dia = day.dia_semana;
    if (!acc[dia]) acc[dia] = [];
    acc[dia].push(day.ventas_dia);
    return acc;
  }, {});

  // Calcular promedios por día
  const promediosPorDia = Object.keys(ventasPorDia).map(dia => ({
    dia: parseInt(dia),
    nombre: diasSemana[parseInt(dia)],
    promedio: ventasPorDia[dia].reduce((a: number, b: number) => a + b, 0) / ventasPorDia[dia].length
  }));

  // Encontrar mejor y peor día
  const mejorDia = promediosPorDia.reduce((a, b) => a.promedio > b.promedio ? a : b);
  const peorDia = promediosPorDia.reduce((a, b) => a.promedio < b.promedio ? a : b);
  
  // Variación entre días
  const variacion = ((mejorDia.promedio - peorDia.promedio) / peorDia.promedio * 100).toFixed(1);
  
  // Tendencia general
  const ultimosSieteDias = historicalData.slice(-7);
  const primerosSieteDias = historicalData.slice(-14, -7);
  const promedioReciente = ultimosSieteDias.reduce((sum, day) => sum + day.ventas_dia, 0) / 7;
  const promedioAnterior = primerosSieteDias.reduce((sum, day) => sum + day.ventas_dia, 0) / 7;
  const cambioTendencia = ((promedioReciente - promedioAnterior) / promedioAnterior * 100).toFixed(1);

  return {
    ventasInsight: `Tu variación es de ${variacion}% entre los días más fuertes y más bajos. ${mejorDia.nombre}s promedian ${mejorDia.promedio.toLocaleString('es-MX')} pesos, mientras que ${peorDia.nombre}s generan ${peorDia.promedio.toLocaleString('es-MX')} pesos.`,
    mejorDiaSemana: mejorDia.nombre,
    peorDiaSemana: peorDia.nombre,
    tendenciaGeneral: `${parseFloat(cambioTendencia) >= 0 ? 'Crecimiento' : 'Declive'} del ${Math.abs(parseFloat(cambioTendencia))}% en los últimos 7 días vs la semana anterior.`,
    recomendacion: parseFloat(variacion) > 30 
      ? `Los ${peorDia.nombre}s tienen gran potencial de mejora. Una estrategia específica podría incrementar significativamente tus ingresos semanales.`
      : `Tienes consistencia en tus ventas. Enfócate en incrementar el ticket promedio en todos los días.`
  };
}

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Cargando métricas de cierre de día...');

    // =============================================
    // 1. OBTENER DATOS HISTÓRICOS (28 DÍAS)
    // =============================================
    const { data: historicalData, error: historicalError } = await supabase
      .from('cierre_dia_cache')
      .select('*')
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
    // 2. DATOS DEL DÍA MÁS RECIENTE
    // =============================================
    const currentData = historicalData[historicalData.length - 1] as CacheRow;
    
    // =============================================
    // 3. PROCESAR DATOS HISTÓRICOS PARA GRÁFICAS
    // =============================================
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    const ventasHistoricas28Dias = historicalData.map(row => ({
      fecha: row.fecha_cierre,
      ventas: row.ventas_dia,
      transacciones: row.transacciones,
      ticketPromedio: row.ticket_promedio,
      diaSemana: row.dia_semana,
      nombreDia: diasSemana[row.dia_semana]
    }));

    // =============================================
    // 4. GENERAR INSIGHTS AUTOMÁTICOS
    // =============================================
    const insights = generateInsights(historicalData, currentData);

    // =============================================
    // 5. CONSTRUIR RESPUESTA FINAL
    // =============================================
    const response: CierreDiaResponse = {
      // DATOS ACTUALES (formato existente)
      ventasHoy: currentData.ventas_dia,
      transacciones: currentData.transacciones,
      ticketPromedio: currentData.ticket_promedio,
      velocidadVenta: currentData.velocidad_venta,
      profitReal: currentData.profit_dia_real,
      margenReal: currentData.margen_dia_real,
      profitPorTransaccion: currentData.profit_por_transaccion,
      
      // OBJETIVOS
      objetivo: currentData.objetivo,
      objetivoDinamico: currentData.objetivo_dinamico,
      progreso: currentData.progreso,
      progresoVsRecord: currentData.progreso_vs_record,
      objetivoAlcanzable: currentData.objetivo_alcanzable,
      
      // COMPARACIONES  
      vsAyer: currentData.vs_anterior,
      vsSemanaAnterior: currentData.vs_semana_pasada,
      vsPromedio30Dias: currentData.vs_promedio_30_dias,
      vsMismoDiaSemana: currentData.vs_mismo_dia_semana,
      
      // RÉCORDS Y RANKINGS
      recordHistorico: currentData.record_ventas_historico,
      diasDesdeRecord: currentData.dias_desde_record_ventas,
      rankingDelMes: currentData.ranking_del_mes,
      totalDiasMes: currentData.total_dias_mes,
      percentilHistorico: currentData.percentil_historico,
      
      // TENDENCIAS
      tendencia7Dias: currentData.tendencia_7_dias,
      tendencia30Dias: currentData.tendencia_30_dias,
      direccionTendencia: currentData.tendencia_7_dias >= 0 ? 'positiva' : 'negativa',
      
      // PATRONES
      diaSemana: currentData.dia_semana,
      promedioMismoDia: currentData.promedio_mismo_dia_semana,
      mejorMismoDiaHistorico: currentData.mejor_mismo_dia_historico,
      rankingMismoDiaMes: currentData.ranking_mismo_dia_mes,
      
      // FORMAS DE PAGO
      pagoEfectivoPct: currentData.pago_efectivo_pct,
      pagoTarjetaPct: currentData.pago_tarjeta_pct,
      propinasTotales: currentData.propinas_totales,
      propinasPromedio: currentData.propinas_promedio,

      // ✅ NUEVOS: DATOS HISTÓRICOS
      ventasHistoricas28Dias,
      
      // ✅ NUEVOS: INSIGHTS AUTOMÁTICOS
      insights
    };

    console.log(`✅ Métricas cargadas: ${historicalData.length} días de datos`);
    console.log(`📈 Ventas hoy: ${currentData.ventas_dia.toLocaleString('es-MX')}`);
    console.log(`🎯 Insight generado: ${insights.ventasInsight.substring(0, 50)}...`);

    return NextResponse.json({
      success: true,
      data: response,
      lastUpdated: new Date().toISOString(),
      dataPoints: historicalData.length
    });

  } catch (error) {
    console.error('💥 Error en API cierre-dia:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}