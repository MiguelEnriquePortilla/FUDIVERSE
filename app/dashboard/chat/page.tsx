'use client';

import { useState, useEffect, useRef } from 'react';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { 
  Brain, BarChart3, MessageSquare, User, LogOut, 
  Menu, X, ChevronDown, Plus
} from 'lucide-react';
import '@/styles/pages/chat.css';

// 🔥 NUEVAS IMPORTACIONES PARA MARKDOWN
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// =============================================
// INTERFACES - MANTENER EXACTAMENTE IGUAL
// =============================================
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

interface UserData {
  restaurantName: string;
  ownerName: string;
  restaurantId: string;
}

// =============================================
// 🎨 MARKDOWN COMPONENTS ÉPICOS
// =============================================
const MarkdownComponents = {
  // Headers con estilos épicos
  h1: ({ children }: any) => (
    <h1 className="text-4xl md:text-5xl font-black text-blue-400 mb-6 border-b-4 border-blue-400 pb-4 glow-text animate-slide-in">
      {children}
    </h1>
  ),
  
  h2: ({ children }: any) => (
    <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4 border-b-2 border-orange-400 pb-3 animate-slide-in">
      {children}
    </h2>
  ),
  
  h3: ({ children }: any) => (
    <h3 className="text-2xl md:text-3xl font-bold text-purple-400 mb-3 animate-slide-in">
      {children}
    </h3>
  ),
  
  h4: ({ children }: any) => (
    <h4 className="text-xl md:text-2xl font-semibold text-green-400 mb-2 animate-slide-in">
      {children}
    </h4>
  ),

  // Párrafos espaciosos
  p: ({ children }: any) => (
    <p className="mb-4 leading-relaxed text-lg text-white/90 animate-slide-in">
      {children}
    </p>
  ),

  // Strong épico
  strong: ({ children }: any) => (
    <strong className="font-black text-orange-400 text-lg animate-pulse">
      {children}
    </strong>
  ),

  // Cursivas elegantes
  em: ({ children }: any) => (
    <em className="italic font-semibold text-blue-400">
      {children}
    </em>
  ),

  // Blockquotes poderosos
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-orange-400 bg-gradient-to-r from-orange-400/10 to-orange-400/5 pl-6 py-4 my-6 rounded-r-lg shadow-lg hover:scale-[1.02] transition-all duration-300">
      <div className="text-lg font-medium italic text-orange-200">
        {children}
      </div>
    </blockquote>
  ),

  // Listas organizadas
  ul: ({ children }: any) => (
    <ul className="bg-blue-500/5 border-l-4 border-blue-400 rounded-r-lg p-4 my-4 space-y-2 hover:bg-blue-500/10 transition-all duration-300">
      {children}
    </ul>
  ),

  ol: ({ children }: any) => (
    <ol className="bg-purple-500/5 border-l-4 border-purple-400 rounded-r-lg p-4 my-4 space-y-2 hover:bg-purple-500/10 transition-all duration-300">
      {children}
    </ol>
  ),

  li: ({ children }: any) => (
    <li className="text-base leading-relaxed ml-2 text-white/90">
      {children}
    </li>
  ),

  // Código destacado
  code: ({ inline, children }: any) => {
    if (inline) {
      return (
        <code className="bg-blue-400/15 border border-blue-400 text-blue-300 px-2 py-1 rounded font-mono text-sm font-semibold">
          {children}
        </code>
      );
    }
    
    return (
      <pre className="bg-black/60 border border-gray-600 rounded-lg p-4 my-4 overflow-x-auto shadow-xl hover:shadow-2xl transition-all duration-300">
        <code className="text-green-400 font-mono text-sm">
          {children}
        </code>
      </pre>
    );
  },

  // Tablas profesionales
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full bg-blue-500/5 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }: any) => (
    <thead className="bg-blue-500 text-white">
      {children}
    </thead>
  ),

  th: ({ children }: any) => (
    <th className="px-4 py-3 text-left font-bold">
      {children}
    </th>
  ),

  td: ({ children }: any) => (
    <td className="px-4 py-2 border-b border-white/10 text-white/90">
      {children}
    </td>
  ),

  // Separadores épicos
  hr: () => (
    <div className="my-8 flex items-center">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      <div className="mx-4 text-blue-400 text-2xl">⭐</div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </div>
  )
};

