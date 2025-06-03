// 📁 app/api/integrations/poster/connect/route.ts
// POSTER MARKETPLACE CONNECTION GATEWAY
// Entry point when users click "Connect" in Poster Marketplace

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔗 FUDIVERSE Poster connection initiated from marketplace');
    
    const { searchParams } = new URL(request.url);
    
    // Get parameters from Poster marketplace
    const account_token = searchParams.get('account_token');
    const poster_account = searchParams.get('account');
    const user_id = searchParams.get('user_id');
    
    console.log(`📊 Connection request details:`);
    console.log(`   - Poster Account: ${poster_account}`);
    console.log(`   - User ID: ${user_id}`);
    console.log(`   - Account Token: ${account_token ? 'received' : 'missing'}`);
    
    // Validate required parameters
    if (!account_token) {
      console.log('❌ Missing account_token parameter');
      return NextResponse.json({ 
        error: 'Missing account_token parameter',
        message: 'This endpoint must be called from Poster Marketplace'
      }, { status: 400 });
    }
    
    // Generate OAuth state with connection info
    const oauthState = Buffer.from(JSON.stringify({
      account_token,
      poster_account,
      user_id,
      timestamp: Date.now(),
      source: 'marketplace'
    })).toString('base64');
    
    // Build Poster OAuth authorization URL
    const oauthUrl = new URL('https://api.joinposter.com/oauth/authorize');
    oauthUrl.searchParams.set('client_id', '4021');
    oauthUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL || 'https://fudiverse.vercel.app'}/api/integrations/poster/oauth`);
    oauthUrl.searchParams.set('response_type', 'code');
    oauthUrl.searchParams.set('state', oauthState);
    
    console.log(`🎯 Redirecting to OAuth: ${oauthUrl.toString()}`);
    console.log(`🔐 OAuth State: ${oauthState}`);
    
    // Redirect user to Poster OAuth
    return NextResponse.redirect(oauthUrl.toString());
    
  } catch (error) {
    console.error('❌ Poster connection error:', error);
    
    return NextResponse.json({
      error: 'Connection failed',
      message: 'Failed to initiate Poster OAuth flow',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Handle POST requests (alternative entry point)
export async function POST(request: NextRequest) {
  console.log('📥 POST request to connection endpoint');
  
  try {
    const body = await request.json();
    console.log('📦 Connection POST data:', body);
    
    // Create GET-style URL with parameters
    const url = new URL(request.url);
    if (body.account_token) url.searchParams.set('account_token', body.account_token);
    if (body.account) url.searchParams.set('account', body.account);
    if (body.user_id) url.searchParams.set('user_id', body.user_id);
    
    // Create new request and process as GET
    const getRequest = new NextRequest(url.toString(), {
      method: 'GET',
      headers: request.headers
    });
    
    return GET(getRequest);
    
  } catch (error) {
    console.error('❌ POST connection error:', error);
    
    return NextResponse.json({
      error: 'Invalid POST data',
      message: 'Failed to process connection request',
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
}