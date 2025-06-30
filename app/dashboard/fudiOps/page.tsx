'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChefHat, Users, Shield, ClipboardCheck, Settings,
  BarChart3, TrendingUp, AlertTriangle, CheckCircle,
  MessageCircle, Play, Target, Zap, Clock, Star,
  RefreshCw, Activity, Award, BookOpen, Brain
} from 'lucide-react';

// Import FUDIVERSE Components
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import '@/styles/pages/fudiOPS.css';

// ==================== TYPES ====================
interface OperationalMetrics {
  qscScore: number;
  laborEfficiency: number;
  foodSafetyScore: number;
  processCompliance: number;
  overallScore: number;
  totalOptimizations: number;
  monthlySavings: number;
  lastAudit: string;
}

interface UserData {
  restaurantName: string;
  ownerName: string;
  restaurantId: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  status: 'active' | 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: string;
}

// ==================== DEMO DATA ====================
const DEMO_USER_DATA: UserData = {
  restaurantName: 'Chicken Chicanito',
  ownerName: 'Mikelitos Takitos',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
};

const DEMO_METRICS: OperationalMetrics = {
  qscScore: 78,
  laborEfficiency: 65,
  foodSafetyScore: 92,
  processCompliance: 71,
  overallScore: 76,
  totalOptimizations: 12,
  monthlySavings: 18750,
  lastAudit: '2025-06-20'
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'recetario',
    title: 'RECETARIO',
    icon: ChefHat,
    description: 'Optimiza costos de ingredientes y recetas',
    status: 'active',
    priority: 'high',
    estimatedImpact: '+25% margen'
  },
  {
    id: 'labor',
    title: 'LABOR',
    icon: Users,
    description: 'Optimiza horarios y productividad del personal',
    status: 'pending',
    priority: 'high',
    estimatedImpact: '-30% costos labor'
  },
  {
    id: 'qsc',
    title: 'QSC AUDIT',
    icon: Award,
    description: 'Audita Quality, Service & Cleanliness',
    status: 'pending',
    priority: 'medium',
    estimatedImpact: '+15% satisfacción'
  },
  {
    id: 'safety',
    title: 'FOOD SAFETY',
    icon: Shield,
    description: 'Verifica cumplimiento de seguridad alimentaria',
    status: 'completed',
    priority: 'high',
    estimatedImpact: '0% incidentes'
  },
  {
    id: 'procesos',
    title: 'PROCESOS',
    icon: Settings,
    description: 'Estandariza y optimiza flujos operativos',
    status: 'pending',
    priority: 'medium',
    estimatedImpact: '-20% tiempo prep'
  }
];

