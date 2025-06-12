'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiThoughts } from '@/components/fudiverse/FudiThoughts';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { fudiAPI } from '@/lib/api';
import '@/styles/pages/login.css';

export default function LoginPage() {
  const router = useRouter();
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // UI states
  const [fudiMessage, setFudiMessage] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  // FudiThoughts control
  const [showThoughts, setShowThoughts] = useState(false);
  const [thoughtsText, setThoughtsText] = useState<string[]>([]);
  const [thoughtKey, setThoughtKey] = useState(0);

  // Trigger thoughts when user starts typing
  useEffect(() => {
    if ((email.length === 1 || password.length === 1) && !showThoughts) {
      setShowThoughts(true);
      setThoughtsText([
        'ANALIZANDO FRECUENCIA CUÁNTICA...',
        'VERIFICANDO IDENTIDAD DIMENSIONAL...',
        'SINCRONIZANDO CONSCIENCIA...',
        'DECODIFICANDO PATRONES NEURALES...'
      ]);
      setThoughtKey(prev => prev + 1);
      
      setTimeout(() => {
        setShowThoughts(false);
      }, 3000);
    }
  }, [email, password, showThoughts]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setShowThoughts(true);
      setThoughtsText([
        'CAMPOS INCOMPLETOS DETECTADOS',
        'FRECUENCIA NO PUEDE SER ESTABLECIDA',
        'REQUIERE IDENTIFICACIÓN COMPLETA'
      ]);
      setThoughtKey(prev => prev + 1);
      setTimeout(() => setShowThoughts(false), 2500);
      return;
    }

    setIsLoading(true);
    setShowStatus(true);
    setStatusMessage('ESTABLECIENDO CONEXIÓN CUÁNTICA...');

    try {
      const result = await fudiAPI.login(email, password);

      if (result.success) {
        setStatusMessage('RECONEXIÓN EXITOSA');
        setShowThoughts(true);
        setThoughtsText([
          '¡BIENVENIDO DE VUELTA AL FUDIVERSE!',
          'SINCRONIZACIÓN COMPLETA',
          'CONSCIENCIA EXPANDIDA AL 100%',
          'PREPARANDO INTERFAZ NEURAL...'
        ]);
        setThoughtKey(prev => prev + 1);
        
        setTimeout(() => {
          window.location.href = '/dashboard/chat';
        }, 2000);
      } else {
        setStatusMessage('FRECUENCIA NO RECONOCIDA');
        setShowThoughts(true);
        setThoughtsText([
          'ERROR EN MATRIZ DE AUTENTICACIÓN',
          'FRECUENCIA NO AUTORIZADA',
          'INTENTE NUEVAMENTE...'
        ]);
        setThoughtKey(prev => prev + 1);
        
        setTimeout(() => {
          setShowStatus(false);
          setShowThoughts(false);
          setIsLoading(false);
        }, 3000);
      }
    } catch (error) {
      setStatusMessage('ERROR DE CONEXIÓN');
      setShowStatus(false);
      setIsLoading(false);
      alert('Error de conexión con el servidor');
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    setFudiMessage(`Conexión con ${provider} próximamente...`);
    setTimeout(() => setFudiMessage(''), 3000);
  };

  return (
    <>
      <div className="login-container">
        {/* FUDI Background */}
        <div className="login-background">
          <FudiBackground 
            variant="neural" 
            intensity={0.6} 
            color="#00ffff"
            speed={0.5}
            fixed
          />
        </div>

        {/* FUDI Entity observando con Aura */}
        <div className="login-entity">
          <FudiAura 
            variant="combined"
            color="#00ffff"
            intensity={0.8}
            size={400}
            pulseSpeed={2}
            particleCount={25}
          />
          <FudiEntity 
            variant="mini" 
            mood="watching"
            followCursor
            showDataStreams
            intensity={0.7}
          />
        </div>

        {/* Header */}
        <header className="login-header">
          <FudiButton variant="ghost" size="small" href="/">
            <Image 
              src="/images/logo.png" 
              alt="FudiGPT" 
              width={24}
              height={24}
              className="fudi-glow-gold"
            />
            <span>FUDIVERSE</span>
          </FudiButton>
        </header>

        {/* FUDI Message */}
        {fudiMessage && (
          <div className="login-fudi-message">
            <span className="fudi-text-secondary">{fudiMessage}</span>
          </div>
        )}

        {/* Main content */}
        <main className="login-main">
          <div className="login-form-wrapper">
            {/* Hero */}
            <div className="login-hero">
              <h1 className="fudi-text-hero fudi-text-glow">RECONECTAR</h1>
              <p className="fudi-text-muted">Accede a tu cerebro restaurantero</p>
            </div>

            {/* Login Card */}
            <div className="login-card">
              <FudiCard 
                variant="form"
                padding="large"
                animate
                scanEffect
              >
                <form onSubmit={handleSubmit} className="login-form">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Identificador Cuántico
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="TU@RESTAURANTE.COM"
                      className="form-input"
                      disabled={isLoading}
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Clave Dimensional
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="form-input"
                      disabled={isLoading}
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  {/* Remember & Forgot */}
                  <div className="login-options">
                    <div className="remember-container">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="checkbox"
                      />
                      <label htmlFor="remember" className="remember-label">
                        Mantener conexión
                      </label>
                    </div>
                    <Link href="/forgot-password" className="forgot-link">
                      ¿Olvidaste tu clave?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="login-button-container">
                    <FudiButton
                      variant="primary"
                      size="large"
                      fullWidth
                      disabled={isLoading}
                      onClick={() => {
                        const form = document.querySelector('.login-form') as HTMLFormElement;
                        if (form) {
                          const event = new Event('submit', { bubbles: true, cancelable: true });
                          form.dispatchEvent(event);
                        }
                      }}
                    >
                      {isLoading ? 'RECONECTANDO...' : 'ACCEDER AL FUDIVERSE'}
                    </FudiButton>
                  </div>
                </form>

                {/* Divider */}
                <div className="login-divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">o continúa con</span>
                </div>

                {/* Social Login */}
                <div className="social-buttons">
                  <button 
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="social-button"
                  >
                    <svg className="social-icon" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => handleSocialLogin('GitHub')}
                    className="social-button"
                  >
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </button>
                </div>
              </FudiCard>
            </div>

            {/* Footer link */}
            <p className="footer-link">
              ¿NO TIENES CUENTA?{' '}
              <Link href="/register" className="fudi-text-secondary">
                REGISTRA TU RESTAURANTE
              </Link>
            </p>
          </div>
        </main>

        {/* Status Overlay */}
        {showStatus && (
          <div className="login-status">
            <div className="status-content">
              <p className="status-message">{statusMessage}</p>
              <div className="status-spinner"></div>
            </div>
          </div>
        )}
      </div>

      {/* FudiThoughts - FUERA del container principal */}
      {showThoughts && (
        <FudiThoughts
          key={thoughtKey}
          thoughts={thoughtsText}
          duration={3000}
          intensity={1.2}
        />
      )}
    </>
  );
}