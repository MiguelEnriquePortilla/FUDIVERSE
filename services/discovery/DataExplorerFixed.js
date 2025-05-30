// services/discovery/DataExplorer.js - FIXED VERSION
const { createClient } = require('@supabase/supabase-js');

// Usar variables de entorno directamente (sin dotenv)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vdcqwjodfuwrthcuvzfr.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

class DataExplorer {
  constructor(restaurantId) {
    this.restaurantId = restaurantId;
    this.discoveries = {};
  }

  // 🔍 EXPLORAR TABLA ESPECÍFICA MEJORADO
  async exploreTransactions() {
    console.log('\n📊 EXPLORANDO TRANSACTIONS - ENFOQUE EN PRODUCTOS');
    console.log('─'.repeat(60));

    try {
      // Obtener muestra de transacciones
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('restaurant_id', this.restaurantId)
        .limit(3);

      if (error) {
        console.log(`❌ Error: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        console.log('⚠️  No hay transacciones');
        return;
      }

      console.log(`✅ ${data.length} transacciones encontradas\n`);

      // Analizar cada transacción
      data.forEach((transaction, index) => {
        console.log(`🧾 TRANSACCIÓN ${index + 1}:`);
        console.log(`   ID: ${transaction.pos_transaction_id}`);
        console.log(`   Fecha: ${transaction.transaction_date}`);
        console.log(`   Total: $${transaction.total_amount}`);
        console.log(`   Método pago: ${transaction.payment_method}`);
        
        // ANALIZAR ITEMS - ESTO ES LO CRÍTICO
        if (transaction.items) {
          console.log(`   📦 ITEMS (${Array.isArray(transaction.items) ? transaction.items.length : 'no es array'}):`);
          
          if (Array.isArray(transaction.items)) {
            transaction.items.forEach((item, itemIndex) => {
              console.log(`      ${itemIndex + 1}. ${JSON.stringify(item, null, 8)}`);
            });
          } else {
            console.log(`      ⚠️  Items no es array: ${typeof transaction.items}`);
            console.log(`      📄 Contenido: ${JSON.stringify(transaction.items)}`);
          }
        } else {
          console.log(`   ❌ NO hay campo 'items'`);
        }
        
        console.log(`   📋 TODOS LOS CAMPOS:`);
        Object.keys(transaction).forEach(key => {
          console.log(`      • ${key}: ${typeof transaction[key]}`);
        });
        
        console.log(''); // Línea vacía
      });

      // Análisis de estructura de items
      console.log('\n🔍 ANÁLISIS DE ESTRUCTURA DE ITEMS:');
      
      const allItems = [];
      data.forEach(t => {
        if (t.items && Array.isArray(t.items)) {
          allItems.push(...t.items);
        }
      });

      if (allItems.length > 0) {
        const sampleItem = allItems[0];
        console.log('\n📊 ESTRUCTURA DE ITEM TÍPICO:');
        Object.entries(sampleItem).forEach(([key, value]) => {
          console.log(`   • ${key}: ${typeof value} = ${value}`);
        });

        console.log('\n📈 CAMPOS ÚTILES PARA PRODUCTANALYZER:');
        const usefulFields = [];
        Object.keys(sampleItem).forEach(key => {
          if (key.includes('product') || key.includes('name') || key.includes('id')) {
            usefulFields.push(`✅ ${key} (identificación)`);
          }
          if (key.includes('price') || key.includes('cost') || key.includes('amount')) {
            usefulFields.push(`💰 ${key} (monetario)`);
          }
          if (key.includes('quantity') || key.includes('count') || key.includes('qty')) {
            usefulFields.push(`📊 ${key} (cantidad)`);
          }
        });
        
        usefulFields.forEach(field => console.log(`   ${field}`));
        
      } else {
        console.log('❌ No se encontraron items válidos en las transacciones');
      }

    } catch (err) {
      console.log(`❌ Error inesperado: ${err.message}`);
    }
  }

  // 🎯 EXPLORACIÓN ENFOCADA EN PRODUCTO ANALYZER
  async exploreForProductAnalyzer() {
    console.log('🎯 EXPLORACIÓN ESPECÍFICA PARA PRODUCT ANALYZER');
    console.log('═'.repeat(60));
    
    await this.exploreTransactions();
    
    console.log('\n📋 RECOMENDACIONES PARA PRODUCTPERFORMANCEANALYZER:');
    console.log('───────────────────────────────────────────────────');
    
    // Verificar qué necesita ProductAnalyzer
    const requiredData = [
      'product_id o identificador del producto',
      'product_name o nombre del producto',
      'quantity/count/qty para cantidades vendidas',
      'price/amount para calcular revenue',
      'transaction_date para análisis temporal'
    ];
    
    console.log('\n✅ DATOS REQUERIDOS:');
    requiredData.forEach((req, i) => {
      console.log(`   ${i + 1}. ${req}`);
    });
    
    console.log('\n🔧 PRÓXIMO PASO:');
    console.log('   • Usar la estructura real encontrada en items[]');
    console.log('   • Modificar ProductPerformanceAnalyzer.js');
    console.log('   • Cambiar de daily_summaries a transactions');
    console.log('   • Extraer productos del campo items');
    
    console.log('\n═'.repeat(60));
  }
}

// 🚀 EJECUCIÓN INMEDIATA
async function runQuickDiscovery() {
  const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';
  
  console.log('🔥 FUDIVERSE - QUICK DATA DISCOVERY');
  console.log('Enfoque: Estructura de datos para ProductAnalyzer\n');
  
  const explorer = new DataExplorer(RESTAURANT_ID);
  
  try {
    await explorer.exploreForProductAnalyzer();
  } catch (error) {
    console.error('❌ Error durante la exploración:', error);
  }
}

// Ejecutar automáticamente
runQuickDiscovery();