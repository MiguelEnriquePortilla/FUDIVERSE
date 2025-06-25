'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FudiBackground.module.css';

export type FudiBackgroundVariant = 'minimal' | 'gradient' | 'claude' | 'animated' | 'particles';
export type FudiBackgroundTheme = 'claude' | 'business' | 'dark' | 'social' | 'flow';
export type FudiBackgroundIntensity = 'subtle' | 'medium' | 'intense';

interface FudiBackgroundProps {
  variant?: FudiBackgroundVariant;
  theme?: FudiBackgroundTheme;
  opacity?: number;
  fixed?: boolean;
  particles?: boolean;
  intensity?: FudiBackgroundIntensity;
  className?: string;
  children?: React.ReactNode;
}

export const FudiBackground: React.FC<FudiBackgroundProps> = ({
  variant = 'claude',
  theme = 'claude',
  opacity = 1,
  fixed = true,
  particles = false,
  intensity = 'medium',
  className = '',
  children
}) => {
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize particles animation for fudi-flow
  useEffect(() => {
    if (!particles || !particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Particle system configuration
    const particleCount = {
      subtle: 15,
      medium: 25,
      intense: 40
    }[intensity];

    const colors = {
      social: ['#ff6b35', '#00bcd4', '#8b5cf6'],
      flow: ['#ff6b35', '#00bcd4', '#fbbf24'],
      claude: ['#06b6d4', '#8b5cf6', '#3b82f6'],
      business: ['#ff6b35', '#06b6d4', '#10b981'],
      dark: ['#6366f1', '#8b5cf6', '#06b6d4']
    }[theme] || ['#06b6d4', '#8b5cf6', '#3b82f6'];

    // Initialize localParticles
    const localParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      localParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      localParticles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulsing effect
        const pulseSize = particle.size * (1 + Math.sin(particle.pulse) * 0.3);
        const pulseAlpha = particle.alpha * (0.7 + Math.sin(particle.pulse) * 0.3);

        // Draw particle with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.globalAlpha = pulseAlpha;
        
        // Main particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.shadowBlur = 5;
        ctx.fillStyle = `${particle.color}88`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Connection lines (for social theme)
        if (theme === 'social' || theme === 'flow') {
          localParticles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 100) * 50).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = 1;
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
              }
            }
          });
        }
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      time += 0.016;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, intensity, theme]);

  const classes = `
    ${styles.fudiBackground} 
    ${styles[variant]} 
    ${styles[theme]} 
    ${styles[intensity]}
    ${fixed ? styles.fixed : ''} 
    ${particles ? styles.withParticles : ''}
    ${className}
  `.trim();

  return (
    <div className={classes} style={{ opacity }}>
      {/* Particles Canvas */}
      {particles && (
        <canvas
          ref={particlesRef}
          className={styles.particlesCanvas}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      {/* Animated background layers for flow theme */}
      {(theme === 'social' || theme === 'flow') && (
        <div className={styles.flowAnimationLayer}>
          <div className={styles.flowOrb} style={{ '--delay': '0s' } as React.CSSProperties}></div>
          <div className={styles.flowOrb} style={{ '--delay': '2s' } as React.CSSProperties}></div>
          <div className={styles.flowOrb} style={{ '--delay': '4s' } as React.CSSProperties}></div>
        </div>
      )}

      {/* Content */}
      <div className={styles.content} style={{ zIndex: 10, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};