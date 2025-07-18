'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  User, Building2, CreditCard, Rocket, Brain, 
  CheckCircle, Mail, Lock, Phone, Store, Star
} from 'lucide-react';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';
import { fudiAPI } from '@/lib/api';

// Import del CSS separado y minimalista
import '@/styles/pages/register.css';

export default function RegisterPage() {
  // ⚡ PRESERVED - Form data structure EXACTLY as original
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    password: '',
    posType: '',
    phoneNumber: ''
  });
  
  // ⚡ PRESERVED - UI states EXACTLY as original  
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  // ⚡ PRESERVED - POS options configuration EXACTLY as original
  const posOptions = [
    { 
      id: 'poster', 
      name: 'Poster',
      icon: (
        <svg className="pos-icon-refined" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      popular: true 
    },
    { 
      id: 'square', 
      name: 'Square',
      icon: (
        <svg className="pos-icon-refined" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      )
    },
    { 
      id: 'toast', 
      name: 'Toast',
      icon: (
        <svg className="pos-icon-refined" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'clover', 
      name: 'Clover',
      icon: (
        <svg className="pos-icon-refined" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 0c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 6c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3z" />
        </svg>
      )
    },
    { 
      id: 'other', 
      name: 'Otro', 
      icon: (
        <svg className="pos-icon-refined" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // ⚡ PRESERVED - Form submission EXACTLY as original - DO NOT TOUCH!
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
        window.location.href =  '/dashboard/chat';
      } else {
        setErrorMessage(result.error || 'Error al crear la cuenta. Intenta de nuevo.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // ⚡ PRESERVED - Input change handler EXACTLY as original + FIX
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    
    setFormData(newFormData);
    setErrorMessage('');

    // Check section completion with NEW data
    checkSectionCompletion(newFormData);
  };

  // ⚡ PRESERVED - Section completion logic EXACTLY as original + FIX
  const checkSectionCompletion = (currentFormData = formData) => {
    const completed = [];
    
    // Section 1: Personal info
    if (currentFormData.ownerName && currentFormData.email && currentFormData.password) {
      completed.push(1);
    }
    
    // Section 2: Restaurant info
    if (currentFormData.restaurantName) {
      completed.push(2);
    }
    
    // Section 3: POS selection
    if (currentFormData.posType) {
      completed.push(3);
    }
    
    setCompletedSections(completed);
  };

  // ⚡ PRESERVED - Scroll function EXACTLY as original
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="register-container-refined">
      
      {/* Background ÚNICO - Apple Style */}
      <FudiBackground 
        variant="gradient"
        theme="business"  
        opacity={1}
        fixed={true}
      />

      {/* Header estándar */}
      <FudiHeader 
        currentPage="register"
        showAuthButtons={false}
      />

      {/* ⚡ PRESERVED - Progress Indicator con funcionalidad intacta */}
      <div className="register-progress-refined">
        <div className="progress-steps-refined">
          <div className={`progress-dot-refined ${completedSections.includes(1) ? 'completed' : ''}`}>
            <User size={16} />
          </div>
          <div className={`progress-dot-refined ${completedSections.includes(2) ? 'completed' : ''}`}>
            <Building2 size={16} />
          </div>
          <div className={`progress-dot-refined ${completedSections.includes(3) ? 'completed' : ''}`}>
            <CreditCard size={16} />
          </div>
          <div className={`progress-dot-refined ${acceptTerms ? 'completed' : ''}`}>
            <Rocket size={16} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="register-main-refined">
        
        {/* Hero sin badge marketero */}
        <section className="register-hero-refined">
          <h1 className="hero-title-refined">
            TRANSFORMA <span className="title-highlight-refined">TU RESTAURANTE</span><br/>
            EMPIEZA HOY
          </h1>
          <p className="hero-subtitle-refined">
            Únete a restaurantes que ya optimizan con FUDIVERSE
          </p>
        </section>

        {/* ⚡ PRESERVED - Error Message con funcionalidad intacta */}
        {errorMessage && (
          <div className="error-alert-refined">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ⚡ PRESERVED - Registration Form estructura exacta */}
        <form onSubmit={handleSubmit} className="register-form-refined">
          
          {/* Section 1: Personal Information */}
          <section id="personal-info" className="form-section-refined">
            <FudiCard variant="chat" padding="large" className="form-card-refined">
              <div className="section-header-refined">
                <div className="section-icon-refined personal">
                  <User size={28} />
                </div>
                <div className="section-info-refined">
                  <h2 className="section-title-refined">Información Personal</h2>
                  <p className="section-subtitle-refined">Cuéntanos sobre ti</p>
                </div>
                {completedSections.includes(1) && (
                  <div className="section-check-refined">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="form-grid-refined">
                <div className="form-group-refined">
                  <label htmlFor="ownerName" className="form-label-refined">
                    <User size={16} />
                    Nombre Completo *
                  </label>
                  <input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="form-input-refined"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="form-group-refined">
                  <label htmlFor="email" className="form-label-refined">
                    <Mail size={16} />
                    Email del Restaurante *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input-refined"
                    placeholder="chef@turestaurante.com"
                    required
                  />
                </div>

                <div className="form-group-refined">
                  <label htmlFor="password" className="form-label-refined">
                    <Lock size={16} />
                    Contraseña *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input-refined"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
              </div>

              <div className="section-button-refined">
                <FudiButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => scrollToSection('restaurant-info')}
                  disabled={!completedSections.includes(1)}
                >
                  CONTINUAR →
                </FudiButton>
              </div>
            </FudiCard>
          </section>

          {/* Section 2: Restaurant Information */}
          <section id="restaurant-info" className="form-section-refined">
            <FudiCard variant="chat" padding="large" className="form-card-refined">
              <div className="section-header-refined">
                <div className="section-icon-refined restaurant">
                  <Building2 size={28} />
                </div>
                <div className="section-info-refined">
                  <h2 className="section-title-refined">Tu Restaurante</h2>
                  <p className="section-subtitle-refined">Información del negocio</p>
                </div>
                {completedSections.includes(2) && (
                  <div className="section-check-refined">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="form-grid-refined">
                <div className="form-group-refined full-width">
                  <label htmlFor="restaurantName" className="form-label-refined">
                    <Store size={16} />
                    Nombre del Restaurante *
                  </label>
                  <input
                    id="restaurantName"
                    name="restaurantName"
                    type="text"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className="form-input-refined"
                    placeholder="Nombre de tu restaurante"
                    required
                  />
                </div>

                <div className="form-group-refined">
                  <label htmlFor="phoneNumber" className="form-label-refined">
                    <Phone size={16} />
                    Teléfono (Opcional)
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-input-refined"
                    placeholder="+52 55 1234 5678"
                  />
                </div>
              </div>

              <div className="section-button-refined">
                <FudiButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => scrollToSection('pos-selection')}
                  disabled={!completedSections.includes(2)}
                >
                  CONTINUAR →
                </FudiButton>
              </div>
            </FudiCard>
          </section>

          {/* Section 3: POS Selection - ⚡ PRESERVED EXACTLY */}
          <section id="pos-selection" className="form-section-refined">
            <FudiCard variant="chat" padding="large" className="form-card-refined">
              <div className="section-header-refined">
                <div className="section-icon-refined pos">
                  <CreditCard size={28} />
                </div>
                <div className="section-info-refined">
                  <h2 className="section-title-refined">Sistema POS</h2>
                  <p className="section-subtitle-refined">¿Con qué sistema trabajas?</p>
                </div>
                {completedSections.includes(3) && (
                  <div className="section-check-refined">
                    <CheckCircle size={24} />
                  </div>
                )}
              </div>

              <div className="pos-grid-refined">
                {posOptions.map((pos) => (
                  <div key={pos.id} className="pos-option-refined">
                    <input
                      type="radio"
                      id={pos.id}
                      name="posType"
                      value={pos.id}
                      checked={formData.posType === pos.id}
                      onChange={handleChange}
                      className="pos-input-refined"
                      required
                    />
                    <label htmlFor={pos.id} className="pos-label-refined">
                      {pos.popular && (
                        <span className="pos-popular-refined">
                          <Star size={12} />
                          Popular
                        </span>
                      )}
                      <div className="pos-icon-container-refined">
                        {pos.icon}
                      </div>
                      <span className="pos-name-refined">{pos.name}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="section-button-refined">
                <FudiButton 
                  variant="secondary" 
                  size="medium"
                  onClick={() => scrollToSection('final-step')}
                  disabled={!completedSections.includes(3)}
                >
                  PASO FINAL →
                </FudiButton>
              </div>
            </FudiCard>
          </section>

          {/* Section 4: Final Step - ⚡ PRESERVED EXACTLY */}
          <section id="final-step" className="form-section-refined">
            <FudiCard variant="chat" padding="large" className="form-card-refined">
              <div className="section-header-refined">
                <div className="section-icon-refined final">
                  <Rocket size={28} />
                </div>
                <div className="section-info-refined">
                  <h2 className="section-title-refined">¡Casi Listo!</h2>
                  <p className="section-subtitle-refined">Último paso para comenzar</p>
                </div>
              </div>

              <div className="terms-container-refined">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="checkbox-refined"
                  required
                />
                <label htmlFor="terms" className="terms-text-refined">
                  Acepto los{' '}
                  <Link href="/terms" className="terms-link-refined">
                    términos y condiciones
                  </Link>
                  {' '}y la{' '}
                  <Link href="/privacy" className="terms-link-refined">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <div className="submit-container-refined">
                <FudiButton
                  variant="orange"
                  size="large"
                  disabled={isLoading || !acceptTerms || completedSections.length < 3}
                  onClick={() => {
                    const form = document.querySelector('.register-form-refined') as HTMLFormElement;
                    if (form) {
                      const event = new Event('submit', { bubbles: true, cancelable: true });
                      form.dispatchEvent(event);
                    }
                  }}
                  icon={<Rocket size={20} />}
                >
                  {isLoading ? 'CREANDO CUENTA...' : 'COMENZAR CON FUDIVERSE'}
                </FudiButton>
              </div>
            </FudiCard>
          </section>
        </form>

        {/* Footer */}
        <div className="register-footer-refined">
          <p className="footer-text-refined">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="footer-link-refined">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}