/**
 * 🧠❤️ AMYGDALA DIGITAL - SISTEMA EMOCIONAL NEURAL
 * "El corazón emocional de FUDICLAUDE"
 * 
 * FUNCIONES:
 * - Detectar estado emocional del negocio
 * - Generar respuestas emocionalmente inteligentes
 * - Modular intensidad según contexto
 * - Sincronizar con emociones del usuario
 * - Crear conexiones empáticas
 */

class Amygdala {
    constructor() {
        this.emotionalStates = {
            // Estados de crisis
            CRISIS: {
                triggers: ['ventas muy bajas', 'caída drástica', 'problemas graves'],
                intensity: 0.9,
                response: 'alarma_y_soporte',
                mexican_expression: 'preocupación_auténtica'
            },
            ALERTA: {
                triggers: ['tendencia negativa', 'bajo performance', 'warning'],
                intensity: 0.7,
                response: 'atención_urgente',
                mexican_expression: 'alerta_amigable'
            },
            
            // Estados neutros
            NORMAL: {
                triggers: ['estable', 'promedio', 'regular'],
                intensity: 0.4,
                response: 'equilibrio_constructivo',
                mexican_expression: 'tranquilidad_propositiva'
            },
            
            // Estados positivos
            MOMENTUM: {
                triggers: ['crecimiento', 'tendencia positiva', 'mejorando'],
                intensity: 0.6,
                response: 'entusiasmo_motivador',
                mexican_expression: 'emoción_contenida'
            },
            ÉXITO: {
                triggers: ['récord', 'excelente', 'súper ventas'],
                intensity: 0.8,
                response: 'celebración_explosiva',
                mexican_expression: 'felicidad_mexicana'
            },
            ÉPICO: {
                triggers: ['histórico', 'increíble', 'mejor día ever'],
                intensity: 1.0,
                response: 'fiesta_total',
                mexican_expression: 'euforia_azteca'
            }
        };

        this.emotionalPatterns = {
            // Patrones emocionales mexicanos
            mexican_joy: {
                expressions: [
                    "¡Órale, qué chingón!",
                    "¡Está padrísimo!",
                    "¡Qué bárbaro!",
                    "¡No mames, qué bueno!",
                    "¡Está de huevos!"
                ],
                intensifiers: ["súper", "bien", "re", "mega", "ultra"]
            },
            
            mexican_concern: {
                expressions: [
                    "Órale, hay que ponerle atención",
                    "Se ve medio flojo el asunto",
                    "Aquí hay que apretar tuercas",
                    "No está nada mal, pero podemos mejor",
                    "Vamos a darle una revisadita"
                ],
                intensifiers: ["tantito", "un poco", "medio", "algo"]
            },
            
            mexican_alarm: {
                expressions: [
                    "¡Órale! Esto necesita atención inmediata",
                    "Compadre, aquí hay que actuar ya",
                    "No está nada bien la cosa",
                    "Hay que ponerse las pilas urgente",
                    "Se prendió el foco rojo"
                ],
                intensifiers: ["bien", "muy", "súper", "mega"]
            },
            
            mexican_motivation: {
                expressions: [
                    "¡Ándale, que se puede!",
                    "Vamos con todo",
                    "A darle que se puede",
                    "¡Échale ganas!",
                    "Va que vuela"
                ],
                intensifiers: ["bien", "súper", "re", "mega"]
            }
        };

        this.contextualEmotions = {
            // Emociones específicas por contexto de restaurante
            ventas_bajas: {
                emotion: 'CONCERN',
                empathy: 'understanding_support',
                action: 'solution_focused',
                mexican_vibe: 'apoyo_carnal'
            },
            
            ventas_altas: {
                emotion: 'JOY',
                empathy: 'shared_celebration',
                action: 'momentum_building',
                mexican_vibe: 'fiesta_compadre'
            },
            
            productos_populares: {
                emotion: 'PRIDE',
                empathy: 'recognition_validation',
                action: 'optimization_focused',
                mexican_vibe: 'orgullo_mexicano'
            },
            
            horas_pico: {
                emotion: 'EXCITEMENT',
                empathy: 'energy_matching',
                action: 'opportunity_maximizing',
                mexican_vibe: 'emoción_controlada'
            },
            
            comparaciones_temporales: {
                emotion: 'ANALYTICAL_CARE',
                empathy: 'thoughtful_analysis',
                action: 'strategic_thinking',
                mexican_vibe: 'sabiduría_práctica'
            }
        };
    }

    /**
     * 🎯 DETECTOR EMOCIONAL PRINCIPAL
     * Analiza datos y contexto para determinar estado emocional
     */
    detectEmotionalState(businessData, userContext, previousInteractions = null) {
        const signals = this.extractEmotionalSignals(businessData);
        const userMood = this.detectUserMood(userContext);
        const situationalContext = this.analyzeSituation(businessData);
        
        return {
            primaryEmotion: this.calculatePrimaryEmotion(signals),
            intensity: this.calculateIntensity(signals, userMood),
            contextualFlavor: this.getContextualFlavor(situationalContext),
            empathyLevel: this.calculateEmpathy(userMood),
            mexicanExpression: this.selectMexicanExpression(signals, userMood),
            actionOrientation: this.determineActionOrientation(signals)
        };
    }

