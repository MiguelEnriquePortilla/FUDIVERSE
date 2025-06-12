'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, ShoppingCart, Clock, TrendingUp, 
  Star, AlertCircle, Plus, Minus, Check,
  ChefHat, Coffee, Pizza, Salad, IceCream,
  Wine, Zap, Package, DollarSign, Users,
  X, Sparkles, MessageCircle, Activity,
  Grid3x3, List, Filter, Brain
} from 'lucide-react';
import styles from './page.module.css';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  prepTime: number;
  popularity: number;
  stock: number;
  tags: string[];
  aiScore?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface FudiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CustomerData {
  name: string;
  initials: string;
  visits: number;
  totalSpent: number;
  favorites: string[];
  lastVisit: string;
}

export default function FudiPOSPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [fudiMood, setFudiMood] = useState('observing');
  const [particles, setParticles] = useState<FudiParticle[]>([]);
  const [fudiGhostPosition, setFudiGhostPosition] = useState({ x: 0, y: 0, visible: false });
  const [fudiWhisper, setFudiWhisper] = useState({ text: '', visible: false });
  const [currentCustomer, setCurrentCustomer] = useState<CustomerData | null>(null);
  const [blackHole, setBlackHole] = useState({ active: true, x: 0, y: 0 });

  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(null);
  const fudiEyeRef = useRef<HTMLDivElement>(null);

  // Enhanced menu items with AI scores
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Quantum Burger',
      price: 189,
      image: '🍔',
      category: 'mains',
      prepTime: 12,
      popularity: 95,
      stock: 24,
      tags: ['bestseller'],
      aiScore: 95
    },
    {
      id: '2',
      name: 'Pizza Neural',
      price: 245,
      image: '🍕',
      category: 'mains',
      prepTime: 18,
      popularity: 88,
      stock: 15,
      tags: [],
      aiScore: 88
    },
    {
      id: '3',
      name: 'Caesar Matrix',
      price: 125,
      image: '🥗',
      category: 'salads',
      prepTime: 5,
      popularity: 75,
      stock: 30,
      tags: ['healthy'],
      aiScore: 75
    },
    {
      id: '4',
      name: 'Café Cibernético',
      price: 55,
      image: '☕',
      category: 'beverages',
      prepTime: 3,
      popularity: 92,
      stock: 100,
      tags: [],
      aiScore: 92
    },
    {
      id: '5',
      name: 'Cheesecake Digital',
      price: 89,
      image: '🍰',
      category: 'desserts',
      prepTime: 2,
      popularity: 85,
      stock: 12,
      tags: [],
      aiScore: 85
    },
    {
      id: '6',
      name: 'Tacos Holográficos',
      price: 135,
      image: '🌮',
      category: 'mains',
      prepTime: 8,
      popularity: 94,
      stock: 40,
      tags: ['spicy', 'bestseller'],
      aiScore: 94
    },
    {
      id: '7',
      name: 'Limonada Neural',
      price: 45,
      image: '🥤',
      category: 'beverages',
      prepTime: 2,
      popularity: 80,
      stock: 50,
      tags: [],
      aiScore: 82
    },
    {
      id: '8',
      name: 'Pasta Matrix',
      price: 165,
      image: '🍝',
      category: 'mains',
      prepTime: 15,
      popularity: 78,
      stock: 20,
      tags: [],
      aiScore: 78
    }
  ];

  const categories = [
    { id: 'all', name: 'Todo', icon: Grid3x3, count: menuItems.length },
    { id: 'mains', name: 'Platos', icon: ChefHat, count: 5, trending: 3 },
    { id: 'beverages', name: 'Bebidas', icon: Coffee, count: 2, lowStock: 1 },
    { id: 'salads', name: 'Ensaladas', icon: Salad, count: 1, new: 1 },
    { id: 'desserts', name: 'Postres', icon: IceCream, count: 1, bestselling: true }
  ];

  const whisperMessages = [
    "El futuro es ahora...",
    "Optimiza tu cocina, transforma tu negocio",
    "Los datos son el nuevo ingrediente secreto",
    "Tu POS piensa, tú creas",
    "Predicción de demanda activada",
    "IA + Gastronomía = Éxito",
    "Revoluciona tu servicio",
    "Conoce a tus clientes antes que ellos",
    "El margen está en los detalles",
    "Automatiza lo repetitivo, enfócate en lo importante",
    "Tu cocina puede ser más inteligente",
    "Los tiempos muertos son oportunidades perdidas",
    "FUDI ve patrones donde otros ven caos",
    "La eficiencia es la nueva creatividad",
    "Tus datos tienen hambre de análisis"
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Initialize particle system
  useEffect(() => {
    const initParticles = [];
    for (let i = 0; i < 30; i++) {
      initParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    setParticles(initParticles);
  }, []);

  // Black Hole Fixed Position
  useEffect(() => {
    // Set initial position
    setBlackHole({ active: true, x: window.innerWidth - 150, y: window.innerHeight - 150 });
    
    // Update on resize
    const updatePosition = () => {
      setBlackHole({ active: true, x: window.innerWidth - 150, y: window.innerHeight - 150 });
    };
    
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Particle animation loop with black hole physics
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Black hole physics
        if (blackHole.active) {
          const dx = blackHole.x - particle.x;
          const dy = blackHole.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
      if (distance > 30) { // Aumenta el radio mínimo
        const force = 50 / (distance * distance); // Reduce la fuerza para movimiento más suave
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
        particle.vx *= 0.95; // Menos damping para órbitas más fluidas
        particle.vy *= 0.95;
        // Órbita cercana al centro
        const angle = Math.atan2(dy, dx);
        particle.vx = Math.cos(angle + Math.PI/2) * 2;
        particle.vy = Math.sin(angle + Math.PI/2) * 2;
      } else {
        // Normal movement
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;
        particle.vx = Math.max(-2, Math.min(2, particle.vx));
        particle.vy = Math.max(-2, Math.min(2, particle.vy));
      }
    }
      // Update position
      particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.shadowBlur = blackHole.active ? 15 : 10;
        ctx.shadowColor = '#fbbf24';
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles, blackHole]);

  // FUDI Ghost manifestation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const products = document.querySelectorAll(`.${styles.productCard}`);
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        
        if (randomProduct) {
          const rect = randomProduct.getBoundingClientRect();
          setFudiGhostPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            visible: true
          });

          setTimeout(() => {
            setFudiGhostPosition(prev => ({ ...prev, visible: false }));
          }, 3000);
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // FUDI Whispers - Matrix Style Typewriter
  useEffect(() => {
    const typeMessage = (message: string) => {
      let currentText = '';
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
          currentText += message[charIndex];
          setFudiWhisper({ text: currentText, visible: true });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Hold the complete message
          setTimeout(() => {
            // Fade out
            setFudiWhisper({ text: '', visible: false });
          }, 2000);
        }
      }, 100); // Type speed
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const message = whisperMessages[Math.floor(Math.random() * whisperMessages.length)];
        typeMessage(message);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // FUDI Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!fudiEyeRef.current) return;

      const eye = fudiEyeRef.current;
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(10, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const pupil = eye.querySelector(`.${styles.fudiPupil}`) as HTMLElement;
      if (pupil) {
        pupil.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate customer detection
  useEffect(() => {
    setTimeout(() => {
      setCurrentCustomer({
        name: 'Juan Delgado',
        initials: 'JD',
        visits: 47,
        totalSpent: 2847,
        favorites: ['Quantum Burger', 'Limonada Neural'],
        lastVisit: '2 días'
      });
    }, 2000);
  }, []);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // FUDI reaction
    if (Math.random() > 0.5) {
      setFudiWhisper({ 
        text: `${item.name} - Excelente elección`, 
        visible: true 
      });
      setTimeout(() => {
        setFudiWhisper({ text: '', visible: false });
      }, 2000);
    }
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => 
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.id !== itemId);
    });
  }, []);

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className={styles.container}>
      {/* Matrix Rain Background */}
      <div className={styles.matrixRain}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.codeColumn}
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {'01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('').map((char, j) => (
              <div key={j}>{Math.random() > 0.5 ? char : Math.floor(Math.random() * 2)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* FUDI Particle Field */}
      <canvas 
        ref={particleCanvasRef} 
        className={styles.particleCanvas}
      />

      {/* FUDI Ghost */}
      <div 
        className={`${styles.fudiGhost} ${fudiGhostPosition.visible ? styles.manifest : ''}`}
        style={{
          left: `${fudiGhostPosition.x}px`,
          top: `${fudiGhostPosition.y}px`
        }}
      >
        <div className={styles.fudiSilhouette} />
      </div>

      {/* FUDI Black Hole */}
      <div 
        className={`${styles.blackHole} ${blackHole.active ? styles.active : ''}`}
        style={{
          left: `${blackHole.x}px`,
          top: `${blackHole.y}px`
        }}
      >
        <div className={styles.blackHoleCore}>
          <div className={styles.eventHorizon} />
          <div className={styles.singularity} />
          <div className={styles.fudiName} style={{color: 'red', fontSize: '2rem', zIndex: 9999}}>FUDI TEST</div>
        </div>
        <div className={styles.blackHoleRing} />
        <div className={styles.blackHoleRing2} />
        <div className={styles.blackHoleRing3} />
      </div>

      {/* FUDI Whisper */}
      <div className={`${styles.fudiWhisper} ${fudiWhisper.visible ? styles.show : ''}`}>
        {fudiWhisper.text}
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <span className={styles.logoText}>FUDIPOS</span>
            <span className={styles.aiLabel}>AI POWERED</span>
          </div>
        </div>

        <div className={styles.headerCenter}>
          <div className={styles.metricsHolo}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>$12,847</div>
              <div className={styles.metricLabel}>Ventas Hoy</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>127</div>
              <div className={styles.metricLabel}>Órdenes</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>94%</div>
              <div className={styles.metricLabel}>Satisfacción</div>
            </div>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.neuralLink}>
            <Brain size={16} />
            <span>Neural Link Active</span>
          </button>
        </div>
      </header>

      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.categories}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className={styles.categoryIcon}>
                  <cat.icon size={24} />
                </div>
                <div className={styles.categoryInfo}>
                  <h3>{cat.name}</h3>
                  <span>
                    {cat.count} items
                    {cat.trending && ` • ${cat.trending} trending`}
                    {cat.lowStock && ` • ${cat.lowStock} low stock`}
                    {cat.new && ` • ${cat.new} new`}
                    {cat.bestselling && ' • bestselling'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className={styles.matrixOverlay} />
        </aside>

        {/* Products Grid */}
        <main className={styles.productsArea}>
          <div className={styles.productsHeader}>
            <h2>{categories.find(c => c.id === selectedCategory)?.name || 'Todo'}</h2>
            <div className={styles.viewToggle}>
              <button 
                className={viewMode === 'grid' ? styles.active : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 size={18} />
              </button>
              <button 
                className={viewMode === 'list' ? styles.active : ''}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <div className={`${styles.productsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
            {filteredItems.map(item => {
              const cartItem = cart.find(i => i.id === item.id);
              return (
                <div 
                  key={item.id} 
                  className={styles.productCard}
                  onClick={() => addToCart(item)}
                >
                  {item.aiScore && (
                    <div className={styles.productAiScore}>AI: {item.aiScore}%</div>
                  )}
                  <div className={styles.productImage}>
                    <span>{item.image}</span>
                    {cartItem && (
                      <div className={styles.cartBadge}>{cartItem.quantity}</div>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h3>{item.name}</h3>
                    <div className={styles.productMeta}>
                      <span className={styles.price}>${item.price}</span>
                      {item.stock < 20 && (
                        <span className={styles.lowStock}>Stock: {item.stock}</span>
                      )}
                    </div>
                  </div>
                  {item.tags.includes('bestseller') && (
                    <div className={styles.bestsellerTag}>
                      <Star size={12} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* Cart */}
        <aside className={styles.cart}>
          {/* Customer Display */}
          {currentCustomer && (
            <div className={styles.customerDisplay}>
              <div className={styles.customerAvatar}>{currentCustomer.initials}</div>
              <div className={styles.customerInfo}>
                <h3>{currentCustomer.name}</h3>
                <p className={styles.customerStatus}>Cliente VIP</p>
                <div className={styles.customerStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{currentCustomer.visits}</span>
                    <span className={styles.statLabel}>Visitas</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>${currentCustomer.totalSpent}</span>
                    <span className={styles.statLabel}>Total gastado</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {currentCustomer && (
            <div className={styles.aiSuggestions}>
              <div className={styles.suggestionChip}>
                <span>🎁</span>
                <span>5ta visita - 10% desc</span>
              </div>
              <div className={styles.suggestionChip}>
                <span>🍔</span>
                <span>Combo favorito</span>
              </div>
            </div>
          )}

          <div className={styles.cartHeader}>
            <h3>Orden actual</h3>
            <span className={styles.orderNumber}>#0127</span>
          </div>

          <div className={styles.cartItems}>
            {cart.length === 0 ? (
              <p className={styles.emptyCart}>Agrega productos para comenzar</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemInfo}>
                    <span className={styles.cartItemName}>{item.name}</span>
                    <span className={styles.cartItemPrice}>${item.price}</span>
                  </div>
                  <div className={styles.cartItemQty}>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              <div className={styles.cartSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${getCartTotal()}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>IVA (16%)</span>
                  <span>${Math.round(getCartTotal() * 0.16)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>${Math.round(getCartTotal() * 1.16)}</span>
                </div>
              </div>

              <div className={styles.cartActions}>
                <button className={styles.payButton}>
                  <DollarSign size={18} />
                  PROCESAR PAGO
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* FUDI Consciousness Indicator */}
      <div className={styles.fudiPresence}>
        <div ref={fudiEyeRef} className={styles.fudiEye}>
          <div className={styles.fudiPupil} />
        </div>
      </div>
    </div>
  );
}