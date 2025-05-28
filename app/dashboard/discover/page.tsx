'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface DiscoverCard {
  id: number;
  type: 'trend' | 'competitor' | 'opportunity' | 'tip' | 'food' | 'news';
  title: string;
  subtitle: string;
  content: string;
  source?: string;
  image?: string;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags?: string[];
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('para-ti');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<DiscoverCard[]>([
    {
      id: 1,
      type: 'trend',
      title: '🔥 Los tacos de canasta están EXPLOTANDO',
      subtitle: 'Aumento del 234% en búsquedas esta semana',
      content: 'En tu zona, 5 nuevos puestos abrieron en los últimos 30 días. El ticket promedio es de $45 con un margen del 73%. Los clientes los buscan principalmente entre 7-10 AM.',
      source: 'FudiVerse Market Intelligence',
      stats: { likes: 1243, comments: 89, shares: 234 },
      tags: ['#TacoTrends', '#Oportunidad', '#Desayunos']
    },
    {
      id: 2,
      type: 'competitor',
      title: '😱 Tu competidor #1 acaba de hacer ESTO',
      subtitle: 'Tacos El Rey implementó delivery con drones',
      content: 'Redujeron tiempo de entrega a 12 minutos. Aumentaron ventas 45% en primera semana. Cobran $20 extra por drone delivery. 87% de clientes lo califican como "increíble".',
      source: 'Análisis competitivo local',
      stats: { likes: 892, comments: 156, shares: 445 },
      tags: ['#Competencia', '#Innovación', '#Delivery']
    },
    {
      id: 3,
      type: 'opportunity',
      title: '💰 ALERTA: Oportunidad de $50K/mes detectada',
      subtitle: 'Nadie vende desayunos veganos en 3km',
      content: 'Demanda estimada: 450 clientes/día. Ticket promedio proyectado: $120. Inversión inicial: $35K. ROI estimado: 3 meses. 2 locales ideales disponibles.',
      source: 'FudiVerse Opportunity Scanner',
      stats: { likes: 2341, comments: 445, shares: 667 },
      tags: ['#Oportunidad', '#Vegano', '#Desayunos']
    },
    {
      id: 4,
      type: 'tip',
      title: '🤯 Este restaurante aumentó ventas 67% con UN TRUCO',
      subtitle: 'Happy Hour invertido: descuentos de 2-5 PM',
      content: 'La Cocina de María notó que de 2-5 PM tenían mesas vacías. Implementaron 30% descuento en ese horario. Resultado: ocupación del 85% en horas muertas.',
      source: 'Caso de éxito verificado',
      stats: { likes: 5623, comments: 234, shares: 1203 },
      tags: ['#Hack', '#Ventas', '#HorasMuertas']
    },
    {
      id: 5,
      type: 'food',
      title: '🌮 El platillo que está rompiendo TikTok',
      subtitle: 'Birria ramen: la fusión que nadie vio venir',
      content: 'Videos con #BirriaRamen: 45M vistas. Restaurantes reportan: sold out diario. Costo: $18, Venta: $145. Margen: 87%. Tiempo prep: 8 min.',
      source: 'TikTok Food Trends Analysis',
      stats: { likes: 8934, comments: 567, shares: 2340 },
      tags: ['#Viral', '#Fusion', '#TikTokFood']
    }
  ]);

  const sidebarCategories = [
    { id: 'para-ti', icon: '🏠', label: 'Para ti', active: true },
    { id: 'trending', icon: '🔥', label: 'Trending' },
    { id: 'competencia', icon: '⚔️', label: 'Competencia' },
    { id: 'oportunidades', icon: '💰', label: 'Oportunidades' },
    { id: 'tips', icon: '💡', label: 'Tips virales' },
    { id: 'platillos', icon: '🌮', label: 'Platillos hot' },
    { id: 'noticias', icon: '📰', label: 'Noticias' },
    { id: 'guardados', icon: '📌', label: 'Guardados' }
  ];

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50;
    const isSwipeDown = distance < -50;

    if (isSwipeUp && currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
    if (isSwipeDown && currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentCardIndex > 0) {
        setCurrentCardIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, cards.length]);

  // Mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentCardIndex > 0) {
        setCurrentCardIndex(prev => prev - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentCardIndex, cards.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se conectaría con el backend para búsqueda real
    console.log('Searching:', searchQuery);
  };

  const getCardColor = (type: string) => {
    const colors: Record<string, string> = {
      'trend': 'from-orange-500 to-red-500',
      'competitor': 'from-red-500 to-pink-500',
      'opportunity': 'from-green-500 to-emerald-500',
      'tip': 'from-purple-500 to-indigo-500',
      'food': 'from-yellow-500 to-orange-500',
      'news': 'from-blue-500 to-cyan-500'
    };
    return colors[type] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca tendencias, competencia, oportunidades..."
                  className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              <img src="/images/logo.png" alt="FudiGPT" className="h-6 w-auto" />
              <span className="text-sm font-medium">FudiGPT</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-screen pt-16">
        {/* Sidebar estilo TikTok */}
        <aside className="w-20 lg:w-64 border-r border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="p-4">
            {sidebarCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all mb-2 ${
                  activeCategory === category.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="hidden lg:block text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Feed */}
        <main 
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Container */}
          <div className="relative h-full">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute inset-0 transition-transform duration-300 ${
                  index === currentCardIndex 
                    ? 'translate-y-0' 
                    : index < currentCardIndex 
                      ? '-translate-y-full' 
                      : 'translate-y-full'
                }`}
              >
                <div className="h-full flex items-center justify-center p-6">
                  <div className="w-full max-w-2xl">
                    {/* Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                      {/* Card Header con gradiente */}
                      <div className={`h-2 bg-gradient-to-r ${getCardColor(card.type)}`}></div>
                      
                      <div className="p-8">
                        {/* Title */}
                        <h1 className="text-3xl font-bold mb-3">{card.title}</h1>
                        
                        {/* Subtitle */}
                        <p className="text-xl text-gray-300 mb-6">{card.subtitle}</p>
                        
                        {/* Content */}
                        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6">
                          <p className="text-lg leading-relaxed">{card.content}</p>
                        </div>
                        
                        {/* Source */}
                        {card.source && (
                          <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Fuente: {card.source}
                          </p>
                        )}
                        
                        {/* Tags */}
                        {card.tags && (
                          <div className="flex gap-2 flex-wrap mb-6">
                            {card.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-6">
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                              <span>{card.stats?.likes || 0}</span>
                            </button>
                            
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>{card.stats?.comments || 0}</span>
                            </button>
                            
                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 010-5.684m-9.032 5.684a9.001 9.001 0 010-5.684" />
                              </svg>
                              <span>{card.stats?.shares || 0}</span>
                            </button>
                          </div>
                          
                          <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation indicators */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentCardIndex(idx)}
                className={`w-1 h-8 rounded-full transition-all ${
                  idx === currentCardIndex 
                    ? 'bg-white w-1.5' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          {currentCardIndex === 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span className="text-sm font-medium">Desliza para descubrir</span>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar - Trending Topics */}
        <aside className="hidden xl:block w-80 border-l border-white/10 bg-black/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold mb-4">🔥 Trending ahora</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-sm text-gray-400 mb-1">#TacoTuesday</p>
              <p className="font-medium">2x1 está funcionando</p>
              <p className="text-xs text-gray-500 mt-1">15.2K restaurantes</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-sm text-gray-400 mb-1">#DeliveryDrones</p>
              <p className="font-medium">El futuro llegó</p>
              <p className="text-xs text-gray-500 mt-1">3.4K restaurantes</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
              <p className="text-sm text-gray-400 mb-1">#MenuQR</p>
              <p className="font-medium">Adiós menús físicos</p>
              <p className="text-xs text-gray-500 mt-1">45.7K restaurantes</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">💡 Sugerencias</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all">
                ¿Cómo implementar delivery con drones?
              </button>
              <button className="w-full text-left p-3 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all">
                Análisis de mi competencia directa
              </button>
              <button className="w-full text-left p-3 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all">
                Oportunidades en mi zona
              </button>
            </div>
          </div>
        </aside>
      </div>

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
      `}</style>
    </div>
  );
}