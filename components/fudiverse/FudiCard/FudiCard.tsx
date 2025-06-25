'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './FudiCard.module.css';

export type FudiCardVariant = 
  | 'chat' 
  | 'document' 
  | 'orange' 
  | 'cyan' 
  | 'ghost'
  | 'flow'          // ← NEW: Para posts de fudi-flow
  | 'composer'      // ← NEW: Para create post
  | 'profile'       // ← NEW: Para chef profiles
  | 'trending'      // ← NEW: Para trending topics
  | 'ai-insight'    // ← NEW: Para AI recommendations
  | 'story'         // ← NEW: Para stories/highlights
  | 'recipe';       // ← NEW: Para recipe cards

export type FudiCardPadding = 'none' | 'small' | 'medium' | 'large';
export type FudiCardHoverAnimation = 'none' | 'lift' | 'glow' | 'pulse' | 'scale';

interface FudiCardProps {
  children: React.ReactNode;
  variant?: FudiCardVariant;
  padding?: FudiCardPadding;
  animate?: boolean;
  hoverAnimation?: FudiCardHoverAnimation;
  glassEffect?: boolean;
  borderGlow?: boolean;
  glowColor?: string;
  interactive?: boolean;
  trending?: boolean;
  verified?: boolean;
  className?: string;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

export const FudiCard: React.FC<FudiCardProps> = ({
  children,
  variant = 'chat',
  padding = 'medium',
  animate = false,
  hoverAnimation = 'none',
  glassEffect = false,
  borderGlow = false,
  glowColor = '#ff6b35',
  interactive = false,
  trending = false,
  verified = false,
  className = '',
  onClick,
  onHover
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  // Handle click ripple effect for interactive cards
  const handleClick = (e: React.MouseEvent) => {
    if (!interactive && !onClick) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  // Auto-remove old ripples
  useEffect(() => {
    if (ripples.length > 5) {
      setRipples(prev => prev.slice(-3));
    }
  }, [ripples]);

  const classes = `
    ${styles.fudiCard} 
    ${styles[variant]} 
    ${styles[`padding-${padding}`]} 
    ${animate ? styles.animate : ''}
    ${hoverAnimation !== 'none' ? styles[`hover-${hoverAnimation}`] : ''}
    ${glassEffect ? styles.glassEffect : ''}
    ${borderGlow ? styles.borderGlow : ''}
    ${interactive ? styles.interactive : ''}
    ${trending ? styles.trending : ''}
    ${verified ? styles.verified : ''}
    ${isHovered ? styles.hovered : ''}
    ${className}
  `.trim();

  return (
    <div 
      ref={cardRef}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        '--glow-color': glowColor,
        cursor: (interactive || onClick) ? 'pointer' : 'default'
      } as React.CSSProperties}
    >
      {/* Glow border effect */}
      {borderGlow && (
        <div className={styles.glowBorder} style={{ '--glow-color': glowColor } as React.CSSProperties} />
      )}

      {/* Trending indicator */}
      {trending && (
        <div className={styles.trendingIndicator}>
          <div className={styles.trendingIcon}>🔥</div>
          <span>TRENDING</span>
        </div>
      )}

      {/* Verified badge */}
      {verified && (
        <div className={styles.verifiedBadge}>
          <div className={styles.verifiedIcon}>✓</div>
        </div>
      )}

      {/* AI Enhancement indicator for ai-insight variant */}
      {variant === 'ai-insight' && (
        <div className={styles.aiIndicator}>
          <div className={styles.aiIcon}>🧠</div>
          <span>AI</span>
        </div>
      )}

      {/* Main content */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Ripple effects for interactive cards */}
      {(interactive || onClick) && ripples.map(ripple => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            '--ripple-color': glowColor
          } as React.CSSProperties}
        />
      ))}

      {/* Glass effect overlay */}
      {glassEffect && <div className={styles.glassOverlay} />}
    </div>
  );
};