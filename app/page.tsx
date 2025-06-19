'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, Zap, TrendingUp, Eye, MessageSquare, 
  Sparkles, Rocket, Crown, Star, ChevronRight,
  Play, ArrowRight, Coffee, Clock, DollarSign
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import styles
import '@/styles/pages/fudi.splash.css';

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dreamScenarios = [
    {
      icon: Brain,
      title: "IMAGINA ESTO:",
      scenario: "Son las 2PM, casa llena. El sistema ya calculó exactamente qué inventario necesitas mañana.",
      impact: "Cero desperdicio, máxima ganancia",
      color: "#fbbf24"
    },
    {
      icon: Eye,
      title: "VISUALIZA:",
      scenario: "Tu mesero atiende a Juan. El sistema muestra que es cliente VIP y sugiere su plato favorito con descuento personalizado.",
      impact: "Cliente satisfecho, facturación recurrente",
      color: "#3b82f6"
    },
    {
      icon: TrendingUp,
      title: "EXPERIMENTA:",
      scenario: "Viernes 8PM, noche perfecta. El sistema predijo la demanda exacta. Cero faltantes, cero desperdicio.",
      impact: "Eficiencia que tu competencia no tiene",
      color: "#10b981"
    }
  ];

  const powerMoments = [
    {
      time: "6:00 AM",
      action: "Sistema analizó ventas de ayer",
      result: "Proyección de ventas lista para hoy"
    },
    {
      time: "12:00 PM",
      action: "Cliente solicita recomendación",
      result: "FUDI sugiere el plato más rentable"
    },
    {
      time: "8:00 PM",
      action: "Orden de inventario generada automáticamente",
      result: "Listo para otro día exitoso"
    }
  ];

  return (
    <div className="splash-container">
      
      {/* ✅ NUEVO: FudiHeader reemplaza el header custom */}
      <FudiHeader currentPage="home" />
      
      {/* ✅ FUDI Background - ULTRA LIMPIO COMO ABOUT */}
      <FudiBackground 
        variant="medium"
        theme="charcoal"
        intensity={0.2}
        opacity={1}
        fixed={true}
      />

      {/* Hero Section - The Dream */}
      <section className="splash-hero">
        <div className="hero-content">
          
          {/* Status Badge */}
          <div className="status-badge">
            <div className="status-dot"></div>
            <span>OPTIMIZANDO RESTAURANTES</span>
            <Zap size={14} />
          </div>
          
          {/* Main Hero Text */}
          <h1 className="hero-title">
            <span className="title-highlight-gold"></span><br/>
            ¡No analices <span className="title-highlight-gold">datos</span>, escribe una historia de <span className="title-highlight-gold">éxito!</span><br/>
          </h1>
          
          <div className="hero-subtitle">
            <p className="subtitle-main">
              FUDIVERSE <strong>IA predice ventas, optimiza inventario y maximiza ganancias</strong> PARA tu restaurante
            </p>
            <p className="subtitle-secondary">
              <span className="subtitle-highlight">              ←← ✅ AHORA <span>
                Mientras otros restaurantes operan a la antigüa y a ciegas, tú tomas decisiones informadas e inteligentes que te llevan más lejos
              </span>                                             ←← ✅ AHORA </span>
            </p>
          </div>

          {/* Dream Scenarios Carousel */}
          <div className="dream-scenarios">
            {dreamScenarios.map((dream, index) => {
              const Icon = dream.icon;
              const isActive = currentFeature === index;
              
              return (
                <div 
                  key={index}
                  className={`dream-card ${isActive ? 'active' : ''}`}
                  style={{ '--dream-color': dream.color } as React.CSSProperties}
                >
                  <div className="dream-icon">
                    <Icon size={24} />
                  </div>
                  <div className="dream-content">
                    <h3 className="dream-title">{dream.title}</h3>
                    <p className="dream-scenario">{dream.scenario}</p>
                    <div className="dream-impact">
                      <Sparkles size={14} />
                      <span>{dream.impact}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              className="main-cta"
            >
              <Rocket size={20} />
              <span>EMPEZAR AHORA</span>
            </FudiButton>
            
            <FudiButton 
              variant="secondary" 
              size="large" 
              href="/features"
              className="secondary-cta"
            >
              <Play size={18} />
              <span>CONOCELO GRATIS</span>
            </FudiButton>
          </div>

          {/* Social Proof */}
          <div className="social-proof">
            <div className="proof-stats">
              <div className="proof-item">
                <span className="proof-number">+500</span>
                <span className="proof-label">Restaurantes</span>
              </div>
              <div className="proof-separator"></div>
              <div className="proof-item">
                <span className="proof-number">$2M+</span>
                <span className="proof-label">Ahorrados</span>
              </div>
              <div className="proof-separator"></div>
              <div className="proof-item">
                <span className="proof-number">98%</span>
                <span className="proof-label">Satisfacción</span>
              </div>
            </div>
            <p className="proof-text">
              <Star size={16} />
              "Aumenté mis ganancias 35% en 3 meses. La mejor inversión que hice." - Chef María González, Ciudad de México
            </p>
          </div>
        </div>
      </section>

      {/* Power Timeline Section */}
      <section className="power-timeline">
        <div className="timeline-header">
          <h2 className="timeline-title">
            <Clock size={32} />
            24 HORAS DE OPERACIÓN INTELIGENTE
          </h2>
          <p className="timeline-subtitle">
            Mientras tu equipo descansa, <strong>FUDI sigue optimizando tu negocio</strong>
          </p>
        </div>

        <div className="timeline-content">
          {powerMoments.map((moment, index) => (
            <div key={index} className="timeline-moment">
              <div className="moment-time">
                <Clock size={20} />
                <span>{moment.time}</span>
              </div>
              <div className="moment-content">
                <h3 className="moment-action">{moment.action}</h3>
                <p className="moment-result">
                  <ArrowRight size={16} />
                  {moment.result}
                </p>
              </div>
              <div className="moment-connector"></div>
            </div>
          ))}
        </div>

        <div className="timeline-conclusion">
          <div className="conclusion-card">
            <DollarSign size={40} />
            <h3>RESULTADO</h3>
            <p>+30% rentabilidad, -50% desperdicio, 100% control</p>
            <div className="conclusion-cta">
              <FudiButton variant="primary" href="/register">
                IMPLEMENTAR AHORA
                <ChevronRight size={18} />
              </FudiButton>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="transformation-section">
        <div className="transformation-content">
          <div className="transformation-header">
            <h2 className="transformation-title">
              LA EVOLUCIÓN QUE TU RESTAURANTE NECESITA
            </h2>
            <p className="transformation-subtitle">
              No es solo tecnología. Es la diferencia entre sobrevivir y prosperar. No son analizar datos es escribir tu historia de éxito.
            </p>
          </div>

          <div className="before-after">
            <div className="before-card">
              <h3 className="before-title">😰 ANTES</h3>
              <ul className="before-list">
                <li>"¿Cuánto inventario necesito?"</li>
                <li>"¿Por qué bajaron las ventas?"</li>
                <li>"¿Cómo fidelizo a mis clientes?"</li>
                <li>"¿Qué debo recomendar?"</li>
                <li>Desperdicio, pérdidas, incertidumbre</li>
              </ul>
            </div>

            <div className="transformation-arrow">
              <ArrowRight size={32} />
              <span>CON FUDI</span>
            </div>

            <div className="after-card">
              <h3 className="after-title">🚀 DESPUÉS</h3>
              <ul className="after-list">
                <li>"El sistema ya calculó las cantidades exactas"</li>
                <li>"Cada semana mejoran los márgenes"</li>
                <li>"El sistema identifica a todos los clientes VIP"</li>
                <li>"Recomendaciones automáticas que aumentan ticket promedio"</li>
                <li>Precisión, control, crecimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta-content">
          <div className="final-badge">
            <Sparkles size={16} />
            <span>LISTA PARA IMPLEMENTAR</span>
          </div>
          
          <h2 className="final-title">
            ¿Listo para escribir tu propia <span className="highlight-gold">historia de éxito</span>?
          </h2>
          
          <p className="final-subtitle">
            La optimización de tu restaurante empieza hoy
          </p>
          
          <div className="final-actions">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              className="final-primary-cta"
            >
              <Rocket size={24} />
              <span>EMPEZAR PRUEBA GRATIS</span>
            </FudiButton>
            
            <p className="final-guarantee">
              💎 30 días gratis · 💳 Sin tarjeta · 🚀 Activación inmediata
            </p>
          </div>
        </div>
      </section>

      {/* Scanning Line Effect */}
      <div className="scan-line"></div>
      
      {/* Floating Action Button */}
      <div className="floating-cta">
        <FudiButton 
          variant="primary" 
          size="medium"
          href="/register"
          className="floating-button"
        >
          <MessageSquare size={18} />
          <span>PROBAR GRATIS</span>
        </FudiButton>
      </div>
    </div>
  );
}