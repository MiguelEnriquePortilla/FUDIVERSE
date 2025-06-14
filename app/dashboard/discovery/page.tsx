'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  Home, Search, Hash, Bell, Mail, User,
  MoreHorizontal, TrendingUp, Users, Settings,
  BarChart3, Image, Calendar, MapPin, Sparkles,
  Eye, Zap, AlertCircle, Brain, DollarSign,
  ChefHat, UtensilsCrossed, Package, Clock,
  Verified, MoreVertical, Network, Rocket
} from 'lucide-react';

// Import FUDI Components
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiThoughts } from '@/components/fudiverse/FudiThoughts';

// Import styles
import '@/styles/pages/FudiDiscovery.css';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// Types
interface Post {
  id: string;
  type: 'insight' | 'alert' | 'tip' | 'metric' | 'achievement' | 'discussion';
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    aiScore?: number;
  };
  content: {
    text: string;
    metrics?: {
      label: string;
      value: string;
      change?: string;
      trend?: 'up' | 'down';
    }[];
    insightCard?: {
      title: string;
      value: string;
      label: string;
      icon?: any;
    };
    tags?: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  timestamp: string;
  liked?: boolean;
  bookmarked?: boolean;
}

// Content Generator for Restaurant Network
class ContentGenerator {
  private restaurantNames = [
    'Tacos El Patrón', 'Pizza Nostra', 'Mariscos La Perla', 
    'Burger Lab', 'Sushi Master', 'La Casa de Toño',
    'El Buen Sazón', 'Café Luna', 'Parrilla Argentina'
  ];
  
  generatePosts(): Post[] {
    const posts: Post[] = [];
    
    // Mix of different post types
    for (let i = 0; i < 20; i++) {
      const postType = Math.random();
      
      if (postType < 0.3) {
        posts.push(this.generateInsightPost());
      } else if (postType < 0.5) {
        posts.push(this.generateMetricPost());
      } else if (postType < 0.7) {
        posts.push(this.generateAlertPost());
      } else if (postType < 0.85) {
        posts.push(this.generateTipPost());
      } else {
        posts.push(this.generateDiscussionPost());
      }
    }
    
    return posts.sort(() => Math.random() - 0.5);
  }
  
  private generateInsightPost(): Post {
    const insights = [
      {
        text: "📊 Análisis semanal: Las ventas del viernes superaron proyecciones en 47%. El factor clave fue la promoción 2x1 en bebidas que aumentó el ticket promedio.",
        card: { title: "IMPACTO DE PROMOCIÓN", value: "+$12,500", label: "Ingreso adicional" }
      },
      {
        text: "🎯 FUDI detectó un patrón interesante: Los clientes que piden entrada tienen 73% más probabilidad de ordenar postre. Time to push those appetizers!",
        card: { title: "OPORTUNIDAD DETECTADA", value: "73%", label: "Conversión a postre" }
      },
      {
        text: "🔥 El plato del día vendió 3x más cuando lo pusimos en stories. El contenido visual mueve ventas, comprobado con data.",
        card: { title: "ROI DE STORIES", value: "3x", label: "Incremento en ventas" }
      }
    ];
    
    const insight = insights[Math.floor(Math.random() * insights.length)];
    
    return {
      id: `insight-${Date.now()}-${Math.random()}`,
      type: 'insight',
      author: {
        name: 'FUDI Analytics',
        username: '@fudianalytics',
        avatar: '🧠',
        verified: true,
        aiScore: 98
      },
      content: {
        text: insight.text,
        insightCard: insight.card,
        tags: ['#DataDriven', '#RestaurantInsights', '#FUDI']
      },
      stats: {
        likes: Math.floor(Math.random() * 500) + 100,
        comments: Math.floor(Math.random() * 50) + 10,
        shares: Math.floor(Math.random() * 100) + 20,
        views: Math.floor(Math.random() * 5000) + 1000
      },
      timestamp: '2h'
    };
  }
  
