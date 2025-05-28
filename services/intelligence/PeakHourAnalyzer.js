class PeakHourAnalyzer {
  constructor() {
    this.name = 'PeakHourAnalyzer';
  }

  // Migrado de analizarHoraPico
  analyzePeakHours(hourlyData) {
    if (!hourlyData || hourlyData.length === 0) return "Sin datos de horas";
    
    const peakHour = hourlyData[0];
    const secondHour = hourlyData[1];
    
    let analysis = `Hora pico: ${peakHour.hour}:00 con ${peakHour.count} órdenes`;
    
    if (secondHour && secondHour.count > peakHour.count * 0.8) {
      analysis += ` (ojo: ${secondHour.hour}:00 también estuvo fuerte con ${secondHour.count})`;
    }
    
    return analysis;
  }
}

module.exports = PeakHourAnalyzer;