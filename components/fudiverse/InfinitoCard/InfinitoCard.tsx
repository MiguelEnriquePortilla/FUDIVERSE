// components/fudiverse/InfinitoCard/InfinitoCard.tsx
'use client';

import React from 'react';
import { Target, Sparkles, Brain, Zap, Globe, Rocket } from 'lucide-react';
import styles from './InfinitoCard.module.css';

export type InfinitoCardVariant = 'default' | 'cosmic' | 'neural' | 'quantum';
export type InfinitoCardSize = 'medium' | 'large' | 'xl';

interface InfinitoCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: InfinitoCardVariant;
  size?: InfinitoCardSize;
  glow?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

export const InfinitoCard: React.FC<InfinitoCardProps> = ({
  title = "POTENCIAL INFINITO",
  subtitle,
  description = "para cada restaurante, y aún más importante, para su gente!",
  icon,
  variant = 'default',
  size = 'large',
  glow = true,
  animated = true,
  className = '',
  onClick
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'cosmic': return <Rocket size={60} />;
      case 'neural': return <Brain size={60} />;
      case 'quantum': return <Zap size={60} />;
      default: return <Target size={60} />;
    }
  };

  const classes = `
    ${styles.infinitoCard} 
    ${styles[variant]} 
    ${styles[size]} 
    ${animated ? styles.animated : ''}
    ${glow ? styles.glow : ''}
    ${className}
  `.trim();

  return (
    <div className={classes} onClick={onClick}>
      {/* Cosmic Background */}
      <div className={styles.infinitoBackground}>
        <div className={`${styles.infinitoOrb} ${styles.orb1}`}></div>
        <div className={`${styles.infinitoOrb} ${styles.orb2}`}></div>
        <div className={`${styles.infinitoOrb} ${styles.orb3}`}></div>
        <div className={styles.infinitoStars}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`${styles.star} ${styles[`star${i}`]}`}></div>
          ))}
        </div>
      </div>

      {/* Neural Network Lines */}
      <div className={styles.neuralNetwork}>
        <svg className={styles.neuralSvg} viewBox="0 0 400 200">
          <defs>
            <linearGradient id={`neural-gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={styles.gradientStop1} />
              <stop offset="50%" className={styles.gradientStop2} />
              <stop offset="100%" className={styles.gradientStop3} />
            </linearGradient>
          </defs>
          
          {/* Neural connection lines */}
          <path 
            d="M50,100 Q200,50 350,100 Q200,150 50,100" 
            stroke={`url(#neural-gradient-${variant})`}
            strokeWidth="2"
            fill="none"
            className={styles.neuralPath}
          />
          <path 
            d="M100,50 Q200,100 300,50 Q200,100 100,150" 
            stroke={`url(#neural-gradient-${variant})`}
            strokeWidth="1.5"
            fill="none"
            className={`${styles.neuralPath} ${styles.neuralPath2}`}
          />
          
          {/* Neural nodes */}
          <circle cx="50" cy="100" r="4" className={styles.neuralNode1} />
          <circle cx="200" cy="100" r="6" className={styles.neuralNode2} />
          <circle cx="350" cy="100" r="4" className={styles.neuralNode3} />
        </svg>
      </div>
      
      <div className={styles.infinitoContent}>
        {/* Icon Section */}
        <div className={styles.infinitoIconSection}>
          <div className={styles.infinitoIcon}>
            {icon || getDefaultIcon()}
            <div className={styles.iconRings}>
              <div className={`${styles.ring} ${styles.ring1}`}></div>
              <div className={`${styles.ring} ${styles.ring2}`}></div>
              <div className={`${styles.ring} ${styles.ring3}`}></div>
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className={styles.floatingParticles}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`${styles.particle} ${styles[`particle${i}`]}`}>
                <Sparkles size={12} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Text Section */}
        <div className={styles.infinitoText}>
          <div className={styles.infinitoSymbol}>∞</div>
          
          {subtitle && (
            <div className={styles.infinitoSubtitle}>{subtitle}</div>
          )}
          
          <h3 className={styles.infinitoTitle}>{title}</h3>
          
          <p className={styles.infinitoDescription}>
            {description.includes('para su gente!') ? (
              <>
                {description.split('para su gente!')[0]}
                <span className={styles.highlight}>para su gente!</span>
              </>
            ) : (
              description
            )}
          </p>
          
          {/* Energy Meter */}
          <div className={styles.energyMeter}>
            <div className={styles.energyFill}></div>
            <div className={styles.energyPulse}></div>
          </div>
        </div>
      </div>

      {/* Holographic Overlay */}
      <div className={styles.holographicOverlay}></div>
      
      {/* Edge Glow */}
      <div className={styles.edgeGlow}></div>
    </div>
  );
};