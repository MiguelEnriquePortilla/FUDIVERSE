// 🧠 services/brain/baby/connections/BrainConnector.js
// BABY BRAIN - Brain Connector v0.1
// Conecta los lóbulos bebé con FudiClaudeDirect

class BrainConnector {
  constructor() {
    console.log('🧠 BrainConnector: Initializing baby brain connections...');
    
    // Registro de lóbulos conectados
    this.connectedLobes = new Map();
    
    // Estado de conexión
    this.isConnected = false;
    this.hostSystem = null;
    
    console.log('✅ BrainConnector: Ready to connect lobes!');
  }

  // Conectar con el sistema host (FudiClaudeDirect)
  connectToHost(hostSystem) {
    console.log('🔌 BrainConnector: Connecting to host system...');
    
    this.hostSystem = hostSystem;
    this.isConnected = true;
    
    // Agregar el método de conexión al host si no existe
    if (!hostSystem.connectBrainLobe) {
      hostSystem.connectBrainLobe = (lobeName, lobeInstance) => {
        console.log(`🧠 Host: Receiving connection from ${lobeName} lobe`);
        if (!hostSystem.brainConnections) {
          hostSystem.brainConnections = {};
        }
        hostSystem.brainConnections[lobeName] = lobeInstance;
        return true;
      };
    }
    
    console.log('✅ BrainConnector: Connected to host system!');
    return true;
  }

  // Registrar un nuevo lóbulo
  registerLobe(lobeName, lobeInstance) {
    console.log(`🧠 BrainConnector: Registering ${lobeName} lobe...`);
    
    // Validar que el lóbulo tenga los métodos básicos
    if (!lobeInstance.getStatus || typeof lobeInstance.getStatus !== 'function') {
      console.error(`❌ BrainConnector: ${lobeName} lobe missing getStatus method!`);
      return false;
    }
    
    // Registrar el lóbulo
    this.connectedLobes.set(lobeName, lobeInstance);
    
    // Si ya estamos conectados al host, conectar el lóbulo inmediatamente
    if (this.isConnected && this.hostSystem) {
      this.hostSystem.connectBrainLobe(lobeName, lobeInstance);
      console.log(`✅ BrainConnector: ${lobeName} lobe connected to host!`);
    }
    
    return true;
  }

  // Obtener un lóbulo específico
  getLobe(lobeName) {
    return this.connectedLobes.get(lobeName);
  }

  // Obtener todos los lóbulos
  getAllLobes() {
    const lobes = {};
    this.connectedLobes.forEach((lobe, name) => {
      lobes[name] = lobe;
    });
    return lobes;
  }

  // Broadcast un mensaje a todos los lóbulos
  broadcast(message, data) {
    console.log(`📢 BrainConnector: Broadcasting "${message}" to all lobes...`);
    
    const responses = {};
    
    this.connectedLobes.forEach((lobe, name) => {
      try {
        // Si el lóbulo tiene un método para manejar mensajes
        if (lobe.handleMessage && typeof lobe.handleMessage === 'function') {
          responses[name] = lobe.handleMessage(message, data);
        }
      } catch (error) {
        console.error(`❌ BrainConnector: Error broadcasting to ${name}:`, error);
        responses[name] = { error: error.message };
      }
    });
    
    return responses;
  }

  // Estado del conector
  getStatus() {
    const lobesStatus = {};
    
    this.connectedLobes.forEach((lobe, name) => {
      try {
        lobesStatus[name] = lobe.getStatus();
      } catch (error) {
        lobesStatus[name] = { error: 'Failed to get status' };
      }
    });
    
    return {
      connector: 'BrainConnector',
      version: '0.1',
      isConnected: this.isConnected,
      connectedLobes: this.connectedLobes.size,
      lobesStatus: lobesStatus,
      hostConnected: this.hostSystem !== null
    };
  }

  // Desconectar todo
  disconnect() {
    console.log('🔌 BrainConnector: Disconnecting all lobes...');
    
    // Notificar a todos los lóbulos
    this.broadcast('disconnect', {});
    
    // Limpiar conexiones
    this.connectedLobes.clear();
    this.hostSystem = null;
    this.isConnected = false;
    
    console.log('✅ BrainConnector: All connections closed');
  }
}

module.exports = BrainConnector;