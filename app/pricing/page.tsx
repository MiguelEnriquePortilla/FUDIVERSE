'use client';

import { useState } from 'react';
import { 
  Check, Sparkles, Rocket, Crown, Building2,
  MessageSquare, BarChart3, Users, Zap, Star, 
  TrendingUp, Award, ChevronRight, Brain
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';
import '@/styles/pages/fudi.pricing.css';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'BÁSICO',
      price: billingCycle === 'monthly' ? 19.99 : 15.99,
      tagline: 'COMIENZA TU TRANSFORMACIÓN',
      description: 'Para restauranteros que quieren probar el poder de la información inteligente',
      color: '#10b981',
      icon: Sparkles,
      perfectFor: 'Acabas de abrir o quieres entender mejor tus números sin compromiso',
      features: [
        'FUDIVERSE AI con análisis básico mensual',
        'Conversaciones naturales sobre tu restaurante',
        'Insights sobre ventas y tendencias',
        'Reportes simples y claros',
        'Soporte por email'
      ]
    },
    {
      id: 'pro',
      name: 'PRO',
      price: billingCycle === 'monthly' ? 49.99 : 39.99,
      tagline: 'INTELIGENCIA COMPLETA',
      description: 'El plan preferido por restauranteros que toman decisiones basadas en datos',
      color: '#3b82f6',
      icon: BarChart3,
      popular: true,
      perfectFor: 'Ya tienes clientes regulares y quieres optimizar operaciones',
      features: [
        'FUDIVERSE AI ilimitado con análisis avanzado',
        'Dashboard en tiempo real de tu restaurante',
        'Alertas inteligentes sobre anomalías',
        'Predicciones de demanda y inventario',
        'Análisis de rentabilidad por plato',
        'Soporte prioritario',
        'Exportación de todos los reportes'
      ]
    },
    {
      id: 'max',
      name: 'MAX',
      price: billingCycle === 'monthly' ? 99.99 : 79.99,
      tagline: 'MÁXIMO POTENCIAL',
      description: 'Para restauranteros que quieren todas las herramientas para el éxito',
      color: '#fbbf24',
      icon: Crown,
      perfectFor: 'Tu restaurante es tu negocio principal y buscas maximizar resultados',
      features: [
        'Todo FUDIVERSE desbloqueado',
        'VAULT incluido - gestión documental inteligente',
        'Análisis predictivo avanzado con IA',
        'Integración con sistemas POS',
        'Benchmarking vs industria',
        'API access para integraciones personalizadas',
        'Soporte premium (respuesta inmediata)',
        'Consultoría mensual personalizada',
        'Acceso anticipado a nuevas funciones'
      ]
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE',
      price: 'Personalizado',
      tagline: 'MÚLTIPLES UNIDADES, UNA PLATAFORMA',
      description: 'Solución completa para cadenas y grupos restauranteros',
      color: '#8b5cf6',
      icon: Building2,
      perfectFor: 'Tienes 3+ unidades y necesitas visión consolidada del negocio',
      features: [
        'Todo MAX para múltiples ubicaciones',
        'Dashboard corporativo unificado',
        'Entrenamiento para equipos completos',
        'FUDIVERSE personalizado para tu marca',
        'Integraciones enterprise personalizadas',
        'SLA garantizado y soporte 24/7',
        'Account manager dedicado',
        'Análisis consolidado multi-unidad',
        'Roadmap de producto compartido'
      ],
      isEnterprise: true
    }
  ];

  return (
    <div className="pricing-container">
      
      {/* ✅ NUEVO: FudiHeader reemplaza header custom */}
      <FudiHeader currentPage="pricing" />
      
      {/* ✅ UN SOLO BACKGROUND LIMPIO */}
      <FudiBackground 
        variant="medium"
        theme="charcoal"
        intensity={0.2}
        opacity={1}
        fixed={true}
      />

      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Brain size={16} />
            <span>PLANES INTELIGENTES</span>
          </div>
          
          <h1 className="hero-title">
            ELIGE EL PLAN QUE <span className="hero-highlight">TRANSFORME</span> TU RESTAURANTE
          </h1>
          <p className="hero-subtitle">
            Todos los planes incluyen FUDIVERSE AI. La diferencia está en cuánta <strong>información inteligente</strong> quieres tener.
          </p>

          {/* Nuevo Tagline */}
          <div className="hero-quote">
            <Sparkles size={20} />
            <span>"Entiende tus datos. Transfórmalos en información. Escribe tu historia de éxito. Solo con FUDIVERSE AI."</span>
          </div>
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
            ÚNETE A RESTAURANTEROS INTELIGENTES
          </h2>
          
          <div className="proof-stats">
            <div className="proof-stat">
              <div className="stat-value">+500</div>
              <div className="stat-label">Restaurantes</div>
              <div className="stat-description">Ya usan FUDIVERSE AI</div>
            </div>
            <div className="proof-stat">
              <div className="stat-value">98%</div>
              <div className="stat-label">Satisfacción</div>
              <div className="stat-description">Toman mejores decisiones</div>
            </div>
            <div className="proof-stat">
              <div className="stat-value">$2M+</div>
              <div className="stat-label">Ahorrados</div>
              <div className="stat-description">En optimización operativa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div className="cta-content">
          <div className="cta-badge">
            <Brain size={16} />
            <span>DECISIÓN INTELIGENTE</span>
          </div>
          
          <h2 className="cta-title">¿LISTO PARA TOMAR <span className="highlight">MEJORES DECISIONES</span>?</h2>
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
              VER CARACTERÍSTICAS
            </FudiButton>
          </div>
          
          <div className="trust-quote">
            <blockquote>
              "Cada gran restaurante comenzó con una <strong>decisión inteligente</strong>"
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}