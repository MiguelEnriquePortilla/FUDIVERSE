'use client';

import React from 'react';
import styles from './FudiBackground.module.css';

export type FudiBackgroundVariant = 'minimal' | 'gradient' | 'claude';
export type FudiBackgroundTheme = 'claude' | 'business' | 'dark';

interface FudiBackgroundProps {
  variant?: FudiBackgroundVariant;
  theme?: FudiBackgroundTheme;
  opacity?: number;
  fixed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FudiBackground: React.FC<FudiBackgroundProps> = ({
  variant = 'claude',
  theme = 'claude',
  opacity = 1,
  fixed = true,
  className = '',
  children
}) => {
  return (
    <div 
      className={`${styles.fudiBackground} ${styles[variant]} ${styles[theme]} ${fixed ? styles.fixed : ''} ${className}`}
      style={{ opacity }}
    >
      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};