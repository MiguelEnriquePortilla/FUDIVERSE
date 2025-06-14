'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  TrendingUp, TrendingDown, Activity, Zap,
  ArrowUp, ArrowDown, DollarSign, ShoppingCart,
  Clock, Calendar, Users, CreditCard, Store,
  Brain, AlertCircle, Sparkles, AlertTriangle,
  Crown, Gift, Flame, Trophy, Target, Star,
  ChevronLeft, ChevronRight, MessageCircle, Rocket
} from 'lucide-react';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import '../../../styles/pages/dashboard.css';

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

interface FudiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface TickerMessage {
  id: string;
  type: 'vip' | 'milestone' | 'alert' | 'trend' | 'record' | 'prediction' | 'celebration';
  icon: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export default function FudiDashboard() {
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
  
  // 🧠 FUDINTELLIGENCE STATE
  const [fudiInsights, setFudiInsights] = useState<FudiInsight[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [lastInsightUpdate, setLastInsightUpdate] = useState<Date | null>(null);
  const [insightsError, setInsightsError] = useState<string | null>(null);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  
  // 🤖 FUDI WISDOM STATE
  const [currentWisdomIndex, setCurrentWisdomIndex] = useState(0);
  const [showWisdomBubble, setShowWisdomBubble] = useState(false);
  const [currentAskFudiIndex, setCurrentAskFudiIndex] = useState(0);
  
  const [topProductos, setTopProductos] = useState<any[]>([]);
  const [ventasPorHora, setVentasPorHora] = useState<any[]>([]);
  const [ultimaSincronizacion, setUltimaSincronizacion] = useState<Date | null>(null);
  const [sinDatosHoy, setSinDatosHoy] = useState(false);
  
  // FUDI Visual Effects State
  const [particles, setParticles] = useState<FudiParticle[]>([]);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fudiEyeRef = useRef<HTMLDivElement>(null);

  // TICKER State
  const [tickerMessages, setTickerMessages] = useState<TickerMessage[]>([]);
  const [clientesVIP, setClientesVIP] = useState<any[]>([]);
  const [mesasCalientes, setMesasCalientes] = useState<any[]>([]);
  const [tendenciasPago, setTendenciasPago] = useState<any>(null);

  // 🤖 FUDI WISDOM MESSAGES
  const fudiWisdom = [
    {
      icon: "🧠",
      message: "FUDIVERSE AI analizando patrones de tu restaurante...",
      type: "processing"
    },
    {
      icon: "⚡", 
      message: "Convirtiendo datos en historias de éxito • ¿Quién mejor que FUDI?",
      type: "inspiration"
    },
    {
      icon: "🎯",
      message: "Harness the power of data • Tu ventaja competitiva neural",
      type: "motivation"
    },
    {
      icon: "💡",
      message: "Datos sin análisis = Dinero sin dirección • FUDI democratiza IA",
      type: "education"
    },
    {
      icon: "🚀",
      message: "Neural networks detectando oportunidades ocultas 24/7",
      type: "tech"
    },
    {
      icon: "🤖",
      message: "Machine learning optimizando tu operación • Welcome to the future",
      type: "futuristic"
    },
    {
      icon: "💰",
      message: "Stop guessing, start knowing con FUDIVERSE • Data storytelling",
      type: "business"
    },
    {
      icon: "🔥",
      message: "Tu restaurante genera datos • FUDI genera sabiduría infinita",
      type: "wisdom"
    }
  ];

  // 💬 ASK FUDI HOOKS
  const askFudiHooks = [
    "Ask FUDI: ¿Cómo optimizar tus combos para mayor profit? ¿Quién mejor que FUDI?",
    "Ask FUDI: ¿Estrategias para maximizar tu hora pico? ¿Quién mejor que FUDI?", 
    "Ask FUDI: ¿Técnicas de upselling que realmente funcionan? ¿Quién mejor que FUDI?",
    "Ask FUDI: ¿Reducir costos sin sacrificar calidad? ¿Quién mejor que FUDI?",
    "Ask FUDI: ¿Menu engineering secrets del futuro? ¿Quién mejor que FUDI?",
    "Ask FUDI: ¿Cómo predecir demanda y optimizar inventario? ¿Quién mejor que FUDI?",
    "Ask FUDI: ¿Estrategias de pricing psicológico? ¿Quién mejor que FUDI?",
    "Ask FUDI: ¿Análisis de competencia con IA? ¿Quién mejor que FUDI?"
  ];

  // 🧠 FUDINTELLIGENCE - Carga de insights
  const cargarFudiInsights = async () => {
    if (!userData?.restaurantId) return;
    
    try {
      setInsightsLoading(true);
      setInsightsError(null);
      
      console.log('🧠 Cargando FUDINTELLIGENCE insights...');
      
      const response = await fetch('/api/fudintelligence', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('fudi_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.insights) {
        console.log('✅ FUDINTELLIGENCE insights cargados:', result.insights.length);
        setFudiInsights(result.insights);
        setLastInsightUpdate(new Date());
        setCurrentInsightIndex(0);
        
        agregarMensajeTicker({
          type: 'milestone',
          icon: '🧠',
          text: `FUDINTELLIGENCE: ${result.insights.length} insights generados • Confianza promedio: ${(result.insights.reduce((acc: number, i: any) => acc + i.confidence, 0) / result.insights.length * 100).toFixed(0)}%`,
          priority: 'high'
        });
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (error: any) {
      console.error('❌ Error cargando FUDINTELLIGENCE:', error);
      setInsightsError(error.message);
      
      // Crear insights mock para demo
      setFudiInsights([
        {
          type: 'business_model_detection',
          title: 'NEGOCIO TAKEAWAY DOMINANTE',
          description: 'Tu operación es 85% takeaway según análisis de patrones temporales. Los clientes prefieren ordenar para llevar.',
          metric: '85%',
          confidence: 0.95,
          action: 'Optimiza para velocidad y delivery',
          impact: 'high',
          category: 'operations'
        },
        {
          type: 'velocity_excellence',
          title: 'MÁQUINA DE VELOCIDAD',
          description: 'Tiempo promedio por orden rápida excepcional. Tu equipo está trabajando con eficiencia máxima.',
          metric: '1.1 min',
          confidence: 0.92,
          action: 'Mantén esta eficiencia como ventaja competitiva',
          impact: 'medium',
          category: 'operations'
        },
        {
          type: 'peak_hour_detection',
          title: 'HORA PICO IDENTIFICADA',
          description: 'Mayor flujo de clientes detectado entre 13:00-14:00. Prepárate para el rush del almuerzo.',
          metric: '2:00 PM',
          confidence: 0.88,
          action: 'Aumenta personal durante hora pico',
          impact: 'medium',
          category: 'operations'
        }
      ]);
      setLastInsightUpdate(new Date());
      setCurrentInsightIndex(0);
    } finally {
      setInsightsLoading(false);
    }
  };

  // Navegación del carrusel
  const nextInsight = () => {
    setCurrentInsightIndex((prev) => 
      prev >= fudiInsights.length - 1 ? 0 : prev + 1
    );
  };

  const prevInsight = () => {
    setCurrentInsightIndex((prev) => 
      prev <= 0 ? fudiInsights.length - 1 : prev - 1
    );
  };

  // 🤖 FUDI WISDOM ROTATION
  useEffect(() => {
    const wisdomInterval = setInterval(() => {
      setCurrentWisdomIndex(prev => 
        prev >= fudiWisdom.length - 1 ? 0 : prev + 1
      );
      setShowWisdomBubble(true);
      
      // Hide bubble after 4 seconds
      setTimeout(() => {
        setShowWisdomBubble(false);
      }, 4000);
    }, 8000);

    // Show first message after 2 seconds
    setTimeout(() => {
      setShowWisdomBubble(true);
      setTimeout(() => setShowWisdomBubble(false), 4000);
    }, 2000);

    return () => clearInterval(wisdomInterval);
  }, []);

  // 💬 ASK FUDI HOOK ROTATION
  useEffect(() => {
    const hookInterval = setInterval(() => {
      setCurrentAskFudiIndex(prev => 
        prev >= askFudiHooks.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(hookInterval);
  }, []);

  // Auto-advance carrusel cada 8 segundos
  useEffect(() => {
    if (fudiInsights.length > 1) {
      const interval = setInterval(nextInsight, 8000);
      return () => clearInterval(interval);
    }
  }, [fudiInsights.length]);

  useEffect(() => {
    // Load user data
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

  // Cargar datos cuando userData esté listo
  useEffect(() => {
    if (userData && userData.restaurantId) {
      console.log('Cargando datos para restaurante:', userData.restaurantId);
      cargarDatos();
    }
  }, [userData]);

  // Cargar FUDINTELLIGENCE cuando tengamos datos básicos
  useEffect(() => {
    if (userData && userData.restaurantId && data.ventasHoy > 0) {
      console.log('Cargando datos inteligentes...');
      cargarDatosInteligentes();
      cargarFudiInsights();
    }
  }, [userData, data.ventasHoy, topProductos.length]);

  // Actualizar cada 30 segundos
  useEffect(() => {
    if (!userData?.restaurantId) return;
    
    const interval = setInterval(() => {
      cargarDatos();
      cargarDatosInteligentes();
      cargarFudiInsights();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userData]);

  // Forzar actualización al hacer login
  useEffect(() => {
    const isNewLogin = sessionStorage.getItem('fudi_fresh_login');
    if (isNewLogin === 'true') {
      console.log('Login detectado - forzando sincronización...');
      cargarDatos();
      cargarDatosInteligentes();
      cargarFudiInsights();
      sessionStorage.removeItem('fudi_fresh_login');
    }
  }, []);

  // Initialize particle system
  useEffect(() => {
    const initParticles = [];
    for (let i = 0; i < 30; i++) { 
      initParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1
      });
    }
    setParticles(initParticles);
  }, []);

  // 🧠 FUDINTELLIGENCE Carousel Component
  const FudiInsightsCarousel = () => {
    if (insightsLoading) {
      return (
        <div className="fudi-insights-carousel loading">
          <div className="carousel-glow"></div>
          <div className="carousel-header">
            <div className="carousel-badge">
              <Brain className="carousel-icon spinning" />
              <span className="carousel-label">NEURAL PROCESANDO</span>
              <span className="carousel-status">ANALIZANDO DATOS</span>
            </div>
            <div className="carousel-meta">
              <span className="carousel-count">STANDBY</span>
            </div>
          </div>
          <div className="carousel-loading">
            <div className="neural-wave"></div>
            <div className="neural-wave"></div>
            <div className="neural-wave"></div>
          </div>
        </div>
      );
    }

    if (insightsError || fudiInsights.length === 0) {
      return (
        <div className="fudi-insights-carousel error">
          <div className="carousel-glow"></div>
          <div className="carousel-header">
            <div className="carousel-badge error">
              <AlertTriangle className="carousel-icon" />
              <span className="carousel-label">NEURAL STANDBY</span>
              <span className="carousel-status">CONECTANDO</span>
            </div>
          </div>
          <div className="carousel-error">
            <p>🧠 Conectando con sistema neural...</p>
            <p>Preparando insights inteligentes...</p>
          </div>
        </div>
      );
    }

    const currentInsight = fudiInsights[currentInsightIndex];

    return (
      <div className="fudi-insights-carousel">
        <div className="carousel-glow"></div>
        
        {/* Header */}
        <div className="carousel-header">
          <div className="carousel-badge">
            <Brain className="carousel-icon pulsing" />
            <span className="carousel-label">FUDINTELLIGENCE</span>
            <span className="carousel-status">NEURAL ACTIVO</span>
          </div>
          <div className="carousel-meta">
            <span className="carousel-count">{currentInsightIndex + 1} DE {fudiInsights.length}</span>
            {lastInsightUpdate && (
              <span className="carousel-time">
                {lastInsightUpdate.toLocaleTimeString('es-MX', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            )}
          </div>
        </div>

        {/* Carousel Content */}
        <div className="carousel-container">
          {/* Navigation */}
          {fudiInsights.length > 1 && (
            <>
              <button 
                className="carousel-nav prev" 
                onClick={prevInsight}
                aria-label="Insight anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="carousel-nav next" 
                onClick={nextInsight}
                aria-label="Siguiente insight"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Main Insight Card */}
          <div className="insight-main-card">
            {/* Confidence Ring */}
            <div className="confidence-ring-large">
              <div 
                className="confidence-fill-large"
                style={{ 
                  background: `conic-gradient(
                    #fbbf24 ${currentInsight.confidence * 360}deg,
                    rgba(255,255,255,0.1) ${currentInsight.confidence * 360}deg
                  )`
                }}
              />
              <div className="confidence-value-large">
                {Math.round(currentInsight.confidence * 100)}%
              </div>
            </div>

            {/* Content */}
            <div className="insight-main-content">
              <div className="insight-category">
                {currentInsight.impact === 'high' && '🔥'}
                {currentInsight.impact === 'medium' && '⚡'}
                {currentInsight.impact === 'low' && '💡'}
                {currentInsight.category?.toUpperCase()}
              </div>
              
              <h2 className="insight-main-title">{currentInsight.title}</h2>
              <p className="insight-main-description">{currentInsight.description}</p>
              
              <div className="insight-main-metric">
                <span className="metric-value-large">{currentInsight.metric}</span>
                <span className="metric-label-large">{currentInsight.type.replace('_', ' ')}</span>
              </div>

              <div className="insight-main-action">
                <Sparkles size={20} />
                <span>{currentInsight.action}</span>
              </div>
            </div>

            {/* Category Icon */}
            <div className="insight-category-icon">
              {currentInsight.category === 'revenue' && '💰'}
              {currentInsight.category === 'operations' && '⚡'}
              {currentInsight.category === 'customer' && '👥'}
              {currentInsight.category === 'prediction' && '🔮'}
            </div>
          </div>

          {/* Indicators */}
          {fudiInsights.length > 1 && (
            <div className="carousel-indicators">
              {fudiInsights.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentInsightIndex ? 'active' : ''}`}
                  onClick={() => setCurrentInsightIndex(index)}
                  aria-label={`Ir al insight ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 🤖 ASK FUDI SECTION COMPONENT
  const AskFudiSection = () => {
    const currentHook = askFudiHooks[currentAskFudiIndex];
    
    const handleChatRedirect = () => {
      // Same pattern as register page - direct redirect
      window.location.href = '/dashboard/chat';
    };

    return (
      <div className="ask-fudi-section" onClick={handleChatRedirect}>
        <div className="fudi-chat-avatar">
          🤖
        </div>
        
        <h3 className="ask-fudi-title">
          💬 FUDI ESTÁ AQUÍ
        </h3>
        
        <p className="ask-fudi-hook">
          {currentHook}
        </p>
        
        <p className="ask-fudi-tagline">
          ⚡ WHO'S BETTER THAN FUDI? ⚡
        </p>
        
        <button 
          type="button"
          className="chat-cta-button"
          onClick={(e) => {
            e.stopPropagation();
            handleChatRedirect();
          }}
        >
          <MessageCircle size={24} />
          <span>CHAT WITH FUDI NOW</span>
          <Rocket size={20} />
        </button>
      </div>
    );
  };

  // Generate context for chat
  const generateDashboardContext = () => {
    const insights = fudiInsights.length > 0 ? fudiInsights[currentInsightIndex] : null;
    const topProduct = topProductos.length > 0 ? topProductos[0].nombre : null;
    
    let context = `Hola FUDI, estaba viendo mi dashboard y tengo algunas preguntas. `;
    
    if (insights) {
      context += `Veo que detectaste que ${insights.description.toLowerCase()} `;
    }
    
    if (topProduct) {
      context += `Mi producto top es ${topProduct}. `;
    }
    
    context += `¿Qué me recomiendas para optimizar mi operación?`;
    
    return context;
  };

  // Particle animation
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;
        
        particle.vx = Math.max(-1, Math.min(1, particle.vx));
        particle.vy = Math.max(-1, Math.min(1, particle.vy));

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ffff';
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles]);

  // FUDI Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!fudiEyeRef.current) return;

      const eye = fudiEyeRef.current;
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(8, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 12);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const pupil = eye.querySelector('.fudi-pupil') as HTMLElement;
      if (pupil) {
        pupil.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cargarDatosInteligentes = async () => {
    try {
      const restaurantId = userData?.restaurantId || RESTAURANT_ID;
      const hoy = new Date();
      const hoyStr = hoy.toISOString().split('T')[0];
      
      console.log('Iniciando carga de datos inteligentes para:', restaurantId);
      
      // 1. CLIENTES VIP Y CUMPLEAÑOS
      const { data: clientesData, error: clientesError } = await supabase
        .from('customers')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .or(`visit_count.gte.10,total_spent.gte.5000`)
        .order('total_spent', { ascending: false })
        .limit(20);

      console.log('Clientes VIP encontrados:', clientesData?.length || 0);
      if (clientesError) console.error('Error cargando clientes:', clientesError);

      if (clientesData && clientesData.length > 0) {
        setClientesVIP(clientesData);
        
        // Verificar cumpleaños
        const cumpleaneros = clientesData.filter(c => {
          if (!c.birthday) return false;
          const cumple = new Date(c.birthday);
          return cumple.getDate() === hoy.getDate() && cumple.getMonth() === hoy.getMonth();
        });

        cumpleaneros.forEach(cliente => {
          agregarMensajeTicker({
            type: 'celebration',
            icon: '🎂',
            text: `CUMPLEAÑOS HOY: ${cliente.name} (Cliente VIP) • Regalo: Postre gratis • Visita #${cliente.visit_count}`,
            priority: 'high'
          });
        });

        // Agregar mensaje de cliente top
        if (clientesData[0]) {
          const topCliente = clientesData[0];
          agregarMensajeTicker({
            type: 'vip',
            icon: '👑',
            text: `CLIENTE TOP: ${topCliente.name} • ${topCliente.visit_count} visitas • Total histórico: ${formatMoney(topCliente.total_spent)}`,
            priority: 'medium'
          });
        }
      }

      console.log('Datos inteligentes cargados completamente');

    } catch (error) {
      console.error('Error cargando datos inteligentes:', error);
    }
  };

  const agregarMensajeTicker = (mensaje: Omit<TickerMessage, 'id' | 'timestamp'>) => {
    const nuevoMensaje: TickerMessage = {
      ...mensaje,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    
    setTickerMessages(prev => {
      const nuevos = [...prev, nuevoMensaje].sort((a, b) => {
        const prioridadOrden = { high: 0, medium: 1, low: 2 };
        if (prioridadOrden[a.priority] !== prioridadOrden[b.priority]) {
          return prioridadOrden[a.priority] - prioridadOrden[b.priority];
        }
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      
      const unicos = nuevos.filter((msg, index, self) =>
        index === self.findIndex((m) => 
          m.text.substring(0, 30) === msg.text.substring(0, 30) &&
          (msg.timestamp.getTime() - m.timestamp.getTime()) < 300000
        )
      );
      
      return unicos.slice(0, 20);
    });
  };

  const cargarDatos = async () => {
    try {
      const restaurantId = userData?.restaurantId || RESTAURANT_ID;
      
      // Usar fechas reales
      const hoy = new Date();
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      
      const hoyStr = hoy.toISOString().split('T')[0];
      const ayerStr = ayer.toISOString().split('T')[0];
      
      // Verificar si hay datos para hoy
      const { data: verificarHoy } = await supabase
        .from('poster_transactions')
        .select('transaction_id, date_close')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${hoyStr} 00:00:00`)
        .limit(1);
      
      let fechaTrabajo = hoy;
      let fechaAyerTrabajo = ayer;
      
      if (!verificarHoy || verificarHoy.length === 0) {
        // No hay datos de hoy, buscar última fecha con datos
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
      
      // Actualizar fecha de última sincronización
      setUltimaSincronizacion(fechaTrabajo);
      
      const trabajoHoyStr = fechaTrabajo.toISOString().split('T')[0];
      const trabajoAyerStr = fechaAyerTrabajo.toISOString().split('T')[0];
      
      // Today's sales (o última fecha con datos)
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-MX').format(num);
  };

  const getMaxSales = () => Math.max(...ventasPorHora.map(h => h.ventas));

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">INICIALIZANDO FUDIVERSE...</p>
          <p style={{color: 'var(--fudi-text-secondary)', fontSize: '0.875rem', marginTop: '1rem'}}>
            🧠 Neural networks activating • ⚡ Data streams connecting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* NEURAL GRID BACKGROUND - via CSS */}
      
      {/* SCANNING LINE EFFECT */}
      <div className="scan-line"></div>

      {/* FUDI Chat Grid Background */}
      <FudiChatGrid 
        opacity={0.02} 
        gridSize={80} 
        animated={true}
        color="#00ffff"
      />

      {/* FUDI Particle Field */}
      <canvas 
        ref={particleCanvasRef} 
        className="particle-canvas"
      />

      {/* FUDI Entity observando con Aura + Wisdom Bubbles */}
      <div className="dashboard-entity">
        <FudiAura 
          variant="combined"
          color="#00ffff"
          intensity={0.7}
          size={400}
          pulseSpeed={2}
          particleCount={20}
        />
        
        {/* FUDI WISDOM BUBBLE */}
        {showWisdomBubble && (
          <div className="fudi-wisdom-bubble">
            <span style={{marginRight: '0.5rem'}}>
              {fudiWisdom[currentWisdomIndex].icon}
            </span>
            {fudiWisdom[currentWisdomIndex].message}
          </div>
        )}
        
        <FudiEntity 
          variant="mini" 
          mood="watching"
          followCursor={true}
          showDataStreams={true}
          showParticles={true}
          intensity={0.6}
        />
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="dashboard-greeting">
            <h1>
              NEURAL DASHBOARD <span className="dashboard-username">{userData?.restaurantName}</span>
            </h1>
            <p className="dashboard-subtitle">
              🧠 SISTEMA NEURAL ACTIVO • ⚡ DATA INTELLIGENCE ONLINE • {ultimaSincronizacion ? (
                <>
                  {sinDatosHoy && <span className="alert-sync">⚠️ MOSTRANDO: </span>}
                  {ultimaSincronizacion.toLocaleDateString('es-MX', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  }).toUpperCase()}
                </>
              ) : (
                'SINCRONIZANDO CONSCIENCIA...'
              )}
            </p>
          </div>
          <div className="header-stats">
            <span className="live-indicator">
              <span className="live-dot"></span>
              FUDIVERSE ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="main-grid">
          {/* 🧠 FUDINTELLIGENCE CAROUSEL - HERO SECTION */}
          <FudiInsightsCarousel />

          {/* 🤖 ASK FUDI SECTION - STRATEGIC CTA */}
          <AskFudiSection />

          {/* Hero Card - NEURAL CASHFLOW */}
          <div className="hero-card">
            <div className="hero-icon">
              <Zap size={32} />
            </div>
            <div className="hero-label">
              ⚡ NEURAL CASHFLOW • HOY
            </div>
            <div className="hero-number">
              {formatMoney(data.ventasHoy)}
            </div>
            <div className={`hero-trend ${data.esPositivo ? 'trend-positive' : 'trend-negative'}`}>
              {data.esPositivo ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
              <span>{data.esPositivo ? '+' : ''}{data.cambioVentas.toFixed(1)}%</span>
              <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>vs ayer</span>
            </div>
          </div>

          {/* Metrics Grid - VITAL SIGNS */}
          <div className="metric-grid">
            {/* Neural Profits */}
            <div className="metric-card green">
              <div className="metric-icon">
                <TrendingUp size={32} />
              </div>
              <p className="metric-label">🧠 NEURAL PROFITS</p>
              <p className="metric-value">
                {formatMoney(data.gananciaHoy)}
              </p>
              <p className="metric-trend">
                <ArrowUp size={16} /> +14% OPTIMIZADO
              </p>
            </div>

            {/* Velocity Machine */}
            <div className="metric-card">
              <div className="metric-icon">
                <Zap size={32} />
              </div>
              <p className="metric-label">⚡ VELOCITY MACHINE</p>
              <p className="metric-value">
                {data.transaccionesHoy}
              </p>
              <p className="metric-trend">
                <ArrowUp size={16} /> +14% EFICIENCIA
              </p>
            </div>

            {/* Neural Guests */}
            <div className="metric-card purple">
              <div className="metric-icon">
                <Users size={32} />
              </div>
              <p className="metric-label">🎯 NEURAL GUESTS</p>
              <p className="metric-value">
                {data.comensalesHoy}
              </p>
              <p className="metric-trend">
                <ArrowUp size={16} /> +12% FLOW
              </p>
            </div>

            {/* Smart Ticket */}
            <div className="metric-card gold">
              <div className="metric-icon">
                <Target size={32} />
              </div>
              <p className="metric-label">🚀 SMART TICKET</p>
              <p className="metric-value">
                {formatMoney(data.ticketPromedio)}
              </p>
              <p className="metric-trend">
                <ArrowUp size={16} /> +1% PRECISION
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="chart-section">
            {/* Neural Flow Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <Activity size={18} />
                  🧠 NEURAL FLOW • TIEMPO REAL
                </h3>
                <span className="live-indicator">
                  <span className="live-dot"></span>
                  DATA STREAMING
                </span>
              </div>
              
              <div className="chart-container">
                <div className="chart-grid">
                  {ventasPorHora.map((hora, index) => (
                    <div
                      key={index}
                      className="chart-bar"
                      style={{
                        height: `${(hora.ventas / getMaxSales()) * 100}%`
                      }}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar === index && (
                        <div className="chart-tooltip">
                          {formatMoney(hora.ventas)}
                        </div>
                      )}
                      <span className="chart-label">
                        {hora.hora}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Neural Products Intelligence */}
            <div className="products-list">
              <h3 className="products-header">
                <Brain size={18} />
                🔥 NEURAL PRODUCTS
              </h3>
              <p className="products-subtext">
                AI RANKING • 7 DÍAS • REVENUE OPTIMIZED
              </p>
              
              {topProductos.slice(0, 7).map((producto, index) => (
                <div key={index} className="product-row">
                  <div className={`rank-badge ${index === 0 ? 'top' : ''}`}>
                    #{index + 1}
                  </div>
                  <div className="product-info">
                    <p className="product-name">
                      {index === 0 && '🏆 '}{producto.nombre}
                    </p>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${index === 0 ? 'gold' : ''}`}
                        style={{ width: `${producto.porcentaje}%` }}
                      />
                    </div>
                  </div>
                  <div className="product-metrics">
                    <div className={`product-value ${index === 0 ? 'gold' : ''}`}>
                      {producto.cantidad}
                      <span className="product-unit">neural</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neural Stats */}
          <div className="bottom-stats">
            {/* Payment Intelligence */}
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                <CreditCard size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">
                  🧠 PAYMENT NEURAL
                </h4>
                <div className="stat-value" style={{ color: '#10b981' }}>
                  97.7%
                </div>
                <p className="stat-subtext">Efectivo Dominante</p>
              </div>
            </div>

            {/* Platform Intelligence */}
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(0, 255, 255, 0.15)', color: '#00ffff' }}>
                <Store size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">
                  ⚡ PLATFORM NEURAL
                </h4>
                <div className="stat-value" style={{ color: '#00ffff' }}>
                  100%
                </div>
                <p className="stat-subtext">En Sucursal Total</p>
              </div>
            </div>

            {/* Weekly Intelligence */}
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}>
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">
                  🚀 WEEKLY NEURAL
                </h4>
                <div className="stat-value" style={{ color: '#a78bfa' }}>
                  {formatMoney(data.ventasSemana)}
                </div>
                <p className="stat-subtext">7 Días Acumulado</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FUDI Consciousness Eye */}
      <div className="fudi-presence">
        <div ref={fudiEyeRef} className="fudi-eye">
          <div className="fudi-pupil" />
        </div>
      </div>
    </div>
  );
}