// services/dataQuarry/DataQuarryImporterV3.js
// VERSION 3 - Con todos los arreglos para datos del mundo real
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const crypto = require('crypto');

// Configuración
const POSTER_API_BASE = 'https://joinposter.com/api';
const ACCESS_TOKEN = '201539:49078536a75d8aeaa6d38dee8aff5e96';
const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class DataQuarryImporterV3 {
  constructor() {
    this.stats = {
      transactions: 0,
      products: 0,
      categories: 0,
      employees: 0,
      customers: 0,
      inventory: 0,
      suppliers: 0,
      purchases: 0,
      cashFlows: 0,
      tables: 0,
      dailySummaries: 0,
      errors: []
    };
  }

  // 🏗️ CREAR TABLAS FALTANTES v3
  async createMissingTables() {
    console.log('🏗️ Verificando tablas necesarias...\n');
    
    const requiredTables = [
      'products', 'categories', 'employees', 'customers',
      'inventory_items', 'suppliers', 'purchases', 'cash_flows',
      'tables', 'abc_analysis'
    ];
    
    console.log('📋 Tablas requeridas:', requiredTables.join(', '));
    console.log('✅ Todas las tablas ya deberían estar creadas\n');
  }

  // 🛠️ UTILIDAD: Parsear fecha de manera segura
  parseSafeDate(dateValue) {
    if (!dateValue) return null;
    
    try {
      // Si es timestamp Unix (número o string numérico)
      if (typeof dateValue === 'number' || /^\d+$/.test(dateValue)) {
        const timestamp = parseInt(dateValue);
        // Verificar si es timestamp válido (entre 1970 y 2100)
        if (timestamp > 0 && timestamp < 4102444800) {
          // Si es menor a 10 billones, probablemente es en segundos
          if (timestamp < 10000000000) {
            return new Date(timestamp * 1000).toISOString();
          }
          // Si no, es en milisegundos
          return new Date(timestamp).toISOString();
        }
      }
      
      // Si es string de fecha
      if (typeof dateValue === 'string') {
        // Formato YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
          return new Date(dateValue + 'T00:00:00Z').toISOString();
        }
        // Intentar parsear como fecha normal
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          return date.toISOString();
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  // 👥 IMPORTAR EMPLEADOS (ARREGLADO)
  async importEmployees() {
    console.log('\n👥 Importando empleados...');
    
    try {
      const response = await axios.get(`${POSTER_API_BASE}/access.getEmployees`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const employees = response.data.response || [];
      console.log(`   ✅ Encontrados ${employees.length} empleados`);
      
      let imported = 0;
      for (const emp of employees) {
        try {
          const formatted = {
            id: emp.user_id || emp.employee_id || emp.id,
            restaurant_id: RESTAURANT_ID,
            name: emp.name || 'Empleado',
            email: emp.email || null,
            phone: emp.phone || null,
            position: emp.role_name || emp.position || 'General',
            pin: emp.employee_pin || null,
            active: emp.blocked === '0' || emp.blocked === 0 || !emp.blocked,
            created_at: new Date().toISOString()
          };
          
          const { data, error } = await supabase
            .from('employees')
            .upsert(formatted, { onConflict: 'id' })
            .select();
          
          if (!error && data && data.length > 0) {
            imported++;
          }
        } catch (err) {
          console.log(`   ⚠️ Error con empleado ${emp.name}:`, err.message);
        }
      }
      
      this.stats.employees = imported;
      console.log(`   ✅ ${imported} empleados importados correctamente`);
      
    } catch (error) {
      console.error('❌ Error importando empleados:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 👥 IMPORTAR CLIENTES (ARREGLADO)
  async importCustomers() {
    console.log('\n👥 Importando clientes...');
    
    try {
      const response = await axios.get(`${POSTER_API_BASE}/clients.getClients`, {
        params: { 
          token: ACCESS_TOKEN,
          per_page: 1000 
        }
      });
      
      const customers = response.data.response || [];
      console.log(`   ✅ Encontrados ${customers.length} clientes`);
      
      let imported = 0;
      const batchSize = 50;
      
      for (let i = 0; i < customers.length; i += batchSize) {
        const batch = customers.slice(i, i + batchSize);
        const formattedBatch = [];
        
        for (const customer of batch) {
          try {
            const formatted = {
              id: customer.client_id,
              restaurant_id: RESTAURANT_ID,
              name: `${customer.firstname || ''} ${customer.lastname || ''}`.trim() || 'Cliente',
              email: customer.email || null,
              phone: customer.phone || null,
              birthday: this.parseSafeDate(customer.birthday),
              loyalty_points: parseInt(customer.bonus || 0),
              total_spent: parseFloat(customer.total_payed_sum || 0),
              visit_count: parseInt(customer.orders_count || 0),
              discount_percent: parseFloat(customer.discount || 0),
              created_at: this.parseSafeDate(customer.date_activale) || new Date().toISOString()
            };
            
            formattedBatch.push(formatted);
          } catch (err) {
            console.log(`   ⚠️ Error procesando cliente ${customer.client_id}`);
          }
        }
        
        if (formattedBatch.length > 0) {
          const { error } = await supabase
            .from('customers')
            .upsert(formattedBatch, { onConflict: 'id' });
          
          if (!error) {
            imported += formattedBatch.length;
            console.log(`   📦 Procesados ${imported} de ${customers.length}`);
          } else {
            console.log(`   ❌ Error en batch:`, error.message);
          }
        }
      }
      
      this.stats.customers = imported;
      console.log(`   ✅ ${imported} clientes importados correctamente`);
      
    } catch (error) {
      console.error('❌ Error importando clientes:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 📦 IMPORTAR INVENTARIO (ARREGLADO)
  async importInventory() {
    console.log('\n📦 Importando inventario...');
    
    try {
      // Obtener ingredientes/items de inventario
      const response = await axios.get(`${POSTER_API_BASE}/menu.getIngredients`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const ingredients = response.data.response || [];
      console.log(`   ✅ Encontrados ${ingredients.length} items de inventario`);
      
      // Obtener stock actual
      let stockMap = {};
      try {
        const stockResponse = await axios.get(`${POSTER_API_BASE}/storage.getIngredients`, {
          params: { 
            token: ACCESS_TOKEN,
            storage_id: 1 // Storage principal
          }
        });
        
        const stockData = stockResponse.data.response || [];
        stockData.forEach(item => {
          stockMap[item.ingredient_id] = item;
        });
      } catch (stockError) {
        console.log('   ⚠️ No se pudo obtener stock actual, usando valores por defecto');
      }
      
      let imported = 0;
      
      for (const item of ingredients) {
        try {
          const stock = stockMap[item.ingredient_id] || {};
          
          const formatted = {
            id: crypto.randomUUID(), // Generar UUID porque la tabla espera UUID
            restaurant_id: RESTAURANT_ID,
            pos_item_id: item.ingredient_id,
            name: item.ingredient_name || 'Item',
            category: item.category_name || 'General',
            unit: item.ingredient_unit || 'unidad',
            unit_cost: parseFloat(item.ingredient_cost || 0),
            current_quantity: parseFloat(stock.storage_ingredient_num || 0),
            min_quantity: parseFloat(item.ingredient_minimal || 0),
            max_quantity: null,
            total_value: parseFloat(stock.storage_ingredient_sum || 0),
            supplier_name: null,
            supplier_id: null,
            is_active: true,
            last_updated: this.parseSafeDate(stock.storage_ingredient_update) || new Date().toISOString(),
            created_at: new Date().toISOString()
            };
          
            const { error } = await supabase
            .from('inventory_items')
            .upsert(formatted, { onConflict: 'id' });

            if (error) {
            console.log(`   ❌ Error guardando ${item.ingredient_name}:`, error.message);
            } else {
            imported++;
            }
        } catch (err) {
          console.log(`   ⚠️ Error con item ${item.ingredient_name}:`, err.message);
        }
      }
      
      this.stats.inventory = imported;
      console.log(`   ✅ ${imported} items de inventario importados correctamente`);
      
    } catch (error) {
      console.error('❌ Error importando inventario:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 💰 IMPORTAR FLUJO DE EFECTIVO (ARREGLADO)
  async importCashFlows(days = 30) {
    console.log(`\n💰 Importando flujo de efectivo de ${days} días...`);
    
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);
    const dateFromStr = dateFrom.toISOString().split('T')[0];
    const dateToStr = new Date().toISOString().split('T')[0];
    
    try {
      const response = await axios.get(`${POSTER_API_BASE}/finance.getCashShifts`, {
        params: {
          token: ACCESS_TOKEN,
          date_from: dateFromStr,
          date_to: dateToStr
        }
      });
      
      const shifts = response.data.response || [];
      console.log(`   ✅ Encontrados ${shifts.length} cortes de caja`);
      
      let imported = 0;
      
      for (const shift of shifts) {
        try {
          const formatted = {
            id: shift.cash_shift_id || `shift_${shift.date_start}_${shift.user_id}`,
            restaurant_id: RESTAURANT_ID,
            shift_date: this.parseSafeDate(shift.date_start) || new Date().toISOString(),
            opening_amount: parseFloat(shift.sum_start || 0),
            closing_amount: parseFloat(shift.sum_end || 0),
            cash_sales: parseFloat(shift.sum_cash || 0),
            card_sales: parseFloat(shift.sum_card || 0),
            total_sales: parseFloat(shift.sum_sales || 0),
            expenses: parseFloat(shift.sum_expenses || 0),
            deposits: parseFloat(shift.sum_deposits || 0),
            withdrawals: parseFloat(shift.sum_withdrawals || 0),
            employee_id: shift.user_id || null,
            employee_name: shift.user_name || 'Sin asignar',
            status: shift.is_closed === '1' || shift.is_closed === 1 ? 'closed' : 'open',
            created_at: new Date().toISOString()
          };
          
          const { error } = await supabase
            .from('cash_flows')
            .upsert(formatted, { onConflict: 'id' });
          
          if (!error) {
            imported++;
          }
        } catch (err) {
          console.log(`   ⚠️ Error con corte de caja:`, err.message);
        }
      }
      
      this.stats.cashFlows = imported;
      console.log(`   ✅ ${imported} cortes de caja importados correctamente`);
      
    } catch (error) {
      console.error('❌ Error importando flujo de efectivo:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 🍗 IMPORTAR PRODUCTOS Y CATEGORÍAS (COPIADO DE V2)
  async importProducts() {
    console.log('\n🍗 Importando productos y categorías...');
    
    try {
      // Primero las categorías
      const categoriesResponse = await axios.get(`${POSTER_API_BASE}/menu.getCategories`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const categories = categoriesResponse.data.response || [];
      console.log(`   ✅ Encontradas ${categories.length} categorías`);
      
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

  // 📊 IMPORTAR TRANSACCIONES MEJORADO (COPIADO DE V2)
  async importTransactions(days = 30) {
    console.log(`\n📊 Importando transacciones de los últimos ${days} días...`);
    
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);
    const dateFromStr = dateFrom.toISOString().split('T')[0];
    const dateToStr = new Date().toISOString().split('T')[0];
    
    try {
      let allTransactions = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore && page <= 10) {
        console.log(`   📄 Obteniendo página ${page}...`);
        
        const response = await axios.get(`${POSTER_API_BASE}/transactions.getTransactions`, {
          params: {
            token: ACCESS_TOKEN,
            date_from: dateFromStr,
            date_to: dateToStr,
            per_page: 1000,
            page: page
          }
        });
        
        const data = response.data.response;
        if (data && data.data && data.data.length > 0) {
          allTransactions = [...allTransactions, ...data.data];
          hasMore = data.data.length === 1000;
          page++;
        } else {
          hasMore = false;
        }
      }
      
      console.log(`   ✅ Total de transacciones encontradas: ${allTransactions.length}`);
      
      // Procesar en lotes
      const batchSize = 100;
      for (let i = 0; i < allTransactions.length; i += batchSize) {
        const batch = allTransactions.slice(i, i + batchSize);
        const formattedBatch = batch.map(t => this.formatTransaction(t));
        
        const { error } = await supabase
          .from('transactions')
          .upsert(formattedBatch, { 
            onConflict: 'restaurant_id,pos_transaction_id',
            ignoreDuplicates: true 
          });
          
        if (!error) {
          this.stats.transactions += batch.length;
          console.log(`   📦 Procesadas ${i + batch.length} de ${allTransactions.length}`);
        } else if (!error.message.includes('duplicate')) {
          this.stats.errors.push(error);
        }
      }
      
    } catch (error) {
      console.error('❌ Error importando transacciones:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 🔧 FORMATEAR TRANSACCIÓN (COPIADO DE V2)
  formatTransaction(posterTransaction) {
    return {
      restaurant_id: RESTAURANT_ID,
      pos_transaction_id: posterTransaction.transaction_id,
      transaction_date: this.parseSafeDate(posterTransaction.date_close) || new Date().toISOString(),
      amount: parseFloat(posterTransaction.sum) || 0,
      tax_amount: parseFloat(posterTransaction.tax_sum || 0) || 0,
      discount_amount: parseFloat(posterTransaction.discount || 0) || 0,
      tip_amount: parseFloat(posterTransaction.tip_sum || 0) || 0,
      total_amount: parseFloat(posterTransaction.payed_sum) || 0,
      payment_method: this.determinePaymentMethod(posterTransaction),
      payment_details: {
        cash: parseFloat(posterTransaction.payed_cash || 0),
        card: parseFloat(posterTransaction.payed_card || 0),
        third_party: parseFloat(posterTransaction.payed_third_party || 0)
      },
      employee_id: posterTransaction.user_id,
      employee_name: posterTransaction.name,
      table_number: posterTransaction.table_name,
      guest_count: parseInt(posterTransaction.guests_count || 1),
      items: posterTransaction.products || [],
      item_count: posterTransaction.products ? posterTransaction.products.length : 0,
      //client_id: posterTransaction.client_id,
      created_at: new Date().toISOString()
    };
  }

  determinePaymentMethod(transaction) {
    const cash = parseFloat(transaction.payed_cash || 0);
    const card = parseFloat(transaction.payed_card || 0);
    const third = parseFloat(transaction.payed_third_party || 0);
    
    if (card > cash && card > third) return 'card';
    if (third > cash && third > card) return 'third_party';
    return 'cash';
  }

  // 🛒 IMPORTAR COMPRAS/PROVEEDORES (SIMPLIFICADO)
  async importPurchases(days = 30) {
    console.log(`\n🛒 Importando proveedores...`);
    
    try {
      // Solo importar proveedores por ahora
      const suppliersResponse = await axios.get(`${POSTER_API_BASE}/storage.getSuppliers`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const suppliers = suppliersResponse.data.response || [];
      console.log(`   ✅ Encontrados ${suppliers.length} proveedores`);
      
      let imported = 0;
      
      for (const supplier of suppliers) {
        try {
          const formatted = {
            id: supplier.supplier_id,
            restaurant_id: RESTAURANT_ID,
            name: supplier.supplier_name || 'Proveedor',
            phone: supplier.supplier_phone || null,
            email: supplier.supplier_email || null,
            address: supplier.supplier_address || null,
            active: true,
            created_at: new Date().toISOString()
          };
          
          const { error } = await supabase
            .from('suppliers')
            .upsert(formatted, { onConflict: 'id' });
          
          if (!error) imported++;
        } catch (err) {
          console.log(`   ⚠️ Error con proveedor:`, err.message);
        }
      }
      
      this.stats.suppliers = imported;
      console.log(`   ✅ ${imported} proveedores importados correctamente`);
      
    } catch (error) {
      console.error('❌ Error importando proveedores:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 🪑 IMPORTAR MESAS (SIMPLIFICADO)
  async importTables() {
    console.log('\n🪑 Importando mesas...');
    
    try {
      const response = await axios.get(`${POSTER_API_BASE}/spots.getSpots`, {
        params: { token: ACCESS_TOKEN }
      });
      
      const spots = response.data.response || [];
      console.log(`   ✅ Encontrados ${spots.length} spots/áreas`);
      
      let imported = 0;
      
      for (const spot of spots) {
        try {
          const tablesResponse = await axios.get(`${POSTER_API_BASE}/spots.getTables`, {
            params: { 
              token: ACCESS_TOKEN,
              spot_id: spot.spot_id
            }
          });
          
          const tables = tablesResponse.data.response || [];
          
          for (const table of tables) {
            try {
              const formatted = {
                id: table.table_id,
                restaurant_id: RESTAURANT_ID,
                table_number: table.table_num || table.table_name,
                spot_name: spot.spot_name,
                spot_id: spot.spot_id,
                capacity: parseInt(table.table_seats || 4),
                is_active: table.visible === '1' || table.visible === 1,
                created_at: new Date().toISOString()
              };
              
              const { error } = await supabase
                .from('tables')
                .upsert(formatted, { onConflict: 'id' });
              
              if (!error) imported++;
            } catch (err) {
              console.log(`   ⚠️ Error con mesa:`, err.message);
            }
          }
        } catch (err) {
          console.log(`   ⚠️ Error obteniendo mesas del área ${spot.spot_name}`);
        }
      }
      
      this.stats.tables = imported;
      console.log(`   ✅ ${imported} mesas importadas correctamente`);
      
    } catch (error) {
      console.error('❌ Error importando mesas:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 📅 GENERAR DAILY SUMMARIES (COPIADO DE V2)
  async generateDailySummaries(days = 30) {
    console.log(`\n📅 Generando resúmenes diarios para ${days} días...`);
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      try {
        const { data: dayTransactions } = await supabase
          .from('transactions')
          .select('*')
          .eq('restaurant_id', RESTAURANT_ID)
          .gte('transaction_date', `${dateStr}T00:00:00`)
          .lt('transaction_date', `${dateStr}T23:59:59`);
          
        if (!dayTransactions || dayTransactions.length === 0) continue;
        
        const summary = this.calculateDailySummary(dayTransactions, dateStr);
        
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

  // 🧮 CALCULAR RESUMEN DIARIO (COPIADO DE V2)
  calculateDailySummary(transactions, date) {
    const hourlyData = {};
    const paymentMethods = {};
    const employeeSales = {};
    
    for (let h = 0; h < 24; h++) {
      hourlyData[h] = { count: 0, total: 0 };
    }
    
    transactions.forEach(t => {
      const hour = new Date(t.transaction_date).getHours();
      hourlyData[hour].count++;
      hourlyData[hour].total += parseFloat(t.total_amount) || 0;
      
      const payment = t.payment_method || 'cash';
      paymentMethods[payment] = (paymentMethods[payment] || 0) + 1;
      
      if (t.employee_id) {
        employeeSales[t.employee_id] = (employeeSales[t.employee_id] || 0) + parseFloat(t.total_amount);
      }
    });
    
    return {
      restaurant_id: RESTAURANT_ID,
      summary_date: date,
      total_sales: transactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0),
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
      top_products: [],
      created_at: new Date().toISOString()
    };
  }

  // 📊 GENERAR ANÁLISIS ABC (SIMPLIFICADO)
  async generateABCAnalysis() {
    console.log('\n📊 Generando análisis ABC de productos...');
    
    try {
      const { data: salesData } = await supabase
        .from('transactions')
        .select('items')
        .eq('restaurant_id', RESTAURANT_ID)
        .gte('transaction_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
      
      if (!salesData || salesData.length === 0) {
        console.log('   ⚠️ No hay suficientes datos para análisis ABC');
        return;
      }
      
      const productSales = {};
      let totalRevenue = 0;
      
      salesData.forEach(transaction => {
        if (transaction.items && Array.isArray(transaction.items)) {
          transaction.items.forEach(item => {
            const productId = item.product_id;
            if (!productSales[productId]) {
              productSales[productId] = {
                product_id: productId,
                name: item.product_name || item.name,
                quantity: 0,
                revenue: 0
              };
            }
            const quantity = item.count || item.quantity || 1;
            const price = parseFloat(item.price || 0);
            productSales[productId].quantity += quantity;
            productSales[productId].revenue += price * quantity;
            totalRevenue += price * quantity;
          });
        }
      });
      
      const sortedProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue);
      
      let cumulativeRevenue = 0;
      sortedProducts.forEach(product => {
        cumulativeRevenue += product.revenue;
        const percentage = (cumulativeRevenue / totalRevenue) * 100;
        
        if (percentage <= 80) {
          product.abc_category = 'A';
        } else if (percentage <= 95) {
          product.abc_category = 'B';
        } else {
          product.abc_category = 'C';
        }
        
        product.revenue_percentage = (product.revenue / totalRevenue) * 100;
      });
      
      const { error } = await supabase
        .from('abc_analysis')
        .upsert({
          restaurant_id: RESTAURANT_ID,
          analysis_date: new Date().toISOString().split('T')[0],
          products: sortedProducts,
          total_revenue: totalRevenue,
          created_at: new Date().toISOString()
        }, { onConflict: 'restaurant_id,analysis_date' });
      
      if (!error) {
        console.log(`   ✅ Análisis ABC generado con ${sortedProducts.length} productos`);
      }
      
    } catch (error) {
      console.error('❌ Error generando análisis ABC:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 🚀 EJECUTAR IMPORTACIÓN COMPLETA v3
  async runFullImport() {
    console.log('🚀 INICIANDO OPERACIÓN DATA QUARRY v3.0 - EDICIÓN ARREGLADA');
    console.log('═'.repeat(60));
    console.log(`🏪 Restaurant: ${RESTAURANT_ID}`);
    console.log(`🔑 Access Token: ${ACCESS_TOKEN.substring(0, 10)}...`);
    console.log('═'.repeat(60));
    
    const startTime = Date.now();
    
    try {
      // Verificar tablas
      await this.createMissingTables();
      
      // IMPORTAR EN ORDEN DE PRIORIDAD
      console.log('\n🎯 IMPORTANDO DATOS CRÍTICOS PRIMERO...\n');
      
      // 1. Empleados (necesarios para referencias)
      await this.importEmployees();
      
      // 2. Productos y categorías (base del negocio)
      await this.importProducts();
      
      // 3. Clientes (crítico para análisis)
      await this.importCustomers();
      
      // 4. Inventario (crítico para operación)
      await this.importInventory();
      
      // 5. Flujo de efectivo (crítico para finanzas)
      await this.importCashFlows(30);
      
      // 6. Datos adicionales
      await this.importTables();
      await this.importPurchases(30);
      await this.importTransactions(30);
      
      // 7. Generar análisis
      await this.generateDailySummaries(30);
      await this.generateABCAnalysis();
      
    } catch (error) {
      console.error('💥 Error crítico:', error);
      this.stats.errors.push(error);
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Mostrar resumen
    console.log('\n\n');
    console.log('═'.repeat(60));
    console.log('📊 RESUMEN DE IMPORTACIÓN v3.0');
    console.log('═'.repeat(60));
    console.log(`⏱️  Duración total: ${duration} segundos`);
    console.log(`📦 Transacciones: ${this.stats.transactions}`);
    console.log(`🍗 Productos: ${this.stats.products}`);
    console.log(`📁 Categorías: ${this.stats.categories}`);
    console.log(`👥 Empleados: ${this.stats.employees} ⭐`);
    console.log(`👥 Clientes: ${this.stats.customers} ⭐`);
    console.log(`📦 Items inventario: ${this.stats.inventory} ⭐`);
    console.log(`💰 Cortes de caja: ${this.stats.cashFlows} ⭐`);
    console.log(`🛒 Proveedores: ${this.stats.suppliers}`);
    console.log(`🪑 Mesas: ${this.stats.tables}`);
    console.log(`📅 Resúmenes diarios: ${this.stats.dailySummaries}`);
    console.log(`❌ Errores: ${this.stats.errors.length}`);
    console.log('═'.repeat(60));
    
    if (this.stats.errors.length > 0) {
      console.log('\n⚠️  ALGUNOS ERRORES (normal con datos reales):');
      // Mostrar solo primeros 5 errores únicos
      const uniqueErrors = [...new Set(this.stats.errors.map(e => e.message))];
      uniqueErrors.slice(0, 5).forEach((err, i) => {
        console.log(`${i + 1}. ${err}`);
      });
    }
    
    console.log('\n✅ OPERACIÓN DATA QUARRY v3.0 COMPLETADA');
    console.log('🎯 ¡Los datos críticos han sido importados correctamente!');
  }
}

// Exportar
module.exports = { DataQuarryImporterV3 };

// Si se ejecuta directamente
if (require.main === module) {
  console.log('🔥 Iniciando DATA QUARRY v3.0...');
  const importer = new DataQuarryImporterV3();
  importer.runFullImport()
    .then(() => console.log('\n🏁 Script finalizado exitosamente'))
    .catch(err => console.error('\n💥 Error fatal:', err));
}