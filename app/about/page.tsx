'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, TrendingUp, Users, Target, ChevronRight,
  BarChart3, MessageSquare, Rocket, Award,
  Shield, Lightbulb, Clock, Globe, Star,
  Coffee, Heart, Flame, Crown, Eye, Sparkles
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import el CSS refinado
import '@/styles/pages/fudi.about.css';

export default function AboutPage() {
  const [activeStory, setActiveStory] = useState(0);

  const founderStories = [
    {
      icon: Coffee,
      title: "Las trincheras",
      subtitle: "30 años entre comandas y decisiones a las 3AM",
      description: "No nació en un garage de Silicon Valley. Nació entre horas pico y inventarios misteriosos.",
      impact: "Experiencia real en operaciones"
    },
    {
      icon: BarChart3,
      title: "Los datos perdidos",
      subtitle: "Reportes que nadie entiende, Excel que no cuadra",
      description: "Después de décadas viendo restaurantes brillantes fracasar por falta de inteligencia de datos.",
      impact: "Entendiendo el dolor real"
    },
    {
      icon: Lightbulb,
      title: "La revelación",
      subtitle: '"Era hora de crear algo real"',
      description: "Consultorías de $10K que no resuelven nada. Dashboards que necesitan PhD. Enough.",
      impact: "Solución desde la experiencia"
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
    }
  ];

  const beliefs = [
    {
      icon: Users,
      title: "Todo restaurantero merece acceso a inteligencia de negocios"
    },
    {
      icon: MessageSquare,
      title: "Todo dato tiene una historia que contar"
    },
    {
      icon: Brain,
      title: "Toda decisión puede ser más inteligente"
    },
    {
      icon: Heart,
      title: "Todo sueño culinario merece herramientas para crecer"
    }
  ];

  const painPoints = [
    { icon: Target, text: "Las ventas que no cuadran" },
    { icon: BarChart3, text: "Los inventarios misteriosos" },
    { icon: Shield, text: "Los reportes que nadie entiende" },
    { icon: Clock, text: "La tecnología que promete y no cumple" }
  ];

  const fudiSpeak = [
    { icon: MessageSquare, text: "Oye, tu merma de papa está 3% arriba del mes pasado" },
    { icon: TrendingUp, text: "Tus meseros top venden 40% más postres, ¿los premiamos?" },
    { icon: Target, text: "Este proveedor te está cobrando 15% más que el promedio" }
  ];

  // Auto-rotate founder stories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % founderStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [founderStories.length]);

  return (
    <div className="about-container-refined">
      
      {/* FUDI Background Limpio - UN SOLO BACKGROUND */}
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* Header usando nuestro módulo */}
      <FudiHeader 
        currentPage="about"
        showAuthButtons={true}
      />

      {/* Hero Section - Refinado */}
      <section className="hero-refined">
        <div className="hero-content-refined">
          
          <div className="hero-badge-refined">
            <Brain size={16} />
            <span>Inteligencia para restaurantes</span>
          </div>
          
          <h1 className="hero-title-refined">
            No somos otro <span className="hero-highlight">software</span>.
            <br />
            Somos tu <span className="hero-highlight-2">socio inteligente</span>.
          </h1>
          
          <p className="hero-subtitle-refined">
            La primera IA diseñada específicamente para <strong>restauranteros que quieren entender sus datos</strong> y tomar mejores decisiones
          </p>

          <div className="hero-quote-refined">
            <Sparkles size={20} />
            <span>"¡No analices datos, escribe una historia de éxito!"</span>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="section-refined">
        <div className="section-header-refined">
          <h2 className="section-title-refined">
            <Brain size={32} />
            El origen
          </h2>
          <p className="section-subtitle-refined">"De datos a decisiones inteligentes"</p>
        </div>

        <div className="story-grid-refined">
          {founderStories.map((story, index) => {
            const Icon = story.icon;
            const isActive = activeStory === index;
            
            return (
              <FudiCard 
                key={index}
                variant={index === 0 ? "orange" : index === 1 ? "chat" : "cyan"}
                padding="medium"
                className={`story-card-refined ${isActive ? 'active' : ''}`}
              >
                <div
                  className="story-content-refined"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveStory(index)}
                >
                  <div className="story-icon-refined">
                    <Icon size={24} />
                  </div>
                  <h3 className="story-title-refined">{story.title}</h3>
                  <p className="story-subtitle-refined">{story.subtitle}</p>
                  <p className="story-description-refined">{story.description}</p>
                  <div className="story-impact-refined">
                    <span>{story.impact}</span>
                  </div>
                </div>
              </FudiCard>
            );
          })}
        </div>

        {/* Pain Points - Simplificado */}
        <div className="pain-section-refined">
          <h3 className="pain-title-refined">Nuestro fundador vivió cada dolor del restaurantero:</h3>
          <div className="pain-grid-refined">
            {painPoints.map((pain, index) => {
              const Icon = pain.icon;
              return (
                <div key={index} className="pain-item-refined">
                  <Icon size={20} />
                  <span>{pain.text}</span>
                </div>
              );
            })}
          </div>
          
          <div className="founder-quote-refined">
            <blockquote>
              "Después de 30 años entre cocinas y datos, entre Excel y expeditors, entre BI y bistecs... era hora de crear algo real"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-refined">
        <div className="section-header-refined">
          <h2 className="section-title-refined">
            <Rocket size={32} />
            La misión
          </h2>
          <p className="section-subtitle-refined">"Transformamos números en resultados"</p>
        </div>

        <div className="mission-grid-refined">
          <FudiCard variant="chat" padding="medium" className="mission-card-refined">
            <div className="mission-icon-refined">
              <Globe size={32} />
            </div>
            <h3 className="mission-title-refined">La primera IA que entiende tu restaurante</h3>
            <p className="mission-description-refined">Diseñada específicamente para restauranteros, no adaptada de otras industrias</p>
          </FudiCard>
          
          <FudiCard variant="chat" padding="medium" className="mission-card-refined">
            <div className="mission-icon-refined">
              <Brain size={32} />
            </div>
            <h3 className="mission-title-refined">Información clara, no dashboards complicados</h3>
            <p className="mission-description-refined">FUDI habla tu idioma - conversaciones naturales sobre tu negocio</p>
          </FudiCard>
          
          <FudiCard variant="chat" padding="medium" className="mission-card-refined">
            <div className="mission-icon-refined">
              <MessageSquare size={32} />
            </div>
            <h3 className="mission-title-refined">Tu socio de confianza para mejores decisiones</h3>
            <p className="mission-description-refined">Disponible 24/7 para ayudarte a entender qué está pasando en tu restaurante</p>
          </FudiCard>
        </div>

        {/* FUDI Speaking Examples */}
        <div className="speak-section-refined">
          <h3 className="speak-title-refined">
            <MessageSquare size={24} />
            Así habla Fudiverse AI
          </h3>
          <div className="speak-grid-refined">
            {fudiSpeak.map((speak, index) => {
              const Icon = speak.icon;
              return (
                <div key={index} className="speak-bubble-refined">
                  <Icon size={20} />
                  <span>"{speak.text}"</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We Exist Section - HERO SIZED */}
      <section className="section-refined purpose-hero">
        <div className="section-header-refined">
          <h2 className="section-title-refined">
            <Heart size={48} />
            Por qué existimos
          </h2>
          <p className="section-subtitle-refined">"Porque cada restaurante merece brillar"</p>
        </div>

        <div className="beliefs-grid-refined">
          {beliefs.map((belief, index) => {
            const Icon = belief.icon;
            return (
              <FudiCard key={index} variant="ghost" padding="medium" className="belief-card-refined">
                <div className="belief-icon-refined">
                  <Icon size={24} />
                </div>
                <p className="belief-text-refined">{belief.title}</p>
              </FudiCard>
            );
          })}
        </div>

        <div className="purpose-quote-refined">
          <blockquote>
            "No vinimos a hacer software. Vinimos a cambiar <span className="highlight">vidas</span>"
          </blockquote>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-refined">
        <div className="section-header-refined">
          <h2 className="section-title-refined">
            <Users size={32} />
            Nuestro equipo
          </h2>
          <p className="section-subtitle-refined">"Veteranos con visión"</p>
        </div>

        <div className="team-stats-refined">
          {teamStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FudiCard key={index} variant="chat" padding="medium" className="stat-card-refined">
                <div className="stat-icon-refined">
                  <Icon size={28} />
                </div>
                <div className="stat-value-refined">{stat.value}</div>
                <div className="stat-label-refined">{stat.label}</div>
                <div className="stat-description-refined">{stat.description}</div>
              </FudiCard>
            );
          })}
        </div>

        <div className="team-points-refined">
          <div className="team-point-refined">
            <Star size={20} />
            <span>100+ años de experiencia combinada en restaurantes</span>
          </div>
          <div className="team-point-refined">
            <Brain size={20} />
            <span>Líderes en inteligencia de negocios y análisis</span>
          </div>
          <div className="team-point-refined">
            <Rocket size={20} />
            <span>Visionarios que entienden tecnología y servicio</span>
          </div>
          <div className="team-point-refined">
            <Heart size={20} />
            <span>Obsesionados con tu éxito (no es marketing, es verdad)</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-refined">
        <div className="cta-badge-refined">
          <Flame size={16} />
          <span>La revolución</span>
        </div>
        
        <h2 className="cta-title-refined">
          ¿Listo para ser parte de la <span className="highlight">historia</span>?
        </h2>
        
        <p className="cta-description-refined">
          El futuro de los restaurantes se escribe hoy. Y tú eres el protagonista.
        </p>
        
        <div className="cta-actions-refined">
          <FudiButton 
            variant="orange" 
            size="large" 
            href="/register"
            icon={<Rocket size={20} />}
          >
            Únete a la revolución
          </FudiButton>
          
          <FudiButton 
            variant="cyan" 
            size="large" 
            href="/features"
            icon={<Brain size={20} />}
          >
            Ver el arsenal
          </FudiButton>
        </div>
        
        <div className="trust-quote-refined">
          <blockquote>
            "Únete a los <strong>+500 restaurantes</strong> que ya viven en el futuro"
          </blockquote>
        </div>
      </section>
    </div>
  );
}