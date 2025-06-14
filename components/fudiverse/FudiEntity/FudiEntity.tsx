// components/fudiverse/FudiEntity/FudiEntity.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './FudiEntity.module.css';

export type FudiEntityVariant = 'fullscreen' | 'corner' | 'mini' | 'hero' | 'floating' | 'logo';
export type FudiEntityMood = 'neutral' | 'watching' | 'thinking' | 'excited' | 'sleeping' | 'happy' | 'inspired';
export type FudiEntitySize = 'small' | 'medium' | 'large';

interface FudiEntityProps {
  variant?: FudiEntityVariant;
  mood?: FudiEntityMood;
  size?: FudiEntitySize;
  followCursor?: boolean;
  showDataStreams?: boolean;
  showParticles?: boolean;
  showCircuits?: boolean;
  showScanBeam?: boolean;
  showNeuralNet?: boolean;
  intensity?: number;
  onBlink?: () => void;
  className?: string;
}

interface DataStream {
  id: number;
  radius: number;
  angle: number;
  speed: number;
  opacity: number;
  text: string;
  layer: number;
}

export const FudiEntity: React.FC<FudiEntityProps> = ({
  variant = 'fullscreen',
  mood = 'neutral',
  size = 'medium',
  followCursor = true,
  showDataStreams = true,
  showParticles = true,
  showCircuits = true,
  showScanBeam = true,
  showNeuralNet = true,
  intensity = 1,
  onBlink,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const eyeRef = useRef({ 
    x: 0.5, 
    y: 0.5, 
    targetX: 0.5, 
    targetY: 0.5,
    blinkTimer: 0,
    isBlinking: false
  });
  const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });

  // Configuration based on variant
  const getConfig = () => {
    switch (variant) {
      case 'fullscreen':
        return {
          eyeRadius: 80,
          ringCount: 5,
          particleCount: 50,
          dataStreamLayers: 5,
          canvasSize: 'full',
          gridSize: 50
        };
      case 'corner':
        return {
          eyeRadius: 40,
          ringCount: 3,
          particleCount: 20,
          dataStreamLayers: 3,
          canvasSize: 'fixed',
          gridSize: 30
        };
      case 'floating':
        return {
          eyeRadius: 50,
          ringCount: 4,
          particleCount: 30,
          dataStreamLayers: 4,
          canvasSize: 'fixed',
          gridSize: 0
        };
      case 'mini':
        return {
          eyeRadius: 20,
          ringCount: 2,
          particleCount: 10,
          dataStreamLayers: 2,
          canvasSize: 'mini',
          gridSize: 0
        };
      case 'hero':
        return {
          eyeRadius: 100,
          ringCount: 6,
          particleCount: 80,
          dataStreamLayers: 6,
          canvasSize: 'full',
          gridSize: 60
        };
      case 'logo':
        return {
          eyeRadius: 35,
          ringCount: 3,
          particleCount: 15,
          dataStreamLayers: 2,
          canvasSize: 'logo',
          gridSize: 0
        };
      default:
        return {
          eyeRadius: 80,
          ringCount: 5,
          particleCount: 50,
          dataStreamLayers: 5,
          canvasSize: 'full',
          gridSize: 50
        };
    }
  };

  const config = getConfig();

  // Initialize data streams
  useEffect(() => {
    const streams: DataStream[] = [];
    const binaryChars = variant === 'logo' ? ['F', 'U', 'D', 'I', '1', '0'] : ['0', '1', '█', '▓', '▒', '░'];
    
    if (showDataStreams) {
      for (let layer = 0; layer < config.dataStreamLayers; layer++) {
        const count = variant === 'logo' ? 12 + layer * 8 : 20 + layer * 15;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const radius = (config.eyeRadius + 15) + layer * (variant === 'logo' ? 25 : 60);
          
          streams.push({
            id: streams.length,
            radius,
            angle,
            speed: (variant === 'logo' ? 0.1 : 0.2) + Math.random() * (variant === 'logo' ? 0.15 : 0.3) * (layer % 2 === 0 ? 1 : -1) * intensity,
            opacity: variant === 'logo' ? 0.4 - layer * 0.1 : 1 - layer * 0.15,
            text: variant === 'logo' ? 
              binaryChars[Math.floor(Math.random() * binaryChars.length)] :
              Array(8).fill(0).map(() => 
                binaryChars[Math.floor(Math.random() * binaryChars.length)]
              ).join(''),
            layer
          });
        }
      }
    }
    
    setDataStreams(streams);
  }, [showDataStreams, config.dataStreamLayers, config.eyeRadius, intensity, variant]);

  // Mouse tracking
  useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followCursor]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on variant and size prop
    const updateCanvasSize = () => {
      if (config.canvasSize === 'full') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else if (config.canvasSize === 'fixed') {
        // Apply size prop for fixed variants
        const sizeMap = {
          small: { width: 200, height: 200 },
          medium: { width: 400, height: 400 },
          large: { width: 600, height: 600 }
        };
        canvas.width = sizeMap[size].width;
        canvas.height = sizeMap[size].height;
      } else if (config.canvasSize === 'mini') {
        canvas.width = 150;
        canvas.height = 150;
      } else if (config.canvasSize === 'logo') {
        // Logo específico para header
        const logoSizeMap = {
          small: { width: 80, height: 80 },
          medium: { width: 100, height: 100 },
          large: { width: 120, height: 120 }
        };
        canvas.width = logoSizeMap[size].width;
        canvas.height = logoSizeMap[size].height;
      }

      centerRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2
      };
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let time = 0;

    const animate = () => {
      // Tiempo MUY sutil para logo
      time += variant === 'logo' ? 0.005 : 0.01;

      // Clear canvas with subtle trail effect
      ctx.fillStyle = variant === 'fullscreen' ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const center = centerRef.current;

      // Draw background grid
      if (config.gridSize > 0) {
        drawDataGrid(ctx, time);
      }

      // Draw circuit paths
      if (showCircuits && variant !== 'mini' && variant !== 'logo') {
        drawCircuitPaths(ctx, time, center);
      }

      // Draw data streams
      if (showDataStreams) {
        drawDataStreams(ctx, time, center);
      }

      // Draw neural network
      if (showNeuralNet && variant !== 'mini' && variant !== 'logo') {
        drawNeuralConnections(ctx, time, center);
      }

      // Draw the eye
      drawEntityEye(ctx, time, center);

      // Draw scanning beam
      if (showScanBeam && variant !== 'mini') {
        drawScanningBeam(ctx, time, center);
      }

      // Draw particles
      if (showParticles) {
        drawDataParticles(ctx, time, center);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Helper functions
    const drawDataGrid = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.03)';
      ctx.lineWidth = 1;
      
      const gridSize = config.gridSize;
      const offset = (time * 10) % gridSize;
      
      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
        ctx.stroke();
      }
      
      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }
    };

    const drawCircuitPaths = (ctx: CanvasRenderingContext2D, time: number, center: { x: number, y: number }) => {
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
      ctx.lineWidth = 2;
      
      const pathCount = variant === 'corner' ? 4 : 8;
      
      for (let i = 0; i < pathCount; i++) {
        const angle = (i / pathCount) * Math.PI * 2;
        const startRadius = config.eyeRadius + 70;
        const endRadius = startRadius + 250;
        
        ctx.beginPath();
        ctx.moveTo(
          center.x + Math.cos(angle) * startRadius,
          center.y + Math.sin(angle) * startRadius
        );
        
        const steps = 5;
        for (let j = 1; j <= steps; j++) {
          const r = startRadius + (endRadius - startRadius) * (j / steps);
          const a = angle + Math.sin(time + i + j) * 0.1;
          
          if (j % 2 === 0) {
            ctx.lineTo(
              center.x + Math.cos(a) * r,
              center.y + Math.sin(angle) * r
            );
          } else {
            ctx.lineTo(
              center.x + Math.cos(angle) * r,
              center.y + Math.sin(a) * r
            );
          }
        }
        
        ctx.stroke();
        
        // Data flow dots
        const flowProgress = (time * 0.5 + i * 0.2) % 1;
        const flowRadius = startRadius + (endRadius - startRadius) * flowProgress;
        
        ctx.fillStyle = i % 2 === 0 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(0, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(
          center.x + Math.cos(angle) * flowRadius,
          center.y + Math.sin(angle) * flowRadius,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    };

    const drawDataStreams = (ctx: CanvasRenderingContext2D, time: number, center: { x: number, y: number }) => {
      dataStreams.forEach((stream) => {
        const x = center.x + Math.cos(stream.angle + time * stream.speed) * stream.radius;
        const y = center.y + Math.sin(stream.angle + time * stream.speed) * stream.radius;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(stream.angle + time * stream.speed);
        
        const fontSize = variant === 'logo' ? '8px' : variant === 'mini' ? '6px' : '10px';
        ctx.font = `${fontSize} monospace`;
        
        // Colores específicos para logo
        if (variant === 'logo') {
          ctx.fillStyle = stream.text.match(/[FUDI]/) ? 
            `rgba(251, 191, 36, ${stream.opacity})` : 
            `rgba(6, 182, 212, ${stream.opacity * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(0, 153, 255, ${stream.opacity * 0.7})`;
        }
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(stream.text, 0, 0);
        
        ctx.restore();
      });
    };

    const drawEntityEye = (ctx: CanvasRenderingContext2D, time: number, center: { x: number, y: number }) => {
      // Calculate eye tracking
      let eyeOffsetX = 0;
      let eyeOffsetY = 0;
      
      if (followCursor) {
        const dx = mousePos.x - center.x;
        const dy = mousePos.y - center.y;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, config.eyeRadius / 8);
        
        eyeOffsetX = Math.cos(angle) * distance;
        eyeOffsetY = Math.sin(angle) * distance;
      }
      
      // Outer iris rings - MÁS SUTILES para logo
      for (let i = config.ringCount; i > 0; i--) {
        const radius = config.eyeRadius * 0.4 + i * (config.eyeRadius * 0.3);
        
        const opacity = variant === 'logo' ? 0.2 - i * 0.03 : 0.4 - i * 0.06;
        ctx.strokeStyle = i % 2 === 0 
          ? `rgba(251, 191, 36, ${opacity})` 
          : `rgba(6, 182, 212, ${opacity * 0.8})`;
        ctx.lineWidth = variant === 'logo' ? 1 : 2;
        
        const segments = variant === 'logo' ? 12 : 16;
        const speed = variant === 'logo' ? 0.2 : 0.5;
        
        for (let j = 0; j < segments; j++) {
          const startAngle = (j / segments) * Math.PI * 2 + time * (i % 2 === 0 ? speed : -speed);
          const endAngle = ((j + 0.8) / segments) * Math.PI * 2 + time * (i % 2 === 0 ? speed : -speed);
          
          ctx.beginPath();
          ctx.arc(center.x, center.y, radius, startAngle, endAngle);
          ctx.stroke();
        }
      }
      
      // Inner eye glow - MÁS SUTIL para logo
      const glowGradient = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, config.eyeRadius * 1.25
      );
      const glowIntensity = variant === 'logo' ? 0.4 : 0.8;
      glowGradient.addColorStop(0, `rgba(251, 191, 36, ${glowIntensity})`);
      glowGradient.addColorStop(0.3, `rgba(251, 191, 36, ${glowIntensity * 0.5})`);
      glowGradient.addColorStop(0.6, `rgba(255, 215, 0, ${glowIntensity * 0.25})`);
      glowGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(center.x, center.y, config.eyeRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();
      
      // Central pupil
      const pupilRadius = config.eyeRadius * 0.375;
      const pupilGradient = ctx.createRadialGradient(
        center.x + eyeOffsetX, 
        center.y + eyeOffsetY, 
        0,
        center.x + eyeOffsetX, 
        center.y + eyeOffsetY, 
        pupilRadius
      );
      pupilGradient.addColorStop(0, '#0a0a0a');
      pupilGradient.addColorStop(0.7, '#111111');
      pupilGradient.addColorStop(1, variant === 'logo' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.5)');
      
      ctx.fillStyle = pupilGradient;
      ctx.beginPath();
      ctx.arc(center.x + eyeOffsetX, center.y + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // FUDI text in center (ajustado para logo)
      if (variant !== 'mini') {
        const textSize = variant === 'logo' ? config.eyeRadius * 0.15 : config.eyeRadius * 0.175;
        ctx.font = `bold ${textSize}px "Courier New", monospace`;
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const shadowBlur = variant === 'logo' ? 10 : 20;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = shadowBlur;
        ctx.fillText('FUDI', center.x + eyeOffsetX, center.y + eyeOffsetY);
        ctx.shadowBlur = 0;
      }
      
      // Pupil highlight
      const highlightOpacity = variant === 'logo' ? 0.2 : 0.3;
      ctx.fillStyle = `rgba(251, 191, 36, ${highlightOpacity})`;
      ctx.beginPath();
      ctx.arc(
        center.x + eyeOffsetX - pupilRadius * 0.3, 
        center.y + eyeOffsetY - pupilRadius * 0.3, 
        pupilRadius * 0.15, 
        0, 
        Math.PI * 2
      );
      ctx.fill();

      // Blinking effect (deshabilitado para logo)
      if (variant !== 'logo' && (mood === 'sleeping' || (Math.random() < 0.002 && onBlink))) {
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(
          center.x - config.eyeRadius * 2,
          center.y - config.eyeRadius * 0.1,
          config.eyeRadius * 4,
          config.eyeRadius * 0.2
        );
        onBlink?.();
      }
    };

    const drawScanningBeam = (ctx: CanvasRenderingContext2D, time: number, center: { x: number, y: number }) => {
      const beamSpeed = variant === 'logo' ? 1 : 2;
      const beamAngle = time * beamSpeed;
      
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(beamAngle);
      
      const beamLength = config.eyeRadius * 3.75;
      const beamGradient = ctx.createLinearGradient(0, 0, beamLength, 0);
      const beamOpacity = variant === 'logo' ? 0.15 : 0.4;
      
      beamGradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
      beamGradient.addColorStop(0.5, `rgba(6, 182, 212, ${beamOpacity})`);
      beamGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
      
      ctx.fillStyle = beamGradient;
      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.lineTo(beamLength, variant === 'logo' ? -5 : -10);
      ctx.lineTo(beamLength, variant === 'logo' ? 5 : 10);
      ctx.lineTo(0, 1);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawDataParticles = (ctx: CanvasRenderingContext2D, time: number, center: { x: number, y: number }) => {
      const particleCount = config.particleCount;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const radiusOffset = Math.sin(time * 2 + i) * (config.eyeRadius * 0.625);
        const radius = config.eyeRadius * (variant === 'logo' ? 1.8 : 2.5) + radiusOffset;
        
        const speed = variant === 'logo' ? 0.3 : 0.5;
        const x = center.x + Math.cos(angle + time * speed) * radius;
        const y = center.y + Math.sin(angle + time * speed) * radius;
        
        const opacity = variant === 'logo' ? 
          0.3 + Math.sin(time * 2 + i) * 0.2 : 
          0.5 + Math.sin(time * 3 + i) * 0.3;
          
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, variant === 'logo' ? 1.5 : variant === 'mini' ? 1 : 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawNeuralConnections = (ctx: CanvasRenderingContext2D, time: number, center: { x: number, y: number }) => {
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 6; i++) {
        const angle1 = (i / 6) * Math.PI * 2;
        const angle2 = ((i + 2) / 6) * Math.PI * 2;
        
        const r1 = config.eyeRadius * 1.875 + Math.sin(time + i) * 20;
        const r2 = config.eyeRadius * 3.125 + Math.cos(time + i) * 30;
        
        ctx.beginPath();
        ctx.moveTo(
          center.x + Math.cos(angle1) * r1,
          center.y + Math.sin(angle1) * r1
        );
        
        const controlX = center.x + Math.cos((angle1 + angle2) / 2) * (r1 + r2) / 2;
        const controlY = center.y + Math.sin((angle1 + angle2) / 2) * (r1 + r2) / 2;
        
        ctx.quadraticCurveTo(
          controlX,
          controlY,
          center.x + Math.cos(angle2) * r2,
          center.y + Math.sin(angle2) * r2
        );
        
        ctx.stroke();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dataStreams, mousePos, followCursor, showCircuits, showScanBeam, showNeuralNet, showParticles, variant, mood, size, intensity, config, onBlink]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.fudiEntity} ${styles[variant]} ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className={styles.canvas}
      />
    </div>
  );
};