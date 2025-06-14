// /supabase/functions/fudintelligence/index.ts
// 🌙 DAILY BATCH PROCESSOR - 2:00 AM

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

// Import our core engine (you'll need to copy the core.ts content here or import it)
interface Transaction {
  transaction_id: number;
  date_close: string;
  table_id: number | null;
  payed_sum: string;
  restaurant_id: string;
}

interface FudiInsight {
  insight_type: string;
  title: string;
  description: string;
  metric_value: number | string;
  confidence_score: number;
  priority: 'high' | 'medium' | 'low';
  action_suggested?: string;
  data: any;
}

serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('🧠 FUDINTELLIGENCE AWAKENING...')

    // Get all active restaurants
    const { data: restaurants, error: restaurantsError } = await supabase
      .from('restaurants')
      .select('id, name')
      .eq('status', 'active')

    if (restaurantsError) {
      throw new Error(`Error fetching restaurants: ${restaurantsError.message}`)
    }

    console.log(`📊 Processing ${restaurants?.length || 0} restaurants...`)

    const results = []

    // Process each restaurant
    for (const restaurant of restaurants || []) {
      try {
        console.log(`🔍 Analyzing restaurant: ${restaurant.name} (${restaurant.id})`)

        // Get yesterday's transactions
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        const { data: transactions, error: transactionsError } = await supabase
          .from('poster_transactions')
          .select('transaction_id, date_close, table_id, payed_sum, restaurant_id')
          .eq('restaurant_id', restaurant.id)
          .gte('date_close', `${yesterdayStr} 00:00:00`)
          .lt('date_close', `${yesterdayStr} 23:59:59`)
          .order('date_close', { ascending: true })

        if (transactionsError) {
          console.error(`❌ Error fetching transactions for ${restaurant.name}:`, transactionsError)
          continue
        }

        if (!transactions || transactions.length === 0) {
          console.log(`⚠️ No transactions found for ${restaurant.name} on ${yesterdayStr}`)
          continue
        }

        console.log(`📈 Found ${transactions.length} transactions for ${restaurant.name}`)

        // Run FudiIntelligence analysis
        const analysis = await runFudiAnalysis(transactions)

        // Save insights to database
        const saved = await saveInsights(supabase, restaurant.id, analysis)

        results.push({
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.name,
          transactions_analyzed: transactions.length,
          insights_generated: analysis.insights.length,
          confidence_score: analysis.summary.confidence_score,
          saved: saved
        })

        console.log(`✅ Completed analysis for ${restaurant.name}: ${analysis.insights.length} insights generated`)

      } catch (error) {
        console.error(`❌ Error processing restaurant ${restaurant.name}:`, error)
        results.push({
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.name,
          error: error.message
        })
      }
    }

    console.log('🚀 FUDINTELLIGENCE BATCH COMPLETE')

    return new Response(
      JSON.stringify({
        success: true,
        processed_at: new Date().toISOString(),
        restaurants_processed: results.length,
        results: results
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    )

  } catch (error) {
    console.error('💥 FUDINTELLIGENCE ERROR:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      },
    )
  }
})

/**
 * 🧠 CORE ANALYSIS FUNCTION
 */
async function runFudiAnalysis(transactions: Transaction[]) {
  // Time gap analysis
  const analysis = await analyzeTimeGaps(transactions)
  
  // Generate insights
  const insights = generateBusinessInsights(analysis)
  
  // Create stories
  const stories = generateStories(insights)
  
  // Calculate summary
  const takeawayCount = analysis.filter(a => 
    a.type_detected === 'TAKEAWAY_RAPIDO' || a.type_detected === 'POSIBLE_TAKEAWAY'
  ).length
  
  const avgGapTime = analysis
    .filter(a => a.gap_minutes !== null)
    .reduce((sum, a) => sum + (a.gap_minutes || 0), 0) / analysis.length
  
  const avgConfidence = analysis
    .reduce((sum, a) => sum + a.confidence_score, 0) / analysis.length

  return {
    analysis,
    insights,
    stories,
    summary: {
      total_orders: analysis.length,
      takeaway_percentage: (takeawayCount / analysis.length) * 100,
      avg_gap_time: avgGapTime,
      confidence_score: avgConfidence
    }
  }
}

/**
 * 🕵️ TIME GAP ANALYSIS (Core Algorithm)
 */
