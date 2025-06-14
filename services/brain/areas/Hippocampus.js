/**
 * 🧠💾 HIPPOCAMPUS DIGITAL - SISTEMA DE MEMORIA NEURAL
 * "La memoria que nunca olvida y siempre aprende"
 * 
 * FUNCIONES:
 * - Memoria a largo plazo de restaurantes
 * - Aprendizaje de patrones de usuario
 * - Evolución de personalidad por restaurante
 * - Memoria contextual de conversaciones
 * - Predicción basada en historial
 */

class Hippocampus {
    constructor() {
        console.log('[HIPPOCAMPUS] 🧠💾 Iniciando sistema de memoria neural...');
        
        // MEMORIA A LARGO PLAZO
        this.longTermMemory = {
            restaurants: new Map(), // Memoria específica por restaurante
            userProfiles: new Map(), // Perfiles de usuarios aprendidos
            conversationPatterns: new Map(), // Patrones de conversación exitosos
            businessInsights: new Map(), // Insights de negocio acumulados
            seasonalPatterns: new Map() // Patrones estacionales detectados
        };

        // MEMORIA DE TRABAJO (CORTO PLAZO)
        this.workingMemory = {
            currentSession: null,
            recentInteractions: [],
            activeContext: {},
            temporaryInsights: []
        };

        // SISTEMA DE APRENDIZAJE
        this.learningSystem = {
            memoryConsolidation: this.consolidateMemories.bind(this),
            patternRecognition: this.recognizePatterns.bind(this),
            adaptivePersonality: this.adaptPersonality.bind(this),
            predictiveModeling: this.generatePredictions.bind(this)
        };

        // CONFIGURACIÓN DE MEMORIA
        this.memoryConfig = {
            maxWorkingMemorySize: 50,
            consolidationThreshold: 5,
            forgettingCurve: 0.1,
            learningRate: 0.3,
            confidenceThreshold: 0.7
        };

        console.log('[HIPPOCAMPUS] 💾 Sistema de memoria operativo - Listo para aprender y recordar');
    }

    /**
     * 💾 RECORDAR RESTAURANTE ESPECÍFICO
     * Recupera memoria completa de un restaurante
     */
    rememberRestaurant(restaurantId) {
        console.log(`[HIPPOCAMPUS] 🏪 Recordando restaurante ${restaurantId}...`);
        
        if (!this.longTermMemory.restaurants.has(restaurantId)) {
            // Crear memoria nueva para restaurante
            this.longTermMemory.restaurants.set(restaurantId, {
                id: restaurantId,
                personality: this.createDefaultPersonality(),
                successfulInteractions: [],
                businessPatterns: {},
                userPreferences: {},
                learnedInsights: [],
                memoryStrength: 0.5,
                lastUpdate: new Date().toISOString(),
                interactionCount: 0
            });
            
            console.log(`[HIPPOCAMPUS] 🆕 Nueva memoria creada para restaurante ${restaurantId}`);
        }

        const restaurantMemory = this.longTermMemory.restaurants.get(restaurantId);
        
        console.log(`[HIPPOCAMPUS] 📚 Memoria recuperada: ${restaurantMemory.interactionCount} interacciones, fuerza ${restaurantMemory.memoryStrength}`);
        
        return restaurantMemory;
    }

