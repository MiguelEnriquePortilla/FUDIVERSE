'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Send, MoreHorizontal,
  Home, Search, Hash, Bell, Mail, User, Plus, Play, Pause,
  MoreVertical, Camera, Video, Image, Mic, MapPin, Clock,
  ChefHat, Star, TrendingUp, Crown, Gift, Zap, Flame,
  Eye, Users, DollarSign, Target, Award, ThumbsUp
} from 'lucide-react';

// CONTENT GENERATORS - IRRESISTIBLE FOOD POSTS
const generateFoodPosts = () => {
  const posts = [
    {
      id: 'viral-1',
      type: 'video',
      author: {
        name: 'Tacos El Fuego',
        username: '@tacosfuego',
        avatar: '🌮',
        verified: true,
        followers: '12.5K'
      },
      content: '¡El secreto está en el salseo! 3 ingredientes que cambiarán tu taco game para siempre 🔥',
      media: {
        type: 'video',
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=800&fit=crop',
        views: '847K',
        duration: '0:45'
      },
      location: 'CDMX, Roma Norte',
      tags: ['#TacoHacks', '#SalsaSecreta', '#ViralFood'],
      timestamp: '2h',
      stats: { 
        likes: 94700, 
        comments: 2341, 
        shares: 5677, 
        saves: 12400 
      },
      music: 'Sonido original - Tacos El Fuego',
      trending: true
    },
    {
      id: 'food-porn-1',
      type: 'photo',
      author: {
        name: 'Burger Paradise',
        username: '@burgerparadise',
        avatar: '🍔',
        verified: false,
        followers: '8.2K'
      },
      content: 'Cuando la carne se encuentra con el queso... amor a primera vista 😍 ¿Ya probaste nuestra Deluxe Supreme?',
      media: {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=800&fit=crop'
      },
      location: 'Guadalajara, Chapultepec',
      tags: ['#BurgerPorn', '#CheeseLovers', '#Delicious'],
      timestamp: '4h',
      stats: { 
        likes: 15600, 
        comments: 234, 
        shares: 445, 
        saves: 2100 
      },
      promotion: {
        type: 'discount',
        text: '25% OFF hoy',
        cta: 'Ordenar ahora'
      }
    },
    {
      id: 'behind-scenes-1',
      type: 'video',
      author: {
        name: 'Chef María',
        username: '@chefmaria',
        avatar: '👩‍🍳',
        verified: true,
        followers: '156K'
      },
      content: 'POV: Preparando 200 órdenes de pasta en hora pico. El teamwork es todo 🔥⚡',
      media: {
        type: 'video',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop',
        views: '2.1M',
        duration: '1:12'
      },
      location: 'Monterrey, San Pedro',
      tags: ['#BehindTheScenes', '#TeamWork', '#PastaLove'],
      timestamp: '6h',
      stats: { 
        likes: 287000, 
        comments: 5670, 
        shares: 12400, 
        saves: 34500 
      },
      music: 'Kitchen Vibes - Trending',
      challenge: {
        name: '#KitchenFlow',
        participants: '45.2K'
      }
    },
    {
      id: 'dessert-magic-1',
      type: 'photo',
      author: {
        name: 'Sweet Dreams',
        username: '@sweetdreams',
        avatar: '🍰',
        verified: false,
        followers: '23.1K'
      },
      content: 'Momento de magia: Cuando el chocolate caliente se encuentra con el helado... 🍫❄️ ASMR visual',
      media: {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=800&fit=crop'
      },
      location: 'Puebla Centro',
      tags: ['#ChocolateASMR', '#DessertPorn', '#SweetMoments'],
      timestamp: '8h',
      stats: { 
        likes: 42300, 
        comments: 890, 
        shares: 1200, 
        saves: 8900 
      },
      recipe: {
        available: true,
        ingredients: 4,
        time: '15 min'
      }
    },
    {
      id: 'transformation-1',
      type: 'video',
      author: {
        name: 'Pizza Bros',
        username: '@pizzabros',
        avatar: '🍕',
        verified: true,
        followers: '89.4K'
      },
      content: 'De masa simple a obra maestra en 60 segundos. El arte de la pizza napoletana 🇮🇹✨',
      media: {
        type: 'video',
        url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=800&fit=crop',
        views: '1.8M',
        duration: '1:00'
      },
      location: 'CDMX, Polanco',
      tags: ['#PizzaArt', '#Transformation', '#Napoletana'],
      timestamp: '12h',
      stats: { 
        likes: 156000, 
        comments: 3400, 
        shares: 7800, 
        saves: 18900 
      },
      music: 'Italian Vibes - Trending'
    },
    {
      id: 'trending-drink-1',
      type: 'photo',
      author: {
        name: 'Café Cultura',
        username: '@cafecultura',
        avatar: '☕',
        verified: false,
        followers: '34.7K'
      },
      content: 'El latte art que está rompiendo Instagram. ¿Butterfly o Dragon? Tú decides 🦋🐉',
      media: {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=600&h=800&fit=crop'
      },
      location: 'Mérida, Centro',
      tags: ['#LatteArt', '#CoffeeLovers', '#ArtisticCoffee'],
      timestamp: '1d',
      stats: { 
        likes: 28900, 
        comments: 567, 
        shares: 890, 
        saves: 4500 
      },
      tutorial: {
        available: true,
        difficulty: 'Intermedio',
        duration: '5 min'
      }
    }
  ];

  return posts.sort(() => Math.random() - 0.5);
};

