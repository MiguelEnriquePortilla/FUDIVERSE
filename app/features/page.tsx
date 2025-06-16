'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Brain, BarChart3, Vault, Users, ShoppingCart,
  Sparkles, TrendingUp, Award, ChevronRight, Star,
  Play, MessageSquare, Rocket, Clock
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import '@/styles/pages/fudi.features.css';

export default function FeaturesPage() {
  const features = [
    {
      id: 'fudigpt',
      name: 'fudiGPT',
      subtitle: 'Tu Cerebro que Nunca Duerme',
      description: 'IA que conoce tu negocio mejor que tu contador',
      color: '#fbbf24',
      icon: Brain,
      keyBenefit: '"Chef, tus clientes de los martes ordenan 40% más ensaladas después de las 7PM"',
      impact: 'Decisiones inteligentes mientras duermes',
      testimonial: '"Ya no adivino qué comprar. fudiGPT me dice exactamente qué necesito."',
      status: 'available'
    },
    {
      id: 'fudiboard',
      name: 'fudiBOARD',
      subtitle: 'EL PRIMER DASHBOARD Ai powered',
      description: 'Dashboards que hablan tu idioma de negocio',
      color: '#3b82f6',
      icon: BarChart3,
      keyBenefit: '"Tu mesa #5 genera 23% menos revenue que la #3. ¿Movemos esa TV?"',
      impact: 'Ve patrones que tus ojos no detectan',
      testimonial: '"Mis números hablan. Ahora SÉ por qué algunos días vendo más."',
      status: 'available'
    },
    {
      id: 'fudihub',
      name: 'fudiHUB',
      subtitle: 'Tu Oficina que Nunca Cierra',
      description: 'Documentos profesionales sin el estrés profesional',
      color: '#8b5cf6',
      icon: Vault,
      keyBenefit: '"Genera propuestas profesionales en 3 clicks. Cierra deals mientras compites."',
      impact: 'Documentos de 10/10 sin el estrés',
      testimonial: '"Mis reportes ahora compiten con cadenas grandes. Mismo nivel, menos drama."',
      status: 'available'
    },
    {
      id: 'fudiflow',
      name: 'fudiFLOW',
      subtitle: 'La red social para nosotros los fudiErs',
      description: 'Networking entre restauranteros que realmente funciona',
      color: '#10b981',
      icon: Users,
      keyBenefit: '"Conecta con otros restos. Comparte clientes. Crece en red, no solo."',
      impact: 'Tu competencia ahora es tu aliado',
      testimonial: '"Intercambio clientes con el sushi de enfrente. Ambos ganamos más."',
      status: 'available'
    },
    {
      id: 'fudimart',
      name: 'fudiMART',
      subtitle: 'Vende, Compra, Cambia, Negocia, lo que quieras, estás entre RESTOS',
      description: 'El marketplace donde cada peso se rentabiliza',
      color: '#f59e0b',
      icon: ShoppingCart,
      keyBenefit: '"¿Te sobró salmón? Véndelo al resto de al lado. Cero desperdicio."',
      impact: 'Cada peso invertido, rentabilizado',
      testimonial: '"Mi exceso de inventario es el tesoro de otro resto. Win-win real."',
      status: 'available'
    }
  ];

  return (
    <div className="features-container">
      {/* Single Clean Background */}
      <FudiBackground 
        variant="premium"
        theme="claude"
        intensity={0.2}
        opacity={1}
        fixed={true}
      />

      {/* Header - Consistent with Pricing */}
      <header className="features-header">
        <nav className="features-nav">
          <Link href="/" className="features-logo">
            <span>FUDIVERSE</span>
          </Link>
          <div className="nav-links">
            <Link href="/features" className="nav-link active">Características</Link>
            <Link href="/pricing" className="nav-link">Planes</Link>
            <Link href="/about" className="nav-link">Nosotros</Link>
            <Link href="/login" className="nav-link">Entrar</Link>
            <FudiButton variant="primary" size="small" href="/register">
              ÚNETE
            </FudiButton>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="features-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>ARSENAL COMPLETO</span>
          </div>
          
          <h1 className="hero-title">
            NO SOLO <span className="hero-highlight">HERRAMIENTAS</span>.<br/>
            TU NUEVO <span className="hero-highlight">CEREBRO DE NEGOCIO</span>.
          </h1>
          <p className="hero-subtitle">
            Cada feature de FUDIVERSE está diseñada por <strong>restauranteros, para restauranteros</strong>. 
            Sin tecnicismos. Solo resultados.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">+500</div>
              <div className="stat-label">Restaurantes</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
            <div className="stat">
              <div className="stat-number">+25%</div>
              <div className="stat-label">Revenue Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id} 
                className={`feature-card ${feature.status === 'coming-soon' ? 'coming-soon' : ''}`}
                style={{ '--feature-color': feature.color } as React.CSSProperties}
              >
                {feature.status === 'coming-soon' && (
                  <div className="coming-soon-badge">
                    <Clock size={16} />
                    <span>Q2 2025</span>
                  </div>
                )}

                <div className="feature-header">
                  <div className="feature-icon">
                    <Icon size={32} />
                    <div className="icon-glow"></div>
                  </div>
                  <div className="feature-number">0{index + 1}</div>
                </div>

                <div className="feature-content">
                  <h3 className="feature-name">{feature.name}</h3>
                  <p className="feature-subtitle">{feature.subtitle}</p>
                  <p className="feature-description">{feature.description}</p>

                  <div className="feature-benefit">
                    <div className="benefit-icon">
                      <TrendingUp size={16} />
                    </div>
                    <span>{feature.keyBenefit}</span>
                  </div>

                  <div className="feature-impact">
                    <Award size={16} />
                    <span>{feature.impact}</span>
                  </div>

                  <blockquote className="feature-testimonial">
                    <span>{feature.testimonial}</span>
                  </blockquote>
                </div>

                <div className="feature-cta">
                  {feature.status === 'available' ? (
                    <FudiButton 
                      variant="secondary"
                      size="medium"
                      href={`/demo/${feature.id}`}
                      className="demo-btn"
                    >
                      <Play size={16} />
                      VER DEMO
                      <ChevronRight size={16} />
                    </FudiButton>
                  ) : (
                    <FudiButton 
                      variant="secondary"
                      size="medium"
                      href={`/notify/${feature.id}`}
                      className="notify-btn"
                    >
                      <MessageSquare size={16} />
                      NOTIFICARME
                    </FudiButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div className="cta-content">
          <div className="cta-badge">
            <Brain size={16} />
            <span>EVOLUCIÓN COMPLETA</span>
          </div>
          
          <h2 className="cta-title">
            ¿LISTO PARA <span className="highlight">EVOLUCIONAR</span> TU RESTAURANTE?
          </h2>
          <p className="cta-subtitle">
            🎁 <strong>Primer mes GRATIS</strong> con acceso a todas las features
          </p>
          
          <div className="cta-actions">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              EMPEZAR GRATIS
            </FudiButton>
            
            <FudiButton 
              variant="secondary" 
              size="large" 
              href="/pricing"
              icon={<Star size={20} />}
            >
              VER PLANES
            </FudiButton>
          </div>
          
          <div className="trust-quote">
            <blockquote>
              "No es tecnología por tecnología. Es <strong>inteligencia aplicada</strong> al negocio que amas."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="features-footer">
        <div className="footer-content">
          <p>&copy; 2024 FUDIVERSE. Inteligencia para restauranteros inteligentes.</p>
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