    /**
     * 🎭 PERSONALIDAD ADAPTIVA POR RESTAURANTE
     * Cada restaurante desarrolla su propia personalidad
     */
    adaptPersonality(restaurantId, userFeedback, interactionSuccess) {
        console.log(`[HIPPOCAMPUS] 🎭 Adaptando personalidad para ${restaurantId}...`);
        
        const memory = this.rememberRestaurant(restaurantId);
        const learningRate = this.memoryConfig.learningRate;
        
        // Adaptar personalidad basada en éxito de interacciones
        if (interactionSuccess > 0.8) {
            // Reforzar personalidad actual
            memory.personality.confidence += learningRate * 0.1;
            memory.personality.effectiveness += learningRate * 0.1;
        } else if (interactionSuccess < 0.5) {
            // Ajustar personalidad
            memory.personality.adaptability += learningRate * 0.2;
            memory.personality.cautiousness += learningRate * 0.1;
        }

        // Aprender de feedback específico
        if (userFeedback) {
            this.processUserFeedback(memory, userFeedback);
        }

        // Normalizar valores
        this.normalizePersonality(memory.personality);
        
        memory.lastUpdate = new Date().toISOString();
        memory.memoryStrength = Math.min(1.0, memory.memoryStrength + 0.1);
        
        console.log(`[HIPPOCAMPUS] 🎯 Personalidad adaptada: confidence ${memory.personality.confidence.toFixed(2)}`);
        
        return memory.personality;
    }

    /**
     * 📊 APRENDER DE INTERACCIÓN
     * Aprende de cada interacción exitosa o fallida
     */
    learnFromInteraction(restaurantId, context, outcome, userSatisfaction = null) {
        console.log(`[HIPPOCAMPUS] 📚 Aprendiendo de interacción con ${restaurantId}...`);
        
        const memory = this.rememberRestaurant(restaurantId);
        
        // Crear registro de interacción
        const interactionRecord = {
            timestamp: new Date().toISOString(),
            context: {
                userMessage: context.userMessage,
                dataContext: context.dataContext,
                emotionalState: context.emotionalState,
                responseStrategy: context.responseStrategy
            },
            outcome: {
                success: outcome.success,
                userEngagement: outcome.userEngagement || 0.5,
                dataAccuracy: outcome.dataAccuracy || 0.8,
                responseQuality: outcome.responseQuality || 0.7
            },
            userSatisfaction: userSatisfaction,
            lessons: this.extractLessons(context, outcome)
        };

        // Agregar a memoria de trabajo
        this.workingMemory.recentInteractions.push(interactionRecord);
        
        // Agregar a memoria a largo plazo si es significativo
        if (this.isSignificantInteraction(interactionRecord)) {
            memory.successfulInteractions.push(interactionRecord);
            memory.interactionCount++;
            
            // Consolidar memoria si alcanza umbral
            if (memory.successfulInteractions.length >= this.memoryConfig.consolidationThreshold) {
                this.consolidateRestaurantMemory(restaurantId);
            }
        }

        // Actualizar patrones de negocio
        this.updateBusinessPatterns(memory, context.dataContext);
        
        console.log(`[HIPPOCAMPUS] ✅ Interacción aprendida: total ${memory.interactionCount}`);
        
        return interactionRecord;
    }

    /**
     * 🔮 GENERAR PREDICCIONES
     * Predice mejores estrategias basadas en memoria
     */
    generatePredictions(restaurantId, currentContext) {
        console.log(`[HIPPOCAMPUS] 🔮 Generando predicciones para ${restaurantId}...`);
        
        const memory = this.rememberRestaurant(restaurantId);
        const predictions = {
            personalityRecommendations: this.predictOptimalPersonality(memory, currentContext),
            responseStrategy: this.predictBestStrategy(memory, currentContext),
            userExpectations: this.predictUserExpectations(memory, currentContext),
            businessOpportunities: this.predictBusinessOpportunities(memory, currentContext),
            confidence: this.calculatePredictionConfidence(memory)
        };

        console.log(`[HIPPOCAMPUS] 🎯 Predicciones generadas con ${predictions.confidence.toFixed(2)} confianza`);
        
        return predictions;
    }

    /**
     * 🧠 RECONOCIMIENTO DE PATRONES
     * Identifica patrones en datos y comportamientos
     */
    recognizePatterns(restaurantId, newData) {
        console.log(`[HIPPOCAMPUS] 🔍 Reconociendo patrones para ${restaurantId}...`);
        
        const memory = this.rememberRestaurant(restaurantId);
        const patterns = {
            temporalPatterns: this.findTemporalPatterns(memory, newData),
            userBehaviorPatterns: this.findUserPatterns(memory, newData),
            businessCyclePatterns: this.findBusinessCycles(memory, newData),
            anomalies: this.detectAnomalies(memory, newData)
        };

        // Actualizar patrones en memoria
        memory.businessPatterns = { ...memory.businessPatterns, ...patterns };
        
        return patterns;
    }

