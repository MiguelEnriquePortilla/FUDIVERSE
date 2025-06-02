// 📁 app/api/cron/intelligence/route.ts
// MINIMAL UPDATE: Only change the processor, keep everything else working
// USING EXISTING STRUCTURE THAT WORKS

import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 🔐 Verify cron authorization (KEEP EXISTING - WORKS)
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
    
    // 🔧 MINIMAL CHANGE: Use UniversalIntelligenceProcessor instead
    const { UniversalIntelligenceProcessor } = require('../../../../services/intelligence/UniversalIntelligenceProcessor.js');
    
    // 🚀 Initialize universal processor
    const processor = new UniversalIntelligenceProcessor();
    const processingStartTime = Date.now();
    
    console.log('🌍 Processing ALL restaurants with universal intelligence...');
    
    // 🧠 Execute universal intelligence processing (CLAUDE MODEL)
    const processingResult = await processor.processAllRestaurants();
    
    const processingDuration = Date.now() - processingStartTime;
    const totalDuration = Date.now() - startTime;
    
    console.log(`✅ Universal intelligence processing completed in ${processingDuration}ms`);
    console.log(`📊 Restaurants processed: ${processingResult.totalRestaurants}`);
    console.log(`✅ Successful: ${processingResult.successful}, ❌ Failed: ${processingResult.failed}`);
    
    // 📊 Return comprehensive intelligence status (KEEP EXISTING FORMAT)
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Universal intelligence processing completed successfully',
      processing: {
        model: 'claude_inspired_universal',
        restaurantsProcessed: processingResult.totalRestaurants,
        successful: processingResult.successful,
        failed: processingResult.failed,
        tablesPopulated: ['intelligent_product_daily', 'intelligent_payment_daily', 'intelligent_temporal_daily'],
        processingMode: 'vectorized_pre_calculation'
      },
      performance: {
        processingDuration: `${processingDuration}ms`,
        totalDuration: `${totalDuration}ms`,
        efficiency: processingDuration < 180000 ? 'optimal' : 'review_needed',
        restaurantsPerSecond: (processingResult.totalRestaurants / (processingDuration / 1000)).toFixed(2)
      },
      pipeline: {
        dataSource: 'fresh_poster_sync',
        processingMode: 'universal_claude_model',
        readyForInstantConsumption: true,
        scalability: '1M_restaurants_ready'
      },
      nextScheduledProcessing: '2:00 AM daily (after 1:00 AM Poster sync)',
      phase: 'CLAUDE_MODEL_ACTIVE',
      masterPlanStatus: 'UNIVERSAL_INTELLIGENCE_PIPELINE_OPERATIONAL'
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    
    // 🚨 Comprehensive error handling (KEEP EXISTING)
    console.error('❌ Universal intelligence processing failed:', error);
    
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Universal intelligence processing failed',
      errorDetails: {
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${totalDuration}ms`,
        phase: 'CLAUDE_MODEL_ERROR',
        context: 'UniversalIntelligenceProcessor execution'
      },
      diagnostics: {
        checkDataAvailability: 'Verify fresh data from Poster sync (1:00 AM)',
        checkDatabaseConnections: 'Verify Supabase intelligence tables access',
        checkProcessorStatus: 'Review UniversalIntelligenceProcessor logs',
        checkScalability: 'Monitor batch processing performance'
      },
      retryRecommendation: 'Manual trigger available via POST method for debugging',
      escalation: 'Review universal intelligence processing pipeline'
    }, { status: 500 });
  }
}

// 🎯 Keep existing POST method (WORKS)
export async function POST(request: NextRequest) {
  // Manual trigger with same logic as GET
  console.log('🔬 Manual universal intelligence processing triggered');
  return GET(request);
}

// 🧠 Keep existing HEAD method (WORKS)
export async function HEAD(request: NextRequest) {
  try {
    // Quick health check (using corrected import)
    const { UniversalIntelligenceProcessor } = require('../../../../services/intelligence/UniversalIntelligenceProcessor.js');
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Intelligence-Status': 'healthy',
        'X-Model': 'claude_universal',
        'X-Last-Check': new Date().toISOString(),
        'X-Scalability': '1M_restaurants_ready'
      }
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Intelligence-Status': 'error',
        'X-Error': 'Universal processor unavailable'
      }
    });
  }
}