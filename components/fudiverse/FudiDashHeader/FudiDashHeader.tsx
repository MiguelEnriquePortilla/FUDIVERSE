import React, { useState } from 'react';
import Link from 'next/link';
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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className={`fudi-dash-header ${className}`}>
      <div className="header-container">
        
        {/* Logo */}
        <Link href="/dashboard" className="dash-logo">
          <span className="logo-text">FUDI</span>
          <span className="logo-accent">VERSE</span>
        </Link>

        {/* Mobile Menu Trigger */}
        <button 
          className="mobile-menu-trigger"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        
        {/* Conversations Dropdown - Solo en Chat y Desktop */}
        {currentModule === 'chat' && (
          <div className="conversations-dropdown">
            <button 
              className="conversations-trigger"
              onClick={() => setIsConversationsOpen(!isConversationsOpen)}
              aria-expanded={isConversationsOpen}
              aria-haspopup="true"
              aria-label="Abrir menú de conversaciones"
            >
              <MessageSquare size={16} />
              <span>Conversaciones</span>
              <span className="conversations-count">{conversations.length}</span>
              <ChevronDown size={14} />
            </button>

            {isConversationsOpen && (
              <div className="conversations-panel" role="menu">
                {/* New Chat Button */}
                <button 
                  className="dropdown-new-chat"
                  onClick={handleNewConversation}
                  role="menuitem"
                  aria-label="Crear nueva conversación"
                >
                  <Plus size={16} />
                  Nueva Conversación
                </button>

                {/* Conversations List */}
                <div className="dropdown-conversations">
                  {conversations.length === 0 ? (
                    <div className="dropdown-empty">
                      <p>No hay conversaciones aún</p>
                      <p className="dropdown-empty-subtitle">Inicia tu primera conversación</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        className="dropdown-conversation"
                        onClick={() => handleSwitchConversation(conversation.id)}
                        role="menuitem"
                        aria-label={`Cambiar a conversación: ${conversation.title}`}
                      >
                        <div className="dropdown-conversation-content">
                          <h3 className="dropdown-conversation-title">{conversation.title}</h3>
                          <p className="dropdown-conversation-time">
                            {formatDate(conversation.timestamp)}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* User Info */}
                <div className="dropdown-user">
                  <div className="dropdown-user-info">
                    <div className="dropdown-user-avatar">
                      <User size={16} />
                    </div>
                    <div className="dropdown-user-details">
                      <div className="dropdown-user-name">{userName}</div>
                      <div className="dropdown-user-restaurant">{restaurantName}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desktop Navigation - Solo 2 módulos */}
        <nav className="desktop-nav" role="navigation" aria-label="Navegación principal">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = currentModule === module.module;
            
            return (
              <Link
                key={module.module}
                href={module.href}
                className={`nav-link ${isActive ? 'nav-active' : ''}`}
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
        <div className="header-right">
          {/* Restaurant Name */}
          <div className="restaurant-badge" title={restaurantName}>
            {restaurantName}
          </div>

          {/* Logout Button */}
          <button 
            className="logout-button"
            onClick={handleLogout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-panel">
          {/* Mobile Menu Header */}
          <div className="mobile-menu-header">
            <Link href="/dashboard" className="dash-logo" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="logo-text">FUDI</span>
              <span className="logo-accent">VERSE</span>
            </Link>
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="mobile-menu-content">
            
            {/* Navigation Section */}
            <div className="mobile-nav-section">
              <div className="mobile-nav-title">Navegación</div>
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = currentModule === module.module;
                
                return (
                  <Link
                    key={module.module}
                    href={module.href}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{module.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Conversations Section - Solo en Chat */}
            {currentModule === 'chat' && (
              <div className="mobile-conversations-section">
                <div className="mobile-nav-title">Conversaciones</div>
                
                <button 
                  className="mobile-new-chat"
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
                        className="mobile-conversation-item"
                        onClick={() => handleSwitchConversation(conversation.id)}
                      >
                        <div className="mobile-conversation-title">{conversation.title}</div>
                        <div className="mobile-conversation-time">
                          {formatDate(conversation.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Footer */}
          <div className="mobile-menu-footer">
            <div className="mobile-user-info">
              <div className="mobile-user-avatar">
                <User size={20} />
              </div>
              <div className="mobile-user-details">
                <div className="mobile-user-name">{userName}</div>
                <div className="mobile-user-restaurant">{restaurantName}</div>
              </div>
            </div>
            
            <button 
              className="mobile-logout-button"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close - Desktop Conversations */}
      {isConversationsOpen && (
        <div 
          className="dropdown-overlay"
          onClick={() => setIsConversationsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};