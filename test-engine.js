require('dotenv').config();
const { BackgroundIntelligenceEngine } = require('./services/intelligence/BackgroundIntelligenceEngine');

async function testEngine() {
  console.log('🧠 PROCESSING ALL REAL DATA...');
  
  try {
    const engine = new BackgroundIntelligenceEngine();
    
    console.log('🔥 EXECUTING FULL PROCESSING...');
    await engine.generateProductMetrics('13207c90-2ea6-4aa0-bfac-349753d24ea4');
    
    console.log('📊 Checking FINAL results...');
    const { data: metrics } = await engine.supabase
      .from('intelligent_metrics')
      .select('*')
      .eq('restaurant_id', '13207c90-2ea6-4aa0-bfac-349753d24ea4')
      .order('created_at', { ascending: false })
      .limit(10);
      
    console.log(`🎉 TOTAL METRICS: ${metrics ? metrics.length : 0}`);
    
    if (metrics && metrics.length > 0) {
      console.log('✅ SUCCESS! Sample metrics:');
      metrics.slice(0, 3).forEach((metric, i) => {
        console.log(`${i+1}. Product ${metric.dimensions.product_id}: ${metric.metrics.quantity} units, $${metric.metrics.revenue}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testEngine();