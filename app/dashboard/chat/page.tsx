'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiLogo } from '@/components/fudiverse/FudiLogo';
import '@/styles/pages/chat.css'; // ✨ FUDIVERSE REVOLUTION CSS

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
  // 🔒 CRITICAL STATE - NO CHANGES
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
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Easter eggs and neural effects
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // 🔒 CRITICAL USER DATA - NO CHANGES
  const [userData, setUserData] = useState({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
  });

  // 🔒 CRITICAL DATA LOADING - NO CHANGES
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

  // 🔒 CRITICAL API FUNCTION - NO CHANGES
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

  // Quick actions - FUDIVERSE STYLE
  const quickActions = [
    { text: '¿Cómo van mis ingresos?', neural: 'revenue' },
    { text: '¿Cuál es mi utilidad?', neural: 'profit' },
    { text: '¿Cuánto gasté hoy?', neural: 'expenses' },
    { text: '¿Mi ganancia del mes?', neural: 'growth' }
  ];

  // Personalidades de FUDI
  const personalities = {
    estratega: { icon: '🎯', label: 'Estratega', desc: 'Análisis profundo y datos' },
    motivador: { icon: '🔥', label: 'Motivador', desc: '¡Vamos a romperla!' },
    mentor: { icon: '🧠', label: 'Mentor', desc: 'Consejos y educación' },
    casual: { icon: '', label: userData.restaurantName, desc: '' }
  };

  // Saludo dinámico con personalidad FUDIVERSE
  const getGreeting = () => {
    const hour = new Date().getHours();
    const base = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    
    // Saludos especiales según hora - FUDIVERSE STYLE
    if (hour >= 2 && hour < 5) return '🦉 Neural Mode Activated';
    if (hour >= 5 && hour < 7) return '🌅 Early Bird Neural';
    if (hour === 13) return '🍽️ Neural Lunch Break';
    
    return base;
  };

  // Efectos de sonido neural
  const playSound = (type: 'send' | 'receive' | 'typing') => {
    if (type === 'send') {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  // Auto-resize textarea con neural feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    setShowWelcome(false);
    
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Easter eggs y efectos FUDIVERSE
  useEffect(() => {
    if (inputMessage.toLowerCase().includes('fudiverse')) {
      // Activar neural particles
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
          }, 4000);
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

  // 🔒 CRITICAL CONVERSATION FUNCTIONS - NO CHANGES
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

  // Manejar quick action con neural feedback
  const handleQuickAction = (action: any) => {
    setInputMessage(action.text);
    setShowWelcome(false);
    inputRef.current?.focus();
    
    // Neural feedback
    setGlowIntensity(1);
    setTimeout(() => setGlowIntensity(0), 1000);
  };

  // 🔒 CRITICAL SEND MESSAGE FUNCTION - NO CHANGES
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
      // 🔒 CRITICAL API CALL - NO CHANGES
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

        // 🔒 CRITICAL SUPABASE SAVE - NO CHANGES
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
    <div className="container">
      {/* ✨ NEURAL GRID BACKGROUND - CSS HANDLED */}
      
      {/* ✨ SCANNING LINE EFFECT - CSS HANDLED */}
      
      {/* FUDIVERSE HEADER WITH NAVIGATION */}
      <header className="header">
        <div className="headerContent">
          <div className="headerLeft">
            <div className="fudiLogo">
              <div>
                <div className="fudiTitle">FudiGPT</div>
                <div className="fudiSubtitle">POWERED BY FUDIVERSE AI</div>
              </div>
            </div>
            
            {/* NAVIGATION PILLS */}
            <nav className="headerNavigation">
              <button 
                className="navPill newChatPill"
                onClick={startNewConversation}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo
              </button>
              
              <button 
                className="navPill active"
                onClick={() => {}}
              >
                Chat
              </button>
              
              <button 
                className="navPill"
                onClick={() => navigateTo('/dashboard/board')}
              >
                Board
              </button>
              
              <button 
                className="navPill"
                onClick={() => navigateTo('/dashboard/discovery')}
              >
                Discovery
              </button>
              
              <button 
                className="navPill"
                onClick={() => navigateTo('/dashboard/vault')}
              >
                Vault
              </button>
              
              <button 
                className="navPill"
                onClick={() => navigateTo('/dashboard/pos')}
              >
                POS
              </button>
            </nav>
          </div>
          
          <div className="headerRight">
            <div className="liveIndicator">
              <div className="liveDot"></div>
              FUDIVERSE ONLINE
            </div>
            <div className="restaurantGreeting">
              Hola, {userData.restaurantName}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CHAT AREA - TRANSPARENT FOR NEURAL GRID */}
      <main className="main">
        <div className="messagesArea">
          {showWelcome && messages.length === 0 ? (
            // ✨ WELCOME SCREEN - FLOATING CARD
            <div className="welcomeScreen">
              <div className="welcomeCard">
                <h1 className="greeting">
                  <span className="greetingText">{getGreeting()}, </span>
                  <span className="greetingName">{userData.ownerName.split(' ')[0]}</span>
                </h1>
                
                {/* ✨ QUICK ACTIONS - NEURAL STYLE */}
                <div className="quickActions">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quickAction"
                      onClick={() => handleQuickAction(action)}
                      style={{
                        animationDelay: `${index * 0.15}s`,
                      }}
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // ✨ MESSAGES - FLOATING CARDS SYSTEM
            <div className="messagesContainer">
              <div className="messagesList">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`messageWrapper ${
                      message.type === 'user' ? 'messageWrapperUser' : 'messageWrapperAssistant'
                    }`}
                  >
                    <div className={`messageCard ${
                      message.type === 'user' ? 'messageCardUser' : ''
                    }`}>
                      <div className={`messageContent ${
                        message.type === 'user' ? 'messageContentUser' : ''
                      }`}>
                        {message.type === 'assistant' && (
                          <img 
                            src="/images/logo.png" 
                            alt="Fudi" 
                            className="assistantAvatar"
                          />
                        )}
                        <div className="messageText">
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
                  <div className="messageWrapper messageWrapperAssistant">
                    <div className="messageCard">
                      <div className="messageContent">
                        <img 
                          src="/images/logo.png" 
                          alt="Fudi" 
                          className="assistantAvatar"
                        />
                        <div className="typingIndicator">
                          <div className="typingDot"></div>
                          <div className="typingDot"></div>
                          <div className="typingDot"></div>
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

        {/* ✨ FLOATING INPUT AREA - PREMIUM NEURAL */}
        <div className="inputArea">
          <form onSubmit={handleSendMessage} className="inputContainer">
            <div className="floatingInput">
              {/* CUSTOM ASK FUDI PLACEHOLDER */}
              <div className={`inputPlaceholder ${inputMessage ? 'hidden' : ''}`}>
                ASK FUDI...
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
                className="textInput"
                rows={1}
              />
              
              <div className="inputActions">
                <button
                  type="button"
                  className="attachButton"
                  title="Adjuntar archivo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className={`sendButton ${
                    inputMessage.trim() && !isTyping
                      ? 'sendButtonEnabled' 
                      : 'sendButtonDisabled'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          
          <p className="inputDisclaimer">
            FudiGPT puede cometer errores. Verifica la información importante.
          </p>
        </div>
      </main>
      
      {/* ✨ NEURAL PARTICLES - EASTER EGGS */}
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