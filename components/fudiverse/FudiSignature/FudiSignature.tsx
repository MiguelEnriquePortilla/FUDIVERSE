// components/fudiverse/FudiSignature/FudiSignature.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './FudiSignature.module.css';

export interface FudiSignatureProps {
  size?: 'mini' | 'small' | 'medium' | 'large';
  showPulse?: boolean;
  opacity?: number;
  color?: string;
  className?: string;
}

export function FudiSignature({
  size = 'mini',
  showPulse = true,
  opacity = 0.8,
  color = '#06b6d4',
  className = ''
}: FudiSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Size configurations - más grandes y llamativos
  const sizeConfig = {
    mini: { width: 60, height: 60, iris: 10, pupil: 3 },
    small: { width: 80, height: 80, iris: 14, pupil: 4 },
    medium: { width: 100, height: 100, iris: 18, pupil: 5 },
    large: { width: 140, height: 140, iris: 25, pupil: 7 }
  };

  const config = sizeConfig[size];

  useEffect(() => {
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
    const particles: Array<{x: number, y: number, speed: number, angle: number, size: number}> = [];
    
    // Initialize particles
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: 0,
        y: 0,
        speed: 0.02 + Math.random() * 0.03,
        angle: (i / 8) * Math.PI * 2,
        size: 1 + Math.random() * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, config.width, config.height);
      
      const centerX = config.width / 2;
      const centerY = config.height / 2;

      // Multiple pulsing rings
      if (showPulse) {
        for (let i = 0; i < 3; i++) {
          const pulseDelay = i * 0.3;
          const pulseScale = 1 + Math.sin(time * 2 - pulseDelay) * 0.3;
          const alpha = 0.3 - i * 0.1;
          
          ctx.strokeStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 2 - i * 0.5;
          ctx.beginPath();
          ctx.arc(centerX, centerY, config.iris * pulseScale * (1 + i * 0.3), 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Orbiting particles
      particles.forEach((particle, i) => {
        particle.angle += particle.speed;
        const radius = config.iris * 1.5;
        particle.x = centerX + Math.cos(particle.angle) * radius;
        particle.y = centerY + Math.sin(particle.angle) * radius;
        
        const particleAlpha = 0.6 + Math.sin(time * 3 + i) * 0.4;
        ctx.fillStyle = `${color}${Math.floor(particleAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Particle trail
        ctx.strokeStyle = `${color}40`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        const trailX = centerX + Math.cos(particle.angle - 0.2) * radius;
        const trailY = centerY + Math.sin(particle.angle - 0.2) * radius;
        ctx.lineTo(trailX, trailY);
        ctx.stroke();
      });

      // Outer iris with gradient and glow
      const irisGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, config.iris
      );
      irisGradient.addColorStop(0, `${color}FF`);
      irisGradient.addColorStop(0.5, color);
      irisGradient.addColorStop(0.8, `${color}AA`);
      irisGradient.addColorStop(1, `${color}66`);

      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fillStyle = irisGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, config.iris, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner energy rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = config.iris * (0.7 - i * 0.2);
        const segments = 12;
        
        ctx.strokeStyle = `${color}${Math.floor((0.8 - i * 0.2) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1.5 - i * 0.3;
        
        for (let j = 0; j < segments; j++) {
          const startAngle = (j / segments) * Math.PI * 2 + time * (i % 2 === 0 ? 1 : -1);
          const endAngle = ((j + 0.7) / segments) * Math.PI * 2 + time * (i % 2 === 0 ? 1 : -1);
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, startAngle, endAngle);
          ctx.stroke();
        }
      }

      // Digital iris pattern
      const pattern = 8;
      for (let i = 0; i < pattern; i++) {
        const angle = (i / pattern) * Math.PI * 2 + time * 0.5;
        const x1 = centerX + Math.cos(angle) * config.pupil * 1.5;
        const y1 = centerY + Math.sin(angle) * config.pupil * 1.5;
        const x2 = centerX + Math.cos(angle) * config.iris * 0.8;
        const y2 = centerY + Math.sin(angle) * config.iris * 0.8;
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(0.5, `${color}66`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Central pupil with void effect
      const pupilGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, config.pupil
      );
      pupilGradient.addColorStop(0, '#000000');
      pupilGradient.addColorStop(0.7, '#0a0a0a');
      pupilGradient.addColorStop(1, `${color}88`);
      
      ctx.fillStyle = pupilGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, config.pupil, 0, Math.PI * 2);
      ctx.fill();

      // Energy core in pupil - AMARILLO
      const coreSize = config.pupil * 0.5;
      const coreGlow = 0.5 + Math.sin(time * 4) * 0.5;
      
      ctx.fillStyle = `rgba(251, 191, 36, ${coreGlow})`; // Amarillo FUDI
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fill();

      // Highlight spots
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

      // Secondary highlight
      ctx.fillStyle = `${color}66`;
      ctx.beginPath();
      ctx.arc(
        centerX + config.iris * 0.2, 
        centerY - config.iris * 0.2, 
        config.pupil * 0.3, 
        0, 
        Math.PI * 2
      );
      ctx.fill();

      time += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, showPulse, color, config]);

  return (
    <div 
      className={`${styles.signatureContainer} ${className}`}
      style={{ opacity }}
    >
      <canvas 
        ref={canvasRef}
        className={styles.signatureCanvas}
      />
    </div>
  );
}