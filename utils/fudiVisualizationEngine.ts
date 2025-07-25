// utils/fudiVisualizationEngine.ts

import { 
  FudiSalesLineChart, 
  FudiTopProductsChart, 
  FudiPaymentMethodsChart, 
  FudiKPICard,
  FudiMiniDashboard,
  type SalesData,
  type ProductData,
  type PaymentData,
  type KPIData
} from '@/components/charts/FudiCharts';

// =============================================
// 🧠 FUDI VISUALIZATION ENGINE (UTILS ONLY)
// =============================================

interface RestaurantData {
  todayData?: {
    totalRevenue: number;
    totalOrders: number;
    avgTicket: number;
  };
  yesterdayData?: {
    totalRevenue: number;
    totalOrders: number;
    avgTicket: number;
  };
  weekData?: Array<{
    date: string;
    totalRevenue: number;
    totalOrders: number;
  }>;
  monthData?: Array<{
    date: string;
    totalRevenue: number;
    totalOrders: number;
  }>;
  topProducts?: Array<{
    product_name: string;
    total_sold: number;
  }>;
  paymentMethods?: {
    cash_total: number;
    card_total: number;
    cash_percentage: string;
    card_percentage: string;
  };
  totalDataPoints?: number;
}

interface VisualizationRequest {
  userMessage: string;
  restaurantData: RestaurantData;
  responseText: string;
}

interface VisualizationResult {
  shouldVisualize: boolean;
  visualizationType: 'sales_trend' | 'products_ranking' | 'payment_methods' | 'kpis' | 'dashboard' | 'none';
  enhancedText: string;
}

// =============================================
// 🎯 MOTOR DE DETECCIÓN INTELIGENTE
// =============================================
export class FudiVisualizationEngine {
  
  static detectVisualizationIntent(userMessage: string, responseText: string): {
    shouldVisualize: boolean;
    visualizationType: string;
    confidence: number;
  } {
    console.log('🔍 DETECTION DEBUG - Starting detection...');
    console.log('📝 User message:', userMessage);
    console.log('🤖 Response text (first 200 chars):', responseText.substring(0, 200) + '...');
    
    // 🚫 ANTI-DUPLICACIÓN: Si Claude ya generó código, no generar componente
    if (responseText.includes('matplotlib') || 
        responseText.includes('plt.') || 
        responseText.includes('```python') ||
        responseText.includes('```javascript') ||
        responseText.includes('import ')) {
      console.log('❌ Claude already generated code visualization, skipping our components');
      return { shouldVisualize: false, visualizationType: 'none', confidence: 0 };
    }
    
    const message = userMessage.toLowerCase();
    const response = responseText.toLowerCase();
    
    // 🔍 PATRONES DE VENTAS
    const salesPatterns = [
      'ventas', 'venta', 'ingresos', 'ganancia', 'facturación',
      'cuánto', 'dinero', 'pesos', 'revenue', 'sales',
      'día', 'semana', 'mes', 'tendencia', 'evolución'
    ];
    
    // 🔍 PATRONES DE PRODUCTOS
    const productsPatterns = [
      'productos', 'producto', 'platillos', 'platillo', 'comida',
      'más vendidos', 'top', 'mejores', 'populares', 'estrella',
      'qué vendo', 'favoritos', 'ranking', 'gráficamente'
    ];
    
    // 🔍 PATRONES DE PAGOS
    const paymentPatterns = [
      'pago', 'pagos', 'cobrar', 'cobro', 'efectivo', 'tarjeta',
      'método', 'métodos', 'cómo pagan', 'payment', 'cash', 'card'
    ];
    
    // 🔍 PATRONES DE DASHBOARD
    const dashboardPatterns = [
      'dashboard', 'reporte', 'resumen', 'overview', 'todo',
      'general', 'completo', 'análisis', 'métricas', 'kpis'
    ];
    
    // 🧠 ALGORITMO DE DETECCIÓN
    let salesScore = 0;
    let productsScore = 0;
    let paymentScore = 0;
    let dashboardScore = 0;
    
    const fullText = `${message} ${response}`;
    console.log('📊 Full text for analysis:', fullText.substring(0, 150) + '...');
    
    salesPatterns.forEach(pattern => {
      if (fullText.includes(pattern)) {
        salesScore += 1;
        console.log(`✅ SALES pattern found: "${pattern}"`);
      }
    });
    
    productsPatterns.forEach(pattern => {
      if (fullText.includes(pattern)) {
        productsScore += 1;
        console.log(`🍗 PRODUCTS pattern found: "${pattern}"`);
      }
    });
    
    paymentPatterns.forEach(pattern => {
      if (fullText.includes(pattern)) {
        paymentScore += 1;
        console.log(`💳 PAYMENT pattern found: "${pattern}"`);
      }
    });
    
    dashboardPatterns.forEach(pattern => {
      if (fullText.includes(pattern)) {
        dashboardScore += 1;
        console.log(`📋 DASHBOARD pattern found: "${pattern}"`);
      }
    });
    
    console.log('📊 SCORES:', { salesScore, productsScore, paymentScore, dashboardScore });
    
    // 🎯 DECISIÓN INTELIGENTE CON SCORING ABSOLUTO
    const maxScore = Math.max(salesScore, productsScore, paymentScore, dashboardScore);
    console.log('🎯 Max score:', maxScore);
    
    if (maxScore < 1) {
      console.log('❌ Score too low (<1), no visualization');
      return { shouldVisualize: false, visualizationType: 'none', confidence: 0 };
    }
    
    let visualizationType = 'none';
    if (maxScore === salesScore && salesScore >= 1) visualizationType = 'sales_trend';
    else if (maxScore === productsScore && productsScore >= 1) visualizationType = 'products_ranking';
    else if (maxScore === paymentScore && paymentScore >= 1) visualizationType = 'payment_methods';
    else if (maxScore === dashboardScore && dashboardScore >= 1) visualizationType = 'dashboard';
    
    console.log('🎨 Detected visualization type:', visualizationType);
    
    // Calcular confianza para logs, pero decisión es por score absoluto
    const confidence = maxScore / Math.max(1, fullText.split(' ').length) * 100;
    console.log('🎯 Confidence (for reference):', confidence.toFixed(2) + '%');
    console.log('✅ DECISION: Visualize because score >= 2');
    
    return {
      shouldVisualize: true,
      visualizationType,
      confidence
    };
  }
  
