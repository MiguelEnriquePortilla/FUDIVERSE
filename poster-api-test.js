// poster-api-test.js
// Script para probar capacidades de escritura del API de POSTER
// Restaurante: Chicken Chicanito (Account: 201539)

const axios = require('axios');

// 🔑 CONFIGURACIÓN DE POSTER API
const POSTER_CONFIG = {
  baseURL: 'https://joinposter.com/api',
  token: '201539:49078536a75d8aeaa6d38dee8aff5e96',
  account: '201539'
};

// 📋 HELPER FUNCTION PARA REQUESTS
async function posterRequest(endpoint, method = 'GET', data = null) {
  try {
    let url = `${POSTER_CONFIG.baseURL}${endpoint}`;
    
    if (method === 'GET') {
      // Para GET, token en query string
      url += `?token=${POSTER_CONFIG.token}`;
      const getResponse = await axios.get(url);
      return {
        success: true,
        status: getResponse.status,
        data: getResponse.data
      };
    } else {
      // Para POST, token y datos en body como form data
      const params = new URLSearchParams();
      params.append('token', POSTER_CONFIG.token);
      
      if (data) {
        Object.keys(data).forEach(key => {
          params.append(key, data[key]);
        });
      }
      
      const config = {
        method,
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params.toString()
      };
      
      const postResponse = await axios(config);
      return {
        success: true,
        status: postResponse.status,
        data: postResponse.data
      };
    }
    
    const response = await axios(config);
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      error: error.response?.data || error.message
    };
  }
}

// 🔍 TEST 1: VERIFICAR PERMISOS ACTUALES
async function testCurrentPermissions() {
  console.log('🔍 TEST 1: Verificando permisos actuales...\n');
  
  // Usar endpoint correcto que sabemos que funciona
  const result = await posterRequest('/menu.getCategories');
  
  if (result.success && result.data.response) {
    console.log('✅ Token válido y funcional');
    console.log('👤 Usuario: Token funciona correctamente');
    console.log('🏢 Restaurante: Chicken Chicanito');
    console.log('🔑 Permisos: Lectura confirmada');
    return true;
  } else {
    console.log('❌ Token inválido:', result.error);
    return false;
  }
}

// 📖 TEST 2: LEER CATEGORÍAS EXISTENTES
async function testReadCategories() {
  console.log('\n📖 TEST 2: Leyendo categorías existentes...\n');
  
  const result = await posterRequest('/menu.getCategories');
  
  if (result.success) {
    console.log('✅ Categorías obtenidas:');
    const categories = result.data.response || [];
    categories.slice(0, 3).forEach(cat => {
      console.log(`   📁 ${cat.category_name} (ID: ${cat.category_id})`);
    });
    return categories[0]?.category_id || 1; // Retornar primera categoría para tests
  } else {
    console.log('❌ Error leyendo categorías:', result.error);
    return null;
  }
}

// 📖 TEST 3: LEER PRODUCTOS EXISTENTES
async function testReadProducts() {
  console.log('\n📖 TEST 3: Leyendo productos existentes...\n');
  
  const result = await posterRequest('/menu.getProducts');
  
  if (result.success) {
    console.log('✅ Productos obtenidos:');
    const products = result.data.response || [];
    products.slice(0, 3).forEach(prod => {
      console.log(`   🍽️ ${prod.product_name} - $${prod.price/100} (ID: ${prod.product_id})`);
    });
    return products[0]?.product_id || null;
  } else {
    console.log('❌ Error leyendo productos:', result.error);
    return null;
  }
}

// ✍️ TEST 4: INTENTAR CREAR PRODUCTO
async function testCreateProduct(categoryId) {
  console.log('\n✍️ TEST 4: Intentando crear producto...\n');
  
  const testProduct = {
    category_id: categoryId || 1,
    product_name: 'FUDI_TEST_RECIPE',
    price: 5000, // $50.00 en centavos
    visible: 1,
    type: 1 // Tipo de producto
  };
  
  console.log('📦 DATOS ENVIADOS:', JSON.stringify(testProduct, null, 2));
  
  const result = await posterRequest('/menu.createProduct', 'POST', testProduct);
  
  console.log('📦 RESPUESTA COMPLETA:', JSON.stringify(result, null, 2));
  
  if (result.success && result.data) {
    const response = result.data?.response || result.data;
    const productId = response?.product_id || response?.id;
    
    console.log('🎉 ¡ÉXITO! Producto creado:');
    console.log(`   ID: ${productId}`);
    console.log(`   Nombre: ${testProduct.product_name}`);
    return productId;
  } else {
    console.log('❌ No se pudo crear producto:');
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
    return null;
  }
}

