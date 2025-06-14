'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  Home, Search, Hash, Bell, Mail, User,
  MoreHorizontal, TrendingUp, Users, Settings,
  BarChart3, Image, Calendar, MapPin, Sparkles,
  Eye, Zap, AlertCircle, Brain, DollarSign,
  ChefHat, UtensilsCrossed, Package, Clock,
  Verified, MoreVertical, Network, Rocket,
  Camera, Play, Flame, Trophy, Target,
  ArrowUp, ArrowDown, Star, Crown, Gift,
  Activity, Cpu, Wifi, Signal, Database
} from 'lucide-react';

// Import CSS styles
import '../../../styles/pages/FudiDiscovery.css';

// CONTENT GENERATORS
const generateRestaurantPosts = () => {
  const posts = [
    {
      id: 'insight-1',
      type: 'insight',
      author: {
        name: 'FUDI Analytics',
        username: '@fudianalytics',
        avatar: '🧠',
        verified: true,
        aiScore: 98,
        type: 'ai'
      },
      content: 'NEURAL INSIGHT: Descubrimos que agregar el sonido del "sizzle" de la carne en nuestros videos aumentó pedidos de hamburguesas 340%. Los cerebros hambrientos reaccionan al audio tanto como al visual.',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=300&fit=crop',
      metrics: [
        { label: 'Impacto ROI', value: '+340%' },
        { label: 'Engagement', value: '89%' },
        { label: 'Conversión', value: '+156%' }
      ],
      tags: ['#DataDriven', '#VisualContent', '#TacoStrategy'],
      timestamp: '2h',
      stats: { likes: 847, comments: 156, shares: 234, views: 12500 }
    },
    {
      id: 'chef-tip-1',
      type: 'chef-tip',
      author: {
        name: 'Chef Marco Guerrero',
        username: '@chefmarco',
        avatar: '👨‍🍳',
        verified: false,
        type: 'chef'
      },
      content: 'GAME CHANGER: Cambié mi mise en place de 30 contenedores a 12 estratégicos. Velocidad en cocina +67%. A veces menos contenedores = más control neural.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=300&fit=crop',
      metrics: [
        { label: 'Velocidad', value: '+67%' },
        { label: 'Eficiencia', value: '+45%' },
        { label: 'Stress Level', value: '-23%' }
      ],
      tags: ['#KitchenHacks', '#Efficiency', '#ChefLife'],
      timestamp: '4h',
      stats: { likes: 2341, comments: 387, shares: 892, views: 18500 }
    },
    {
      id: 'restaurant-update-1',
      type: 'restaurant',
      author: {
        name: 'Tacos El Patrón',
        username: '@tacospatron',
        avatar: 'T',
        verified: false,
        type: 'user'
      },
      content: '🔥 BREAKING: Acabamos de romper nuestro récord histórico de ventas en un solo día. $47,350 pesos en 12 horas. El equipo está ON FIRE y los clientes lo sienten.',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=300&fit=crop',
      metrics: [
        { label: 'Ventas Hoy', value: '$47,350' },
        { label: 'Tickets', value: '432' },
        { label: 'Ticket Promedio', value: '$109' }
      ],
      tags: ['#RecordBreaking', '#TeamWork', '#Success'],
      timestamp: '6h',
      stats: { likes: 1205, comments: 234, shares: 445, views: 8900 }
    },
    {
      id: 'ai-prediction-1',
      type: 'prediction',
      author: {
        name: 'FUDI Quantum',
        username: '@fudiquantum',
        avatar: '🔮',
        verified: true,
        aiScore: 94,
        type: 'ai'
      },
      content: 'PREDICCIÓN NEURAL: Basado en patrones históricos, mañana (Viernes) tendrás 23% más demanda de bebidas frías entre 2-4 PM. Prepara hielo extra y staff adicional.',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=300&fit=crop',
      metrics: [
        { label: 'Precisión', value: '94%' },
        { label: 'Demanda Proyectada', value: '+23%' },
        { label: 'Hora Pico', value: '2-4 PM' }
      ],
      tags: ['#Prediction', '#AIForecast', '#BeverageStrategy'],
      timestamp: '1d',
      stats: { likes: 567, comments: 89, shares: 178, views: 6700 }
    },
    {
      id: 'viral-tip-1',
      type: 'viral',
      author: {
        name: 'Mariscos La Perla',
        username: '@mariscosperla',
        avatar: '🦐',
        verified: false,
        type: 'user'
      },
      content: 'VIRAL HACK: Empecé a servir limones en forma de flor (30 segundos extra de prep). Los clientes suben 10x más fotos. Instagram stories +500%. Social media = marketing gratis.',
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&h=300&fit=crop',
      metrics: [
        { label: 'Fotos Subidas', value: '+1000%' },
        { label: 'Stories Mentions', value: '+500%' },
        { label: 'Costo Extra', value: '$0.50' }
      ],
      tags: ['#ViralHack', '#SocialMedia', '#CustomerExperience'],
      timestamp: '2d',
      stats: { likes: 3421, comments: 567, shares: 1234, views: 25600 }
    }
  ];

  return posts.sort(() => Math.random() - 0.5);
};