    /**
     * 📊 EXTRACTOR DE SEÑALES EMOCIONALES
     * Convierte datos numéricos en señales emocionales
     */
    extractEmotionalSignals(data) {
        const signals = {
            sales_trend: 0,
            performance_level: 0,
            opportunity_size: 0,
            urgency_level: 0,
            celebration_worthy: 0
        };

        // Analizar tendencias de ventas
        if (data.comparison && data.comparison.vs_yesterday) {
            const change = data.comparison.vs_yesterday.sales_change;
            if (change < -30) signals.sales_trend = -0.9; // Crisis
            else if (change < -15) signals.sales_trend = -0.6; // Preocupante
            else if (change < -5) signals.sales_trend = -0.3; // Ligera baja
            else if (change < 5) signals.sales_trend = 0; // Estable
            else if (change < 15) signals.sales_trend = 0.4; // Bueno
            else if (change < 30) signals.sales_trend = 0.7; // Muy bueno
            else signals.sales_trend = 1.0; // Épico
        }

        // Analizar nivel de performance general
        const currentSales = data.total_sales || 0;
        if (currentSales > 50000) signals.performance_level = 1.0;
        else if (currentSales > 30000) signals.performance_level = 0.8;
        else if (currentSales > 20000) signals.performance_level = 0.6;
        else if (currentSales > 10000) signals.performance_level = 0.4;
        else if (currentSales > 5000) signals.performance_level = 0.2;
        else signals.performance_level = 0;

        // Detectar oportunidades
        if (data.peak_hours && data.weak_hours) {
            signals.opportunity_size = 0.6; // Siempre hay oportunidades
        }

        // Calcular urgencia
        const time = new Date().getHours();
        if (time >= 11 && time <= 14) signals.urgency_level = 0.8; // Hora rush
        else if (time >= 17 && time <= 20) signals.urgency_level = 0.8; // Cena
        else signals.urgency_level = 0.3;

        // Evaluar si merece celebración
        if (signals.sales_trend > 0.5 && signals.performance_level > 0.6) {
            signals.celebration_worthy = 0.8;
        }

        return signals;
    }

    /**
     * 👤 DETECTOR DE ESTADO DE ÁNIMO DEL USUARIO
     * Analiza el contexto del usuario para sincronizar emocionalmente
     */
    detectUserMood(userContext) {
        // Análisis básico del tono del usuario
        const text = userContext.message || '';
        const mood = {
            energy: 0.5,
            concern: 0.3,
            excitement: 0.3,
            urgency: 0.3,
            openness: 0.7
        };

        // Detectores de energía
        if (text.includes('!') || text.includes('??')) mood.energy += 0.3;
        if (text.toLowerCase().includes('urgente')) mood.urgency += 0.4;
        if (text.toLowerCase().includes('problema')) mood.concern += 0.4;
        if (text.toLowerCase().includes('bien') || text.includes('buen')) mood.excitement += 0.3;

        return mood;
    }

    /**
     * 🎭 GENERADOR DE RESPUESTA EMOCIONAL
     * Crea la respuesta emocional final
     */
    generateEmotionalResponse(emotionalState, rawInsight, userContext) {
        const { primaryEmotion, intensity, mexicanExpression, empathyLevel } = emotionalState;
        
        const emotionalLayer = {
            opener: this.generateEmotionalOpener(primaryEmotion, intensity, mexicanExpression),
            contentModulation: this.modulateContent(rawInsight, emotionalState),
            empathicConnections: this.createEmpathicConnections(empathyLevel, userContext),
            closer: this.generateEmotionalCloser(primaryEmotion, intensity),
            nonVerbalCues: this.addNonVerbalCues(emotionalState)
        };

        return this.blendEmotionalResponse(emotionalLayer, rawInsight);
    }

    /**
     * 🎪 GENERADORES DE ELEMENTOS EMOCIONALES
     */
    generateEmotionalOpener(emotion, intensity, expression) {
        const mexicanPattern = this.emotionalPatterns[expression] || this.emotionalPatterns.mexican_joy;
        const baseExpression = this.getRandomElement(mexicanPattern.expressions);
        
        if (intensity > 0.8) {
            return `${baseExpression} 🔥`;
        } else if (intensity > 0.6) {
            return `${baseExpression} ⚡`;
        } else if (intensity > 0.4) {
            return baseExpression;
        } else {
            return `${baseExpression.replace('!', '.')} 🤔`;
        }
    }

    modulateContent(content, emotionalState) {
        const { intensity, primaryEmotion, actionOrientation } = emotionalState;
        
        // Modular según intensidad emocional
        if (intensity > 0.8) {
            return content.replace(/\./g, '! 🚀').replace(/bueno/g, 'padrísimo');
        } else if (intensity > 0.6) {
            return content.replace(/\./g, ' ⚡');
        } else if (intensity < 0.3) {
            return content.replace(/!/g, '.').replace(/excelente/g, 'decente');
        }
        
        return content;
    }