export default function FudiFlowRevolution() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('foryou');
  const [showComposer, setShowComposer] = useState(false);
  const [composerText, setComposerText] = useState('');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [currentUser] = useState({
    name: 'Mi Restaurante',
    username: '@mirestaurante',
    avatar: 'M'
  });

  const feedRef = useRef(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const initialPosts = generateFoodPosts();
      setPosts(initialPosts);
      setLoading(false);
    }, 1000);
  }, []);

  // Infinite scroll simulation
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 1000) {
          // Load more posts
          const morePosts = generateFoodPosts();
          setPosts(prev => [...prev, ...morePosts]);
        }
      }
    };

    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => feedElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          stats: {
            ...post.stats,
            likes: liked ? post.stats.likes + 1 : post.stats.likes - 1
          }
        };
      }
      return post;
    }));
  };

  const handleSave = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const saved = !post.saved;
        return {
          ...post,
          saved,
          stats: {
            ...post.stats,
            saves: saved ? post.stats.saves + 1 : post.stats.saves - 1
          }
        };
      }
      return post;
    }));
  };

  const handleVideoPlay = (postId) => {
    setPlayingVideo(playingVideo === postId ? null : postId);
  };

  const handleShare = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          stats: {
            ...post.stats,
            shares: post.stats.shares + 1
          }
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!composerText.trim()) return;
    
    const newPost = {
      id: `user-${Date.now()}`,
      type: 'photo',
      author: currentUser,
      content: composerText,
      media: {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=800&fit=crop'
      },
      location: 'Mi ubicación',
      tags: ['#MiRestaurante'],
      timestamp: 'ahora',
      stats: { likes: 0, comments: 0, shares: 0, saves: 0 }
    };
    
    setPosts([newPost, ...posts]);
    setComposerText('');
    setShowComposer(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000 0%, #111 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #ff6b6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }} />
          <h2 style={{ color: '#ff6b6b', fontSize: '1.2rem', fontWeight: '600' }}>
            Cargando experiencias deliciosas...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .heart-liked {
          animation: heartPulse 0.6s ease;
          color: #ff3040 !important;
        }
        .post-card {
          animation: fadeInUp 0.5s ease;
        }
        .floating-button {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000 0%, #111 50%, #000 100%)',
        color: 'white',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Header con Navigation */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '500px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}>
            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                fudiFLOW
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                color: 'white',
                fontSize: '0.7rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontWeight: '700',
                letterSpacing: '1px'
              }}>
                BETA
              </div>
            </div>

            {/* Navigation Pills */}
            <nav style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '0.3rem',
              gap: '0.3rem'
            }}>
              <button
                onClick={() => window.location.href = '/dashboard/chat'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '0.6rem 1.2rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 107, 107, 0.2)';
                  e.target.style.color = '#ff6b6b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                fudiGPT
              </button>
              
              <button
                onClick={() => window.location.href = '/dashboard'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '0.6rem 1.2rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 107, 107, 0.2)';
                  e.target.style.color = '#ff6b6b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                fudiBOARD
              </button>
              
              <button
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '0.6rem 1.2rem',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(255, 107, 107, 0.4)'
                }}
              >
                fudiFLOW
              </button>
            </nav>

            {/* Coming Soon Badge */}
            <div style={{
              background: 'rgba(255, 193, 7, 0.2)',
              border: '1px solid rgba(255, 193, 7, 0.5)',
              borderRadius: '12px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.7rem',
              fontWeight: '700',
              color: '#ffc107',
              letterSpacing: '1px'
            }}>
              PRÓXIMAMENTE
            </div>
          </div>
        </header>

        {/* Mobile Feed Container */}
        <div 
          ref={feedRef}
          style={{
            marginTop: '80px',
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            maxWidth: '500px',
            margin: '80px auto 0',
            position: 'relative'
          }}
        >
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem',
            position: 'sticky',
            top: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '0.3rem'
            }}>
              {[
                { id: 'foryou', label: 'Para Ti', icon: '🔥' },
                { id: 'trending', label: 'Trending', icon: '📈' },
                { id: 'following', label: 'Siguiendo', icon: '👥' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id 
                      ? 'linear-gradient(135deg, #ff6b6b, #ffa726)' 
                      : 'transparent',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '0.7rem 1.2rem',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: activeTab === tab.id ? '0 0 20px rgba(255, 107, 107, 0.4)' : 'none'
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingBottom: '2rem'
          }}>
            
            {/* COMING SOON BANNER STICKY - DENTRO DEL FEED */}
            <div style={{
              position: 'sticky',
              top: '140px',
              zIndex: 500,
              width: '100%',
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.95), rgba(255, 167, 38, 0.95))',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
              animation: 'fadeInUp 0.6s ease',
              margin: '1rem 1rem 2rem',
              transform: 'translateZ(0)', // Hardware acceleration
              willChange: 'transform'
            }}>
              <div style={{
                textAlign: 'center',
                color: 'white'
              }}>
                {/* Header con emoji animado */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    🚀 PRÓXIMAMENTE
                  </div>
                </div>

                {/* Main Value Prop */}
                <h2 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  marginBottom: '1rem',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  lineHeight: '1.3'
                }}>
                  La red social QUE SÍ te interesa
                </h2>

                <p style={{
                  fontSize: '1.1rem',
                  marginBottom: '1.5rem',
                  lineHeight: '1.4',
                  opacity: 0.95
                }}>
                  <strong>¿Cansado del ruido en otras redes?</strong><br/>
                  Aquí SOLO ves restaurantes, chefs y food lovers.<br/>
                  <strong>Punto.</strong>
                </p>

                {/* Features Grid compacto */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.8rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🍔</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Solo Food Content</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Sin distracciones</div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🧠</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>FUDIVERSE.Ai</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Algoritmo inteligente</div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>⚡</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>TikTok Vibes</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Scroll adictivo</div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>🎯</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Zero Ruido</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Solo lo que importa</div>
                  </div>
                </div>

                {/* FUDIVERSE Connection compacto */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '16px',
                  padding: '1.2rem',
                  marginBottom: '1.2rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    marginBottom: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    🤖 Powered by FUDIVERSE.Ai
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    opacity: 0.9
                  }}>
                    Tu feed será <strong>inteligentemente curado</strong> con contenido que SÍ te interesa: 
                    tendencias, técnicas, ingredientes, negocios y todo el ecosistema food.
                  </p>
                </div>

                {/* Call to Action */}
                <button
                  onClick={() => window.location.href = '/dashboard/chat'}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '1rem 2rem',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  Pregúntale a FUDI cuándo estará listo
                </button>
              </div>
            </div>

            {posts.map((post, index) => (
              <div
                key={post.id}
                className="post-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '0',
                  position: 'relative',
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden'
                }}
              >
                {/* Media Container */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  background: `url(${post.media.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '60vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%)',
                    zIndex: 1
                  }} />

                  {/* Top Content */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    {/* Author Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      padding: '0.75rem 1rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}>
                        {post.author.avatar}
                      </div>
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            fontWeight: '700',
                            fontSize: '0.9rem'
                          }}>
                            {post.author.name}
                          </span>
                          {post.author.verified && (
                            <div style={{
                              background: '#1da1f2',
                              borderRadius: '50%',
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px'
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                          {post.author.followers} seguidores
                        </div>
                      </div>
                    </div>

                    {/* More Options */}
                    <button style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {/* Video Play Button */}
                  {post.media.type === 'video' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2
                    }}>
                      <button
                        onClick={() => handleVideoPlay(post.id)}
                        style={{
                          background: 'rgba(0, 0, 0, 0.7)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '80px',
                          height: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                          e.target.style.background = 'rgba(255, 107, 107, 0.8)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                        }}
                      >
                        {playingVideo === post.id ? <Pause size={32} /> : <Play size={32} />}
                      </button>
                    </div>
                  )}

                  {/* Bottom Content */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '1.5rem'
                  }}>
                    {/* Location & Time */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <MapPin size={14} />
                        {post.location}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Clock size={14} />
                        {post.timestamp}
                      </div>
                    </div>

                    {/* Content */}
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.4',
                      margin: '0 0 1rem',
                      fontWeight: '500'
                    }}>
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(255, 107, 107, 0.2)',
                            color: '#ff6b6b',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            border: '1px solid rgba(255, 107, 107, 0.3)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Music/Audio Info */}
                    {post.music && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '16px',
                        padding: '0.75rem 1rem',
                        marginBottom: '1rem',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <Mic size={16} />
                        <span style={{ fontSize: '0.8rem' }}>{post.music}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem',
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '2rem'
                  }}>
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: post.liked ? '#ff3040' : 'rgba(255, 255, 255, 0.8)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      className={post.liked ? 'heart-liked' : ''}
                    >
                      <Heart size={24} fill={post.liked ? '#ff3040' : 'none'} />
                      {formatNumber(post.stats.likes)}
                    </button>

                    <button style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      <MessageCircle size={24} />
                      {formatNumber(post.stats.comments)}
                    </button>

                    <button
                      onClick={() => handleShare(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}
                    >
                      <Share2 size={24} />
                      {formatNumber(post.stats.shares)}
                    </button>
                  </div>

                  <button
                    onClick={() => handleSave(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: post.saved ? '#ffa726' : 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Bookmark size={24} fill={post.saved ? '#ffa726' : 'none'} />
                  </button>
                </div>

                {/* Special Features */}
                {post.promotion && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    zIndex: 3,
                    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)'
                  }}>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      marginBottom: '0.25rem'
                    }}>
                      {post.promotion.text}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      opacity: 0.9
                    }}>
                      {post.promotion.cta}
                    </div>
                  </div>
                )}

                {post.trending && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(255, 107, 107, 0.9)',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}>
                    <Flame size={16} />
                    TRENDING
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Create Button */}
        <button
          onClick={() => setShowComposer(true)}
          className="floating-button"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
          }}
        >
          <Plus size={28} />
        </button>

        {/* Simple Composer Modal */}
        {showComposer && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                marginBottom: '1.5rem',
                fontSize: '1.2rem',
                fontWeight: '700'
              }}>
                Comparte tu platillo 🍽️
              </h3>
              
              <textarea
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                placeholder="¿Qué delicia estás preparando hoy?"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                  resize: 'none',
                  minHeight: '120px',
                  marginBottom: '1.5rem'
                }}
              />

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setShowComposer(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePost}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}