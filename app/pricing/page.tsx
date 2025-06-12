'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, Sparkles, Rocket, Crown, Building2,
  MessageSquare, BarChart3, Vault, Users, ShoppingCart,
  Zap, Star, TrendingUp, Award, ChevronRight
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import styles from './pricing.module.css';

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
    <div className={styles.container}>
      <FudiBackground 
        variant="dots"
        intensity={0.2}
        speed={0.5}
        color="mixed"
        opacity={0.4}
      />

      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <span>FUDIVERSE</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/features" className={styles.navLink}>Características</Link>
            <Link href="/pricing" className={styles.navLink}>Precios</Link>
            <Link href="/about" className={styles.navLink}>Nosotros</Link>
            <Link href="/login" className={styles.navLink}>Entrar</Link>
            <FudiButton variant="primary" size="small" href="/register">
              ÚNETE
            </FudiButton>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            ELIGE TU NIVEL DE <span className={styles.highlight}>EVOLUCIÓN</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Todos los planes incluyen el poder de FUDI. La diferencia es cuánto quieres DOMINAR.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className={styles.billingToggle}>
          <button 
            className={`${styles.toggleBtn} ${billingCycle === 'monthly' ? styles.active : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Mensual
          </button>
          <button 
            className={`${styles.toggleBtn} ${billingCycle === 'annual' ? styles.active : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            Anual
            <span className={styles.discount}>-20%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className={styles.pricing}>
        <div className={styles.pricingGrid}>
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div 
                key={plan.id} 
                className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}
                style={{ '--plan-color': plan.color } as any}
              >
                {plan.popular && (
                  <div className={styles.popularBadge}>
                    <Star size={16} />
                    MÁS POPULAR
                  </div>
                )}

                <div className={styles.planHeader}>
                  <div className={styles.planIcon}>
                    <Icon size={32} />
                  </div>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planTagline}>{plan.tagline}</p>
                </div>

                <div className={styles.planPrice}>
                  {plan.isEnterprise ? (
                    <span className={styles.priceCustom}>Hablemos</span>
                  ) : (
                    <>
                      <span className={styles.currency}>$</span>
                      <span className={styles.amount}>{plan.price}</span>
                      <span className={styles.period}>/mes</span>
                    </>
                  )}
                </div>

                <p className={styles.planDescription}>{plan.description}</p>

                <div className={styles.perfectFor}>
                  <Award size={16} />
                  <span>{plan.perfectFor}</span>
                </div>

                <ul className={styles.features}>
                  {plan.features.map((feature, index) => (
                    <li key={index} className={styles.feature}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <FudiButton 
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="medium"
                  href={plan.isEnterprise ? '/contact' : '/register'}
                  fullWidth
                >
                  {plan.isEnterprise ? 'CONTACTAR' : 'EMPIEZA HOY'}
                  <ChevronRight size={16} />
                </FudiButton>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿CUÁL ES TU NIVEL?</h2>
          <p className={styles.ctaSubtitle}>
            🎁 Primer mes con 20% OFF en cualquier plan anual
          </p>
          <FudiButton 
            variant="primary" 
            size="large" 
            href="/register"
            icon={<Rocket size={20} />}
          >
            EMPIEZA HOY
          </FudiButton>
        </div>
      </section>

      {/* Floating FUDI */}
      <div className={styles.floatingFudi}>
        <FudiEntity 
          variant="corner"
          mood="happy"
          size="small"
          followCursor={false}
        />
      </div>
    </div>
  );
}