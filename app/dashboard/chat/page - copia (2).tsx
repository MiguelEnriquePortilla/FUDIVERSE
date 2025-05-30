'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { fudiAPI } from '@/lib/api';
import FudiMarkdown from '../../../components/FudiMarkdown';

interface InsightCard {
  id: number;
  type: 'battle' | 'trivia' | 'record' | 'plot-twist' | 'prediction' | 'bombshell' | 'confession' | 'challenge';
  title: string;
  subtitle?: string;
  value?: string;
  emoji?: string;
  color: string;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! Soy Fudi, tu asistente restaurantero inteligente. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Estado para stats con useState
  const [stats, setStats] = useState([
    { label: 'Ventas Hoy', value: '$15,234', change: '+12%', positive: true },
    { label: 'Tickets', value: '47', change: '+5', positive: true },
    { label: 'Ticket Promedio', value: '$324', change: '-2%', positive: false },
    { label: 'Mejor Platillo', value: 'Tacos Pastor', subtitle: '18 vendidos' }
  ]);

  // Función para obtener stats reales
  const fetchDashboardStats = async () => {
    try {
      const response = await fudiAPI.getDashboardStats('13207c90-2ea6-4aa0-bfac-349753d24ea4');
      
      if (response.success && response.stats) {
        // Actualizar los stats con datos reales
        setStats([
          { 
            label: 'Ventas Hoy', 
            value: `$${response.stats.ventasHoy.toLocaleString()}`, 
            change: response.stats.cambioVentas, 
            positive: response.stats.cambioVentas.startsWith('+') 
          },
          { 
            label: 'Tickets', 
            value: response.stats.tickets.toString(), 
            change: response.stats.cambioTickets, 
            positive: response.stats.cambioTickets.startsWith('+') 
          },
          { 
            label: 'Ticket Promedio', 
            value: `$${response.stats.ticketPromedio.toFixed(2)}`, 
            change: response.stats.cambioTicket, 
            positive: !response.stats.cambioTicket.startsWith('-') 
          },
          { 
            label: 'Mejor Platillo', 
            value: response.stats.mejorPlatillo, 
            subtitle: response.stats.vendidosMejor 
          }
        ]);
      }
    } catch (error) {
      console.error('Error al obtener stats:', error);
    }
  };

  // Llamar al cargar el componente
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Insights data
  const insights: InsightCard[] = [
    {
      id: 1,
      type: 'battle',
      emoji: '⚔️',
      title: 'NO MAMES 😱',
      subtitle: 'El taquero de enfrente te está DESTROZANDO',
      value: 'Él: 156 tacos | Tú: 127 tacos',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 2,
      type: 'trivia',
      emoji: '🤯',
      title: '¿SABÍAS QUE...?',
      subtitle: 'Vendiste más que el 87% de tu zona',
      value: 'Eres TOP 13% 💪',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      type: 'record',
      emoji: '🏆',
      title: '¡NUEVO RÉCORD!',
      subtitle: 'Mejor martes en 3 meses',
      value: '$45,231 MXN',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      type: 'plot-twist',
      emoji: '😵',
      title: 'PLOT TWIST',
      subtitle: 'Tu taco de $35 genera MÁS profit que el de $65',
      value: '¿Cómo? 🤔',
      color: 'from-blue-500/20 to-purple-500/20'
    }
  ];

