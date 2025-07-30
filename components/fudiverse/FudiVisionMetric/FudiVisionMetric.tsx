// components/fudiverse/FudiVisionMetric/FudiVisionMetric.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FudiCard } from '../FudiCard/FudiCard';
import styles from './FudiVisionMetric.module.css';

export type VisionStoryType = 
  | 'hero-sales'
  | 'achievement'
  | 'comparison'
  | 'prediction'
  | 'trending'
  | 'milestone';

export type CelebrationEffect = 
  | 'none'
  | 'record-breaking'
  | 'achievement-unlock'
  | 'trending-fire'
  | 'milestone-reached'
  | 'prediction-positive';

interface VisionMetricProps {
  // Data Core
  value: number;
  previousValue?: number;
  targetValue?: number;
  formatValue?: (value: number) => string;
  
  // Storytelling
  storyType: VisionStoryType;
  title: string;
  narrative: string;
  achievement?: string;
  
  // Visual Assets
  backgroundImage?: string;
  iconImage?: string;
  overlayImages?: string[];
  
  // Effects
  celebrationEffect?: CelebrationEffect;
  animateOnMount?: boolean;
  glowIntensity?: 'subtle' | 'medium' | 'intense';
  
  // Interaction
  onClick?: () => void;
  onMetricComplete?: () => void;
  
  className?: string;
}

