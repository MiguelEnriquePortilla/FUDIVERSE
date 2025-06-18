import React, { useState } from 'react';
import Link from 'next/link';
import { FudiButton } from '../FudiButton';
import styles from './FudiHeader.module.css';

interface FudiHeaderProps {
  currentPage?: 'home' | 'about' | 'features' | 'pricing' | 'login' | 'register' | 'dashboard';
  showAuthButtons?: boolean;
  className?: string;
}

export const FudiHeader: React.FC<FudiHeaderProps> = ({
  currentPage = 'home',
  showAuthButtons = true,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Inicio', page: 'home' },
    { href: '/about', label: 'Nosotros', page: 'about' },
    { href: '/features', label: 'Features', page: 'features' },
    { href: '/pricing', label: 'Precios', page: 'pricing' },
  ];

  return (
    <header className={`${styles.fudiHeader} ${className}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoText}>FUDI</span>
            <span className={styles.logoAccent}>VERSE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.page}
              href={link.href}
              className={`${styles.navLink} ${
                currentPage === link.page ? styles.navLinkActive : ''
              }`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        {showAuthButtons && (
          <div className={styles.desktopAuth}>
            <FudiButton 
              variant="ghost" 
              size="small" 
              href="/login"
              className={styles.loginButton}
            >
              Iniciar Sesión
            </FudiButton>
            <FudiButton 
              variant="primary" 
              size="small" 
              href="/register"
            >
              Registrarse
            </FudiButton>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            {/* Mobile Navigation */}
            <nav className={styles.mobileNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${
                    currentPage === link.page ? styles.mobileNavLinkActive : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            {showAuthButtons && (
              <div className={styles.mobileAuth}>
                <FudiButton 
                  variant="ghost" 
                  size="medium" 
                  href="/login"
                  fullWidth
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </FudiButton>
                <FudiButton 
                  variant="primary" 
                  size="medium" 
                  href="/register"
                  fullWidth
                  onClick={closeMobileMenu}
                >
                  Registrarse
                </FudiButton>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};