    /**
     * 💾 CONSOLIDACIÓN DE MEMORIA
     * Convierte memoria de trabajo en memoria a largo plazo
     */
    consolidateMemories() {
        console.log('[HIPPOCAMPUS] 🔄 Consolidando memorias...');
        
        const workingInteractions = this.workingMemory.recentInteractions;
        let consolidatedCount = 0;

        workingInteractions.forEach(interaction => {
            if (this.shouldConsolidate(interaction)) {
                this.moveToLongTermMemory(interaction);
                consolidatedCount++;
            }
        });

        // Limpiar memoria de trabajo
        this.workingMemory.recentInteractions = this.workingMemory.recentInteractions
            .slice(-this.memoryConfig.maxWorkingMemorySize);

        console.log(`[HIPPOCAMPUS] ✅ ${consolidatedCount} memorias consolidadas`);
        
        return consolidatedCount;
    }

    /**
     * 🏪 CONSOLIDAR MEMORIA DE RESTAURANTE ESPECÍFICO
     */
    consolidateRestaurantMemory(restaurantId) {
        console.log(`[HIPPOCAMPUS] 🏪 Consolidando memoria de ${restaurantId}...`);
        
        const memory = this.rememberRestaurant(restaurantId);
        
        // Extraer insights consolidados
        const consolidatedInsights = this.extractConsolidatedInsights(memory.successfulInteractions);
        
        // Actualizar insights aprendidos
        memory.learnedInsights = [...memory.learnedInsights, ...consolidatedInsights];
        
        // Limpiar interacciones antiguas (mantener solo las más significativas)
        memory.successfulInteractions = this.filterSignificantInteractions(memory.successfulInteractions);
        
        // Fortalecer memoria
        memory.memoryStrength = Math.min(1.0, memory.memoryStrength + 0.2);
        
        console.log(`[HIPPOCAMPUS] 💪 Memoria consolidada: ${memory.learnedInsights.length} insights totales`);
    }

    /**
     * 🎯 CREAR PERSONALIDAD POR DEFECTO
     */
    createDefaultPersonality() {
        return {
            enthusiasm: 0.7,
            mexicanismo: 0.8,
            directness: 0.6,
            empathy: 0.7,
            intelligence: 0.8,
            humor: 0.6,
            confidence: 0.5,
            adaptability: 0.7,
            effectiveness: 0.5,
            cautiousness: 0.4
        };
    }

    /**
     * 📝 PROCESAR FEEDBACK DEL USUARIO
     */
    processUserFeedback(memory, feedback) {
        const feedbackAnalysis = this.analyzeFeedback(feedback);
        
        // Ajustar personalidad basada en feedback
        if (feedbackAnalysis.wantsMoreEnthusiasm) {
            memory.personality.enthusiasm += 0.1;
        }
        if (feedbackAnalysis.wantsMoreMexican) {
            memory.personality.mexicanismo += 0.1;
        }
        if (feedbackAnalysis.wantsMoreDirectness) {
            memory.personality.directness += 0.1;
        }
        if (feedbackAnalysis.wantsMoreEmpathy) {
            memory.personality.empathy += 0.1;
        }
    }

    /**
     * 🔍 ANALIZAR FEEDBACK
     */
    analyzeFeedback(feedback) {
        const text = feedback.toLowerCase();
        
        return {
            wantsMoreEnthusiasm: text.includes('más energía') || text.includes('más entusiasmo'),
            wantsMoreMexican: text.includes('más mexicano') || text.includes('más natural'),
            wantsMoreDirectness: text.includes('más directo') || text.includes('al grano'),
            wantsMoreEmpathy: text.includes('más empático') || text.includes('más comprensivo'),
            satisfaction: this.extractSatisfactionLevel(text)
        };
    }

