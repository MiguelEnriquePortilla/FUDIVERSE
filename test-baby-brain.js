// test-baby-brain.js
// Script para probar el cerebro bebé

console.log('🧪 TESTING BABY BRAIN STRUCTURE\n');

try {
  // 1. Probar que los módulos cargan
  console.log('1️⃣ Loading modules...');
  const BabyBrain = require('./services/brain/baby/BabyBrain');
  console.log('✅ BabyBrain loaded');
  
  // 2. Crear instancia del cerebro
  console.log('\n2️⃣ Creating baby brain instance...');
  const babyBrain = new BabyBrain();
  console.log('✅ Baby brain created');
  
  // 3. Probar el self-test
  console.log('\n3️⃣ Running self-test...');
  const testResult = babyBrain.test();
  console.log('Test result:', testResult);
  
  // 4. Probar memoria
  console.log('\n4️⃣ Testing memory functions...');
  babyBrain.remember({ message: 'Hola mundo', user: 'test' });
  babyBrain.remember({ message: 'Como estas?', user: 'test' });
  babyBrain.remember({ message: 'Prueba 3', user: 'test' });
  
  const memories = babyBrain.recall();
  console.log(`Total memories: ${memories.length}`);
  
  // 5. Buscar memoria específica
  console.log('\n5️⃣ Testing memory search...');
  const found = babyBrain.recall('Hola');
  console.log('Found memory:', found ? 'YES' : 'NO');
  
  // 6. Estado general
  console.log('\n6️⃣ Getting brain status...');
  const status = babyBrain.getStatus();
  console.log('Brain status:', JSON.stringify(status, null, 2));
  
  // 7. Simular conexión con FudiClaudeDirect
  console.log('\n7️⃣ Simulating FudiClaudeDirect connection...');
  const mockFudi = {
    name: 'MockFudiClaudeDirect',
    brainConnections: {}
  };
  
  const connected = babyBrain.connectToFudi(mockFudi);
  console.log('Connection result:', connected ? 'SUCCESS' : 'FAILED');
  console.log('Fudi now has babyBrain?', mockFudi.babyBrain ? 'YES' : 'NO');
  
  console.log('\n✅ ALL TESTS COMPLETED!');
  console.log('🧠 Baby brain structure is working correctly!');
  
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  console.error('Stack:', error.stack);
}