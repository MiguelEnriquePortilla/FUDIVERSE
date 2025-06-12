'use client';

import { useEffect, useRef } from 'react';
import styles from './FudiAura.module.css';

export interface FudiAuraProps {
  variant?: 'energy' | 'particles' | 'waves' | 'combined';
  color?: string;
  intensity?: number;
  size?: number;
  pulseSpeed?: number;
  particleCount?: number;
}

export function FudiAura({
  variant = 'combined',
  color = '#00ffff',
  intensity = 1,
  size = 300,
  pulseSpeed = 2,
  particleCount = 30
}: FudiAuraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Initialize particles
    class Particle {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = size * 0.3 + Math.random() * size * 0.2;
        this.x = size / 2 + Math.cos(this.angle) * this.radius;
        this.y = size / 2 + Math.sin(this.angle) * this.radius;
        this.speed = 0.01 + Math.random() * 0.02;
        this.size = 2 + Math.random() * 3;
        this.opacity = 0.3 + Math.random() * 0.7;
      }

      update() {
        this.angle += this.speed;
        this.x = size / 2 + Math.cos(this.angle) * this.radius;
        this.y = size / 2 + Math.sin(this.angle) * this.radius;
        this.opacity = 0.3 + Math.sin(this.angle * 3) * 0.7;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity * intensity;
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    if (variant === 'particles' || variant === 'combined') {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    }

    let time = 0;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Draw energy waves
      if (variant === 'energy' || variant === 'waves' || variant === 'combined') {
        const waveCount = 3;
        for (let i = 0; i < waveCount; i++) {
          const waveTime = time + (i * Math.PI * 2 / waveCount);
          const waveRadius = (size * 0.3) + (Math.sin(waveTime * pulseSpeed) * size * 0.1);
          const waveOpacity = 0.1 + Math.sin(waveTime * pulseSpeed) * 0.1;
          
          ctx.save();
          ctx.globalAlpha = waveOpacity * intensity;
          ctx.strokeStyle = color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw and update particles
      if (variant === 'particles' || variant === 'combined') {
        particlesRef.current.forEach(particle => {
          particle.update();
          particle.draw();
        });
      }

      // Draw center glow
      if (variant === 'energy' || variant === 'combined') {
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0,
          size / 2, size / 2, size * 0.4
        );
        gradient.addColorStop(0, `${color}33`);
        gradient.addColorStop(0.5, `${color}11`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.save();
        ctx.globalAlpha = intensity;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        ctx.restore();
      }

      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
    };
  }, [variant, color, intensity, size, pulseSpeed, particleCount]);

  return (
    <div 
      className={styles.auraContainer}
      style={{ width: size, height: size }}
    >
      <canvas 
        ref={canvasRef}
        className={styles.auraCanvas}
      />
    </div>
  );
}