// 🧠 services/brain/baby/lobes/MemoryLobe.js
// BABY BRAIN - Memory Lobe v0.1
// Empieza SUPER simple - solo recuerda las últimas 5 interacciones

class MemoryLobe {
  constructor() {
    console.log('👶 MemoryLobe: Baby memory initializing...');
    
    // Super simple - solo un array para memoria corta
    this.shortTermMemory = [];
    this.maxMemories = 5;
    
    console.log('✅ MemoryLobe: Ready to remember things!');
  }

  // Recordar algo nuevo
  remember(data) {
    const memory = {
      timestamp: new Date(),
      data: data,
      id: Date.now()
    };
    
    this.shortTermMemory.push(memory);
    
    // Si tenemos más de 5, olvidamos la más vieja (como bebé)
    if (this.shortTermMemory.length > this.maxMemories) {
      const forgotten = this.shortTermMemory.shift();
      console.log('🧠 MemoryLobe: Forgot old memory:', forgotten.id);
    }
    
    console.log(`🧠 MemoryLobe: Remembered new thing! Total memories: ${this.shortTermMemory.length}`);
    return memory;
  }

  // Recordar todo
  recallAll() {
    console.log(`🧠 MemoryLobe: Recalling ${this.shortTermMemory.length} memories`);
    return this.shortTermMemory;
  }

  // Recordar la última cosa
  recallLast() {
    if (this.shortTermMemory.length === 0) {
      console.log('🧠 MemoryLobe: No memories yet!');
      return null;
    }
    return this.shortTermMemory[this.shortTermMemory.length - 1];
  }

  // Buscar un recuerdo específico
  recall(searchTerm) {
    const found = this.shortTermMemory.find(memory => 
      JSON.stringify(memory.data).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (found) {
      console.log('🧠 MemoryLobe: Found memory!', found.id);
    } else {
      console.log('🧠 MemoryLobe: No memory found for:', searchTerm);
    }
    
    return found;
  }

  // Limpiar toda la memoria (reset)
  forget() {
    const count = this.shortTermMemory.length;
    this.shortTermMemory = [];
    console.log(`🧠 MemoryLobe: Forgot everything! Cleared ${count} memories`);
  }

  // Estado del lóbulo
  getStatus() {
    return {
      lobe: 'MemoryLobe',
      version: '0.1',
      status: 'baby_functional',
      memories: this.shortTermMemory.length,
      maxCapacity: this.maxMemories,
      oldestMemory: this.shortTermMemory[0]?.timestamp || null,
      newestMemory: this.shortTermMemory[this.shortTermMemory.length - 1]?.timestamp || null
    };
  }
}

module.exports = MemoryLobe;