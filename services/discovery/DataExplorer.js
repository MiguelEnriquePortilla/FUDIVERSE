// services/discovery/DataExplorer.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class DataExplorer {
  constructor(restaurantId) {
    this.restaurantId = restaurantId;
    this.discoveries = {};
  }

  // 🔍 EXPLORAR TODAS LAS TABLAS
  async exploreAllTables() {
    console.log('🚀 INICIANDO EXPLORACIÓN DEL UNIVERSO DE DATOS...\n');
    
    const tables = [
      'daily_summaries',
      'transactions', 
      'products',
      'inventory',
      'customers',
      'employees',
      'categories',
      'feedback',
      'promotions'
    ];

    for (const table of tables) {
      await this.exploreTable(table);
    }

    return this.generateReport();
  }

  // 📊 EXPLORAR UNA TABLA ESPECÍFICA
  async exploreTable(tableName) {
    console.log(`\n📊 Explorando tabla: ${tableName}`);
    console.log('─'.repeat(50));

    try {
      // Obtener muestra de datos
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('restaurant_id', this.restaurantId)
        .limit(5);

      if (error) {
        console.log(`❌ Error: ${error.message}`);
        this.discoveries[tableName] = { error: error.message };
        return;
      }

      if (!data || data.length === 0) {
        console.log('⚠️  Tabla vacía o sin datos');
        this.discoveries[tableName] = { empty: true };
        return;
      }

      // Analizar estructura
      const sample = data[0];
      const structure = {};
      const insights = [];

      // Analizar cada campo
      for (const [key, value] of Object.entries(sample)) {
        structure[key] = {
          type: typeof value,
          sample: value,
          nullable: data.some(row => row[key] === null)
        };

        // Detectar campos interesantes para análisis
        if (key.includes('total') || key.includes('sales') || key.includes('amount')) {
          insights.push(`💰 Campo monetario: ${key}`);
        }
        if (key.includes('date') || key.includes('time') || key.includes('created')) {
          insights.push(`📅 Campo temporal: ${key}`);
        }
        if (key.includes('count') || key.includes('quantity')) {
          insights.push(`📊 Campo numérico: ${key}`);
        }
      }

      // Guardar descubrimientos
      this.discoveries[tableName] = {
        recordCount: data.length,
        structure,
        insights,
        sampleData: data.slice(0, 2),
        potentialAnalytics: this.suggestAnalytics(structure, tableName)
      };

      // Mostrar resumen
      console.log(`✅ Registros encontrados: ${data.length}`);
      console.log(`📋 Campos: ${Object.keys(structure).join(', ')}`);
      if (insights.length > 0) {
        console.log(`💡 Insights detectados:`);
        insights.forEach(i => console.log(`   ${i}`));
      }

    } catch (err) {
      console.log(`❌ Error inesperado: ${err.message}`);
      this.discoveries[tableName] = { error: err.message };
    }
  }

  // 🧠 SUGERIR ANÁLISIS POSIBLES
  suggestAnalytics(structure, tableName) {
    const suggestions = [];

    // Daily Summaries
    if (tableName === 'daily_summaries') {
      suggestions.push({
        name: 'Trend Analysis',
        description: 'Analizar tendencias de ventas diarias/semanales',
        requiredFields: ['total_sales', 'summary_date']
      });
      suggestions.push({
        name: 'Peak Hour Intelligence',
        description: 'Identificar horas pico y patrones de tráfico',
        requiredFields: ['hourly_sales']
      });
      suggestions.push({
        name: 'Payment Method Analysis',
        description: 'Distribución y preferencias de pago',
        requiredFields: ['payment_methods']
      });
    }

    // Transactions
    if (tableName === 'transactions') {
      suggestions.push({
        name: 'Customer Behavior',
        description: 'Análisis de frecuencia y tickets promedio',
        requiredFields: ['customer_id', 'total', 'created_at']
      });
      suggestions.push({
        name: 'Product Performance',
        description: 'Productos más vendidos y combinaciones',
        requiredFields: ['items', 'total']
      });
    }

    // Products
    if (tableName === 'products') {
      suggestions.push({
        name: 'Menu Optimization',
        description: 'Análisis de rentabilidad y popularidad',
        requiredFields: ['price', 'cost', 'sales_count']
      });
      suggestions.push({
        name: 'Category Performance',
        description: 'Rendimiento por categorías',
        requiredFields: ['category_id', 'sales_count']
      });
    }

    // Inventory
    if (tableName === 'inventory') {
      suggestions.push({
        name: 'Stock Predictions',
        description: 'Predicción de agotamiento de stock',
        requiredFields: ['current_stock', 'min_stock', 'usage_rate']
      });
      suggestions.push({
        name: 'Waste Analysis',
        description: 'Análisis de desperdicio y eficiencia',
        requiredFields: ['waste_amount', 'expiry_date']
      });
    }

    return suggestions;
  }

  // 📈 GENERAR REPORTE FINAL
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      restaurantId: this.restaurantId,
      summary: {
        tablesExplored: Object.keys(this.discoveries).length,
        tablesWithData: Object.keys(this.discoveries).filter(t => !this.discoveries[t].empty && !this.discoveries[t].error).length,
        totalPotentialAnalytics: 0
      },
      discoveries: this.discoveries,
      recommendations: []
    };

    // Contar analytics potenciales
    for (const [table, discovery] of Object.entries(this.discoveries)) {
      if (discovery.potentialAnalytics) {
        report.summary.totalPotentialAnalytics += discovery.potentialAnalytics.length;
      }
    }

    // Generar recomendaciones
    if (this.discoveries.daily_summaries && !this.discoveries.daily_summaries.empty) {
      report.recommendations.push({
        priority: 'HIGH',
        action: 'Implementar análisis de tendencias diarias',
        reason: 'Datos de daily_summaries disponibles y ricos'
      });
    }

    if (this.discoveries.transactions && !this.discoveries.transactions.empty) {
      report.recommendations.push({
        priority: 'HIGH',
        action: 'Crear analizador de comportamiento de clientes',
        reason: 'Transacciones disponibles para mining de patrones'
      });
    }

    if (this.discoveries.inventory && !this.discoveries.inventory.empty) {
      report.recommendations.push({
        priority: 'MEDIUM',
        action: 'Desarrollar predictor de inventario',
        reason: 'Datos de inventario pueden prevenir quiebres de stock'
      });
    }

    return report;
  }

  // 🎨 IMPRIMIR REPORTE BONITO
  printReport(report) {
    console.log('\n\n');
    console.log('═'.repeat(60));
    console.log('🔍 REPORTE DE EXPLORACIÓN DE DATOS - FUDIVERSE');
    console.log('═'.repeat(60));
    
    console.log(`\n📅 Fecha: ${new Date(report.timestamp).toLocaleString()}`);
    console.log(`🏪 Restaurant ID: ${report.restaurantId}`);
    
    console.log('\n📊 RESUMEN EJECUTIVO:');
    console.log(`   • Tablas exploradas: ${report.summary.tablesExplored}`);
    console.log(`   • Tablas con datos: ${report.summary.tablesWithData}`);
    console.log(`   • Análisis potenciales: ${report.summary.totalPotentialAnalytics}`);
    
    console.log('\n🎯 RECOMENDACIONES:');
    report.recommendations.forEach((rec, i) => {
      console.log(`\n   ${i + 1}. [${rec.priority}] ${rec.action}`);
      console.log(`      → ${rec.reason}`);
    });
    
    console.log('\n💎 OPORTUNIDADES DE ANÁLISIS POR TABLA:');
    for (const [table, discovery] of Object.entries(report.discoveries)) {
      if (discovery.potentialAnalytics && discovery.potentialAnalytics.length > 0) {
        console.log(`\n   📁 ${table.toUpperCase()}`);
        discovery.potentialAnalytics.forEach(analysis => {
          console.log(`      • ${analysis.name}: ${analysis.description}`);
        });
      }
    }
    
    console.log('\n═'.repeat(60));
    console.log('✅ EXPLORACIÓN COMPLETADA');
    console.log('═'.repeat(60));
  }
}

// 🚀 SCRIPT DE EJECUCIÓN
async function runDiscovery() {
  const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4'; // Tu restaurant ID
  
  console.log('🔥 FUDIVERSE DATA DISCOVERY TOOL');
  console.log('Explorando el universo de datos disponibles...\n');
  
  const explorer = new DataExplorer(RESTAURANT_ID);
  
  try {
    const report = await explorer.exploreAllTables();
    explorer.printReport(report);
    
    // Guardar reporte en archivo
    const fs = require('fs').promises;
    await fs.writeFile(
      `discovery-report-${Date.now()}.json`,
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n📄 Reporte guardado en archivo JSON');
    
  } catch (error) {
    console.error('❌ Error durante la exploración:', error);
  }
}

// Exportar para uso modular
module.exports = { DataExplorer, runDiscovery };

// Si se ejecuta directamente
if (require.main === module) {
  runDiscovery();
}