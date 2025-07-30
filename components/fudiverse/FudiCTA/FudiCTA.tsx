// @/components/fudiverse/FudiCTA/FudiCTA.tsx
'use client';

import React from 'react';
import '@/components/fudiverse/FudiCTA/FudiCTA.css';

export interface FudiCTAProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  size?: 'large' | 'medium' | 'small';
  showText?: boolean;
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const FudiCTA: React.FC<FudiCTAProps> = ({
  variant = 'vertical',
  size = 'large',
  showText = true,
  text = 'Análisis Completo con FUDI',
  onClick = () => window.location.href = '/dashboard/chat',
  className = ''
}) => {
  
  const getLogoSize = () => {
    if (variant === 'compact') return 32;
    
    switch (size) {
      case 'large': return 300;
      case 'medium': return 200;
      case 'small': return 150;
      default: return 300;
    }
  };

  const containerClass = `fudi-cta-container fudi-cta-${variant} fudi-cta-${size} ${className}`;

  if (variant === 'compact') {
    return (
      <button className={containerClass} onClick={onClick}>
        <img 
          src="/favicon.ico" 
          alt="FUDI"
          className="fudi-cta-logo-compact"
          style={{ width: getLogoSize(), height: getLogoSize() }}
        />
        {showText && <span className="fudi-cta-text-compact">{text}</span>}
      </button>
    );
  }

  return (
    <div className={containerClass}>
      <img 
        src="/favicon.ico" 
        alt="FUDI"
        className="fudi-cta-logo"
        style={{ width: getLogoSize(), height: getLogoSize() }}
      />
      {showText && (
        <span className="fudi-cta-text">{text}</span>
      )}
      <button 
        className="fudi-cta-click-area"
        onClick={onClick}
        aria-label={text}
      />
    </div>
  );
};