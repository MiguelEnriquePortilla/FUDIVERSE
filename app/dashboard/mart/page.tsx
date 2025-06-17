'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Plus, Grid3X3, List, SlidersHorizontal,
  Star, MessageCircle, Heart, Share2, Filter, Menu, X,
  Brain, Flame, Snowflake, UtensilsCrossed, Sprout, 
  Smartphone, Truck, DollarSign, Clock, Eye, ChevronRight,
  User, Package, BookOpen, Settings, HelpCircle
} from 'lucide-react';

// Import styles
import '@/styles/pages/FudiMart.css';

// TypeScript Interfaces
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: 'Nuevo' | 'Como Nuevo' | 'Buen Estado' | 'Regular';
  location: string;
  distance: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
    avatar?: string;
  };
  category: string;
  urgent?: boolean;
  featured?: boolean;
  postedDate: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  active?: boolean;
}

export default function Mart() {
  // State Management
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());

  // Sample Data
  const categories: Category[] = [
    { id: 'all', name: 'Todo', icon: '🔍', count: 247 },
    { id: 'cocina', name: 'Equipos de Cocina', icon: '🔥', count: 89 },
    { id: 'refrigeracion', name: 'Refrigeración', icon: '❄️', count: 45 },
    { id: 'servicio', name: 'Servicio', icon: '🍽️', count: 67 },
    { id: 'limpieza', name: 'Limpieza', icon: '🧹', count: 23 },
    { id: 'tech', name: 'Tech Restaurant', icon: '📱', count: 18 },
    { id: 'otros', name: 'Otros', icon: '🚚', count: 35 }
  ];

