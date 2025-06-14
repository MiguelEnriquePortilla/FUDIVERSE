'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  User, Building2, CreditCard, Rocket, Sparkles, 
  CheckCircle, Mail, Lock, Phone, Store, Star
} from 'lucide-react';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { fudiAPI } from '@/lib/api';
import '@/styles/pages/register.css';

export default function RegisterPage() {
  // Form data
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    password: '',
    posType: '',
    phoneNumber: ''
  });
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedSections, setCompletedSections] = useState<number[]>([]);

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
    }
  ];

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ownerName || !formData.email || !formData.password || !formData.restaurantName || !formData.posType) {
      setErrorMessage('Por favor completa todos los campos requeridos');
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Debes aceptar los términos y condiciones');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await fudiAPI.register({
        name: formData.restaurantName,
        ownerName: formData.ownerName,
        email: formData.email,
        password: formData.password,
        posType: formData.posType,
        phoneNumber: formData.phoneNumber
      });

      if (result.success) {
        window.location.href = '/dashboard/chat';
      } else {
        setErrorMessage(result.error || 'Error al crear la cuenta. Intenta de nuevo.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Intenta de nuevo.');
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
    setErrorMessage('');

    // Check section completion
    checkSectionCompletion();
  };

  // Check if sections are completed
  const checkSectionCompletion = () => {
    const completed = [];
    
    // Section 1: Personal info
    if (formData.ownerName && formData.email && formData.password) {
      completed.push(1);
    }
    
    // Section 2: Restaurant info
    if (formData.restaurantName) {
      completed.push(2);
    }
    
    // Section 3: POS selection
    if (formData.posType) {
      completed.push(3);
    }
    
    setCompletedSections(completed);
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="register-container">
      {/* FUDI Background Effects */}
      <FudiBackground 
        variant="grid"
        intensity={0.7}
        speed={0.8}
      />

      {/* FUDI Entity Guardian con Aura */}
      <div className="register-entity">
        <FudiAura 
          variant="combined"
          color="#fbbf24"
          intensity={0.9}
          size={500}
        />
        <div className="entity-overlay">
          <FudiEntity 
            variant="mini"
            mood="excited"
            followCursor={true}
          />
        </div>
      </div>

      {/* Header */}
      <header className="register-header">
        <nav className="register-nav">
          <Link href="/" className="register-logo">
            <Image 
              src="/images/logo.png" 
              alt="FudiGPT" 
              width={32}
              height={32}
            />
            <div className="logo-text">
              <span className="logo-main">FUDIVERSE</span>
              <span className="logo-sub">REGISTRO</span>
            </div>
          </Link>
          <div className="nav-links">
            <Link href="/features" className="nav-link">Arsenal</Link>
            <Link href="/pricing" className="nav-link">Evolución</Link>
            <Link href="/login" className="nav-link login-link">Entrar</Link>
          </div>
        </nav>
      </header>

      {/* Progress Indicator */}
      <div className="register-progress">
        <div className="progress-steps">
          <div className={`progress-dot ${completedSections.includes(1) ? 'completed' : ''}`}>
            <User size={16} />
          </div>
          <div className={`progress-dot ${completedSections.includes(2) ? 'completed' : ''}`}>
            <Building2 size={16} />
          </div>
          <div className={`progress-dot ${completedSections.includes(3) ? 'completed' : ''}`}>
            <CreditCard size={16} />
          </div>
          <div className={`progress-dot ${acceptTerms ? 'completed' : ''}`}>
            <Rocket size={16} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="register-main">
        {/* Hero Section */}
        <section className="register-hero">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>ÚNETE AL FUDIVERSE</span>
          </div>
          <h1 className="hero-title">
            TU <span className="title-highlight">REVOLUCIÓN</span><br/>
            EMPIEZA AQUÍ
          </h1>
          <p className="hero-subtitle">
            Convierte tu restaurante en una máquina de generar éxito
          </p>
        </section>

        {/* Error Message */}
        {errorMessage && (
          <div className="error-alert">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Registration Form Sections */}
        <form onSubmit={handleSubmit} className="register-form">
          
          {/* Section 1: Personal Information */}
          <section id="personal-info" className="form-section">
            <FudiCard variant="form" padding="large">
              <div className="section-header">
                <div className="section-icon personal">
                  <User size={28} />
                </div>
                <div className="section-info">
                  <h2 className="section-title">Identificación Digital</h2>
                  <p className="section-subtitle">Tu identidad en el FUDIVERSE</p>
                </div>
                {completedSections.includes(1) && (
                  <div className="section-check">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="ownerName" className="form-label">
                    <User size={16} />
                    Nombre del Visionario *
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
                    <Mail size={16} />
                    Portal de Conexión *
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

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <Lock size={16} />
                    Llave Cuántica *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
              </div>

              <FudiButton 
                variant="secondary" 
                size="medium"
                onClick={() => scrollToSection('restaurant-info')}
                disabled={!completedSections.includes(1)}
              >
                SIGUIENTE DIMENSIÓN
              </FudiButton>
            </FudiCard>
          </section>

          {/* Section 2: Restaurant Information */}
          <section id="restaurant-info" className="form-section">
            <FudiCard variant="form" padding="large">
              <div className="section-header">
                <div className="section-icon restaurant">
                  <Building2 size={28} />
                </div>
                <div className="section-info">
                  <h2 className="section-title">El Imperio que Evolucionará</h2>
                  <p className="section-subtitle">Tu restaurante en el futuro</p>
                </div>
                {completedSections.includes(2) && (
                  <div className="section-check">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="restaurantName" className="form-label">
                    <Store size={16} />
                    Nombre del Establecimiento *
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
                    <Phone size={16} />
                    Canal de Comunicación
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
              </div>

              <FudiButton 
                variant="secondary" 
                size="medium"
                onClick={() => scrollToSection('pos-selection')}
                disabled={!completedSections.includes(2)}
              >
                CONFIGURAR SISTEMA
              </FudiButton>
            </FudiCard>
          </section>

          {/* Section 3: POS Selection */}
          <section id="pos-selection" className="form-section">
            <FudiCard variant="form" padding="large">
              <div className="section-header">
                <div className="section-icon pos">
                  <CreditCard size={28} />
                </div>
                <div className="section-info">
                  <h2 className="section-title">Sistema de Control</h2>
                  <p className="section-subtitle">¿Con qué sistema trabajas?</p>
                </div>
                {completedSections.includes(3) && (
                  <div className="section-check">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="pos-grid">
                {posOptions.map((pos) => (
                  <div key={pos.id} className="pos-option">
                    <input
                      type="radio"
                      id={pos.id}
                      name="posType"
                      value={pos.id}
                      checked={formData.posType === pos.id}
                      onChange={handleChange}
                      className="pos-input"
                      required
                    />
                    <label htmlFor={pos.id} className="pos-label">
                      {pos.popular && (
                        <span className="pos-popular">
                          <Star size={12} />
                          Popular
                        </span>
                      )}
                      <div className="pos-icon-container">
                        {pos.icon}
                      </div>
                      <span className="pos-name">{pos.name}</span>
                    </label>
                  </div>
                ))}
              </div>

              <FudiButton 
                variant="secondary" 
                size="medium"
                onClick={() => scrollToSection('final-step')}
                disabled={!completedSections.includes(3)}
              >
                PASO FINAL
              </FudiButton>
            </FudiCard>
          </section>

          {/* Section 4: Final Step */}
          <section id="final-step" className="form-section">
            <FudiCard variant="form" padding="large">
              <div className="section-header">
                <div className="section-icon final">
                  <Rocket size={28} />
                </div>
                <div className="section-info">
                  <h2 className="section-title">Despertar del FUDI</h2>
                  <p className="section-subtitle">El momento de la transformación</p>
                </div>
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
                  Acepto unirme a la revolución según los{' '}
                  <Link href="/terms" className="terms-link">
                    protocolos del FUDIVERSE
                  </Link>
                  {' '}y la{' '}
                  <Link href="/privacy" className="terms-link">
                    política de privacidad cuántica
                  </Link>
                </label>
              </div>

              <FudiButton
                variant="primary"
                size="large"
                disabled={isLoading || !acceptTerms || completedSections.length < 3}
                className="submit-btn"
              >
                {isLoading ? 'DESPERTANDO...' : 'DESPERTAR MI FUDI'}
              </FudiButton>
            </FudiCard>
          </section>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <p className="footer-text">
            ¿Ya eres parte del FUDIVERSE?{' '}
            <Link href="/login" className="footer-link">
              Reconecta con la consciencia
            </Link>
          </p>
        </div>
      </main>

      {/* Scanning Line Effect */}
      <div className="scan-line"></div>
    </div>
  );
}