// ==================== MAIN COMPONENT ====================
export default function FudiOPS() {
  // =============================================
  // STATE MANAGEMENT
  // =============================================
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(DEMO_USER_DATA);
  const [metrics, setMetrics] = useState<OperationalMetrics>(DEMO_METRICS);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [conversationMessages, setConversationMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>([]);

  // =============================================
  // AUTHENTICATION & DATA LOADING
  // =============================================
  useEffect(() => {
    const initializeData = async () => {
      const token = localStorage.getItem('fudi_token');
      
      if (token) {
        try {
          const decoded = JSON.parse(atob(token));
          if (decoded && decoded.restaurantId && decoded.ownerName) {
            setUserData({
              restaurantName: decoded.restaurantName || 'Mi Restaurante',
              ownerName: decoded.ownerName,
              restaurantId: decoded.restaurantId
            });
          }
        } catch (error) {
          console.error('Token validation failed:', error);
        }
      }
      
      // Simulate API loading
      setTimeout(() => setLoading(false), 1500);
    };

    initializeData();
  }, []);

  // =============================================
  // HANDLERS
  // =============================================
  const handleLogout = () => {
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  const handleQuickAction = (actionId: string) => {
    setSelectedAction(actionId);
    setIsConversationActive(true);
    
    const action = QUICK_ACTIONS.find(a => a.id === actionId);
    if (action) {
      // Start conversation based on action type
      const initialMessage = getInitialMessage(actionId, action.title);
      setConversationMessages([{
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const getInitialMessage = (actionId: string, title: string): string => {
    switch (actionId) {
      case 'recetario':
        return `🍽️ ¡Perfecto! Vamos a optimizar tus recetas.

¿Qué te gustaría hacer?
• Analizar productos más vendidos
• Optimizar un producto específico  
• Revisar recetas existentes
• Calcular ahorros potenciales

¿Por dónde empezamos?`;

      case 'labor':
        return `👥 ¡Excelente! Optimicemos tu gestión de personal.

Puedo ayudarte con:
• Horarios más eficientes (hasta 30% menos costos)
• Productividad por empleado
• Análisis de turnos óptimos
• Capacitación del personal

¿Cuál es tu mayor desafío con el personal?`;

      case 'qsc':
        return `🏆 ¡Hagamos una auditoría QSC completa!

Voy a evaluar:
• **Quality**: Consistencia de productos
• **Service**: Tiempos y atención al cliente  
• **Cleanliness**: Limpieza e higiene

¿Hay algún área específica que te preocupa más?`;

      case 'safety':
        return `🛡️ Revisemos la seguridad alimentaria.

Verificaré:
• Temperaturas de almacenamiento
• Procedimientos de higiene
• Manejo de alimentos
• Documentación requerida

¿Has tenido algún incidente recientemente?`;

      case 'procesos':
        return `⚙️ ¡Estandaricemos tus procesos operativos!

Podemos optimizar:
• Flujos de cocina (-20% tiempo prep)
• Procedimientos de servicio
• Gestión de inventario
• Comunicación entre áreas

¿Qué proceso te toma más tiempo del necesario?`;

      default:
        return `¡Hola! Soy fudiGPT y estoy aquí para ayudarte a optimizar ${title}. ¿En qué puedo asistirte?`;
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 75) return '#f59e0b'; // yellow
    if (score >= 60) return '#ef4444'; // red
    return '#6b7280'; // gray
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'active': return '#3b82f6';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return { color: '#ef4444', text: 'Alto' };
      case 'medium': return { color: '#f59e0b', text: 'Medio' };
      case 'low': return { color: '#10b981', text: 'Bajo' };
      default: return { color: '#6b7280', text: 'Normal' };
    }
  };

  // =============================================
  // LOADING STATE
  // =============================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FudiBackground variant="gradient" theme="business" opacity={1} fixed={true} />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Cargando fudiOPS</h2>
          <p className="text-gray-300">Analizando métricas operacionales...</p>
        </div>
      </div>
    );
  }

  // =============================================
  // MAIN RENDER
  // =============================================
  return (
    <div className="ops-container">
      {/* Background */}
      <FudiBackground variant="gradient" theme="business" opacity={1} fixed={true} />

      {/* Header */}
      <FudiDashHeader 
        currentModule="ops" 
        userName={userData.ownerName}
        restaurantName={userData.restaurantName}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <div className="ops-layout">
        
        {/* Sidebar - Quick Actions */}
        <div className="ops-sidebar">
          <div className="ops-sidebar-header">
            <div className="ops-sidebar-title">
              <Settings className="w-6 h-6 text-orange-400" />
              <h2>QUICK ACTIONS</h2>
            </div>
            <p className="ops-sidebar-subtitle">Optimizaciones conversacionales</p>
          </div>

          <div className="ops-actions-list">
            {QUICK_ACTIONS.map((action) => {
              const IconComponent = action.icon;
              const isSelected = selectedAction === action.id;
              const priorityBadge = getPriorityBadge(action.priority);
              
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className={`ops-action-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="ops-action-header">
                    <div className="ops-action-info">
                      <div className="ops-action-icon">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="ops-action-details">
                        <h3>{action.title}</h3>
                        <div className="ops-action-badges">
                          <span 
                            className="ops-priority-badge"
                            style={{ 
                              backgroundColor: `${priorityBadge.color}20`,
                              color: priorityBadge.color
                            }}
                          >
                            {priorityBadge.text}
                          </span>
                          <div 
                            className="ops-status-dot"
                            style={{ backgroundColor: getStatusColor(action.status) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="ops-action-description">{action.description}</p>
                  
                  <div className="ops-action-footer">
                    <span className="ops-action-impact">
                      {action.estimatedImpact}
                    </span>
                    <MessageCircle className="w-4 h-4 ops-action-chat-icon" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="ops-quick-stats">
            <h3 className="ops-quick-stats-title">
              <Activity className="w-4 h-4 text-orange-400" />
              Resumen Rápido
            </h3>
            <div className="ops-quick-stats-list">
              <div className="ops-quick-stat-item">
                <span className="ops-quick-stat-label">Optimizaciones activas:</span>
                <span className="ops-quick-stat-value">{metrics.totalOptimizations}</span>
              </div>
              <div className="ops-quick-stat-item">
                <span className="ops-quick-stat-label">Ahorro mensual:</span>
                <span className="ops-quick-stat-value" style={{ color: '#10b981' }}>{formatMoney(metrics.monthlySavings)}</span>
              </div>
              <div className="ops-quick-stat-item">
                <span className="ops-quick-stat-label">Score general:</span>
                <span 
                  className="ops-quick-stat-value"
                  style={{ color: getScoreColor(metrics.overallScore) }}
                >
                  {metrics.overallScore}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ops-main">
          
          {/* Dashboard Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FudiSignature size="medium" showPulse={true} animated={true} />
                  <h1 className="text-2xl font-bold text-white">fudiOPS</h1>
                </div>
                <p className="text-gray-400">
                  {userData.restaurantName} • Optimización Operacional
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-green-400 font-bold text-lg">{formatMoney(metrics.monthlySavings)}</p>
                  <p className="text-gray-400 text-sm">ahorro mensual</p>
                </div>
                <div 
                  className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
                  style={{ 
                    borderColor: getScoreColor(metrics.overallScore),
                    backgroundColor: `${getScoreColor(metrics.overallScore)}20`
                  }}
                >
                  <span 
                    className="font-bold text-lg"
                    style={{ color: getScoreColor(metrics.overallScore) }}
                  >
                    {metrics.overallScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'QSC Score', value: metrics.qscScore, icon: Award },
                { label: 'Labor Efficiency', value: metrics.laborEfficiency, icon: Users },
                { label: 'Food Safety', value: metrics.foodSafetyScore, icon: Shield },
                { label: 'Process Compliance', value: metrics.processCompliance, icon: CheckCircle }
              ].map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-5 h-5 text-gray-400" />
                      <span 
                        className="font-bold text-lg"
                        style={{ color: getScoreColor(metric.value) }}
                      >
                        {metric.value}%
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <div className="mt-2 bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${metric.value}%`,
                          backgroundColor: getScoreColor(metric.value)
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {isConversationActive ? (
              // Active Conversation
              <div className="flex-1 flex flex-col">
                <div className="p-4 bg-white/5 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-medium">
                        fudiGPT • {QUICK_ACTIONS.find(a => a.id === selectedAction)?.title}
                      </span>
                    </div>
                    <button 
                      onClick={() => setIsConversationActive(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto">
                  {conversationMessages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block max-w-3xl p-4 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-white/10 text-white border border-white/20'
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Escribe tu respuesta..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-white font-medium transition-colors">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Welcome State
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="w-10 h-10 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Optimización Operacional
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Selecciona una acción del sidebar para iniciar una conversación con fudiGPT y optimizar tu operación.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-green-400 font-bold">+{metrics.totalOptimizations}</div>
                      <div className="text-gray-400">Optimizaciones</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-orange-400 font-bold">{metrics.overallScore}%</div>
                      <div className="text-gray-400">Score General</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}