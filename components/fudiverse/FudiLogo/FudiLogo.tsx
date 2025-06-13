// ===== FudiLogo.tsx =====
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styles from './FudiLogo.module.css';

interface FudiLogoProps {
  size?: 'mini' | 'small' | 'medium' | 'large' | 'xl';
  variant?: 'simple' | 'holographic' | 'neural' | 'quantum';
  animated?: boolean;
  showRings?: boolean;
  showData?: boolean;
  showPulse?: boolean;
  intensity?: number; // 0-1
  color?: 'cyan' | 'gold' | 'mixed' | 'green' | 'purple';
  className?: string;
  style?: React.CSSProperties;
}

export type { FudiLogoProps };

export const FudiLogo: React.FC<FudiLogoProps> = ({
  size = 'medium',
  variant = 'holographic',
  animated = true,
  showRings = true,
  showData = true,
  showPulse = true,
  intensity = 0.8,
  color = 'cyan',
  className = '',
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    mini: { base: 40, rings: 3, dataPoints: 20 },
    small: { base: 60, rings: 4, dataPoints: 30 },
    medium: { base: 100, rings: 5, dataPoints: 50 },
    large: { base: 150, rings: 6, dataPoints: 80 },
    xl: { base: 200, rings: 8, dataPoints: 120 }
  };

  const config = sizeConfig[size];

  // Generate random data points for binary effect
  const dataPoints = useMemo(() => {
    return Array.from({ length: config.dataPoints }, (_, i) => ({
      id: i,
      value: Math.random() > 0.5 ? '1' : '0',
      angle: (360 / config.dataPoints) * i,
      radius: 60 + Math.random() * 40,
      speed: 0.3 + Math.random() * 0.7
    }));
  }, [config.dataPoints]);

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
      className={containerClasses}
      style={{
        '--logo-size': `${config.base}px`,
        '--logo-intensity': intensity,
        '--ring-count': config.rings,
        '--data-count': config.dataPoints,
        ...style
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      {showPulse && (
        <div className={styles.backgroundGlow} />
      )}

      {/* Concentric Rings */}
      {showRings && (
        <div className={styles.ringsContainer}>
          {Array.from({ length: config.rings }, (_, i) => (
            <div
              key={`ring-${i}`}
              className={styles.ring}
              style={{
                '--ring-index': i,
                '--ring-delay': `${i * 0.2}s`,
                '--ring-size': `${(config.base * 0.3) + (i * 15)}px`
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Data Points (Binary) */}
      {showData && variant === 'holographic' && (
        <div className={styles.dataPointsContainer}>
          {dataPoints.map((point, i) => (
            <div
              key={`data-${point.id}`}
              className={styles.dataPoint}
              style={{
                '--point-angle': `${point.angle}deg`,
                '--point-radius': `${point.radius}px`,
                '--point-delay': `${i * 0.1}s`,
                '--point-speed': `${2 + point.speed}s`
              } as React.CSSProperties}
            >
              {point.value}
            </div>
          ))}
        </div>
      )}

      {/* Neural Network Lines */}
      {variant === 'neural' && (
        <svg className={styles.neuralNetwork} width={config.base} height={config.base}>
          {Array.from({ length: 6 }, (_, i) => {
            const angle1 = (360 / 6) * i;
            const angle2 = (360 / 6) * ((i + 2) % 6);
            const x1 = (config.base / 2) + Math.cos((angle1 * Math.PI) / 180) * (config.base * 0.3);
            const y1 = (config.base / 2) + Math.sin((angle1 * Math.PI) / 180) * (config.base * 0.3);
            const x2 = (config.base / 2) + Math.cos((angle2 * Math.PI) / 180) * (config.base * 0.3);
            const y2 = (config.base / 2) + Math.sin((angle2 * Math.PI) / 180) * (config.base * 0.3);
            
            return (
              <line
                key={`neural-${i}`}
                className={styles.neuralLine}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                style={{
                  '--neural-delay': `${i * 0.2}s`
                } as React.CSSProperties}
              />
            );
          })}
        </svg>
      )}

      {/* Center Logo */}
      <div className={styles.centerLogo}>
        F
      </div>

      {/* Quantum Particles */}
      {variant === 'quantum' && (
        <div className={styles.quantumParticles}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`particle-${i}`}
              className={styles.quantumParticle}
              style={{
                '--particle-delay': `${i * 0.3}s`,
                '--particle-speed': `${3 + i * 0.5}s`,
                '--particle-radius': `${config.base * 0.25}px`
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Scanning Beam */}
      {variant === 'holographic' && animated && (
        <div className={styles.scanBeam} />
      )}

      {/* Holographic Distortion */}
      {variant === 'holographic' && (
        <div className={styles.holographicDistortion} />
      )}
    </div>
  );
};