  private generateMetricPost(): Post {
    const restaurant = this.restaurantNames[Math.floor(Math.random() * this.restaurantNames.length)];
    const metrics = [
      {
        text: `💪 Cerramos la semana con números sólidos. El equipo está on fire! 🔥`,
        metrics: [
          { label: 'Ventas Hoy', value: '$48,350', change: '+23%', trend: 'up' as const },
          { label: 'Tickets', value: '342', change: '+15%', trend: 'up' as const },
          { label: 'Ticket Promedio', value: '$141', change: '+7%', trend: 'up' as const }
        ]
      },
      {
        text: `📈 Update del mediodía. Vamos por buen camino para romper récord del mes.`,
        metrics: [
          { label: 'Objetivo Diario', value: '78%', change: 'On track', trend: 'up' as const },
          { label: 'Mesas Servidas', value: '126', change: '+12', trend: 'up' as const },
          { label: 'Tiempo Promedio', value: '18min', change: '-3min', trend: 'up' as const }
        ]
      }
    ];
    
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    
    return {
      id: `metric-${Date.now()}-${Math.random()}`,
      type: 'metric',
      author: {
        name: restaurant,
        username: `@${restaurant.toLowerCase().replace(/\s/g, '')}`,
        avatar: restaurant[0],
        verified: false
      },
      content: {
        text: metric.text,
        metrics: metric.metrics
      },
      stats: {
        likes: Math.floor(Math.random() * 300) + 50,
        comments: Math.floor(Math.random() * 30) + 5,
        shares: Math.floor(Math.random() * 50) + 10,
        views: Math.floor(Math.random() * 3000) + 500
      },
      timestamp: '30m'
    };
  }
  
  private generateAlertPost(): Post {
    const alerts = [
      {
        text: "⚠️ ALERTA DE INVENTARIO: Quedan solo 2 días de tortillas al ritmo actual. Time to call al proveedor!",
        tags: ['#InventoryAlert', '#Supplies']
      },
      {
        text: "🌡️ La cámara de refrigeración está 2°C arriba del rango óptimo. Revisen el termostato ASAP.",
        tags: ['#Maintenance', '#FoodSafety']
      },
      {
        text: "📱 El sistema de pagos está intermitente. Tengan efectivo extra en caja por si acaso. Ya contacté soporte.",
        tags: ['#TechIssue', '#PaymentSystem']
      }
    ];
    
    const alert = alerts[Math.floor(Math.random() * alerts.length)];
    
    return {
      id: `alert-${Date.now()}-${Math.random()}`,
      type: 'alert',
      author: {
        name: 'FUDI Monitor',
        username: '@fudimonitor',
        avatar: '⚡',
        verified: true,
        aiScore: 95
      },
      content: {
        text: alert.text,
        tags: alert.tags
      },
      stats: {
        likes: Math.floor(Math.random() * 100) + 20,
        comments: Math.floor(Math.random() * 40) + 10,
        shares: Math.floor(Math.random() * 80) + 20,
        views: Math.floor(Math.random() * 2000) + 500
      },
      timestamp: '5m'
    };
  }
  
  private generateTipPost(): Post {
    const restaurant = this.restaurantNames[Math.floor(Math.random() * this.restaurantNames.length)];
    const tips = [
      "💡 PRO TIP: Cambié el menú de 10 páginas a 2. Las ventas subieron 20% porque los clientes ya no se abruman. Less is more!",
      "🎯 HACK DEL DÍA: Puse música a 128 BPM en la cocina y la productividad subió 15%. La ciencia del ritmo aplicada.",
      "✨ GAME CHANGER: Empecé a mandar fotos del plato listo al cliente que ordena para llevar. 0 quejas en 2 semanas.",
      "🚀 Implementé pre-órdenes por WhatsApp Business. 40% menos tiempo de espera y clientes más felices."
    ];
    
    return {
      id: `tip-${Date.now()}-${Math.random()}`,
      type: 'tip',
      author: {
        name: restaurant,
        username: `@${restaurant.toLowerCase().replace(/\s/g, '')}`,
        avatar: restaurant[0],
        verified: false
      },
      content: {
        text: tips[Math.floor(Math.random() * tips.length)],
        tags: ['#RestaurantTips', '#Optimization', '#Growth']
      },
      stats: {
        likes: Math.floor(Math.random() * 800) + 200,
        comments: Math.floor(Math.random() * 100) + 20,
        shares: Math.floor(Math.random() * 200) + 50,
        views: Math.floor(Math.random() * 8000) + 2000
      },
      timestamp: '4h'
    };
  }
  
