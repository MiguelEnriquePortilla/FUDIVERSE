'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Brain, Zap, TrendingUp, Eye, MessageSquare, 
  Sparkles, Rocket, Crown, Star, ChevronRight,
  Play, ArrowRight, Coffee, Clock, DollarSign
} from 'lucide-react';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiHeroText } from '@/components/fudiverse/FudiHeroText';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { InfinitoCard } from '@/components/fudiverse/InfinitoCard';

// Import styles
import '@/styles/pages/fudi.splash.css';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      title: "IMAGÍNATE...",
      scenario: "Son las 2PM. Tu restaurante está lleno. FUDI ya ordenó el inventario perfecto para mañana.",
      impact: "Cero estrés, máximo profit",
      color: "#fbbf24"
    },
    {
      icon: Eye,
      title: "VISUALIZA...",
      scenario: "Tu mesero ve que Juan es cliente VIP. FUDI le sugiere su plato favorito con 20% descuento.",
      impact: "Cliente feliz = cliente que regresa",
      color: "#3b82f6"
    },
    {
      icon: TrendingUp,
      title: "SIENTE...",
      scenario: "Viernes 8PM. FUDI predijo la demanda exacta. No sobra nada, no falta nada. Perfección.",
      impact: "Tu competencia sigue adivinando",
      color: "#10b981"
    }
  ];

  const powerMoments = [
    {
      time: "6:00 AM",
      action: "FUDI analizó toda la noche",
      result: "Ya sabe qué vas a vender hoy"
    },
    {
      time: "12:00 PM",
      action: "Mesa 7 pide recomendación",
      result: "FUDI sugiere el combo perfecto"
    },
    {
      time: "8:00 PM",
      action: "Inventario optimizado automático",
      result: "Mañana será otro día perfecto"
    }
  ];

  return (
    <div className="splash-container">
      {/* FUDI Background Effects */}
      <FudiChatGrid 
        opacity={0.1}
        gridSize={100}
        color="#4a4a4a"
        animated={true}
        showGradient={true}
        pulseSpeed={2}
      />
      
      <FudiBackground 
        variant="particles"
        intensity={0.4}
        speed={0.8}
        color="mixed"
        opacity={0.6}
        fixed={true}
      />
      
      {/* FUDI Entity - The Guardian */}
      <div className="fudi-entity-container">
        <FudiAura 
          variant="combined"
          color="#fbbf24"
          intensity={0.8}
          size={600}
          pulseSpeed={2}
          particleCount={30}
        />
        <FudiEntity 
          variant="fullscreen"
          mood="excited"
          followCursor={true}
          showDataStreams={true}
          showParticles={true}
          showCircuits={true}
          showScanBeam={true}
          showNeuralNet={true}
          intensity={0.8}
        />
      </div>

      {/* Header */}
      <header className={`splash-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <nav className="splash-nav">
          <Link href="/" className="splash-logo">
            <span className="logo-text">FUDIVERSE</span>
            <span className="logo-subtitle">RESTO AI</span>
          </Link>

          <div className="nav-links">
            <Link href="/features" className="nav-link">
              <Brain size={16} />
              <span>Arsenal</span>
            </Link>
            <Link href="/pricing" className="nav-link">
              <Crown size={16} />
              <span>Evolución</span>
            </Link>
            <Link href="/about" className="nav-link">
              <Rocket size={16} />
              <span>Revolución</span>
            </Link>
            <Link href="/login" className="nav-link login-link">
              <span>ENTRAR</span>
            </Link>
            <FudiButton variant="primary" size="small" href="/register">
              <Sparkles size={16} />
              <span>ÚNETE AL FUDIVERSE</span>
            </FudiButton>
          </div>
        </nav>
      </header>

      {/* Hero Section - The Dream */}
      <section className="splash-hero">
        <div className="hero-content">
          
          {/* Status Badge */}
          <div className="status-badge">
            <div className="status-dot"></div>
            <span>REVOLUCIÓN EN PROGRESO</span>
            <Zap size={14} />
          </div>
          
          {/* Main Hero Text */}
          <h1 className="hero-title">
            DEJA DE <span className="title-highlight-red">ADIVINAR</span>.<br/>
            EMPIEZA A <span className="title-highlight-gold">DOMINAR</span>.
          </h1>
          
          <div className="hero-subtitle">
            <p className="subtitle-main">
              La <strong>inteligencia artificial</strong> que convierte tu restaurante 
              en una <strong className="gold-text">máquina de generar dinero</strong>
            </p>
            <p className="subtitle-secondary">
              Mientras tu competencia sigue adivinando, tú ya sabes exactamente qué va a pasar
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
              <span>SÍ, QUIERO DOMINAR</span>
            </FudiButton>
            
            <FudiButton 
              variant="secondary" 
              size="large" 
              href="/features"
              className="secondary-cta"
            >
              <Play size={18} />
              <span>VER EL PODER</span>
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
              "La mejor inversión que hice para mi restaurante" - Chef María, Ciudad de México
            </p>
          </div>
        </div>
      </section>

      {/* Power Timeline Section */}
      <section className="power-timeline">
        <div className="timeline-header">
          <h2 className="timeline-title">
            <Clock size={32} />
            UN DÍA EN LA VIDA CON FUDI
          </h2>
          <p className="timeline-subtitle">
            Mientras duermes, trabajas y vives... <strong>FUDI nunca para</strong>
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
            <h3>RESULTADO FINAL</h3>
            <p>Más ventas, menos estrés, cero adivinanzas</p>
            <div className="conclusion-cta">
              <FudiButton variant="primary" href="/register">
                ESTO LO QUIERO YA
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
              LA TRANSFORMACIÓN QUE NECESITAS
            </h2>
            <p className="transformation-subtitle">
              No es solo software. Es tu <strong>evolución empresarial</strong>.
            </p>
          </div>

          <div className="before-after">
            <div className="before-card">
              <h3 className="before-title">😰 ANTES DE FUDI</h3>
              <ul className="before-list">
                <li>"¿Cuánta comida preparo hoy?"</li>
                <li>"¿Por qué no vendí ayer?"</li>
                <li>"¿Este cliente es nuevo?"</li>
                <li>"¿Qué plato le gusta más?"</li>
                <li>Desperdicio, estrés, adivinanzas</li>
              </ul>
            </div>

            <div className="transformation-arrow">
              <ArrowRight size={32} />
              <span>CON FUDI</span>
            </div>

            <div className="after-card">
              <h3 className="after-title">🚀 DESPUÉS DE FUDI</h3>
              <ul className="after-list">
                <li>"FUDI ya calculó todo perfectamente"</li>
                <li>"Cada día es más rentable que el anterior"</li>
                <li>"FUDI reconoce a todos mis VIPs"</li>
                <li>"FUDI sabe qué recomendar siempre"</li>
                <li>Precisión, tranquilidad, éxito</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Infinito Vision */}
      <section className="vision-section">
        <InfinitoCard 
          variant="default"
          title="TU VISIÓN, REALIZADA"
          subtitle="EL FUTURO ES HOY"
          description="El restaurante que siempre soñaste tener, y aún más importante, el legado para tu gente!"
          icon={<Eye size={60} />}
          size="xl"
          glow={true}
          animated={true}
        />
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta-background">
          <div className="final-orb orb-1"></div>
          <div className="final-orb orb-2"></div>
          <div className="final-orb orb-3"></div>
        </div>
        
        <div className="final-cta-content">
          <div className="final-badge">
            <Sparkles size={16} />
            <span>TU MOMENTO HA LLEGADO</span>
          </div>
          
          <h2 className="final-title">
            ¿LISTO PARA DEJAR DE <span className="highlight-red">ADIVINAR</span><br/>
            Y EMPEZAR A <span className="highlight-gold">DOMINAR</span>?
          </h2>
          
          <p className="final-subtitle">
            La revolución de tu restaurante empieza con un click
          </p>
          
          <div className="final-actions">
            <FudiButton 
                variant="primary" 
                size="large" 
                href="/register"
                className="final-primary-cta"
              >
              <Rocket size={24} />
              <span>ÚNETE AL FUDIVERSE AHORA</span>
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
          <span>EMPEZAR</span>
        </FudiButton>
      </div>
    </div>
  );
}