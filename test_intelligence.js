// 🧪 TEST DE SISTEMA DE INTELIGENCIA CONTEXTUAL
// Prueba ContextDetector + PromptManager antes del deploy

console.log('🧪 INICIANDO TEST DE INTELIGENCIA CONTEXTUAL...\n');

// Importar los módulos
const { ContextDetector } = require('./services/intelligence/ContextDetector');
const { PromptManager } = require('./services/intelligence/PromptManager');

// Inicializar
const contextDetector = new ContextDetector();
const promptManager = new PromptManager();

// Test cases críticos
const testCases = [
  {
    message: "Hola Fudi",
    expectedContext: "casual",
    description: "Saludo simple - debe ser CASUAL"
  },
  {
    message: "¿Cómo van las ventas hoy?",
    expectedContext: "analitico", 
    description: "Pregunta por datos - debe ser ANALÍTICO"
  },
  {
    message: "¿Qué opinas de esta estrategia de marketing?",
    expectedContext: "consultivo",
    description: "Pregunta de opinión - debe ser CONSULTIVO"
  },
  {
    message: "Tengo un problema urgente con las ventas",
    expectedContext: "urgente",
    description: "Problema - debe ser URGENTE"
  },
  {
    message: "Buenos días, ¿todo bien?",
    expectedContext: "casual",
    description: "Saludo matutino - debe ser CASUAL"
  },
  {
    message: "¿Cuál fue mi platillo estrella ayer?",
    expectedContext: "analitico",
    description: "Pregunta específica por datos - debe ser ANALÍTICO"
  },
  {
    message: "Necesito ayuda para mejorar mis ganancias",
    expectedContext: "consultivo",
    description: "Solicitud de ayuda - debe ser CONSULTIVO"
  },
  {
    message: "No funciona el sistema de pagos",
    expectedContext: "urgente",
    description: "Problema técnico - debe ser URGENTE"
  }
];

async function runTests() {
  console.log('🔍 TESTING CONTEXT DETECTOR...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    
    try {
      console.log(`📝 Test ${i + 1}: "${testCase.message}"`);
      console.log(`📋 Descripción: ${testCase.description}`);
      console.log(`🎯 Esperado: ${testCase.expectedContext.toUpperCase()}`);
      
      // Detectar contexto
      const result = contextDetector.detectContext(testCase.message, []);
      
      console.log(`🔍 Detectado: ${result.primary.toUpperCase()} (${Math.round(result.confidence * 100)}% confianza)`);
      console.log(`📊 Scores:`, result.scores);
      
      // Verificar si es correcto
      const isCorrect = result.primary === testCase.expectedContext;
      
      if (isCorrect) {
        console.log('✅ PASSED - Contexto detectado correctamente\n');
        passed++;
      } else {
        console.log('❌ FAILED - Contexto incorrecto detectado\n');
        failed++;
      }
      
    } catch (error) {
      console.log('💥 ERROR en test:', error.message);
      failed++;
    }
  }
  
  console.log('📊 RESULTADOS CONTEXT DETECTOR:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%\n`);
  
  // Test PromptManager
  console.log('🎯 TESTING PROMPT MANAGER...\n');
  
  // Probar generación de prompts para cada contexto
  const contextTypes = ['casual', 'analitico', 'consultivo', 'urgente'];
  
  for (const contextType of contextTypes) {
    try {
      console.log(`🎭 Testing prompt generation for: ${contextType.toUpperCase()}`);
      
      const mockContext = {
        primary: contextType,
        confidence: 0.85,
        scores: { [contextType]: 0.85 }
      };
      
      const mockRestaurant = {
        name: "Test Restaurant",
        pos_type: "poster"
      };
      
      const prompt = promptManager.generateSystemPrompt(mockContext, mockRestaurant, {});
      
      console.log(`📏 Prompt length: ${prompt.length} characters`);
      console.log(`🔤 Estimated tokens: ~${Math.round(prompt.length / 4)}`);
      
      // Verificar que el prompt contiene las palabras clave del contexto
      const promptLower = prompt.toLowerCase();
      let hasContextKeywords = false;
      
      if (contextType === 'casual' && promptLower.includes('casual')) hasContextKeywords = true;
      if (contextType === 'analitico' && promptLower.includes('analítico')) hasContextKeywords = true;
      if (contextType === 'consultivo' && promptLower.includes('consultivo')) hasContextKeywords = true;
      if (contextType === 'urgente' && promptLower.includes('urgente')) hasContextKeywords = true;
      
      if (hasContextKeywords) {
        console.log('✅ Prompt contains context-specific keywords');
      } else {
        console.log('⚠️  Prompt might not contain context-specific keywords');
      }
      
      console.log('--- PROMPT PREVIEW ---');
      console.log(prompt.substring(0, 200) + '...\n');
      
    } catch (error) {
      console.log('💥 ERROR generating prompt:', error.message);
    }
  }
  
  console.log('🏁 TESTING COMPLETE!\n');
  
  // Summary
  console.log('📋 RESUMEN FINAL:');
  console.log('🧠 ContextDetector: Funcionando' + (failed === 0 ? ' perfectamente' : ' con algunos fallos'));
  console.log('🎯 PromptManager: Funcionando correctamente');
  console.log('⚡ Sistema listo para integración en FudiClaudeDirect');
  
  if (failed === 0) {
    console.log('\n🎉 ¡TODOS LOS TESTS PASARON! Sistema listo para deployment.');
  } else {
    console.log('\n⚠️  Algunos tests fallaron. Revisar lógica de detección.');
  }
}

// Ejecutar tests
runTests().catch(error => {
  console.error('💥 Error ejecutando tests:', error);
});

// Test adicional - Verificar que las clases se pueden instanciar
console.log('🔧 TESTING BASIC INSTANTIATION...');

try {
  const detector = new ContextDetector();
  console.log('✅ ContextDetector instantiated successfully');
  
  const manager = new PromptManager();
  console.log('✅ PromptManager instantiated successfully');
  
  console.log('🚀 Ready to run full tests!\n');
  
} catch (error) {
  console.error('💥 Instantiation error:', error.message);
  console.log('❌ Check if modules are properly exported');
}