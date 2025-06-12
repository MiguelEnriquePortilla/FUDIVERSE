// components/fudiverse/FudiHeroText/index.tsx
import React from 'react';
import styles from './FudiHeroText.module.css';

interface FudiHeroTextProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const FudiHeroText: React.FC<FudiHeroTextProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`${styles.heroTextContainer} ${className}`}>
      <h1 className={styles.heroTitle}>
        {title}
      </h1>
      {subtitle && (
        <p className={styles.heroSubtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
};