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
  };

  return (
    <header className={`fudi-dash-header ${className}`}>
      <div className="header-container">
        
        {/* Conversations Dropdown - Solo en Chat */}
        {currentModule === 'chat' && (
          <div className="conversations-dropdown">
            <button 
              className="conversations-trigger"
              onClick={() => setIsConversationsOpen(!isConversationsOpen)}
            >
              <MessageSquare size={16} />
              <span>Conversaciones</span>
              <span className="conversations-count">{conversations.length}</span>
              <ChevronDown size={14} />
            </button>

            {isConversationsOpen && (
              <div className="conversations-panel">
                {/* New Chat Button */}
                <button 
                  className="dropdown-new-chat"
                  onClick={() => {
                    onNewConversation?.();
                    setIsConversationsOpen(false);
                  }}
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
                        onClick={() => {
                          onSwitchConversation?.(conversation.id);
                          setIsConversationsOpen(false);
                        }}
                      >
                        <div className="dropdown-conversation-content">
                          <h3 className="dropdown-conversation-title">{conversation.title}</h3>
                          <p className="dropdown-conversation-time">
                            {conversation.timestamp.toLocaleDateString()}
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

        {/* Logo */}
        <Link href="/dashboard" className="dash-logo">
          <span className="logo-text">FUDI</span>
          <span className="logo-accent">VERSE</span>
        </Link>

        {/* Desktop Navigation - Solo 2 módulos */}
        <nav className="desktop-nav">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = currentModule === module.module;
            
            return (
              <Link
                key={module.module}
                href={module.href}
                className={`nav-link ${isActive ? 'nav-active' : ''}`}
              >
                <Icon size={16} />
                <span>{module.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="header-right">
          {/* Restaurant Name */}
          <div className="restaurant-badge">
            {restaurantName}
          </div>

          {/* Logout Button */}
          <button 
            className="logout-button"
            onClick={handleLogout}
            title="Cerrar sesión"
          >
            <LogOut size={16} />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Click outside to close */}
      {isConversationsOpen && (
        <div 
          className="dropdown-overlay"
          onClick={() => setIsConversationsOpen(false)}
        />
      )}
    </header>
  );
};