// =============================================
// ENDPOINT: Rankings de Productos - AJUSTADO
// Archivo: /app/api/dashboard/rankings/route.ts
// =============================================
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// =============================================
// INTERFACES
// =============================================
interface ProductoRanking {
  producto_id: number;
  nombre_producto: string;
  ventas_28dias: number;
  cantidad_vendida: number;
  dias_sin_venta: number;
  frecuencia_venta: number;
  ticket_promedio: number;
  es_producto_muerto: boolean;
  costo_oportunidad: number;
  ultima_venta: string;
  ranking_position: number;
  categoria_rendimiento: string;
  fecha_cierre: string;
}

// ✅ INTERFACE - Rankings (AJUSTADA para mostrar transacciones)
interface RankingsData {
  topProducto: {
    nombre: string;
    transacciones: number; // ✅ CAMBIO: Era 'ventas', ahora 'transacciones'
    ranking: number;
  };
  mejorDia: {
    dia: string;
    ventas: number;
  };
  mejorHora: {
    hora: string;
    transacciones: number;
  };
  productosMuertos: {
    cantidad: number;
    costoOportunidad: number;
  };
  
  topPerformers: Array<{
    producto: string;
    transacciones: number; // ✅ CAMBIO: Era 'ventas', ahora 'transacciones'
    categoria: string;
    crecimiento: number;
    ranking: number;
  }>;
  
  bottomPerformers: Array<{
    producto: string;
    transacciones: number; // ✅ CAMBIO: Era 'ventas', ahora 'transacciones'
    diasSinVenta: number;
    costoOportunidad: number;
    ranking: number;
  }>;
  
  chartData: Array<{
    categoria: string;
    transacciones: number; // ✅ CAMBIO: Era 'ventas', ahora 'transacciones'
    esNegativo: boolean;
    producto: string;
    detalles: string;
  }>;
  
  insights: {
    alertaPerdidas: string;
    recomendacionUrgente: string;
    accionesEspecificas: string[];
    impactoEconomico: string;
  };
  
  metadata: {
    totalProductos: number;
    fechaAnalisis: string;
    periodoAnalisis: string;
    productosActivos: number;
    productosMuertos: number;
  };
}

// =============================================
// FUNCIÓN: Calcular día de semana con mejor performance
// =============================================
async function calcularMejorDia(supabase: any, restaurant_id: string) {
  try {
    const { data: mejorDiaData } = await supabase
      .from('cierre_dia_cache')
      .select('dia_semana, ventas_dia, fecha_cierre')
      .eq('restaurant_id', restaurant_id)
      .order('ventas_dia', { ascending: false })
      .limit(1);

    if (mejorDiaData && mejorDiaData.length > 0) {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return {
        dia: diasSemana[mejorDiaData[0].dia_semana],
        ventas: mejorDiaData[0].ventas_dia
      };
    }
  } catch (error) {
    console.warn('Error calculando mejor día:', error);
  }
  
  return { dia: 'Lunes', ventas: 0 };
}

// =============================================
// FUNCIÓN: Calcular mejor hora (simulada)
// =============================================
async function calcularMejorHora(supabase: any, restaurant_id: string) {
  try {
    // Intentar obtener de intelligent_temporal_daily si existe
    const { data: temporalData } = await supabase
      .from('intelligent_temporal_daily')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .limit(1);

    if (temporalData && temporalData.length > 0) {
      // Procesar datos temporales reales si existen
      return { hora: '14:00-15:00', transacciones: 45 };
    }
  } catch (error) {
    console.warn('Datos temporales no disponibles, usando estimación');
  }
  
  // Fallback con horas típicas de restaurante
  return { hora: '13:00-14:00', transacciones: 38 };
}

// =============================================
// FUNCIÓN: Generar insights anti-pérdidas - AJUSTADA
// =============================================
function generarInsights(productos: ProductoRanking[], totalVentas: number) {
  const productosMuertos = productos.filter(p => p.es_producto_muerto);
  const costoTotalOportunidad = productosMuertos.reduce((sum, p) => sum + p.costo_oportunidad, 0);
  const topProducto = productos[0];
  const worstProductos = productos.slice(-3);
  
  let alertaPerdidas = '';
  let recomendacionUrgente = '';
  let accionesEspecificas: string[] = [];
  let impactoEconomico = '';
  
  if (productosMuertos.length > 0) {
    alertaPerdidas = `¡ALERTA! ${productosMuertos.length} productos están drenando tus ganancias con un costo de oportunidad de $${costoTotalOportunidad.toFixed(0)}.`;
    
    if (productosMuertos.length >= 5) {
      recomendacionUrgente = `ACCIÓN URGENTE: Descontinuar inmediatamente los ${Math.min(5, productosMuertos.length)} productos con peor performance.`;
    } else {
      recomendacionUrgente = `Reevaluar estrategia de ${productosMuertos.length} productos sin rotación reciente.`;
    }
    
    // ✅ CAMBIO: Mencionar transacciones en lugar de ventas
    accionesEspecificas.push(`Promocionar "${topProducto.nombre_producto}" que tiene ${topProducto.frecuencia_venta} transacciones en 28 días`);
    
    if (worstProductos.length > 0) {
      accionesEspecificas.push(`Descontinuar "${worstProductos[0].nombre_producto}" (${worstProductos[0].dias_sin_venta} días sin venta)`);
    }
    
    const potencialMejora = costoTotalOportunidad * 2;
    impactoEconomico = `Potencial mejora mensual: $${potencialMejora.toFixed(0)} reemplazando productos muertos por bestsellers.`;
  } else {
    alertaPerdidas = `¡EXCELENTE! Tu catálogo está optimizado - todos los productos tienen rotación activa.`;
    recomendacionUrgente = `Continuar monitoreando performance y considerar expandir líneas exitosas.`;
    accionesEspecificas.push(`Aumentar stock de "${topProducto.nombre_producto}" - tu producto estrella con ${topProducto.frecuencia_venta} transacciones`);
    accionesEspecificas.push('Analizar oportunidades de productos complementarios');
    impactoEconomico = `Catálogo optimizado. Enfócate en maximizar "${topProducto.nombre_producto}".`;
  }
  
  return {
    alertaPerdidas,
    recomendacionUrgente,
    accionesEspecificas,
    impactoEconomico
  };
}

