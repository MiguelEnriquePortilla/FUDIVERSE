// components/fudiverse/FudiSmartVisualization.tsx
'use client';

import React from 'react';
import { 
  FudiSalesLineChart, 
  FudiTopProductsChart, 
  FudiPaymentMethodsChart, 
  FudiMiniDashboard 
} from '@/components/charts/FudiCharts';
import { 
  FudiVisualizationEngine, 
  type RestaurantData 
} from '@/utils/fudiVisualizationEngine';

// =============================================
// 🎨 COMPONENTE WRAPPER PARA REACT
// =============================================
interface FudiSmartVisualizationProps {
  userMessage: string;
  responseText: string;
  restaurantData: RestaurantData;
}

export const FudiSmartVisualization: React.FC<FudiSmartVisualizationProps> = ({
  userMessage,
  responseText,
  restaurantData
}) => {
  const result = FudiVisualizationEngine.generateVisualization({
    userMessage,
    responseText,
    restaurantData
  });
  
  if (!result.shouldVisualize) {
    return null;
  }
  
  // 🎯 RENDERIZAR COMPONENTE SEGÚN TIPO
  const renderVisualization = () => {
    switch (result.visualizationType) {
      case 'sales_trend':
        const salesData = FudiVisualizationEngine.prepareSalesData(restaurantData);
        if (salesData.length === 0) return null;
        return (
          <FudiSalesLineChart 
            data={salesData}
            title="📈 Tendencia de Ventas (Última Semana)"
            animate={true}
          />
        );
        
      case 'products_ranking':
        const productsData = FudiVisualizationEngine.prepareProductsData(restaurantData);
        if (productsData.length === 0) return null;
        return (
          <FudiTopProductsChart 
            data={productsData}
            title="🏆 Productos Más Vendidos"
          />
        );
        
      case 'payment_methods':
        const paymentData = FudiVisualizationEngine.preparePaymentData(restaurantData);
        if (paymentData.length === 0) return null;
        return (
          <FudiPaymentMethodsChart 
            data={paymentData}
            title="💳 Preferencias de Pago"
          />
        );
        
      case 'dashboard':
        const kpis = FudiVisualizationEngine.prepareKPIs(restaurantData);
        const salesDataDash = FudiVisualizationEngine.prepareSalesData(restaurantData);
        const productsDataDash = FudiVisualizationEngine.prepareProductsData(restaurantData).slice(0, 6);
        const paymentsDataDash = FudiVisualizationEngine.preparePaymentData(restaurantData);
        
        if (salesDataDash.length === 0 && productsDataDash.length === 0 && paymentsDataDash.length === 0) {
          return null;
        }
        
        return (
          <FudiMiniDashboard
            salesData={salesDataDash}
            productsData={productsDataDash}
            paymentsData={paymentsDataDash}
            kpis={kpis}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fudi-smart-visualization">
      {renderVisualization()}
    </div>
  );
};