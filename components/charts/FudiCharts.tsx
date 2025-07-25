// components/charts/FudiCharts.tsx
'use client';

import React from 'react';

// Types
export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface ProductData {
  product: string;
  sales: number;
  quantity: number;
  margin: number;
}

export interface PaymentData {
  method: string;
  amount: number;
  percentage: number;
}

export interface KPIData {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color?: string;
}

// Simple Products Chart - Just bars with CSS
interface TopProductsBarChartProps {
  data: ProductData[];
  title?: string;
}

export function FudiTopProductsChart({ 
  data, 
  title = "🏆 Top Productos" 
}: TopProductsBarChartProps) {
  if (!data || data.length === 0) return null;
  
  const maxSales = Math.max(...data.map(d => d.sales));
  
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(96, 165, 250, 0.2)',
      borderRadius: '12px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <h3 style={{ color: '#60a5fa', margin: '0 0 1rem 0' }}>{title}</h3>
      
      {data.slice(0, 5).map((item, index) => (
        <div key={index} style={{ marginBottom: '0.75rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '0.25rem',
            fontSize: '0.9rem',
            color: 'white'
          }}>
            <span>{item.product}</span>
            <span>{item.quantity} vendidos</span>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            height: '20px',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: `linear-gradient(90deg, #60a5fa, #fb923c)`,
              height: '100%',
              width: `${(item.quantity / Math.max(...data.map(d => d.quantity))) * 100}%`,
              borderRadius: '10px',
              transition: 'width 2s ease'
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple Sales Chart - Just lines with CSS
interface SalesLineChartProps {
  data: SalesData[];
  title?: string;
  animate?: boolean;
}

export function FudiSalesLineChart({ 
  data, 
  title = "📈 Ventas por Día" 
}: SalesLineChartProps) {
  if (!data || data.length === 0) return null;
  
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(96, 165, 250, 0.2)',
      borderRadius: '12px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <h3 style={{ color: '#60a5fa', margin: '0 0 1rem 0' }}>{title}</h3>
      
      {data.map((item, index) => (
        <div key={index} style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: index < data.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          color: 'white'
        }}>
          <span>{item.date}</span>
          <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>
            ${item.sales.toLocaleString()}
          </span>
          <span style={{ color: '#fb923c' }}>
            {item.orders} órdenes
          </span>
        </div>
      ))}
    </div>
  );
}

// Simple Payment Chart - Just percentages
interface PaymentMethodsPieProps {
  data: PaymentData[];
  title?: string;
}

export function FudiPaymentMethodsChart({ 
  data, 
  title = "💳 Métodos de Pago" 
}: PaymentMethodsPieProps) {
  if (!data || data.length === 0) return null;
  
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(96, 165, 250, 0.2)',
      borderRadius: '12px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <h3 style={{ color: '#60a5fa', margin: '0 0 1rem 0' }}>{title}</h3>
      
      {data.map((item, index) => (
        <div key={index} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 0',
          color: 'white'
        }}>
          <span>{item.method}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>${item.amount.toLocaleString()}</span>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              width: '100px',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: index === 0 ? '#60a5fa' : '#fb923c',
                width: `${item.percentage}%`,
                height: '100%',
                borderRadius: '4px'
              }} />
            </div>
            <span style={{ fontSize: '0.9rem', color: '#60a5fa' }}>
              {item.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple KPI Card
interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color?: string;
}

export function FudiKPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon 
}: KPICardProps) {
  const isPositive = change >= 0;
  
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(96, 165, 250, 0.2)',
      borderRadius: '10px',
      padding: '1rem',
      textAlign: 'center',
      minWidth: '150px'
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        {title}
      </div>
      <div style={{ color: '#60a5fa', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div style={{ fontSize: '0.8rem', color: isPositive ? '#10b981' : '#ef4444' }}>
        {isPositive ? '↗' : '↘'} {Math.abs(change)}% {changeLabel}
      </div>
    </div>
  );
}

// Simple Dashboard
interface FudiDashboardProps {
  salesData: SalesData[];
  productsData: ProductData[];
  paymentsData: PaymentData[];
  kpis: KPIData[];
}

export function FudiMiniDashboard({ 
  salesData, 
  productsData, 
  paymentsData, 
  kpis 
}: FudiDashboardProps) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {kpis.map((kpi, index) => (
          <FudiKPICard key={index} {...kpi} />
        ))}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        <FudiSalesLineChart data={salesData} />
        <FudiTopProductsChart data={productsData} />
      </div>
      
      <FudiPaymentMethodsChart data={paymentsData} />
    </div>
  );
}

// No styles needed
export function FudiChartsStyles() {
  return null;
}