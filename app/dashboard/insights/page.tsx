'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface InsightCard {
  id: number;
  type: 'battle' | 'trivia' | 'record' | 'plot-twist' | 'prediction' | 'bombshell' | 'confession' | 'challenge';
  title: string;
  subtitle?: string;
  value?: string;
  visual?: 'versus' | 'question' | 'chart' | 'countdown' | 'reveal';
  emoji?: string;
  shareText?: string;
  interactive?: boolean;
  revealed?: boolean;
}

export default function InsightsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [insights, setInsights] = useState<InsightCard[]>([
    {
      id: 1,
      type: 'battle',
      emoji: '⚔️',
      title: 'NO MAMES 😱',
      subtitle: 'El taquero de enfrente te está DESTROZANDO',
      value: 'Él: 156 tacos | Tú: 127 tacos',
      visual: 'versus',
      shareText: 'El taquero de enfrente me está dando una pela 😅 #FudiVerse',
      interactive: true
    },
    {
      id: 2,
      type: 'trivia',
      emoji: '🤯',
      title: '¿SABÍAS QUE...?',
      subtitle: 'Tap para revelar 👆',
      value: 'Vendiste más tacos que el 87% de tu zona',
      visual: 'question',
      shareText: 'Soy el TOP 13% de taqueros en mi zona 💪 #FudiStats',
      interactive: true,
      revealed: false
    },
    {
      id: 3,
      type: 'record',
      emoji: '🏆',
      title: '¡ROMPISTE TU RÉCORD! 🎉',
      subtitle: 'Mejor martes en 3 meses',
      value: '$45,231 MXN',
      visual: 'chart',
      shareText: 'NUEVO RÉCORD PERSONAL 🏆 $45,231 en un martes! #FudiVerse',
      interactive: false
    },
    {
      id: 4,
      type: 'plot-twist',
      emoji: '😵',
      title: 'PLOT TWIST DEL DÍA',
      subtitle: 'Esto no te lo esperabas...',
      value: 'Tu taco de $35 genera MÁS profit que el de $65',
      visual: 'reveal',
      shareText: 'Mi taco barato genera más lana que el caro 🤯 #RestaurantHacks',
      interactive: true,
      revealed: false
    },
    {
      id: 5,
      type: 'prediction',
      emoji: '🔮',
      title: 'FUDI PREDICE',
      subtitle: 'Basado en tu historial + el clima de hoy',
      value: 'Hoy venderás $23,456 MXN',
      visual: 'countdown',
      shareText: 'Fudi dice que hoy vendo $23,456... ¿Le atinará? 🔮 #FudiPredicts',
      interactive: true
    },
    {
      id: 6,
      type: 'bombshell',
      emoji: '💣',
      title: 'BOMBAZO LOCAL',
      subtitle: '3 restaurantes cerraron en tu zona este mes',
      value: 'Tú sigues de pie, CRACK 💪',
      visual: 'reveal',
      shareText: 'Sobreviviendo mientras otros cierran 💪 #RestaurantLife',
      interactive: false
    },
    {
      id: 7,
      type: 'confession',
      emoji: '🍺',
      title: 'CONFESIÓN DEL DÍA',
      subtitle: '(No se lo digas a nadie)',
      value: 'Vendiste más chelas que tacos 🍺>🌮',
      visual: 'reveal',
      shareText: 'Hoy vendí más chelas que tacos... ups 🍺 #RestaurantConfessions',
      interactive: true
    },
    {
      id: 8,
      type: 'challenge',
      emoji: '🎯',
      title: 'RETO DESBLOQUEADO',
      subtitle: 'Vende 50 tacos más que ayer',
      value: 'Premio: Badge "Taquero Legendario"',
      visual: 'countdown',
      shareText: 'Acepté el reto: 50 tacos más que ayer 🎯 #FudiChallenge',
      interactive: true
    }
  ]);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
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

    if (isSwipeUp && currentIndex < insights.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isSwipeDown && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Mouse wheel support for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentIndex < insights.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
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
  }, [currentIndex, insights.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < insights.length - 1) {
        e.preventDefault();
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, insights.length]);

  const handleReveal = (cardId: number) => {
    setRevealedCards(prev => new Set(prev).add(cardId));
  };

  const handleShare = async (insight: InsightCard, platform: string) => {
    const shareUrl = `https://fudiverse.ai/insight/${insight.id}`;
    const shareText = insight.shareText || insight.title;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'instagram':
        // This would trigger a modal to show share instructions
        alert('Captura de pantalla y comparte en tu story 📸');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        alert('¡Copiado al portapapeles! 📋');
        break;
    }
  };

  const getCardStyle = (type: string) => {
    const styles = {
      'battle': 'from-red-500 to-orange-500',
      'trivia': 'from-purple-500 to-pink-500',
      'record': 'from-green-500 to-emerald-500',
      'plot-twist': 'from-blue-500 to-purple-500',
      'prediction': 'from-indigo-500 to-purple-500',
      'bombshell': 'from-gray-700 to-gray-900',
      'confession': 'from-amber-500 to-orange-500',
      'challenge': 'from-cyan-500 to-blue-500'
    };
    return styles[type] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Minimal Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/dashboard/chat" className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            
            <div className="text-sm font-medium">
              FudiVerse Insights
            </div>
            
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* TikTok Style Feed */}
      <div 
        ref={containerRef}
        className="h-screen relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {insights.map((insight, index) => (
          <div
            key={insight.id}
            className={`absolute inset-0 transition-transform duration-300 ${
              index === currentIndex 
                ? 'translate-y-0' 
                : index < currentIndex 
                  ? '-translate-y-full' 
                  : 'translate-y-full'
            }`}
          >
            <div className={`h-full flex items-center justify-center bg-gradient-to-br ${getCardStyle(insight.type)} relative`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-md mx-auto px-8 text-center">
                {/* Emoji */}
                <div className="text-6xl mb-6 animate-bounce">
                  {insight.emoji}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  {insight.title}
                </h1>

                {/* Subtitle */}
                {insight.subtitle && (
                  <p className="text-xl mb-6 opacity-90">
                    {insight.subtitle}
                  </p>
                )}

                {/* Interactive Content */}
                {insight.interactive && !revealedCards.has(insight.id) ? (
                  <button 
                    onClick={() => handleReveal(insight.id)}
                    className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all transform hover:scale-105"
                  >
                    TAP PARA REVELAR 👆
                  </button>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <p className="text-2xl font-bold">
                      {insight.value}
                    </p>
                  </div>
                )}

                {/* Visual Elements */}
                {insight.visual === 'versus' && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <div className="text-6xl">🔥</div>
                    <div className="text-3xl">VS</div>
                    <div className="text-6xl">💪</div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                  <button 
                    onClick={() => handleShare(insight, 'whatsapp')}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(insight, 'twitter')}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(insight, 'instagram')}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(insight, 'copy')}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Side Actions (TikTok style) */}
              <div className="absolute right-4 bottom-20 flex flex-col gap-6">
                <button className="flex flex-col items-center gap-1">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <span className="text-xs">2.3k</span>
                </button>
                
                <button className="flex flex-col items-center gap-1">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-xs">459</span>
                </button>
                
                <button className="flex flex-col items-center gap-1">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <span className="text-xs">Save</span>
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="absolute top-20 left-0 right-0 flex gap-1 px-4">
                {insights.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      idx <= currentIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Hint (only on first card) */}
      {currentIndex === 0 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <span className="text-sm font-medium">Swipe up</span>
          </div>
        </div>
      )}
    </div>
  );
}