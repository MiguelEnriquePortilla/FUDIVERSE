// 🧠 services/intelligence/UniversalIntelligenceProcessor.js
// CLAUDE MODEL: Pre-process ALL intelligence for instant access
// SCALABLE: 1M+ restaurants parallel processing

const { createClient } = require('@supabase/supabase-js');

class UniversalIntelligenceProcessor {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    this.version = 'claude_model_v1.0';
    
    console.log('🧠 UniversalIntelligenceProcessor initializing...');
    console.log('📊 MODEL: Claude-inspired pre-processing architecture');
    console.log('🎯 MISSION: Pre-calculate ALL intelligence for instant access');
    console.log('🌍 SCALABILITY: 1M+ restaurants ready');
  }

  // 🌍 MAIN ORCHESTRATOR - Process ALL restaurants (scalable to 1M+)
  async processAllRestaurants() {
    console.log('🧠 UNIVERSAL INTELLIGENCE: Starting global processing...');
    
    const restaurants = await this.getActiveRestaurants();
    console.log(`🏪 Processing ${restaurants.length} restaurants in parallel...`);
    
    // 🚀 SCALABLE BATCH PROCESSING
    const batchSize = 100; // Adjust based on server capacity
    const batches = this.createBatches(restaurants, batchSize);
    
    console.log(`📦 Created ${batches.length} batches for parallel processing`);
    
    // Process batches in parallel (scalable)
    const results = await Promise.allSettled(
      batches.map((batch, index) => 
        this.processBatch(batch, index)
      )
    );
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    console.log(`✅ UNIVERSAL PROCESSING COMPLETE: ${successful} successful, ${failed} failed`);
    
    return {
      totalRestaurants: restaurants.length,
      successful,
      failed,
      processingTime: Date.now()
    };
  }

  // 📦 BATCH PROCESSING (Scalable)
  async processBatch(restaurantBatch, batchIndex) {
    console.log(`📦 Processing batch ${batchIndex + 1} with ${restaurantBatch.length} restaurants...`);
    
    // Process yesterday's data (most recent complete day)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    
    // Process all restaurants in batch in parallel
    const batchResults = await Promise.allSettled(
      restaurantBatch.map(restaurant => 
        this.processRestaurantDaily(restaurant.id, dateStr)
      )
    );
    
    const batchSuccessful = batchResults.filter(r => r.status === 'fulfilled').length;
    console.log(`✅ Batch ${batchIndex + 1} complete: ${batchSuccessful}/${restaurantBatch.length} successful`);
    
    return batchResults;
  }

  // 🏪 PROCESS SINGLE RESTAURANT (All intelligence types)
  async processRestaurantDaily(restaurantId, date) {
    console.log(`🏪 Processing daily intelligence for ${restaurantId} on ${date}`);
    
    try {
      // Set restaurant context for RLS
      await this.supabase.rpc('set_config', {
        setting_name: 'app.restaurant_id',
        setting_value: restaurantId
      });
      
      // 📊 GET RAW DATA for the date
      const rawData = await this.getRawDataForDate(restaurantId, date);
      
      if (!rawData.transactions || rawData.transactions.length === 0) {
        console.log(`⚠️ No data found for ${restaurantId} on ${date}`);
        return { restaurantId, date, status: 'no_data' };
      }
      
      // 🧠 PROCESS ALL INTELLIGENCE TYPES IN PARALLEL (like Claude training)
      const processingResults = await Promise.allSettled([
        this.processProductIntelligence(restaurantId, date, rawData),
        this.processPaymentIntelligence(restaurantId, date, rawData),
        this.processTemporalIntelligence(restaurantId, date, rawData)
      ]);
      
      console.log(`✅ Intelligence processing complete for ${restaurantId}`);
      
      return {
        restaurantId,
        date,
        status: 'success',
        productIntelligence: processingResults[0].status === 'fulfilled',
        paymentIntelligence: processingResults[1].status === 'fulfilled',
        temporalIntelligence: processingResults[2].status === 'fulfilled'
      };
      
    } catch (error) {
      console.error(`❌ Error processing ${restaurantId}:`, error.message);
      return { restaurantId, date, status: 'error', error: error.message };
    }
  }

  // 📊 RAW DATA EXTRACTION
  async getRawDataForDate(restaurantId, date) {
    const startOfDay = `${date}T00:00:00.000Z`;
    const endOfDay = `${date}T23:59:59.999Z`;
    
    // Get all transactions for the date
    const { data: transactions, error } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('transaction_date', startOfDay)
      .lte('transaction_date', endOfDay)
      .limit(5000); // Higher limit for processing
    
    if (error) {
      throw new Error(`Data retrieval failed: ${error.message}`);
    }
    
    return { transactions };
  }

  // 🍽️ PRODUCT INTELLIGENCE PROCESSING
  async processProductIntelligence(restaurantId, date, rawData) {
    console.log(`🍽️ Processing product intelligence for ${restaurantId}...`);
    
    const { transactions } = rawData;
    
    // Extract and process items
    const allItems = [];
    transactions.forEach(transaction => {
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach(item => {
          allItems.push({
            product_id: item.product_id,
            quantity: item.num || 1,
            price: parseFloat(item.product_sum || 0),
            transaction_hour: new Date(transaction.transaction_date).getHours(),
            profit: (item.product_profit_netto || 0) / 100,
            cost: (item.product_cost_netto || 0) / 100
          });
        });
      }
    });
    
    // Filter intelligent data (remove anomalies but keep valid high quantities)
    const intelligentItems = allItems.filter(item => 
      item.product_id && 
      item.price > 0 && 
      item.price <= 2000 && // Reasonable price limit
      item.quantity > 0 &&
      item.quantity <= 1000 // Allow higher quantities but filter extremes
    );
    
    console.log(`📊 Product processing: ${intelligentItems.length} intelligent items from ${allItems.length} total`);
    
    // Aggregate by product
    const productStats = {};
    intelligentItems.forEach(item => {
      const productId = item.product_id;
      
      if (!productStats[productId]) {
        productStats[productId] = {
          product_id: productId,
          total_quantity: 0,
          total_revenue: 0,
          total_transactions: 0,
          total_profit: 0,
          total_cost: 0,
          hourly_distribution: {}
        };
      }
      
      const stats = productStats[productId];
      stats.total_quantity += item.quantity;
      stats.total_revenue += item.price;
      stats.total_transactions++;
      stats.total_profit += item.profit;
      stats.total_cost += item.cost;
      
      // Hourly distribution
      const hour = item.transaction_hour;
      stats.hourly_distribution[hour] = (stats.hourly_distribution[hour] || 0) + item.quantity;
    });
    
    // Get product names
    const productIds = Object.keys(productStats).map(id => parseInt(id));
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
    
    // Calculate intelligence metrics and store
    for (const [productId, stats] of Object.entries(productStats)) {
      const productName = productNames[productId] || `Product ${productId}`;
      const avgPrice = stats.total_quantity > 0 ? stats.total_revenue / stats.total_quantity : 0;
      const profitMargin = stats.total_revenue > 0 ? (stats.total_profit / stats.total_revenue * 100) : 0;
      
      // Calculate velocity score (0-100 based on daily performance)
      const velocityScore = Math.min(Math.round(stats.total_quantity / 5 * 20), 100);
      
      // Calculate consistency score (based on transaction frequency and margin)
      const consistencyScore = Math.min(Math.round(
        (Math.min(stats.total_transactions / 10, 1) * 50) + 
        (Math.min(profitMargin / 30, 1) * 50)
      ), 100);
      
      // Determine market position
      let marketPosition = 'weak';
      if (stats.total_revenue >= 5000) marketPosition = 'dominant';
      else if (stats.total_revenue >= 2000) marketPosition = 'strong';
      else if (stats.total_revenue >= 500) marketPosition = 'moderate';
      
      // Find peak hour
      const peakHour = this.findPeakHour(stats.hourly_distribution);
      
      // Store in intelligent_product_daily
      await this.supabase
        .from('intelligent_product_daily')
        .upsert({
          restaurant_id: restaurantId,
          date: date,
          product_id: parseInt(productId),
          product_name: productName,
          total_quantity: stats.total_quantity,
          total_revenue: Number(stats.total_revenue.toFixed(2)),
          total_transactions: stats.total_transactions,
          avg_price: Number(avgPrice.toFixed(2)),
          profit_margin: Number(profitMargin.toFixed(2)),
          velocity_score: velocityScore,
          consistency_score: consistencyScore,
          market_position: marketPosition,
          peak_hour: peakHour?.hour || null,
          peak_quantity: peakHour?.quantity || null,
          hourly_distribution: stats.hourly_distribution,
          ai_insights: {
            daily_performance: `Generated $${stats.total_revenue.toFixed(2)} from ${stats.total_quantity} units`,
            efficiency: `${stats.total_transactions} transactions with ${avgPrice.toFixed(2)} avg price`,
            profitability: `${profitMargin.toFixed(1)}% profit margin`
          },
          patterns_detected: this.detectProductPatterns(stats),
          recommendations: this.generateProductRecommendations(stats, marketPosition),
          processing_timestamp: new Date().toISOString(),
          confidence_score: this.calculateConfidenceScore(stats),
          data_quality_score: 1.0
        }, {
          onConflict: 'restaurant_id,date,product_id'
        });
    }
    
    console.log(`✅ Product intelligence: ${Object.keys(productStats).length} products processed`);
    return { productsProcessed: Object.keys(productStats).length };
  }

  // 💳 PAYMENT INTELLIGENCE PROCESSING
  async processPaymentIntelligence(restaurantId, date, rawData) {
    console.log(`💳 Processing payment intelligence for ${restaurantId}...`);
    
    const { transactions } = rawData;
    
    // Analyze payment methods
    const paymentStats = {
      total_transactions: transactions.length,
      total_revenue: 0,
      cash: { transactions: 0, revenue: 0 },
      card: { transactions: 0, revenue: 0 },
      digital: { transactions: 0, revenue: 0 },
      hourly_distribution: {}
    };
    
    transactions.forEach(transaction => {
      const revenue = parseFloat(transaction.total_amount || 0);
      const hour = new Date(transaction.transaction_date).getHours();
      const paymentMethod = transaction.payment_method || 'cash';
      
      paymentStats.total_revenue += revenue;
      
      // Categorize payment method
      if (paymentMethod === 'cash') {
        paymentStats.cash.transactions++;
        paymentStats.cash.revenue += revenue;
      } else if (paymentMethod === 'card') {
        paymentStats.card.transactions++;
        paymentStats.card.revenue += revenue;
      } else {
        paymentStats.digital.transactions++;
        paymentStats.digital.revenue += revenue;
      }
      
      // Hourly distribution
      paymentStats.hourly_distribution[hour] = paymentStats.hourly_distribution[hour] || 
        { transactions: 0, revenue: 0 };
      paymentStats.hourly_distribution[hour].transactions++;
      paymentStats.hourly_distribution[hour].revenue += revenue;
    });
    
    // Calculate percentages and insights
    const totalTransactions = paymentStats.total_transactions;
    const totalRevenue = paymentStats.total_revenue;
    
    const cashPercentage = totalTransactions > 0 ? 
      (paymentStats.cash.transactions / totalTransactions * 100) : 0;
    const cardPercentage = totalTransactions > 0 ? 
      (paymentStats.card.transactions / totalTransactions * 100) : 0;
    const digitalPercentage = totalTransactions > 0 ? 
      (paymentStats.digital.transactions / totalTransactions * 100) : 0;
    
    // Determine dominant method
    let dominantMethod = 'cash';
    if (paymentStats.card.transactions > paymentStats.cash.transactions && 
        paymentStats.card.transactions > paymentStats.digital.transactions) {
      dominantMethod = 'card';
    } else if (paymentStats.digital.transactions > paymentStats.cash.transactions && 
               paymentStats.digital.transactions > paymentStats.card.transactions) {
      dominantMethod = 'digital';
    }
    
    // Find peak payment hour
    const peakPaymentHour = this.findPeakHour(paymentStats.hourly_distribution, 'revenue');
    
    // Store in intelligent_payment_daily
    await this.supabase
      .from('intelligent_payment_daily')
      .upsert({
        restaurant_id: restaurantId,
        date: date,
        total_transactions: totalTransactions,
        total_revenue: Number(totalRevenue.toFixed(2)),
        
        cash_transactions: paymentStats.cash.transactions,
        cash_revenue: Number(paymentStats.cash.revenue.toFixed(2)),
        cash_percentage: Number(cashPercentage.toFixed(2)),
        cash_avg_ticket: paymentStats.cash.transactions > 0 ? 
          Number((paymentStats.cash.revenue / paymentStats.cash.transactions).toFixed(2)) : 0,
        
        card_transactions: paymentStats.card.transactions,
        card_revenue: Number(paymentStats.card.revenue.toFixed(2)),
        card_percentage: Number(cardPercentage.toFixed(2)),
        card_avg_ticket: paymentStats.card.transactions > 0 ? 
          Number((paymentStats.card.revenue / paymentStats.card.transactions).toFixed(2)) : 0,
        
        digital_transactions: paymentStats.digital.transactions,
        digital_revenue: Number(paymentStats.digital.revenue.toFixed(2)),
        digital_percentage: Number(digitalPercentage.toFixed(2)),
        digital_avg_ticket: paymentStats.digital.transactions > 0 ? 
          Number((paymentStats.digital.revenue / paymentStats.digital.transactions).toFixed(2)) : 0,
        
        peak_payment_hour: peakPaymentHour?.hour || null,
        peak_payment_method: dominantMethod,
        hourly_distribution: paymentStats.hourly_distribution,
        
        dominant_method: dominantMethod,
        payment_insights: {
          dominant_method_percentage: Math.max(cashPercentage, cardPercentage, digitalPercentage).toFixed(1),
          payment_diversity: `${cashPercentage.toFixed(1)}% cash, ${cardPercentage.toFixed(1)}% card, ${digitalPercentage.toFixed(1)}% digital`,
          peak_performance: `Peak at ${peakPaymentHour?.hour || 'N/A'}:00 with $${peakPaymentHour?.revenue?.toFixed(2) || '0'}`
        },
        optimization_recommendations: this.generatePaymentRecommendations(paymentStats, dominantMethod),
        revenue_optimization_score: this.calculatePaymentOptimizationScore(paymentStats),
        processing_timestamp: new Date().toISOString(),
        confidence_score: 1.0
      }, {
        onConflict: 'restaurant_id,date'
      });
    
    console.log(`✅ Payment intelligence: ${totalTransactions} transactions, $${totalRevenue.toFixed(2)} revenue`);
    return { transactionsProcessed: totalTransactions, totalRevenue };
  }

  // ⏰ TEMPORAL INTELLIGENCE PROCESSING  
  async processTemporalIntelligence(restaurantId, date, rawData) {
    console.log(`⏰ Processing temporal intelligence for ${restaurantId}...`);
    
    const { transactions } = rawData;
    
    // Initialize temporal analysis
    const temporalStats = {
      total_transactions: transactions.length,
      total_revenue: 0,
      total_customers: 0,
      hourly_revenue: {},
      hourly_transactions: {},
      hourly_customers: {},
      time_segments: {
        morning: { revenue: 0, transactions: 0 }, // 6-12
        afternoon: { revenue: 0, transactions: 0 }, // 12-18
        evening: { revenue: 0, transactions: 0 }, // 18-24
        night: { revenue: 0, transactions: 0 } // 0-6
      }
    };
    
    // Process each transaction
    transactions.forEach(transaction => {
      const revenue = parseFloat(transaction.total_amount || 0);
      const customers = parseInt(transaction.guest_count || 1);
      const hour = new Date(transaction.transaction_date).getHours();
      
      temporalStats.total_revenue += revenue;
      temporalStats.total_customers += customers;
      
      // Hourly distribution
      temporalStats.hourly_revenue[hour] = (temporalStats.hourly_revenue[hour] || 0) + revenue;
      temporalStats.hourly_transactions[hour] = (temporalStats.hourly_transactions[hour] || 0) + 1;
      temporalStats.hourly_customers[hour] = (temporalStats.hourly_customers[hour] || 0) + customers;
      
      // Time segments
      if (hour >= 6 && hour < 12) {
        temporalStats.time_segments.morning.revenue += revenue;
        temporalStats.time_segments.morning.transactions++;
      } else if (hour >= 12 && hour < 18) {
        temporalStats.time_segments.afternoon.revenue += revenue;
        temporalStats.time_segments.afternoon.transactions++;
      } else if (hour >= 18 && hour < 24) {
        temporalStats.time_segments.evening.revenue += revenue;
        temporalStats.time_segments.evening.transactions++;
      } else {
        temporalStats.time_segments.night.revenue += revenue;
        temporalStats.time_segments.night.transactions++;
      }
    });
    
    // Find peak and slowest hours
    const peakHour = this.findPeakHour(temporalStats.hourly_revenue);
    const slowestHour = this.findSlowestHour(temporalStats.hourly_revenue);
    
    // Calculate efficiency scores
    const rushEfficiencyScore = this.calculateRushEfficiency(temporalStats);
    const timeUtilizationScore = this.calculateTimeUtilization(temporalStats);
    
    // Store in intelligent_temporal_daily
    await this.supabase
      .from('intelligent_temporal_daily')
      .upsert({
        restaurant_id: restaurantId,
        date: date,
        total_transactions: temporalStats.total_transactions,
        total_revenue: Number(temporalStats.total_revenue.toFixed(2)),
        total_customers: temporalStats.total_customers,
        avg_ticket: temporalStats.total_transactions > 0 ? 
          Number((temporalStats.total_revenue / temporalStats.total_transactions).toFixed(2)) : 0,
        
        peak_hour: peakHour?.hour || null,
        peak_hour_revenue: Number((peakHour?.value || 0).toFixed(2)),
        peak_hour_transactions: temporalStats.hourly_transactions[peakHour?.hour] || 0,
        slowest_hour: slowestHour?.hour || null,
        
        hourly_revenue: temporalStats.hourly_revenue,
        hourly_transactions: temporalStats.hourly_transactions,
        hourly_customers: temporalStats.hourly_customers,
        
        morning_revenue: Number(temporalStats.time_segments.morning.revenue.toFixed(2)),
        afternoon_revenue: Number(temporalStats.time_segments.afternoon.revenue.toFixed(2)),
        evening_revenue: Number(temporalStats.time_segments.evening.revenue.toFixed(2)),
        night_revenue: Number(temporalStats.time_segments.night.revenue.toFixed(2)),
        
        morning_transactions: temporalStats.time_segments.morning.transactions,
        afternoon_transactions: temporalStats.time_segments.afternoon.transactions,
        evening_transactions: temporalStats.time_segments.evening.transactions,
        night_transactions: temporalStats.time_segments.night.transactions,
        
        rush_efficiency_score: rushEfficiencyScore,
        time_utilization_score: timeUtilizationScore,
        
        detected_patterns: this.detectTemporalPatterns(temporalStats),
        temporal_insights: {
          peak_performance: `Peak at ${peakHour?.hour || 'N/A'}:00 with $${(peakHour?.value || 0).toFixed(2)}`,
          time_distribution: this.analyzeTimeDistribution(temporalStats.time_segments),
          efficiency_analysis: `${rushEfficiencyScore}/100 rush efficiency, ${timeUtilizationScore}/100 time utilization`
        },
        staffing_recommendations: this.generateStaffingRecommendations(temporalStats),
        operational_recommendations: this.generateOperationalRecommendations(temporalStats),
        
        processing_timestamp: new Date().toISOString(),
        confidence_score: 1.0,
        data_quality_score: 1.0
      }, {
        onConflict: 'restaurant_id,date'
      });
    
    console.log(`✅ Temporal intelligence: Peak at ${peakHour?.hour || 'N/A'}:00, $${temporalStats.total_revenue.toFixed(2)} total`);
    return { peakHour: peakHour?.hour, totalRevenue: temporalStats.total_revenue };
  }

  // 🔧 UTILITY FUNCTIONS
  
  async getActiveRestaurants() {
    const { data } = await this.supabase
      .from('restaurants')
      .select('id, name')
      .eq('active', true);
    
    return data || [];
  }
  
  createBatches(array, batchSize) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }
  
  findPeakHour(hourlyData, metric = 'value') {
    const entries = Object.entries(hourlyData);
    if (entries.length === 0) return null;
    
    const peak = entries.reduce((max, current) => {
      const currentValue = metric === 'value' ? current[1] : current[1][metric] || 0;
      const maxValue = metric === 'value' ? max[1] : max[1][metric] || 0;
      return currentValue > maxValue ? current : max;
    });
    
    return {
      hour: parseInt(peak[0]),
      value: metric === 'value' ? peak[1] : peak[1][metric],
      quantity: peak[1].quantity || peak[1]
    };
  }
  
  findSlowestHour(hourlyRevenue) {
    const entries = Object.entries(hourlyRevenue);
    if (entries.length === 0) return null;
    
    const slowest = entries.reduce((min, current) => 
      current[1] < min[1] ? current : min
    );
    
    return { hour: parseInt(slowest[0]), value: slowest[1] };
  }
  
  calculateConfidenceScore(stats) {
    const sampleSize = stats.total_transactions;
    return Math.min(sampleSize / 20, 1.0); // Full confidence at 20+ transactions
  }
  
  calculateRushEfficiency(temporalStats) {
    // Simplified rush efficiency based on peak concentration
    const peakRevenue = Math.max(...Object.values(temporalStats.hourly_revenue));
    const avgRevenue = temporalStats.total_revenue / 24;
    return Math.min(Math.round((peakRevenue / avgRevenue - 1) * 10), 100);
  }
  
  calculateTimeUtilization(temporalStats) {
    // Hours with meaningful activity (>5% of total revenue)
    const threshold = temporalStats.total_revenue * 0.05;
    const activeHours = Object.values(temporalStats.hourly_revenue)
      .filter(revenue => revenue > threshold).length;
    return Math.round((activeHours / 24) * 100);
  }
  
  calculatePaymentOptimizationScore(paymentStats) {
    // Based on payment method diversity and efficiency
    const diversity = paymentStats.cash.transactions > 0 ? 1 : 0 +
                     paymentStats.card.transactions > 0 ? 1 : 0 +
                     paymentStats.digital.transactions > 0 ? 1 : 0;
    return Math.round((diversity / 3) * 100);
  }
  
  // 🧠 PATTERN DETECTION
  detectProductPatterns(stats) {
    const patterns = [];
    
    if (stats.total_quantity > 50) patterns.push('high_volume_product');
    if (stats.total_revenue > 5000) patterns.push('revenue_leader');
    if (stats.total_profit / stats.total_revenue > 0.5) patterns.push('high_margin');
    
    return patterns;
  }
  
  detectTemporalPatterns(temporalStats) {
    const patterns = [];
    
    const peakHour = this.findPeakHour(temporalStats.hourly_revenue);
    if (peakHour) {
      if (peakHour.hour >= 12 && peakHour.hour <= 14) patterns.push('lunch_rush');
      if (peakHour.hour >= 19 && peakHour.hour <= 21) patterns.push('dinner_rush');
      if (peakHour.hour >= 7 && peakHour.hour <= 9) patterns.push('breakfast_peak');
    }
    
    return patterns;
  }
  
  // 💡 RECOMMENDATION GENERATION
  generateProductRecommendations(stats, marketPosition) {
    const recommendations = [];
    
    if (marketPosition === 'dominant') {
      recommendations.push('Consider raising price or creating premium variations');
      recommendations.push('Ensure consistent supply - this is your money maker');
    } else if (marketPosition === 'weak') {
      recommendations.push('Analyze why this product underperforms');
      recommendations.push('Consider promotional strategies or menu repositioning');
    }
    
    return recommendations;
  }
  
  generatePaymentRecommendations(paymentStats, dominantMethod) {
    const recommendations = [];
    
    if (dominantMethod === 'cash' && paymentStats.cash.revenue / paymentStats.total_revenue > 0.9) {
      recommendations.push('Consider promoting card/digital payments for larger tickets');
      recommendations.push('Card payments typically have higher average tickets');
    }
    
    return recommendations;
  }
  
  generateStaffingRecommendations(temporalStats) {
    const recommendations = [];
    const peakHour = this.findPeakHour(temporalStats.hourly_revenue);
    
    if (peakHour) {
      recommendations.push(`Ensure adequate staffing at ${peakHour.hour}:00 - your peak hour`);
      recommendations.push(`Consider pre-shift prep 1 hour before peak (${peakHour.hour - 1}:00)`);
    }
    
    return recommendations;
  }
  
  generateOperationalRecommendations(temporalStats) {
    const recommendations = [];
    
    if (temporalStats.time_segments.evening.revenue > temporalStats.time_segments.afternoon.revenue) {
      recommendations.push('Evening is your strongest period - optimize dinner service');
    }
    
    return recommendations;
  }
  
  analyzeTimeDistribution(segments) {
    const total = segments.morning.revenue + segments.afternoon.revenue + 
                  segments.evening.revenue + segments.night.revenue;
    
    if (total === 0) return 'No revenue distribution data';
    
    const morningPct = (segments.morning.revenue / total * 100).toFixed(1);
    const afternoonPct = (segments.afternoon.revenue / total * 100).toFixed(1);
    const eveningPct = (segments.evening.revenue / total * 100).toFixed(1);
    const nightPct = (segments.night.revenue / total * 100).toFixed(1);
    
    return `Morning: ${morningPct}%, Afternoon: ${afternoonPct}%, Evening: ${eveningPct}%, Night: ${nightPct}%`;
  }
}

module.exports = { UniversalIntelligenceProcessor };