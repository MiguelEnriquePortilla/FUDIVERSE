// 📁 services/sync/UniversalDataAdapter.js
// FRAMEWORK FOR MULTI-POS INTEGRATION

const { createClient } = require('@supabase/supabase-js');

class UniversalDataAdapter {
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Initialize adapters for different POS systems
    this.adapters = {
      poster: new PosterAdapter(),
      square: new SquareAdapter(),      // Future implementation
      toast: new ToastAdapter(),        // Future implementation
      clover: new CloverAdapter(),      // Future implementation
      generic: new GenericAdapter()     // For custom integrations
    };
    
    console.log('🔄 UniversalDataAdapter initialized with adapters:', Object.keys(this.adapters));
  }

  // 🎯 MAIN SYNC METHOD
  async syncRestaurant(restaurantId, posSystem = 'poster') {
    console.log(`🔄 Starting sync for restaurant ${restaurantId} using ${posSystem}`);
    
    try {
      // 1. Get appropriate adapter
      const adapter = this.adapters[posSystem];
      if (!adapter) {
        throw new Error(`POS system '${posSystem}' not supported. Available: ${Object.keys(this.adapters).join(', ')}`);
      }
      
      // 2. Fetch latest data from POS
      console.log(`📡 Fetching data from ${posSystem} API...`);
      const rawData = await adapter.fetchLatestData(restaurantId);
      
      // 3. Normalize to universal format
      console.log(`🔄 Normalizing data to universal format...`);
      const normalizedData = adapter.normalizeData(rawData);
      
      // 4. Store systematically in Supabase
      console.log(`💾 Storing data systematically...`);
      const storeResult = await this.storeSystematically(restaurantId, normalizedData);
      
      // 5. Trigger intelligence processing
      console.log(`🧠 Triggering intelligence processing...`);
      await this.triggerIntelligenceProcessing(restaurantId);
      
      return {
        success: true,
        posSystem: posSystem,
        restaurantId: restaurantId,
        dataProcessed: storeResult,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error(`❌ Sync failed for ${restaurantId} (${posSystem}):`, error);
      throw error;
    }
  }

  // 💾 SYSTEMATIC DATA STORAGE
  async storeSystematically(restaurantId, normalizedData) {
    const results = {
      transactions: 0,
      products: 0,
      customers: 0,
      employees: 0,
      inventory: 0
    };
    
    try {
      // Store transactions
      if (normalizedData.transactions && normalizedData.transactions.length > 0) {
        const { error: transError } = await this.supabase
          .from('transactions')
          .upsert(normalizedData.transactions, { 
            onConflict: 'restaurant_id,pos_transaction_id',
            ignoreDuplicates: true 
          });
        
        if (!transError) {
          results.transactions = normalizedData.transactions.length;
        }
      }
      
      // Store products
      if (normalizedData.products && normalizedData.products.length > 0) {
        const { error: prodError } = await this.supabase
          .from('products')
          .upsert(normalizedData.products, { 
            onConflict: 'id',
            ignoreDuplicates: true 
          });
        
        if (!prodError) {
          results.products = normalizedData.products.length;
        }
      }
      
      // Store customers
      if (normalizedData.customers && normalizedData.customers.length > 0) {
        const { error: custError } = await this.supabase
          .from('customers')
          .upsert(normalizedData.customers, { 
            onConflict: 'id',
            ignoreDuplicates: true 
          });
        
        if (!custError) {
          results.customers = normalizedData.customers.length;
        }
      }
      
      // Store employees
      if (normalizedData.employees && normalizedData.employees.length > 0) {
        const { error: empError } = await this.supabase
          .from('employees')
          .upsert(normalizedData.employees, { 
            onConflict: 'id',
            ignoreDuplicates: true 
          });
        
        if (!empError) {
          results.employees = normalizedData.employees.length;
        }
      }
      
      console.log('📊 Data storage results:', results);
      return results;
      
    } catch (error) {
      console.error('❌ Error storing data systematically:', error);
      throw error;
    }
  }

  // 🧠 TRIGGER INTELLIGENCE PROCESSING
  async triggerIntelligenceProcessing(restaurantId) {
    try {
      // Import and run background intelligence engine
      const { BackgroundIntelligenceEngine } = require('../intelligence/BackgroundIntelligenceEngine');
      const engine = new BackgroundIntelligenceEngine();
      
      // Process restaurant intelligence in background
      await engine.processRestaurantIntelligence(restaurantId);
      
      console.log(`✅ Intelligence processing triggered for ${restaurantId}`);
      
    } catch (error) {
      console.warn(`⚠️ Intelligence processing failed for ${restaurantId}:`, error.message);
      // Don't throw - intelligence processing failure shouldn't break sync
    }
  }

  // 📊 GET SYNC STATUS
  async getSyncStatus(restaurantId) {
    try {
      // Get latest transaction
      const { data: lastTransaction } = await this.supabase
        .from('transactions')
        .select('transaction_date')
        .eq('restaurant_id', restaurantId)
        .order('transaction_date', { ascending: false })
        .limit(1);
      
      // Get latest metrics
      const { data: lastMetrics } = await this.supabase
        .from('intelligent_metrics')
        .select('updated_at')
        .eq('restaurant_id', restaurantId)
        .order('updated_at', { ascending: false })
        .limit(1);
      
      return {
        restaurantId: restaurantId,
        lastTransaction: lastTransaction?.[0]?.transaction_date || null,
        lastIntelligenceUpdate: lastMetrics?.[0]?.updated_at || null,
        dataFreshness: this.calculateDataFreshness(lastTransaction?.[0]?.transaction_date),
        intelligenceFreshness: this.calculateDataFreshness(lastMetrics?.[0]?.updated_at)
      };
      
    } catch (error) {
      console.error('Error getting sync status:', error);
      return null;
    }
  }

  // ⏰ CALCULATE DATA FRESHNESS
  calculateDataFreshness(timestamp) {
    if (!timestamp) return 'No data';
    
    const now = new Date();
    const dataTime = new Date(timestamp);
    const hoursOld = (now - dataTime) / (1000 * 60 * 60);
    
    if (hoursOld < 1) return 'Fresh (< 1 hour)';
    if (hoursOld < 24) return `${Math.round(hoursOld)} hours old`;
    if (hoursOld < 168) return `${Math.round(hoursOld / 24)} days old`;
    return 'Stale (> 1 week)';
  }
}

