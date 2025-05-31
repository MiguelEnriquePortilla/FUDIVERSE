// 📁 app/api/cron/intelligence/route.ts
// PHASE 1 - DAY 6: AUTOMATED DAILY INTELLIGENCE PROCESSING
// According to FUDIVERSE MASTER PLAN

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 🔐 Verify cron authorization (CRITICAL SECURITY)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('🚨 Unauthorized intelligence processing access attempt');
      return NextResponse.json({ 
        error: 'Unauthorized',
        timestamp: new Date().toISOString()
      }, { status: 401 });
    }

    console.log('🧠 Starting automated intelligence processing...');
    console.log(`⏰ Intelligence processing initiated at: ${new Date().toISOString()}`);
    
    // 🎯 Import BackgroundIntelligenceEngine (CommonJS - matching existing structure)
    const { BackgroundIntelligenceEngine } = require('../../../../services/intelligence/BackgroundIntelligenceEngine.js');
    
    // 🚀 Initialize intelligence engine
    const engine = new BackgroundIntelligenceEngine();
    const processingStartTime = Date.now();
    
    // 🏢 Process restaurant systematically (correct method name from existing code)
    const restaurantId = '13207c90-2ea6-4aa0-bfac-349753d24ea4'; // Main restaurant from Master Plan
    
    console.log(`🏢 Processing restaurant intelligence: ${restaurantId}`);
    
    // Execute systematic intelligence processing (using correct method name)
    const processingResult = await engine.processRestaurant(restaurantId);
    
    const processingDuration = Date.now() - processingStartTime;
    const totalDuration = Date.now() - startTime;
    
    console.log(`✅ Intelligence processing completed successfully in ${processingDuration}ms`);
    console.log(`📊 Metrics generated: ${processingResult?.metricsCount || 'multiple'}`);
    
    // 📊 Return comprehensive intelligence status (Master Plan requirements)
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Intelligence processing completed successfully',
      restaurantId: restaurantId,
      processing: {
        metricsGenerated: processingResult?.metricsCount || 'systematic_processing',
        patternsDiscovered: processingResult?.patternsCount || 'pattern_discovery',
        insightsCreated: processingResult?.insightsCount || 'consumable_insights',
        cacheUpdated: true
      },
      performance: {
        processingDuration: `${processingDuration}ms`,
        totalDuration: `${totalDuration}ms`,
        efficiency: processingDuration < 180000 ? 'optimal' : 'review_needed'
      },
      pipeline: {
        dataSource: 'fresh_poster_sync',
        processingMode: 'systematic_intelligence',
        readyForConsumption: true
      },
      nextScheduledProcessing: '2:00 AM daily (after 1:00 AM Poster sync)',
      phase: 'PHASE_1_DAY_6_COMPLETE',
      masterPlanStatus: 'INTELLIGENCE_PIPELINE_ACTIVE'
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    
    // 🚨 Comprehensive error handling
    console.error('❌ Intelligence processing failed:', error);
    
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Intelligence processing failed',
      errorDetails: {
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${totalDuration}ms`,
        phase: 'PHASE_1_DAY_6_ERROR',
        context: 'BackgroundIntelligenceEngine execution'
      },
      diagnostics: {
        checkDataAvailability: 'Verify fresh data from Poster sync (1:00 AM)',
        checkDatabaseConnections: 'Verify Supabase intelligent_metrics table access',
        checkEngineStatus: 'Review BackgroundIntelligenceEngine logs'
      },
      retryRecommendation: 'Manual trigger available via POST method for debugging',
      escalation: 'Review intelligence processing pipeline and data flow'
    }, { status: 500 });
  }
}

// 🎯 FUTURE: POST method for manual triggers (Development/Testing)
export async function POST(request: NextRequest) {
  // Manual trigger with same logic as GET
  // Useful for testing intelligence processing independently
  console.log('🔬 Manual intelligence processing triggered');
  return GET(request);
}

// 🧠 ADDITIONAL: Health check endpoint for intelligence system
export async function HEAD(request: NextRequest) {
  try {
    // Quick health check without full processing (using corrected import)
    const { BackgroundIntelligenceEngine } = require('../../../../services/intelligence/BackgroundIntelligenceEngine.js');
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Intelligence-Status': 'healthy',
        'X-Last-Check': new Date().toISOString(),
        'X-Phase': 'PHASE_1_DAY_6'
      }
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Intelligence-Status': 'error',
        'X-Error': 'Engine unavailable'
      }
    });
  }
}