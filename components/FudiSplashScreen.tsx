'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function FudiSplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const welcomeMessages = [
    "¡Hola! Soy FUDI",
    "Tu asistente AI para restaurantes",
    "How may I help you?"
  ];

  useEffect(() => {
    // Ciclo de mensajes cada 800ms
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % welcomeMessages.length);
    }, 800);

    // Termina el splash después de 2.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fudi-splash-overlay">
      <div className="fudi-splash-content">
        {/* Logo FUDI con animación de entrada */}
        <div className="fudi-logo-container">
          <Image
            src="/fudi-logo.png" // Tu logo azul de FUDI chef
            alt="FUDI - Tu asistente AI"
            width={140}
            height={140}
            priority
            className="fudi-logo"
          />
        </div>
        
        {/* Mensajes de bienvenida que cambian */}
        <div className="fudi-welcome-text">
          <h1 className="fudi-title">fudiGPT</h1>
          <p className="fudi-message" key={currentMessage}>
            {welcomeMessages[currentMessage]}
          </p>
        </div>
        
        {/* Indicador de carga sutil */}
        <div className="fudi-loading-indicator">
          <div className="loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        .fudi-splash-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 50%, #1e3a5f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeOut 0.6s ease-out 2s forwards;
        }

        .fudi-splash-content {
          text-align: center;
          color: white;
          max-width: 400px;
          padding: 40px;
        }

        .fudi-logo-container {
          margin-bottom: 30px;
          animation: logoEntrance 1.2s ease-out;
        }

        .fudi-logo {
          border-radius: 24px;
          filter: drop-shadow(0 15px 35px rgba(0, 188, 212, 0.4));
          transition: transform 0.3s ease;
        }

        .fudi-logo:hover {
          transform: scale(1.05);
        }

        .fudi-welcome-text {
          margin-bottom: 40px;
        }

        .fudi-title {
          font-size: 2.8rem;
          font-weight: 700;
          margin: 0 0 20px 0;
          background: linear-gradient(135deg, #00bcd4, #4dd0e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fudi-message {
          font-size: 1.3rem;
          margin: 0;
          opacity: 0.9;
          font-weight: 500;
          min-height: 32px;
          animation: messageSlide 0.6s ease-out;
        }

        .fudi-loading-indicator {
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          margin: 0 auto;
          overflow: hidden;
        }

        .loading-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #00bcd4, #4dd0e1);
          border-radius: 2px;
          animation: loadingProgress 2.5s ease-out forwards;
          transform: translateX(-100%);
        }

        @keyframes logoEntrance {
          0% { 
            transform: scale(0.3) rotate(-10deg); 
            opacity: 0; 
          }
          60% { 
            transform: scale(1.1) rotate(5deg); 
          }
          100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 1; 
          }
        }

        @keyframes messageSlide {
          0% { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          100% { 
            opacity: 0.9; 
            transform: translateY(0); 
          }
        }

        @keyframes loadingProgress {
          0% { 
            transform: translateX(-100%); 
          }
          100% { 
            transform: translateX(0%); 
          }
        }

        @keyframes fadeOut {
          to { 
            opacity: 0; 
            pointer-events: none; 
            visibility: hidden;
          }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .fudi-splash-content {
            padding: 20px;
          }
          
          .fudi-title {
            font-size: 2.2rem;
          }
          
          .fudi-message {
            font-size: 1.1rem;
          }
          
          .fudi-logo-container {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}