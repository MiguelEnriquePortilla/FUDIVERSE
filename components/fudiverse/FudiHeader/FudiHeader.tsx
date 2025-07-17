'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './FudiHeader.module.css';
import { 
  Brain, BarChart3, Vault, Users, ShoppingCart,
  Bell, Settings, User, LogOut, Menu, X
} from 'lucide-react';

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

  const navLinks = [
    { href: '/', label: 'Inicio', page: 'home' },
    { href: '/about', label: 'Nosotros', page: 'about' },
    { href: '/features', label: 'Features', page: 'features' },
    { href: '/pricing', label: 'Precios', page: 'pricing' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.fudiHeader} ${className}`}>
      <div className={styles.container}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>FUDI</span>
          <span className={styles.logoAccent}>GPT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            
            return (
              <Link
                key={link.page}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={styles.userSection}>
          
          {/* Desktop Auth Buttons - AHORA CON NAVEGACIÓN */}
          {showAuthButtons && (
            <div className={styles.desktopAuth}>
              <Link href="/login" className={styles.loginButton}>
                Iniciar Sesión
              </Link>
              <Link href="/register" className={styles.registerButton}>
                Registrarse
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} ${
              isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''
            }`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            
            {/* Mobile Navigation */}
            <nav className={styles.mobileNav}>
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                
                return (
                  <Link
                    key={link.page}
                    href={link.href}
                    className={`${styles.mobileNavLink} ${
                      isActive ? styles.mobileNavActive : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Auth Buttons - AHORA CON NAVEGACIÓN */}
            {showAuthButtons && (
              <div className={styles.mobileActions}>
                <Link 
                  href="/login" 
                  className={styles.mobileAction}
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/register" 
                  className={`${styles.mobileAction} ${styles.mobileRegister}`}
                  onClick={closeMobileMenu}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};