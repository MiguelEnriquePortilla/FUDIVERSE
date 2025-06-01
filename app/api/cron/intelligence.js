// pages/api/cron/intelligence.js
// COMPATIBILITY LAYER: Pages Router → App Router

export default async function handler(req, res) {
  try {
    console.log('🧠 Pages Router: Intelligence wrapper called');
    
    // Verify cron authorization
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('🚨 Unauthorized intelligence access attempt');
      return res.status(401).json({ 
        error: 'Unauthorized',
        timestamp: new Date().toISOString()
      });
    }

    // Get the correct domain for internal call
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    console.log(`🎯 Calling App Router: ${baseUrl}/api/cron/intelligence`);
    
    // Call the App Router endpoint
    const response = await fetch(`${baseUrl}/api/cron/intelligence`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    console.log('✅ App Router response received');
    console.log('📊 Status:', response.status);
    
    // Return the exact response from App Router
    res.status(response.status).json({
      ...data,
      wrapper: 'pages_router_compatibility',
      originalStatus: response.status
    });
    
  } catch (error) {
    console.error('❌ Pages Router wrapper error:', error);
    
    res.status(500).json({
      error: 'Compatibility layer failed',
      message: error.message,
      timestamp: new Date().toISOString(),
      wrapper: 'pages_router_compatibility'
    });
  }
}