// 🏗️ POSTER ADAPTER (Using existing DataQuarryImporterV3)
class PosterAdapter {
  async fetchLatestData(restaurantId) {
    // Use existing DataQuarryImporterV3 logic
    const { DataQuarryImporterV3 } = require('../dataQuarry/DataQuarryImporterV3');
    const importer = new DataQuarryImporterV3();
    
    // This will fetch from Poster API
    await importer.runFullImport();
    
    return {
      source: 'poster',
      timestamp: new Date().toISOString(),
      restaurantId: restaurantId
    };
  }

  normalizeData(rawData) {
    // Data is already normalized by DataQuarryImporterV3
    // and stored directly to Supabase, so this is a pass-through
    return {
      transactions: [],
      products: [],
      customers: [],
      employees: [],
      source: 'poster_direct'
    };
  }
}

// 🔮 FUTURE: SQUARE ADAPTER
class SquareAdapter {
  async fetchLatestData(restaurantId) {
    console.log(`📡 Square adapter not implemented yet for ${restaurantId}`);
    throw new Error('Square adapter coming soon');
  }

  normalizeData(rawData) {
    // Future: Normalize Square data to universal format
    return {
      transactions: [],
      products: [],
      customers: [],
      employees: []
    };
  }
}

// 🔮 FUTURE: TOAST ADAPTER
class ToastAdapter {
  async fetchLatestData(restaurantId) {
    console.log(`📡 Toast adapter not implemented yet for ${restaurantId}`);
    throw new Error('Toast adapter coming soon');
  }

  normalizeData(rawData) {
    // Future: Normalize Toast data to universal format
    return {
      transactions: [],
      products: [],
      customers: [],
      employees: []
    };
  }
}

// 🔮 FUTURE: CLOVER ADAPTER  
class CloverAdapter {
  async fetchLatestData(restaurantId) {
    console.log(`📡 Clover adapter not implemented yet for ${restaurantId}`);
    throw new Error('Clover adapter coming soon');
  }

  normalizeData(rawData) {
    // Future: Normalize Clover data to universal format
    return {
      transactions: [],
      products: [],
      customers: [],
      employees: []
    };
  }
}

// 🔮 FUTURE: GENERIC ADAPTER (CSV, API, etc.)
class GenericAdapter {
  async fetchLatestData(restaurantId) {
    console.log(`📡 Generic adapter not implemented yet for ${restaurantId}`);
    throw new Error('Generic adapter coming soon');
  }

  normalizeData(rawData) {
    // Future: Handle custom data formats
    return {
      transactions: [],
      products: [],
      customers: [],
      employees: []
    };
  }
}

module.exports = { 
  UniversalDataAdapter,
  PosterAdapter,
  SquareAdapter,
  ToastAdapter,
  CloverAdapter,
  GenericAdapter
};