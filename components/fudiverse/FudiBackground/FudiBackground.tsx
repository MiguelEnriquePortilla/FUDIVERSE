// components/fudiverse/FudiBackground/FudiBackground.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FudiBackground.module.css';

export type FudiBackgroundVariant = 'dataStreams' | 'particles' | 'gradientBlobs' | 'grid' | 'matrix' | 'neural' | 'combined';

interface FudiBackgroundProps {
  variant?: FudiBackgroundVariant;
  intensity?: number;
  speed?: number;
  color?: 'gold' | 'cyan' | 'purple' | 'mixed';
  opacity?: number;
  blur?: number;
  fixed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface DataStream {
  id: number;
  text: string;
  speed: number;
  delay: number;
}

export const FudiBackground: React.FC<FudiBackgroundProps> = ({
  variant = 'combined',
  intensity = 1,
  speed = 1,
  color = 'mixed',
  opacity = 1,
  blur = 0,
  fixed = true,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataStreamsRef = useRef<DataStream[]>([]);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Color schemes
  const getColors = () => {
    switch (color) {
      case 'gold':
        return {
          primary: '#fbbf24',
          secondary: '#f59e0b',
          accent: '#d97706'
        };
      case 'cyan':
        return {
          primary: '#00ffff',
          secondary: '#0891b2',
          accent: '#0e7490'
        };
      case 'purple':
        return {
          primary: '#a78bfa',
          secondary: '#9333ea',
          accent: '#7c3aed'
        };
      case 'mixed':
      default:
        return {
          primary: '#fbbf24',
          secondary: '#00ffff',
          accent: '#a78bfa'
        };
    }
  };

  const colors = getColors();

  // Initialize data streams for matrix/dataStreams variants
  useEffect(() => {
    if (variant === 'dataStreams' || variant === 'matrix' || variant === 'combined') {
      const streams: DataStream[] = [];
      const streamCount = Math.floor(20 * intensity);
      
      for (let i = 0; i < streamCount; i++) {
        streams.push({
          id: i,
          text: generateDataString(),
          speed: (0.5 + Math.random() * 1.5) * speed,
          delay: Math.random() * 2
        });
      }
      
      dataStreamsRef.current = streams;
    }
  }, [variant, intensity, speed]);

  // Initialize particles for particle variant
  useEffect(() => {
    if (variant === 'particles' || variant === 'combined') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const particleCount = Math.floor(50 * intensity);
      const particles: any[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? colors.primary : colors.secondary,
          alpha: Math.random() * 0.5 + 0.2
        });
      }

      particlesRef.current = particles;
    }
  }, [variant, intensity, speed, colors]);

  // Canvas animation for particles and neural networks
  useEffect(() => {
    if (variant !== 'particles' && variant !== 'neural' && variant !== 'combined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let time = 0;

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      if (variant === 'particles' || variant === 'combined') {
        drawParticles(ctx, canvas.width, canvas.height);
      }

      // Draw neural network
      if (variant === 'neural' || variant === 'combined') {
        drawNeuralNetwork(ctx, canvas.width, canvas.height, time);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha * opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.forEach(other => {
          if (particle.id === other.id) return;
          
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.2 * opacity;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
    };

    const drawNeuralNetwork = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const nodeCount = Math.floor(15 * intensity);
      const nodes: any[] = [];

      // Generate nodes
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radiusVariation = Math.sin(time + i) * 50;
        const radius = 200 + radiusVariation;
        
        nodes.push({
          x: width / 2 + Math.cos(angle + time * 0.1) * radius,
          y: height / 2 + Math.sin(angle + time * 0.1) * radius,
          radius: 3 + Math.sin(time * 2 + i) * 2
        });
      }

      // Draw connections
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;

      nodes.forEach((node, i) => {
        // Connect to next 3 nodes
        for (let j = 1; j <= 3; j++) {
          const targetIndex = (i + j) % nodes.length;
          const target = nodes[targetIndex];

          ctx.globalAlpha = 0.1 * opacity;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          
          // Curved connection
          const controlX = (node.x + target.x) / 2 + Math.sin(time + i + j) * 50;
          const controlY = (node.y + target.y) / 2 + Math.cos(time + i + j) * 50;
          
          ctx.quadraticCurveTo(controlX, controlY, target.x, target.y);
          ctx.stroke();
        }

        // Draw node
        ctx.fillStyle = colors.primary;
        ctx.globalAlpha = 0.8 * opacity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, opacity, colors, intensity]);

  // Generate random data string
  const generateDataString = () => {
    const chars = ['0', '1', '█', '▓', '▒', '░', '{', '}', '[', ']', '<', '>', '/', '*'];
    return Array(Math.floor(Math.random() * 15 + 10))
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.fudiBackground} ${styles[variant]} ${fixed ? styles.fixed : ''} ${className}`}
      style={{ 
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : undefined
      }}
    >
      {/* Gradient Blobs */}
      {(variant === 'gradientBlobs' || variant === 'combined') && (
        <div className={styles.gradientContainer}>
          <div 
            className={`${styles.blob} ${styles.blob1}`}
            style={{
              background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
              animationDuration: `${25 / speed}s`
            }}
          />
          <div 
            className={`${styles.blob} ${styles.blob2}`}
            style={{
              background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
              animationDuration: `${30 / speed}s`
            }}
          />
          <div 
            className={`${styles.blob} ${styles.blob3}`}
            style={{
              background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
              animationDuration: `${35 / speed}s`
            }}
          />
        </div>
      )}

      {/* Grid Pattern */}
      {(variant === 'grid' || variant === 'combined') && (
        <div 
          className={styles.gridPattern}
          style={{
            backgroundImage: `
              linear-gradient(${colors.primary}22 1px, transparent 1px),
              linear-gradient(90deg, ${colors.primary}22 1px, transparent 1px)
            `,
            backgroundSize: `${50 / intensity}px ${50 / intensity}px`,
            animationDuration: `${20 / speed}s`
          }}
        />
      )}

      {/* Data Streams / Matrix Rain */}
      {(variant === 'dataStreams' || variant === 'matrix' || variant === 'combined') && (
        <div className={styles.dataStreamsContainer}>
          {dataStreamsRef.current.map((stream) => (
            <div
              key={stream.id}
              className={styles.dataStream}
              style={{
                left: `${(stream.id / dataStreamsRef.current.length) * 100}%`,
                animationDelay: `${stream.delay}s`,
                animationDuration: `${10 / stream.speed}s`,
                color: stream.id % 3 === 0 ? colors.primary : stream.id % 3 === 1 ? colors.secondary : colors.accent
              }}
            >
              {variant === 'matrix' ? (
                <div className={styles.matrixColumn}>
                  {stream.text.split('').map((char, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        animationDelay: `${i * 0.1}s`,
                        opacity: 1 - (i / stream.text.length) * 0.8
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ) : (
                <span className={styles.streamText}>{stream.text}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Canvas for particles and neural network */}
      {(variant === 'particles' || variant === 'neural' || variant === 'combined') && (
        <canvas 
          ref={canvasRef}
          className={styles.canvas}
        />
      )}

      {/* Scan lines effect */}
      {variant === 'combined' && (
        <div className={styles.scanLines} />
      )}

      {/* Children content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};