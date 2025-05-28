'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Gradient overlays */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with glassmorphism */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/images/logo.png" 
                alt="FudiGPT" 
                className="h-8 w-auto transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-light tracking-tight text-gray-100">FudiGPT</span>
            </Link>
            
            <nav className="flex items-center gap-8">
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                Características
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                Precios
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                Iniciar Sesión
              </Link>
              <Link 
                href="/register" 
                className="relative group px-5 py-2.5 overflow-hidden rounded-full text-sm font-medium"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 group-hover:scale-110"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 transition-all duration-300 group-hover:opacity-75"></span>
                <span className="relative text-white">Empieza gratis</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo animation */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-3xl opacity-20"></div>
            <img 
              src="/images/logo.png" 
              alt="FudiGPT Logo" 
              className="relative h-32 w-auto mx-auto animate-float"
            />
          </div>
          
          {/* Main heading with cyan glow effect */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight relative">
            <span className="relative">
              <span className="absolute inset-0 blur-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                JOIN THE FUDIVERSE
              </span>
              <span className="relative bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                JOIN THE FUDIVERSE
              </span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            La inteligencia restaurantera más avanzada del mundo. 
            <span className="text-white font-normal"> La próxima generación de restauranteros empieza aquí.</span>
          </p>
          
          {/* Search bar with glassmorphism */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pregúntale a Fudi cómo hacer tu restaurante más inteligente..."
                  className="w-full px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all duration-300"
                  disabled
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button className="p-2.5 hover:bg-white/5 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-2.5 hover:bg-white/5 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick prompts */}
            <div className="flex gap-3 mt-6 justify-center flex-wrap">
              {[
                "¿Cuál es mi platillo estrella?",
                "Análisis de ventas del mes",
                "¿Cómo optimizar mi menú?"
              ].map((prompt, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center items-center">
            <Link 
              href="/register" 
              className="group relative px-8 py-4 overflow-hidden rounded-full transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
              <span className="relative flex items-center gap-2 text-white font-medium">
                Prueba gratis por 14 días
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/demo" 
              className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300 font-medium"
            >
              Ver demo
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-white/40 rounded-full mt-1.5 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                La revolución inteligente de los restaurantes
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
              Tecnología de punta que transforma datos en decisiones ganadoras. 
              <span className="text-white">Tu restaurante nunca había sido tan inteligente.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Conexión instantánea",
                description: "¡Adiós a las instalaciones eternas! Conecta Poster, Square o tu POS favorito en minutos. Tu restaurante inteligente está a un click de distancia.",
                gradient: "from-cyan-500 to-blue-500",
                bgGradient: "from-cyan-500/20 to-blue-500/20",
                borderColor: "border-cyan-500/20"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h6M9 12h6" />
                  </svg>
                ),
                title: "IA que habla tu idioma",
                description: "Fudi no es un bot genérico. Entiende qué es un combo, maneja tu inventario y sabe cuándo es tu rush hour. ¡Es como tener un socio que nunca duerme!",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/20"
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Decisiones que generan dinero",
                description: "No más reportes aburridos. Fudi te dice exactamente qué platillo impulsar HOY para maximizar ganancias. Inteligencia que se traduce en pesos.",
                gradient: "from-blue-500 to-indigo-500",
                bgGradient: "from-blue-500/20 to-indigo-500/20",
                borderColor: "border-blue-500/20"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur transition duration-300`}></div>
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border ${feature.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-600/10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Restaurantes activos" },
              { number: "2M+", label: "Decisiones tomadas" },
              { number: "35%", label: "Aumento en ventas" },
              { number: "4.9", label: "Calificación promedio" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extralight mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ¿Listo para revolucionar tu restaurante?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Únete a cientos de restaurantes que ya toman decisiones más inteligentes
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/register" 
              className="group relative px-8 py-4 overflow-hidden rounded-full"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
              <span className="relative text-white font-medium">
                Empieza tu prueba gratis
              </span>
            </Link>
            
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300 font-medium"
            >
              Hablar con ventas
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="FudiGPT" className="h-8 w-auto opacity-70" />
              <span className="text-xl font-light text-gray-300">FudiGPT</span>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2025 FudiGPT™ — Todos los derechos reservados.
            </div>
            
            <div className="text-gray-300">
              ¿Tienes dudas, ideas o simplemente quieres decir hola? 👋
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
              <a 
                href="mailto:hello@fudigpt.com" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@fudigpt.com
              </a>
              <span className="hidden sm:inline text-gray-600">|</span>
              <a 
                href="https://wa.me/5255417522676" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>

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