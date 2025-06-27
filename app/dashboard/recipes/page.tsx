'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ChefHat, DollarSign, TrendingUp, Zap, AlertCircle,
  Plus, MessageCircle, Calculator, Target, Play,
  MoreVertical, Star, Package, Clock, Brain,
  Settings, BarChart3, Users, Activity
} from 'lucide-react';

// Import FUDIVERSE Components
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';
import '@/styles/pages/fudiRecipes.css';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

// ==================== DEMO DATA FALLBACK ====================
const DEMO_USER_DATA: UserData = {
  restaurantName: 'Restaurante Demo',
  ownerName: 'Usuario Demo',
  restaurantId: '13207c90-2ea6-4aa0-bfac-349753d24ea4'
};

// ==================== MAIN COMPONENT ====================
export default function FudiRecetario() {
  // =============================================
  // 🔒 CRITICAL STATE - REAL DATA
  // =============================================
  const [loading, setLoading] = useState(true);
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
  const [chatStep, setChatStep] = useState(0);

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
  // 🔥 REAL DATA LOADING FUNCTIONS
  // =============================================
  
  const loadRestaurantProducts = async (restaurantId: string): Promise<void> => {
    try {
      console.log('🔍 Loading products for restaurant:', restaurantId);
      
      // Get real products from poster_products
      const { data: posterProducts, error: productsError } = await supabase
        .from('poster_products')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .limit(20);

      if (productsError) {
        console.error('Error loading products:', productsError);
        return;
      }

      console.log(`✅ Found ${posterProducts?.length || 0} products`);

      // Get existing recipes from fudi_recipes
      const { data: existingRecipes, error: recipesError } = await supabase
        .from('fudi_recipes')
        .select('*')
        .eq('restaurant_id', restaurantId);

      if (recipesError) {
        console.error('Error loading recipes:', recipesError);
      }

      console.log(`✅ Found ${existingRecipes?.length || 0} existing recipes`);

      // Get sales data from poster_transaction_products (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: salesData, error: salesError } = await supabase
        .from('poster_transaction_products')
        .select('product_id, num, product_sum')
        .eq('restaurant_id', restaurantId)
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (salesError) {
        console.error('Error loading sales data:', salesError);
      }

      // Aggregate sales by product
      const salesByProduct: { [key: string]: { volume: number, revenue: number } } = {};
      salesData?.forEach(sale => {
        const productId = sale.product_id;
        if (!salesByProduct[productId]) {
          salesByProduct[productId] = { volume: 0, revenue: 0 };
        }
        salesByProduct[productId].volume += parseInt(sale.num) || 0;
        salesByProduct[productId].revenue += parseFloat(sale.product_sum) || 0;
      });

      // Format products with real data
      const formattedProducts: Product[] = posterProducts?.map(product => {
        const recipe = existingRecipes?.find(r => r.poster_product_id === product.product_id);
        const sales = salesByProduct[product.product_id] || { volume: 0, revenue: 0 };
        
        // Parse poster cost (it's in centavos)
        const posterCost = parseFloat(product.cost) / 100 || 0;
        const realCost = recipe?.calculated_cost || null;
        const costSavings = recipe ? posterCost - realCost : undefined;
        
        // Determine priority based on sales volume and potential savings
        let priority: 'high' | 'medium' | 'low' = 'low';
        if (sales.volume > 100 || sales.revenue > 10000) priority = 'high';
        else if (sales.volume > 20 || sales.revenue > 2000) priority = 'medium';

        return {
          id: product.product_id,
          name: product.product_name,
          category: product.category_name || 'GENERAL',
          posterCost: posterCost,
          realCost: realCost,
          salesVolume: sales.volume,
          revenue: sales.revenue,
          status: recipe ? 'optimized' : 'pending',
          priority: priority,
          ingredients: recipe?.ingredients ? Object.keys(recipe.ingredients) : undefined,
          costSavings: costSavings,
          monthlyImpact: costSavings ? costSavings * sales.volume * 1.3 : undefined // 30% monthly projection
        };
      }) || [];

      // Sort by priority and sales volume
      formattedProducts.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return b.salesVolume - a.salesVolume;
      });

      setProducts(formattedProducts);
      console.log(`✅ Processed ${formattedProducts.length} products with real data`);

    } catch (error) {
      console.error('💥 Error loading restaurant products:', error);
    }
  };

  const loadRecipeStats = async (restaurantId: string): Promise<void> => {
    try {
      console.log('📊 Loading recipe stats for restaurant:', restaurantId);

      // Get all recipes for this restaurant
      const { data: recipes, error: recipesError } = await supabase
        .from('fudi_recipes')
        .select('*')
        .eq('restaurant_id', restaurantId);

      if (recipesError) {
        console.error('Error loading recipe stats:', recipesError);
        return;
      }

      console.log(`📈 Found ${recipes?.length || 0} recipes for stats`);

      if (!recipes || recipes.length === 0) {
        // No recipes yet - set empty stats
        setRecipeStats({
          recipesCreated: 0,
          totalSavings: 0,
          productsOptimized: 0,
          monthlyProjection: 0,
          avgSavingsPercent: 0,
          topCategory: 'Sin datos'
        });
        return;
      }

      // Calculate real stats
      const recipesCreated = recipes.length;
      const totalSavings = recipes.reduce((sum, recipe) => 
        sum + (parseFloat(recipe.cost_savings) || 0), 0
      );
      const productsOptimized = recipes.length; // Each recipe = 1 optimized product
      
      // Calculate monthly projection based on estimated sales
      const monthlyProjection = recipes.reduce((sum, recipe) => 
        sum + (parseFloat(recipe.weekly_savings_potential || 0) * 4.33), 0
      );

      // Calculate average savings percentage
      const recipesWithSavings = recipes.filter(r => r.cost_savings && r.pos_cost);
      const avgSavingsPercent = recipesWithSavings.length > 0 
        ? recipesWithSavings.reduce((sum, recipe) => 
            sum + ((parseFloat(recipe.cost_savings) / parseFloat(recipe.pos_cost)) * 100), 0
          ) / recipesWithSavings.length
        : 0;

      // Find top category by total savings
      const categorySavings: { [key: string]: number } = {};
      recipes.forEach(recipe => {
        const category = recipe.pos_category_name || 'GENERAL';
        categorySavings[category] = (categorySavings[category] || 0) + parseFloat(recipe.cost_savings || 0);
      });
      
      const topCategory = Object.keys(categorySavings).reduce((a, b) => 
        categorySavings[a] > categorySavings[b] ? a : b, 'GENERAL'
      );

      setRecipeStats({
        recipesCreated,
        totalSavings,
        productsOptimized,
        monthlyProjection,
        avgSavingsPercent,
        topCategory
      });

      console.log(`✅ Recipe stats calculated:`, {
        recipesCreated,
        totalSavings,
        monthlyProjection
      });

    } catch (error) {
      console.error('💥 Error loading recipe stats:', error);
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
            
            // 🔥 LOAD RESTAURANT SPECIFIC DATA
            await Promise.all([
              loadRestaurantProducts(decoded.restaurantId),
              loadRecipeStats(decoded.restaurantId)
            ]);
            
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

  const handleCreateRecipe = (productId: string) => {
    setSelectedProduct(productId);
    setIsCreatingRecipe(true);
    setChatStep(0);
    // Simulate chat progression
    setTimeout(() => setChatStep(1), 1500);
    setTimeout(() => setChatStep(2), 3000);
    setTimeout(() => {
      setChatStep(3);
      // In real implementation, this would trigger actual recipe creation
      setIsCreatingRecipe(false);
      // Reload data to show updated status
      if (userData.restaurantId) {
        loadRestaurantProducts(userData.restaurantId);
        loadRecipeStats(userData.restaurantId);
      }
    }, 4500);
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
            📊 Analizando productos • 🍽️ Cargando recetas • 💰 Calculando ahorros
          </p>
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
            <button className="section-button section-button-secondary">
              <Brain />
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
                Verifica que tengas productos registrados en tu sistema POS
              </p>
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
                            handleCreateRecipe(product.id);
                          }}
                        >
                          <ChefHat />
                          Crear Receta
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

        {/* Chat Modal */}
        {isCreatingRecipe && (
          <div className="chat-modal">
            <div className="chat-modal-content">
              <Brain className="chat-brain-icon" />
              <h3 className="chat-title">fudiGPT Creando Receta</h3>
              
              <div className="chat-steps">
                {chatStep === 0 && <p>🔍 Analizando {products.find(p => p.id === selectedProduct)?.name}...</p>}
                {chatStep === 1 && <p>🧠 Identificando ingredientes óptimos...</p>}
                {chatStep === 2 && <p>💰 Calculando costos reales vs POSTER...</p>}
                {chatStep === 3 && <p>✅ ¡Receta optimizada! Ahorro identificado.</p>}
              </div>
              
              <div className="chat-progress">
                <div className="chat-progress-fill" style={{ width: `${(chatStep + 1) * 25}%` }}></div>
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
      <button className="floating-action-button">
        🍽️
      </button>
    </div>
  );
}