  private generateDiscussionPost(): Post {
    const restaurant = this.restaurantNames[Math.floor(Math.random() * this.restaurantNames.length)];
    const discussions = [
      "¿Alguien más notó que los pedidos de delivery bajaron 30% esta semana? ¿Será por el clima o hay algo más?",
      "DEBATE DEL DÍA: ¿Vale la pena invertir en robots de cocina? Vi uno que hace 300 burgers/hora 🤖",
      "REAL TALK: ¿Cuánto están pagando de comisión a las apps de delivery? Necesito renegociar y quiero benchmarks.",
      "¿Qué opinan de cobrar extra por modificaciones al menú? Estoy perdiendo margen con tanto pedido especial."
    ];
    
    return {
      id: `discussion-${Date.now()}-${Math.random()}`,
      type: 'discussion',
      author: {
        name: restaurant,
        username: `@${restaurant.toLowerCase().replace(/\s/g, '')}`,
        avatar: restaurant[0],
        verified: false
      },
      content: {
        text: discussions[Math.floor(Math.random() * discussions.length)],
        tags: ['#RestaurantLife', '#Community', '#AskFudiers']
      },
      stats: {
        likes: Math.floor(Math.random() * 200) + 30,
        comments: Math.floor(Math.random() * 150) + 40,
        shares: Math.floor(Math.random() * 50) + 5,
        views: Math.floor(Math.random() * 4000) + 800
      },
      timestamp: '6h'
    };
  }
}

