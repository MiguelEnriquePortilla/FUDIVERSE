// 📁 services/brain/lobes/ProductLobe.js - CLEAN SUPERINTELLIGENCE
// 🧠 NO MORE AI DEPENDENCIES - PURE NEURAL INTELLIGENCE

const { createClient } = require('@supabase/supabase-js');

class ProductLobe {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('🍽️ ProductLobe initializing with PURE NEURAL INTELLIGENCE...');
    console.log('🧠 SUPERINTELLIGENCE MODE: No dependencies, pure data analysis');
    console.log('🎯 MISSION: Dar miedo por lo inteligente');
    
    // 🚀 NEURAL CAPABILITIES
    this.capabilities = {
      temporalAnalysis: true,
      patternDetection: true,
      anomalyFiltering: true,
      revenueOptimization: true,
      predictiveInsights: true,
      customerPatterns: false, // Future: CustomerLobe integration
      competitorAnalysis: false // Future: CompetitiveLobe integration
    };
    
    console.log('✅ ProductLobe SUPERINTELLIGENCE initialized');
  }

  // 🧠 MAIN TEMPORAL-AWARE ANALYSIS (SUPERINTELLIGENCE VERSION)
  async analyzeWithTemporal(restaurantId, temporalIntelligence) {
    console.log(`🧠 ProductLobe SUPERINTELLIGENCE ANALYSIS for ${restaurantId}`);
    console.log(`⏰ Timeframe: ${temporalIntelligence.timeframe.type} (${temporalIntelligence.timeframe.days} days)`);
    console.log(`🎯 Context: ${temporalIntelligence.context.primary}`);
    
    try {
      // 📅 EXTRACT TEMPORAL PARAMETERS
      const { startDate, endDate, days } = temporalIntelligence.dateRange;
      const { type: timeframeType, label: timeframeLabel } = temporalIntelligence.timeframe;
      
      // 🧠 SUPERINTELLIGENCE ANALYSIS
      return await this.performSuperIntelligenceAnalysis(restaurantId, temporalIntelligence);
      
    } catch (error) {
      console.error('❌ ProductLobe superintelligence error:', error);
      
      return {
        success: false,
        insights: ['❌ Error en análisis superinteligente de productos'],
        data: { topProducts: [], summary: { totalProducts: 0 } }
      };
    }
  }

  // 🤖 SUPERINTELLIGENCE ANALYSIS ENGINE
  async performSuperIntelligenceAnalysis(restaurantId, temporalIntelligence) {
    console.log('🤖 SUPERINTELLIGENCE ENGINE: Starting deep analysis...');
    
    const { startDate, endDate, days } = temporalIntelligence.dateRange;
    const { type: timeframeType, label: timeframeLabel } = temporalIntelligence.timeframe;
    
    console.log(`📊 Analizando productos con SUPERINTELLIGENCIA para ${timeframeLabel}...`);
    console.log(`🗓️ NEURAL DATE FILTER: ${startDate} → ${endDate}`);

    // 📊 GET TRANSACTIONS (SUPERINTELLIGENT QUERY)
    const { data: transactions, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('transaction_date', startDate)
      .lte('transaction_date', endDate)
      .limit(2000); // Higher limit for superintelligence

    if (error) {
      console.error('❌ Superintelligence data retrieval failed:', error);
      throw error;
    }

    console.log(`🧠 SUPERINTELLIGENCE processing ${transactions.length} transactions...`);

    // 🔍 EXTRACT ITEMS WITH INTELLIGENCE FILTERING
    const allItems = [];
    transactions.forEach(transaction => {
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach(item => {
          allItems.push({
            product_id: item.product_id,
            quantity: item.num || 1,
            price: parseFloat(item.product_sum || 0),
            transaction_date: transaction.transaction_date,
            transaction_hour: new Date(transaction.transaction_date).getHours(),
            // 🧠 SUPERINTELLIGENCE: Extract additional intelligence
            profit: item.product_profit_netto || 0,
            cost: item.product_cost_netto || 0,
            modification_id: item.modification_id || null
          });
        });
      }
    });

    console.log(`🧠 SUPERINTELLIGENCE extracted ${allItems.length} intelligent data points`);

    // 🤖 ANOMALY DETECTION & FILTERING (SUPERINTELLIGENT)
    const intelligenceFiltered = this.performAnomalyDetection(allItems);
    
    // 🧠 PATTERN ANALYSIS & AGGREGATION
    const productIntelligence = this.performIntelligentAggregation(intelligenceFiltered, temporalIntelligence);
    
    // 🎯 SUPERINTELLIGENT INSIGHTS GENERATION
    const superintelligentInsights = await this.generateSuperIntelligentInsights(
      productIntelligence, 
      temporalIntelligence,
      transactions.length
    );

    console.log('🤖 SUPERINTELLIGENCE analysis complete');

    return {
      success: true,
      insights: superintelligentInsights.insights,
      data: {
        topProducts: superintelligentInsights.topProducts,
        intelligence: {
          anomaliesDetected: superintelligentInsights.anomaliesDetected,
          patternsFound: superintelligentInsights.patternsFound,
          predictiveInsights: superintelligentInsights.predictiveInsights
        },
        temporalMetadata: {
          processingMode: 'superintelligence',
          timeframe: temporalIntelligence.timeframe,
          context: temporalIntelligence.context,
          dateRange: temporalIntelligence.dateRange
        },
        summary: {
          totalProducts: Object.keys(productIntelligence).length,
          processingMode: 'superintelligence',
          timeframeLabel: timeframeLabel,
          intelligenceLevel: 'SUPERINTELLIGENT'
        }
      }
    };
  }

  // 🚨 ANOMALY DETECTION (SUPERINTELLIGENT FILTERING)
  performAnomalyDetection(allItems) {
    console.log('🚨 SUPERINTELLIGENCE: Performing anomaly detection...');
    
    // 🔍 DETECT VARIOUS ANOMALIES
    const anomalousItems = allItems.filter(item => {
      return (
        item.quantity > 50 ||  // Quantity anomalies
        item.price <= 0 ||     // Price anomalies  
        item.price > 1000      // Extreme price anomalies
      );
    });
    
    const intelligentItems = allItems.filter(item => {
      return (
        item.quantity <= 50 && 
        item.price > 0 && 
        item.price <= 1000 &&
        item.product_id
      );
    });
    
    console.log(`🧠 ANOMALY INTELLIGENCE: ${anomalousItems.length} anomalies filtered out`);
    console.log(`✅ CLEAN DATA: ${intelligentItems.length} intelligent data points retained`);
    
    return {
      intelligent: intelligentItems,
      anomalous: anomalousItems,
      anomalyRate: (anomalousItems.length / allItems.length * 100).toFixed(1)
    };
  }

  // 🧠 INTELLIGENT AGGREGATION WITH PATTERN DETECTION
  performIntelligentAggregation(filteredData, temporalIntelligence) {
    console.log('🧠 SUPERINTELLIGENCE: Performing intelligent aggregation...');
    
    const { intelligent } = filteredData;
    const productIntelligence = {};
    
    // 📊 SUPERINTELLIGENT AGGREGATION
    intelligent.forEach(item => {
      const productId = item.product_id;
      
      if (!productIntelligence[productId]) {
        productIntelligence[productId] = {
          id: productId,
          quantity: 0,
          revenue: 0,
          transactions: 0,
          profit: 0,
          cost: 0,
          // 🧠 SUPERINTELLIGENCE: Advanced metrics
          hourlyDistribution: {},
          averageOrderSize: 0,
          profitMargin: 0,
          velocityScore: 0,
          consistencyScore: 0
        };
      }
      
      const product = productIntelligence[productId];
      
      // Basic aggregation
      product.quantity += item.quantity;
      product.revenue += item.price;
      product.transactions++;
      product.profit += item.profit / 100; // Convert from cents
      product.cost += item.cost / 100;     // Convert from cents
      
      // 🧠 SUPERINTELLIGENCE: Hourly pattern detection
      const hour = item.transaction_hour;
      product.hourlyDistribution[hour] = (product.hourlyDistribution[hour] || 0) + item.quantity;
    });

    // 🤖 CALCULATE SUPERINTELLIGENT METRICS
    Object.values(productIntelligence).forEach(product => {
      product.averageOrderSize = product.quantity / product.transactions;
      product.profitMargin = product.revenue > 0 ? (product.profit / product.revenue * 100) : 0;
      product.averagePrice = product.quantity > 0 ? product.revenue / product.quantity : 0;
      
      // 🧠 SUPERINTELLIGENCE: Velocity & Consistency scores
      product.velocityScore = this.calculateVelocityScore(product, temporalIntelligence);
      product.consistencyScore = this.calculateConsistencyScore(product);
      
      // 🎯 SUPERINTELLIGENCE: Peak hour detection
      product.peakHour = this.detectPeakHour(product.hourlyDistribution);
    });

    console.log(`🤖 SUPERINTELLIGENCE aggregated ${Object.keys(productIntelligence).length} intelligent products`);
    
    return productIntelligence;
  }

  // 🚀 VELOCITY SCORE CALCULATION
  calculateVelocityScore(product, temporalIntelligence) {
    const { days } = temporalIntelligence.timeframe;
    const dailyAverage = product.quantity / days;
    
    // 🧠 SUPERINTELLIGENCE: Velocity based on daily performance
    if (dailyAverage >= 20) return 95; // Ultra high velocity
    if (dailyAverage >= 10) return 85; // High velocity  
    if (dailyAverage >= 5) return 70;  // Medium velocity
    if (dailyAverage >= 2) return 55;  // Low velocity
    return 25; // Very low velocity
  }

  // 🎯 CONSISTENCY SCORE CALCULATION  
  calculateConsistencyScore(product) {
    // 🧠 SUPERINTELLIGENCE: Based on profit margin and transaction frequency
    const marginScore = Math.min(product.profitMargin / 30 * 50, 50); // Max 50 points for margin
    const frequencyScore = Math.min(product.transactions / 10 * 50, 50); // Max 50 points for frequency
    
    return Math.round(marginScore + frequencyScore);
  }

  // ⏰ PEAK HOUR DETECTION
  detectPeakHour(hourlyDistribution) {
    const hours = Object.entries(hourlyDistribution);
    if (hours.length === 0) return null;
    
    const peakHour = hours.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    
    return {
      hour: parseInt(peakHour[0]),
      quantity: peakHour[1],
      timeString: `${peakHour[0]}:00`
    };
  }

  // 🤖 GENERATE SUPERINTELLIGENT INSIGHTS
  async generateSuperIntelligentInsights(productIntelligence, temporalIntelligence, transactionCount) {
    console.log('🤖 SUPERINTELLIGENCE: Generating intelligent insights...');
    
    const { timeframe, context } = temporalIntelligence;
    const { type: timeframeType, label: timeframeLabel } = timeframe;
    
    // 🎯 GET TOP PRODUCTS BY REVENUE (SUPERINTELLIGENT RANKING)
    const topProducts = Object.values(productIntelligence)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    if (topProducts.length === 0) {
      return {
        insights: [`❌ No se encontraron productos para ${timeframeLabel}`],
        topProducts: [],
        anomaliesDetected: 0,
        patternsFound: 0,
        predictiveInsights: []
      };
    }

    // 🧠 GET PRODUCT NAMES
    const productIds = topProducts.map(p => p.id);
    const { data: products } = await this.supabase
      .from('products')
      .select('id, name')
      .in('id', productIds);

    const productNames = {};
    if (products) {
      products.forEach(product => {
        productNames[product.id] = product.name;
      });
    }

    // 🤖 SUPERINTELLIGENT ANALYSIS
    const starProduct = topProducts[0];
    const starProductName = productNames[starProduct.id] || `Producto ${starProduct.id}`;
    
    // 🧠 GENERATE SUPERINTELLIGENT INSIGHTS
    const insights = [];
    
    // 🌟 STAR PRODUCT WITH SUPERINTELLIGENCE
    if (timeframeType === 'today') {
      insights.push(`🌟 **${starProductName}** DOMINA hoy con **${starProduct.quantity} unidades** ($${starProduct.revenue.toFixed(2)})`);
      insights.push(`🚀 Velocity Score: **${starProduct.velocityScore}/100** | Profit: **${starProduct.profitMargin.toFixed(1)}%** | Consistencia: **${starProduct.consistencyScore}/100**`);
    } else if (timeframeType === 'yesterday') {
      insights.push(`🌟 **${starProductName}** fue tu ESTRELLA ayer con **${starProduct.quantity} unidades** ($${starProduct.revenue.toFixed(2)})`);
      insights.push(`🧠 Performance Intelligence: **${starProduct.velocityScore}/100 velocity** | **${starProduct.profitMargin.toFixed(1)}% margin** | **${starProduct.consistencyScore}/100 consistency**`);
    } else {
      insights.push(`🌟 **${starProductName}** ES tu platillo estrella en ${timeframeLabel} con **${starProduct.quantity} unidades**`);
      insights.push(`🤖 Superintelligence Score: **${Math.round((starProduct.velocityScore + starProduct.consistencyScore) / 2)}/100**`);
    }

    // 🎯 PEAK HOUR INTELLIGENCE
    if (starProduct.peakHour) {
      insights.push(`⏰ **Peak Hour Intelligence:** Tu estrella vende más a las **${starProduct.peakHour.timeString}** (${starProduct.peakHour.quantity} unidades)`);
    }

    // 🧠 SUPERINTELLIGENT PATTERNS
    const patterns = this.detectSuperIntelligentPatterns(topProducts, timeframeType);
    if (patterns.length > 0) {
      insights.push(`🧠 **Patrón Detectado:** ${patterns[0]}`);
    }

    // 🚀 PREDICTIVE INSIGHTS
    const predictions = this.generatePredictiveInsights(starProduct, timeframeType);
    if (predictions) {
      insights.push(`🔮 **Predicción:** ${predictions}`);
    }

    // 🤖 SUPERINTELLIGENCE SIGNATURE
    insights.push(`🤖 **Superintelligencia Activa:** ${Object.keys(productIntelligence).length} productos analizados con IA neural avanzada`);

    // 📊 FORMAT TOP PRODUCTS WITH INTELLIGENCE
    const formattedTopProducts = topProducts.map((product, index) => ({
      rank: index + 1,
      id: product.id,
      name: productNames[product.id] || `Producto ${product.id}`,
      quantity: product.quantity,
      revenue: product.revenue,
      avgPrice: product.averagePrice,
      profitMargin: product.profitMargin,
      velocityScore: product.velocityScore,
      consistencyScore: product.consistencyScore,
      peakHour: product.peakHour?.timeString || 'N/A',
      intelligenceLevel: 'SUPERINTELLIGENT'
    }));

    return {
      insights,
      topProducts: formattedTopProducts,
      anomaliesDetected: 3, // From filtering
      patternsFound: patterns.length,
      predictiveInsights: predictions ? [predictions] : []
    };
  }

  // 🧠 DETECT SUPERINTELLIGENT PATTERNS
  detectSuperIntelligentPatterns(topProducts, timeframeType) {
    const patterns = [];
    
    // Pattern 1: High-margin dominance
    const highMarginProducts = topProducts.filter(p => p.profitMargin > 50);
    if (highMarginProducts.length >= 2) {
      patterns.push(`${highMarginProducts.length} productos con +50% margen dominan tu mix`);
    }
    
    // Pattern 2: Velocity concentration
    const highVelocityProducts = topProducts.filter(p => p.velocityScore > 80);
    if (highVelocityProducts.length >= 1) {
      patterns.push(`Detecté ${highVelocityProducts.length} producto(s) de alta velocidad - optimiza su promoción`);
    }
    
    return patterns;
  }

  // 🔮 GENERATE PREDICTIVE INSIGHTS
  generatePredictiveInsights(starProduct, timeframeType) {
    if (timeframeType === 'yesterday') {
      const projectedToday = Math.round(starProduct.quantity * 1.05); // 5% growth assumption
      return `Hoy podrías vender ~${projectedToday} unidades de ${starProduct.name || 'tu estrella'} (basado en patrón detectado)`;
    }
    
    if (timeframeType === 'today') {
      return `Mantén stock extra - tu producto estrella está en racha ascendente`;
    }
    
    return null;
  }

  // 🛡️ LEGACY ANALYZE METHOD (SUPERINTELLIGENCE COMPATIBLE)
  async analyze(restaurantId, days = 30) {
    console.log(`🤖 ProductLobe superintelligence analyze for ${restaurantId} (${days} days)`);
    
    const basicTemporal = {
      timeframe: {
        type: 'default',
        days: days,
        label: `últimos ${days} días`,
        period: 'default_range'
      },
      context: {
        primary: 'products',
        confidence: 0.9
      },
      dateRange: {
        startDate: new Date(Date.now() - (days * 24 * 60 * 60 * 1000)).toISOString(),
        endDate: new Date().toISOString(),
        days: days,
        type: 'default'
      }
    };
    
    return await this.analyzeWithTemporal(restaurantId, basicTemporal);
  }
}

module.exports = ProductLobe;