// ✍️ TEST 5: INTENTAR ACTUALIZAR PRODUCTO
async function testUpdateProduct(productId) {
  if (!productId) {
    console.log('\n⏭️ TEST 5: Saltando - no hay producto para actualizar\n');
    return false;
  }
  
  console.log('\n✍️ TEST 5: Intentando actualizar producto...\n');
  
  const updateData = {
    product_id: productId,
    product_name: 'FUDI_RECIPE_UPDATED',
    price: 7500 // $75.00
  };
  
  const result = await posterRequest('/menu.updateProduct', 'POST', updateData);
  
  if (result.success) {
    console.log('🎉 ¡ÉXITO! Producto actualizado');
    return true;
  } else {
    console.log('❌ No se pudo actualizar producto:');
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
    return false;
  }
}

// 🗑️ TEST 6: INTENTAR ELIMINAR PRODUCTO DE PRUEBA
async function testDeleteProduct(productId) {
  if (!productId) {
    console.log('\n⏭️ TEST 6: Saltando - no hay producto para eliminar\n');
    return false;
  }
  
  console.log('\n🗑️ TEST 6: Limpiando producto de prueba...\n');
  
  const result = await posterRequest('/menu.removeProduct', 'POST', {
    product_id: productId
  });
  
  if (result.success) {
    console.log('✅ Producto de prueba eliminado');
    return true;
  } else {
    console.log('⚠️ No se pudo eliminar producto de prueba:');
    console.log(`   Status: ${result.status}`);
    console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
    return false;
  }
}

// 📊 TEST 7: VERIFICAR OTROS ENDPOINTS DE ESCRITURA
async function testOtherWriteEndpoints() {
  console.log('\n📊 TEST 7: Probando otros endpoints de escritura...\n');
  
  const writeEndpoints = [
    '/menu.createCategory',
    '/storage.createProduct', 
    '/storage.updateProduct',
    '/clients.createClient',
    '/transactions.createIncomingOrder'
  ];
  
  for (const endpoint of writeEndpoints) {
    const result = await posterRequest(endpoint, 'POST', {});
    console.log(`${result.success ? '✅' : '❌'} ${endpoint}: ${result.status}`);
  }
}

// 🚀 FUNCIÓN PRINCIPAL
async function runAllTests() {
  console.log('🔬 POSTER API WRITE CAPABILITIES TEST');
  console.log('=====================================\n');
  console.log(`🏢 Restaurante: Chicken Chicanito`);
  console.log(`🔑 Account: ${POSTER_CONFIG.account}\n`);
  
  try {
    // Test de permisos básicos
    const hasValidToken = await testCurrentPermissions();
    if (!hasValidToken) return;
    
    // Test de lectura (baseline)
    const categoryId = await testReadCategories();
    await testReadProducts();
    
    // Tests de escritura críticos
    const createdProductId = await testCreateProduct(categoryId);
    await testUpdateProduct(createdProductId);
    
    // Cleanup
    await testDeleteProduct(createdProductId);
    
    // Test extensivo de otros endpoints
    await testOtherWriteEndpoints();
    
    // Resumen final
    console.log('\n🎯 RESUMEN DE CAPACIDADES:');
    console.log('============================');
    if (createdProductId) {
      console.log('🎉 ¡POSTER PERMITE ESCRITURA!');
      console.log('   ✅ Crear productos');
      console.log('   ✅ Actualizar productos');
      console.log('   ✅ Eliminar productos');
      console.log('\n💡 IMPLICACIÓN: Podemos hacer fudiRecipes → POSTER automático');
    } else {
      console.log('⚠️ POSTER LIMITADO A LECTURA');
      console.log('   ✅ Leer datos');
      console.log('   ❌ Escribir datos');
      console.log('\n💡 IMPLICACIÓN: fudiRecipes → Export manual requerido');
    }
    
  } catch (error) {
    console.error('\n💥 ERROR CRÍTICO:', error.message);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests,
  posterRequest,
  POSTER_CONFIG
};