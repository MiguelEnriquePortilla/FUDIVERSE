'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, MessageCircle, Share2, Plus, Play, Eye,
  ChefHat, Star, TrendingUp, Users, Timer,
  MapPin, Flame, Home, Search, Bell, User,
  Video, Camera, Image, Send, Brain
} from 'lucide-react';

// Import FUDIVERSE Components
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';

// ==================== TYPES ====================
interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    type: string;
  };
  content: string;
  media?: {
    type: 'photo' | 'video';
    url: string;
    duration?: string;
  };
  recipe?: {
    time: string;
    difficulty: string;
    serves: number;
  };
  location?: string;
  tags: string[];
  timestamp: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  trending?: boolean;
}

interface FlowStats {
  totalPosts: number;
  activeFollowers: number;
  todayLikes: number;
  trendingPosts: number;
}

// ==================== MOCK DATA ====================
const mockStats: FlowStats = {
  totalPosts: 1234,
  activeFollowers: 567,
  todayLikes: 8923,
  trendingPosts: 42
};

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Tacos El Fuego',
      username: '@tacosfuego',
      avatar: '🌮',
      verified: true,
      type: 'Taquería'
    },
    content: '¡El secreto del taco perfecto! 🔥 Marinado 24h + técnica especial de salseo que aprendí de mi abuela. Este video cambió nuestras ventas 340% 🚀',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      duration: '0:45'
    },
    recipe: {
      time: '30 min',
      difficulty: 'Intermedio',
      serves: 4
    },
    location: 'CDMX, Roma Norte',
    tags: ['#TacoHacks', '#SalsaSecreta', '#ViralFood'],
    timestamp: '2h',
    stats: {
      likes: 94700,
      comments: 2341,
      shares: 5677,
      views: 847000
    },
    trending: true
  },
  {
    id: '2',
    author: {
      name: 'Chef María González',
      username: '@chefmaria',
      avatar: '👩‍🍳',
      verified: true,
      type: 'Italiana Fine Dining'
    },
    content: 'POV: Preparando 200 órdenes de pasta fresca en hora pico 🍝 El teamwork es FUNDAMENTAL. Cada segundo cuenta cuando tienes una cocina llena y clientes esperando.',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      duration: '1:12'
    },
    location: 'Monterrey, San Pedro',
    tags: ['#BehindTheScenes', '#TeamWork', '#PastaFresca'],
    timestamp: '6h',
    stats: {
      likes: 287000,
      comments: 5670,
      shares: 12400,
      views: 2100000
    }
  },
  {
    id: '3',
    author: {
      name: 'Sweet Dreams Pastelería',
      username: '@sweetdreams',
      avatar: '🍰',
      verified: false,
      type: 'Pastelería'
    },
    content: 'Momento de magia pura 🪄 Cuando el chocolate caliente (70% cacao belga) se encuentra con nuestro helado artesanal de vainilla de Madagascar... El contraste de temperaturas crea una experiencia ASMR increíble 🍫❄️',
    media: {
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop'
    },
    recipe: {
      time: '15 min',
      difficulty: 'Fácil',
      serves: 2
    },
    location: 'Puebla Centro',
    tags: ['#ChocolateASMR', '#DessertPorn', '#SweetMoments'],
    timestamp: '8h',
    stats: {
      likes: 42300,
      comments: 890,
      shares: 1200
    }
  },
  {
    id: '4',
    author: {
      name: 'Pizza Bros Napoletana',
      username: '@pizzabros',
      avatar: '🍕',
      verified: true,
      type: 'Pizzería Napoletana'
    },
    content: 'De masa simple a obra maestra en 60 segundos ⏱️ La técnica napoletana authentic requiere 400°C, movimientos precisos y años de experiencia. Cada pizza es única, cada una cuenta una historia 🇮🇹✨',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
      duration: '1:00'
    },
    recipe: {
      time: '72h + 90seg',
      difficulty: 'Avanzado',
      serves: 1
    },
    location: 'CDMX, Polanco',
    tags: ['#PizzaArt', '#Transformation', '#Napoletana'],
    timestamp: '12h',
    stats: {
      likes: 156000,
      comments: 3400,
      shares: 7800,
      views: 1800000
    },
    trending: true
  },
  {
    id: '5',
    author: {
      name: 'Café Cultura',
      username: '@cafecultura',
      avatar: '☕',
      verified: false,
      type: 'Coffee Shop'
    },
    content: 'Latte art level: MAESTRO ☕️🎨 Butterfly vs Dragon - ¿cuál prefieres? Este diseño me tomó 3 años perfeccionarlo. La clave está en la textura de la leche, temperatura exacta (65°C) y movimiento de muñeca preciso.',
    media: {
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=600&h=400&fit=crop'
    },
    location: 'Mérida, Centro',
    tags: ['#LatteArt', '#CoffeeLovers', '#ArtisticCoffee'],
    timestamp: '1d',
    stats: {
      likes: 28900,
      comments: 567,
      shares: 890
    }
  }
];

