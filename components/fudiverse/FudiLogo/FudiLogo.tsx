// ===== FudiLogo.tsx - VERSIÓN ENTITY-INSPIRED =====
'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import styles from './FudiLogo.module.css';

interface FudiLogoProps {
  size?: 'mini' | 'small' | 'medium' | 'large' | 'xl';
  variant?: 'simple' | 'holographic' | 'neural' | 'quantum' | 'entity';
  animated?: boolean;
  showRings?: boolean;
  showData?: boolean;
  showPulse?: boolean;
  followCursor?: boolean;
  showScanBeam?: boolean;
  showParticles?: boolean;
  intensity?: number; // 0-1
  color?: 'cyan' | 'gold' | 'mixed' | 'green' | 'purple';
  className?: string;
  style?: React.CSSProperties;
}

export type { FudiLogoProps };

export const FudiLogo: React.FC<FudiLogoProps> = ({
  size = 'medium',
  variant = 'entity',
  animated = true,
  showRings = true,
  showData = true,
  showPulse = true,
  followCursor = true,
  showScanBeam = true,
  showParticles = true,
  intensity = 0.8,
  color = 'mixed',
  className = '',
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Size configurations - MEJORADAS PARA SER ÉPICAS
  const sizeConfig = {
    mini: { base: 50, rings: 4, dataPoints: 40, fontSize: 8, eyeRadius: 15 },
    small: { base: 80, rings: 6, dataPoints: 80, fontSize: 12, eyeRadius: 25 },
    medium: { base: 120, rings: 8, dataPoints: 120, fontSize: 16, eyeRadius: 35 },
    large: { base: 180, rings: 10, dataPoints: 200, fontSize: 24, eyeRadius: 55 },
    xl: { base: 250, rings: 12, dataPoints: 300, fontSize: 32, eyeRadius: 75 }
  };

  const config = sizeConfig[size];

  // Deterministic pseudo-random generator para evitar hydration mismatch
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Generate EPIC data points con más variedad (determinístico)
  const dataPoints = useMemo(() => {
    const binaryChars = ['0', '1', 'F', 'U', 'D', 'I'];
    return Array.from({ length: config.dataPoints }, (_, i) => {
      const seed = i + 1; // Seed basado en índice para consistencia
      return {
        id: i,
        value: binaryChars[Math.floor(seededRandom(seed * 7) * binaryChars.length)],
        angle: (360 / config.dataPoints) * i + seededRandom(seed * 13) * 10,
        radius: 40 + seededRandom(seed * 17) * 60,
        speed: 0.5 + seededRandom(seed * 19) * 2,
        opacity: 0.3 + seededRandom(seed * 23) * 0.7,
        size: 0.8 + seededRandom(seed * 29) * 0.4
      };
    });
  }, [config.dataPoints]);

  // Quantum particles épicas (determinístico)
  const quantumParticles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const seed = i + 100; // Seed diferente para partículas
      return {
        id: i,
        angle: (360 / 16) * i,
        radius: 35 + (i % 3) * 15,
        speed: 1 + seededRandom(seed * 31) * 3,
        size: 2 + seededRandom(seed * 37) * 3
      };
    });
  }, []);

  // Mouse tracking para followCursor
  useEffect(() => {
    if (!followCursor || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2
        });
      }
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [followCursor]);

  // Canvas animation para variant entity
  useEffect(() => {
    if (variant !== 'entity' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = config.base;
    canvas.height = config.base;

    let time = 0;
    const center = { x: config.base / 2, y: config.base / 2 };

    const animate = () => {
      time += 0.01;

      // Clear with subtle trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate eye tracking
      let eyeOffsetX = 0;
      let eyeOffsetY = 0;
      
      if (followCursor) {
        const maxOffset = config.eyeRadius * 0.2;
        const distance = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y);
        const normalizedDistance = Math.min(distance / 50, 1);
        
        eyeOffsetX = (mousePos.x / 50) * maxOffset * normalizedDistance;
        eyeOffsetY = (mousePos.y / 50) * maxOffset * normalizedDistance;
      }

      // Draw orbital particles
      if (showParticles) {
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + time * 0.5;
          const radius = config.eyeRadius * 1.5 + Math.sin(time * 2 + i) * 5;
          
          const x = center.x + Math.cos(angle) * radius;
          const y = center.y + Math.sin(angle) * radius;
          
          const opacity = 0.4 + Math.sin(time * 3 + i) * 0.3;
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw scanning beam
      if (showScanBeam) {
        const beamAngle = time * 1.5;
        
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(beamAngle);
        
        const beamGradient = ctx.createLinearGradient(0, 0, config.eyeRadius * 2, 0);
        beamGradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
        beamGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.3)');
        beamGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        
        ctx.fillStyle = beamGradient;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(config.eyeRadius * 2, -3);
        ctx.lineTo(config.eyeRadius * 2, 3);
        ctx.lineTo(0, 1);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }

      // Draw concentric rings
      if (showRings) {
        for (let i = 1; i <= 3; i++) {
          const radius = config.eyeRadius * 0.3 + i * (config.eyeRadius * 0.25);
          const opacity = 0.3 - i * 0.08;
          
          ctx.strokeStyle = i % 2 === 0 
            ? `rgba(251, 191, 36, ${opacity})` 
            : `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 1;
          
          // Segmented rings
          const segments = 12;
          for (let j = 0; j < segments; j++) {
            const startAngle = (j / segments) * Math.PI * 2 + time * (i % 2 === 0 ? 0.3 : -0.3);
            const endAngle = ((j + 0.7) / segments) * Math.PI * 2 + time * (i % 2 === 0 ? 0.3 : -0.3);
            
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, startAngle, endAngle);
            ctx.stroke();
          }
        }
      }

      // Draw central eye with glow
      const glowGradient = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, config.eyeRadius
      );
      glowGradient.addColorStop(0, 'rgba(251, 191, 36, 0.6)');
      glowGradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.3)');
      glowGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(center.x, center.y, config.eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw pupil
      const pupilRadius = config.eyeRadius * 0.4;
      const pupilGradient = ctx.createRadialGradient(
        center.x + eyeOffsetX, center.y + eyeOffsetY, 0,
        center.x + eyeOffsetX, center.y + eyeOffsetY, pupilRadius
      );
      pupilGradient.addColorStop(0, '#0a0a0a');
      pupilGradient.addColorStop(0.7, '#111111');
      pupilGradient.addColorStop(1, 'rgba(251, 191, 36, 0.4)');
      
      ctx.fillStyle = pupilGradient;
      ctx.beginPath();
      ctx.arc(center.x + eyeOffsetX, center.y + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw FUDI text
      const textSize = config.eyeRadius * 0.18;
      ctx.font = `bold ${textSize}px "Courier New", monospace`;
      ctx.fillStyle = '#fbbf24';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.fillText('FUDI', center.x + eyeOffsetX, center.y + eyeOffsetY);
      ctx.shadowBlur = 0;

      // Draw highlight
      ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.beginPath();
      ctx.arc(
        center.x + eyeOffsetX - pupilRadius * 0.3,
        center.y + eyeOffsetY - pupilRadius * 0.3,
        pupilRadius * 0.15,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw data streams
      if (showData) {
        ctx.font = '6px monospace';
        const streamCount = 24;
        const chars = ['F', 'U', 'D', 'I', '1', '0'];
        
        for (let i = 0; i < streamCount; i++) {
          const angle = (i / streamCount) * Math.PI * 2 + time * 0.2;
          const radius = config.eyeRadius * 1.3;
          
          const x = center.x + Math.cos(angle) * radius;
          const y = center.y + Math.sin(angle) * radius;
          
          const char = chars[Math.floor((time * 2 + i) % chars.length)];
          const opacity = 0.4 + Math.sin(time * 3 + i) * 0.2;
          
          ctx.fillStyle = char.match(/[FUDI]/) ? 
            `rgba(251, 191, 36, ${opacity})` : 
            `rgba(6, 182, 212, ${opacity * 0.7})`;
          
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(char, x, y);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, config, showRings, showData, showScanBeam, showParticles, followCursor, mousePos]);

  const containerClasses = [
    styles.fudiLogo,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    styles[`color-${color}`],
    animated ? styles.animated : '',
    isHovered ? styles.hovered : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      style={{
        '--logo-size': `${config.base}px`,
        '--logo-intensity': intensity,
        '--ring-count': config.rings,
        '--data-count': config.dataPoints,
        '--font-size': `${config.fontSize}px`,
        '--eye-radius': `${config.eyeRadius}px`,
        ...style
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Canvas para variant entity */}
      {variant === 'entity' && (
        <canvas 
          ref={canvasRef}
          className={styles.entityCanvas}
        />
      )}

      {/* Elementos tradicionales para otros variants */}
      {variant !== 'entity' && (
        <>
          {/* ÉPICOS Concentric Rings */}
          {showRings && (
            <div className={styles.ringsContainer}>
              {Array.from({ length: config.rings }, (_, i) => (
                <div
                  key={`ring-${i}`}
                  className={styles.ring}
                  style={{
                    '--ring-index': i,
                    '--ring-delay': `${i * 0.15}s`,
                    '--ring-size': `${(config.base * 0.2) + (i * 12)}px`,
                    '--ring-speed': `${6 + i * 0.8}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>
          )}

          {/* LEGENDARIOS Data Points */}
          {showData && variant === 'holographic' && (
            <div className={styles.dataPointsContainer}>
              {dataPoints.map((point, i) => (
                <div
                  key={`data-${point.id}`}
                  className={styles.dataPoint}
                  style={{
                    '--point-angle': `${point.angle}deg`,
                    '--point-radius': `${point.radius}px`,
                    '--point-delay': `${i * 0.05}s`,
                    '--point-speed': `${point.speed}s`,
                    '--point-opacity': point.opacity,
                    '--point-scale': point.size
                  } as React.CSSProperties}
                >
                  {point.value}
                </div>
              ))}
            </div>
          )}

          {/* NEURAL Network Lines - MEJORADAS */}
          {variant === 'neural' && (
            <svg className={styles.neuralNetwork} width={config.base} height={config.base}>
              {Array.from({ length: 12 }, (_, i) => {
                const angle1 = (360 / 12) * i;
                const angle2 = (360 / 12) * ((i + 3) % 12);
                const x1 = (config.base / 2) + Math.cos((angle1 * Math.PI) / 180) * (config.base * 0.35);
                const y1 = (config.base / 2) + Math.sin((angle1 * Math.PI) / 180) * (config.base * 0.35);
                const x2 = (config.base / 2) + Math.cos((angle2 * Math.PI) / 180) * (config.base * 0.35);
                const y2 = (config.base / 2) + Math.sin((angle2 * Math.PI) / 180) * (config.base * 0.35);
                
                return (
                  <line
                    key={`neural-${i}`}
                    className={styles.neuralLine}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    style={{
                      '--neural-delay': `${i * 0.1}s`
                    } as React.CSSProperties}
                  />
                );
              })}
            </svg>
          )}

          {/* CENTRO ÉPICO - FUDI COMPLETO */}
          <div className={styles.centerLogo}>
            <span className={styles.logoText}>FUDI</span>
            <div className={styles.logoSubtext}>AI</div>
          </div>

          {/* MEGA Quantum Particles */}
          {variant === 'quantum' && (
            <div className={styles.quantumParticles}>
              {quantumParticles.map((particle, i) => (
                <div
                  key={`particle-${i}`}
                  className={styles.quantumParticle}
                  style={{
                    '--particle-delay': `${i * 0.2}s`,
                    '--particle-speed': `${particle.speed}s`,
                    '--particle-radius': `${particle.radius}px`,
                    '--particle-size': `${particle.size}px`
                  } as React.CSSProperties}
                />
              ))}
            </div>
          )}

          {/* SCANNING Beam épico */}
          {variant === 'holographic' && animated && showScanBeam && (
            <>
              <div className={styles.scanBeam} />
              <div className={styles.scanBeamVertical} />
            </>
          )}

          {/* HOLOGRAPHIC Distortion mejorada */}
          {variant === 'holographic' && (
            <>
              <div className={styles.holographicDistortion} />
              <div className={styles.holographicLines} />
            </>
          )}

          {/* ENERGY Pulses */}
          {animated && showPulse && (
            <div className={styles.energyPulses}>
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={`pulse-${i}`}
                  className={styles.energyPulse}
                  style={{
                    '--pulse-delay': `${i * 0.8}s`,
                    '--pulse-size': `${100 + i * 50}%`
                  } as React.CSSProperties}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};