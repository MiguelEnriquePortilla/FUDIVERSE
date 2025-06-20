'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, BarChart3, Vault, Users, ShoppingCart,
  Sparkles, TrendingUp, Award, ChevronRight, Star,
  Play, MessageSquare, Rocket, Clock
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import del CSS separado y minimalista
import '@/styles/pages/fudi.features.css';

export default function FeaturesPage() {
  // Solo fudiGPT y fudiBOARD según ajustes
  const coreFeatures = [
    {
      id: 'fudigpt',
      name: 'fudiGPT',
      subtitle: 'Tu Cerebro que Nunca Duerme',
      description: 'IA que conoce tu negocio mejor que tu contador',
      color: '#fbbf24',
      icon: Brain,
      benefits: [
        'Analiza patrones de consumo automáticamente',
        'Predice demanda por horarios y días',
        'Optimiza inventario sin desperdicio',
        'Sugiere precios dinámicos rentables',
        'Detecta oportunidades de upselling',
        'Automatiza pedidos a proveedores'
      ]
    },
    {
      id: 'fudiboard',
      name: 'fudiBOARD', 
      subtitle: 'EL PRIMER DASHBOARD Ai powered',
      description: 'Dashboards que hablan tu idioma de negocio',
      color: '#3b82f6',
      icon: BarChart3,
      benefits: [
        'Métricas en tiempo real sin complicaciones',
        'Alertas inteligentes de problemas críticos',
        'Comparativas automáticas vs competencia',
        'Reportes ejecutivos en 1 click',
        'Proyecciones financieras precisas',
        'Integración total con redes sociales'
      ]
    }
  ];

  return (
    <div className="features-container-refined">
      
      {/* Background ÚNICO - Apple Style */}
      <FudiBackground 
        variant="gradient"
        theme="business"  
        opacity={1}
        fixed={true}
      />

      {/* Header estándar */}
      <FudiHeader 
        currentPage="features"
        showAuthButtons={true}
      />

      {/* Hero Section */}
      <section className="hero-refined">
        <div className="hero-content-refined">
          {/* Badge eliminado según ajustes */}
          
          <h1 className="hero-title-refined">
            NO SOLO <span className="hero-highlight-refined">HERRAMIENTAS</span>.<br/>
            TU NUEVO <span className="hero-highlight-refined">CEREBRO DE NEGOCIO</span>.
          </h1>
          <p className="hero-subtitle-refined">
            Cada feature de FUDIVERSE está diseñada por <strong>restauranteros, para restauranteros</strong>. 
            Sin tecnicismos. Solo resultados.
          </p>

          {/* Stats eliminadas según ajustes - reemplazadas por características */}
          <div className="hero-features-refined">
            <div className="feature-chip-refined">
              <Brain size={16} />
              <span>IA que Aprende tu Negocio</span>
            </div>
            <div className="feature-chip-refined">
              <BarChart3 size={16} />
              <span>Dashboards Inteligentes</span>
            </div>
            <div className="feature-chip-refined">
              <TrendingUp size={16} />
              <span>Decisiones Automáticas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Solo fudiGPT y fudiBOARD */}
      {coreFeatures.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <section key={feature.id} className="feature-section-refined">
            <div className="feature-section-header-refined">
              <div className="feature-icon-large-refined" style={{ '--feature-color': feature.color } as React.CSSProperties}>
                <Icon size={48} />
              </div>
              <div className="feature-info-refined">
                <h2 className="feature-section-title-refined">{feature.name}</h2>
                <p className="feature-section-subtitle-refined">{feature.subtitle}</p>
                <p className="feature-section-description-refined">{feature.description}</p>
              </div>
            </div>
            
            <div className="benefits-grid-refined">
              {feature.benefits.map((benefit, benefitIndex) => (
                <FudiCard 
                  key={benefitIndex}
                  variant="chat" 
                  padding="medium"
                  className="benefit-card-refined"
                >
                  <div className="benefit-content-refined">
                    <div className="benefit-check-refined">
                      <TrendingUp size={16} />
                    </div>
                    <span>{benefit}</span>
                  </div>
                </FudiCard>
              ))}
            </div>
            
            <div className="feature-cta-section-refined">
              <FudiButton 
                variant="orange"
                size="large"
                href="/register"
                icon={<Play size={20} />}
              >
                PROBAR {feature.name}
              </FudiButton>
            </div>
          </section>
        );
      })}

      {/* FRASE HERO - Destacada */}
      <section className="philosophy-hero-refined">
        <div className="philosophy-content-refined">
          <h2 className="philosophy-title-refined">
            "No es tecnología por tecnología.<br/>
            Es <span className="philosophy-highlight-refined">inteligencia aplicada</span><br/>
            al negocio que amas."
          </h2>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-section-refined">
        <div className="cta-content-refined">
          
          <h2 className="cta-title-refined">
            ¿LISTO PARA <span className="cta-highlight-refined">EVOLUCIONAR</span> TU RESTAURANTE?
          </h2>
          <p className="cta-subtitle-refined">
            🎁 <strong>Primer mes GRATIS</strong> con acceso a todas las features
          </p>
          
          <div className="cta-actions-refined">
            <FudiButton 
              variant="orange" 
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
          
          <div className="trust-quote-refined">
            <p className="trust-note-refined">
              🎁 <strong>Primer mes GRATIS</strong> con acceso completo a fudiGPT y fudiBOARD
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}