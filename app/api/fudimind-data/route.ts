// app/api/fudimind-data/route.ts
// 🧠 FUDIMIND RAW DATA API - NO HARDCODING, JUST RAW DATABASE ACCESS
// Let Claude figure it out - he's smart enough!

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🔒 DEDICATED SUPABASE CLIENT FOR FUDIMIND
const supabaseFudiMind = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!,
 {
   auth: {
     autoRefreshToken: false,
     persistSession: false
   }
 }
);

export async function POST(request: NextRequest) {
 try {
   const { restaurantId } = await request.json();

   if (!restaurantId) {
     return NextResponse.json(
       { error: 'restaurantId es requerido' },
       { status: 400 }
     );
   }

   console.log(`🧠 FUDIMIND RAW DATA REQUEST for restaurant ${restaurantId}`);

   // 🔥 GET ALL RAW DATA - LET FUDIMIND FIGURE IT OUT
   const rawData = await getAllRawData(restaurantId);

   return NextResponse.json({
     success: true,
     data: rawData,
     restaurantId: restaurantId,
     timestamp: new Date().toISOString(),
     message: 'Raw data delivered - Claude will figure it out'
   });

 } catch (error) {
   console.error('❌ FudiMind Raw Data API Error:', error);
   
   return NextResponse.json({
     success: false,
     error: 'Error obteniendo datos raw para FudiMind',
     details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
   }, { status: 500 });
 }
}

// 🔥 GET ALL RAW DATA - NO PROCESSING, NO HARDCODING
async function getAllRawData(restaurantId: string) {
 console.log('🔥 GETTING RAW DATA - NO HARDCODING, JUST PURE DATA');

 const data: any = {
   restaurant: null,
   transactions: [],
   products: [],
   transaction_products: [],
   intelligent_metrics: [],
   intelligent_daily: [],
   intelligent_products: [],
   intelligent_temporal: [],
   dataPoints: 0
 };

 try {
   // 1. RESTAURANT INFO
   console.log('📋 Getting restaurant info...');
   const { data: restaurant } = await supabaseFudiMind
     .from('restaurants')
     .select('*')
     .eq('id', restaurantId)
     .single();
   
   data.restaurant = restaurant;

   // 2. RAW TRANSACTIONS (LAST 60 DAYS - LET CLAUDE DECIDE WHAT'S RECENT)
   console.log('💰 Getting raw transactions...');
   const { data: transactions } = await supabaseFudiMind
     .from('poster_transactions')
     .select('*')
     .eq('restaurant_id', restaurantId)
     .order('date_close', { ascending: false })
     .limit(2000); // Enough data but not too much

   data.transactions = transactions || [];

   // 3. ALL PRODUCTS
   console.log('🛍️ Getting all products...');
   const { data: products } = await supabaseFudiMind
     .from('poster_products')
     .select('*')
     .limit(1000);

   data.products = products || [];

   // 4. TRANSACTION PRODUCTS (RECENT ONES)
   console.log('🛒 Getting transaction products...');
   const { data: transactionProducts } = await supabaseFudiMind
     .from('poster_transaction_products')
     .select(`
       *,
       poster_transactions!inner(
         restaurant_id,
         date_close
       )
     `)
     .eq('poster_transactions.restaurant_id', restaurantId)
     .order('poster_transactions.date_close', { ascending: false })
     .limit(5000);

   data.transaction_products = transactionProducts || [];

   // 5. INTELLIGENT METRICS (PRE-PROCESSED DATA)
   console.log('🧠 Getting intelligent metrics...');
   const { data: metrics } = await supabaseFudiMind
     .from('intelligent_metrics')
     .select('*')
     .eq('restaurant_id', restaurantId)
     .order('created_at', { ascending: false })
     .limit(100);

   data.intelligent_metrics = metrics || [];

   // 6. INTELLIGENT DAILY DATA
   const { data: dailyData } = await supabaseFudiMind
     .from('intelligent_payment_daily')
     .select('*')
     .eq('restaurant_id', restaurantId)
     .order('date', { ascending: false })
     .limit(60);

   data.intelligent_daily = dailyData || [];

   // 7. INTELLIGENT TOP PRODUCTS
   const { data: topProducts } = await supabaseFudiMind
     .from('intelligent_top_products')
     .select('*')
     .eq('restaurant_id', restaurantId)
     .order('total_quantity', { ascending: false })
     .limit(50);

   data.intelligent_products = topProducts || [];

   // 8. INTELLIGENT TEMPORAL
   const { data: temporalData } = await supabaseFudiMind
     .from('intelligent_temporal_daily')
     .select('*')
     .eq('restaurant_id', restaurantId)
     .order('date', { ascending: false })
     .limit(60);

   data.intelligent_temporal = temporalData || [];

   // CALCULATE TOTAL DATA POINTS
   data.dataPoints = 
     (data.restaurant ? 1 : 0) +
     data.transactions.length +
     data.products.length +
     data.transaction_products.length +
     data.intelligent_metrics.length +
     data.intelligent_daily.length +
     data.intelligent_products.length +
     data.intelligent_temporal.length;

   console.log(`🔥 RAW DATA COMPLETE: ${data.dataPoints} total data points`);
   
   // DEBUG INFO
   console.log('🔍 RAW DATA SUMMARY:', {
     restaurant: data.restaurant?.name || 'No name',
     timezone: data.restaurant?.timezone || 'No timezone',
     transactions: data.transactions.length,
     products: data.products.length,
     transaction_products: data.transaction_products.length,
     intelligent_data: data.intelligent_metrics.length + data.intelligent_daily.length,
     total_points: data.dataPoints
   });

   return data;

 } catch (error) {
   console.error('Error getting raw data:', error);
   data.error = (error as Error).message;
   return data;
 }
}