const products: Product[] = [
    {
      id: '1',
      title: 'Plancha Industrial 60cm - Marca Vulcano',
      price: 8500,
      image: 'https://media.istockphoto.com/id/992080292/es/foto/plancha-de-cocina-industrial.webp?a=1&b=1&s=612x612&w=0&k=20&c=6Wmg85dMkocFl8KgLPR16apSRdSagpEPBzK2y_tSVNI=',
      condition: 'Como Nuevo',
      location: 'Nuevo Laredo, Tamps',
      distance: '2.5 km',
      seller: {
        name: 'Restaurante Los Portales',
        rating: 4.8,
        verified: true
      },
      category: 'cocina',
      urgent: true,
      postedDate: '2024-06-15'
    },
    {
      id: '2',
      title: 'Congelador Vertical 400L - Imbera',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1745618682981-5f386e36e8ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGluZHVzdHJpYWwlMjBmcmVlemVyJTIyfGVufDB8fDB8fHww',
      condition: 'Buen Estado',
      location: 'Nuevo Laredo, Tamps',
      distance: '5.2 km',
      seller: {
        name: 'Marisquería El Puerto',
        rating: 4.9,
        verified: true
      },
      category: 'refrigeracion',
      featured: true,
      postedDate: '2024-06-14'
    },
    {
      id: '3',
      title: 'Set 20 Mesas de Madera + 80 Sillas',
      price: 25000,
      image: 'https://plus.unsplash.com/premium_photo-1670984939638-01d1854a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVzYXMlMjBkZXxlbnwwfHwwfHx8MA%3D%3D',
      condition: 'Buen Estado',
      location: 'Nuevo Laredo, Tamps',
      distance: '8.1 km',
      seller: {
        name: 'Eventos & Banquetes Regio',
        rating: 4.7,
        verified: true
      },
      category: 'servicio',
      postedDate: '2024-06-13'
    },
    {
      id: '4',
      title: 'Freidora Doble 8L + 8L - Whirlpool',
      price: 6800,
      image: 'https://media.istockphoto.com/id/2192466154/es/foto/dos-canastas-de-freidora-de-acero-inoxidable-rellenas-de-tacos-dorados-de-carne-mexicana-cruda.webp?a=1&b=1&s=612x612&w=0&k=20&c=-vMbc2s1IOo-I0lwoVyn2neD0zlMkTQ1yLzpQIll16o=',
      condition: 'Como Nuevo',
      location: 'Nuevo Laredo, Tamps',
      distance: '3.7 km',
      seller: {
        name: 'Tacos El Güero',
        rating: 4.6,
        verified: true
      },
      category: 'cocina',
      urgent: true,
      postedDate: '2024-06-12'
    },
    {
      id: '5',
      title: 'Sistema POS Completo + Impresora',
      price: 4500,
      image: 'https://media.istockphoto.com/id/868891836/es/foto/pase-de-pago-tarjeta-de-cr%C3%A9dito-en-un-restaurante.webp?a=1&b=1&s=612x612&w=0&k=20&c=yFWjz4A2KI6dqyX4XCM6Hs5Iq1WJiMoo7sgFpwjFZdg=',
      condition: 'Nuevo',
      location: 'Nuevo Laredo, Tamps',
      distance: '1.8 km',
      seller: {
        name: 'Café Central',
        rating: 4.9,
        verified: true
      },
      category: 'tech',
      featured: true,
      postedDate: '2024-06-11'
    },
    {
      id: '6',
      title: 'Lavaplatos Industrial + Secadora',
      price: 15000,
      image: 'https://media.istockphoto.com/id/157505562/es/foto/lavaplatos-cocina-de-profesional.webp?a=1&b=1&s=612x612&w=0&k=20&c=udm59Z4kPRzIC8J2PFWtPV-5a8LL0q-nS-Dwt7D63EA=',
      condition: 'Buen Estado',
      location: 'Nuevo Laredo, Tamps',
      distance: '6.3 km',
      seller: {
        name: 'Hotel Plaza Mayor',
        rating: 4.8,
        verified: true
      },
      category: 'limpieza',
      postedDate: '2024-06-10'
    }
  ];

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle favorite toggle
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favoriteProducts);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteProducts(newFavorites);
  };

  // Get category icon component
  const getCategoryIcon = (iconString: string, size: number = 20) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '🔥': <Flame size={size} />,
      '❄️': <Snowflake size={size} />,
      '🍽️': <UtensilsCrossed size={size} />,
      '🧹': <Sprout size={size} />,
      '📱': <Smartphone size={size} />,
      '🚚': <Truck size={size} />,
      '🔍': <Search size={size} />
    };
    return iconMap[iconString] || <Package size={size} />;
  };

  // Close sidebar when clicking overlay
  useEffect(() => {
    const handleClickOutside = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="fudimart-container">
      {/* Header - Exact same as dashboard */}
      <header className="fudimart-header">
        <nav className="fudimart-nav">
          <Link href="/" className="fudimart-logo">
            <span className="logo-text">FUDIVERSE</span>
            <span className="logo-subtitle">RESTO AI</span>
          </Link>

          {/* Navigation Pills */}
          <div className="nav-pills">
            <Link href="/dashboard/chat" className="nav-pill">
              fudiGPT
            </Link>
            <Link href="/dashboard/board" className="nav-pill">
              fudiBOARD
            </Link>
            <Link href="/dashboard/flow" className="nav-pill">
              fudiFlow
            </Link>
            <Link href="/dashboard/vault" className="nav-pill">
              fudiVAULT
            </Link>
            <Link href="/dashboard/mart" className="nav-pill active">
              fudiMART
            </Link>
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button 
              style={{
                background: 'linear-gradient(135deg, var(--fudi-primary), var(--fudi-blue))',
                color: '#000',
                border: 'none',
                borderRadius: '30px',
                padding: '16px 32px',
                fontWeight: '800',
                fontSize: '1.1rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: '0 6px 20px rgba(251, 191, 36, 0.4)',
                marginRight: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              🚀 PRÓXIMAMENTE
            </button>
            
            <button 
              className="mobile-nav-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: 'none' }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button className="nav-action-btn">
              <MessageCircle size={20} />
            </button>
            
            <button className="nav-action-btn">
              <User size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Main Layout */}
      <main className="fudimart-main">
        
        {/* Sidebar Overlay for Mobile */}
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Marketplace Sidebar */}
        <aside className={`marketplace-sidebar ${sidebarOpen ? 'open' : ''}`}>
          
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <Package size={24} />
            <div>
              <h2 className="sidebar-title">fudiMART</h2>
            </div>
          </div>
          
          <p className="sidebar-subtitle">
            El marketplace de equipos para restaurantes. Compra y vende entre FUDIERs.
          </p>

          {/* Search */}
          <div className="search-section">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Buscar equipos..."
                className="marketplace-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} 
              />
            </div>
          </div>

          {/* Location */}
          <div className="location-section">
            <div className="location-header">
              <MapPin size={16} />
              <span className="location-text">Tu ubicación</span>
            </div>
            <div className="location-detail">Nuevo Laredo, Tamaulipas · 65 km</div>
          </div>

          {/* Categories */}
          <div className="categories-section">
            <h3>Categorías</h3>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category.id} className="category-item">
                  <button
                    className={`category-link ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="category-icon">
                      {getCategoryIcon(category.icon, 16)}
                    </div>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <Link href="/marketplace/messages" className="action-item">
              <MessageCircle size={16} />
              <span>Mis Chats</span>
            </Link>
            <Link href="/marketplace/listings" className="action-item">
              <Package size={16} />
              <span>Mis Publicaciones</span>
            </Link>
            <Link href="/marketplace/favorites" className="action-item">
              <Heart size={16} />
              <span>Favoritos</span>
            </Link>
            <Link href="/marketplace/help" className="action-item">
              <HelpCircle size={16} />
              <span>Ayuda</span>
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <div className="marketplace-content">
          
                    
          {/* Content Header */}
          <div className="content-header">
            <div className="content-title">
              <h1>
                {selectedCategory === 'all' ? 'Todos los productos' : 
                 categories.find(c => c.id === selectedCategory)?.name || 'Productos'}
              </h1>
              <span className="results-count">
                {filteredProducts.length} resultados · Nuevo Laredo, Tamaulipas
              </span>
            </div>

            <div className="content-controls">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={16} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </button>
              </div>

              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Más recientes</option>
                <option value="price-low">Precio: menor a mayor</option>
                <option value="price-high">Precio: mayor a menor</option>
                <option value="distance">Más cercanos</option>
                <option value="rating">Mejor calificados</option>
              </select>
            </div>
          </div>

          {/* FUDI Suggestions */}
          <div className="fudi-suggestions">
            <div className="suggestion-header">
              <Brain size={20} />
              <h3 className="suggestion-title">💡 FUDI sugiere para tu restaurante</h3>
            </div>
            <p className="suggestion-text">
              Basado en tu perfil de Tacos & Mariscos, te recomendamos revisar: 
              <strong> planchas industriales</strong> y <strong>congeladores verticales</strong>. 
              ¡Los productos marcados ⭐ son perfectos para tu operación!
            </p>
          </div>

          {/* Products Grid */}
          <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                
                {/* Product Image */}
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  
                  {/* Badges */}
                  <div className="product-badges">
                    <div>
                      {product.seller.verified && (
                        <span className="fudier-badge">FUDIER ✓</span>
                      )}
                    </div>
                    <div>
                      {product.urgent && (
                        <span className="urgent-badge">URGENTE</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <div className="product-price">
                    ${product.price.toLocaleString('es-MX')}
                  </div>
                  
                  <h3 className="product-title">{product.title}</h3>
                  
                  <div className="product-meta">
                    <div className="product-location">
                      <MapPin size={12} />
                      <span>{product.location} · {product.distance}</span>
                    </div>
                    <span className="product-condition">{product.condition}</span>
                  </div>

                  {/* Seller Info */}
                  <div className="seller-info">
                    <div className="seller-avatar">
                      <User size={12} />
                    </div>
                    <span className="seller-name">{product.seller.name}</span>
                    <div className="seller-rating">
                      <Star size={12} />
                      <span className="rating-text">{product.seller.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions - Hidden, shown on hover */}
                <div 
                  className="card-actions"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    style={{
                      background: favoriteProducts.has(product.id) ? 'var(--fudi-red)' : 'var(--glass-bg)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: favoriteProducts.has(product.id) ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={16} />
                  </button>
                  
                  <button
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fudi-primary)';
                  e.currentTarget.style.background = 'var(--glass-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.background = 'var(--glass-bg)';
                }}
              >
                Cargar más productos
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Sell Button */}
      <button className="floating-sell-btn">
        <Plus size={20} />
        VENDER EQUIPO
      </button>
    </div>
  );
}