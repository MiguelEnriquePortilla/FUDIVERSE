'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Plus, Star, Heart, Share2,
  Store, Package, Users, TrendingUp, Brain,
  Grid3X3, Filter, Phone, Eye, Clock,
  User, MessageCircle, Bookmark, Settings,
  Home, Menu
} from 'lucide-react';

// Import FUDIVERSE Components
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';

// ==================== TYPES ====================
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  condition: 'Nuevo' | 'Como Nuevo' | 'Buen Estado';
  location: string;
  distance: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  category: string;
  urgent?: boolean;
  featured?: boolean;
  views: number;
  likes: number;
}

interface MarketStats {
  totalProducts: number;
  activeSellers: number;
  topCategory: string;
  completedSales: number;
}

// ==================== MOCK DATA ====================
const mockStats: MarketStats = {
  totalProducts: 247,
  activeSellers: 89,
  topCategory: 'Cocina',
  completedSales: 156
};

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Plancha Industrial 60cm - Marca Vulcano Pro',
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
    views: 245,
    likes: 18
  },
  {
    id: '2',
    title: 'Congelador Vertical 400L - Imbera VR400',
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
    views: 312,
    likes: 24
  },
  {
    id: '3',
    title: 'Set 20 Mesas + 80 Sillas Clásicas',
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
    category: 'mobiliario',
    views: 189,
    likes: 31
  },
  {
    id: '4',
    title: 'Freidora Doble 8L + 8L - Whirlpool Commercial',
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
    views: 156,
    likes: 12
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
    category: 'tecnologia',
    featured: true,
    views: 203,
    likes: 15
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
    views: 134,
    likes: 9
  }
];

// ==================== MAIN COMPONENT ====================
export default function FudiMartSimplified() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  // Categories
  const categories = [
    { id: 'all', name: 'Todo', count: 247 },
    { id: 'cocina', name: 'Cocina', count: 89 },
    { id: 'refrigeracion', name: 'Refrigeración', count: 45 },
    { id: 'mobiliario', name: 'Mobiliario', count: 67 },
    { id: 'tecnologia', name: 'Tecnología', count: 23 },
    { id: 'limpieza', name: 'Limpieza', count: 18 }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle favorite
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favoriteProducts);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteProducts(newFavorites);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(price);
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
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* Header */}
      <FudiDashHeader 
        currentModule="mart" 
        userName="Chef Pro"
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main style={{
        marginTop: '70px',
        padding: '1rem',
        maxWidth: '900px',
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
            background: 'linear-gradient(135deg, #fbbf24, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            fudi-mart
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            Marketplace para FUDIERs • {filteredProducts.length} productos disponibles
          </p>
        </div>

        {/* Search Section */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          padding: '1rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Buscar equipos para restaurante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <Search 
              size={16} 
              style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.5)'
              }} 
            />
          </div>
          <button style={{
            background: 'rgba(251, 191, 36, 0.15)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            padding: '0.75rem',
            color: '#fbbf24',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Filter size={16} />
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem'
        }}>
          {/* Total Products */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Productos</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#8b5cf6' }}>{mockStats.totalProducts}</p>
              </div>
              <Package size={20} style={{ color: '#8b5cf6' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)', width: '85%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Active Sellers */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Vendedores</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#10b981' }}>{mockStats.activeSellers}</p>
              </div>
              <Users size={20} style={{ color: '#10b981' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', width: '70%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Top Category */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Top Categoría</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#f97316' }}>{mockStats.topCategory}</p>
              </div>
              <TrendingUp size={20} style={{ color: '#f97316' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #f97316, #ea580c)', width: '90%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Completed Sales */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Ventas</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#3b82f6' }}>{mockStats.completedSales}</p>
              </div>
              <Store size={20} style={{ color: '#3b82f6' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #2563eb)', width: '75%', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          padding: '1rem',
          overflowX: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem',
            minWidth: 'max-content'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: selectedCategory === category.id 
                    ? 'rgba(251, 191, 36, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: selectedCategory === category.id 
                    ? '1px solid rgba(251, 191, 36, 0.4)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  color: selectedCategory === category.id 
                    ? '#fbbf24' 
                    : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {category.name}
                <span style={{
                  background: selectedCategory === category.id 
                    ? '#fbbf24' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCategory === category.id 
                    ? '#000' 
                    : 'rgba(255, 255, 255, 0.6)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Section Header */}
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
            <Store size={20} style={{ color: '#8b5cf6' }} />
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>
              Productos Disponibles
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#3b82f6',
              cursor: 'pointer'
            }}>
              <Grid3X3 size={16} />
            </button>
            <button style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#fbbf24',
              cursor: 'pointer'
            }}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                
                {/* Badges */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {product.seller.verified && (
                      <span style={{
                        background: '#3b82f6',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        textTransform: 'uppercase'
                      }}>
                        FUDIER ✓
                      </span>
                    )}
                    {product.urgent && (
                      <span style={{
                        background: '#f97316',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        textTransform: 'uppercase'
                      }}>
                        URGENTE
                      </span>
                    )}
                    {product.featured && !product.urgent && (
                      <span style={{
                        background: '#fbbf24',
                        color: 'black',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        textTransform: 'uppercase'
                      }}>
                        DESTACADO ⭐
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      style={{
                        background: favoriteProducts.has(product.id) 
                          ? '#ef4444' 
                          : 'rgba(0, 0, 0, 0.5)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Heart size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.share?.({
                          title: product.title,
                          text: `${product.title} - ${formatPrice(product.price)}`,
                          url: window.location.href
                        });
                      }}
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.75rem'
                }}>
                  {formatPrice(product.price)}
                </div>
                
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 0.75rem 0',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.title}
                </h3>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <MapPin size={12} />
                    <span>{product.distance}</span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '8px'
                  }}>
                    {product.condition}
                  </span>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Eye size={12} />
                      <span>{product.views}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Heart size={12} />
                      <span>{product.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={12} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    </div>
                    <span style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '500'
                    }}>
                      {product.seller.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={12} style={{ color: '#fbbf24' }} />
                    <span style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: '500'
                    }}>
                      {product.seller.rating}
                    </span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '1rem'
                }}>
                  <button style={{
                    flex: 1,
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <MessageCircle size={14} />
                    Chat
                  </button>
                  <button style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    color: '#3b82f6',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedProduct === product.id && (
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px'
                  }}>
                    <MapPin size={14} style={{ color: '#00bcd4' }} />
                    <span>{product.location}</span>
                  </div>
                </div>
              )}
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
        <button style={{ background: 'transparent', border: 'none', color: '#8b5cf6', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Store size={20} />
          Marketplace
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Search size={20} />
          Buscar
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Heart size={20} />
          Favoritos
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <MessageCircle size={20} />
          Chats
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <User size={20} />
          Perfil
        </button>
      </div>

      {/* Floating ASK FUDI Button */}
      <button style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1.5rem',
        background: 'linear-gradient(135deg, #fbbf24, #8b5cf6)',
        border: 'none',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(251, 191, 36, 0.4)',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <Brain size={24} />
      </button>
    </div>
  );
}