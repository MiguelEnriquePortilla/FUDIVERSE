// /app/api/dashboard/comparaciones/route.ts
// ENDPOINT: Comparaciones históricas usando cache existente

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// ✅ INTERFACES
interface ComparacionesResponse {
  diaActualVsPasado: {
    diaActual: {
      nombre: string;
      fecha: string;
      ventas: number;
      ganancia: number;
      transacciones: number;
      margen: number;
    };
    diaPasado: {
      nombre: string;
      fecha: string;
      ventas: number;
      ganancia: number;
      transacciones: number;
      margen: number;
    };
    cambios: {
      ventas: { absoluto: number; porcentaje: number };
      ganancia: { absoluto: number; porcentaje: number };
      transacciones: { absoluto: number; porcentaje: number };
      margen: { absoluto: number; porcentaje: number };
    };
    insights: {
      resumen: string;
      tendencia: 'positiva' | 'negativa' | 'neutral';
      recomendacion: string;
    };
  };
  
  semanaActualVsPasada: {
    semanaActual: {
      inicio: string;
      fin: string;
      ventas: number;
      ganancia: number;
      transacciones: number;
      margenPromedio: number;
      diasOperativos: number;
    };
    semanaPasada: {
      inicio: string;
      fin: string;
      ventas: number;
      ganancia: number;
      transacciones: number;
      margenPromedio: number;
      diasOperativos: number;
    };
    cambios: {
      ventas: { absoluto: number; porcentaje: number };
      ganancia: { absoluto: number; porcentaje: number };
      transacciones: { absoluto: number; porcentaje: number };
      margen: { absoluto: number; porcentaje: number };
    };
    insights: {
      resumen: string;
      tendencia: 'positiva' | 'negativa' | 'neutral';
      recomendacion: string;
    };
  };
}

interface CacheRow {
  fecha_cierre: string;
  ventas_dia: number;
  profit_dia_real: number;
  transacciones: number;
  margen_dia_real: number;
  dia_semana: number;
}

