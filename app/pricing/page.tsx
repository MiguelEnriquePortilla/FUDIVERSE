'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, Sparkles, Rocket, Crown, Building2,
  MessageSquare, BarChart3, Vault, Users, ShoppingCart,
  Zap, Star, TrendingUp, Award, ChevronRight, Flame
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { InfinitoCard } from '@/components/fudiverse/InfinitoCard';
import '@/styles/pages/fudi.pricing.css';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'BÁSICO',
      price: billingCycle === 'monthly' ? 19.99 : 15.99,
      tagline: 'PRUEBA EL PODER',
      description: 'Para los que quieren probar antes de VOLAR',
      color: '#10b981',
      icon: Sparkles,
      perfectFor: 'Acabas de abrir o quieres sentir el poder sin compromiso',
      features: [
        'FUDI Chat con límite mensual (pero qué límite tan generoso 😉)',
        'La misma inteligencia que usan los PROS',
        'Respuestas que valen ORO',
        'Análisis básico de tu restaurante',
        'Soporte por email'
      ]
    },
    {
      id: 'pro',
      name: 'PRO',
      price: billingCycle === 'monthly' ? 49.99 : 39.99,
      tagline: 'MODO RESTAURANTERO SERIO',
      description: 'El favorito de los que ya entendieron el juego',
      color: '#3b82f6',
      icon: Rocket,
      popular: true,
      perfectFor: 'Ya tienes clientes y quieres MULTIPLICARLOS',
      features: [
        'FUDI Chat ILIMITADO (pregunta hasta que te canses)',
        'Dashboard en VIVO - mira tu negocio LATIR',
        'Alertas inteligentes que SALVAN ventas',
        'Insights que tus competidores DESEARÍAN tener',
        'Análisis predictivo básico',
        'Soporte prioritario',
        'Exportación de reportes'
      ]
    },
    {
      id: 'max',
      name: 'MAX',
      price: billingCycle === 'monthly' ? 99.99 : 79.99,
      tagline: 'DOMINACIÓN TOTAL',
      description: 'Para los que no vinieron a jugar, vinieron a GANAR',
      color: '#fbbf24',
      icon: Crown,
      perfectFor: 'Tu restaurante es tu IMPERIO y lo tratas como tal',
      features: [
        'TODO FUDIVERSE desbloqueado 🚀',
        'VAULT incluido - tu oficina digital PRO',
        'DISCOVERY - únete a la élite restaurantera',
        'POS inteligente cuando esté listo',
        'Análisis predictivo avanzado',
        'API access para integraciones',
        'Soporte prioritario (respuesta en minutos)',
        'Entrenamiento personalizado',
        'Early access a nuevas features'
      ]
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE',
      price: 'Personalizado',
      tagline: 'MÚLTIPLES UNIDADES, MÚLTIPLES VICTORIAS',
      description: 'Porque los imperios necesitan herramientas imperiales',
      color: '#8b5cf6',
      icon: Building2,
      perfectFor: 'Tienes 3+ unidades y sueñas en GRANDE',
      features: [
        'Todo MAX multiplicado por tus sucursales',
        'Dashboard corporativo consolidado',
        'Entrenamiento para tu equipo completo',
        'FUDI personalizado para tu marca',
        'Integraciones personalizadas',
        'SLA garantizado',
        'Account manager dedicado',
        'Tu éxito tiene un equipo dedicado',
        'Roadmap compartido'
      ],
      isEnterprise: true
    }
  ];

  return (
    <div className="pricing-container">
      {/* FUDI Background Effects */}
      <FudiChatGrid 
        opacity={0.15}
        gridSize={80}
        color="#4a4a4a"
        animated={true}
        showGradient={true}
        pulseSpeed={1.5}
      />
      
      <FudiBackground 
        variant="grid"
        intensity={0.3}
        speed={0.5}
        color="mixed"
        opacity={0.4}
      />

      {/* Header */}
      <header className="pricing-header">
        <nav className="pricing-nav">
          <Link href="/" className="pricing-logo">
            <span>FUDIVERSE</span>
          </Link>
          <div className="nav-links">
            <Link href="/features" className="nav-link">Características</Link>
            <Link href="/pricing" className="nav-link active">Precios</Link>
            <Link href="/about" className="nav-link">Nosotros</Link>
            <Link href="/login" className="nav-link">Entrar</Link>
            <FudiButton variant="primary" size="small" href="/register">
              ÚNETE
            </FudiButton>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Crown size={16} />
            <span>NIVELES DE EVOLUCIÓN</span>
          </div>
          
          <h1 className="hero-title">
            ELIGE TU NIVEL DE <span className="hero-highlight">EVOLUCIÓN</span>
          </h1>
          <p className="hero-subtitle">
            Todos los planes incluyen el poder de FUDI. La diferencia es cuánto quieres <strong>DOMINAR</strong>.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Mensual
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            Anual
            <span className="discount">-20%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="pricing-grid">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div 
                key={plan.id} 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                style={{ '--plan-color': plan.color } as React.CSSProperties}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Star size={16} />
                    <span>MÁS POPULAR</span>
                  </div>
                )}

                <div className="plan-header">
                  <div className="plan-icon">
                    <Icon size={32} />
                    <div className="icon-rings">
                      <div className="ring ring-1"></div>
                      <div className="ring ring-2"></div>
                    </div>
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>

                <div className="plan-price">
                  {plan.isEnterprise ? (
                    <span className="price-custom">Hablemos</span>
                  ) : (
                    <>
                      <span className="currency">$</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">/mes</span>
                    </>
                  )}
                </div>

                <p className="plan-description">{plan.description}</p>

                <div className="perfect-for">
                  <Award size={16} />
                  <span>{plan.perfectFor}</span>
                </div>

                <ul className="features">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature">
                      <div className="check-icon">
                        <Check size={16} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <FudiButton 
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="medium"
                  href={plan.isEnterprise ? '/contact' : '/register'}
                  className="plan-cta"
                >
                  {plan.isEnterprise ? 'CONTACTAR' : 'EMPIEZA HOY'}
                  <ChevronRight size={16} />
                </FudiButton>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof-section">
        <div className="social-proof-content">
          <h2 className="social-proof-title">
            <Users size={32} />
            ÚNETE A LA ÉLITE RESTAURANTERA
          </h2>
          
          <div className="proof-stats">
            <div className="proof-stat">
              <div className="stat-value">+500</div>
              <div className="stat-label">Restaurantes</div>
              <div className="stat-description">Ya dominan con FUDI</div>
            </div>
            <div className="proof-stat">
              <div className="stat-value">98%</div>
              <div className="stat-label">Satisfacción</div>
              <div className="stat-description">Clientes felices</div>
            </div>
            <div className="proof-stat">
              <div className="stat-value">$2M+</div>
              <div className="stat-label">Ahorrados</div>
              <div className="stat-description">En costos operativos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinito Card - Potential Section */}
      <section className="potential-section">
        <InfinitoCard 
          variant="cosmic"
          title="TU POTENCIAL INFINITO"
          subtitle="NO HAY LÍMITES"
          description="Cada plan es un escalón hacia la grandeza, y aún más importante, hacia el crecimiento de tu gente!"
          icon={<Rocket size={60} />}
          size="large"
          glow={true}
          animated={true}
        />
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div className="cta-background">
          <div className="cta-orb orb-1"></div>
          <div className="cta-orb orb-2"></div>
          <div className="cta-orb orb-3"></div>
        </div>
        
        <div className="cta-content">
          <div className="cta-badge">
            <Flame size={16} />
            <span>TU MOMENTO</span>
          </div>
          
          <h2 className="cta-title">¿CUÁL ES TU <span className="highlight">NIVEL</span>?</h2>
          <p className="cta-subtitle">
            🎁 <strong>Primer mes con 20% OFF</strong> en cualquier plan anual
          </p>
          
          <div className="cta-actions">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              EMPIEZA HOY
            </FudiButton>
            
            <FudiButton 
              variant="secondary" 
              size="large" 
              href="/features"
              icon={<MessageSquare size={20} />}
            >
              VER FEATURES
            </FudiButton>
          </div>
          
          <div className="trust-quote">
            <blockquote>
              "La evolución empieza con una decisión. <strong>¿Cuál será la tuya?</strong>"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pricing-footer">
        <div className="footer-content">
          <p>&copy; 2024 FUDIVERSE. Todos los niveles disponibles.</p>
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