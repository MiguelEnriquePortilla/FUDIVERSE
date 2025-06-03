// run-intelligence.js
// Script to run UniversalIntelligenceProcessor with proper env loading

require('dotenv').config();
const { UniversalIntelligenceProcessor } = require('./services/intelligence/UniversalIntelligenceProcessor');

async function runIntelligenceProcessing() {
  try {
    console.log('🧠 FUDIVERSE INTELLIGENCE PROCESSING');
    console.log('════════════════════════════════════');
    console.log('🎯 META: Alcanzar FudiGPT 99/100');
    console.log('📊 Procesando intelligence tables...\n');
    
    const processor = new UniversalIntelligenceProcessor();
    
    console.log('🚀 Iniciando procesamiento universal...');
    const result = await processor.processAllRestaurants();
    
    console.log('\n✅ INTELLIGENCE PROCESSING COMPLETADO');
    console.log('════════════════════════════════════');
    console.log('📊 Resultado:', result);
    console.log('\n🎉 FudiGPT debería estar ahora en 99/100!');
    console.log('🔥 Intelligence tables generadas exitosamente');
    
  } catch (error) {
    console.error('❌ Error durante procesamiento:', error);
    console.log('\n💡 Verificar:');
    console.log('  - Variables de entorno en .env');
    console.log('  - Conexión a Supabase');
    console.log('  - Permisos de base de datos');
  }
}

runIntelligenceProcessing();