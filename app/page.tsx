'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiHeroText } from '@/components/fudiverse/FudiHeroText';

// Import styles
import '@/styles/pages/FudiSplash.css';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      {/* FUDI Background - Solo el fondo */}
      <FudiBackground 
        variant="dots"
        intensity={0.3}
        speed={1}
        color="mixed"
        opacity={0.5}
        fixed={true}
      />
      
      {/* FUDI Entity - Separado del background */}
      <FudiEntity 
        variant="fullscreen"
        mood="neutral"
        followCursor={true}
        showDataStreams={true}
        showParticles={true}
        showCircuits={true}
        showScanBeam={true}
        showNeuralNet={true}
        intensity={0.7}
      />

      {/* Header */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <nav className="nav">
          <Link href="/" className="logo">
            <span className="logo-text">FUDIVERSE</span>
          </Link>

          <div className="nav-links">
            <Link href="/features" className="nav-link">Características</Link>
            <Link href="/pricing" className="nav-link">Precios</Link>
            <Link href="/about" className="nav-link">Nosotros</Link>
            <Link href="/login" className="nav-link">Entrar</Link>
            <Link href="/register" className="cta-button">
              <span>JOIN_THE_FUDIVERSE</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* FudiHeroText - Componente limpio estilo Linear */}
          <FudiHeroText 
            title="Inteligencia propia de TU restaurante que EVOLUCIONA"
            subtitle="La consciencia artificial que tu restaurante necesita"
          />
          
          {/* CTA Button */}
          <div className="hero-cta">
            <FudiButton 
              variant="primary" 
              size="large" 
              href="/register"
            >
              ["_JOIN_HERE_"]
            </FudiButton>
          </div>
        </div>
      </section>

      {/* Scanning Line Effect */}
      <div className="scan-line"></div>
    </div>
  );
}