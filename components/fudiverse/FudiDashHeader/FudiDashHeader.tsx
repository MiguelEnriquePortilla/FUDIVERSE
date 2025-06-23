import React, { useState } from 'react';
import Link from 'next/link';
import styles from './FudiDashHeader.module.css';
import { 
  Brain, BarChart3, MessageSquare, User, LogOut, 
  Menu, X, ChevronDown, Plus
} from 'lucide-react';

interface FudiDashHeaderProps {
  currentModule?: 'chat' | 'board';
  userName?: string;
  restaurantName?: string;
  conversations?: Array<{id: string, title: string, timestamp: Date}>;
  onLogout?: () => void;
  onNewConversation?: () => void;
  onSwitchConversation?: (id: string) => void;
  className?: string;
}

export const FudiDashHeader: React.FC<FudiDashHeaderProps> = ({
  currentModule = 'chat',
  userName = 'Usuario',
  restaurantName = 'Mi Restaurante',
  conversations = [],
  onLogout,
  onNewConversation,
  onSwitchConversation,
  className = ''
}) => {
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Solo fudiGPT y fudiBOARD
  const modules = [
    { href: '/dashboard/chat', label: 'fudiGPT', module: 'chat', icon: Brain },
    { href: '/dashboard/board', label: 'fudiBOARD', module: 'board', icon: BarChart3 },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsConversationsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNewConversation = () => {
    if (onNewConversation) {
      onNewConversation();
    }
    setIsConversationsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSwitchConversation = (id: string) => {
    if (onSwitchConversation) {
      onSwitchConversation(id);
    }
    setIsConversationsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className={`${styles.fudiDashHeader} ${className}`}>
      <div className={styles.container}>
        
        {/* Logo */}
        <Link href="/dashboard" className={styles.logo}>
          <span className={styles.logoText}>FUDI</span>
          <span className={styles.logoAccent}>VERSE</span>
        </Link>

        {/* Conversations Dropdown - Solo en Chat y Desktop */}
        {currentModule === 'chat' && (
          <div className={styles.conversationsDropdown}>
            <button 
              className={styles.conversationsTrigger}
              onClick={() => setIsConversationsOpen(!isConversationsOpen)}
              aria-expanded={isConversationsOpen}
              aria-haspopup="true"
              aria-label="Abrir menú de conversaciones"
            >
              <MessageSquare size={16} />
              <span>Conversaciones</span>
              <span className={styles.conversationsCount}>{conversations.length}</span>
              <ChevronDown size={14} />
            </button>

            {isConversationsOpen && (
              <div className={styles.conversationsPanel} role="menu">
                {/* New Chat Button */}
                <button 
                  className={styles.dropdownNewChat}
                  onClick={handleNewConversation}
                  role="menuitem"
                  aria-label="Crear nueva conversación"
                >
                  <Plus size={16} />
                  Nueva Conversación
                </button>

                {/* Conversations List */}
                <div className={styles.dropdownConversations}>
                  {conversations.length === 0 ? (
                    <div className={styles.dropdownEmpty}>
                      <p>No hay conversaciones aún</p>
                      <p className={styles.dropdownEmptySubtitle}>Inicia tu primera conversación</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        className={styles.dropdownConversation}
                        onClick={() => handleSwitchConversation(conversation.id)}
                        role="menuitem"
                        aria-label={`Cambiar a conversación: ${conversation.title}`}
                      >
                        <div className={styles.dropdownConversationContent}>
                          <h3 className={styles.dropdownConversationTitle}>{conversation.title}</h3>
                          <p className={styles.dropdownConversationTime}>
                            {formatDate(conversation.timestamp)}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* User Info */}
                <div className={styles.dropdownUser}>
                  <div className={styles.dropdownUserInfo}>
                    <div className={styles.dropdownUserAvatar}>
                      <User size={16} />
                    </div>
                    <div className={styles.dropdownUserDetails}>
                      <div className={styles.dropdownUserName}>{userName}</div>
                      <div className={styles.dropdownUserRestaurant}>{restaurantName}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desktop Navigation - Solo 2 módulos */}
        <nav className={styles.desktopNav} role="navigation" aria-label="Navegación principal">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = currentModule === module.module;
            
            return (
              <Link
                key={module.module}
                href={module.href}
                className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Ir a ${module.label}`}
              >
                <Icon size={16} />
                <span>{module.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section - Solo Desktop */}
        <div className={styles.headerRight}>
          {/* Restaurant Name */}
          <div className={styles.restaurantBadge} title={restaurantName}>
            {restaurantName}
          </div>

          {/* Logout Button */}
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
            <span>Salir</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuButton} ${
            isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''
          }`}
          onClick={toggleMobileMenu}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            
            {/* Mobile Navigation */}
            <div className={styles.mobileNav}>
              <div className={styles.mobileNavTitle}>Navegación</div>
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = currentModule === module.module;
                
                return (
                  <Link
                    key={module.module}
                    href={module.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavActive : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={20} />
                    <span>{module.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Conversations Section - Solo en Chat */}
            {currentModule === 'chat' && (
              <div className={styles.mobileConversationsSection}>
                <div className={styles.mobileNavTitle}>Conversaciones</div>
                
                <button 
                  className={styles.mobileNewChat}
                  onClick={handleNewConversation}
                >
                  <Plus size={20} />
                  Nueva Conversación
                </button>

                {conversations.length > 0 && (
                  <div>
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={styles.mobileConversationItem}
                        onClick={() => handleSwitchConversation(conversation.id)}
                      >
                        <div className={styles.mobileConversationTitle}>{conversation.title}</div>
                        <div className={styles.mobileConversationTime}>
                          {formatDate(conversation.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Footer */}
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileUserAvatar}>
                  <User size={20} />
                </div>
                <div className={styles.mobileUserDetails}>
                  <div className={styles.mobileUserName}>{userName}</div>
                  <div className={styles.mobileUserRestaurant}>{restaurantName}</div>
                </div>
              </div>
              
              <button 
                className={styles.mobileLogoutButton}
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close - Desktop Conversations */}
      {isConversationsOpen && (
        <div 
          className={styles.dropdownOverlay}
          onClick={() => setIsConversationsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};