  // Auto-rotate insights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [insights.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: '📊', text: '¿Cómo van las ventas hoy?', emoji: true },
    { icon: '🍕', text: '¿Cuál es mi platillo estrella?', emoji: true },
    { icon: '📈', text: 'Análisis del último mes', emoji: true },
    { icon: '💡', text: '¿Qué debo promocionar?', emoji: true }
  ];

  const bottomActions = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      text: 'Ventas del día'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Calcular costos'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      text: 'Tendencias'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      text: 'Tips FudiVerse'
    }
  ];

  const sidebarActions = [
    { icon: '📦', text: 'Actualizar inventario' },
    { icon: '💰', text: 'Subir gastos' },
    { icon: '🍽️', text: 'Agregar platillos' },
    { icon: '💵', text: 'Cambiar precios' },
    { icon: '👥', text: 'Ver empleados' },
    { icon: '📋', text: 'Generar reporte' }
  ];

  const handleQuickAction = (action: any) => {
    setInputMessage(action.text);
    setShowQuickActions(false);
    // Clear messages except the first one
    setMessages([messages[0]]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Hide quick actions when sending a message
    setShowQuickActions(false);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // CONEXIÓN REAL CON CLAUDE
      const response = await fudiAPI.chat(
        '13207c90-2ea6-4aa0-bfac-349753d24ea4', // Restaurant ID
        inputMessage
      );

      if (response.success) {
        const aiMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: response.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Mensaje de error
        const errorMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: 'Lo siento, tuve un problema al procesar tu pregunta. ¿Puedes intentar de nuevo?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Ups, parece que hay un problema de conexión. Verifica que el servidor esté activo.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202222] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#202222]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <img src="/images/logo.png" alt="FudiGPT" className="h-8 w-auto" />
                <span className="text-xl font-light">FudiGPT</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-cyan-400 font-medium">Inicio</Link>
                <Link href="/dashboard/discover" className="text-gray-400 hover:text-white transition-colors">Discover</Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Tacos El Paisa</p>
                  <p className="text-xs text-gray-400">Plan Pro</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium">TP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-screen pt-16 overflow-hidden">
        {/* Sidebar with Stats - Always show toggle button */}
        <div className="relative">
          <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-white/10 bg-[#1a1a1a] overflow-hidden hidden lg:block h-full`}>
            <div className="p-6 h-full overflow-y-auto overflow-x-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-light text-gray-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  Dashboard
                </h3>
              </div>
              
              {sidebarOpen && (
                <>
                  {/* NEW: Insights Section */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-400 mb-4 flex items-center justify-between">
                      <span>FudiVerse Insights</span>
                      <span className="text-xs text-cyan-400">EN VIVO</span>
                    </h4>
                    
                    {/* Insight Card */}
                    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${insights[currentInsightIndex].color} backdrop-blur-sm border border-white/10 p-4 cursor-pointer hover:border-white/20 transition-all`}>
                      {/* Progress bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-black/20">
                        <div className="h-full bg-white/40 animate-progress"></div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="text-3xl mb-3">{insights[currentInsightIndex].emoji}</div>
                        <h5 className="text-sm font-bold mb-1">{insights[currentInsightIndex].title}</h5>
                        <p className="text-xs text-gray-300 mb-2">{insights[currentInsightIndex].subtitle}</p>
                        <p className="text-lg font-semibold">{insights[currentInsightIndex].value}</p>
                      </div>
                      
                      {/* Navigation dots */}
                      <div className="flex gap-1 mt-4 justify-center">
                        {insights.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentInsightIndex(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === currentInsightIndex ? 'bg-white w-4' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-all flex items-center justify-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 010-5.684" />
                        </svg>
                        Compartir
                      </button>
                      <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-all flex items-center justify-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h6a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h5l4 4v-4z" />
                        </svg>
                        Ver más
                      </button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="space-y-4 mt-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm text-gray-400">{stat.label}</p>
                          {stat.change && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              stat.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {stat.change}
                            </span>
                          )}
                        </div>
                        <p className="text-2xl font-light">{stat.value}</p>
                        {stat.subtitle && (
                          <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Acciones Rápidas</h4>
                    <div className="space-y-2">
                      {sidebarActions.map((action, index) => (
                        <button key={index} className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-3">
                          <span>{action.icon}</span>
                          <span>{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>
          
          {/* Toggle button - Always visible */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`absolute top-6 ${sidebarOpen ? 'right-6' : 'left-4'} p-1.5 hover:bg-white/5 rounded-lg transition-all hidden lg:block`}
          >
            <svg className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Chat Section */}
        <main className="flex-1 flex flex-col bg-[#202222] h-full overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto h-full">
            <div className="max-w-3xl mx-auto px-6 py-8">
              {messages.length === 1 && showQuickActions && (
                <div className="text-center mb-12">
                  <img src="/images/logo.png" alt="FudiGPT" className="w-20 h-20 mx-auto mb-6 opacity-80" />
                  <h1 className="text-4xl font-light mb-2">FudiGPT</h1>
                  <p className="text-gray-400">Tu asistente inteligente para restaurantes</p>
                </div>
              )}
              
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      {message.type === 'assistant' && (
                        <img 
                          src="/images/logo.png" 
                          alt="Fudi" 
                          className="w-8 h-8 rounded-full object-contain flex-shrink-0"
                        />
                      )}
                      <div className={`px-5 py-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-[#2d2d2d] text-white' 
                          : 'bg-transparent'
                      }`}>
                        {message.type === 'assistant' ? (
                          <div className="text-[15px] leading-relaxed fudi-markdown">
                            <FudiMarkdown content={message.content} />
                          </div>
                        ) : (
                          <p className="text-[15px] leading-relaxed">{message.content}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-3">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-2xl">
                      <img 
                        src="/images/logo.png" 
                        alt="Fudi" 
                        className="w-8 h-8 rounded-full object-contain flex-shrink-0"
                      />
                      <div className="px-5 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10">
            {/* Quick Actions - Only show when showQuickActions is true */}
            {showQuickActions && (
              <div className="px-6 py-4">
                <div className="max-w-3xl mx-auto">
                  <div className="flex gap-3 flex-wrap justify-center">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] hover:bg-[#363636] rounded-full text-sm transition-all"
                      >
                        <span className="text-base">{action.icon}</span>
                        <span>{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input Section */}
            <div className="px-6 py-6">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSendMessage}>
                  <div className="relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Pregúntale a Fudi sobre tu restaurante..."
                      className="w-full px-6 py-4 pr-32 bg-[#2d2d2d] border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all text-[15px]"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        className="p-2.5 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="p-2.5 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        className="p-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                
                {/* Bottom Actions - FudiVerse themed */}
                <div className="flex gap-6 justify-center mt-6">
                  {bottomActions.map((action, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {action.icon}
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  FudiGPT puede cometer errores. Verifica la información importante.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-progress {
          animation: progress 10s linear infinite;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>

      <style jsx global>{`
        /* Scrollbar minimalista */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Estilos específicos para el Markdown de Fudi */
        .fudi-markdown {
          word-wrap: break-word;
        }

        .fudi-markdown pre {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .fudi-markdown code {
          font-family: 'Fira Code', 'Consolas', monospace;
        }
        
        /* Animaciones para los separadores locos */
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes synthwave-bar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        
        .animate-matrix-fall {
          animation: matrix-fall 2s linear infinite;
        }
        
        .animate-wave {
          animation: wave 3s linear infinite;
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-float.delay-100 {
          animation-delay: 0.1s;
        }
        
        .animate-float.delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-synthwave-bar {
          animation: synthwave-bar 1s ease-in-out infinite;
        }
        
        /* Glitch effect */
        .glitch {
          position: relative;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #00ffff;
          z-index: -1;
        }
        
        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #ff00ff;
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 30% 0); transform: translate(-2px, 2px); }
          25% { clip-path: inset(45% 0 25% 0); transform: translate(2px, -2px); }
          50% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); }
          75% { clip-path: inset(10% 0 60% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 2px); }
        }
        
        @keyframes glitch-2 {
          0% { clip-path: inset(65% 0 10% 0); transform: translate(1px, -1px); }
          25% { clip-path: inset(15% 0 65% 0); transform: translate(-1px, 1px); }
          50% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -2px); }
          75% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(25% 0 55% 0); transform: translate(1px, -1px); }
        }
        
        /* Custom animation timing */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}