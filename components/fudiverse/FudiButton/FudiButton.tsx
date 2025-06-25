import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './FudiButton.module.css';

type FudiButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'ghost' 
  | 'orange' 
  | 'cyan'
  | 'purple'        // ← NEW: Para AI features
  | 'social-like'   // ← NEW: Para like buttons
  | 'social-save'   // ← NEW: Para save buttons
  | 'chef-kiss'     // ← NEW: Para chef's kiss reaction
  | 'trending'      // ← NEW: Para trending content
  | 'verified'      // ← NEW: Para elementos verificados
  | 'ai-powered'    // ← NEW: Para features con AI
  | 'gradient'      // ← NEW: Para CTAs especiales
  | 'glassmorphic'; // ← NEW: Para overlay buttons

type FudiButtonSize = 'tiny' | 'small' | 'medium' | 'large' | 'xl';

interface FudiButtonProps {
  children: React.ReactNode;
  variant?: FudiButtonVariant;
  size?: FudiButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  
  // ← NEW fudi-flow specific props
  count?: number;           // Para mostrar números (likes, saves, etc.)
  active?: boolean;         // Para estados activos (liked, saved)
  glowEffect?: boolean;     // Para efectos de brillo
  pulseEffect?: boolean;    // Para efectos de pulso
  rippleEffect?: boolean;   // Para efectos de ondas
  loading?: boolean;        // Para estados de carga
  badge?: string | number;  // Para badges/notifications
  gradient?: {             // Para gradientes custom
    from: string;
    to: string;
  };
  socialMetric?: {         // Para métricas sociales
    value: number;
    type: 'likes' | 'saves' | 'shares' | 'comments';
    trending?: boolean;
  };
}

export const FudiButton: React.FC<FudiButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
  iconPosition = 'right',
  
  // New props
  count,
  active = false,
  glowEffect = false,
  pulseEffect = false,
  rippleEffect = false,
  loading = false,
  badge,
  gradient,
  socialMetric
}) => {
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Handle click with ripple effect
  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;

    // Create ripple effect
    if (rippleEffect) {
      const rect = (buttonRef.current as HTMLElement)?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
      }
    }

    onClick?.();
  };

  // Format count numbers
  const formatCount = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const classes = `
    ${styles.fudiButton}
    ${styles[variant]}
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ''}
    ${disabled ? styles.disabled : ''}
    ${loading ? styles.loading : ''}
    ${active ? styles.active : ''}
    ${glowEffect ? styles.glowEffect : ''}
    ${pulseEffect ? styles.pulseEffect : ''}
    ${icon ? styles.hasIcon : ''}
    ${count ? styles.hasCount : ''}
    ${badge ? styles.hasBadge : ''}
    ${socialMetric?.trending ? styles.trending : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner} />
        </div>
      )}

      {/* Left icon */}
      {icon && iconPosition === 'left' && !loading && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      {/* Main content */}
      <span className={styles.text}>
        {children}
        
        {/* Count display */}
        {count !== undefined && (
          <span className={styles.count}>
            {formatCount(count)}
          </span>
        )}
        
        {/* Social metric display */}
        {socialMetric && (
          <span className={styles.socialMetric}>
            {formatCount(socialMetric.value)}
            {socialMetric.trending && (
              <span className={styles.trendingIcon}>🔥</span>
            )}
          </span>
        )}
      </span>
      
      {/* Right icon */}
      {icon && iconPosition === 'right' && !loading && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      {/* Badge */}
      {badge && (
        <span className={styles.badge}>
          {badge}
        </span>
      )}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20
          }}
        />
      ))}
    </>
  );

  // Custom gradient styles
  const customStyles: React.CSSProperties = {
    ...(gradient && {
      background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
      borderColor: gradient.from
    })
  };

  if (href && !disabled && !loading) {
    return (
      <Link 
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href} 
        className={classes}
        style={customStyles}
        onClick={handleClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      type="button"
      style={customStyles}
    >
      {content}
    </button>
  );
};