// ==================== MAIN COMPONENT ====================
export default function FudiFlowSimplified() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showComposer, setShowComposer] = useState(false);
  const [composerText, setComposerText] = useState('');

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  // Handle like
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = (post as any).liked || false;
        return {
          ...post,
          liked: !isLiked,
          stats: {
            ...post.stats,
            likes: !isLiked ? post.stats.likes + 1 : post.stats.likes - 1
          }
        };
      }
      return post;
    }));
  };

  // Format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
      color: 'rgba(255, 255, 255, 0.98)',
      background: 'transparent'
    }}>
      
      {/* Background */}
      <FudiBackground 
        variant="gradient"
        theme="social"
        opacity={1}
        fixed={true}
      />

      {/* Header */}
      <FudiDashHeader 
        currentModule="flow" 
        userName="Chef Pro"
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main style={{
        marginTop: '70px',
        padding: '1rem',
        maxWidth: '600px',
        margin: '70px auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>

        {/* Header Section */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '18px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <FudiSignature size="large" showPulse={true} animated={true} />
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: '800',
            margin: '1rem 0 0.5rem 0',
            background: 'linear-gradient(135deg, #ff6b35, #00bcd4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            fudi-flow
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            La red social para restauranteros • 2.3K FUDIERs online
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem'
        }}>
          {/* Total Posts */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Posts</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#ff6b35' }}>{formatNumber(mockStats.totalPosts)}</p>
              </div>
              <ChefHat size={20} style={{ color: '#ff6b35' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b35, #e55a2b)', width: '85%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Active Followers */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Seguidores</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#10b981' }}>{formatNumber(mockStats.activeFollowers)}</p>
              </div>
              <Users size={20} style={{ color: '#10b981' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', width: '70%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Today Likes */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Likes Hoy</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#ef4444' }}>{formatNumber(mockStats.todayLikes)}</p>
              </div>
              <Heart size={20} style={{ color: '#ef4444' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #ef4444, #dc2626)', width: '90%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Trending */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Trending</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#fbbf24' }}>{mockStats.trendingPosts}</p>
              </div>
              <TrendingUp size={20} style={{ color: '#fbbf24' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #fbbf24, #d97706)', width: '75%', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>

        {/* Composer Section */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '1.5rem',
          cursor: 'pointer'
        }} onClick={() => setShowComposer(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b35, #00bcd4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: '700',
              color: 'white'
            }}>
              M
            </div>
            <div style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '0.75rem 1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.95rem'
            }}>
              ¿Cuál es tu Flow hoy? 🍽️
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Video size={16} />
              Video
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Image size={16} />
              Foto
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ChefHat size={16} />
              Receta
            </button>
          </div>
        </div>

        {/* Feed Section Header */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={20} style={{ color: '#ff6b35' }} />
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Feed Social</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              background: 'rgba(255, 107, 53, 0.1)',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#ff6b35',
              cursor: 'pointer'
            }}>
              <TrendingUp size={16} />
            </button>
            <button style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#3b82f6',
              cursor: 'pointer'
            }}>
              <Brain size={16} />
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
            >
              {/* Trending Badge */}
              {post.trending && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, #ff6b35, #00bcd4)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  zIndex: 1
                }}>
                  🔥 TRENDING
                </div>
              )}

              {/* Post Header */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    fontSize: '2rem',
                    lineHeight: 1
                  }}>
                    {post.author.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>{post.author.name}</h4>
                      {post.author.verified && (
                        <span style={{
                          background: '#3b82f6',
                          color: 'white',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: '700'
                        }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      <span style={{ color: '#ff6b35', fontWeight: '500' }}>{post.author.type}</span> • {post.timestamp}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div style={{ padding: '0 1.5rem 1rem' }}>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 1rem 0'
                }}>
                  {post.content}
                </p>

                {/* Recipe Info */}
                {post.recipe && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    margin: '1rem 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Timer size={12} />
                      <span>{post.recipe.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Star size={12} />
                      <span>{post.recipe.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Users size={12} />
                      <span>{post.recipe.serves} pers</span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0' }}>
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} style={{
                      background: 'rgba(0, 188, 212, 0.1)',
                      color: '#00bcd4',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      border: '1px solid rgba(0, 188, 212, 0.2)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Media */}
              {post.media && (
                <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                  <img 
                    src={post.media.url} 
                    alt="Post media"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Video Overlay */}
                  {post.media.type === 'video' && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <button style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <Play size={24} style={{ color: '#000', marginLeft: '2px' }} />
                      </button>
                    </div>
                  )}

                  {/* Media Info */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    gap: '1rem',
                    color: 'white',
                    fontSize: '0.8rem'
                  }}>
                    {post.stats.views && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <Eye size={12} />
                        <span>{formatNumber(post.stats.views)}</span>
                      </div>
                    )}
                    {post.location && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <MapPin size={12} />
                        <span>{post.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social Actions */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: (post as any).liked ? '#ef4444' : 'rgba(255, 255, 255, 0.6)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Heart size={16} fill={(post as any).liked ? '#ef4444' : 'none'} />
                    <span>{formatNumber(post.stats.likes)}</span>
                  </button>

                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    padding: '0.5rem',
                    borderRadius: '8px'
                  }}>
                    <MessageCircle size={16} />
                    <span>{formatNumber(post.stats.comments)}</span>
                  </button>

                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    padding: '0.5rem',
                    borderRadius: '8px'
                  }}>
                    <Share2 size={16} />
                    <span>{formatNumber(post.stats.shares)}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for mobile */}
        <div style={{ height: '2rem' }}></div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div style={{
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.75rem',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100
      }}>
        <button style={{ background: 'transparent', border: 'none', color: '#ff6b35', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Home size={20} />
          Feed
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Search size={20} />
          Buscar
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <TrendingUp size={20} />
          Trending
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Bell size={20} />
          Notific.
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <User size={20} />
          Perfil
        </button>
      </div>

      {/* Floating Action Button */}
      <button 
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1.5rem',
          background: 'linear-gradient(135deg, #ff6b35, #00bcd4)',
          border: 'none',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 107, 53, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onClick={() => setShowComposer(true)}
      >
        <Plus size={24} />
      </button>

      {/* Simple Composer Modal */}
      {showComposer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Comparte tu experiencia 🍽️</h3>
              <button
                onClick={() => setShowComposer(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ×
              </button>
            </div>
            
            <textarea
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder="¿Qué delicia estás preparando hoy? Comparte tu técnica, ingrediente secreto o historia detrás del platillo..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.95rem',
                resize: 'none',
                minHeight: '120px',
                marginBottom: '1.5rem',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowComposer(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Cancelar
              </button>
              <button
                style={{
                  background: composerText.trim() ? 'linear-gradient(135deg, #ff6b35, #00bcd4)' : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  color: 'white',
                  cursor: composerText.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                disabled={!composerText.trim()}
              >
                <Send size={16} />
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}