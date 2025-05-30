// 📁 services/intelligence/BackgroundIntelligenceEngine.js

const { createClient } = require('@supabase/supabase-js');

class BackgroundIntelligenceEngine {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    this.version = 'v1.0';
  }

  // 🎯 MAIN ORCHESTRATOR
  async processAllRestaurants() {
    console.log('🧠 Starting background intelligence processing...');
    
    const restaurants = await this.getActiveRestaurants();
    console.log(`📊 Processing ${restaurants.length} restaurants`);
    
    for (const restaurant of restaurants) {
      try {
        await this.processRestaurantIntelligence(restaurant.id);
        console.log(`✅ Completed: ${restaurant.id}`);
      } catch (error) {
        console.error(`❌ Failed: ${restaurant.id}`, error);
      }
    }
    
    console.log('🎉 Background processing complete');
  }

  // 🏪 PROCESS SINGLE RESTAURANT
  async processRestaurantIntelligence(restaurantId) {
    console.log(`🧠 Processing intelligence for ${restaurantId}`);
    
    // Set restaurant context for RLS
    await this.supabase.rpc('set_config', {
      setting_name: 'app.restaurant_id',
      setting_value: restaurantId
    });
    
    // 1. Generate intelligent metrics
    await this.generateIntelligentMetrics(restaurantId);
    
    // 2. Discover patterns
    await this.discoverPatterns(restaurantId);
    
    // 3. Generate insights (placeholder)
    await this.generateInsights(restaurantId);
    
    // 4. Update confidence scores (placeholder)
    await this.updateConfidenceScores(restaurantId);
    
    console.log(`✅ Intelligence processing complete for ${restaurantId}`);
  }

  // 📊 GENERATE INTELLIGENT METRICS
  async generateIntelligentMetrics(restaurantId) {
    console.log('📊 Generating intelligent metrics...');
    
    // Product performance metrics (daily, weekly, monthly)
    await this.generateProductMetrics(restaurantId);
    
    // Customer behavior metrics
    await this.generateCustomerMetrics(restaurantId);
    
    // Seasonal pattern metrics
    await this.generateSeasonalMetrics(restaurantId);
    
    console.log('✅ Intelligent metrics generated');
  }

  async generateProductMetrics(restaurantId) {
    console.log('📊 Starting generateProductMetrics...');
    
    // Get last 90 days of transaction data
    const { data: transactions } = await this.supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('transaction_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
      .limit(50000);

    console.log(`📊 Found ${transactions ? transactions.length : 0} transactions`);

    if (!transactions || transactions.length === 0) {
      console.log('❌ No transactions found, returning');
      return;
    }

    // Extract all items
    const allItems = [];
    transactions.forEach(t => {
      if (t.items && Array.isArray(t.items)) {
        t.items.forEach(item => {
          allItems.push({
            product_id: item.product_id,
            quantity: item.num || 1,
            price: parseFloat(item.product_sum || 0),
            date: t.transaction_date,
            transaction_id: t.pos_transaction_id
          });
        });
      }
    });

    console.log(`📊 Extracted ${allItems.length} items from transactions`);

    // Group by product and time periods
    const productMetrics = this.aggregateProductMetrics(allItems);
    console.log(`📊 Total products: ${Object.keys(productMetrics).length}`);

    // Store metrics for each time dimension
    let storedCount = 0;
    for (const [productId, metrics] of Object.entries(productMetrics)) {
      console.log(`📊 Processing product ${productId}...`);
      
      // Monthly metrics
      for (const [month, monthlyMetrics] of Object.entries(metrics.monthly)) {
        console.log(`📊 Storing monthly metric for ${month}`);
        
        const success = await this.storeIntelligentMetric({
          restaurant_id: restaurantId,
          metric_type: 'product_performance',
          time_dimension: 'monthly',
          time_period: month,
          dimensions: {
            product_id: parseInt(productId),
            product_name: metrics.product_name
          },
          metrics: monthlyMetrics,
          confidence_score: this.calculateConfidenceScore(monthlyMetrics)
        });
        
        if (success) storedCount++;
      }
    }
    
    console.log(`📊 Total metrics stored: ${storedCount}`);
  }

  // 👥 CUSTOMER METRICS (PLACEHOLDER)
  async generateCustomerMetrics(restaurantId) {
    console.log('👥 Generating customer metrics...');
    console.log('✅ Customer metrics generated (placeholder)');
  }

  // 📅 SEASONAL METRICS (PLACEHOLDER)  
  async generateSeasonalMetrics(restaurantId) {
    console.log('📅 Generating seasonal metrics...');
    console.log('✅ Seasonal metrics generated (placeholder)');
  }

  // 🔍 PATTERN DISCOVERY
  async discoverPatterns(restaurantId) {
    console.log('🔍 Discovering patterns...');
    
    // Day of week patterns
    await this.discoverDayOfWeekPatterns(restaurantId);
    
    // Seasonal patterns
    await this.discoverSeasonalPatterns(restaurantId);
    
    // Peak hour patterns
    await this.discoverPeakHourPatterns(restaurantId);
    
    console.log('✅ Pattern discovery complete');
  }

  async discoverDayOfWeekPatterns(restaurantId) {
    // Get metrics by day of week
    const { data: dailyMetrics } = await this.supabase
      .from('intelligent_metrics')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('metric_type', 'product_performance')
      .eq('time_dimension', 'daily');

    if (!dailyMetrics || dailyMetrics.length === 0) return;

    // Pattern analysis logic here (placeholder for now)
    console.log('📈 Day of week patterns analyzed');
  }

  async discoverSeasonalPatterns(restaurantId) {
    console.log('📅 Discovering seasonal patterns...');
    console.log('✅ Seasonal patterns discovered (placeholder)');
  }

  async discoverPeakHourPatterns(restaurantId) {
    console.log('⏰ Discovering peak hour patterns...');
    console.log('✅ Peak hour patterns discovered (placeholder)');
  }

  // 🎯 INSIGHTS GENERATION (PLACEHOLDER)
  async generateInsights(restaurantId) {
    console.log('🎯 Generating insights...');
    console.log('✅ Insights generated (placeholder)');
  }

  // 📊 CONFIDENCE SCORES (PLACEHOLDER)
  async updateConfidenceScores(restaurantId) {
    console.log('📊 Updating confidence scores...');
    console.log('✅ Confidence scores updated (placeholder)');
  }

  // 💾 UTILITY FUNCTIONS
  async getActiveRestaurants() {
    const { data } = await this.supabase
      .from('restaurants')
      .select('id, name')
      .eq('active', true);
    
    return data || [];
  }

  async storeIntelligentMetric(metric) {
    console.log(`💾 Storing: Product ${metric.dimensions.product_id}, Period: ${metric.time_period}`);
    
    const { data, error } = await this.supabase
      .from('intelligent_metrics')
      .insert({
        ...metric,
        processing_version: this.version,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error(`❌ FAILED Product ${metric.dimensions.product_id}:`, error.message);
      return false;
    } else {
      console.log(`✅ STORED Product ${metric.dimensions.product_id}`);
      return true;
    }
  }

  async storePattern(pattern) {
    const { error } = await this.supabase
      .from('fudi_learned_patterns')
      .upsert({
        ...pattern,
        fudi_learning_version: this.version,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'restaurant_id,pattern_type,pattern_name'
      });

    if (error) {
      console.error('Error storing pattern:', error);
    }
  }

  calculateConfidenceScore(metrics) {
    // Simple confidence calculation based on sample size and consistency
    const sampleSize = metrics.transaction_count || 1;
    const sizeScore = Math.min(sampleSize / 100, 1); // 100+ transactions = full confidence
    
    return Math.max(sizeScore, 0.1); // Minimum 10% confidence
  }

  calculatePatternConfidence(counts, strength) {
    const totalSamples = counts.reduce((sum, count) => sum + count, 0);
    const sampleScore = Math.min(totalSamples / 50, 1); // 50+ samples = full confidence
    const strengthScore = strength;
    
    return (sampleScore + strengthScore) / 2;
  }

  // 📊 DATA AGGREGATION HELPERS
  aggregateProductMetrics(items) {
    const productMetrics = {};
    
    items.forEach(item => {
      const productId = item.product_id;
      const date = new Date(item.date);
      const dateStr = date.toISOString().split('T')[0];
      const weekStr = this.getWeekString(date);
      const monthStr = date.toISOString().substring(0, 7) + '-01'; // Fixed: proper date format

      if (!productMetrics[productId]) {
        productMetrics[productId] = {
          product_name: `Product ${productId}`,
          daily: {},
          weekly: {},
          monthly: {}
        };
      }

      // Daily aggregation
      if (!productMetrics[productId].daily[dateStr]) {
        productMetrics[productId].daily[dateStr] = {
          quantity: 0,
          revenue: 0,
          transaction_count: 0,
          avg_price: 0
        };
      }
      
      const daily = productMetrics[productId].daily[dateStr];
      daily.quantity += item.quantity;
      daily.revenue += item.price;
      daily.transaction_count++;
      daily.avg_price = daily.revenue / daily.quantity;

      // Weekly aggregation
      if (!productMetrics[productId].weekly[weekStr]) {
        productMetrics[productId].weekly[weekStr] = {
          quantity: 0,
          revenue: 0,
          transaction_count: 0,
          avg_price: 0
        };
      }
      
      const weekly = productMetrics[productId].weekly[weekStr];
      weekly.quantity += item.quantity;
      weekly.revenue += item.price;
      weekly.transaction_count++;
      weekly.avg_price = weekly.revenue / weekly.quantity;

      // Monthly aggregation
      if (!productMetrics[productId].monthly[monthStr]) {
        productMetrics[productId].monthly[monthStr] = {
          quantity: 0,
          revenue: 0,
          transaction_count: 0,
          avg_price: 0
        };
      }
      
      const monthly = productMetrics[productId].monthly[monthStr];
      monthly.quantity += item.quantity;
      monthly.revenue += item.price;
      monthly.transaction_count++;
      monthly.avg_price = monthly.revenue / monthly.quantity;
    });

    return productMetrics;
  }

  getWeekString(date) {
    const year = date.getFullYear();
    const week = this.getWeekNumber(date);
    
    // Convert to valid date format (first day of that week)
    const jan1 = new Date(year, 0, 1);
    const weekStart = new Date(jan1.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
    return weekStart.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  }

  getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }
}

module.exports = { BackgroundIntelligenceEngine };