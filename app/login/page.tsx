'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, Lock, Eye, EyeOff, Brain, LogIn, ArrowRight
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';
import { fudiAPI } from '@/lib/api';

// Import del CSS separado y minimalista
import '@/styles/pages/login.css';

export default function LoginPage() {
  const router = useRouter();
  
  // ✅ TODA LA LÓGICA CRÍTICA INTACTA
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // UI states
  const [fudiMessage, setFudiMessage] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // ✅ HANDLE SUBMIT - LÓGICA CRÍTICA INTACTA
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFudiMessage('Por favor completa todos los campos');
      setTimeout(() => setFudiMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    setShowStatus(true);
    setStatusMessage('CONECTANDO CON TU RESTAURANTE...');

    try {
      const result = await fudiAPI.login(email, password);

      if (result.success) {
        setStatusMessage('¡QUÉ GUSTO VERTE DE NUEVO!');
        
        setTimeout(() => {
          window.location.href =  '/claude';
        }, 2000);
      } else {
        setStatusMessage('CREDENCIALES INCORRECTAS');
        
        setTimeout(() => {
          setShowStatus(false);
          setIsLoading(false);
          setFudiMessage('Email o contraseña incorrectos. Intenta de nuevo.');
          setTimeout(() => setFudiMessage(''), 3000);
        }, 2000);
      }
    } catch (error) {
      setStatusMessage('ERROR DE CONEXIÓN');
      setShowStatus(false);
      setIsLoading(false);
      setFudiMessage('Error de conexión con el servidor');
      setTimeout(() => setFudiMessage(''), 3000);
    }
  };

  // ✅ SOCIAL LOGIN - LÓGICA INTACTA
  const handleSocialLogin = (provider: string) => {
    setFudiMessage(`Conexión con ${provider} próximamente...`);
    setTimeout(() => setFudiMessage(''), 3000);
  };

  return (
    <div className="login-container-refined">
      
      {/* Background ÚNICO - Apple Style */}
      <FudiBackground 
        variant="gradient"
        theme="business"  
        opacity={1}
        fixed={true}
      />

      {/* Header estándar */}
      <FudiHeader 
        currentPage="login"
        showAuthButtons={false}
      />

      {/* ✅ FUDI Message - FUNCIONALIDAD INTACTA */}
      {fudiMessage && (
        <div className="login-fudi-message-refined">
          <span>{fudiMessage}</span>
        </div>
      )}

      {/* Main content */}
      <main className="login-main-refined">
        <div className="login-form-wrapper-refined">
          
          {/* Hero sin badge marketero */}
          <div className="login-hero-refined">
            <h1 className="hero-title-refined">¡BIENVENIDO!</h1>
            <p className="hero-subtitle-refined">¿Cómo haremos tu restaurante más inteligente con FUDIVERSE Ai?</p>
          </div>

          {/* Login Card usando FudiCard */}
          <FudiCard variant="chat" padding="large" className="login-card-refined">
            <form onSubmit={handleSubmit} className="login-form-refined">
              
              {/* ✅ Email - LÓGICA INTACTA */}
              <div className="form-group-refined">
                <label htmlFor="email" className="form-label-refined">
                  <Mail size={16} />
                  Email del Restaurante
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@turestaurante.com"
                  className="form-input-refined"
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
              </div>

              {/* ✅ Password - LÓGICA INTACTA */}
              <div className="form-group-refined">
                <label htmlFor="password" className="form-label-refined">
                  <Lock size={16} />
                  Contraseña
                </label>
                <div className="password-container-refined">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input-refined"
                    disabled={isLoading}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-refined"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* ✅ Remember & Forgot - LÓGICA INTACTA */}
              <div className="login-options-refined">
                <div className="remember-container-refined">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-refined"
                  />
                  <label htmlFor="remember" className="remember-label-refined">
                    Recordar sesión
                  </label>
                </div>
                <Link href="/forgot-password" className="forgot-link-refined">
                  ¿Olvidaste la contraseña?
                </Link>
              </div>

              {/* ✅ Submit Button - LÓGICA CRÍTICA INTACTA */}
              <div className="login-button-container-refined">
                <FudiButton
                  variant="orange"
                  size="large"
                  disabled={isLoading}
                  onClick={() => {
                    const form = document.querySelector('.login-form-refined') as HTMLFormElement;
                    if (form) {
                      const event = new Event('submit', { bubbles: true, cancelable: true });
                      form.dispatchEvent(event);
                    }
                  }}
                >
                  {isLoading ? 'CONECTANDO...' : 'ACCEDER A FUDIVERSE'}
                </FudiButton>
              </div>
            </form>

            {/* ✅ Divider - VISUAL INTACTO */}
            <div className="login-divider-refined">
              <div className="divider-line-refined"></div>
              <span className="divider-text-refined">o continúa con</span>
            </div>

            {/* ✅ Social Login - LÓGICA INTACTA */}
            <div className="social-buttons-refined">
              <button 
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="social-button-refined"
                disabled={isLoading}
              >
                <svg className="social-icon-refined" viewBox="0 0 24 24">
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
                className="social-button-refined"
                disabled={isLoading}
              >
                <svg className="social-icon-refined" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </FudiCard>

          {/* Footer link */}
          <p className="footer-link-refined">
            ¿NO TIENES CUENTA?{' '}
            <Link href="/register" className="footer-register-link-refined">
              REGISTRA TU RESTAURANTE
              <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </main>

      {/* ✅ Status Overlay - FUNCIONALIDAD CRÍTICA INTACTA */}
      {showStatus && (
        <div className="login-status-refined">
          <div className="status-content-refined">
            <p className="status-message-refined">{statusMessage}</p>
            <div className="status-spinner-refined"></div>
          </div>
        </div>
      )}
    </div>
  );
}