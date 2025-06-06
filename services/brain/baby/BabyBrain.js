// 🧠 services/brain/baby/BabyBrain.js
// BABY BRAIN - Main Orchestrator v0.1
// El cerebro bebé que conecta todo

const BrainConnector = require('./connections/BrainConnector');
const MemoryLobe = require('./lobes/MemoryLobe');

class BabyBrain {
  constructor() {
    console.log('👶 BabyBrain: Baby brain waking up...');
    
    // Inicializar el conector
    this.connector = new BrainConnector();
    
    // Inicializar lóbulos
    this.lobes = {
      memory: new MemoryLobe()
    };
    
    // Registrar lóbulos con el conector
    Object.entries(this.lobes).forEach(([name, lobe]) => {
      this.connector.registerLobe(name, lobe);
    });
    
    console.log('✅ BabyBrain: Baby brain is awake and ready!');
  }

  // Conectar con FudiClaudeDirect
  connectToFudi(fudiClaudeDirectInstance) {
    console.log('🔗 BabyBrain: Connecting to FudiClaudeDirect...');
    
    const connected = this.connector.connectToHost(fudiClaudeDirectInstance);
    
    if (connected) {
      console.log('✅ BabyBrain: Successfully connected to Fudi!');
      
      // Hacer que el cerebro esté disponible en Fudi
      fudiClaudeDirectInstance.babyBrain = this;
    }
    
    return connected;
  }

  // Procesar información (método principal)
  process(input, context = {}) {
    console.log('🧠 BabyBrain: Processing input...');
    
    // Por ahora, solo guardamos en memoria
    const memory = this.lobes.memory.remember({
      input: input,
      context: context,
      timestamp: new Date()
    });
    
    // En el futuro, aquí coordinaremos entre múltiples lóbulos
    
    return {
      processed: true,
      memory: memory,
      response: `Baby brain processed: "${input}"`
    };
  }

  // Recordar algo
  remember(data) {
    return this.lobes.memory.remember(data);
  }

  // Recuperar memorias
  recall(searchTerm) {
    if (searchTerm) {
      return this.lobes.memory.recall(searchTerm);
    }
    return this.lobes.memory.recallAll();
  }

  // Estado del cerebro
  getStatus() {
    return {
      brain: 'BabyBrain',
      version: '0.1',
      status: 'baby_functional',
      connector: this.connector.getStatus(),
      lobesCount: Object.keys(this.lobes).length,
      activeLobes: Object.keys(this.lobes)
    };
  }

  // Método de prueba
  test() {
    console.log('🧪 BabyBrain: Running self-test...');
    
    const tests = {
      memory: false,
      connector: false,
      processing: false
    };
    
    try {
      // Test memory
      this.remember('test data');
      const recalled = this.recall('test');
      tests.memory = recalled !== null;
      
      // Test connector
      tests.connector = this.connector.getStatus().connectedLobes > 0;
      
      // Test processing
      const result = this.process('test input');
      tests.processing = result.processed === true;
      
      console.log('🧪 BabyBrain: Test results:', tests);
      
      return {
        success: Object.values(tests).every(t => t === true),
        tests: tests
      };
      
    } catch (error) {
      console.error('❌ BabyBrain: Test failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = BabyBrain;