// =============================================
// 🎨 FUDI MARKDOWN RENDERER COMPONENT
// =============================================
const FudiMarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="fudi-content-liberated">
      <div className="fudi-markdown-container">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MarkdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// =============================================
// CONSTANTS
// =============================================
const DEMO_USER_DATA: UserData = {
  restaurantName: 'Restaurante Demo',
  ownerName: 'Usuario Demo',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
};

export default function ChatPage() {
  // =============================================
  // 🔒 CRITICAL STATE - PRESERVED EXACTLY
  // =============================================
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fudiPersonality, setFudiPersonality] = useState<'estratega' | 'motivador' | 'mentor' | 'casual'>('casual');
  const [messageCount, setMessageCount] = useState(0);
  
  // Header state
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);
  
  // Easter eggs and effects
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  // 🔒 CRITICAL USER DATA - PRESERVED EXACTLY + PRODUCTION READY
  const [userData, setUserData] = useState<UserData>({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
  });

  // =============================================
  // REFS
  // =============================================
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // =============================================
  // UTILITY FUNCTIONS
  // =============================================
  
  // Saludo dinámico business casual
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    const base = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    
    // Saludos especiales según hora - Business Style
    if (hour >= 2 && hour < 5) return '🦉 Trabajando tarde';
    if (hour >= 5 && hour < 7) return '🌅 Madrugador';
    if (hour === 13) return '🍽️ Hora del almuerzo';
    
    return base;
  };

  // Efectos de sonido
  const playSound = (type: 'send' | 'receive' | 'typing'): void => {
    if (type === 'send') {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  // Scroll to bottom
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // =============================================
  // 🔒 PRODUCTION AUTH HANDLING
  // =============================================
  const handleInvalidAuth = (): void => {
    // Clear invalid tokens
    localStorage.removeItem('fudi_token');
    
    // In production: redirect to login
    // For development: use demo data
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/login';
    } else {
      // Demo data for development
      setUserData(DEMO_USER_DATA);
    }
  };

  // =============================================
  // 🔒 CRITICAL API FUNCTIONS - PRESERVED EXACTLY
  // =============================================
  
  const loadConversations = async (restaurantId: string): Promise<void> => {
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

  // ✅ LOGOUT FUNCTION - PRODUCTION READY
  const handleLogout = (): void => {
    fudiAPI.logout();
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  // ✅ CONVERSATION MANAGEMENT
  const switchConversation = (conversationId: string): void => {
    setCurrentConversationId(conversationId);
    setMessages([]); // In real app, load messages for this conversation
    setShowWelcome(false);
    setIsConversationsOpen(false); // Close dropdown after selection
  };

  // 🔒 CRITICAL CONVERSATION FUNCTIONS - PRESERVED EXACTLY
  const startNewConversation = async (): Promise<void> => {
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
        setIsConversationsOpen(false);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // 🔒 CRITICAL SEND MESSAGE FUNCTION - PRESERVED EXACTLY
  const handleSendMessage = async (e: React.FormEvent): Promise<void> => {
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

  // =============================================
  // EVENT HANDLERS
  // =============================================
  
  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputMessage(e.target.value);
    setShowWelcome(false);
    
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // =============================================
  // EFFECTS
  // =============================================
  
  // 🔒 CRITICAL DATA LOADING - PRODUCTION READY AUTHENTICATION
  useEffect(() => {
    const initializeUserData = async (): Promise<void> => {
      const token = localStorage.getItem('fudi_token');
      
      if (token) {
        try {
          // Validate token format
          const decoded = JSON.parse(atob(token));
          
          // Validate required fields
          if (decoded && decoded.restaurantId && decoded.ownerName) {
            setUserData({
              restaurantName: decoded.restaurantName || 'Mi Restaurante',
              ownerName: decoded.ownerName,
              restaurantId: decoded.restaurantId
            });
            
            // Load user's conversations
            await loadConversations(decoded.restaurantId);
          } else {
            throw new Error('Invalid token structure');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          // Redirect to login for production
          handleInvalidAuth();
        }
      } else {
        // No token - redirect to login
        handleInvalidAuth();
      }
    };

    initializeUserData();
  }, []);

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

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // =============================================
  // RENDER COMPONENTS
  // =============================================
  
  const renderHeader = () => (
    <header className="fudi-dash-header-refined">
      <div className="header-container-refined">
        
        {/* Conversations Dropdown */}
        <div className="conversations-dropdown-refined">
          <button 
            className="conversations-trigger-refined"
            onClick={() => setIsConversationsOpen(!isConversationsOpen)}
          >
            <MessageSquare size={16} />
            <span>Conversaciones</span>
            <span className="conversations-count-refined">{conversations.length}</span>
            <ChevronDown size={14} />
          </button>

          {isConversationsOpen && (
            <div className="conversations-panel-refined">
              {/* New Chat Button */}
              <FudiButton
                variant="primary"
                size="medium"
                onClick={startNewConversation}
                icon={<Plus size={16} />}
                iconPosition="left"
                className="dropdown-new-chat-refined"
              >
                Nueva Conversación
              </FudiButton>

              {/* Conversations List */}
              <div className="dropdown-conversations-refined">
                {conversations.length === 0 ? (
                  <div className="dropdown-empty-refined">
                    <p>No hay conversaciones aún</p>
                    <p className="dropdown-empty-subtitle-refined">Inicia tu primera conversación</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`dropdown-conversation-refined ${
                        currentConversationId === conversation.id ? 'dropdown-conversation-active-refined' : ''
                      }`}
                      onClick={() => switchConversation(conversation.id)}
                    >
                      <div className="dropdown-conversation-content-refined">
                        <h3 className="dropdown-conversation-title-refined">{conversation.title}</h3>
                        <p className="dropdown-conversation-time-refined">
                          {conversation.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* User Info */}
              <div className="dropdown-user-refined">
                <div className="dropdown-user-info-refined">
                  <div className="dropdown-user-avatar-refined">
                    <User size={16} />
                  </div>
                  <div className="dropdown-user-details-refined">
                    <div className="dropdown-user-name-refined">{userData.ownerName}</div>
                    <div className="dropdown-user-restaurant-refined">{userData.restaurantName}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="dash-logo-refined">
          <span className="logo-text-refined">FUDI</span>
          <span className="logo-accent-refined">VERSE</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav-refined">
          <div className="nav-link-refined nav-active-refined">
            <Brain size={16} />
            <span>fudiGPT</span>
          </div>
          
          <a href="/dashboard/board" className="nav-link-refined">
            <BarChart3 size={16} />
            <span>fudiBOARD</span>
          </a>
        </nav>

        {/* Right Section */}
        <div className="header-right-refined">
          {/* Restaurant Name */}
          <div className="restaurant-badge-refined">
            {userData.restaurantName}
          </div>

          {/* Logout Button */}
          <FudiButton
            variant="primary"
            size="small"
            onClick={handleLogout}
            icon={<LogOut size={16} />}
            iconPosition="left"
          >
            <span className="logout-text-refined">Salir</span>
          </FudiButton>
        </div>
      </div>

      {/* Click outside to close */}
      {isConversationsOpen && (
        <div 
          className="dropdown-overlay-refined"
          onClick={() => setIsConversationsOpen(false)}
        />
      )}
    </header>
  );

  const renderWelcomeScreen = () => (
    <div className="welcome-screen-refined">
      <div className="welcome-card-refined">
        <h1 className="greeting-refined">
          <span className="greeting-text">{getGreeting()}, </span>
          <span className="greeting-name">{userData.ownerName.split(' ')[0]}</span>
        </h1>
        
        <p className="welcome-subtitle-refined">
          Escribe tu pregunta sobre el restaurante...
        </p>
      </div>
    </div>
  );

  // 🔥 NUEVO: RENDER MESSAGE CON MARKDOWN POWER
  const renderMessage = (message: Message) => {
    if (message.type === 'user') {
      // Usuario sigue con tarjetas (más compacto)
      return (
        <div
          key={message.id}
          className="message-wrapper-refined message-wrapper-user-refined"
        >
          <div className="message-card-refined message-card-user-refined">
            <div className="message-content-refined message-content-user-refined">
              <div className="message-text-refined">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 🔥 FUDI COMPLETAMENTE LIBERADO CON MARKDOWN
    return (
      <div
        key={message.id}
        className="fudi-response-liberated"
      >
        {/* Avatar flotante */}
        <div className="fudi-avatar-float">
          <img 
            src="/images/logo.png" 
            alt="fudiGPT" 
            className="fudi-avatar-liberated"
          />
        </div>

        {/* 🎨 MARKDOWN RENDERER ÉPICO */}
        <FudiMarkdownRenderer content={message.content} />
        
        {/* Firma de FUDI */}
        <div className="fudi-signature-container">
          <FudiSignature size="mini" showPulse={true} opacity={0.6} />
        </div>
      </div>
    );
  };

  const renderTypingIndicator = () => (
    <div className="fudi-response-liberated">
      <div className="fudi-avatar-float">
        <img 
          src="/images/logo.png" 
          alt="fudiGPT" 
          className="fudi-avatar-liberated"
        />
      </div>
      <div className="fudi-content-liberated">
        <div className="typing-indicator-liberated">
          <div className="typing-dot-liberated"></div>
          <div className="typing-dot-liberated"></div>
          <div className="typing-dot-liberated"></div>
        </div>
      </div>
    </div>
  );

  const renderMessagesArea = () => (
    <div className="messages-container-refined">
      <div className="messages-list-refined">
        {messages.map(renderMessage)}
        
        {isTyping && renderTypingIndicator()}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );

  const renderInputArea = () => (
    <div className="input-area-refined">
      <div className="input-container-refined">
        <form onSubmit={handleSendMessage} className="floating-input-refined">
          {/* Custom Placeholder */}
          <div className={`input-placeholder-refined ${inputMessage ? 'hidden' : ''}`}>
            Tu éxito comienza con una conversación...
          </div>
          
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="text-input-refined"
            rows={1}
          />
          
          <div className="input-actions-refined">
            <button
              type="button"
              className="attach-button-refined"
              title="Adjuntar archivo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className={`send-button-refined ${
                inputMessage.trim() && !isTyping
                  ? 'send-button-enabled-refined' 
                  : 'send-button-disabled-refined'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      <p className="input-disclaimer-refined">
        fudiGPT puede cometer errores. Verifica información importante.
      </p>
    </div>
  );

  // =============================================
  // MAIN RENDER
  // =============================================
  
  return (
    <div className="chat-container-refined">
      {/* Single Clean Background */}
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* Header */}
      {renderHeader()}

      {/* Main Chat Area */}
      <main className="chat-main-refined">
        <div className="messages-area-refined">
          {showWelcome && messages.length === 0 ? 
            renderWelcomeScreen() : 
            renderMessagesArea()
          }
        </div>

        {/* Input Area */}
        {renderInputArea()}
      </main>
      
      {/* Particles for Easter Eggs */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle-refined"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}
    </div>
  );
}