class TrendAnalyzer {
  constructor() {
    this.name = 'TrendAnalyzer';
  }

  analyzeTrend(currentValue, previousValue) {
    if (!previousValue || previousValue === 0) return "Sin datos para comparar";
    
    const difference = currentValue - previousValue;
    const percentage = (difference / previousValue) * 100;
    
    if (percentage > 10) return `📈 Subiendo ${percentage.toFixed(1)}%`;
    if (percentage < -10) return `📉 Bajando ${Math.abs(percentage).toFixed(1)}%`;
    return "➡️ Estable";
  }
}

module.exports = TrendAnalyzer;