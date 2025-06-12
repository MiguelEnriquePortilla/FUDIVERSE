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
import styles from './features.module.css';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className={styles.container}>
      <FudiBackground 
        variant="circuits"
        intensity={0.2}
        speed={0.5}
        color="blue"
        opacity={0.3}
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
            DEJA DE SOBREVIVIR. 
            <span className={styles.highlight}> EMPIEZA A DOMINAR.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Tu restaurante está a 1 click de la evolución
          </p>
        </div>

        <FudiEntity 
          variant="floating"
          mood="excited"
          size="large"
          followCursor={true}
          showParticles={true}
        />
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`${styles.featureCard} ${activeFeature === index ? styles.active : ''}`}
                onClick={() => setActiveFeature(index)}
                style={{ '--feature-color': feature.color } as any}
              >
                <div className={styles.featureIcon}>
                  <Icon size={32} />
                  {feature.comingSoon && (
                    <span className={styles.comingSoonBadge}>PRONTO</span>
                  )}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <blockquote className={styles.featureQuote}>
                  <Sparkles size={16} />
                  <span>{feature.quote}</span>
                </blockquote>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿LISTO PARA EVOLUCIONAR?</h2>
          <FudiButton 
            variant="primary" 
            size="large" 
            href="/register"
            icon={<Rocket size={20} />}
          >
            ÚNETE AL FUDIVERSE
          </FudiButton>
        </div>
      </section>
    </div>
  );
}