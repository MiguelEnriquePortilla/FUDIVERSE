'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Clock, TrendingUp, 
  Star, AlertCircle, Plus, Minus, Check,
  Zap, Package, DollarSign, Users, MapPin,
  X, Sparkles, MessageCircle, Activity,
  Grid3x3, List, Filter, Brain, Eye,
  Flame, Crown, Gift, Trophy, Target,
  ChefHat, UtensilsCrossed, Thermometer,
  Truck, CreditCard, Heart, Share2,
  Camera, Play, MoreHorizontal, Bookmark,
  Rocket
} from 'lucide-react';

// Import CSS styles
import '../../../styles/pages/FudiMart.css';

interface MarketItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  condition: 'new' | 'excellent' | 'good' | 'fair';
  seller: {
    name: string;
    location: string;
    rating: number;
    sales: number;
    verified: boolean;
    type: 'restaurant' | 'supplier' | 'individual';
  };
  description: string;
  tags: string[];
  views: number;
  likes: number;
  timePosted: string;
  shipping: 'free' | 'paid' | 'pickup';
  stock: number;
  featured?: boolean;
  urgent?: boolean;
}

interface CartItem extends MarketItem {
  quantity: number;
}

export default function FudiMart() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [showCart, setShowCart] = useState(false);

  // FUDIVERSE Market Items
  const marketItems: MarketItem[] = [
    {
      id: '1',
      title: 'Plancha Industrial Quantum Pro - Como Nueva',
      price: 8500,
      originalPrice: 12000,
      image: '🔥',
      category: 'equipment',
      condition: 'excellent',
      seller: {
        name: 'Tacos El Patrón',
        location: 'Nuevo Laredo, TAM',
        rating: 4.9,
        sales: 156,
        verified: true,
        type: 'restaurant'
      },
      description: 'Plancha industrial de 80cm, apenas 6 meses de uso. Perfecta para tacos, quesadillas y todo tipo de antojitos. Vendo por upgrade a modelo más grande.',
      tags: ['equipment', 'grill', 'industrial', 'bargain'],
      views: 2847,
      likes: 156,
      timePosted: '2h',
      shipping: 'pickup',
      stock: 1,
      featured: true
    },
    {
      id: '2',
      title: 'Lote de 50kg Harina Premium para Pizza',
      price: 1200,
      image: '🌾',
      category: 'ingredients',
      condition: 'new',
      seller: {
        name: 'Pizza Nostra',
        location: 'Monterrey, NL',
        rating: 4.8,
        sales: 89,
        verified: true,
        type: 'restaurant'
      },
      description: 'Harina italiana premium tipo 00. Fecha de vencimiento 8 meses. Sobró de pedido grande, mejor precio que distribuidores.',
      tags: ['ingredients', 'flour', 'premium', 'bulk'],
      views: 1245,
      likes: 67,
      timePosted: '5h',
      shipping: 'paid',
      stock: 3,
      urgent: true
    },
    {
      id: '3',
      title: 'Freidora de Aire Comercial Neural X1',
      price: 15500,
      originalPrice: 18000,
      image: '⚡',
      category: 'equipment',
      condition: 'new',
      seller: {
        name: 'EquipFood MX',
        location: 'CDMX',
        rating: 4.9,
        sales: 234,
        verified: true,
        type: 'supplier'
      },
      description: 'Freidora de aire comercial nueva en caja. Capacidad 20L, perfecta para papas, pollo, pescado. Garantía incluida.',
      tags: ['equipment', 'fryer', 'commercial', 'warranty'],
      views: 3456,
      likes: 189,
      timePosted: '1d',
      shipping: 'free',
      stock: 5,
      featured: true
    },
    {
      id: '4',
      title: 'Queso Manchego Artesanal - 5kg',
      price: 850,
      image: '🧀',
      category: 'ingredients',
      condition: 'new',
      seller: {
        name: 'Rancho La Esperanza',
        location: 'Querétaro, QRO',
        rating: 4.7,
        sales: 67,
        verified: false,
        type: 'supplier'
      },
      description: 'Queso manchego artesanal de cabra. Perfecto para quesadillas gourmet, tabla de quesos. Directo del rancho.',
      tags: ['ingredients', 'cheese', 'artisanal', 'gourmet'],
      views: 987,
      likes: 45,
      timePosted: '3h',
      shipping: 'paid',
      stock: 2
    },
    {
      id: '5',
      title: 'Horno de Pizza Napolitano - Seminuevo',
      price: 45000,
      originalPrice: 65000,
      image: '🍕',
      category: 'equipment',
      condition: 'good',
      seller: {
        name: 'Pizzeria Bella Vista',
        location: 'Guadalajara, JAL',
        rating: 4.6,
        sales: 34,
        verified: true,
        type: 'restaurant'
      },
      description: 'Horno de pizza napolitano a leña. 2 años de uso, muy bien cuidado. Perfecto para pizzeria artesanal. Incluye accesorios.',
      tags: ['equipment', 'oven', 'pizza', 'professional'],
      views: 5432,
      likes: 267,
      timePosted: '6h',
      shipping: 'pickup',
      stock: 1,
      featured: true
    },
    {
      id: '6',
      title: 'Mesas de Acero Inoxidable (Set de 3)',
      price: 3200,
      image: '🏗️',
      category: 'furniture',
      condition: 'excellent',
      seller: {
        name: 'Miguel Hernández',
        location: 'Tijuana, BC',
        rating: 4.5,
        sales: 23,
        verified: false,
        type: 'individual'
      },
      description: 'Set de 3 mesas de trabajo de acero inoxidable. Medidas: 120x60cm cada una. Ideales para cocina comercial.',
      tags: ['furniture', 'steel', 'commercial', 'set'],
      views: 1654,
      likes: 78,
      timePosted: '8h',
      shipping: 'pickup',
      stock: 1
    },
    {
      id: '7',
      title: 'Cafetera Espresso Profesional',
      price: 28000,
      originalPrice: 35000,
      image: '☕',
      category: 'equipment',
      condition: 'excellent',
      seller: {
        name: 'Café Neural',
        location: 'Puebla, PUE',
        rating: 4.8,
        sales: 112,
        verified: true,
        type: 'restaurant'
      },
      description: 'Cafetera espresso profesional de 2 grupos. Perfecta para café de especialidad. Mantenimiento al día.',
      tags: ['equipment', 'coffee', 'espresso', 'professional'],
      views: 2876,
      likes: 145,
      timePosted: '12h',
      shipping: 'paid',
      stock: 1
    },
    {
      id: '8',
      title: 'Aceite de Oliva Extra Virgen - 20L',
      price: 1800,
      image: '🫒',
      category: 'ingredients',
      condition: 'new',
      seller: {
        name: 'Olivos del Norte',
        location: 'Sonora, SON',
        rating: 4.9,
        sales: 178,
        verified: true,
        type: 'supplier'
      },
      description: 'Aceite de oliva extra virgen premium. Bidón de 20L, perfecto para restaurantes. Precio de mayoreo.',
      tags: ['ingredients', 'oil', 'premium', 'bulk'],
      views: 1432,
      likes: 89,
      timePosted: '4h',
      shipping: 'paid',
      stock: 8
    }
  ];

  const categories = [
    { 
      id: 'all', 
      name: 'Todo', 
      icon: Grid3x3, 
      count: marketItems.length,
      color: '#00ffff'
    },
    { 
      id: 'equipment', 
      name: 'Equipo', 
      icon: ChefHat, 
      count: 5, 
      trending: 3,
      color: '#fbbf24'
    },
    { 
      id: 'ingredients', 
      name: 'Ingredientes', 
      icon: Package, 
      count: 3, 
      urgent: 2,
      color: '#10b981'
    },
    { 
      id: 'furniture', 
      name: 'Mobiliario', 
      icon: UtensilsCrossed, 
      count: 1,
      color: '#a78bfa'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? marketItems 
    : marketItems.filter(item => item.category === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.views - a.views;
      case 'recent':
      default:
        return 0; // Keep original order for recent
    }
  });

  const addToCart = (item: MarketItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => 
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="fudimart-container">
      {/* Neural Grid Background */}
      
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="coming-soon-badge">
            <Rocket size={16} />
            <span>PRÓXIMAMENTE Q2 2025</span>
          </div>
          <div className="hero-logo">fudiMART</div>
          <div className="hero-tagline">POWERED BY FUDIVERSE AI</div>
          <div className="hero-description">
            El PRIMER marketplace entre restauranteros • Vende tu plancha usada • Compra ingredientes a mejor precio • Conecta con FUDIERS de tu ciudad
          </div>
          <div className="hero-cta-section">
            <button className="hero-cta-btn">ÚNETE A LA LISTA DE ESPERA</button>
            <div className="hero-benefits">
              <span>🔥 Precios exclusivos entre FUDIERS</span>
              <span>⚡ Envíos locales gratuitos</span>
              <span>🤖 IA que conecta oferta y demanda</span>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-value">2,847</span>
            <span className="stat-label">En lista de espera</span>
          </div>
          <div className="hero-stat">
            <span className="stat-value">156</span>
            <span className="stat-label">Vendedores registrados</span>
          </div>
          <div className="hero-stat">
            <span className="stat-value">89%</span>
            <span className="stat-label">Ahorro promedio</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        
        {/* Left Sidebar */}
        <aside className="marketplace-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Categorías Neural</div>
            <div className="sidebar-subtitle">Explorar por tipo</div>
          </div>
          
          <div className="categories-list">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ '--category-color': cat.color } as React.CSSProperties}
              >
                <div className="category-icon">
                  <cat.icon size={24} />
                </div>
                <div className="category-info">
                  <div className="category-name">{cat.name}</div>
                  <div className="category-meta">
                    {cat.count} items
                    {cat.trending && ` • ${cat.trending} trending`}
                    {cat.urgent && ` • ${cat.urgent} urgente`}
                  </div>
                </div>
                {cat.trending && <div className="trending-badge">🔥</div>}
                {cat.urgent && <div className="urgent-badge">⚡</div>}
              </button>
            ))}
          </div>

          <div className="neural-insights">
            <div className="insight-header">
              <Brain size={20} />
              <span>Neural Insights</span>
            </div>
            <div className="insight-list">
              <div className="insight-item">
                <span className="insight-emoji">📈</span>
                <span className="insight-text">Planchas +67% demanda</span>
              </div>
              <div className="insight-item">
                <span className="insight-emoji">💰</span>
                <span className="insight-text">Mejor precio: Aceites</span>
              </div>
              <div className="insight-item">
                <span className="insight-emoji">🔥</span>
                <span className="insight-text">Tendencia: Freidoras</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="marketplace-content">
          
          {/* Search and Filters */}
          <div className="content-header">
            <div className="search-section">
              <div className="search-container">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Buscar equipos, ingredientes, mobiliario..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-controls">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="recent">Más recientes</option>
                  <option value="popular">Más populares</option>
                  <option value="price-low">Menor precio</option>
                  <option value="price-high">Mayor precio</option>
                </select>
                
                <div className="view-toggle">
                  <button 
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button 
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="results-info">
              <span className="results-count">
                {sortedItems.length} productos encontrados
              </span>
              <span className="active-filters">
                en {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {sortedItems.map(item => (
              <div key={item.id} className="product-card">
                
                {/* Product Badges */}
                {item.featured && (
                  <div className="product-badge featured">
                    <Crown size={14} />
                    <span>Destacado</span>
                  </div>
                )}
                {item.urgent && (
                  <div className="product-badge urgent">
                    <Zap size={14} />
                    <span>Urgente</span>
                  </div>
                )}
                
                {/* Product Header */}
                <div className="product-header">
                  <div className="product-image">
                    <span className="product-emoji">{item.image}</span>
                    <div className="product-actions">
                      <button className="action-btn like">
                        <Heart size={16} />
                      </button>
                      <button className="action-btn share">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-meta">
                    <div className="product-stats">
                      <span className="stat">
                        <Eye size={14} />
                        {formatNumber(item.views)}
                      </span>
                      <span className="stat">
                        <Heart size={14} />
                        {formatNumber(item.likes)}
                      </span>
                    </div>
                    <div className="product-time">{item.timePosted}</div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-title">{item.title}</h3>
                  
                  <div className="price-section">
                    <div className="current-price">
                      ${item.price.toLocaleString()}
                    </div>
                    {item.originalPrice && (
                      <div className="original-price">
                        ${item.originalPrice.toLocaleString()}
                      </div>
                    )}
                    {item.originalPrice && (
                      <div className="discount-badge">
                        -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  <div className="product-condition">
                    <span className={`condition-badge ${item.condition}`}>
                      {item.condition === 'new' && 'Nuevo'}
                      {item.condition === 'excellent' && 'Excelente'}
                      {item.condition === 'good' && 'Bueno'}
                      {item.condition === 'fair' && 'Regular'}
                    </span>
                    <span className="stock-info">
                      Stock: {item.stock}
                    </span>
                  </div>

                  <p className="product-description">{item.description}</p>

                  {/* Tags */}
                  <div className="product-tags">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="product-tag">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="seller-info">
                  <div className="seller-avatar">
                    {item.seller.name.charAt(0)}
                    {item.seller.verified && (
                      <div className="verified-badge">✓</div>
                    )}
                  </div>
                  <div className="seller-details">
                    <div className="seller-name">{item.seller.name}</div>
                    <div className="seller-meta">
                      <span className="seller-location">
                        <MapPin size={12} />
                        {item.seller.location}
                      </span>
                      <span className="seller-rating">
                        <Star size={12} />
                        {item.seller.rating} ({item.seller.sales} ventas)
                      </span>
                    </div>
                  </div>
                  <div className="seller-type">
                    {item.seller.type === 'restaurant' && '🏪'}
                    {item.seller.type === 'supplier' && '🏭'}
                    {item.seller.type === 'individual' && '👤'}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="shipping-info">
                  {item.shipping === 'free' && (
                    <span className="shipping-badge free">
                      <Truck size={14} />
                      Envío gratis
                    </span>
                  )}
                  {item.shipping === 'paid' && (
                    <span className="shipping-badge paid">
                      <Truck size={14} />
                      Envío pagado
                    </span>
                  )}
                  {item.shipping === 'pickup' && (
                    <span className="shipping-badge pickup">
                      <MapPin size={14} />
                      Solo recolección
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="product-actions-bottom">
                  <button className="contact-btn">
                    <MessageCircle size={16} />
                    Contactar
                  </button>
                  <button 
                    className="add-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingCart size={16} />
                    Al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Cart */}
        <aside className="cart-sidebar">
          <div className="cart-header">
            <h3>Carrito Neural</h3>
            <div className="cart-count">{getCartCount()}</div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Tu carrito está vacío</p>
              <span>Agrega productos para comenzar</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.image}</div>
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-price">${item.price.toLocaleString()}</div>
                      <div className="cart-item-seller">{item.seller.name}</div>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => removeFromCart(item.id)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Envío estimado</span>
                  <span>$250</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(getCartTotal() + 250).toLocaleString()}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="checkout-btn">
                  <CreditCard size={18} />
                  Proceder al pago
                </button>
                <button className="contact-sellers-btn">
                  <MessageCircle size={18} />
                  Contactar vendedores
                </button>
              </div>
            </>
          )}

          {/* Neural Recommendations */}
          <div className="neural-recommendations">
            <div className="recommendations-header">
              <Brain size={20} />
              <span>FUDI Recomienda</span>
            </div>
            <div className="recommendation-item">
              <span className="rec-emoji">🔥</span>
              <div className="rec-info">
                <div className="rec-title">Plancha + Aceite</div>
                <div className="rec-subtitle">Combo popular</div>
              </div>
              <div className="rec-discount">-15%</div>
            </div>
            <div className="recommendation-item">
              <span className="rec-emoji">⚡</span>
              <div className="rec-info">
                <div className="rec-title">Envío gratis</div>
                <div className="rec-subtitle">En compras +$5000</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}