'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  TrendingUp, ArrowUp, ArrowDown, Activity, 
  Brain, MessageCircle, Users, DollarSign,
  Crown, Zap, Target, RefreshCw, Clock, Wifi,
  BarChart3, MessageSquare, User, LogOut
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import '@/styles/pages/dashboard.css';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

interface RestaurantData {
  ventasHoy: number;
  ventasAyer: number;
  transaccionesHoy: number;
  ticketPromedio: number;
  ventasSemana: number;
  cambioVentas: number;
  esPositivo: boolean;
  gananciaHoy: number;
  comensalesHoy: number;
}

interface FudiInsight {
  type: string;
  title: string;
  description: string;
  metric: string;
  confidence: number;
  action: string;
  impact?: 'high' | 'medium' | 'low';
  category?: 'revenue' | 'operations' | 'customer' | 'prediction';
}

export default function FudiBoardPage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [data, setData] = useState<RestaurantData>({
    ventasHoy: 0,
    ventasAyer: 0,
    transaccionesHoy: 0,
    ticketPromedio: 0,
    ventasSemana: 0,
    cambioVentas: 0,
    esPositivo: true,
    gananciaHoy: 0,
    comensalesHoy: 0,
  });
  
  // 🧠 INTELLIGENCE STATE
  const [fudiInsights, setFudiInsights] = useState<FudiInsight[]>([]);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [topProductos, setTopProductos] = useState<any[]>([]);
  const [ventasPorHora, setVentasPorHora] = useState<any[]>([]);
  const [ultimaSincronizacion, setUltimaSincronizacion] = useState<Date | null>(null);
  const [sinDatosHoy, setSinDatosHoy] = useState(false);

  // FEED STATE
  const [feedCards, setFeedCards] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const centerFeedRef = useRef<HTMLDivElement>(null);

  // ASK FUDI STATE
  const [currentAskFudiIndex, setCurrentAskFudiIndex] = useState(0);

  // ✅ LOGOUT FUNCTION - PRODUCTION READY
  const handleLogout = () => {
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

  // 💬 ASK FUDI HOOKS - CLEAN
  const askFudiHooks = [
    "¿Cómo optimizar mi producto estrella?",
    "¿Estrategias para aumentar ticket promedio?", 
    "¿Qué productos tienen mayor potencial?",
    "¿Cómo reducir costos sin afectar calidad?",
    "¿Análisis de tendencias en mi restaurante?",
    "¿Cómo predecir demanda de productos?",
    "¿Estrategias de precios basadas en datos?",
    "¿Análisis de competencia en mi zona?"
  ];

  // 🧠 LOAD INSIGHTS
  const cargarFudiInsights = async () => {
    if (!userData?.restaurantId) return;
    
    try {
      // Create mock insights for demo
      setFudiInsights([
        {
          type: 'business_model_detection',
          title: 'Modelo takeaway dominante',
          description: 'Tu operación es 85% para llevar según análisis de patrones de compra.',
          metric: '85%',
          confidence: 0.95,
          action: 'Optimizar para velocidad y empaque',
          impact: 'high',
          category: 'operations'
        },
        {
          type: 'velocity_excellence',
          title: 'Eficiencia en preparación',
          description: 'Tiempo promedio por orden es excepcional. Tu equipo mantiene alta productividad.',
          metric: '1.1 min',
          confidence: 0.92,
          action: 'Mantener este estándar como ventaja competitiva',
          impact: 'medium',
          category: 'operations'
        },
        {
          type: 'peak_hour_detection',
          title: 'Hora pico identificada',
          description: 'Mayor flujo de clientes entre 13:00-14:00. Momento clave para tu operación.',
          metric: '2:00 PM',
          confidence: 0.88,
          action: 'Reforzar personal durante este horario',
          impact: 'medium',
          category: 'operations'
        }
      ]);
      setCurrentInsightIndex(0);
    } catch (error) {
      console.error('Error loading insights:', error);
    }
  };

  // 💬 ASK FUDI HOOK ROTATION
  useEffect(() => {
    const hookInterval = setInterval(() => {
      setCurrentAskFudiIndex(prev => 
        prev >= askFudiHooks.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(hookInterval);
  }, []);

  // Auto-advance insights
  useEffect(() => {
    if (fudiInsights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsightIndex(prev => 
          prev >= fudiInsights.length - 1 ? 0 : prev + 1
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [fudiInsights.length]);

  // Generate feed cards
  const generateFeedCards = () => {
    const baseCards = [
      // INSIGHTS CARD
      ...(fudiInsights.length > 0 ? [{
        id: 'insights',
        type: 'insights',
        content: {
          title: 'Análisis Inteligente',
          data: fudiInsights[currentInsightIndex]
        }
      }] : []),

      // HERO CARD
      {
        id: 'hero-sales',
        type: 'hero',
        content: {
          title: 'Ventas del Día',
          value: data.ventasHoy,
          change: data.cambioVentas,
          isPositive: data.esPositivo
        }
      },

      // METRIC CARDS
      {
        id: 'ganancia',
        type: 'metric',
        content: {
          title: 'Ganancia del Día',
          value: data.gananciaHoy,
          trend: '+14% optimizado'
        }
      },
      {
        id: 'transacciones',
        type: 'metric',
        content: {
          title: 'Transacciones',
          value: data.transaccionesHoy,
          trend: '+14% eficiencia'
        }
      },

      // CHART CARD
      {
        id: 'chart',
        type: 'chart',
        content: {
          title: 'Flujo de Ventas por Hora',
          data: ventasPorHora
        }
      },

      // PRODUCTS CARD
      {
        id: 'productos',
        type: 'products',
        content: {
          title: 'Productos Destacados',
          data: topProductos.slice(0, 5)
        }
      }
    ];

    return baseCards;
  };

  // Initialize feed cards
  useEffect(() => {
    if (data.ventasHoy > 0 || topProductos.length > 0) {
      const initialCards = generateFeedCards();
      setFeedCards(initialCards);
    }
  }, [data, topProductos, fudiInsights, currentInsightIndex, ventasPorHora]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (!centerFeedRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = centerFeedRef.current;
    
    if (scrollHeight - scrollTop <= clientHeight + 100 && !isLoadingMore && feedCards.length > 0) {
      loadMoreCards();
    }
  };

  const loadMoreCards = () => {
    setIsLoadingMore(true);
    
    setTimeout(() => {
      const newCards = generateFeedCards().map(card => ({
        ...card,
        id: `${card.id}-${Date.now()}-${Math.random()}`
      }));
      
      setFeedCards(prev => [...prev, ...newCards]);
      setIsLoadingMore(false);
    }, 1000);
  };

  // Add scroll listener
  useEffect(() => {
    const feedElement = centerFeedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => feedElement.removeEventListener('scroll', handleScroll);
    }
  }, [feedCards.length, isLoadingMore]);

  // Render individual card
  const renderCard = (card: any, index: number) => {
    switch (card.type) {
      case 'insights':
        return (
          <FudiCard 
            key={`${card.id}-${index}`} 
            variant="orange" 
            padding="large"
            className="insights-card-refined"
          >
            <div className="card-header-refined">
              <Brain size={24} />
              <h3>Análisis Inteligente</h3>
              <span className="card-meta-refined">{currentInsightIndex + 1} de {fudiInsights.length}</span>
            </div>
            
            <div className="insight-content-refined">
              <div className="insight-category-refined">
                {card.content.data.impact === 'high' && '🔥'}
                {card.content.data.impact === 'medium' && '⚡'}
                {card.content.data.impact === 'low' && '💡'}
                {card.content.data.category?.toUpperCase()}
              </div>
              
              <h4 className="insight-title-refined">{card.content.data.title}</h4>
              <p className="insight-description-refined">{card.content.data.description}</p>
              
              <div className="insight-metric-refined">
                <span className="metric-value-refined">{card.content.data.metric}</span>
                <span className="confidence-refined">{Math.round(card.content.data.confidence * 100)}% confianza</span>
              </div>
            </div>
          </FudiCard>
        );

      case 'hero':
        return (
          <FudiCard 
            key={`${card.id}-${index}`} 
            variant="chat" 
            padding="large"
            className="hero-card-refined"
          >
            <div className="card-header-refined">
              <Zap size={24} />
              <h3>Ventas del Día</h3>
              <span className="live-indicator-refined">
                <span className="live-dot-refined"></span>
                En vivo
              </span>
            </div>
            
            <div className="hero-content-refined">
              <div className="hero-number-refined">{formatMoney(card.content.value)}</div>
              <div className={`hero-trend-refined ${card.content.isPositive ? 'positive' : 'negative'}`}>
                {card.content.isPositive ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                <span>{card.content.isPositive ? '+' : ''}{card.content.change.toFixed(1)}%</span>
                <span className="trend-label-refined">vs ayer</span>
              </div>
            </div>
          </FudiCard>
        );

      case 'metric':
        return (
          <FudiCard 
            key={`${card.id}-${index}`} 
            variant="ghost" 
            padding="medium"
            className="metric-card-refined"
          >
            <div className="card-header-refined">
              {card.content.title === 'Ganancia del Día' && <TrendingUp size={24} />}
              {card.content.title === 'Transacciones' && <Users size={24} />}
              <h3>{card.content.title}</h3>
            </div>
            <div className="metric-content-refined">
              <div className="metric-value-refined">
                {typeof card.content.value === 'number' ? formatMoney(card.content.value) : card.content.value}
              </div>
              <div className="metric-trend-refined">
                <ArrowUp size={16} /> {card.content.trend}
              </div>
            </div>
          </FudiCard>
        );

      case 'chart':
        return (
          <FudiCard 
            key={`${card.id}-${index}`} 
            variant="ghost" 
            padding="large"
            className="chart-card-refined"
          >
            <div className="card-header-refined">
              <Activity size={24} />
              <h3>Flujo de Ventas por Hora</h3>
              <span className="live-indicator-refined">
                <span className="live-dot-refined"></span>
                En vivo
              </span>
            </div>
            
            <div className="chart-container-refined">
              <div className="chart-grid-refined">
                {card.content.data.map((hora: any, idx: number) => (
                  <div
                    key={idx}
                    className="chart-bar-refined"
                    style={{
                      height: `${(hora.ventas / getMaxSales()) * 100}%`
                    }}
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar === idx && (
                      <div className="chart-tooltip-refined">
                        {formatMoney(hora.ventas)}
                      </div>
                    )}
                    <span className="chart-label-refined">
                      {hora.hora}h
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FudiCard>
        );

      case 'products':
        return (
          <FudiCard 
            key={`${card.id}-${index}`} 
            variant="cyan" 
            padding="large"
            className="products-card-refined"
          >
            <div className="card-header-refined">
              <Crown size={24} />
              <h3>Productos Destacados</h3>
              <span className="card-meta-refined">Últimos 7 días</span>
            </div>
            
            <div className="products-list-refined">
              {card.content.data.map((producto: any, idx: number) => (
                <div key={idx} className="product-row-refined">
                  <div className={`rank-badge-refined ${idx === 0 ? 'top' : ''}`}>
                    #{idx + 1}
                  </div>
                  <div className="product-info-refined">
                    <p className="product-name-refined">
                      {idx === 0 && '🏆 '}{producto.nombre}
                    </p>
                    <div className="progress-bar-refined">
                      <div 
                        className={`progress-fill-refined ${idx === 0 ? 'gold' : ''}`}
                        style={{ width: `${producto.porcentaje}%` }}
                      />
                    </div>
                  </div>
                  <div className="product-metrics-refined">
                    <div className={`product-value-refined ${idx === 0 ? 'gold' : ''}`}>
                      {producto.cantidad}
                      <span className="product-unit-refined">ventas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FudiCard>
        );

      default:
        return null;
    }
  };

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
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

  // Load data when userData is ready
  useEffect(() => {
    if (userData && userData.restaurantId) {
      console.log('Loading data for restaurant:', userData.restaurantId);
      cargarDatos();
    }
  }, [userData]);

  // Load insights when we have basic data
  useEffect(() => {
    if (userData && userData.restaurantId && data.ventasHoy > 0) {
      console.log('Loading intelligent data...');
      cargarFudiInsights();
    }
  }, [userData, data.ventasHoy, topProductos.length]);

  // Update every 30 seconds
  useEffect(() => {
    if (!userData?.restaurantId) return;
    
    const interval = setInterval(() => {
      cargarDatos();
      cargarFudiInsights();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userData]);

  const cargarDatos = async () => {
    try {
      const restaurantId = userData?.restaurantId || RESTAURANT_ID;
      
      const hoy = new Date();
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      
      const hoyStr = hoy.toISOString().split('T')[0];
      const ayerStr = ayer.toISOString().split('T')[0];
      
      // Check if there's data for today
      const { data: verificarHoy } = await supabase
        .from('poster_transactions')
        .select('transaction_id, date_close')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${hoyStr} 00:00:00`)
        .limit(1);
      
      let fechaTrabajo = hoy;
      let fechaAyerTrabajo = ayer;
      
      if (!verificarHoy || verificarHoy.length === 0) {
        const { data: ultimaFechaData } = await supabase
          .from('poster_transactions')
          .select('date_close')
          .eq('restaurant_id', restaurantId)
          .order('date_close', { ascending: false })
          .limit(1);
        
        if (ultimaFechaData && ultimaFechaData.length > 0) {
          fechaTrabajo = new Date(ultimaFechaData[0].date_close);
          fechaAyerTrabajo = new Date(fechaTrabajo);
          fechaAyerTrabajo.setDate(fechaAyerTrabajo.getDate() - 1);
          setSinDatosHoy(true);
        }
      } else {
        setSinDatosHoy(false);
      }
      
      setUltimaSincronizacion(fechaTrabajo);
      
      const trabajoHoyStr = fechaTrabajo.toISOString().split('T')[0];
      const trabajoAyerStr = fechaAyerTrabajo.toISOString().split('T')[0];
      
      // Today's sales
      const { data: ventasHoyData } = await supabase
        .from('poster_transactions')
        .select('payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoHoyStr} 00:00:00`)
        .lt('date_close', `${trabajoHoyStr} 23:59:59`);

      const totalHoy = ventasHoyData?.reduce((sum, t) => sum + parseFloat(t.payed_sum), 0) || 0;
      const transaccionesHoy = ventasHoyData?.length || 0;
      const ticketPromedio = transaccionesHoy > 0 ? totalHoy / transaccionesHoy : 0;

      // Yesterday's sales
      const { data: ventasAyerData } = await supabase
        .from('poster_transactions')
        .select('payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoAyerStr} 00:00:00`)
        .lt('date_close', `${trabajoAyerStr} 23:59:59`);

      const totalAyer = ventasAyerData?.reduce((sum, t) => sum + parseFloat(t.payed_sum), 0) || 0;

      // Week sales
      const inicioSemana = new Date(fechaTrabajo);
      inicioSemana.setDate(inicioSemana.getDate() - 7);
      
      const { data: ventasSemanaData } = await supabase
        .from('poster_transactions')
        .select('payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', inicioSemana.toISOString().split('T')[0]);

      const totalSemana = ventasSemanaData?.reduce((sum, t) => sum + parseFloat(t.payed_sum), 0) || 0;

      // Calculate change
      const cambioVentas = totalAyer > 0 ? ((totalHoy - totalAyer) / totalAyer * 100) : 0;
      const esPositivo = cambioVentas >= 0;

      // Calculate profits
      const { data: transaccionesCompletas } = await supabase
        .from('poster_transactions')
        .select('total_profit')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoHoyStr} 00:00:00`)
        .lt('date_close', `${trabajoHoyStr} 23:59:59`);

      const gananciaHoy = transaccionesCompletas?.reduce((sum, t) => sum + (t.total_profit / 100), 0) || 0;
      const comensalesHoy = Math.floor(transaccionesHoy * 1.2);

      setData({
        ventasHoy: totalHoy,
        ventasAyer: totalAyer,
        transaccionesHoy,
        ticketPromedio,
        ventasSemana: totalSemana,
        cambioVentas,
        esPositivo,
        gananciaHoy,
        comensalesHoy
      });

      // Top Products
      const { data: productosVendidos } = await supabase
        .from('poster_transaction_products')
        .select('product_id, product_sum')
        .eq('restaurant_id', restaurantId)
        .gte('imported_at', inicioSemana.toISOString());

      const productosAgrupados: { [key: string]: { ventas: number, transacciones: number, nombre?: string } } = {};
      
      productosVendidos?.forEach(item => {
        const id = item.product_id.toString();
        if (!productosAgrupados[id]) {
          productosAgrupados[id] = { ventas: 0, transacciones: 0 };
        }
        productosAgrupados[id].ventas += parseFloat(item.product_sum);
        productosAgrupados[id].transacciones += 1;
      });

      const productIds = Object.keys(productosAgrupados);
      if (productIds.length > 0) {
        const { data: productos } = await supabase
          .from('poster_products')
          .select('product_id, product_name')
          .in('product_id', productIds);

        productos?.forEach(p => {
          if (productosAgrupados[p.product_id]) {
            productosAgrupados[p.product_id].nombre = p.product_name;
          }
        });
      }

      const topProductosArray = Object.entries(productosAgrupados)
        .map(([id, data]) => ({
          nombre: data.nombre || `Producto ${id}`,
          cantidad: data.transacciones,
          ventas: data.ventas
        }))
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 10);

      const maxVentas = topProductosArray[0]?.ventas || 1;
      const topProductosConPorcentaje = topProductosArray.map(p => ({
        ...p,
        porcentaje: (p.ventas / maxVentas) * 100
      }));

      setTopProductos(topProductosConPorcentaje);

      // Sales by hour
      const { data: ventasPorHoraData } = await supabase
        .from('poster_transactions')
        .select('date_close, payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoHoyStr} 00:00:00`)
        .lt('date_close', `${trabajoHoyStr} 23:59:59`);

      const ventasPorHoraMap: { [key: string]: number } = {};
      for (let h = 0; h < 24; h++) {
        ventasPorHoraMap[h.toString()] = 0;
      }

      ventasPorHoraData?.forEach(t => {
        const hora = new Date(t.date_close).getHours();
        ventasPorHoraMap[hora.toString()] += parseFloat(t.payed_sum);
      });

      const ventasPorHoraArray = Object.entries(ventasPorHoraMap)
        .map(([hora, ventas]) => ({
          hora,
          ventas
        }))
        .filter(h => h.ventas > 0);

      setVentasPorHora(ventasPorHoraArray);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getMaxSales = () => Math.max(...ventasPorHora.map(h => h.ventas));

  // STATUS BAR
  const StatusBar = () => {
    const getStatusInfo = () => {
      if (!ultimaSincronizacion) {
        return {
          text: "Conectando...",
          status: "connecting",
          icon: <RefreshCw size={16} className="spinning-refined" />
        };
      }

      const now = new Date();
      const timeDiff = Math.floor((now.getTime() - ultimaSincronizacion.getTime()) / (1000 * 60));
      
      if (sinDatosHoy) {
        return {
          text: `Datos históricos • ${ultimaSincronizacion.toLocaleDateString('es-MX')}`,
          status: "historical",
          icon: <Clock size={28} />
        };
      }

      if (timeDiff < 5) {
        return {
          text: `Actualizado • ${ultimaSincronizacion.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`,
          status: "fresh",
          icon: <Wifi size={16} />
        };
      } else {
        return {
          text: `Hace ${timeDiff} min • ${ultimaSincronizacion.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`,
          status: "stale",
          icon: <Clock size={16} />
        };
      }
    };

    const statusInfo = getStatusInfo();

    return (
      <div className="status-bar-refined">
        <div className="status-content-refined">
          <div className="status-avatar-refined">
            <img src="/images/logo.png" alt="FUDIVERSE" className="status-logo-refined" />
          </div>
          
          <div className="status-text-refined">
            {statusInfo.text}
          </div>
          
          <div className="status-indicator-refined">
            {statusInfo.icon}
            <div className={`status-dot-refined ${statusInfo.status}`}></div>
          </div>
        </div>
      </div>
    );
  };

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
          <p className="loading-text-refined">Cargando fudiBOARD...</p>
          <p className="loading-subtitle-refined">
            📊 Preparando análisis • 🔄 Conectando datos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="board-container-refined">
      {/* Single Clean Background */}
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* ✅ EMBEDDED HEADER - NO EXTERNAL DEPENDENCIES */}
      <header className="fudi-dash-header-refined">
        <div className="header-container-refined">
          
          {/* Logo */}
          <div className="dash-logo-refined">
            <span className="logo-text-refined">FUDI</span>
            <span className="logo-accent-refined">VERSE</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav-refined">
            <a href="/dashboard/chat" className="nav-link-refined">
              <Brain size={16} />
              <span>fudiGPT</span>
            </a>
            
            <div className="nav-link-refined nav-active-refined">
              <BarChart3 size={16} />
              <span>fudiBOARD</span>
            </div>
          </nav>

          {/* Right Section */}
          <div className="header-right-refined">
            {/* Restaurant Name */}
            <div className="restaurant-badge-refined">
              {userData?.restaurantName || 'Mi Restaurante'}
            </div>

            {/* Logout Button */}
            <FudiButton
              variant="primary"
              size="small"
              onClick={handleLogout}
              icon={<LogOut size={16} />}
              iconPosition="left"
            >
              <span className="logout-text-refined">Salir</span>
            </FudiButton>
          </div>
        </div>
      </header>
      
      {/* Status Bar */}
      <StatusBar />

      {/* Main Content - CLEAN LAYOUT */}
      <main className="board-main-refined">
        
        {/* Left Sidebar - ASK FUDI */}
        <aside className="left-sidebar-refined">
          <FudiCard variant="orange" padding="large" className="ask-fudi-card-refined">
            <div className="ask-fudi-content-refined">
              <div className="fudi-avatar-refined">💬</div>
              
              <h3 className="ask-fudi-title-refined">
                Consulta con FUDI
              </h3>
              
              <p className="ask-fudi-hook-refined">
                {askFudiHooks[currentAskFudiIndex]}
              </p>
              
              <FudiButton
                variant="primary"
                size="medium"
                onClick={() => window.location.href = '/dashboard/chat'}
                icon={<MessageCircle size={18} />}
                iconPosition="left"
                className="ask-fudi-button-refined"
              >
                Conversar con FUDI
              </FudiButton>
            </div>
          </FudiCard>

          {/* Quick Stats */}
          <FudiCard variant="ghost" padding="medium" className="quick-stats-refined">
            <h4 className="quick-stats-title-refined">Métricas de Hoy</h4>
            
            <div className="stat-item-refined">
              <div className="stat-icon-refined">💰</div>
              <div className="stat-details-refined">
                <h5>Ingresos</h5>
                <p>{formatMoney(data.ventasHoy)}</p>
                <span className="stat-change-refined">
                  {data.esPositivo ? '+' : ''}{data.cambioVentas.toFixed(1)}% vs ayer
                </span>
              </div>
            </div>
            
            <div className="stat-item-refined">
              <div className="stat-icon-refined">📦</div>
              <div className="stat-details-refined">
                <h5>Órdenes</h5>
                <p>{data.transaccionesHoy} órdenes</p>
                <span className="stat-change-refined">+12% eficiencia</span>
              </div>
            </div>
          </FudiCard>
        </aside>
        
        {/* Center Feed - INFINITE SCROLL */}
        <div 
          className="center-feed-refined" 
          ref={centerFeedRef}
        >
          {feedCards.map((card, index) => (
            <div key={`${card.id}-${index}`} className="feed-item-refined">
              {renderCard(card, index)}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoadingMore && (
            <div className="feed-loading-refined">
              <div className="loading-spinner-small-refined"></div>
              <p>Cargando más insights...</p>
            </div>
          )}
        </div>
        
        {/* Right Sidebar - BUSINESS TOOLS */}
        <aside className="right-sidebar-refined">
          <FudiCard variant="cyan" padding="medium" className="insights-sidebar-refined">
            <h4 className="insights-title-refined">Insights Destacados</h4>
            
            <div className="insight-categories-refined">
              <div className="insight-category-item-refined">
                <div className="category-icon-refined">💰</div>
                <span>Revenue</span>
                <div className="category-badge-refined">3</div>
              </div>
              
              <div className="insight-category-item-refined">
                <div className="category-icon-refined">⚡</div>
                <span>Operaciones</span>
                <div className="category-badge-refined">5</div>
              </div>
              
              <div className="insight-category-item-refined">
                <div className="category-icon-refined">👥</div>
                <span>Clientes</span>
                <div className="category-badge-refined">2</div>
              </div>
            </div>
          </FudiCard>

          {/* Team Online */}
          <FudiCard variant="ghost" padding="medium" className="team-sidebar-refined">
            <h4 className="team-title-refined">Equipo Online</h4>
            
            <div className="team-list-refined">
              <div className="team-member-refined">
                <div className="member-avatar-refined">👨‍🍳</div>
                <span className="member-name-refined">Chef Principal</span>
                <div className="member-status-refined online"></div>
              </div>
              
              <div className="team-member-refined">
                <div className="member-avatar-refined">👩‍💼</div>
                <span className="member-name-refined">Gerente</span>
                <div className="member-status-refined online"></div>
              </div>
              
              <div className="team-member-refined">
                <div className="member-avatar-refined">🧑‍🍳</div>
                <span className="member-name-refined">Sous Chef</span>
                <div className="member-status-refined away"></div>
              </div>
            </div>
          </FudiCard>
        </aside>
        
      </main>
    </div>
  );
}