// /lib/fudintelligence/core.ts
// 🧠 FUDINTELLIGENCE - Core Algorithm Engine

export interface Transaction {
  transaction_id: number;
  date_close: string;
  table_id: number | null;
  payed_sum: string;
  restaurant_id: string;
}

export interface TimeGapAnalysis {
  transaction_id: number;
  date_close: string;
  table_id: number | null;
  amount: number;
  gap_minutes: number | null;
  type_detected: 'TAKEAWAY_RAPIDO' | 'POSIBLE_TAKEAWAY' | 'DINE_IN_NORMAL' | 'DINE_IN_LENTO' | 'PRIMER_TICKET';
  confidence_score: number;
}

export interface FudiInsight {
  insight_type: string;
  title: string;
  description: string;
  metric_value: number | string;
  confidence_score: number;
  priority: 'high' | 'medium' | 'low';
  action_suggested?: string;
  data: any;
}

export class FudiIntelligenceEngine {
  
  /**
   * 🕵️ DETECTIVE ALGORITHM: Analiza gaps temporales para detectar patrones
   */
  async analyzeTimeGaps(transactions: Transaction[]): Promise<TimeGapAnalysis[]> {
    if (!transactions || transactions.length === 0) return [];

    // Ordenar por fecha
    const sortedTransactions = transactions.sort((a, b) => 
      new Date(a.date_close).getTime() - new Date(b.date_close).getTime()
    );

    const analysis: TimeGapAnalysis[] = [];
    let previousTime: Date | null = null;

    for (const transaction of sortedTransactions) {
      const currentTime = new Date(transaction.date_close);
      const amount = parseFloat(transaction.payed_sum);
      
      let gap_minutes: number | null = null;
      let type_detected: TimeGapAnalysis['type_detected'] = 'PRIMER_TICKET';
      let confidence_score = 0.8;

      if (previousTime) {
        gap_minutes = (currentTime.getTime() - previousTime.getTime()) / (1000 * 60);
        
        // 🧠 ALGORITMO INTELIGENTE DE DETECCIÓN
        if (gap_minutes <= 2) {
          type_detected = 'TAKEAWAY_RAPIDO';
          confidence_score = 0.95;
        } else if (gap_minutes > 2 && gap_minutes <= 5) {
          type_detected = 'POSIBLE_TAKEAWAY';
          confidence_score = 0.75;
        } else if (gap_minutes > 5 && gap_minutes <= 15) {
          type_detected = 'DINE_IN_NORMAL';
          confidence_score = 0.85;
        } else if (gap_minutes > 15) {
          type_detected = 'DINE_IN_LENTO';
          confidence_score = 0.90;
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
      });

      previousTime = currentTime;
    }

    return analysis;
  }