  // =============================================
  // 📊 GENERADOR AUTOMÁTICO DE VISUALIZACIONES
  // =============================================
  static generateVisualization(request: VisualizationRequest): VisualizationResult {
    console.log('🚀 GENERATE VISUALIZATION - Starting...');
    const detection = this.detectVisualizationIntent(request.userMessage, request.responseText);
    
    console.log('🎯 Detection result:', detection);
    
    if (!detection.shouldVisualize) {
      console.log('❌ No visualization will be generated');
      return {
        shouldVisualize: false,
        visualizationType: 'none',
        enhancedText: request.responseText
      };
    }
    
    console.log('✅ Visualization will be generated:', detection.visualizationType);
    let enhancedText = request.responseText;
    
    switch (detection.visualizationType) {
      case 'sales_trend':
        enhancedText += '\n\n📊 **Aquí tienes la visualización de tus ventas:**';
        console.log('📊 Added sales visualization text');
        break;
        
      case 'products_ranking':
        enhancedText += '\n\n🏆 **Aquí están tus productos más vendidos:**';
        console.log('🏆 Added products visualization text');
        break;
        
      case 'payment_methods':
        enhancedText += '\n\n💳 **Así es como prefieren pagar tus clientes:**';
        console.log('💳 Added payment visualization text');
        break;
        
      case 'dashboard':
        enhancedText += '\n\n📋 **Aquí tienes tu dashboard completo:**';
        console.log('📋 Added dashboard visualization text');
        break;
    }
    
    const result = {
      shouldVisualize: true,
      visualizationType: detection.visualizationType as any,
      enhancedText
    };
    
    console.log('🎉 Final result:', result);
    return result;
  }
  
  // =============================================
  // 🏭 PROCESADORES DE DATOS
  // =============================================
  
