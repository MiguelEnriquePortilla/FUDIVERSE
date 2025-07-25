'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import '@/styles/pages/chat.css';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
import remarkGfm from 'remark-gfm';

// Types
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

// 🎨 MARKDOWN COMPONENTS MEJORADOS COMO CLAUDE
const MarkdownComponents = {
  h1: ({ children }: any) => (
    <h1 style={{ 
      fontSize: '2.5rem', 
      fontWeight: 900, 
      color: '#60a5fa', 
      marginBottom: '1.5rem',
      textAlign: 'center'
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
      borderBottom: '2px solid rgba(251, 146, 60, 0.3)',
      paddingBottom: '0.5rem'
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
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1.1rem'
    }}>
      {children}
    </p>
  ),
  strong: ({ children }: any) => (
    <strong style={{ 
      fontWeight: 800, 
      color: '#fb923c',
      background: 'rgba(251, 146, 60, 0.1)',
      padding: '0.1rem 0.3rem',
      borderRadius: '4px'
    }}>
      {children}
    </strong>
  ),
  em: ({ children }: any) => (
    <em style={{ 
      color: '#60a5fa',
      fontStyle: 'italic'
    }}>
      {children}
    </em>
  ),
  // 📊 TABLAS COMO CLAUDE
  table: ({ children }: any) => (
    <div style={{ 
      overflow: 'auto', 
      margin: '1.5rem 0',
      borderRadius: '12px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(96, 165, 250, 0.2)'
    }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse'
      }}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead style={{ 
      background: 'rgba(96, 165, 250, 0.2)'
    }}>
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => (
    <tbody>
      {children}
    </tbody>
  ),
  th: ({ children }: any) => (
    <th style={{ 
      padding: '1rem', 
      textAlign: 'left', 
      fontWeight: 700,
      color: '#60a5fa',
      borderBottom: '2px solid rgba(96, 165, 250, 0.3)'
    }}>
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td style={{ 
      padding: '0.75rem 1rem', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {children}
    </td>
  ),
  // 📝 LISTAS COMO CLAUDE
  ul: ({ children }: any) => (
    <ul style={{ 
      background: 'rgba(96, 165, 250, 0.05)', 
      padding: '1.5rem', 
      margin: '1rem 0',
      borderRadius: '12px',
      border: '1px solid rgba(96, 165, 250, 0.2)',
      listStyle: 'none'
    }}>
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol style={{ 
      background: 'rgba(167, 139, 250, 0.05)', 
      padding: '1.5rem', 
      margin: '1rem 0',
      borderRadius: '12px',
      border: '1px solid rgba(167, 139, 250, 0.2)',
      counterReset: 'item'
    }}>
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li style={{ 
      marginBottom: '0.75rem', 
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1.05rem',
      lineHeight: '1.6',
      paddingLeft: '0.5rem'
    }}>
      {children}
    </li>
  ),
  // 💻 CÓDIGO COMO CLAUDE
  code: ({ inline, children }: any) => {
    if (inline) {
      return (
        <code style={{ 
          background: 'rgba(96, 165, 250, 0.15)', 
          color: '#60a5fa',
          padding: '0.25rem 0.5rem', 
          borderRadius: '6px',
          fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
          fontSize: '0.9em'
        }}>
          {children}
        </code>
      );
    }
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
        borderRadius: '12px',
        margin: '1.5rem 0',
        overflow: 'auto'
      }}>
        <pre style={{ 
          padding: '1.5rem',
          margin: 0,
          fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace'
        }}>
          <code style={{ 
            color: '#10b981',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
  // 📦 BLOCKQUOTES COMO CLAUDE
  blockquote: ({ children }: any) => (
    <blockquote style={{
      background: 'rgba(251, 146, 60, 0.1)',
      border: '1px solid rgba(251, 146, 60, 0.3)',
      borderLeft: '4px solid #fb923c',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      fontStyle: 'italic',
      color: 'rgba(255, 255, 255, 0.95)'
    }}>
      {children}
    </blockquote>
  ),
  // 🔗 LINKS COMO CLAUDE
  a: ({ children, href }: any) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#60a5fa',
        textDecoration: 'underline',
        textDecorationColor: 'rgba(96, 165, 250, 0.5)',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.color = '#93c5fd';
        (e.target as HTMLElement).style.textDecorationColor = '#60a5fa';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.color = '#60a5fa';
        (e.target as HTMLElement).style.textDecorationColor = 'rgba(96, 165, 250, 0.5)';
      }}
    >
      {children}
    </a>
  ),
  // ➖ HR COMO CLAUDE
  hr: () => (
    <hr style={{
      border: 'none',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent)',
      margin: '2rem 0'
    }} />
  )
};

const FudiMarkdownRenderer = ({ content }: { content: string }) => (
  <div className="fudi-content-liberated">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
      {content}
    </ReactMarkdown>
  </div>
);

const DEMO_USER_DATA: UserData = {
  restaurantName: 'Restaurante Demo',
  ownerName: 'Usuario Demo',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
};

