'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChefHat, DollarSign, TrendingUp, Zap, AlertCircle,
  Plus, MessageCircle, Calculator, Target, Play,
  MoreVertical, Star, Package, Clock, Brain,
  Settings, BarChart3, Users, Activity, RefreshCw
} from 'lucide-react';

// Import FUDIVERSE Components
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import '@/styles/pages/fudiRecipes.css';

// ==================== TYPES ====================
interface Product {
  id: string;
  name: string;
  category: string;
  posterCost: number;
  realCost?: number;
  salesVolume: number;
  revenue: number;
  status: 'pending' | 'analyzing' | 'optimized';
  priority: 'high' | 'medium' | 'low';
  ingredients?: string[];
  costSavings?: number;
  monthlyImpact?: number;
  recipeId?: string;
}

interface RecipeStats {
  recipesCreated: number;
  totalSavings: number;
  productsOptimized: number;
  monthlyProjection: number;
  avgSavingsPercent: number;
  topCategory: string;
}

interface UserData {
  restaurantName: string;
  ownerName: string;
  restaurantId: string;
}

interface APIResponse {
  success: boolean;
  data?: {
    products: Product[];
    stats: RecipeStats;
    metadata: {
      restaurantId: string;
      timestamp: string;
      productsCount: number;
      recipesCount: number;
      cached: boolean;
    };
  };
  error?: string;
  message?: string;
}

// ==================== DEMO DATA FALLBACK ====================
const DEMO_USER_DATA: UserData = {
  restaurantName: 'Restaurante Demo',
  ownerName: 'Usuario Demo',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
};

