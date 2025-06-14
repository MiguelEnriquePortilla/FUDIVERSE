/**
 * 🧠👂 WERNICKE'S AREA DIGITAL - COMPRENSIÓN AVANZADA DEL LENGUAJE
 * "El área que entiende lo que realmente quiere decir el usuario"
 * 
 * FUNCIONES:
 * - Comprensión profunda de intenciones
 * - Detección de contexto implícito
 * - Interpretación de emociones en texto
 * - Análisis semántico avanzado
 * - Desambiguación de consultas
 */

class WernickesArea {
    constructor() {
        console.log('[WERNICKE] 🧠👂 Iniciando área de comprensión del lenguaje...');
        
        // MODELOS DE COMPRENSIÓN
        this.comprehensionModels = {
            intentRecognition: new IntentRecognitionEngine(),
            contextAnalyzer: new ContextAnalyzer(),
            emotionDetector: new EmotionDetector(),
            semanticParser: new SemanticParser(),
            ambiguityResolver: new AmbiguityResolver()
        };

        // DICCIONARIO DE INTENCIONES RESTAURANTE
        this.restaurantIntents = {
            // CONSULTAS DE DATOS
            sales_inquiry: {
                patterns: ['ventas', 'cómo van', 'cuánto', 'revenue', 'facturación'],
                subintents: ['today', 'yesterday', 'comparison', 'trend', 'specific_period'],
                confidence_threshold: 0.7
            },
            
            product_analysis: {
                patterns: ['productos', 'platillos', 'qué vende', 'bestseller', 'popular'],
                subintents: ['top_products', 'worst_products', 'product_trends', 'specific_product'],
                confidence_threshold: 0.8
            },
            
            time_analysis: {
                patterns: ['hora', 'horario', 'cuándo', 'rush', 'pico', 'mejor momento'],
                subintents: ['peak_hours', 'slow_hours', 'hour_comparison', 'time_optimization'],
                confidence_threshold: 0.75
            },
            
            // CONSULTAS DE OPTIMIZACIÓN
            optimization_request: {
                patterns: ['cómo mejorar', 'optimizar', 'estrategia', 'crecer', 'aumentar'],
                subintents: ['sales_optimization', 'product_optimization', 'time_optimization', 'general_strategy'],
                confidence_threshold: 0.8
            },
            
            // CONSULTAS DE PROBLEMAS
            problem_identification: {
                patterns: ['problema', 'mal', 'bajo', 'crisis', 'ayuda', 'preocupa'],
                subintents: ['sales_problem', 'product_problem', 'operational_problem', 'urgent_help'],
                confidence_threshold: 0.85
            },
            
            // CONSULTAS EXPLORATORIAS
            exploration: {
                patterns: ['qué tal', 'cómo está', 'cuéntame', 'explícame', 'analiza'],
                subintents: ['general_overview', 'detailed_analysis', 'casual_check'],
                confidence_threshold: 0.6
            }
        };

        // CONTEXTOS SEMÁNTICOS
        this.semanticContexts = {
            temporal: {
                today: ['hoy', 'today', 'este día', 'ahorita'],
                yesterday: ['ayer', 'yesterday', 'día anterior'],
                week: ['semana', 'week', 'últimos días', 'esta semana'],
                month: ['mes', 'month', 'este mes', 'últimos 30'],
                comparison: ['vs', 'comparado', 'contra', 'diferencia', 'cambio']
            },
            
            performance: {
                good: ['bien', 'bueno', 'excelente', 'genial', 'padrísimo'],
                bad: ['mal', 'malo', 'terrible', 'feo', 'preocupante'],
                neutral: ['normal', 'regular', 'estable', 'igual', 'sin cambio']
            },
            
            urgency: {
                urgent: ['urgente', 'ya', 'inmediato', 'ahora', 'rápido'],
                planned: ['planear', 'estrategia', 'futuro', 'después'],
                casual: ['cuando puedas', 'no urgente', 'tranquilo']
            }
        };

        // PATRONES EMOCIONALES MEXICANOS
        this.mexicanEmotionalPatterns = {
            excitement: {
                expressions: ['órale', 'chingón', 'padrísimo', 'genial', 'increíble'],
                intensity_markers: ['muy', 'súper', 'bien', 're', 'mega'],
                context_clues: ['!', 'wow', 'brutal', 'de poca madre']
            },
            
            concern: {
                expressions: ['preocupa', 'mal', 'feo', 'problema', 'crisis'],
                intensity_markers: ['muy', 'súper', 'bien'],
                context_clues: ['ayuda', 'qué hago', 'no sé']
            },
            
            curiosity: {
                expressions: ['qué tal', 'cómo', 'cuéntame', 'explica'],
                intensity_markers: ['exactamente', 'detalle', 'específico'],
                context_clues: ['?', 'quiero saber', 'me interesa']
            },
            
            frustration: {
                expressions: ['frustrado', 'molesto', 'no entiendo', 'confundido'],
                intensity_markers: ['muy', 'súper', 'bien'],
                context_clues: ['no funciona', 'no jala', 'está mal']
            }
        };

        console.log('[WERNICKE] 👂 Área de Wernicke operativa - Comprensión avanzada activa');
    }

