'use client';

import Link from 'next/link';
import { useState } from 'react';
import { fudiAPI } from '@/lib/api'; // Agregar esta línea al top


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    posType: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

    const posOptions = [
    { 
        id: 'poster', 
        name: 'Poster', 
        logo: '/images/poster-logo.png',
        popular: true 
    },
    { 
        id: 'square', 
        name: 'Square', 
        logo: '/images/square-logo.png'
    },
    { 
        id: 'toast', 
        name: 'Toast', 
        logo: '/images/toast-logo.png'
    },
    { 
        id: 'clover', 
        name: 'Clover', 
        logo: '/images/clover-logo.png'
    },
    { 
        id: 'other', 
        name: 'Otro', 
        icon: (
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        )
    }
    ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
        // Registro exitoso, redirigir al dashboard
        window.location.href = '/dashboard/chat';
      } else {
        alert(result.error || 'Error al registrar');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Gradient overlays */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header simple */}
      <header className="relative z-10 p-6">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <img 
            src="/images/logo.png" 
            alt="FudiGPT" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-light tracking-tight text-gray-100">FudiGPT</span>
        </Link>
      </header>

      {/* Register Form Container */}
      <div className="relative z-10 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-2xl">
          {/* Hero Text */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 relative">
                <span className="relative">
                    <span className="absolute inset-0 blur-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    JOIN THE FUDIVERSE
                    </span>
                    <span className="relative bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                    JOIN THE FUDIVERSE
                    </span>
                </span>
            </h1>
            <p className="text-gray-400">
              Tu restaurante está a minutos de ser más inteligente
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
                1
              </div>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-500">
                2
              </div>
              <div className="w-20 h-1 bg-white/10 rounded-full"></div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-500">
                3
              </div>
            </div>
          </div>

          {/* Glass Card Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-10"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Restaurant Info Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-light text-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        </div>
                    Información del Restaurante
                  </h2>
                  
                  {/* Restaurant Name */}
                  <div>
                    <label htmlFor="restaurantName" className="block text-sm font-light text-gray-300 mb-2">
                      Nombre del Restaurante
                    </label>
                    <input
                      id="restaurantName"
                      name="restaurantName"
                      type="text"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                      placeholder="El Rincón de los Sabores"
                      required
                    />
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-light text-gray-300 mb-2">
                      Tu Nombre
                    </label>
                    <input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-light text-gray-300 mb-2">
                      WhatsApp (para soporte)
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                </div>

                {/* Account Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-light text-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        </div>
                    Crea tu Cuenta
                  </h2>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-light text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                      placeholder="tu@restaurante.com"
                      required
                    />
                  </div>

                  {/* Password Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-light text-gray-300 mb-2">
                        Contraseña
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-light text-gray-300 mb-2">
                        Confirmar Contraseña
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* POS Selection */}
                <div className="space-y-4">
                  <h2 className="text-xl font-light text-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        </div>
                    ¿Qué POS usas?
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {posOptions.map((pos) => (
                      <label
                        key={pos.id}
                        className={`relative cursor-pointer ${pos.popular ? 'md:col-span-2' : ''}`}
                      >
                        <input
                          type="radio"
                          name="posType"
                          value={pos.id}
                          checked={formData.posType === pos.id}
                          onChange={(e) => setFormData({ ...formData, posType: e.target.value })}
                          className="sr-only"
                        />
                        <div className={`
                          relative p-4 rounded-xl border transition-all duration-300
                          ${formData.posType === pos.id 
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                          }
                        `}>
                          {pos.popular && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                          <div className="flex items-center gap-3">
                            {pos.logo ? (
                                <img src={pos.logo} alt={pos.name} className="w-6 h-6 object-contain" />
                            ) : (
                                pos.icon
                            )}
                            <span className="font-medium">{pos.name}</span>
                            </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 bg-white/5 border-white/20 rounded focus:ring-cyan-500 focus:ring-offset-0"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    Acepto los{' '}
                    <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      términos y condiciones
                    </Link>
                    {' '}y la{' '}
                    <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      política de privacidad
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !acceptTerms}
                  className="group relative w-full px-6 py-4 overflow-hidden rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
                  <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creando tu universo restaurantero...
                      </>
                    ) : (
                      <>
                        Crear mi restaurante inteligente
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Sign in link */}
          <p className="text-center mt-6 text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Spacer para el final */}
      <div className="pb-8"></div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}