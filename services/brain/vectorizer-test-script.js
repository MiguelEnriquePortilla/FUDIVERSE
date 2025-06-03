// 🧪 test-vectorizer.js
// Script de prueba para validar RestaurantDataVectorizer con datos reales

const { createClient } = require('@supabase/supabase-js');
const { RestaurantDataVectorizer } = require('./RestaurantDataVectorizer'); // Ajusta la ruta

// 🔧 CONFIGURACIÓN - CREDENCIALES REALES CON SERVICE ROLE
const SUPABASE_URL = 'https://vdcqwjodfuwrthcuvzfr.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3F3am9kZnV3cnRoY3V2emZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODEwMjkzNywiZXhwIjoyMDYzNjc4OTM3fQ.Dp4LTTUl9BXQGK1etr8FhtEOeHGTvb5YVseeAlJimb4';
const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4'; // Chicken Chicanito - CORRECTO

console.log('🧪 INICIANDO TEST DEL VECTORIZER...');
console.log('📍 Supabase URL:', SUPABASE_URL.substring(0, 30) + '...');
console.log('🏪 Restaurant ID:', RESTAURANT_ID);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

async function testVectorizer() {
  try {
    console.log('\n🔧 STEP 1: Inicializando Vectorizer...');
    const vectorizer = new RestaurantDataVectorizer(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    console.log('✅ Vectorizer inicializado correctamente');

    console.log('\n🔍 STEP 2: Probando conexión a Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Test básico de conexión
    const { data, error } = await supabase.from('restaurants').select('id, name').limit(1);
    if (error) {
      console.log('❌ Error de conexión:', error.message);
      return;
    }
    console.log('✅ Conexión a Supabase exitosa');
    console.log('📋 Datos de prueba:', data);

    console.log('\n🏪 STEP 3: Verificando que el restaurant existe...');
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', RESTAURANT_ID)
      .single();
    
    if (restaurantError) {
      console.log('❌ Restaurant no encontrado:', restaurantError.message);
      console.log('💡 TIP: Verifica tu RESTAURANT_ID');
      return;
    }
    console.log('✅ Restaurant encontrado:', restaurant.name || restaurant.id);

    console.log('\n📊 STEP 4: Verificando tablas intelligence...');
    
    // Test intelligent_product_daily
    const { data: productIntel, error: productError } = await supabase
      .from('intelligent_product_daily')
      .select('*')
      .eq('restaurant_id', RESTAURANT_ID)
      .limit(5);
    
    if (productError) {
      console.log('⚠️ intelligent_product_daily error:', productError.message);
    } else {
      console.log('✅ intelligent_product_daily:', productIntel?.length || 0, 'registros');
      if (productIntel?.length > 0) {
        console.log('   📋 Sample:', JSON.stringify(productIntel[0], null, 2));
      }
    }

    // Test intelligent_payment_daily
    const { data: paymentIntel, error: paymentError } = await supabase
      .from('intelligent_payment_daily')
      .select('*')
      .eq('restaurant_id', RESTAURANT_ID)
      .limit(3);
    
    if (paymentError) {
      console.log('⚠️ intelligent_payment_daily error:', paymentError.message);
    } else {
      console.log('✅ intelligent_payment_daily:', paymentIntel?.length || 0, 'registros');
    }

    // Test intelligent_temporal_daily
    const { data: temporalIntel, error: temporalError } = await supabase
      .from('intelligent_temporal_daily')
      .select('*')
      .eq('restaurant_id', RESTAURANT_ID)
      .limit(3);
    
    if (temporalError) {
      console.log('⚠️ intelligent_temporal_daily error:', temporalError.message);
    } else {
      console.log('✅ intelligent_temporal_daily:', temporalIntel?.length || 0, 'registros');
    }

    console.log('\n📈 STEP 5: Verificando transacciones...');
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('id, transaction_date, total_amount, payment_method')
      .eq('restaurant_id', RESTAURANT_ID)
      .order('transaction_date', { ascending: false })
      .limit(10);
    
    if (txError) {
      console.log('❌ Transactions error:', txError.message);
    } else {
      console.log('✅ Transactions:', transactions?.length || 0, 'registros');
      if (transactions?.length > 0) {
        console.log('   📋 Última transacción:', transactions[0]);
      }
    }

    console.log('\n🍽️ STEP 6: Verificando productos...');
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id, name, price, category')
      .eq('restaurant_id', RESTAURANT_ID)
      .limit(5);
    
    if (prodError) {
      console.log('❌ Products error:', prodError.message);
    } else {
      console.log('✅ Products:', products?.length || 0, 'productos');
      if (products?.length > 0) {
        console.log('   📋 Sample productos:', products.slice(0, 3));
      }
    }

    console.log('\n🧠 STEP 7: PROBANDO VECTORIZACIÓN COMPLETA...');
    console.log('⚡ Ejecutando vectorizeRestaurantData...');
    
    const startTime = Date.now();
    const vectorizedData = await vectorizer.vectorizeRestaurantData(RESTAURANT_ID);
    const endTime = Date.now();
    
    console.log(`✅ Vectorización completada en ${endTime - startTime}ms`);

    console.log('\n📊 RESULTADOS DE VECTORIZACIÓN:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Restaurant context
    console.log('🏪 RESTAURANT CONTEXT:');
    console.log('   Nombre:', vectorizedData.restaurantContext.identity.name);
    console.log('   Total productos:', vectorizedData.restaurantContext.totalProducts);
    console.log('   Intelligence tables:', vectorizedData.restaurantContext.hasIntelligenceTables ? 'SÍ' : 'NO');
    console.log('   Calidad datos:', vectorizedData.restaurantContext.dataQuality.level, `(${vectorizedData.restaurantContext.dataQuality.score}/100)`);
    
    // Intelligence ready
    console.log('\n📊 INTELLIGENCE READY:');
    console.log('   Products available:', vectorizedData.intelligenceReady.products.available);
    if (vectorizedData.intelligenceReady.products.available) {
      console.log('   Products records:', vectorizedData.intelligenceReady.products.totalRecords);
    }
    
    console.log('   Payments available:', vectorizedData.intelligenceReady.payments.available);
    if (vectorizedData.intelligenceReady.payments.available) {
      console.log('   Payments records:', vectorizedData.intelligenceReady.payments.totalRecords);
    }
    
    console.log('   Temporal available:', vectorizedData.intelligenceReady.temporal.available);
    if (vectorizedData.intelligenceReady.temporal.available) {
      console.log('   Temporal records:', vectorizedData.intelligenceReady.temporal.totalRecords);
    }
    
    console.log('   Transaction history:', vectorizedData.intelligenceReady.transactionHistory.available);
    if (vectorizedData.intelligenceReady.transactionHistory.available) {
      console.log('   Total transactions:', vectorizedData.intelligenceReady.transactionHistory.totalTransactions);
      console.log('   Total revenue: $', vectorizedData.intelligenceReady.transactionHistory.totalRevenue?.toFixed(2));
      console.log('   Average ticket: $', vectorizedData.intelligenceReady.transactionHistory.averageTicket?.toFixed(2));
    }
    
    console.log('   Product catalog:', vectorizedData.intelligenceReady.productCatalog.available);
    if (vectorizedData.intelligenceReady.productCatalog.available) {
      console.log('   Total products:', vectorizedData.intelligenceReady.productCatalog.totalProducts);
      console.log('   Categories:', vectorizedData.intelligenceReady.productCatalog.categories?.join(', '));
    }

    // Metadata
    console.log('\n📋 METADATA:');
    console.log('   Total data points:', vectorizedData.vectorizationMetadata.dataPoints.total);
    console.log('   Intelligence points:', vectorizedData.vectorizationMetadata.dataPoints.intelligence);
    console.log('   Transaction points:', vectorizedData.vectorizationMetadata.dataPoints.transactions);
    console.log('   Product points:', vectorizedData.vectorizationMetadata.dataPoints.products);
    console.log('   Quality score:', vectorizedData.vectorizationMetadata.qualityScore);

    console.log('\n🎯 STEP 8: CONCLUSIONES DEL TEST:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (vectorizedData.restaurantContext.dataQuality.score >= 80) {
      console.log('🔥 EXCELENTE: Datos de alta calidad - Listo para Claude!');
    } else if (vectorizedData.restaurantContext.dataQuality.score >= 60) {
      console.log('✅ BUENO: Datos suficientes para análisis básico');
    } else if (vectorizedData.restaurantContext.dataQuality.score >= 40) {
      console.log('⚠️ REGULAR: Datos limitados, funcionará pero con limitaciones');
    } else {
      console.log('❌ POBRE: Datos insuficientes, necesita más información');
    }

    if (vectorizedData.restaurantContext.hasIntelligenceTables) {
      console.log('🧠 Intelligence tables disponibles - Análisis avanzado posible');
    } else {
      console.log('📈 Solo transacciones disponibles - Análisis básico');
    }

    console.log('\n🚀 VECTORIZER TEST COMPLETADO EXITOSAMENTE!');
    
    return {
      success: true,
      dataQuality: vectorizedData.restaurantContext.dataQuality,
      vectorizedData: vectorizedData
    };

  } catch (error) {
    console.error('\n❌ ERROR EN EL TEST:', error);
    console.log('💡 Posibles causas:');
    console.log('   - Credenciales de Supabase incorrectas');
    console.log('   - Restaurant ID no existe');
    console.log('   - Tablas no existen o tienen otros nombres');
    console.log('   - Permisos insuficientes');
    
    return {
      success: false,
      error: error.message
    };
  }
}

// 🏃‍♂️ EJECUTAR TEST
testVectorizer()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 TEST EXITOSO - Vectorizer listo para usar!');
    } else {
      console.log('\n💥 TEST FALLÓ - Revisa la configuración');
    }
  })
  .catch(error => {
    console.error('💥 TEST CRASH:', error);
  });

// 🎯 INSTRUCCIONES DE USO:
/*
1. npm install @supabase/supabase-js
2. Cambiar las variables de configuración arriba
3. Asegúrate que RestaurantDataVectorizer.js esté en la ruta correcta
4. node test-vectorizer.js
5. Revisar los resultados

NECESITAS PROPORCIONAR:
- SUPABASE_URL
- SUPABASE_ANON_KEY  
- RESTAURANT_ID (¿cuál usas en tu app?)
*/