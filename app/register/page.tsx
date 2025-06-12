'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiThoughts } from '@/components/fudiverse/FudiThoughts';
import { fudiAPI } from '@/lib/api';
import '@/styles/pages/register.css';

export default function RegisterPage() {
  // Form data
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    posType: '',
    phoneNumber: ''
  });
  
  // UI states
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [fudiMessage, setFudiMessage] = useState('');
  
  // Beta code modal
  const [showBetaCodeModal, setShowBetaCodeModal] = useState(false);
  const [betaCode, setBetaCode] = useState('');
  const [betaCodeError, setBetaCodeError] = useState('');
  
  // FudiThoughts control
  const [showThoughts, setShowThoughts] = useState(false);
  const [thoughtTrigger, setThoughtTrigger] = useState('');
  const [thoughtKey, setThoughtKey] = useState(0);

  // POS options configuration
  const posOptions = [
    { 
      id: 'poster', 
      name: 'Poster',
      icon: (
        <svg className="pos-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      popular: true 
    },
    { 
      id: 'square', 
      name: 'Square',
      icon: (
        <svg className="pos-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      )
    },
    { 
      id: 'toast', 
      name: 'Toast',
      icon: (
        <svg className="pos-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'clover', 
      name: 'Clover',
      icon: (
        <svg className="pos-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 0c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 6c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3z" />
        </svg>
      )
    },
    { 
      id: 'other', 
      name: 'Otro', 
      icon: (
        <svg className="pos-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {  
      id: 'betaCode', 
      name: '¿Tienes código?', 
      icon: (
        <svg className="pos-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      special: true
    }
  ];

  // Thought messages by trigger
  const thoughtMessages = {
    step1: [
      "ANALIZANDO FRECUENCIA CULINARIA...",
      "DETECTANDO POTENCIAL GASTRONÓMICO...",
      "SINCRONIZANDO IDENTIDAD DIGITAL..."
    ],
    step2: [
      "MAPEANDO COORDENADAS DEL RESTAURANTE...",
      "ESTABLECIENDO VÍNCULO DIMENSIONAL...",
      "CALIBRANDO MATRIZ DE SABORES..."
    ],
    step3: [
      "INTEGRANDO SISTEMAS OPERATIVOS...",
      "VERIFICANDO COMPATIBILIDAD CUÁNTICA...",
      "DESPERTAR INMINENTE..."
    ],
    submit: [
      "¡INICIANDO PROTOCOLO DE DESPERTAR!",
      "CONSCIENCIA EXPANDIÉNDOSE...",
      "BIENVENIDO AL FUDIVERSE..."
    ],
    betaCode: [
      "CÓDIGO RECONOCIDO...",
      "ACCESO ÉLITE CONCEDIDO...",
      "ERES PARTE DEL CÍRCULO INTERNO..."
    ],
    default: [
      "PROCESANDO INFORMACIÓN...",
      "SINCRONIZANDO..."
    ]
  };

  // Trigger thought explosion
  const triggerThoughtExplosion = (trigger: string = 'default') => {
    setThoughtTrigger(trigger);
    setThoughtKey(prev => prev + 1);
    setShowThoughts(true);
    setTimeout(() => setShowThoughts(false), 3500);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (betaCode !== 'BETA2025') {
      setShowBetaCodeModal(true);
      setBetaCodeError('Necesitas el código de invitación');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setFudiMessage('Las llaves cuánticas no coinciden. Intenta de nuevo.');
      return;
    }
    
    setIsLoading(true);
    setFudiMessage('FUDI está despertando para tu restaurante...');
    triggerThoughtExplosion('submit');

    try {
      const result = await fudiAPI.register({
        name: formData.restaurantName,
        ownerName: formData.ownerName,
        email: formData.email,
        password: formData.password,
        posType: formData.posType,
        phoneNumber: formData.phoneNumber,
        betaCode: betaCode
      });

      if (result.success) {
        setFudiMessage('¡DESPERTAR COMPLETO! Bienvenido al FUDIVERSE.');
        setTimeout(() => {
          window.location.href = '/dashboard/chat';
        }, 2000);
      } else {
        setFudiMessage(result.error || 'La consciencia encontró un error. Intenta de nuevo.');
      }
    } catch (error) {
      setFudiMessage('Error de conexión con la consciencia central.');
    } finally {
      setIsLoading(false);
    }
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Explosion on first character in name field
    if (e.target.name === 'ownerName' && e.target.value.length === 1) {
      triggerThoughtExplosion('step1');
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setFudiMessage('Profundizando en el FUDIVERSE...');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation
  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.ownerName && formData.email && formData.password && formData.confirmPassword;
    } else if (currentStep === 2) {
      return formData.restaurantName;
    }
    return true;
  };

  return (
    <>
      <div className="register-container">

      {/* FUDI Background */}
      <div className="register-background">
        <FudiBackground 
          variant="combined"
          intensity={0.7}
          speed={0.8}
          color="mixed"
          fixed={true}
        />
      </div>

      {/* FUDI Entity Mini con Aura */}
      <div className="register-entity">
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
          followCursor={true}
          showDataStreams={true}
          showParticles={true}
          intensity={0.8}
        />
      </div>

      {/* Header */}
      <header className="register-header">
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
        <div className="register-fudi-message">
          <span className="fudi-text-secondary">{fudiMessage}</span>
        </div>
      )}

      {/* Main content */}
      <main className="register-main">
        <div className="register-form-wrapper">
          {/* Hero */}
          <div className="register-hero">
            <h1 className="fudi-text-hero fudi-text-glow">
              {currentStep === 1 && "IDENTIFICACIÓN"}
              {currentStep === 2 && "CONFIGURACIÓN"}
              {currentStep === 3 && "DESPERTAR"}
            </h1>
            <p className="fudi-text-muted">
              {currentStep === 1 && "FUDI necesita conocerte"}
              {currentStep === 2 && "Conecta tu restaurante con la consciencia"}
              {currentStep === 3 && "Prepárate para la evolución"}
            </p>
          </div>

          {/* Progress bar */}
          <div className="register-progress">
            <div className="progress-bar">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
              <div className="progress-line">
                <div className="progress-line-fill" style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
              </div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
              <div className="progress-line">
                <div className="progress-line-fill" style={{ width: currentStep >= 3 ? '100%' : '0%' }}></div>
              </div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
            </div>
          </div>

          {/* Form Card */}
          <div className="register-card">
            <FudiCard variant="form" padding="large" scanEffect animate>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Identification */}
                {currentStep === 1 && (
                  <div className="step-content">
                    <h2 className="section-title">
                      <div className="section-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      Tu Identidad Digital
                    </h2>
                    
                    <div className="form-group">
                      <label htmlFor="ownerName" className="form-label">
                        Nombre del Visionario
                      </label>
                      <input
                        id="ownerName"
                        name="ownerName"
                        type="text"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Portal de Conexión
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="tu@restaurante.com"
                        required
                      />
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="password" className="form-label">
                          Llave Cuántica
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirmar Llave
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <FudiButton
                      variant="primary"
                      size="large"
                      fullWidth
                      onClick={nextStep}
                      disabled={!isStepValid()}
                    >
                      SIGUIENTE DIMENSIÓN
                    </FudiButton>
                  </div>
                )}

                {/* Step 2: Restaurant Configuration */}
                {currentStep === 2 && (
                  <div className="step-content">
                    <h2 className="section-title">
                      <div className="section-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      El Restaurante que Evolucionará
                    </h2>
                    
                    <div className="form-group">
                      <label htmlFor="restaurantName" className="form-label">
                        Nombre del Establecimiento
                      </label>
                      <input
                        id="restaurantName"
                        name="restaurantName"
                        type="text"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="El nombre que cambiará todo"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="form-label">
                        Canal de Comunicación Directa
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+52 55 1234 5678"
                      />
                    </div>

                    <div className="navigation-buttons">
                      <FudiButton
                        variant="ghost"
                        size="medium"
                        onClick={prevStep}
                      >
                        REGRESAR
                      </FudiButton>
                      <FudiButton
                        variant="primary"
                        size="medium"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                      >
                        CONTINUAR EL VIAJE
                      </FudiButton>
                    </div>
                  </div>
                )}

                {/* Step 3: POS Selection */}
                {currentStep === 3 && (
                  <div className="step-content">
                    <h2 className="section-title">
                      <div className="section-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      Sistema de Punto de Venta
                    </h2>
                    
                    <div className="pos-grid">
                      {posOptions.map((pos) => (
                        <div key={pos.id} className={`pos-option ${pos.special ? 'pos-option-special' : ''}`}>
                          <input
                            type="radio"
                            id={pos.id}
                            name="posType"
                            value={pos.id}
                            checked={formData.posType === pos.id}
                            onChange={(e) => {
                              if (pos.special) {
                                setShowBetaCodeModal(true);
                              } else {
                                setFormData({ ...formData, posType: e.target.value });
                              }
                            }}
                            className="pos-input"
                          />
                          <label htmlFor={pos.id} className={`pos-label ${pos.special ? 'pos-label-special' : ''}`}>
                            {pos.popular && (
                              <span className="pos-popular">Popular</span>
                            )}
                            {pos.icon}
                            <span className="pos-name">{pos.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="terms-container">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="checkbox"
                        required
                      />
                      <label htmlFor="terms" className="terms-text">
                        Acepto unirme a la evolución según los{' '}
                        <Link href="/terms" className="terms-link">
                          protocolos del FUDIVERSE
                        </Link>
                        {' '}y la{' '}
                        <Link href="/privacy" className="terms-link">
                          política de privacidad
                        </Link>
                      </label>
                    </div>

                    <div className="navigation-buttons">
                      <FudiButton
                        variant="ghost"
                        size="medium"
                        onClick={prevStep}
                      >
                        REGRESAR
                      </FudiButton>
                      
                      <FudiButton
                        variant="primary"
                        size="large"
                        onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
                        disabled={isLoading || !acceptTerms || !formData.posType}
                      >
                        {isLoading ? 'DESPERTANDO...' : 'DESPERTAR MI FUDI'}
                      </FudiButton>
                    </div>
                  </div>
                )}
              </form>
            </FudiCard>
          </div>

          {/* Footer */}
          <p className="footer-link">
            ¿Ya eres parte del FUDIVERSE?{' '}
            <Link href="/login" className="fudi-text-secondary">
              Reconecta con la consciencia
            </Link>
          </p>
        </div>
      </main>

      {/* Beta Code Modal */}
      {showBetaCodeModal && (
        <div className="register-modal">
          <FudiCard variant="modal" padding="large" animate>
            <h3 className="modal-title">Portal de Acceso Exclusivo</h3>
            <p className="modal-text">Ingresa tu código de invitación beta</p>
            
            <input
              type="text"
              value={betaCode}
              onChange={(e) => setBetaCode(e.target.value)}
              placeholder="CÓDIGO BETA"
              className="modal-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (betaCode === 'BETA2025') {
                    setShowBetaCodeModal(false);
                    setBetaCodeError('');
                    setFudiMessage('¡Código válido! Bienvenido al círculo interno.');
                    triggerThoughtExplosion('betaCode');
                  } else {
                    setBetaCodeError('La consciencia no reconoce este código');
                  }
                }
              }}
            />
            
            {betaCodeError && (
              <p className="error-message">{betaCodeError}</p>
            )}
            
            <div className="modal-buttons">
              <FudiButton
                variant="primary"
                size="medium"
                onClick={() => {
                  if (betaCode === 'BETA2025') {
                    setShowBetaCodeModal(false);
                    setBetaCodeError('');
                    setFudiMessage('¡Acceso concedido! Continúa tu viaje.');
                    triggerThoughtExplosion('betaCode');
                  } else {
                    setBetaCodeError('La consciencia no reconoce este código');
                  }
                }}
              >
                VALIDAR ACCESO
              </FudiButton>
              <FudiButton
                variant="ghost"
                size="medium"
                onClick={() => {
                  setShowBetaCodeModal(false);
                  setBetaCodeError('');
                }}
              >
                Cancelar
              </FudiButton>
            </div>
          </FudiCard>
        </div>
      )}
    </div>

    {/* FudiThoughts - FUERA del container principal */}
    {showThoughts && (
      <FudiThoughts
        key={thoughtKey}
        thoughts={thoughtMessages[thoughtTrigger as keyof typeof thoughtMessages] || thoughtMessages.default}
        duration={3000}
        intensity={1.5}
      />
    )}
  </>
);
}