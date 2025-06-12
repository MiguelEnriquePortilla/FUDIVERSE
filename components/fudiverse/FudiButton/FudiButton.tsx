// components/fudiverse/FudiButton/FudiButton.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './FudiButton.module.css';

export type FudiButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quantum';
export type FudiButtonSize = 'small' | 'medium' | 'large';

interface FudiButtonProps {
  children: React.ReactNode;
  variant?: FudiButtonVariant;
  size?: FudiButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const FudiButton: React.FC<FudiButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  className = ''
}) => {
  const classes = `
    ${styles.fudiButton} 
    ${styles[variant]} 
    ${styles[size]} 
    ${fullWidth ? styles.fullWidth : ''} 
    ${disabled ? styles.disabled : ''}
    ${className}
  `.trim();

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        <span className={styles.content}>{children}</span>
        {variant === 'quantum' && <span className={styles.quantumEffect} />}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.content}>{children}</span>
      {variant === 'quantum' && <span className={styles.quantumEffect} />}
    </button>
  );
};