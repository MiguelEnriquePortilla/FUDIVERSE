import React from 'react';
import Link from 'next/link';
import styles from './FudiButton.module.css';

type FudiButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type FudiButtonSize = 'small' | 'medium' | 'large';

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
  iconPosition = 'right'
}) => {
  const classes = `
    ${styles.fudiButton}
    ${styles[variant]}
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ''}
    ${disabled ? styles.disabled : ''}
    ${icon ? styles.hasIcon : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span className={styles.text}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );
};