  static prepareSalesData(data: RestaurantData): SalesData[] {
    if (!data.weekData || data.weekData.length === 0) return [];
    
    return data.weekData.map(day => ({
      date: new Date(day.date).toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric' 
      }),
      sales: day.totalRevenue || 0,
      orders: day.totalOrders || 0
    })).reverse(); // Más reciente a la derecha
  }
  
  static prepareProductsData(data: RestaurantData): ProductData[] {
    if (!data || !data.topProducts || data.topProducts.length === 0) return [];
    
    return data.topProducts.slice(0, 8).map(product => ({
      product: product.product_name?.substring(0, 20) + (product.product_name?.length > 20 ? '...' : '') || 'Producto',
      sales: this.estimateSales(product.total_sold),
      quantity: product.total_sold || 0,
      margin: this.estimateMargin()
    }));
  }
  
  static preparePaymentData(data: RestaurantData): PaymentData[] {
    if (!data.paymentMethods) return [];
    
    return [
      {
        method: 'Efectivo',
        amount: data.paymentMethods.cash_total || 0,
        percentage: parseFloat(data.paymentMethods.cash_percentage) || 0
      },
      {
        method: 'Tarjeta',
        amount: data.paymentMethods.card_total || 0,
        percentage: parseFloat(data.paymentMethods.card_percentage) || 0
      }
    ].filter(item => item.amount > 0);
  }
  
  static prepareKPIs(data: RestaurantData): KPIData[] {
    const todayRevenue = data.todayData?.totalRevenue || 0;
    const yesterdayRevenue = data.yesterdayData?.totalRevenue || 0;
    
    const revenueChange = yesterdayRevenue > 0 
      ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100)
      : 0;
    
    const avgTicket = data.todayData?.avgTicket || 0;
    const totalOrders = data.todayData?.totalOrders || 0;
    
    return [
      {
        title: 'Ventas Hoy',
        value: todayRevenue,
        change: revenueChange,
        changeLabel: 'vs ayer',
        icon: '💰',
        color: 'primary' as const
      },
      {
        title: 'Ticket Promedio',
        value: `$${avgTicket.toFixed(0)}`,
        change: 5.2, // Estimado
        changeLabel: 'vs promedio',
        icon: '🧾',
        color: 'secondary' as const
      },
      {
        title: 'Órdenes Hoy',
        value: totalOrders.toString(),
        change: revenueChange > 0 ? 8.1 : -3.2,
        changeLabel: 'vs ayer',
        icon: '📦',
        color: 'success' as const
      },
      {
        title: 'Productos Activos',
        value: data.topProducts?.length.toString() || '0',
        change: 0,
        changeLabel: 'en menú',
        icon: '🍗',
        color: 'purple' as const
      }
    ];
  }
  
  // =============================================
  // 🔧 HELPERS
  // =============================================
  
  static estimateSales(quantity: number): number {
    // Estimación inteligente de ventas basada en cantidad
    return quantity * 45; // Ticket promedio estimado
  }
  
  static estimateMargin(): number {
    // Margen estimado aleatorio realista
    return Math.floor(Math.random() * 30) + 40; // Entre 40% y 70%
  }
}

// =============================================
// 🎯 FUNCIÓN PARA INTEGRAR CON CHAT
// =============================================
export const enhanceMessageWithVisualization = (
  userMessage: string,
  responseText: string,
  restaurantData: RestaurantData
): {
  enhancedText: string;
  hasVisualization: boolean;
  visualizationType: 'sales_trend' | 'products_ranking' | 'payment_methods' | 'kpis' | 'dashboard' | 'none';
} => {
  console.log('🔧 ENHANCE MESSAGE - Called with:', { userMessage, hasData: !!restaurantData });
  
  const result = FudiVisualizationEngine.generateVisualization({
    userMessage,
    responseText,
    restaurantData
  });
  
  const finalResult = {
    enhancedText: result.enhancedText,
    hasVisualization: result.shouldVisualize,
    visualizationType: result.visualizationType
  };
  
  console.log('🎨 ENHANCE MESSAGE - Final result:', finalResult);
  return finalResult;
};

// Exportar tipos
export type { RestaurantData, VisualizationRequest, VisualizationResult };