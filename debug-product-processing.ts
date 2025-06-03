// 🔍 debug-product-processing.js
// LOCAL NODE DEBUGGING: Hunt the $9,405 revenue calculation bug

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const restaurantId = '13207c90-2ea6-4aa0-bfac-349753d24ea4';
const targetDate = '2025-06-01'; // Yesterday

async function debugProductProcessing() {
  console.log('🔍 DEBUGGING PRODUCT PROCESSING LOCALLY');
  console.log('🏪 Restaurant:', restaurantId);
  console.log('📅 Target Date:', targetDate);
  console.log('');

  try {
    // 1. GET RAW TRANSACTIONS
    console.log('📊 Step 1: Getting raw transactions...');
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('transaction_date', `${targetDate}T00:00:00.000Z`)
      .lt('transaction_date', `${targetDate}T23:59:59.999Z`);

    if (error) {
      console.error('❌ Error getting transactions:', error);
      return;
    }

    console.log(`✅ Found ${transactions.length} transactions`);
    console.log('');

    // 2. EXTRACT AND ANALYZE ITEMS
    console.log('🔍 Step 2: Extracting items from transactions...');
    
    const allItems = [];
    let transactionCount = 0;
    
    transactions.forEach(transaction => {
      transactionCount++;
      console.log(`\n🔍 Transaction ${transactionCount}/${transactions.length}:`);
      console.log(`   ID: ${transaction.id}`);
      console.log(`   Date: ${transaction.transaction_date}`);
      console.log(`   Items: ${transaction.items?.length || 0}`);
      
      if (transaction.items && Array.isArray(transaction.items)) {
        transaction.items.forEach((item, index) => {
          console.log(`   \n   🔍 Item ${index + 1}:`);
          console.log(`      product_id: ${item.product_id}`);
          console.log(`      name: ${item.name}`);
          console.log(`      price: ${item.price}`);
          console.log(`      quantity: ${item.quantity}`);
          console.log(`      num: ${item.num}`);
          console.log(`      product_sum: ${item.product_sum}`);
          
          // Process item
          const processedItem = {
            product_id: item.product_id,
            product_name: item.name,
            quantity: item.num || item.quantity || 1,
            price: parseFloat(item.price || 0),
            product_sum: parseFloat(item.product_sum || 0),
            transaction_id: transaction.id
          };
          
          allItems.push(processedItem);
          
          console.log(`      📝 Processed:`, processedItem);
        });
      }
    });

    console.log(`\n✅ Total items extracted: ${allItems.length}`);
    console.log('');

    // 3. FILTER VALID ITEMS
    console.log('🔍 Step 3: Filtering valid items...');
    
    const validItems = allItems.filter(item => {
      const isValid = item.product_id && 
                     item.quantity > 0 && 
                     (item.price > 0 || item.product_sum > 0);
      
      if (!isValid) {
        console.log(`❌ Invalid item filtered out:`, item);
      }
      
      return isValid;
    });

    console.log(`✅ Valid items: ${validItems.length}`);
    console.log('');

    // 4. AGGREGATE BY PRODUCT
    console.log('🔍 Step 4: Aggregating by product...');
    
    const productMap = new Map();
    
    validItems.forEach((item, index) => {
      console.log(`\n🔍 Processing item ${index + 1}/${validItems.length}:`);
      console.log(`   Product: ${item.product_name} (ID: ${item.product_id})`);
      
      const productId = item.product_id;
      
      if (!productMap.has(productId)) {
        productMap.set(productId, {
          product_id: productId,
          product_name: item.product_name,
          total_quantity: 0,
          total_revenue: 0,
          total_transactions: new Set(),
          items: []
        });
        console.log(`   🆕 New product created: ${item.product_name}`);
      }
      
      const product = productMap.get(productId);
      
      // REVENUE CALCULATION DEBUG
      let itemRevenue = 0;
      
      console.log(`   📊 Revenue calculation:`);
      console.log(`      product_sum: ${item.product_sum}`);
      console.log(`      price: ${item.price}`);
      console.log(`      quantity: ${item.quantity}`);
      
      if (item.product_sum > 0) {
        itemRevenue = item.product_sum;
        console.log(`   ✅ Using product_sum: $${itemRevenue}`);
      } else if (item.price > 0 && item.quantity > 0) {
        itemRevenue = item.price * item.quantity;
        console.log(`   ✅ Using price * quantity: $${item.price} * ${item.quantity} = $${itemRevenue}`);
      } else {
        console.log(`   ⚠️ No valid revenue calculation possible`);
      }
      
      // Update totals
      const oldQuantity = product.total_quantity;
      const oldRevenue = product.total_revenue;
      
      product.total_quantity += item.quantity;
      product.total_revenue += itemRevenue;
      product.total_transactions.add(item.transaction_id);
      product.items.push(item);
      
      console.log(`   📈 Product totals updated:`);
      console.log(`      Quantity: ${oldQuantity} + ${item.quantity} = ${product.total_quantity}`);
      console.log(`      Revenue: $${oldRevenue.toFixed(2)} + $${itemRevenue} = $${product.total_revenue.toFixed(2)}`);
      console.log(`      Transactions: ${product.total_transactions.size}`);
    });

    console.log('');
    console.log('🔍 Step 5: Final product analysis...');
    
    // 5. ANALYZE FINAL PRODUCTS
    const products = Array.from(productMap.values())
      .sort((a, b) => b.total_revenue - a.total_revenue);

    console.log(`\n📊 TOP PRODUCTS BY REVENUE:`);
    products.forEach((product, index) => {
      console.log(`\n🏆 ${index + 1}. ${product.product_name}`);
      console.log(`   Product ID: ${product.product_id}`);
      console.log(`   Total Quantity: ${product.total_quantity}`);
      console.log(`   Total Revenue: $${product.total_revenue.toFixed(2)}`);
      console.log(`   Transactions: ${product.total_transactions.size}`);
      console.log(`   Avg Price: $${(product.total_revenue / product.total_quantity).toFixed(2)}`);
      console.log(`   Items processed: ${product.items.length}`);
      
      // Show breakdown for star product
      if (index === 0) {
        console.log(`\n🔍 STAR PRODUCT BREAKDOWN:`);
        product.items.forEach((item, itemIndex) => {
          const itemRevenue = item.product_sum > 0 ? item.product_sum : (item.price * item.quantity);
          console.log(`   Item ${itemIndex + 1}: ${item.quantity} units, $${itemRevenue} revenue`);
        });
      }
    });

    // 6. TOTAL REVENUE CHECK
    const totalRevenue = products.reduce((sum, p) => sum + p.total_revenue, 0);
    console.log(`\n💰 TOTAL REVENUE ACROSS ALL PRODUCTS: $${totalRevenue.toFixed(2)}`);
    
    // 7. CHECK TEMPORAL DATA
    console.log('\n🔍 Step 6: Checking temporal intelligence table...');
    const { data: temporalData } = await supabase
      .from('intelligent_temporal_daily')
      .select('total_revenue, total_transactions')
      .eq('restaurant_id', restaurantId)
      .eq('date', targetDate)
      .single();

    if (temporalData) {
      console.log(`📊 Temporal table revenue: $${temporalData.total_revenue}`);
      console.log(`📊 Temporal table transactions: ${temporalData.total_transactions}`);
      console.log(`🔍 Difference: $${Math.abs(totalRevenue - parseFloat(temporalData.total_revenue)).toFixed(2)}`);
    }

    console.log('\n🎯 DEBUGGING COMPLETE!');

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

// Run the debug
debugProductProcessing();