    /**
     * 🎯 COMPRENSIÓN PRINCIPAL DE MENSAJE
     * Analiza y comprende profundamente la intención del usuario
     */
    comprehendMessage(message, context = {}) {
        console.log(`[WERNICKE] 👂 Comprendiendo mensaje: "${message}"`);
        
        const comprehension = {
            originalMessage: message,
            primaryIntent: this.recognizePrimaryIntent(message),
            secondaryIntents: this.recognizeSecondaryIntents(message),
            semanticContext: this.extractSemanticContext(message),
            emotionalState: this.detectEmotionalState(message),
            implicitNeeds: this.identifyImplicitNeeds(message, context),
            ambiguityLevel: this.assessAmbiguity(message),
            comprehensionConfidence: 0,
            suggestedResponse: this.suggestResponseApproach(message)
        };

        // Calcular confianza de comprensión
        comprehension.comprehensionConfidence = this.calculateComprehensionConfidence(comprehension);
        
        console.log(`[WERNICKE] 🎯 Comprensión completada: ${comprehension.primaryIntent.intent} (${(comprehension.comprehensionConfidence * 100).toFixed(0)}% confianza)`);
        
        return comprehension;
    }

    /**
     * 🎯 RECONOCIMIENTO DE INTENCIÓN PRINCIPAL
     */
    recognizePrimaryIntent(message) {
        console.log('[WERNICKE] 🎯 Reconociendo intención principal...');
        
        const cleanMessage = message.toLowerCase().trim();
        const intentScores = {};

        // Analizar cada intención posible
        Object.entries(this.restaurantIntents).forEach(([intentKey, intentData]) => {
            let score = 0;
            
            // Buscar patrones en el mensaje
            intentData.patterns.forEach(pattern => {
                if (cleanMessage.includes(pattern)) {
                    score += 1.0;
                }
                
                // Búsqueda parcial (palabras similares)
                if (this.fuzzyMatch(cleanMessage, pattern)) {
                    score += 0.5;
                }
            });

            // Normalizar score
            score = score / intentData.patterns.length;
            
            if (score >= intentData.confidence_threshold) {
                intentScores[intentKey] = score;
            }
        });

        // Encontrar intención con mayor score
        const primaryIntentKey = Object.keys(intentScores)
            .reduce((a, b) => intentScores[a] > intentScores[b] ? a : b, 'exploration');

        const primaryIntent = {
            intent: primaryIntentKey,
            confidence: intentScores[primaryIntentKey] || 0.6,
            subintent: this.recognizeSubintent(message, primaryIntentKey),
            parameters: this.extractIntentParameters(message, primaryIntentKey)
        };

        return primaryIntent;
    }

