// poster-explorer.js - Explorador de datos de Poster
const axios = require('axios');
const fs = require('fs').promises;

// Configuración
const ACCESS_TOKEN = '201539:49078536a75d8aeaa6d38dee8aff5e96';
const BASE_URL = 'https://joinposter.com/api';
const ACCOUNT_ID = '201539';

// Cliente HTTP configurado
const posterAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    token: ACCESS_TOKEN
  }
});

// Función auxiliar para hacer requests
async function makeRequest(endpoint, params = {}) {
  try {
    console.log(`📡 Consultando: ${endpoint}`);
    const response = await posterAPI.get(endpoint, { params });
    return response.data.response || response.data;
  } catch (error) {
    console.error(`❌ Error en ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

// Explorador principal
async function exploreChickenChicanito() {
  console.log(`
🔍 INICIANDO EXPLORACIÓN DE DATOS - CHICKEN CHICANITO
📅 Fecha: ${new Date().toLocaleString('es-MX')}
🔑 Account: ${ACCOUNT_ID}
${'='.repeat(60)}
  `);

  const dataReport = {
    timestamp: new Date().toISOString(),
    restaurant: 'Chicken Chicanito',
    account_id: ACCOUNT_ID,
    data_categories: {}
  };

  // 1. INFORMACIÓN GENERAL
  console.log('\n📋 1. INFORMACIÓN GENERAL DEL NEGOCIO');
  console.log('-'.repeat(40));
  
  const settings = await makeRequest('/settings.getAllSettings');
  if (settings) {
    dataReport.data_categories.settings = {
      has_data: true,
      sample_count: Object.keys(settings).length,
      key_info: {
        currency: settings.currency_iso,
        timezone: settings.timezone,
        country: settings.country_code
      }
    };
    console.log(`✅ Moneda: ${settings.currency_iso || 'No configurada'}`);
    console.log(`✅ Zona horaria: ${settings.timezone || 'No configurada'}`);
    console.log(`✅ País: ${settings.country_code || 'No configurado'}`);
  }

  // 2. PRODUCTOS Y MENÚ
  console.log('\n🍔 2. PRODUCTOS Y MENÚ');
  console.log('-'.repeat(40));
  
  const products = await makeRequest('/menu.getProducts');
  if (products) {
    const productCount = products.length;
    dataReport.data_categories.products = {
      has_data: productCount > 0,
      total_count: productCount,
      sample: products.slice(0, 5).map(p => ({
        name: p.product_name,
        price: p.price,
        category: p.category_name
      }))
    };
    console.log(`✅ Total de productos: ${productCount}`);
    if (productCount > 0) {
      console.log('📦 Muestra de productos:');
      products.slice(0, 5).forEach(p => {
        // Manejar diferentes formatos de precio
        let price = 'N/A';
        if (p.price) {
          if (typeof p.price === 'object' && p.price['1']) {
            price = `${(p.price['1']/100).toFixed(2)}`;
          } else if (typeof p.price === 'number') {
            price = `${(p.price/100).toFixed(2)}`;
          } else if (typeof p.price === 'string') {
            price = `${p.price}`;
          }
        }
        console.log(`   - ${p.product_name}: ${price} MXN`);
      });
    } else {
      console.log('⚠️  No hay productos registrados');
    }
  }

  // 3. CATEGORÍAS
  console.log('\n📂 3. CATEGORÍAS DE PRODUCTOS');
  console.log('-'.repeat(40));
  
  const categories = await makeRequest('/menu.getCategories');
  if (categories) {
    const categoryCount = categories.length;
    dataReport.data_categories.categories = {
      has_data: categoryCount > 0,
      total_count: categoryCount,
      list: categories.map(c => c.category_name)
    };
    console.log(`✅ Total de categorías: ${categoryCount}`);
    if (categoryCount > 0) {
      categories.forEach(c => {
        console.log(`   - ${c.category_name}`);
      });
    }
  }

  // 4. INGREDIENTES
  console.log('\n🥗 4. INGREDIENTES');
  console.log('-'.repeat(40));
  
  const ingredients = await makeRequest('/menu.getIngredients');
  if (ingredients) {
    const ingredientCount = ingredients.length;
    dataReport.data_categories.ingredients = {
      has_data: ingredientCount > 0,
      total_count: ingredientCount,
      sample: ingredients.slice(0, 5).map(i => ({
        name: i.ingredient_name,
        unit: i.ingredient_unit
      }))
    };
    console.log(`✅ Total de ingredientes: ${ingredientCount}`);
    if (ingredientCount > 0) {
      console.log('🥬 Muestra de ingredientes:');
      ingredients.slice(0, 5).forEach(i => {
        console.log(`   - ${i.ingredient_name} (${i.ingredient_unit})`);
      });
    } else {
      console.log('⚠️  No hay ingredientes registrados');
    }
  }

  // 5. INVENTARIO/STOCK
  console.log('\n📦 5. INVENTARIO Y STOCK');
  console.log('-'.repeat(40));
  
  const storage = await makeRequest('/storage.getStorage');
  if (storage) {
    const hasStock = storage && storage.length > 0;
    dataReport.data_categories.inventory = {
      has_data: hasStock,
      storage_count: storage.length
    };
    if (hasStock) {
      console.log(`✅ Ubicaciones de almacén: ${storage.length}`);
      storage.forEach(s => {
        console.log(`   - ${s.storage_name}`);
      });
    } else {
      console.log('⚠️  No hay configuración de inventario');
    }
  }

  // 6. VENTAS (Últimos 7 días)
  console.log('\n💰 6. VENTAS Y TRANSACCIONES');
  console.log('-'.repeat(40));
  
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const dateFrom = weekAgo.toISOString().split('T')[0];
  const dateTo = today.toISOString().split('T')[0];
  
  const transactions = await makeRequest('/dash.getTransactions', {
    date_from: dateFrom,
    date_to: dateTo,
    per_page: 100
  });
  
  if (transactions && transactions.data) {
    const transCount = transactions.data.length;
    const totalSales = transactions.data.reduce((sum, t) => sum + parseFloat(t.sum), 0);
    
    dataReport.data_categories.sales = {
      has_data: transCount > 0,
      last_7_days: {
        transaction_count: transCount,
        total_sales: totalSales,
        average_ticket: transCount > 0 ? totalSales / transCount : 0
      }
    };
    
    console.log(`✅ Transacciones últimos 7 días: ${transCount}`);
    console.log(`💵 Ventas totales: $${totalSales.toFixed(2)} MXN`);
    if (transCount > 0) {
      console.log(`🎯 Ticket promedio: $${(totalSales / transCount).toFixed(2)} MXN`);
    } else {
      console.log('⚠️  No hay ventas registradas en los últimos 7 días');
    }
  }

  // 7. CLIENTES
  console.log('\n👥 7. CLIENTES');
  console.log('-'.repeat(40));
  
  const clients = await makeRequest('/clients.getClients', {
    per_page: 100
  });
  
  if (clients && clients.data) {
    const clientCount = clients.data.length;
    dataReport.data_categories.clients = {
      has_data: clientCount > 0,
      total_count: clientCount
    };
    console.log(`✅ Total de clientes registrados: ${clientCount}`);
  }

  // 8. EMPLEADOS
  console.log('\n👨‍🍳 8. EMPLEADOS');
  console.log('-'.repeat(40));
  
  const employees = await makeRequest('/access.getEmployees');
  if (employees) {
    const employeeCount = employees.length;
    dataReport.data_categories.employees = {
      has_data: employeeCount > 0,
      total_count: employeeCount,
      list: employees.map(e => ({
        name: e.name,
        role: e.role_name
      }))
    };
    console.log(`✅ Total de empleados: ${employeeCount}`);
    if (employeeCount > 0) {
      employees.forEach(e => {
        console.log(`   - ${e.name} (${e.role_name})`);
      });
    }
  }

  // 9. ANÁLISIS Y RECOMENDACIONES
  console.log('\n\n📊 ANÁLISIS DE DATOS');
  console.log('='.repeat(60));
  
  const analysis = analyzeDataCompleteness(dataReport);
  
  console.log(`\n✅ CATEGORÍAS CON DATOS (${analysis.with_data.length}/${analysis.total}):`);
  analysis.with_data.forEach(cat => {
    console.log(`   ✓ ${cat}`);
  });
  
  console.log(`\n❌ CATEGORÍAS SIN DATOS (${analysis.without_data.length}/${analysis.total}):`);
  analysis.without_data.forEach(cat => {
    console.log(`   ✗ ${cat}`);
  });
  
  console.log('\n💡 OPORTUNIDADES PARA FUDIGPT:');
  analysis.opportunities.forEach((opp, i) => {
    console.log(`   ${i + 1}. ${opp}`);
  });

  // Guardar reporte
  const reportPath = `./chicken-chicanito-report-${new Date().toISOString().split('T')[0]}.json`;
  await fs.writeFile(reportPath, JSON.stringify(dataReport, null, 2));
  console.log(`\n📄 Reporte completo guardado en: ${reportPath}`);
  
  return dataReport;
}

// Función de análisis
function analyzeDataCompleteness(report) {
  const categories = report.data_categories;
  const with_data = [];
  const without_data = [];
  const opportunities = [];
  
  Object.entries(categories).forEach(([category, data]) => {
    if (data.has_data) {
      with_data.push(category);
    } else {
      without_data.push(category);
    }
  });
  
  // Generar oportunidades específicas
  if (!categories.ingredients?.has_data || categories.ingredients?.total_count < 10) {
    opportunities.push('Ayudar a registrar ingredientes completos para control de costos');
  }
  
  if (!categories.inventory?.has_data) {
    opportunities.push('Implementar control de inventario con entradas por voz');
  }
  
  if (!categories.sales?.has_data || categories.sales?.last_7_days?.transaction_count < 50) {
    opportunities.push('Capturar ventas diarias de forma conversacional');
  }
  
  if (!categories.clients?.has_data || categories.clients?.total_count < 10) {
    opportunities.push('Construir base de clientes frecuentes');
  }
  
  if (categories.products?.total_count < 20) {
    opportunities.push('Completar el menú con todos los platillos y bebidas');
  }
  
  opportunities.push('Análisis predictivo basado en los datos existentes');
  opportunities.push('Alertas inteligentes de inventario bajo');
  opportunities.push('Recomendaciones de precios basadas en costos');
  
  return {
    total: Object.keys(categories).length,
    with_data,
    without_data,
    opportunities,
    completeness_percentage: (with_data.length / Object.keys(categories).length * 100).toFixed(1)
  };
}

// Ejecutar exploración
console.log('🚀 Iniciando exploración de Chicken Chicanito...\n');

exploreChickenChicanito()
  .then(() => {
    console.log('\n✅ ¡Exploración completada!');
    console.log('🧠 FudiGPT ahora conoce mejor a Chicken Chicanito');
  })
  .catch(error => {
    console.error('\n❌ Error durante la exploración:', error);
  });