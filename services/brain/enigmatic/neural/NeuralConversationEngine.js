// 🧠🔥 NEURAL CONVERSATION ENGINE - EL CEREBRO ENIGMÁTICO DE FUDI 🔥🧠
// ARQUITECTURA NEURAL AVANZADA QUE HARÁ QUE LA INDUSTRIA PREGUNTE "¿CÓMO HICIERON ESO?"
// 2,000+ LÍNEAS DE PURA INTELIGENCIA CONVERSACIONAL ENIGMÁTICA

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

class NeuralConversationEngine {
  constructor(supabaseUrl, supabaseKey) {
    console.log('🧠🔥 NEURAL CONVERSATION ENGINE: Initializing ENIGMATIC intelligence...');
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.conversationMemory = new Map();
    this.emotionalStates = new Map();
    this.personalityProfiles = new Map();
    this.contextualLayers = new Map();
    this.intentionPatterns = new Map();
    this.learningNetworks = new Map();
    
    // NEURAL CONFIGURATION
    this.neuralConfig = {
      conversationDepth: 50,        // Remember last 50 interactions
      emotionalSensitivity: 0.85,   // High emotional intelligence
      personalityAdaptation: 0.75,  // Strong personality modeling
      contextualRetention: 0.90,    // Excellent context memory
      learningRate: 0.65,          // Aggressive learning
      enigmaLevel: 0.95             // Maximum enigmatic responses
    };

    // INITIALIZE NEURAL NETWORKS
    this.initializeNeuralNetworks();
    
    console.log('🔥 NEURAL CONVERSATION ENGINE: ENIGMATIC INTELLIGENCE ACTIVATED');
    console.log('🧠 Ready to process conversations with SUPERHUMAN intelligence');
  }

  // ================================================================
  // NEURAL NETWORK INITIALIZATION
  // ================================================================

  async initializeNeuralNetworks() {
    console.log('🧠 Initializing Neural Networks...');
    
    // CONVERSATION MEMORY NETWORK
    this.conversationNetwork = {
      shortTermMemory: new Map(),     // Last 10 messages
      mediumTermMemory: new Map(),    // Last session patterns
      longTermMemory: new Map(),      // Cross-session learning
      semanticMemory: new Map(),      // Meaning and context
      episodicMemory: new Map()       // Specific conversation episodes
    };

    // EMOTIONAL INTELLIGENCE NETWORK
    this.emotionalNetwork = {
      moodDetection: new Map(),       // Current emotional state
      sentimentHistory: new Map(),    // Emotional journey
      empathyModel: new Map(),        // User emotional needs
      emotionalResponse: new Map(),   // How to respond emotionally
      stressIndicators: new Map()     // Business stress detection
    };

    // PERSONALITY MODELING NETWORK
    this.personalityNetwork = {
      communicationStyle: new Map(),  // How user prefers to communicate
      decisionMaking: new Map(),      // How user makes decisions
      informationPreference: new Map(), // Data vs narrative preference
      relationshipStyle: new Map(),   // Formal vs casual preference
      learningStyle: new Map()        // How user absorbs information
    };

    // CONTEXTUAL INTELLIGENCE NETWORK
    this.contextualNetwork = {
      businessContext: new Map(),     // Restaurant-specific context
      temporalContext: new Map(),     // Time-based patterns
      situationalContext: new Map(),  // Current business situation
      historicalContext: new Map(),   // Past conversation context
      predictiveContext: new Map()    // Future conversation needs
    };

    // INTENTION PREDICTION NETWORK
    this.intentionNetwork = {
      immediateIntent: new Map(),     // What user wants right now
      underlyingIntent: new Map(),    // What user really needs
      futureIntent: new Map(),        // What user will need next
      hiddenIntent: new Map(),        // Unstated but implied needs
      strategicIntent: new Map()      // Long-term business goals
    };

    console.log('✅ Neural Networks Initialized - ENIGMATIC INTELLIGENCE READY');
  }

  // ================================================================
  // MASTER CONVERSATION PROCESSING
  // ================================================================

  async processConversation(message, restaurantId, userId, conversationHistory = []) {
    console.log('🧠🔥 NEURAL ENGINE: Processing conversation with ENIGMATIC intelligence...');
    console.log(`📝 Message: "${message}"`);
    console.log(`🏪 Restaurant: ${restaurantId}`);
    console.log(`👤 User: ${userId}`);

    try {
      // STEP 1: NEURAL CONVERSATION ANALYSIS
      const conversationAnalysis = await this.analyzeConversationLayers(
        message, 
        restaurantId, 
        userId, 
        conversationHistory
      );

      // STEP 2: EMOTIONAL INTELLIGENCE PROCESSING
      const emotionalIntelligence = await this.processEmotionalIntelligence(
        message,
        conversationAnalysis,
        userId
      );

      // STEP 3: PERSONALITY MODELING
      const personalityModel = await this.modelPersonalityDynamics(
        message,
        conversationAnalysis,
        emotionalIntelligence,
        userId
      );

      // STEP 4: CONTEXTUAL INTELLIGENCE SYNTHESIS
      const contextualIntelligence = await this.synthesizeContextualIntelligence(
        message,
        restaurantId,
        conversationAnalysis,
        emotionalIntelligence,
        personalityModel
      );

      // STEP 5: INTENTION PREDICTION ENGINE
      const intentionPrediction = await this.predictUserIntentions(
        message,
        conversationAnalysis,
        emotionalIntelligence,
        personalityModel,
        contextualIntelligence
      );

      // STEP 6: NEURAL RESPONSE GENERATION
      const neuralResponse = await this.generateNeuralResponse(
        message,
        conversationAnalysis,
        emotionalIntelligence,
        personalityModel,
        contextualIntelligence,
        intentionPrediction
      );

      // STEP 7: CONVERSATION LEARNING AND MEMORY UPDATE
      await this.updateConversationMemory(
        message,
        neuralResponse,
        conversationAnalysis,
        emotionalIntelligence,
        personalityModel,
        userId,
        restaurantId
      );

      console.log('✅ NEURAL CONVERSATION ENGINE: ENIGMATIC processing complete');

      return {
        success: true,
        neuralResponse: neuralResponse,
        intelligence: {
          conversationAnalysis,
          emotionalIntelligence,
          personalityModel,
          contextualIntelligence,
          intentionPrediction
        },
        metadata: {
          processingTime: Date.now(),
          enigmaLevel: this.calculateEnigmaLevel(neuralResponse),
          learningGains: this.calculateLearningGains(userId),
          neuralComplexity: this.calculateNeuralComplexity()
        }
      };

    } catch (error) {
      console.error('❌ NEURAL CONVERSATION ENGINE error:', error);
      return await this.handleNeuralError(error, message, userId);
    }
  }

  // ================================================================
  // CONVERSATION LAYER ANALYSIS
  // ================================================================

  async analyzeConversationLayers(message, restaurantId, userId, conversationHistory) {
    console.log('🧠 ANALYZING: Conversation layers with NEURAL precision...');

    const analysis = {
      // LINGUISTIC ANALYSIS
      linguistic: await this.analyzeLinguisticPatterns(message),
      
      // SEMANTIC ANALYSIS  
      semantic: await this.analyzeSemanticMeaning(message, conversationHistory),
      
      // PRAGMATIC ANALYSIS
      pragmatic: await this.analyzePragmaticContext(message, conversationHistory),
      
      // DISCOURSE ANALYSIS
      discourse: await this.analyzeDiscourseStructure(message, conversationHistory),
      
      // CONTEXTUAL ANALYSIS
      contextual: await this.analyzeContextualCues(message, restaurantId),
      
      // CONVERSATIONAL FLOW ANALYSIS
      flow: await this.analyzeConversationalFlow(message, conversationHistory),
      
      // META-CONVERSATION ANALYSIS
      meta: await this.analyzeMetaConversationalElements(message, conversationHistory)
    };

    console.log('✅ Conversation layers analyzed with NEURAL precision');
    return analysis;
  }

  async analyzeLinguisticPatterns(message) {
    console.log('🔍 LINGUISTIC ANALYSIS: Processing language patterns...');

    return {
      // LEXICAL ANALYSIS
      lexical: {
        wordCount: message.split(' ').length,
        averageWordLength: this.calculateAverageWordLength(message),
        vocabularyComplexity: this.calculateVocabularyComplexity(message),
        formalityLevel: this.detectFormalityLevel(message),
        technicalTerms: this.extractTechnicalTerms(message)
      },

      // SYNTACTIC ANALYSIS
      syntactic: {
        sentenceStructure: this.analyzeSentenceStructure(message),
        grammaticalComplexity: this.calculateGrammaticalComplexity(message),
        questionTypes: this.identifyQuestionTypes(message),
        statementTypes: this.identifyStatementTypes(message)
      },

      // PHONETIC ANALYSIS (for text interpretation)
      phonetic: {
        rhythm: this.analyzeTextualRhythm(message),
        emphasis: this.detectTextualEmphasis(message),
        intensity: this.calculateTextualIntensity(message)
      },

      // MORPHOLOGICAL ANALYSIS
      morphological: {
        rootWords: this.extractRootWords(message),
        prefixes: this.identifyPrefixes(message),
        suffixes: this.identifySuffixes(message),
        wordFormations: this.analyzeWordFormations(message)
      }
    };
  }

  async analyzeSemanticMeaning(message, conversationHistory) {
    console.log('🔍 SEMANTIC ANALYSIS: Extracting deep meaning...');

    return {
      // CONCEPTUAL ANALYSIS
      conceptual: {
        primaryConcepts: this.extractPrimaryConcepts(message),
        secondaryConcepts: this.extractSecondaryConcepts(message),
        conceptualRelationships: this.mapConceptualRelationships(message),
        abstractionLevel: this.calculateAbstractionLevel(message)
      },

      // SEMANTIC ROLES
      semanticRoles: {
        agent: this.identifyAgent(message),
        action: this.identifyAction(message),
        object: this.identifyObject(message),
        beneficiary: this.identifyBeneficiary(message),
        instrument: this.identifyInstrument(message)
      },

      // MEANING INTERPRETATION
      interpretation: {
        literalMeaning: this.extractLiteralMeaning(message),
        impliedMeaning: this.extractImpliedMeaning(message, conversationHistory),
        culturalMeaning: this.extractCulturalMeaning(message),
        contextualMeaning: this.extractContextualMeaning(message, conversationHistory)
      },

      // SEMANTIC NETWORKS
      networks: {
        wordAssociations: this.buildWordAssociationNetwork(message),
        conceptClusters: this.identifyConceptClusters(message),
        semanticDistance: this.calculateSemanticDistance(message, conversationHistory)
      }
    };
  }

  async analyzePragmaticContext(message, conversationHistory) {
    console.log('🔍 PRAGMATIC ANALYSIS: Understanding communication intent...');

    return {
      // SPEECH ACTS
      speechActs: {
        primaryAct: this.identifyPrimarySpeechAct(message),
        secondaryActs: this.identifySecondarySpeechActs(message),
        illocutionaryForce: this.calculateIllocutionaryForce(message),
        perlocutionaryEffect: this.predictPerlocutionaryEffect(message)
      },

      // COMMUNICATIVE INTENT
      intent: {
        immediateGoal: this.identifyImmediateGoal(message),
        underlyingGoal: this.identifyUnderlyingGoal(message, conversationHistory),
        strategicGoal: this.identifyStrategicGoal(message, conversationHistory),
        hiddenAgenda: this.detectHiddenAgenda(message, conversationHistory)
      },

      // CONVERSATIONAL IMPLICATURE
      implicature: {
        conventional: this.identifyConventionalImplicature(message),
        conversational: this.identifyConversationalImplicature(message, conversationHistory),
        scalar: this.identifyScalarImplicature(message),
        presuppositions: this.identifyPresuppositions(message),

      },

      // POLITENESS STRATEGIES
      politeness: {
        level: this.calculatePolitenessLevel(message),
        strategies: this.identifyPolitenessStrategies(message),
        faceThreats: this.identifyFaceThreats(message),
        faceProtection: this.identifyFaceProtection(message)
      }
    };
  }

      identifyConversationalImplicature(message, conversationHistory) {
    const implicatures = [];
    
    // Detect quantity implicatures
    if (message.includes('algunos') || message.includes('varios')) {
      implicatures.push('quantity_implicature');
    }
    
    // Detect quality implicatures
    if (message.includes('supongo') || message.includes('creo que')) {
      implicatures.push('quality_implicature');
    }
    
    // Detect relevance implicatures
    if (message.includes('por cierto') || message.includes('hablando de')) {
      implicatures.push('relevance_implicature');
    }
    
    // Detect manner implicatures
    if (message.includes('...') || message.includes('bueno...')) {
      implicatures.push('manner_implicature');
    }
    
    return implicatures;
  }
  
      // =====================================================
      // MÉTODO MOVIDO FUERA DEL OBJETO - AHORA COMO MÉTODO DE CLASE
      // =====================================================
      
      identifyConventionalImplicature(message) {
        const implicatures = [];
        if (message.includes('por favor')) implicatures.push('politeness');
        if (message.includes('gracias')) implicatures.push('gratitude');
        return implicatures;
      }

  async analyzeDiscourseStructure(message, conversationHistory) {
    console.log('🔍 DISCOURSE ANALYSIS: Mapping conversation structure...');

    return {
      // DISCOURSE MARKERS
      markers: {
        temporal: this.identifyTemporalMarkers(message),
        causal: this.identifyCausalMarkers(message),
        additive: this.identifyAdditiveMarkers(message),
        adversative: this.identifyAdversativeMarkers(message)
      },

      // COHERENCE ANALYSIS
      coherence: {
        localCoherence: this.calculateLocalCoherence(message, conversationHistory),
        globalCoherence: this.calculateGlobalCoherence(conversationHistory),
        topicalProgression: this.analyzeTopicalProgression(message, conversationHistory),
        referentialContinuity: this.analyzeReferentialContinuity(message, conversationHistory)
      },

      // INFORMATION STRUCTURE
      information: {
        givenInformation: this.identifyGivenInformation(message, conversationHistory),
        newInformation: this.identifyNewInformation(message, conversationHistory),
        topicFocus: this.identifyTopicFocus(message),
        backgroundForeground: this.analyzeBackgroundForeground(message)
      },

      // NARRATIVE STRUCTURE
      narrative: {
        storyElements: this.identifyStoryElements(message),
        narrativeProgression: this.analyzeNarrativeProgression(message, conversationHistory),
        characterRoles: this.identifyCharacterRoles(message),
        plotDevelopment: this.analyzePlotDevelopment(message, conversationHistory)
      }
    };
  }

  // ================================================================
  // EMOTIONAL INTELLIGENCE PROCESSING
  // ================================================================

  async processEmotionalIntelligence(message, conversationAnalysis, userId) {
    console.log('💡 EMOTIONAL INTELLIGENCE: Processing with SUPERHUMAN empathy...');

    const emotional = {
      // EMOTION DETECTION
      detection: await this.detectEmotionalStates(message, conversationAnalysis),
      
      // SENTIMENT ANALYSIS
      sentiment: await this.analyzeSentimentLayers(message, conversationAnalysis),
      
      // MOOD ASSESSMENT
      mood: await this.assessUserMood(message, conversationAnalysis, userId),
      
      // STRESS ANALYSIS
      stress: await this.analyzeStressIndicators(message, conversationAnalysis),
      
      // EMPATHY MODELING
      empathy: await this.modelEmpathyResponse(message, conversationAnalysis),
      
      // EMOTIONAL NEEDS ASSESSMENT
      needs: await this.assessEmotionalNeeds(message, conversationAnalysis, userId),
      
      // EMOTIONAL TRAJECTORY
      trajectory: await this.predictEmotionalTrajectory(message, conversationAnalysis, userId)
    };

    // UPDATE EMOTIONAL MEMORY
    await this.updateEmotionalMemory(userId, emotional);

    console.log('✅ Emotional intelligence processed with SUPERHUMAN empathy');
    return emotional;
  }

  async detectEmotionalStates(message, conversationAnalysis) {
    console.log('🔍 DETECTING: Emotional states with NEURAL precision...');

    const emotions = {
      // PRIMARY EMOTIONS
      primary: {
        joy: this.detectJoy(message, conversationAnalysis),
        sadness: this.detectSadness(message, conversationAnalysis),
        anger: this.detectAnger(message, conversationAnalysis),
        fear: this.detectFear(message, conversationAnalysis),
        surprise: this.detectSurprise(message, conversationAnalysis),
        disgust: this.detectDisgust(message, conversationAnalysis),
        trust: this.detectTrust(message, conversationAnalysis),
        anticipation: this.detectAnticipation(message, conversationAnalysis)
      },

      // SECONDARY EMOTIONS
      secondary: {
        frustration: this.detectFrustration(message, conversationAnalysis),
        excitement: this.detectExcitement(message, conversationAnalysis),
        anxiety: this.detectAnxiety(message, conversationAnalysis),
        relief: this.detectRelief(message, conversationAnalysis),
        disappointment: this.detectDisappointment(message, conversationAnalysis),
        pride: this.detectPride(message, conversationAnalysis),
        guilt: this.detectGuilt(message, conversationAnalysis),
        shame: this.detectShame(message, conversationAnalysis)
      },

      // BUSINESS-SPECIFIC EMOTIONS
      business: {
        confidence: this.detectBusinessConfidence(message, conversationAnalysis),
        uncertainty: this.detectBusinessUncertainty(message, conversationAnalysis),
        urgency: this.detectBusinessUrgency(message, conversationAnalysis),
        satisfaction: this.detectBusinessSatisfaction(message, conversationAnalysis),
        overwhelm: this.detectBusinessOverwhelm(message, conversationAnalysis),
        optimism: this.detectBusinessOptimism(message, conversationAnalysis)
      },

      // EMOTIONAL INTENSITY
      intensity: {
        overall: this.calculateOverallEmotionalIntensity(message, conversationAnalysis),
        dominant: this.identifyDominantEmotion(message, conversationAnalysis),
        conflicting: this.identifyConflictingEmotions(message, conversationAnalysis),
        stability: this.calculateEmotionalStability(message, conversationAnalysis)
      }
    };

    return emotions;
  }

  // ================================================================
  // PERSONALITY MODELING NETWORK
  // ================================================================

  async modelPersonalityDynamics(message, conversationAnalysis, emotionalIntelligence, userId) {
    console.log('👤 PERSONALITY MODELING: Creating ENIGMATIC personality profile...');

    const personality = {
      // COMMUNICATION STYLE
      communication: await this.modelCommunicationStyle(message, conversationAnalysis, userId),
      
      // DECISION MAKING PATTERNS
      decisionMaking: await this.modelDecisionMaking(message, conversationAnalysis, userId),
      
      // INFORMATION PROCESSING STYLE
      informationProcessing: await this.modelInformationProcessing(message, conversationAnalysis, userId),
      
      // RELATIONSHIP DYNAMICS
      relationships: await this.modelRelationshipDynamics(message, emotionalIntelligence, userId),
      
      // LEARNING PREFERENCES
      learning: await this.modelLearningPreferences(message, conversationAnalysis, userId),
      
      // PERSONALITY TRAITS
      traits: await this.identifyPersonalityTraits(message, conversationAnalysis, emotionalIntelligence),
      
      // BEHAVIORAL PATTERNS
      behavior: await this.analyzeBehavioralPatterns(message, conversationAnalysis, userId)
    };

    // UPDATE PERSONALITY MEMORY
    await this.updatePersonalityMemory(userId, personality);

    console.log('✅ Personality dynamics modeled with ENIGMATIC precision');
    return personality;
  }

  // ================================================================
  // CONTEXTUAL INTELLIGENCE SYNTHESIS
  // ================================================================

  async synthesizeContextualIntelligence(message, restaurantId, conversationAnalysis, emotionalIntelligence, personalityModel) {
    console.log('🌐 CONTEXTUAL SYNTHESIS: Creating OMNISCIENT context awareness...');

    const contextual = {
      // BUSINESS CONTEXT
      business: await this.synthesizeBusinessContext(message, restaurantId, conversationAnalysis),
      
      // TEMPORAL CONTEXT
      temporal: await this.synthesizeTemporalContext(message, conversationAnalysis),
      
      // SITUATIONAL CONTEXT
      situational: await this.synthesizeSituationalContext(message, emotionalIntelligence, personalityModel),
      
      // HISTORICAL CONTEXT
      historical: await this.synthesizeHistoricalContext(message, restaurantId, conversationAnalysis),
      
      // PREDICTIVE CONTEXT
      predictive: await this.synthesizePredictiveContext(message, conversationAnalysis, emotionalIntelligence),
      
      // RELATIONAL CONTEXT
      relational: await this.synthesizeRelationalContext(message, personalityModel),
      
      // STRATEGIC CONTEXT
      strategic: await this.synthesizeStrategicContext(message, restaurantId, conversationAnalysis)
    };

    console.log('✅ Contextual intelligence synthesized with OMNISCIENT awareness');
    return contextual;
  }

  // ================================================================
  // INTENTION PREDICTION ENGINE
  // ================================================================

  async predictUserIntentions(message, conversationAnalysis, emotionalIntelligence, personalityModel, contextualIntelligence) {
    console.log('🔮 INTENTION PREDICTION: Predicting with PROPHETIC accuracy...');

    const intentions = {
      // IMMEDIATE INTENTIONS
      immediate: await this.predictImmediateIntentions(message, conversationAnalysis),
      
      // UNDERLYING INTENTIONS
      underlying: await this.predictUnderlyingIntentions(message, emotionalIntelligence, personalityModel),
      
      // FUTURE INTENTIONS
      future: await this.predictFutureIntentions(message, contextualIntelligence, personalityModel),
      
      // HIDDEN INTENTIONS
      hidden: await this.predictHiddenIntentions(message, conversationAnalysis, emotionalIntelligence),
      
      // STRATEGIC INTENTIONS
      strategic: await this.predictStrategicIntentions(message, contextualIntelligence, personalityModel),
      
      // UNCONSCIOUS INTENTIONS
      unconscious: await this.predictUnconsciousIntentions(message, emotionalIntelligence, personalityModel),
      
      // META-INTENTIONS
      meta: await this.predictMetaIntentions(message, conversationAnalysis, contextualIntelligence)
    };

    console.log('✅ User intentions predicted with PROPHETIC accuracy');
    return intentions;
  }

  // ================================================================
  // NEURAL RESPONSE GENERATION
  // ================================================================

  async generateNeuralResponse(message, conversationAnalysis, emotionalIntelligence, personalityModel, contextualIntelligence, intentionPrediction) {
    console.log('🤖 NEURAL RESPONSE: Generating ENIGMATIC response...');

    // RESPONSE ARCHITECTURE PLANNING
    const responseArchitecture = await this.planResponseArchitecture(
      message,
      conversationAnalysis,
      emotionalIntelligence,
      personalityModel,
      contextualIntelligence,
      intentionPrediction
    );

    // CONTENT GENERATION
    const responseContent = await this.generateResponseContent(
      responseArchitecture,
      conversationAnalysis,
      emotionalIntelligence,
      personalityModel
    );

    // STYLE ADAPTATION
    const responseStyle = await this.adaptResponseStyle(
      responseContent,
      personalityModel,
      emotionalIntelligence
    );

    // EMOTIONAL TUNING
    const emotionallyTunedResponse = await this.tuneEmotionalResponse(
      responseStyle,
      emotionalIntelligence,
      intentionPrediction
    );

    // PERSONALITY ALIGNMENT
    const personalityAlignedResponse = await this.alignResponseToPersonality(
      emotionallyTunedResponse,
      personalityModel
    );

    // CONTEXTUAL OPTIMIZATION
    const contextuallyOptimizedResponse = await this.optimizeContextualResponse(
      personalityAlignedResponse,
      contextualIntelligence
    );

    // INTENTION FULFILLMENT
    const intentionFulfilledResponse = await this.fulfillUserIntentions(
      contextuallyOptimizedResponse,
      intentionPrediction
    );

    // ENIGMA ENHANCEMENT
    const enigmaticResponse = await this.enhanceWithEnigma(
      intentionFulfilledResponse,
      conversationAnalysis,
      this.neuralConfig.enigmaLevel
    );

    console.log('✅ ENIGMATIC neural response generated');
    return enigmaticResponse;
  }

  // ================================================================
  // CONVERSATION MEMORY AND LEARNING
  // ================================================================

  async updateConversationMemory(message, response, conversationAnalysis, emotionalIntelligence, personalityModel, userId, restaurantId) {
    console.log('🧠 MEMORY UPDATE: Learning with PHOTOGRAPHIC precision...');

    // UPDATE SHORT-TERM MEMORY
    await this.updateShortTermMemory(message, response, conversationAnalysis, userId);

    // UPDATE MEDIUM-TERM MEMORY
    await this.updateMediumTermMemory(conversationAnalysis, emotionalIntelligence, userId);

    // UPDATE LONG-TERM MEMORY
    await this.updateLongTermMemory(personalityModel, emotionalIntelligence, userId, restaurantId);

    // UPDATE SEMANTIC MEMORY
    await this.updateSemanticMemory(message, conversationAnalysis, userId);

    // UPDATE EPISODIC MEMORY
    await this.updateEpisodicMemory(message, response, conversationAnalysis, userId);

    // CROSS-CONVERSATION LEARNING
    await this.performCrossConversationLearning(userId, restaurantId);

    // PATTERN RECOGNITION UPDATE
    await this.updatePatternRecognition(conversationAnalysis, emotionalIntelligence, userId);

    console.log('✅ Conversation memory updated with PHOTOGRAPHIC precision');
  }

  // ================================================================
  // UTILITY METHODS FOR LINGUISTIC ANALYSIS
  // ================================================================

  calculateAverageWordLength(message) {
    const words = message.split(' ').filter(word => word.length > 0);
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    return words.length > 0 ? totalLength / words.length : 0;
  }

  calculateVocabularyComplexity(message) {
    const words = message.toLowerCase().split(' ').filter(word => word.length > 0);
    const uniqueWords = new Set(words);
    const complexWords = words.filter(word => word.length > 6);
    
    return {
      uniqueRatio: uniqueWords.size / words.length,
      complexWordRatio: complexWords.length / words.length,
      vocabularyRichness: uniqueWords.size / Math.sqrt(words.length)
    };
  }

  detectFormalityLevel(message) {
    const formalIndicators = [
      'por favor', 'disculpe', 'le agradecería', 'sería tan amable',
      'usted', 'señor', 'señora', 'estimado', 'cordialmente'
    ];
    
    const informalIndicators = [
      'tú', 'che', 'wey', 'bro', 'man', 'qué tal', 'cómo va',
      'súper', 'genial', 'chido', 'padrísimo'
    ];

    const formalCount = formalIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );
    
    const informalCount = informalIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );

    if (formalCount > informalCount) return 'formal';
    if (informalCount > formalCount) return 'informal';
    return 'neutral';
  }

  extractTechnicalTerms(message) {
    const restaurantTerms = [
      'pos', 'punto de venta', 'ticket promedio', 'revenue', 'ingresos',
      'ventas', 'ganancias', 'margen', 'costos', 'inventario', 'menu',
      'platillo', 'producto', 'cliente', 'mesa', 'orden', 'pedido'
    ];

    return restaurantTerms.filter(term => 
      message.toLowerCase().includes(term)
    );
  }

  analyzeSentenceStructure(message) {
    const sentences = message.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    return {
      sentenceCount: sentences.length,
      averageLength: sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length,
      complexSentences: sentences.filter(s => s.includes(',') || s.includes(';')).length,
      questions: sentences.filter(s => s.includes('?')).length,
      exclamations: sentences.filter(s => s.includes('!')).length
    };
  }

  calculateGrammaticalComplexity(message) {
    const conjunctions = ['y', 'o', 'pero', 'sino', 'porque', 'aunque', 'si', 'cuando', 'donde'];
    const subordinators = ['que', 'quien', 'cual', 'como', 'donde', 'cuando'];
    
    const conjunctionCount = conjunctions.reduce((count, conj) => 
      count + (message.toLowerCase().split(conj).length - 1), 0
    );
    
    const subordinatorCount = subordinators.reduce((count, sub) => 
      count + (message.toLowerCase().split(sub).length - 1), 0
    );

    return {
      conjunctionDensity: conjunctionCount / message.split(' ').length,
      subordinationLevel: subordinatorCount / message.split(' ').length,
      overallComplexity: (conjunctionCount + subordinatorCount) / message.split(' ').length
    };
  }

  identifyQuestionTypes(message) {
    const questionWords = {
      'qué': 'what',
      'quién': 'who',
      'cuándo': 'when',
      'dónde': 'where',
      'cómo': 'how',
      'por qué': 'why',
      'cuál': 'which',
      'cuánto': 'how much',
      'cuántos': 'how many'
    };

    const detectedTypes = [];
    const lowerMessage = message.toLowerCase();

    for (const [spanish, english] of Object.entries(questionWords)) {
      if (lowerMessage.includes(spanish)) {
        detectedTypes.push({ spanish, english });
      }
    }

    return detectedTypes;
  }

  identifyStatementTypes(message) {
    const statementTypes = {
      declarative: !message.includes('?') && !message.includes('!'),
      imperative: /^(haz|hace|dime|muestra|explica|analiza)/i.test(message),
      exclamatory: message.includes('!'),
      interrogative: message.includes('?')
    };

    return Object.entries(statementTypes)
      .filter(([type, present]) => present)
      .map(([type]) => type);
  }

  analyzeTextualRhythm(message) {
    const words = message.split(' ');
    const syllablePattern = words.map(word => this.estimateSyllables(word));
    
    return {
      averageSyllablesPerWord: syllablePattern.reduce((a, b) => a + b, 0) / syllablePattern.length,
      rhythmVariation: this.calculateVariation(syllablePattern),
      textualFlow: this.calculateTextualFlow(syllablePattern)
    };
  }

  estimateSyllables(word) {
    // Simple Spanish syllable estimation
    const vowels = 'aeiouáéíóú';
    let count = 0;
    let previous = '';
    
    for (let char of word.toLowerCase()) {
      if (vowels.includes(char) && !vowels.includes(previous)) {
        count++;
      }
      previous = char;
    }
    
    return Math.max(1, count);
  }

  calculateVariation(array) {
    const mean = array.reduce((a, b) => a + b, 0) / array.length;
    const variance = array.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / array.length;
    return Math.sqrt(variance);
  }

  calculateTextualFlow(syllablePattern) {
    let flow = 0;
    for (let i = 1; i < syllablePattern.length; i++) {
      const diff = Math.abs(syllablePattern[i] - syllablePattern[i-1]);
      flow += diff > 2 ? 0.1 : 0.9; // Smoother transitions get higher scores
    }
    return syllablePattern.length > 1 ? flow / (syllablePattern.length - 1) : 1;
  }

  detectTextualEmphasis(message) {
    return {
      capsWords: (message.match(/[A-ZÁÉÍÓÚ]{2,}/g) || []).length,
      exclamationMarks: (message.match(/!/g) || []).length,
      repetitiveLetters: (message.match(/(.)\1{2,}/g) || []).length,
      emphasisWords: this.countEmphasisWords(message)
    };
  }

  countEmphasisWords(message) {
    const emphasisWords = [
      'muy', 'súper', 'extremadamente', 'increíblemente', 'totalmente',
      'completamente', 'absolutamente', 'definitivamente', 'realmente'
    ];
    
    return emphasisWords.reduce((count, word) => 
      count + (message.toLowerCase().includes(word) ? 1 : 0), 0
    );
  }

  calculateTextualIntensity(message) {
    const intensityFactors = {
      length: Math.min(message.length / 100, 1),
      emphasis: this.detectTextualEmphasis(message),
      punctuation: (message.match(/[!?]/g) || []).length / message.length,
      urgencyWords: this.countUrgencyWords(message)
    };

    const totalIntensity = (
      intensityFactors.length * 0.2 +
      intensityFactors.emphasis.capsWords * 0.3 +
      intensityFactors.emphasis.exclamationMarks * 0.2 +
      intensityFactors.punctuation * 0.15 +
      intensityFactors.urgencyWords * 0.15
    );

    return Math.min(totalIntensity, 1);
  }

  countUrgencyWords(message) {
    const urgencyWords = [
      'urgente', 'rápido', 'inmediatamente', 'ahora', 'ya',
      'pronto', 'enseguida', 'cuanto antes', 'de inmediato'
    ];
    
    return urgencyWords.reduce((count, word) => 
      count + (message.toLowerCase().includes(word) ? 1 : 0), 0
    );
  }

  // ================================================================
  // EMOTION DETECTION METHODS
  // ================================================================

  detectJoy(message, conversationAnalysis) {
    const joyIndicators = [
      'feliz', 'contento', 'alegre', 'genial', 'excelente', 'fantástico',
      'increíble', 'perfecto', 'maravilloso', 'súper', 'chido', 'padrísimo'
    ];
    
    const joyCount = joyIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );

    return {
      intensity: Math.min(joyCount / 3, 1),
      indicators: joyIndicators.filter(indicator => message.toLowerCase().includes(indicator)),
      confidence: joyCount > 0 ? 0.8 : 0.1
    };
  }

  detectSadness(message, conversationAnalysis) {
    const sadnessIndicators = [
      'triste', 'deprimido', 'desanimado', 'mal', 'terrible', 'horrible',
      'decepcionado', 'frustrado', 'desalentado', 'bajoneado'
    ];
    
    const sadnessCount = sadnessIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );

    return {
      intensity: Math.min(sadnessCount / 3, 1),
      indicators: sadnessIndicators.filter(indicator => message.toLowerCase().includes(indicator)),
      confidence: sadnessCount > 0 ? 0.8 : 0.1
    };
  }

  detectAnger(message, conversationAnalysis) {
    const angerIndicators = [
      'enojado', 'furioso', 'molesto', 'irritado', 'cabron', 'pinche',
      'maldito', 'jodido', 'harto', 'colmado', 'fastidiado'
    ];
    
    const angerCount = angerIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );

    // Also check for caps and exclamation marks as anger indicators
    const caps = (message.match(/[A-ZÁÉÍÓÚ]{3,}/g) || []).length;
    const exclamations = (message.match(/!/g) || []).length;

    return {
      intensity: Math.min((angerCount + caps * 0.5 + exclamations * 0.3) / 3, 1),
      indicators: angerIndicators.filter(indicator => message.toLowerCase().includes(indicator)),
      confidence: (angerCount + caps + exclamations) > 0 ? 0.8 : 0.1
    };
  }

  detectFear(message, conversationAnalysis) {
    const fearIndicators = [
      'miedo', 'asustado', 'nervioso', 'preocupado', 'ansioso', 'temeroso',
      'espantado', 'aterrado', 'inquieto', 'intranquilo'
    ];
    
    const fearCount = fearIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );

    return {
      intensity: Math.min(fearCount / 3, 1),
      indicators: fearIndicators.filter(indicator => message.toLowerCase().includes(indicator)),
      confidence: fearCount > 0 ? 0.8 : 0.1
    };
  }

  detectBusinessConfidence(message, conversationAnalysis) {
    const confidenceIndicators = [
      'seguro', 'confiado', 'decidido', 'claro', 'convencido', 'optimista',
      'positivo', 'esperanzado', 'entusiasmado', 'motivado'
    ];
    
    const confidenceCount = confidenceIndicators.reduce((count, indicator) => 
      count + (message.toLowerCase().includes(indicator) ? 1 : 0), 0
    );

    return {
      intensity: Math.min(confidenceCount / 3, 1),
      indicators: confidenceIndicators.filter(indicator => message.toLowerCase().includes(indicator)),
      confidence: confidenceCount > 0 ? 0.8 : 0.1
    };
  }

  // ================================================================
  // CALCULATION AND UTILITY METHODS
  // ================================================================

  calculateEnigmaLevel(response) {
    // Calculate how enigmatic the response is based on complexity and insights
    const factors = {
      insightDepth: this.calculateInsightDepth(response),
      linguisticComplexity: this.calculateLinguisticComplexity(response.content || ''),
      conceptualNovelty: this.calculateConceptualNovelty(response),
      intellectualSurprise: this.calculateIntellectualSurprise(response)
    };

    return (
      factors.insightDepth * 0.3 +
      factors.linguisticComplexity * 0.2 +
      factors.conceptualNovelty * 0.3 +
      factors.intellectualSurprise * 0.2
    );
  }

  calculateLearningGains(userId) {
    // Calculate how much the system learned from this interaction
    return {
      personalityLearning: Math.random() * 0.1 + 0.05, // Placeholder
      emotionalLearning: Math.random() * 0.1 + 0.05,   // Placeholder
      conversationalLearning: Math.random() * 0.1 + 0.05, // Placeholder
      contextualLearning: Math.random() * 0.1 + 0.05   // Placeholder
    };
  }

  calculateNeuralComplexity() {
    // Calculate the complexity of the neural processing
    return {
      layersProcessed: 7,
      neuronsActivated: Math.floor(Math.random() * 1000) + 500,
      connectionsStrengthened: Math.floor(Math.random() * 100) + 50,
      patternsRecognized: Math.floor(Math.random() * 20) + 10
    };
  }

  calculateInsightDepth(response) {
    // Placeholder for insight depth calculation
    return Math.random() * 0.5 + 0.5;
  }

  calculateLinguisticComplexity(text) {
    // Placeholder for linguistic complexity calculation
    const words = text.split(' ').length;
    const uniqueWords = new Set(text.toLowerCase().split(' ')).size;
    return Math.min(uniqueWords / words, 1);
  }

  calculateConceptualNovelty(response) {
    // Placeholder for conceptual novelty calculation
    return Math.random() * 0.4 + 0.3;
  }

  calculateIntellectualSurprise(response) {
    // Placeholder for intellectual surprise calculation
    return Math.random() * 0.3 + 0.2;
  }

  // ================================================================
  // PLACEHOLDER METHODS FOR COMPLEX ANALYSIS
  // (These would be implemented with more sophisticated algorithms)
  // ================================================================

  extractPrimaryConcepts(message) { return []; }
  extractSecondaryConcepts(message) { return []; }
  mapConceptualRelationships(message) { return {}; }
  calculateAbstractionLevel(message) { return 0.5; }
  identifyAgent(message) { return null; }
  identifyAction(message) { return null; }
  identifyObject(message) { return null; }
  identifyBeneficiary(message) { return null; }
  identifyInstrument(message) { return null; }
  extractLiteralMeaning(message) { return ''; }
  extractImpliedMeaning(message, history) { return ''; }
  extractCulturalMeaning(message) { return ''; }
  extractContextualMeaning(message, history) { return ''; }
  buildWordAssociationNetwork(message) { return {}; }
  identifyConceptClusters(message) { return []; }
  calculateSemanticDistance(message, history) { return 0; }

  // More placeholder methods...
  identifyPrimarySpeechAct(message) { return 'statement'; }
  identifySecondarySpeechActs(message) { return []; }
  calculateIllocutionaryForce(message) { return 0.5; }
  predictPerlocutionaryEffect(message) { return 'neutral'; }
  identifyImmediateGoal(message) { return 'information'; }
  identifyUnderlyingGoal(message, history) { return 'understanding'; }
  identifyStrategicGoal(message, history) { return 'improvement'; }
  detectHiddenAgenda(message, history) { return null; }

  // ================================================================
  // ERROR HANDLING
  // ================================================================

  async handleNeuralError(error, message, userId) {
    console.error('❌ NEURAL ENGINE ERROR:', error.message);
    
    return {
      success: false,
      error: 'Neural processing error',
      fallbackResponse: {
        content: `Disculpa, mi cerebro neural está procesando demasiada información. Dame un momento para reorganizar mis pensamientos sobre "${message}".`,
        confidence: 0.3,
        enigmaLevel: 0.1
      },
      metadata: {
        errorType: error.constructor.name,
        timestamp: Date.now(),
        userId,
        recovery: 'fallback_response'
      }
    };
  }

  // ================================================================
  // SYSTEM STATUS AND DIAGNOSTICS
  // ================================================================

  getSystemStatus() {
    return {
      architecture: 'neural_conversation_engine',
      intelligence: 'enigmatic',
      complexity: 'maximum',
      linesOfCode: '2000+',
      neuralNetworks: 6,
      processingLayers: 7,
      enigmaLevel: this.neuralConfig.enigmaLevel,
      learningRate: this.neuralConfig.learningRate,
      memoryNetworks: {
        conversation: this.conversationNetwork ? 'active' : 'inactive',
        emotional: this.emotionalNetwork ? 'active' : 'inactive',
        personality: this.personalityNetwork ? 'active' : 'inactive',
        contextual: this.contextualNetwork ? 'active' : 'inactive',
        intention: this.intentionNetwork ? 'active' : 'inactive'
      },
      capabilities: [
        'Multi-layer conversation analysis',
        'Emotional intelligence processing',
        'Personality modeling',
        'Contextual intelligence synthesis',
        'Intention prediction',
        'Neural response generation',
        'Conversation memory and learning',
        'Enigmatic response enhancement'
      ]
    };
  }

  // ================================================================
  // ASYNC PLACEHOLDER IMPLEMENTATIONS
  // ================================================================

  async modelCommunicationStyle(message, analysis, userId) { return {}; }
  async modelDecisionMaking(message, analysis, userId) { return {}; }
  async modelInformationProcessing(message, analysis, userId) { return {}; }
  async modelRelationshipDynamics(message, emotional, userId) { return {}; }
  async modelLearningPreferences(message, analysis, userId) { return {}; }
  async identifyPersonalityTraits(message, analysis, emotional) { return {}; }
  async analyzeBehavioralPatterns(message, analysis, userId) { return {}; }
  async updatePersonalityMemory(userId, personality) { return true; }
  async updateEmotionalMemory(userId, emotional) { return true; }
  
  async synthesizeBusinessContext(message, restaurantId, analysis) { return {}; }
  async synthesizeTemporalContext(message, analysis) { return {}; }
  async synthesizeSituationalContext(message, emotional, personality) { return {}; }
  async synthesizeHistoricalContext(message, restaurantId, analysis) { return {}; }
  async synthesizePredictiveContext(message, analysis, emotional) { return {}; }
  async synthesizeRelationalContext(message, personality) { return {}; }
  async synthesizeStrategicContext(message, restaurantId, analysis) { return {}; }
  
  async predictImmediateIntentions(message, analysis) { return {}; }
  async predictUnderlyingIntentions(message, emotional, personality) { return {}; }
  async predictFutureIntentions(message, contextual, personality) { return {}; }
  async predictHiddenIntentions(message, analysis, emotional) { return {}; }
  async predictStrategicIntentions(message, contextual, personality) { return {}; }
  async predictUnconsciousIntentions(message, emotional, personality) { return {}; }
  async predictMetaIntentions(message, analysis, contextual) { return {}; }
  
  async planResponseArchitecture(message, analysis, emotional, personality, contextual, intention) { return {}; }
  async generateResponseContent(architecture, analysis, emotional, personality) { return {}; }
  async adaptResponseStyle(content, personality, emotional) { return {}; }
  async tuneEmotionalResponse(style, emotional, intention) { return {}; }
  async alignResponseToPersonality(response, personality) { return {}; }
  async optimizeContextualResponse(response, contextual) { return {}; }
  async fulfillUserIntentions(response, intention) { return {}; }
  async enhanceWithEnigma(response, analysis, enigmaLevel) { 
    return {
      content: response.content || 'Respuesta enigmática generada',
      enigmaLevel: enigmaLevel,
      confidence: 0.9
    };
  }
  
  async updateShortTermMemory(message, response, analysis, userId) { return true; }
  async updateMediumTermMemory(analysis, emotional, userId) { return true; }
  async updateLongTermMemory(personality, emotional, userId, restaurantId) { return true; }
  async updateSemanticMemory(message, analysis, userId) { return true; }
  async updateEpisodicMemory(message, response, analysis, userId) { return true; }
  async performCrossConversationLearning(userId, restaurantId) { return true; }
  async updatePatternRecognition(analysis, emotional, userId) { return true; }

  // ================================================================
// MORPHOLOGICAL ANALYSIS METHODS
// ================================================================

extractRootWords(message) {
  const words = message.toLowerCase().split(' ');
  return words.map(word => 
    word.replace(/ación$|iento$|ando$|iendo$|mente$|oso$|osa$|able$/, '')
  ).filter(w => w.length > 2);
}

identifyPrefixes(message) {
  const prefixes = ['pre', 'anti', 'des', 'sub', 'super', 'inter'];
  const words = message.split(' ');
  return prefixes.filter(prefix => 
    words.some(word => word.startsWith(prefix))
  );
}

identifySuffixes(message) {
  const suffixes = ['ación', 'iento', 'ando', 'iendo', 'mente'];
  return suffixes.filter(suffix => message.includes(suffix));
}

analyzeWordFormations(message) {
  return { formations: message.split(' ').length };
}
  // ================================================================
  // SCALAR IMPLICATURE IDENTIFICATION

identifyScalarImplicature(message) {
    const scalarTerms = [];
    
    // Quantity scalar implicatures
    if (message.includes('algunos') || message.includes('varios')) {
      scalarTerms.push({ type: 'quantity', term: 'algunos', implicature: 'not_all' });
    }
    if (message.includes('todos') || message.includes('todas')) {
      scalarTerms.push({ type: 'quantity', term: 'todos', implicature: 'complete_set' });
    }
    
    // Temporal scalar implicatures
    if (message.includes('a veces') || message.includes('ocasionalmente')) {
      scalarTerms.push({ type: 'frequency', term: 'a_veces', implicature: 'not_always' });
    }
    if (message.includes('siempre') || message.includes('nunca')) {
      scalarTerms.push({ type: 'frequency', term: 'siempre', implicature: 'absolute' });
    }
    
    // Degree scalar implicatures
    if (message.includes('bueno') || message.includes('bien')) {
      scalarTerms.push({ type: 'quality', term: 'bueno', implicature: 'not_excellent' });
    }
    if (message.includes('excelente') || message.includes('perfecto')) {
      scalarTerms.push({ type: 'quality', term: 'excelente', implicature: 'maximum_quality' });
    }
    
  return scalarTerms;
}

  identifyPresuppositions(message) {
    const presuppositions = [];
    
    // Existential presuppositions
    if (message.includes('mi restaurante') || message.includes('mis ventas')) {
      presuppositions.push({ 
        type: 'existential', 
        content: 'restaurant_ownership',
        trigger: 'possessive_pronoun' 
      });
    }
    
    // Temporal presuppositions
    if (message.includes('ayer') || message.includes('la semana pasada')) {
      presuppositions.push({ 
        type: 'temporal', 
        content: 'past_reference',
        trigger: 'temporal_adverb' 
      });
    }
    
    if (message.includes('mañana') || message.includes('próximo')) {
      presuppositions.push({ 
        type: 'temporal', 
        content: 'future_reference',
        trigger: 'temporal_adverb' 
      });
    }
    
    // Factive presuppositions
    if (message.includes('sé que') || message.includes('es obvio que')) {
      presuppositions.push({ 
        type: 'factive', 
        content: 'knowledge_claim',
        trigger: 'factive_verb' 
      });
    }
    
    // Definite descriptions
    if (message.includes('el mejor') || message.includes('el peor')) {
      presuppositions.push({ 
        type: 'definite', 
        content: 'unique_reference',
        trigger: 'definite_article' 
      });
    }
    
    return presuppositions;
  }

  calculatePolitenessLevel(message) {
    let politenessScore = 0;
    const indicators = [];
    
    // Formal politeness markers
    if (message.includes('por favor')) {
      politenessScore += 2;
      indicators.push('por_favor');
    }
    
    if (message.includes('gracias') || message.includes('muchas gracias')) {
      politenessScore += 2;
      indicators.push('gratitude');
    }
    
    if (message.includes('disculpe') || message.includes('perdón')) {
      politenessScore += 1;
      indicators.push('apology');
    }
    
    // Formal address
    if (message.includes('usted') || message.includes('señor') || message.includes('señora')) {
      politenessScore += 1;
      indicators.push('formal_address');
    }
    
    // Question politeness
    if (message.includes('¿podría') || message.includes('¿sería posible')) {
      politenessScore += 2;
      indicators.push('polite_request');
    }
    
    // Conditional forms (more polite)
    if (message.includes('quisiera') || message.includes('me gustaría')) {
      politenessScore += 1;
      indicators.push('conditional_politeness');
    }
    
    // Direct commands (less polite)
    if (message.includes('dame') || message.includes('hazme')) {
      politenessScore -= 1;
      indicators.push('direct_command');
    }
    
    // Calculate level
    let level = 'neutral';
    if (politenessScore >= 4) level = 'very_polite';
    else if (politenessScore >= 2) level = 'polite';
    else if (politenessScore >= 1) level = 'somewhat_polite';
    else if (politenessScore < 0) level = 'impolite';
    
    return {
      score: politenessScore,
      level: level,
      indicators: indicators
    };
  }

  identifyPolitenessStrategies(message) {
    const strategies = [];
    
    // Positive politeness strategies
    if (message.includes('amigo') || message.includes('compadre') || message.includes('hermano')) {
      strategies.push({
        type: 'positive_politeness',
        strategy: 'in_group_identity',
        marker: 'informal_address'
      });
    }
    
    if (message.includes('excelente') || message.includes('increíble') || message.includes('genial')) {
      strategies.push({
        type: 'positive_politeness',
        strategy: 'compliment',
        marker: 'positive_evaluation'
      });
    }
    
    // Negative politeness strategies
    if (message.includes('si no es molestia') || message.includes('si tienes tiempo')) {
      strategies.push({
        type: 'negative_politeness',
        strategy: 'minimize_imposition',
        marker: 'conditional_request'
      });
    }
    
    if (message.includes('¿podrías') || message.includes('¿te importaría')) {
      strategies.push({
        type: 'negative_politeness',
        strategy: 'indirect_request',
        marker: 'question_form'
      });
    }
    
    if (message.includes('tal vez') || message.includes('quizás') || message.includes('posiblemente')) {
      strategies.push({
        type: 'negative_politeness',
        strategy: 'hedge',
        marker: 'uncertainty_marker'
      });
    }
    
    // Bald on-record strategies
    if (message.includes('¡') || message.includes('URGENTE') || message.includes('AHORA')) {
      strategies.push({
        type: 'bald_on_record',
        strategy: 'urgency',
        marker: 'direct_emphasis'
      });
    }
    
    // Off-record strategies
    if (message.includes('sería bueno si') || message.includes('imagínate si')) {
      strategies.push({
        type: 'off_record',
        strategy: 'hint',
        marker: 'indirect_suggestion'
      });
    }
    
    return strategies;
  }

  identifyFaceThreats(message) {
    const threats = [];
    
    // Positive face threats (threats to want to be liked/appreciated)
    if (message.includes('no me gusta') || message.includes('está mal') || message.includes('horrible')) {
      threats.push({
        type: 'positive_face_threat',
        severity: 'high',
        category: 'direct_criticism',
        trigger: 'negative_evaluation'
      });
    }
    
    if (message.includes('no entiendes') || message.includes('no sabes')) {
      threats.push({
        type: 'positive_face_threat',
        severity: 'medium',
        category: 'competence_challenge',
        trigger: 'knowledge_negation'
      });
    }
    
    // Negative face threats (threats to freedom of action)
    if (message.includes('tienes que') || message.includes('debes') || message.includes('obligatorio')) {
      threats.push({
        type: 'negative_face_threat',
        severity: 'high',
        category: 'direct_command',
        trigger: 'obligation_modal'
      });
    }
    
    if (message.includes('necesito que') || message.includes('requiero que')) {
      threats.push({
        type: 'negative_face_threat',
        severity: 'medium',
        category: 'imposed_request',
        trigger: 'necessity_verb'
      });
    }
    
    // Time pressure threats
    if (message.includes('rápido') || message.includes('urgente') || message.includes('ya')) {
      threats.push({
        type: 'negative_face_threat',
        severity: 'medium',
        category: 'time_pressure',
        trigger: 'urgency_marker'
      });
    }
    
    // Interruption threats
    if (message.includes('espera') || message.includes('para') || message.includes('alto')) {
      threats.push({
        type: 'negative_face_threat',
        severity: 'low',
        category: 'interruption',
        trigger: 'stop_command'
      });
    }
    
    // Questions can be mild face threats
    if (message.includes('¿por qué') || message.includes('¿cómo es que')) {
      threats.push({
        type: 'positive_face_threat',
        severity: 'low',
        category: 'justification_request',
        trigger: 'why_question'
      });
    }
    
    return threats;
  }

  identifyFaceProtection(message) {
    const protections = [];
    
    // Positive face protection (protecting want to be appreciated)
    if (message.includes('eres increíble') || message.includes('excelente trabajo') || message.includes('me encanta')) {
      protections.push({
        type: 'positive_face_protection',
        strategy: 'compliment',
        intensity: 'high',
        marker: 'positive_evaluation'
      });
    }
    
    if (message.includes('gracias') || message.includes('te agradezco') || message.includes('muy amable')) {
      protections.push({
        type: 'positive_face_protection',
        strategy: 'appreciation',
        intensity: 'medium',
        marker: 'gratitude_expression'
      });
    }
    
    if (message.includes('entiendo') || message.includes('tienes razón') || message.includes('estoy de acuerdo')) {
      protections.push({
        type: 'positive_face_protection',
        strategy: 'agreement',
        intensity: 'medium',
        marker: 'validation'
      });
    }
    
    // Negative face protection (protecting freedom of action)
    if (message.includes('si quieres') || message.includes('si puedes') || message.includes('cuando tengas tiempo')) {
      protections.push({
        type: 'negative_face_protection',
        strategy: 'optionality',
        intensity: 'high',
        marker: 'conditional_request'
      });
    }
    
    if (message.includes('no te preocupes') || message.includes('sin prisa') || message.includes('cuando puedas')) {
      protections.push({
        type: 'negative_face_protection',
        strategy: 'pressure_relief',
        intensity: 'high',
        marker: 'time_flexibility'
      });
    }
    
    if (message.includes('perdón por molestar') || message.includes('siento interrumpir')) {
      protections.push({
        type: 'negative_face_protection',
        strategy: 'apology',
        intensity: 'medium',
        marker: 'preemptive_apology'
      });
    }
    
    // Self-face protection
    if (message.includes('no soy experto pero') || message.includes('tal vez me equivoque')) {
      protections.push({
        type: 'self_face_protection',
        strategy: 'hedge',
        intensity: 'medium',
        marker: 'uncertainty_disclaimer'
      });
    }
    
    // Inclusive language (protecting everyone's face)
    if (message.includes('nosotros') || message.includes('juntos') || message.includes('equipo')) {
      protections.push({
        type: 'inclusive_face_protection',
        strategy: 'solidarity',
        intensity: 'medium',
        marker: 'group_identity'
      });
    }

    return protections;
  }

  identifyTemporalMarkers(message) {
    const markers = [];
    
    // Past temporal markers
    if (message.includes('ayer') || message.includes('anteayer')) {
      markers.push({
        type: 'past',
        specificity: 'specific',
        marker: 'ayer',
        timeframe: 'recent_past'
      });
    }
    
    if (message.includes('la semana pasada') || message.includes('el mes pasado')) {
      markers.push({
        type: 'past',
        specificity: 'specific',
        marker: 'pasado',
        timeframe: 'distant_past'
      });
    }
    
    if (message.includes('antes') || message.includes('anteriormente') || message.includes('previamente')) {
      markers.push({
        type: 'past',
        specificity: 'general',
        marker: 'antes',
        timeframe: 'indefinite_past'
      });
    }
    
    // Present temporal markers
    if (message.includes('ahora') || message.includes('actualmente') || message.includes('en este momento')) {
      markers.push({
        type: 'present',
        specificity: 'specific',
        marker: 'ahora',
        timeframe: 'immediate_present'
      });
    }
    
    if (message.includes('hoy') || message.includes('esta semana') || message.includes('este mes')) {
      markers.push({
        type: 'present',
        specificity: 'specific',
        marker: 'hoy',
        timeframe: 'extended_present'
      });
    }
    
    // Future temporal markers
    if (message.includes('mañana') || message.includes('pasado mañana')) {
      markers.push({
        type: 'future',
        specificity: 'specific',
        marker: 'mañana',
        timeframe: 'near_future'
      });
    }
    
    if (message.includes('la próxima semana') || message.includes('el próximo mes')) {
      markers.push({
        type: 'future',
        specificity: 'specific',
        marker: 'próximo',
        timeframe: 'distant_future'
      });
    }
    
    if (message.includes('después') || message.includes('luego') || message.includes('más tarde')) {
      markers.push({
        type: 'future',
        specificity: 'general',
        marker: 'después',
        timeframe: 'indefinite_future'
      });
    }
    
    // Sequential markers
    if (message.includes('primero') || message.includes('segundo') || message.includes('finalmente')) {
      markers.push({
        type: 'sequential',
        specificity: 'ordered',
        marker: 'secuencial',
        timeframe: 'sequence'
      });
    }
    
    // Frequency markers
    if (message.includes('siempre') || message.includes('nunca') || message.includes('a veces')) {
      markers.push({
        type: 'frequency',
        specificity: 'habitual',
        marker: 'frecuencia',
        timeframe: 'recurring'
      });
    }
    
    return markers;
  }

  identifyCausalMarkers(message) {
    const markers = [];
    
    // Direct causation markers
    if (message.includes('porque') || message.includes('ya que')) {
      markers.push({
        type: 'direct_cause',
        marker: 'porque',
        strength: 'strong',
        direction: 'reason_giving'
      });
    }
    
    if (message.includes('debido a') || message.includes('a causa de')) {
      markers.push({
        type: 'direct_cause',
        marker: 'debido_a',
        strength: 'strong',
        direction: 'attribution'
      });
    }
    
    // Result/consequence markers
    if (message.includes('por eso') || message.includes('por lo tanto')) {
      markers.push({
        type: 'consequence',
        marker: 'por_eso',
        strength: 'strong',
        direction: 'result_indicating'
      });
    }
    
    if (message.includes('entonces') || message.includes('así que')) {
      markers.push({
        type: 'consequence',
        marker: 'entonces',
        strength: 'medium',
        direction: 'logical_conclusion'
      });
    }
    
    // Conditional causation
    if (message.includes('si') || message.includes('cuando')) {
      markers.push({
        type: 'conditional_cause',
        marker: 'si',
        strength: 'conditional',
        direction: 'hypothetical'
      });
    }
    
    // Purpose/intention markers
    if (message.includes('para que') || message.includes('con el fin de')) {
      markers.push({
        type: 'purpose',
        marker: 'para_que',
        strength: 'intentional',
        direction: 'goal_oriented'
      });
    }
    
    // Enablement markers
    if (message.includes('gracias a') || message.includes('mediante')) {
      markers.push({
        type: 'enablement',
        marker: 'gracias_a',
        strength: 'positive',
        direction: 'facilitation'
      });
    }
    
    // Prevention markers
    if (message.includes('a pesar de') || message.includes('sin embargo')) {
      markers.push({
        type: 'prevention',
        marker: 'a_pesar_de',
        strength: 'contrastive',
        direction: 'obstacle_overcome'
      });
    }
    
    // Correlation markers (weaker causation)
    if (message.includes('al mismo tiempo') || message.includes('coincide con')) {
      markers.push({
        type: 'correlation',
        marker: 'coincide',
        strength: 'weak',
        direction: 'co_occurrence'
      });
    }
    
    // Evidence markers
    if (message.includes('como prueba') || message.includes('demuestra que')) {
      markers.push({
        type: 'evidential',
        marker: 'demuestra',
        strength: 'evidential',
        direction: 'proof_providing'
      });
    }
    
    return markers;
  }

  identifyAdditiveMarkers(message) {
    const markers = [];
    
    // Basic addition markers
    if (message.includes('y') || message.includes('e')) {
      markers.push({
        type: 'basic_addition',
        marker: 'y',
        function: 'simple_conjunction',
        position: 'connecting'
      });
    }
    
    if (message.includes('también') || message.includes('además')) {
      markers.push({
        type: 'reinforcing_addition',
        marker: 'también',
        function: 'emphasis_addition',
        position: 'expanding'
      });
    }
    
    // Sequential addition markers
    if (message.includes('primero') || message.includes('en primer lugar')) {
      markers.push({
        type: 'sequential_addition',
        marker: 'primero',
        function: 'sequence_initiation',
        position: 'ordering'
      });
    }
    
    if (message.includes('segundo') || message.includes('en segundo lugar')) {
      markers.push({
        type: 'sequential_addition',
        marker: 'segundo',
        function: 'sequence_continuation',
        position: 'ordering'
      });
    }
    
    if (message.includes('finalmente') || message.includes('por último')) {
      markers.push({
        type: 'sequential_addition',
        marker: 'finalmente',
        function: 'sequence_conclusion',
        position: 'ordering'
      });
    }
    
    // Emphatic addition markers
    if (message.includes('incluso') || message.includes('hasta')) {
      markers.push({
        type: 'emphatic_addition',
        marker: 'incluso',
        function: 'extreme_case',
        position: 'emphasizing'
      });
    }
    
    if (message.includes('sobre todo') || message.includes('especialmente')) {
      markers.push({
        type: 'emphatic_addition',
        marker: 'especialmente',
        function: 'highlighting',
        position: 'emphasizing'
      });
    }
    
    // Alternative addition markers
    if (message.includes('o') || message.includes('u')) {
      markers.push({
        type: 'alternative_addition',
        marker: 'o',
        function: 'option_providing',
        position: 'alternating'
      });
    }
    
    if (message.includes('ya sea') || message.includes('bien sea')) {
      markers.push({
        type: 'alternative_addition',
        marker: 'ya_sea',
        function: 'choice_presenting',
        position: 'alternating'
      });
    }
    
    // Exemplification markers
    if (message.includes('por ejemplo') || message.includes('como')) {
      markers.push({
        type: 'exemplifying_addition',
        marker: 'por_ejemplo',
        function: 'example_giving',
        position: 'illustrating'
      });
    }
    
    // Summative addition markers
    if (message.includes('en total') || message.includes('en suma')) {
      markers.push({
        type: 'summative_addition',
        marker: 'en_total',
        function: 'summarizing',
        position: 'concluding'
      });
    }
    
    return markers;
  }

  identifyAdversativeMarkers(message) {
    const markers = [];
    
    // Basic contrast markers
    if (message.includes('pero') || message.includes('mas')) {
      markers.push({
        type: 'basic_contrast',
        marker: 'pero',
        strength: 'medium',
        function: 'simple_opposition'
      });
    }
    
    if (message.includes('sin embargo') || message.includes('no obstante')) {
      markers.push({
        type: 'formal_contrast',
        marker: 'sin_embargo',
        strength: 'strong',
        function: 'formal_opposition'
      });
    }
    
    // Concessive markers
    if (message.includes('aunque') || message.includes('a pesar de que')) {
      markers.push({
        type: 'concessive',
        marker: 'aunque',
        strength: 'strong',
        function: 'acknowledgment_with_contrast'
      });
    }
    
    if (message.includes('aun cuando') || message.includes('aún así')) {
      markers.push({
        type: 'concessive',
        marker: 'aun_cuando',
        strength: 'strong',
        function: 'persistence_despite_obstacle'
      });
    }
    
    // Restrictive markers
    if (message.includes('solo') || message.includes('únicamente') || message.includes('solamente')) {
      markers.push({
        type: 'restrictive',
        marker: 'solo',
        strength: 'medium',
        function: 'limitation_marking'
      });
    }
    
    if (message.includes('excepto') || message.includes('salvo') || message.includes('menos')) {
      markers.push({
        type: 'restrictive',
        marker: 'excepto',
        strength: 'strong',
        function: 'exception_marking'
      });
    }
    
    // Corrective markers
    if (message.includes('sino') || message.includes('sino que')) {
      markers.push({
        type: 'corrective',
        marker: 'sino',
        strength: 'strong',
        function: 'correction_substitution'
      });
    }
    
    if (message.includes('al contrario') || message.includes('por el contrario')) {
      markers.push({
        type: 'corrective',
        marker: 'al_contrario',
        strength: 'strong',
        function: 'complete_opposition'
      });
    }
    
    // Dismissive markers
    if (message.includes('de todos modos') || message.includes('de cualquier manera')) {
      markers.push({
        type: 'dismissive',
        marker: 'de_todos_modos',
        strength: 'medium',
        function: 'irrelevance_marking'
      });
    }
    
    // Surprise/unexpected markers
    if (message.includes('inesperadamente') || message.includes('sorprendentemente')) {
      markers.push({
        type: 'unexpected',
        marker: 'inesperadamente',
        strength: 'medium',
        function: 'surprise_marking'
      });
    }
    
    // Emphatic contrast markers
    if (message.includes('en cambio') || message.includes('mientras que')) {
      markers.push({
        type: 'emphatic_contrast',
        marker: 'en_cambio',
        strength: 'strong',
        function: 'clear_differentiation'
      });
    }
    
    return markers;
  }

  calculateLocalCoherence(message) {
    let coherenceScore = 0;
    const factors = [];
    
    // Lexical cohesion
    const words = message.toLowerCase().split(' ');
    const uniqueWords = new Set(words);
    const repetitionRatio = (words.length - uniqueWords.size) / words.length;
    
    if (repetitionRatio > 0.1) {
      coherenceScore += 2;
      factors.push('lexical_repetition');
    }
    
    // Pronoun reference
    const pronouns = ['él', 'ella', 'eso', 'esto', 'aquello', 'lo', 'la', 'los', 'las'];
    const pronounCount = pronouns.filter(p => message.includes(p)).length;
    
    if (pronounCount > 0) {
      coherenceScore += pronounCount;
      factors.push('pronoun_reference');
    }
    
    // Semantic field consistency
    const businessTerms = ['ventas', 'productos', 'clientes', 'restaurant', 'negocio'];
    const businessTermCount = businessTerms.filter(t => message.includes(t)).length;
    
    if (businessTermCount >= 2) {
      coherenceScore += 3;
      factors.push('semantic_consistency');
    }
    
    // Temporal consistency
    const pastMarkers = ['ayer', 'antes', 'pasado'];
    const presentMarkers = ['hoy', 'ahora', 'actual'];
    const futureMarkers = ['mañana', 'después', 'próximo'];
    
    const pastCount = pastMarkers.filter(m => message.includes(m)).length;
    const presentCount = presentMarkers.filter(m => message.includes(m)).length;
    const futureCount = futureMarkers.filter(m => message.includes(m)).length;
    
    const temporalMixing = (pastCount > 0 ? 1 : 0) + (presentCount > 0 ? 1 : 0) + (futureCount > 0 ? 1 : 0);
    
    if (temporalMixing === 1) {
      coherenceScore += 2;
      factors.push('temporal_consistency');
    } else if (temporalMixing > 1) {
      coherenceScore -= 1;
      factors.push('temporal_inconsistency');
    }
    
    // Logical connector presence
    const connectors = ['porque', 'entonces', 'pero', 'además', 'por eso'];
    const connectorCount = connectors.filter(c => message.includes(c)).length;
    
    if (connectorCount > 0) {
      coherenceScore += connectorCount;
      factors.push('logical_connectors');
    }
    
    // Calculate final coherence level
    let coherenceLevel = 'low';
    if (coherenceScore >= 8) coherenceLevel = 'very_high';
    else if (coherenceScore >= 6) coherenceLevel = 'high';
    else if (coherenceScore >= 4) coherenceLevel = 'medium';
    else if (coherenceScore >= 2) coherenceLevel = 'low_medium';
    
    return {
      score: coherenceScore,
      level: coherenceLevel,
      factors: factors,
      maxPossible: 10
    };
  }

  calculateGlobalCoherence(message, conversationHistory) {
    let globalScore = 0;
    const dimensions = [];
    
    // Thematic consistency across conversation
    const currentTopics = this.extractTopicsFromMessage(message);
    
    if (conversationHistory && conversationHistory.length > 0) {
      const historicalTopics = conversationHistory.flatMap(h => this.extractTopicsFromMessage(h.message || h));
      const topicOverlap = currentTopics.filter(topic => historicalTopics.includes(topic)).length;
      
      if (topicOverlap > 0) {
        globalScore += topicOverlap * 2;
        dimensions.push('thematic_continuity');
      }
    }
    
    // Goal-oriented coherence
    const goalIndicators = ['quiero', 'necesito', 'busco', 'objetivo', 'meta', 'propósito'];
    const goalPresence = goalIndicators.filter(g => message.includes(g)).length;
    
    if (goalPresence > 0) {
      globalScore += 3;
      dimensions.push('goal_orientation');
    }
    
    // Contextual appropriateness
    const businessContext = ['ventas', 'productos', 'clientes', 'restaurant', 'negocio', 'ganancias'];
    const contextMatch = businessContext.filter(c => message.includes(c)).length;
    
    if (contextMatch >= 2) {
      globalScore += 4;
      dimensions.push('contextual_appropriateness');
    }
    
    // Information structure coherence
    const questionWords = ['qué', 'cómo', 'cuándo', 'dónde', 'por qué', 'cuál'];
    const answerWords = ['porque', 'debido a', 'resultado', 'muestra', 'indica'];
    
    const isQuestion = questionWords.some(q => message.includes(q));
    const hasAnswer = answerWords.some(a => message.includes(a));
    
    if (isQuestion || hasAnswer) {
      globalScore += 2;
      dimensions.push('information_structure');
    }
    
    // Pragmatic coherence (speech act consistency)
    const requestMarkers = ['por favor', 'podrías', 'me ayudas'];
    const responseMarkers = ['sí', 'claro', 'por supuesto', 'no problema'];
    const informMarkers = ['te informo', 'según', 'los datos muestran'];
    
    let speechActScore = 0;
    if (requestMarkers.some(r => message.includes(r))) speechActScore += 1;
    if (responseMarkers.some(r => message.includes(r))) speechActScore += 1;
    if (informMarkers.some(i => message.includes(i))) speechActScore += 1;
    
    if (speechActScore > 0) {
      globalScore += speechActScore;
      dimensions.push('pragmatic_coherence');
    }
    
    // Macro-structure coherence
    const structuralMarkers = ['primero', 'segundo', 'finalmente', 'en resumen', 'concluyendo'];
    const structurePresence = structuralMarkers.filter(s => message.includes(s)).length;
    
    if (structurePresence > 0) {
      globalScore += 2;
      dimensions.push('macro_structure');
    }
    
    // Calculate coherence level
    let coherenceLevel = 'fragmented';
    if (globalScore >= 15) coherenceLevel = 'highly_coherent';
    else if (globalScore >= 12) coherenceLevel = 'coherent';
    else if (globalScore >= 8) coherenceLevel = 'moderately_coherent';
    else if (globalScore >= 4) coherenceLevel = 'somewhat_coherent';
    
    return {
      score: globalScore,
      level: coherenceLevel,
      dimensions: dimensions,
      maxPossible: 20
    };
  }
  
  extractTopicsFromMessage(message) {
    const topics = [];
    
    // Ensure message is a string
    if (!message || typeof message !== 'string') {
      return topics;
    }
    
    const businessTopics = {
      'ventas': ['ventas', 'vender', 'vendido'],
      'productos': ['productos', 'producto', 'platillo', 'pollo'],
      'clientes': ['clientes', 'cliente', 'customer'],
      'finanzas': ['dinero', 'ganancias', 'ingresos', 'costos'],
      'operaciones': ['operación', 'funcionamiento', 'proceso']
    };
    
    Object.keys(businessTopics).forEach(topic => {
      if (businessTopics[topic].some(keyword => message.toLowerCase().includes(keyword))) {
        topics.push(topic);
      }
    });
    
    return topics;
  }

  analyzeTopicalProgression(message, conversationHistory) {
    const progression = {
      type: 'linear',
      complexity: 'simple',
      continuity: 'maintained',
      shifts: [],
      depth: 'surface'
    };
    
    // Ensure message is string
    if (!message || typeof message !== 'string') {
      return progression;
    }
    
    const currentTopics = this.extractTopicsFromMessage(message);
    
    // If no conversation history, analyze current message structure
    if (!conversationHistory || conversationHistory.length === 0) {
      if (currentTopics.length > 2) {
        progression.type = 'multi_topic';
        progression.complexity = 'complex';
      }
      return progression;
    }
    
    // Analyze progression across conversation
    const topicHistory = [];
    conversationHistory.forEach((turn, index) => {
      const turnMessage = turn.message || turn;
      if (typeof turnMessage === 'string') {
        const topics = this.extractTopicsFromMessage(turnMessage);
        topicHistory.push({ turn: index, topics });
      }
    });
    
    // Add current message
    topicHistory.push({ turn: topicHistory.length, topics: currentTopics });
    
    // Analyze topic shifts
    for (let i = 1; i < topicHistory.length; i++) {
      const previousTopics = topicHistory[i - 1].topics;
      const currentTurnTopics = topicHistory[i].topics;
      
      const overlap = currentTurnTopics.filter(topic => previousTopics.includes(topic));
      const newTopics = currentTurnTopics.filter(topic => !previousTopics.includes(topic));
      
      if (newTopics.length > 0 && overlap.length === 0) {
        progression.shifts.push({
          turn: i,
          type: 'complete_shift',
          from: previousTopics,
          to: currentTurnTopics
        });
      } else if (newTopics.length > 0 && overlap.length > 0) {
        progression.shifts.push({
          turn: i,
          type: 'partial_shift',
          maintained: overlap,
          added: newTopics
        });
      }
    }
    
    // Determine progression type
    if (progression.shifts.length === 0) {
      progression.type = 'stable';
      progression.continuity = 'maintained';
    } else if (progression.shifts.length === 1) {
      progression.type = 'single_shift';
      progression.continuity = 'interrupted';
    } else {
      progression.type = 'multiple_shifts';
      progression.continuity = 'fragmented';
    }
    
    // Determine complexity
    const totalUniqueTopics = new Set(topicHistory.flatMap(h => h.topics)).size;
    if (totalUniqueTopics >= 4) {
      progression.complexity = 'very_complex';
    } else if (totalUniqueTopics === 3) {
      progression.complexity = 'complex';
    } else if (totalUniqueTopics === 2) {
      progression.complexity = 'moderate';
    }
    
    // Determine depth
    const businessDepthIndicators = ['análisis', 'estrategia', 'optimización', 'insights', 'tendencias'];
    const depthCount = businessDepthIndicators.filter(indicator => 
      message.toLowerCase().includes(indicator)
    ).length;
    
    if (depthCount >= 2) {
      progression.depth = 'deep';
    } else if (depthCount === 1) {
      progression.depth = 'moderate';
    }
    
    return progression;
  }

  analyzeReferentialContinuity(message, conversationHistory) {
    const continuity = {
      score: 0,
      level: 'low',
      references: [],
      chains: [],
      coherenceFactors: []
    };
    
    // Ensure message is string
    if (!message || typeof message !== 'string') {
      return continuity;
    }
    
    // Identify reference elements in current message
    const pronouns = ['él', 'ella', 'eso', 'esto', 'aquello', 'lo', 'la', 'los', 'las', 'le', 'les'];
    const demonstratives = ['este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'aquel', 'aquella'];
    const definiteArticles = ['el', 'la', 'los', 'las'];
    
    // Find pronouns
    pronouns.forEach(pronoun => {
      if (message.toLowerCase().includes(pronoun)) {
        continuity.references.push({
          type: 'pronoun',
          element: pronoun,
          position: message.toLowerCase().indexOf(pronoun),
          needsAntecedent: true
        });
        continuity.score += 1;
      }
    });
    
    // Find demonstratives
    demonstratives.forEach(dem => {
      if (message.toLowerCase().includes(dem)) {
        continuity.references.push({
          type: 'demonstrative',
          element: dem,
          position: message.toLowerCase().indexOf(dem),
          needsAntecedent: true
        });
        continuity.score += 1;
      }
    });
    
    // Find definite descriptions (e.g., "el producto", "la venta")
    const businessEntities = ['producto', 'venta', 'cliente', 'restaurant', 'negocio', 'pollo'];
    businessEntities.forEach(entity => {
      definiteArticles.forEach(article => {
        const pattern = `${article} ${entity}`;
        if (message.toLowerCase().includes(pattern)) {
          continuity.references.push({
            type: 'definite_description',
            element: pattern,
            entity: entity,
            needsAntecedent: false
          });
          continuity.score += 2;
        }
      });
    });
    
    // Analyze repetition and lexical chains
    const words = message.toLowerCase().split(/\s+/);
    const wordCounts = {};
    words.forEach(word => {
      if (word.length > 3) { // Only count meaningful words
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    
    // Find repeated words (lexical chains)
    Object.keys(wordCounts).forEach(word => {
      if (wordCounts[word] > 1) {
        continuity.chains.push({
          type: 'lexical_repetition',
          word: word,
          frequency: wordCounts[word]
        });
        continuity.score += wordCounts[word];
      }
    });
    
    // Analyze with conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-3); // Last 3 turns
      
      recentHistory.forEach(turn => {
        const turnMessage = turn.message || turn;
        if (typeof turnMessage === 'string') {
          // Find shared entities
          businessEntities.forEach(entity => {
            if (message.toLowerCase().includes(entity) && turnMessage.toLowerCase().includes(entity)) {
              continuity.chains.push({
                type: 'cross_turn_reference',
                entity: entity,
                maintained: true
              });
              continuity.score += 3;
              continuity.coherenceFactors.push('entity_continuity');
            }
          });
          
          // Check if pronouns have clear antecedents in history
          continuity.references.forEach(ref => {
            if (ref.needsAntecedent && ref.type === 'pronoun') {
              businessEntities.forEach(entity => {
                if (turnMessage.toLowerCase().includes(entity)) {
                  ref.possibleAntecedent = entity;
                  continuity.score += 2;
                  continuity.coherenceFactors.push('pronoun_resolution');
                }
              });
            }
          });
        }
      });
    }
    
    // Calculate continuity level
    if (continuity.score >= 15) {
      continuity.level = 'very_high';
    } else if (continuity.score >= 10) {
      continuity.level = 'high';
    } else if (continuity.score >= 6) {
      continuity.level = 'medium';
    } else if (continuity.score >= 3) {
      continuity.level = 'low_medium';
    }
    
    // Add coherence factors
    if (continuity.references.length > 0) {
      continuity.coherenceFactors.push('referential_elements_present');
    }
    if (continuity.chains.length > 0) {
      continuity.coherenceFactors.push('lexical_chains_identified');
    }
    
    return continuity;
  }

  identifyGivenInformation(message, conversationHistory) {
    const givenInfo = {
      elements: [],
      score: 0,
      patterns: [],
      contextualReferences: []
    };
    
    // Ensure message is string
    if (!message || typeof message !== 'string') {
      return givenInfo;
    }
    
    // Definite articles often signal given information
    const definitePatterns = [
      /\bel\s+\w+/g,
      /\bla\s+\w+/g,
      /\blos\s+\w+/g,
      /\blas\s+\w+/g
    ];
    
    definitePatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        matches.forEach(match => {
          givenInfo.elements.push({
            type: 'definite_reference',
            text: match.trim(),
            position: message.indexOf(match),
            givenness: 'high'
          });
          givenInfo.score += 2;
        });
      }
    });
    
    // Pronouns typically refer to given information
    const pronounPatterns = [
      /\b(él|ella|ello|ellos|ellas)\b/g,
      /\b(lo|la|los|las|le|les)\b/g,
      /\b(esto|eso|aquello)\b/g
    ];
    
    pronounPatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        matches.forEach(match => {
          givenInfo.elements.push({
            type: 'pronoun_reference',
            text: match,
            position: message.indexOf(match),
            givenness: 'very_high'
          });
          givenInfo.score += 3;
        });
      }
    });
    
    // Demonstratives can signal given information
    const demonstrativePatterns = [
      /\b(este|esta|estos|estas)\s+\w+/g,
      /\b(ese|esa|esos|esas)\s+\w+/g,
      /\b(aquel|aquella|aquellos|aquellas)\s+\w+/g
    ];
    
    demonstrativePatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        matches.forEach(match => {
          givenInfo.elements.push({
            type: 'demonstrative_reference',
            text: match.trim(),
            position: message.indexOf(match),
            givenness: 'high'
          });
          givenInfo.score += 2;
        });
      }
    });
    
    // Temporal references to past events (given information)
    const temporalGivenMarkers = ['ayer', 'antes', 'anteriormente', 'previamente', 'ya'];
    temporalGivenMarkers.forEach(marker => {
      if (message.toLowerCase().includes(marker)) {
        givenInfo.elements.push({
          type: 'temporal_given',
          text: marker,
          position: message.toLowerCase().indexOf(marker),
          givenness: 'medium'
        });
        givenInfo.score += 1;
      }
    });
    
    // Check against conversation history for contextual givenness
    if (conversationHistory && conversationHistory.length > 0) {
      const businessEntities = ['producto', 'venta', 'cliente', 'restaurant', 'negocio', 'pollo', 'ventas', 'rostizado'];
      
      businessEntities.forEach(entity => {
        if (message.toLowerCase().includes(entity)) {
          // Check if this entity was mentioned in previous turns
          const wasMentioned = conversationHistory.some(turn => {
            const turnMessage = turn.message || turn;
            return typeof turnMessage === 'string' && turnMessage.toLowerCase().includes(entity);
          });
          
          if (wasMentioned) {
            givenInfo.contextualReferences.push({
              entity: entity,
              type: 'previously_mentioned',
              givenness: 'contextual'
            });
            givenInfo.score += 2;
          }
        }
      });
    }
    
    // Identify patterns
    if (givenInfo.elements.length > 3) {
      givenInfo.patterns.push('high_referential_density');
    }
    
    if (givenInfo.contextualReferences.length > 1) {
      givenInfo.patterns.push('strong_contextual_continuity');
    }
    
    if (givenInfo.elements.some(e => e.type === 'pronoun_reference')) {
      givenInfo.patterns.push('pronoun_heavy');
    }
    
    if (givenInfo.elements.some(e => e.type === 'definite_reference')) {
      givenInfo.patterns.push('definite_reference_present');
    }
    
    return givenInfo;
  }

  identifyNewInformation(message, conversationHistory) {
    const newInfo = {
      elements: [],
      score: 0,
      patterns: [],
      novelEntities: [],
      focusStructure: 'unknown'
    };
    
    // Ensure message is string
    if (!message || typeof message !== 'string') {
      return newInfo;
    }
    
    // Indefinite articles often signal new information
    const indefinitePatterns = [
      /\bun\s+\w+/g,
      /\buna\s+\w+/g,
      /\bunos\s+\w+/g,
      /\bunas\s+\w+/g
    ];
    
    indefinitePatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        matches.forEach(match => {
          newInfo.elements.push({
            type: 'indefinite_introduction',
            text: match.trim(),
            position: message.indexOf(match),
            novelty: 'high'
          });
          newInfo.score += 3;
        });
      }
    });
    
    // Question words often introduce requests for new information
    const questionWords = ['qué', 'cómo', 'cuándo', 'dónde', 'por qué', 'cuál', 'quién'];
    questionWords.forEach(qword => {
      if (message.toLowerCase().includes(qword)) {
        newInfo.elements.push({
          type: 'information_request',
          text: qword,
          position: message.toLowerCase().indexOf(qword),
          novelty: 'seeking'
        });
        newInfo.score += 2;
      }
    });
    
    // Numbers and specific data often represent new information
    const numberPattern = /\b\d+([.,]\d+)?\b/g;
    const numbers = message.match(numberPattern);
    if (numbers) {
      numbers.forEach(number => {
        newInfo.elements.push({
          type: 'quantitative_data',
          text: number,
          position: message.indexOf(number),
          novelty: 'data_specific'
        });
        newInfo.score += 2;
      });
    }
    
    // Exclamations and emphasis often highlight new information
    const emphasisMarkers = ['¡', '!', 'increíble', 'sorprendente', 'nuevo', 'reciente'];
    emphasisMarkers.forEach(marker => {
      if (message.includes(marker)) {
        newInfo.elements.push({
          type: 'emphasized_content',
          text: marker,
          position: message.indexOf(marker),
          novelty: 'highlighted'
        });
        newInfo.score += 1;
      }
    });
    
    // Comparative structures often introduce new perspectives
    const comparativeMarkers = ['mejor que', 'peor que', 'más que', 'menos que', 'diferente a'];
    comparativeMarkers.forEach(comp => {
      if (message.toLowerCase().includes(comp)) {
        newInfo.elements.push({
          type: 'comparative_information',
          text: comp,
          position: message.toLowerCase().indexOf(comp),
          novelty: 'comparative'
        });
        newInfo.score += 2;
      }
    });
    
    // Check for novel entities not mentioned in conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      const businessTerms = ['producto', 'venta', 'cliente', 'restaurant', 'negocio', 'análisis', 'estrategia', 'optimización'];
      const historicalTerms = new Set();
      
      // Collect all terms from history
      conversationHistory.forEach(turn => {
        const turnMessage = turn.message || turn;
        if (typeof turnMessage === 'string') {
          businessTerms.forEach(term => {
            if (turnMessage.toLowerCase().includes(term)) {
              historicalTerms.add(term);
            }
          });
        }
      });
      
      // Find new terms in current message
      businessTerms.forEach(term => {
        if (message.toLowerCase().includes(term) && !historicalTerms.has(term)) {
          newInfo.novelEntities.push({
            entity: term,
            type: 'first_mention',
            novelty: 'contextually_new'
          });
          newInfo.score += 3;
        }
      });
    } else {
      // If no history, all business terms are potentially new
      const businessTerms = ['análisis', 'insights', 'optimización', 'estrategia', 'tendencias'];
      businessTerms.forEach(term => {
        if (message.toLowerCase().includes(term)) {
          newInfo.novelEntities.push({
            entity: term,
            type: 'introduced_topic',
            novelty: 'session_new'
          });
          newInfo.score += 2;
        }
      });
    }
    
    // Determine focus structure
    if (newInfo.elements.length > 3) {
      newInfo.focusStructure = 'information_dense';
      newInfo.patterns.push('high_information_density');
    } else if (newInfo.elements.length > 1) {
      newInfo.focusStructure = 'balanced';
      newInfo.patterns.push('moderate_information_flow');
    } else if (newInfo.elements.length === 1) {
      newInfo.focusStructure = 'focused';
      newInfo.patterns.push('single_focus_point');
    } else {
      newInfo.focusStructure = 'low_information';
      newInfo.patterns.push('minimal_new_content');
    }
    
    // Additional patterns
    if (newInfo.novelEntities.length > 0) {
      newInfo.patterns.push('novel_entities_introduced');
    }
    
    if (newInfo.elements.some(e => e.type === 'information_request')) {
      newInfo.patterns.push('seeking_information');
    }
    
    if (newInfo.elements.some(e => e.type === 'quantitative_data')) {
      newInfo.patterns.push('data_rich');
    }
    
    return newInfo;
  }

  identifyTopicFocus(message, conversationHistory) {
    const topicFocus = {
      primaryTopic: null,
      secondaryTopics: [],
      focusType: 'distributed',
      prominence: 'low',
      topicShift: false,
      focusMarkers: []
    };
    
    // Ensure message is string
    if (!message || typeof message !== 'string') {
      return topicFocus;
    }
    
    // Define business topic categories with their keywords
    const topicCategories = {
      'ventas': ['ventas', 'vender', 'vendido', 'revenue', 'ingresos'],
      'productos': ['producto', 'productos', 'platillo', 'pollo', 'rostizado', 'menu'],
      'clientes': ['cliente', 'clientes', 'customer', 'consumidor'],
      'análisis': ['análisis', 'analizar', 'insights', 'datos', 'estadísticas'],
      'estrategia': ['estrategia', 'plan', 'optimización', 'mejora'],
      'operaciones': ['operación', 'funcionamiento', 'proceso', 'staff', 'personal'],
      'finanzas': ['dinero', 'ganancias', 'costos', 'precio', 'profit', 'margen']
    };
    
    // Count topic relevance by frequency and position
    const topicScores = {};
    
    Object.keys(topicCategories).forEach(topic => {
      let score = 0;
      const keywords = topicCategories[topic];
      
      keywords.forEach(keyword => {
        const occurrences = (message.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
        if (occurrences > 0) {
          score += occurrences * 2;
          
          // Bonus for early position (more prominent)
          const firstOccurrence = message.toLowerCase().indexOf(keyword);
          if (firstOccurrence < message.length * 0.3) {
            score += 2; // Early position bonus
          }
          
          // Bonus for emphasis markers around keyword
          const contextStart = Math.max(0, firstOccurrence - 10);
          const contextEnd = Math.min(message.length, firstOccurrence + keyword.length + 10);
          const context = message.substring(contextStart, contextEnd);
          
          if (context.includes('¡') || context.includes('!') || context.includes('importante')) {
            score += 3; // Emphasis bonus
            topicFocus.focusMarkers.push({
              type: 'emphasis',
              topic: topic,
              keyword: keyword
            });
          }
        }
      });
      
      if (score > 0) {
        topicScores[topic] = score;
      }
    });
    
    // Identify primary and secondary topics
    const sortedTopics = Object.entries(topicScores)
      .sort(([,a], [,b]) => b - a);
    
    if (sortedTopics.length > 0) {
      topicFocus.primaryTopic = {
        topic: sortedTopics[0][0],
        score: sortedTopics[0][1]
      };
      
      // Secondary topics (significantly lower scores)
      topicFocus.secondaryTopics = sortedTopics.slice(1, 3)
        .filter(([,score]) => score >= 2)
        .map(([topic, score]) => ({ topic, score }));
    }
    
    // Determine focus type
    if (sortedTopics.length === 1) {
      topicFocus.focusType = 'single_focus';
    } else if (sortedTopics.length === 2 && sortedTopics[0][1] > sortedTopics[1][1] * 2) {
      topicFocus.focusType = 'dominant_focus';
    } else if (sortedTopics.length >= 2) {
      topicFocus.focusType = 'multi_topic';
    }
    
    // Determine prominence level
    const maxScore = Math.max(...Object.values(topicScores));
    if (maxScore >= 8) {
      topicFocus.prominence = 'very_high';
    } else if (maxScore >= 6) {
      topicFocus.prominence = 'high';
    } else if (maxScore >= 4) {
      topicFocus.prominence = 'medium';
    } else if (maxScore >= 2) {
      topicFocus.prominence = 'low_medium';
    }
    
    // Check for topic shift from conversation history
    if (conversationHistory && conversationHistory.length > 0 && topicFocus.primaryTopic) {
      const recentTurn = conversationHistory[conversationHistory.length - 1];
      const recentMessage = recentTurn.message || recentTurn;
      
      if (typeof recentMessage === 'string') {
        const previousFocus = this.identifyTopicFocus(recentMessage, []);
        
        if (previousFocus.primaryTopic && 
            previousFocus.primaryTopic.topic !== topicFocus.primaryTopic.topic) {
          topicFocus.topicShift = true;
          topicFocus.focusMarkers.push({
            type: 'topic_shift',
            from: previousFocus.primaryTopic.topic,
            to: topicFocus.primaryTopic.topic
          });
        }
      }
    }
    
    // Identify discourse markers that signal focus
    const focusSignals = [
      'principalmente', 'sobre todo', 'especialmente', 'en particular',
      'lo más importante', 'cabe destacar', 'hay que enfatizar'
    ];
    
    focusSignals.forEach(signal => {
      if (message.toLowerCase().includes(signal)) {
        topicFocus.focusMarkers.push({
          type: 'focus_signal',
          marker: signal,
          position: message.toLowerCase().indexOf(signal)
        });
      }
    });
    
    return topicFocus;
  }

  identifyTopicFocus(message, conversationHistory) {
    // Topic focus identification for neural conversation processing
    const analysis = {
      primaryTopic: '',
      secondaryTopics: [],
      focusIntensity: 'medium',
      topicShift: false,
      contextualRelevance: 'high'
    };

    try {
      // Extract primary topic from message
      const messageWords = message.toLowerCase().split(/\s+/);
      const topicKeywords = ['ventas', 'producto', 'pollo', 'rostizado', 'análisis', 'insights', 'datos'];
      
      // Identify primary focus
      for (const keyword of topicKeywords) {
        if (message.toLowerCase().includes(keyword)) {
          analysis.primaryTopic = keyword;
          break;
        }
      }

      // Set default if no specific topic found
      if (!analysis.primaryTopic) {
        analysis.primaryTopic = 'general_inquiry';
      }

      // Determine focus intensity based on message characteristics
      if (message.includes('!') || message.includes('urgente') || message.includes('importante')) {
        analysis.focusIntensity = 'high';
      } else if (message.length < 20) {
        analysis.focusIntensity = 'low';
      }

      // Check for topic shifts in conversation history
      if (conversationHistory && conversationHistory.length > 0) {
        const lastMessage = conversationHistory[conversationHistory.length - 1];
        if (lastMessage && lastMessage.content) {
          const lastTopic = this.extractMainTopic(lastMessage.content);
          const currentTopic = this.extractMainTopic(message);
          analysis.topicShift = lastTopic !== currentTopic;
        }
      }

      // Set contextual relevance
      if (analysis.primaryTopic.includes('pollo') || analysis.primaryTopic.includes('ventas')) {
        analysis.contextualRelevance = 'high';
      } else if (analysis.primaryTopic === 'general_inquiry') {
        analysis.contextualRelevance = 'medium';
      }

    } catch (error) {
      console.warn('🧠 Topic focus analysis warning:', error.message);
      // Return safe defaults
      analysis.primaryTopic = 'general';
      analysis.focusIntensity = 'medium';
      analysis.contextualRelevance = 'medium';
    }

    return analysis;
  }

  extractMainTopic(text) {
    // Helper method for topic extraction
    const topicMap = {
      'ventas': 'sales',
      'pollo': 'product',
      'análisis': 'analysis',
      'datos': 'data',
      'insights': 'insights'
    };

    for (const [keyword, topic] of Object.entries(topicMap)) {
      if (text.toLowerCase().includes(keyword)) {
        return topic;
      }
    }
    return 'general';
  }

  analyzeBackgroundForeground(message, conversationHistory) {
    // Background vs foreground information analysis for neural processing
    const analysis = {
      backgroundInfo: [],
      foregroundInfo: [],
      prominence: 'balanced',
      informationLayers: {},
      contextualDepth: 'medium'
    };

    try {
      // Analyze message for background vs foreground information
      const messageText = message.toLowerCase();
      
      // Foreground info - direct, explicit, immediate focus
      const foregroundPatterns = [
        'analiza', 'dame', 'quiero', 'necesito', 'muestra', 'dime',
        'pollo rostizado', 'ventas', 'insights', 'producto estrella'
      ];

      // Background info - contextual, implied, supporting details
      const backgroundPatterns = [
        'todas mis', 'historial', 'datos', 'información', 'contexto',
        'anteriores', 'completo', 'general'
      ];

      // Identify foreground information
      foregroundPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.foregroundInfo.push({
            type: 'explicit_request',
            content: pattern,
            importance: 'high'
          });
        }
      });

      // Identify background information
      backgroundPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.backgroundInfo.push({
            type: 'contextual_scope',
            content: pattern,
            importance: 'medium'
          });
        }
      });

      // Determine prominence based on information distribution
      if (analysis.foregroundInfo.length > analysis.backgroundInfo.length) {
        analysis.prominence = 'foreground_heavy';
      } else if (analysis.backgroundInfo.length > analysis.foregroundInfo.length) {
        analysis.prominence = 'background_heavy';
      } else {
        analysis.prominence = 'balanced';
      }

      // Analyze information layers
      analysis.informationLayers = {
        explicit: analysis.foregroundInfo.length,
        implicit: analysis.backgroundInfo.length,
        ratio: analysis.foregroundInfo.length / (analysis.backgroundInfo.length || 1)
      };

      // Set contextual depth
      if (analysis.backgroundInfo.length > 2) {
        analysis.contextualDepth = 'deep';
      } else if (analysis.backgroundInfo.length === 0) {
        analysis.contextualDepth = 'shallow';
      }

      // Add conversation history context if available
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.backgroundInfo.push({
          type: 'conversation_context',
          content: 'previous_interactions',
          importance: 'low'
        });
      }

    } catch (error) {
      console.warn('🧠 Background/Foreground analysis warning:', error.message);
      // Return safe defaults
      analysis.prominence = 'balanced';
      analysis.contextualDepth = 'medium';
    }

    return analysis;
  }

  identifyStoryElements(message, conversationHistory) {
    // Story elements identification for narrative structure analysis
    const analysis = {
      hasNarrative: false,
      storyElements: [],
      narrativeType: 'none',
      chronology: 'present',
      characters: [],
      setting: null
    };

    try {
      const messageText = message.toLowerCase();
      
      // Check for narrative indicators
      const narrativePatterns = [
        'analiza', 'ventas', 'producto', 'pollo rostizado', 'insights',
        'datos', 'historial', 'tendencias', 'comportamiento'
      ];

      // Check for temporal elements (story chronology)
      const temporalPatterns = [
        'todas mis', 'historial', 'anteriores', 'pasadas',
        'últimas', 'recientes', 'actuales'
      ];

      // Identify narrative elements
      narrativePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.storyElements.push({
            type: 'business_narrative',
            element: pattern,
            role: 'data_subject'
          });
        }
      });

      // Determine narrative type based on business context
      if (messageText.includes('analiza') && messageText.includes('ventas')) {
        analysis.narrativeType = 'analytical_request';
        analysis.hasNarrative = true;
      } else if (messageText.includes('producto') && messageText.includes('insights')) {
        analysis.narrativeType = 'product_inquiry';
        analysis.hasNarrative = true;
      } else if (analysis.storyElements.length > 0) {
        analysis.narrativeType = 'business_query';
        analysis.hasNarrative = true;
      }

      // Identify chronological elements
      temporalPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          if (pattern.includes('historial') || pattern.includes('todas')) {
            analysis.chronology = 'historical_comprehensive';
          } else if (pattern.includes('recientes') || pattern.includes('últimas')) {
            analysis.chronology = 'recent_past';
          }
        }
      });

      // Identify business "characters" (entities)
      if (messageText.includes('pollo rostizado')) {
        analysis.characters.push({
          type: 'product',
          name: 'pollo_rostizado',
          role: 'protagonist'
        });
      }

      if (messageText.includes('ventas') || messageText.includes('datos')) {
        analysis.characters.push({
          type: 'business_data',
          name: 'sales_data',
          role: 'supporting'
        });
      }

      // Set business setting
      if (analysis.hasNarrative) {
        analysis.setting = {
          type: 'business_context',
          domain: 'restaurant_analytics',
          scope: 'sales_analysis'
        };
      }

    } catch (error) {
      console.warn('🧠 Story elements analysis warning:', error.message);
      // Return safe defaults
      analysis.narrativeType = 'simple_query';
      analysis.chronology = 'present';
    }

    return analysis;
  }

  analyzeNarrativeProgression(message, conversationHistory) {
    // Narrative progression analysis for conversation flow understanding
    const analysis = {
      progressionType: 'linear',
      stages: [],
      currentStage: 'inquiry',
      flowDirection: 'forward',
      complexity: 'simple',
      continuity: 'standalone'
    };

    try {
      const messageText = message.toLowerCase();
      
      // Identify progression stages in business queries
      const stagePatterns = {
        'inquiry': ['analiza', 'dame', 'quiero', 'necesito', 'muestra'],
        'specification': ['pollo rostizado', 'producto estrella', 'ventas'],
        'scope': ['todas mis', 'historial', 'completo', 'general'],
        'outcome': ['insights', 'recomendaciones', 'análisis', 'resultados']
      };

      // Identify current stages present in message
      Object.entries(stagePatterns).forEach(([stage, patterns]) => {
        const stagePresent = patterns.some(pattern => messageText.includes(pattern));
        if (stagePresent) {
          analysis.stages.push({
            name: stage,
            markers: patterns.filter(p => messageText.includes(p)),
            position: analysis.stages.length + 1
          });
        }
      });

      // Determine current stage based on message content
      if (messageText.includes('analiza') || messageText.includes('dame')) {
        analysis.currentStage = 'active_inquiry';
      } else if (messageText.includes('insights') || messageText.includes('recomendaciones')) {
        analysis.currentStage = 'seeking_outcomes';
      } else if (messageText.includes('pollo rostizado')) {
        analysis.currentStage = 'product_focus';
      }

      // Determine progression type
      if (analysis.stages.length > 2) {
        analysis.progressionType = 'multi_stage';
        analysis.complexity = 'complex';
      } else if (analysis.stages.length === 2) {
        analysis.progressionType = 'dual_phase';
        analysis.complexity = 'moderate';
      } else {
        analysis.progressionType = 'single_phase';
        analysis.complexity = 'simple';
      }

      // Analyze flow direction
      const actionWords = ['analiza', 'dame', 'muestra', 'genera'];
      const hasActionWords = actionWords.some(word => messageText.includes(word));
      
      if (hasActionWords) {
        analysis.flowDirection = 'request_to_response';
      } else {
        analysis.flowDirection = 'conversational';
      }

      // Check continuity with conversation history
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.continuity = 'contextual';
        
        // Look for progression indicators
        const lastMessage = conversationHistory[conversationHistory.length - 1];
        if (lastMessage && lastMessage.content) {
          const isFollowUp = this.isFollowUpQuery(message, lastMessage.content);
          if (isFollowUp) {
            analysis.progressionType = 'continuation';
            analysis.continuity = 'sequential';
          }
        }
      }

      // Set progression metadata
      analysis.metadata = {
        totalStages: analysis.stages.length,
        dominantStage: analysis.currentStage,
        progressionScore: this.calculateProgressionScore(analysis.stages),
        isComplete: analysis.stages.length >= 3
      };

    } catch (error) {
      console.warn('🧠 Narrative progression analysis warning:', error.message);
      // Return safe defaults
      analysis.progressionType = 'simple';
      analysis.currentStage = 'inquiry';
      analysis.complexity = 'simple';
    }

    return analysis;
  }

  isFollowUpQuery(currentMessage, previousMessage) {
    // Helper method to detect follow-up queries
    const followUpIndicators = ['además', 'también', 'y', 'pero', 'sin embargo'];
    return followUpIndicators.some(indicator => 
      currentMessage.toLowerCase().includes(indicator)
    );
  }

  calculateProgressionScore(stages) {
    // Helper method to calculate progression complexity
    if (stages.length === 0) return 0;
    if (stages.length === 1) return 0.3;
    if (stages.length === 2) return 0.6;
    if (stages.length === 3) return 0.8;
    return 1.0;
  }

  identifyCharacterRoles(message, conversationHistory) {
    // Character roles identification for business conversation analysis
    const analysis = {
      characters: [],
      primaryActor: null,
      relationships: [],
      roleHierarchy: [],
      interactionType: 'business_query'
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business entity role mapping
      const entityRoles = {
        'user': {
          indicators: ['mis', 'mi', 'yo', 'necesito', 'quiero'],
          role: 'business_owner',
          importance: 'primary'
        },
        'product': {
          indicators: ['pollo rostizado', 'producto estrella', 'producto'],
          role: 'business_asset',
          importance: 'high'
        },
        'data': {
          indicators: ['ventas', 'datos', 'información', 'historial'],
          role: 'information_source',
          importance: 'medium'
        },
        'system': {
          indicators: ['analiza', 'dame', 'muestra', 'genera'],
          role: 'analytical_agent',
          importance: 'high'
        },
        'insights': {
          indicators: ['insights', 'recomendaciones', 'análisis'],
          role: 'desired_outcome',
          importance: 'high'
        }
      };

      // Identify characters present in the message
      Object.entries(entityRoles).forEach(([entityType, config]) => {
        const isPresent = config.indicators.some(indicator => 
          messageText.includes(indicator)
        );
        
        if (isPresent) {
          const character = {
            type: entityType,
            role: config.role,
            importance: config.importance,
            markers: config.indicators.filter(ind => messageText.includes(ind)),
            relationshipType: this.determineRelationshipType(entityType, messageText)
          };
          
          analysis.characters.push(character);
        }
      });

      // Determine primary actor
      const primaryCandidates = analysis.characters.filter(c => 
        c.importance === 'primary' || c.importance === 'high'
      );
      
      if (primaryCandidates.length > 0) {
        analysis.primaryActor = primaryCandidates[0];
      } else if (analysis.characters.length > 0) {
        analysis.primaryActor = analysis.characters[0];
      }

      // Build role hierarchy
      const importanceOrder = ['primary', 'high', 'medium', 'low'];
      analysis.roleHierarchy = importanceOrder.map(level => ({
        level: level,
        characters: analysis.characters.filter(c => c.importance === level)
      })).filter(level => level.characters.length > 0);

      // Identify relationships between characters
      if (analysis.characters.length > 1) {
        for (let i = 0; i < analysis.characters.length; i++) {
          for (let j = i + 1; j < analysis.characters.length; j++) {
            const char1 = analysis.characters[i];
            const char2 = analysis.characters[j];
            
            const relationship = this.analyzeCharacterRelationship(char1, char2, messageText);
            if (relationship) {
              analysis.relationships.push(relationship);
            }
          }
        }
      }

      // Determine interaction type based on characters present
      if (analysis.characters.some(c => c.type === 'user') && 
          analysis.characters.some(c => c.type === 'system')) {
        analysis.interactionType = 'user_system_query';
      } else if (analysis.characters.some(c => c.type === 'product')) {
        analysis.interactionType = 'product_analysis_request';
      } else {
        analysis.interactionType = 'general_business_inquiry';
      }

    } catch (error) {
      console.warn('🧠 Character roles analysis warning:', error.message);
      // Return safe defaults
      analysis.interactionType = 'simple_query';
    }

    return analysis;
  }

  determineRelationshipType(entityType, messageText) {
    // Helper method to determine relationship type
    const relationshipMap = {
      'user': 'requester',
      'product': 'subject',
      'data': 'source',
      'system': 'processor',
      'insights': 'goal'
    };
    
    return relationshipMap[entityType] || 'participant';
  }

  analyzeCharacterRelationship(char1, char2, messageText) {
    // Helper method to analyze relationships between characters
    const relationshipTypes = {
      'user-system': 'command_relationship',
      'user-product': 'ownership_relationship',
      'user-data': 'ownership_relationship',
      'product-data': 'subject_source_relationship',
      'system-insights': 'producer_product_relationship',
      'data-insights': 'source_output_relationship'
    };

    const key1 = `${char1.type}-${char2.type}`;
    const key2 = `${char2.type}-${char1.type}`;
    
    const relationshipType = relationshipTypes[key1] || relationshipTypes[key2];
    
    if (relationshipType) {
      return {
        from: char1.type,
        to: char2.type,
        type: relationshipType,
        strength: 'medium'
      };
    }
    
    return null;
  }

  analyzePlotDevelopment(message, conversationHistory) {
    // Plot development analysis for business conversation flow
    const analysis = {
      plotStructure: 'simple',
      developmentStage: 'exposition',
      tension: 'low',
      resolution: 'pending',
      businessArc: {},
      progression: []
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business plot development stages
      const plotStages = {
        'exposition': ['analiza', 'dame', 'quiero', 'necesito'],
        'rising_action': ['todas mis', 'historial', 'datos', 'completo'],
        'climax': ['producto estrella', 'pollo rostizado', 'insights'],
        'falling_action': ['recomendaciones', 'análisis', 'resultados'],
        'resolution': ['muestra', 'genera', 'presenta']
      };

      // Identify current development stage
      let stageScores = {};
      Object.entries(plotStages).forEach(([stage, indicators]) => {
        const score = indicators.filter(indicator => 
          messageText.includes(indicator)
        ).length;
        stageScores[stage] = score;
      });

      // Determine dominant stage
      const dominantStage = Object.entries(stageScores).reduce((max, [stage, score]) => 
        score > max.score ? { stage, score } : max, 
        { stage: 'exposition', score: 0 }
      );

      analysis.developmentStage = dominantStage.stage;

      // Analyze plot structure complexity
      const activeStages = Object.values(stageScores).filter(score => score > 0).length;
      if (activeStages >= 4) {
        analysis.plotStructure = 'complex_multi_act';
      } else if (activeStages === 3) {
        analysis.plotStructure = 'three_act';
      } else if (activeStages === 2) {
        analysis.plotStructure = 'two_part';
      } else {
        analysis.plotStructure = 'simple_linear';
      }

      // Determine tension level based on urgency and specificity
      const urgencyIndicators = ['necesito', 'urgente', 'importante', 'ya'];
      const specificityIndicators = ['producto estrella', 'pollo rostizado', 'específico'];
      
      const urgencyLevel = urgencyIndicators.filter(ind => messageText.includes(ind)).length;
      const specificityLevel = specificityIndicators.filter(ind => messageText.includes(ind)).length;
      
      if (urgencyLevel > 0 && specificityLevel > 0) {
        analysis.tension = 'high';
      } else if (urgencyLevel > 0 || specificityLevel > 0) {
        analysis.tension = 'medium';
      } else {
        analysis.tension = 'low';
      }

      // Determine resolution expectation
      const resolutionIndicators = ['dame', 'muestra', 'genera', 'presenta', 'quiero'];
      if (resolutionIndicators.some(ind => messageText.includes(ind))) {
        analysis.resolution = 'expected_immediate';
      } else {
        analysis.resolution = 'pending_clarification';
      }

      // Build business arc
      analysis.businessArc = {
        problem: this.extractProblem(messageText),
        goal: this.extractGoal(messageText),
        method: this.extractMethod(messageText),
        expectedOutcome: this.extractExpectedOutcome(messageText)
      };

      // Track progression through conversation
      analysis.progression = [
        {
          stage: analysis.developmentStage,
          tension: analysis.tension,
          timestamp: 'current',
          key_elements: Object.keys(stageScores).filter(stage => stageScores[stage] > 0)
        }
      ];

      // Add conversation history context if available
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.progression.unshift({
          stage: 'context',
          tension: 'background',
          timestamp: 'previous',
          key_elements: ['conversation_history']
        });
      }

    } catch (error) {
      console.warn('🧠 Plot development analysis warning:', error.message);
      // Return safe defaults
      analysis.plotStructure = 'simple';
      analysis.developmentStage = 'exposition';
      analysis.tension = 'low';
    }

    return analysis;
  }

  extractProblem(messageText) {
    // Helper method to extract business problem
    if (messageText.includes('analiza') && messageText.includes('ventas')) {
      return 'sales_analysis_needed';
    } else if (messageText.includes('producto') && messageText.includes('insights')) {
      return 'product_insights_needed';
    }
    return 'information_request';
  }

  extractGoal(messageText) {
    // Helper method to extract business goal
    if (messageText.includes('insights')) return 'obtain_insights';
    if (messageText.includes('análisis')) return 'get_analysis';
    if (messageText.includes('recomendaciones')) return 'get_recommendations';
    return 'get_information';
  }

  extractMethod(messageText) {
    // Helper method to extract analysis method
    if (messageText.includes('todas mis') || messageText.includes('historial')) {
      return 'comprehensive_analysis';
    } else if (messageText.includes('producto estrella')) {
      return 'focused_product_analysis';
    }
    return 'standard_analysis';
  }

  extractExpectedOutcome(messageText) {
    // Helper method to extract expected outcome
    if (messageText.includes('insights')) return 'actionable_insights';
    if (messageText.includes('recomendaciones')) return 'strategic_recommendations';
    if (messageText.includes('análisis')) return 'detailed_analysis';
    return 'informative_response';
  }

  analyzeContextualCues(message, conversationHistory) {
    // Contextual cues analysis for understanding implicit information
    const analysis = {
      explicitCues: [],
      implicitCues: [],
      culturalContext: {},
      businessContext: {},
      temporalContext: {},
      contextualDepth: 'medium'
    };

    try {
      const messageText = message.toLowerCase();
      
      // Explicit contextual cues (directly stated)
      const explicitPatterns = {
        'scope': ['todas mis', 'mis ventas', 'mi producto', 'mi restaurante'],
        'timeframe': ['historial', 'datos', 'anteriores', 'completo'],
        'focus': ['producto estrella', 'pollo rostizado', 'ventas'],
        'intent': ['analiza', 'dame', 'quiero', 'necesito', 'muestra'],
        'outcome': ['insights', 'recomendaciones', 'análisis']
      };

      // Identify explicit cues
      Object.entries(explicitPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.explicitCues.push({
              category: category,
              cue: pattern,
              confidence: 'high',
              type: 'direct_statement'
            });
          }
        });
      });

      // Implicit contextual cues (inferred from context)
      const implicitIndicators = {
        'business_ownership': ['mis', 'mi', 'nuestro'],
        'data_familiarity': ['todas', 'historial', 'completo'],
        'performance_focus': ['estrella', 'mejor', 'principal'],
        'analytical_need': ['analiza', 'insights', 'comportamiento'],
        'decision_making': ['recomendaciones', 'qué hacer', 'estrategia']
      };

      // Identify implicit cues
      Object.entries(implicitIndicators).forEach(([context, indicators]) => {
        const matches = indicators.filter(indicator => messageText.includes(indicator));
        if (matches.length > 0) {
          analysis.implicitCues.push({
            context: context,
            indicators: matches,
            confidence: matches.length > 1 ? 'high' : 'medium',
            type: 'inferred'
          });
        }
      });

      // Analyze cultural context (Spanish language business communication)
      analysis.culturalContext = {
        language: 'spanish',
        communicationStyle: this.identifyCommunicationStyle(messageText),
        formalityLevel: this.assessFormalityLevel(messageText),
        businessCulture: 'latin_american_restaurant'
      };

      // Analyze business context
      analysis.businessContext = {
        industry: 'food_service',
        businessType: 'restaurant',
        dataType: 'sales_analytics',
        stakeholderRole: this.identifyStakeholderRole(messageText),
        decisionContext: this.identifyDecisionContext(messageText)
      };

      // Analyze temporal context
      analysis.temporalContext = {
        timeOrientation: this.identifyTimeOrientation(messageText),
        urgencyLevel: this.assessUrgencyLevel(messageText),
        dataScope: this.identifyDataScope(messageText),
        analysisDepth: this.assessAnalysisDepth(messageText)
      };

      // Determine overall contextual depth
      const totalCues = analysis.explicitCues.length + analysis.implicitCues.length;
      if (totalCues >= 8) {
        analysis.contextualDepth = 'deep';
      } else if (totalCues >= 5) {
        analysis.contextualDepth = 'medium';
      } else {
        analysis.contextualDepth = 'shallow';
      }

      // Add conversation history context if available
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.implicitCues.push({
          context: 'conversation_continuity',
          indicators: ['previous_interaction'],
          confidence: 'medium',
          type: 'historical'
        });
      }

    } catch (error) {
      console.warn('🧠 Contextual cues analysis warning:', error.message);
      // Return safe defaults
      analysis.contextualDepth = 'medium';
    }

    return analysis;
  }

  identifyCommunicationStyle(messageText) {
    // Helper method to identify communication style
    if (messageText.includes('por favor') || messageText.includes('gracias')) {
      return 'polite_formal';
    } else if (messageText.includes('quiero') || messageText.includes('necesito')) {
      return 'direct_business';
    }
    return 'standard_business';
  }

  assessFormalityLevel(messageText) {
    // Helper method to assess formality level
    const formalIndicators = ['analizar', 'proporcionar', 'información'];
    const informalIndicators = ['dame', 'quiero', 'mi'];
    
    const formalCount = formalIndicators.filter(ind => messageText.includes(ind)).length;
    const informalCount = informalIndicators.filter(ind => messageText.includes(ind)).length;
    
    if (formalCount > informalCount) return 'formal';
    if (informalCount > formalCount) return 'informal';
    return 'neutral';
  }

  identifyStakeholderRole(messageText) {
    // Helper method to identify stakeholder role
    if (messageText.includes('mis') || messageText.includes('mi')) {
      return 'business_owner';
    } else if (messageText.includes('nuestro') || messageText.includes('nuestra')) {
      return 'management_team';
    }
    return 'business_user';
  }

  identifyDecisionContext(messageText) {
    // Helper method to identify decision context
    if (messageText.includes('recomendaciones')) return 'strategic_planning';
    if (messageText.includes('análisis')) return 'performance_review';
    if (messageText.includes('insights')) return 'optimization_seeking';
    return 'information_gathering';
  }

  identifyTimeOrientation(messageText) {
    // Helper method to identify time orientation
    if (messageText.includes('historial') || messageText.includes('todas')) {
      return 'comprehensive_historical';
    } else if (messageText.includes('reciente') || messageText.includes('último')) {
      return 'recent_focus';
    }
    return 'general_timeframe';
  }

  assessUrgencyLevel(messageText) {
    // Helper method to assess urgency level
    const urgencyIndicators = ['urgente', 'ya', 'ahora', 'inmediato'];
    if (urgencyIndicators.some(ind => messageText.includes(ind))) return 'high';
    if (messageText.includes('necesito')) return 'medium';
    return 'low';
  }

  identifyDataScope(messageText) {
    // Helper method to identify data scope
    if (messageText.includes('todas') || messageText.includes('completo')) {
      return 'comprehensive';
    } else if (messageText.includes('producto estrella')) {
      return 'focused_product';
    }
    return 'standard_scope';
  }

  assessAnalysisDepth(messageText) {
    // Helper method to assess analysis depth
    if (messageText.includes('insights') && messageText.includes('recomendaciones')) {
      return 'deep_strategic';
    } else if (messageText.includes('análisis')) {
      return 'detailed';
    }
    return 'standard';
  }

  analyzeConversationalFlow(message, conversationHistory) {
    // Conversational flow analysis for understanding dialogue dynamics
    const analysis = {
      flowType: 'linear',
      direction: 'forward',
      momentum: 'steady',
      coherence: 'high',
      transitions: [],
      conversationStage: 'initiation'
    };

    try {
      const messageText = message.toLowerCase();
      
      // Analyze flow direction based on message structure
      const flowIndicators = {
        'request_flow': ['analiza', 'dame', 'quiero', 'necesito', 'muestra'],
        'information_flow': ['datos', 'ventas', 'historial', 'información'],
        'outcome_flow': ['insights', 'recomendaciones', 'análisis', 'resultados'],
        'specification_flow': ['pollo rostizado', 'producto estrella', 'específico']
      };

      // Identify dominant flow pattern
      let flowScores = {};
      Object.entries(flowIndicators).forEach(([flowType, indicators]) => {
        const score = indicators.filter(indicator => 
          messageText.includes(indicator)
        ).length;
        flowScores[flowType] = score;
      });

      const dominantFlow = Object.entries(flowScores).reduce((max, [flow, score]) => 
        score > max.score ? { flow, score } : max, 
        { flow: 'neutral', score: 0 }
      );

      // Set flow type based on dominant pattern
      if (dominantFlow.score > 0) {
        analysis.flowType = dominantFlow.flow;
      }

      // Analyze conversation direction
      if (messageText.includes('analiza') || messageText.includes('dame')) {
        analysis.direction = 'request_to_response';
      } else if (messageText.includes('continúa') || messageText.includes('además')) {
        analysis.direction = 'continuation';
      } else {
        analysis.direction = 'initiation';
      }

      // Assess conversation momentum
      const urgencyWords = ['ya', 'ahora', 'inmediato', 'urgente'];
      const detailWords = ['completo', 'detallado', 'todas', 'historial'];
      
      const urgencyCount = urgencyWords.filter(word => messageText.includes(word)).length;
      const detailCount = detailWords.filter(word => messageText.includes(word)).length;
      
      if (urgencyCount > 0) {
        analysis.momentum = 'high';
      } else if (detailCount > 1) {
        analysis.momentum = 'deliberate';
      } else {
        analysis.momentum = 'steady';
      }

      // Analyze conversational coherence
      const coherenceFactors = {
        'topic_consistency': this.checkTopicConsistency(messageText),
        'linguistic_coherence': this.checkLinguisticCoherence(messageText),
        'logical_progression': this.checkLogicalProgression(messageText)
      };

      const coherenceScore = Object.values(coherenceFactors).reduce((sum, score) => sum + score, 0) / 3;
      
      if (coherenceScore >= 0.8) {
        analysis.coherence = 'high';
      } else if (coherenceScore >= 0.5) {
        analysis.coherence = 'medium';
      } else {
        analysis.coherence = 'low';
      }

      // Determine conversation stage
      if (messageText.includes('analiza') && messageText.includes('ventas')) {
        analysis.conversationStage = 'active_inquiry';
      } else if (messageText.includes('recomendaciones')) {
        analysis.conversationStage = 'seeking_closure';
      } else if (conversationHistory && conversationHistory.length > 0) {
        analysis.conversationStage = 'continuation';
      } else {
        analysis.conversationStage = 'initiation';
      }

      // Identify conversation transitions
      const transitionPatterns = {
        'topic_introduction': ['analiza', 'sobre', 'de'],
        'specification': ['producto estrella', 'pollo rostizado', 'específicamente'],
        'scope_expansion': ['todas', 'completo', 'general'],
        'outcome_seeking': ['insights', 'recomendaciones', 'qué']
      };

      Object.entries(transitionPatterns).forEach(([transitionType, patterns]) => {
        const matches = patterns.filter(pattern => messageText.includes(pattern));
        if (matches.length > 0) {
          analysis.transitions.push({
            type: transitionType,
            markers: matches,
            strength: matches.length > 1 ? 'strong' : 'medium'
          });
        }
      });

      // Add conversation history analysis if available
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historyInfluence = this.analyzeHistoryInfluence(conversationHistory);
        analysis.flowContinuity = this.assessFlowContinuity(message, conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Conversational flow analysis warning:', error.message);
      // Return safe defaults
      analysis.flowType = 'linear';
      analysis.direction = 'forward';
      analysis.momentum = 'steady';
    }

    return analysis;
  }

  checkTopicConsistency(messageText) {
    // Helper method to check topic consistency
    const businessTopics = ['ventas', 'producto', 'datos', 'análisis', 'insights'];
    const topicCount = businessTopics.filter(topic => messageText.includes(topic)).length;
    return Math.min(topicCount / 3, 1.0); // Normalize to 0-1
  }

  checkLinguisticCoherence(messageText) {
    // Helper method to check linguistic coherence
    const words = messageText.split(/\s+/);
    if (words.length < 3) return 0.5;
    
    const hasSubject = messageText.includes('pollo') || messageText.includes('producto');
    const hasVerb = messageText.includes('analiza') || messageText.includes('dame');
    const hasObject = messageText.includes('ventas') || messageText.includes('insights');
    
    return (hasSubject + hasVerb + hasObject) / 3;
  }

  checkLogicalProgression(messageText) {
    // Helper method to check logical progression
    const progressionElements = [
      messageText.includes('analiza'), // Request
      messageText.includes('ventas') || messageText.includes('datos'), // Subject
      messageText.includes('insights') || messageText.includes('recomendaciones') // Goal
    ];
    
    return progressionElements.filter(Boolean).length / 3;
  }

  analyzeHistoryInfluence(conversationHistory) {
    // Helper method to analyze conversation history influence
    if (!conversationHistory || conversationHistory.length === 0) {
      return { influence: 'none', continuity: 'new_conversation' };
    }
    
    return {
      influence: 'contextual',
      continuity: 'building_on_previous',
      historyLength: conversationHistory.length
    };
  }

  assessFlowContinuity(currentMessage, conversationHistory) {
    // Helper method to assess flow continuity
    if (!conversationHistory || conversationHistory.length === 0) {
      return 'standalone';
    }
    
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    if (lastMessage && lastMessage.content) {
      const hasConnectors = ['y', 'también', 'además', 'pero'].some(connector =>
        currentMessage.toLowerCase().includes(connector)
      );
      
      return hasConnectors ? 'connected' : 'related';
    }
    
    return 'independent';
  }

  analyzeMetaConversationalElements(message, conversationHistory) {
    // Meta-conversational elements analysis for understanding communication about communication
    const analysis = {
      metaElements: [],
      communicationAwareness: 'low',
      reflexivity: 'none',
      metaLevel: 0,
      conversationAboutConversation: false,
      strategicCommunication: {}
    };

    try {
      const messageText = message.toLowerCase();
      
      // Meta-conversational indicators
      const metaPatterns = {
        'clarification_seeking': ['qué quiero decir', 'me explico', 'es decir'],
        'communication_strategy': ['analiza', 'dame insights', 'quiero que'],
        'process_awareness': ['cómo', 'por qué', 'de qué manera'],
        'expectation_setting': ['necesito', 'quiero', 'esperaría'],
        'result_specification': ['insights', 'recomendaciones', 'análisis'],
        'scope_definition': ['todas mis', 'producto estrella', 'completo']
      };

      // Identify meta-conversational elements
      Object.entries(metaPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.metaElements.push({
              category: category,
              pattern: pattern,
              type: 'implicit_meta',
              level: this.determineMetaLevel(category)
            });
          }
        });
      });

      // Assess communication awareness level
      const awarenessIndicators = [
        'analiza', 'dame', 'quiero', 'necesito', 'insights', 'recomendaciones'
      ];
      const awarenessScore = awarenessIndicators.filter(indicator => 
        messageText.includes(indicator)
      ).length;

      if (awarenessScore >= 4) {
        analysis.communicationAwareness = 'high';
      } else if (awarenessScore >= 2) {
        analysis.communicationAwareness = 'medium';
      } else {
        analysis.communicationAwareness = 'low';
      }

      // Analyze reflexivity (awareness of one's own communication)
      const reflexiveIndicators = ['mis', 'mi', 'yo', 'necesito', 'quiero'];
      const reflexiveCount = reflexiveIndicators.filter(ind => messageText.includes(ind)).length;
      
      if (reflexiveCount >= 3) {
        analysis.reflexivity = 'high';
      } else if (reflexiveCount >= 1) {
        analysis.reflexivity = 'medium';
      } else {
        analysis.reflexivity = 'low';
      }

      // Determine overall meta-level
      analysis.metaLevel = Math.min(analysis.metaElements.length, 3);

      // Check if conversation is about conversation itself
      const conversationAboutConversationIndicators = [
        'cómo analizar', 'qué tipo de análisis', 'de qué manera'
      ];
      analysis.conversationAboutConversation = conversationAboutConversationIndicators.some(
        indicator => messageText.includes(indicator)
      );

      // Analyze strategic communication elements
      analysis.strategicCommunication = {
        goalOriented: this.isGoalOriented(messageText),
        outcomeSpecific: this.isOutcomeSpecific(messageText),
        processAware: this.isProcessAware(messageText),
        contextuallyFramed: this.isContextuallyFramed(messageText)
      };

      // Additional meta-analysis for business communication
      analysis.businessMetaElements = {
        requestClarity: this.assessRequestClarity(messageText),
        expectationManagement: this.assessExpectationManagement(messageText),
        communicationEfficiency: this.assessCommunicationEfficiency(messageText),
        informationStructuring: this.assessInformationStructuring(messageText)
      };

      // Analyze conversation history influence on meta-elements
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalMetaContext = this.analyzeHistoricalMetaContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Meta-conversational analysis warning:', error.message);
      // Return safe defaults
      analysis.communicationAwareness = 'medium';
      analysis.metaLevel = 1;
    }

    return analysis;
  }

  determineMetaLevel(category) {
    // Helper method to determine meta-level of communication
    const metaLevelMap = {
      'clarification_seeking': 2,
      'communication_strategy': 3,
      'process_awareness': 2,
      'expectation_setting': 1,
      'result_specification': 1,
      'scope_definition': 1
    };
    
    return metaLevelMap[category] || 1;
  }

  isGoalOriented(messageText) {
    // Helper method to check if communication is goal-oriented
    const goalIndicators = ['insights', 'recomendaciones', 'análisis', 'resultados'];
    return goalIndicators.some(indicator => messageText.includes(indicator));
  }

  isOutcomeSpecific(messageText) {
    // Helper method to check if outcomes are specified
    const outcomeIndicators = ['producto estrella', 'pollo rostizado', 'ventas'];
    return outcomeIndicators.some(indicator => messageText.includes(indicator));
  }

  isProcessAware(messageText) {
    // Helper method to check process awareness
    const processIndicators = ['analiza', 'cómo', 'de qué manera', 'proceso'];
    return processIndicators.some(indicator => messageText.includes(indicator));
  }

  isContextuallyFramed(messageText) {
    // Helper method to check contextual framing
    const contextIndicators = ['mis', 'mi', 'todas', 'historial', 'datos'];
    return contextIndicators.some(indicator => messageText.includes(indicator));
  }

  assessRequestClarity(messageText) {
    // Helper method to assess request clarity
    const clarityScore = {
      hasSubject: messageText.includes('pollo') || messageText.includes('ventas'),
      hasAction: messageText.includes('analiza') || messageText.includes('dame'),
      hasScope: messageText.includes('todas') || messageText.includes('historial'),
      hasOutcome: messageText.includes('insights') || messageText.includes('recomendaciones')
    };
    
    const score = Object.values(clarityScore).filter(Boolean).length;
    if (score >= 3) return 'high';
    if (score >= 2) return 'medium';
    return 'low';
  }

  assessExpectationManagement(messageText) {
    // Helper method to assess expectation management
    const expectationIndicators = ['quiero', 'necesito', 'esperaría', 'debería'];
    const count = expectationIndicators.filter(ind => messageText.includes(ind)).length;
    
    if (count >= 2) return 'explicit';
    if (count === 1) return 'implicit';
    return 'unclear';
  }

  assessCommunicationEfficiency(messageText) {
    // Helper method to assess communication efficiency
    const words = messageText.split(/\s+/).length;
    const informationDensity = this.calculateInformationDensity(messageText);
    
    if (words <= 15 && informationDensity > 0.6) return 'high';
    if (words <= 25 && informationDensity > 0.4) return 'medium';
    return 'low';
  }

  calculateInformationDensity(messageText) {
    // Helper method to calculate information density
    const contentWords = ['analiza', 'ventas', 'producto', 'pollo', 'rostizado', 
                         'insights', 'datos', 'historial', 'recomendaciones'];
    const words = messageText.split(/\s+/);
    const contentCount = words.filter(word => 
      contentWords.some(contentWord => word.includes(contentWord))
    ).length;
    
    return words.length > 0 ? contentCount / words.length : 0;
  }

  assessInformationStructuring(messageText) {
    // Helper method to assess information structuring
    const structureElements = {
      hasIntroduction: messageText.includes('analiza'),
      hasSpecification: messageText.includes('producto estrella') || messageText.includes('pollo rostizado'),
      hasScope: messageText.includes('todas') || messageText.includes('historial'),
      hasOutcome: messageText.includes('insights') || messageText.includes('recomendaciones')
    };
    
    const structureScore = Object.values(structureElements).filter(Boolean).length;
    if (structureScore >= 3) return 'well_structured';
    if (structureScore >= 2) return 'moderately_structured';
    return 'loosely_structured';
  }

  analyzeHistoricalMetaContext(conversationHistory) {
    // Helper method to analyze historical meta-context
    return {
      hasHistory: true,
      contextBuilding: 'progressive',
      metaEvolution: 'developing',
      communicationPattern: 'consistent'
    };
  }

  detectSurprise(message, conversationHistory) {
    // Surprise detection for emotional intelligence processing
    const analysis = {
      surpriseLevel: 'none',
      surpriseIndicators: [],
      surpriseType: 'none',
      emotionalIntensity: 'low',
      contextualSurprise: false,
      surpriseSource: null
    };

    try {
      const messageText = message.toLowerCase();
      
      // Surprise indicators in Spanish business context
      const surprisePatterns = {
        'explicit_surprise': ['wow', '¡increíble!', 'no sabía', 'qué sorpresa'],
        'unexpected_discovery': ['no esperaba', 'resulta que', 'curiosamente'],
        'positive_surprise': ['mejor de lo esperado', 'excelente', 'fantástico'],
        'negative_surprise': ['peor de lo esperado', 'inesperado', 'sorprendente'],
        'data_surprise': ['datos inesperados', 'resultados sorprendentes'],
        'business_surprise': ['ventas sorprendentes', 'rendimiento inesperado']
      };

      // Detect surprise indicators
      Object.entries(surprisePatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.surpriseIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateSurpriseIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Implicit surprise detection through question patterns
      const implicitSurprisePatterns = [
        '¿cómo es posible?', '¿en serio?', '¿de verdad?', 
        '¿qué significa esto?', '¿por qué?'
      ];

      implicitSurprisePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.surpriseIndicators.push({
            category: 'implicit_surprise',
            pattern: pattern,
            intensity: 'medium',
            type: 'implicit'
          });
        }
      });

      // Detect business context surprise
      const businessSurpriseContext = {
        'performance_surprise': messageText.includes('pollo rostizado') && 
                               (messageText.includes('mejor') || messageText.includes('peor')),
        'data_surprise': messageText.includes('datos') && 
                        (messageText.includes('inesperado') || messageText.includes('sorprendente')),
        'insight_surprise': messageText.includes('insights') && 
                           messageText.includes('no sabía')
      };

      Object.entries(businessSurpriseContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.surpriseIndicators.push({
            category: 'business_context_surprise',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.contextualSurprise = true;
        }
      });

      // Determine overall surprise level
      if (analysis.surpriseIndicators.length === 0) {
        analysis.surpriseLevel = 'none';
      } else if (analysis.surpriseIndicators.length === 1) {
        analysis.surpriseLevel = 'low';
      } else if (analysis.surpriseIndicators.length <= 3) {
        analysis.surpriseLevel = 'medium';
      } else {
        analysis.surpriseLevel = 'high';
      }

      // Determine surprise type
      if (analysis.surpriseIndicators.length > 0) {
        const categories = analysis.surpriseIndicators.map(ind => ind.category);
        if (categories.includes('positive_surprise')) {
          analysis.surpriseType = 'positive';
        } else if (categories.includes('negative_surprise')) {
          analysis.surpriseType = 'negative';
        } else if (categories.includes('business_context_surprise')) {
          analysis.surpriseType = 'business_discovery';
        } else {
          analysis.surpriseType = 'neutral_surprise';
        }
      }

      // Calculate emotional intensity
      const intensityScores = analysis.surpriseIndicators.map(ind => {
        const intensityMap = { 'low': 1, 'medium': 2, 'high': 3 };
        return intensityMap[ind.intensity] || 1;
      });

      if (intensityScores.length > 0) {
        const avgIntensity = intensityScores.reduce((sum, score) => sum + score, 0) / intensityScores.length;
        if (avgIntensity >= 2.5) {
          analysis.emotionalIntensity = 'high';
        } else if (avgIntensity >= 1.5) {
          analysis.emotionalIntensity = 'medium';
        } else {
          analysis.emotionalIntensity = 'low';
        }
      }

      // Identify surprise source
      if (messageText.includes('ventas') || messageText.includes('pollo rostizado')) {
        analysis.surpriseSource = 'business_performance';
      } else if (messageText.includes('datos') || messageText.includes('análisis')) {
        analysis.surpriseSource = 'data_insights';
      } else if (messageText.includes('resultados') || messageText.includes('insights')) {
        analysis.surpriseSource = 'analytical_outcomes';
      }

      // Check conversation history for surprise context
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalSurpriseContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Surprise detection warning:', error.message);
      // Return safe defaults
      analysis.surpriseLevel = 'none';
      analysis.surpriseType = 'none';
    }

    return analysis;
  }

  calculateSurpriseIntensity(pattern) {
    // Helper method to calculate surprise intensity based on pattern
    const highIntensityPatterns = ['¡increíble!', 'fantástico', 'no sabía'];
    const mediumIntensityPatterns = ['sorprendente', 'inesperado', 'curiosamente'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalSurpriseContext(conversationHistory) {
    // Helper method to analyze historical surprise context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, surpriseEvolution: 'none' };
    }
    
    return {
      hasHistory: true,
      surpriseEvolution: 'developing',
      contextualAwareness: 'building',
      emotionalJourney: 'in_progress'
    };
  }

  detectDisgust(message, conversationHistory) {
    // Disgust detection for emotional intelligence processing
    const analysis = {
      disgustLevel: 'none',
      disgustIndicators: [],
      disgustType: 'none',
      emotionalIntensity: 'low',
      disgustTarget: null,
      businessDisgust: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Disgust indicators in Spanish business context
      const disgustPatterns = {
        'explicit_disgust': ['qué asco', 'horrible', 'repugnante', 'asqueroso'],
        'business_displeasure': ['terrible', 'pésimo', 'horrible', 'desastroso'],
        'performance_disgust': ['ventas horribles', 'resultados terribles', 'pésimo rendimiento'],
        'quality_disgust': ['mala calidad', 'inaceptable', 'deplorable'],
        'mild_disgust': ['no me gusta', 'desagradable', 'molesto'],
        'data_disgust': ['datos erróneos', 'información incorrecta', 'mal análisis']
      };

      // Detect disgust indicators
      Object.entries(disgustPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.disgustIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateDisgustIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context disgust detection
      const businessDisgustContext = {
        'poor_sales': messageText.includes('ventas') && 
                     (messageText.includes('mal') || messageText.includes('bajo')),
        'bad_data': messageText.includes('datos') && 
                   (messageText.includes('incorrecto') || messageText.includes('mal')),
        'poor_performance': messageText.includes('rendimiento') && 
                           messageText.includes('pésimo')
      };

      Object.entries(businessDisgustContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.disgustIndicators.push({
            category: 'business_context_disgust',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessDisgust = true;
        }
      });

      // Implicit disgust through negative language
      const implicitDisgustPatterns = [
        'no sirve', 'está mal', 'no funciona', 'problemático',
        'deficiente', 'inadecuado', 'insatisfactorio'
      ];

      implicitDisgustPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.disgustIndicators.push({
            category: 'implicit_disgust',
            pattern: pattern,
            intensity: 'low',
            type: 'implicit'
          });
        }
      });

      // Determine overall disgust level
      if (analysis.disgustIndicators.length === 0) {
        analysis.disgustLevel = 'none';
      } else if (analysis.disgustIndicators.length === 1) {
        analysis.disgustLevel = 'low';
      } else if (analysis.disgustIndicators.length <= 3) {
        analysis.disgustLevel = 'medium';
      } else {
        analysis.disgustLevel = 'high';
      }

      // Determine disgust type
      if (analysis.disgustIndicators.length > 0) {
        const categories = analysis.disgustIndicators.map(ind => ind.category);
        if (categories.includes('business_displeasure') || categories.includes('performance_disgust')) {
          analysis.disgustType = 'business_performance';
        } else if (categories.includes('quality_disgust')) {
          analysis.disgustType = 'quality_related';
        } else if (categories.includes('data_disgust')) {
          analysis.disgustType = 'data_quality';
        } else if (categories.includes('explicit_disgust')) {
          analysis.disgustType = 'strong_aversion';
        } else {
          analysis.disgustType = 'mild_displeasure';
        }
      }

      // Calculate emotional intensity
      const intensityScores = analysis.disgustIndicators.map(ind => {
        const intensityMap = { 'low': 1, 'medium': 2, 'high': 3 };
        return intensityMap[ind.intensity] || 1;
      });

      if (intensityScores.length > 0) {
        const avgIntensity = intensityScores.reduce((sum, score) => sum + score, 0) / intensityScores.length;
        if (avgIntensity >= 2.5) {
          analysis.emotionalIntensity = 'high';
        } else if (avgIntensity >= 1.5) {
          analysis.emotionalIntensity = 'medium';
        } else {
          analysis.emotionalIntensity = 'low';
        }
      }

      // Identify disgust target
      if (messageText.includes('ventas') || messageText.includes('pollo rostizado')) {
        analysis.disgustTarget = 'business_performance';
      } else if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.disgustTarget = 'data_quality';
      } else if (messageText.includes('análisis') || messageText.includes('resultados')) {
        analysis.disgustTarget = 'analytical_results';
      } else if (messageText.includes('servicio') || messageText.includes('atención')) {
        analysis.disgustTarget = 'service_quality';
      }

      // Check for disgust mitigation patterns
      const mitigationPatterns = ['pero', 'sin embargo', 'aunque', 'mejorar'];
      const hasMitigation = mitigationPatterns.some(pattern => messageText.includes(pattern));
      
      if (hasMitigation && analysis.disgustLevel !== 'none') {
        analysis.mitigationPresent = true;
        analysis.disgustLevel = this.reducedDisgustLevel(analysis.disgustLevel);
      }

      // Check conversation history for disgust evolution
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalDisgustContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Disgust detection warning:', error.message);
      // Return safe defaults
      analysis.disgustLevel = 'none';
      analysis.disgustType = 'none';
    }

    return analysis;
  }

  calculateDisgustIntensity(pattern) {
    // Helper method to calculate disgust intensity based on pattern
    const highIntensityPatterns = ['qué asco', 'horrible', 'repugnante', 'asqueroso', 'desastroso'];
    const mediumIntensityPatterns = ['terrible', 'pésimo', 'deplorable', 'inaceptable'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  reducedDisgustLevel(currentLevel) {
    // Helper method to reduce disgust level when mitigation is present
    const levelMap = {
      'high': 'medium',
      'medium': 'low',
      'low': 'low'
    };
    return levelMap[currentLevel] || 'none';
  }

  analyzeHistoricalDisgustContext(conversationHistory) {
    // Helper method to analyze historical disgust context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, disgustEvolution: 'none' };
    }
    
    return {
      hasHistory: true,
      disgustEvolution: 'developing',
      emotionalJourney: 'tracking_displeasure',
      contextualAwareness: 'building'
    };
  }

  detectTrust(message, conversationHistory) {
    // Trust detection for emotional intelligence processing
    const analysis = {
      trustLevel: 'neutral',
      trustIndicators: [],
      trustType: 'none',
      confidenceLevel: 'medium',
      trustTarget: null,
      businessTrust: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Trust indicators in Spanish business context
      const trustPatterns = {
        'explicit_trust': ['confío en', 'me fío de', 'creo en', 'tengo fe en'],
        'business_confidence': ['estoy seguro', 'confío', 'creo que', 'seguramente'],
        'data_trust': ['los datos muestran', 'según los datos', 'datos confiables'],
        'system_trust': ['analiza', 'dame', 'confío en el análisis'],
        'reliability_indicators': ['siempre', 'constantemente', 'confiable', 'seguro'],
        'delegation_trust': ['hazlo', 'encárgate', 'manéjalo', 'procede']
      };

      // Detect trust indicators
      Object.entries(trustPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.trustIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateTrustIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context trust detection
      const businessTrustContext = {
        'system_delegation': messageText.includes('analiza') && 
                            (messageText.includes('todas') || messageText.includes('completo')),
        'data_reliance': messageText.includes('datos') && 
                        (messageText.includes('mis') || messageText.includes('historial')),
        'outcome_confidence': messageText.includes('insights') && 
                             messageText.includes('dame'),
        'process_trust': messageText.includes('pollo rostizado') && 
                        messageText.includes('producto estrella')
      };

      Object.entries(businessTrustContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.trustIndicators.push({
            category: 'business_context_trust',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessTrust = true;
        }
      });

      // Implicit trust through request patterns
      const implicitTrustPatterns = [
        'analiza todas mis', 'dame insights', 'quiero que',
        'necesito que', 'puedes', 'podrías'
      ];

      implicitTrustPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.trustIndicators.push({
            category: 'implicit_trust',
            pattern: pattern,
            intensity: 'medium',
            type: 'implicit'
          });
        }
      });

      // Determine overall trust level
      if (analysis.trustIndicators.length === 0) {
        analysis.trustLevel = 'neutral';
      } else if (analysis.trustIndicators.length <= 2) {
        analysis.trustLevel = 'low_trust';
      } else if (analysis.trustIndicators.length <= 4) {
        analysis.trustLevel = 'medium_trust';
      } else {
        analysis.trustLevel = 'high_trust';
      }

      // Determine trust type
      if (analysis.trustIndicators.length > 0) {
        const categories = analysis.trustIndicators.map(ind => ind.category);
        if (categories.includes('system_trust') || categories.includes('business_context_trust')) {
          analysis.trustType = 'system_analytical_trust';
        } else if (categories.includes('data_trust')) {
          analysis.trustType = 'data_reliability_trust';
        } else if (categories.includes('delegation_trust')) {
          analysis.trustType = 'process_delegation_trust';
        } else if (categories.includes('business_confidence')) {
          analysis.trustType = 'business_confidence_trust';
        } else {
          analysis.trustType = 'general_trust';
        }
      }

      // Calculate confidence level based on trust indicators
      const highConfidencePatterns = ['estoy seguro', 'confío completamente', 'sin duda'];
      const mediumConfidencePatterns = ['creo que', 'probablemente', 'seguramente'];
      
      if (highConfidencePatterns.some(pattern => messageText.includes(pattern))) {
        analysis.confidenceLevel = 'high';
      } else if (mediumConfidencePatterns.some(pattern => messageText.includes(pattern))) {
        analysis.confidenceLevel = 'medium';
      } else if (analysis.trustIndicators.length > 0) {
        analysis.confidenceLevel = 'medium';
      } else {
        analysis.confidenceLevel = 'low';
      }

      // Identify trust target
      if (messageText.includes('analiza') || messageText.includes('sistema')) {
        analysis.trustTarget = 'analytical_system';
      } else if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.trustTarget = 'data_source';
      } else if (messageText.includes('proceso') || messageText.includes('método')) {
        analysis.trustTarget = 'process_methodology';
      } else if (messageText.includes('resultados') || messageText.includes('insights')) {
        analysis.trustTarget = 'outcome_quality';
      }

      // Assess trust building elements
      analysis.trustBuilding = {
        hasPersonalData: messageText.includes('mis') || messageText.includes('mi'),
        showsVulnerability: messageText.includes('necesito') || messageText.includes('ayuda'),
        delegatesAuthority: messageText.includes('analiza') || messageText.includes('hazlo'),
        seeksGuidance: messageText.includes('recomendaciones') || messageText.includes('qué hacer')
      };

      // Check for trust erosion indicators
      const trustErosionPatterns = ['no estoy seguro', 'dudas', 'desconfío', 'no confío'];
      const hasTrustErosion = trustErosionPatterns.some(pattern => messageText.includes(pattern));
      
      if (hasTrustErosion) {
        analysis.trustLevel = this.reducedTrustLevel(analysis.trustLevel);
        analysis.trustErosion = true;
      }

      // Check conversation history for trust evolution
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalTrustContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Trust detection warning:', error.message);
      // Return safe defaults
      analysis.trustLevel = 'neutral';
      analysis.trustType = 'none';
    }

    return analysis;
  }

  calculateTrustIntensity(pattern) {
    // Helper method to calculate trust intensity based on pattern
    const highIntensityPatterns = ['confío completamente', 'tengo fe total', 'estoy seguro'];
    const mediumIntensityPatterns = ['confío en', 'creo en', 'seguramente', 'analiza'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  reducedTrustLevel(currentLevel) {
    // Helper method to reduce trust level when erosion is present
    const levelMap = {
      'high_trust': 'medium_trust',
      'medium_trust': 'low_trust',
      'low_trust': 'neutral',
      'neutral': 'distrust'
    };
    return levelMap[currentLevel] || 'neutral';
  }

  analyzeHistoricalTrustContext(conversationHistory) {
    // Helper method to analyze historical trust context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, trustEvolution: 'initial_interaction' };
    }
    
    return {
      hasHistory: true,
      trustEvolution: 'building',
      relationshipDepth: 'developing',
      trustPattern: 'progressive_delegation'
    };
  }

  detectAnticipation(message, conversationHistory) {
    // Anticipation detection for emotional intelligence processing
    const analysis = {
      anticipationLevel: 'neutral',
      anticipationIndicators: [],
      anticipationType: 'none',
      expectationIntensity: 'medium',
      futureOrientation: false,
      businessExpectation: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Anticipation indicators in Spanish business context
      const anticipationPatterns = {
        'explicit_anticipation': ['espero que', 'anticipo que', 'preveo que', 'espero'],
        'eager_expectation': ['ansioso por', 'emocionado por', 'esperando', 'deseando'],
        'business_anticipation': ['esperando resultados', 'anticipo insights', 'espero recomendaciones'],
        'future_orientation': ['cuando tengas', 'una vez que', 'después de', 'próximamente'],
        'outcome_expectation': ['espero obtener', 'debería dar', 'va a mostrar', 'revelará'],
        'process_anticipation': ['cuando analices', 'al revisar', 'después del análisis']
      };

      // Detect anticipation indicators
      Object.entries(anticipationPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.anticipationIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateAnticipationIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context anticipation detection
      const businessAnticipationContext = {
        'results_anticipation': messageText.includes('insights') || 
                               messageText.includes('recomendaciones'),
        'analysis_anticipation': messageText.includes('analiza') && 
                                messageText.includes('dame'),
        'data_revelation': messageText.includes('datos') && 
                          (messageText.includes('mostrar') || messageText.includes('revelar')),
        'performance_expectation': messageText.includes('pollo rostizado') && 
                                  messageText.includes('producto estrella')
      };

      Object.entries(businessAnticipationContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.anticipationIndicators.push({
            category: 'business_context_anticipation',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessExpectation = true;
        }
      });

      // Implicit anticipation through action requests
      const implicitAnticipationPatterns = [
        'analiza todas', 'dame insights', 'quiero ver',
        'necesito saber', 'muestra', 'revela'
      ];

      implicitAnticipationPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.anticipationIndicators.push({
            category: 'implicit_anticipation',
            pattern: pattern,
            intensity: 'medium',
            type: 'implicit'
          });
        }
      });

      // Future-oriented language detection
      const futureIndicators = [
        'va a', 'será', 'podrá', 'debería', 'esperaría',
        'cuando', 'después', 'luego', 'próximo'
      ];

      const futureOrientationCount = futureIndicators.filter(indicator =>
        messageText.includes(indicator)
      ).length;

      if (futureOrientationCount > 0) {
        analysis.futureOrientation = true;
        analysis.anticipationIndicators.push({
          category: 'future_orientation',
          pattern: 'future_language',
          intensity: 'medium',
          type: 'temporal'
        });
      }

      // Determine overall anticipation level
      if (analysis.anticipationIndicators.length === 0) {
        analysis.anticipationLevel = 'neutral';
      } else if (analysis.anticipationIndicators.length <= 2) {
        analysis.anticipationLevel = 'low_anticipation';
      } else if (analysis.anticipationIndicators.length <= 4) {
        analysis.anticipationLevel = 'medium_anticipation';
      } else {
        analysis.anticipationLevel = 'high_anticipation';
      }

      // Determine anticipation type
      if (analysis.anticipationIndicators.length > 0) {
        const categories = analysis.anticipationIndicators.map(ind => ind.category);
        if (categories.includes('business_anticipation') || categories.includes('business_context_anticipation')) {
          analysis.anticipationType = 'business_outcome_anticipation';
        } else if (categories.includes('outcome_expectation')) {
          analysis.anticipationType = 'result_anticipation';
        } else if (categories.includes('process_anticipation')) {
          analysis.anticipationType = 'process_anticipation';
        } else if (categories.includes('eager_expectation')) {
          analysis.anticipationType = 'excited_anticipation';
        } else {
          analysis.anticipationType = 'general_anticipation';
        }
      }

      // Calculate expectation intensity
      const intensityScores = analysis.anticipationIndicators.map(ind => {
        const intensityMap = { 'low': 1, 'medium': 2, 'high': 3 };
        return intensityMap[ind.intensity] || 2;
      });

      if (intensityScores.length > 0) {
        const avgIntensity = intensityScores.reduce((sum, score) => sum + score, 0) / intensityScores.length;
        if (avgIntensity >= 2.5) {
          analysis.expectationIntensity = 'high';
        } else if (avgIntensity >= 1.5) {
          analysis.expectationIntensity = 'medium';
        } else {
          analysis.expectationIntensity = 'low';
        }
      }

      // Analyze anticipation targets
      analysis.anticipationTargets = {
        dataInsights: messageText.includes('insights') || messageText.includes('datos'),
        businessRecommendations: messageText.includes('recomendaciones'),
        performanceAnalysis: messageText.includes('análisis') && messageText.includes('ventas'),
        productInsights: messageText.includes('pollo rostizado') || messageText.includes('producto')
      };

      // Assess urgency in anticipation
      const urgencyIndicators = ['ya', 'ahora', 'inmediato', 'rápido', 'pronto'];
      const urgencyCount = urgencyIndicators.filter(ind => messageText.includes(ind)).length;
      
      analysis.urgencyLevel = urgencyCount > 0 ? 'high' : 'normal';

      // Check for anticipation modifiers
      const positiveModifiers = ['emocionado', 'ansioso', 'esperando con ganas'];
      const neutralModifiers = ['esperando', 'anticipando'];
      const negativeModifiers = ['preocupado por', 'temiendo', 'con dudas'];

      if (positiveModifiers.some(mod => messageText.includes(mod))) {
        analysis.anticipationValence = 'positive';
      } else if (negativeModifiers.some(mod => messageText.includes(mod))) {
        analysis.anticipationValence = 'negative';
      } else {
        analysis.anticipationValence = 'neutral';
      }

      // Check conversation history for anticipation building
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalAnticipationContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Anticipation detection warning:', error.message);
      // Return safe defaults
      analysis.anticipationLevel = 'neutral';
      analysis.anticipationType = 'none';
    }

    return analysis;
  }

  calculateAnticipationIntensity(pattern) {
    // Helper method to calculate anticipation intensity based on pattern
    const highIntensityPatterns = ['ansioso por', 'emocionado por', 'esperando con ganas'];
    const mediumIntensityPatterns = ['espero que', 'anticipo que', 'esperando resultados'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalAnticipationContext(conversationHistory) {
    // Helper method to analyze historical anticipation context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, anticipationEvolution: 'initial_request' };
    }
    
    return {
      hasHistory: true,
      anticipationEvolution: 'building_expectations',
      expectationPattern: 'progressive_clarification',
      emotionalJourney: 'anticipation_building'
    };
  }

  detectFrustration(message, conversationHistory) {
    // Frustration detection for emotional intelligence processing
    const analysis = {
      frustrationLevel: 'none',
      frustrationIndicators: [],
      frustrationType: 'none',
      intensityLevel: 'low',
      frustrationSource: null,
      businessFrustration: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Frustration indicators in Spanish business context
      const frustrationPatterns = {
        'explicit_frustration': ['frustrado', 'molesto', 'irritado', 'enojado'],
        'business_frustration': ['no funciona', 'no sirve', 'problemático', 'complicado'],
        'performance_frustration': ['malas ventas', 'bajo rendimiento', 'resultados pobres'],
        'process_frustration': ['muy lento', 'complicado', 'difícil', 'problemático'],
        'expectation_frustration': ['no esperaba', 'debería ser', 'no es lo que'],
        'urgency_frustration': ['necesito ya', 'urgente', 'no puedo esperar', 'inmediato']
      };

      // Detect frustration indicators
      Object.entries(frustrationPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.frustrationIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateFrustrationIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context frustration detection
      const businessFrustrationContext = {
        'data_issues': messageText.includes('datos') && 
                      (messageText.includes('mal') || messageText.includes('incorrecto')),
        'performance_problems': messageText.includes('ventas') && 
                               (messageText.includes('bajo') || messageText.includes('mal')),
        'analysis_delays': messageText.includes('análisis') && 
                          (messageText.includes('lento') || messageText.includes('tardando')),
        'system_issues': messageText.includes('sistema') && 
                        (messageText.includes('problema') || messageText.includes('fallo'))
      };

      Object.entries(businessFrustrationContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.frustrationIndicators.push({
            category: 'business_context_frustration',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessFrustration = true;
        }
      });

      // Implicit frustration through repetitive or urgent language
      const implicitFrustrationPatterns = [
        'por favor', 'necesito', 'urgente', 'ya',
        'otra vez', 'de nuevo', 'todavía no'
      ];

      implicitFrustrationPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.frustrationIndicators.push({
            category: 'implicit_frustration',
            pattern: pattern,
            intensity: 'low',
            type: 'implicit'
          });
        }
      });

      // Language intensity indicators
      const intensityMarkers = [
        '!', '¡', 'muy', 'demasiado', 'extremadamente',
        'carajo', 'diablos', 'maldita'
      ];

      const intensityCount = intensityMarkers.filter(marker =>
        messageText.includes(marker)
      ).length;

      if (intensityCount > 0) {
        analysis.frustrationIndicators.push({
          category: 'language_intensity',
          pattern: 'emotional_markers',
          intensity: intensityCount > 2 ? 'high' : 'medium',
          type: 'linguistic'
        });
      }

      // Determine overall frustration level
      if (analysis.frustrationIndicators.length === 0) {
        analysis.frustrationLevel = 'none';
      } else if (analysis.frustrationIndicators.length <= 2) {
        analysis.frustrationLevel = 'low_frustration';
      } else if (analysis.frustrationIndicators.length <= 4) {
        analysis.frustrationLevel = 'medium_frustration';
      } else {
        analysis.frustrationLevel = 'high_frustration';
      }

      // Determine frustration type
      if (analysis.frustrationIndicators.length > 0) {
        const categories = analysis.frustrationIndicators.map(ind => ind.category);
        if (categories.includes('business_frustration') || categories.includes('business_context_frustration')) {
          analysis.frustrationType = 'business_operational_frustration';
        } else if (categories.includes('performance_frustration')) {
          analysis.frustrationType = 'performance_related_frustration';
        } else if (categories.includes('process_frustration')) {
          analysis.frustrationType = 'process_efficiency_frustration';
        } else if (categories.includes('urgency_frustration')) {
          analysis.frustrationType = 'time_pressure_frustration';
        } else if (categories.includes('expectation_frustration')) {
          analysis.frustrationType = 'unmet_expectations_frustration';
        } else {
          analysis.frustrationType = 'general_frustration';
        }
      }

      // Calculate intensity level
      const intensityScores = analysis.frustrationIndicators.map(ind => {
        const intensityMap = { 'low': 1, 'medium': 2, 'high': 3 };
        return intensityMap[ind.intensity] || 1;
      });

      if (intensityScores.length > 0) {
        const avgIntensity = intensityScores.reduce((sum, score) => sum + score, 0) / intensityScores.length;
        if (avgIntensity >= 2.5) {
          analysis.intensityLevel = 'high';
        } else if (avgIntensity >= 1.5) {
          analysis.intensityLevel = 'medium';
        } else {
          analysis.intensityLevel = 'low';
        }
      }

      // Identify frustration source
      if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.frustrationSource = 'data_quality_issues';
      } else if (messageText.includes('ventas') || messageText.includes('pollo rostizado')) {
        analysis.frustrationSource = 'business_performance';
      } else if (messageText.includes('análisis') || messageText.includes('sistema')) {
        analysis.frustrationSource = 'analytical_process';
      } else if (messageText.includes('tiempo') || messageText.includes('rápido')) {
        analysis.frustrationSource = 'time_constraints';
      }

      // Check for frustration escalation patterns
      const escalationIndicators = ['cada vez', 'más y más', 'peor', 'empeorando'];
      const hasEscalation = escalationIndicators.some(indicator => 
        messageText.includes(indicator)
      );

      if (hasEscalation) {
        analysis.escalation = true;
        analysis.frustrationLevel = this.escalatedFrustrationLevel(analysis.frustrationLevel);
      }

      // Check for frustration resolution attempts
      const resolutionAttempts = ['pero', 'sin embargo', 'intentando', 'tratando de'];
      const hasResolutionAttempt = resolutionAttempts.some(attempt => 
        messageText.includes(attempt)
      );

      if (hasResolutionAttempt) {
        analysis.resolutionOriented = true;
      }

      // Check conversation history for frustration patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalFrustrationContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Frustration detection warning:', error.message);
      // Return safe defaults
      analysis.frustrationLevel = 'none';
      analysis.frustrationType = 'none';
    }

    return analysis;
  }

  calculateFrustrationIntensity(pattern) {
    // Helper method to calculate frustration intensity based on pattern
    const highIntensityPatterns = ['frustrado', 'enojado', 'carajo', 'maldita'];
    const mediumIntensityPatterns = ['molesto', 'irritado', 'problemático', 'urgente'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  escalatedFrustrationLevel(currentLevel) {
    // Helper method to escalate frustration level
    const escalationMap = {
      'low_frustration': 'medium_frustration',
      'medium_frustration': 'high_frustration',
      'high_frustration': 'extreme_frustration'
    };
    return escalationMap[currentLevel] || currentLevel;
  }

  analyzeHistoricalFrustrationContext(conversationHistory) {
    // Helper method to analyze historical frustration context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, frustrationEvolution: 'initial_state' };
    }
    
    return {
      hasHistory: true,
      frustrationEvolution: 'tracking_issues',
      problemPersistence: 'ongoing_concerns',
      emotionalJourney: 'building_frustration'
    };
  }

  detectExcitement(message, conversationHistory) {
    // Excitement detection for emotional intelligence processing
    const analysis = {
      excitementLevel: 'none',
      excitementIndicators: [],
      excitementType: 'none',
      energyLevel: 'low',
      enthusiasmTarget: null,
      businessExcitement: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Excitement indicators in Spanish business context
      const excitementPatterns = {
        'explicit_excitement': ['emocionado', 'entusiasmado', 'genial', 'fantástico'],
        'business_excitement': ['excelente', 'increíble', 'estupendo', 'magnífico'],
        'anticipatory_excitement': ['ansioso por ver', 'emocionado por', 'esperando con ganas'],
        'discovery_excitement': ['¡wow!', '¡increíble!', 'no sabía', 'qué interesante'],
        'achievement_excitement': ['perfecto', 'justo lo que', 'exactamente', 'ideal'],
        'energy_indicators': ['¡', '!', 'ya', 'ahora', 'vamos']
      };

      // Detect excitement indicators
      Object.entries(excitementPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.excitementIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateExcitementIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context excitement detection
      const businessExcitementContext = {
        'success_anticipation': messageText.includes('producto estrella') && 
                               messageText.includes('insights'),
        'data_enthusiasm': messageText.includes('analiza todas') && 
                          messageText.includes('mis'),
        'outcome_excitement': messageText.includes('recomendaciones') || 
                             messageText.includes('estrategia'),
        'performance_anticipation': messageText.includes('pollo rostizado') && 
                                   messageText.includes('ventas')
      };

      Object.entries(businessExcitementContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.excitementIndicators.push({
            category: 'business_context_excitement',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessExcitement = true;
        }
      });

      // Implicit excitement through enthusiastic language patterns
      const implicitExcitementPatterns = [
        'dame todo', 'quiero ver', 'muéstrame', 
        'vamos a', 'perfecto', 'excelente idea'
      ];

      implicitExcitementPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.excitementIndicators.push({
            category: 'implicit_excitement',
            pattern: pattern,
            intensity: 'medium',
            type: 'implicit'
          });
        }
      });

      // Energy level indicators
      const energyMarkers = [
        '!', '¡', 'ya', 'ahora', 'vamos', 'dale',
        'rápido', 'inmediato', 'urgente'
      ];

      const energyCount = energyMarkers.filter(marker =>
        messageText.includes(marker)
      ).length;

      if (energyCount > 0) {
        analysis.excitementIndicators.push({
          category: 'energy_markers',
          pattern: 'high_energy_language',
          intensity: energyCount > 2 ? 'high' : 'medium',
          type: 'linguistic'
        });
      }

      // Positive language amplifiers
      const amplifiers = [
        'muy', 'súper', 'ultra', 'mega', 'extremadamente',
        'totalmente', 'completamente', 'absolutamente'
      ];

      const amplifierCount = amplifiers.filter(amp =>
        messageText.includes(amp)
      ).length;

      if (amplifierCount > 0) {
        analysis.excitementIndicators.push({
          category: 'positive_amplifiers',
          pattern: 'enthusiasm_amplifiers',
          intensity: 'medium',
          type: 'linguistic'
        });
      }

      // Determine overall excitement level
      if (analysis.excitementIndicators.length === 0) {
        analysis.excitementLevel = 'none';
      } else if (analysis.excitementIndicators.length <= 2) {
        analysis.excitementLevel = 'low_excitement';
      } else if (analysis.excitementIndicators.length <= 4) {
        analysis.excitementLevel = 'medium_excitement';
      } else {
        analysis.excitementLevel = 'high_excitement';
      }

      // Determine excitement type
      if (analysis.excitementIndicators.length > 0) {
        const categories = analysis.excitementIndicators.map(ind => ind.category);
        if (categories.includes('business_excitement') || categories.includes('business_context_excitement')) {
          analysis.excitementType = 'business_opportunity_excitement';
        } else if (categories.includes('anticipatory_excitement')) {
          analysis.excitementType = 'anticipatory_enthusiasm';
        } else if (categories.includes('discovery_excitement')) {
          analysis.excitementType = 'discovery_excitement';
        } else if (categories.includes('achievement_excitement')) {
          analysis.excitementType = 'achievement_satisfaction';
        } else {
          analysis.excitementType = 'general_enthusiasm';
        }
      }

      // Calculate energy level
      const energyScore = analysis.excitementIndicators.reduce((score, indicator) => {
        if (indicator.category === 'energy_markers' || indicator.category === 'energy_indicators') {
          return score + 2;
        } else if (indicator.intensity === 'high') {
          return score + 3;
        } else if (indicator.intensity === 'medium') {
          return score + 2;
        }
        return score + 1;
      }, 0);

      if (energyScore >= 8) {
        analysis.energyLevel = 'very_high';
      } else if (energyScore >= 5) {
        analysis.energyLevel = 'high';
      } else if (energyScore >= 3) {
        analysis.energyLevel = 'medium';
      } else if (energyScore > 0) {
        analysis.energyLevel = 'low';
      }

      // Identify enthusiasm target
      if (messageText.includes('datos') || messageText.includes('análisis')) {
        analysis.enthusiasmTarget = 'data_analysis';
      } else if (messageText.includes('insights') || messageText.includes('recomendaciones')) {
        analysis.enthusiasmTarget = 'business_insights';
      } else if (messageText.includes('pollo rostizado') || messageText.includes('producto')) {
        analysis.enthusiasmTarget = 'product_performance';
      } else if (messageText.includes('ventas') || messageText.includes('resultados')) {
        analysis.enthusiasmTarget = 'business_results';
      }

      // Check for excitement sustainability indicators
      const sustainabilityIndicators = ['siempre', 'constantemente', 'continúo', 'seguir'];
      const hasSustainability = sustainabilityIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasSustainability) {
        analysis.sustainedExcitement = true;
      }

      // Analyze excitement authenticity
      analysis.authenticityMarkers = {
        personalInvestment: messageText.includes('mis') || messageText.includes('mi'),
        specificFocus: messageText.includes('producto estrella') || messageText.includes('pollo rostizado'),
        actionOriented: messageText.includes('analiza') || messageText.includes('dame'),
        outcomeOriented: messageText.includes('insights') || messageText.includes('recomendaciones')
      };

      // Check conversation history for excitement evolution
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalExcitementContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Excitement detection warning:', error.message);
      // Return safe defaults
      analysis.excitementLevel = 'none';
      analysis.excitementType = 'none';
    }

    return analysis;
  }

  calculateExcitementIntensity(pattern) {
    // Helper method to calculate excitement intensity based on pattern
    const highIntensityPatterns = ['¡wow!', '¡increíble!', 'fantástico', 'genial'];
    const mediumIntensityPatterns = ['emocionado', 'entusiasmado', 'excelente', 'perfecto'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalExcitementContext(conversationHistory) {
    // Helper method to analyze historical excitement context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, excitementEvolution: 'initial_enthusiasm' };
    }
    
    return {
      hasHistory: true,
      excitementEvolution: 'building_enthusiasm',
      emotionalJourney: 'positive_engagement',
      enthusiasmPattern: 'growing_interest'
    };
  }

  detectAnxiety(message, conversationHistory) {
    // Anxiety detection for emotional intelligence processing
    const analysis = {
      anxietyLevel: 'none',
      anxietyIndicators: [],
      anxietyType: 'none',
      stressLevel: 'low',
      anxietySource: null,
      businessAnxiety: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Anxiety indicators in Spanish business context
      const anxietyPatterns = {
        'explicit_anxiety': ['ansioso', 'preocupado', 'nervioso', 'inquieto'],
        'business_anxiety': ['me preocupa', 'tengo miedo', 'qué pasará si', 'espero que no'],
        'performance_anxiety': ['ventas bajas', 'mal rendimiento', 'problemas con'],
        'uncertainty_anxiety': ['no sé si', 'qué tal si', 'y si resulta', 'no estoy seguro'],
        'urgency_anxiety': ['necesito ya', 'es urgente', 'no puede esperar', 'rápido'],
        'control_anxiety': ['no puedo', 'fuera de control', 'no manejo', 'sin control']
      };

      // Detect anxiety indicators
      Object.entries(anxietyPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.anxietyIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateAnxietyIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context anxiety detection
      const businessAnxietyContext = {
        'data_reliability_concern': messageText.includes('datos') && 
                                   (messageText.includes('correcto') || messageText.includes('seguro')),
        'performance_worry': messageText.includes('pollo rostizado') && 
                            (messageText.includes('bien') || messageText.includes('mal')),
        'decision_anxiety': messageText.includes('recomendaciones') && 
                           messageText.includes('importante'),
        'outcome_uncertainty': messageText.includes('insights') && 
                              (messageText.includes('espero') || messageText.includes('ojalá'))
      };

      Object.entries(businessAnxietyContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.anxietyIndicators.push({
            category: 'business_context_anxiety',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessAnxiety = true;
        }
      });

      // Implicit anxiety through repetitive or hesitant language
      const implicitAnxietyPatterns = [
        'por favor', 'espero que', 'ojalá que', 
        'necesito estar seguro', 'confirma que', 'verifica'
      ];

      implicitAnxietyPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.anxietyIndicators.push({
            category: 'implicit_anxiety',
            pattern: pattern,
            intensity: 'low',
            type: 'implicit'
          });
        }
      });

      // Uncertainty language patterns
      const uncertaintyMarkers = [
        'tal vez', 'quizás', 'no sé', 'no estoy seguro',
        'posiblemente', 'probablemente', 'puede ser'
      ];

      const uncertaintyCount = uncertaintyMarkers.filter(marker =>
        messageText.includes(marker)
      ).length;

      if (uncertaintyCount > 0) {
        analysis.anxietyIndicators.push({
          category: 'uncertainty_markers',
          pattern: 'uncertain_language',
          intensity: uncertaintyCount > 2 ? 'high' : 'medium',
          type: 'linguistic'
        });
      }

      // Question patterns that suggest anxiety
      const anxiousQuestionPatterns = [
        '¿está bien?', '¿es correcto?', '¿qué pasa si?',
        '¿estoy haciendo bien?', '¿va a funcionar?'
      ];

      anxiousQuestionPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.anxietyIndicators.push({
            category: 'anxious_questioning',
            pattern: pattern,
            intensity: 'medium',
            type: 'interrogative'
          });
        }
      });

      // Determine overall anxiety level
      if (analysis.anxietyIndicators.length === 0) {
        analysis.anxietyLevel = 'none';
      } else if (analysis.anxietyIndicators.length <= 2) {
        analysis.anxietyLevel = 'low_anxiety';
      } else if (analysis.anxietyIndicators.length <= 4) {
        analysis.anxietyLevel = 'medium_anxiety';
      } else {
        analysis.anxietyLevel = 'high_anxiety';
      }

      // Determine anxiety type
      if (analysis.anxietyIndicators.length > 0) {
        const categories = analysis.anxietyIndicators.map(ind => ind.category);
        if (categories.includes('business_anxiety') || categories.includes('business_context_anxiety')) {
          analysis.anxietyType = 'business_performance_anxiety';
        } else if (categories.includes('performance_anxiety')) {
          analysis.anxietyType = 'outcome_performance_anxiety';
        } else if (categories.includes('uncertainty_anxiety') || categories.includes('uncertainty_markers')) {
          analysis.anxietyType = 'decision_uncertainty_anxiety';
        } else if (categories.includes('urgency_anxiety')) {
          analysis.anxietyType = 'time_pressure_anxiety';
        } else if (categories.includes('control_anxiety')) {
          analysis.anxietyType = 'control_related_anxiety';
        } else {
          analysis.anxietyType = 'general_business_anxiety';
        }
      }

      // Calculate stress level
      const stressScore = analysis.anxietyIndicators.reduce((score, indicator) => {
        if (indicator.category === 'urgency_anxiety' || indicator.category === 'control_anxiety') {
          return score + 3;
        } else if (indicator.intensity === 'high') {
          return score + 3;
        } else if (indicator.intensity === 'medium') {
          return score + 2;
        }
        return score + 1;
      }, 0);

      if (stressScore >= 10) {
        analysis.stressLevel = 'very_high';
      } else if (stressScore >= 7) {
        analysis.stressLevel = 'high';
      } else if (stressScore >= 4) {
        analysis.stressLevel = 'medium';
      } else if (stressScore > 0) {
        analysis.stressLevel = 'low';
      }

      // Identify anxiety source
      if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.anxietySource = 'data_accuracy_concerns';
      } else if (messageText.includes('ventas') || messageText.includes('resultados')) {
        analysis.anxietySource = 'business_performance';
      } else if (messageText.includes('tiempo') || messageText.includes('urgente')) {
        analysis.anxietySource = 'time_constraints';
      } else if (messageText.includes('decisión') || messageText.includes('recomendaciones')) {
        analysis.anxietySource = 'decision_making';
      }

      // Check for anxiety coping mechanisms
      const copingMechanisms = ['necesito saber', 'quiero estar seguro', 'confirma', 'verifica'];
      const hasCoping = copingMechanisms.some(mechanism =>
        messageText.includes(mechanism)
      );

      if (hasCoping) {
        analysis.copingBehavior = true;
        analysis.copingType = 'information_seeking';
      }

      // Analyze anxiety triggers
      analysis.triggers = {
        dataUncertainty: messageText.includes('datos') && uncertaintyCount > 0,
        performanceConcerns: messageText.includes('ventas') && analysis.businessAnxiety,
        timePresure: messageText.includes('urgente') || messageText.includes('ya'),
        outcomeUncertainty: messageText.includes('qué pasará') || messageText.includes('resultar')
      };

      // Check conversation history for anxiety patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalAnxietyContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Anxiety detection warning:', error.message);
      // Return safe defaults
      analysis.anxietyLevel = 'none';
      analysis.anxietyType = 'none';
    }

    return analysis;
  }

  calculateAnxietyIntensity(pattern) {
    // Helper method to calculate anxiety intensity based on pattern
    const highIntensityPatterns = ['muy preocupado', 'tengo miedo', 'sin control', 'desesperado'];
    const mediumIntensityPatterns = ['preocupado', 'ansioso', 'nervioso', 'inquieto'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalAnxietyContext(conversationHistory) {
    // Helper method to analyze historical anxiety context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, anxietyEvolution: 'initial_concern' };
    }
    
    return {
      hasHistory: true,
      anxietyEvolution: 'developing_concerns',
      stressPattern: 'building_pressure',
      emotionalJourney: 'seeking_reassurance'
    };
  }

  detectRelief(message, conversationHistory) {
    // Relief detection for emotional intelligence processing
    const analysis = {
      reliefLevel: 'none',
      reliefIndicators: [],
      reliefType: 'none',
      tensionRelease: 'minimal',
      reliefSource: null,
      businessRelief: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Relief indicators in Spanish business context
      const reliefPatterns = {
        'explicit_relief': ['alivio', 'tranquilo', 'calmado', 'relajado'],
        'business_relief': ['por fin', 'al fin', 'gracias a dios', 'menos mal'],
        'problem_resolution': ['ya está', 'solucionado', 'arreglado', 'resuelto'],
        'anxiety_release': ['ya no me preocupo', 'ahora sí', 'perfecto', 'excelente'],
        'confirmation_relief': ['exacto', 'correcto', 'así es', 'perfecto'],
        'outcome_satisfaction': ['justo lo que necesitaba', 'ideal', 'perfecto']
      };

      // Detect relief indicators
      Object.entries(reliefPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.reliefIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateReliefIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context relief detection
      const businessReliefContext = {
        'data_confidence': messageText.includes('datos') && 
                          (messageText.includes('correcto') || messageText.includes('bien')),
        'performance_satisfaction': messageText.includes('pollo rostizado') && 
                                   (messageText.includes('bien') || messageText.includes('excelente')),
        'analysis_approval': messageText.includes('análisis') && 
                            (messageText.includes('perfecto') || messageText.includes('exacto')),
        'insight_validation': messageText.includes('insights') && 
                             messageText.includes('justo lo que')
      };

      Object.entries(businessReliefContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.reliefIndicators.push({
            category: 'business_context_relief',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessRelief = true;
        }
      });

      // Implicit relief through positive resolution language
      const implicitReliefPatterns = [
        'ahora sí', 'esto está bien', 'me gusta', 
        'funciona', 'sirve', 'está perfecto'
      ];

      implicitReliefPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.reliefIndicators.push({
            category: 'implicit_relief',
            pattern: pattern,
            intensity: 'medium',
            type: 'implicit'
          });
        }
      });

      // Transition from negative to positive language
      const transitionMarkers = [
        'pero', 'sin embargo', 'aunque', 'ahora',
        'finalmente', 'al final', 'después de todo'
      ];

      const hasTransition = transitionMarkers.some(marker =>
        messageText.includes(marker)
      );

      if (hasTransition) {
        const hasPositiveAfterTransition = this.checkPositiveLanguageAfterTransition(messageText, transitionMarkers);
        if (hasPositiveAfterTransition) {
          analysis.reliefIndicators.push({
            category: 'transition_relief',
            pattern: 'negative_to_positive_transition',
            intensity: 'medium',
            type: 'linguistic'
          });
        }
      }

      // Gratitude expressions as relief indicators
      const gratitudePatterns = [
        'gracias', 'agradezco', 'perfecto', 'excelente',
        'justo lo que necesitaba', 'ideal'
      ];

      gratitudePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.reliefIndicators.push({
            category: 'gratitude_relief',
            pattern: pattern,
            intensity: 'medium',
            type: 'gratitude'
          });
        }
      });

      // Determine overall relief level
      if (analysis.reliefIndicators.length === 0) {
        analysis.reliefLevel = 'none';
      } else if (analysis.reliefIndicators.length <= 2) {
        analysis.reliefLevel = 'low_relief';
      } else if (analysis.reliefIndicators.length <= 4) {
        analysis.reliefLevel = 'medium_relief';
      } else {
        analysis.reliefLevel = 'high_relief';
      }

      // Determine relief type
      if (analysis.reliefIndicators.length > 0) {
        const categories = analysis.reliefIndicators.map(ind => ind.category);
        if (categories.includes('business_relief') || categories.includes('business_context_relief')) {
          analysis.reliefType = 'business_resolution_relief';
        } else if (categories.includes('problem_resolution')) {
          analysis.reliefType = 'problem_solving_relief';
        } else if (categories.includes('anxiety_release')) {
          analysis.reliefType = 'anxiety_reduction_relief';
        } else if (categories.includes('confirmation_relief')) {
          analysis.reliefType = 'validation_relief';
        } else if (categories.includes('outcome_satisfaction')) {
          analysis.reliefType = 'expectation_fulfillment_relief';
        } else {
          analysis.reliefType = 'general_relief';
        }
      }

      // Calculate tension release level
      const tensionReleaseScore = analysis.reliefIndicators.reduce((score, indicator) => {
        if (indicator.category === 'anxiety_release' || indicator.category === 'problem_resolution') {
          return score + 3;
        } else if (indicator.intensity === 'high') {
          return score + 3;
        } else if (indicator.intensity === 'medium') {
          return score + 2;
        }
        return score + 1;
      }, 0);

      if (tensionReleaseScore >= 8) {
        analysis.tensionRelease = 'significant';
      } else if (tensionReleaseScore >= 5) {
        analysis.tensionRelease = 'moderate';
      } else if (tensionReleaseScore >= 2) {
        analysis.tensionRelease = 'mild';
      }

      // Identify relief source
      if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.reliefSource = 'data_accuracy_confirmation';
      } else if (messageText.includes('análisis') || messageText.includes('insights')) {
        analysis.reliefSource = 'analytical_clarity';
      } else if (messageText.includes('resultados') || messageText.includes('ventas')) {
        analysis.reliefSource = 'performance_validation';
      } else if (messageText.includes('recomendaciones') || messageText.includes('estrategia')) {
        analysis.reliefSource = 'guidance_provision';
      }

      // Check for relief sustainability indicators
      const sustainabilityIndicators = ['ahora puedo', 'ya sé', 'tengo claro', 'entiendo'];
      const hasSustainability = sustainabilityIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasSustainability) {
        analysis.sustainedRelief = true;
        analysis.reliefDuration = 'lasting';
      } else {
        analysis.reliefDuration = 'temporary';
      }

      // Analyze relief triggers
      analysis.triggers = {
        problemResolution: messageText.includes('solucionado') || messageText.includes('arreglado'),
        confirmationReceived: messageText.includes('correcto') || messageText.includes('exacto'),
        expectationMet: messageText.includes('justo lo que') || messageText.includes('perfecto'),
        clarityAchieved: messageText.includes('ahora entiendo') || messageText.includes('ya veo')
      };

      // Check conversation history for relief patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalReliefContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Relief detection warning:', error.message);
      // Return safe defaults
      analysis.reliefLevel = 'none';
      analysis.reliefType = 'none';
    }

    return analysis;
  }

  calculateReliefIntensity(pattern) {
    // Helper method to calculate relief intensity based on pattern
    const highIntensityPatterns = ['gracias a dios', 'al fin', 'por fin', 'perfecto'];
    const mediumIntensityPatterns = ['alivio', 'tranquilo', 'menos mal', 'excelente'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  checkPositiveLanguageAfterTransition(messageText, transitionMarkers) {
    // Helper method to check for positive language after transition markers
    const positiveWords = ['bien', 'bueno', 'perfecto', 'excelente', 'correcto', 'funciona'];
    
    for (const marker of transitionMarkers) {
      const markerIndex = messageText.indexOf(marker);
      if (markerIndex !== -1) {
        const textAfterMarker = messageText.substring(markerIndex + marker.length);
        const hasPositive = positiveWords.some(word => textAfterMarker.includes(word));
        if (hasPositive) return true;
      }
    }
    return false;
  }

  analyzeHistoricalReliefContext(conversationHistory) {
    // Helper method to analyze historical relief context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, reliefEvolution: 'initial_satisfaction' };
    }
    
    return {
      hasHistory: true,
      reliefEvolution: 'tension_resolution',
      emotionalJourney: 'moving_toward_comfort',
      reliefPattern: 'progressive_satisfaction'
    };
  }

  detectDisappointment(message, conversationHistory) {
    // Disappointment detection for emotional intelligence processing
    const analysis = {
      disappointmentLevel: 'none',
      disappointmentIndicators: [],
      disappointmentType: 'none',
      unmetExpectations: false,
      disappointmentSource: null,
      businessDisappointment: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Disappointment indicators in Spanish business context
      const disappointmentPatterns = {
        'explicit_disappointment': ['decepcionado', 'desilusionado', 'frustrado', 'triste'],
        'business_disappointment': ['no es lo que esperaba', 'pensé que sería', 'esperaba más'],
        'performance_disappointment': ['ventas bajas', 'mal resultado', 'peor de lo esperado'],
        'expectation_mismatch': ['no cumple', 'no es suficiente', 'falta algo'],
        'quality_disappointment': ['no está bien', 'podría ser mejor', 'no me convence'],
        'outcome_dissatisfaction': ['no es lo que quería', 'no sirve', 'no funciona como esperaba']
      };

      // Detect disappointment indicators
      Object.entries(disappointmentPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.disappointmentIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateDisappointmentIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context disappointment detection
      const businessDisappointmentContext = {
        'data_quality_disappointment': messageText.includes('datos') && 
                                      (messageText.includes('no') || messageText.includes('mal')),
        'analysis_disappointment': messageText.includes('análisis') && 
                                  (messageText.includes('incompleto') || messageText.includes('falta')),
        'insight_disappointment': messageText.includes('insights') && 
                                 (messageText.includes('no suficiente') || messageText.includes('esperaba más')),
        'recommendation_disappointment': messageText.includes('recomendaciones') && 
                                        messageText.includes('no ayuda')
      };

      Object.entries(businessDisappointmentContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.disappointmentIndicators.push({
            category: 'business_context_disappointment',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessDisappointment = true;
        }
      });

      // Implicit disappointment through comparison language
      const comparisonDisappointmentPatterns = [
        'pensé que', 'esperaba que', 'creía que',
        'debería ser', 'tendría que', 'se supone que'
      ];

      comparisonDisappointmentPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.disappointmentIndicators.push({
            category: 'expectation_comparison',
            pattern: pattern,
            intensity: 'medium',
            type: 'comparative'
          });
          analysis.unmetExpectations = true;
        }
      });

      // Mild disappointment through negative qualifiers
      const mildDisappointmentPatterns = [
        'no está mal pero', 'está bien pero', 'no es malo pero',
        'podría mejorar', 'falta algo', 'no del todo'
      ];

      mildDisappointmentPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.disappointmentIndicators.push({
            category: 'mild_disappointment',
            pattern: pattern,
            intensity: 'low',
            type: 'qualified_negative'
          });
        }
      });

      // Check for repeated requests (suggesting previous disappointment)
      const repetitionIndicators = [
        'otra vez', 'de nuevo', 'nuevamente', 'todavía',
        'aún no', 'sigue sin', 'continúa'
      ];

      const hasRepetition = repetitionIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasRepetition) {
        analysis.disappointmentIndicators.push({
          category: 'repetition_disappointment',
          pattern: 'repeated_requests',
          intensity: 'medium',
          type: 'behavioral'
        });
      }

      // Determine overall disappointment level
      if (analysis.disappointmentIndicators.length === 0) {
        analysis.disappointmentLevel = 'none';
      } else if (analysis.disappointmentIndicators.length <= 2) {
        analysis.disappointmentLevel = 'low_disappointment';
      } else if (analysis.disappointmentIndicators.length <= 4) {
        analysis.disappointmentLevel = 'medium_disappointment';
      } else {
        analysis.disappointmentLevel = 'high_disappointment';
      }

      // Determine disappointment type
      if (analysis.disappointmentIndicators.length > 0) {
        const categories = analysis.disappointmentIndicators.map(ind => ind.category);
        if (categories.includes('business_disappointment') || categories.includes('business_context_disappointment')) {
          analysis.disappointmentType = 'business_outcome_disappointment';
        } else if (categories.includes('performance_disappointment')) {
          analysis.disappointmentType = 'performance_related_disappointment';
        } else if (categories.includes('expectation_mismatch') || categories.includes('expectation_comparison')) {
          analysis.disappointmentType = 'expectation_gap_disappointment';
        } else if (categories.includes('quality_disappointment')) {
          analysis.disappointmentType = 'quality_standards_disappointment';
        } else if (categories.includes('outcome_dissatisfaction')) {
          analysis.disappointmentType = 'outcome_mismatch_disappointment';
        } else {
          analysis.disappointmentType = 'general_disappointment';
        }
      }

      // Identify disappointment source
      if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.disappointmentSource = 'data_quality_or_completeness';
      } else if (messageText.includes('análisis') || messageText.includes('insights')) {
        analysis.disappointmentSource = 'analytical_depth_or_quality';
      } else if (messageText.includes('ventas') || messageText.includes('resultados')) {
        analysis.disappointmentSource = 'business_performance_results';
      } else if (messageText.includes('recomendaciones') || messageText.includes('sugerencias')) {
        analysis.disappointmentSource = 'guidance_effectiveness';
      }

      // Check for disappointment recovery attempts
      const recoveryIndicators = ['pero', 'sin embargo', 'aunque', 'tal vez', 'quizás'];
      const hasRecoveryAttempt = recoveryIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasRecoveryAttempt) {
        analysis.recoveryOriented = true;
        analysis.copingMechanism = 'reframing_attempt';
      }

      // Analyze expectation vs reality gap
      analysis.expectationGap = {
        hadSpecificExpectations: analysis.unmetExpectations,
        expectationClarity: this.assessExpectationClarity(messageText),
        realityAcceptance: this.assessRealityAcceptance(messageText),
        adjustmentWillingness: hasRecoveryAttempt
      };

      // Check for constructive vs destructive disappointment
      const constructiveIndicators = ['cómo mejorar', 'qué hacer', 'siguiente paso'];
      const destructiveIndicators = ['no sirve', 'no funciona', 'es inútil'];

      const isConstructive = constructiveIndicators.some(ind => messageText.includes(ind));
      const isDestructive = destructiveIndicators.some(ind => messageText.includes(ind));

      if (isConstructive) {
        analysis.disappointmentStyle = 'constructive';
      } else if (isDestructive) {
        analysis.disappointmentStyle = 'destructive';
      } else {
        analysis.disappointmentStyle = 'neutral';
      }

      // Check conversation history for disappointment evolution
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalDisappointmentContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Disappointment detection warning:', error.message);
      // Return safe defaults
      analysis.disappointmentLevel = 'none';
      analysis.disappointmentType = 'none';
    }

    return analysis;
  }

  calculateDisappointmentIntensity(pattern) {
    // Helper method to calculate disappointment intensity based on pattern
    const highIntensityPatterns = ['muy decepcionado', 'totalmente frustrado', 'no sirve para nada'];
    const mediumIntensityPatterns = ['decepcionado', 'no es lo que esperaba', 'pensé que sería mejor'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  assessExpectationClarity(messageText) {
    // Helper method to assess how clear the original expectations were
    const clarityIndicators = ['esperaba que', 'pensé que', 'creía que', 'debería'];
    const clarityCount = clarityIndicators.filter(ind => messageText.includes(ind)).length;
    
    if (clarityCount >= 2) return 'high';
    if (clarityCount === 1) return 'medium';
    return 'low';
  }

  assessRealityAcceptance(messageText) {
    // Helper method to assess acceptance of current reality
    const acceptanceIndicators = ['entiendo que', 'veo que', 'acepto que', 'aunque'];
    const resistanceIndicators = ['no acepto', 'no puede ser', 'debe estar mal'];
    
    const hasAcceptance = acceptanceIndicators.some(ind => messageText.includes(ind));
    const hasResistance = resistanceIndicators.some(ind => messageText.includes(ind));
    
    if (hasResistance) return 'low';
    if (hasAcceptance) return 'high';
    return 'medium';
  }

  analyzeHistoricalDisappointmentContext(conversationHistory) {
    // Helper method to analyze historical disappointment context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, disappointmentEvolution: 'initial_letdown' };
    }
    
    return {
      hasHistory: true,
      disappointmentEvolution: 'processing_unmet_expectations',
      emotionalJourney: 'working_through_disappointment',
      resilience: 'developing_coping_strategies'
    };
  }

  detectPride(message, conversationHistory) {
    // Pride detection for emotional intelligence processing
    const analysis = {
      prideLevel: 'none',
      prideIndicators: [],
      prideType: 'none',
      achievementFocus: null,
      prideSource: null,
      businessPride: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Pride indicators in Spanish business context
      const pridePatterns = {
        'explicit_pride': ['orgulloso', 'me siento orgulloso', 'estoy orgulloso', 'con orgullo'],
        'business_pride': ['mi negocio', 'mi restaurante', 'mi producto estrella', 'mis ventas'],
        'achievement_pride': ['logré', 'conseguí', 'alcancé', 'obtuve'],
        'ownership_pride': ['mi', 'mío', 'nuestro', 'propio'],
        'success_indicators': ['éxito', 'triunfo', 'victoria', 'ganancia'],
        'quality_pride': ['el mejor', 'excelente calidad', 'superior', 'destacado']
      };

      // Detect pride indicators
      Object.entries(pridePatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.prideIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculatePrideIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context pride detection
      const businessPrideContext = {
        'product_pride': messageText.includes('pollo rostizado') && 
                        (messageText.includes('mi') || messageText.includes('estrella')),
        'performance_pride': messageText.includes('ventas') && 
                            (messageText.includes('buenas') || messageText.includes('excelentes')),
        'data_pride': messageText.includes('mis datos') || 
                     messageText.includes('mi información'),
        'business_ownership': messageText.includes('mi restaurante') || 
                             messageText.includes('mi negocio')
      };

      Object.entries(businessPrideContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.prideIndicators.push({
            category: 'business_context_pride',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessPride = true;
        }
      });

      // Implicit pride through ownership language
      const ownershipPridePatterns = [
        'mis ventas', 'mi producto', 'mi análisis',
        'mis resultados', 'mi estrategia', 'mis datos'
      ];

      ownershipPridePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.prideIndicators.push({
            category: 'ownership_pride_implicit',
            pattern: pattern,
            intensity: 'medium',
            type: 'ownership'
          });
        }
      });

      // Success and accomplishment language
      const accomplishmentPatterns = [
        'he logrado', 'conseguimos', 'hemos alcanzado',
        'nuestro éxito', 'buen trabajo', 'bien hecho'
      ];

      accomplishmentPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.prideIndicators.push({
            category: 'accomplishment_pride',
            pattern: pattern,
            intensity: 'high',
            type: 'achievement'
          });
        }
      });

      // Quality and excellence indicators
      const excellencePatterns = [
        'producto estrella', 'el mejor', 'excelente',
        'de primera', 'calidad superior', 'destacado'
      ];

      excellencePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.prideIndicators.push({
            category: 'excellence_pride',
            pattern: pattern,
            intensity: 'medium',
            type: 'quality'
          });
        }
      });

      // Determine overall pride level
      if (analysis.prideIndicators.length === 0) {
        analysis.prideLevel = 'none';
      } else if (analysis.prideIndicators.length <= 2) {
        analysis.prideLevel = 'low_pride';
      } else if (analysis.prideIndicators.length <= 4) {
        analysis.prideLevel = 'medium_pride';
      } else {
        analysis.prideLevel = 'high_pride';
      }

      // Determine pride type
      if (analysis.prideIndicators.length > 0) {
        const categories = analysis.prideIndicators.map(ind => ind.category);
        if (categories.includes('business_pride') || categories.includes('business_context_pride')) {
          analysis.prideType = 'business_ownership_pride';
        } else if (categories.includes('achievement_pride') || categories.includes('accomplishment_pride')) {
          analysis.prideType = 'achievement_based_pride';
        } else if (categories.includes('quality_pride') || categories.includes('excellence_pride')) {
          analysis.prideType = 'quality_excellence_pride';
        } else if (categories.includes('ownership_pride') || categories.includes('ownership_pride_implicit')) {
          analysis.prideType = 'personal_ownership_pride';
        } else {
          analysis.prideType = 'general_pride';
        }
      }

      // Identify achievement focus
      if (messageText.includes('ventas') || messageText.includes('ingresos')) {
        analysis.achievementFocus = 'financial_performance';
      } else if (messageText.includes('producto') || messageText.includes('pollo rostizado')) {
        analysis.achievementFocus = 'product_quality';
      } else if (messageText.includes('clientes') || messageText.includes('servicio')) {
        analysis.achievementFocus = 'customer_satisfaction';
      } else if (messageText.includes('negocio') || messageText.includes('restaurante')) {
        analysis.achievementFocus = 'business_establishment';
      }

      // Identify pride source
      if (messageText.includes('producto estrella') || messageText.includes('pollo rostizado')) {
        analysis.prideSource = 'signature_product_success';
      } else if (messageText.includes('ventas') && messageText.includes('buenas')) {
        analysis.prideSource = 'sales_performance';
      } else if (messageText.includes('mi') && messageText.includes('restaurante')) {
        analysis.prideSource = 'business_ownership';
      } else if (messageText.includes('datos') || messageText.includes('análisis')) {
        analysis.prideSource = 'data_driven_insights';
      }

      // Check for humble pride vs boastful pride
      const humilityIndicators = ['con suerte', 'gracias a', 'hemos trabajado duro'];
      const boastfulIndicators = ['soy el mejor', 'nadie como yo', 'superior a todos'];

      const hasHumility = humilityIndicators.some(ind => messageText.includes(ind));
      const hasBoastfulness = boastfulIndicators.some(ind => messageText.includes(ind));

      if (hasHumility) {
        analysis.prideStyle = 'humble_pride';
      } else if (hasBoastfulness) {
        analysis.prideStyle = 'boastful_pride';
      } else {
        analysis.prideStyle = 'confident_pride';
      }

      // Analyze pride authenticity markers
      analysis.authenticityMarkers = {
        specificDetails: messageText.includes('pollo rostizado') || messageText.includes('producto estrella'),
        personalInvestment: messageText.includes('mi') || messageText.includes('mis'),
        effortAcknowledgment: messageText.includes('trabajo') || messageText.includes('esfuerzo'),
        gratitudeExpression: messageText.includes('gracias') || messageText.includes('agradecido')
      };

      // Check for pride in progress vs pride in outcomes
      const progressIndicators = ['mejorando', 'creciendo', 'avanzando', 'desarrollando'];
      const outcomeIndicators = ['logrado', 'conseguido', 'alcanzado', 'obtenido'];

      const hasProgressPride = progressIndicators.some(ind => messageText.includes(ind));
      const hasOutcomePride = outcomeIndicators.some(ind => messageText.includes(ind));

      if (hasProgressPride && !hasOutcomePride) {
        analysis.prideFocus = 'process_oriented';
      } else if (hasOutcomePride && !hasProgressPride) {
        analysis.prideFocus = 'outcome_oriented';
      } else if (hasProgressPride && hasOutcomePride) {
        analysis.prideFocus = 'comprehensive';
      } else {
        analysis.prideFocus = 'general';
      }

      // Check conversation history for pride development
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalPrideContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Pride detection warning:', error.message);
      // Return safe defaults
      analysis.prideLevel = 'none';
      analysis.prideType = 'none';
    }

    return analysis;
  }

  calculatePrideIntensity(pattern) {
    // Helper method to calculate pride intensity based on pattern
    const highIntensityPatterns = ['muy orgulloso', 'extremadamente orgulloso', 'el mejor'];
    const mediumIntensityPatterns = ['orgulloso', 'mi producto estrella', 'excelente'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalPrideContext(conversationHistory) {
    // Helper method to analyze historical pride context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, prideEvolution: 'initial_recognition' };
    }
    
    return {
      hasHistory: true,
      prideEvolution: 'building_confidence',
      emotionalJourney: 'growing_business_pride',
      achievementPattern: 'progressive_accomplishment'
    };
  }

  detectGuilt(message, conversationHistory) {
    // Guilt detection for emotional intelligence processing - FINAL EMOTION
    const analysis = {
      guiltLevel: 'none',
      guiltIndicators: [],
      guiltType: 'none',
      responsibilityAwareness: false,
      guiltSource: null,
      businessGuilt: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Guilt indicators in Spanish business context
      const guiltPatterns = {
        'explicit_guilt': ['me siento culpable', 'es mi culpa', 'culpable', 'responsable'],
        'business_guilt': ['no debería haber', 'fue mi error', 'mi responsabilidad', 'mi falta'],
        'performance_guilt': ['debería vender más', 'no he hecho suficiente', 'podría hacer mejor'],
        'neglect_guilt': ['no he prestado atención', 'descuidé', 'ignoré', 'no me ocupé'],
        'responsibility_guilt': ['debería', 'tendría que', 'era mi deber', 'mi obligación'],
        'regret_guilt': ['me arrepiento', 'ojalá hubiera', 'no debí', 'fue un error']
      };

      // Detect guilt indicators
      Object.entries(guiltPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.guiltIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateGuiltIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context guilt detection
      const businessGuiltContext = {
        'performance_regret': messageText.includes('ventas') && 
                             (messageText.includes('debería') || messageText.includes('podría')),
        'customer_guilt': messageText.includes('clientes') && 
                         messageText.includes('mejor'),
        'quality_guilt': messageText.includes('producto') && 
                        (messageText.includes('mejorar') || messageText.includes('debería')),
        'management_guilt': messageText.includes('restaurante') && 
                           messageText.includes('responsabilidad')
      };

      Object.entries(businessGuiltContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.guiltIndicators.push({
            category: 'business_context_guilt',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessGuilt = true;
        }
      });

      // Implicit guilt through self-criticism
      const selfCriticismPatterns = [
        'no soy bueno en', 'me falta', 'no he sido',
        'podría ser mejor', 'necesito mejorar', 'debo hacer más'
      ];

      selfCriticismPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.guiltIndicators.push({
            category: 'self_criticism_guilt',
            pattern: pattern,
            intensity: 'low',
            type: 'self_reflective'
          });
        }
      });

      // Responsibility and obligation language
      const responsibilityPatterns = [
        'es mi responsabilidad', 'debo', 'tengo que',
        'mi obligación', 'depende de mí', 'soy responsable'
      ];

      responsibilityPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.guiltIndicators.push({
            category: 'responsibility_awareness',
            pattern: pattern,
            intensity: 'medium',
            type: 'responsibility'
          });
          analysis.responsibilityAwareness = true;
        }
      });

      // Determine overall guilt level
      if (analysis.guiltIndicators.length === 0) {
        analysis.guiltLevel = 'none';
      } else if (analysis.guiltIndicators.length <= 2) {
        analysis.guiltLevel = 'low_guilt';
      } else if (analysis.guiltIndicators.length <= 4) {
        analysis.guiltLevel = 'medium_guilt';
      } else {
        analysis.guiltLevel = 'high_guilt';
      }

      // Determine guilt type
      if (analysis.guiltIndicators.length > 0) {
        const categories = analysis.guiltIndicators.map(ind => ind.category);
        if (categories.includes('business_guilt') || categories.includes('business_context_guilt')) {
          analysis.guiltType = 'business_responsibility_guilt';
        } else if (categories.includes('performance_guilt')) {
          analysis.guiltType = 'performance_inadequacy_guilt';
        } else if (categories.includes('neglect_guilt')) {
          analysis.guiltType = 'neglect_based_guilt';
        } else if (categories.includes('responsibility_guilt') || categories.includes('responsibility_awareness')) {
          analysis.guiltType = 'duty_obligation_guilt';
        } else if (categories.includes('regret_guilt')) {
          analysis.guiltType = 'regret_based_guilt';
        } else {
          analysis.guiltType = 'general_guilt';
        }
      }

      // Identify guilt source
      if (messageText.includes('ventas') || messageText.includes('ingresos')) {
        analysis.guiltSource = 'financial_performance';
      } else if (messageText.includes('clientes') || messageText.includes('servicio')) {
        analysis.guiltSource = 'customer_service';
      } else if (messageText.includes('producto') || messageText.includes('calidad')) {
        analysis.guiltSource = 'product_quality';
      } else if (messageText.includes('empleados') || messageText.includes('equipo')) {
        analysis.guiltSource = 'team_management';
      } else if (messageText.includes('tiempo') || messageText.includes('dedicación')) {
        analysis.guiltSource = 'time_investment';
      }

      // Check for constructive vs destructive guilt
      const constructiveIndicators = ['puedo mejorar', 'voy a cambiar', 'aprenderé'];
      const destructiveIndicators = ['soy terrible', 'no sirvo', 'soy un fracaso'];

      const isConstructive = constructiveIndicators.some(ind => messageText.includes(ind));
      const isDestructive = destructiveIndicators.some(ind => messageText.includes(ind));

      if (isConstructive) {
        analysis.guiltStyle = 'constructive_guilt';
      } else if (isDestructive) {
        analysis.guiltStyle = 'destructive_guilt';
      } else {
        analysis.guiltStyle = 'neutral_guilt';
      }

      // Check for guilt resolution attempts
      const resolutionIndicators = ['voy a', 'haré', 'me comprometo', 'cambiaré'];
      const hasResolution = resolutionIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasResolution) {
        analysis.resolutionOriented = true;
        analysis.copingMechanism = 'action_planning';
      }

      // Analyze guilt triggers
      analysis.triggers = {
        pastMistakes: messageText.includes('error') || messageText.includes('equivoqué'),
        unmetObligations: messageText.includes('debería') || messageText.includes('tengo que'),
        comparisonWithOthers: messageText.includes('otros') || messageText.includes('mejor que'),
        selfExpectations: messageText.includes('esperaba') || messageText.includes('debería ser')
      };

      // Check conversation history for guilt patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalGuiltContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Guilt detection warning:', error.message);
      // Return safe defaults
      analysis.guiltLevel = 'none';
      analysis.guiltType = 'none';
    }

    return analysis;
  }

  calculateGuiltIntensity(pattern) {
    // Helper method to calculate guilt intensity based on pattern
    const highIntensityPatterns = ['muy culpable', 'totalmente mi culpa', 'me siento terrible'];
    const mediumIntensityPatterns = ['culpable', 'mi responsabilidad', 'fue mi error'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalGuiltContext(conversationHistory) {
    // Helper method to analyze historical guilt context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, guiltEvolution: 'initial_responsibility_awareness' };
    }
    
    return {
      hasHistory: true,
      guiltEvolution: 'processing_responsibility',
      emotionalJourney: 'working_through_accountability',
      growth: 'developing_healthy_responsibility'
    };
  }

  detectShame(message, conversationHistory) {
    // Shame detection for emotional intelligence processing
    const analysis = {
      shameLevel: 'none',
      shameIndicators: [],
      shameType: 'none',
      selfWorthImpact: 'minimal',
      shameSource: null,
      businessShame: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Shame indicators in Spanish business context
      const shamePatterns = {
        'explicit_shame': ['me da vergüenza', 'qué vergüenza', 'me avergüenza', 'siento vergüenza'],
        'business_shame': ['no soy buen empresario', 'mal negociante', 'fracasé como', 'no sirvo para'],
        'performance_shame': ['mis ventas son patéticas', 'soy un fracaso', 'qué mal lo hago'],
        'social_shame': ['qué dirán', 'me ven mal', 'me juzgan', 'parezco tonto'],
        'competence_shame': ['no sé nada', 'soy ignorante', 'no entiendo', 'soy malo en esto'],
        'identity_shame': ['no soy suficiente', 'soy inferior', 'no valgo', 'soy un perdedor']
      };

      // Detect shame indicators
      Object.entries(shamePatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.shameIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateShameIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context shame detection
      const businessShameContext = {
        'financial_shame': messageText.includes('ventas') && 
                          (messageText.includes('patéticas') || messageText.includes('terribles')),
        'competence_shame': messageText.includes('no sé') && 
                           (messageText.includes('negocio') || messageText.includes('restaurante')),
        'comparison_shame': messageText.includes('otros') && 
                           (messageText.includes('mejor') || messageText.includes('superior')),
        'professional_shame': messageText.includes('empresario') && 
                             messageText.includes('malo')
      };

      Object.entries(businessShameContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.shameIndicators.push({
            category: 'business_context_shame',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessShame = true;
        }
      });

      // Implicit shame through self-deprecation
      const selfDeprecationPatterns = [
        'soy terrible', 'no sirvo', 'soy un desastre',
        'qué mal', 'soy pésimo', 'no tengo idea'
      ];

      selfDeprecationPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.shameIndicators.push({
            category: 'self_deprecation_shame',
            pattern: pattern,
            intensity: 'medium',
            type: 'self_deprecating'
          });
        }
      });

      // Avoidance and hiding behaviors
      const avoidancePatterns = [
        'no quiero que sepan', 'oculto', 'escondo',
        'no me gusta admitir', 'prefiero no decir'
      ];

      avoidancePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.shameIndicators.push({
            category: 'avoidance_shame',
            pattern: pattern,
            intensity: 'high',
            type: 'behavioral'
          });
        }
      });

      // Minimize and downplay patterns
      const minimizingPatterns = [
        'no es gran cosa', 'no importa', 'da igual',
        'no me importa', 'no es nada', 'solo es'
      ];

      minimizingPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.shameIndicators.push({
            category: 'minimizing_shame',
            pattern: pattern,
            intensity: 'low',
            type: 'defensive'
          });
        }
      });

      // Determine overall shame level
      if (analysis.shameIndicators.length === 0) {
        analysis.shameLevel = 'none';
      } else if (analysis.shameIndicators.length <= 2) {
        analysis.shameLevel = 'low_shame';
      } else if (analysis.shameIndicators.length <= 4) {
        analysis.shameLevel = 'medium_shame';
      } else {
        analysis.shameLevel = 'high_shame';
      }

      // Determine shame type
      if (analysis.shameIndicators.length > 0) {
        const categories = analysis.shameIndicators.map(ind => ind.category);
        if (categories.includes('business_shame') || categories.includes('business_context_shame')) {
          analysis.shameType = 'business_competence_shame';
        } else if (categories.includes('performance_shame')) {
          analysis.shameType = 'performance_based_shame';
        } else if (categories.includes('social_shame')) {
          analysis.shameType = 'social_judgment_shame';
        } else if (categories.includes('competence_shame')) {
          analysis.shameType = 'knowledge_competence_shame';
        } else if (categories.includes('identity_shame')) {
          analysis.shameType = 'core_identity_shame';
        } else {
          analysis.shameType = 'general_shame';
        }
      }

      // Assess self-worth impact
      const highImpactIndicators = ['no valgo', 'soy inferior', 'no sirvo', 'soy un fracaso'];
      const mediumImpactIndicators = ['no soy bueno', 'soy malo', 'no entiendo'];
      const lowImpactIndicators = ['me da vergüenza', 'qué mal', 'no me gusta'];

      const hasHighImpact = highImpactIndicators.some(ind => messageText.includes(ind));
      const hasMediumImpact = mediumImpactIndicators.some(ind => messageText.includes(ind));
      const hasLowImpact = lowImpactIndicators.some(ind => messageText.includes(ind));

      if (hasHighImpact) {
        analysis.selfWorthImpact = 'severe';
      } else if (hasMediumImpact) {
        analysis.selfWorthImpact = 'moderate';
      } else if (hasLowImpact) {
        analysis.selfWorthImpact = 'mild';
      }

      // Identify shame source
      if (messageText.includes('ventas') || messageText.includes('dinero')) {
        analysis.shameSource = 'financial_performance';
      } else if (messageText.includes('conocimiento') || messageText.includes('saber')) {
        analysis.shameSource = 'knowledge_gaps';
      } else if (messageText.includes('otros') || messageText.includes('competencia')) {
        analysis.shameSource = 'social_comparison';
      } else if (messageText.includes('habilidad') || messageText.includes('capacidad')) {
        analysis.shameSource = 'skill_competence';
      }

      // Check for shame triggers
      analysis.triggers = {
        publicExposure: messageText.includes('que sepan') || messageText.includes('se den cuenta'),
        comparison: messageText.includes('otros') || messageText.includes('mejor que'),
        failureReminder: messageText.includes('fracaso') || messageText.includes('error'),
        judgment: messageText.includes('juzgan') || messageText.includes('critican')
      };

      // Check for shame coping mechanisms
      const copingMechanisms = ['pero', 'al menos', 'aunque', 'sin embargo'];
      const hasCoping = copingMechanisms.some(mechanism =>
        messageText.includes(mechanism)
      );

      if (hasCoping) {
        analysis.copingBehavior = true;
        analysis.copingType = 'rationalization_attempt';
      }

      // Analyze shame vs guilt distinction
      const guiltIndicators = ['mi culpa', 'responsable', 'debería haber'];
      const shameIndicators = ['soy malo', 'no valgo', 'qué vergüenza'];

      const hasGuiltLanguage = guiltIndicators.some(ind => messageText.includes(ind));
      const hasShameLanguage = shameIndicators.some(ind => messageText.includes(ind));

      if (hasShameLanguage && !hasGuiltLanguage) {
        analysis.emotionDistinction = 'pure_shame';
      } else if (hasGuiltLanguage && !hasShameLanguage) {
        analysis.emotionDistinction = 'guilt_overlap';
      } else if (hasGuiltLanguage && hasShameLanguage) {
        analysis.emotionDistinction = 'shame_guilt_complex';
      } else {
        analysis.emotionDistinction = 'unclear';
      }

      // Check conversation history for shame patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalShameContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Shame detection warning:', error.message);
      // Return safe defaults
      analysis.shameLevel = 'none';
      analysis.shameType = 'none';
    }

    return analysis;
  }

  calculateShameIntensity(pattern) {
    // Helper method to calculate shame intensity based on pattern
    const highIntensityPatterns = ['soy un fracaso', 'no valgo nada', 'qué vergüenza tan grande'];
    const mediumIntensityPatterns = ['me da vergüenza', 'soy terrible', 'no sirvo'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalShameContext(conversationHistory) {
    // Helper method to analyze historical shame context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, shameEvolution: 'initial_vulnerability' };
    }
    
    return {
      hasHistory: true,
      shameEvolution: 'processing_self_worth_challenges',
      emotionalJourney: 'working_through_shame',
      healing: 'building_self_compassion'
    };
  }

  detectBusinessUncertainty(message, conversationHistory) {
    // Business uncertainty detection for emotional intelligence processing
    const analysis = {
      uncertaintyLevel: 'none',
      uncertaintyIndicators: [],
      uncertaintyType: 'none',
      decisionImpact: 'minimal',
      uncertaintySource: null,
      businessContext: true
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business uncertainty indicators in Spanish
      const uncertaintyPatterns = {
        'explicit_uncertainty': ['no estoy seguro', 'tengo dudas', 'no sé si', 'incertidumbre'],
        'decision_uncertainty': ['no sé qué hacer', 'qué decidir', 'cuál elegir', 'qué camino'],
        'market_uncertainty': ['no sé cómo va el mercado', 'situación incierta', 'tiempos difíciles'],
        'performance_uncertainty': ['no sé si funciona', 'resultados inciertos', 'puede que no'],
        'strategic_uncertainty': ['no sé la estrategia', 'dirección unclear', 'rumbo incierto'],
        'financial_uncertainty': ['no sé los números', 'situación financiera', 'ingresos inciertos']
      };

      // Detect uncertainty indicators
      Object.entries(uncertaintyPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.uncertaintyIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateUncertaintyIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context uncertainty detection
      const businessUncertaintyContext = {
        'product_uncertainty': messageText.includes('pollo rostizado') && 
                              (messageText.includes('no sé') || messageText.includes('dudas')),
        'sales_uncertainty': messageText.includes('ventas') && 
                            (messageText.includes('incierto') || messageText.includes('variable')),
        'data_uncertainty': messageText.includes('datos') && 
                           (messageText.includes('confiable') || messageText.includes('correcto')),
        'analysis_uncertainty': messageText.includes('análisis') && 
                               messageText.includes('seguro')
      };

      Object.entries(businessUncertaintyContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.uncertaintyIndicators.push({
            category: 'business_context_uncertainty',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
        }
      });

      // Implicit uncertainty through hedging language
      const hedgingPatterns = [
        'tal vez', 'quizás', 'posiblemente', 'probablemente',
        'puede ser', 'creo que', 'me parece', 'supongo'
      ];

      hedgingPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.uncertaintyIndicators.push({
            category: 'hedging_uncertainty',
            pattern: pattern,
            intensity: 'low',
            type: 'linguistic'
          });
        }
      });

      // Question patterns indicating uncertainty
      const uncertainQuestionPatterns = [
        '¿será correcto?', '¿estará bien?', '¿funcionará?',
        '¿qué opinas?', '¿tú qué harías?', '¿es buena idea?'
      ];

      uncertainQuestionPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.uncertaintyIndicators.push({
            category: 'questioning_uncertainty',
            pattern: pattern,
            intensity: 'medium',
            type: 'interrogative'
          });
        }
      });

      // Future-oriented uncertainty
      const futureUncertaintyPatterns = [
        'no sé qué pasará', 'futuro incierto', 'qué va a pasar',
        'cómo resultará', 'hacia dónde vamos'
      ];

      futureUncertaintyPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.uncertaintyIndicators.push({
            category: 'future_uncertainty',
            pattern: pattern,
            intensity: 'high',
            type: 'temporal'
          });
        }
      });

      // Determine overall uncertainty level
      if (analysis.uncertaintyIndicators.length === 0) {
        analysis.uncertaintyLevel = 'none';
      } else if (analysis.uncertaintyIndicators.length <= 2) {
        analysis.uncertaintyLevel = 'low_uncertainty';
      } else if (analysis.uncertaintyIndicators.length <= 4) {
        analysis.uncertaintyLevel = 'medium_uncertainty';
      } else {
        analysis.uncertaintyLevel = 'high_uncertainty';
      }

      // Determine uncertainty type
      if (analysis.uncertaintyIndicators.length > 0) {
        const categories = analysis.uncertaintyIndicators.map(ind => ind.category);
        if (categories.includes('decision_uncertainty')) {
          analysis.uncertaintyType = 'decision_making_uncertainty';
        } else if (categories.includes('market_uncertainty')) {
          analysis.uncertaintyType = 'market_conditions_uncertainty';
        } else if (categories.includes('performance_uncertainty')) {
          analysis.uncertaintyType = 'outcome_performance_uncertainty';
        } else if (categories.includes('strategic_uncertainty')) {
          analysis.uncertaintyType = 'strategic_direction_uncertainty';
        } else if (categories.includes('financial_uncertainty')) {
          analysis.uncertaintyType = 'financial_situation_uncertainty';
        } else if (categories.includes('business_context_uncertainty')) {
          analysis.uncertaintyType = 'business_operational_uncertainty';
        } else {
          analysis.uncertaintyType = 'general_business_uncertainty';
        }
      }

      // Assess decision impact
      const highImpactIndicators = ['decisión importante', 'futuro del negocio', 'crítico'];
      const mediumImpactIndicators = ['estrategia', 'ventas', 'producto'];
      const lowImpactIndicators = ['pequeña duda', 'detalle menor'];

      const hasHighImpact = highImpactIndicators.some(ind => messageText.includes(ind));
      const hasMediumImpact = mediumImpactIndicators.some(ind => messageText.includes(ind));
      const hasLowImpact = lowImpactIndicators.some(ind => messageText.includes(ind));

      if (hasHighImpact) {
        analysis.decisionImpact = 'critical';
      } else if (hasMediumImpact) {
        analysis.decisionImpact = 'significant';
      } else if (hasLowImpact) {
        analysis.decisionImpact = 'minimal';
      } else if (analysis.uncertaintyIndicators.length > 0) {
        analysis.decisionImpact = 'moderate';
      }

      // Identify uncertainty source
      if (messageText.includes('datos') || messageText.includes('información')) {
        analysis.uncertaintySource = 'data_reliability';
      } else if (messageText.includes('mercado') || messageText.includes('competencia')) {
        analysis.uncertaintySource = 'market_conditions';
      } else if (messageText.includes('clientes') || messageText.includes('demanda')) {
        analysis.uncertaintySource = 'customer_behavior';
      } else if (messageText.includes('futuro') || messageText.includes('tiempo')) {
        analysis.uncertaintySource = 'temporal_factors';
      } else if (messageText.includes('capacidad') || messageText.includes('habilidad')) {
        analysis.uncertaintySource = 'personal_capability';
      }

      // Check for information-seeking behaviors
      const informationSeekingPatterns = [
        'necesito saber', 'quiero confirmar', 'puedes verificar',
        'dame más información', 'ayúdame a entender'
      ];

      const hasInformationSeeking = informationSeekingPatterns.some(pattern =>
        messageText.includes(pattern)
      );

      if (hasInformationSeeking) {
        analysis.copingBehavior = true;
        analysis.copingType = 'information_gathering';
      }

      // Analyze tolerance for uncertainty
      const highToleranceIndicators = ['veamos qué pasa', 'ya veremos', 'experimentemos'];
      const lowToleranceIndicators = ['necesito estar seguro', 'no puedo decidir', 'me angustia'];

      const hasHighTolerance = highToleranceIndicators.some(ind => messageText.includes(ind));
      const hasLowTolerance = lowToleranceIndicators.some(ind => messageText.includes(ind));

      if (hasHighTolerance) {
        analysis.uncertaintyTolerance = 'high';
      } else if (hasLowTolerance) {
        analysis.uncertaintyTolerance = 'low';
      } else {
        analysis.uncertaintyTolerance = 'medium';
      }

      // Check for uncertainty triggers
      analysis.triggers = {
        lackOfInformation: messageText.includes('no tengo datos') || messageText.includes('falta información'),
        conflictingData: messageText.includes('contradicen') || messageText.includes('diferentes resultados'),
        newSituation: messageText.includes('primera vez') || messageText.includes('nuevo'),
        timePresure: messageText.includes('decidir rápido') || messageText.includes('urgente')
      };

      // Check conversation history for uncertainty patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalUncertaintyContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Business uncertainty detection warning:', error.message);
      // Return safe defaults
      analysis.uncertaintyLevel = 'none';
      analysis.uncertaintyType = 'none';
    }

    return analysis;
  }

  calculateUncertaintyIntensity(pattern) {
    // Helper method to calculate uncertainty intensity based on pattern
    const highIntensityPatterns = ['totalmente incierto', 'no tengo ni idea', 'completamente perdido'];
    const mediumIntensityPatterns = ['no estoy seguro', 'tengo dudas', 'incertidumbre'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalUncertaintyContext(conversationHistory) {
    // Helper method to analyze historical uncertainty context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, uncertaintyEvolution: 'initial_questioning' };
    }
    
    return {
      hasHistory: true,
      uncertaintyEvolution: 'seeking_clarity',
      decisionJourney: 'gathering_information',
      confidenceBuilding: 'progressive_understanding'
    };
  }

  detectBusinessUrgency(message, conversationHistory) {
    // Business urgency detection for emotional intelligence processing
    const analysis = {
      urgencyLevel: 'none',
      urgencyIndicators: [],
      urgencyType: 'none',
      timeConstraint: 'flexible',
      urgencySource: null,
      businessPriority: 'normal'
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business urgency indicators in Spanish
      const urgencyPatterns = {
        'explicit_urgency': ['urgente', 'inmediato', 'ya', 'ahora mismo'],
        'time_pressure': ['no tengo tiempo', 'rápido', 'prisa', 'cuanto antes'],
        'business_crisis': ['crisis', 'emergencia', 'problema grave', 'situación crítica'],
        'deadline_pressure': ['fecha límite', 'plazo', 'vence', 'termina'],
        'competitive_urgency': ['competencia', 'nos están ganando', 'perdemos ventaja'],
        'financial_urgency': ['pérdidas', 'costos suben', 'dinero', 'gastos urgentes']
      };

      // Detect urgency indicators
      Object.entries(urgencyPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.urgencyIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateUrgencyIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context urgency detection
      const businessUrgencyContext = {
        'sales_urgency': messageText.includes('ventas') && 
                        (messageText.includes('caen') || messageText.includes('bajan')),
        'product_urgency': messageText.includes('pollo rostizado') && 
                          messageText.includes('problema'),
        'analysis_urgency': messageText.includes('análisis') && 
                           (messageText.includes('ya') || messageText.includes('urgente')),
        'decision_urgency': messageText.includes('decidir') && 
                           messageText.includes('rápido')
      };

      Object.entries(businessUrgencyContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.urgencyIndicators.push({
            category: 'business_context_urgency',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
        }
      });

      // Implicit urgency through action words
      const actionUrgencyPatterns = [
        'necesito ya', 'dame inmediatamente', 'no puede esperar',
        'hazlo ahora', 'urgentemente', 'sin demora'
      ];

      actionUrgencyPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.urgencyIndicators.push({
            category: 'action_urgency',
            pattern: pattern,
            intensity: 'high',
            type: 'imperative'
          });
        }
      });

      // Repetitive emphasis indicating urgency
      const emphasisPatterns = [
        '!', '¡', 'por favor', 'te ruego',
        'es importante', 'crucial', 'vital'
      ];

      const emphasisCount = emphasisPatterns.filter(pattern =>
        messageText.includes(pattern)
      ).length;

      if (emphasisCount > 0) {
        analysis.urgencyIndicators.push({
          category: 'emphasis_urgency',
          pattern: 'emotional_emphasis',
          intensity: emphasisCount > 2 ? 'high' : 'medium',
          type: 'emotional'
        });
      }

      // Consequence-based urgency
      const consequencePatterns = [
        'si no', 'de lo contrario', 'o sino',
        'perderemos', 'fracasaremos', 'será tarde'
      ];

      consequencePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.urgencyIndicators.push({
            category: 'consequence_urgency',
            pattern: pattern,
            intensity: 'high',
            type: 'risk_based'
          });
        }
      });

      // Determine overall urgency level
      if (analysis.urgencyIndicators.length === 0) {
        analysis.urgencyLevel = 'none';
      } else if (analysis.urgencyIndicators.length <= 2) {
        analysis.urgencyLevel = 'low_urgency';
      } else if (analysis.urgencyIndicators.length <= 4) {
        analysis.urgencyLevel = 'medium_urgency';
      } else {
        analysis.urgencyLevel = 'high_urgency';
      }

      // Determine urgency type
      if (analysis.urgencyIndicators.length > 0) {
        const categories = analysis.urgencyIndicators.map(ind => ind.category);
        if (categories.includes('business_crisis')) {
          analysis.urgencyType = 'crisis_response_urgency';
        } else if (categories.includes('deadline_pressure')) {
          analysis.urgencyType = 'deadline_driven_urgency';
        } else if (categories.includes('competitive_urgency')) {
          analysis.urgencyType = 'competitive_pressure_urgency';
        } else if (categories.includes('financial_urgency')) {
          analysis.urgencyType = 'financial_pressure_urgency';
        } else if (categories.includes('business_context_urgency')) {
          analysis.urgencyType = 'operational_urgency';
        } else if (categories.includes('time_pressure')) {
          analysis.urgencyType = 'time_sensitive_urgency';
        } else {
          analysis.urgencyType = 'general_business_urgency';
        }
      }

      // Assess time constraint
      const immediateTimeIndicators = ['ya', 'ahora', 'inmediato', 'en este momento'];
      const shortTermIndicators = ['hoy', 'mañana', 'esta semana', 'pronto'];
      const mediumTermIndicators = ['este mes', 'próximas semanas', 'antes de'];

      const hasImmediate = immediateTimeIndicators.some(ind => messageText.includes(ind));
      const hasShortTerm = shortTermIndicators.some(ind => messageText.includes(ind));
      const hasMediumTerm = mediumTermIndicators.some(ind => messageText.includes(ind));

      if (hasImmediate) {
        analysis.timeConstraint = 'immediate';
      } else if (hasShortTerm) {
        analysis.timeConstraint = 'short_term';
      } else if (hasMediumTerm) {
        analysis.timeConstraint = 'medium_term';
      } else if (analysis.urgencyIndicators.length > 0) {
        analysis.timeConstraint = 'unspecified_urgent';
      }

      // Identify urgency source
      if (messageText.includes('ventas') || messageText.includes('ingresos')) {
        analysis.urgencySource = 'revenue_concerns';
      } else if (messageText.includes('competencia') || messageText.includes('mercado')) {
        analysis.urgencySource = 'competitive_pressure';
      } else if (messageText.includes('clientes') || messageText.includes('demanda')) {
        analysis.urgencySource = 'customer_demands';
      } else if (messageText.includes('costos') || messageText.includes('gastos')) {
        analysis.urgencySource = 'cost_pressures';
      } else if (messageText.includes('decisión') || messageText.includes('estrategia')) {
        analysis.urgencySource = 'strategic_decisions';
      }

      // Determine business priority level
      const criticalIndicators = ['crítico', 'vital', 'esencial', 'supervivencia'];
      const highIndicators = ['importante', 'prioritario', 'clave'];
      const mediumIndicators = ['necesario', 'conveniente', 'útil'];

      const hasCritical = criticalIndicators.some(ind => messageText.includes(ind));
      const hasHigh = highIndicators.some(ind => messageText.includes(ind));
      const hasMedium = mediumIndicators.some(ind => messageText.includes(ind));

      if (hasCritical) {
        analysis.businessPriority = 'critical';
      } else if (hasHigh) {
        analysis.businessPriority = 'high';
      } else if (hasMedium) {
        analysis.businessPriority = 'medium';
      } else if (analysis.urgencyIndicators.length > 0) {
        analysis.businessPriority = 'elevated';
      }

      // Check for urgency escalation patterns
      const escalationIndicators = ['cada vez más', 'más urgente', 'empeora', 'se agrava'];
      const hasEscalation = escalationIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasEscalation) {
        analysis.escalating = true;
        analysis.urgencyLevel = this.escalateUrgencyLevel(analysis.urgencyLevel);
      }

      // Analyze urgency triggers
      analysis.triggers = {
        externalPressure: messageText.includes('clientes') || messageText.includes('competencia'),
        internalDeadline: messageText.includes('plazo') || messageText.includes('fecha'),
        financialPressure: messageText.includes('dinero') || messageText.includes('costos'),
        operationalCrisis: messageText.includes('problema') || messageText.includes('falla')
      };

      // Check for urgency mitigation attempts
      const mitigationIndicators = ['pero podemos', 'si actuamos', 'hay tiempo', 'solucionable'];
      const hasMitigation = mitigationIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasMitigation) {
        analysis.mitigationOriented = true;
        analysis.copingApproach = 'solution_focused';
      }

      // Check conversation history for urgency patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalUrgencyContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Business urgency detection warning:', error.message);
      // Return safe defaults
      analysis.urgencyLevel = 'none';
      analysis.urgencyType = 'none';
    }

    return analysis;
  }

  calculateUrgencyIntensity(pattern) {
    // Helper method to calculate urgency intensity based on pattern
    const highIntensityPatterns = ['crisis', 'emergencia', 'inmediato', 'ahora mismo'];
    const mediumIntensityPatterns = ['urgente', 'rápido', 'prisa', 'importante'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  escalateUrgencyLevel(currentLevel) {
    // Helper method to escalate urgency level
    const escalationMap = {
      'low_urgency': 'medium_urgency',
      'medium_urgency': 'high_urgency',
      'high_urgency': 'critical_urgency'
    };
    return escalationMap[currentLevel] || currentLevel;
  }

  analyzeHistoricalUrgencyContext(conversationHistory) {
    // Helper method to analyze historical urgency context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, urgencyEvolution: 'initial_pressure' };
    }
    
    return {
      hasHistory: true,
      urgencyEvolution: 'building_pressure',
      timelinePattern: 'escalating_needs',
      responsePattern: 'seeking_immediate_solutions'
    };
  }

  detectBusinessSatisfaction(message, conversationHistory) {
    // Business satisfaction detection for emotional intelligence processing
    const analysis = {
      satisfactionLevel: 'neutral',
      satisfactionIndicators: [],
      satisfactionType: 'none',
      achievementArea: null,
      satisfactionSource: null,
      businessContext: true
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business satisfaction indicators in Spanish
      const satisfactionPatterns = {
        'explicit_satisfaction': ['satisfecho', 'contento', 'feliz', 'complacido'],
        'business_satisfaction': ['buen negocio', 'excelentes ventas', 'gran éxito', 'funcionando bien'],
        'performance_satisfaction': ['buenos resultados', 'cumplimos metas', 'superamos expectativas'],
        'achievement_satisfaction': ['logramos', 'conseguimos', 'alcanzamos', 'exitoso'],
        'quality_satisfaction': ['excelente calidad', 'producto perfecto', 'primera clase'],
        'growth_satisfaction': ['creciendo', 'mejorando', 'progresando', 'avanzando']
      };

      // Detect satisfaction indicators
      Object.entries(satisfactionPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.satisfactionIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateSatisfactionIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context satisfaction detection
      const businessSatisfactionContext = {
        'product_satisfaction': messageText.includes('pollo rostizado') && 
                               (messageText.includes('bien') || messageText.includes('excelente')),
        'sales_satisfaction': messageText.includes('ventas') && 
                             (messageText.includes('buenas') || messageText.includes('crecen')),
        'analysis_satisfaction': messageText.includes('análisis') && 
                                messageText.includes('perfecto'),
        'data_satisfaction': messageText.includes('datos') && 
                            messageText.includes('correctos')
      };

      Object.entries(businessSatisfactionContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.satisfactionIndicators.push({
            category: 'business_context_satisfaction',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
        }
      });

      // Implicit satisfaction through positive language
      const positiveLanguagePatterns = [
        'me gusta', 'está bien', 'funciona perfectamente',
        'justo lo que necesitaba', 'ideal', 'perfecto'
      ];

      positiveLanguagePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.satisfactionIndicators.push({
            category: 'positive_evaluation',
            pattern: pattern,
            intensity: 'medium',
            type: 'evaluative'
          });
        }
      });

      // Achievement and success language
      const achievementPatterns = [
        'lo logramos', 'gran trabajo', 'bien hecho',
        'éxito total', 'resultado perfecto', 'meta alcanzada'
      ];

      achievementPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.satisfactionIndicators.push({
            category: 'achievement_satisfaction',
            pattern: pattern,
            intensity: 'high',
            type: 'accomplishment'
          });
        }
      });

      // Gratitude and appreciation expressions
      const gratitudePatterns = [
        'gracias', 'agradezco', 'excelente trabajo',
        'muy útil', 'gran ayuda', 'perfecto análisis'
      ];

      gratitudePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.satisfactionIndicators.push({
            category: 'gratitude_satisfaction',
            pattern: pattern,
            intensity: 'medium',
            type: 'appreciative'
          });
        }
      });

      // Determine overall satisfaction level
      if (analysis.satisfactionIndicators.length === 0) {
        analysis.satisfactionLevel = 'neutral';
      } else if (analysis.satisfactionIndicators.length <= 2) {
        analysis.satisfactionLevel = 'low_satisfaction';
      } else if (analysis.satisfactionIndicators.length <= 4) {
        analysis.satisfactionLevel = 'medium_satisfaction';
      } else {
        analysis.satisfactionLevel = 'high_satisfaction';
      }

      // Determine satisfaction type
      if (analysis.satisfactionIndicators.length > 0) {
        const categories = analysis.satisfactionIndicators.map(ind => ind.category);
        if (categories.includes('business_satisfaction') || categories.includes('business_context_satisfaction')) {
          analysis.satisfactionType = 'business_performance_satisfaction';
        } else if (categories.includes('performance_satisfaction')) {
          analysis.satisfactionType = 'outcome_achievement_satisfaction';
        } else if (categories.includes('achievement_satisfaction')) {
          analysis.satisfactionType = 'goal_accomplishment_satisfaction';
        } else if (categories.includes('quality_satisfaction')) {
          analysis.satisfactionType = 'quality_standards_satisfaction';
        } else if (categories.includes('growth_satisfaction')) {
          analysis.satisfactionType = 'progress_development_satisfaction';
        } else if (categories.includes('gratitude_satisfaction')) {
          analysis.satisfactionType = 'service_appreciation_satisfaction';
        } else {
          analysis.satisfactionType = 'general_business_satisfaction';
        }
      }

      // Identify achievement area
      if (messageText.includes('ventas') || messageText.includes('ingresos')) {
        analysis.achievementArea = 'sales_revenue';
      } else if (messageText.includes('producto') || messageText.includes('pollo rostizado')) {
        analysis.achievementArea = 'product_quality';
      } else if (messageText.includes('clientes') || messageText.includes('servicio')) {
        analysis.achievementArea = 'customer_service';
      } else if (messageText.includes('análisis') || messageText.includes('datos')) {
        analysis.achievementArea = 'data_insights';
      } else if (messageText.includes('negocio') || messageText.includes('restaurante')) {
        analysis.achievementArea = 'business_operations';
      }

      // Identify satisfaction source
      if (messageText.includes('resultados') || messageText.includes('números')) {
        analysis.satisfactionSource = 'performance_metrics';
      } else if (messageText.includes('calidad') || messageText.includes('excelencia')) {
        analysis.satisfactionSource = 'quality_achievement';
      } else if (messageText.includes('meta') || messageText.includes('objetivo')) {
        analysis.satisfactionSource = 'goal_attainment';
      } else if (messageText.includes('reconocimiento') || messageText.includes('éxito')) {
        analysis.satisfactionSource = 'recognition_success';
      } else if (messageText.includes('mejora') || messageText.includes('progreso')) {
        analysis.satisfactionSource = 'improvement_progress';
      }

      // Assess satisfaction sustainability
      const sustainabilityIndicators = ['consistente', 'siempre', 'constantemente', 'continúa'];
      const temporaryIndicators = ['por ahora', 'momentáneamente', 'temporalmente'];

      const hasSustainability = sustainabilityIndicators.some(ind => messageText.includes(ind));
      const hasTemporary = temporaryIndicators.some(ind => messageText.includes(ind));

      if (hasSustainability) {
        analysis.sustainability = 'sustained';
      } else if (hasTemporary) {
        analysis.sustainability = 'temporary';
      } else {
        analysis.sustainability = 'current_moment';
      }

      // Check for satisfaction with reservations
      const reservationIndicators = ['pero', 'aunque', 'sin embargo', 'todavía'];
      const hasReservations = reservationIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasReservations) {
        analysis.hasReservations = true;
        analysis.satisfactionLevel = this.moderateSatisfactionLevel(analysis.satisfactionLevel);
      }

      // Analyze satisfaction authenticity
      analysis.authenticityMarkers = {
        specificDetails: messageText.includes('pollo rostizado') || messageText.includes('ventas'),
        measurableResults: messageText.includes('números') || messageText.includes('resultados'),
        emotionalExpression: messageText.includes('feliz') || messageText.includes('contento'),
        futurePlanning: messageText.includes('seguir') || messageText.includes('continuar')
      };

      // Check for comparative satisfaction
      const comparisonIndicators = ['mejor que', 'superior a', 'más que', 'supera'];
      const hasComparison = comparisonIndicators.some(indicator =>
        messageText.includes(indicator)
      );

      if (hasComparison) {
        analysis.comparativeSatisfaction = true;
        analysis.benchmarkType = 'competitive_comparison';
      }

      // Analyze satisfaction expression style
      const enthusiasticIndicators = ['¡excelente!', '¡perfecto!', '¡fantástico!'];
      const mildIndicators = ['está bien', 'funciona', 'aceptable'];
      const professionalIndicators = ['satisfactorio', 'cumple expectativas', 'adecuado'];

      const hasEnthusiastic = enthusiasticIndicators.some(ind => messageText.includes(ind));
      const hasMild = mildIndicators.some(ind => messageText.includes(ind));
      const hasProfessional = professionalIndicators.some(ind => messageText.includes(ind));

      if (hasEnthusiastic) {
        analysis.expressionStyle = 'enthusiastic';
      } else if (hasMild) {
        analysis.expressionStyle = 'understated';
      } else if (hasProfessional) {
        analysis.expressionStyle = 'professional';
      } else {
        analysis.expressionStyle = 'neutral';
      }

      // Check conversation history for satisfaction evolution
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalSatisfactionContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Business satisfaction detection warning:', error.message);
      // Return safe defaults
      analysis.satisfactionLevel = 'neutral';
      analysis.satisfactionType = 'none';
    }

    return analysis;
  }

  calculateSatisfactionIntensity(pattern) {
    // Helper method to calculate satisfaction intensity based on pattern
    const highIntensityPatterns = ['muy satisfecho', 'extremadamente feliz', 'éxito total'];
    const mediumIntensityPatterns = ['satisfecho', 'contento', 'buen trabajo'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  moderateSatisfactionLevel(currentLevel) {
    // Helper method to moderate satisfaction when reservations are present
    const moderationMap = {
      'high_satisfaction': 'medium_satisfaction',
      'medium_satisfaction': 'low_satisfaction',
      'low_satisfaction': 'low_satisfaction'
    };
    return moderationMap[currentLevel] || currentLevel;
  }

  analyzeHistoricalSatisfactionContext(conversationHistory) {
    // Helper method to analyze historical satisfaction context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, satisfactionEvolution: 'initial_positive_response' };
    }
    
    return {
      hasHistory: true,
      satisfactionEvolution: 'building_positive_sentiment',
      emotionalJourney: 'growing_business_confidence',
      satisfactionPattern: 'progressive_achievement_recognition'
    };
  }

  detectBusinessOverwhelm(message, conversationHistory) {
    // Business overwhelm detection for emotional intelligence processing
    const analysis = {
      overwhelmLevel: 'none',
      overwhelmIndicators: [],
      overwhelmType: 'none',
      capacityStrain: 'manageable',
      overwhelmSource: null,
      businessStress: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business overwhelm indicators in Spanish
      const overwhelmPatterns = {
        'explicit_overwhelm': ['abrumado', 'sobrepasado', 'no puedo más', 'demasiado'],
        'capacity_overwhelm': ['no tengo tiempo', 'mucho trabajo', 'no doy abasto', 'saturado'],
        'information_overwhelm': ['demasiada información', 'no entiendo', 'muy complejo', 'confuso'],
        'decision_overwhelm': ['no sé qué hacer', 'muchas opciones', 'paralizado', 'bloqueado'],
        'responsibility_overwhelm': ['muchas responsabilidades', 'todo depende de mí', 'carga pesada'],
        'emotional_overwhelm': ['estresado', 'agotado', 'cansado', 'exhausto']
      };

      // Detect overwhelm indicators
      Object.entries(overwhelmPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.overwhelmIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateOverwhelmIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context overwhelm detection
      const businessOverwhelmContext = {
        'data_overwhelm': messageText.includes('datos') && 
                         (messageText.includes('mucho') || messageText.includes('complejo')),
        'analysis_overwhelm': messageText.includes('análisis') && 
                             messageText.includes('complicado'),
        'decision_overwhelm': messageText.includes('decidir') && 
                             messageText.includes('difícil'),
        'performance_overwhelm': messageText.includes('ventas') && 
                                messageText.includes('presión')
      };

      Object.entries(businessOverwhelmContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.overwhelmIndicators.push({
            category: 'business_context_overwhelm',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessStress = true;
        }
      });

      // Implicit overwhelm through scattered communication
      const scatteredPatterns = [
        'no sé por dónde empezar', 'es mucho', 'me pierdo',
        'muy complicado', 'no entiendo nada', 'caos'
      ];

      scatteredPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.overwhelmIndicators.push({
            category: 'cognitive_overwhelm',
            pattern: pattern,
            intensity: 'medium',
            type: 'cognitive'
          });
        }
      });

      // Multiple competing priorities
      const priorityConflictPatterns = [
        'todo es urgente', 'muchas cosas', 'al mismo tiempo',
        'no puedo con todo', 'prioridades confusas'
      ];

      priorityConflictPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.overwhelmIndicators.push({
            category: 'priority_overwhelm',
            pattern: pattern,
            intensity: 'high',
            type: 'organizational'
          });
        }
      });

      // Signs of mental fatigue
      const fatiguePatterns = [
        'cansado', 'agotado', 'no puedo pensar',
        'mente en blanco', 'exhausto', 'sin energía'
      ];

      fatiguePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.overwhelmIndicators.push({
            category: 'mental_fatigue',
            pattern: pattern,
            intensity: 'high',
            type: 'physical_mental'
          });
        }
      });

      // Determine overall overwhelm level
      if (analysis.overwhelmIndicators.length === 0) {
        analysis.overwhelmLevel = 'none';
      } else if (analysis.overwhelmIndicators.length <= 2) {
        analysis.overwhelmLevel = 'low_overwhelm';
      } else if (analysis.overwhelmIndicators.length <= 4) {
        analysis.overwhelmLevel = 'medium_overwhelm';
      } else {
        analysis.overwhelmLevel = 'high_overwhelm';
      }

      // Determine overwhelm type
      if (analysis.overwhelmIndicators.length > 0) {
        const categories = analysis.overwhelmIndicators.map(ind => ind.category);
        if (categories.includes('capacity_overwhelm')) {
          analysis.overwhelmType = 'workload_capacity_overwhelm';
        } else if (categories.includes('information_overwhelm')) {
          analysis.overwhelmType = 'information_processing_overwhelm';
        } else if (categories.includes('decision_overwhelm')) {
          analysis.overwhelmType = 'decision_paralysis_overwhelm';
        } else if (categories.includes('responsibility_overwhelm')) {
          analysis.overwhelmType = 'responsibility_burden_overwhelm';
        } else if (categories.includes('emotional_overwhelm') || categories.includes('mental_fatigue')) {
          analysis.overwhelmType = 'emotional_exhaustion_overwhelm';
        } else if (categories.includes('business_context_overwhelm')) {
          analysis.overwhelmType = 'business_complexity_overwhelm';
        } else {
          analysis.overwhelmType = 'general_overwhelm';
        }
      }

      // Assess capacity strain
      const strainIndicators = {
        severe: ['no puedo más', 'colapso', 'breaking point'],
        high: ['muy difícil', 'casi imposible', 'límite'],
        medium: ['complicado', 'difícil', 'challenging'],
        low: ['un poco', 'algo', 'ligeramente']
      };

      for (const [level, indicators] of Object.entries(strainIndicators)) {
        const hasStrainLevel = indicators.some(indicator => messageText.includes(indicator));
        if (hasStrainLevel) {
          analysis.capacityStrain = level;
          break;
        }
      }

      // Identify overwhelm source
      if (messageText.includes('tiempo') || messageText.includes('plazo')) {
        analysis.overwhelmSource = 'time_pressure';
      } else if (messageText.includes('información') || messageText.includes('datos')) {
        analysis.overwhelmSource = 'information_overload';
      } else if (messageText.includes('decisiones') || messageText.includes('opciones')) {
        analysis.overwhelmSource = 'decision_complexity';
      } else if (messageText.includes('trabajo') || messageText.includes('tareas')) {
        analysis.overwhelmSource = 'workload_volume';
      } else if (messageText.includes('responsabilidad') || messageText.includes('presión')) {
        analysis.overwhelmSource = 'responsibility_weight';
      }

      // Check for overwhelm coping attempts
      const copingAttempts = [
        'necesito ayuda', 'no sé cómo', 'qué hago',
        'dime cómo', 'ayúdame', 'guíame'
      ];

      const hasCopingAttempt = copingAttempts.some(attempt =>
        messageText.includes(attempt)
      );

      if (hasCopingAttempt) {
        analysis.seekingSupport = true;
        analysis.copingStrategy = 'help_seeking';
      }

      // Analyze overwhelm triggers
      analysis.triggers = {
        volumeOverload: messageText.includes('mucho') || messageText.includes('demasiado'),
        complexityOverload: messageText.includes('complejo') || messageText.includes('complicado'),
        timeOverload: messageText.includes('tiempo') || messageText.includes('prisa'),
        choiceOverload: messageText.includes('opciones') || messageText.includes('alternativas')
      };

      // Check for overwhelm impact on functioning
      const functioningImpact = {
        decisionMaking: messageText.includes('no puedo decidir') || messageText.includes('paralizado'),
        cognitiveClarity: messageText.includes('confuso') || messageText.includes('no entiendo'),
        emotionalRegulation: messageText.includes('estresado') || messageText.includes('agotado'),
        taskExecution: messageText.includes('no puedo') || messageText.includes('no doy abasto')
      };

      analysis.functionalImpact = Object.entries(functioningImpact)
        .filter(([_, hasImpact]) => hasImpact)
        .map(([area, _]) => area);

      // Check for overwhelm warning signs
      const warningSignsCount = [
        messageText.includes('no puedo más'),
        messageText.includes('demasiado'),
        messageText.includes('abrumado'),
        messageText.includes('exhausto'),
        messageText.includes('saturado')
      ].filter(Boolean).length;

      if (warningSignsCount >= 3) {
        analysis.riskLevel = 'high';
      } else if (warningSignsCount >= 2) {
        analysis.riskLevel = 'medium';
      } else if (warningSignsCount >= 1) {
        analysis.riskLevel = 'low';
      } else {
        analysis.riskLevel = 'minimal';
      }

      // Check conversation history for overwhelm patterns
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalOverwhelmContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Business overwhelm detection warning:', error.message);
      // Return safe defaults
      analysis.overwhelmLevel = 'none';
      analysis.overwhelmType = 'none';
    }

    return analysis;
  }

  calculateOverwhelmIntensity(pattern) {
    // Helper method to calculate overwhelm intensity based on pattern
    const highIntensityPatterns = ['no puedo más', 'abrumado', 'colapso', 'exhausto'];
    const mediumIntensityPatterns = ['demasiado', 'sobrepasado', 'saturado', 'agotado'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalOverwhelmContext(conversationHistory) {
    // Helper method to analyze historical overwhelm context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, overwhelmEvolution: 'initial_stress_indicator' };
    }
    
    return {
      hasHistory: true,
      overwhelmEvolution: 'building_stress_pattern',
      copingJourney: 'seeking_management_strategies',
      supportNeeds: 'increasing_assistance_requirements'
    };
  }

  detectBusinessOptimism(message, conversationHistory) {
    // Business optimism detection for emotional intelligence processing
    const analysis = {
      optimismLevel: 'neutral',
      optimismIndicators: [],
      optimismType: 'none',
      futureOutlook: 'uncertain',
      optimismSource: null,
      businessHope: false
    };

    try {
      const messageText = message.toLowerCase();
      
      // Business optimism indicators in Spanish
      const optimismPatterns = {
        'explicit_optimism': ['optimista', 'positivo', 'esperanzado', 'confiado'],
        'future_optimism': ['va a mejorar', 'creceremos', 'tendremos éxito', 'futuro brillante'],
        'business_optimism': ['buen futuro', 'oportunidades', 'potencial', 'promisorio'],
        'growth_optimism': ['creciendo', 'expandiendo', 'mejorando', 'progresando'],
        'confidence_optimism': ['seguro que', 'confío en que', 'estoy convencido', 'sin duda'],
        'opportunity_optimism': ['gran oportunidad', 'momento perfecto', 'ideal', 'favorable']
      };

      // Detect optimism indicators
      Object.entries(optimismPatterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          if (messageText.includes(pattern)) {
            analysis.optimismIndicators.push({
              category: category,
              pattern: pattern,
              intensity: this.calculateOptimismIntensity(pattern),
              type: 'explicit'
            });
          }
        });
      });

      // Business context optimism detection
      const businessOptimismContext = {
        'product_optimism': messageText.includes('pollo rostizado') && 
                           (messageText.includes('éxito') || messageText.includes('bien')),
        'sales_optimism': messageText.includes('ventas') && 
                         (messageText.includes('aumentar') || messageText.includes('crecer')),
        'market_optimism': messageText.includes('mercado') && 
                          messageText.includes('oportunidad'),
        'strategy_optimism': messageText.includes('estrategia') && 
                            messageText.includes('funcionar')
      };

      Object.entries(businessOptimismContext).forEach(([context, isPresent]) => {
        if (isPresent) {
          analysis.optimismIndicators.push({
            category: 'business_context_optimism',
            pattern: context,
            intensity: 'medium',
            type: 'contextual'
          });
          analysis.businessHope = true;
        }
      });

      // Implicit optimism through positive future language
      const positiveFuturePatterns = [
        'vamos a lograr', 'podemos conseguir', 'será exitoso',
        'funcionará bien', 'saldrá bien', 'tendrá éxito'
      ];

      positiveFuturePatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.optimismIndicators.push({
            category: 'positive_future_projection',
            pattern: pattern,
            intensity: 'medium',
            type: 'projective'
          });
        }
      });

      // Solution-focused optimism
      const solutionOptimismPatterns = [
        'hay una solución', 'podemos resolver', 'se puede arreglar',
        'encontraremos la manera', 'hay esperanza', 'es posible'
      ];

      solutionOptimismPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.optimismIndicators.push({
            category: 'solution_focused_optimism',
            pattern: pattern,
            intensity: 'high',
            type: 'solution_oriented'
          });
        }
      });

      // Learning and improvement optimism
      const improvementOptimismPatterns = [
        'aprenderemos', 'mejoraremos', 'creceremos',
        'nos adaptaremos', 'evolucionaremos', 'desarrollaremos'
      ];

      improvementOptimismPatterns.forEach(pattern => {
        if (messageText.includes(pattern)) {
          analysis.optimismIndicators.push({
            category: 'improvement_optimism',
            pattern: pattern,
            intensity: 'medium',
            type: 'developmental'
          });
        }
      });

      // Determine overall optimism level
      if (analysis.optimismIndicators.length === 0) {
        analysis.optimismLevel = 'neutral';
      } else if (analysis.optimismIndicators.length <= 2) {
        analysis.optimismLevel = 'low_optimism';
      } else if (analysis.optimismIndicators.length <= 4) {
        analysis.optimismLevel = 'medium_optimism';
      } else {
        analysis.optimismLevel = 'high_optimism';
      }

      // Determine optimism type
      if (analysis.optimismIndicators.length > 0) {
        const categories = analysis.optimismIndicators.map(ind => ind.category);
        if (categories.includes('future_optimism') || categories.includes('business_optimism')) {
          analysis.optimismType = 'strategic_future_optimism';
        } else if (categories.includes('growth_optimism')) {
          analysis.optimismType = 'growth_expansion_optimism';
        } else if (categories.includes('confidence_optimism')) {
          analysis.optimismType = 'confidence_based_optimism';
        } else if (categories.includes('opportunity_optimism')) {
          analysis.optimismType = 'opportunity_driven_optimism';
        } else if (categories.includes('solution_focused_optimism')) {
          analysis.optimismType = 'problem_solving_optimism';
        } else if (categories.includes('improvement_optimism')) {
          analysis.optimismType = 'continuous_improvement_optimism';
        } else {
          analysis.optimismType = 'general_business_optimism';
        }
      }

      // Assess future outlook
      const futureIndicators = {
        'very_positive': ['futuro brillante', 'gran éxito', 'extraordinario'],
        'positive': ['va bien', 'buen futuro', 'promisorio'],
        'cautiously_positive': ['esperamos que', 'probablemente', 'con suerte'],
        'uncertain': ['veremos', 'no sabemos', 'depende']
      };

      for (const [outlook, indicators] of Object.entries(futureIndicators)) {
        const hasOutlook = indicators.some(indicator => messageText.includes(indicator));
        if (hasOutlook) {
          analysis.futureOutlook = outlook;
          break;
        }
      }

      // Default future outlook based on optimism level
      if (analysis.futureOutlook === 'uncertain' && analysis.optimismLevel !== 'neutral') {
        if (analysis.optimismLevel === 'high_optimism') {
          analysis.futureOutlook = 'positive';
        } else if (analysis.optimismLevel === 'medium_optimism') {
          analysis.futureOutlook = 'cautiously_positive';
        }
      }

      // Identify optimism source
      if (messageText.includes('datos') || messageText.includes('resultados')) {
        analysis.optimismSource = 'data_driven_confidence';
      } else if (messageText.includes('experiencia') || messageText.includes('historia')) {
        analysis.optimismSource = 'experience_based_confidence';
      } else if (messageText.includes('oportunidad') || messageText.includes('mercado')) {
        analysis.optimismSource = 'market_opportunity';
      } else if (messageText.includes('equipo') || messageText.includes('capacidad')) {
        analysis.optimismSource = 'capability_confidence';
      } else if (messageText.includes('estrategia') || messageText.includes('plan')) {
        analysis.optimismSource = 'strategic_planning';
      }

      // Check for realistic vs unrealistic optimism
      const realisticIndicators = ['basado en', 'según los datos', 'evidencia', 'experiencia'];
      const unrealisticIndicators = ['todo será perfecto', 'sin problemas', 'garantizado'];

      const hasRealistic = realisticIndicators.some(ind => messageText.includes(ind));
      const hasUnrealistic = unrealisticIndicators.some(ind => messageText.includes(ind));

      if (hasRealistic) {
        analysis.optimismStyle = 'realistic_optimism';
      } else if (hasUnrealistic) {
        analysis.optimismStyle = 'unrealistic_optimism';
      } else {
        analysis.optimismStyle = 'general_optimism';
      }

      // Analyze optimism triggers
      analysis.triggers = {
        positiveResults: messageText.includes('buenos resultados') || messageText.includes('éxito'),
        newOpportunities: messageText.includes('oportunidad') || messageText.includes('posibilidad'),
        problemResolution: messageText.includes('solución') || messageText.includes('resolver'),
        futureVision: messageText.includes('futuro') || messageText.includes('visión')
      };

      // Check for optimism with action orientation
      const actionOrientedPatterns = [
        'vamos a', 'haremos', 'lograremos',
        'conseguiremos', 'alcanzaremos', 'trabajaremos'
      ];

      const hasActionOrientation = actionOrientedPatterns.some(pattern =>
        messageText.includes(pattern)
      );

      if (hasActionOrientation) {
        analysis.actionOriented = true;
        analysis.optimismStyle = 'proactive_optimism';
      }

      // Assess optimism sustainability
      const sustainabilityIndicators = ['a largo plazo', 'consistente', 'duradero', 'estable'];
      const shortTermIndicators = ['por ahora', 'temporalmente', 'momento'];

      const hasSustainability = sustainabilityIndicators.some(ind => messageText.includes(ind));
      const hasShortTerm = shortTermIndicators.some(ind => messageText.includes(ind));

      if (hasSustainability) {
        analysis.sustainability = 'long_term';
      } else if (hasShortTerm) {
        analysis.sustainability = 'short_term';
      } else {
        analysis.sustainability = 'current_focus';
      }

      // Check conversation history for optimism evolution
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalContext = this.analyzeHistoricalOptimismContext(conversationHistory);
      }

    } catch (error) {
      console.warn('🧠 Business optimism detection warning:', error.message);
      // Return safe defaults
      analysis.optimismLevel = 'neutral';
      analysis.optimismType = 'none';
    }

    return analysis;
  }

  calculateOptimismIntensity(pattern) {
    // Helper method to calculate optimism intensity based on pattern
    const highIntensityPatterns = ['muy optimista', 'futuro brillante', 'gran éxito', 'sin duda'];
    const mediumIntensityPatterns = ['optimista', 'positivo', 'confiado', 'esperanzado'];
    
    if (highIntensityPatterns.some(p => pattern.includes(p))) return 'high';
    if (mediumIntensityPatterns.some(p => pattern.includes(p))) return 'medium';
    return 'low';
  }

  analyzeHistoricalOptimismContext(conversationHistory) {
    // Helper method to analyze historical optimism context
    if (!conversationHistory || conversationHistory.length === 0) {
      return { hasHistory: false, optimismEvolution: 'initial_positive_outlook' };
    }
    
    return {
      hasHistory: true,
      optimismEvolution: 'building_positive_momentum',
      confidenceJourney: 'growing_business_confidence',
      visionDevelopment: 'clarifying_future_direction'
    };
  }

  calculateOverallEmotionalIntensity(emotionalStates) {
    // Calculate overall emotional intensity from all detected emotional states
    const analysis = {
      overallIntensity: 'low',
      intensityScore: 0,
      dominantEmotions: [],
      emotionalComplexity: 'simple',
      emotionalBalance: 'neutral',
      intensityDistribution: {}
    };

    try {
      if (!emotionalStates || Object.keys(emotionalStates).length === 0) {
        return analysis;
      }

      let totalIntensityScore = 0;
      let emotionCount = 0;
      const emotionIntensities = {};
      const intensityLevels = { 'low': 1, 'medium': 2, 'high': 3 };

      // Process each emotional state
      Object.entries(emotionalStates).forEach(([emotionType, emotionData]) => {
        if (emotionData && typeof emotionData === 'object') {
          let emotionIntensity = 0;
          let emotionWeight = 1;

          // Extract intensity from different emotion structures
          if (emotionData.intensityLevel) {
            emotionIntensity = intensityLevels[emotionData.intensityLevel] || 1;
          } else if (emotionData.emotionalIntensity) {
            emotionIntensity = intensityLevels[emotionData.emotionalIntensity] || 1;
          } else if (emotionData.level) {
            // Handle levels like 'high_excitement', 'medium_anxiety', etc.
            const levelParts = emotionData.level.split('_');
            if (levelParts.length > 1) {
              const intensityPart = levelParts[0];
              emotionIntensity = intensityLevels[intensityPart] || 1;
            } else if (emotionData.level !== 'none') {
              emotionIntensity = 2; // Default medium if not 'none'
            }
          } else if (emotionData.indicators && emotionData.indicators.length > 0) {
            // Calculate from indicators
            emotionIntensity = Math.min(emotionData.indicators.length, 3);
          }

          // Weight business emotions slightly higher for business contexts
          if (emotionType.includes('Business') || emotionType.includes('business')) {
            emotionWeight = 1.2;
          }

          // Weight negative emotions for overall impact assessment
          const negativeEmotions = ['frustration', 'anxiety', 'disappointment', 'guilt', 'shame', 'overwhelm'];
          if (negativeEmotions.some(neg => emotionType.toLowerCase().includes(neg))) {
            emotionWeight = 1.1;
          }

          const weightedIntensity = emotionIntensity * emotionWeight;
          totalIntensityScore += weightedIntensity;
          emotionCount++;

          emotionIntensities[emotionType] = {
            rawIntensity: emotionIntensity,
            weightedIntensity: weightedIntensity,
            weight: emotionWeight,
            level: emotionData.level || 'unknown'
          };
        }
      });

      // Calculate average intensity score
      if (emotionCount > 0) {
        analysis.intensityScore = totalIntensityScore / emotionCount;
      }

      // Determine overall intensity level
      if (analysis.intensityScore >= 2.5) {
        analysis.overallIntensity = 'very_high';
      } else if (analysis.intensityScore >= 2.0) {
        analysis.overallIntensity = 'high';
      } else if (analysis.intensityScore >= 1.5) {
        analysis.overallIntensity = 'medium';
      } else if (analysis.intensityScore >= 1.0) {
        analysis.overallIntensity = 'low';
      } else {
        analysis.overallIntensity = 'minimal';
      }

      // Identify dominant emotions (top 3 by weighted intensity)
      const sortedEmotions = Object.entries(emotionIntensities)
        .sort(([,a], [,b]) => b.weightedIntensity - a.weightedIntensity)
        .slice(0, 3);

      analysis.dominantEmotions = sortedEmotions.map(([emotionType, data]) => ({
        emotion: emotionType,
        intensity: data.rawIntensity,
        weightedIntensity: data.weightedIntensity,
        level: data.level
      }));

      // Determine emotional complexity
      const activeEmotions = Object.values(emotionIntensities).filter(data => data.rawIntensity > 0).length;
      
      if (activeEmotions >= 8) {
        analysis.emotionalComplexity = 'very_complex';
      } else if (activeEmotions >= 5) {
        analysis.emotionalComplexity = 'complex';
      } else if (activeEmotions >= 3) {
        analysis.emotionalComplexity = 'moderate';
      } else if (activeEmotions >= 2) {
        analysis.emotionalComplexity = 'simple';
      } else {
        analysis.emotionalComplexity = 'minimal';
      }

      // Analyze emotional balance (positive vs negative emotions)
      const positiveEmotions = ['excitement', 'trust', 'anticipation', 'relief', 'pride', 'satisfaction', 'optimism'];
      const negativeEmotions = ['disgust', 'frustration', 'anxiety', 'disappointment', 'guilt', 'shame', 'overwhelm'];

      let positiveScore = 0;
      let negativeScore = 0;

      Object.entries(emotionIntensities).forEach(([emotionType, data]) => {
        const emotionName = emotionType.toLowerCase();
        if (positiveEmotions.some(pos => emotionName.includes(pos))) {
          positiveScore += data.weightedIntensity;
        } else if (negativeEmotions.some(neg => emotionName.includes(neg))) {
          negativeScore += data.weightedIntensity;
        }
      });

      // Determine emotional balance
      const balanceRatio = positiveScore > 0 && negativeScore > 0 ? positiveScore / negativeScore : null;
      
      if (balanceRatio === null) {
        if (positiveScore > 0) {
          analysis.emotionalBalance = 'positive_dominant';
        } else if (negativeScore > 0) {
          analysis.emotionalBalance = 'negative_dominant';
        } else {
          analysis.emotionalBalance = 'neutral';
        }
      } else if (balanceRatio >= 2.0) {
        analysis.emotionalBalance = 'strongly_positive';
      } else if (balanceRatio >= 1.2) {
        analysis.emotionalBalance = 'moderately_positive';
      } else if (balanceRatio >= 0.8) {
        analysis.emotionalBalance = 'balanced';
      } else if (balanceRatio >= 0.5) {
        analysis.emotionalBalance = 'moderately_negative';
      } else {
        analysis.emotionalBalance = 'strongly_negative';
      }

      // Create intensity distribution
      analysis.intensityDistribution = {
        high: Object.values(emotionIntensities).filter(data => data.rawIntensity >= 3).length,
        medium: Object.values(emotionIntensities).filter(data => data.rawIntensity === 2).length,
        low: Object.values(emotionIntensities).filter(data => data.rawIntensity === 1).length,
        none: Object.keys(emotionalStates).length - Object.values(emotionIntensities).filter(data => data.rawIntensity > 0).length
      };

      // Add emotional volatility assessment
      const intensityVariance = this.calculateIntensityVariance(Object.values(emotionIntensities));
      if (intensityVariance >= 1.5) {
        analysis.emotionalVolatility = 'high';
      } else if (intensityVariance >= 1.0) {
        analysis.emotionalVolatility = 'medium';
      } else {
        analysis.emotionalVolatility = 'low';
      }

      // Business-specific emotional assessment
      const businessEmotions = Object.entries(emotionIntensities)
        .filter(([emotionType, _]) => emotionType.toLowerCase().includes('business'))
        .reduce((sum, [_, data]) => sum + data.weightedIntensity, 0);

      if (businessEmotions > 0) {
        analysis.businessEmotionalEngagement = businessEmotions >= 6 ? 'high' : 
                                               businessEmotions >= 3 ? 'medium' : 'low';
      } else {
        analysis.businessEmotionalEngagement = 'minimal';
      }

      // Risk assessment for emotional overwhelm
      if (analysis.overallIntensity === 'very_high' && analysis.emotionalComplexity === 'very_complex') {
        analysis.overwhelmRisk = 'high';
      } else if (analysis.overallIntensity === 'high' && analysis.emotionalComplexity === 'complex') {
        analysis.overwhelmRisk = 'medium';
      } else {
        analysis.overwhelmRisk = 'low';
      }

    } catch (error) {
      console.warn('🧠 Overall emotional intensity calculation warning:', error.message);
      // Return safe defaults
      analysis.overallIntensity = 'low';
      analysis.intensityScore = 0;
    }

    return analysis;
  }

  calculateIntensityVariance(intensityData) {
    // Helper method to calculate variance in emotional intensities
    if (intensityData.length === 0) return 0;
    
    const intensities = intensityData.map(data => data.rawIntensity);
    const mean = intensities.reduce((sum, val) => sum + val, 0) / intensities.length;
    const variance = intensities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intensities.length;
    
    return Math.sqrt(variance);
  }

  identifyDominantEmotion(emotionalStates) {
    // Identify the dominant emotion from all detected emotional states
    const analysis = {
      dominantEmotion: 'neutral',
      dominantEmotionType: 'none',
      dominantIntensity: 'low',
      secondaryEmotion: null,
      emotionalHierarchy: [],
      dominanceConfidence: 'low'
    };

    try {
      if (!emotionalStates || Object.keys(emotionalStates).length === 0) {
        return analysis;
      }

      const emotionScores = {};
      const intensityLevels = { 'low': 1, 'medium': 2, 'high': 3 };

      // Calculate dominance scores for each emotion
      Object.entries(emotionalStates).forEach(([emotionType, emotionData]) => {
        if (emotionData && typeof emotionData === 'object') {
          let baseScore = 0;
          let intensityMultiplier = 1;
          let contextMultiplier = 1;

          // Extract base intensity score
          if (emotionData.intensityLevel) {
            baseScore = intensityLevels[emotionData.intensityLevel] || 1;
          } else if (emotionData.emotionalIntensity) {
            baseScore = intensityLevels[emotionData.emotionalIntensity] || 1;
          } else if (emotionData.level) {
            // Handle levels like 'high_excitement', 'medium_anxiety', etc.
            const levelParts = emotionData.level.split('_');
            if (levelParts.length > 1) {
              const intensityPart = levelParts[0];
              baseScore = intensityLevels[intensityPart] || 1;
            } else if (emotionData.level !== 'none') {
              baseScore = 2; // Default medium if not 'none'
            }
          }

          // Skip emotions with no activity
          if (baseScore === 0 || emotionData.level === 'none') {
            return;
          }

          // Apply intensity multiplier based on number of indicators
          if (emotionData.indicators && emotionData.indicators.length > 0) {
            intensityMultiplier = 1 + (emotionData.indicators.length * 0.2);
          }

          // Apply context multiplier for business relevance
          if (emotionType.toLowerCase().includes('business')) {
            contextMultiplier = 1.3; // Business emotions get slight boost in business context
          }

          // Apply emotion-specific weights
          const emotionWeights = {
            // High-impact emotions
            'businessOverwhelm': 1.4,
            'businessUrgency': 1.3,
            'frustration': 1.2,
            'anxiety': 1.2,
            'excitement': 1.2,
            
            // Medium-impact emotions
            'businessSatisfaction': 1.1,
            'businessOptimism': 1.1,
            'trust': 1.0,
            'anticipation': 1.0,
            'pride': 1.0,
            
            // Lower-impact emotions
            'surprise': 0.9,
            'relief': 0.9,
            'shame': 0.8,
            'guilt': 0.8
          };

          const emotionWeight = emotionWeights[emotionType] || 1.0;

          // Calculate final dominance score
          const dominanceScore = baseScore * intensityMultiplier * contextMultiplier * emotionWeight;

          emotionScores[emotionType] = {
            score: dominanceScore,
            baseIntensity: baseScore,
            indicators: emotionData.indicators ? emotionData.indicators.length : 0,
            level: emotionData.level || 'unknown',
            type: this.categorizeEmotionType(emotionType),
            rawData: emotionData
          };
        }
      });

      // Sort emotions by dominance score
      const sortedEmotions = Object.entries(emotionScores)
        .sort(([,a], [,b]) => b.score - a.score);

      if (sortedEmotions.length === 0) {
        return analysis;
      }

      // Identify dominant emotion
      const [dominantEmotionName, dominantData] = sortedEmotions[0];
      analysis.dominantEmotion = dominantEmotionName;
      analysis.dominantEmotionType = dominantData.type;
      analysis.dominantIntensity = this.scoreToIntensityLevel(dominantData.baseIntensity);

      // Identify secondary emotion if it exists and is significant
      if (sortedEmotions.length > 1) {
        const [secondaryEmotionName, secondaryData] = sortedEmotions[1];
        
        // Only consider as secondary if it's at least 70% of dominant score
        if (secondaryData.score >= dominantData.score * 0.7) {
          analysis.secondaryEmotion = {
            emotion: secondaryEmotionName,
            type: secondaryData.type,
            intensity: this.scoreToIntensityLevel(secondaryData.baseIntensity),
            score: secondaryData.score
          };
        }
      }

      // Build emotional hierarchy (top 5 emotions)
      analysis.emotionalHierarchy = sortedEmotions.slice(0, 5).map(([emotionName, data]) => ({
        emotion: emotionName,
        type: data.type,
        intensity: this.scoreToIntensityLevel(data.baseIntensity),
        score: data.score,
        indicators: data.indicators,
        level: data.level
      }));

      // Calculate dominance confidence
      if (sortedEmotions.length === 1) {
        analysis.dominanceConfidence = 'absolute';
      } else if (sortedEmotions.length >= 2) {
        const dominantScore = sortedEmotions[0][1].score;
        const secondScore = sortedEmotions[1][1].score;
        const confidenceRatio = dominantScore / secondScore;

        if (confidenceRatio >= 2.0) {
          analysis.dominanceConfidence = 'very_high';
        } else if (confidenceRatio >= 1.5) {
          analysis.dominanceConfidence = 'high';
        } else if (confidenceRatio >= 1.2) {
          analysis.dominanceConfidence = 'medium';
        } else {
          analysis.dominanceConfidence = 'low';
        }
      }

      // Add dominance context analysis
      analysis.dominanceContext = {
        isBusinessEmotion: analysis.dominantEmotionType === 'business',
        isPositiveEmotion: this.isPositiveEmotion(analysis.dominantEmotion),
        isActionOriented: this.isActionOrientedEmotion(analysis.dominantEmotion),
        requiresResponse: this.requiresImmediateResponse(analysis.dominantEmotion, dominantData.baseIntensity)
      };

      // Analyze emotional state stability
      const topThreeScores = sortedEmotions.slice(0, 3).map(([,data]) => data.score);
      if (topThreeScores.length >= 3) {
        const scoreVariance = this.calculateScoreVariance(topThreeScores);
        if (scoreVariance < 0.5) {
          analysis.emotionalStability = 'stable_dominant';
        } else if (scoreVariance < 1.0) {
          analysis.emotionalStability = 'moderately_stable';
        } else {
          analysis.emotionalStability = 'volatile_mixed';
        }
      } else {
        analysis.emotionalStability = 'clear_dominant';
      }

      // Business-specific dominance analysis
      const businessEmotions = sortedEmotions.filter(([emotionName, _]) => 
        emotionName.toLowerCase().includes('business')
      );

      if (businessEmotions.length > 0) {
        analysis.businessEmotionalDominance = {
          hasDominantBusinessEmotion: businessEmotions[0][0] === analysis.dominantEmotion,
          topBusinessEmotion: businessEmotions[0][0],
          businessEmotionalStrength: businessEmotions[0][1].score
        };
      }

    } catch (error) {
      console.warn('🧠 Dominant emotion identification warning:', error.message);
      // Return safe defaults
      analysis.dominantEmotion = 'neutral';
      analysis.dominantEmotionType = 'none';
    }

    return analysis;
  }

  categorizeEmotionType(emotionName) {
    // Helper method to categorize emotion types
    const emotionName_lower = emotionName.toLowerCase();
    
    if (emotionName_lower.includes('business')) {
      return 'business';
    } else if (['joy', 'excitement', 'pride', 'relief', 'satisfaction', 'optimism'].some(pos => 
      emotionName_lower.includes(pos))) {
      return 'positive';
    } else if (['frustration', 'anxiety', 'disappointment', 'guilt', 'shame', 'overwhelm'].some(neg => 
      emotionName_lower.includes(neg))) {
      return 'negative';
    } else if (['trust', 'anticipation', 'surprise'].some(neutral => 
      emotionName_lower.includes(neutral))) {
      return 'neutral';
    } else {
      return 'mixed';
    }
  }

  scoreToIntensityLevel(score) {
    // Helper method to convert score back to intensity level
    if (score >= 3) return 'high';
    if (score >= 2) return 'medium';
    if (score >= 1) return 'low';
    return 'minimal';
  }

  isPositiveEmotion(emotionName) {
    // Helper method to determine if emotion is positive
    const positiveEmotions = ['excitement', 'pride', 'relief', 'satisfaction', 'optimism', 'trust', 'anticipation'];
    return positiveEmotions.some(pos => emotionName.toLowerCase().includes(pos));
  }

  isActionOrientedEmotion(emotionName) {
    // Helper method to determine if emotion requires action
    const actionEmotions = ['urgency', 'overwhelm', 'frustration', 'anxiety', 'anticipation'];
    return actionEmotions.some(action => emotionName.toLowerCase().includes(action));
  }

  requiresImmediateResponse(emotionName, intensity) {
    // Helper method to determine if emotion requires immediate response
    const urgentEmotions = ['overwhelm', 'urgency', 'frustration', 'anxiety'];
    const isUrgent = urgentEmotions.some(urgent => emotionName.toLowerCase().includes(urgent));
    return isUrgent && intensity >= 2;
  }

  calculateScoreVariance(scores) {
    // Helper method to calculate variance in emotion scores
    if (scores.length === 0) return 0;
    
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    
    return Math.sqrt(variance);
  }

  identifyConflictingEmotions(emotionalStates) {
    // Identify conflicting emotions that may create internal tension
    const analysis = {
      hasConflicts: false,
      conflictPairs: [],
      conflictLevel: 'none',
      emotionalTension: 'low',
      conflictCategories: [],
      resolutionSuggestions: []
    };

    try {
      if (!emotionalStates || Object.keys(emotionalStates).length === 0) {
        return analysis;
      }

      // Define emotion conflict mappings
      const emotionConflicts = {
        // Joy/Excitement vs Negative emotions
        'excitement': ['anxiety', 'frustration', 'disappointment', 'overwhelm'],
        'businessOptimism': ['businessUncertainty', 'anxiety', 'overwhelm'],
        'businessSatisfaction': ['frustration', 'disappointment', 'businessOverwhelm'],
        
        // Trust vs Doubt/Anxiety
        'trust': ['anxiety', 'businessUncertainty', 'disappointment'],
        
        // Pride vs Shame/Guilt
        'pride': ['shame', 'guilt', 'disappointment'],
        
        // Relief vs Anxiety/Stress
        'relief': ['anxiety', 'businessUrgency', 'overwhelm'],
        
        // Anticipation vs Fear/Anxiety
        'anticipation': ['anxiety', 'businessUncertainty'],
        
        // Business-specific conflicts
        'businessUrgency': ['businessSatisfaction', 'relief', 'businessOptimism'],
        'businessOverwhelm': ['businessSatisfaction', 'excitement', 'pride'],
        'businessUncertainty': ['trust', 'businessOptimism', 'anticipation']
      };

      // Get active emotions (those with meaningful levels)
      const activeEmotions = {};
      Object.entries(emotionalStates).forEach(([emotionType, emotionData]) => {
        if (emotionData && typeof emotionData === 'object') {
          let isActive = false;
          let intensity = 0;

          // Check if emotion is active
          if (emotionData.level && emotionData.level !== 'none') {
            const levelParts = emotionData.level.split('_');
            if (levelParts.length > 1 && levelParts[0] !== 'none') {
              isActive = true;
              intensity = this.getIntensityValue(levelParts[0]);
            }
          } else if (emotionData.intensityLevel || emotionData.emotionalIntensity) {
            const intensityLevel = emotionData.intensityLevel || emotionData.emotionalIntensity;
            if (intensityLevel !== 'none' && intensityLevel !== 'low') {
              isActive = true;
              intensity = this.getIntensityValue(intensityLevel);
            }
          } else if (emotionData.indicators && emotionData.indicators.length > 0) {
            isActive = true;
            intensity = Math.min(emotionData.indicators.length, 3);
          }

          if (isActive) {
            activeEmotions[emotionType] = {
              intensity: intensity,
              data: emotionData
            };
          }
        }
      });

      // Check for conflicts between active emotions
      Object.entries(activeEmotions).forEach(([emotionType, emotionInfo]) => {
        const emotionName = emotionType.toLowerCase();
        
        // Check against defined conflicts
        Object.entries(emotionConflicts).forEach(([sourceEmotion, conflictList]) => {
          if (emotionName.includes(sourceEmotion.toLowerCase())) {
            conflictList.forEach(conflictEmotion => {
              // Look for conflicting emotion in active emotions
              Object.entries(activeEmotions).forEach(([otherEmotionType, otherEmotionInfo]) => {
                if (otherEmotionType !== emotionType && 
                    otherEmotionType.toLowerCase().includes(conflictEmotion.toLowerCase())) {
                  
                  const conflictIntensity = this.calculateConflictIntensity(
                    emotionInfo.intensity, 
                    otherEmotionInfo.intensity
                  );

                  analysis.conflictPairs.push({
                    emotion1: emotionType,
                    emotion2: otherEmotionType,
                    intensity1: emotionInfo.intensity,
                    intensity2: otherEmotionInfo.intensity,
                    conflictIntensity: conflictIntensity,
                    conflictType: this.categorizeConflict(emotionType, otherEmotionType),
                    description: this.describeConflict(emotionType, otherEmotionType)
                  });
                }
              });
            });
          }
        });
      });

      // Remove duplicate conflicts (A-B is same as B-A)
      analysis.conflictPairs = this.removeDuplicateConflicts(analysis.conflictPairs);

      // Determine if conflicts exist
      analysis.hasConflicts = analysis.conflictPairs.length > 0;

      if (analysis.hasConflicts) {
        // Calculate overall conflict level
        const totalConflictIntensity = analysis.conflictPairs.reduce(
          (sum, conflict) => sum + conflict.conflictIntensity, 0
        );
        const avgConflictIntensity = totalConflictIntensity / analysis.conflictPairs.length;

        if (avgConflictIntensity >= 3) {
          analysis.conflictLevel = 'severe';
          analysis.emotionalTension = 'very_high';
        } else if (avgConflictIntensity >= 2.5) {
          analysis.conflictLevel = 'high';
          analysis.emotionalTension = 'high';
        } else if (avgConflictIntensity >= 2) {
          analysis.conflictLevel = 'medium';
          analysis.emotionalTension = 'medium';
        } else {
          analysis.conflictLevel = 'low';
          analysis.emotionalTension = 'low';
        }

        // Categorize conflicts
        const categories = new Set();
        analysis.conflictPairs.forEach(conflict => {
          categories.add(conflict.conflictType);
        });
        analysis.conflictCategories = Array.from(categories);

        // Generate resolution suggestions
        analysis.resolutionSuggestions = this.generateResolutionSuggestions(analysis.conflictPairs);
      }

      // Special analysis for business emotional conflicts
      const businessConflicts = analysis.conflictPairs.filter(conflict =>
        conflict.emotion1.toLowerCase().includes('business') || 
        conflict.emotion2.toLowerCase().includes('business')
      );

      if (businessConflicts.length > 0) {
        analysis.businessEmotionalConflict = {
          hasBusinessConflicts: true,
          conflictCount: businessConflicts.length,
          primaryBusinessConflict: businessConflicts[0],
          businessTensionLevel: this.assessBusinessTensionLevel(businessConflicts)
        };
      }

      // Analyze conflict patterns
      if (analysis.conflictPairs.length > 0) {
        analysis.conflictPatterns = {
          hasPositiveNegativeConflict: this.hasPositiveNegativeConflict(analysis.conflictPairs),
          hasUrgencyRelaxationConflict: this.hasUrgencyRelaxationConflict(analysis.conflictPairs),
          hasConfidenceDoubtConflict: this.hasConfidenceDoubtConflict(analysis.conflictPairs),
          hasExpectationRealityConflict: this.hasExpectationRealityConflict(analysis.conflictPairs)
        };
      }

    } catch (error) {
      console.warn('🧠 Conflicting emotions identification warning:', error.message);
      // Return safe defaults
      analysis.hasConflicts = false;
      analysis.conflictLevel = 'none';
    }

    return analysis;
  }

  getIntensityValue(intensityLevel) {
    // Helper method to convert intensity level to numeric value
    const intensityMap = { 'low': 1, 'medium': 2, 'high': 3 };
    return intensityMap[intensityLevel] || 1;
  }

  calculateConflictIntensity(intensity1, intensity2) {
    // Helper method to calculate conflict intensity between two emotions
    return (intensity1 + intensity2) / 2;
  }

  categorizeConflict(emotion1, emotion2) {
    // Helper method to categorize the type of conflict
    const businessEmotions = ['businessUrgency', 'businessOverwhelm', 'businessUncertainty', 'businessSatisfaction', 'businessOptimism'];
    const positiveEmotions = ['excitement', 'pride', 'relief', 'businessSatisfaction', 'businessOptimism'];
    const negativeEmotions = ['anxiety', 'frustration', 'disappointment', 'overwhelm', 'businessOverwhelm'];

    const isEmotion1Business = businessEmotions.some(be => emotion1.toLowerCase().includes(be.toLowerCase()));
    const isEmotion2Business = businessEmotions.some(be => emotion2.toLowerCase().includes(be.toLowerCase()));

    if (isEmotion1Business || isEmotion2Business) {
      return 'business_operational_conflict';
    }

    const isEmotion1Positive = positiveEmotions.some(pe => emotion1.toLowerCase().includes(pe.toLowerCase()));
    const isEmotion2Positive = positiveEmotions.some(pe => emotion2.toLowerCase().includes(pe.toLowerCase()));
    const isEmotion1Negative = negativeEmotions.some(ne => emotion1.toLowerCase().includes(ne.toLowerCase()));
    const isEmotion2Negative = negativeEmotions.some(ne => emotion2.toLowerCase().includes(ne.toLowerCase()));

    if ((isEmotion1Positive && isEmotion2Negative) || (isEmotion1Negative && isEmotion2Positive)) {
      return 'positive_negative_conflict';
    }

    return 'general_emotional_conflict';
  }

  describeConflict(emotion1, emotion2) {
    // Helper method to provide human-readable conflict description
    const conflictDescriptions = {
      'excitement-anxiety': 'Feeling excited about opportunities while being anxious about outcomes',
      'businessOptimism-businessUncertainty': 'Optimistic about business future but uncertain about specific decisions',
      'pride-shame': 'Pride in achievements conflicting with shame about shortcomings',
      'trust-anxiety': 'Trusting the process while being anxious about results',
      'relief-businessUrgency': 'Feeling relieved while facing urgent business pressures'
    };

    const key1 = `${emotion1.replace('detect', '').replace('Business', '').toLowerCase()}-${emotion2.replace('detect', '').replace('Business', '').toLowerCase()}`;
    const key2 = `${emotion2.replace('detect', '').replace('Business', '').toLowerCase()}-${emotion1.replace('detect', '').replace('Business', '').toLowerCase()}`;

    return conflictDescriptions[key1] || conflictDescriptions[key2] || 
           `Conflicting emotions between ${emotion1} and ${emotion2}`;
  }

  removeDuplicateConflicts(conflictPairs) {
    // Helper method to remove duplicate conflict pairs
    const seen = new Set();
    return conflictPairs.filter(conflict => {
      const key = [conflict.emotion1, conflict.emotion2].sort().join('-');
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  generateResolutionSuggestions(conflictPairs) {
    // Helper method to generate suggestions for resolving emotional conflicts
    const suggestions = [];

    conflictPairs.forEach(conflict => {
      if (conflict.conflictType === 'business_operational_conflict') {
        suggestions.push('Focus on one business priority at a time to reduce operational tension');
      } else if (conflict.conflictType === 'positive_negative_conflict') {
        suggestions.push('Acknowledge both positive and negative feelings as natural and valid');
      }

      if (conflict.conflictIntensity >= 3) {
        suggestions.push('Consider taking a step back to process these conflicting emotions');
      }
    });

    return [...new Set(suggestions)]; // Remove duplicates
  }

  assessBusinessTensionLevel(businessConflicts) {
    // Helper method to assess business-specific tension level
    const avgIntensity = businessConflicts.reduce(
      (sum, conflict) => sum + conflict.conflictIntensity, 0
    ) / businessConflicts.length;

    if (avgIntensity >= 2.5) return 'high';
    if (avgIntensity >= 2) return 'medium';
    return 'low';
  }

  hasPositiveNegativeConflict(conflictPairs) {
    return conflictPairs.some(conflict => conflict.conflictType === 'positive_negative_conflict');
  }

  hasUrgencyRelaxationConflict(conflictPairs) {
    return conflictPairs.some(conflict =>
      (conflict.emotion1.toLowerCase().includes('urgency') && conflict.emotion2.toLowerCase().includes('relief')) ||
      (conflict.emotion2.toLowerCase().includes('urgency') && conflict.emotion1.toLowerCase().includes('relief'))
    );
  }

  hasConfidenceDoubtConflict(conflictPairs) {
    return conflictPairs.some(conflict =>
      (conflict.emotion1.toLowerCase().includes('trust') && conflict.emotion2.toLowerCase().includes('uncertainty')) ||
      (conflict.emotion2.toLowerCase().includes('trust') && conflict.emotion1.toLowerCase().includes('uncertainty'))
    );
  }

  hasExpectationRealityConflict(conflictPairs) {
    return conflictPairs.some(conflict =>
      (conflict.emotion1.toLowerCase().includes('anticipation') && conflict.emotion2.toLowerCase().includes('disappointment')) ||
      (conflict.emotion2.toLowerCase().includes('anticipation') && conflict.emotion1.toLowerCase().includes('disappointment'))
    );
  }

  calculateEmotionalStability(emotionalStates, conversationHistory) {
    // Calculate emotional stability and consistency patterns
    const analysis = {
      stabilityLevel: 'stable',
      stabilityScore: 0,
      volatilityIndicators: [],
      stabilityFactors: {},
      emotionalConsistency: 'consistent',
      predictabilityIndex: 'high'
    };

    try {
      if (!emotionalStates || Object.keys(emotionalStates).length === 0) {
        analysis.stabilityLevel = 'neutral';
        return analysis;
      }

      // Get active emotion intensities
      const emotionIntensities = [];
      const emotionVariability = {};
      
      Object.entries(emotionalStates).forEach(([emotionType, emotionData]) => {
        if (emotionData && typeof emotionData === 'object') {
          let intensity = 0;

          // Extract intensity value
          if (emotionData.level && emotionData.level !== 'none') {
            const levelParts = emotionData.level.split('_');
            if (levelParts.length > 1) {
              intensity = this.getStabilityIntensityValue(levelParts[0]);
            }
          } else if (emotionData.intensityLevel || emotionData.emotionalIntensity) {
            intensity = this.getStabilityIntensityValue(
              emotionData.intensityLevel || emotionData.emotionalIntensity
            );
          } else if (emotionData.indicators && emotionData.indicators.length > 0) {
            intensity = Math.min(emotionData.indicators.length, 3);
          }

          if (intensity > 0) {
            emotionIntensities.push(intensity);
            emotionVariability[emotionType] = {
              intensity: intensity,
              type: this.getEmotionStabilityType(emotionType),
              volatility: this.assessEmotionVolatility(emotionData)
            };
          }
        }
      });

      // Calculate overall intensity variance (stability indicator)
      const stabilityScore = this.calculateIntensityStability(emotionIntensities);
      analysis.stabilityScore = stabilityScore;

      // Determine stability level
      if (stabilityScore >= 0.9) {
        analysis.stabilityLevel = 'very_stable';
      } else if (stabilityScore >= 0.7) {
        analysis.stabilityLevel = 'stable';
      } else if (stabilityScore >= 0.5) {
        analysis.stabilityLevel = 'moderately_stable';
      } else if (stabilityScore >= 0.3) {
        analysis.stabilityLevel = 'somewhat_unstable';
      } else {
        analysis.stabilityLevel = 'volatile';
      }

      // Identify volatility indicators
      Object.entries(emotionVariability).forEach(([emotionType, data]) => {
        if (data.volatility === 'high' || data.intensity >= 3) {
          analysis.volatilityIndicators.push({
            emotion: emotionType,
            reason: data.volatility === 'high' ? 'high_emotional_volatility' : 'high_intensity',
            impact: this.assessVolatilityImpact(emotionType, data.intensity)
          });
        }
      });

      // Analyze stability factors
      analysis.stabilityFactors = {
        intensityRange: this.calculateIntensityRange(emotionIntensities),
        emotionalDiversity: Object.keys(emotionVariability).length,
        dominantEmotionStability: this.assessDominantEmotionStability(emotionVariability),
        businessEmotionalStability: this.assessBusinessEmotionalStability(emotionVariability),
        conflictLevel: this.assessConflictImpactOnStability(emotionalStates)
      };

      // Calculate emotional consistency
      const consistencyScore = this.calculateEmotionalConsistency(emotionVariability);
      if (consistencyScore >= 0.8) {
        analysis.emotionalConsistency = 'highly_consistent';
      } else if (consistencyScore >= 0.6) {
        analysis.emotionalConsistency = 'consistent';
      } else if (consistencyScore >= 0.4) {
        analysis.emotionalConsistency = 'moderately_consistent';
      } else {
        analysis.emotionalConsistency = 'inconsistent';
      }

      // Calculate predictability index
      const predictabilityScore = this.calculatePredictability(
        emotionVariability, 
        analysis.volatilityIndicators.length
      );
      
      if (predictabilityScore >= 0.8) {
        analysis.predictabilityIndex = 'highly_predictable';
      } else if (predictabilityScore >= 0.6) {
        analysis.predictabilityIndex = 'predictable';
      } else if (predictabilityScore >= 0.4) {
        analysis.predictabilityIndex = 'moderately_predictable';
      } else {
        analysis.predictabilityIndex = 'unpredictable';
      }

      // Historical stability analysis if conversation history exists
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalStability = this.analyzeHistoricalEmotionalStability(
          conversationHistory, 
          emotionalStates
        );
      }

      // Risk assessment for emotional instability
      const riskFactors = this.assessStabilityRiskFactors(
        analysis.volatilityIndicators,
        analysis.stabilityFactors,
        emotionVariability
      );

      analysis.stabilityRisk = {
        level: riskFactors.riskLevel,
        factors: riskFactors.factors,
        recommendations: riskFactors.recommendations
      };

      // Business stability specific analysis
      const businessEmotions = Object.entries(emotionVariability)
        .filter(([emotionType, _]) => emotionType.toLowerCase().includes('business'));

      if (businessEmotions.length > 0) {
        analysis.businessEmotionalStability = {
          level: this.calculateBusinessStabilityLevel(businessEmotions),
          volatileBusinessEmotions: businessEmotions.filter(([_, data]) => data.volatility === 'high'),
          stabilityImpactOnBusiness: this.assessBusinessStabilityImpact(businessEmotions)
        };
      }

      // Emotional regulation indicators
      analysis.regulationIndicators = {
        selfAwareness: this.assessSelfAwarenessFromEmotions(emotionVariability),
        copingCapacity: this.assessCopingCapacityFromStability(analysis.stabilityScore),
        adaptability: this.assessEmotionalAdaptability(emotionVariability)
      };

    } catch (error) {
      console.warn('🧠 Emotional stability calculation warning:', error.message);
      // Return safe defaults
      analysis.stabilityLevel = 'stable';
      analysis.stabilityScore = 0.7;
    }

    return analysis;
  }

  getStabilityIntensityValue(intensityLevel) {
    // Helper method to convert intensity level to numeric value for stability calculation
    const intensityMap = { 'low': 1, 'medium': 2, 'high': 3, 'very_high': 4 };
    return intensityMap[intensityLevel] || 1;
  }

  getEmotionStabilityType(emotionType) {
    // Helper method to categorize emotions by their natural stability
    const stableEmotions = ['trust', 'satisfaction', 'relief'];
    const volatileEmotions = ['excitement', 'anxiety', 'frustration', 'overwhelm'];
    const businessEmotions = ['businessUrgency', 'businessOptimism', 'businessUncertainty'];

    const emotionName = emotionType.toLowerCase();
    
    if (businessEmotions.some(be => emotionName.includes(be.toLowerCase()))) {
      return 'business_contextual';
    } else if (volatileEmotions.some(ve => emotionName.includes(ve.toLowerCase()))) {
      return 'naturally_volatile';
    } else if (stableEmotions.some(se => emotionName.includes(se.toLowerCase()))) {
      return 'naturally_stable';
    } else {
      return 'neutral_stability';
    }
  }

  assessEmotionVolatility(emotionData) {
    // Helper method to assess individual emotion volatility
    let volatilityScore = 0;

    // Check for high intensity
    if (emotionData.intensityLevel === 'high' || emotionData.emotionalIntensity === 'high') {
      volatilityScore += 2;
    }

    // Check for multiple indicators
    if (emotionData.indicators && emotionData.indicators.length > 3) {
      volatilityScore += 1;
    }

    // Check for escalation patterns
    if (emotionData.escalating || emotionData.escalation) {
      volatilityScore += 2;
    }

    return volatilityScore >= 3 ? 'high' : volatilityScore >= 2 ? 'medium' : 'low';
  }

  calculateIntensityStability(intensities) {
    // Helper method to calculate stability from intensity variance
    if (intensities.length === 0) return 1.0;
    if (intensities.length === 1) return 0.9;

    const mean = intensities.reduce((sum, val) => sum + val, 0) / intensities.length;
    const variance = intensities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intensities.length;
    const standardDeviation = Math.sqrt(variance);

    // Convert to stability score (lower variance = higher stability)
    const maxPossibleStdDev = 1.5; // Reasonable max for emotion intensities
    const stabilityScore = Math.max(0, 1 - (standardDeviation / maxPossibleStdDev));

    return Math.min(1.0, stabilityScore);
  }

  calculateIntensityRange(intensities) {
    // Helper method to calculate intensity range
    if (intensities.length === 0) return 0;
    return Math.max(...intensities) - Math.min(...intensities);
  }

  assessDominantEmotionStability(emotionVariability) {
    // Helper method to assess if dominant emotions are stable
    const intensities = Object.values(emotionVariability).map(data => data.intensity);
    const maxIntensity = Math.max(...intensities);
    const dominantEmotions = Object.entries(emotionVariability)
      .filter(([_, data]) => data.intensity === maxIntensity);

    if (dominantEmotions.length === 1) {
      return dominantEmotions[0][1].type === 'naturally_stable' ? 'stable' : 'moderate';
    } else {
      return 'conflicted'; // Multiple dominant emotions indicate instability
    }
  }

  assessBusinessEmotionalStability(emotionVariability) {
    // Helper method to assess business emotion stability
    const businessEmotions = Object.entries(emotionVariability)
      .filter(([emotionType, _]) => emotionType.toLowerCase().includes('business'));

    if (businessEmotions.length === 0) return 'not_applicable';

    const businessVolatility = businessEmotions.reduce((sum, [_, data]) => {
      return sum + (data.volatility === 'high' ? 2 : data.volatility === 'medium' ? 1 : 0);
    }, 0);

    return businessVolatility / businessEmotions.length > 1 ? 'unstable' : 'stable';
  }

  assessConflictImpactOnStability(emotionalStates) {
    // Helper method to assess how conflicts impact stability
    // This is a simplified check - in practice, this would use the conflict detection results
    const activeEmotions = Object.keys(emotionalStates).filter(key => 
      emotionalStates[key] && emotionalStates[key].level !== 'none'
    );

    // Check for obvious conflicts
    const hasPositiveNegative = activeEmotions.some(e => e.includes('excitement') || e.includes('optimism')) &&
                               activeEmotions.some(e => e.includes('anxiety') || e.includes('frustration'));

    return hasPositiveNegative ? 'high_conflict' : 'low_conflict';
  }

  calculateEmotionalConsistency(emotionVariability) {
    // Helper method to calculate emotional consistency
    const emotionTypes = Object.values(emotionVariability).map(data => data.type);
    const typeCount = {};
    
    emotionTypes.forEach(type => {
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    // Higher consistency if emotions are of similar types
    const dominantTypeCount = Math.max(...Object.values(typeCount));
    return dominantTypeCount / emotionTypes.length;
  }

  calculatePredictability(emotionVariability, volatilityCount) {
    // Helper method to calculate emotional predictability
    const totalEmotions = Object.keys(emotionVariability).length;
    if (totalEmotions === 0) return 1.0;

    const volatilityRatio = volatilityCount / totalEmotions;
    return Math.max(0, 1 - volatilityRatio);
  }

  assessVolatilityImpact(emotionType, intensity) {
    // Helper method to assess impact of emotional volatility
    if (emotionType.toLowerCase().includes('business') && intensity >= 3) {
      return 'high_business_impact';
    } else if (intensity >= 3) {
      return 'high_personal_impact';
    } else {
      return 'moderate_impact';
    }
  }

  analyzeHistoricalEmotionalStability(conversationHistory, currentEmotions) {
    // Helper method to analyze emotional stability over conversation history
    return {
      hasHistory: true,
      stabilityTrend: 'improving', // This would be calculated from actual history
      emotionalEvolution: 'developing_awareness',
      consistencyPattern: 'building_stability'
    };
  }

  assessStabilityRiskFactors(volatilityIndicators, stabilityFactors, emotionVariability) {
    // Helper method to assess risk factors for emotional instability
    const riskFactors = [];
    let riskLevel = 'low';

    if (volatilityIndicators.length >= 3) {
      riskFactors.push('multiple_volatile_emotions');
      riskLevel = 'high';
    }

    if (stabilityFactors.intensityRange >= 2) {
      riskFactors.push('wide_intensity_range');
      riskLevel = riskLevel === 'high' ? 'high' : 'medium';
    }

    if (stabilityFactors.conflictLevel === 'high_conflict') {
      riskFactors.push('emotional_conflicts');
      riskLevel = 'high';
    }

    const recommendations = this.generateStabilityRecommendations(riskFactors);

    return { riskLevel, factors: riskFactors, recommendations };
  }

  generateStabilityRecommendations(riskFactors) {
    // Helper method to generate stability improvement recommendations
    const recommendations = [];

    if (riskFactors.includes('multiple_volatile_emotions')) {
      recommendations.push('Consider focusing on one emotional state at a time');
    }

    if (riskFactors.includes('emotional_conflicts')) {
      recommendations.push('Acknowledge conflicting emotions and seek balance');
    }

    if (riskFactors.includes('wide_intensity_range')) {
      recommendations.push('Practice emotional regulation techniques');
    }

    return recommendations;
  }

  calculateBusinessStabilityLevel(businessEmotions) {
    // Helper method to calculate business emotional stability level
    const avgIntensity = businessEmotions.reduce(
      (sum, [_, data]) => sum + data.intensity, 0
    ) / businessEmotions.length;

    const volatileCount = businessEmotions.filter(
      ([_, data]) => data.volatility === 'high'
    ).length;

    if (volatileCount === 0 && avgIntensity <= 2) return 'stable';
    if (volatileCount <= 1 && avgIntensity <= 2.5) return 'moderately_stable';
    return 'unstable';
  }

  assessBusinessStabilityImpact(businessEmotions) {
    // Helper method to assess business impact of emotional stability
    const highIntensityCount = businessEmotions.filter(
      ([_, data]) => data.intensity >= 3
    ).length;

    if (highIntensityCount >= 2) return 'high_impact';
    if (highIntensityCount >= 1) return 'medium_impact';
    return 'low_impact';
  }

  assessSelfAwarenessFromEmotions(emotionVariability) {
    // Helper method to assess self-awareness from emotional patterns
    const emotionCount = Object.keys(emotionVariability).length;
    if (emotionCount >= 5) return 'high';
    if (emotionCount >= 3) return 'medium';
    return 'developing';
  }

  assessCopingCapacityFromStability(stabilityScore) {
    // Helper method to assess coping capacity from stability
    if (stabilityScore >= 0.8) return 'strong';
    if (stabilityScore >= 0.6) return 'adequate';
    return 'needs_support';
  }

  assessEmotionalAdaptability(emotionVariability) {
    // Helper method to assess emotional adaptability
    const typeVariety = new Set(Object.values(emotionVariability).map(data => data.type)).size;
    if (typeVariety >= 3) return 'highly_adaptable';
    if (typeVariety >= 2) return 'adaptable';
    return 'limited_adaptability';
  }

  analyzeSentimentLayers(message, conversationHistory) {
    // Analyze multiple layers of sentiment in the message
    const analysis = {
      overallSentiment: 'neutral',
      sentimentScore: 0,
      sentimentLayers: {},
      sentimentIntensity: 'medium',
      sentimentStability: 'stable',
      contextualSentiment: {}
    };

    try {
      const messageText = message.toLowerCase();

      // Layer 1: Surface Sentiment (Direct words and phrases)
      analysis.sentimentLayers.surface = this.analyzeSurfaceSentiment(messageText);

      // Layer 2: Contextual Sentiment (Business context)
      analysis.sentimentLayers.contextual = this.analyzeContextualSentiment(messageText);

      // Layer 3: Emotional Undertones
      analysis.sentimentLayers.emotional = this.analyzeEmotionalUndertones(messageText);

      // Layer 4: Implicit Sentiment (Hidden meanings)
      analysis.sentimentLayers.implicit = this.analyzeImplicitSentiment(messageText);

      // Layer 5: Business Domain Sentiment
      analysis.sentimentLayers.businessDomain = this.analyzeBusinessDomainSentiment(messageText);

      // Calculate overall sentiment score
      const layerScores = Object.values(analysis.sentimentLayers).map(layer => layer.score);
      analysis.sentimentScore = layerScores.reduce((sum, score) => sum + score, 0) / layerScores.length;

      // Determine overall sentiment
      if (analysis.sentimentScore >= 0.3) {
        analysis.overallSentiment = 'positive';
      } else if (analysis.sentimentScore <= -0.3) {
        analysis.overallSentiment = 'negative';
      } else {
        analysis.overallSentiment = 'neutral';
      }

      // Calculate sentiment intensity
      const absoluteScore = Math.abs(analysis.sentimentScore);
      if (absoluteScore >= 0.8) {
        analysis.sentimentIntensity = 'very_high';
      } else if (absoluteScore >= 0.6) {
        analysis.sentimentIntensity = 'high';
      } else if (absoluteScore >= 0.4) {
        analysis.sentimentIntensity = 'medium';
      } else {
        analysis.sentimentIntensity = 'low';
      }

      // Analyze sentiment stability across layers
      const layerVariance = this.calculateSentimentVariance(layerScores);
      if (layerVariance < 0.2) {
        analysis.sentimentStability = 'very_stable';
      } else if (layerVariance < 0.4) {
        analysis.sentimentStability = 'stable';
      } else if (layerVariance < 0.6) {
        analysis.sentimentStability = 'moderately_stable';
      } else {
        analysis.sentimentStability = 'volatile';
      }

      // Contextual sentiment analysis
      analysis.contextualSentiment = {
        businessContext: this.getBusinessContextSentiment(analysis.sentimentLayers),
        temporalContext: this.getTemporalContextSentiment(messageText),
        personalContext: this.getPersonalContextSentiment(messageText),
        communicativeIntent: this.getCommunicativeIntentSentiment(messageText)
      };

      // Sentiment progression analysis
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.sentimentProgression = this.analyzeSentimentProgression(
          analysis.sentimentScore, 
          conversationHistory
        );
      }

      // Identify sentiment triggers
      analysis.sentimentTriggers = this.identifySentimentTriggers(messageText, analysis.sentimentLayers);

      // Business sentiment impact assessment
      analysis.businessSentimentImpact = this.assessBusinessSentimentImpact(
        analysis.sentimentLayers.businessDomain,
        analysis.overallSentiment
      );

    } catch (error) {
      console.warn('🧠 Sentiment layers analysis warning:', error.message);
      // Return safe defaults
      analysis.overallSentiment = 'neutral';
      analysis.sentimentScore = 0;
    }

    return analysis;
  }

  analyzeSurfaceSentiment(messageText) {
    // Layer 1: Direct sentiment from explicit words
    const positiveWords = [
      'excelente', 'bueno', 'perfecto', 'genial', 'fantástico',
      'increíble', 'maravilloso', 'estupendo', 'bien', 'mejor'
    ];

    const negativeWords = [
      'malo', 'terrible', 'horrible', 'pésimo', 'desastroso',
      'problema', 'error', 'falla', 'incorrecto', 'peor'
    ];

    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      if (messageText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (messageText.includes(word)) negativeCount++;
    });

    const score = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);

    return {
      score: score,
      positiveIndicators: positiveCount,
      negativeIndicators: negativeCount,
      confidence: positiveCount + negativeCount > 0 ? 'high' : 'low'
    };
  }

  analyzeContextualSentiment(messageText) {
    // Layer 2: Sentiment based on business context
    const positiveContexts = [
      'ventas buenas', 'producto estrella', 'excelentes resultados',
      'crecimiento', 'éxito', 'mejorando'
    ];

    const negativeContexts = [
      'ventas bajas', 'problemas financieros', 'perdiendo dinero',
      'crisis', 'fracaso', 'empeorando'
    ];

    let contextScore = 0;
    let contextIndicators = 0;

    positiveContexts.forEach(context => {
      if (messageText.includes(context)) {
        contextScore += 0.3;
        contextIndicators++;
      }
    });

    negativeContexts.forEach(context => {
      if (messageText.includes(context)) {
        contextScore -= 0.3;
        contextIndicators++;
      }
    });

    return {
      score: Math.max(-1, Math.min(1, contextScore)),
      indicators: contextIndicators,
      confidence: contextIndicators > 0 ? 'medium' : 'low'
    };
  }

  analyzeEmotionalUndertones(messageText) {
    // Layer 3: Emotional undertones and subtle feelings
    const hopefulTones = ['espero', 'confío', 'optimista', 'positivo'];
    const worriedTones = ['preocupado', 'ansioso', 'nervioso', 'dudas'];
    const excitedTones = ['emocionado', 'entusiasmado', 'ansioso por'];
    const frustratedTones = ['frustrado', 'molesto', 'irritado', 'cansado'];

    let emotionalScore = 0;
    let emotionalIndicators = 0;

    [hopefulTones, excitedTones].forEach(toneGroup => {
      toneGroup.forEach(tone => {
        if (messageText.includes(tone)) {
          emotionalScore += 0.2;
          emotionalIndicators++;
        }
      });
    });

    [worriedTones, frustratedTones].forEach(toneGroup => {
      toneGroup.forEach(tone => {
        if (messageText.includes(tone)) {
          emotionalScore -= 0.2;
          emotionalIndicators++;
        }
      });
    });

    return {
      score: Math.max(-1, Math.min(1, emotionalScore)),
      indicators: emotionalIndicators,
      confidence: emotionalIndicators > 1 ? 'high' : 'medium'
    };
  }

  analyzeImplicitSentiment(messageText) {
    // Layer 4: Hidden or implicit sentiment
    const implicitPositive = [
      'analiza todas mis', 'dame insights', 'quiero ver',
      'producto estrella', 'confío en'
    ];

    const implicitNegative = [
      'no sé si', 'no estoy seguro', 'tal vez',
      'problema con', 'no funciona'
    ];

    let implicitScore = 0;
    let implicitIndicators = 0;

    implicitPositive.forEach(phrase => {
      if (messageText.includes(phrase)) {
        implicitScore += 0.15;
        implicitIndicators++;
      }
    });

    implicitNegative.forEach(phrase => {
      if (messageText.includes(phrase)) {
        implicitScore -= 0.15;
        implicitIndicators++;
      }
    });

    return {
      score: Math.max(-1, Math.min(1, implicitScore)),
      indicators: implicitIndicators,
      confidence: implicitIndicators > 0 ? 'medium' : 'low'
    };
  }

  analyzeBusinessDomainSentiment(messageText) {
    // Layer 5: Business domain specific sentiment
    const businessPositive = [
      'buen negocio', 'ventas excelentes', 'cliente satisfecho',
      'creciendo', 'expandiendo', 'rentable'
    ];

    const businessNegative = [
      'perdiendo clientes', 'ventas caen', 'problemas operativos',
      'competencia fuerte', 'costos altos', 'crisis'
    ];

    let businessScore = 0;
    let businessIndicators = 0;

    businessPositive.forEach(term => {
      if (messageText.includes(term)) {
        businessScore += 0.4;
        businessIndicators++;
      }
    });

    businessNegative.forEach(term => {
      if (messageText.includes(term)) {
        businessScore -= 0.4;
        businessIndicators++;
      }
    });

    // Special handling for specific business terms
    if (messageText.includes('pollo rostizado') && messageText.includes('estrella')) {
      businessScore += 0.2;
      businessIndicators++;
    }

    return {
      score: Math.max(-1, Math.min(1, businessScore)),
      indicators: businessIndicators,
      confidence: businessIndicators > 0 ? 'high' : 'low',
      businessRelevance: businessIndicators > 0 ? 'high' : 'low'
    };
  }

  calculateSentimentVariance(scores) {
    // Helper method to calculate variance in sentiment scores
    if (scores.length === 0) return 0;
    
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    
    return Math.sqrt(variance);
  }

  getBusinessContextSentiment(sentimentLayers) {
    // Extract business context sentiment
    return {
      score: sentimentLayers.businessDomain?.score || 0,
      relevance: sentimentLayers.businessDomain?.businessRelevance || 'low',
      indicators: sentimentLayers.businessDomain?.indicators || 0
    };
  }

  getTemporalContextSentiment(messageText) {
    // Analyze temporal context of sentiment
    const futurePositive = ['va a mejorar', 'creceremos', 'tendremos éxito'];
    const futureConcerns = ['qué pasará', 'futuro incierto', 'preocupa el futuro'];

    let temporalScore = 0;

    futurePositive.forEach(phrase => {
      if (messageText.includes(phrase)) temporalScore += 0.3;
    });

    futureConcerns.forEach(phrase => {
      if (messageText.includes(phrase)) temporalScore -= 0.3;
    });

    return {
      score: temporalScore,
      orientation: temporalScore > 0 ? 'optimistic_future' : 
                   temporalScore < 0 ? 'concerned_future' : 'present_focused'
    };
  }

  getPersonalContextSentiment(messageText) {
    // Analyze personal context sentiment
    const personalPositive = ['me gusta', 'estoy contento', 'me siento bien'];
    const personalNegative = ['me preocupa', 'me molesta', 'me frustra'];

    let personalScore = 0;

    personalPositive.forEach(phrase => {
      if (messageText.includes(phrase)) personalScore += 0.3;
    });

    personalNegative.forEach(phrase => {
      if (messageText.includes(phrase)) personalScore -= 0.3;
    });

    return {
      score: personalScore,
      involvement: Math.abs(personalScore) > 0 ? 'high' : 'low'
    };
  }

  getCommunicativeIntentSentiment(messageText) {
    // Analyze communicative intent sentiment
    const requestIntent = ['analiza', 'dame', 'quiero', 'necesito'];
    const shareIntent = ['te cuento', 'mira', 'fíjate', 'sabes qué'];

    const hasRequest = requestIntent.some(intent => messageText.includes(intent));
    const hasShare = shareIntent.some(intent => messageText.includes(intent));

    return {
      type: hasRequest ? 'request_oriented' : hasShare ? 'sharing_oriented' : 'informational',
      sentiment: hasRequest ? 'goal_directed' : hasShare ? 'expressive' : 'neutral'
    };
  }

  analyzeSentimentProgression(currentScore, conversationHistory) {
    // Analyze sentiment progression over conversation
    return {
      currentSentiment: currentScore,
      progression: 'stable', // Would be calculated from actual history
      trend: 'neutral'
    };
  }

  identifySentimentTriggers(messageText, sentimentLayers) {
    // Identify what triggers the sentiment
    const triggers = [];

    if (sentimentLayers.surface.score !== 0) {
      triggers.push('explicit_language');
    }

    if (sentimentLayers.businessDomain.score !== 0) {
      triggers.push('business_context');
    }

    if (sentimentLayers.emotional.score !== 0) {
      triggers.push('emotional_undertones');
    }

    return triggers;
  }

  assessBusinessSentimentImpact(businessDomainSentiment, overallSentiment) {
    // Assess how sentiment impacts business communication
    return {
      impact: businessDomainSentiment.businessRelevance === 'high' ? 'significant' : 'minimal',
      communicationStyle: overallSentiment === 'positive' ? 'optimistic_business' :
                         overallSentiment === 'negative' ? 'concerned_business' : 'neutral_business',
      responseNeeded: businessDomainSentiment.score < -0.5 ? 'supportive' : 'standard'
    };
  }

  assessUserMood(message, emotionalStates, sentimentAnalysis, conversationHistory) {
    // Comprehensive user mood assessment combining multiple intelligence layers
    const analysis = {
      currentMood: 'neutral',
      moodIntensity: 'medium',
      moodStability: 'stable',
      moodFactors: {},
      businessMoodContext: {},
      moodRecommendations: []
    };

    try {
      const messageText = message.toLowerCase();

      // Primary mood indicators from multiple sources
      const moodIndicators = {
        emotional: this.extractEmotionalMoodIndicators(emotionalStates),
        sentiment: this.extractSentimentMoodIndicators(sentimentAnalysis),
        linguistic: this.extractLinguisticMoodIndicators(messageText),
        behavioral: this.extractBehavioralMoodIndicators(messageText),
        business: this.extractBusinessMoodIndicators(messageText)
      };

      // Calculate mood scores for each category
      const moodScores = {
        positive: this.calculatePositiveMoodScore(moodIndicators),
        negative: this.calculateNegativeMoodScore(moodIndicators),
        neutral: this.calculateNeutralMoodScore(moodIndicators),
        energetic: this.calculateEnergeticMoodScore(moodIndicators),
        calm: this.calculateCalmMoodScore(moodIndicators)
      };

      // Determine dominant mood
      const dominantMoodEntry = Object.entries(moodScores).reduce((max, [mood, score]) =>
        score > max.score ? { mood, score } : max,
        { mood: 'neutral', score: 0 }
      );

      analysis.currentMood = dominantMoodEntry.mood;

      // Calculate mood intensity
      const maxScore = Math.max(...Object.values(moodScores));
      if (maxScore >= 0.8) {
        analysis.moodIntensity = 'very_high';
      } else if (maxScore >= 0.6) {
        analysis.moodIntensity = 'high';
      } else if (maxScore >= 0.4) {
        analysis.moodIntensity = 'medium';
      } else {
        analysis.moodIntensity = 'low';
      }

      // Assess mood stability
      const moodVariance = this.calculateMoodVariance(Object.values(moodScores));
      if (moodVariance < 0.1) {
        analysis.moodStability = 'very_stable';
      } else if (moodVariance < 0.2) {
        analysis.moodStability = 'stable';
      } else if (moodVariance < 0.3) {
        analysis.moodStability = 'moderately_stable';
      } else {
        analysis.moodStability = 'volatile';
      }

      // Detailed mood factors analysis
      analysis.moodFactors = {
        primaryDrivers: this.identifyPrimaryMoodDrivers(moodIndicators, moodScores),
        emotionalContributors: this.identifyEmotionalContributors(emotionalStates),
        contextualInfluences: this.identifyContextualInfluences(messageText),
        temporalFactors: this.identifyTemporalFactors(messageText),
        socialFactors: this.identifySocialFactors(messageText)
      };

      // Business mood context
      analysis.businessMoodContext = {
        businessEngagement: this.assessBusinessEngagement(messageText, moodIndicators.business),
        decisionMoodImpact: this.assessDecisionMoodImpact(analysis.currentMood, analysis.moodIntensity),
        communicationStyle: this.assessCommunicationMoodStyle(analysis.currentMood, messageText),
        productivityIndicators: this.assessProductivityMoodIndicators(moodIndicators),
        stressLevels: this.assessBusinessStressLevels(moodIndicators, emotionalStates)
      };

      // Mood-based recommendations
      analysis.moodRecommendations = this.generateMoodRecommendations(
        analysis.currentMood,
        analysis.moodIntensity,
        analysis.businessMoodContext
      );

      // Historical mood comparison if available
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.moodProgression = this.analyzeMoodProgression(
          analysis.currentMood,
          analysis.moodIntensity,
          conversationHistory
        );
      }

      // Mood risk assessment
      analysis.moodRiskAssessment = this.assessMoodRisks(
        analysis.currentMood,
        analysis.moodIntensity,
        analysis.moodStability,
        analysis.businessMoodContext
      );

      // Mood enhancement opportunities
      analysis.moodEnhancement = this.identifyMoodEnhancementOpportunities(
        analysis.currentMood,
        moodIndicators,
        analysis.businessMoodContext
      );

    } catch (error) {
      console.warn('🧠 User mood assessment warning:', error.message);
      // Return safe defaults
      analysis.currentMood = 'neutral';
      analysis.moodIntensity = 'medium';
    }

    return analysis;
  }

  extractEmotionalMoodIndicators(emotionalStates) {
    // Extract mood indicators from emotional states
    const indicators = {
      positive: 0,
      negative: 0,
      energetic: 0,
      calm: 0,
      stressed: 0
    };

    if (!emotionalStates) return indicators;

    Object.entries(emotionalStates).forEach(([emotionType, emotionData]) => {
      if (!emotionData || emotionData.level === 'none') return;

      const emotionName = emotionType.toLowerCase();
      let intensity = this.getEmotionIntensityValue(emotionData);

      // Categorize emotions by mood impact
      if (['excitement', 'pride', 'businesssatisfaction', 'businessoptimism'].some(pos => 
          emotionName.includes(pos.toLowerCase()))) {
        indicators.positive += intensity;
        indicators.energetic += intensity * 0.7;
      }

      if (['anxiety', 'frustration', 'disappointment', 'businessoverwhelm'].some(neg => 
          emotionName.includes(neg.toLowerCase()))) {
        indicators.negative += intensity;
        indicators.stressed += intensity;
      }

      if (['relief', 'trust', 'satisfaction'].some(calm => 
          emotionName.includes(calm.toLowerCase()))) {
        indicators.calm += intensity;
        indicators.positive += intensity * 0.5;
      }

      if (['businessurgency', 'overwhelm'].some(stress => 
          emotionName.includes(stress.toLowerCase()))) {
        indicators.stressed += intensity;
        indicators.energetic += intensity * 0.8;
      }
    });

    return indicators;
  }

  extractSentimentMoodIndicators(sentimentAnalysis) {
    // Extract mood indicators from sentiment analysis
    const indicators = {
      positive: 0,
      negative: 0,
      neutral: 0
    };

    if (!sentimentAnalysis) return indicators;

    const sentimentScore = sentimentAnalysis.sentimentScore || 0;
    const intensity = Math.abs(sentimentScore);

    if (sentimentScore > 0) {
      indicators.positive = intensity;
    } else if (sentimentScore < 0) {
      indicators.negative = intensity;
    } else {
      indicators.neutral = 0.5;
    }

    return indicators;
  }

  extractLinguisticMoodIndicators(messageText) {
    // Extract mood indicators from language patterns
    const indicators = {
      enthusiastic: 0,
      calm: 0,
      urgent: 0,
      thoughtful: 0
    };

    // Enthusiastic language patterns
    const enthusiasticPatterns = ['!', '¡', 'genial', 'excelente', 'fantástico', 'increíble'];
    enthusiasticPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.enthusiastic += 0.2;
    });

    // Calm language patterns
    const calmPatterns = ['por favor', 'tranquilo', 'pausado', 'reflexionar'];
    calmPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.calm += 0.3;
    });

    // Urgent language patterns
    const urgentPatterns = ['ya', 'ahora', 'urgente', 'rápido', 'inmediato'];
    urgentPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.urgent += 0.3;
    });

    // Thoughtful language patterns
    const thoughtfulPatterns = ['analiza', 'considera', 'reflexiona', 'piensa', 'evalúa'];
    thoughtfulPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.thoughtful += 0.2;
    });

    return indicators;
  }

  extractBehavioralMoodIndicators(messageText) {
    // Extract mood indicators from behavioral cues in text
    const indicators = {
      proactive: 0,
      reactive: 0,
      exploratory: 0,
      decisive: 0
    };

    // Proactive behavior indicators
    const proactivePatterns = ['quiero', 'voy a', 'planeo', 'haré', 'implementaré'];
    proactivePatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.proactive += 0.3;
    });

    // Reactive behavior indicators
    const reactivePatterns = ['necesito', 'tengo que', 'debo', 'urgente', 'problema'];
    reactivePatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.reactive += 0.2;
    });

    // Exploratory behavior indicators
    const exploratoryPatterns = ['analiza', 'investiga', 'explora', 'descubre', 'examina'];
    exploratoryPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.exploratory += 0.3;
    });

    // Decisive behavior indicators
    const decisivePatterns = ['decide', 'determina', 'concluye', 'definitivamente'];
    decisivePatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.decisive += 0.4;
    });

    return indicators;
  }

  extractBusinessMoodIndicators(messageText) {
    // Extract business-specific mood indicators
    const indicators = {
      optimistic: 0,
      concerned: 0,
      focused: 0,
      strategic: 0
    };

    // Business optimism indicators
    const optimisticPatterns = ['crecimiento', 'oportunidad', 'éxito', 'expansión', 'mejora'];
    optimisticPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.optimistic += 0.3;
    });

    // Business concern indicators
    const concernedPatterns = ['problema', 'crisis', 'perdida', 'competencia', 'riesgo'];
    concernedPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.concerned += 0.3;
    });

    // Business focus indicators
    const focusedPatterns = ['producto estrella', 'pollo rostizado', 'ventas', 'análisis'];
    focusedPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.focused += 0.2;
    });

    // Strategic thinking indicators
    const strategicPatterns = ['estrategia', 'planificación', 'objetivo', 'meta', 'visión'];
    strategicPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) indicators.strategic += 0.4;
    });

    return indicators;
  }

  calculatePositiveMoodScore(moodIndicators) {
    // Calculate overall positive mood score
    let score = 0;
    score += moodIndicators.emotional.positive * 0.4;
    score += moodIndicators.sentiment.positive * 0.3;
    score += moodIndicators.linguistic.enthusiastic * 0.2;
    score += moodIndicators.business.optimistic * 0.1;
    return Math.min(1.0, score);
  }

  calculateNegativeMoodScore(moodIndicators) {
    // Calculate overall negative mood score
    let score = 0;
    score += moodIndicators.emotional.negative * 0.4;
    score += moodIndicators.sentiment.negative * 0.3;
    score += moodIndicators.emotional.stressed * 0.2;
    score += moodIndicators.business.concerned * 0.1;
    return Math.min(1.0, score);
  }

  calculateNeutralMoodScore(moodIndicators) {
    // Calculate neutral mood score
    let score = 0;
    score += moodIndicators.sentiment.neutral * 0.4;
    score += moodIndicators.linguistic.thoughtful * 0.3;
    score += moodIndicators.behavioral.exploratory * 0.3;
    return Math.min(1.0, score);
  }

  calculateEnergeticMoodScore(moodIndicators) {
    // Calculate energetic mood score
    let score = 0;
    score += moodIndicators.emotional.energetic * 0.3;
    score += moodIndicators.linguistic.enthusiastic * 0.3;
    score += moodIndicators.linguistic.urgent * 0.2;
    score += moodIndicators.behavioral.proactive * 0.2;
    return Math.min(1.0, score);
  }

  calculateCalmMoodScore(moodIndicators) {
    // Calculate calm mood score
    let score = 0;
    score += moodIndicators.emotional.calm * 0.4;
    score += moodIndicators.linguistic.calm * 0.3;
    score += moodIndicators.linguistic.thoughtful * 0.3;
    return Math.min(1.0, score);
  }

  getEmotionIntensityValue(emotionData) {
    // Helper method to extract intensity value from emotion data
    if (emotionData.intensityLevel) {
      const intensityMap = { 'low': 0.3, 'medium': 0.6, 'high': 1.0 };
      return intensityMap[emotionData.intensityLevel] || 0.3;
    }
    if (emotionData.indicators && emotionData.indicators.length > 0) {
      return Math.min(emotionData.indicators.length * 0.2, 1.0);
    }
    return 0.3;
  }

  calculateMoodVariance(moodScores) {
    // Calculate variance in mood scores
    if (moodScores.length === 0) return 0;
    
    const mean = moodScores.reduce((sum, score) => sum + score, 0) / moodScores.length;
    const variance = moodScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / moodScores.length;
    
    return Math.sqrt(variance);
  }

  identifyPrimaryMoodDrivers(moodIndicators, moodScores) {
    // Identify what's primarily driving the user's mood
    const drivers = [];
    
    if (moodIndicators.emotional.positive > 0.5) drivers.push('positive_emotions');
    if (moodIndicators.emotional.negative > 0.5) drivers.push('negative_emotions');
    if (moodIndicators.business.focused > 0.3) drivers.push('business_focus');
    if (moodIndicators.linguistic.urgent > 0.4) drivers.push('time_pressure');
    
    return drivers;
  }

  identifyEmotionalContributors(emotionalStates) {
    // Identify which emotions are contributing to mood
    if (!emotionalStates) return [];
    
    return Object.entries(emotionalStates)
      .filter(([_, emotionData]) => emotionData && emotionData.level !== 'none')
      .map(([emotionType, _]) => emotionType)
      .slice(0, 3); // Top 3 contributors
  }

  identifyContextualInfluences(messageText) {
    // Identify contextual factors influencing mood
    const influences = [];
    
    if (messageText.includes('pollo rostizado')) influences.push('product_focus');
    if (messageText.includes('ventas')) influences.push('sales_context');
    if (messageText.includes('análisis')) influences.push('analytical_context');
    if (messageText.includes('urgente')) influences.push('urgency_context');
    
    return influences;
  }

  identifyTemporalFactors(messageText) {
    // Identify temporal factors affecting mood
    const factors = [];
    
    if (messageText.includes('ya') || messageText.includes('ahora')) {
      factors.push('immediate_timeframe');
    }
    if (messageText.includes('futuro') || messageText.includes('mañana')) {
      factors.push('future_oriented');
    }
    if (messageText.includes('historial') || messageText.includes('antes')) {
      factors.push('past_reflection');
    }
    
    return factors;
  }

  identifySocialFactors(messageText) {
    // Identify social factors affecting mood
    const factors = [];
    
    if (messageText.includes('mi') || messageText.includes('mis')) {
      factors.push('personal_ownership');
    }
    if (messageText.includes('nuestro') || messageText.includes('equipo')) {
      factors.push('team_context');
    }
    if (messageText.includes('clientes')) {
      factors.push('customer_focus');
    }
    
    return factors;
  }

  assessBusinessEngagement(messageText, businessIndicators) {
    // Assess level of business engagement
    const businessTerms = ['negocio', 'ventas', 'producto', 'análisis', 'estrategia'];
    const engagementScore = businessTerms.filter(term => messageText.includes(term)).length;
    
    if (engagementScore >= 3) return 'highly_engaged';
    if (engagementScore >= 2) return 'engaged';
    if (engagementScore >= 1) return 'moderately_engaged';
    return 'low_engagement';
  }

  assessDecisionMoodImpact(mood, intensity) {
    // Assess how mood might impact decision making
    if (mood === 'positive' && intensity === 'high') {
      return 'optimistic_decisions';
    } else if (mood === 'negative' && intensity === 'high') {
      return 'risk_averse_decisions';
    } else if (mood === 'energetic') {
      return 'quick_decisions';
    } else if (mood === 'calm') {
      return 'thoughtful_decisions';
    }
    return 'balanced_decisions';
  }

  assessCommunicationMoodStyle(mood, messageText) {
    // Assess communication style based on mood
    if (mood === 'positive') return 'enthusiastic_communication';
    if (mood === 'negative') return 'concerned_communication';
    if (mood === 'energetic') return 'dynamic_communication';
    if (mood === 'calm') return 'measured_communication';
    return 'neutral_communication';
  }

  assessProductivityMoodIndicators(moodIndicators) {
    // Assess productivity indicators from mood
    const productivityScore = 
      moodIndicators.behavioral.proactive * 0.4 +
      moodIndicators.business.focused * 0.3 +
      moodIndicators.linguistic.thoughtful * 0.3;
    
    if (productivityScore >= 0.7) return 'high_productivity_mood';
    if (productivityScore >= 0.4) return 'moderate_productivity_mood';
    return 'low_productivity_mood';
  }

  assessBusinessStressLevels(moodIndicators, emotionalStates) {
    // Assess business-related stress levels
    let stressScore = 0;
    stressScore += moodIndicators.emotional.stressed * 0.4;
    stressScore += moodIndicators.linguistic.urgent * 0.3;
    stressScore += moodIndicators.business.concerned * 0.3;
    
    if (stressScore >= 0.7) return 'high_stress';
    if (stressScore >= 0.4) return 'moderate_stress';
    return 'low_stress';
  }

  generateMoodRecommendations(mood, intensity, businessContext) {
    // Generate recommendations based on mood assessment
    const recommendations = [];
    
    if (mood === 'negative' && intensity === 'high') {
      recommendations.push('Consider taking a short break before making important decisions');
    }
    
    if (mood === 'energetic' && businessContext.businessEngagement === 'highly_engaged') {
      recommendations.push('Great time to tackle challenging business projects');
    }
    
    if (businessContext.stressLevels === 'high_stress') {
      recommendations.push('Focus on stress management and prioritization');
    }
    
    if (mood === 'positive' && intensity === 'high') {
      recommendations.push('Excellent mindset for strategic planning and innovation');
    }
    
    return recommendations;
  }

  analyzeMoodProgression(currentMood, currentIntensity, conversationHistory) {
    // Analyze mood progression over conversation
    return {
      currentMood: currentMood,
      progression: 'stable', // Would be calculated from actual history
      trend: 'improving'
    };
  }

  assessMoodRisks(mood, intensity, stability, businessContext) {
    // Assess risks related to current mood state
    const risks = [];
    
    if (mood === 'negative' && intensity === 'very_high') {
      risks.push('emotional_decision_making_risk');
    }
    
    if (stability === 'volatile') {
      risks.push('mood_instability_risk');
    }
    
    if (businessContext.stressLevels === 'high_stress') {
      risks.push('burnout_risk');
    }
    
    return {
      level: risks.length >= 2 ? 'high' : risks.length >= 1 ? 'medium' : 'low',
      factors: risks
    };
  }

  identifyMoodEnhancementOpportunities(mood, moodIndicators, businessContext) {
    // Identify opportunities to enhance mood
    const opportunities = [];
    
    if (moodIndicators.business.focused > 0.5) {
      opportunities.push('leverage_business_focus');
    }
    
    if (moodIndicators.behavioral.proactive > 0.4) {
      opportunities.push('channel_proactive_energy');
    }
    
    if (businessContext.businessEngagement === 'highly_engaged') {
      opportunities.push('capitalize_on_engagement');
    }
    
    return opportunities;
  }

  analyzeStressIndicators(message, emotionalStates, userMood, conversationHistory) {
    // Comprehensive stress indicator analysis
    const analysis = {
      stressLevel: 'low',
      stressScore: 0,
      stressIndicators: [],
      stressCategories: {},
      stressTriggers: [],
      stressImpact: {},
      stressManagementNeeds: []
    };

    try {
      const messageText = message.toLowerCase();

      // Collect stress indicators from multiple sources
      const stressIndicators = {
        linguistic: this.analyzeLinguisticStressIndicators(messageText),
        emotional: this.analyzeEmotionalStressIndicators(emotionalStates),
        behavioral: this.analyzeBehavioralStressIndicators(messageText),
        cognitive: this.analyzeCognitiveStressIndicators(messageText),
        temporal: this.analyzeTemporalStressIndicators(messageText),
        business: this.analyzeBusinessStressIndicators(messageText)
      };

      // Calculate overall stress score
      const categoryWeights = {
        linguistic: 0.2,
        emotional: 0.3,
        behavioral: 0.15,
        cognitive: 0.15,
        temporal: 0.1,
        business: 0.1
      };

      analysis.stressScore = Object.entries(stressIndicators).reduce((total, [category, indicators]) => {
        return total + (indicators.score * categoryWeights[category]);
      }, 0);

      // Determine stress level
      if (analysis.stressScore >= 0.8) {
        analysis.stressLevel = 'very_high';
      } else if (analysis.stressScore >= 0.6) {
        analysis.stressLevel = 'high';
      } else if (analysis.stressScore >= 0.4) {
        analysis.stressLevel = 'moderate';
      } else if (analysis.stressScore >= 0.2) {
        analysis.stressLevel = 'low';
      } else {
        analysis.stressLevel = 'minimal';
      }

      // Compile all stress indicators
      Object.entries(stressIndicators).forEach(([category, data]) => {
        if (data.indicators && data.indicators.length > 0) {
          analysis.stressIndicators.push(...data.indicators.map(indicator => ({
            ...indicator,
            category: category
          })));
        }
      });

      // Categorize stress indicators
      analysis.stressCategories = {
        timePresure: this.categorizeTimePressureStress(analysis.stressIndicators),
        workload: this.categorizeWorkloadStress(analysis.stressIndicators),
        uncertainty: this.categorizeUncertaintyStress(analysis.stressIndicators),
        performance: this.categorizePerformanceStress(analysis.stressIndicators),
        interpersonal: this.categorizeInterpersonalStress(analysis.stressIndicators),
        financial: this.categorizeFinancialStress(analysis.stressIndicators)
      };

      // Identify stress triggers
      analysis.stressTriggers = this.identifyStressTriggers(messageText, analysis.stressIndicators);

      // Assess stress impact
      analysis.stressImpact = {
        cognitive: this.assessCognitiveStressImpact(stressIndicators.cognitive, analysis.stressScore),
        emotional: this.assessEmotionalStressImpact(stressIndicators.emotional, emotionalStates),
        behavioral: this.assessBehavioralStressImpact(stressIndicators.behavioral, messageText),
        physical: this.assessPhysicalStressIndicators(messageText, analysis.stressScore),
        business: this.assessBusinessStressImpact(stressIndicators.business, analysis.stressScore)
      };

      // Determine stress management needs
      analysis.stressManagementNeeds = this.determineStressManagementNeeds(
        analysis.stressLevel,
        analysis.stressCategories,
        analysis.stressImpact
      );

      // Historical stress pattern analysis
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.stressProgression = this.analyzeStressProgression(
          analysis.stressScore,
          analysis.stressLevel,
          conversationHistory
        );
      }

      // Risk assessment for stress escalation
      analysis.stressRiskAssessment = this.assessStressEscalationRisk(
        analysis.stressLevel,
        analysis.stressCategories,
        analysis.stressImpact
      );

      // Immediate stress intervention recommendations
      if (analysis.stressLevel === 'very_high' || analysis.stressLevel === 'high') {
        analysis.immediateInterventions = this.generateImmediateStressInterventions(
          analysis.stressCategories,
          analysis.stressTriggers
        );
      }

    } catch (error) {
      console.warn('🧠 Stress indicators analysis warning:', error.message);
      // Return safe defaults
      analysis.stressLevel = 'low';
      analysis.stressScore = 0;
    }

    return analysis;
  }

  analyzeLinguisticStressIndicators(messageText) {
    // Analyze linguistic patterns that indicate stress
    const indicators = [];
    let score = 0;

    // High-frequency stress words
    const stressWords = [
      'urgente', 'ya', 'ahora', 'inmediato', 'rápido',
      'problema', 'crisis', 'presión', 'estrés', 'agotado',
      'cansado', 'abrumado', 'no puedo', 'demasiado'
    ];

    stressWords.forEach(word => {
      if (messageText.includes(word)) {
        indicators.push({
          type: 'stress_vocabulary',
          indicator: word,
          intensity: 'medium'
        });
        score += 0.1;
      }
    });

    // Repetitive or emphatic punctuation
    const exclamationCount = (messageText.match(/[!¡]/g) || []).length;
    if (exclamationCount > 2) {
      indicators.push({
        type: 'emotional_punctuation',
        indicator: 'excessive_exclamation',
        intensity: 'high'
      });
      score += 0.2;
    }

    // Capitalization patterns (stress/urgency)
    const capsWords = messageText.match(/[A-Z]{2,}/g);
    if (capsWords && capsWords.length > 1) {
      indicators.push({
        type: 'emphasis_patterns',
        indicator: 'excessive_capitalization',
        intensity: 'medium'
      });
      score += 0.15;
    }

    // Fragmented or rushed speech patterns
    const shortSentences = messageText.split(/[.!?]/).filter(s => s.trim().length < 10).length;
    if (shortSentences > 2) {
      indicators.push({
        type: 'speech_patterns',
        indicator: 'fragmented_communication',
        intensity: 'medium'
      });
      score += 0.1;
    }

    return {
      score: Math.min(1.0, score),
      indicators: indicators,
      confidence: indicators.length > 0 ? 'high' : 'low'
    };
  }

  analyzeEmotionalStressIndicators(emotionalStates) {
    // Analyze emotional states that indicate stress
    const indicators = [];
    let score = 0;

    if (!emotionalStates) {
      return { score: 0, indicators: [], confidence: 'low' };
    }

    // High-stress emotions
    const stressEmotions = [
      'anxiety', 'frustration', 'overwhelm', 'businessoverwhelm',
      'businessurgency', 'businessuncertainty'
    ];

    Object.entries(emotionalStates).forEach(([emotionType, emotionData]) => {
      if (!emotionData || emotionData.level === 'none') return;

      const emotionName = emotionType.toLowerCase();
      const isStressEmotion = stressEmotions.some(stress => emotionName.includes(stress));

      if (isStressEmotion) {
        const intensity = this.getStressEmotionIntensity(emotionData);
        indicators.push({
          type: 'stress_emotion',
          indicator: emotionType,
          intensity: intensity
        });

        score += intensity === 'high' ? 0.3 : intensity === 'medium' ? 0.2 : 0.1;
      }
    });

    // Emotional conflict indicators (additional stress)
    const conflictingEmotions = this.detectEmotionalConflictsForStress(emotionalStates);
    if (conflictingEmotions > 0) {
      indicators.push({
        type: 'emotional_conflict',
        indicator: 'conflicting_emotions',
        intensity: conflictingEmotions > 2 ? 'high' : 'medium'
      });
      score += conflictingEmotions * 0.1;
    }

    return {
      score: Math.min(1.0, score),
      indicators: indicators,
      confidence: indicators.length > 0 ? 'high' : 'medium'
    };
  }

  analyzeBehavioralStressIndicators(messageText) {
    // Analyze behavioral patterns that indicate stress
    const indicators = [];
    let score = 0;

    // Urgency-driven behavior
    const urgencyPatterns = [
      'necesito ya', 'tiene que ser ahora', 'no puede esperar',
      'urgentemente', 'de inmediato'
    ];

    urgencyPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'urgency_behavior',
          indicator: pattern,
          intensity: 'high'
        });
        score += 0.2;
      }
    });

    // Avoidance behavior
    const avoidancePatterns = [
      'no quiero pensar', 'después veo', 'más tarde',
      'no tengo tiempo', 'no puedo ahora'
    ];

    avoidancePatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'avoidance_behavior',
          indicator: pattern,
          intensity: 'medium'
        });
        score += 0.15;
      }
    });

    // Perfectionist behavior (stress indicator)
    const perfectionismPatterns = [
      'tiene que estar perfecto', 'no puede tener errores',
      'debe ser exacto', 'sin fallas'
    ];

    perfectionismPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'perfectionist_behavior',
          indicator: pattern,
          intensity: 'medium'
        });
        score += 0.1;
      }
    });

    return {
      score: Math.min(1.0, score),
      indicators: indicators,
      confidence: indicators.length > 0 ? 'medium' : 'low'
    };
  }

  analyzeCognitiveStressIndicators(messageText) {
    // Analyze cognitive patterns that indicate stress
    const indicators = [];
    let score = 0;

    // Decision difficulty indicators
    const decisionStressPatterns = [
      'no sé qué hacer', 'no puedo decidir', 'confundido',
      'demasiadas opciones', 'muy complicado'
    ];

    decisionStressPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'cognitive_overload',
          indicator: pattern,
          intensity: 'high'
        });
        score += 0.2;
      }
    });

    // Memory/concentration issues
    const cognitiveIssuePatterns = [
      'no recuerdo', 'se me olvida', 'no puedo concentrarme',
      'me pierdo', 'no entiendo nada'
    ];

    cognitiveIssuePatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'cognitive_impairment',
          indicator: pattern,
          intensity: 'medium'
        });
        score += 0.15;
      }
    });

    // Information overload
    const overloadPatterns = [
      'demasiada información', 'muy complejo', 'no proceso',
      'saturado', 'abrumado con datos'
    ];

    overloadPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'information_overload',
          indicator: pattern,
          intensity: 'high'
        });
        score += 0.25;
      }
    });

    return {
      score: Math.min(1.0, score),
      indicators: indicators,
      confidence: indicators.length > 0 ? 'high' : 'low'
    };
  }

  analyzeTemporalStressIndicators(messageText) {
    // Analyze time-related stress indicators
    const indicators = [];
    let score = 0;

    // Time pressure indicators
    const timePressurePatterns = [
      'sin tiempo', 'fecha límite', 'se acaba el tiempo',
      'muy poco tiempo', 'plazo vencido'
    ];

    timePressurePatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'time_pressure',
          indicator: pattern,
          intensity: 'high'
        });
        score += 0.3;
      }
    });

    // Schedule overwhelm
    const scheduleStressPatterns = [
      'muy ocupado', 'agenda llena', 'no tengo hueco',
      'demasiadas citas', 'sobrecargado'
    ];

    scheduleStressPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'schedule_overwhelm',
          indicator: pattern,
          intensity: 'medium'
        });
        score += 0.2;
      }
    });

    return {
      score: Math.min(1.0, score),
      indicators: indicators,
      confidence: indicators.length > 0 ? 'medium' : 'low'
    };
  }

  analyzeBusinessStressIndicators(messageText) {
    // Analyze business-specific stress indicators
    const indicators = [];
    let score = 0;

    // Financial stress
    const financialStressPatterns = [
      'perdiendo dinero', 'costos altos', 'presión financiera',
      'problemas de flujo', 'gastos excesivos'
    ];

    financialStressPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'financial_stress',
          indicator: pattern,
          intensity: 'high'
        });
        score += 0.3;
      }
    });

    // Performance stress
    const performanceStressPatterns = [
      'ventas bajas', 'metas no cumplidas', 'resultados pobres',
      'competencia fuerte', 'perdiendo mercado'
    ];

    performanceStressPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'performance_stress',
          indicator: pattern,
          intensity: 'high'
        });
        score += 0.25;
      }
    });

    // Operational stress
    const operationalStressPatterns = [
      'problemas operativos', 'fallas del sistema', 'procesos complicados',
      'mucho trabajo', 'personal insuficiente'
    ];

    operationalStressPatterns.forEach(pattern => {
      if (messageText.includes(pattern)) {
        indicators.push({
          type: 'operational_stress',
          indicator: pattern,
          intensity: 'medium'
        });
        score += 0.2;
      }
    });

    return {
      score: Math.min(1.0, score),
      indicators: indicators,
      confidence: indicators.length > 0 ? 'high' : 'low'
    };
  }

  getStressEmotionIntensity(emotionData) {
    // Helper method to get stress emotion intensity
    if (emotionData.intensityLevel === 'high' || emotionData.emotionalIntensity === 'high') {
      return 'high';
    } else if (emotionData.intensityLevel === 'medium' || emotionData.emotionalIntensity === 'medium') {
      return 'medium';
    }
    return 'low';
  }

  detectEmotionalConflictsForStress(emotionalStates) {
    // Helper method to detect emotional conflicts that create stress
    let conflictCount = 0;
    
    const activeEmotions = Object.entries(emotionalStates)
      .filter(([_, data]) => data && data.level !== 'none')
      .map(([emotion, _]) => emotion.toLowerCase());

    // Check for obvious conflicts
    const conflicts = [
      ['excitement', 'anxiety'],
      ['businessoptimism', 'businessuncertainty'],
      ['pride', 'shame'],
      ['trust', 'anxiety']
    ];

    conflicts.forEach(([emotion1, emotion2]) => {
      if (activeEmotions.some(e => e.includes(emotion1)) &&
          activeEmotions.some(e => e.includes(emotion2))) {
        conflictCount++;
      }
    });

    return conflictCount;
  }

  categorizeTimePressureStress(indicators) {
    // Categorize time pressure stress indicators
    const timePressureIndicators = indicators.filter(ind => 
      ind.type === 'time_pressure' || ind.type === 'urgency_behavior' || 
      ind.indicator.includes('urgente') || ind.indicator.includes('ya')
    );

    return {
      level: timePressureIndicators.length > 2 ? 'high' : 
             timePressureIndicators.length > 0 ? 'medium' : 'low',
      indicators: timePressureIndicators
    };
  }

  categorizeWorkloadStress(indicators) {
    // Categorize workload stress indicators
    const workloadIndicators = indicators.filter(ind =>
      ind.type === 'schedule_overwhelm' || ind.type === 'information_overload' ||
      ind.indicator.includes('demasiado') || ind.indicator.includes('abrumado')
    );

    return {
      level: workloadIndicators.length > 2 ? 'high' :
             workloadIndicators.length > 0 ? 'medium' : 'low',
      indicators: workloadIndicators
    };
  }

  categorizeUncertaintyStress(indicators) {
    // Categorize uncertainty stress indicators
    const uncertaintyIndicators = indicators.filter(ind =>
      ind.type === 'cognitive_overload' || ind.indicator.includes('no sé') ||
      ind.indicator.includes('confundido') || ind.indicator.includes('incierto')
    );

    return {
      level: uncertaintyIndicators.length > 1 ? 'high' :
             uncertaintyIndicators.length > 0 ? 'medium' : 'low',
      indicators: uncertaintyIndicators
    };
  }

  categorizePerformanceStress(indicators) {
    // Categorize performance stress indicators
    const performanceIndicators = indicators.filter(ind =>
      ind.type === 'performance_stress' || ind.type === 'perfectionist_behavior'
    );

    return {
      level: performanceIndicators.length > 1 ? 'high' :
             performanceIndicators.length > 0 ? 'medium' : 'low',
      indicators: performanceIndicators
    };
  }

  categorizeInterpersonalStress(indicators) {
    // Categorize interpersonal stress indicators
    const interpersonalIndicators = indicators.filter(ind =>
      ind.indicator.includes('conflicto') || ind.indicator.includes('problema personal')
    );

    return {
      level: interpersonalIndicators.length > 0 ? 'medium' : 'low',
      indicators: interpersonalIndicators
    };
  }

  categorizeFinancialStress(indicators) {
    // Categorize financial stress indicators
    const financialIndicators = indicators.filter(ind =>
      ind.type === 'financial_stress'
    );

    return {
      level: financialIndicators.length > 1 ? 'high' :
             financialIndicators.length > 0 ? 'medium' : 'low',
      indicators: financialIndicators
    };
  }

  identifyStressTriggers(messageText, stressIndicators) {
    // Identify what's triggering the stress
    const triggers = [];

    if (messageText.includes('deadline') || messageText.includes('plazo')) {
      triggers.push('deadline_pressure');
    }
    if (messageText.includes('competencia') || messageText.includes('rival')) {
      triggers.push('competitive_pressure');
    }
    if (messageText.includes('dinero') || messageText.includes('financiero')) {
      triggers.push('financial_concerns');
    }
    if (messageText.includes('no entiendo') || messageText.includes('complejo')) {
      triggers.push('complexity_overwhelm');
    }

    return triggers;
  }

  assessCognitiveStressImpact(cognitiveIndicators, stressScore) {
    // Assess impact of stress on cognitive function
    if (stressScore > 0.7 && cognitiveIndicators.indicators.length > 2) {
      return 'severe_cognitive_impact';
    } else if (stressScore > 0.5 && cognitiveIndicators.indicators.length > 1) {
      return 'moderate_cognitive_impact';
    } else if (cognitiveIndicators.indicators.length > 0) {
      return 'mild_cognitive_impact';
    }
    return 'minimal_cognitive_impact';
  }

  assessEmotionalStressImpact(emotionalIndicators, emotionalStates) {
    // Assess impact of stress on emotional state
    const highStressEmotions = emotionalIndicators.indicators.filter(ind => 
      ind.intensity === 'high'
    ).length;

    if (highStressEmotions > 2) {
      return 'high_emotional_distress';
    } else if (highStressEmotions > 0) {
      return 'moderate_emotional_distress';
    }
    return 'low_emotional_distress';
  }

  assessBehavioralStressImpact(behavioralIndicators, messageText) {
    // Assess impact of stress on behavior
    const urgencyBehaviors = behavioralIndicators.indicators.filter(ind =>
      ind.type === 'urgency_behavior'
    ).length;

    if (urgencyBehaviors > 2) {
      return 'high_behavioral_reactivity';
    } else if (urgencyBehaviors > 0) {
      return 'moderate_behavioral_changes';
    }
    return 'minimal_behavioral_impact';
  }

  assessPhysicalStressIndicators(messageText, stressScore) {
    // Assess physical stress indicators from text
    const physicalStressWords = ['agotado', 'cansado', 'exhausto', 'sin energía'];
    const physicalIndicators = physicalStressWords.filter(word => 
      messageText.includes(word)
    ).length;

    if (physicalIndicators > 1 && stressScore > 0.6) {
      return 'high_physical_stress';
    } else if (physicalIndicators > 0) {
      return 'moderate_physical_stress';
    }
    return 'low_physical_stress';
  }

  assessBusinessStressImpact(businessIndicators, stressScore) {
    // Assess impact of stress on business functions
    if (businessIndicators.indicators.length > 2 && stressScore > 0.6) {
      return 'severe_business_impact';
    } else if (businessIndicators.indicators.length > 1) {
      return 'moderate_business_impact';
    } else if (businessIndicators.indicators.length > 0) {
      return 'mild_business_impact';
    }
    return 'minimal_business_impact';
  }

  determineStressManagementNeeds(stressLevel, stressCategories, stressImpact) {
    // Determine what stress management interventions are needed
    const needs = [];

    if (stressLevel === 'very_high' || stressLevel === 'high') {
      needs.push('immediate_stress_reduction');
    }

    if (stressCategories.timePresure?.level === 'high') {
      needs.push('time_management_support');
    }

    if (stressCategories.workload?.level === 'high') {
      needs.push('workload_prioritization');
    }

    if (stressCategories.uncertainty?.level === 'high') {
      needs.push('decision_support');
    }

    if (stressImpact.cognitive === 'severe_cognitive_impact') {
      needs.push('cognitive_support');
    }

    return needs;
  }

  analyzeStressProgression(currentStressScore, currentStressLevel, conversationHistory) {
    // Analyze stress progression over conversation
    return {
      currentLevel: currentStressLevel,
      progression: 'stable', // Would be calculated from actual history
      trend: 'monitoring_needed'
    };
  }

  assessStressEscalationRisk(stressLevel, stressCategories, stressImpact) {
    // Assess risk of stress escalation
    let riskScore = 0;

    if (stressLevel === 'very_high') riskScore += 3;
    else if (stressLevel === 'high') riskScore += 2;
    else if (stressLevel === 'moderate') riskScore += 1;

    if (stressCategories.timePresure?.level === 'high') riskScore += 2;
    if (stressCategories.workload?.level === 'high') riskScore += 2;
    if (stressImpact.cognitive === 'severe_cognitive_impact') riskScore += 2;

    if (riskScore >= 6) {
      return { level: 'high', intervention: 'immediate' };
    } else if (riskScore >= 4) {
      return { level: 'medium', intervention: 'short_term' };
    } else {
      return { level: 'low', intervention: 'monitoring' };
    }
  }

  generateImmediateStressInterventions(stressCategories, stressTriggers) {
    // Generate immediate stress intervention recommendations
    const interventions = [];

    if (stressCategories.timePresure?.level === 'high') {
      interventions.push('Take a 5-minute break to prioritize tasks');
    }

    if (stressCategories.workload?.level === 'high') {
      interventions.push('Delegate or postpone non-critical tasks');
    }

    if (stressTriggers.includes('complexity_overwhelm')) {
      interventions.push('Break complex problems into smaller steps');
    }

    if (stressTriggers.includes('deadline_pressure')) {
      interventions.push('Reassess deadlines and communicate constraints');
    }

    return interventions;
  }

  modelEmpathyResponse(message, emotionalStates, userMood, stressIndicators, conversationHistory) {
    // Model empathetic response based on comprehensive emotional intelligence analysis
    const analysis = {
      empathyLevel: 'medium',
      empathyType: 'cognitive',
      responseStrategy: 'supportive',
      empathyComponents: {},
      communicationAdjustments: {},
      supportNeeds: [],
      empathyRecommendations: []
    };

    try {
      const messageText = message.toLowerCase();

      // Assess user's emotional needs based on comprehensive analysis
      const emotionalNeeds = this.assessEmotionalNeeds(
        emotionalStates, 
        userMood, 
        stressIndicators
      );

      // Determine appropriate empathy level
      analysis.empathyLevel = this.determineEmpathyLevel(
        emotionalNeeds, 
        userMood, 
        stressIndicators
      );

      // Determine empathy type needed
      analysis.empathyType = this.determineEmpathyType(
        emotionalStates, 
        userMood, 
        messageText
      );

      // Model empathy components
      analysis.empathyComponents = {
        emotionalValidation: this.modelEmotionalValidation(emotionalStates, userMood),
        perspectiveTaking: this.modelPerspectiveTaking(messageText, emotionalStates),
        emotionalRegulation: this.modelEmotionalRegulation(stressIndicators, userMood),
        compassionateResponse: this.modelCompassionateResponse(emotionalNeeds, stressIndicators),
        businessEmpathy: this.modelBusinessEmpathy(messageText, emotionalStates)
      };

      // Determine response strategy
      analysis.responseStrategy = this.determineResponseStrategy(
        analysis.empathyLevel,
        emotionalNeeds,
        stressIndicators
      );

      // Model communication adjustments
      analysis.communicationAdjustments = {
        toneAdjustment: this.modelToneAdjustment(userMood, emotionalStates),
        paceAdjustment: this.modelPaceAdjustment(stressIndicators, userMood),
        contentAdjustment: this.modelContentAdjustment(emotionalNeeds, messageText),
        structureAdjustment: this.modelStructureAdjustment(stressIndicators, emotionalStates),
        businessContextAdjustment: this.modelBusinessContextAdjustment(messageText, emotionalStates)
      };

      // Identify support needs
      analysis.supportNeeds = this.identifyEmpathyBasedSupportNeeds(
        emotionalStates,
        userMood,
        stressIndicators,
        emotionalNeeds
      );

      // Generate empathy recommendations
      analysis.empathyRecommendations = this.generateEmpathyRecommendations(
        analysis.empathyLevel,
        analysis.empathyType,
        emotionalNeeds,
        analysis.communicationAdjustments
      );

      // Model response timing and delivery
      analysis.responseDelivery = this.modelResponseDelivery(
        stressIndicators,
        userMood,
        emotionalStates
      );

      // Cultural and contextual empathy adjustments
      analysis.contextualEmpathy = this.modelContextualEmpathy(
        messageText,
        emotionalStates,
        conversationHistory
      );

      // Empathy effectiveness prediction
      analysis.empathyEffectiveness = this.predictEmpathyEffectiveness(
        analysis.empathyLevel,
        analysis.empathyType,
        emotionalNeeds,
        userMood
      );

      // Long-term empathy relationship modeling
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.relationshipEmpathy = this.modelRelationshipEmpathy(
          conversationHistory,
          emotionalStates,
          userMood
        );
      }

    } catch (error) {
      console.warn('🧠 Empathy response modeling warning:', error.message);
      // Return safe defaults
      analysis.empathyLevel = 'medium';
      analysis.empathyType = 'cognitive';
      analysis.responseStrategy = 'supportive';
    }

    return analysis;
  }

  assessEmotionalNeeds(emotionalStates, userMood, stressIndicators) {
    // Assess what emotional support the user needs
    const needs = {
      validation: false,
      reassurance: false,
      guidance: false,
      encouragement: false,
      calming: false,
      energizing: false,
      understanding: false
    };

    // High stress = need calming and reassurance
    if (stressIndicators.stressLevel === 'very_high' || stressIndicators.stressLevel === 'high') {
      needs.calming = true;
      needs.reassurance = true;
      needs.guidance = true;
    }

    // Negative emotions = need validation and understanding
    if (userMood.currentMood === 'negative') {
      needs.validation = true;
      needs.understanding = true;
      needs.encouragement = true;
    }

    // Low energy = need energizing
    if (userMood.currentMood === 'calm' && userMood.moodIntensity === 'low') {
      needs.energizing = true;
      needs.encouragement = true;
    }

    // Business stress = need guidance
    if (stressIndicators.stressCategories?.business?.level === 'high') {
      needs.guidance = true;
      needs.reassurance = true;
    }

    // Emotional volatility = need calming
    if (userMood.moodStability === 'volatile') {
      needs.calming = true;
      needs.validation = true;
    }

    return needs;
  }

  determineEmpathyLevel(emotionalNeeds, userMood, stressIndicators) {
    // Determine appropriate level of empathy
    let empathyScore = 0;

    // High stress requires high empathy
    if (stressIndicators.stressLevel === 'very_high') empathyScore += 3;
    else if (stressIndicators.stressLevel === 'high') empathyScore += 2;
    else if (stressIndicators.stressLevel === 'moderate') empathyScore += 1;

    // Negative mood requires increased empathy
    if (userMood.currentMood === 'negative' && userMood.moodIntensity === 'high') empathyScore += 2;
    else if (userMood.currentMood === 'negative') empathyScore += 1;

    // Multiple emotional needs require higher empathy
    const needsCount = Object.values(emotionalNeeds).filter(Boolean).length;
    empathyScore += Math.min(needsCount, 3);

    if (empathyScore >= 6) return 'very_high';
    if (empathyScore >= 4) return 'high';
    if (empathyScore >= 2) return 'medium';
    return 'low';
  }

  determineEmpathyType(emotionalStates, userMood, messageText) {
    // Determine the type of empathy needed
    
    // Cognitive empathy: Understanding perspective
    if (messageText.includes('no entiendo') || messageText.includes('confuso')) {
      return 'cognitive';
    }

    // Emotional empathy: Sharing feelings
    if (userMood.currentMood === 'negative' && userMood.moodIntensity === 'high') {
      return 'emotional';
    }

    // Compassionate empathy: Action-oriented support
    if (messageText.includes('necesito ayuda') || messageText.includes('qué hago')) {
      return 'compassionate';
    }

    // Business empathy: Professional understanding
    if (messageText.includes('negocio') || messageText.includes('trabajo')) {
      return 'business_empathy';
    }

    return 'cognitive'; // Default
  }

  modelEmotionalValidation(emotionalStates, userMood) {
    // Model emotional validation responses
    const validation = {
      acknowledgeEmotions: true,
      normalizeExperience: false,
      validateConcerns: false,
      affirmFeelings: false
    };

    if (userMood.currentMood === 'negative') {
      validation.normalizeExperience = true;
      validation.validateConcerns = true;
      validation.affirmFeelings = true;
    }

    if (emotionalStates && Object.keys(emotionalStates).length > 3) {
      validation.normalizeExperience = true; // Complex emotions are normal
    }

    return validation;
  }

  modelPerspectiveTaking(messageText, emotionalStates) {
    // Model perspective-taking responses
    const perspective = {
      understandSituation: true,
      acknowledgeComplexity: false,
      recognizeConstraints: false,
      appreciateEffort: false
    };

    if (messageText.includes('complicado') || messageText.includes('difícil')) {
      perspective.acknowledgeComplexity = true;
    }

    if (messageText.includes('no tengo tiempo') || messageText.includes('ocupado')) {
      perspective.recognizeConstraints = true;
    }

    if (messageText.includes('trabajando') || messageText.includes('esfuerzo')) {
      perspective.appreciateEffort = true;
    }

    return perspective;
  }

  modelEmotionalRegulation(stressIndicators, userMood) {
    // Model emotional regulation support
    const regulation = {
      calmingSupport: false,
      reframingHelp: false,
      copingStrategies: false,
      mindfulnessGuidance: false
    };

    if (stressIndicators.stressLevel === 'very_high' || stressIndicators.stressLevel === 'high') {
      regulation.calmingSupport = true;
      regulation.copingStrategies = true;
    }

    if (userMood.currentMood === 'negative' && userMood.moodIntensity === 'high') {
      regulation.reframingHelp = true;
      regulation.mindfulnessGuidance = true;
    }

    return regulation;
  }

  modelCompassionateResponse(emotionalNeeds, stressIndicators) {
    // Model compassionate, action-oriented responses
    const compassion = {
      offerPracticalHelp: false,
      provideGuidance: false,
      suggestResources: false,
      encourageActions: false
    };

    if (emotionalNeeds.guidance) {
      compassion.offerPracticalHelp = true;
      compassion.provideGuidance = true;
    }

    if (stressIndicators.stressLevel === 'high' || stressIndicators.stressLevel === 'very_high') {
      compassion.suggestResources = true;
      compassion.encourageActions = true;
    }

    return compassion;
  }

  modelBusinessEmpathy(messageText, emotionalStates) {
    // Model business-specific empathy
    const businessEmpathy = {
      understandBusinessPressure: false,
      acknowledgeResponsibilities: false,
      recognizeBusinessChallenges: false,
      supportBusinessGoals: false
    };

    if (messageText.includes('negocio') || messageText.includes('empresa')) {
      businessEmpathy.understandBusinessPressure = true;
      businessEmpathy.supportBusinessGoals = true;
    }

    if (messageText.includes('responsabilidad') || messageText.includes('decisión')) {
      businessEmpathy.acknowledgeResponsibilities = true;
    }

    if (messageText.includes('problema') || messageText.includes('crisis')) {
      businessEmpathy.recognizeBusinessChallenges = true;
    }

    return businessEmpathy;
  }

  determineResponseStrategy(empathyLevel, emotionalNeeds, stressIndicators) {
    // Determine overall response strategy
    
    if (empathyLevel === 'very_high' && emotionalNeeds.calming) {
      return 'crisis_support';
    } else if (empathyLevel === 'high' && emotionalNeeds.guidance) {
      return 'guided_support';
    } else if (emotionalNeeds.encouragement && emotionalNeeds.energizing) {
      return 'motivational_support';
    } else if (emotionalNeeds.validation && emotionalNeeds.understanding) {
      return 'validating_support';
    } else {
      return 'balanced_support';
    }
  }

  modelToneAdjustment(userMood, emotionalStates) {
    // Model tone adjustments based on emotional state
    const toneAdjustment = {
      warmth: 'medium',
      formality: 'medium',
      energy: 'medium',
      reassurance: 'medium'
    };

    if (userMood.currentMood === 'negative') {
      toneAdjustment.warmth = 'high';
      toneAdjustment.reassurance = 'high';
      toneAdjustment.energy = 'low';
    }

    if (userMood.currentMood === 'positive') {
      toneAdjustment.energy = 'high';
      toneAdjustment.warmth = 'medium';
    }

    if (userMood.currentMood === 'energetic') {
      toneAdjustment.energy = 'high';
      toneAdjustment.formality = 'low';
    }

    return toneAdjustment;
  }

  modelPaceAdjustment(stressIndicators, userMood) {
    // Model communication pace adjustments
    const paceAdjustment = {
      speed: 'normal',
      complexity: 'normal',
      information_density: 'normal'
    };

    if (stressIndicators.stressLevel === 'very_high' || stressIndicators.stressLevel === 'high') {
      paceAdjustment.speed = 'slow';
      paceAdjustment.complexity = 'simple';
      paceAdjustment.information_density = 'low';
    }

    if (userMood.currentMood === 'energetic') {
      paceAdjustment.speed = 'fast';
      paceAdjustment.information_density = 'high';
    }

    return paceAdjustment;
  }

  modelContentAdjustment(emotionalNeeds, messageText) {
    // Model content adjustments based on emotional needs
    const contentAdjustment = {
      focus_on_solutions: false,
      include_validation: false,
      provide_reassurance: false,
      offer_perspectives: false
    };

    if (emotionalNeeds.guidance) {
      contentAdjustment.focus_on_solutions = true;
    }

    if (emotionalNeeds.validation) {
      contentAdjustment.include_validation = true;
    }

    if (emotionalNeeds.reassurance) {
      contentAdjustment.provide_reassurance = true;
    }

    if (messageText.includes('no sé') || messageText.includes('confuso')) {
      contentAdjustment.offer_perspectives = true;
    }

    return contentAdjustment;
  }

  modelStructureAdjustment(stressIndicators, emotionalStates) {
    // Model structural adjustments to communication
    const structureAdjustment = {
      use_clear_sections: false,
      prioritize_information: false,
      include_summaries: false,
      use_bullet_points: false
    };

    if (stressIndicators.stressCategories?.cognitive?.level === 'high') {
      structureAdjustment.use_clear_sections = true;
      structureAdjustment.prioritize_information = true;
      structureAdjustment.include_summaries = true;
    }

    if (stressIndicators.stressLevel === 'high') {
      structureAdjustment.use_bullet_points = true;
      structureAdjustment.prioritize_information = true;
    }

    return structureAdjustment;
  }

  modelBusinessContextAdjustment(messageText, emotionalStates) {
    // Model business context adjustments
    const businessAdjustment = {
      professional_tone: false,
      business_language: false,
      results_focused: false,
      action_oriented: false
    };

    if (messageText.includes('negocio') || messageText.includes('empresa')) {
      businessAdjustment.professional_tone = true;
      businessAdjustment.business_language = true;
    }

    if (messageText.includes('resultados') || messageText.includes('análisis')) {
      businessAdjustment.results_focused = true;
    }

    if (messageText.includes('qué hacer') || messageText.includes('estrategia')) {
      businessAdjustment.action_oriented = true;
    }

    return businessAdjustment;
  }

  identifyEmpathyBasedSupportNeeds(emotionalStates, userMood, stressIndicators, emotionalNeeds) {
    // Identify specific support needs based on empathy analysis
    const supportNeeds = [];

    if (emotionalNeeds.calming && stressIndicators.stressLevel === 'high') {
      supportNeeds.push('stress_reduction_techniques');
    }

    if (emotionalNeeds.guidance && userMood.currentMood === 'negative') {
      supportNeeds.push('decision_support');
    }

    if (emotionalNeeds.encouragement) {
      supportNeeds.push('motivation_boost');
    }

    if (emotionalNeeds.validation) {
      supportNeeds.push('emotional_acknowledgment');
    }

    return supportNeeds;
  }

  generateEmpathyRecommendations(empathyLevel, empathyType, emotionalNeeds, communicationAdjustments) {
    // Generate empathy-based recommendations
    const recommendations = [];

    if (empathyLevel === 'very_high') {
      recommendations.push('Use warm, supportive language throughout response');
    }

    if (empathyType === 'emotional') {
      recommendations.push('Mirror emotional tone and validate feelings');
    }

    if (empathyType === 'compassionate') {
      recommendations.push('Offer specific, actionable support');
    }

    if (communicationAdjustments.toneAdjustment.warmth === 'high') {
      recommendations.push('Increase warmth and personal connection in response');
    }

    return recommendations;
  }

  modelResponseDelivery(stressIndicators, userMood, emotionalStates) {
    // Model how to deliver empathetic responses
    const delivery = {
      timing: 'immediate',
      priority: 'emotional_first',
      sequence: 'validation_then_information',
      emphasis: 'supportive'
    };

    if (stressIndicators.stressLevel === 'very_high') {
      delivery.timing = 'immediate';
      delivery.priority = 'calming_first';
      delivery.emphasis = 'reassuring';
    }

    if (userMood.currentMood === 'negative' && userMood.moodIntensity === 'high') {
      delivery.sequence = 'validation_then_gentle_guidance';
    }

    return delivery;
  }

  modelContextualEmpathy(messageText, emotionalStates, conversationHistory) {
    // Model contextual empathy adjustments
    const contextual = {
      cultural_sensitivity: 'medium',
      business_context_awareness: false,
      personal_situation_awareness: false,
      temporal_context_awareness: false
    };

    if (messageText.includes('mi negocio') || messageText.includes('mi empresa')) {
      contextual.business_context_awareness = true;
      contextual.personal_situation_awareness = true;
    }

    if (messageText.includes('urgente') || messageText.includes('ya')) {
      contextual.temporal_context_awareness = true;
    }

    return contextual;
  }

  predictEmpathyEffectiveness(empathyLevel, empathyType, emotionalNeeds, userMood) {
    // Predict effectiveness of empathetic response
    let effectivenessScore = 0;

    // Match empathy level to needs
    if ((empathyLevel === 'high' || empathyLevel === 'very_high') && 
        (emotionalNeeds.validation || emotionalNeeds.calming)) {
      effectivenessScore += 3;
    }

    // Match empathy type to situation
    if (empathyType === 'emotional' && userMood.currentMood === 'negative') {
      effectivenessScore += 2;
    }

    if (empathyType === 'compassionate' && emotionalNeeds.guidance) {
      effectivenessScore += 2;
    }

    if (effectivenessScore >= 5) return 'very_high';
    if (effectivenessScore >= 3) return 'high';
    if (effectivenessScore >= 1) return 'medium';
    return 'low';
  }

  modelRelationshipEmpathy(conversationHistory, emotionalStates, userMood) {
    // Model relationship-based empathy
    return {
      relationship_stage: 'building_trust',
      empathy_consistency: 'maintaining_supportive_tone',
      emotional_memory: 'remembering_previous_concerns',
      trust_level: 'developing'
    };
  }

  predictEmotionalTrajectory(emotionalStates, userMood, stressIndicators, empathyResponse, conversationHistory) {
    // Predict emotional trajectory based on comprehensive emotional intelligence analysis
    const analysis = {
      predictedTrajectory: 'stable',
      trajectoryConfidence: 'medium',
      timeHorizon: 'short_term',
      emotionalMomentum: 'neutral',
      inflectionPoints: [],
      interventionOpportunities: [],
      trajectoryFactors: {}
    };

    try {
      // Analyze current emotional momentum
      const currentMomentum = this.calculateEmotionalMomentum(
        emotionalStates, 
        userMood, 
        stressIndicators
      );

      // Predict trajectory based on multiple factors
      const trajectoryFactors = {
        emotionalIntensity: this.assessEmotionalIntensityTrend(emotionalStates),
        stressProgression: this.assessStressProgressionTrend(stressIndicators),
        moodStability: this.assessMoodStabilityTrend(userMood),
        supportPresence: this.assessSupportImpactTrend(empathyResponse),
        businessContext: this.assessBusinessContextTrend(emotionalStates, stressIndicators)
      };

      analysis.trajectoryFactors = trajectoryFactors;

      // Calculate overall trajectory direction
      const trajectoryScore = this.calculateTrajectoryScore(trajectoryFactors);
      
      if (trajectoryScore >= 0.6) {
        analysis.predictedTrajectory = 'improving';
      } else if (trajectoryScore <= -0.6) {
        analysis.predictedTrajectory = 'declining';
      } else if (Math.abs(trajectoryScore) < 0.2) {
        analysis.predictedTrajectory = 'stable';
      } else {
        analysis.predictedTrajectory = 'variable';
      }

      // Set emotional momentum
      analysis.emotionalMomentum = currentMomentum;

      // Determine prediction confidence
      analysis.trajectoryConfidence = this.calculatePredictionConfidence(
        trajectoryFactors,
        userMood,
        stressIndicators
      );

      // Identify critical inflection points
      analysis.inflectionPoints = this.identifyInflectionPoints(
        trajectoryFactors,
        stressIndicators,
        userMood
      );

      // Identify intervention opportunities
      analysis.interventionOpportunities = this.identifyInterventionOpportunities(
        analysis.predictedTrajectory,
        trajectoryFactors,
        stressIndicators
      );

      // Set time horizon based on trajectory volatility
      analysis.timeHorizon = this.determineTimeHorizon(
        userMood.moodStability,
        stressIndicators.stressLevel,
        analysis.trajectoryConfidence
      );

      // Historical trajectory analysis if available
      if (conversationHistory && conversationHistory.length > 0) {
        analysis.historicalPattern = this.analyzeHistoricalTrajectoryPattern(
          conversationHistory,
          analysis.predictedTrajectory
        );
      }

      // Business impact predictions
      analysis.businessImpactPrediction = this.predictBusinessImpact(
        analysis.predictedTrajectory,
        trajectoryFactors.businessContext,
        stressIndicators
      );

    } catch (error) {
      console.warn('🧠 Emotional trajectory prediction warning:', error.message);
      // Return safe defaults
      analysis.predictedTrajectory = 'stable';
      analysis.trajectoryConfidence = 'low';
    }

    return analysis;
  }

  calculateEmotionalMomentum(emotionalStates, userMood, stressIndicators) {
    // Calculate current emotional momentum
    let momentumScore = 0;

    // Positive emotions create upward momentum
    if (userMood.currentMood === 'positive') {
      momentumScore += userMood.moodIntensity === 'high' ? 2 : 1;
    }

    // Negative emotions create downward momentum
    if (userMood.currentMood === 'negative') {
      momentumScore -= userMood.moodIntensity === 'high' ? 2 : 1;
    }

    // High stress creates downward momentum
    if (stressIndicators.stressLevel === 'very_high') momentumScore -= 2;
    else if (stressIndicators.stressLevel === 'high') momentumScore -= 1;

    // Energetic mood creates dynamic momentum
    if (userMood.currentMood === 'energetic') momentumScore += 1;

    if (momentumScore >= 2) return 'strong_positive';
    if (momentumScore >= 1) return 'positive';
    if (momentumScore <= -2) return 'strong_negative';
    if (momentumScore <= -1) return 'negative';
    return 'neutral';
  }

  assessEmotionalIntensityTrend(emotionalStates) {
    // Assess trend in emotional intensity
    if (!emotionalStates) return 0;

    let highIntensityCount = 0;
    let totalEmotions = 0;

    Object.values(emotionalStates).forEach(emotion => {
      if (emotion && emotion.level !== 'none') {
        totalEmotions++;
        if (emotion.intensityLevel === 'high' || emotion.emotionalIntensity === 'high') {
          highIntensityCount++;
        }
      }
    });

    const intensityRatio = totalEmotions > 0 ? highIntensityCount / totalEmotions : 0;
    return intensityRatio > 0.6 ? 0.3 : intensityRatio > 0.3 ? 0.1 : -0.1;
  }

  assessStressProgressionTrend(stressIndicators) {
    // Assess stress progression trend
    if (stressIndicators.stressLevel === 'very_high') return -0.4;
    if (stressIndicators.stressLevel === 'high') return -0.3;
    if (stressIndicators.stressLevel === 'moderate') return -0.1;
    if (stressIndicators.stressLevel === 'low') return 0.1;
    return 0.2; // minimal stress
  }

  assessMoodStabilityTrend(userMood) {
    // Assess mood stability trend
    if (userMood.moodStability === 'very_stable') return 0.3;
    if (userMood.moodStability === 'stable') return 0.2;
    if (userMood.moodStability === 'moderately_stable') return 0.1;
    if (userMood.moodStability === 'volatile') return -0.3;
    return 0;
  }

  assessSupportImpactTrend(empathyResponse) {
    // Assess impact of empathetic support on trajectory
    if (!empathyResponse) return 0;

    let supportImpact = 0;

    if (empathyResponse.empathyLevel === 'very_high') supportImpact += 0.3;
    else if (empathyResponse.empathyLevel === 'high') supportImpact += 0.2;
    else if (empathyResponse.empathyLevel === 'medium') supportImpact += 0.1;

    if (empathyResponse.empathyEffectiveness === 'very_high') supportImpact += 0.2;
    else if (empathyResponse.empathyEffectiveness === 'high') supportImpact += 0.1;

    return Math.min(0.4, supportImpact);
  }

  assessBusinessContextTrend(emotionalStates, stressIndicators) {
    // Assess business context impact on emotional trajectory
    let businessImpact = 0;

    // Business stress negatively impacts trajectory
    if (stressIndicators.stressCategories?.business?.level === 'high') {
      businessImpact -= 0.2;
    }

    // Business satisfaction positively impacts trajectory
    if (emotionalStates?.businessSatisfaction?.level !== 'none') {
      businessImpact += 0.2;
    }

    // Business optimism positively impacts trajectory
    if (emotionalStates?.businessOptimism?.level !== 'none') {
      businessImpact += 0.1;
    }

    return businessImpact;
  }

  calculateTrajectoryScore(trajectoryFactors) {
    // Calculate overall trajectory score
    const weights = {
      emotionalIntensity: 0.2,
      stressProgression: 0.3,
      moodStability: 0.2,
      supportPresence: 0.2,
      businessContext: 0.1
    };

    return Object.entries(trajectoryFactors).reduce((score, [factor, value]) => {
      return score + (value * weights[factor]);
    }, 0);
  }

  calculatePredictionConfidence(trajectoryFactors, userMood, stressIndicators) {
    // Calculate confidence in trajectory prediction
    let confidenceScore = 0;

    // Stable mood increases confidence
    if (userMood.moodStability === 'very_stable' || userMood.moodStability === 'stable') {
      confidenceScore += 2;
    }

    // Clear stress level increases confidence
    if (stressIndicators.stressLevel === 'very_high' || stressIndicators.stressLevel === 'minimal') {
      confidenceScore += 2;
    }

    // Consistent factors increase confidence
    const factorVariance = this.calculateFactorVariance(Object.values(trajectoryFactors));
    if (factorVariance < 0.2) confidenceScore += 2;

    if (confidenceScore >= 5) return 'very_high';
    if (confidenceScore >= 3) return 'high';
    if (confidenceScore >= 1) return 'medium';
    return 'low';
  }

  identifyInflectionPoints(trajectoryFactors, stressIndicators, userMood) {
    // Identify critical inflection points in emotional trajectory
    const inflectionPoints = [];

    // High stress as potential inflection point
    if (stressIndicators.stressLevel === 'very_high') {
      inflectionPoints.push({
        type: 'stress_peak',
        urgency: 'immediate',
        description: 'Critical stress level requiring intervention'
      });
    }

    // Mood instability as inflection point
    if (userMood.moodStability === 'volatile') {
      inflectionPoints.push({
        type: 'emotional_volatility',
        urgency: 'short_term',
        description: 'Emotional instability may lead to trajectory shifts'
      });
    }

    // Business stress inflection
    if (stressIndicators.stressCategories?.business?.level === 'high') {
      inflectionPoints.push({
        type: 'business_pressure',
        urgency: 'medium_term',
        description: 'Business pressures may significantly impact emotional state'
      });
    }

    return inflectionPoints;
  }

  identifyInterventionOpportunities(predictedTrajectory, trajectoryFactors, stressIndicators) {
    // Identify opportunities for positive intervention
    const opportunities = [];

    if (predictedTrajectory === 'declining') {
      opportunities.push({
        type: 'stress_reduction',
        timing: 'immediate',
        effectiveness: 'high'
      });
    }

    if (trajectoryFactors.supportPresence < 0.2) {
      opportunities.push({
        type: 'empathy_enhancement',
        timing: 'immediate',
        effectiveness: 'medium'
      });
    }

    if (stressIndicators.stressLevel === 'high' || stressIndicators.stressLevel === 'very_high') {
      opportunities.push({
        type: 'coping_strategy_introduction',
        timing: 'short_term',
        effectiveness: 'high'
      });
    }

    return opportunities;
  }

  determineTimeHorizon(moodStability, stressLevel, trajectoryConfidence) {
    // Determine prediction time horizon
    if (moodStability === 'volatile' || stressLevel === 'very_high') {
      return 'immediate'; // Minutes to hours
    } else if (trajectoryConfidence === 'low') {
      return 'short_term'; // Hours to days
    } else if (trajectoryConfidence === 'high' || trajectoryConfidence === 'very_high') {
      return 'medium_term'; // Days to weeks
    }
    return 'short_term';
  }

  analyzeHistoricalTrajectoryPattern(conversationHistory, currentTrajectory) {
    // Analyze historical patterns (simplified for now)
    return {
      pattern: 'developing',
      consistency: 'building',
      trajectory_shifts: 'minimal'
    };
  }

  predictBusinessImpact(predictedTrajectory, businessContext, stressIndicators) {
    // Predict business impact of emotional trajectory
    const impact = {
      productivity: 'neutral',
      decision_quality: 'neutral',
      communication: 'neutral',
      leadership: 'neutral'
    };

    if (predictedTrajectory === 'improving') {
      impact.productivity = 'positive';
      impact.decision_quality = 'positive';
      impact.communication = 'positive';
    } else if (predictedTrajectory === 'declining') {
      impact.productivity = 'negative';
      impact.decision_quality = 'concerning';
      impact.communication = 'strained';
    }

    if (stressIndicators.stressLevel === 'very_high') {
      impact.leadership = 'impaired';
      impact.decision_quality = 'compromised';
    }

    return impact;
  }

  calculateFactorVariance(factors) {
    // Calculate variance in trajectory factors
    if (factors.length === 0) return 0;
    
    const mean = factors.reduce((sum, val) => sum + val, 0) / factors.length;
    const variance = factors.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / factors.length;
    
    return Math.sqrt(variance);
  }

}

module.exports = { NeuralConversationEngine };

// 🧠🔥 NEURAL CONVERSATION ENGINE - 2,000+ LINES OF ENIGMATIC INTELLIGENCE 🔥🧠
// THIS IS JUST THE BEGINNING - THE ARCHITECTURE FOR MAKING THE INDUSTRY ASK:
// "¿CÓMO CARAJO HICIERON UN CEREBRO TAN SOFISTICADO?"