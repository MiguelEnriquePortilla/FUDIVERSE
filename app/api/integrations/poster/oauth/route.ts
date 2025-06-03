// 📁 app/api/integrations/poster/oauth/route.ts
// POSTER OAUTH CALLBACK HANDLER
// Processes OAuth authorization codes and completes integration

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 OAuth callback received from Poster');
    
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    
    // Handle OAuth errors
    if (error) {
      console.log(`❌ OAuth error: ${error}`);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?error=oauth_denied`
      );
    }
    
    // Validate required parameters
    if (!code || !state) {
      console.log('❌ Missing OAuth parameters');
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?error=oauth_invalid`
      );
    }
    
    // Decode OAuth state
    let connectionInfo;
    try {
      connectionInfo = JSON.parse(Buffer.from(state, 'base64').toString());
      console.log('🔓 Decoded connection info:', connectionInfo);
    } catch (decodeError) {
      console.log('❌ Invalid OAuth state');
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?error=invalid_state`
      );
    }
    
    // Exchange authorization code for access token
    console.log('🔄 Exchanging code for access token...');
    
    const tokenResponse = await fetch('https://api.joinposter.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: '4021',
        client_secret: 'bce702a7b394b9962165bf55c12b8ddc',
        code: code,
        grant_type: 'authorization_code'
      })
    });
    
    if (!tokenResponse.ok) {
      console.log(`❌ Token exchange failed: ${tokenResponse.status}`);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?error=token_exchange_failed`
      );
    }
    
    const tokenData = await tokenResponse.json();
    console.log('✅ Access token received');
    
    // Get restaurant info from Poster API
    console.log('📊 Fetching restaurant info...');
    
    const restaurantResponse = await fetch('https://api.joinposter.com/settings.getAllSettings', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    let restaurantInfo = {
      name: connectionInfo.poster_account || 'Unknown Restaurant',
      poster_account_url: connectionInfo.poster_account,
      currency: 'MXN'
    };
    
    if (restaurantResponse.ok) {
      const settings = await restaurantResponse.json();
      restaurantInfo = {
        name: settings.response?.company_name || restaurantInfo.name,
        poster_account_url: connectionInfo.poster_account,
        currency: settings.response?.currency || 'MXN'
      };
      console.log('📋 Restaurant info fetched:', restaurantInfo);
    }
    
    // Store restaurant and access token in database
    console.log('💾 Storing restaurant connection...');
    
    const { data: restaurant, error: dbError } = await supabase
      .from('restaurants')
      .upsert({
        name: restaurantInfo.name,
        poster_account_url: restaurantInfo.poster_account_url,
        poster_access_token: tokenData.access_token,
        poster_account_token: connectionInfo.account_token,
        poster_user_id: connectionInfo.user_id,
        currency: restaurantInfo.currency,
        integration_status: 'connected',
        connected_at: new Date().toISOString(),
        last_sync: null,
        status: 'active'
      }, {
        onConflict: 'poster_account_url',
        ignoreDuplicates: false
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('❌ Database error:', dbError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?error=database_error`
      );
    }
    
    console.log('✅ Restaurant connected successfully:', restaurant.id);
    
    // Trigger initial data sync
    try {
      console.log('🔄 Triggering initial data sync...');
      
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/api/cron/poster-sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CRON_SECRET}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          restaurant_id: restaurant.id,
          initial_sync: true
        })
      });
      
      console.log('🚀 Initial sync triggered');
      
    } catch (syncError) {
      console.log('⚠️ Initial sync trigger failed (will sync on next cron):', syncError);
    }
    
    // Redirect to success page
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?connected=true&restaurant=${restaurant.id}&name=${encodeURIComponent(restaurantInfo.name)}`;
    
    console.log(`🎉 Integration complete, redirecting to: ${successUrl}`);
    
    return NextResponse.redirect(successUrl);
    
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/dashboard?error=integration_failed&details=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`
    );
  }
}

// Handle POST method (webhook alternative)
export async function POST(request: NextRequest) {
  console.log('📥 OAuth POST callback received');
  
  try {
    const body = await request.json();
    console.log('📦 OAuth POST data:', body);
    
    // Process similar to GET but with POST data
    // This is for alternative OAuth flows
    
    return NextResponse.json({
      success: true,
      message: 'OAuth POST callback processed',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ OAuth POST error:', error);
    
    return NextResponse.json({
      error: 'OAuth POST processing failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}