    /**
     * 🔍 RECONOCIMIENTO DE INTENCIONES SECUNDARIAS
     */
    recognizeSecondaryIntents(message) {
        const cleanMessage = message.toLowerCase().trim();
        const secondaryIntents = [];

        // Buscar múltiples intenciones en mensajes complejos
        if (cleanMessage.includes(' y ') || cleanMessage.includes(' también ')) {
            // Mensaje multi-intención
            const parts = cleanMessage.split(/\s+y\s+|\s+también\s+/);
            
            parts.forEach(part => {
                const partIntent = this.recognizePrimaryIntent(part);
                if (partIntent.confidence > 0.5) {
                    secondaryIntents.push(partIntent);
                }
            });
        }

        return secondaryIntents;
    }

    /**
     * 📊 EXTRACCIÓN DE CONTEXTO SEMÁNTICO
     */
    extractSemanticContext(message) {
        console.log('[WERNICKE] 📊 Extrayendo contexto semántico...');
        
        const cleanMessage = message.toLowerCase();
        const semanticContext = {
            timeframe: this.extractTimeframe(cleanMessage),
            performance_expectation: this.extractPerformanceExpectation(cleanMessage),
            urgency_level: this.extractUrgencyLevel(cleanMessage),
            specificity_level: this.extractSpecificityLevel(cleanMessage),
            data_depth_required: this.extractDataDepthRequired(cleanMessage)
        };

        return semanticContext;
    }

    /**
     * 😊 DETECCIÓN DE ESTADO EMOCIONAL
     */
    detectEmotionalState(message) {
        console.log('[WERNICKE] 😊 Detectando estado emocional...');
        
        const cleanMessage = message.toLowerCase();
        const emotionalSignals = {
            excitement: 0,
            concern: 0,
            curiosity: 0,
            frustration: 0,
            neutral: 0
        };

        // Analizar patrones emocionales mexicanos
        Object.entries(this.mexicanEmotionalPatterns).forEach(([emotion, patterns]) => {
            let score = 0;
            
            // Buscar expresiones emocionales
            patterns.expressions.forEach(expr => {
                if (cleanMessage.includes(expr)) {
                    score += 1.0;
                }
            });
            
            // Buscar marcadores de intensidad
            patterns.intensity_markers.forEach(marker => {
                if (cleanMessage.includes(marker)) {
                    score += 0.5;
                }
            });
            
            // Buscar claves contextuales
            patterns.context_clues.forEach(clue => {
                if (cleanMessage.includes(clue)) {
                    score += 0.3;
                }
            });
            
            emotionalSignals[emotion] = Math.min(1.0, score);
        });

        // Calcular emoción neutral como baseline
        emotionalSignals.neutral = 1.0 - Math.max(...Object.values(emotionalSignals));

        // Encontrar emoción dominante
        const dominantEmotion = Object.keys(emotionalSignals)
            .reduce((a, b) => emotionalSignals[a] > emotionalSignals[b] ? a : b);

        return {
            dominantEmotion: dominantEmotion,
            intensity: emotionalSignals[dominantEmotion],
            allEmotions: emotionalSignals,
            emotionalComplexity: Object.values(emotionalSignals).filter(v => v > 0.3).length
        };
    }