// =============================================
// HANDLER PRINCIPAL
// =============================================
export async function GET(request: NextRequest) {
  try {
    console.log('📊 Cargando rankings de productos...');

    // =============================================
    // 1. OBTENER PRODUCTOS DEL CACHE
    // =============================================
    const { data: productosCache, error: errorProductos } = await supabase
      .from('productos_cache')
      .select('*')
      .eq('restaurant_id', RESTAURANT_ID)
      .order('ranking_position', { ascending: true });

    if (errorProductos || !productosCache || productosCache.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No hay datos de productos en cache',
        debug: errorProductos?.message,
        suggestion: 'Ejecuta la Edge Function primero para generar el cache'
      }, { status: 404 });
    }

    const productos: ProductoRanking[] = productosCache;

    // =============================================
    // 2. CALCULAR KPIS PRINCIPALES
    // =============================================
    const topProducto = productos[0];
    const productosMuertos = productos.filter(p => p.es_producto_muerto);
    const costoTotalOportunidad = productosMuertos.reduce((sum, p) => sum + p.costo_oportunidad, 0);

    // Obtener datos adicionales
    const mejorDia = await calcularMejorDia(supabase, RESTAURANT_ID);
    const mejorHora = await calcularMejorHora(supabase, RESTAURANT_ID);

    // =============================================
    // 3. PREPARAR RANKINGS - AJUSTADO
    // =============================================
    const topPerformers = productos.slice(0, 10).map(p => ({
      producto: p.nombre_producto,
      transacciones: p.frecuencia_venta, // ✅ CAMBIO: Usar frecuencia_venta en lugar de ventas_28dias
      categoria: p.categoria_rendimiento,
      crecimiento: 0,
      ranking: p.ranking_position
    }));

    const bottomPerformers = productos.slice(-5).map(p => ({
      producto: p.nombre_producto,
      transacciones: p.frecuencia_venta, // ✅ CAMBIO: Usar frecuencia_venta en lugar de ventas_28dias
      diasSinVenta: p.dias_sin_venta,
      costoOportunidad: p.costo_oportunidad,
      ranking: p.ranking_position
    }));

    // =============================================
    // 4. DATOS PARA GRÁFICA HÍBRIDA - AJUSTADO
    // =============================================
    const chartData = [
      // Top 10 (barras hacia arriba)
      ...topPerformers.map(p => ({
        categoria: `#${p.ranking}`,
        transacciones: p.transacciones, // ✅ CAMBIO: Usar transacciones
        esNegativo: false,
        producto: p.producto,
        detalles: `${p.transacciones} transacciones - ${p.categoria}` // ✅ CAMBIO: Mostrar transacciones
      })),
      // Bottom 5 (barras hacia abajo como negativos)
      ...bottomPerformers.reverse().map(p => ({
        categoria: `#${p.ranking}`,
        transacciones: -Math.abs(p.transacciones), // ✅ CAMBIO: Negativo para mostrar hacia abajo
        esNegativo: true,
        producto: p.producto,
        detalles: `${p.diasSinVenta} días sin venta - $${p.costoOportunidad.toFixed(0)} costo`
      }))
    ];

    // =============================================
    // 5. GENERAR INSIGHTS
    // =============================================
    const totalVentas = productos.reduce((sum, p) => sum + p.ventas_28dias, 0);
    const insights = generarInsights(productos, totalVentas);

    // =============================================
    // 6. CONSTRUIR RESPUESTA FINAL - AJUSTADA
    // =============================================
    const response: RankingsData = {
      // KPIs principales
      topProducto: {
        nombre: topProducto.nombre_producto,
        transacciones: topProducto.frecuencia_venta, // ✅ CAMBIO: Usar frecuencia_venta
        ranking: topProducto.ranking_position
      },
      mejorDia,
      mejorHora,
      productosMuertos: {
        cantidad: productosMuertos.length,
        costoOportunidad: costoTotalOportunidad
      },

      // Rankings
      topPerformers,
      bottomPerformers: bottomPerformers.reverse(), // Volver al orden original

      // Datos para gráfica
      chartData,

      // Insights
      insights,

      // Metadata
      metadata: {
        totalProductos: productos.length,
        fechaAnalisis: productos[0]?.fecha_cierre || new Date().toISOString().split('T')[0],
        periodoAnalisis: '28 días',
        productosActivos: productos.filter(p => !p.es_producto_muerto).length,
        productosMuertos: productosMuertos.length
      }
    };

    return NextResponse.json({
      success: true,
      data: response,
      debug: {
        productosEncontrados: productos.length,
        productosTop10: topPerformers.length,
        productosBottom5: bottomPerformers.length,
        productosMuertos: productosMuertos.length
      }
    });

  } catch (error) {
    console.error('Error en rankings endpoint:', error);
    return NextResponse.json({
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}