'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { fudiAPI } from '@/lib/api';
import FudiSignature from '../../../components/FudiSignature';

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
// Saludos dinámicos casuales
const getRandomGreeting = (restaurantName: string) => {
  const greetings = [
    `¿Qué promo chida aventamos hoy en ${restaurantName}?`,
    `¿Cómo le sacamos más jugo a ${restaurantName} hoy?`,
    `Listo para hacer que ${restaurantName} rompa récords`,
    `¿Qué estrategia genial implementamos hoy?`,
    `Hora de hacer que ${restaurantName} se ponga bueno`,
    `¿Con qué movimiento inteligente arrancamos?`,
    `De vuelta a hacer lana con ${restaurantName}`,
    `¿Cómo hacemos ${restaurantName} aún más rentable HOY?`,
    `Listo para maximizar las ganancias de ${restaurantName}`,
    `¿Qué movimiento chido le damos a ${restaurantName}?`
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// WORLD CLASS Matrix Welcome Ticker - Zero Dependencies Issues
// Constants moved outside component to prevent re-creation
const RANDOM_CHARS = '01フウディGPT人工知能×◊∆◇□■▣▤▥▦▧▨▩0101110011';

const MatrixWelcomeTicker = ({ restaurantName }: { restaurantName: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [glitchPhase, setGlitchPhase] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);

  // Glitch animation - stable, no dependencies
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Particle system - stable, no dependencies  
  useEffect(() => {
    const particleInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now(),
          x: Math.random() * 800,
          y: Math.random() * 300,
          opacity: 1
        };
        
        setParticles(prev => [...prev.slice(-12), newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 3000);
      }
    }, 600);

    return () => clearInterval(particleInterval);
  }, []);

  // WORLD CLASS typing animation - single useEffect, no loops
  useEffect(() => {
    // Create phases array once, with current restaurantName
    const phases = [
      `BIENVENIDO A FUDIGPT, ${restaurantName.toUpperCase()}!`,
      `CONECTANDO A ${restaurantName.toUpperCase()}...`,  
      `READY TO JOIN THE FUDIVERSE?`
    ];

    let currentPhase = 0;
    let currentChar = 0;
    let isDestroyed = false;
    
    const typeNextCharacter = () => {
      if (isDestroyed) return;
      
      // Check if we're done with all phases
      if (currentPhase >= phases.length) {
        setIsComplete(true);
        return;
      }

      const currentText = phases[currentPhase];
      
      if (currentChar < currentText.length) {
        // Matrix reveal effect with random characters
        let matrixCycles = 0;
        const matrixReveal = setInterval(() => {
          if (isDestroyed) {
            clearInterval(matrixReveal);
            return;
          }
          
          if (matrixCycles < 1) {
            // Show random character
            const randomChar = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
            const revealedPart = currentText.substring(0, currentChar);
            setDisplayText(revealedPart + randomChar);
            matrixCycles++;
          } else {
            // Reveal actual character
            const revealedPart = currentText.substring(0, currentChar + 1);
            setDisplayText(revealedPart);
            currentChar++;
            clearInterval(matrixReveal);
            
            // Continue with next character
            setTimeout(typeNextCharacter, 10);
          }
        }, 20);
      } else {
        // Finished current phase, move to next
        if (currentPhase < phases.length - 1) {
          setTimeout(() => {
            if (isDestroyed) return;
            currentPhase++;
            currentChar = 0;
            setDisplayText('');
            typeNextCharacter();
          }, 1000);
        } else {
          setIsComplete(true);
        } 5000; // 5 segundos extra
      }
    };

    // Start the animation after initial delay
    const startTimeout = setTimeout(() => {
      if (!isDestroyed) {
        typeNextCharacter();
      }
    }, 100);

    // Cleanup function
    return () => {
      isDestroyed = true;
      clearTimeout(startTimeout);
    };
  }, [restaurantName]); // Only depend on restaurantName

  const glitchIntensity = Math.sin(glitchPhase * 0.05) * 0.3 + 0.7;
  const shouldGlitch = Math.random() > 0.95;

  return (
    <div className="relative flex flex-col items-center justify-center py-24 overflow-hidden min-h-[500px]">
      
      {/* Digital Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(56, 189, 248, 0.08) 0%, transparent 50%)`,
          backgroundSize: '120px 120px',
          animation: 'matrixFloat 25s infinite linear'
        }} />
      </div>

      {/* Code streaming effect - background */}
      {!isComplete && (
        <>
          <div className="absolute top-8 left-8 text-xs font-mono opacity-10 text-cyan-300">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} style={{
                transform: `translateY(${Math.sin(glitchPhase * 0.03 + i) * 8}px)`,
                opacity: Math.sin(glitchPhase * 0.02 + i) * 0.3 + 0.7
              }}>
                {RANDOM_CHARS.slice(i * 6, i * 6 + 12)}
              </div>
            ))}
          </div>

          <div className="absolute top-8 right-8 text-xs font-mono opacity-10 text-cyan-300">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} style={{
                transform: `translateY(${Math.sin(glitchPhase * 0.025 + i + 5) * 8}px)`,
                opacity: Math.sin(glitchPhase * 0.03 + i + 5) * 0.3 + 0.7
              }}>
                {RANDOM_CHARS.slice(i * 5 + 15, i * 5 + 25)}
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-8 text-xs font-mono opacity-10 text-cyan-300">
            {Array.from({length: 2}).map((_, i) => (
              <div key={i} style={{
                transform: `translateY(${Math.sin(glitchPhase * 0.04 + i + 10) * 6}px)`,
                opacity: Math.sin(glitchPhase * 0.025 + i + 10) * 0.3 + 0.7
              }}>
                {RANDOM_CHARS.slice(i * 4 + 30, i * 4 + 38)}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              animation: 'particleFloat 3s ease-out forwards',
              boxShadow: '0 0 6px rgba(6, 182, 212, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Main Matrix Text */}
      <div className="relative mb-6">
        <div 
          className="text-5xl md:text-6xl font-bold tracking-wide font-mono transition-all duration-200 text-center min-h-[4rem] flex items-center justify-center"
          style={{
            color: 'rgba(6, 182, 212, 0.95)',
            textShadow: `
              0 0 50px rgba(6, 182, 212, 0.7),
              0 0 60px rgba(6, 182, 212, 0.5),
              0 0 70px rgba(6, 182, 212, 0.3),
              0 0 80px rgba(6, 182, 212, 0.1)
            `,
            filter: shouldGlitch ? `hue-rotate(${Math.random() * 30}deg) saturate(${1.2 + Math.random() * 0.3})` : 'none',
            transform: shouldGlitch ? `translateX(${Math.random() * 3 - 1.5}px)` : 'none'
          }}
        >
          {displayText}
          
          {/* Matrix cursor */}
          {!isComplete && (
            <span 
              className="inline-block ml-3 w-1 h-12 md:h-16 bg-cyan-400"
              style={{
                opacity: Math.sin(glitchPhase * 0.1) * 0.4 + 0.6,
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.9)',
                animation: 'pulse 1.5s infinite'
              }}
            />
          )}
          
          {/* Scanning line effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)`,
              transform: `translateX(${Math.sin(glitchPhase * 0.02) * 300}%)`,
              opacity: glitchIntensity * 0.4
            }}
          />
        </div>
        
        {/* Glow effect behind main text */}
        <div 
          className="absolute inset-0 text-5xl md:text-6xl font-bold tracking-wide font-mono blur-lg -z-10"
          style={{
            color: 'rgba(6, 182, 212, 0.3)',
            transform: 'scale(1.1)'
          }}
        >
          {displayText}
        </div>
      </div>

      {/* Final state */}
      {isComplete && (
        <div className="text-center animate-fade-in">
          <div 
            className="text-lg font-mono tracking-[0.2em] uppercase mb-12"
            style={{
              color: 'rgba(56, 189, 248, 0.8)',
              textShadow: '0 0 8px rgba(56, 189, 248, 0.4)',
              letterSpacing: '0.2em'
            }}
          >
            join_the_fudiverse
          </div>
          
          {/* Flame cursor like in FudiSignature */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <svg 
              width="20" 
              height="28" 
              viewBox="0 0 20 28" 
              className="transition-all duration-200"
              style={{
                opacity: Math.sin(glitchPhase * 0.1) * 0.4 + 0.6,
                filter: `drop-shadow(0 0 ${4 + Math.sin(glitchPhase * 0.08) * 2}px rgba(6, 182, 212, 0.8))`,
                transform: `translateY(${Math.sin(glitchPhase * 0.06) * 2}px)`
              }}
            >
              <path
                d="M10 2 C 7 6, 5 10, 6 15 C 7 20, 13 22, 15 17 C 16 14, 15 11, 14 9 C 13 7, 12 5, 10 2 Z"
                fill="url(#flameGradient)"
              />
              <path
                d="M10 5 C 8 8, 7 12, 8 15 C 8.5 17, 11.5 18, 13 15 C 14 12, 13 11, 12 9 C 11 7, 10.5 6, 10 5 Z"
                fill="url(#flameInner)"
              />
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 1)" />
                  <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
                  <stop offset="100%" stopColor="rgba(147, 197, 253, 0.7)" />
                </linearGradient>
                <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" 
                 style={{boxShadow: '0 0 12px rgba(34, 197, 94, 0.7)'}} />
            <span className="text-green-400 text-base font-mono tracking-wider font-medium">SISTEMA ONLINE</span>
          </div>
          
          {/* Subtitle */}
          <div 
            className="text-base text-gray-400 font-light max-w-md mx-auto"
            style={{
              textShadow: '0 0 4px rgba(156, 163, 175, 0.3)'
            }}
          >
            Sistema de inteligencia restaurantera activado para {restaurantName}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes matrixFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }

        @keyframes particleFloat {
          0% { 
            opacity: 1; 
            transform: translateY(0px) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.3);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (max-width: 768px) {
          .text-5xl {
            font-size: 3rem;
            line-height: 1;
          }
        }

        @media (max-width: 480px) {
          .text-5xl {
            font-size: 2.25rem;
            line-height: 1;
          }
        }
      `}</style>
    </div>
  );
};

const [messages, setMessages] = useState([
  {
    id: 1,
    type: 'assistant',
    content: '', // Vacío inicialmente
    timestamp: new Date()
  }
]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState({
  restaurantName: 'Cargando...',
  ownerName: 'Usuario',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
});

// Obtener datos del token
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
      
      // NUEVA LÍNEA - Actualizar saludo
      setMessages([{
        id: 1,
        type: 'assistant',
        content: getRandomGreeting(decoded.restaurantName || 'Tu Restaurante'),
        timestamp: new Date()
      }]);
    // En el useEffect, agrega al final:
    } catch (error) {
      console.error('Error decoding token:', error);
      // NUEVO: Si no hay token, usar saludo genérico
      setMessages([{
        id: 1,
        type: 'assistant',
        content: getRandomGreeting('Tu Restaurante'),
        timestamp: new Date()
      }]);
    }
  }
}, []);

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
      const response = await fudiAPI.getDashboardStats(userData.restaurantId);
      
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
        userData.restaurantId, // Cambiar de hardcodeado a dinámico
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
                  <p className="text-sm font-medium">{userData.restaurantName}</p>
                  <p className="text-xs text-gray-400">Plan Pro</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium">{userData.restaurantName.substring(0, 2).toUpperCase()}</span>
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
                            <FudiSignature content={message.content} />
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
            {/* Matrix Welcome Ticker - Only show when showQuickActions is true */}
            {showQuickActions && (
              <div className="px-6 py-8">
                <div className="max-w-3xl mx-auto">
                  <MatrixWelcomeTicker restaurantName={userData.restaurantName} />
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
        .quantum-neural-markdown {
          word-wrap: break-word;
        }

        .quantum-neural-markdown pre {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .quantum-neural-markdown code {
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