async function analyzeTimeGaps(transactions: Transaction[]) {
  if (!transactions || transactions.length === 0) return []

  const sortedTransactions = transactions.sort((a, b) => 
    new Date(a.date_close).getTime() - new Date(b.date_close).getTime()
  )

  const analysis = []
  let previousTime = null

  for (const transaction of sortedTransactions) {
    const currentTime = new Date(transaction.date_close)
    const amount = parseFloat(transaction.payed_sum)
    
    let gap_minutes = null
    let type_detected = 'PRIMER_TICKET'
    let confidence_score = 0.8

    if (previousTime) {
      gap_minutes = (currentTime.getTime() - previousTime.getTime()) / (1000 * 60)
      
      if (gap_minutes <= 2) {
        type_detected = 'TAKEAWAY_RAPIDO'
        confidence_score = 0.95
      } else if (gap_minutes > 2 && gap_minutes <= 5) {
        type_detected = 'POSIBLE_TAKEAWAY'
        confidence_score = 0.75
      } else if (gap_minutes > 5 && gap_minutes <= 15) {
        type_detected = 'DINE_IN_NORMAL'
        confidence_score = 0.85
      } else if (gap_minutes > 15) {
        type_detected = 'DINE_IN_LENTO'
        confidence_score = 0.90
      }
    }

    analysis.push({
      transaction_id: transaction.transaction_id,
      date_close: transaction.date_close,
      table_id: transaction.table_id,
      amount,
      gap_minutes,
      type_detected,
      confidence_score
    })

    previousTime = currentTime
  }

  return analysis
}

/**
 * 📊 INSIGHTS GENERATOR
 */
function generateBusinessInsights(analysis) {
  if (!analysis || analysis.length === 0) return []

  const insights = []
  const takeawayCount = analysis.filter(a => 
    a.type_detected === 'TAKEAWAY_RAPIDO' || a.type_detected === 'POSIBLE_TAKEAWAY'
  ).length
  
  const totalOrders = analysis.length
  const takeawayPercentage = (takeawayCount / totalOrders) * 100

  // TAKEAWAY DOMINANCE
  if (takeawayPercentage > 70) {
    insights.push({
      insight_type: 'business_model_detection',
      title: 'NEGOCIO TAKEAWAY DOMINANTE',
      description: `Tu operación es ${takeawayPercentage.toFixed(0)}% takeaway. Optimiza para velocidad y delivery.`,
      metric_value: `${takeawayPercentage.toFixed(0)}%`,
      confidence_score: 0.95,
      priority: 'high',
      action_suggested: 'Enfócate en marketing de delivery y optimización de cocina para velocidad',
      data: {
        takeaway_orders: takeawayCount,
        takeaway_percentage: takeawayPercentage
      }
    })
  }

  return insights
}

/**
 * 📖 STORY GENERATOR
 */
function generateStories(insights) {
  return insights.map(insight => {
    switch (insight.insight_type) {
      case 'business_model_detection':
        return `🥡 TU VERDADERO NEGOCIO: ${insight.metric_value} takeaway • OPTIMIZA PARA VELOCIDAD`
      default:
        return `💡 ${insight.title}: ${insight.description}`
    }
  })
}

/**
 * 💾 SAVE INSIGHTS TO DATABASE
 */
async function saveInsights(supabase, restaurantId, analysis) {
  try {
    // Delete old insights for this restaurant
    await supabase
      .from('fudi_insights')
      .delete()
      .eq('restaurant_id', restaurantId)

    // Insert new insights
    const insightsToSave = analysis.insights.map(insight => ({
      restaurant_id: restaurantId,
      insight_type: insight.insight_type,
      insight_data: {
        ...insight,
        stories: analysis.stories,
        summary: analysis.summary
      },
      confidence_score: insight.confidence_score,
      generated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString() // 25 hours
    }))

    if (insightsToSave.length > 0) {
      const { error } = await supabase
        .from('fudi_insights')
        .insert(insightsToSave)

      if (error) {
        console.error('Error saving insights:', error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error('Error in saveInsights:', error)
    return false
  }
}

/* 🎯 USAGE:
   Deploy this to: /supabase/functions/fudintelligence/
   
   Schedule with cron:
   0 2 * * * curl -X POST https://your-project.supabase.co/functions/v1/fudintelligence
   
   Or call manually:
   supabase functions invoke fudintelligence
*/