    /**
     * 💡 IDENTIFICACIÓN DE NECESIDADES IMPLÍCITAS
     */
    identifyImplicitNeeds(message, context) {
        console.log('[WERNICKE] 💡 Identificando necesidades implícitas...');
        
        const implicitNeeds = [];
        const cleanMessage = message.toLowerCase();

        // Necesidad de comparación
        if (cleanMessage.includes('cómo van') || cleanMessage.includes('qué tal')) {
            implicitNeeds.push({
                need: 'contextual_comparison',
                reason: 'Usuario quiere saber performance relativo',
                suggestion: 'Incluir comparaciones temporales'
            });
        }

        // Necesidad de acción
        if (cleanMessage.includes('qué hago') || cleanMessage.includes('cómo mejorar')) {
            implicitNeeds.push({
                need: 'actionable_insights',
                reason: 'Usuario busca orientación práctica',
                suggestion: 'Incluir recomendaciones específicas'
            });
        }

        // Necesidad de tranquilidad
        if (cleanMessage.includes('preocupa') || cleanMessage.includes('mal')) {
            implicitNeeds.push({
                need: 'reassurance',
                reason: 'Usuario necesita apoyo emocional',
                suggestion: 'Responder con empatía y soluciones'
            });
        }

        // Necesidad de detalle
        if (cleanMessage.includes('explica') || cleanMessage.includes('detalle')) {
            implicitNeeds.push({
                need: 'detailed_explanation',
                reason: 'Usuario quiere comprensión profunda',
                suggestion: 'Proporcionar análisis exhaustivo'
            });
        }

        return implicitNeeds;
    }

    /**
     * ❓ EVALUACIÓN DE AMBIGÜEDAD
     */
    assessAmbiguity(message) {
        console.log('[WERNICKE] ❓ Evaluando ambigüedad del mensaje...');
        
        let ambiguityScore = 0;
        const cleanMessage = message.toLowerCase();

        // Mensaje muy corto = más ambiguo
        if (cleanMessage.length < 10) ambiguityScore += 0.3;

        // Falta de especificidad temporal
        if (!this.containsTimeReference(cleanMessage)) ambiguityScore += 0.2;

        // Palabras genéricas
        const genericWords = ['cosa', 'eso', 'esto', 'algo', 'todo'];
        genericWords.forEach(word => {
            if (cleanMessage.includes(word)) ambiguityScore += 0.1;
        });

        // Múltiples posibles interpretaciones
        const questionWords = cleanMessage.match(/qué|cómo|cuándo|dónde|por qué/g);
        if (questionWords && questionWords.length > 1) ambiguityScore += 0.2;

        return Math.min(1.0, ambiguityScore);
    }

    /**
     * 💬 SUGERENCIA DE ENFOQUE DE RESPUESTA
     */
    suggestResponseApproach(message) {
        console.log('[WERNICKE] 💬 Sugiriendo enfoque de respuesta...');
        
        const comprehension = {
            intent: this.recognizePrimaryIntent(message),
            emotional: this.detectEmotionalState(message),
            semantic: this.extractSemanticContext(message)
        };

        let approach = {
            tone: 'neutral',
            detail_level: 'medium',
            empathy_level: 'medium',
            action_orientation: 'medium',
            mexican_flavor: 'medium'
        };

        // Ajustar según intención
        if (comprehension.intent.intent === 'problem_identification') {
            approach.tone = 'supportive';
            approach.empathy_level = 'high';
            approach.action_orientation = 'high';
        }

        // Ajustar según emoción
        if (comprehension.emotional.dominantEmotion === 'excitement') {
            approach.tone = 'enthusiastic';
            approach.mexican_flavor = 'high';
        }

        // Ajustar según urgencia
        if (comprehension.semantic.urgency_level === 'urgent') {
            approach.detail_level = 'focused';
            approach.action_orientation = 'very_high';
        }

        return approach;
    }

    /**
     * 🔧 FUNCIONES AUXILIARES DE EXTRACCIÓN
     */
    extractTimeframe(message) {
        Object.entries(this.semanticContexts.temporal).forEach(([timeframe, patterns]) => {
            if (patterns.some(pattern => message.includes(pattern))) {
                return timeframe;
            }
        });
        return 'today'; // default
    }

    extractPerformanceExpectation(message) {
        Object.entries(this.semanticContexts.performance).forEach(([performance, patterns]) => {
            if (patterns.some(pattern => message.includes(pattern))) {
                return performance;
            }
        });
        return 'neutral'; // default
    }

    extractUrgencyLevel(message) {
        Object.entries(this.semanticContexts.urgency).forEach(([urgency, patterns]) => {
            if (patterns.some(pattern => message.includes(pattern))) {
                return urgency;
            }
        });
        return 'casual'; // default
    }