  /**
   * 📊 PATTERN DETECTION: Genera insights épicos
   */
  generateBusinessInsights(analysis: TimeGapAnalysis[]): FudiInsight[] {
    if (!analysis || analysis.length === 0) return [];

    const insights: FudiInsight[] = [];

    // 🥡 TAKEAWAY DOMINANCE DETECTION
    const takeawayCount = analysis.filter(a => 
      a.type_detected === 'TAKEAWAY_RAPIDO' || a.type_detected === 'POSIBLE_TAKEAWAY'
    ).length;
    
    const dineInCount = analysis.filter(a => 
      a.type_detected === 'DINE_IN_NORMAL' || a.type_detected === 'DINE_IN_LENTO'
    ).length;

    const totalOrders = analysis.length;
    const takeawayPercentage = (takeawayCount / totalOrders) * 100;

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
          dinein_orders: dineInCount,
          takeaway_percentage: takeawayPercentage
        }
      });
    }

    // ⚡ VELOCITY ANALYSIS
    const rapidTakeaways = analysis.filter(a => a.type_detected === 'TAKEAWAY_RAPIDO');
    if (rapidTakeaways.length > 10) {
      const avgVelocity = rapidTakeaways.reduce((sum, t) => sum + (t.gap_minutes || 0), 0) / rapidTakeaways.length;
      
      insights.push({
        insight_type: 'velocity_excellence',
        title: 'MÁQUINA DE VELOCIDAD',
        description: `Promedio de ${avgVelocity.toFixed(1)} minutos por orden rápida. Tu equipo es eficiente.`,
        metric_value: `${avgVelocity.toFixed(1)} min`,
        confidence_score: 0.90,
        priority: 'medium',
        action_suggested: 'Mantén este ritmo y considera aumentar capacidad en horas pico',
        data: {
          rapid_orders: rapidTakeaways.length,
          average_time: avgVelocity,
          fastest_time: Math.min(...rapidTakeaways.map(t => t.gap_minutes || 0))
        }
      });
    }

    // 💰 REVENUE PATTERN ANALYSIS
    const takeawayRevenue = analysis
      .filter(a => a.type_detected === 'TAKEAWAY_RAPIDO' || a.type_detected === 'POSIBLE_TAKEAWAY')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dineInRevenue = analysis
      .filter(a => a.type_detected === 'DINE_IN_NORMAL' || a.type_detected === 'DINE_IN_LENTO')
      .reduce((sum, t) => sum + t.amount, 0);

    const avgTakeawayTicket = takeawayCount > 0 ? takeawayRevenue / takeawayCount : 0;
    const avgDineInTicket = dineInCount > 0 ? dineInRevenue / dineInCount : 0;

    if (avgDineInTicket > avgTakeawayTicket * 2) {
      insights.push({
        insight_type: 'ticket_size_opportunity',
        title: 'OPORTUNIDAD TICKET TAKEAWAY',
        description: `Ticket dine-in ($${avgDineInTicket.toFixed(0)}) vs takeaway ($${avgTakeawayTicket.toFixed(0)}). Potencial de upsell.`,
        metric_value: `+${((avgDineInTicket - avgTakeawayTicket) / avgTakeawayTicket * 100).toFixed(0)}%`,
        confidence_score: 0.85,
        priority: 'medium',
        action_suggested: 'Implementa combos y upselling en órdenes takeaway',
        data: {
          avg_takeaway_ticket: avgTakeawayTicket,
          avg_dinein_ticket: avgDineInTicket,
          potential_increase: avgDineInTicket - avgTakeawayTicket
        }
      });
    }

    // 🕐 PEAK HOURS DETECTION
    const hourlyActivity = this.analyzeHourlyPatterns(analysis);
    const peakHour = hourlyActivity.reduce((max, hour) => 
      hour.orders > max.orders ? hour : max, hourlyActivity[0]
    );

    if (peakHour && peakHour.orders > 5) {
      insights.push({
        insight_type: 'peak_hour_detection',
        title: 'HORA PICO DETECTADA',
        description: `${peakHour.hour}:00 es tu hora más intensa con ${peakHour.orders} órdenes.`,
        metric_value: `${peakHour.orders} órdenes`,
        confidence_score: 0.88,
        priority: 'low',
        action_suggested: 'Asegura staff completo durante esta hora',
        data: {
          peak_hour: peakHour.hour,
          peak_orders: peakHour.orders,
          hourly_breakdown: hourlyActivity
        }
      });
    }

    return insights;
  }

  /**
   * 🕐 HOURLY PATTERN ANALYSIS
   */
  private analyzeHourlyPatterns(analysis: TimeGapAnalysis[]) {
    const hourlyMap: { [hour: number]: number } = {};
    
    analysis.forEach(transaction => {
      const hour = new Date(transaction.date_close).getHours();
      hourlyMap[hour] = (hourlyMap[hour] || 0) + 1;
    });

    return Object.entries(hourlyMap).map(([hour, orders]) => ({
      hour: parseInt(hour),
      orders
    })).sort((a, b) => b.orders - a.orders);
  }

  /**
   * 🎯 STORY GENERATOR: Convierte insights en historias épicas
   */
  generateStories(insights: FudiInsight[]): string[] {
    const stories: string[] = [];

    insights.forEach(insight => {
      switch (insight.insight_type) {
        case 'business_model_detection':
          stories.push(
            `🥡 TU VERDADERO NEGOCIO: ${insight.metric_value} takeaway • ` +
            `${insight.data.takeaway_orders} órdenes rápidas vs ${insight.data.dinein_orders} dine-in • ` +
            `OPTIMIZA PARA VELOCIDAD`
          );
          break;
          
        case 'velocity_excellence':
          stories.push(
            `⚡ MÁQUINA DE VELOCIDAD: ${insight.metric_value} promedio • ` +
            `${insight.data.rapid_orders} órdenes ultra-rápidas • ` +
            `RÉCORD: ${insight.data.fastest_time.toFixed(1)} min`
          );
          break;
          
        case 'ticket_size_opportunity':
          stories.push(
            `💰 OPORTUNIDAD PERDIDA: Takeaway $${insight.data.avg_takeaway_ticket.toFixed(0)} vs ` +
            `Dine-in $${insight.data.avg_dinein_ticket.toFixed(0)} • ` +
            `POTENCIAL: +$${insight.data.potential_increase.toFixed(0)} por orden`
          );
          break;
          
        case 'peak_hour_detection':
          stories.push(
            `🕐 HORA PICO: ${insight.data.peak_hour}:00 con ${insight.data.peak_orders} órdenes • ` +
            `ASEGURAR STAFF COMPLETO • ` +
            `MÁXIMA EFICIENCIA REQUERIDA`
          );
          break;
      }
    });

    return stories;
  }

  /**
   * 🚀 MAIN ANALYSIS FUNCTION
   */
  async runCompleteAnalysis(transactions: Transaction[]): Promise<{
    analysis: TimeGapAnalysis[];
    insights: FudiInsight[];
    stories: string[];
    summary: {
      total_orders: number;
      takeaway_percentage: number;
      avg_gap_time: number;
      confidence_score: number;
    }
  }> {
    // 1. Analizar gaps temporales
    const analysis = await this.analyzeTimeGaps(transactions);
    
    // 2. Generar insights
    const insights = this.generateBusinessInsights(analysis);
    
    // 3. Crear historias
    const stories = this.generateStories(insights);
    
    // 4. Calcular summary
    const takeawayCount = analysis.filter(a => 
      a.type_detected === 'TAKEAWAY_RAPIDO' || a.type_detected === 'POSIBLE_TAKEAWAY'
    ).length;
    
    const avgGapTime = analysis
      .filter(a => a.gap_minutes !== null)
      .reduce((sum, a) => sum + (a.gap_minutes || 0), 0) / analysis.length;
    
    const avgConfidence = analysis
      .reduce((sum, a) => sum + a.confidence_score, 0) / analysis.length;

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
    };
  }
}

// 🎯 EXPORT MAIN ENGINE
export const fudiIntelligence = new FudiIntelligenceEngine();