    /**
     * 📊 EXTRAER NIVEL DE SATISFACCIÓN
     */
    extractSatisfactionLevel(text) {
        if (text.includes('excelente') || text.includes('perfecto')) return 1.0;
        if (text.includes('bueno') || text.includes('bien')) return 0.8;
        if (text.includes('regular') || text.includes('ok')) return 0.6;
        if (text.includes('malo') || text.includes('mal')) return 0.3;
        return 0.5; // Neutral
    }

    /**
     * ⚖️ NORMALIZAR PERSONALIDAD
     */
    normalizePersonality(personality) {
        Object.keys(personality).forEach(key => {
            personality[key] = Math.max(0.1, Math.min(1.0, personality[key]));
        });
    }

    /**
     * 📚 EXTRAER LECCIONES DE INTERACCIÓN
     */
    extractLessons(context, outcome) {
        const lessons = [];
        
        if (outcome.success && outcome.userEngagement > 0.8) {
            lessons.push(`Estrategia exitosa: ${context.responseStrategy}`);
        }
        
        if (outcome.dataAccuracy > 0.9) {
            lessons.push('Datos precisos generan confianza');
        }
        
        if (outcome.responseQuality > 0.8) {
            lessons.push(`Tono efectivo: ${context.emotionalState}`);
        }
        
        return lessons;
    }

    /**
     * 🎯 VERIFICAR SI INTERACCIÓN ES SIGNIFICATIVA
     */
    isSignificantInteraction(interaction) {
        const score = (interaction.outcome.success * 0.4) +
                     (interaction.outcome.userEngagement * 0.3) +
                     (interaction.outcome.responseQuality * 0.3);
        
        return score > 0.7;
    }

    /**
     * 📈 ACTUALIZAR PATRONES DE NEGOCIO
     */
    updateBusinessPatterns(memory, dataContext) {
        if (!dataContext || !dataContext.recentData) return;
        
        const patterns = memory.businessPatterns;
        
        // Actualizar patrones de ventas
        if (dataContext.recentData.salesGrowth !== undefined) {
            patterns.salesTrend = dataContext.recentData.salesGrowth;
        }
        
        // Actualizar patrones de productos
        if (dataContext.recentData.newBestProducts) {
            patterns.productTrends = dataContext.recentData.newBestProducts;
        }
    }

    /**
     * 🔮 PREDECIR PERSONALIDAD ÓPTIMA
     */
    predictOptimalPersonality(memory, context) {
        const basePersonality = { ...memory.personality };
        
        // Ajustar según contexto actual
        if (context.urgencyLevel === 'high') {
            basePersonality.directness = Math.min(1.0, basePersonality.directness + 0.2);
        }
        
        if (context.emotionalState === 'stress') {
            basePersonality.empathy = Math.min(1.0, basePersonality.empathy + 0.3);
        }
        
        return basePersonality;
    }

    /**
     * 🎯 PREDECIR MEJOR ESTRATEGIA
     */
    predictBestStrategy(memory, context) {
        const strategies = memory.successfulInteractions
            .filter(i => i.outcome.success > 0.8)
            .map(i => i.context.responseStrategy);
        
        // Encontrar estrategia más común exitosa
        const strategyCount = {};
        strategies.forEach(s => {
            strategyCount[s] = (strategyCount[s] || 0) + 1;
        });
        
        const bestStrategy = Object.keys(strategyCount)
            .reduce((a, b) => strategyCount[a] > strategyCount[b] ? a : b, 'balanced');
        
        return bestStrategy;
    }

    /**
     * 👥 PREDECIR EXPECTATIVAS DEL USUARIO
     */
    predictUserExpectations(memory, context) {
        return {
            preferredTone: this.findPreferredTone(memory),
            expectedDetailLevel: this.findPreferredDetailLevel(memory),
            communicationStyle: this.findPreferredStyle(memory)
        };
    }