    extractSpecificityLevel(message) {
        const specificWords = ['exacto', 'específico', 'detalle', 'preciso', 'número'];
        const hasSpecificWords = specificWords.some(word => message.includes(word));
        
        return hasSpecificWords ? 'high' : 'medium';
    }

    extractDataDepthRequired(message) {
        if (message.includes('análisis') || message.includes('completo')) return 'deep';
        if (message.includes('rápido') || message.includes('resumen')) return 'shallow';
        return 'medium';
    }

    recognizeSubintent(message, primaryIntent) {
        const intentConfig = this.restaurantIntents[primaryIntent];
        if (!intentConfig || !intentConfig.subintents) return null;

        // Lógica simplificada para detectar sub-intenciones
        const cleanMessage = message.toLowerCase();
        
        if (cleanMessage.includes('hoy')) return 'today';
        if (cleanMessage.includes('ayer')) return 'yesterday';
        if (cleanMessage.includes('comparar')) return 'comparison';
        if (cleanMessage.includes('tendencia')) return 'trend';
        
        return intentConfig.subintents[0]; // default al primero
    }

    extractIntentParameters(message, intentKey) {
        // Extraer parámetros específicos según la intención
        const parameters = {};
        
        // Extraer números/cantidades
        const numbers = message.match(/\d+/g);
        if (numbers) {
            parameters.numbers = numbers.map(n => parseInt(n));
        }
        
        // Extraer nombres de productos (simplificado)
        const productKeywords = ['pollo', 'combo', 'pieza', 'rostizado'];
        productKeywords.forEach(keyword => {
            if (message.toLowerCase().includes(keyword)) {
                parameters.productMentioned = keyword;
            }
        });
        
        return parameters;
    }

    fuzzyMatch(text, pattern) {
        // Implementación simple de fuzzy matching
        const similarity = this.calculateSimilarity(text, pattern);
        return similarity > 0.7;
    }

    calculateSimilarity(str1, str2) {
        // Algoritmo simple de similaridad
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    containsTimeReference(message) {
        const timeWords = ['hoy', 'ayer', 'hora', 'día', 'semana', 'mes', 'today', 'yesterday'];
        return timeWords.some(word => message.includes(word));
    }

    calculateComprehensionConfidence(comprehension) {
        let confidence = 0;
        
        // Confianza por intención clara
        confidence += comprehension.primaryIntent.confidence * 0.4;
        
        // Confianza por estado emocional claro
        confidence += comprehension.emotionalState.intensity * 0.3;
        
        // Penalizar por ambigüedad
        confidence -= comprehension.ambiguityLevel * 0.2;
        
        // Bonus por necesidades implícitas identificadas
        confidence += comprehension.implicitNeeds.length * 0.1;
        
        return Math.max(0.1, Math.min(1.0, confidence));
    }

    /**
     * 📊 STATUS DEL ÁREA DE WERNICKE
     */
    getComprehensionStatus() {
        return {
            intentsRecognized: Object.keys(this.restaurantIntents).length,
            emotionalPatternsLoaded: Object.keys(this.mexicanEmotionalPatterns).length,
            semanticContextsActive: Object.keys(this.semanticContexts).length,
            comprehensionEnginesActive: Object.keys(this.comprehensionModels).length
        };
    }
}

// ENGINES AUXILIARES (Clases simplificadas)
class IntentRecognitionEngine {
    constructor() {
        this.accuracy = 0.85;
    }
}

class ContextAnalyzer {
    constructor() {
        this.depth = 'deep';
    }
}

class EmotionDetector {
    constructor() {
        this.mexicanPatterns = true;
    }
}

class SemanticParser {
    constructor() {
        this.restaurantSpecific = true;
    }
}

class AmbiguityResolver {
    constructor() {
        this.contextAware = true;
    }
}

module.exports = { WernickesArea };