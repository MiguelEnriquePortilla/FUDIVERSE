// services/dataQuarry/DataQuarryImporter.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Configuración
const POSTER_API_BASE = 'https://joinposter.com/api';
const ACCESS_TOKEN = '201539:49078536a75d8aeaa6d38dee8aff5e96';
const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class DataQuarryImporter {
  constructor() {
    this.stats = {
      transactions: 0,
      products: 0,
      categories: 0,
      employees: 0,
      customers: 0,
      dailySummaries: 0,
      errors: []
    };
  }

  // 🏗️ CREAR TABLAS FALTANTES
  async createMissingTables() {
    console.log('🏗️ Creando tablas faltantes en Supabase...\n');
    
    // Aquí normalmente usarías migraciones, pero para rapidez:
    console.log('⚠️  Por favor, crea estas tablas en Supabase:');
    console.log('   - products');
    console.log('   - categories');
    console.log('   - employees');
    console.log('   - customers');
    console.log('   - inventory_items');
    console.log('\n   (O usa el SQL proporcionado al final)\n');
  }

  // 📊 IMPORTAR TRANSACCIONES HISTÓRICAS
    async importTransactions(days = 30) {
        console.log(`\n📊 Importando transacciones de los últimos ${days} días...`);
        console.log('   🔍 DEBUG: Entrando a importTransactions...');
        
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - days);
        const dateFromStr = dateFrom.toISOString().split('T')[0];
        const dateToStr = new Date().toISOString().split('T')[0];
    
   try {
        console.log('   🔍 DEBUG: Preparando llamada a Poster API...');
        console.log(`   📅 Fechas calculadas: ${dateFromStr} a ${dateToStr}`);
      const response = await axios.get(`${POSTER_API_BASE}/transactions.getTransactions`, {
        params: {
        token: ACCESS_TOKEN,
        date_from: dateFromStr,  // Sin replace, formato: 2025-04-27
        date_to: dateToStr,      // Sin replace, formato: 2025-05-27
        per_page: 1000
        }
      });

        console.log(`   📡 URL completa: ${POSTER_API_BASE}/transactions.getTransactions`);
        console.log(`   📅 Fechas enviadas: ${dateFromStr} a ${dateToStr}`);
        console.log(`   🔑 Token: ${ACCESS_TOKEN.substring(0, 20)}...`);
        console.log(`   📦 Respuesta status: ${response.status}`);
        console.log(`   📦 Respuesta data:`, response.data);

      const transactions = response.data.response?.data || response.data.data || [];
      console.log(`   ✅ Encontradas ${transactions.length} transacciones`);

      // Procesar en lotes
      const batchSize = 100;
      for (let i = 0; i < transactions.length; i += batchSize) {
        const batch = transactions.slice(i, i + batchSize);
        const formattedBatch = batch.map(t => this.formatTransaction(t));
        
        const { error } = await supabase
          .from('transactions')
          .insert(formattedBatch);
          
        if (error) {
          console.error(`   ❌ Error en batch ${i}: ${error.message}`);
          this.stats.errors.push(error);
        } else {
          this.stats.transactions += batch.length;
          console.log(`   📦 Batch ${i/batchSize + 1}: ${batch.length} transacciones importadas`);
        }
      }
      
    } catch (error) {
      console.error('❌ Error importando transacciones:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 🍗 IMPORTAR PRODUCTOS Y CATEGORÍAS
  async importProducts() {
    console.log('\n🍗 Importando productos y categorías...');
    
    try {
      // Primero las categorías
      const categoriesResponse = await axios.get(`${POSTER_API_BASE}/menu.getCategories`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const categories = categoriesResponse.data.response || [];
      console.log(`   ✅ Encontradas ${categories.length} categorías`);
      
      // Crear tabla categories si no existe
      for (const cat of categories) {
        const { error } = await supabase
          .from('categories')
          .upsert({
            id: cat.category_id,
            restaurant_id: RESTAURANT_ID,
            name: cat.category_name,
            color: cat.category_color,
            parent_id: cat.parent_category || null,
            sort_order: cat.sort_order || 0,
            visible: cat.visible === '1',
            created_at: new Date().toISOString()
          }, { onConflict: 'id' });
          
        if (!error) this.stats.categories++;
      }
      
      // Ahora los productos
      const productsResponse = await axios.get(`${POSTER_API_BASE}/menu.getProducts`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const products = productsResponse.data.response || [];
      console.log(`   ✅ Encontrados ${products.length} productos`);
      
      for (const prod of products) {
        const { error } = await supabase
          .from('products')
          .upsert({
            id: prod.product_id,
            restaurant_id: RESTAURANT_ID,
            name: prod.product_name,
            category_id: prod.menu_category_id,
            price: parseFloat(prod.price) || 0,
            cost: parseFloat(prod.product_production_description) || 0,
            barcode: prod.barcode,
            unit: prod.unit,
            visible: prod.visible === '1',
            photo: prod.photo,
            description: prod.ingredient_name,
            created_at: new Date().toISOString()
          }, { onConflict: 'id' });
          
        if (!error) this.stats.products++;
      }
      
    } catch (error) {
      console.error('❌ Error importando productos:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 👥 IMPORTAR EMPLEADOS
  async importEmployees() {
    console.log('\n👥 Importando empleados...');
    
    try {
      const response = await axios.get(`${POSTER_API_BASE}/access.getEmployees`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const employees = response.data.response || [];
      console.log(`   ✅ Encontrados ${employees.length} empleados`);
      
      for (const emp of employees) {
        const { error } = await supabase
          .from('employees')
          .upsert({
            id: emp.user_id || emp.employee_id,
            restaurant_id: RESTAURANT_ID,
            name: emp.name,
            email: emp.email,
            phone: emp.phone,
            position: emp.role_name,
            pin: emp.employee_pin,
            active: emp.blocked === '0',
            created_at: new Date().toISOString()
          }, { onConflict: 'id' })
          .select();

        console.log('   DEBUG empleado:', emp.employee_id, emp.name);
        console.log('   DEBUG resultado:', { data, error });

        if (!error && data) this.stats.employees++;
        //if (!error) this.stats.employees++;
      }
      
    } catch (error) {
      console.error('❌ Error importando empleados:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 📅 GENERAR DAILY SUMMARIES
  async generateDailySummaries(days = 30) {
    console.log(`\n📅 Generando resúmenes diarios para ${days} días...`);
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      try {
        // Obtener transacciones del día
        const { data: dayTransactions } = await supabase
          .from('transactions')
          .select('*')
          .eq('restaurant_id', RESTAURANT_ID)
          .gte('transaction_date', `${dateStr}T00:00:00`)
          .lt('transaction_date', `${dateStr}T23:59:59`);
          
        if (!dayTransactions || dayTransactions.length === 0) continue;
        
        // Calcular métricas
        const summary = this.calculateDailySummary(dayTransactions, dateStr);
        
        // Guardar resumen
        const { error } = await supabase
          .from('daily_summaries')
          .upsert(summary, { onConflict: 'restaurant_id,summary_date' });
          
        if (!error) {
          this.stats.dailySummaries++;
          console.log(`   ✅ Resumen generado para ${dateStr}`);
        }
        
      } catch (error) {
        console.error(`   ❌ Error en ${dateStr}:`, error.message);
      }
    }
  }

  // 🧮 CALCULAR RESUMEN DIARIO
  calculateDailySummary(transactions, date) {
    const hourlyData = {};
    const paymentMethods = {};
    const employeeSales = {};
    const productSales = {};
    
    // Inicializar horas
    for (let h = 0; h < 24; h++) {
      hourlyData[h] = { count: 0, total: 0 };
    }
    
    // Procesar transacciones
    transactions.forEach(t => {
      // Por hora
      const hour = new Date(t.transaction_date).getHours();
      hourlyData[hour].count++;
      hourlyData[hour].total += parseFloat(t.total_amount) || 0;
      
      // Por método de pago
      const payment = t.payment_method || 'cash';
      paymentMethods[payment] = (paymentMethods[payment] || 0) + 1;
      
      // Por empleado
      if (t.employee_id) {
        employeeSales[t.employee_id] = (employeeSales[t.employee_id] || 0) + parseFloat(t.total_amount);
      }
      
      // Por productos
      if (t.items && Array.isArray(t.items)) {
        t.items.forEach(item => {
          const key = item.product_id || item.name;
          if (!productSales[key]) {
            productSales[key] = { count: 0, total: 0, name: item.name };
          }
          productSales[key].count += item.quantity || 1;
          productSales[key].total += parseFloat(item.price) * (item.quantity || 1);
        });
      }
    });
    
    // Top productos
    const topProducts = Object.entries(productSales)
      .sort(([,a], [,b]) => b.total - a.total)
      .slice(0, 10)
      .map(([id, data]) => ({
        product_id: id,
        name: data.name,
        quantity: data.count,
        revenue: data.total
      }));
    
    return {
      restaurant_id: RESTAURANT_ID,
      summary_date: date,
      total_sales: transactions.reduce((sum, t) => sum + parseFloat(t.total_amount || 0), 0),
      total_tax: transactions.reduce((sum, t) => sum + parseFloat(t.tax_amount || 0), 0),
      total_discounts: transactions.reduce((sum, t) => sum + parseFloat(t.discount_amount || 0), 0),
      total_tips: transactions.reduce((sum, t) => sum + parseFloat(t.tip_amount || 0), 0),
      transaction_count: transactions.length,
      item_count: transactions.reduce((sum, t) => sum + (t.item_count || 0), 0),
      guest_count: transactions.reduce((sum, t) => sum + (t.guest_count || 0), 0),
      avg_ticket: transactions.length > 0 ? 
        transactions.reduce((sum, t) => sum + parseFloat(t.total_amount || 0), 0) / transactions.length : 0,
      hourly_sales: hourlyData,
      payment_methods: paymentMethods,
      employee_sales: employeeSales,
      top_products: topProducts,
      created_at: new Date().toISOString()
    };
  }

  // 🔧 FORMATEAR TRANSACCIÓN
    formatTransaction(posterTransaction) {
    return {
        restaurant_id: RESTAURANT_ID,
        pos_transaction_id: posterTransaction.transaction_id,
        transaction_date: posterTransaction.date_close ? 
        new Date(posterTransaction.date_close).toISOString() : 
        new Date().toISOString(),
        amount: parseFloat(posterTransaction.sum) || 0,
        tax_amount: parseFloat(posterTransaction.tax_sum || 0) || 0,
        discount_amount: parseFloat(posterTransaction.discount || 0) || 0,
        tip_amount: parseFloat(posterTransaction.tip_sum || 0) || 0,
        total_amount: parseFloat(posterTransaction.payed_sum) || 0,
        payment_method: posterTransaction.payed_card > 0 ? 'card' : 'cash',
        employee_id: posterTransaction.user_id,
        employee_name: posterTransaction.name,
        table_number: posterTransaction.table_name,
        guest_count: parseInt(posterTransaction.guests_count || 1),
        items: posterTransaction.products || [],
        item_count: posterTransaction.products ? posterTransaction.products.length : 0,
        created_at: new Date().toISOString()
    };
    }

  // 🚀 EJECUTAR IMPORTACIÓN COMPLETA
  async runFullImport() {
    console.log('🚀 INICIANDO OPERACIÓN DATA QUARRY');
    console.log('═'.repeat(60));
    console.log(`🏪 Restaurant: ${RESTAURANT_ID}`);
    console.log(`🔑 Access Token: ${ACCESS_TOKEN.substring(0, 10)}...`);
    console.log('═'.repeat(60));
    
    const startTime = Date.now();
    
    // Ejecutar importaciones
    await this.createMissingTables();
    await this.importEmployees();
    await this.importProducts();
    await this.importTransactions(30); // Últimos 30 días
    await this.generateDailySummaries(30);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Mostrar resumen
    console.log('\n\n');
    console.log('═'.repeat(60));
    console.log('📊 RESUMEN DE IMPORTACIÓN');
    console.log('═'.repeat(60));
    console.log(`⏱️  Duración total: ${duration} segundos`);
    console.log(`📦 Transacciones importadas: ${this.stats.transactions}`);
    console.log(`🍗 Productos importados: ${this.stats.products}`);
    console.log(`📁 Categorías importadas: ${this.stats.categories}`);
    console.log(`👥 Empleados importados: ${this.stats.employees}`);
    console.log(`📅 Resúmenes diarios generados: ${this.stats.dailySummaries}`);
    console.log(`❌ Errores encontrados: ${this.stats.errors.length}`);
    console.log('═'.repeat(60));
    
    if (this.stats.errors.length > 0) {
      console.log('\n⚠️  ERRORES DETALLADOS:');
      this.stats.errors.forEach((err, i) => {
        console.log(`${i + 1}. ${err.message}`);
      });
    }
    
    console.log('\n✅ OPERACIÓN DATA QUARRY COMPLETADA');
    console.log('🎯 Ahora tienes una cantera de datos para análisis!');
  }
}

// SQL para crear tablas faltantes
const CREATE_TABLES_SQL = `
-- Categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  color TEXT,
  parent_id TEXT,
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Productos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id),
  price DECIMAL(10,2),
  cost DECIMAL(10,2),
  barcode TEXT,
  unit TEXT,
  visible BOOLEAN DEFAULT true,
  photo TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Empleados
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  position TEXT,
  pin TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clientes
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id),
  name TEXT,
  email TEXT,
  phone TEXT,
  birthday DATE,
  loyalty_points INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  visit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`;

// Exportar
module.exports = { DataQuarryImporter };

// Si se ejecuta directamente
if (require.main === module) {
  const importer = new DataQuarryImporter();
  importer.runFullImport()
    .then(() => console.log('\n🏁 Script finalizado'))
    .catch(err => console.error('\n💥 Error fatal:', err));
}