export default function FudiDiscovery() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [composerText, setComposerText] = useState('');
  const [selectedTab, setSelectedTab] = useState<'forYou' | 'following'>('forYou');
  const contentGeneratorRef = useRef(new ContentGenerator());
  const observerRef = useRef<HTMLDivElement>(null);
  
  // Initialize feed
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialPosts = contentGeneratorRef.current.generatePosts();
      setPosts(initialPosts);
      setDisplayedPosts([...initialPosts]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current || posts.length === 0) return;
    
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Add more posts (copy of originals with new IDs)
        setDisplayedPosts(prev => {
          const newPosts = posts.map(post => ({
            ...post,
            id: `${post.id}-copy-${Date.now()}-${Math.random()}`
          }));
          return [...prev, ...newPosts];
        });
      }
    }, options);
    
    observer.observe(observerRef.current);
    
    return () => observer.disconnect();
  }, [posts]);
  
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  
  const handleLike = (postId: string) => {
    setDisplayedPosts(prev => prev.map(post => {
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
    setDisplayedPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, bookmarked: !post.bookmarked };
      }
      return post;
    }));
  };
  
  const handlePost = () => {
    if (!composerText.trim()) return;
    
    const newPost: Post = {
      id: `user-${Date.now()}`,
      type: 'discussion',
      author: {
        name: 'Mi Restaurante',
        username: '@mirestaurante',
        avatar: 'M',
        verified: false
      },
      content: {
        text: composerText,
        tags: []
      },
      stats: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0
      },
      timestamp: 'ahora'
    };
    
    setPosts([newPost, ...posts]);
    setDisplayedPosts([newPost, ...displayedPosts]);
    setComposerText('');
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="discovery-container">
      {/* HERO BANNER - FUDISCOVERY INTRO */}
      <div className="hero-banner">
        <div className="hero-content">
          <div>
            <div className="hero-logo">fudiFlow</div>
            <div className="hero-tagline">LA RED SOCIAL PARA RESTAURANTEROS</div>
          </div>
          <div className="hero-description">
            Comparte insights • Aprende • Conecta • Crece
          </div>
        </div>
        
        <div className="hero-actions">
          <div className="hero-stats">
            <div className="hero-stat">
              <Network size={16} />
              <span className="stat-value">2,451</span>
              <span>Restauranteros</span>
            </div>
            <div className="hero-stat">
              <Rocket size={16} />
              <span className="stat-value">8.2K</span>
              <span>Posts hoy</span>
            </div>
          </div>
          <button className="hero-cta">
            Únete al Flow
          </button>
        </div>
      </div>

      {/* Neural Grid Background - handled by CSS */}
      
      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">F</div>
          </div>
          
          <nav className="nav-menu">
            <a href="#" className="nav-item active">
              <Home size={24} />
              <span>Inicio</span>
            </a>
            <a href="#" className="nav-item">
              <Search size={24} />
              <span>Explorar</span>
            </a>
            <a href="#" className="nav-item">
              <Bell size={24} />
              <span>Notificaciones</span>
            </a>
            <a href="#" className="nav-item">
              <Mail size={24} />
              <span>Mensajes</span>
            </a>
            <a href="#" className="nav-item">
              <Bookmark size={24} />
              <span>Guardados</span>
            </a>
            <a href="#" className="nav-item">
              <Users size={24} />
              <span>Comunidades</span>
            </a>
            <a href="#" className="nav-item">
              <Sparkles size={24} />
              <span>Premium</span>
            </a>
            <a href="#" className="nav-item">
              <BarChart3 size={24} />
              <span>Analytics</span>
            </a>
            <a href="#" className="nav-item">
              <User size={24} />
              <span>Perfil</span>
            </a>
            <a href="#" className="nav-item">
              <MoreHorizontal size={24} />
              <span>Más opciones</span>
            </a>
          </nav>
          
          <FudiButton 
            variant="primary"
            className="post-button"
            onClick={() => {}}
          >
            <span>Postear</span>
          </FudiButton>
        </aside>
        
        {/* Main Feed */}
        <main className="feed-container">
          <div className="feed-header">
            <div className="feed-header-content">
              <h1 className="feed-title">Neural Flow</h1>
              <div className="feed-header-icon">
                <Sparkles size={20} />
              </div>
            </div>
            
            <div className="feed-tabs">
              <div 
                className={`feed-tab ${selectedTab === 'forYou' ? 'active' : ''}`}
                onClick={() => setSelectedTab('forYou')}
              >
                Para ti
              </div>
              <div 
                className={`feed-tab ${selectedTab === 'following' ? 'active' : ''}`}
                onClick={() => setSelectedTab('following')}
              >
                Siguiendo
              </div>
            </div>
          </div>
          
          {/* Composer */}
          <div className="composer">
            <div className="composer-content">
              <div className="composer-avatar">M</div>
              <div className="composer-input-wrapper">
                <textarea
                  className="composer-input"
                  placeholder="¿Qué está pasando en tu restaurante?"
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      handlePost();
                    }
                  }}
                />
              </div>
            </div>
            <div className="composer-actions">
              <div className="composer-tools">
                <button className="composer-tool">
                  <Image size={20} />
                </button>
                <button className="composer-tool">
                  <BarChart3 size={20} />
                </button>
                <button className="composer-tool">
                  <Calendar size={20} />
                </button>
                <button className="composer-tool">
                  <MapPin size={20} />
                </button>
              </div>
              <FudiButton
                variant="primary"
                size="small"
                className="composer-post-button"
                onClick={handlePost}
              >
                Postear
              </FudiButton>
            </div>
          </div>
          
          {/* Feed Content */}
          <div className="feed-content">
            {displayedPosts.map(post => (
              <FudiCard
                key={post.id}
                className="feed-item"
                variant="subtle"
                hoverable
              >
                <div className="post-card">
                  <div className="post-header">
                    <div className={`author-avatar ${post.author.verified ? 'avatar-ai' : 'avatar-user'}`}>
                      {post.author.avatar}
                    </div>
                    <div className="author-info">
                      <div className="author-line">
                        <span className="author-name">{post.author.name}</span>
                        {post.author.verified && (
                          <div className="verified-badge">✓</div>
                        )}
                        {post.author.aiScore && (
                          <div className="ai-score">
                            <Eye size={12} />
                            <span>{post.author.aiScore}%</span>
                          </div>
                        )}
                        <span className="author-username">{post.author.username}</span>
                        <span className="timestamp">· {post.timestamp}</span>
                      </div>
                    </div>
                    <button className="more-button">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  
                  <div className="content-text">{post.content.text}</div>
                  
                  {/* Insight Card */}
                  {post.content.insightCard && (
                    <div className="insight-card">
                      <div className="insight-header">
                        <Zap size={16} />
                        <span>{post.content.insightCard.title}</span>
                      </div>
                      <div className="insight-value">
                        {post.content.insightCard.value}
                      </div>
                      <div className="insight-label">
                        {post.content.insightCard.label}
                      </div>
                    </div>
                  )}
                  
                  {/* Metrics Grid */}
                  {post.content.metrics && (
                    <div className="metrics-grid">
                      {post.content.metrics.map((metric, i) => (
                        <div key={i} className="metric-item">
                          <div className="metric-value">
                            {metric.value}
                          </div>
                          <div className="metric-label">
                            {metric.label}
                          </div>
                          {metric.change && (
                            <div className={`metric-trend ${metric.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                              {metric.change}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Tags */}
                  {post.content.tags && post.content.tags.length > 0 && (
                    <div className="tags">
                      {post.content.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="actions-bar">
                    <button className="action-button comment-button">
                      <MessageCircle size={18} />
                      <span>{formatNumber(post.stats.comments)}</span>
                    </button>
                    <button className="action-button share-button">
                      <Share2 size={18} />
                      <span>{formatNumber(post.stats.shares)}</span>
                    </button>
                    <button 
                      className={`action-button like-button ${post.liked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                      <span>{formatNumber(post.stats.likes)}</span>
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleBookmark(post.id)}
                    >
                      <Bookmark size={18} fill={post.bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              </FudiCard>
            ))}
            
            {/* Observer for infinite scroll */}
            <div ref={observerRef} style={{ height: '20px', margin: '20px 0' }}>
              <div style={{ textAlign: 'center', color: 'var(--fudi-text-secondary)' }}>
                Cargando más posts...
              </div>
            </div>
          </div>
        </main>
        
        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Trending */}
          <FudiCard variant="surface" className="sidebar-section">
            <h3 className="sidebar-title">Tendencias en FUDIERS</h3>
            <div className="trending-list">
              <div className="trending-item">
                <div className="trending-category">Trending in Restaurants</div>
                <div className="trending-title">#DeliveryApps</div>
                <div className="trending-stats">2,451 posts</div>
              </div>
              <div className="trending-item">
                <div className="trending-category">Business</div>
                <div className="trending-title">Inflación Alimentos</div>
                <div className="trending-stats">1,832 posts</div>
              </div>
              <div className="trending-item">
                <div className="trending-category">Technology</div>
                <div className="trending-title">KDS Systems</div>
                <div className="trending-stats">945 posts</div>
              </div>
              <div className="trending-item">
                <div className="trending-category">Marketing</div>
                <div className="trending-title">Instagram Reels</div>
                <div className="trending-stats">734 posts</div>
              </div>
              <div className="trending-item">
                <div className="trending-category">Operations</div>
                <div className="trending-title">Personal Shortage</div>
                <div className="trending-stats">612 posts</div>
              </div>
            </div>
          </FudiCard>
          
          {/* Who to Follow */}
          <FudiCard variant="surface" className="sidebar-section">
            <h3 className="sidebar-title">A quién seguir</h3>
            <div className="follow-list">
              <div className="follow-item">
                <div className="follow-user">
                  <div className="follow-avatar">G</div>
                  <div className="follow-info">
                    <div className="follow-name">Gordon Ramsay MX</div>
                    <div className="follow-username">@gordmx</div>
                  </div>
                </div>
                <FudiButton variant="secondary" size="small" className="follow-button">
                  Seguir
                </FudiButton>
              </div>
              <div className="follow-item">
                <div className="follow-user">
                  <div className="follow-avatar">C</div>
                  <div className="follow-info">
                    <div className="follow-name">Chef Oropeza</div>
                    <div className="follow-username">@cheforopeza</div>
                  </div>
                </div>
                <FudiButton variant="secondary" size="small" className="follow-button">
                  Seguir
                </FudiButton>
              </div>
              <div className="follow-item">
                <div className="follow-user">
                  <div className="follow-avatar">R</div>
                  <div className="follow-info">
                    <div className="follow-name">Restaurant News</div>
                    <div className="follow-username">@restnewsmx</div>
                  </div>
                </div>
                <FudiButton variant="secondary" size="small" className="follow-button">
                  Seguir
                </FudiButton>
              </div>
            </div>
          </FudiCard>
        </aside>
      </div>
      
      {/* FUDI Entity observando en la esquina */}
      <div className="fudi-container">
        <FudiAura 
          variant="combined"
          color="#fbbf24"
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
          intensity={0.7}
        />
      </div>
      
      {/* FUDI Thoughts (notificaciones flotantes) */}
      <FudiThoughts 
        thoughts={[
          "Nuevo récord de ventas detectado 🎯",
          "3 mesas esperando más de 15min ⏱️",
          "Inventario de tortillas bajo 📦",
          "Cliente VIP acaba de llegar 👑"
        ]}
        interval={8000}
        position="top-right"
      />
    </div>
  );
}