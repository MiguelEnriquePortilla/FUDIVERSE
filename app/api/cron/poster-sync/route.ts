// 📁 app/api/cron/poster-sync/route.ts
// PHASE 1 - DAY 5: AUTOMATED DAILY POSTER SYNC
// According to FUDIVERSE MASTER PLAN

import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 🔐 Verify cron authorization (CRITICAL SECURITY)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('🚨 Unauthorized cron access attempt');
      return NextResponse.json({ 
        error: 'Unauthorized',
        timestamp: new Date().toISOString()
      }, { status: 401 });
    }

    console.log('🔄 Starting automated Poster sync...');
    console.log(`⏰ Sync initiated at: ${new Date().toISOString()}`);
    
    // 📦 Import DataQuarryImporterV3 (Named export - matching file structure)
    const { DataQuarryImporterV3 } = require('../../../../services/dataQuarry/DataQuarryImporterV3.js');
    
    // 🚀 Initialize and run full import (proven working code)
    const importer = new DataQuarryImporterV3();
    const importStartTime = Date.now();
    
    // Execute the systematic import
    await importer.runFullImport();
    
    const importDuration = Date.now() - importStartTime;
    const totalDuration = Date.now() - startTime;
    
    console.log(`✅ Poster sync completed successfully in ${importDuration}ms`);
    
    // 📊 Return comprehensive status (Master Plan requirements)
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Poster data sync completed successfully',
      performance: {
        importDuration: `${importDuration}ms`,
        totalDuration: `${totalDuration}ms`,
        efficiency: importDuration < 120000 ? 'optimal' : 'review_needed'
      },
      nextScheduledSync: '1:00 AM daily',
      phase: 'PHASE_1_DAY_5_COMPLETE',
      masterPlanStatus: 'ON_TRACK'
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    
    // 🚨 Comprehensive error handling
    console.error('❌ Poster sync failed:', error);
    
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Poster sync failed',
      errorDetails: {
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${totalDuration}ms`,
        phase: 'PHASE_1_DAY_5_ERROR'
      },
      retryRecommendation: 'Check Poster API credentials and network connectivity',
      escalation: 'Review DataQuarryImporterV3 logs for detailed diagnostics'
    }, { status: 500 });
  }
}

// 🎯 FUTURE: POST method for manual triggers (Development/Testing)
export async function POST(request: NextRequest) {
  // Manual trigger with same logic as GET
  // Useful for testing before cron activation
  return GET(request);
}