// 📁 app/api/cron/poster-sync/route.ts
// ACTUALIZADO PARA USAR POSTER MIRROR IMPORTER

import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 🔐 Verify cron authorization
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('🚨 Unauthorized cron access attempt');
      return NextResponse.json({ 
        error: 'Unauthorized',
        timestamp: new Date().toISOString()
      }, { status: 401 });
    }

    console.log('🔄 Starting automated Poster Mirror sync...');
    console.log(`⏰ Sync initiated at: ${new Date().toISOString()}`);
    
    // 📦 Import PosterMirrorImporter (el nuevo importador limpio)
    const { PosterMirrorImporter } = require('../../../../services/dataQuarry/PosterMirrorImporter.js');
    
    // 🚀 Initialize and run mirror import
    const importer = new PosterMirrorImporter();
    const importStartTime = Date.now();
    
    console.log('🪞 Using MIRROR IMPORTER for 1:1 data sync...');
    
    // Execute the import
    const result = await importer.runFullImport();
    
    const importDuration = Date.now() - importStartTime;
    const totalDuration = Date.now() - startTime;
    
    console.log(`✅ Poster Mirror sync completed in ${importDuration}ms`);
    console.log(`📊 Success: ${result.success}, Duration: ${result.duration}s`);
    
    // 📊 Return comprehensive status
    return NextResponse.json({
      success: result.success,
      timestamp: new Date().toISOString(),
      message: result.success 
        ? 'Poster Mirror data sync completed successfully' 
        : 'Poster Mirror sync completed with errors',
      stats: result.stats,
      performance: {
        importDuration: `${importDuration}ms`,
        totalDuration: `${totalDuration}ms`,
        efficiency: importDuration < 120000 ? 'optimal' : 'review_needed'
      },
      importer: 'PosterMirrorImporter',
      tablesUpdated: [
        'poster_products',
        'poster_categories', 
        'poster_transactions',
        'poster_transaction_products',
        'poster_clients',
        'poster_client_addresses',
        'poster_employees',
        'poster_ingredients',
        'poster_suppliers',
        'poster_cash_shifts',
        'poster_supplies',
        'poster_supply_ingredients'
      ],
      nextScheduledSync: '1:00 AM UTC daily',
      phase: 'MIRROR_SYNC_ACTIVE',
      notes: 'Using 1:1 mirror tables for exact Poster data structure'
    });

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    
    // 🚨 Comprehensive error handling
    console.error('❌ Poster Mirror sync failed:', error);
    
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Poster Mirror sync failed',
      errorDetails: {
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${totalDuration}ms`,
        phase: 'MIRROR_SYNC_ERROR'
      },
      retryRecommendation: 'Check Poster API credentials and network connectivity',
      escalation: 'Review PosterMirrorImporter logs for detailed diagnostics',
      fallback: 'Old DataQuarryImporterV3 still available if needed'
    }, { status: 500 });
  }
}

// 🎯 POST method for manual triggers
export async function POST(request: NextRequest) {
  console.log('🔬 Manual Poster Mirror sync triggered');
  return GET(request);
}

// 🧪 HEAD method for health check
export async function HEAD(request: NextRequest) {
  try {
    const { PosterMirrorImporter } = require('../../../../services/dataQuarry/PosterMirrorImporter.js');
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Sync-Status': 'healthy',
        'X-Importer': 'PosterMirrorImporter',
        'X-Last-Check': new Date().toISOString(),
        'X-Tables-Count': '12'
      }
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Sync-Status': 'error',
        'X-Error': 'Mirror importer unavailable'
      }
    });
  }
}