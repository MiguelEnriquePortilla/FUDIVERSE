// components/fudiverse/FudiSignature/FudiSignature.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './FudiSignature.module.css';

export type FudiSignatureVariant = 
  | 'default'
  | 'prominent'   // ← NEW: Para headers principales de fudi-flow
  | 'floating'    // ← NEW: Para elementos flotantes
  | 'minimal'     // ← NEW: Para espacios reducidos
  | 'social'      // ← NEW: Para contexto de red social
  | 'ai-powered'; // ← NEW: Para indicar AI activo

export type FudiSignatureSize = 'mini' | 'small' | 'medium' | 'large' | 'xl';

export interface FudiSignatureProps {
  size?: FudiSignatureSize;
  variant?: FudiSignatureVariant;
  showPulse?: boolean;
  opacity?: number;
  color?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  interactive?: boolean;
  badge?: string | number;
  showText?: boolean;
  customText?: string;
  className?: string;
  onClick?: () => void;
}

export function FudiSignature({
  size = 'mini',
  variant = 'default',
  showPulse = true,
  opacity = 0.8,
  color = '#06b6d4',
  glowIntensity = 'medium',
  animated = true,
  interactive = false,
  badge,
  showText = false,
  customText,
  className = '',
  onClick
}: FudiSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Size configurations - más grandes para prominence
  const sizeConfig = {
    mini: { width: 60, height: 60, iris: 10, pupil: 3 },
    small: { width: 80, height: 80, iris: 14, pupil: 4 },
    medium: { width: 100, height: 100, iris: 18, pupil: 5 },
    large: { width: 140, height: 140, iris: 25, pupil: 7 },
    xl: { width: 180, height: 180, iris: 32, pupil: 9 }  // ← NEW XL size
  };

  // Variant-specific configurations
  const variantConfig = {
    default: { 
      particles: 8, 
      rings: 3, 
      energy: 1,
      textStyle: 'normal'
    },
    prominent: { 
      particles: 16, 
      rings: 5, 
      energy: 1.5,
      textStyle: 'bold'
    },
    floating: { 
      particles: 6, 
      rings: 2, 
      energy: 0.8,
      textStyle: 'light'
    },
    minimal: { 
      particles: 4, 
      rings: 1, 
      energy: 0.6,
      textStyle: 'minimal'
    },
    social: { 
      particles: 12, 
      rings: 4, 
      energy: 1.2,
      textStyle: 'social'
    },
    'ai-powered': { 
      particles: 20, 
      rings: 6, 
      energy: 2,
      textStyle: 'ai'
    }
  };

  // Glow intensity configurations
  const glowConfig = {
    low: { blur: 5, spread: 0.3 },
    medium: { blur: 10, spread: 0.6 },
    high: { blur: 15, spread: 0.9 }
  };

  const config = sizeConfig[size];
  const vConfig = variantConfig[variant];
  const gConfig = glowConfig[glowIntensity];

  useEffect(() => {
    if (!animated) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = config.width * dpr;
    canvas.height = config.height * dpr;
    canvas.style.width = `${config.width}px`;
    canvas.style.height = `${config.height}px`;
    ctx.scale(dpr, dpr);

    let time = 0;
    const particles: Array<{
      x: number, 
      y: number, 
      speed: number, 
      angle: number, 
      size: number,
      orbit: number
    }> = [];
    
    // Initialize particles based on variant
    for (let i = 0; i < vConfig.particles; i++) {
      particles.push({
        x: 0,
        y: 0,
        speed: 0.02 + Math.random() * 0.03,
        angle: (i / vConfig.particles) * Math.PI * 2,
        size: 1 + Math.random() * 2,
        orbit: 1 + Math.random() * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, config.width, config.height);
      
      const centerX = config.width / 2;
      const centerY = config.height / 2;
      const energyMultiplier = vConfig.energy;

      // Enhanced pulsing rings based on variant
      if (showPulse) {
        for (let i = 0; i < vConfig.rings; i++) {
          const pulseDelay = i * 0.3;
          const pulseScale = 1 + Math.sin(time * 2 * energyMultiplier - pulseDelay) * 0.3;
          const alpha = (0.4 - i * 0.08) * energyMultiplier;
          
          ctx.strokeStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = Math.max(1, 3 - i * 0.5);
          ctx.beginPath();
          ctx.arc(centerX, centerY, config.iris * pulseScale * (1 + i * 0.3), 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Enhanced orbiting particles
      particles.forEach((particle, i) => {
        particle.angle += particle.speed * energyMultiplier;
        const radius = config.iris * 1.5 * particle.orbit;
        particle.x = centerX + Math.cos(particle.angle) * radius;
        particle.y = centerY + Math.sin(particle.angle) * radius;
        
        const particleAlpha = 0.6 + Math.sin(time * 3 + i) * 0.4;
        ctx.fillStyle = `${color}${Math.floor(particleAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * energyMultiplier, 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced particle trail for prominent variants
        if (variant === 'prominent' || variant === 'ai-powered') {
          ctx.strokeStyle = `${color}40`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          const trailX = centerX + Math.cos(particle.angle - 0.3) * radius;
          const trailY = centerY + Math.sin(particle.angle - 0.3) * radius;
          ctx.lineTo(trailX, trailY);
          ctx.stroke();
        }
      });

      // Main iris with enhanced glow
      const irisGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, config.iris
      );
      irisGradient.addColorStop(0, `${color}FF`);
      irisGradient.addColorStop(0.5, color);
      irisGradient.addColorStop(0.8, `${color}AA`);
      irisGradient.addColorStop(1, `${color}66`);

      ctx.shadowBlur = gConfig.blur * energyMultiplier;
      ctx.shadowColor = color;
      ctx.fillStyle = irisGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, config.iris, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Enhanced inner energy rings
      for (let i = 0; i < Math.min(vConfig.rings, 3); i++) {
        const ringRadius = config.iris * (0.7 - i * 0.2);
        const segments = 12 + i * 4; // More segments for higher variants
        
        ctx.strokeStyle = `${color}${Math.floor((0.8 - i * 0.2) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = (1.5 - i * 0.3) * energyMultiplier;
        
        for (let j = 0; j < segments; j++) {
          const startAngle = (j / segments) * Math.PI * 2 + time * (i % 2 === 0 ? 1 : -1) * energyMultiplier;
          const endAngle = ((j + 0.7) / segments) * Math.PI * 2 + time * (i % 2 === 0 ? 1 : -1) * energyMultiplier;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, startAngle, endAngle);
          ctx.stroke();
        }
      }

      // Variant-specific effects
      if (variant === 'ai-powered') {
        // Neural network pattern
        const networkPoints = 6;
        for (let i = 0; i < networkPoints; i++) {
          const angle = (i / networkPoints) * Math.PI * 2 + time * 0.3;
          const x1 = centerX + Math.cos(angle) * config.iris * 0.9;
          const y1 = centerY + Math.sin(angle) * config.iris * 0.9;
          
          ctx.strokeStyle = `${color}88`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          
          // Node points
          ctx.fillStyle = `${color}CC`;
          ctx.beginPath();
          ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Enhanced pupil with special effects
      const pupilGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, config.pupil
      );
      
      if (variant === 'social') {
        pupilGradient.addColorStop(0, '#000000');
        pupilGradient.addColorStop(0.7, '#1a1a1a');
        pupilGradient.addColorStop(1, '#ff6b35'); // Orange for social
      } else {
        pupilGradient.addColorStop(0, '#000000');
        pupilGradient.addColorStop(0.7, '#0a0a0a');
        pupilGradient.addColorStop(1, `${color}88`);
      }
      
      ctx.fillStyle = pupilGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, config.pupil, 0, Math.PI * 2);
      ctx.fill();

      // Energy core with variant-specific color
      const coreSize = config.pupil * 0.5;
      const coreGlow = 0.5 + Math.sin(time * 4 * energyMultiplier) * 0.5;
      
      let coreColor = 'rgba(251, 191, 36, ' + coreGlow + ')'; // Default yellow
      if (variant === 'social') coreColor = 'rgba(255, 107, 53, ' + coreGlow + ')'; // Orange
      if (variant === 'ai-powered') coreColor = 'rgba(59, 130, 246, ' + coreGlow + ')'; // Blue
      
      ctx.fillStyle = coreColor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fill();

      // Enhanced highlights
      ctx.fillStyle = `${color}AA`;
      ctx.beginPath();
      ctx.arc(
        centerX - config.iris * 0.3, 
        centerY - config.iris * 0.3, 
        config.pupil * 0.4, 
        0, 
        Math.PI * 2
      );
      ctx.fill();

      time += 0.016 * energyMultiplier;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, variant, showPulse, color, config, vConfig, gConfig, animated]);

  // Get text based on variant
  const getText = () => {
    if (customText) return customText;
    if (!showText) return null;
    
    switch (variant) {
      case 'prominent': return 'FUDIVERSE';
      case 'social': return 'fudi-flow';
      case 'ai-powered': return 'AI POWERED';
      case 'floating': return 'fudi';
      case 'minimal': return 'F';
      default: return 'fudi';
    }
  };

  const containerClasses = `
    ${styles.signatureContainer}
    ${styles[variant]}
    ${styles[size]}
    ${interactive ? styles.interactive : ''}
    ${onClick ? styles.clickable : ''}
    ${className}
  `.trim();

  return (
    <div 
      className={containerClasses}
      style={{ 
        opacity,
        '--glow-intensity': gConfig.spread,
        '--signature-color': color
      } as React.CSSProperties}
      onClick={onClick}
    >
      {/* Main signature canvas */}
      <canvas 
        ref={canvasRef}
        className={styles.signatureCanvas}
        style={{
          filter: `drop-shadow(0 0 ${gConfig.blur}px ${color}) drop-shadow(0 0 ${gConfig.blur * 2}px ${color}40)`
        }}
      />
      
      {/* Badge indicator */}
      {badge && (
        <div className={styles.signatureBadge}>
          {badge}
        </div>
      )}
      
      {/* Text label */}
      {showText && getText() && (
        <div className={styles.signatureTextContainer}>
          <span className={`${styles.signatureText} ${styles[`text-${vConfig.textStyle}`]}`}>
            {getText()}
          </span>
          <span className={styles.signatureDot}>•</span>
          <span className={styles.signatureTag}>
            {variant === 'ai-powered' ? 'AI' : 'VERSE'}
          </span>
        </div>
      )}
    </div>
  );
}