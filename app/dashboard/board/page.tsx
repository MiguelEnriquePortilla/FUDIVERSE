'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  TrendingUp, ArrowUp, ArrowDown, Activity, 
  Brain, MessageCircle, Users, DollarSign,
  Crown, Zap, Target, RefreshCw, Clock, Wifi,
  BarChart3, MessageSquare, User, LogOut,
  Award, TrendingDown, Calendar, CreditCard,
  Settings, ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, BarChart, Bar, ComposedChart, ReferenceLine } from 'recharts';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiCTA } from '@/components/fudiverse/FudiCTA/FudiCTA';
import '@/styles/pages/dashboard.css';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// ✅ INTERFACE - Métricas Principales 28 Días
interface MetricasPrincipalesData {
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

// ✅ INTERFACE - Comparaciones
interface ComparacionesData {
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

// ✅ INTERFACE - Rankings
interface RankingsData {
  topProducto: {
    nombre: string;
    ventas: number;
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
    ventas: number;
    categoria: string;
    crecimiento: number;
    ranking: number;
  }>;
  
  bottomPerformers: Array<{
    producto: string;
    ventas: number;
    diasSinVenta: number;
    costoOportunidad: number;
    ranking: number;
  }>;
  
  chartData: Array<{
    categoria: string;
    ventas: number;
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

// ✅ SECCIONES DEL DASHBOARD
const DASHBOARD_SECTIONS = [
  {
    id: 'main-metrics',
    title: 'Métricas Principales',
    icon: BarChart3,
    emoji: '📊',
    description: 'Las noticias de hoy'
  },
  {
    id: 'historical',
    title: 'Comparaciones',
    icon: TrendingUp,
    emoji: '📈',
    description: 'vs histórico'
  },
  {
    id: 'rankings',
    title: 'Rankings',
    icon: Award,
    emoji: '🏅',
    description: 'Tu posición'
  },
  {
    id: 'trends',
    title: 'Tendencias',
    icon: Activity,
    emoji: '📊',
    description: 'Predicciones'
  },
  {
    id: 'payments',
    title: 'Análisis Pagos',
    icon: CreditCard,
    emoji: '💳',
    description: 'Formas de pago'
  },
  {
    id: 'operations',
    title: 'Operaciones',
    icon: Settings,
    emoji: '⚙️',
    description: 'Métricas clave'
  }
];

export default function FudiBoardPage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [metricas, setMetricas] = useState<MetricasPrincipalesData | null>(null);
  const [comparaciones, setComparaciones] = useState<ComparacionesData | null>(null);
  const [rankings, setRankings] = useState<RankingsData | null>(null);
  const [datosGraficaMejorada, setDatosGraficaMejorada] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeSection, setActiveSection] = useState('main-metrics');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ✅ LOGOUT FUNCTION
  const handleLogout = (): void => {
    try {
      localStorage.removeItem('fudi_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('restaurant_data');
      localStorage.removeItem('dashboard_cache');
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout process:', error);
      window.location.href = '/';
    }
  };

  // ✅ FUNCIÓN - Cargar Métricas Principales 28 Días
  const cargarMetricasPrincipales28Dias = async () => {
    try {
      console.log('📊 Cargando métricas principales 28 días...');
      
      const response = await fetch('/api/dashboard/metricas-principales-28dias');
      const apiData = await response.json();
      
      if (apiData.success && apiData.data) {
        console.log('✅ Métricas principales cargadas:', apiData.data);
        setMetricas(apiData.data);
        setLastUpdated(apiData.lastUpdated);
        setLoading(false);
      } else {
        console.error('❌ Error en API métricas principales:', apiData.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('💥 Error cargando métricas principales:', error);
      setLoading(false);
    }
  };

  // ✅ FUNCIÓN - Cargar Comparaciones MEJORADA
  const cargarComparaciones = async () => {
    try {
      console.log('📊 Cargando comparaciones históricas...');
      
      const response = await fetch('/api/dashboard/comparaciones');
      const apiData = await response.json();
      
      if (apiData.success && apiData.data) {
        console.log('✅ Comparaciones cargadas:', apiData.data);
        setComparaciones(apiData.data);
        
        // Procesar datos MEJORADOS para gráfica comparativa
        const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const graficaMejorada = [];
        
        const semanaActual = apiData.data.semanaActualVsPasada.semanaActual;
        const semanaPasada = apiData.data.semanaActualVsPasada.semanaPasada;
        
        // Crear datos día por día con diferencias
        for (let i = 0; i < 7; i++) {
          const ventasPasada = semanaPasada.ventas / 7; // Promedio diario semana pasada
          const ventasActual = semanaActual.ventas / 7;  // Promedio diario semana actual
          
          // Calcular diferencia porcentual
          const diferenciaPorcentaje = ventasPasada !== 0 
            ? ((ventasActual - ventasPasada) / ventasPasada) * 100 
            : 0;
          
          graficaMejorada.push({
            dia: diasSemana[i],
            semanaPasada: ventasPasada,      // ← IZQUIERDA (cronológico)
            semanaActual: ventasActual,      // ← DERECHA (más reciente)
            diferenciaPorcentaje: diferenciaPorcentaje, // ← LÍNEA PUNTEADA
            diferencia: ventasActual - ventasPasada     // ← Para tooltip
          });
        }
        
        setDatosGraficaMejorada(graficaMejorada);
        setLoading(false);
      } else {
        console.error('❌ Error en API comparaciones:', apiData.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('💥 Error cargando comparaciones:', error);
      setLoading(false);
    }
  };

  // ✅ FUNCIÓN - Cargar Rankings NUEVA
  const cargarRankings = async () => {
    try {
      console.log('🏅 Cargando rankings de productos...');
      
      const response = await fetch('/api/dashboard/rankings');
      const apiData = await response.json();
      
      if (apiData.success && apiData.data) {
        console.log('✅ Rankings cargados:', apiData.data);
        setRankings(apiData.data);
        setLoading(false);
      } else {
        console.error('❌ Error en API rankings:', apiData.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('💥 Error cargando rankings:', error);
      setLoading(false);
    }
  };

  // ✅ EFFECTS
  useEffect(() => {
    const loadUserData = () => {
      try {
        const token = localStorage.getItem('fudi_token');
        if (token) {
          const decoded = JSON.parse(atob(token));
          setUserData({
            restaurantName: decoded.restaurantName || 'RESTAURANTE',
            ownerName: decoded.ownerName || 'OPERADOR',
            restaurantId: decoded.restaurantId || RESTAURANT_ID
          });
        } else {
          setUserData({
            restaurantName: 'RESTAURANTE',
            ownerName: 'OPERADOR',
            restaurantId: RESTAURANT_ID
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserData({
          restaurantName: 'RESTAURANTE',
          ownerName: 'OPERADOR',
          restaurantId: RESTAURANT_ID
        });
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (userData?.restaurantId) {
      if (activeSection === 'main-metrics') {
        cargarMetricasPrincipales28Dias();
      } else if (activeSection === 'historical') {
        cargarComparaciones();
      } else if (activeSection === 'rankings') {
        cargarRankings();
      }
    }
  }, [userData, activeSection]);

  useEffect(() => {
    if (!userData?.restaurantId) return;
    
    const interval = setInterval(() => {
      if (activeSection === 'main-metrics') {
        cargarMetricasPrincipales28Dias();
      } else if (activeSection === 'historical') {
        cargarComparaciones();
      } else if (activeSection === 'rankings') {
        cargarRankings();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userData, activeSection]);

  // ✅ FORMAT FUNCTION
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ✅ CUSTOM TOOLTIPS
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip-professional">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="tooltip-entry" style={{ color: entry.color }}>
              {entry.dataKey === 'ventas' && `Ventas: ${formatMoney(entry.value)}`}
              {entry.dataKey === 'ganancia' && `Ganancia: ${formatMoney(entry.value)}`}
              {entry.dataKey === 'ordenes' && `Órdenes: ${entry.value}`}
              {entry.dataKey === 'objetivo' && `Objetivo: ${formatMoney(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ✅ CUSTOM TOOLTIP COMPARACIÓN MEJORADO
  const CustomTooltipComparacionMejorado = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      
      return (
        <div className="chart-tooltip-professional">
          <p className="tooltip-label">{`${label}`}</p>
          
          {/* Semana Pasada */}
          <p className="tooltip-entry" style={{ color: '#6b7280' }}>
            Semana pasada: {formatMoney(data?.semanaPasada || 0)}
          </p>
          
          {/* Esta Semana */}
          <p className="tooltip-entry" style={{ color: '#10b981' }}>
            Esta semana: {formatMoney(data?.semanaActual || 0)}
          </p>
          
          {/* Diferencia */}
          <div className="tooltip-divider" style={{ 
            borderTop: '1px solid rgba(255,255,255,0.2)', 
            margin: '0.5rem 0' 
          }}></div>
          
          <p className="tooltip-entry" style={{ 
            color: data?.diferenciaPorcentaje >= 0 ? '#10b981' : '#ef4444',
            fontWeight: 'bold'
          }}>
            {data?.diferenciaPorcentaje >= 0 ? '↗️' : '↘️'} 
            {data?.diferenciaPorcentaje >= 0 ? '+' : ''}
            {data?.diferenciaPorcentaje?.toFixed(1)}%
          </p>
          
          <p className="tooltip-entry" style={{ color: '#fbbf24', fontSize: '0.8rem' }}>
            Diferencia: {formatMoney(data?.diferencia || 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  // ✅ CUSTOM TOOLTIP RANKINGS
  const CustomTooltipRankings = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      
      return (
        <div className="chart-tooltip-professional">
          <p className="tooltip-label">{`${label}`}</p>
          
          {/* Top Performers */}
          {!data?.esNegativo && (
            <>
              <p className="tooltip-entry" style={{ color: '#10b981' }}>
                🏆 {data?.producto}
              </p>
              <p className="tooltip-entry" style={{ color: '#60a5fa' }}>
                Ventas: {formatMoney(data?.ventas || 0)}
              </p>
              <p className="tooltip-entry" style={{ color: '#fbbf24', fontSize: '0.8rem' }}>
                {data?.detalles}
              </p>
            </>
          )}
          
          {/* Bottom Performers */}
          {data?.esNegativo && (
            <>
              <p className="tooltip-entry" style={{ color: '#ef4444' }}>
                ⚠️ {data?.producto}
              </p>
              <p className="tooltip-entry" style={{ color: '#f97316' }}>
                Ventas: {formatMoney(Math.abs(data?.ventas) || 0)}
              </p>
              <p className="tooltip-entry" style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                {data?.detalles}
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  // ✅ RENDER DE SECCIÓN ACTIVA
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'main-metrics':
        if (!metricas) return null;
        
        return (
          <div className="professional-dashboard-section">
            
            {/* HERO TITLE PROFESIONAL */}
            <div className="section-header-professional">
              <h1 className="section-title-professional">Métricas Principales</h1>
              <p className="section-subtitle-professional">Análisis inteligente de tu negocio - Últimas 4 semanas</p>
            </div>

            {/* KPI STRIP SUPERIOR */}
            <div className="kpi-strip-professional">
              
              {/* VENTAS HOY */}
              <div className="kpi-card-professional sales">
                <div className="kpi-header">
                  <div className="kpi-icon">$</div>
                  <div className="kpi-info">
                    <h3>Ventas Hoy</h3>
                    <p>Facturación actual</p>
                  </div>
                </div>
                <div className="kpi-value">{formatMoney(metricas.ventasHoy)}</div>
                <div className="kpi-change positive">
                  {metricas.vsAyer >= 0 ? '+' : ''}{metricas.vsAyer.toFixed(1)}% vs ayer
                </div>
              </div>

              {/* MARGEN REAL */}
              <div className="kpi-card-professional margin">
                <div className="kpi-header">
                  <div className="kpi-icon">%</div>
                  <div className="kpi-info">
                    <h3>Margen Real</h3>
                    <p>Ganancia por peso</p>
                  </div>
                </div>
                <div className="kpi-value">{metricas.margenReal.toFixed(1)}%</div>
                <div className="kpi-change">
                  ${(metricas.margenReal / 100).toFixed(2)} por peso vendido
                </div>
              </div>

              {/* ÓRDENES HOY */}
              <div className="kpi-card-professional orders">
                <div className="kpi-header">
                  <div className="kpi-icon">#</div>
                  <div className="kpi-info">
                    <h3>Órdenes Hoy</h3>
                    <p>Transacciones procesadas</p>
                  </div>
                </div>
                <div className="kpi-value">{metricas.transacciones}</div>
                <div className="kpi-change">
                  Ticket: {formatMoney(metricas.ticketPromedio)}
                </div>
              </div>

              {/* PROGRESO */}
              <div className="kpi-card-professional progress">
                <div className="kpi-header">
                  <div className="kpi-icon">⟶</div>
                  <div className="kpi-info">
                    <h3>Progreso</h3>
                    <p>Meta: {formatMoney(metricas.objetivoDinamico)}</p>
                  </div>
                </div>
                <div className="kpi-value">{metricas.progreso.toFixed(1)}%</div>
                <div className="progress-bar-kpi">
                  <div 
                    className="progress-fill-kpi"
                    style={{ width: `${Math.min(metricas.progreso, 100)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* GRÁFICA MULTILINE GIGANTE */}
            <div className="chart-container-giant">
              <div className="chart-header-professional">
                <h3>Análisis de 4 semanas de Ventas, Ganancias, Órdenes, y Objetivos</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart 
                  data={metricas.metricas28Dias || []}
                  margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="ventasBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5f2607ff" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#271781ff" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  
                  <XAxis 
                    dataKey="nombreDia" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                  />
                  
                  <YAxis 
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    domain={[0, 250]}
                  />
                  
                  <Tooltip content={<CustomTooltip />} />
                  
                  <Bar
                    yAxisId="left"
                    dataKey="ventas"
                    fill="url(#ventasBarGradient)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="ganancia"
                    stroke="#047857"
                    strokeWidth={3}
                    dot={{ fill: '#047857', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#047857', strokeWidth: 3 }}
                  />
                  
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="ordenes"
                    stroke="#0f766e"
                    strokeWidth={3}
                    dot={{ fill: '#0f766e', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#0f766e', strokeWidth: 3 }}
                  />
                  
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="objetivo"
                    stroke="#9ca3af"
                    strokeWidth={2.5}
                    strokeDasharray="8 8"
                    dot={false}
                    activeDot={{ r: 5, stroke: '#9ca3af', strokeWidth: 2 }}
                  />
                  
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* INSIGHT GENERAL DEL DÍA */}
            <div className="daily-insight-professional">            
              <div className="insight-content-professional">
                <h4 className="insight-title-professional">Análisis Inteligente</h4>
                <p className="insight-description-professional">
                  <strong>Patrón semanal:</strong> {metricas.insights?.ventasInsight}
                </p>
                <p className="insight-description-professional">
                  <strong>Tendencia:</strong> {metricas.insights?.tendenciaGeneral}
                </p>
                <p className="insight-description-professional">
                  <strong>Recomendación:</strong> {metricas.insights?.recomendacion}
                </p>
              </div>
            
              <FudiCTA variant="vertical" size="large" />
            </div>

          </div>
        );

      case 'historical':
        if (!comparaciones) return null;
        
        return (
          <div className="professional-dashboard-section">
            
            {/* HERO TITLE PROFESIONAL */}
            <div className="section-header-professional">
              <h1 className="section-title-professional">Análisis Histórico</h1>
              <p className="section-subtitle-professional">Comparaciones inteligentes - Rendimiento vs períodos anteriores</p>
            </div>

            {/* KPI STRIP SUPERIOR - COMPARACIONES */}
            <div className="kpi-strip-professional">
              
              {/* CAMBIO EN VENTAS */}
              <div className="kpi-card-professional sales">
                <div className="kpi-header">
                  <div className="kpi-icon">📈</div>
                  <div className="kpi-info">
                    <h3>Cambio en Ventas</h3>
                    <p>vs semana pasada</p>
                  </div>
                </div>
                <div className="kpi-value">
                  {comparaciones.semanaActualVsPasada.cambios.ventas.porcentaje >= 0 ? '+' : ''}
                  {comparaciones.semanaActualVsPasada.cambios.ventas.porcentaje.toFixed(1)}%
                </div>
                <div className={`kpi-change ${comparaciones.semanaActualVsPasada.cambios.ventas.porcentaje >= 0 ? 'positive' : 'negative'}`}>
                  {formatMoney(comparaciones.semanaActualVsPasada.cambios.ventas.absoluto)} diferencia
                </div>
              </div>

              {/* CAMBIO EN GANANCIA */}
              <div className="kpi-card-professional margin">
                <div className="kpi-header">
                  <div className="kpi-icon">💰</div>
                  <div className="kpi-info">
                    <h3>Cambio en Ganancia</h3>
                    <p>vs semana pasada</p>
                  </div>
                </div>
                <div className="kpi-value">
                  {comparaciones.semanaActualVsPasada.cambios.ganancia.porcentaje >= 0 ? '+' : ''}
                  {comparaciones.semanaActualVsPasada.cambios.ganancia.porcentaje.toFixed(1)}%
                </div>
                <div className={`kpi-change ${comparaciones.semanaActualVsPasada.cambios.ganancia.porcentaje >= 0 ? 'positive' : 'negative'}`}>
                  {formatMoney(comparaciones.semanaActualVsPasada.cambios.ganancia.absoluto)} diferencia
                </div>
              </div>

              {/* CAMBIO EN ÓRDENES */}
              <div className="kpi-card-professional orders">
                <div className="kpi-header">
                  <div className="kpi-icon">🛍️</div>
                  <div className="kpi-info">
                    <h3>Cambio en Órdenes</h3>
                    <p>vs semana pasada</p>
                  </div>
                </div>
                <div className="kpi-value">
                  {comparaciones.semanaActualVsPasada.cambios.transacciones.porcentaje >= 0 ? '+' : ''}
                  {comparaciones.semanaActualVsPasada.cambios.transacciones.porcentaje.toFixed(1)}%
                </div>
                <div className={`kpi-change ${comparaciones.semanaActualVsPasada.cambios.transacciones.porcentaje >= 0 ? 'positive' : 'negative'}`}>
                  {comparaciones.semanaActualVsPasada.cambios.transacciones.absoluto >= 0 ? '+' : ''}
                  {comparaciones.semanaActualVsPasada.cambios.transacciones.absoluto.toFixed(0)} órdenes
                </div>
              </div>

              {/* TENDENCIA GENERAL */}
              <div className="kpi-card-professional progress">
                <div className="kpi-header">
                  <div className="kpi-icon">📊</div>
                  <div className="kpi-info">
                    <h3>Tendencia Semanal</h3>
                    <p>Análisis general</p>
                  </div>
                </div>
                <div className="kpi-value">
                  {comparaciones.semanaActualVsPasada.insights.tendencia === 'positiva' ? '📈' : 
                   comparaciones.semanaActualVsPasada.insights.tendencia === 'negativa' ? '📉' : '➡️'}
                </div>
                <div className="kpi-change">
                  {comparaciones.semanaActualVsPasada.insights.tendencia === 'positiva' ? 'Crecimiento' :
                   comparaciones.semanaActualVsPasada.insights.tendencia === 'negativa' ? 'Declive' : 'Estable'}
                </div>
              </div>

            </div>

            {/* GRÁFICA MULTILINE COMPARATIVA PREMIUM */}
            <div className="chart-container-giant">
              <div className="chart-header-professional">
                <h3>Comparación: Semana Pasada vs Esta Semana (día por día)</h3>
                <div className="chart-legend">
                  <div className="legend-item semana-pasada">
                    <div className="legend-color" style={{ backgroundColor: '#64748b' }}></div>
                    Semana Pasada
                  </div>
                  <div className="legend-item semana-actual">
                    <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                    Esta Semana
                  </div>
                  <div className="legend-item diferencia">
                    <div className="legend-line"></div>
                    Diferencia
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart 
                  data={datosGraficaMejorada || []}
                  margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
                  barCategoryGap="20%"
                >
                  <defs>
                    {/* GRADIENTE SEMANA PASADA - AZUL CLARO */}
                    <linearGradient id="semanaPasadaPremium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7}/>
                    </linearGradient>
                    
                    {/* GRADIENTE SEMANA ACTUAL - VERDE IGUAL QUE MÉTRICAS PRINCIPALES */}
                    <linearGradient id="semanaActualPremium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  
                  <XAxis 
                    dataKey="dia" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }}
                    tickMargin={10}
                  />
                  
                  <YAxis 
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    tickMargin={10}
                  />
                  
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#fbbf24', fontWeight: 600 }}
                    tickFormatter={(value) => `${value > 0 ? '+' : ''}${value.toFixed(0)}%`}
                    domain={[-50, 50]}
                    tickMargin={10}
                  />
                  
                  <Tooltip content={<CustomTooltipComparacionMejorado />} />
                  
                  {/* BARRAS SEMANA PASADA - IZQUIERDA (AZUL LIMPIO) */}
                  <Bar
                    yAxisId="left"
                    dataKey="semanaPasada"
                    fill="url(#semanaPasadaPremium)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  
                  {/* BARRAS SEMANA ACTUAL - DERECHA (VERDE LIMPIO) */}
                  <Bar
                    yAxisId="left"
                    dataKey="semanaActual"
                    fill="url(#semanaActualPremium)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  
                  {/* LÍNEA DE DIFERENCIA LIMPIA */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="diferenciaPorcentaje"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    dot={{ 
                      fill: '#fbbf24', 
                      strokeWidth: 2, 
                      r: 6,
                      stroke: '#1f2937'
                    }}
                    activeDot={{ 
                      r: 8, 
                      stroke: '#fbbf24', 
                      strokeWidth: 3,
                      fill: '#fef3c7'
                    }}
                  />
                  
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* INSIGHT COMPARACIONES */}
            <div className="daily-insight-professional">            
              <div className="insight-content-professional">
                <h4 className="insight-title-professional">Análisis Comparativo</h4>
                <p className="insight-description-professional">
                  <strong>Este {comparaciones.diaActualVsPasado.diaActual.nombre}:</strong> {comparaciones.diaActualVsPasado.insights.resumen}
                </p>
                <p className="insight-description-professional">
                  <strong>Semana completa:</strong> {comparaciones.semanaActualVsPasada.insights.resumen}
                </p>
                <p className="insight-description-professional">
                  <strong>Recomendación:</strong> {comparaciones.semanaActualVsPasada.insights.recomendacion}
                </p>
              </div>
              
              <FudiCTA variant="vertical" size="large" />
            </div>

          </div>
        );

      case 'rankings':
        if (!rankings) return null;
        
        return (
          <div className="professional-dashboard-section">
            
            {/* HERO TITLE PROFESIONAL */}
            <div className="section-header-professional">
              <h1 className="section-title-professional">Rankings de Productos</h1>
              <p className="section-subtitle-professional">Análisis anti-pérdidas - Identifica productos que drenan ganancias</p>
            </div>

            {/* KPI STRIP SUPERIOR - RANKINGS */}
            <div className="kpi-strip-professional">
              
              {/* TOP PRODUCTO */}
              <div className="kpi-card-professional sales">
                <div className="kpi-header">
                  <div className="kpi-icon">🏆</div>
                  <div className="kpi-info">
                    <h3>Top Producto</h3>
                    <p>#{rankings.topProducto.ranking} en ventas</p>
                  </div>
                </div>
                <div className="kpi-value" style={{fontSize: '1.2rem'}}>{rankings.topProducto.nombre}</div>
                <div className="kpi-change positive">
                  {formatMoney(rankings.topProducto.ventas)} en 28 días
                </div>
              </div>

              {/* MEJOR DÍA */}
              <div className="kpi-card-professional margin">
                <div className="kpi-header">
                  <div className="kpi-icon">📅</div>
                  <div className="kpi-info">
                    <h3>Mejor Día</h3>
                    <p>Día más productivo</p>
                  </div>
                </div>
                <div className="kpi-value">{rankings.mejorDia.dia}</div>
                <div className="kpi-change">
                  {formatMoney(rankings.mejorDia.ventas)} promedio
                </div>
              </div>

              {/* MEJOR HORA */}
              <div className="kpi-card-professional orders">
                <div className="kpi-header">
                  <div className="kpi-icon">⏰</div>
                  <div className="kpi-info">
                    <h3>Mejor Hora</h3>
                    <p>Franja más activa</p>
                  </div>
                </div>
                <div className="kpi-value">{rankings.mejorHora.hora}</div>
                <div className="kpi-change">
                  {rankings.mejorHora.transacciones} transacciones
                </div>
              </div>

              {/* PRODUCTOS MUERTOS - ALERTA */}
              <div className="kpi-card-professional progress">
                <div className="kpi-header">
                  <div className="kpi-icon">⚠️</div>
                  <div className="kpi-info">
                    <h3>Productos Muertos</h3>
                    <p>Drenando ganancias</p>
                  </div>
                </div>
                <div className="kpi-value">{rankings.productosMuertos.cantidad}</div>
                <div className="kpi-change negative">
                  -{formatMoney(rankings.productosMuertos.costoOportunidad)} pérdida
                </div>
              </div>

            </div>

            {/* GRÁFICA HÍBRIDA: TOP 10 ARRIBA + BOTTOM 5 ABAJO */}
            <div className="chart-container-giant">
              <div className="chart-header-professional">
                <h3>Top 10 Mejores vs Bottom 5 Peores Productos (28 días)</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                    Top Performers (hacia arriba)
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                    Bottom Performers (hacia abajo)
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={500}>
                <BarChart 
                  data={rankings.chartData || []}
                  margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
                >
                  <defs>
                    {/* GRADIENTE TOP PERFORMERS - VERDE */}
                    <linearGradient id="topPerformersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.7}/>
                    </linearGradient>
                    
                    {/* GRADIENTE BOTTOM PERFORMERS - ROJO */}
                    <linearGradient id="bottomPerformersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  
                  <XAxis 
                    dataKey="categoria" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }}
                    tickMargin={10}
                  />
                  
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
                    tickFormatter={(value) => {
                      const absValue = Math.abs(value);
                      return `${value < 0 ? '-' : ''}${(absValue / 1000).toFixed(0)}K`;
                    }}
                    tickMargin={10}
                  />
                  
                  <Tooltip content={<CustomTooltipRankings />} />
                  
                  {/* BARRAS DINÁMICAS SEGÚN SIGNO */}
                  <Bar
                    dataKey="ventas"
                    fill={(entry: any) => entry.esNegativo ? "url(#bottomPerformersGradient)" : "url(#topPerformersGradient)"}
                    radius={[4, 4, 4, 4]}
                    maxBarSize={60}
                  />
                  
                  {/* Línea de referencia en 0 */}
                  <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
                  
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* INSIGHTS ANTI-PÉRDIDAS */}
            <div className="daily-insight-professional">            
              <div className="insight-content-professional">
                <h4 className="insight-title-professional">Análisis Anti-Pérdidas</h4>
                <p className="insight-description-professional">
                  <strong>Alerta:</strong> {rankings.insights.alertaPerdidas}
                </p>
                <p className="insight-description-professional">
                  <strong>Recomendación Urgente:</strong> {rankings.insights.recomendacionUrgente}
                </p>
                <p className="insight-description-professional">
                  <strong>Impacto Económico:</strong> {rankings.insights.impactoEconomico}
                </p>
                
                {/* ACCIONES ESPECÍFICAS */}
                {rankings.insights.accionesEspecificas.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <strong style={{ color: '#fbbf24', fontSize: '1.1rem' }}>Acciones Inmediatas:</strong>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      {rankings.insights.accionesEspecificas.map((accion, index) => (
                        <li key={index} style={{ 
                          color: '#9ca3af', 
                          marginBottom: '0.5rem',
                          fontSize: '1rem'
                        }}>
                          {accion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <FudiCTA variant="vertical" size="large" />
            </div>

          </div>
        );

      case 'trends':
        return (
          <div className="infographic-main-section">
            <div className="section-hero">
              <h2>📊 Tendencias</h2>
              <p>Datos pendientes de migrar al nuevo sistema</p>
            </div>
            <div className="coming-soon">
              <p>Esta sección será migrada próximamente al nuevo endpoint de métricas principales.</p>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="infographic-main-section">
            <div className="section-hero">
              <h2>💳 Análisis de Pagos</h2>
              <p>Datos pendientes de migrar al nuevo sistema</p>
            </div>
            <div className="coming-soon">
              <p>Esta sección será migrada próximamente al nuevo endpoint de métricas principales.</p>
            </div>
          </div>
        );

      case 'operations':
        return (
          <div className="infographic-main-section">
            <div className="section-hero">
              <h2>⚙️ Operaciones</h2>
              <p>Datos pendientes de migrar al nuevo sistema</p>
            </div>
            <div className="coming-soon">
              <p>Esta sección será migrada próximamente al nuevo endpoint de métricas principales.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ✅ LOADING STATES
  if (loading) {
    return (
      <div className="board-loading-refined">
        <FudiBackground 
          variant="gradient"
          theme="business"
          opacity={1}
          fixed={true}
        />
        <div className="loading-content-refined">
          <div className="loading-spinner-refined"></div>
          <p className="loading-text-refined">Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  if (!metricas && activeSection === 'main-metrics') {
    return (
      <div className="board-loading-refined">
        <FudiBackground 
          variant="gradient"
          theme="business"
          opacity={1}
          fixed={true}
        />
        <div className="loading-content-refined">
          <p className="loading-text-refined">❌ No se pudieron cargar las métricas principales</p>
          <FudiButton variant="primary" onClick={() => window.location.reload()}>
            Reintentar
          </FudiButton>
        </div>
      </div>
    );
  }

  if (!comparaciones && activeSection === 'historical') {
    return (
      <div className="board-loading-refined">
        <FudiBackground 
          variant="gradient"
          theme="business"
          opacity={1}
          fixed={true}
        />
        <div className="loading-content-refined">
          <p className="loading-text-refined">❌ No se pudieron cargar las comparaciones</p>
          <FudiButton variant="primary" onClick={() => window.location.reload()}>
            Reintentar
          </FudiButton>
        </div>
      </div>
    );
  }

  if (!rankings && activeSection === 'rankings') {
    return (
      <div className="board-loading-refined">
        <FudiBackground 
          variant="gradient"
          theme="business"
          opacity={1}
          fixed={true}
        />
        <div className="loading-content-refined">
          <p className="loading-text-refined">❌ No se pudieron cargar los rankings</p>
          <FudiButton variant="primary" onClick={() => window.location.reload()}>
            Reintentar
          </FudiButton>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-infographic-container">
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* ✅ HEADER */}
      <FudiDashHeader
        currentModule="board"
        userName={userData?.ownerName || 'Usuario'}
        restaurantName={userData?.restaurantName || 'Mi Restaurante'}
        conversations={[]}
        onLogout={handleLogout}
        onNewConversation={() => window.location.href = '/dashboard/chat'}
        onSwitchConversation={() => window.location.href = '/dashboard/chat'}
      />

      <div className="dashboard-layout">
        {/* ✅ SIDEBAR IZQUIERDA */}
        <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <h3>FUDIVERSE ANALYTICS</h3>
            <div className="status-indicator">
              <div className="status-dot active"></div>
              <span>TIEMPO REAL</span>
            </div>
          </div>

          <nav className="sidebar-navigation">
            {DASHBOARD_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="nav-icon">
                    <span className="nav-emoji">{section.emoji}</span>
                    <Icon size={20} />
                  </div>
                  <div className="nav-content">
                    <div className="nav-title">{section.title}</div>
                    <div className="nav-description">{section.description}</div>
                  </div>
                  <ChevronRight size={16} className="nav-arrow" />
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="last-update">
              Última sync: {new Date(lastUpdated).toLocaleTimeString('es-MX')}
            </div>
            <FudiButton
              variant="primary"
              size="small"
              onClick={() => window.location.href = '/dashboard/chat'}
              icon={<Brain size={16} />}
            >
              FUDI AI
            </FudiButton>
          </div>
        </aside>

        {/* ✅ ÁREA PRINCIPAL */}
        <main className="dashboard-main-content">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}