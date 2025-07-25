'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { fudiAPI } from '@/lib/api';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSmartVisualization } from '@/components/fudiverse/FudiSmartVisualization';
import { enhanceMessageWithVisualization } from '@/utils/fudiVisualizationEngine';
import { FudiChartsStyles } from '@/components/charts/FudiCharts';
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
  hasVisualization?: boolean;
  visualizationData?: any;
}

interface UserData {
  restaurantName: string;
  ownerName: string;
  restaurantId: string;
}

// Markdown Components
const MarkdownComponents = {
  h1: ({ children }: any) => (
    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#60a5fa', marginBottom: '1.5rem' }}>
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fb923c', marginBottom: '1rem' }}>
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#a78bfa', marginBottom: '0.75rem' }}>
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p style={{ marginBottom: '1rem', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.9)' }}>
      {children}
    </p>
  ),
  strong: ({ children }: any) => (
    <strong style={{ fontWeight: 800, color: '#fb923c' }}>
      {children}
    </strong>
  ),
  ul: ({ children }: any) => (
    <ul style={{ background: 'rgba(96, 165, 250, 0.05)', padding: '1rem', margin: '1rem 0' }}>
      {children}
    </ul>
  ),
  li: ({ children }: any) => (
    <li style={{ marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
      {children}
    </li>
  ),
  code: ({ inline, children }: any) => {
    if (inline) {
      return (
        <code style={{ background: 'rgba(96, 165, 250, 0.15)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
          {children}
        </code>
      );
    }
    return (
      <pre style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '1rem', borderRadius: '8px' }}>
        <code style={{ color: '#10b981' }}>{children}</code>
      </pre>
    );
  }
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
  const [restaurantData, setRestaurantData] = useState<any>(null);

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

  // API call
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
        return { response: data.response, data: data.restaurantData || null };
      } else {
        return { response: `Error: ${data.error}`, data: null };
      }
    } catch (error) {
      return { 
        response: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`, 
        data: null 
      };
    }
  };

  // Send message
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
      
      // Enhance with visualizations

      console.log('🚨 TESTING - About to call enhanceMessageWithVisualization');
      console.log('🚨 userMessageContent:', userMessageContent);
      console.log('🚨 claudeResult.response length:', claudeResult.response.length);
      
      const enhancedResult = enhanceMessageWithVisualization(userMessageContent, claudeResult.response, claudeResult.data || {});
      
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: enhancedResult.enhancedText,
        timestamp: new Date(),
        hasVisualization: enhancedResult.hasVisualization,
        visualizationData: enhancedResult.hasVisualization ? {
          userMessage: userMessageContent,
          restaurantData: claudeResult.data || restaurantData,
          visualizationType: enhancedResult.visualizationType
        } : null
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (claudeResult.data) {
        setRestaurantData(claudeResult.data);
      }

      // Save interaction
      if (conversationId) {
        await fudiAPI.conversations.saveInteraction({
          restaurantId: userData.restaurantId,
          conversationId: conversationId,
          userMessage: userMessageContent,
          fudiResponse: enhancedResult.enhancedText,
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

  // Render functions
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
        
        {message.hasVisualization && message.visualizationData && (
          <div className="fudi-visualization-container">
            <FudiSmartVisualization
              userMessage={message.visualizationData.userMessage}
              responseText={message.content}
              restaurantData={message.visualizationData.restaurantData}
            />
          </div>
        )}
        
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
      
      <FudiChartsStyles />
      
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
        
        .fudi-visualization-container {
          margin: 1rem 0;
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}