export default function FudiFlowRevolution() {
  interface Post {
    id: string;
    type: string;
    author: {
      name: string;
      username: string;
      avatar: string;
      verified: boolean;
      aiScore?: number;
      type: string;
    };
    content: string;
    image?: string;
    metrics?: Array<{
      label: string;
      value: string;
    }>;
    tags?: string[];
    timestamp: string;
    stats: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
    liked?: boolean;
    bookmarked?: boolean;
  }
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [composerText, setComposerText] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Load posts
    const initialPosts = generateRestaurantPosts();
    setPosts(initialPosts);

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleLike = (postId: any) => {
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

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, bookmarked: !post.bookmarked };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!composerText.trim()) return;
    
    const newPost = {
      id: `user-${Date.now()}`,
      type: 'restaurant',
      author: {
        name: 'Mi Restaurante',
        username: '@mirestaurante',
        avatar: 'M',
        verified: false,
        type: 'user'
      },
      content: composerText,
      timestamp: 'ahora',
      stats: { likes: 0, comments: 0, shares: 0, views: 0 }
    };
    
    setPosts([newPost, ...posts]);
    setComposerText('');
  };

  return (
    <div className="fudiflow-container">
      {/* Neural Grid Background */}

      {/* HERO BANNER - COMING SOON EPIC */}
      <div className={`hero-banner ${isScrolled ? 'scrolled' : ''}`}>
        <div className="hero-content">
          <div className="coming-soon-badge">
            <Rocket size={16} />
            <span>PRÓXIMAMENTE</span>
          </div>
          
          <div>
            <div className="hero-logo">fudiFlow</div>
            <div className="hero-tagline">POWERED BY FUDIVERSE AI</div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-value">8,500+</span>
            <span className="stat-label">Lista de espera</span>
          </div>
          <div className="hero-stat">
            <span className="stat-value">22</span>
            <span className="stat-label">Ciudades</span>
          </div>
          <div className="hero-stat">
            <span className="stat-value">Q2</span>
            <span className="stat-label">2025 Launch</span>
          </div>
        </div>
        
        <button className="hero-cta">
          ÚNETE A LA LISTA
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="main-layout">
        
        {/* LEFT COMMAND CENTER */}
        <aside className="command-center">
          <div className="command-header">
            <div className="command-logo">fudiFlow</div>
            <div className="command-subtitle">Neural Command Center</div>
          </div>
          
          <nav className="nav-menu">
            <a href="#" className="nav-item active">
              <Home size={20} />
              Neural Feed
            </a>
            <a href="#" className="nav-item">
              <Search size={20} />
              Explorar
            </a>
            <a href="#" className="nav-item">
              <Brain size={20} />
              AI Insights
            </a>
            <a href="#" className="nav-item">
              <Bell size={20} />
              Alertas
            </a>
            <a href="#" className="nav-item">
              <Mail size={20} />
              Mensajes
            </a>
            <a href="#" className="nav-item">
              <Users size={20} />
              Comunidad
            </a>
            <a href="#" className="nav-item">
              <Sparkles size={20} />
              Premium
            </a>
            <a href="#" className="nav-item">
              <BarChart3 size={20} />
              Analytics
            </a>
          </nav>
          
          <button className="post-button">
            <Sparkles size={20} style={{marginRight: '0.5rem'}} />
            Compartir Neural
          </button>

          <div className="neural-status">
            <div className="status-title">
              <Activity size={16} style={{marginRight: '0.5rem'}} />
              FUDIVERSE STATUS
            </div>
            <div className="status-metrics">
              <div className="status-metric">
                <div className="metric-value">98%</div>
                <div className="metric-label">Neural Online</div>
              </div>
              <div className="status-metric">
                <div className="metric-value">2.3K</div>
                <div className="metric-label">Restauranteros</div>
              </div>
              <div className="status-metric">
                <div className="metric-value">Live</div>
                <div className="metric-label">Data Stream</div>
              </div>
              <div className="status-metric">
                <div className="metric-value">24/7</div>
                <div className="metric-label">AI Analysis</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN NEURAL FEED */}
        <main className="neural-feed">
          
          {/* NEURAL COMPOSER */}
          <div className="neural-composer">
            <div className="composer-header">
              <div className="composer-avatar">M</div>
              <div className="composer-info">
                <div className="composer-name">Mi Restaurante</div>
                <div className="composer-subtitle">Neural Broadcasting</div>
              </div>
            </div>
            
            <textarea
              className="composer-input"
              placeholder="¿Qué insights neurales estás descubriendo en tu restaurante hoy?"
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              rows={3}
            />
            
            <div className="composer-actions">
              <div className="composer-tools">
                <button className="composer-tool">
                  <Camera size={20} />
                </button>
                <button className="composer-tool">
                  <BarChart3 size={20} />
                </button>
                <button className="composer-tool">
                  <Brain size={20} />
                </button>
                <button className="composer-tool">
                  <Activity size={20} />
                </button>
              </div>
              <button className="composer-post-btn" onClick={handlePost}>
                <Zap size={16} style={{marginRight: '0.5rem'}} />
                Neural Cast
              </button>
            </div>
          </div>

          {/* NEURAL POSTS */}
          {posts.map(post => (
            <article key={post.id} className="neural-post">
              <div className="post-header">
                <div className={`post-avatar avatar-${post.author.type}`}>
                  {post.author.avatar}
                </div>
                <div className="post-info">
                  <div className="post-author">
                    <span className="author-name">{post.author.name}</span>
                    {post.author.verified && (
                      <div className="verified-badge">✓</div>
                    )}
                    {post.author.aiScore && (
                      <div className="ai-score">
                        <Eye size={12} />
                        {post.author.aiScore}%
                      </div>
                    )}
                  </div>
                  <div className="post-meta">
                    {post.author.username} • {post.timestamp}
                  </div>
                </div>
                <button className="post-more">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="post-content">
                {post.content}
              </div>

              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="post-image"
                />
              )}

              {post.metrics && (
                <div className="post-metrics">
                  {post.metrics.map((metric, i) => (
                    <div key={i} className="metric-item">
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {post.tags && (
                <div className="post-tags">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="post-tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="post-actions">
                <div className="action-group">
                  <button className="action-button">
                    <MessageCircle size={16} />
                    {formatNumber(post.stats.comments)}
                  </button>
                  <button className="action-button">
                    <Share2 size={16} />
                    {formatNumber(post.stats.shares)}
                  </button>
                  <button 
                    className={`action-button ${post.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                    {formatNumber(post.stats.likes)}
                  </button>
                </div>
                <button 
                  className={`action-button ${post.bookmarked ? 'bookmarked' : ''}`}
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark size={16} fill={post.bookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </article>
          ))}
        </main>

        {/* RIGHT INTELLIGENCE CENTER */}
        <aside className="intelligence-center">
          
          {/* NEURAL TRENDS */}
          <div className="intelligence-card">
            <div className="card-header">
              <TrendingUp className="card-icon" />
              <span className="card-title">Neural Trends</span>
            </div>
            
            <div className="trending-item">
              <div className="trending-category">Trending • Restaurantes</div>
              <div className="trending-title">#MenuEngineering</div>
              <div className="trending-stats">4,567 neural posts</div>
            </div>
            
            <div className="trending-item">
              <div className="trending-category">AI Analysis • Operaciones</div>
              <div className="trending-title">Optimización de Inventario</div>
              <div className="trending-stats">2,341 insights compartidos</div>
            </div>
            
            <div className="trending-item">
              <div className="trending-category">Viral • Marketing</div>
              <div className="trending-title">TikTok Food Hacks</div>
              <div className="trending-stats">8,923 implementaciones</div>
            </div>
            
            <div className="trending-item">
              <div className="trending-category">Hot Topic • Finanzas</div>
              <div className="trending-title">Inflación Ingredientes 2025</div>
              <div className="trending-stats">1,567 discusiones</div>
            </div>
          </div>

          {/* NEURAL CONNECTIONS */}
          <div className="intelligence-card">
            <div className="card-header">
              <Network className="card-icon" />
              <span className="card-title">Neural Connections</span>
            </div>
            
            <div className="follow-item">
              <div className="follow-user">
                <div className="follow-avatar">G</div>
                <div className="follow-info">
                  <div className="follow-name">Gordon AI Chef</div>
                  <div className="follow-username">@gordonai</div>
                </div>
              </div>
              <button className="follow-button">Connect</button>
            </div>
            
            <div className="follow-item">
              <div className="follow-user">
                <div className="follow-avatar">🤖</div>
                <div className="follow-info">
                  <div className="follow-name">FUDI Quantum</div>
                  <div className="follow-username">@fudiquantum</div>
                </div>
              </div>
              <button className="follow-button">Connect</button>
            </div>
            
            <div className="follow-item">
              <div className="follow-user">
                <div className="follow-avatar">C</div>
                <div className="follow-info">
                  <div className="follow-name">Chef Oropeza Neural</div>
                  <div className="follow-username">@cheforopeza</div>
                </div>
              </div>
              <button className="follow-button">Connect</button>
            </div>
            
            <div className="follow-item">
              <div className="follow-user">
                <div className="follow-avatar">📊</div>
                <div className="follow-info">
                  <div className="follow-name">Restaurant Analytics</div>
                  <div className="follow-username">@restanalytics</div>
                </div>
              </div>
              <button className="follow-button">Connect</button>
            </div>
          </div>

          {/* NEURAL INTELLIGENCE */}
          <div className="intelligence-card">
            <div className="card-header">
              <Brain className="card-icon" />
              <span className="card-title">Neural Intelligence</span>
            </div>
            
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.6))'
              }}>🧠</div>
              <div style={{
                color: 'var(--fudi-secondary)',
                fontSize: '0.875rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '0.5rem'
              }}>
                FUDI AI PROCESSING
              </div>
              <div style={{
                color: 'var(--fudi-text-secondary)',
                fontSize: '0.75rem',
                lineHeight: '1.4'
              }}>
                Analizando patrones neurales de 2,345 restaurantes para generar insights personalizados
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(0,255,255,0.8)); }
          50% { filter: drop-shadow(0 0 50px rgba(251,191,36,0.8)); }
        }
      `}</style>
    </div>
  );
}