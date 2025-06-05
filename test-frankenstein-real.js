?? TESTING FRANKENSTEIN WITH REAL DATA... 
require('dotenv').config(); 
const { FudiClaudeDirect } = require('./services/brain/FudiClaudeDirect.js'); 
 
async function testFrankenstein() { 
  console.log('?? FRANKENSTEIN REAL DATA TEST...'); 
  const fudi = new FudiClaudeDirect( 
    process.env.NEXT_PUBLIC_SUPABASE_URL, 
    process.env.SUPABASE_ANON_KEY, 
    process.env.ANTHROPIC_API_KEY 
  ); 
 
  // Test with restaurant ID from data 
  const restaurantId = '13207c90-2ea6-4aa0-bfac-349753d24ea4'; 
  const query = 'Analiza todas mis ventas y dame insights de mi producto estrella POLLO ROSTIZADO'; 
 
  const result = await fudi.processQuery(query, restaurantId); 
  console.log('?? FRANKENSTEIN RESPONSE:'); 
  console.log(result.response); 
} 
 
testFrankenstein().catch(console.error); 