    /**
     * 💼 PREDECIR OPORTUNIDADES DE NEGOCIO
     */
    predictBusinessOpportunities(memory, context) {
        const patterns = memory.businessPatterns;
        const opportunities = [];
        
        if (patterns.salesTrend > 0.1) {
            opportunities.push('Aprovechar momentum de crecimiento');
        }
        
        if (patterns.productTrends > 5) {
            opportunities.push('Optimizar productos estrella');
        }
        
        return opportunities;
    }

    /**
     * 📊 CALCULAR CONFIANZA DE PREDICCIÓN
     */
    calculatePredictionConfidence(memory) {
        const dataPoints = memory.interactionCount;
        const memoryStrength = memory.memoryStrength;
        
        // Más interacciones = más confianza
        const dataConfidence = Math.min(1.0, dataPoints / 20);
        
        return (dataConfidence * 0.7) + (memoryStrength * 0.3);
    }

    /**
     * 🕰️ ENCONTRAR PATRONES TEMPORALES
     */
    findTemporalPatterns(memory, newData) {
        // Simplificado - analizar patrones por hora del día
        return {
            bestHours: [17, 18, 19], // Horas pico comunes
            worstHours: [15, 16], // Horas bajas comunes
            pattern: 'dinner_rush'
        };
    }

    /**
     * 👤 ENCONTRAR PATRONES DE USUARIO
     */
    findUserPatterns(memory, newData) {
        return {
            preferredInteractionStyle: 'conversational',
            responseToMexican: 'positive',
            dataPreference: 'detailed'
        };
    }

    /**
     * 📈 ENCONTRAR CICLOS DE NEGOCIO
     */
    findBusinessCycles(memory, newData) {
        return {
            weeklyPattern: 'weekend_peak',
            monthlyPattern: 'end_of_month_high',
            seasonalPattern: 'summer_growth'
        };
    }

    /**
     * 🚨 DETECTAR ANOMALÍAS
     */
    detectAnomalies(memory, newData) {
        const anomalies = [];
        
        // Detectar anomalías simples
        if (newData && newData.recentData) {
            if (Math.abs(newData.recentData.salesGrowth) > 0.5) {
                anomalies.push('Cambio drástico en ventas');
            }
        }
        
        return anomalies;
    }

    /**
     * 📝 UTILIDADES DE MEMORIA
     */
    shouldConsolidate(interaction) {
        return interaction.outcome.success > 0.6;
    }

    moveToLongTermMemory(interaction) {
        // Mover interacción significativa a memoria a largo plazo
        // Implementación simplificada
    }

    extractConsolidatedInsights(interactions) {
        return interactions
            .filter(i => i.outcome.success > 0.8)
            .slice(-5) // Últimas 5 más exitosas
            .map(i => ({
                insight: `Estrategia exitosa: ${i.context.responseStrategy}`,
                confidence: i.outcome.success,
                timestamp: i.timestamp
            }));
    }

    filterSignificantInteractions(interactions) {
        return interactions
            .sort((a, b) => b.outcome.success - a.outcome.success)
            .slice(0, 10); // Mantener top 10
    }

    findPreferredTone(memory) {
        return 'friendly_professional'; // Simplificado
    }

    findPreferredDetailLevel(memory) {
        return 'detailed'; // Simplificado
    }

    findPreferredStyle(memory) {
        return 'conversational_mexican'; // Simplificado
    }

    /**
     * 📊 STATUS DE MEMORIA
     */
    getMemoryStatus() {
        return {
            restaurants: this.longTermMemory.restaurants.size,
            workingMemorySize: this.workingMemory.recentInteractions.length,
            totalInteractions: Array.from(this.longTermMemory.restaurants.values())
                .reduce((sum, r) => sum + r.interactionCount, 0),
            averageMemoryStrength: Array.from(this.longTermMemory.restaurants.values())
                .reduce((sum, r) => sum + r.memoryStrength, 0) / this.longTermMemory.restaurants.size || 0
        };
    }
}

module.exports = { Hippocampus };