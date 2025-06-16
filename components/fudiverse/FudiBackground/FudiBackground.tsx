'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FudiBackground.module.css';

export type FudiBackgroundVariant = 'minimal' | 'gradient' | 'particles' | 'premium';
export type FudiBackgroundTheme = 'business' | 'gold' | 'mixed' | 'claude';

interface FudiBackgroundProps {
  variant?: FudiBackgroundVariant;
  theme?: FudiBackgroundTheme;
  intensity?: number;
  opacity?: number;
  fixed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const FudiBackground: React.FC<FudiBackgroundProps> = ({
  variant = 'premium',
  theme = 'Claude',  // ← CLAUDE POR DEFECTO
  intensity = 0.5,
  opacity = 1,
  fixed = true,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Theme colors - CORREGIDOS PARA CLAUDE
  const getThemeColors = () => {
    switch (theme) {
      case 'claude':
        return {
          primary: '#3b82f6',     // Claude Blue
          secondary: '#6366f1',   // Claude Purple
          accent: '#f59e0b',      // Claude Accent
        };
      case 'business':
        return {
          primary: '#1e40af',     // Business Blue
          secondary: '#3b82f6',   // Royal Blue
          accent: '#d4af37',      // Premium Gold
        };
      case 'gold':
        return {
          primary: '#fbbf24',     // Matrix Gold
          secondary: '#f59e0b',   // Amber
          accent: '#d97706',      // Orange
        };
      case 'mixed':
      default:
        return {
          primary: '#1e40af',     // Business Blue
          secondary: '#fbbf24',   // Gold
          accent: '#10b981',      // Green
        };
    }
  };

  const colors = getThemeColors();

  // Initialize particles - SOLO SI SE NECESITAN
  useEffect(() => {
    if (variant === 'particles' || variant === 'premium') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);

      // Create particles
      const particleCount = Math.floor(5000 * intensity); // ← MENOS PARTÍCULAS
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // ← MÁS LENTAS
          vy: (Math.random() - 0.5) * 0.3, // ← MÁS LENTAS
          size: Math.random() * 1.5 + 0.5, // ← MÁS PEQUEÑAS
          alpha: Math.random() * 0.3 + 0.1, // ← MÁS SUTILES
          color: Math.random() > 0.7 ? colors.primary : colors.secondary
        });
      }

      particlesRef.current = particles;

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
      };
    }
  }, [variant, intensity, colors]);

  // Canvas animation - OPTIMIZADA
  useEffect(() => {
    if (variant !== 'particles' && variant !== 'premium') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      time += 0.003; // ← MÁS LENTO

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Breathing effect - MÁS SUTIL
        const breath = Math.sin(time * 1.5 + index * 0.1) * 0.2 + 0.8;
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha * breath * opacity * 0.8; // ← MÁS SUTIL
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * breath, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections - MÁS SUTILES
        particlesRef.current.forEach(other => {
          if (particle === other) return;
          
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // ← DISTANCIA MENOR
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.05 * opacity; // ← MÁS SUTIL
            ctx.lineWidth = 0.3; // ← MÁS DELGADA
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, opacity]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.fudiBackground} ${styles[variant]} ${styles[theme]} ${fixed ? styles.fixed : ''} ${className}`}
      style={{ opacity }}
    >
      {/* ❌ GRADIENT LAYER ELIMINADO - ERA EL CULPABLE DEL LOOK VIDRIOSO */}
      
      {/* Particles Canvas - SOLO SI SE NECESITA */}
      {(variant === 'particles' || variant === 'premium') && (
        <canvas 
          ref={canvasRef}
          className={styles.particlesCanvas}
        />
      )}

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};