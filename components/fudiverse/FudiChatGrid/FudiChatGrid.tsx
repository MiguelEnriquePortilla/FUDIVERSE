'use client';

import { useEffect, useRef } from 'react';
import styles from './FudiChatGrid.module.css';

export interface FudiChatGridProps {
  opacity?: number;
  gridSize?: number;
  color?: string;
  animated?: boolean;
  showGradient?: boolean;
  pulseSpeed?: number;
}

export function FudiChatGrid({
  opacity = 0.03,
  gridSize = 50,
  color = '#06b6d4',
  animated = false,
  showGradient = true,
  pulseSpeed = 4
}: FudiChatGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let time = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dynamic opacity based on animation
      const dynamicOpacity = animated 
        ? opacity * (0.8 + Math.sin(time * pulseSpeed) * 0.2)
        : opacity;

      // Set grid style
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = dynamicOpacity;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Add subtle intersection points
      ctx.fillStyle = color;
      ctx.globalAlpha = dynamicOpacity * 2; // Slightly brighter dots
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          // Only draw dots at certain intervals for subtlety
          if ((x / gridSize) % 3 === 0 && (y / gridSize) % 3 === 0) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Add gradient overlay if enabled
      if (showGradient) {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, 
          canvas.height / 2, 
          0,
          canvas.width / 2, 
          canvas.height / 2, 
          Math.max(canvas.width, canvas.height) / 2
        );
        
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(0.5, `${color}05`);
        gradient.addColorStop(1, `${color}10`);
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (animated) {
        time += 0.01;
        animationRef.current = requestAnimationFrame(drawGrid);
      }
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [opacity, gridSize, color, animated, showGradient, pulseSpeed]);

  return (
    <div className={styles.gridContainer}>
      <canvas 
        ref={canvasRef}
        className={styles.gridCanvas}
      />
      {/* Additional CSS grid overlay for ultra-subtle effect */}
      <div 
        className={styles.cssGrid}
        style={{
          backgroundImage: `
            linear-gradient(${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
            linear-gradient(90deg, ${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`
        }}
      />
    </div>
  );
}