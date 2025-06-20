'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Brain, Zap, TrendingUp, Eye, MessageSquare, 
  Sparkles, Rocket, Crown, Star, ChevronRight,
  Play, ArrowRight, Coffee, Clock, DollarSign,
  ArrowDown
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import el CSS refinado separado
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
      title: "Imagina esto:",
      scenario: "Son las 2PM, casa llena. El sistema ya calculó exactamente qué inventario necesitas mañana.",
      impact: "Cero desperdicio, máxima ganancia",
      color: "#ff6b35"
    },
    {
      icon: Eye,
      title: "Visualiza:",
      scenario: "Tu mesero atiende a Juan. El sistema muestra que es cliente VIP y sugiere su plato favorito con descuento personalizado.",
      impact: "Cliente satisfecho, facturación recurrente",
      color: "#3b82f6"
    },
    {
      icon: TrendingUp,
      title: "Experimenta:",
      scenario: "Viernes 8PM, noche perfecta. El sistema predijo la demanda exacta. Cero faltantes, cero desperdicio.",
      impact: "Eficiencia que tu competencia no tiene",
      color: "#00bcd4"
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
    <div className="splash-container-refined">
      
      {/* FUDI Background Limpio */}
      <FudiBackground 
        variant="minimal"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* Header usando nuestro módulo */}
      <FudiHeader 
        currentPage="home"
        showAuthButtons={true}
      />

      {/* Hero Section - Refinado */}
      <section className="hero-refined">
        <div className="hero-content-refined">
          
          {/* Main Hero Text - Sin status badge */}
          <h1 className="hero-title-refined">
            ¡No analices <span className="title-highlight-orange">datos</span>, 
            escribe una historia de <span className="title-highlight-orange">éxito!</span>
          </h1>
          
          <div className="hero-subtitle-refined">
            <p className="subtitle-main-refined">
              FUDIVERSE integra <strong>Claude AI, la inteligencia artificial más avanzada del mundo</strong>, analizando tus datos para optimizar cada decisión de tu restaurante
            </p>
            <p className="subtitle-secondary-refined">
              <span className="subtitle-highlight">
                Mientras tu competencia opera a ciegas, tú tienes el poder de la IA más sofisticada tomando decisiones que maximizan tus ganancias las 24 horas
              </span>
            </p>
          </div>

          {/* Dream Scenarios - Simplificados */}
          <div className="dream-scenarios-refined">
            {dreamScenarios.map((dream, index) => {
              const isActive = currentFeature === index;
              
              return (
                <FudiCard 
                  key={index}
                  variant={index === 0 ? "orange" : index === 1 ? "chat" : "cyan"}
                  padding="medium"
                  className={`dream-card-refined ${isActive ? 'active' : ''}`}
                >
                  <div className="dream-content-refined">
                    <h3 className="dream-title-refined">{dream.title}</h3>
                    <p className="dream-scenario-refined">{dream.scenario}</p>
                    <div className="dream-impact-refined">
                      <span>{dream.impact}</span>
                    </div>
                  </div>
                </FudiCard>
              );
            })}
          </div>

          {/* CTA Buttons - Limpios */}
          <div className="hero-cta-refined">
            <FudiButton 
              variant="orange" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              Empezar ahora
            </FudiButton>
            
            <FudiButton 
              variant="cyan" 
              size="large" 
              href="/features"
              icon={<Play size={18} />}
            >
              Conocerlo gratis
            </FudiButton>
          </div>
        </div>
      </section>

      {/* Timeline Section - Rediseñado con flujo visual */}
      <section className="timeline-refined">
        <div className="timeline-header-refined">
          <h2 className="timeline-title-refined">
            24 horas de operación inteligente
          </h2>
          <p className="timeline-subtitle-refined">
            Mientras tu equipo descansa, <strong>FUDI sigue optimizando tu negocio</strong>
          </p>
        </div>

        <div className="timeline-flow">
          {/* Inicio del flujo - GRANDE */}
          <div className="flow-start">
            <h3>Inicio del día</h3>
            <p>Tu sistema ya está trabajando</p>
          </div>

          {/* Pasos del día - PEQUEÑOS con flechas */}
          <div className="flow-steps">
            {powerMoments.map((moment, index) => (
              <div key={index} className="flow-step">
                <div className="step-time">{moment.time}</div>
                <div className="step-action">{moment.action}</div>
              </div>
            ))}
          </div>

          {/* Resultado - MÁS GRANDE Y VISTOSO */}
          <div className="flow-result">
            <h3 className="result-title">Resultado</h3>
            <p className="result-stats">+30% rentabilidad, -50% desperdicio, 100% control</p>
            <FudiButton 
              variant="orange" 
              size="medium"
              href="/register"
              icon={<ChevronRight size={18} />}
            >
              Implementar ahora
            </FudiButton>
          </div>
        </div>
      </section>

      {/* Evolution Section - Tamaño Hero */}
      <section className="evolution-refined">
        <div className="evolution-content">
          <h2 className="evolution-title-refined">
            La evolución que tu restaurante necesita
          </h2>
          <p className="evolution-subtitle-refined">
            No es solo tecnología. Es la diferencia entre sobrevivir y prosperar.
          </p>

          <div className="before-after-refined">
            <div className="before-card-refined">
              <h3 className="before-title-refined">Antes</h3>
              <ul className="evolution-list">
                <li>"¿Cuánto inventario necesito?"</li>
                <li>"¿Por qué bajaron las ventas?"</li>
                <li>"¿Cómo fidelizo a mis clientes?"</li>
                <li>Desperdicio, pérdidas, incertidumbre</li>
              </ul>
            </div>

            <div className="transformation-arrow-refined">
              <ArrowRight size={32} />
              <span>Con FUDI</span>
            </div>

            <div className="after-card-refined">
              <h3 className="after-title-refined">Después</h3>
              <ul className="evolution-list">
                <li>"El sistema calculó las cantidades exactas"</li>
                <li>"Cada semana mejoran los márgenes"</li>
                <li>"IA identifica a todos los clientes VIP"</li>
                <li>Precisión, control, crecimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Ultra limpio */}
      <section className="final-cta-refined">
        <div className="final-content-refined">
          <h2 className="final-title-refined">
            ¿Listo para escribir tu propia <span className="highlight-orange">historia de éxito</span>?
          </h2>
          
          <p className="final-subtitle-refined">
            La optimización de tu restaurante empieza hoy
          </p>
          
          <div>
            <FudiButton 
              variant="orange" 
              size="large" 
              href="/register"
              icon={<Rocket size={24} />}
            >
              Empezar prueba gratis
            </FudiButton>
            
            <p className="final-guarantee-refined">
              30 días gratis • Sin tarjeta • Activación inmediata
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}