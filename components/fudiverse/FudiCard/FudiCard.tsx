'use client';

import React from 'react';
import styles from './FudiCard.module.css';

export type FudiCardVariant = 'chat' | 'document' | 'orange' | 'cyan' | 'ghost';
export type FudiCardPadding = 'small' | 'medium' | 'large';

interface FudiCardProps {
  children: React.ReactNode;
  variant?: FudiCardVariant;
  padding?: FudiCardPadding;
  animate?: boolean;
  className?: string;
}

export const FudiCard: React.FC<FudiCardProps> = ({
  children,
  variant = 'chat',
  padding = 'medium',
  animate = false,
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
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};