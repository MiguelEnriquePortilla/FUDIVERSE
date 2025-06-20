'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, Sparkles, Rocket, Crown, Building2,
  MessageSquare, BarChart3, Users, Zap, Star, 
  TrendingUp, Award, ChevronRight, Brain
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import del CSS separado y minimalista
import '@/styles/pages/fudi.pricing.css';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Planes reestructurados según tu estrategia
  const plans = [
    {
      id: 'basic',
      name: 'BÁSICO',
      price: billingCycle === 'monthly' ? 19.99 : 15.99,
      tagline: 'COMIENZA CON fudiGPT',
      description: 'Para restauranteros que quieren probar el poder de la IA',
      color: '#10b981',
      icon: Brain,
      perfectFor: 'Acabas de abrir o quieres entender mejor tus números',
      features: [
        'fudiGPT limitado (50 consultas/mes)',
        'Análisis básico de ventas',
        'Insights sobre tendencias semanales',
        'Reportes simples de inventario',
        'Soporte por email'
      ]
    },
    {
      id: 'pro',
      name: 'PRO',
      price: billingCycle === 'monthly' ? 49.99 : 39.99,
      tagline: 'fudiGPT + fudiBOARD',
      description: 'El combo perfecto para restauranteros inteligentes',
      color: '#3b82f6',
      icon: BarChart3,
      popular: true,
      perfectFor: 'Ya tienes clientes regulares y quieres optimizar todo',
      features: [
        'fudiGPT limitado (200 consultas/mes)',
        'fudiBOARD limitado (dashboard básico)',
        'Análisis de rentabilidad por plato',
        'Alertas inteligentes básicas',
        'Predicciones de demanda simples',
        'Exportación de reportes',
        'Soporte prioritario'
      ]
    },
    {
      id: 'max',
      name: 'MAX',
      price: billingCycle === 'monthly' ? 99.99 : 79.99,
      tagline: 'TODO ILIMITADO + fudiWHATS',
      description: 'Para restauranteros que quieren dominar completamente',
      color: '#fbbf24',
      icon: Crown,
      perfectFor: 'Tu restaurante es tu negocio principal y buscas maximizar',
      features: [
        'fudiGPT ILIMITADO (consultas infinitas)',
        'fudiBOARD ILIMITADO (dashboards avanzados)',
        'fudiWHATS incluido (automatización WhatsApp)',
        'FUDIVERSE AI personalizado para tu marca',
        'Análisis predictivo avanzado',
        'Integración con sistemas POS',
        'API access completo',
        'Soporte premium 24/7',
        'Consultoría mensual personalizada'
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
      perfectFor: 'Tienes 3+ unidades y necesitas visión consolidada',
      features: [
        'Todo MAX para múltiples ubicaciones',
        'Dashboard corporativo unificado',
        'FUDIVERSE personalizado para tu cadena',
        'Entrenamiento para equipos completos',
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
    <div className="pricing-container-refined">
      
      {/* Background ÚNICO - Apple Style */}
      <FudiBackground 
        variant="gradient"
        theme="business"  
        opacity={1}
        fixed={true}
      />

      {/* Header estándar */}
      <FudiHeader 
        currentPage="pricing"
        showAuthButtons={true}
      />

      {/* Hero Section */}
      <section className="hero-refined">
        <div className="hero-content-refined">
          {/* Badge eliminado según ajustes */}
          
          <h1 className="hero-title-refined">
            ELIGE EL PLAN QUE <span className="hero-highlight-refined">TRANSFORME</span> TU RESTAURANTE
          </h1>
          <p className="hero-subtitle-refined">
            Todos los planes incluyen FUDIVERSE AI. La diferencia está en cuánta <strong>potencia</strong> quieres desbloquear.
          </p>

          <div className="hero-quote-refined">
            <span>"Entiende tus datos. Transfórmalos en información.<br/>
            Escribe tu <span className="quote-highlight-refined">historia de éxito</span>."</span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle-refined">
          <button 
            className={`toggle-btn-refined ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Mensual
          </button>
          <button 
            className={`toggle-btn-refined ${billingCycle === 'annual' ? 'active' : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            Anual
            <span className="discount-refined">-20%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-refined">
        <div className="pricing-grid-refined">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <FudiCard 
                key={plan.id}
                variant="chat" 
                padding="large"
                className={`pricing-card-refined ${plan.popular ? 'popular' : ''}`}
              >
                <div className="plan-content-refined" style={{ '--plan-color': plan.color } as React.CSSProperties}>
                  {plan.popular && (
                    <div className="popular-badge-refined">
                      <Star size={16} />
                      <span>MÁS POPULAR</span>
                    </div>
                  )}

                  <div className="plan-header-refined">
                    <div className="plan-icon-refined">
                      <Icon size={32} />
                    </div>
                    <h3 className="plan-name-refined">{plan.name}</h3>
                    <p className="plan-tagline-refined">{plan.tagline}</p>
                  </div>

                  <div className="plan-price-refined">
                    {plan.isEnterprise ? (
                      <span className="price-custom-refined">Hablemos</span>
                    ) : (
                      <>
                        <span className="currency-refined">$</span>
                        <span className="amount-refined">{plan.price}</span>
                        <span className="period-refined">/mes</span>
                      </>
                    )}
                  </div>

                  <p className="plan-description-refined">{plan.description}</p>

                  <div className="perfect-for-refined">
                    <Award size={16} />
                    <span>{plan.perfectFor}</span>
                  </div>

                  <ul className="features-refined">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-refined">
                        <div className="check-icon-refined">
                          <Check size={16} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="plan-cta-refined">
                    <FudiButton 
                      variant={plan.popular ? 'orange' : 'secondary'}
                      size="large"
                      href={plan.isEnterprise ? '/contact' : '/register'}
                      icon={plan.isEnterprise ? <MessageSquare size={16} /> : <Rocket size={16} />}
                    >
                      {plan.isEnterprise ? 'CONTACTAR' : 'EMPEZAR HOY'}
                    </FudiButton>
                  </div>
                </div>
              </FudiCard>
            );
          })}
        </div>
      </section>

      {/* Philosophy Hero - Frase destacada */}
      <section className="philosophy-hero-refined">
        <div className="philosophy-content-refined">
          <h2 className="philosophy-title-refined">
            "Cada gran restaurante comenzó con una<br/>
            <span className="philosophy-highlight-refined">decisión inteligente</span>"
          </h2>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-section-refined">
        <div className="cta-content-refined">
          {/* Badge eliminado según ajustes */}
          
          <h2 className="cta-title-refined">
            ¿LISTO PARA TOMAR <span className="cta-highlight-refined">MEJORES DECISIONES</span>?
          </h2>
          <p className="cta-subtitle-refined">
            🎁 <strong>Primer mes con 20% OFF</strong> en cualquier plan anual
          </p>
          
          <div className="cta-actions-refined">
            <FudiButton 
              variant="orange" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              EMPEZAR HOY
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
          
          <div className="trust-quote-refined">
            <p className="trust-note-refined">
              💡 <strong>Sin permanencia</strong> - Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}