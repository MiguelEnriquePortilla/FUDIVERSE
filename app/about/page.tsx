'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, TrendingUp, Vault, Users, ShoppingCart, 
  Truck, Sparkles, Zap, Target, ChevronRight,
  BarChart3, MessageSquare, Rocket, Award,
  Shield, Lightbulb, Clock, Globe, Star,
  Coffee, Code, Heart, Flame
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { InfinitoCard } from '@/components/fudiverse/InfinitoCard';

// Import the CSS
import '@/styles/pages/fudi.about.css';

export default function AboutPage() {
  const [activeStory, setActiveStory] = useState(0);

  const founderStories = [
    {
      icon: Coffee,
      title: "LAS TRINCHERAS",
      subtitle: "30 años entre comandas y decisiones a las 3AM",
      description: "No nació en un garage de Silicon Valley. Nació entre horas pico y inventarios misteriosos.",
      color: "#8b5cf6"
    },
    {
      icon: BarChart3,
      title: "LOS DATOS PERDIDOS",
      subtitle: "Reportes que nadie entiende, Excel que no cuadra",
      description: "Después de décadas viendo restaurantes brillantes fracasar por falta de inteligencia de datos.",
      color: "#3b82f6"
    },
    {
      icon: Lightbulb,
      title: "LA REVELACIÓN",
      subtitle: '"Era hora de crear algo REAL"',
      description: "Consultorías de $10K que no resuelven nada. Dashboards que necesitan PhD. Enough.",
      color: "#fbbf24"
    }
  ];

  const teamStats = [
    {
      icon: Clock,
      value: "100+",
      label: "Años Combinados",
      description: "En las trincheras restauranteras"
    },
    {
      icon: Brain,
      value: "30",
      label: "Años del Fundador",
      description: "Solo en operaciones y BI"
    },
    {
      icon: Globe,
      value: "500+",
      label: "Restaurantes",
      description: "Ya confían en FUDI"
    },
    {
      icon: Target,
      value: "∞",
      label: "Potencial",
      description: "De cada restaurante"
    }
  ];

  const beliefs = [
    {
      icon: Users,
      title: "Todo restaurantero merece acceso a inteligencia de negocios",
      color: "#10b981"
    },
    {
      icon: MessageSquare,
      title: "Todo dato tiene una historia que contar",
      color: "#3b82f6"
    },
    {
      icon: Brain,
      title: "Toda decisión puede ser más inteligente",
      color: "#8b5cf6"
    },
    {
      icon: Heart,
      title: "Todo sueño culinario merece herramientas para crecer",
      color: "#ef4444"
    }
  ];

  // Auto-rotate founder stories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % founderStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [founderStories.length]);

  return (
    <div className="about-container">
      {/* FUDI Background - Neural Network representing "Experience" */}
      <FudiChatGrid 
        opacity={0.15}
        gridSize={60}
        color="#4a4a4a"
        animated={true}
        showGradient={true}
        pulseSpeed={2}
      />
      
      <FudiBackground 
        variant="neural"
        intensity={0.6}
        speed={0.4}
        color="mixed"
        opacity={0.25}
        fixed={true}
      />

      {/* Header */}
      <header className="about-header">
        <nav className="about-nav">
          <Link href="/" className="about-logo">
            <span>FUDIVERSE</span>
          </Link>
          <div className="nav-links">
            <Link href="/features" className="nav-link">Características</Link>
            <Link href="/pricing" className="nav-link">Precios</Link>
            <Link href="/about" className="nav-link active">Nosotros</Link>
            <Link href="/login" className="nav-link">Entrar</Link>
            <FudiButton variant="primary" size="small" href="/register">
              ÚNETE
            </FudiButton>
          </div>
        </nav>
      </header>

      {/* Hero Section - Revolution Manifesto */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Flame size={16} />
            <span>LA REVOLUCIÓN</span>
          </div>
          
          <h1 className="hero-title">
            NO SOMOS OTRO <span className="hero-highlight">SOFTWARE</span>.
            <br />
            SOMOS LA <span className="hero-highlight-2">REVOLUCIÓN</span>.
          </h1>
          
          <p className="hero-subtitle">
            La historia de cómo <strong>30 años de experiencia</strong> se convirtieron en tu ventaja competitiva
          </p>

          <div className="hero-quote">
            <Sparkles size={20} />
            <span>"We want to put a dent in the FUDIVERSE"</span>
          </div>
        </div>

        {/* FUDI Entity - Storytelling Mode */}
        <div className="hero-entity">
          <FudiAura 
            variant="combined"
            color="#8b5cf6"
            intensity={0.7}
            size={300}
            pulseSpeed={2}
            particleCount={20}
          />
          <FudiEntity 
            variant="floating"
            mood="thoughtful"
            size="large"
            followCursor={true}
            showParticles={true}
            showDataStreams={true}
            intensity={0.6}
          />
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="origin-section">
        <div className="section-header">
          <h2 className="section-title">
            <Brain size={32} />
            EL ORIGEN
          </h2>
          <p className="section-subtitle">"30 AÑOS EN LAS TRINCHERAS"</p>
        </div>

        <div className="story-grid">
          {founderStories.map((story, index) => {
            const Icon = story.icon;
            const isActive = activeStory === index;
            
            return (
              <div
                key={index}
                className={`story-card ${isActive ? 'active' : ''}`}
                style={{ '--story-color': story.color } as React.CSSProperties}
                onClick={() => setActiveStory(index)}
              >
                <div className="story-icon">
                  <Icon size={28} />
                </div>
                
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-subtitle">{story.subtitle}</p>
                  <p className="story-description">{story.description}</p>
                </div>
                
                <div className="story-indicator">
                  <div className="indicator-dot"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pain Points */}
        <div className="pain-points">
          <h3 className="pain-title">Nuestro fundador vivió cada dolor del restaurantero:</h3>
          <div className="pain-grid">
            <div className="pain-item">
              <Target size={20} />
              <span>Las ventas que no cuadran</span>
            </div>
            <div className="pain-item">
              <BarChart3 size={20} />
              <span>Los inventarios misteriosos</span>
            </div>
            <div className="pain-item">
              <Shield size={20} />
              <span>Los reportes que nadie entiende</span>
            </div>
            <div className="pain-item">
              <Zap size={20} />
              <span>La tecnología que promete y NO cumple</span>
            </div>
          </div>
          
          <div className="founder-quote">
            <blockquote>
              "Después de 30 años entre cocinas y datos, entre Excel y expeditors, entre BI y bistecs... era hora de crear algo REAL"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-header">
          <h2 className="section-title">
            <Rocket size={32} />
            LA MISIÓN
          </h2>
          <p className="section-subtitle">"DEMOCRATIZAR EL PODER DE LOS DATOS"</p>
        </div>

        <div className="mission-content">
          <div className="mission-statement">
            <div className="statement-card">
              <Globe size={40} />
              <h3>We want to put a dent in the FUDIVERSE 🌍</h3>
              <p>No más consultorías de $10,000 que te dejan igual</p>
            </div>
            
            <div className="statement-card">
              <Brain size={40} />
              <h3>No más dashboards que necesitan PhD</h3>
              <p>FUDI SPEAKS RESTO - Habla tu idioma</p>
            </div>
            
            <div className="statement-card">
              <MessageSquare size={40} />
              <h3>Consultoría de clase mundial</h3>
              <p>En un chat. A tu alcance. 24/7.</p>
            </div>
          </div>

          {/* FUDI Speaking Examples */}
          <div className="fudi-speaks">
            <h3 className="speaks-title">
              <Sparkles size={24} />
              FUDI SPEAKS RESTO
            </h3>
            <div className="speaks-examples">
              <div className="speak-bubble">
                <MessageSquare size={16} />
                <span>"Oye, tu merma de papa está 3% arriba del mes pasado"</span>
              </div>
              <div className="speak-bubble">
                <TrendingUp size={16} />
                <span>"Tus meseros top venden 40% más postres, ¿los premiamos?"</span>
              </div>
              <div className="speak-bubble">
                <Target size={16} />
                <span>"Este proveedor te está cobrando 15% más que el promedio"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="purpose-section">
        <div className="section-header">
          <h2 className="section-title">
            <Heart size={32} />
            POR QUÉ EXISTIMOS
          </h2>
          <p className="section-subtitle">"PORQUE CADA RESTAURANTE MERECE BRILLAR"</p>
        </div>

        <div className="beliefs-grid">
          {beliefs.map((belief, index) => {
            const Icon = belief.icon;
            return (
              <div
                key={index}
                className="belief-card"
                style={{ '--belief-color': belief.color } as React.CSSProperties}
              >
                <div className="belief-icon">
                  <Icon size={24} />
                </div>
                <p className="belief-text">{belief.title}</p>
              </div>
            );
          })}
        </div>

        <div className="purpose-quote">
          <blockquote>
            "No vinimos a hacer software. Vinimos a cambiar <span className="highlight">VIDAS</span>"
          </blockquote>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">
            <Users size={32} />
            NUESTRO EQUIPO
          </h2>
          <p className="section-subtitle">"VETERANOS CON VISIÓN"</p>
        </div>

        <div className="team-stats">
          {teamStats.slice(0, 3).map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <Icon size={32} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INFINITO Card - EPIC & WIDE */}
        <InfinitoCard 
          variant="default"
          title="POTENCIAL INFINITO"
          description="para cada restaurante, y aún más importante, para su gente!"
          icon={<Target size={60} />}
          size="large"
          glow={true}
          animated={true}
        />

        <div className="team-description">
          <div className="team-points">
            <div className="team-point">
              <Star size={20} />
              <span>100+ años de experiencia COMBINADA en restaurantes</span>
            </div>
            <div className="team-point">
              <Brain size={20} />
              <span>Líderes en inteligencia de negocios y análisis</span>
            </div>
            <div className="team-point">
              <Rocket size={20} />
              <span>Visionarios que entienden tecnología Y servicio</span>
            </div>
            <div className="team-point">
              <Heart size={20} />
              <span>Obsesionados con tu éxito (no es marketing, es verdad)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Revolution CTA Section */}
      <section className="revolution-cta">
        <div className="cta-background">
          <div className="cta-orb orb-1"></div>
          <div className="cta-orb orb-2"></div>
          <div className="cta-orb orb-3"></div>
        </div>
        
        <div className="cta-content">
          <div className="cta-badge">
            <Flame size={16} />
            <span>LA REVOLUCIÓN</span>
          </div>
          
          <h2 className="cta-title">
            ¿LISTO PARA SER PARTE DE LA <span className="highlight">HISTORIA</span>?
          </h2>
          
          <p className="cta-description">
            El futuro de los restaurantes se escribe HOY. Y tú eres el protagonista.
          </p>
          
          <div className="cta-actions">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
              icon={<Rocket size={20} />}
            >
              ÚNETE A LA REVOLUCIÓN
            </FudiButton>
            
            <FudiButton 
              variant="secondary" 
              size="large" 
              href="/features"
              icon={<Brain size={20} />}
            >
              VER EL ARSENAL
            </FudiButton>
          </div>
          
          {/* Trust Quote */}
          <div className="trust-quote">
            <blockquote>
              "Únete a los <strong>+500 restaurantes</strong> que ya viven en el futuro"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="footer-content">
          <p>&copy; 2024 FUDIVERSE. La revolución continúa.</p>
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