export const FudiVisionMetric: React.FC<VisionMetricProps> = ({
  value,
  previousValue = 0,
  targetValue,
  formatValue = (val) => `$${val.toLocaleString()}`,
  storyType,
  title,
  narrative,
  achievement,
  backgroundImage,
  iconImage,
  overlayImages = [],
  celebrationEffect = 'none',
  animateOnMount = true,
  glowIntensity = 'medium',
  onClick,
  onMetricComplete,
  className = ''
}) => {
  const [animatedValue, setAnimatedValue] = useState(animateOnMount ? 0 : value);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Intersection Observer para animaciones on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          if (animateOnMount) {
            animateValueCounter();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animación del contador de valor
  const animateValueCounter = () => {
    const duration = 2000; // 2 segundos
    const startTime = Date.now();
    const startValue = animatedValue;
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function para suavidad
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onMetricComplete?.();
        if (celebrationEffect !== 'none') {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Canvas para efectos visuales avanzados
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2; // Retina
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
    }> = [];

    const createParticle = (x: number, y: number) => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: getParticleColor(),
      alpha: 1,
      life: 1
    });

    const getParticleColor = () => {
      const colors = {
        'record-breaking': ['#FFD700', '#FF6B35', '#FF8C42'],
        'achievement-unlock': ['#8B5CF6', '#A855F7', '#C084FC'],
        'trending-fire': ['#FF6B35', '#FF8C42', '#FFB84D'],
        'milestone-reached': ['#10B981', '#34D399', '#6EE7B7'],
        'prediction-positive': ['#3B82F6', '#60A5FA', '#93C5FD']
      };
      
      const colorSet = colors[celebrationEffect as keyof typeof colors] || ['#60A5FA'];
      return colorSet[Math.floor(Math.random() * colorSet.length)];
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      // Crear partículas si hay celebración
      if (showCelebration && particles.length < 50) {
        for (let i = 0; i < 3; i++) {
          particles.push(createParticle(
            Math.random() * canvas.width / 2,
            Math.random() * canvas.height / 2
          ));
        }
      }

      // Actualizar y dibujar partículas
      particles = particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;
        particle.alpha = particle.life;
        particle.vy += 0.1; // Gravedad

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        return false;
      });

      animationId = requestAnimationFrame(animate);
    };

    if (showCelebration) {
      animate();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showCelebration, isVisible, celebrationEffect]);

  // Calcular estado de progreso
  const getProgressState = () => {
    if (!targetValue) return null;
    const progress = (animatedValue / targetValue) * 100;
    return {
      percentage: Math.min(progress, 100),
      isComplete: progress >= 100,
      isNearComplete: progress >= 90
    };
  };

  const progressState = getProgressState();

  // Calcular cambio vs valor anterior
  const getChangeState = () => {
    if (!previousValue) return null;
    const change = ((animatedValue - previousValue) / previousValue) * 100;
    return {
      percentage: change,
      isPositive: change >= 0,
      isSignificant: Math.abs(change) >= 10
    };
  };

  const changeState = getChangeState();

  const classes = `
    ${styles.visionMetric}
    ${styles[storyType]}
    ${styles[`glow-${glowIntensity}`]}
    ${showCelebration ? styles.celebrating : ''}
    ${isVisible ? styles.visible : ''}
    ${className}
  `.trim();

  return (
    <div ref={containerRef} className={classes} onClick={onClick}>
      <FudiCard
        variant="flow"
        padding="large"
        glassEffect={true}
        borderGlow={celebrationEffect !== 'none'}
        glowColor={celebrationEffect === 'record-breaking' ? '#FFD700' : '#60A5FA'}
        className={styles.cardWrapper}
      >
        {/* Background Image Layer */}
        {backgroundImage && (
          <div 
            className={styles.backgroundLayer}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {/* Particles Canvas */}
        <canvas
          ref={canvasRef}
          className={styles.particlesCanvas}
        />

        {/* Content Layers */}
        <div className={styles.contentLayers}>
          
          {/* Story Header */}
          <div className={styles.storyHeader}>
            {iconImage && (
              <div className={styles.storyIcon}>
                <img src={iconImage} alt="" />
              </div>
            )}
            <h3 className={styles.storyTitle}>{title}</h3>
            {achievement && (
              <div className={styles.achievementBadge}>
                🏆 {achievement}
              </div>
            )}
          </div>

          {/* Main Metric Display */}
          <div className={styles.metricDisplay}>
            <div className={styles.primaryValue}>
              {formatValue(animatedValue)}
            </div>
            
            {/* Change Indicator */}
            {changeState && (
              <div className={`${styles.changeIndicator} ${changeState.isPositive ? styles.positive : styles.negative}`}>
                <span className={styles.changeIcon}>
                  {changeState.isPositive ? '↗️' : '↘️'}
                </span>
                <span className={styles.changeText}>
                  {Math.abs(changeState.percentage).toFixed(1)}% vs ayer
                </span>
              </div>
            )}

            {/* Progress Bar */}
            {progressState && (
              <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${progressState.percentage}%` }}
                  />
                </div>
                <div className={styles.progressText}>
                  {progressState.percentage.toFixed(0)}% del objetivo
                </div>
              </div>
            )}
          </div>

          {/* Narrative Text */}
          <div className={styles.narrative}>
            <p>{narrative}</p>
          </div>

          {/* Overlay Images */}
          {overlayImages.length > 0 && (
            <div className={styles.overlayImages}>
              {overlayImages.map((img, index) => (
                <div 
                  key={index}
                  className={styles.overlayImage}
                  style={{ 
                    animationDelay: `${index * 0.3}s`,
                    backgroundImage: `url(${img})`
                  }}
                />
              ))}
            </div>
          )}

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className={styles.celebrationOverlay}>
              <div className={styles.celebrationText}>
                {getCelebrationMessage()}
              </div>
            </div>
          )}

        </div>
      </FudiCard>
    </div>
  );

  function getCelebrationMessage(): string {
    switch (celebrationEffect) {
      case 'record-breaking':
        return '🎉 ¡NUEVO RÉCORD!';
      case 'achievement-unlock':
        return '🏆 ¡LOGRO DESBLOQUEADO!';
      case 'trending-fire':
        return '🔥 ¡TENDENCIA VIRAL!';
      case 'milestone-reached':
        return '🎯 ¡META ALCANZADA!';
      case 'prediction-positive':
        return '📈 ¡PREDICCIÓN POSITIVA!';
      default:
        return '✨ ¡EXCELENTE!';
    }
  }
};