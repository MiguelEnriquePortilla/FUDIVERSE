'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChefHat, TrendingUp, Users, Target, 
  Sparkles, Code, BarChart, Heart,
  Globe, Zap, Award, Rocket,
  MessageSquare
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import styles from './about.module.css';

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      icon: Globe,
      title: 'DEMOCRATIZAR',
      description: 'Todo restaurantero merece acceso a inteligencia de negocios'
    },
    {
      icon: Target,
      title: 'SIMPLIFICAR',
      description: 'Todo dato tiene una historia que contar'
    },
    {
      icon: Rocket,
      title: 'EVOLUCIONAR',
      description: 'Toda decisión puede ser más inteligente'
    },
    {
      icon: Heart,
      title: 'EMPODERAR',
      description: 'Todo sueño culinario merece herramientas para crecer'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <div className={styles.container}>
      <FudiBackground 
        variant="neural"
        intensity={0.3}
        speed={0.3}
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
            NO SOMOS OTRO SOFTWARE.
            <span className={styles.highlight}> SOMOS LA REVOLUCIÓN.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            La historia de cómo 30 años de experiencia se convirtieron en tu ventaja competitiva
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className={styles.origin}>
        <div className={styles.originContent}>
          <div className={styles.sectionHeader}>
            <ChefHat size={48} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>EL ORIGEN</h2>
            <h3 className={styles.sectionSubtitle}>30 AÑOS EN LAS TRINCHERAS</h3>
          </div>

          <div className={styles.storyGrid}>
            <div className={styles.storyCard}>
              <p className={styles.storyText}>
                No nació en un garage de Silicon Valley.<br/>
                Nació entre comandas, horas pico y decisiones a las 3AM.
              </p>
            </div>

            <div className={styles.storyCard}>
              <h4>Nuestro fundador vivió cada dolor del restaurantero:</h4>
              <ul className={styles.painPoints}>
                <li><Zap size={16} /> Las ventas que no cuadran</li>
                <li><Zap size={16} /> Los inventarios misteriosos</li>
                <li><Zap size={16} /> Los reportes que nadie entiende</li>
                <li><Zap size={16} /> La tecnología que promete y NO cumple</li>
              </ul>
            </div>

            <blockquote className={styles.quote}>
              <Sparkles size={24} />
              <p>
                "Después de 30 años entre cocinas y datos, entre Excel y expeditors, 
                entre BI y bistecs... era hora de crear algo REAL"
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <div className={styles.sectionHeader}>
            <Target size={48} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>LA MISIÓN</h2>
            <h3 className={styles.sectionSubtitle}>DEMOCRATIZAR EL PODER DE LOS DATOS</h3>
          </div>

          <div className={styles.missionStatement}>
            <h3 className={styles.bigStatement}>
              We want to put a dent in the FUDIVERSE 🌍
            </h3>
          </div>

          <div className={styles.noMoreGrid}>
            <div className={styles.noMoreItem}>
              <span className={styles.noMore}>NO MÁS</span>
              <p>consultorías de $10,000 que te dejan igual</p>
            </div>
            <div className={styles.noMoreItem}>
              <span className={styles.noMore}>NO MÁS</span>
              <p>dashboards que necesitan PhD para entenderse</p>
            </div>
            <div className={styles.noMoreItem}>
              <span className={styles.noMore}>NO MÁS</span>
              <p>"soluciones" que crean más problemas</p>
            </div>
          </div>

          <div className={styles.fudiSpeaks}>
            <h3>FUDI SPEAKS RESTO - Habla tu idioma:</h3>
            <div className={styles.examplesGrid}>
              <div className={styles.example}>
                <MessageSquare size={20} />
                <p>"Oye, tu merma de papa está 3% arriba del mes pasado"</p>
              </div>
              <div className={styles.example}>
                <MessageSquare size={20} />
                <p>"Tus meseros top venden 40% más postres, ¿los premiamos?"</p>
              </div>
              <div className={styles.example}>
                <MessageSquare size={20} />
                <p>"Este proveedor te está cobrando 15% más que el promedio"</p>
              </div>
            </div>
            <p className={styles.consultancy}>
              Consultoría de clase mundial. En un chat. A tu alcance.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className={styles.why}>
        <div className={styles.whyContent}>
          <div className={styles.sectionHeader}>
            <Heart size={48} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>POR QUÉ EXISTIMOS</h2>
            <h3 className={styles.sectionSubtitle}>PORQUE CADA RESTAURANTE MERECE BRILLAR</h3>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className={`${styles.valueCard} ${activeValue === index ? styles.active : ''}`}
                  onClick={() => setActiveValue(index)}
                >
                  <Icon size={32} />
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.manifesto}>
            <p>"No vinimos a hacer software. Vinimos a cambiar VIDAS"</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <div className={styles.teamContent}>
          <div className={styles.sectionHeader}>
            <Users size={48} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>NUESTRO EQUIPO</h2>
            <h3 className={styles.sectionSubtitle}>VETERANOS CON VISIÓN</h3>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>años de experiencia COMBINADA en restaurantes</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>30</span>
              <span className={styles.statLabel}>años solo del fundador en las trincheras</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>OBSESIONADOS con tu éxito</span>
            </div>
          </div>

          <div className={styles.teamValues}>
            <div className={styles.teamValue}>
              <Award size={24} />
              <p>Líderes en inteligencia de negocios y análisis</p>
            </div>
            <div className={styles.teamValue}>
              <Code size={24} />
              <p>Visionarios que entienden tecnología Y servicio</p>
            </div>
            <div className={styles.teamValue}>
              <Heart size={24} />
              <p>Obsesionados con tu éxito (no es marketing, es verdad)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <FudiAura intensity={0.8} />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>¿LISTO PARA SER PARTE DE LA HISTORIA?</h2>
          <p className={styles.ctaSubtitle}>
            El futuro de los restaurantes se escribe HOY. Y tú eres el protagonista.
          </p>
          <FudiButton 
            variant="primary" 
            size="large" 
            href="/register"
            icon={<Rocket size={20} />}
          >
            ÚNETE A LA REVOLUCIÓN
          </FudiButton>
        </div>
      </section>

      {/* FUDI Entity */}
      <div className={styles.fudiEntity}>
        <FudiEntity 
          variant="corner"
          mood="inspired"
          size="medium"
          followCursor={true}
          showDataStreams={true}
        />
      </div>
    </div>
  );
}