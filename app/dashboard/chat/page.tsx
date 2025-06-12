'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import styles from './page.module.css';


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
  // Estado principal
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fudiPersonality, setFudiPersonality] = useState<'estratega' | 'motivador' | 'mentor' | 'casual'>('casual');
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  
  // Easter eggs
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Datos del usuario
  const [userData, setUserData] = useState({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
  });

  // Obtener datos del token y cargar conversaciones
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

  // Cargar conversaciones desde Supabase
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

  // Quick actions sin emojis
  const quickActions = [
    { text: '¿Cómo van mis ingresos?', glow: 'from-cyan-500/20 to-blue-500/20' },
    { text: '¿Cuál es mi utilidad?', glow: 'from-green-500/20 to-emerald-500/20' },
    { text: '¿Cuánto gasté hoy?', glow: 'from-purple-500/20 to-pink-500/20' },
    { text: '¿Mi ganancia del mes?', glow: 'from-blue-500/20 to-purple-500/20' }
  ];

  // Personalidades de FUDI
  const personalities = {
    estratega: { icon: '🎯', label: 'Estratega', desc: 'Análisis profundo y datos' },
    motivador: { icon: '🔥', label: 'Motivador', desc: '¡Vamos a romperla!' },
    mentor: { icon: '🧠', label: 'Mentor', desc: 'Consejos y educación' },
    casual: { icon: '', label: userData.restaurantName, desc: '' }
  };

  // Saludo dinámico con personalidad
  const getGreeting = () => {
    const hour = new Date().getHours();
    const base = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    
    // Saludos especiales según hora
    if (hour >= 2 && hour < 5) return '🦉 Noctámbulo mode activated';
    if (hour >= 5 && hour < 7) return '🌅 Madrugador legendario';
    if (hour === 13) return '🍕 Hora de la comida';
    
    return base;
  };

  // Efectos de sonido sutiles
  const playSound = (type: 'send' | 'receive' | 'typing') => {
    // Implementar con Web Audio API para sonidos suaves
    if (type === 'send') {
      // Sonido cyber sutil
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    setShowWelcome(false); // Ocultar welcome al escribir
    
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Easter eggs y efectos
  useEffect(() => {
    if (inputMessage.toLowerCase().includes('fudiverse')) {
      // Activar particles
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const particle = {
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          };
          setParticles(prev => [...prev, particle]);
          
          setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }, 3000);
        }, i * 100);
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

  // Nueva conversación
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
  };

  // Enviar mensaje
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
      // CONEXIÓN REAL CON FUDI
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

        // Guardar interacción en Supabase
        if (conversationId) {
          await fudiAPI.conversations.saveInteraction({
            restaurantId: userData.restaurantId,
            conversationId: conversationId,
            userMessage: userMessageContent,
            fudiResponse: response.response,
            responseTime: responseTime / 1000 // en segundos
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
        
        // Play receive sound
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
    <div className={styles.container}>
      <FudiChatGrid opacity={0.02} gridSize={60} animated={false} />
      
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          <button
              onClick={startNewConversation}
              className={styles.newChatButton}
              style={{ 
                fontSize: '16px',
                padding: '0.5rem .5rem',
                fontWeight: '500'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span style={{ fontSize: '16px' }}>Nuevo chat</span>
            </button>

            {/* Botón Ocultar sidebar */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className={styles.hideSidebarButton}
              style={{ 
                fontSize: '16px',
                padding: '0.375rem 0.5rem',
                color: '#888'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
              </svg>
              <span>Ocultar sidebar</span>
            </button>
        </div>

        {/* Lista de conversaciones */}
        <div className={styles.conversationsList}>
          <div className={styles.conversationsHeader}>
            <h3 className={styles.conversationsTitle}>Chats</h3>
            <div className={styles.conversationsContainer}>
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={async () => {
                    setCurrentConversationId(conv.id);
                    setShowWelcome(false);
                    
                    // Cargar mensajes de la conversación desde Supabase
                    try {
                      const response = await fetch(`/api/conversations?conversationId=${conv.id}`);
                      const data = await response.json();
                      
                      if (data.success && data.conversation) {
                        const loadedMessages = data.conversation.messages?.map((msg: any, index: number) => ({
                          id: index + 1,
                          type: msg.role === 'user' ? 'user' : 'assistant',
                          content: msg.content,
                          timestamp: new Date(msg.timestamp)
                        })) || [];
                        setMessages(loadedMessages);
                      }
                    } catch (error) {
                      console.error('Error loading conversation:', error);
                    }
                  }}
                  className={`${styles.conversationButton} ${
                    currentConversationId === conv.id ? styles.conversationButtonActive : ''
                  }`}
                >
                  <div className={styles.conversationTitle}>{conv.title}</div>
                  <div className={styles.conversationTime}>
                    {new Date(conv.timestamp).toLocaleTimeString('es-MX', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer del sidebar con dropdown */}
        <div className={styles.sidebarFooter}>
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className={styles.userInfoButton}
          >
            <div className={styles.userAvatar}>
              {userData?.ownerName?.substring(0, 1)?.toUpperCase() || 'U'}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{userData?.ownerName || 'Usuario'}</div>
              <div className={styles.userPlan}>Plan Pro</div>
            </div>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={styles.dropdownArrow}
              style={{ transform: showUserDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showUserDropdown && (
            <div className={styles.dropdownMenuBottom}>
              
              <div className={styles.dropdownSection}>
               <button 
                  className={styles.dropdownItem}
                  onClick={() => window.location.href = '/dashboard/board'}
                >
                  <span>fudiBOARD</span>
                  <span className={styles.itemLabel}>Dashboard Inteligente</span>
                </button>
                <button 
                  className={styles.dropdownItem}
                  onClick={() => window.location.href = '/dashboard/discovery'}
                >
                  <span>fudiSCOVERY</span>
                  <span className={styles.itemLabel}>Explora insights</span>
                </button>
                <button 
                  className={styles.dropdownItem}
                  onClick={() => window.location.href = '/dashboard/vault'}
                >
                  <span>fudiVAULT</span>
                  <span className={styles.itemLabel}>Tu biblioteca de conocimiento</span>
                </button>
                <button 
                  className={styles.dropdownItem}
                  onClick={() => window.location.href = '/dashboard/pos'}
                >
                  <span>fudiPOS</span>
                  <span className={styles.itemLabel}>The First AI Point of Sale</span>
                </button>
              </div>
              <div className={styles.dropdownDivider}></div>
              <div className={styles.dropdownSection}>
                <button className={styles.dropdownItem}>Configuración</button>
                <button className={styles.dropdownItem}>Idioma</button>
                <button className={styles.dropdownItem}>Ver más planes</button>
                <button 
                  className={styles.dropdownItem}
                  onClick={() => window.location.href = 'mailto:hello@fudigpt.com'}
                >
                  Ayuda
                </button>
              </div>
              
              <div className={styles.dropdownDivider}></div>
              
              <button 
                className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                onClick={() => {
                  localStorage.removeItem('fudi_token');
                  window.location.href = '/';
                }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Toggle sidebar button - Solo visible cuando está cerrado */}
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className={styles.toggleSidebarButton}
          title="Mostrar sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main chat area */}
      <main className={styles.main}>
        {/* Header mejorado con logo más grande */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FudiAura 
                variant="energy"
                color="#06b6d4"
                intensity={0.4}
                size={60}
                pulseSpeed={3}
              />
              <img src="/images/logo.png" alt="Fudi" className={styles.fudiLogo} style={{ position: 'relative', zIndex: 1 }} />
            </div>
            <div>
              <span className={styles.fudiTitle}>FudiGPT</span>
              <div className={styles.fudiSubtitle}>Powered by FudiVerse AI</div>
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <span className={styles.restaurantGreeting}>Hola, {userData.restaurantName}</span>
          </div>
        </header>

        {/* Messages area */}
        <div className={styles.messagesArea}>
          {showWelcome && messages.length === 0 ? (
            // Welcome screen
            <div className={styles.welcomeScreen}>
              <h1 className={styles.greeting}>
                <span className={styles.greetingText}>{getGreeting()}, </span>
                <span className={styles.greetingName}>{userData.ownerName.split(' ')[0]}</span>
              </h1>
              
              {/* Quick actions como burbujas de texto estilo Claude */}
              <div className={styles.quickActions}>
                {quickActions.map((action, index) => (
                  <FudiButton
                    key={index}
                    variant="ghost"
                    size="small"
                    onClick={() => handleQuickAction(action)}
                    className={styles.quickAction}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {action.text}
                  </FudiButton>
                ))}
              </div>
            </div>
          ) : (
            // Messages
            <div className={styles.messagesContainer}>
              <div className={styles.messagesList}>
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`${styles.messageWrapper} ${
                      message.type === 'user' ? styles.messageWrapperUser : styles.messageWrapperAssistant
                    }`}
                  >
                    <div className={`${styles.messageContent} ${
                      message.type === 'user' ? styles.messageContentUser : ''
                    }`}>
                      {message.type === 'assistant' && (
                        <img 
                          src="/images/logo.png" 
                          alt="Fudi" 
                          className={styles.assistantAvatar}
                        />
                      )}
                      <div className={`${styles.messageBubble} ${
                        message.type === 'user' 
                          ? styles.messageBubbleUser 
                          : styles.messageBubbleAssistant
                      }`}
                      style={{
                        boxShadow: message.type === 'assistant' && index === messages.length - 1 
                          ? '0 0 30px rgba(6,182,212,0.1)' 
                          : 'none'
                      }}>
                        {message.type === 'assistant' ? (
                          <>
                            <p className={styles.messageText}>{message.content}</p>
                            <FudiSignature size="mini" showPulse={true} opacity={0.6} />
                          </>
                        ) : (
                          <p className={styles.messageText}>{message.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className={`${styles.messageWrapper} ${styles.messageWrapperAssistant}`}>
                    <div className={styles.messageContent}>
                      <img 
                        src="/images/logo.png" 
                        alt="Fudi" 
                        className={styles.assistantAvatar}
                      />
                      <div className={styles.messageBubble}>
                        <div className={styles.typingIndicator}>
                          <div className={styles.typingDot}></div>
                          <div className={styles.typingDot}></div>
                          <div className={styles.typingDot}></div>
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

        {/* Input area */}
        <div className={styles.inputArea}>
          <form onSubmit={handleSendMessage} className={styles.inputForm}>
            <div 
              className={styles.inputContainer}
              style={{
                border: '1px solid rgba(6, 182, 212, 0.1)',
                borderRadius: '1rem',
                transition: 'all 0.3s ease',
                background: 'rgba(62, 62, 62, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.1)';
              }}
            >
              <div 
                style={{
                  flex: 1,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(6, 182, 212, 0.02)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.15)';
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (document.activeElement !== inputRef.current) {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.02)';
                  }
                }}
              >
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
                  placeholder="¿Cómo puedo ayudarte hoy?"
                  className={styles.textInput}
                  rows={1}
                  style={{ 
                    minHeight: '24px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: 0,
                    margin: 0
                  }}
                  onFocus={(e) => {
                    const wrapper = e.target.parentElement!;
                    wrapper.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                    wrapper.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.25), inset 0 0 20px rgba(6, 182, 212, 0.05)';
                    wrapper.style.background = 'rgba(6, 182, 212, 0.06)';
                  }}
                  onBlur={(e) => {
                    const wrapper = e.target.parentElement!;
                    wrapper.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    wrapper.style.boxShadow = inputMessage.length > 0 ? '0 0 15px rgba(6, 182, 212, 0.1)' : 'none';
                    wrapper.style.background = 'rgba(6, 182, 212, 0.02)';
                  }}
                />
                {inputMessage.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: -1,
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                    animation: 'pulse 2s ease-in-out infinite',
                    opacity: 0.8,
                    borderRadius: '1px'
                  }} />
                )}
              </div>
              
              <div className={styles.inputActions}>
                <button
                  type="button"
                  className={styles.attachButton}
                  title="Adjuntar archivo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className={`${styles.sendButton} ${
                    inputMessage.trim() && !isTyping
                      ? styles.sendButtonEnabled 
                      : styles.sendButtonDisabled
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          
          <p className={styles.inputDisclaimer}>
            FudiGPT puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </main>
      
      {/* Easter egg particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
    </div>
  );
}