// 🧹 services/intelligence/DataNormalizer.js
// FUDI CORE: Transform chaos into business intelligence
// FROM: Garbage data → TO: Clean, actionable insights

const { createClient } = require('@supabase/supabase-js');

class DataNormalizer {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('🧹 DataNormalizer initializing...');
    console.log('🎯 MISSION: Transform data chaos into business intelligence');
    console.log('💎 FROM: Garbage bags → TO: Organized shelves');
    console.log('✅ DataNormalizer READY');
  }

  // 🧹 MAIN NORMALIZATION: Take chaos, return intelligence
  async normalizeTransactionItems(transactions, restaurantId) {
    console.log('🧹 FUDI DATA NORMALIZATION: Starting chaos cleanup...');
    console.log(`📦 Input: ${transactions.length} chaotic transactions`);
    
    // STEP 1: EXTRACT CHAOTIC ITEMS
    const chaoticItems = this.extractChaoticItems(transactions);
    
    // STEP 2: GET PRODUCT CATALOG (THE ROSETTA STONE)
    const productCatalog = await this.getProductCatalog(restaurantId);
    
    // STEP 3: NORMALIZE EACH ITEM
    const normalizedItems = this.normalizeItems(chaoticItems, productCatalog);
    
    // STEP 4: VALIDATE AND CLEAN
    const cleanItems = this.validateAndClean(normalizedItems);
    
    console.log(`✨ Output: ${cleanItems.length} clean, intelligent items`);
    console.log('🎯 FUDI NORMALIZATION COMPLETE');
    
    return {
      originalCount: chaoticItems.length,
      normalizedCount: cleanItems.length,
      cleanItems: cleanItems,
      normalizationRate: (cleanItems.length / chaoticItems.length * 100).toFixed(1) + '%'
    };
  }

  // 🗑️ STEP 1: Extract chaotic items from transactions
  extractChaoticItems(transactions) {
    console.log('🗑️ STEP 1: Extracting chaotic items from transactions...');
    
    const chaoticItems = [];
    let transactionIndex = 0;
    
    transactions.forEach(transaction => {
      transactionIndex++;
      
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach((item, itemIndex) => {
          console.log(`🔍 Chaos item ${transactionIndex}.${itemIndex + 1}:`, {
            product_id: item.product_id,
            name: item.name || 'undefined',
            price: item.price || 'undefined',
            quantity: item.quantity || 'undefined',
            num: item.num || 'undefined',
            product_sum: item.product_sum || 'undefined'
          });
          
          // Extract whatever we can from the chaos
          chaoticItems.push({
            ...item,
            transaction_id: transaction.id,
            transaction_date: transaction.transaction_date,
            source: 'poster_pos',
            chaos_level: this.assessChaosLevel(item)
          });
        });
      }
    });
    
    console.log(`🗑️ Chaos extraction complete: ${chaoticItems.length} items`);
    return chaoticItems;
  }

  // 📊 STEP 2: Get product catalog (the Rosetta Stone)
  async getProductCatalog(restaurantId) {
    console.log('📊 STEP 2: Getting product catalog (Rosetta Stone)...');
    
    try {
      const { data: products, error } = await this.supabase
        .from('products')
        .select('id, name, price')
        .eq('restaurant_id', restaurantId);
      
      if (error) {
        console.error('❌ Error getting product catalog:', error);
        return new Map();
      }
      
      // Create lookup map
      const catalog = new Map();
      products.forEach(product => {
        catalog.set(product.id, {
          id: product.id,
          name: product.name,
          price: product.price
        });
      });
      
      console.log(`📊 Product catalog loaded: ${catalog.size} products`);
      return catalog;
      
    } catch (error) {
      console.error('❌ Product catalog error:', error);
      return new Map();
    }
  }

  // ✨ STEP 3: Normalize each item (THE MAGIC)
  normalizeItems(chaoticItems, productCatalog) {
    console.log('✨ STEP 3: THE MAGIC - Normalizing items...');
    
    const normalizedItems = [];
    
    chaoticItems.forEach((item, index) => {
      console.log(`\n🧹 Normalizing item ${index + 1}/${chaoticItems.length}:`);
      console.log(`   Chaos input:`, {
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        num: item.num,
        product_sum: item.product_sum
      });
      
      // NORMALIZE PRODUCT ID
      const productId = this.normalizeProductId(item);
      
      // NORMALIZE PRODUCT NAME (using Rosetta Stone)
      const productName = this.normalizeProductName(item, productCatalog, productId);
      
      // NORMALIZE QUANTITY  
      const quantity = this.normalizeQuantity(item);
      
      // NORMALIZE PRICE
      const price = this.normalizePrice(item, productCatalog, productId);
      
      // NORMALIZE REVENUE
      const revenue = this.normalizeRevenue(item, price, quantity);
      
      const normalizedItem = {
        product_id: productId,
        product_name: productName,
        quantity: quantity,
        price: price,
        revenue: revenue,
        transaction_id: item.transaction_id,
        transaction_date: item.transaction_date,
        normalization_confidence: this.calculateNormalizationConfidence(item, productId, productName, quantity, price, revenue),
        original_chaos: {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          num: item.num,
          product_sum: item.product_sum
        }
      };
      
      console.log(`   ✨ Normalized output:`, {
        product_id: normalizedItem.product_id,
        product_name: normalizedItem.product_name,
        quantity: normalizedItem.quantity,
        price: normalizedItem.price,
        revenue: normalizedItem.revenue,
        confidence: normalizedItem.normalization_confidence
      });
      
      normalizedItems.push(normalizedItem);
    });
    
    console.log(`✨ Normalization complete: ${normalizedItems.length} items processed`);
    return normalizedItems;
  }

  // 🔢 Normalize Product ID
  normalizeProductId(item) {
    return item.product_id || null;
  }

  // 🏷️ Normalize Product Name (using Rosetta Stone)
  normalizeProductName(item, productCatalog, productId) {
    // Priority 1: Catalog lookup
    if (productId && productCatalog.has(productId)) {
      const catalogProduct = productCatalog.get(productId);
      console.log(`   🏷️ Name from catalog: ${catalogProduct.name}`);
      return catalogProduct.name;
    }
    
    // Priority 2: Item name (if exists)
    if (item.name && item.name !== 'undefined') {
      console.log(`   🏷️ Name from item: ${item.name}`);
      return item.name;
    }
    
    // Priority 3: Fallback
    const fallbackName = `Producto ${productId || 'Desconocido'}`;
    console.log(`   🏷️ Fallback name: ${fallbackName}`);
    return fallbackName;
  }

  // 📦 Normalize Quantity
  normalizeQuantity(item) {
    // Priority 1: num field
    if (item.num && item.num > 0) {
      console.log(`   📦 Quantity from num: ${item.num}`);
      return parseInt(item.num);
    }
    
    // Priority 2: quantity field
    if (item.quantity && item.quantity > 0) {
      console.log(`   📦 Quantity from quantity: ${item.quantity}`);
      return parseInt(item.quantity);
    }
    
    // Priority 3: Default
    console.log(`   📦 Default quantity: 1`);
    return 1;
  }

  // 💰 Normalize Price
  normalizePrice(item, productCatalog, productId) {
    // Priority 1: product_sum / quantity (most accurate)
    const quantity = this.normalizeQuantity(item);
    if (item.product_sum && item.product_sum > 0 && quantity > 0) {
      const calculatedPrice = parseFloat(item.product_sum) / quantity;
      console.log(`   💰 Price from product_sum/quantity: $${item.product_sum}/${quantity} = $${calculatedPrice}`);
      return calculatedPrice;
    }
    
    // Priority 2: item price
    if (item.price && item.price > 0) {
      const itemPrice = parseFloat(item.price);
      console.log(`   💰 Price from item: $${itemPrice}`);
      return itemPrice;
    }
    
    // Priority 3: catalog price
    if (productId && productCatalog.has(productId)) {
      const catalogPrice = productCatalog.get(productId).price;
      console.log(`   💰 Price from catalog: $${catalogPrice}`);
      return parseFloat(catalogPrice) || 0;
    }
    
    // Priority 4: Default
    console.log(`   💰 Default price: $0`);
    return 0;
  }

  // 💸 Normalize Revenue
  normalizeRevenue(item, price, quantity) {
    // Priority 1: product_sum (most reliable)
    if (item.product_sum && item.product_sum > 0) {
      const revenue = parseFloat(item.product_sum);
      console.log(`   💸 Revenue from product_sum: $${revenue}`);
      return revenue;
    }
    
    // Priority 2: calculated (price * quantity)
    if (price > 0 && quantity > 0) {
      const revenue = price * quantity;
      console.log(`   💸 Revenue calculated: $${price} * ${quantity} = $${revenue}`);
      return revenue;
    }
    
    // Priority 3: Default
    console.log(`   💸 Default revenue: $0`);
    return 0;
  }

  // 🎯 STEP 4: Validate and clean
  validateAndClean(normalizedItems) {
    console.log('🎯 STEP 4: Validating and cleaning normalized items...');
    
    const cleanItems = normalizedItems.filter(item => {
      const isValid = item.product_id && 
                     item.quantity > 0 && 
                     item.revenue > 0 &&
                     item.normalization_confidence > 0.5;
      
      if (!isValid) {
        console.log(`❌ Invalid item filtered out:`, {
          product_id: item.product_id,
          quantity: item.quantity,
          revenue: item.revenue,
          confidence: item.normalization_confidence
        });
      }
      
      return isValid;
    });
    
    console.log(`🎯 Validation complete: ${cleanItems.length}/${normalizedItems.length} items passed`);
    return cleanItems;
  }

  // 📊 Calculate normalization confidence
  calculateNormalizationConfidence(item, productId, productName, quantity, price, revenue) {
    let confidence = 0;
    
    // Product ID exists
    if (productId) confidence += 0.3;
    
    // Product name is not fallback
    if (productName && !productName.includes('Producto') && !productName.includes('Desconocido')) {
      confidence += 0.2;
    }
    
    // Quantity is reasonable
    if (quantity > 0 && quantity < 100) confidence += 0.2;
    
    // Price is reasonable
    if (price > 0 && price < 1000) confidence += 0.2;
    
    // Revenue is reasonable
    if (revenue > 0 && revenue < 10000) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  // 🌪️ Assess chaos level
  assessChaosLevel(item) {
    let chaosPoints = 0;
    
    if (!item.product_id) chaosPoints += 3;
    if (!item.name || item.name === 'undefined') chaosPoints += 2;
    if (!item.price || item.price === 'undefined') chaosPoints += 2;
    if (!item.quantity || item.quantity === 'undefined') chaosPoints += 1;
    if (!item.product_sum || item.product_sum === 'undefined') chaosPoints += 1;
    
    if (chaosPoints >= 7) return 'extreme';
    if (chaosPoints >= 5) return 'high';
    if (chaosPoints >= 3) return 'medium';
    return 'low';
  }
}

module.exports = { DataNormalizer };