// ✅ HELPERS
function formatMoney(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function calcularCambio(actual: number, anterior: number) {
  const absoluto = actual - anterior;
  const porcentaje = anterior !== 0 ? (absoluto / anterior) * 100 : 0;
  return { absoluto, porcentaje };
}

function getDiaSemana(dia: number): string {
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  return dias[dia];
}

function getTendencia(porcentaje: number): 'positiva' | 'negativa' | 'neutral' {
  if (porcentaje > 5) return 'positiva';
  if (porcentaje < -5) return 'negativa';
  return 'neutral';
}

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Cargando comparaciones históricas...');

    // =============================================
    // 1. OBTENER DATOS DEL CACHE (28 DÍAS)
    // =============================================
    const { data: historicalData, error: historicalError } = await supabase
      .from('cierre_dia_cache')
      .select(`
        fecha_cierre,
        ventas_dia,
        profit_dia_real,
        transacciones,
        margen_dia_real,
        dia_semana
      `)
      .eq('restaurant_id', RESTAURANT_ID)
      .order('fecha_cierre', { ascending: true })
      .limit(28);

    if (historicalError || !historicalData || historicalData.length < 14) {
      return NextResponse.json({
        success: false,
        error: 'Datos insuficientes para comparaciones. Se necesitan al menos 14 días.'
      }, { status: 404 });
    }

    const datos = historicalData as CacheRow[];

    // =============================================
    // 2. COMPARACIÓN: DÍA ACTUAL VS MISMO DÍA SEMANA PASADA
    // =============================================
    const diaActual = datos[datos.length - 1];
    const diaSemanaActual = diaActual.dia_semana;
    
    // Buscar el mismo día de la semana pasada
    const diasMismoDia = datos.filter(d => d.dia_semana === diaSemanaActual);
    const diaPasado = diasMismoDia[diasMismoDia.length - 2]; // Penúltimo del mismo día

    const cambiosDia = {
      ventas: calcularCambio(diaActual.ventas_dia, diaPasado.ventas_dia),
      ganancia: calcularCambio(diaActual.profit_dia_real, diaPasado.profit_dia_real),
      transacciones: calcularCambio(diaActual.transacciones, diaPasado.transacciones),
      margen: calcularCambio(diaActual.margen_dia_real, diaPasado.margen_dia_real)
    };

    const tendenciaDia = getTendencia(cambiosDia.ventas.porcentaje);
    
    // =============================================
    // 3. COMPARACIÓN: SEMANA ACTUAL VS SEMANA PASADA
    // =============================================
    const semanaActual = datos.slice(-7); // Últimos 7 días
    const semanaPasada = datos.slice(-14, -7); // Días 8-14 desde el final

    const calcularSemana = (semana: CacheRow[]) => ({
      ventas: semana.reduce((sum, d) => sum + d.ventas_dia, 0),
      ganancia: semana.reduce((sum, d) => sum + d.profit_dia_real, 0),
      transacciones: semana.reduce((sum, d) => sum + d.transacciones, 0),
      margenPromedio: semana.reduce((sum, d) => sum + d.margen_dia_real, 0) / semana.length,
      diasOperativos: semana.length
    });

    const statsActual = calcularSemana(semanaActual);
    const statsPasada = calcularSemana(semanaPasada);

    const cambiosSemana = {
      ventas: calcularCambio(statsActual.ventas, statsPasada.ventas),
      ganancia: calcularCambio(statsActual.ganancia, statsPasada.ganancia),
      transacciones: calcularCambio(statsActual.transacciones, statsPasada.transacciones),
      margen: calcularCambio(statsActual.margenPromedio, statsPasada.margenPromedio)
    };

    const tendenciaSemana = getTendencia(cambiosSemana.ventas.porcentaje);

    // =============================================
    // 4. GENERAR INSIGHTS
    // =============================================
    const generarInsightsDia = () => {
      const ventasCambio = cambiosDia.ventas.porcentaje;
      const nombreDia = getDiaSemana(diaSemanaActual);
      
      if (ventasCambio > 10) {
        return {
          resumen: `Excelente ${nombreDia}! Las ventas aumentaron ${ventasCambio.toFixed(1)}% vs la semana pasada.`,
          tendencia: 'positiva' as const,
          recomendacion: `Continúa con las estrategias que funcionaron este ${nombreDia}.`
        };
      } else if (ventasCambio < -10) {
        return {
          resumen: `Este ${nombreDia} las ventas bajaron ${Math.abs(ventasCambio).toFixed(1)}% vs la semana pasada.`,
          tendencia: 'negativa' as const,
          recomendacion: `Revisa qué cambió respecto al ${nombreDia} anterior para identificar oportunidades.`
        };
      } else {
        return {
          resumen: `Performance estable en ${nombreDia}, con variación del ${ventasCambio.toFixed(1)}%.`,
          tendencia: 'neutral' as const,
          recomendacion: `Busca oportunidades para incrementar las ventas de ${nombreDia}.`
        };
      }
    };

    const generarInsightsSemana = () => {
      const ventasCambio = cambiosSemana.ventas.porcentaje;
      
      if (ventasCambio > 5) {
        return {
          resumen: `Semana exitosa con crecimiento del ${ventasCambio.toFixed(1)}% en ventas.`,
          tendencia: 'positiva' as const,
          recomendacion: 'Mantén el momentum y replica las estrategias exitosas.'
        };
      } else if (ventasCambio < -5) {
        return {
          resumen: `Las ventas semanales cayeron ${Math.abs(ventasCambio).toFixed(1)}%.`,
          tendencia: 'negativa' as const,
          recomendacion: 'Analiza los factores que impactaron negativamente y ajusta la estrategia.'
        };
      } else {
        return {
          resumen: `Semana estable con variación mínima del ${ventasCambio.toFixed(1)}%.`,
          tendencia: 'neutral' as const,
          recomendacion: 'Busca oportunidades de crecimiento para la próxima semana.'
        };
      }
    };

    // =============================================
    // 5. CONSTRUIR RESPUESTA
    // =============================================
    const response: ComparacionesResponse = {
      diaActualVsPasado: {
        diaActual: {
          nombre: getDiaSemana(diaActual.dia_semana),
          fecha: diaActual.fecha_cierre,
          ventas: diaActual.ventas_dia,
          ganancia: diaActual.profit_dia_real,
          transacciones: diaActual.transacciones,
          margen: diaActual.margen_dia_real
        },
        diaPasado: {
          nombre: getDiaSemana(diaPasado.dia_semana),
          fecha: diaPasado.fecha_cierre,
          ventas: diaPasado.ventas_dia,
          ganancia: diaPasado.profit_dia_real,
          transacciones: diaPasado.transacciones,
          margen: diaPasado.margen_dia_real
        },
        cambios: cambiosDia,
        insights: generarInsightsDia()
      },
      
      semanaActualVsPasada: {
        semanaActual: {
          inicio: semanaActual[0].fecha_cierre,
          fin: semanaActual[semanaActual.length - 1].fecha_cierre,
          ...statsActual
        },
        semanaPasada: {
          inicio: semanaPasada[0].fecha_cierre,
          fin: semanaPasada[semanaPasada.length - 1].fecha_cierre,
          ...statsPasada
        },
        cambios: cambiosSemana,
        insights: generarInsightsSemana()
      }
    };

    console.log('✅ Comparaciones cargadas exitosamente');
    console.log(`📈 Día: ${cambiosDia.ventas.porcentaje.toFixed(1)}% | Semana: ${cambiosSemana.ventas.porcentaje.toFixed(1)}%`);

    return NextResponse.json({
      success: true,
      data: response,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Error en comparaciones:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}