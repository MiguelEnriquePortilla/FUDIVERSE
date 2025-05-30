require('dotenv').config();
const { EnhancedProductAnalyzer } = require('./services/intelligence/EnhancedProductAnalyzer');

async function testEnhancedAnalyzer() {
  console.log('🚀 TESTING ENHANCED AI PRODUCT ANALYZER...');
  console.log('=' * 50);
  
  try {
    const analyzer = new EnhancedProductAnalyzer();
    
    console.log('🧠 Running AI-enhanced analysis...');
    const result = await analyzer.analyze('13207c90-2ea6-4aa0-bfac-349753d24ea4', 30);
    
    if (result.success) {
      console.log('🎉 AI ANALYSIS SUCCESS!');
      console.log('\n📊 AI-GENERATED INSIGHTS:');
      console.log('=' * 40);
      
      result.insights.forEach((insight, i) => {
        console.log(`${i + 1}. ${insight}`);
      });
      
      console.log('\n📈 PRODUCTS ANALYZED:');
      console.log('=' * 30);
      
      result.data.products.slice(0, 5).forEach((product, i) => {
        console.log(`${i + 1}. ${product.product_name}`);
        console.log(`   Intelligence Score: ${(product.intelligence_score * 100).toFixed(1)}%`);
        console.log(`   Market Position: ${product.ai_insights.market_position}`);
        console.log(`   AI Recommendation: ${product.ai_insights.recommendation}`);
        console.log(`   Revenue: $${product.performance_metrics.total_revenue}`);
        console.log('');
      });
      
      console.log('\n🎯 SUMMARY:');
      console.log(`Total Products: ${result.data.summary.totalProducts}`);
      console.log(`Processing Mode: ${result.data.summary.processingMode}`);
      console.log(`Analysis Type: ${result.data.summary.analysisType}`);
      
      console.log('\n🎊 ENHANCED AI ANALYZER IS WORKING PERFECTLY!');
      
    } else {
      console.log('❌ Analysis failed:', result.error);
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testEnhancedAnalyzer();