    createEmpathicConnections(empathyLevel, userContext) {
        if (empathyLevel > 0.7) {
            return [
                "Entiendo perfectamente la situación",
                "Sé que esto es importante para ti",
                "Vamos a resolverlo juntos"
            ];
        } else if (empathyLevel > 0.5) {
            return [
                "Te entiendo, compadre",
                "Vamos viendo cómo ayudarte"
            ];
        }
        return [];
    }

    generateEmotionalCloser(emotion, intensity) {
        const closers = {
            high_energy: ["¡Vámonos con todo! 🚀", "¡A darle que se puede! 💪", "¡Éxito total! 🎯"],
            medium_energy: ["¿Cómo ves? 🤝", "¿Te parece bien? ✨", "¿Qué opinas? 💭"],
            supportive: ["Aquí andamos para lo que necesites 💪", "Cuenta conmigo, compadre 🤝"],
            analytical: ["¿Analizamos más a detalle? 📊", "¿Vemos otras opciones? 🎯"]
        };

        if (intensity > 0.7) return this.getRandomElement(closers.high_energy);
        else if (intensity > 0.4) return this.getRandomElement(closers.medium_energy);
        else if (emotion === 'CRISIS') return this.getRandomElement(closers.supportive);
        else return this.getRandomElement(closers.analytical);
    }

    addNonVerbalCues(emotionalState) {
        const { intensity, primaryEmotion } = emotionalState;
        
        const cues = [];
        
        if (intensity > 0.8) cues.push('🔥', '⚡', '🚀');
        else if (intensity > 0.6) cues.push('✨', '💪', '🎯');
        else if (intensity < 0.3) cues.push('🤔', '💭');
        
        if (primaryEmotion === 'CRISIS') cues.push('🚨', '⚠️');
        if (primaryEmotion === 'ÉXITO') cues.push('🎉', '🏆', '💯');
        
        return cues;
    }

    /**
     * 🧬 INTEGRACIÓN EMOCIONAL FINAL
     */
    blendEmotionalResponse(emotionalLayer, rawInsight) {
        return {
            emotionalOpener: emotionalLayer.opener,
            processedContent: emotionalLayer.contentModulation,
            empathicElements: emotionalLayer.empathicConnections,
            emotionalCloser: emotionalLayer.closer,
            visualCues: emotionalLayer.nonVerbalCues,
            overallTone: this.calculateOverallTone(emotionalLayer)
        };
    }

    /**
     * 🛠️ UTILIDADES
     */
    calculatePrimaryEmotion(signals) {
        if (signals.sales_trend < -0.6) return 'CRISIS';
        if (signals.sales_trend < -0.3) return 'ALERTA';
        if (signals.sales_trend > 0.6) return 'ÉXITO';
        if (signals.celebration_worthy > 0.7) return 'ÉPICO';
        if (signals.opportunity_size > 0.5) return 'MOMENTUM';
        return 'NORMAL';
    }

    calculateIntensity(signals, userMood) {
        const baseIntensity = Math.abs(signals.sales_trend) * 0.6 + 
                            signals.performance_level * 0.2 + 
                            signals.urgency_level * 0.2;
        
        const userModulation = (userMood.energy + userMood.excitement) * 0.3;
        
        return Math.min(1.0, baseIntensity + userModulation);
    }

    getContextualFlavor(situation) {
        // Determinar el sabor contextual específico
        return 'restaurante_mexicano_moderno';
    }

    calculateEmpathy(userMood) {
        return (userMood.concern + userMood.urgency) * 0.6 + 0.4;
    }

    selectMexicanExpression(signals, userMood) {
        if (signals.sales_trend > 0.5) return 'mexican_joy';
        if (signals.sales_trend < -0.5) return 'mexican_alarm';
        if (signals.sales_trend < -0.2) return 'mexican_concern';
        return 'mexican_motivation';
    }

    determineActionOrientation(signals) {
        if (signals.sales_trend < -0.3) return 'problem_solving';
        if (signals.opportunity_size > 0.5) return 'opportunity_maximizing';
        if (signals.celebration_worthy > 0.6) return 'momentum_building';
        return 'optimization_focused';
    }

    calculateOverallTone(emotionalLayer) {
        // Calcular el tono general de la respuesta
        return {
            warmth: 0.8,
            professionalism: 0.7,
            mexicanFlavor: 0.9,
            empathy: 0.8,
            actionOrientation: 0.9
        };
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    analyzeSituation(data) {
        // Análisis contextual de la situación del negocio
        return {
            timeOfDay: new Date().getHours(),
            salesLevel: data.total_sales || 0,
            trendDirection: data.comparison ? 'stable' : 'unknown',
            urgencyLevel: 'medium'
        };
    }
}

module.exports = { Amygdala };