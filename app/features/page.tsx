'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Grid3x3, List, Filter, Command,
  Star, Clock, Eye, Edit3, Share2, Sparkles,
  Brain, TrendingUp, Vault, Users, ShoppingCart, Truck,
  Activity, Zap, DollarSign, Target, BarChart3, Rocket,
  Award, Shield, Lightbulb, MessageSquare, ArrowRight,
  Play
} from 'lucide-react';

// Import FUDI Components
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';

// Import Vault styles - EXACT SAME LAYOUT
import '@/styles/pages/FudiVault.css';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'brain' | 'analytics' | 'vault' | 'network' | 'pos' | 'delivery';
  impact: string;
  keyBenefit: string;
  tags: string[];
  status: 'available' | 'coming-soon';
  testimonial: string;
}

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // CLEAN & POWERFUL features - usando el copy ÉPICO
  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'FUDI AI',
      subtitle: 'Tu Cerebro que Nunca Duerme',
      type: 'brain',
      impact: 'Mientras duermes, FUDI analiza',
      keyBenefit: '"Chef, los viernes a las 8PM siempre piden 3 Margaritas... ¿preparamos?"',
      tags: ['Predicción', 'Automático', '24/7'],
      status: 'available',
      testimonial: '"Ahora FUDI me avisa qué cocinar antes de que yo lo sepa."'
    },
    {
      id: '2',
      title: 'DASHBOARDS ÉPICOS',
      subtitle: 'Que Te Hacen Decir "WOW"',
      type: 'analytics',
      impact: 'Tu negocio LATIENDO en tiempo real',
      keyBenefit: '"Tu pizza #7 genera 340% más profit que la #3... ¿por qué sigues promoviendo la #3?"',
      tags: ['Tiempo Real', 'Insights', 'WOW Factor'],
      status: 'available',
      testimonial: '"Olvídate de Excel estático. Esto es OTRA LIGA."'
    },
    {
      id: '3',
      title: 'VAULT PRO',
      subtitle: 'Tu Oficina que Nunca Cierra',
      type: 'vault',
      impact: 'Propuestas que cierran deals 💰',
      keyBenefit: 'Click. Edit. LISTO. Profesional.',
      tags: ['Templates Pro', 'Deals', 'Profesional'],
      status: 'available',
      testimonial: '"Reportes que enamoran inversionistas. Templates que me ahorran HORAS."'
    },
    {
      id: '4',
      title: 'DISCOVERY',
      subtitle: 'Donde los PROS se Conectan',
      type: 'network',
      impact: 'Red social SIN ruido, PURO PRO',
      keyBenefit: '"¿Proveedor de aguacate confiable?" ✓ "¿Cómo bajar merma 15%?" ✓',
      tags: ['Solo PROS', 'Secretos', 'Networking'],
      status: 'available',
      testimonial: '"Los secretos del gremio, AL FIN compartidos."'
    },
    {
      id: '5',
      title: 'POS INTELIGENTE',
      subtitle: 'Vende MÁS, Piensa MENOS',
      type: 'pos',
      impact: 'Te avisa ANTES del problema',
      keyBenefit: '"Juan viene cada martes. Ya tiene 47 visitas. ¿Le damos su 50ava gratis?"',
      tags: ['Inteligente', 'VIP Auto', 'Preventivo'],
      status: 'available',
      testimonial: '"Reconoce clientes VIP automático. Sugiere combos que FUNCIONAN."'
    },
    {
      id: '6',
      title: 'FUDELIVERY',
      subtitle: 'Adiós Comisiones del 30%',
      type: 'delivery',
      impact: 'Hola ganancias REALES',
      keyBenefit: 'Tu propia plataforma. Cero comisiones. 100% tuyo.',
      tags: ['Sin Comisiones', '100% Tuyo', 'Q2 2025'],
      status: 'coming-soon',
      testimonial: '"Finalmente, delivery que NO me roba las ganancias."'
    }
  ];

  const typeConfig = {
    brain: { color: '#fbbf24', icon: Brain, gradient: 'from-yellow-400 to-orange-500' },
    analytics: { color: '#3b82f6', icon: BarChart3, gradient: 'from-blue-400 to-blue-600' },
    vault: { color: '#8b5cf6', icon: Vault, gradient: 'from-purple-400 to-purple-600' },
    network: { color: '#10b981', icon: Users, gradient: 'from-green-400 to-emerald-600' },
    pos: { color: '#ef4444', icon: ShoppingCart, gradient: 'from-red-400 to-red-600' },
    delivery: { color: '#f59e0b', icon: Truck, gradient: 'from-amber-400 to-orange-600' }
  };

  return (
    <div className="vault-container">
      {/* FUDI Background - Lighter Grid */}
      <FudiChatGrid 
        opacity={0.15}
        gridSize={80}
        color="#4a4a4a"
        animated={true}
        showGradient={true}
        pulseSpeed={1.5}
      />
      
      {/* Header - BACK TO SIMPLE */}
      <header className="vault-header">
        {/* Texto solo, sin logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div>
            <div className="vault-logo-text">FUDIVERSE</div>
            <div className="vault-subtitle">Business Arsenal</div>
          </div>
        </div>

        {/* Search for Features */}
        <div className="vault-search">
          <div className="search-container">
            <Search size={18} style={{ color: '#666' }} />
            <input
              type="text"
              placeholder="Busca tu próxima ventaja competitiva..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-hotkey">
              <Command size={12} />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <FudiButton variant="primary" className="new-vault-btn" href="/register">
            <Rocket size={18} />
            <span>EMPEZAR AHORA</span>
          </FudiButton>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 85px)' }}>
        <div className="vault-content" style={{ margin: 0, width: '100%' }}>
          
          {/* Hero Section */}
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            marginBottom: '3rem' 
          }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '900', 
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(251, 191, 36, 0.3)'
            }}>
              DEJA DE <span style={{ color: '#ef4444' }}>SOBREVIVIR</span>.<br/>
              EMPIEZA A <span style={{ color: '#fbbf24' }}>DOMINAR</span>.
            </h1>
            <p style={{ 
              fontSize: '1.4rem', 
              color: 'rgba(255, 255, 255, 0.8)', 
              maxWidth: '700px', 
              margin: '0 auto',
              fontWeight: '600'
            }}>
              Tu restaurante está a <strong style={{ color: '#fbbf24' }}>1 click</strong> de la evolución
            </p>
            <div style={{
              background: 'rgba(251, 191, 36, 0.15)',
              border: '2px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginTop: '2rem',
              maxWidth: '600px',
              margin: '2rem auto 0 auto'
            }}>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#fbbf24',
                margin: '0'
              }}>
                🧠 FUDI NO ES TU EMPLEADO. ES TU CEREBRO EXTRA.
              </p>
            </div>
          </div>

          {/* Features Grid - 2 ROWS x 3 COLUMNS */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '2rem',
            padding: '2rem',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {features.map((feature) => {
              const TypeIcon = typeConfig[feature.type].icon;
              const typeColor = typeConfig[feature.type].color;

              return (
                <div
                  key={feature.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '24px',
                    border: `2px solid ${typeColor}20`,
                    padding: '2.5rem',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = `${typeColor}60`;
                    e.currentTarget.style.boxShadow = `0 20px 40px ${typeColor}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = `${typeColor}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Status Badge for Coming Soon */}
                  {feature.status === 'coming-soon' && (
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: `linear-gradient(135deg, ${typeColor}, #ef4444)`,
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                      Q2 2025
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${typeColor}20, ${typeColor}40)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: `2px solid ${typeColor}60`
                  }}>
                    <TypeIcon size={40} style={{ color: typeColor }} />
                  </div>

                  {/* Title & Subtitle */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: '800', 
                      color: 'rgba(255, 255, 255, 0.95)',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.5px'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '500'
                    }}>
                      {feature.subtitle}
                    </p>
                  </div>

                  {/* Key Benefit */}
                  <div style={{ 
                    background: `${typeColor}15`,
                    border: `1px solid ${typeColor}30`,
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600',
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: '0'
                    }}>
                      {feature.keyBenefit}
                    </p>
                  </div>

                  {/* Impact Metric */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '1.5rem',
                    gap: '0.5rem'
                  }}>
                    <TrendingUp size={20} style={{ color: typeColor }} />
                    <span style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '700',
                      color: typeColor
                    }}>
                      {feature.impact}
                    </span>
                  </div>

                  {/* Testimonial */}
                  <div style={{ 
                    marginTop: 'auto',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderLeft: `4px solid ${typeColor}`,
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '0.95rem',
                      fontStyle: 'italic',
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: '0',
                      lineHeight: '1.4'
                    }}>
                      {feature.testimonial}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div style={{ marginTop: 'auto' }}>
                    {feature.status === 'available' ? (
                      <button style={{
                        width: '100%',
                        background: `linear-gradient(135deg, ${typeColor}, ${typeColor}dd)`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '1rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = `0 8px 25px ${typeColor}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        <Play size={18} />
                        VER DEMO
                      </button>
                    ) : (
                      <button style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        border: `2px solid ${typeColor}40`,
                        borderRadius: '12px',
                        padding: '1rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        <MessageSquare size={18} />
                        NOTIFICARME
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div style={{ 
            marginTop: '4rem', 
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(251, 191, 36, 0.1)',
            borderRadius: '24px',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            margin: '4rem 2rem 2rem 2rem'
          }}>
            <h2 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '900', 
              marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              ¿LISTO PARA <span style={{ color: '#fbbf24' }}>EVOLUCIONAR</span>?
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem auto',
              fontWeight: '600'
            }}>
              Únete a <strong style={{ color: '#fbbf24' }}>+500 restaurantes</strong> que ya dominan con FUDI
            </p>
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              style={{
                padding: '1.5rem 4rem',
                fontSize: '1.2rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              <Rocket size={24} />
              ÚNETE AL FUDIVERSE
            </FudiButton>
            <div style={{
              marginTop: '1.5rem',
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              La evolución empieza HOY
            </div>
          </div>
        </div>
      </div>

      {/* FUDI Entity - Watching the sales process */}
      <div className="fudi-container">
        <FudiAura 
          variant="combined"
          color="#fbbf24"
          intensity={0.8}
          size={400}
          pulseSpeed={3}
          particleCount={25}
        />
        <FudiEntity 
          variant="mini"
          mood="excited"
          followCursor={true}
          showDataStreams={true}
          showParticles={true}
          intensity={0.7}
        />
      </div>
    </div>
  );
}