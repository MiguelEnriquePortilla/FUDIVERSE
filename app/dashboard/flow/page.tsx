'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Send, MoreHorizontal,
  Home, Search, Hash, Bell, Mail, User, Plus, Play, Pause,
  MoreVertical, Camera, Video, Image, Mic, MapPin, Clock,
  ChefHat, Star, TrendingUp, Crown, Gift, Zap, Flame,
  Eye, Users, DollarSign, Target, Award, ThumbsUp, Store
} from 'lucide-react';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';

// Import CSS
import '../../../styles/pages/FudiFlow.css';

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

export default function Flow() {
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

  // ✅ LOGOUT FUNCTION - Copy/paste exacto
  const handleLogout = () => {
    try {
      // Clear authentication token
      localStorage.removeItem('fudi_token');
      
      // Clear any user session data
      localStorage.removeItem('user_data');
      localStorage.removeItem('restaurant_data');
      
      // Clear any cached API data (optional)
      localStorage.removeItem('dashboard_cache');
      
      console.log('Logout successful - redirecting to home');
      
      // Redirect to main page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout process:', error);
      
      // Force redirect even if there's an error
      window.location.href = '/';
    }
  };

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
        const liked = !post.liked || false; // Default false si no existe
        return {
          ...post,
          liked: !liked,
          stats: {
            ...post.stats,
            likes: !liked ? post.stats.likes + 1 : post.stats.likes - 1
          }
        };
      }
      return post;
    }));
  };

  const handleSave = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const saved = !post.saved || false; // Default false si no existe
        return {
          ...post,
          saved: !saved,
          stats: {
            ...post.stats,
            saves: !saved ? post.stats.saves + 1 : post.stats.saves - 1
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
            shares: (post.stats.shares || 0) + 1 // Safe increment
          }
        };
      }
      return post;
    }));
    
    // Optional: Show share success message
    console.log('Post compartido exitosamente');
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
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner" />
          <h2 className="loading-text">
            Cargando experiencias deliciosas...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fudiflow-container">
      
      {/* ✅ FudiDashHeader with logout function */}
      <FudiDashHeader 
        currentModule="flow" 
        userName="Mikelon"
        userPlan="pro"
        notifications={2}
        onLogout={handleLogout}
      />

      {/* Main Content - 3 Column Layout */}
      <div className="main-content">
        
        {/* Left Sidebar - Navigation Menu */}
        <div className="left-sidebar">
          <div className="sidebar-content">
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">
                {currentUser.avatar}
              </div>
              <span className="sidebar-user-name">{currentUser.name}</span>
            </div>
            
            <div className="sidebar-menu">
              <div className="menu-item">
                <Users size={20} />
                <span>Amigos</span>
              </div>
              <div className="menu-item">
                <Clock size={20} />
                <span>Recuerdos</span>
              </div>
              <div className="menu-item">
                <Bookmark size={20} />
                <span>Guardado</span>
              </div>
              <div className="menu-item">
                <Users size={20} />
                <span>Grupos</span>
              </div>
              <div className="menu-item">
                <Video size={20} />
                <span>Reels</span>
              </div>
              <div className="menu-item">
                <Store size={20} />
                <span>Marketplace</span>
              </div>
              <div className="menu-item">
                <Hash size={20} />
                <span>Feeds</span>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h4>Tus accesos directos</h4>
              <div className="shortcut-item">
                <div className="shortcut-avatar">🍕</div>
                <span>Pizza Bros</span>
              </div>
              <div className="shortcut-item">
                <div className="shortcut-avatar">🌮</div>
                <span>Tacos El Fuego</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Container - Central */}
        <div className="feed-container">
          
          {/* Sticky Composer - "¿Cuál es tu Flow?" */}
          <div className="create-post-composer">
            <div className="composer-header">
              <div className="composer-user-avatar">
                {currentUser.avatar}
              </div>
              <button 
                className="composer-input"
                onClick={() => setShowComposer(true)}
              >
                ¿Cuál es tu Flow, {currentUser.name}?
              </button>
            </div>
            
            <div className="composer-options">
              <button className="composer-option video">
                <Video size={20} />
                <span>Video en vivo</span>
              </button>
              <button className="composer-option photo">
                <Image size={20} />
                <span>Foto/video</span>
              </button>
              <button className="composer-option activity">
                <Star size={20} />
                <span>Historia/actividad</span>
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <div className="tab-container">
              {[
                { id: 'foryou', label: 'Para Ti', icon: '🔥' },
                { id: 'trending', label: 'Trending', icon: '📈' },
                { id: 'following', label: 'Siguiendo', icon: '👥' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {posts.map((post, index) => (
              <div key={post.id} className="post-card">
                
                {/* Post Header */}
                <div className="post-header">
                  <div className="author-info">
                    <div className="author-avatar">
                      {post.author.avatar}
                    </div>
                    <div className="author-details">
                      <h4>
                        {post.author.name}
                        {post.author.verified && (
                          <div className="verified-badge">
                            ✓
                          </div>
                        )}
                      </h4>
                      <div className="author-meta">
                        <span>{post.author.followers} seguidores</span>
                        <div className="meta-dot"></div>
                        <span>{post.timestamp}</span>
                        <div className="meta-dot"></div>
                        <span>{post.location}</span>
                      </div>
                    </div>
                  </div>
                  <button className="more-button">
                    <MoreVertical size={20} />
                  </button>
                </div>
                
                {/* Post Content */}
                <div className="post-content">
                  <p className="post-text">
                    {post.content}
                  </p>
                  
                  {/* Tags */}
                  {post.tags && (
                    <div className="post-tags">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Media */}
                  <div 
                    className="post-media"
                    style={{ backgroundImage: `url(${post.media.url})` }}
                  >
                    <div className="media-overlay">
                      {post.media.type === 'video' && (
                        <button
                          onClick={() => handleVideoPlay(post.id)}
                          className="video-play-button"
                        >
                          {playingVideo === post.id ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                      )}
                    </div>
                    
                    {/* Media metadata overlay */}
                    <div className="post-meta-overlay">
                      <div className="meta-item">
                        <MapPin size={14} />
                        {post.location}
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        {post.timestamp}
                      </div>
                      {post.media.views && (
                        <div className="meta-item">
                          <Eye size={14} />
                          {post.media.views}
                        </div>
                      )}
                    </div>
                    
                    {/* Special badges */}
                    {post.promotion && (
                      <div className="promotion-badge">
                        {post.promotion.text}
                      </div>
                    )}
                    
                    {post.trending && (
                      <div className="trending-badge">
                        <Flame size={14} />
                        TRENDING
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="actions-bar">
                  <div className="actions-left">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`action-button ${post.liked ? 'liked' : ''}`}
                    >
                      <Heart size={20} fill={post.liked ? '#ff3040' : 'none'} />
                      {formatNumber(post.stats.likes)}
                    </button>

                    <button className="action-button">
                      <MessageCircle size={20} />
                      {formatNumber(post.stats.comments)}
                    </button>

                    <button
                      onClick={() => handleShare(post.id)}
                      className="action-button"
                    >
                      <Share2 size={20} />
                      {formatNumber(post.stats.shares)}
                    </button>
                  </div>

                  <button
                    onClick={() => handleSave(post.id)}
                    className={`action-button ${post.saved ? 'saved' : ''}`}
                  >
                    <Bookmark size={20} fill={post.saved ? '#ffa726' : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Contacts & Ads */}
        <div className="right-sidebar">
          <div className="sidebar-content">
            
            {/* Sponsored/Ads Section */}
            <div className="sidebar-section">
              <h4>Patrocinado</h4>
              
              <div className="sponsored-item">
                <div className="sponsored-image">
                  <div className="sponsored-logo">📊</div>
                </div>
                <div className="sponsored-content">
                  <h5>Analytics Pro Report</h5>
                  <p>Optimiza tu restaurante con datos</p>
                  <span className="sponsored-link">fudiverse.ai</span>
                </div>
              </div>
              
              <div className="sponsored-item">
                <div className="sponsored-image">
                  <div className="sponsored-logo">🎯</div>
                </div>
                <div className="sponsored-content">
                  <h5>Marketing para Restaurantes</h5>
                  <p>Aumenta tus ventas 300%</p>
                  <span className="sponsored-link">marketing.com</span>
                </div>
              </div>
            </div>
            
            {/* Contacts Section */}
            <div className="sidebar-section">
              <div className="section-header">
                <h4>Contactos</h4>
                <div className="section-actions">
                  <button className="icon-button">
                    <Search size={16} />
                  </button>
                  <button className="icon-button">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              
              <div className="contacts-list">
                <div className="contact-item">
                  <div className="contact-avatar">👨‍🍳</div>
                  <span className="contact-name">Chef Carlos</span>
                  <div className="contact-status online"></div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-avatar">👩‍💼</div>
                  <span className="contact-name">Ana González</span>
                  <div className="contact-status online"></div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-avatar">🧑‍🍳</div>
                  <span className="contact-name">Mario Sánchez</span>
                  <div className="contact-status away"></div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-avatar">👩‍🍳</div>
                  <span className="contact-name">Laura Martín</span>
                  <div className="contact-status online"></div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-avatar">🧑‍💼</div>
                  <span className="contact-name">Roberto Díaz</span>
                  <div className="contact-status offline"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => setShowComposer(true)}
        className="floating-create-button"
      >
        <Plus size={28} />
      </button>

      {/* Simple Composer Modal */}
      {showComposer && (
        <div className="composer-modal">
          <div className="composer-content">
            <h3 className="composer-title">
              Comparte tu platillo 🍽️
            </h3>
            
            <textarea
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder="¿Qué delicia estás preparando hoy?"
              className="composer-textarea"
            />

            <div className="composer-actions">
              <button
                onClick={() => setShowComposer(false)}
                className="composer-button cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handlePost}
                className="composer-button publish"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}