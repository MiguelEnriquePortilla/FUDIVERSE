// components/fudiverse/FudiNav/FudiNav.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FudiNav.module.css';

export type FudiNavVariant = 'transparent' | 'solid' | 'glass' | 'minimal';
export type FudiNavPosition = 'fixed' | 'sticky' | 'relative';

interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
  variant?: 'default' | 'cta';
}

interface FudiNavProps {
  variant?: FudiNavVariant;
  position?: FudiNavPosition;
  logo?: {
    src?: string;
    text?: string;
    href?: string;
  };
  links?: NavLink[];
  showLogo?: boolean;
  scrollThreshold?: number;
  onScrollChange?: (isScrolled: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

const defaultLinks: NavLink[] = [
  { label: 'Características', href: '/features' },
  { label: 'Precios', href: '/pricing' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Entrar', href: '/login' },
  { label: 'JOIN_THE_FUDIVERSE', href: '/register', variant: 'cta' }
];

export const FudiNav: React.FC<FudiNavProps> = ({
  variant = 'transparent',
  position = 'fixed',
  logo = { src: '/images/logo.png', text: 'FudiGPT', href: '/' },
  links = defaultLinks,
  showLogo = true,
  scrollThreshold = 50,
  onScrollChange,
  className = '',
  children
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
      onScrollChange?.(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, onScrollChange]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const getNavClass = () => {
    const classes = [
      styles.fudiNav,
      styles[variant],
      styles[position],
      isScrolled ? styles.scrolled : '',
      isMobileMenuOpen ? styles.mobileOpen : '',
      className
    ];
    return classes.filter(Boolean).join(' ');
  };

  return (
    <header className={getNavClass()}>
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo Section */}
          {showLogo && (
            <Link href={logo.href || '/'} className={styles.logoLink}>
              {logo.src && (
                <Image 
                  src={logo.src}
                  alt={logo.text || 'Logo'}
                  width={40}
                  height={40}
                  className={styles.logoImage}
                />
              )}
              {logo.text && (
                <span className={styles.logoText}>{logo.text}</span>
              )}
            </Link>
          )}

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  link.variant === 'cta' ? styles.navCta : ''
                } ${link.highlight ? styles.highlight : ''}`}
              >
                {link.variant === 'cta' ? (
                  <>
                    <span className={styles.ctaGlow}></span>
                    <span className={styles.ctaText}>{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Custom Children (for adding extra elements) */}
        {children && (
          <div className={styles.navExtra}>
            {children}
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={styles.mobileMenu}>
        <div className={styles.mobileMenuContent}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${
                link.variant === 'cta' ? styles.mobileCta : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};