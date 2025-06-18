'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FudiBackground.module.css';

export type FudiBackgroundVariant = 'minimal' | 'subtle' | 'medium' | 'intense';
export type FudiBackgroundTheme = 'dark' | 'darker' | 'darkest' | 'gray' | 'light-gray' | 'charcoal';

interface FudiBackgroundProps {
  variant?: FudiBackgroundVariant;
  theme?: FudiBackgroundTheme;
  intensity?: number;
  opacity?: number;
  fixed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FudiBackground: React.FC<FudiBackgroundProps> = ({
  variant = 'medium',
  theme = 'dark',
  intensity = 0.6,
  opacity = 1,
  fixed = false,
  className = '',
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuración de intensidad basada en variante
  const getVariantIntensity = () => {
    const baseIntensity = intensity;
    switch (variant) {
      case 'minimal':
        return baseIntensity * 0.3;
      case 'subtle':
        return baseIntensity * 0.6;
      case 'medium':
        return baseIntensity * 1.0;
      case 'intense':
        return baseIntensity * 1.4;
      default:
        return baseIntensity;
    }
  };

  // Colores por tema
  const getThemeColors = () => {
    switch (theme) {
      case 'dark':
        return {
          base: '#0a0a0a',      // Gris muy oscuro
          dots: 'rgba(26, 26, 26, ALPHA)',
          bright: 'rgba(35, 35, 35, ALPHA)'
        };
      case 'darker':
        return {
          base: '#050505',      // Casi negro
          dots: 'rgba(20, 20, 20, ALPHA)',
          bright: 'rgba(30, 30, 30, ALPHA)'
        };
      case 'darkest':
        return {
          base: '#000000',      // Negro puro
          dots: 'rgba(15, 15, 15, ALPHA)',
          bright: 'rgba(25, 25, 25, ALPHA)'
        };
      case 'gray':
        return {
          base: '#1a1a1a',      // Gris más claro
          dots: 'rgba(45, 45, 45, ALPHA)',
          bright: 'rgba(60, 60, 60, ALPHA)'
        };
      case 'light-gray':
        return {
          base: '#2a2a2a',      // Gris claro
          dots: 'rgba(55, 55, 55, ALPHA)',
          bright: 'rgba(75, 75, 75, ALPHA)'
        };
      case 'charcoal':
        return {
          base: '#151515',      // Carbón
          dots: 'rgba(40, 40, 40, ALPHA)',
          bright: 'rgba(55, 55, 55, ALPHA)'
        };
      default:
        return {
          base: '#0a0a0a',
          dots: 'rgba(26, 26, 26, ALPHA)',
          bright: 'rgba(35, 35, 35, ALPHA)'
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = getThemeColors();
    const finalIntensity = getVariantIntensity();

    const updateCanvasSize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      
      ctx.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      drawTexture();
    };

    const drawTexture = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Base color
      ctx.fillStyle = colors.base;
      ctx.fillRect(0, 0, width, height);

      // Tamaño de punto y espaciado responsivo
      const isMobile = width < 768;
      const dotSize = isMobile ? 1.0 : 1.2;
      const spacing = isMobile ? 2.5 : 3;
      
      const rows = Math.ceil(height / spacing) + 2;
      const cols = Math.ceil(width / spacing) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Patrón hexagonal offset
          const offsetX = (row % 2) * (spacing / 2);
          const x = col * spacing + offsetX;
          const y = row * spacing;

          // Skip si está fuera del canvas
          if (x < -spacing || x > width + spacing || y < -spacing || y > height + spacing) {
            continue;
          }

          // Variación natural en intensidad
          const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.3;
          const baseAlpha = 0.15 + noise * 0.1;
          const calculatedAlpha = Math.max(0, Math.min(1, baseAlpha * finalIntensity));

          // Variación sutil en tamaño
          const sizeVariation = 0.8 + Math.sin(x * 0.05 + y * 0.05) * 0.4;
          const finalSize = dotSize * sizeVariation;

          // Puntos base
          ctx.fillStyle = colors.dots.replace('ALPHA', calculatedAlpha.toString());
          ctx.beginPath();
          ctx.arc(x, y, finalSize, 0, Math.PI * 2);
          ctx.fill();

          // Algunos puntos más brillantes para variedad
          if (Math.random() < 0.03 * finalIntensity) {
            ctx.fillStyle = colors.bright.replace('ALPHA', (calculatedAlpha * 0.7).toString());
            ctx.beginPath();
            ctx.arc(x, y, finalSize * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Gradiente sutil para profundidad (solo en variantes medium e intense)
      if (variant === 'medium' || variant === 'intense') {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(15, 15, 15, 0.1)');
        gradient.addColorStop(0.5, 'rgba(10, 10, 10, 0)');
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [variant, theme, intensity]);

  return (
    <div 
      className={`${styles.fudiBackground} ${styles[variant]} ${styles[theme]} ${fixed ? styles.fixed : ''} ${className}`}
      style={{ opacity }}
    >
      <canvas 
        ref={canvasRef}
        className={styles.canvas}
        style={{ backgroundColor: getThemeColors().base }}
      />
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};