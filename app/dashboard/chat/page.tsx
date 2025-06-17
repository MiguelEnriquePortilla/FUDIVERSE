'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import '@/styles/pages/chat.css';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  // 🔒 CRITICAL STATE - PRESERVED EXACTLY
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fudiPersonality, setFudiPersonality] = useState<'estratega' | 'motivador' | 'mentor' | 'casual'>('casual');
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // ✅ CHANGED: Dropdown State (instead of sidebar)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Easter eggs and effects
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // 🔒 CRITICAL USER DATA - PRESERVED EXACTLY
  const [userData, setUserData] = useState({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
  });

  // 🔒 CRITICAL DATA LOADING - PRESERVED EXACTLY
  useEffect(() => {
    const token = localStorage.getItem('fudi_token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        setUserData({
          restaurantName: decoded.restaurantName || 'Mi Restaurante',
          ownerName: decoded.ownerName || 'Usuario',
          restaurantId: decoded.restaurantId || '13207c90-2ea6-4aa0-bfac-349753d24ea4'
        });
        
        // Cargar conversaciones existentes
        loadConversations(decoded.restaurantId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // ✅ NEW: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 🔒 CRITICAL API FUNCTION - PRESERVED EXACTLY
  const loadConversations = async (restaurantId: string) => {
    try {
      const response = await fudiAPI.conversations.getAll(restaurantId);
      if (response.success && response.conversations) {
        const formattedConversations = response.conversations.map((conv: any) => ({
          id: conv.id,
          title: conv.title || 'Nueva conversación',
          lastMessage: new Date(conv.last_activity).toLocaleString(),
          timestamp: new Date(conv.last_activity)
        }));
        setConversations(formattedConversations);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  // ✅ FIXED: Logout Function - va a página principal
  const handleLogout = () => {
    fudiAPI.logout();
    window.location.href = '/';
  };

  // ✅ UPDATED: Switch Conversation with dropdown close
  const switchConversation = async (conversationId: string) => {
    setCurrentConversationId(conversationId);
    setMessages([]);
    setShowWelcome(false);
    setDropdownOpen(false); // Close dropdown after selection

    // Load real messages from this conversation
    try {
      const response = await fudiAPI.conversations.getMessages(conversationId);
      if (response.success && response.messages) {
        const formattedMessages = response.messages.map((msg: any, index: number) => ({
          id: index + 1,
          type: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Quick actions - Business Casual Style
  const quickActions = [
    { text: '¿Cómo van mis ventas de hoy?', neural: 'revenue' },
    { text: '¿Cuál es mi utilidad esta semana?', neural: 'profit' },
    { text: '¿Cuánto gasté este mes?', neural: 'expenses' },
    { text: '¿Qué puedo mejorar en mi restaurante?', neural: 'growth' }
  ];

  // Personalidades de FUDI
  const personalities = {
    estratega: { icon: '🎯', label: 'Estratega', desc: 'Análisis profundo y datos' },
    motivador: { icon: '🔥', label: 'Motivador', desc: '¡Vamos a romperla!' },
    mentor: { icon: '🧠', label: 'Mentor', desc: 'Consejos y educación' },
    casual: { icon: '', label: userData.restaurantName, desc: '' }
  };

  // Saludo dinámico business casual
  const getGreeting = () => {
    const hour = new Date().getHours();
    const base = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    
    // Saludos especiales según hora - Business Style
    if (hour >= 2 && hour < 5) return '🦉 Trabajando tarde';
    if (hour >= 5 && hour < 7) return '🌅 Madrugador';
    if (hour === 13) return '🍽️ Hora del almuerzo';
    
    return base;
  };

  // Efectos de sonido
  const playSound = (type: 'send' | 'receive' | 'typing') => {
    if (type === 'send') {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    setShowWelcome(false);
    
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Easter eggs effects
  useEffect(() => {
    if (inputMessage.toLowerCase().includes('fudiverse')) {
      // Activar particles
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const particle = {
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          };
          setParticles(prev => [...prev, particle]);
          
          setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }, i * 150);
        }, i * 150);
      }
    }
  }, [inputMessage]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔒 CRITICAL CONVERSATION FUNCTIONS - PRESERVED EXACTLY
  const startNewConversation = async () => {
    try {
      const response = await fudiAPI.conversations.create(
        userData.restaurantId,
        'Nueva conversación'
      );
      
      if (response.success && response.conversation) {
        const newConversation: Conversation = {
          id: response.conversation.id,
          title: response.conversation.title,
          lastMessage: 'Ahora',
          timestamp: new Date()
        };
        
        setConversations([newConversation, ...conversations]);
        setCurrentConversationId(response.conversation.id);
        setMessages([]);
        setShowWelcome(true);
        setInputMessage('');
        setDropdownOpen(false); // Close dropdown after creating
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // Manejar quick action
  const handleQuickAction = (action: any) => {
    setInputMessage(action.text);
    setShowWelcome(false);
    inputRef.current?.focus();
    
    // Feedback
    setGlowIntensity(1);
    setTimeout(() => setGlowIntensity(0), 1000);
  };

  // 🔒 CRITICAL SEND MESSAGE FUNCTION - PRESERVED EXACTLY
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setShowWelcome(false);
    const startTime = Date.now();

    // Si no hay conversación activa, crear una
    let conversationId = currentConversationId;
    if (!conversationId) {
      const response = await fudiAPI.conversations.create(
        userData.restaurantId,
        inputMessage.substring(0, 50) + '...',
        inputMessage
      );
      if (response.success && response.conversation) {
        conversationId = response.conversation.id;
        setCurrentConversationId(conversationId);
        
        const newConversation: Conversation = {
          id: response.conversation.id,
          title: response.conversation.title,
          lastMessage: 'Ahora',
          timestamp: new Date()
        };
        setConversations([newConversation, ...conversations]);
      }
    }

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    const userMessageContent = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    // Play send sound
    playSound('send');

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      // 🔒 CRITICAL API CALL - PRESERVED EXACTLY
      const response = await fudiAPI.chat(
        userData.restaurantId,
        userMessageContent
      );

      if (response.success) {
        const responseTime = Date.now() - startTime;
        const aiMessage: Message = {
          id: messages.length + 2,
          type: 'assistant',
          content: response.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);

        // 🔒 CRITICAL SUPABASE SAVE - PRESERVED EXACTLY
        if (conversationId) {
          await fudiAPI.conversations.saveInteraction({
            restaurantId: userData.restaurantId,
            conversationId: conversationId,
            userMessage: userMessageContent,
            fudiResponse: response.response,
            responseTime: responseTime / 1000
          });

          // Actualizar título de la conversación si es la primera
          if (messages.length === 0) {
            await fudiAPI.conversations.update(conversationId, {
              title: userMessageContent.substring(0, 50) + '...'
            });
            
            const updatedConversations = conversations.map(conv => 
              conv.id === conversationId 
                ? { ...conv, title: userMessageContent.substring(0, 50) + '...', lastMessage: 'Ahora' }
                : conv
            );
            setConversations(updatedConversations);
          }
        }
        
        playSound('receive');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Ups, tuve un problema. ¿Puedes intentar de nuevo?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Navigation functions
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="chat-container">
      {/* Single Clean Background */}
      <FudiBackground 
        variant="premium"
        theme="claude"
        intensity={0.15}
        opacity={1}
        fixed={true}
      />

      {/* Header - Enhanced with Conversations Dropdown */}
      <header className="chat-header">
        
        <div className="header-content">

            <div className="fudi-logo">
              <img 
                src="/images/logo.png" 
                alt="FUDI Logo" 
                className="fudi-header-logo"
              />
              <div>
                <div className="fudi-title">fudiGPT</div>
                <div className="fudi-subtitle">Tu asistente inteligente</div>
              </div>
            </div>

          <div className="header-left">
            
             {/* ✅ NEW: Conversations Dropdown Trigger */}
            <div className="conversations-dropdown" ref={dropdownRef}>
              <button 
                className="conversations-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Conversaciones</span>
                <span className="conversations-count">({conversations.length})</span>
                <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ✅ NEW: Conversations Dropdown Panel */}
              {dropdownOpen && (
                <div className="conversations-panel">
                  {/* New Chat Button */}
                  <button 
                    className="dropdown-new-chat"
                    onClick={startNewConversation}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Conversación
                  </button>

                  {/* Conversations List */}
                  <div className="dropdown-conversations">
                    {conversations.length === 0 ? (
                      <div className="dropdown-empty">
                        <p>No hay conversaciones</p>
                        <p className="dropdown-empty-subtitle">Inicia tu primera conversación</p>
                      </div>
                    ) : (
                      conversations.map((conversation) => (
                        <button
                          key={conversation.id}
                          className={`dropdown-conversation ${
                            currentConversationId === conversation.id ? 'dropdown-conversation-active' : ''
                          }`}
                          onClick={() => switchConversation(conversation.id)}
                        >
                          <div className="dropdown-conversation-content">
                            <h4 className="dropdown-conversation-title">{conversation.title}</h4>
                            <p className="dropdown-conversation-time">
                              {new Date(conversation.timestamp).toLocaleDateString()}
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="dropdown-user-details">
                        <div className="dropdown-user-name">{userData.ownerName}</div>
                        <div className="dropdown-user-restaurant">{userData.restaurantName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation Pills */}
            <nav className="header-navigation">
              <button className="nav-pill active">
                fudiGPT
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/board')}
              >
                fudiBOARD
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/discovery')}
              >
                fudiFLOW
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/vault')}
              >
                fudiVAULT
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/mart')}
              >
                fudiMART
              </button>
            </nav>
          </div>
          
          <div className="header-right">
            <div className="live-indicator">
              <div className="live-dot"></div>
              ONLINE
            </div>
            
            {/* ✅ SIMPLIFIED: Restaurant Name + Logout Button */}
            <div className="header-user-section">
              <span className="restaurant-name">{userData.restaurantName}</span>
              <FudiButton
                variant="danger"
                size="small"
                onClick={handleLogout}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                }
                iconPosition="left"
              >
                Cerrar sesión
              </FudiButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area - No Sidebar Adjustments Needed */}
      <main className="chat-main">
        <div className="messages-area">
          {showWelcome && messages.length === 0 ? (
            // Welcome Screen
            <div className="welcome-screen">
              <div className="welcome-card">
                <h1 className="greeting">
                  <span className="greeting-text">{getGreeting()}, </span>
                  <span className="greeting-name">{userData.ownerName.split(' ')[0]}</span>
                </h1>
                
                <p className="welcome-subtitle">
                  ¿En qué puedo ayudarte con tu restaurante hoy?
                </p>
                
                {/* Single CTA Button */}
                <div className="success-cta">
                  <button
                    className="success-action"
                    onClick={() => handleQuickAction({ text: '¿Qué puedo mejorar en mi restaurante para ser más exitoso?' })}
                  >
                    Empieza a escribir tu historia de éxito...
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Messages Container
            <div className="messages-container">
              <div className="messages-list">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`message-wrapper ${
                      message.type === 'user' ? 'message-wrapper-user' : 'message-wrapper-assistant'
                    }`}
                  >
                    <div className={`message-card ${
                      message.type === 'user' ? 'message-card-user' : 'message-card-assistant'
                    }`}>
                      <div className={`message-content ${
                        message.type === 'user' ? 'message-content-user' : ''
                      }`}>
                        {message.type === 'assistant' && (
                          <img 
                            src="/images/logo.png" 
                            alt="fudiGPT" 
                            className="assistant-avatar"
                          />
                        )}
                        {/* 🔒 PRESERVED MESSAGE STRUCTURE - NO CHANGES */}
                        <div className="message-text">
                          {message.type === 'assistant' ? (
                            <>
                              {message.content}
                              <div style={{ marginTop: '1rem' }}>
                                <FudiSignature size="mini" showPulse={true} opacity={0.6} />
                              </div>
                            </>
                          ) : (
                            message.content
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message-wrapper message-wrapper-assistant">
                    <div className="message-card message-card-assistant">
                      <div className="message-content">
                        <img 
                          src="/images/logo.png" 
                          alt="fudiGPT" 
                          className="assistant-avatar"
                        />
                        <div className="typing-indicator">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <form onSubmit={handleSendMessage}>
              <div className="floating-input">
                {/* Custom Placeholder */}
                <div className={`input-placeholder ${inputMessage ? 'hidden' : ''}`}>
                  Tu éxito comienza con una conversación...
                </div>
                
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder=""
                  className="text-input"
                  rows={1}
                />
                
                <div className="input-actions">
                  <button
                    type="button"
                    className="attach-button"
                    title="Adjuntar archivo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className={`send-button ${
                      inputMessage.trim() && !isTyping
                        ? 'send-button-enabled' 
                        : 'send-button-disabled'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          <p className="input-disclaimer">
            fudiGPT puede cometer errores. Verifica información importante.
          </p>
        </div>
      </main>
      
      {/* Particles for Easter Eggs */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}
    </div>
  );
}