// 🧠 services/intelligence/IntelligentQueryRouter.js
// BREAKTHROUGH: Route queries to optimal data sources based on temporal intelligence
// CLAUDE MODEL: Pre-calculated vs Real-time vs Hybrid routing

const { createClient } = require('@supabase/supabase-js');

class IntelligentQueryRouter {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    console.log('🧠 IntelligentQueryRouter initializing...');
    console.log('🎯 MISSION: Route queries to optimal data sources');
    console.log('⚡ CLAUDE MODEL: Pre-calculated intelligence routing');
    console.log('🔄 HYBRID MODE: Real-time + pre-calculated intelligence');
    console.log('✅ IntelligentQueryRouter READY');
  }

  // 🧠 MAIN INTELLIGENCE ROUTING
  async routeProductQuery(restaurantId, temporalIntelligence) {
    console.log('🧠 IntelligentQueryRouter: Analyzing query...');
    console.log('📊 Temporal Intelligence:', temporalIntelligence);
    
    const { timeframe, context } = temporalIntelligence;
    const { type: timeframeType, days } = timeframe;
    
    console.log(`🎯 Query Type: ${timeframeType} (${days} days)`);
    console.log(`📈 Context: ${context.primary}`);
    
    // 🧠 INTELLIGENT ROUTING DECISION
    const routingDecision = this.analyzeRoutingStrategy(timeframeType, days);
    console.log('🚀 Routing Decision:', routingDecision);
    
    // 🎯 EXECUTE OPTIMAL STRATEGY
    switch (routingDecision.strategy) {
      case 'claude_model':
        return await this.executeClaudeModel(restaurantId, temporalIntelligence, routingDecision);
        
      case 'hybrid_analysis':
        return await this.executeHybridAnalysis(restaurantId, temporalIntelligence, routingDecision);
        
      case 'real_time':
        return await this.executeRealTimeAnalysis(restaurantId, temporalIntelligence, routingDecision);
        
      default:
        console.log('🔄 Fallback to real-time analysis');
        return await this.executeRealTimeAnalysis(restaurantId, temporalIntelligence, routingDecision);
    }
  }

  // 🧠 ANALYZE OPTIMAL ROUTING STRATEGY
  analyzeRoutingStrategy(timeframeType, days) {
    console.log('🧠 Analyzing optimal routing strategy...');
    
    // 🎯 CLAUDE MODEL: Pre-calculated data available
    if (timeframeType === 'yesterday') {
      return {
        strategy: 'claude_model',
        reason: 'Pre-calculated intelligence available',
        dataSource: 'intelligent_daily_tables',
        expectedSpeed: '<100ms',
        confidence: 0.95
      };
    }
    
    // 🔄 HYBRID: Today (partial pre-calculated + real-time)
    if (timeframeType === 'today') {
      return {
        strategy: 'hybrid_analysis',
        reason: 'Partial pre-calculated + live data',
        dataSource: 'intelligent_tables + live_transactions',
        expectedSpeed: '<500ms',
        confidence: 0.90
      };
    }
    
    // 📅 CLAUDE MODEL: Specific past dates (if pre-calculated)
    if (days === 1 && timeframeType !== 'today') {
      return {
        strategy: 'claude_model',
        reason: 'Single day - check pre-calculated availability',
        dataSource: 'intelligent_daily_tables',
        expectedSpeed: '<200ms',
        confidence: 0.85
      };
    }
    
    // 📊 REAL-TIME: Multi-day ranges, custom periods
    if (days > 1) {
      return {
        strategy: 'real_time',
        reason: 'Multi-day analysis requires transaction aggregation',
        dataSource: 'live_transactions',
        expectedSpeed: '1-3s',
        confidence: 0.80
      };
    }
    
    // 🔄 DEFAULT: Real-time fallback
    return {
      strategy: 'real_time',
      reason: 'Default analysis for unrecognized patterns',
      dataSource: 'live_transactions',
      expectedSpeed: '2-4s',
      confidence: 0.75
    };
  }

  // ⚡ EXECUTE CLAUDE MODEL (Pre-calculated Intelligence)
  async executeClaudeModel(restaurantId, temporalIntelligence, routingDecision) {
    console.log('⚡ EXECUTING CLAUDE MODEL: Pre-calculated intelligence access');
    console.log('📊 Data Source:', routingDecision.dataSource);
    console.log('⏱️ Expected Speed:', routingDecision.expectedSpeed);
    
    try {
      // 📅 Calculate target date
      const targetDate = this.calculateTargetDate(temporalIntelligence);
      console.log('📅 Target Date:', targetDate);
      
      // 🚀 INSTANT ACCESS: Pre-calculated product intelligence
      const { data: productData, error: productError } = await this.supabase
        .from('intelligent_product_daily')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('date', targetDate)
        .order('total_revenue', { ascending: false });

      // 💳 INSTANT ACCESS: Pre-calculated payment intelligence
      const { data: paymentData, error: paymentError } = await this.supabase
        .from('intelligent_payment_daily')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('date', targetDate)
        .single();

      // ⏰ INSTANT ACCESS: Pre-calculated temporal intelligence
      const { data: temporalData, error: temporalError } = await this.supabase
        .from('intelligent_temporal_daily')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('date', targetDate)
        .single();

      // 🔍 VALIDATE DATA AVAILABILITY
      if (productError || !productData || productData.length === 0) {
        console.log('⚠️ Pre-calculated data not available, falling back to real-time');
        return await this.executeRealTimeAnalysis(restaurantId, temporalIntelligence, {
          strategy: 'real_time_fallback',
          reason: 'Pre-calculated data unavailable'
        });
      }

      console.log('✅ CLAUDE MODEL SUCCESS: Pre-calculated data retrieved');
      console.log(`📊 Products Found: ${productData.length}`);
      console.log(`💰 Total Revenue: $${temporalData?.total_revenue || 'calculating...'}`);
      
      // 🧠 FORMAT CLAUDE MODEL RESPONSE
      return this.formatClaudeModelResponse(
        productData, 
        paymentData, 
        temporalData, 
        temporalIntelligence,
        routingDecision
      );
      
    } catch (error) {
      console.error('🚨 Claude Model execution error:', error);
      console.log('🔄 Falling back to real-time analysis');
      return await this.executeRealTimeAnalysis(restaurantId, temporalIntelligence, {
        strategy: 'real_time_fallback',
        reason: 'Claude Model error'
      });
    }
  }

  // 🔄 EXECUTE HYBRID ANALYSIS (Today: Partial pre-calculated + Real-time)
  async executeHybridAnalysis(restaurantId, temporalIntelligence, routingDecision) {
    console.log('🔄 EXECUTING HYBRID ANALYSIS: Pre-calculated + Real-time');
    
    try {
      // 📊 Get yesterday's pre-calculated data for comparison
      const yesterdayIntelligence = { ...temporalIntelligence };
      yesterdayIntelligence.timeframe = { type: 'yesterday', days: 1 };
      
      const yesterdayData = await this.executeClaudeModel(restaurantId, yesterdayIntelligence, {
        strategy: 'claude_model',
        reason: 'Yesterday comparison data'
      });
      
      // 🔴 Get today's real-time data
      const todayData = await this.executeRealTimeAnalysis(restaurantId, temporalIntelligence, {
        strategy: 'real_time',
        reason: 'Today live data'
      });
      
      // 🧠 COMBINE INTELLIGENCE
      return this.formatHybridResponse(todayData, yesterdayData, temporalIntelligence, routingDecision);
      
    } catch (error) {
      console.error('🚨 Hybrid analysis error:', error);
      return await this.executeRealTimeAnalysis(restaurantId, temporalIntelligence, routingDecision);
    }
  }

  // 🕰️ EXECUTE REAL-TIME ANALYSIS (Live transaction processing)
  async executeRealTimeAnalysis(restaurantId, temporalIntelligence, routingDecision) {
    console.log('🕰️ EXECUTING REAL-TIME ANALYSIS: Live transaction processing');
    console.log('📊 Reason:', routingDecision.reason);
    
    // 🔄 DELEGATE TO EXISTING PRODUCTLOBE LOGIC
    // Import and use existing ProductLobe for real-time analysis
    const ProductLobe = require('../brain/lobes/ProductLobe');
    const productLobe = new ProductLobe(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    // 🧠 Use existing superintelligence analysis
    const result = await productLobe.analyzeWithTemporal(restaurantId, temporalIntelligence);
    
    // 🏷️ TAG AS REAL-TIME ANALYSIS
    if (result.data) {
      result.data.routingInfo = {
        strategy: routingDecision.strategy,
        reason: routingDecision.reason,
        dataSource: 'live_transactions',
        processingMode: 'real_time_superintelligence'
      };
    }
    
    return result;
  }

  // 🧠 FORMAT CLAUDE MODEL RESPONSE (Pre-calculated intelligence)
  formatClaudeModelResponse(productData, paymentData, temporalData, temporalIntelligence, routingDecision) {
    console.log('🧠 Formatting Claude Model response...');
    
    const starProduct = productData[0]; // Already ordered by revenue DESC
    const { timeframe } = temporalIntelligence;
    
    // 🎯 CLAUDE MODEL INSIGHTS
    const insights = [];
    
    // 🌟 STAR PRODUCT WITH COMPLETE INTELLIGENCE
    const starProductRevenue = parseFloat(starProduct.total_revenue) || 0;
    const starProductQuantity = starProduct.total_quantity || 0;
    const starProductName = starProduct.product_name || 'Producto estrella';
    
    if (timeframe.type === 'yesterday') {
      insights.push(`🌟 **${starProductName}** fue tu ESTRELLA ayer con **${starProductQuantity} unidades** ($${starProductRevenue.toFixed(2)})`);
    } else {
      insights.push(`🌟 **${starProductName}** domina con **${starProductQuantity} unidades** ($${starProductRevenue.toFixed(2)})`);
    }
    
    // 🧠 INTELLIGENT METRICS (PRE-CALCULATED)
    const velocityScore = starProduct.velocity_score || 0;
    const profitMargin = starProduct.profit_margin || 0;
    const peakHour = starProduct.peak_hour || 'N/A';
    
    insights.push(`🧠 **Intelligence:** Velocity ${velocityScore}/100 | Margin ${profitMargin.toFixed(1)}% | Peak: ${peakHour}:00`);
    
    // 💰 REVENUE INTELLIGENCE (PRE-CALCULATED)
    const totalRevenue = parseFloat(temporalData?.total_revenue) || 0;
    const totalTransactions = temporalData?.total_transactions || 0;
    const peakHourRevenue = parseFloat(temporalData?.peak_hour_revenue) || 0;
    const temporalPeakHour = temporalData?.peak_hour || 'N/A';
    
    insights.push(`💰 **Revenue Total:** $${totalRevenue.toFixed(2)} en ${totalTransactions} transacciones`);
    insights.push(`⏰ **Peak Intelligence:** ${temporalPeakHour}:00 horas con $${peakHourRevenue.toFixed(2)} en revenue`);
    
    // 🤖 CLAUDE MODEL SIGNATURE
    insights.push(`⚡ **Claude Model:** Respuesta instantánea con inteligencia pre-calculada`);
    
    // 📊 TOP PRODUCTS (PRE-CALCULATED)
    const topProducts = productData.slice(0, 5).map((product, index) => ({
      rank: index + 1,
      id: product.product_id,
      name: product.product_name,
      quantity: product.total_quantity,
      revenue: parseFloat(product.total_revenue),
      avgPrice: parseFloat(product.avg_price) || 0,
      profitMargin: product.profit_margin || 0,
      velocityScore: product.velocity_score || 0,
      peakHour: product.peak_hour || 'N/A'
    }));
    
    return {
      success: true,
      insights: insights,
      data: {
        topProducts: topProducts,
        intelligence: {
          processingMode: 'claude_model',
          dataSource: 'pre_calculated_intelligence',
          confidence: routingDecision.confidence,
          processingTime: routingDecision.expectedSpeed
        },
        routing: {
          strategy: routingDecision.strategy,
          reason: routingDecision.reason,
          performance: 'optimal'
        },
        summary: {
          totalProducts: productData.length,
          totalRevenue: totalRevenue,
          totalTransactions: totalTransactions,
          processingMode: 'CLAUDE_MODEL_INTELLIGENCE'
        }
      }
    };
  }

  // 🔄 FORMAT HYBRID RESPONSE
  formatHybridResponse(todayData, yesterdayData, temporalIntelligence, routingDecision) {
    console.log('🔄 Formatting Hybrid response...');
    
    // Combine today's real-time with yesterday's pre-calculated intelligence
    const insights = [
      ...todayData.insights,
      '📊 **Comparación:** Datos de hoy (tiempo real) vs ayer (pre-calculado)',
      '🔄 **Modo Híbrido:** Máxima precisión con contexto histórico'
    ];
    
    return {
      success: true,
      insights: insights,
      data: {
        ...todayData.data,
        comparison: yesterdayData.data,
        intelligence: {
          processingMode: 'hybrid_analysis',
          todaySource: 'real_time',
          yesterdaySource: 'pre_calculated',
          confidence: routingDecision.confidence
        },
        routing: {
          strategy: routingDecision.strategy,
          reason: routingDecision.reason,
          performance: 'hybrid_optimal'
        }
      }
    };
  }

  // 📅 CALCULATE TARGET DATE FOR PRE-CALCULATED DATA
  calculateTargetDate(temporalIntelligence) {
    const { timeframe } = temporalIntelligence;
    const { type, days } = timeframe;
    
    if (type === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString().split('T')[0];
    }
    
    if (type === 'today') {
      return new Date().toISOString().split('T')[0];
    }
    
    // For custom dates, calculate based on days back
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - (days - 1));
    return targetDate.toISOString().split('T')[0];
  }
}

module.exports = { IntelligentQueryRouter };