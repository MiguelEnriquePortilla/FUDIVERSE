'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Download, Copy, CheckCircle, ExternalLink, Brain, 
  Zap, ArrowRight, Settings, Smartphone, Monitor, 
  BarChart3, TrendingUp, Users, DollarSign, Clock, Play
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import del CSS del claude para mantener consistencia
import '@/styles/pages/claude.css';

interface UserData {
  restaurantName: string;
  ownerName: string;
  restaurantId: string;
  userId?: string;
  apiKey?: string;
}

const DEMO_USER_DATA: UserData = {
  restaurantName: 'Chicken Chicanito',
  ownerName: 'Demo User',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4',
  userId: 'demo-user-id'
};

export default function ClaudePage() {
  const router = useRouter();

  // ✅ CRITICAL STATE
  const [userData, setUserData] = useState<UserData>({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
  });

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // ✅ PRODUCTION AUTH HANDLING
  const handleInvalidAuth = (): void => {
    localStorage.removeItem('fudi_token');
    
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/login';
    } else {
      setUserData(DEMO_USER_DATA);
    }
  };

  // ✅ CRITICAL DATA LOADING
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
              restaurantId: decoded.restaurantId,
              apiKey: decoded.apiKey || undefined
            });
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

  // ✅ CONNECT TO CLAUDE
  const connectToClaude = async (): Promise<void> => {
    setIsConnecting(true);
    setStatusMessage('Conectando tu restaurante con Claude AI...');

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatusMessage('Verificando datos de tu restaurante...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatusMessage('Configurando inteligencia artificial...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatusMessage('¡Conexión exitosa! Redirigiendo a Claude...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      
      // Redirect to Claude
      setTimeout(() => {
        window.open('https://claude.ai', '_blank');
      }, 1000);
      
    } catch (error) {
      console.error('Error connecting:', error);
      setStatusMessage('Error al conectar. Intenta de nuevo.');
      setTimeout(() => setStatusMessage(''), 3000);
    } finally {
      setIsConnecting(false);
    }
  };

  // Demo function
  const openDemo = (): void => {
    window.open('/chat', '_blank');
  };

  return (
    <div className="chat-container-refined">
      
      {/* Background limpio y minimalista como Anthropic */}
      <div className="claude-clean-background">
        <div className="claude-simple-gradient"></div>
      </div>

      {/* Header usando componente Fudi */}
      <FudiHeader 
        currentPage="claude"
        showAuthButtons={false}
      />

      {/* Main Content - Layout Anthropic */}
      <main className="claude-main" style={{ 
        marginTop: '0', 
        position: 'relative', 
        zIndex: 10,
        paddingTop: '2rem'
      }}>
        
        {/* Hero Section - Layout exacto de Anthropic */}
        <div className="claude-hero-section">
          
          {/* Left Side - Content */}
          <div className="claude-content-left">
            
            {            /* Main Headline - Estilo Anthropic */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              color: '#1e293b',
              margin: '0',
              letterSpacing: '-0.02em'
            }}>
              Conecta tu restaurante con Claude AI
            </h1>
            
            {            /* Subtitle - Estilo Anthropic */}
            <p style={{
              fontSize: '1.25rem',
              lineHeight: '1.6',
              color: '#475569',
              margin: '0',
              fontWeight: '400'
            }}>
              Analiza datos en tiempo real, optimiza operaciones y toma decisiones 
              inteligentes con la IA más avanzada aplicada a tu restaurante.
            </p>

            {/* Status Message */}
            {statusMessage && (
              <div className="claude-status-message">
                <div className="claude-status-indicator"></div>
                <span>{statusMessage}</span>
              </div>
            )}
            
            {/* Buttons - Estilo Anthropic */}
            <div className="claude-buttons-container">
              
              {/* Primary Button */}
              <button
                onClick={connectToClaude}
                disabled={isConnecting || isConnected}
                className="claude-primary-button"
              >
                {isConnecting ? (
                  <>
                    <div className="claude-spinner"></div>
                    Conectando...
                  </>
                ) : isConnected ? (
                  <>
                    <CheckCircle size={16} />
                    Conectado
                  </>
                ) : (
                  <>
                    Conectar ahora
                  </>
                )}
              </button>
              
              {/* Secondary Button */}
              <button
                onClick={openDemo}
                className="claude-secondary-button"
              >
                <Play size={16} />
                Ver demo
              </button>
            </div>
          </div>
          
          {/* Right Side - Logo con contenedor estilizado */}
          <div className="claude-logo-container">
            <div className="claude-logo-wrapper">
              {/* Efecto de glow detrás del logo */}
              <div className="claude-logo-glow"></div>
              
              {/* Logo principal con bordes redondeados */}
              <div className="claude-logo-frame">
                <img 
                  src="/FudiClaude.png" 
                  alt="fudiGPT - AI para Restaurantes"
                  className="claude-main-logo"
                />
              </div>
              
              {/* Texto elegante debajo */}
              <div className="claude-powered-text">
                <span>POWERED BY CLAUDE AI</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS mejorado con efectos futuristas */}
      <style jsx>{`
        /* Responsive para mobile */
        @media (max-width: 768px) {
          .claude-hero-section {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          
          .claude-logo-container {
            order: -1;
            height: 500px !important;
          }
          
          .claude-logo-frame {
            width: 350px !important;
            height: 350px !important;
            border-radius: 30px !important;
          }

          .claude-logo-glow {
            width: 400px !important;
            height: 400px !important;
          }

          .claude-main-logo {
            border-radius: 25px !important;
          }
        }
      `}</style>
    </div>
  );
}