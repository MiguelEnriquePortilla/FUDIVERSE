'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
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
  
  // ✅ MOVED: Dropdown State (now for floating button)
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

      {/* ✅ FASE 2: FudiDashHeader Implanted Successfully */}
      <FudiDashHeader 
        currentModule="chat" 
        userName={userData.ownerName}
        userPlan="pro"
        notifications={2}
        onLogout={handleLogout}
      />

      {/* ✅ ENCHULADO: Floating Conversations Button with FudiButton styling */}
      <div className="floating-conversations" ref={dropdownRef}>
        <FudiButton
          variant="primary"
          size="large"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
          iconPosition="left"
          className="floating-conversations-trigger"
        >
          <span className="floating-conversations-text">Conversaciones</span>
        </FudiButton>

        {/* ✅ MOVED: Conversations Dropdown Panel (now floating) */}
        {dropdownOpen && (
          <div className="floating-conversations-panel">
            {/* New Chat Button */}
            <FudiButton
              variant="primary"
              size="medium"
              onClick={startNewConversation}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
              iconPosition="left"
              className="floating-new-chat"
            >
              Nueva Conversación
            </FudiButton>

            {/* Conversations List */}
            <div className="floating-conversations-list">
              {conversations.length === 0 ? (
                <div className="floating-empty">
                  <p>No hay conversaciones</p>
                  <p className="floating-empty-subtitle">Inicia tu primera conversación</p>
                </div>
              ) : (
                conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`floating-conversation ${
                      currentConversationId === conversation.id ? 'floating-conversation-active' : ''
                    }`}
                    onClick={() => switchConversation(conversation.id)}
                  >
                    <div className="floating-conversation-content">
                      <h4 className="floating-conversation-title">{conversation.title}</h4>
                      <p className="floating-conversation-time">
                        {new Date(conversation.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
      
            {/* User Info */}
            <div className="floating-user">
              <div className="floating-user-info">
                <div className="floating-user-avatar">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="floating-user-details">
                  <div className="floating-user-name">{userData.ownerName}</div>
                  <div className="floating-user-restaurant">{userData.restaurantName}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area - No Changes */}
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

      {/* ✅ ENHANCED: CSS for Floating Conversations with FudiButton Integration */}
      <style jsx>{`
        .floating-conversations {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 1000;
        }

        /* ✅ ENCHULADO: FudiButton styling for floating conversations */
        .floating-conversations .floating-conversations-trigger {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 50% !important;
          width: 60px !important;
          height: 60px !important;
          padding: 0 !important;
          min-width: auto !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.4) !important;
          backdrop-filter: blur(20px) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          overflow: hidden !important;
        }

        .floating-conversations .floating-conversations-trigger:hover {
          transform: translateY(-3px) scale(1.05) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(102, 126, 234, 0.6) !important;
          border-color: var(--fudi-blue) !important;
        }

        .floating-conversations .floating-conversations-trigger:active {
          transform: translateY(-1px) scale(1.02) !important;
        }

        /* Hide text on circular button, show only icon */
        .floating-conversations-text {
          display: none !important;
        }

        .floating-conversations-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(135deg, #ff4757, #ff3742);
          color: white;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
          animation: count-pulse 2s infinite;
        }

        @keyframes count-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .floating-conversations-panel {
          position: absolute;
          bottom: 75px;
          left: 0;
          width: 320px;
          max-height: 500px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(102, 126, 234, 0.2);
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ✅ ENCHULADO: New Chat Button with FudiButton styling */
        .floating-conversations-panel .floating-new-chat {
          width: 100% !important;
          margin: 1rem !important;
          margin-bottom: 0.5rem !important;
          border-radius: 12px !important;
          background: linear-gradient(135deg, var(--fudi-blue), var(--fudi-primary)) !important;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3) !important;
        }

        .floating-conversations-panel .floating-new-chat:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4) !important;
        }

        .floating-conversations-list {
          max-height: 300px;
          overflow-y: auto;
          padding: 0.5rem 1rem;
        }

        .floating-conversation {
          width: 100%;
          padding: 0.75rem;
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 10px;
          margin-bottom: 0.25rem;
          border: 1px solid transparent;
        }

        .floating-conversation:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .floating-conversation-active {
          background: rgba(59, 130, 246, 0.15);
          border-color: var(--fudi-blue);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
          position: relative;
        }

        .floating-conversation-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--fudi-blue);
          border-radius: 0 2px 2px 0;
        }

        .floating-conversation-title {
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .floating-conversation-time {
          color: var(--text-tertiary);
          font-size: 0.75rem;
          margin: 0;
        }

        .floating-empty {
          padding: 2rem 1rem;
          text-align: center;
          color: var(--text-secondary);
        }

        .floating-empty p {
          margin: 0.25rem 0;
          font-size: 0.875rem;
        }

        .floating-empty-subtitle {
          font-size: 0.75rem !important;
          opacity: 0.7;
        }

        .floating-user {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
        }

        .floating-user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .floating-user-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--fudi-primary), var(--fudi-orange));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 0, 0, 0.8);
          font-weight: bold;
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
        }

        .floating-user-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .floating-user-restaurant {
          font-size: 0.75rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        /* ✅ ENHANCED: Mobile responsiveness for floating button */
        @media (max-width: 768px) {
          .floating-conversations {
            bottom: 1.5rem;
            left: 1.5rem;
          }

          .floating-conversations .floating-conversations-trigger {
            width: 56px !important;
            height: 56px !important;
          }

          .floating-conversations-panel {
            width: calc(100vw - 3rem);
            max-width: 300px;
          }

          .floating-conversations-count {
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .floating-conversations {
            bottom: 1rem;
            left: 1rem;
          }

          .floating-conversations .floating-conversations-trigger {
            width: 52px !important;
            height: 52px !important;
          }

          .floating-conversations-panel {
            width: calc(100vw - 2rem);
            max-width: 280px;
          }
        }

        /* ✅ Scrollbar styling for conversations list */
        .floating-conversations-list::-webkit-scrollbar {
          width: 4px;
        }

        .floating-conversations-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .floating-conversations-list::-webkit-scrollbar-thumb {
          background: var(--fudi-blue);
          border-radius: 2px;
          opacity: 0.6;
        }

        .floating-conversations-list::-webkit-scrollbar-thumb:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}