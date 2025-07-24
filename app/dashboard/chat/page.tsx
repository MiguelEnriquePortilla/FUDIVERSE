'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { ExpenseUpload, ExpenseAnalysisDisplay } from '@/components/ExpenseUpload';
import '@/styles/pages/chat.css';

// 🔥 DYNAMIC IMPORT PARA EVITAR SSR ISSUES
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-4 bg-blue-400/20 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-blue-400/20 rounded w-1/2"></div>
    </div>
  )
});

import remarkGfm from 'remark-gfm';

// =============================================
// INTERFACES
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
// 🎨 MARKDOWN COMPONENTS
// =============================================
const MarkdownComponents = {
  h1: ({ children }: any) => (
    <h1 style={{
      fontSize: '2.5rem',
      fontWeight: 900,
      color: '#60a5fa',
      marginBottom: '1.5rem',
      borderBottom: '3px solid #60a5fa',
      paddingBottom: '1rem'
    }}>
      {children}
    </h1>
  ),
  
  h2: ({ children }: any) => (
    <h2 style={{
      fontSize: '2rem',
      fontWeight: 800,
      color: '#fb923c',
      marginBottom: '1rem',
      borderBottom: '2px solid #fb923c',
      paddingBottom: '0.75rem'
    }}>
      {children}
    </h2>
  ),
  
  h3: ({ children }: any) => (
    <h3 style={{
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#a78bfa',
      marginBottom: '0.75rem'
    }}>
      {children}
    </h3>
  ),

  p: ({ children }: any) => (
    <p style={{
      marginBottom: '1rem',
      lineHeight: '1.7',
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {children}
    </p>
  ),

  strong: ({ children }: any) => (
    <strong style={{
      fontWeight: 800,
      color: '#fb923c',
      fontSize: '1.05em'
    }}>
      {children}
    </strong>
  ),

  blockquote: ({ children }: any) => (
    <blockquote style={{
      borderLeft: '4px solid #fb923c',
      background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(251, 146, 60, 0.05))',
      paddingLeft: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      margin: '1.5rem 0',
      borderRadius: '0 8px 8px 0',
      fontStyle: 'italic',
      fontSize: '1.1rem'
    }}>
      {children}
    </blockquote>
  ),

  ul: ({ children }: any) => (
    <ul style={{
      background: 'rgba(96, 165, 250, 0.05)',
      borderLeft: '4px solid #60a5fa',
      borderRadius: '0 8px 8px 0',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      {children}
    </ul>
  ),

  li: ({ children }: any) => (
    <li style={{
      marginBottom: '0.5rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {children}
    </li>
  ),

  code: ({ inline, children }: any) => {
    if (inline) {
      return (
        <code style={{
          background: 'rgba(96, 165, 250, 0.15)',
          border: '1px solid #60a5fa',
          color: '#93c5fd',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.9rem'
        }}>
          {children}
        </code>
      );
    }
    
    return (
      <pre style={{
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid #374151',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem 0',
        overflow: 'auto'
      }}>
        <code style={{ color: '#10b981', fontFamily: 'monospace' }}>
          {children}
        </code>
      </pre>
    );
  },

  table: ({ children }: any) => (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table style={{
        width: '100%',
        background: 'rgba(96, 165, 250, 0.05)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {children}
      </table>
    </div>
  ),

  th: ({ children }: any) => (
    <th style={{
      background: '#3b82f6',
      color: 'white',
      padding: '0.75rem',
      textAlign: 'left',
      fontWeight: 700
    }}>
      {children}
    </th>
  ),

  td: ({ children }: any) => (
    <td style={{
      padding: '0.75rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {children}
    </td>
  )
};

// =============================================
// 🎨 FUDI MARKDOWN RENDERER
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
  // STATE
  // =============================================
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fudiPersonality, setFudiPersonality] = useState<'estratega' | 'motivador' | 'mentor' | 'casual'>('casual');
  const [messageCount, setMessageCount] = useState(0);
  const [showExpenseUpload, setShowExpenseUpload] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  
  // Easter eggs and effects
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  // User data
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
  
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    const base = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
    
    if (hour >= 2 && hour < 5) return '🦉 Trabajando tarde';
    if (hour >= 5 && hour < 7) return '🌅 Madrugador';
    if (hour === 13) return '🍽️ Hora del almuerzo';
    
    return base;
  };

  const playSound = (type: 'send' | 'receive' | 'typing'): void => {
    if (type === 'send') {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // =============================================
  // AUTH HANDLING
  // =============================================
  const handleInvalidAuth = (): void => {
    localStorage.removeItem('fudi_token');
    
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/login';
    } else {
      setUserData(DEMO_USER_DATA);
    }
  };

  // =============================================
  // API FUNCTIONS
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

  const handleLogout = (): void => {
    fudiAPI.logout();
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  const switchConversation = (conversationId: string): void => {
    setCurrentConversationId(conversationId);
    setMessages([]);
    setShowWelcome(false);
  };

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
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const callClaudeWithMCP = async (userMessage: string): Promise<string> => {
    console.log('🔍 DEBUG: Llamando Claude via backend');
    
    try {
      const response = await fetch('/api/claude-mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          restaurantId: userData.restaurantId
        })
      });
      
      console.log('📡 Backend response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Backend response success:', data.success);
      
      if (data.success) {
        return data.response;
      } else {
        console.error('❌ Backend Error:', data.error);
        return `Error: ${data.error}`;
      }
    } catch (error) {
      console.error('💥 Network Error:', error);
      return `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`;
    }
  };

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
    
    playSound('send');

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const claudeResponse = await callClaudeWithMCP(userMessageContent);
      
      const responseTime = Date.now() - startTime;
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: claudeResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      if (conversationId) {
        await fudiAPI.conversations.saveInteraction({
          restaurantId: userData.restaurantId,
          conversationId: conversationId,
          userMessage: userMessageContent,
          fudiResponse: claudeResponse,
          responseTime: responseTime / 1000
        });

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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputMessage(e.target.value);
    setShowWelcome(false);
    
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleExpenseAnalysisComplete = (analysis: any) => {
    setCurrentAnalysis(analysis);
    setShowExpenseUpload(false);
    
    const analysisMessage: Message = {
      id: messages.length + 1,
      type: 'assistant',
      content: `¡Análisis de gasto completado! 📊\n\n**Proveedor:** ${analysis.supplier}\n**Total:** $${analysis.total_amount}\n\nHe actualizado automáticamente los márgenes de tus productos. ${analysis.analysis?.recommendations?.[0] || 'Todo se ve bien.'}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, analysisMessage]);
  };

  // =============================================
  // EFFECTS
  // =============================================
  
  useEffect(() => {
    const initializeUserData = async (): Promise<void> => {
      const token = localStorage.getItem('fudi_token');
      
      if (token) {
        try {
          const decoded = JSON.parse(atob(token));
          
          if (decoded && decoded.restaurantId && decoded.ownerName) {
            setUserData({
              restaurantName: decoded.restaurantName || 'Mi Restaurante',
              ownerName: decoded.ownerName,
              restaurantId: decoded.restaurantId
            });
            
            await loadConversations(decoded.restaurantId);
          } else {
            throw new Error('Invalid token structure');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          handleInvalidAuth();
        }
      } else {
        handleInvalidAuth();
      }
    };

    initializeUserData();
  }, []);

  useEffect(() => {
    if (inputMessage.toLowerCase().includes('fudiverse')) {
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // =============================================
  // RENDER COMPONENTS
  // =============================================
  
  const renderWelcomeScreen = () => (
    <div className="welcome-screen-refined">
      <div className="welcome-card-refined">
        <h1 className="greeting-refined">
          <span className="greeting-text">{getGreeting()}, </span>
          <span className="greeting-name">{userData.ownerName.split(' ')[0]}</span>
        </h1>
        
        <p className="welcome-subtitle-refined">
          Pregúntame sobre las ventas, productos o cualquier análisis del restaurante...
        </p>
        

      </div>
    </div>
  );

  const renderMessage = (message: Message) => {
    if (message.type === 'user') {
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

    return (
      <div
        key={message.id}
        className="fudi-response-liberated"
      >
        <div className="fudi-avatar-float">
          <img 
            src="/images/logo.png" 
            alt="fudiGPT" 
            className="fudi-avatar-liberated"
          />
          <div className="mcp-badge">MCP</div>
        </div>

        <FudiMarkdownRenderer content={message.content} />
        
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
        <div className="mcp-badge">MCP</div>
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
          <div className={`input-placeholder-refined ${inputMessage ? 'hidden' : ''}`}>
            Pregúntame sobre ventas, productos, tendencias...
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
              title="Subir documentos y gastos"
              onClick={() => setShowExpenseUpload(!showExpenseUpload)}
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
        🔗 Conectado a Claude MCP • Datos en tiempo real del restaurante
      </p>
    </div>
  );

  // =============================================
  // MAIN RENDER
  // =============================================
  
  return (
    <div className="chat-container-refined">
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      <FudiDashHeader
        currentModule="chat"
        userName={userData.ownerName}
        restaurantName={userData.restaurantName}
        conversations={conversations.map(conv => ({
          id: conv.id,
          title: conv.title,
          timestamp: conv.timestamp
        }))}
        onLogout={handleLogout}
        onNewConversation={startNewConversation}
        onSwitchConversation={switchConversation}
      />

      <main className="chat-main-refined">
        <div className="messages-area-refined">
          {showWelcome && messages.length === 0 ? 
            renderWelcomeScreen() : 
            renderMessagesArea()
          }
        </div>

        {showExpenseUpload && (
          <ExpenseUpload
            restaurantId={userData.restaurantId}
            onAnalysisComplete={handleExpenseAnalysisComplete}
          />
        )}

        {renderInputArea()}
      </main>
      
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
      
      <style jsx>{`
        .mcp-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(45deg, #10b981, #059669);
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .suggestion-chip {
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.3);
          color: #93c5fd;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          margin: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        
        .suggestion-chip:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: #60a5fa;
          transform: translateY(-1px);
        }
        
        .welcome-suggestions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}