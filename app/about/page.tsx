'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, TrendingUp, Vault, Users, ShoppingCart, 
  Truck, Sparkles, Zap, Target, ChevronRight,
  BarChart3, MessageSquare, Rocket, Award
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';

// Import the new CSS file
import '@/styles/pages/fudi.features.css';

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'FUDI NO ES TU EMPLEADO. ES TU CEREBRO EXTRA.',
      description: 'Mientras duermes, FUDI analiza. Mientras cocinas, FUDI calcula. Mientras atiendes, FUDI aprende.',
      quote: '"Chef, los viernes a las 8PM siempre piden 3 Margaritas... ¿preparamos?"',
      color: '#fbbf24'
    },
    {
      icon: BarChart3,
      title: 'DASHBOARDS QUE TE HACEN DECIR "WOW"',
      description: 'Olvídate de Excel estático. Mira tu negocio LATIR en tiempo real.',
      quote: '"Tu pizza #7 genera 340% más profit que la #3... ¿por qué sigues promoviendo la #3?"',
      color: '#3b82f6'
    },
    {
      icon: Vault,
      title: 'VAULT: TU OFICINA QUE NUNCA CIERRA',
      description: 'Propuestas que cierran deals. Reportes que enamoran inversionistas. Templates que te ahorran HORAS.',
      quote: 'Click. Edit. LISTO. Profesional.',
      color: '#8b5cf6'
    },
    {
      icon: Users,
      title: 'DISCOVERY: DONDE LOS PROS SE CONECTAN',
      description: 'Red social SIN ruido, PURO restaurantero PRO.',
      quote: 'Los secretos del gremio, AL FIN compartidos',
      color: '#10b981'
    },
    {
      icon: ShoppingCart,
      title: 'POS INTELIGENTE: VENDE MÁS, PIENSA MENOS',
      description: 'Te avisa ANTES del problema. Sugiere combos que FUNCIONAN. Reconoce clientes VIP automático.',
      quote: '"Juan viene cada martes. Ya tiene 47 visitas. ¿Le damos su 50ava gratis?"',
      color: '#ef4444'
    },
    {
      icon: Truck,
      title: 'PRÓXIMAMENTE: FUDELIVERY',
      description: 'Adiós comisiones del 30%. Hola ganancias REALES.',
      quote: 'Coming Soon',
      color: '#f59e0b',
      comingSoon: true
    }
  ];

  // Auto-rotate active feature every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="features-container">
      {/* FUDI Background Effects - Neural Network representing "Extra Brain" */}
      <FudiBackground 
        variant="neural"
        intensity={0.7}
        speed={0.6}
        color="mixed"
        opacity={0.35}
        fixed={true}
      />

      {/* Premium Header */}
      <header className="features-header">
        <nav className="features-nav">
          <Link href="/" className="features-logo">
            <span>FUDIVERSE</span>
          </Link>
          <div className="nav-links">
            <Link href="/features" className="nav-link active">Características</Link>
            <Link href="/pricing" className="nav-link">Precios</Link>
            <Link href="/about" className="nav-link">Nosotros</Link>
            <Link href="/login" className="nav-link">Entrar</Link>
            <FudiButton variant="primary" size="small" href="/register">
              ÚNETE
            </FudiButton>
          </div>
        </nav>
      </header>

      {/* Hero Section - Evolution Manifesto */}
      <section className="features-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            DEJA DE SOBREVIVIR. 
            <span className="hero-highlight"> EMPIEZA A DOMINAR.</span>
          </h1>
          <p className="hero-subtitle">
            Tu restaurante está a 1 click de la evolución
          </p>
          
          {/* Hero CTA */}
          <div className="hero-cta">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              EVOLUCIONA AHORA
            </FudiButton>
          </div>
        </div>

        {/* FUDI Entity - Excitement Mode */}
        <div className="hero-entity">
          <FudiEntity 
            variant="floating"
            mood="excited"
            size="large"
            followCursor={true}
            showParticles={true}
            showDataStreams={true}
            intensity={0.8}
          />
        </div>
      </section>

      {/* Features Showcase Grid */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;
            
            return (
              <div
                key={index}
                className={`feature-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
                style={{ '--feature-color': feature.color } as React.CSSProperties}
              >
                {/* Feature Icon with Glow */}
                <div className="feature-icon">
                  <Icon size={32} />
                  {feature.comingSoon && (
                    <span className="coming-soon-badge">PRONTO</span>
                  )}
                </div>

                {/* Feature Content */}
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  
                  {/* AI Quote with Sparkles */}
                  <blockquote className="feature-quote">
                    <Sparkles size={16} className="quote-icon" />
                    <span className="quote-text">{feature.quote}</span>
                  </blockquote>
                </div>

                {/* Interactive Elements */}
                <div className="feature-meta">
                  <div className="feature-status">
                    {feature.comingSoon ? (
                      <span className="status-badge coming-soon">Próximamente</span>
                    ) : (
                      <span className="status-badge available">Disponible</span>
                    )}
                  </div>
                  
                  <button className="feature-action">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Navigator */}
        <div className="feature-navigator">
          {features.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${activeFeature === index ? 'active' : ''}`}
              onClick={() => setActiveFeature(index)}
              aria-label={`Ir a característica ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="features-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <Target size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">+340%</div>
              <div className="stat-label">ROI Promedio</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <TrendingUp size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">15min</div>
              <div className="stat-label">Setup Completo</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <Award size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">24/7</div>
              <div className="stat-label">FUDI Trabajando</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">
              <Zap size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">∞</div>
              <div className="stat-label">Potencial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution CTA Section */}
      <section className="features-cta">
        <div className="cta-content">
          <h2 className="cta-title">¿LISTO PARA EVOLUCIONAR?</h2>
          <p className="cta-description">
            Únete a los restauranteros que ya dominan su industria
          </p>
          
          <div className="cta-actions">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              ÚNETE AL FUDIVERSE
            </FudiButton>
            
            <FudiButton 
              variant="secondary" 
              size="large" 
              href="/demo"
              icon={<MessageSquare size={20} />}
            >
              VER DEMO
            </FudiButton>
          </div>
          
          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-value">500+</span>
              <span className="trust-label">Restaurantes</span>
            </div>
            <div className="trust-item">
              <span className="trust-value">98%</span>
              <span className="trust-label">Satisfacción</span>
            </div>
            <div className="trust-item">
              <span className="trust-value">$2M+</span>
              <span className="trust-label">Ahorrados</span>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="cta-effects">
          <div className="effect-orb orb-1"></div>
          <div className="effect-orb orb-2"></div>
          <div className="effect-orb orb-3"></div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="features-footer">
        <div className="footer-content">
          <p>&copy; 2024 FudiVerse. El futuro de la restauración.</p>
          <div className="footer-links">
            <Link href="/terms">Términos</Link>
            <Link href="/privacy">Privacidad</Link>
            <Link href="/contact">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}