export default function ChatPage() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Utility functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Callbacks for handlers
  const handleLogout = useCallback(() => {
    fudiAPI.logout();
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  }, []);

  const handleNewConversation = useCallback(async () => {
    try {
      const response = await fudiAPI.conversations.create(userData.restaurantId, 'Nueva conversación');
      if (response.success && response.conversation) {
        const newConversation: Conversation = {
          id: response.conversation.id,
          title: response.conversation.title,
          lastMessage: 'Ahora',
          timestamp: new Date()
        };
        setConversations(prev => [newConversation, ...prev]);
        setCurrentConversationId(response.conversation.id);
        setMessages([]);
        setShowWelcome(true);
        setInputMessage('');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  }, [userData.restaurantId]);

  const handleSwitchConversation = useCallback((conversationId: string) => {
    setCurrentConversationId(conversationId);
    setMessages([]);
    setShowWelcome(false);
  }, []);

  // 🚀 API CALL SIMPLIFICADO
  const callClaudeWithMCP = async (userMessage: string) => {
    try {
      const response = await fetch('/api/claude-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          restaurantId: userData.restaurantId
        })
      });
      
      const data = await response.json();
      if (data.success) {
        return { response: data.response };
      } else {
        return { response: `Error: ${data.error}` };
      }
    } catch (error) {
      return { 
        response: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`
      };
    }
  };

  // 📨 SEND MESSAGE SIMPLIFICADO
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setShowWelcome(false);
    const startTime = Date.now();

    // Create conversation if needed
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
        setConversations(prev => [newConversation, ...prev]);
      }
    }

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const userMessageContent = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const claudeResult = await callClaudeWithMCP(userMessageContent);
      const responseTime = Date.now() - startTime;
      
      // ✅ SIMPLE: Solo usar la respuesta de Claude
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: claudeResult.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Save interaction
      if (conversationId) {
        await fudiAPI.conversations.saveInteraction({
          restaurantId: userData.restaurantId,
          conversationId: conversationId,
          userMessage: userMessageContent,
          fudiResponse: claudeResult.response,
          responseTime: responseTime / 1000
        });
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

  // Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    setShowWelcome(false);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Effects
  useEffect(() => {
    const initializeUserData = async () => {
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
          } else {
            throw new Error('Invalid token structure');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          if (process.env.NODE_ENV === 'production') {
            window.location.href = '/login';
          } else {
            setUserData(DEMO_USER_DATA);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'production') {
          window.location.href = '/login';
        } else {
          setUserData(DEMO_USER_DATA);
        }
      }
    };

    initializeUserData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 📱 WELCOME SCREEN CON SUGERENCIAS
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
        
        {/* 💡 SUGERENCIAS RÁPIDAS */}
        <div className="welcome-suggestions">
          <div 
            className="suggestion-chip"
            onClick={() => setInputMessage('¿Cuáles son mis productos más vendidos?')}
          >
            📊 Top productos
          </div>
          <div 
            className="suggestion-chip"
            onClick={() => setInputMessage('¿Cómo estuvieron las ventas esta semana?')}
          >
            💰 Ventas semanales
          </div>
          <div 
            className="suggestion-chip"
            onClick={() => setInputMessage('Muéstrame un resumen completo del negocio')}
          >
            📈 Dashboard completo
          </div>
        </div>
      </div>
    </div>
  );

  // 💬 RENDER MESSAGES
  const renderMessage = (message: Message) => {
    if (message.type === 'user') {
      return (
        <div key={message.id} className="message-wrapper-refined message-wrapper-user-refined">
          <div className="message-card-refined message-card-user-refined">
            <div className="message-content-refined message-content-user-refined">
              <div className="message-text-refined">{message.content}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={message.id} className="fudi-response-liberated">
        <div className="fudi-avatar-float">
          <img src="/images/logo.png" alt="fudiGPT" className="fudi-avatar-liberated" />
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
        <img src="/images/logo.png" alt="fudiGPT" className="fudi-avatar-liberated" />
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

  return (
    <div className="chat-container-refined">
      <FudiBackground variant="gradient" theme="business" opacity={1} fixed={true} />

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
        onNewConversation={handleNewConversation}
        onSwitchConversation={handleSwitchConversation}
      />

      <main className="chat-main-refined">
        <div className="messages-area-refined">
          {showWelcome && messages.length === 0 ? 
            renderWelcomeScreen() : 
            <div className="messages-container-refined">
              <div className="messages-list-refined">
                {messages.map(renderMessage)}
                {isTyping && renderTypingIndicator()}
                <div ref={messagesEndRef} />
              </div>
            </div>
          }
        </div>

        <div className="input-area-refined">
          <div className="input-container-refined">
            <div className="floating-input-refined">
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
                  disabled={!inputMessage.trim() || isTyping}
                  className={`send-button-refined ${
                    inputMessage.trim() && !isTyping
                      ? 'send-button-enabled-refined' 
                      : 'send-button-disabled-refined'
                  }`}
                  onClick={handleSendMessage}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <p className="input-disclaimer-refined">
            🔗 Conectado a Claude MCP • Datos en tiempo real del restaurante
          </p>
        </div>
      </main>
      
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
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          margin: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }
        
        .suggestion-chip:hover {
          background: rgba(96, 165, 250, 0.2);
          border-color: #60a5fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
        }
        
        .welcome-suggestions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 2rem;
          max-width: 600px;
        }
      `}</style>
    </div>
  );
}