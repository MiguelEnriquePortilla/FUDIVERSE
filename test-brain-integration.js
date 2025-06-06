// test-brain-integration.js
// Prueba de integración BabyBrain + FudiClaudeDirect

console.log('🧪 TESTING BABY BRAIN + FUDI INTEGRATION\n');

// Simular variables de entorno
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_KEY = 'test-key';
process.env.ANTHROPIC_API_KEY = 'test-key';

try {
  // 1. Cargar FudiClaudeDirect
  console.log('1️⃣ Loading FudiClaudeDirect with BabyBrain...');
  const { FudiClaudeDirect } = require('./services/brain/FudiClaudeDirect');
  
  // 2. Crear instancia (esto debería inicializar BabyBrain automáticamente)
  console.log('\n2️⃣ Creating FudiClaudeDirect instance...');
  const fudi = new FudiClaudeDirect(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    process.env.ANTHROPIC_API_KEY
  );
  
  // 3. Verificar que BabyBrain está conectado
  console.log('\n3️⃣ Checking BabyBrain connection...');
  console.log('Has babyBrain?', fudi.babyBrain ? 'YES ✅' : 'NO ❌');
  console.log('BabyBrain status:', fudi.babyBrain?.getStatus().status);
  
  // 4. Probar el método processWithBrain (simulado)
  console.log('\n4️⃣ Testing processWithBrain method...');
  
  // Sobrescribir processQuery para evitar llamadas reales a API
  fudi.processQuery = async function(message, restaurantId, context) {
    console.log('  [Mock] Processing query:', message);
    return {
      success: true,
      response: `Mock response for: ${message}`,
      metadata: {
        architecture: 'claude_direct',
        mocked: true
      }
    };
  };
  
  // Ahora probar processWithBrain
  const testQuery = "¿Cuáles son mis ventas de hoy?";
  console.log('  Testing with query:', testQuery);
  
  fudi.processWithBrain(testQuery, 'rest-123', { userId: 'test-user' })
    .then(result => {
      console.log('\n  Process result:');
      console.log('  - Success:', result.success);
      console.log('  - Brain Enhanced:', result.metadata.brainEnhanced);
      console.log('  - Brain Memories:', result.metadata.brainMemories);
      console.log('  - Brain Status:', result.metadata.brainStatus);
      
      // 5. Obtener insights del cerebro
      console.log('\n5️⃣ Getting brain insights...');
      const insights = fudi.getBrainInsights();
      console.log('Brain Insights:');
      console.log('  - Total Memories:', insights.totalMemories);
      console.log('  - Memory Capacity:', insights.memoryCapacity);
      console.log('  - Success Rate:', insights.successRate + '%');
      console.log('  - Common Words:', insights.commonWords);
      
      // 6. Verificar memorias directamente
      console.log('\n6️⃣ Checking brain memories directly...');
      const memories = fudi.babyBrain.recall();
      console.log(`Found ${memories.length} memories`);
      memories.forEach((mem, i) => {
        console.log(`  Memory ${i + 1}: Type=${mem.data.type}, Time=${mem.timestamp}`);
      });
      
      console.log('\n✅ INTEGRATION TEST COMPLETED!');
      console.log('🧠 BabyBrain is successfully integrated with FudiClaudeDirect!');
    })
    .catch(error => {
      console.error('❌ Error in processWithBrain:', error);
    });
  
} catch (error) {
  console.error('\n❌ INTEGRATION ERROR:', error.message);
  console.error('Stack:', error.stack);
}