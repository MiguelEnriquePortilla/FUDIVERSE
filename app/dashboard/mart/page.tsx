'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Plus, Grid3X3, List, SlidersHorizontal,
  Star, MessageCircle, Heart, Share2, Filter, Menu, X,
  Brain, Flame, Snowflake, UtensilsCrossed, Sprout, 
  Smartphone, Truck, DollarSign, Clock, Eye, ChevronRight,
  User, Package, BookOpen, Settings, HelpCircle, Home,
  Bell, Bookmark, TrendingUp, Shield, Zap, Users, Store,
  Phone, Mail, Navigation, AlertCircle, CheckCircle,
  Send, Mic, MoreHorizontal
} from 'lucide-react';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';

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
    responseTime?: string;
    joinDate?: string;
  };
  category: string;
  urgent?: boolean;
  featured?: boolean;
  postedDate: string;
  views?: number;
  likes?: number;
  description?: string;
  tags?: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  active?: boolean;
  color?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'fudi';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function FudiMartWithAskFudi() {
  // Main State Management
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(false);
  const [favoriteProducts, setFavoriteProducts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  
  // ASK FUDI States - ENHANCED AS MAIN FEATURE
  const [isFudiOpen, setIsFudiOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);
  const [fudiSuggestions] = useState<string[]>([
    "¿Cómo vendo mi plancha?",
    "Buscar freidoras cerca",
    "¿Qué precio poner?",
    "Encontrar compradores",
    "Ver equipos populares",
    "Ayuda con descripción"
  ]);
  
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    try {
      localStorage.removeItem('fudi_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('restaurant_data');
      localStorage.removeItem('dashboard_cache');
      console.log('Logout successful - redirecting to home');
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout process:', error);
      window.location.href = '/';
    }
  };

  // Enhanced Categories with React Icons
  const categories: Category[] = [
    { 
      id: 'all', 
      name: 'Todo', 
      icon: <Search size={16} />, 
      count: 247,
      color: '#8b5cf6'
    },
    { 
      id: 'cocina', 
      name: 'Equipos de Cocina', 
      icon: <Flame size={16} />, 
      count: 89,
      color: '#f97316'
    },
    { 
      id: 'refrigeracion', 
      name: 'Refrigeración', 
      icon: <Snowflake size={16} />, 
      count: 45,
      color: '#06b6d4'
    },
    { 
      id: 'servicio', 
      name: 'Servicio', 
      icon: <UtensilsCrossed size={16} />, 
      count: 67,
      color: '#10b981'
    },
    { 
      id: 'limpieza', 
      name: 'Limpieza', 
      icon: <Sprout size={16} />, 
      count: 23,
      color: '#84cc16'
    },
    { 
      id: 'tech', 
      name: 'Tech Restaurant', 
      icon: <Smartphone size={16} />, 
      count: 18,
      color: '#3b82f6'
    },
    { 
      id: 'otros', 
      name: 'Otros', 
      icon: <Truck size={16} />, 
      count: 35,
      color: '#6b7280'
    }
  ];

  // Enhanced Product Data
  const products: Product[] = [
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
        verified: true,
        responseTime: '< 1 hora',
        joinDate: '2023'
      },
      category: 'cocina',
      urgent: true,
      postedDate: '2024-06-15',
      views: 245,
      likes: 18,
      description: 'Plancha industrial de alta calidad, ideal para restaurantes medianos. Usada solo 6 meses.',
      tags: ['plancha', 'industrial', 'vulcano', 'cocina']
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
        verified: true,
        responseTime: '2 horas',
        joinDate: '2022'
      },
      category: 'refrigeracion',
      featured: true,
      postedDate: '2024-06-14',
      views: 312,
      likes: 24,
      description: 'Congelador vertical en excelente estado, mantenimiento al día. Perfecto para marisquerías.',
      tags: ['congelador', 'imbera', 'refrigeración', 'vertical']
    },
    {
      id: '3',
      title: 'Set 20 Mesas de Madera + 80 Sillas Clásicas',
      price: 25000,
      image: 'https://plus.unsplash.com/premium_photo-1670984939638-01d1854a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVzYXMlMjBkZXxlbnwwfHwwfHx8MA%3D%3D',
      condition: 'Buen Estado',
      location: 'Nuevo Laredo, Tamps',
      distance: '8.1 km',
      seller: {
        name: 'Eventos & Banquetes Regio',
        rating: 4.7,
        verified: true,
        responseTime: '30 min',
        joinDate: '2021'
      },
      category: 'servicio',
      postedDate: '2024-06-13',
      views: 189,
      likes: 31,
      description: 'Set completo de mobiliario para restaurante. Madera de calidad, diseño clásico.',
      tags: ['mesas', 'sillas', 'mobiliario', 'madera']
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
        verified: true,
        responseTime: '1 hora',
        joinDate: '2023'
      },
      category: 'cocina',
      urgent: true,
      postedDate: '2024-06-12',
      views: 156,
      likes: 12,
      description: 'Freidora comercial doble, perfecta para taquerías. Incluye canastas y accesorios.',
      tags: ['freidora', 'whirlpool', 'comercial', 'doble']
    },
    {
      id: '5',
      title: 'Sistema POS Completo + Impresora Térmica',
      price: 4500,
      image: 'https://media.istockphoto.com/id/868891836/es/foto/pase-de-pago-tarjeta-de-cr%C3%A9dito-en-un-restaurante.webp?a=1&b=1&s=612x612&w=0&k=20&c=yFWjz4A2KI6dqyX4XCM6Hs5Iq1WJiMoo7sgFpwjFZdg=',
      condition: 'Nuevo',
      location: 'Nuevo Laredo, Tamps',
      distance: '1.8 km',
      seller: {
        name: 'Café Central',
        rating: 4.9,
        verified: true,
        responseTime: '15 min',
        joinDate: '2024'
      },
      category: 'tech',
      featured: true,
      postedDate: '2024-06-11',
      views: 203,
      likes: 15,
      description: 'Sistema punto de venta completo, software incluido. Ideal para cafeterías y restaurantes.',
      tags: ['pos', 'tecnología', 'impresora', 'software']
    },
    {
      id: '6',
      title: 'Lavaplatos Industrial + Secadora Automática',
      price: 15000,
      image: 'https://media.istockphoto.com/id/157505562/es/foto/lavaplatos-cocina-de-profesional.webp?a=1&b=1&s=612x612&w=0&k=20&c=udm59Z4kPRzIC8J2PFWtPV-5a8LL0q-nS-Dwt7D63EA=',
      condition: 'Buen Estado',
      location: 'Nuevo Laredo, Tamps',
      distance: '6.3 km',
      seller: {
        name: 'Hotel Plaza Mayor',
        rating: 4.8,
        verified: true,
        responseTime: '45 min',
        joinDate: '2020'
      },
      category: 'limpieza',
      postedDate: '2024-06-10',
      views: 134,
      likes: 9,
      description: 'Sistema completo de lavado para cocina industrial. Muy eficiente y en buen estado.',
      tags: ['lavaplatos', 'industrial', 'secadora', 'limpieza']
    }
  ];

  // Initialize FUDI chat with enhanced welcome message
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([{
        id: '1',
        type: 'fudi',
        content: "¡Hola! Soy FUDI, tu asistente inteligente de fudiMART. 🤖\n\n¿Qué necesitas hoy?\n• 🛒 Buscar equipos para tu restaurante\n• 💰 Vender equipos que ya no uses\n• 💡 Consejos de compra/venta\n• 📞 Conectar con vendedores verificados",
        timestamp: new Date(),
        suggestions: ["Buscar equipos", "Quiero vender", "Consejos de precio", "Ver cerca de mí"]
      }]);
    }
  }, []);

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
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

  // 🤖 ENHANCED FUDI MARKETPLACE RESPONSE - BUY & SELL EXPERT
  const getFudiMarketplaceResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // ===== SELLING RESPONSES =====
    if (lowerQuery.includes('vender') || lowerQuery.includes('vendo') || lowerQuery.includes('quiero vender')) {
      return "💰 ¡Perfecto! Te ayudo a vender tu equipo paso a paso:\n\n**PASO 1: Información del equipo**\n• ¿Qué equipo quieres vender?\n• ¿En qué condición está?\n• ¿Cuánto tiempo lo usaste?\n\n**PASO 2: Precio inteligente**\n• Analizo precios del mercado\n• Te sugiero el precio óptimo\n• Estrategias para vender rápido\n\n**PASO 3: Publicación automática**\n• Creo descripción atractiva\n• Subo fotos profesionales\n• Publico en fudiMART\n\n¿Qué equipo quieres vender?";
    }
    
    if (lowerQuery.includes('precio') && (lowerQuery.includes('poner') || lowerQuery.includes('vender'))) {
      return "📊 Te ayudo a encontrar el precio perfecto:\n\n**Análisis de mercado:**\n• Equipos similares: $6,800 - $15,000\n• Promedio por condición:\n  - Nuevo: +20% del promedio\n  - Como Nuevo: Precio promedio\n  - Buen Estado: -15% del promedio\n\n**Consejos de pricing:**\n• 🏃‍♂️ Precio competitivo = venta rápida\n• 💎 Precio premium = esperar comprador ideal\n• 🎯 Precio justo = equilibrio perfecto\n\n¿Qué equipo quieres evaluar?";
    }
    
    if (lowerQuery.includes('descripción') || lowerQuery.includes('ayuda con')) {
      return "✍️ Te ayudo a crear descripciones que VENDAN:\n\n**Fórmula ganadora:**\n1. **Título llamativo** (marca + modelo + estado)\n2. **Beneficios clave** (eficiencia, ahorro, etc.)\n3. **Detalles técnicos** (capacidad, dimensiones)\n4. **Historia real** (cuánto lo usaste, por qué vendes)\n5. **Call to action** (\"¡Perfecto para tu taquería!\")\n\n**Palabras que venden:**\n• \"Como nuevo\" \"Oportunidad\" \"Urgente\"\n• \"Poco uso\" \"Mantenimiento al día\"\n• \"Ideal para...\" \"Listo para trabajar\"\n\n¿Quieres que escriba la descripción de tu equipo?";
    }
    
    // ===== BUYING RESPONSES =====
    if (lowerQuery.includes('freidora')) {
      return "🍟 Encontré 3 freidoras perfectas para ti:\n\n• **Freidora Doble Whirlpool** - $6,800\n  📍 3.7 km • Como Nuevo • Tacos El Güero ⭐ 4.6\n  ✅ Incluye canastas • Mantenimiento al día\n\n• **Freidora Industrial 20L** - $12,000\n  📍 5.2 km • Buen Estado • La Cocina Real ⭐ 4.8\n  ✅ Alta capacidad • Para restaurantes grandes\n\n• **Freidora Compacta 5L** - $3,200\n  📍 2.1 km • Nuevo • Cocina Express ⭐ 4.9\n  ✅ Ideal para food trucks • Súper eficiente\n\n¿Te contacto con algún vendedor?";
    }
    
    if (lowerQuery.includes('cerca') || lowerQuery.includes('ubicación')) {
      return "📍 Equipos más cercanos a ti (Nuevo Laredo):\n\n**< 2 km:**\n• Sistema POS Completo - $4,500 (1.8 km) ⚡\n• Food Truck Equipado - $85,000 (1.9 km) 🚚\n\n**2-5 km:**\n• Plancha Industrial - $8,500 (2.5 km) 🔥\n• Freidora Doble - $6,800 (3.7 km) 🍟\n• Congelador Vertical - $12,000 (5.2 km) ❄️\n\n**5+ km:**\n• Set Mesas + Sillas - $25,000 (8.1 km) 🪑\n• Lavaplatos Industrial - $15,000 (6.3 km) 🧽\n\n¿Quieres ver más detalles de alguno?";
    }
    
    if (lowerQuery.includes('contactar') || lowerQuery.includes('vendedor')) {
      return "📞 ¡Te conecto con vendedores al instante!\n\n**Opciones de contacto:**\n• 💬 Chat directo en fudiMART\n• 📱 WhatsApp Business\n• ☎️ Llamada telefónica\n• 📧 Email con detalles completos\n\n**Vendedores súper activos ahora:**\n• Café Central (⚡ < 15 min)\n• Tacos El Güero (⚡ < 1 hora)\n• Marisquería El Puerto (⚡ < 2 horas)\n\n**¿Qué le digo al vendedor?**\n• Tu interés específico\n• Presupuesto disponible\n• Cuándo puedes ver el equipo\n\n¿Con quién te conecto?";
    }
    
    if (lowerQuery.includes('consejos') || lowerQuery.includes('tips')) {
      return "💡 Consejos de PRO para comprar/vender:\n\n**PARA COMPRADORES:**\n• ✅ Verifica que sea FUDIER certificado\n• 💬 Chatea antes de ir a ver\n• 📍 Revisa la distancia real\n• 🔍 Pide fotos adicionales\n• 💰 Negocia con respeto\n\n**PARA VENDEDORES:**\n• 📸 Fotos de calidad = más ventas\n• 📝 Descripción detallada y honesta\n• ⚡ Responde rápido a mensajes\n• 💵 Precio competitivo\n• 🤝 Sé flexible en horarios\n\n¿Eres comprador o vendedor?";
    }
    
    return "🔍 Soy tu asistente completo de fudiMART. Puedo ayudarte con:\n\n**COMPRAR EQUIPOS:**\n• Buscar por tipo, precio, distancia\n• Comparar opciones similares\n• Conectarte con vendedores\n• Verificar historial de vendedores\n\n**VENDER EQUIPOS:**\n• Determinar precio justo\n• Crear descripción atractiva\n• Subir fotos profesionales\n• Encontrar compradores interesados\n\n**CONSEJOS EXPERTOS:**\n• Negociación inteligente\n• Verificación de equipos\n• Mejores prácticas del marketplace\n\n¿En qué te ayudo hoy? 🤖✨";
  };

  // Handle FUDI chat input
  const handleFudiSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatTyping(true);

    setTimeout(() => {
      const fudiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'fudi',
        content: getFudiMarketplaceResponse(chatInput),
        timestamp: new Date(),
        suggestions: ["Buscar más", "Ver detalles", "Contactar vendedor", "Precio justo", "Vender equipo", "Consejos"]
      };
      setChatMessages(prev => [...prev, fudiResponse]);
      setIsChatTyping(false);
    }, 1800);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setChatInput(suggestion);
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  // Close overlays when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (sidebarOpen) setSidebarOpen(false);
      if (rightPanelOpen) setRightPanelOpen(false);
    };

    if (sidebarOpen || rightPanelOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen, rightPanelOpen]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(price);
  };

  // LEFT SIDEBAR - CATEGORÍAS MEJORADAS
  const LeftSidebar = () => (
    <aside className={`marketplace-sidebar ${sidebarOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Store size={24} />
        <div>
          <h2 className="sidebar-title">fudiMART</h2>
          <p className="sidebar-subtitle">Marketplace para FUDIERs</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Buscar equipos para restaurante..."
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
              color: 'var(--mart-gray-500)'
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
        <p className="location-detail">Nuevo Laredo, Tamaulipas • Radio 50 km</p>
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
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
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
        <Link href="/marketplace/purchases" className="action-item">
          <CheckCircle size={16} />
          <span>Mis Compras</span>
        </Link>
        <Link href="/marketplace/help" className="action-item">
          <HelpCircle size={16} />
          <span>Ayuda & Soporte</span>
        </Link>
      </div>
    </aside>
  );

  // PRODUCT CARD COMPONENT - ENHANCED
  const ProductCard = ({ product }: { product: Product }) => (
    <div className="product-card" key={product.id}>
      {/* Product Image */}
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        
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
            {product.featured && !product.urgent && (
              <span className="fudier-badge" style={{ background: 'var(--featured-badge)' }}>
                DESTACADO ⭐
              </span>
            )}
          </div>
        </div>

        {/* Card Actions */}
        <div className="card-actions">
          <button
            className={`card-action-btn ${favoriteProducts.has(product.id) ? 'favorited' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            title={favoriteProducts.has(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart size={16} />
          </button>
          
          <button
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigator.share?.({
                title: product.title,
                text: `${product.title} - ${formatPrice(product.price)}`,
                url: window.location.href
              });
            }}
            title="Compartir"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-price">
          {formatPrice(product.price)}
        </div>
        
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-meta">
          <div className="product-location">
            <MapPin size={12} />
            <span>{product.location} • {product.distance}</span>
          </div>
          <span className="product-condition">{product.condition}</span>
        </div>

        {/* Product Stats */}
        <div className="product-stats" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--mart-gray-600)',
          marginBottom: 'var(--space-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Eye size={12} />
              <span>{product.views}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Heart size={12} />
              <span>{product.likes}</span>
            </div>
          </div>
          <span>{new Date(product.postedDate).toLocaleDateString('es-MX', { 
            day: 'numeric', 
            month: 'short' 
          })}</span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 'var(--space-xs)', 
            marginBottom: 'var(--space-md)' 
          }}>
            {product.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} style={{
                background: 'var(--mart-gray-100)',
                color: 'var(--mart-gray-700)',
                padding: '0.125rem 0.375rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.625rem',
                fontWeight: '500'
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Seller Info */}
        <div className="seller-info">
          <div className="seller-avatar">
            <User size={12} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="seller-name">{product.seller.name}</div>
            {product.seller.responseTime && (
              <div style={{ 
                fontSize: '0.625rem', 
                color: 'var(--mart-gray-500)',
                marginTop: '1px'
              }}>
                Responde en {product.seller.responseTime}
              </div>
            )}
          </div>
          <div className="seller-rating">
            <Star size={12} />
            <span className="rating-text">{product.seller.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // RIGHT PANEL - CHAT Y SUGERENCIAS
  const RightPanel = () => (
    <div className={`marketplace-right-panel ${rightPanelOpen ? 'open' : ''}`}>
      {/* Chat Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        padding: 'var(--space-md)',
        background: 'var(--mart-gray-100)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--mart-gray-200)'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--fudi-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Brain size={16} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'var(--mart-gray-900)' }}>
            FUDI Assistant
          </h3>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--mart-gray-600)' }}>
            Marketplace Helper
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="panel-section">
        <h3>Estadísticas del Marketplace</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--mart-gray-900)' }}>
              {filteredProducts.length}
            </div>
            <div style={{ fontSize: '0.625rem', color: 'var(--mart-gray-600)' }}>
              Productos
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--fudi-green)' }}>
              247
            </div>
            <div style={{ fontSize: '0.625rem', color: 'var(--mart-gray-600)' }}>
              Total
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="panel-section">
        <h3>💡 Tips de Compra</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-sm)', 
            padding: 'var(--space-sm)',
            background: 'var(--mart-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--mart-gray-200)'
          }}>
            <Shield size={14} style={{ color: 'var(--fudi-blue)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--mart-gray-700)' }}>
              Verifica que sea FUDIER ✓
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-sm)', 
            padding: 'var(--space-sm)',
            background: 'var(--mart-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--mart-gray-200)'
          }}>
            <MessageCircle size={14} style={{ color: 'var(--fudi-green)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--mart-gray-700)' }}>
              Chatea antes de comprar
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-sm)', 
            padding: 'var(--space-sm)',
            background: 'var(--mart-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--mart-gray-200)'
          }}>
            <Navigation size={14} style={{ color: 'var(--fudi-orange)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--mart-gray-700)' }}>
              Revisa la distancia
            </span>
          </div>
        </div>
      </div>

      {/* Mini Chat */}
      <div style={{
        background: 'var(--mart-gray-100)',
        border: '1px solid var(--mart-gray-200)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-md)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '300px'
      }}>
        <h3 style={{ margin: '0 0 var(--space-md) 0', fontSize: '0.875rem', fontWeight: '600' }}>
          Chat con FUDI
        </h3>
        
        {/* Messages */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)'
          }}
        >
          <div style={{
            background: 'var(--mart-white)',
            border: '1px solid var(--mart-gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-sm)',
            fontSize: '0.75rem',
            color: 'var(--mart-gray-700)',
            lineHeight: 1.4
          }}>
            ¡Hola! ¿Necesitas ayuda para comprar o vender equipos?
          </div>
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <input
            type="text"
            placeholder="Pregunta rápida..."
            style={{
              flex: 1,
              background: 'var(--mart-white)',
              border: '1px solid var(--mart-gray-200)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-sm)',
              fontSize: '0.75rem',
              color: 'var(--mart-gray-900)',
              outline: 'none',
              transition: 'all var(--transition-fast)'
            }}
          />
          <button
            style={{
              background: 'var(--fudi-gradient)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-sm)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Send size={14} />
          </button>
        </div>

        {/* Quick to full chat */}
        <button
          onClick={() => setIsFudiOpen(true)}
          style={{
            marginTop: 'var(--space-sm)',
            background: 'var(--mart-white)',
            border: '1px solid var(--mart-gray-200)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-sm)',
            fontSize: '0.75rem',
            color: 'var(--mart-gray-700)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-xs)'
          }}
        >
          <Brain size={12} />
          Chat completo con FUDI
        </button>
      </div>
    </div>
  );

  // MAIN CONTENT AREA
  const MainContent = () => (
    <div className="marketplace-content">
      {/* Content Header */}
      <div className="content-header">
        <div className="content-title">
          <h1>
            {selectedCategory === 'all' ? 'Todos los productos' : 
             categories.find(c => c.id === selectedCategory)?.name || 'Productos'}
          </h1>
          <p className="results-count">
            {filteredProducts.length} resultados • Nuevo Laredo, Tamaulipas
          </p>
        </div>

        <div className="content-controls">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Vista en cuadrícula"
            >
              <Grid3X3 size={16} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Vista en lista"
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
            <option value="popular">Más populares</option>
          </select>
        </div>
      </div>

      {/* FUDI Suggestions Enhanced */}
      <div className="fudi-suggestions">
        <div className="suggestion-header">
          <Brain size={20} />
          <h3 className="suggestion-title">💡 FUDI recomienda para tu restaurante</h3>
        </div>
        <p className="suggestion-text">
          Basado en tu perfil de <strong>Tacos & Mariscos</strong>, encontré equipos perfectos para ti. 
          Los productos con <strong>⭐ DESTACADO</strong> son ideales para tu tipo de operación y tienen 
          excelentes reseñas de otros FUDIERs. <strong>¡Los vendedores verificados ✓ ofrecen mayor confianza!</strong>
        </p>
      </div>

      {/* Products Grid */}
      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="loading-card">
              <div className="loading-image"></div>
              <div style={{ padding: 'var(--space-lg)' }}>
                <div style={{ 
                  height: '20px', 
                  background: 'var(--mart-gray-100)', 
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 'var(--space-sm)'
                }}></div>
                <div style={{ 
                  height: '16px', 
                  background: 'var(--mart-gray-100)', 
                  borderRadius: 'var(--radius-sm)',
                  width: '70%'
                }}></div>
              </div>
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center" style={{ 
            gridColumn: '1 / -1',
            padding: 'var(--space-2xl)',
            color: 'var(--mart-gray-600)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>🔍</div>
            <h3 style={{ color: 'var(--mart-gray-800)', marginBottom: 'var(--space-sm)' }}>
              No se encontraron productos
            </h3>
            <p style={{ marginBottom: 'var(--space-lg)' }}>
              Intenta cambiar los filtros o términos de búsqueda
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              style={{
                background: 'var(--fudi-gradient)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md) var(--space-lg)',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredProducts.length > 0 && !loading && (
        <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
          <button 
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
            style={{
              background: 'var(--mart-white)',
              border: '1px solid var(--mart-gray-200)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-md) var(--space-xl)',
              color: 'var(--mart-gray-800)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              fontSize: '0.875rem'
            }}
          >
            {loading ? 'Cargando más productos...' : 'Cargar más productos'}
          </button>
        </div>
      )}
    </div>
  );

  // MOBILE BOTTOM NAVIGATION
  const MobileBottomNav = () => (
    <div className="mobile-bottom-nav">
      <button 
        className={`mobile-nav-btn ${!sidebarOpen && !rightPanelOpen ? 'active' : ''}`}
        onClick={() => {
          setSidebarOpen(false);
          setRightPanelOpen(false);
        }}
      >
        <Home size={20} />
        <span>Inicio</span>
      </button>
      
      <button 
        className={`mobile-nav-btn ${sidebarOpen ? 'active' : ''}`}
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
          setRightPanelOpen(false);
        }}
      >
        <Menu size={20} />
        <span>Categorías</span>
      </button>
      
      <button className="mobile-nav-btn">
        <Search size={20} />
        <span>Buscar</span>
      </button>
      
      <button 
        className={`mobile-nav-btn ${rightPanelOpen ? 'active' : ''}`}
        onClick={() => {
          setRightPanelOpen(!rightPanelOpen);
          setSidebarOpen(false);
        }}
      >
        <MessageCircle size={20} />
        <span>Chat</span>
      </button>
      
      <button className="mobile-nav-btn">
        <Heart size={20} />
        <span>Favoritos</span>
      </button>
    </div>
  );

  return (
    <div className="fudimart-container">
      <FudiBackground variant="minimal" theme="dark" intensity={0.03} opacity={1} fixed={true} />
      
      {/* ✅ FudiDashHeader with logout function */}
      <FudiDashHeader 
        currentModule="mart" 
        userName="Mikelon"
        userPlan="pro"
        notifications={3}
        onLogout={handleLogout}
      />

      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Right Panel Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${rightPanelOpen ? 'open' : ''}`}
        onClick={() => setRightPanelOpen(false)}
      ></div>

      {/* Main 3-Column Layout */}
      <main className="fudimart-main">
        <LeftSidebar />
        <MainContent />
        <RightPanel />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* 🌟 ASK FUDI - ESTRELLA ABSOLUTA DEL FUDIMART */}
      {!isFudiOpen ? (
        <button 
          className="floating-fudi-btn"
          onClick={() => setIsFudiOpen(true)}
        >
          <div className="fudi-btn-icon">
            <Brain size={24} />
          </div>
          <div className="fudi-btn-text">
            <div className="fudi-btn-main">ASK FUDI</div>
            <div className="fudi-btn-sub">Tu asistente inteligente</div>
          </div>
        </button>
      ) : (
        <div className="floating-fudi-widget">
          {/* Widget Header */}
          <div className="fudi-widget-header">
            <div className="fudi-widget-avatar">
              <Brain size={24} />
            </div>
            <div className="fudi-widget-info">
              <h3>ASK FUDI</h3>
              <p>Asistente de fudiMART • Compra & Vende</p>
            </div>
            <button 
              className="fudi-widget-close"
              onClick={() => setIsFudiOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatMessagesRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              background: 'var(--mart-gray-50)'
            }}
          >
            {chatMessages.map((message) => (
              <div key={message.id} style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  background: message.type === 'user' ? 'var(--fudi-gradient)' : 'var(--mart-white)',
                  color: message.type === 'user' ? 'white' : 'var(--mart-gray-800)',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  maxWidth: '85%',
                  lineHeight: 1.5,
                  border: '1px solid var(--mart-gray-200)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {message.content.split('\n').map((line, idx) => (
                    <div key={idx} style={{ marginBottom: idx < message.content.split('\n').length - 1 ? '0.5rem' : 0 }}>
                      {line}
                    </div>
                  ))}
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div style={{ 
                      marginTop: 'var(--space-md)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 'var(--space-xs)' 
                    }}>
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{
                            background: message.type === 'user' ? 'rgba(255,255,255,0.2)' : 'var(--mart-gray-100)',
                            border: '1px solid var(--mart-gray-200)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.375rem 0.75rem',
                            fontSize: '0.75rem',
                            color: message.type === 'user' ? 'white' : 'var(--mart-gray-700)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all var(--transition-fast)',
                            fontWeight: '500'
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isChatTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: 'var(--mart-white)',
                  border: '1px solid var(--mart-gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-md)',
                  fontSize: '0.875rem',
                  color: 'var(--mart-gray-600)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: 'var(--fudi-primary)',
                      animation: 'typing-dot 1.4s infinite'
                    }}></div>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: 'var(--fudi-primary)',
                      animation: 'typing-dot 1.4s infinite 0.2s'
                    }}></div>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: 'var(--fudi-primary)',
                      animation: 'typing-dot 1.4s infinite 0.4s'
                    }}></div>
                  </div>
                  FUDI está pensando...
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div style={{
            padding: '0 var(--space-lg)',
            borderTop: '1px solid var(--mart-gray-200)'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-xs)',
              padding: 'var(--space-md) 0'
            }}>
              {fudiSuggestions.slice(0, 3).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    background: 'var(--mart-gray-100)',
                    border: '1px solid var(--mart-gray-200)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    color: 'var(--mart-gray-700)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    fontWeight: '500'
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div style={{
            padding: 'var(--space-lg)',
            borderTop: '1px solid var(--mart-gray-200)',
            background: 'var(--mart-white)'
          }}>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
              <input
                ref={chatInputRef}
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFudiSend()}
                placeholder="Pregunta sobre comprar o vender equipos..."
                style={{
                  flex: 1,
                  background: 'var(--mart-gray-100)',
                  border: '1px solid var(--mart-gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-md)',
                  fontSize: '0.875rem',
                  color: 'var(--mart-gray-900)',
                  outline: 'none',
                  transition: 'all var(--transition-fast)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--fudi-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.1)';
                  e.target.style.background = 'var(--mart-white)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--mart-gray-200)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'var(--mart-gray-100)';
                }}
              />
              <button
                onClick={handleFudiSend}
                disabled={!chatInput.trim() || isChatTyping}
                style={{
                  background: chatInput.trim() ? 'var(--fudi-gradient)' : 'var(--mart-gray-200)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-md)',
                  color: 'white',
                  cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition-fast)',
                  minWidth: '48px'
                }}
              >
                <Send size={16} />
              </button>
            </div>

            {/* Full Chat Link */}
            <button
              onClick={() => window.location.href = '/dashboard/chat'}
              style={{
                width: '100%',
                background: 'var(--mart-gray-100)',
                border: '1px solid var(--mart-gray-200)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-sm)',
                fontSize: '0.75rem',
                color: 'var(--mart-gray-700)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--mart-white)';
                e.currentTarget.style.borderColor = 'var(--mart-gray-300)';
                e.currentTarget.style.color = 'var(--mart-gray-900)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--mart-gray-100)';
                e.currentTarget.style.borderColor = 'var(--mart-gray-200)';
                e.currentTarget.style.color = 'var(--mart-gray-700)';
              }}
            >
              <MessageCircle size={12} />
              Abrir chat completo con FUDI
              <Zap size={10} style={{ color: 'var(--fudi-primary)' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}