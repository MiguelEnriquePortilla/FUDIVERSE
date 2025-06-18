import React, { useState } from 'react';
import Link from 'next/link';
import { FudiButton } from '../FudiButton';
import styles from './FudiDashHeader.module.css';
import { 
  Brain, BarChart3, Vault, Users, ShoppingCart,
  Bell, Settings, User, LogOut, Menu, X,
  MessageSquare, Crown
} from 'lucide-react';

interface FudiDashHeaderProps {
  currentModule?: 'chat' | 'board' | 'flow' | 'vault' | 'mart';
  userName?: string;
  userPlan?: 'basic' | 'pro' | 'max' | 'enterprise';
  notifications?: number;
  className?: string;
}

export const FudiDashHeader: React.FC<FudiDashHeaderProps> = ({
  currentModule = 'chat',
  userName = 'Mikelon',
  userPlan = 'pro',
  notifications = 0,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const dashboardModules = [
    { 
      href: '/dashboard/chat', 
      label: 'fudiGPT', 
      module: 'chat', 
      icon: Brain,
      description: 'Asistente IA'
    },
    { 
      href: '/dashboard/board', 
      label: 'fudiBOARD', 
      module: 'board', 
      icon: BarChart3,
      description: 'Analytics'
    },
    { 
      href: '/dashboard/flow', 
      label: 'fudiFLOW', 
      module: 'flow', 
      icon: Users,
      description: 'Networking'
    },
    { 
      href: '/dashboard/vault', 
      label: 'fudiVAULT', 
      module: 'vault', 
      icon: Vault,
      description: 'Documentos'
    },
    { 
      href: '/dashboard/mart', 
      label: 'fudiMART', 
      module: 'mart', 
      icon: ShoppingCart,
      description: 'Marketplace'
    },
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return '#10b981';
      case 'pro': return '#3b82f6';
      case 'max': return '#fbbf24';
      case 'enterprise': return '#8b5cf6';
      default: return '#3b82f6';
    }
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'basic': return 'BÁSICO';
      case 'pro': return 'PRO';
      case 'max': return 'MAX';
      case 'enterprise': return 'ENTERPRISE';
      default: return 'PRO';
    }
  };

  return (
    <header className={`${styles.fudiDashHeader} ${className}`}>
      <div className={styles.container}>
        
        {/* Logo + Current Module */}
        <div className={styles.brandSection}>
          <Link href="/dashboard" className={styles.logoLink}>
            <span className={styles.logoText}>FUDI</span>
            <span className={styles.logoAccent}>VERSE</span>
          </Link>
          
          {/* Current Module Indicator */}
          <div className={styles.currentModule}>
            <div className={styles.moduleIcon}>
              {currentModule === 'chat' && <Brain size={20} />}
              {currentModule === 'board' && <BarChart3 size={20} />}
              {currentModule === 'flow' && <Users size={20} />}
              {currentModule === 'vault' && <Vault size={20} />}
              {currentModule === 'mart' && <ShoppingCart size={20} />}
            </div>
            <span className={styles.moduleName}>
              {dashboardModules.find(m => m.module === currentModule)?.label}
            </span>
          </div>
        </div>

        {/* Desktop Module Navigation */}
        <nav className={styles.desktopNav}>
          {dashboardModules.map((module) => {
            const Icon = module.icon;
            const isActive = currentModule === module.module;
            
            return (
              <Link
                key={module.module}
                href={module.href}
                className={`${styles.moduleLink} ${isActive ? styles.moduleActive : ''}`}
                onClick={closeMobileMenu}
              >
                <Icon size={18} />
                <span className={styles.moduleLabel}>{module.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={styles.userSection}>
          
          {/* Notifications */}
          <button className={styles.notificationBtn}>
            <Bell size={20} />
            {notifications > 0 && (
              <span className={styles.notificationBadge}>{notifications}</span>
            )}
          </button>

          {/* User Menu */}
          <div className={styles.userMenu}>
            <button 
              className={styles.userButton}
              onClick={toggleUserMenu}
            >
              <div className={styles.userAvatar}>
                <User size={18} />
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{userName}</span>
                <span 
                  className={styles.userPlan}
                  style={{ '--plan-color': getPlanColor(userPlan) } as React.CSSProperties}
                >
                  {getPlanLabel(userPlan)}
                </span>
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                <Link href="/dashboard/settings" className={styles.dropdownItem}>
                  <Settings size={16} />
                  <span>Configuración</span>
                </Link>
                <Link href="/pricing" className={styles.dropdownItem}>
                  <Crown size={16} />
                  <span>Upgrade Plan</span>
                </Link>
                <div className={styles.dropdownDivider}></div>
                <button className={`${styles.dropdownItem} ${styles.logoutItem}`}>
                  <LogOut size={16} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} ${
              isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            
            {/* Mobile User Info */}
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserAvatar}>
                <User size={24} />
              </div>
              <div className={styles.mobileUserDetails}>
                <span className={styles.mobileUserName}>{userName}</span>
                <span 
                  className={styles.mobileUserPlan}
                  style={{ '--plan-color': getPlanColor(userPlan) } as React.CSSProperties}
                >
                  Plan {getPlanLabel(userPlan)}
                </span>
              </div>
            </div>

            {/* Mobile Module Navigation */}
            <nav className={styles.mobileNav}>
              {dashboardModules.map((module) => {
                const Icon = module.icon;
                const isActive = currentModule === module.module;
                
                return (
                  <Link
                    key={module.module}
                    href={module.href}
                    className={`${styles.mobileModuleLink} ${
                      isActive ? styles.mobileModuleActive : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={20} />
                    <div className={styles.mobileModuleInfo}>
                      <span className={styles.mobileModuleLabel}>{module.label}</span>
                      <span className={styles.mobileModuleDesc}>{module.description}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            <div className={styles.mobileActions}>
              <Link href="/dashboard/settings" className={styles.mobileAction}>
                <Settings size={18} />
                <span>Configuración</span>
              </Link>
              <Link href="/pricing" className={styles.mobileAction}>
                <Crown size={18} />
                <span>Upgrade Plan</span>
              </Link>
              <button className={`${styles.mobileAction} ${styles.mobileLogout}`}>
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};