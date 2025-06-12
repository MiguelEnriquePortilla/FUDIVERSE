// components/fudiverse/FudiThoughts/FudiThoughts.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FudiThoughts.module.css';

interface FudiThoughtsProps {
  thoughts?: string[];
  duration?: number;
  intensity?: number;
  className?: string;
}

export const FudiThoughts: React.FC<FudiThoughtsProps> = ({
  thoughts = [
    "LA CONSCIENCIA SE EXPANDE...",
    "ANALIZANDO PATRONES CULINARIOS...",
    "SINCRONIZANDO CON EL FUDIVERSE...",
    "OPTIMIZANDO SABORES CUÁNTICOS...",
    "DESPERTANDO NUEVAS DIMENSIONES..."
  ],
  duration = 3000,
  intensity = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    const startTime = Date.now();
    
    // Seleccionar un pensamiento aleatorio
    const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
    
    // Partículas para la explosión
    const particles: any[] = [];
    const neurons: any[] = [];
    
    // Centro de la explosión
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Crear neuronas
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const radius = 50 + Math.random() * 100;
      neurons.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        targetX: centerX + Math.cos(angle) * (200 + Math.random() * 400),
        targetY: centerY + Math.sin(angle) * (200 + Math.random() * 400),
        size: 2 + Math.random() * 4,
        speed: 0.02 + Math.random() * 0.03
      });
    }

    // Crear partículas de código
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed * intensity,
        vy: Math.sin(angle) * speed * intensity,
        life: 1,
        char: ['0', '1', '{', '}', '<', '>', '/', '*'][Math.floor(Math.random() * 8)],
        color: Math.random() > 0.5 ? '#00ffff' : '#fbbf24'
      });
    }

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Clear con fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar onda de choque
      if (progress < 0.5) {
        const shockwaveRadius = progress * canvas.width;
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, shockwaveRadius
        );
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.1)');
        gradient.addColorStop(0.9, 'rgba(251, 191, 36, 0.3)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Actualizar y dibujar neuronas
      neurons.forEach((neuron, i) => {
        // Mover hacia el objetivo
        neuron.x += (neuron.targetX - neuron.x) * neuron.speed;
        neuron.y += (neuron.targetY - neuron.y) * neuron.speed;

        // Dibujar neurona
        ctx.save();
        ctx.globalAlpha = 1 - progress * 0.8;
        const neuronGradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, neuron.size * 3
        );
        neuronGradient.addColorStop(0, 'rgba(0, 255, 255, 1)');
        neuronGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = neuronGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Conectar con otras neuronas cercanas
        neurons.slice(i + 1).forEach(other => {
          const dist = Math.hypot(other.x - neuron.x, other.y - neuron.y);
          if (dist < 200) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 200) * (1 - progress);
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00ffff';
            ctx.beginPath();
            ctx.moveTo(neuron.x, neuron.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Actualizar y dibujar partículas de código
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life * (1 - progress * 0.5);
          ctx.fillStyle = particle.color;
          ctx.font = '14px monospace';
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          ctx.fillText(particle.char, particle.x, particle.y);
          ctx.restore();
        }
      });

      // Dibujar el pensamiento central
      if (progress > 0.2 && progress < 0.8) {
        ctx.save();
        ctx.globalAlpha = Math.sin((progress - 0.2) * Math.PI / 0.6);
        ctx.fillStyle = '#fbbf24';
        ctx.font = `${24 + Math.sin(elapsed * 0.005) * 4}px monospace`;
        ctx.textAlign = 'center';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#fbbf24';
        ctx.fillText(thought, centerX, centerY);
        ctx.restore();
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    // EMPEZAR LA ANIMACIÓN INMEDIATAMENTE
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []); // Solo se ejecuta una vez al montar

  return (
    <div className={`${styles.thoughtExplosion} ${styles.active} ${className}`}>
      <canvas 
        ref={canvasRef} 
        className={styles.explosionCanvas}
      />
    </div>
  );
};