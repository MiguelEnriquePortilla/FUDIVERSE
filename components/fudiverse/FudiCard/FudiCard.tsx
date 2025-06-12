// components/fudiverse/FudiCard/FudiCard.tsx
'use client';

import React from 'react';
import styles from './FudiCard.module.css';

export type FudiCardVariant = 'default' | 'form' | 'modal' | 'dashboard' | 'glow';
export type FudiCardPadding = 'small' | 'medium' | 'large';

interface FudiCardProps {
  children: React.ReactNode;
  variant?: FudiCardVariant;
  padding?: FudiCardPadding;
  animate?: boolean;
  scanEffect?: boolean;
  className?: string;
}

export const FudiCard: React.FC<FudiCardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  animate = false,
  scanEffect = false,
  className = ''
}) => {
  const classes = `
    ${styles.fudiCard} 
    ${styles[variant]} 
    ${styles[`padding-${padding}`]} 
    ${animate ? styles.animate : ''}
    ${className}
  `.trim();

  return (
    <div className={classes}>
      {scanEffect && <div className={styles.scanLine} />}
      <div className={styles.content}>
        {children}
      </div>
      {variant === 'glow' && (
        <>
          <div className={styles.glowOrb1} />
          <div className={styles.glowOrb2} />
        </>
      )}
    </div>
  );
};