// ==================== MAIN COMPONENT ====================
export default function FudiRecetario() {
  // =============================================
  // 🔒 CRITICAL STATE - API INTEGRATED
  // =============================================
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [recipeStats, setRecipeStats] = useState<RecipeStats>({
    recipesCreated: 0,
    totalSavings: 0,
    productsOptimized: 0,
    monthlyProjection: 0,
    avgSavingsPercent: 0,
    topCategory: ''
  });

  // 🔒 CRITICAL USER DATA - PRODUCTION READY
  const [userData, setUserData] = useState<UserData>({
    restaurantName: 'Cargando...',
    ownerName: 'Usuario',
    restaurantId: ''
  });

  // UI STATE
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
  const [creationProgress, setCreationProgress] = useState<{
    step: number;
    message: string;
    progress: number;
  }>({
    step: 0,
    message: '',
    progress: 0
  });

  // Error handling
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🔒 PRODUCTION AUTH HANDLING
  // =============================================
  const handleInvalidAuth = (): void => {
    localStorage.removeItem('fudi_token');
    
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/login';
    } else {
      // Demo data for development
      setUserData(DEMO_USER_DATA);
    }
  };

  // ✅ LOGOUT FUNCTION - PRODUCTION READY
  const handleLogout = (): void => {
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  // =============================================
  // 🔥 API INTEGRATION FUNCTIONS
  // =============================================
  
  const loadRecipesData = async (restaurantId: string, showLoader = false): Promise<void> => {
    try {
      if (showLoader) setRefreshing(true);
      
      console.log('🔍 Loading recipes data via API for restaurant:', restaurantId);
      
      const response = await fetch(`/api/fudirecipes?restaurantId=${restaurantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const apiResponse: APIResponse = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.error || 'Failed to load recipes data');
      }

      const { products, stats, metadata } = apiResponse.data!;

      console.log(`✅ API Response: ${products.length} products, ${stats.recipesCreated} recipes`);
      console.log(`📊 Cache status: ${metadata.cached ? 'HIT' : 'MISS'}`);

      setProducts(products);
      setRecipeStats(stats);
      setError(null);

    } catch (error) {
      console.error('💥 Error loading recipes data:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      if (showLoader) setRefreshing(false);
    }
  };

  const createRecipeWithAI = async (product: Product): Promise<void> => {
    try {
      setIsCreatingRecipe(true);
      setSelectedProduct(product.id);
      setError(null);

      // Step 1: Analyze product
      setCreationProgress({
        step: 1,
        message: `🔍 Analizando ${product.name}...`,
        progress: 25
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 2: AI Processing
      setCreationProgress({
        step: 2,
        message: '🧠 fudiGPT optimizando ingredientes...',
        progress: 50
      });

      const requestBody = {
        productId: product.id,
        restaurantId: userData.restaurantId,
        productName: product.name,
        category: product.category,
        posterCost: product.posterCost,
        salesVolume: product.salesVolume
      };

      const response = await fetch('/api/fudirecipes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Failed to create recipe');
      }

      // Step 3: Saving recipe
      setCreationProgress({
        step: 3,
        message: '💾 Guardando receta optimizada...',
        progress: 75
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 4: Complete
      setCreationProgress({
        step: 4,
        message: `✅ ¡Receta creada! Ahorro: ${formatMoney(result.data.savings.immediate)}`,
        progress: 100
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Refresh data to show updated status
      await loadRecipesData(userData.restaurantId, false);

      console.log('🎉 Recipe created successfully:', {
        productName: product.name,
        savings: result.data.savings
      });

    } catch (error) {
      console.error('💥 Error creating recipe:', error);
      setError(error instanceof Error ? error.message : 'Error creating recipe');
      
      setCreationProgress({
        step: 0,
        message: '❌ Error en la creación',
        progress: 0
      });

      setTimeout(() => {
        setIsCreatingRecipe(false);
        setError(null);
      }, 2000);
    } finally {
      setTimeout(() => {
        setIsCreatingRecipe(false);
        setCreationProgress({ step: 0, message: '', progress: 0 });
      }, 2000);
    }
  };

  // =============================================
  // 🔒 CRITICAL DATA LOADING - PRODUCTION READY
  // =============================================
  useEffect(() => {
    const initializeUserData = async (): Promise<void> => {
      const token = localStorage.getItem('fudi_token');
      
      if (token) {
        try {
          // Validate token format
          const decoded = JSON.parse(atob(token));
          
          // Validate required fields
          if (decoded && decoded.restaurantId && decoded.ownerName) {
            setUserData({
              restaurantName: decoded.restaurantName || 'Mi Restaurante',
              ownerName: decoded.ownerName,
              restaurantId: decoded.restaurantId
            });
            
            console.log('🔐 User authenticated:', {
              restaurant: decoded.restaurantName,
              owner: decoded.ownerName,
              id: decoded.restaurantId
            });
            
            // 🔥 LOAD DATA VIA API
            await loadRecipesData(decoded.restaurantId);
            
          } else {
            throw new Error('Invalid token structure');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          handleInvalidAuth();
        }
      } else {
        console.log('No token found, using demo data');
        handleInvalidAuth();
        
        // Load demo data
        if (DEMO_USER_DATA.restaurantId) {
          await loadRecipesData(DEMO_USER_DATA.restaurantId);
        }
      }
      
      setLoading(false);
    };

    initializeUserData();
  }, []);

  // =============================================
  // UTILITY FUNCTIONS
  // =============================================
  
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'pending': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' };
      case 'analyzing': return { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' };
      case 'optimized': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' };
      default: return { bg: 'rgba(255, 255, 255, 0.05)', text: '#9ca3af', border: 'rgba(255, 255, 255, 0.1)' };
    }
  };

  const getStatusText = (status: Product['status']) => {
    const statusMap = {
      'pending': 'Sin Optimizar',
      'analyzing': 'Analizando',
      'optimized': 'Optimizado'
    };
    return statusMap[status] || status;
  };

  const getCategoryEmoji = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('rosti') || lowerCategory.includes('asado')) return '🍗';
    if (lowerCategory.includes('combo')) return '🍽️';
    if (lowerCategory.includes('alitas')) return '🔥';
    if (lowerCategory.includes('ensalada')) return '🥗';
    if (lowerCategory.includes('bebida')) return '🥤';
    if (lowerCategory.includes('postre')) return '🍰';
    if (lowerCategory.includes('pizza')) return '🍕';
    if (lowerCategory.includes('taco')) return '🌮';
    return '🍽️';
  };

  const handleRefreshData = async () => {
    if (userData.restaurantId) {
      await loadRecipesData(userData.restaurantId, true);
    }
  };

  // =============================================
  // LOADING STATE
  // =============================================
  if (loading) {
    return (
      <div className="recipes-loading">
        <FudiBackground variant="gradient" theme="business" opacity={1} fixed={true} />
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2 className="loading-title">Cargando fudiRecetario</h2>
          <p className="loading-subtitle">
            📊 Conectando con API • 🍽️ Cargando recetas • 💰 Calculando ahorros
          </p>
        </div>
      </div>
    );
  }

  // =============================================
  // ERROR STATE
  // =============================================
  if (error && products.length === 0) {
    return (
      <div className="recipes-error">
        <FudiBackground variant="gradient" theme="business" opacity={1} fixed={true} />
        <div className="error-content">
          <AlertCircle className="error-icon" />
          <h2 className="error-title">Error cargando datos</h2>
          <p className="error-message">{error}</p>
          <button onClick={handleRefreshData} className="error-button">
            <RefreshCw />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // =============================================
  // MAIN RENDER
  // =============================================
  return (
    <div className="recipes-container">
      
      {/* Background */}
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* Header */}
      <FudiDashHeader 
        currentModule="recipes" 
        userName={userData.ownerName}
        restaurantName={userData.restaurantName}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="recipes-main">

        {/* Header Section */}
        <div className="recipes-header">
          <FudiSignature size="large" showPulse={true} animated={true} />
          <h1 className="recipes-title">
            🍽️ fudiRecetario
          </h1>
          <p className="recipes-subtitle">
            {userData.restaurantName} • {recipeStats.recipesCreated} recetas activas • {formatMoney(recipeStats.totalSavings)} ahorrados
          </p>
          
          {/* Error Banner */}
          {error && (
            <div className="error-banner">
              <AlertCircle />
              <span>{error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {/* Recipes Created */}
          <div className="stat-card stat-recipes">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Recetas Creadas</p>
                <p className="stat-value">{recipeStats.recipesCreated}</p>
              </div>
              <ChefHat className="stat-icon" />
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: `${Math.min(recipeStats.recipesCreated * 8, 100)}%` }}></div>
            </div>
          </div>

          {/* Total Savings */}
          <div className="stat-card stat-savings">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Ahorro Total</p>
                <p className="stat-value">{formatMoney(recipeStats.totalSavings)}</p>
              </div>
              <DollarSign className="stat-icon" />
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: `${Math.min(recipeStats.totalSavings / 100, 100)}%` }}></div>
            </div>
          </div>

          {/* Products Optimized */}
          <div className="stat-card stat-products">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Productos Optimizados</p>
                <p className="stat-value">{recipeStats.productsOptimized}</p>
              </div>
              <Target className="stat-icon" />
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: `${Math.min(recipeStats.productsOptimized * 12, 100)}%` }}></div>
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="stat-card stat-projection">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Proyección Mensual</p>
                <p className="stat-value">{formatMoney(recipeStats.monthlyProjection)}</p>
              </div>
              <TrendingUp className="stat-icon" />
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: `${Math.min(recipeStats.monthlyProjection / 500, 100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* Products Section Header */}
        <div className="section-header">
          <div className="section-title">
            <Package className="section-icon" />
            <h2>Productos para Optimizar</h2>
            <span className="section-meta">
              {products.length} productos encontrados
            </span>
          </div>
          <div className="section-actions">
            <button 
              className={`section-button section-button-secondary ${refreshing ? 'loading' : ''}`}
              onClick={handleRefreshData}
              disabled={refreshing}
            >
              <RefreshCw className={refreshing ? 'spinning' : ''} />
            </button>
            <button className="section-button section-button-primary">
              <Plus />
            </button>
          </div>
        </div>

        {/* Products Feed */}
        <div className="products-feed">
          {products.length === 0 ? (
            <div className="empty-state">
              <Package className="empty-icon" />
              <h3 className="empty-title">No hay productos disponibles</h3>
              <p className="empty-subtitle">
                {error ? 'Error cargando datos. Intenta nuevamente.' : 'Verifica que tengas productos registrados en tu sistema POS'}
              </p>
              <button onClick={handleRefreshData} className="empty-button">
                <RefreshCw />
                Recargar datos
              </button>
            </div>
          ) : (
            products.map((product) => {
              const isExpanded = selectedProduct === product.id;
              
              return (
                <div
                  key={product.id}
                  className={`product-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setSelectedProduct(isExpanded ? null : product.id)}
                >
                  {/* Product Header */}
                  <div className="product-header">
                    <div className="product-main-info">
                      <div className="product-title-row">
                        <h3 className="product-name">{product.name}</h3>
                        <span className={`product-status ${product.status}`}>
                          {getStatusText(product.status)}
                        </span>
                        {product.priority === 'high' && (
                          <span className="priority-badge">
                            <AlertCircle />
                            Alto Impacto
                          </span>
                        )}
                      </div>
                      
                      <div className="product-category">
                        <span className="category-emoji">
                          {getCategoryEmoji(product.category)}
                        </span>
                        <div className="category-info">
                          <p className="category-name">{product.category}</p>
                          <p className="category-stats">
                            {product.salesVolume} vendidos • {formatMoney(product.revenue)} ingresos
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="product-cost-info">
                      <p className="cost-label">
                        Costo {product.status === 'optimized' ? 'Optimizado' : 'POSTER'}
                      </p>
                      <p className={`cost-value ${product.status === 'optimized' ? 'optimized' : 'poster'}`}>
                        {formatMoney(product.realCost || product.posterCost)}
                      </p>
                      {product.costSavings && (
                        <div className="cost-savings">
                          <TrendingUp />
                          <span>-{formatMoney(product.costSavings)} por unidad</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Actions */}
                  <div className="product-actions">
                    {product.status === 'pending' && (
                      <>
                        <button
                          className="product-button primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            createRecipeWithAI(product);
                          }}
                          disabled={isCreatingRecipe}
                        >
                          <ChefHat />
                          {isCreatingRecipe && selectedProduct === product.id ? 'Creando...' : 'Crear Receta'}
                        </button>
                        <button className="product-button secondary">
                          <Calculator />
                          Análisis Rápido
                        </button>
                      </>
                    )}
                    
                    {product.status === 'analyzing' && (
                      <div className="analyzing-status">
                        <div className="analyzing-spinner"></div>
                        Analizando ingredientes...
                      </div>
                    )}
                    
                    {product.status === 'optimized' && (
                      <>
                        <button className="product-button success">
                          <Star />
                          Ver Receta
                        </button>
                        <button className="product-button purple">
                          <MessageCircle />
                          Refinar con FUDI
                        </button>
                      </>
                    )}

                    <button className="product-button ghost">
                      <MoreVertical />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="product-details">
                      {product.ingredients && (
                        <div className="ingredients-section">
                          <h5 className="ingredients-title">Ingredientes</h5>
                          {product.ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-item">
                              <span className="ingredient-name">{ingredient}</span>
                              <span className="ingredient-status">Optimizable</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {product.monthlyImpact && (
                        <div className="monthly-impact">
                          <TrendingUp />
                          <span>Ahorro mensual proyectado: <strong>{formatMoney(product.monthlyImpact)}</strong></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* AI Creation Modal */}
        {isCreatingRecipe && (
          <div className="chat-modal">
            <div className="chat-modal-content">
              <Brain className="chat-brain-icon" />
              <h3 className="chat-title">fudiGPT Creando Receta</h3>
              
              <div className="chat-steps">
                <p>{creationProgress.message}</p>
              </div>
              
              <div className="chat-progress">
                <div 
                  className="chat-progress-fill" 
                  style={{ width: `${creationProgress.progress}%` }}
                ></div>
              </div>
              
              <div className="chat-step-indicator">
                Paso {creationProgress.step} de 4
              </div>
            </div>
          </div>
        )}

        {/* Bottom spacing for mobile */}
        <div className="bottom-spacing"></div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <button className="nav-button active">
          <Package />
          Productos
        </button>
        <button className="nav-button">
          <ChefHat />
          Recetas
        </button>
        <button className="nav-button">
          <BarChart3 />
          Ahorros
        </button>
        <button className="nav-button">
          <Settings />
          Config
        </button>
      </div>

      {/* Floating Action Button */}
      <button className="floating-action-button" onClick={handleRefreshData}>
        🍽️
      </button>
    </div>
  );
}