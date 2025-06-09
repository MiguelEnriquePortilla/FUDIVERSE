// services/dataQuarry/PosterMirrorImporter.js
// IMPORTADOR LIMPIO 1:1 - Sin transformaciones, datos exactos de Poster
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Configuración
const POSTER_API_BASE = 'https://joinposter.com/api';
const ACCESS_TOKEN = '201539:49078536a75d8aeaa6d38dee8aff5e96';
const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vdcqwjodfuwrthcuvzfr.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3F3am9kZnV3cnRoY3V2emZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODEwMjkzNywiZXhwIjoyMDYzNjc4OTM3fQ.Dp4LTTUl9BXQGK1etr8FhtEOeHGTvb5YVseeAlJimb4'
);

class PosterMirrorImporter {
  constructor() {
    this.stats = {
      products: 0,
      categories: 0,
      transactions: 0,
      transactionProducts: 0,
      clients: 0,
      clientAddresses: 0,
      employees: 0,
      ingredients: 0,
      suppliers: 0,
      cashShifts: 0,
      supplies: 0,
      supplyIngredients: 0,
      errors: []
    };
  }

  // 🛠️ UTILIDAD: Hacer peticiones a Poster
  async fetchFromPoster(endpoint, params = {}) {
    try {
      const response = await axios.get(`${POSTER_API_BASE}/${endpoint}`, {
        params: { token: ACCESS_TOKEN, ...params }
      });
      return response.data.response || response.data;
    } catch (error) {
      console.error(`❌ Error fetching ${endpoint}:`, error.message);
      throw error;
    }
  }

  // 1️⃣ IMPORTAR PRODUCTOS
  async importProducts() {
    console.log('\n📦 Importando productos...');
    
    try {
      const products = await this.fetchFromPoster('menu.getProducts');
      console.log(`   ✅ Encontrados ${products.length} productos`);
      
      // Mapear 1:1 sin transformaciones
      const mappedProducts = products.map(p => ({
        product_id: p.product_id,
        product_name: p.product_name,
        product_code: p.product_code,
        barcode: p.barcode,
        menu_category_id: p.menu_category_id,
        category_name: p.category_name,
        sort_order: p.sort_order,
        price: p.price,  // JSONB - se guarda tal cual {"1": "9500"}
        profit: p.profit, // JSONB - se guarda tal cual
        cost: p.cost,
        cost_netto: p.cost_netto,
        unit: p.unit,
        type: p.type,
        workshop: p.workshop,
        weight_flag: p.weight_flag,
        hidden: p.hidden,
        fiscal: p.fiscal,
        nodiscount: p.nodiscount,
        out: p.out,
        photo: p.photo,
        photo_origin: p.photo_origin,
        color: p.color,
        spots: p.spots, // JSONB array
        different_spots_prices: p.different_spots_prices,
        ingredient_id: p.ingredient_id,
        master_id: p.master_id,
        tax_id: p.tax_id,
        product_tax_id: p.product_tax_id,
        restaurant_id: RESTAURANT_ID
      }));
      
      // Insertar en lotes
      const batchSize = 100;
      for (let i = 0; i < mappedProducts.length; i += batchSize) {
        const batch = mappedProducts.slice(i, i + batchSize);
        
        const { error } = await supabase
          .from('poster_products')
          .upsert(batch, { onConflict: 'product_id' });
          
        if (error) {
          console.error('   ❌ Error en batch:', error.message);
          this.stats.errors.push(error);
        } else {
          this.stats.products += batch.length;
          console.log(`   📦 Procesados ${i + batch.length} de ${mappedProducts.length}`);
        }
      }
      
    } catch (error) {
      console.error('❌ Error importando productos:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 2️⃣ IMPORTAR CATEGORÍAS
  async importCategories() {
    console.log('\n📁 Importando categorías...');
    
    try {
      const categories = await this.fetchFromPoster('menu.getCategories');
      console.log(`   ✅ Encontradas ${categories.length} categorías`);
      
      const mappedCategories = categories.map(c => ({
        category_id: String(c.category_id),
        category_name: c.category_name,
        category_photo: c.category_photo || null,
        category_photo_origin: c.category_photo_origin || null,
        parent_category: c.parent_category || null,
        category_color: c.category_color || null,
        category_hidden: c.category_hidden || '0',
        sort_order: c.sort_order || null,
        fiscal: c.fiscal || '0',
        nodiscount: c.nodiscount || '0',
        tax_id: c.tax_id || '0',
        left_index: c.left || null,
        right_index: c.right || null,
        level: c.level || null,
        category_tag: c.category_tag || null,
        visible: c.visible || null, // JSONB
        restaurant_id: RESTAURANT_ID
      }));
      
      const { error } = await supabase
        .from('poster_categories')
        .upsert(mappedCategories, { onConflict: 'category_id' });
        
      if (!error) {
        this.stats.categories = mappedCategories.length;
      } else {
        console.error('   ❌ Error:', error.message);
        this.stats.errors.push(error);
      }
      
    } catch (error) {
      console.error('❌ Error importando categorías:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 3️⃣ IMPORTAR TRANSACCIONES
  async importTransactions(days = 30) {
    console.log(`\n💰 Importando transacciones de ${days} días...`);
    
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);
    const dateFromStr = dateFrom.toISOString().split('T')[0];
    const dateToStr = new Date().toISOString().split('T')[0];
    
    try {
      let allTransactions = [];
      let page = 1;
      let hasMore = true;
      
      // Paginar para obtener todas las transacciones
      while (hasMore && page <= 20) {
        console.log(`   📄 Obteniendo página ${page}...`);
        
        const response = await this.fetchFromPoster('transactions.getTransactions', {
          date_from: dateFromStr,
          date_to: dateToStr,
          per_page: 1000,
          page: page
        });
        
        if (response.data && response.data.length > 0) {
          allTransactions = [...allTransactions, ...response.data];
          hasMore = response.data.length === 1000;
          page++;
        } else {
          hasMore = false;
        }
      }
      
      console.log(`   ✅ Total de transacciones encontradas: ${allTransactions.length}`);
      
      // Procesar cada transacción
      for (const transaction of allTransactions) {
        try {
          // Insertar transacción principal
          const mappedTransaction = {
            transaction_id: transaction.transaction_id,
            table_id: transaction.table_id,
            spot_id: transaction.spot_id,
            client_id: transaction.client_id,
            sum: transaction.sum,
            payed_sum: transaction.payed_sum,
            payed_cash: transaction.payed_cash,
            payed_card: transaction.payed_card,
            payed_cert: transaction.payed_cert,
            payed_bonus: transaction.payed_bonus,
            payed_third_party: transaction.payed_third_party,
            payed_card_type: transaction.payed_card_type,
            pay_type: transaction.pay_type,
            round_sum: transaction.round_sum,
            tips_cash: transaction.tips_cash,
            tips_card: transaction.tips_card,
            tip_sum: transaction.tip_sum,
            bonus: transaction.bonus,
            discount: transaction.discount,
            total_profit: transaction.total_profit,
            total_profit_netto: transaction.total_profit_netto,
            print_fiscal: transaction.print_fiscal,
            reason: transaction.reason,
            date_close: transaction.date_close,
            auto_accept: transaction.auto_accept,
            application_id: transaction.application_id,
            restaurant_id: RESTAURANT_ID
          };
          
          const { error: transError } = await supabase
            .from('poster_transactions')
            .upsert(mappedTransaction, { onConflict: 'transaction_id' });
            
          if (!transError) {
            this.stats.transactions++;
            
            // Insertar productos de la transacción
            if (transaction.products && transaction.products.length > 0) {
              const mappedProducts = transaction.products.map(p => ({
                transaction_id: transaction.transaction_id,
                product_id: p.product_id,
                modification_id: p.modification_id,
                type: p.type,
                workshop_id: p.workshop_id,
                num: p.num,
                product_sum: p.product_sum,
                payed_sum: p.payed_sum,
                cert_sum: p.cert_sum,
                bonus_sum: p.bonus_sum,
                bonus_accrual: p.bonus_accrual,
                round_sum: p.round_sum,
                discount: p.discount,
                fiscal_company_id: p.fiscal_company_id,
                print_fiscal: p.print_fiscal,
                tax_id: p.tax_id,
                tax_value: p.tax_value,
                tax_type: p.tax_type,
                tax_fiscal: p.tax_fiscal,
                tax_sum: p.tax_sum,
                product_cost: p.product_cost,
                product_profit: p.product_profit,
                product_cost_netto: p.product_cost_netto,
                product_profit_netto: p.product_profit_netto,
                printed_num: p.printed_num,
                restaurant_id: RESTAURANT_ID
              }));
              
              const { error: prodError } = await supabase
                .from('poster_transaction_products')
                .insert(mappedProducts);
                
              if (!prodError) {
                this.stats.transactionProducts += mappedProducts.length;
              }
            }
          }
          
        } catch (err) {
          console.log(`   ⚠️ Error con transacción ${transaction.transaction_id}:`, err.message);
        }
      }
      
      console.log(`   ✅ ${this.stats.transactions} transacciones importadas`);
      console.log(`   ✅ ${this.stats.transactionProducts} productos de transacciones importados`);
      
    } catch (error) {
      console.error('❌ Error importando transacciones:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 4️⃣ IMPORTAR CLIENTES
  async importClients() {
    console.log('\n👥 Importando clientes...');
    
    try {
      const clients = await this.fetchFromPoster('clients.getClients', { per_page: 1000 });
      console.log(`   ✅ Encontrados ${clients.length} clientes`);
      
      for (const client of clients) {
        try {
          // Insertar cliente principal
          const mappedClient = {
            client_id: client.client_id,
            firstname: client.firstname,
            lastname: client.lastname,
            patronymic: client.patronymic,
            phone: client.phone,
            phone_number: client.phone_number,
            email: client.email,
            birthday: client.birthday,
            client_sex: client.client_sex,
            country: client.country,
            city: client.city,
            address: client.address,
            card_number: client.card_number,
            discount_per: client.discount_per,
            bonus: client.bonus,
            birthday_bonus: client.birthday_bonus,
            loyalty_type: client.loyalty_type,
            ewallet: client.ewallet,
            client_groups_id: client.client_groups_id,
            client_groups_name: client.client_groups_name,
            client_groups_discount: client.client_groups_discount,
            total_payed_sum: client.total_payed_sum,
            date_activale: client.date_activale,
            comment: client.comment,
            government_id: client.government_id,
            delete: client.delete,
            restaurant_id: RESTAURANT_ID
          };
          
          const { error: clientError } = await supabase
            .from('poster_clients')
            .upsert(mappedClient, { onConflict: 'client_id' });
            
          if (!clientError) {
            this.stats.clients++;
            
            // Insertar direcciones del cliente
            if (client.addresses && client.addresses.length > 0) {
              const mappedAddresses = client.addresses.map(addr => ({
                id: addr.id,
                client_id: client.client_id,
                delivery_zone_id: addr.delivery_zone_id,
                country: addr.country,
                city: addr.city,
                address1: addr.address1,
                address2: addr.address2,
                comment: addr.comment,
                lat: addr.lat,
                lng: addr.lng,
                zip_code: addr.zip_code,
                sort_order: addr.sort_order,
                restaurant_id: RESTAURANT_ID
              }));
              
              const { error: addrError } = await supabase
                .from('poster_client_addresses')
                .upsert(mappedAddresses, { onConflict: 'id' });
                
              if (!addrError) {
                this.stats.clientAddresses += mappedAddresses.length;
              }
            }
          }
          
        } catch (err) {
          console.log(`   ⚠️ Error con cliente ${client.client_id}:`, err.message);
        }
      }
      
      console.log(`   ✅ ${this.stats.clients} clientes importados`);
      console.log(`   ✅ ${this.stats.clientAddresses} direcciones importadas`);
      
    } catch (error) {
      console.error('❌ Error importando clientes:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 5️⃣ IMPORTAR EMPLEADOS
  async importEmployees() {
    console.log('\n👤 Importando empleados...');
    
    try {
      const employees = await this.fetchFromPoster('access.getEmployees');
      console.log(`   ✅ Encontrados ${employees.length} empleados`);
      
      const mappedEmployees = employees.map(e => ({
        user_id: e.user_id,
        name: e.name,
        login: e.login,
        role_name: e.role_name,
        role_id: e.role_id,
        user_type: e.user_type,
        access_mask: e.access_mask,
        last_in: e.last_in,
        phone: e.phone,
        restaurant_id: RESTAURANT_ID
      }));
      
      const { error } = await supabase
        .from('poster_employees')
        .upsert(mappedEmployees, { onConflict: 'user_id' });
        
      if (!error) {
        this.stats.employees = mappedEmployees.length;
      } else {
        console.error('   ❌ Error:', error.message);
        this.stats.errors.push(error);
      }
      
    } catch (error) {
      console.error('❌ Error importando empleados:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 6️⃣ IMPORTAR INGREDIENTES
  async importIngredients() {
    console.log('\n🥗 Importando ingredientes...');
    
    try {
      const ingredients = await this.fetchFromPoster('menu.getIngredients');
      console.log(`   ✅ Encontrados ${ingredients.length} ingredientes`);
      
      const mappedIngredients = ingredients.map(i => ({
        ingredient_id: i.ingredient_id,
        ingredient_name: i.ingredient_name,
        ingredient_barcode: i.ingredient_barcode,
        category_id: i.category_id,
        ingredient_left: i.ingredient_left,
        limit_value: i.limit_value,
        time_notif: i.time_notif,
        ingredient_unit: i.ingredient_unit,
        ingredient_weight: i.ingredient_weight,
        ingredients_losses_clear: i.ingredients_losses_clear,
        ingredients_losses_cook: i.ingredients_losses_cook,
        ingredients_losses_fry: i.ingredients_losses_fry,
        ingredients_losses_stew: i.ingredients_losses_stew,
        ingredients_losses_bake: i.ingredients_losses_bake,
        ingredients_type: i.ingredients_type,
        partial_write_off: i.partial_write_off,
        restaurant_id: RESTAURANT_ID
      }));
      
      const { error } = await supabase
        .from('poster_ingredients')
        .upsert(mappedIngredients, { onConflict: 'ingredient_id' });
        
      if (!error) {
        this.stats.ingredients = mappedIngredients.length;
      } else {
        console.error('   ❌ Error:', error.message);
        this.stats.errors.push(error);
      }
      
    } catch (error) {
      console.error('❌ Error importando ingredientes:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 7️⃣ IMPORTAR PROVEEDORES
  async importSuppliers() {
    console.log('\n🚚 Importando proveedores...');
    
    try {
      const suppliers = await this.fetchFromPoster('storage.getSuppliers');
      console.log(`   ✅ Encontrados ${suppliers.length} proveedores`);
      
      const mappedSuppliers = suppliers.map(s => ({
        supplier_id: s.supplier_id,
        supplier_name: s.supplier_name,
        supplier_phone: s.supplier_phone,
        supplier_adress: s.supplier_adress, // Sí, Poster lo escribe mal
        supplier_comment: s.supplier_comment,
        supplier_code: s.supplier_code,
        supplier_tin: s.supplier_tin,
        delete: s.delete,
        restaurant_id: RESTAURANT_ID
      }));
      
      const { error } = await supabase
        .from('poster_suppliers')
        .upsert(mappedSuppliers, { onConflict: 'supplier_id' });
        
      if (!error) {
        this.stats.suppliers = mappedSuppliers.length;
      } else {
        console.error('   ❌ Error:', error.message);
        this.stats.errors.push(error);
      }
      
    } catch (error) {
      console.error('❌ Error importando proveedores:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 8️⃣ IMPORTAR CORTES DE CAJA
  async importCashShifts(days = 30) {
    console.log(`\n💵 Importando cortes de caja de ${days} días...`);
    
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);
    const dateFromStr = dateFrom.toISOString().split('T')[0];
    const dateToStr = new Date().toISOString().split('T')[0];
    
    try {
      const shifts = await this.fetchFromPoster('finance.getCashShifts', {
        date_from: dateFromStr,
        date_to: dateToStr
      });
      
      console.log(`   ✅ Encontrados ${shifts.length} cortes de caja`);
      
      const mappedShifts = shifts.map(s => ({
        cash_shift_id: s.cash_shift_id,
        spot_id: s.spot_id,
        timestart: s.timestart,
        timeend: s.timeend,
        date_start: s.date_start,
        date_end: s.date_end,
        amount_start: s.amount_start,
        amount_end: s.amount_end,
        amount_debit: s.amount_debit,
        amount_sell_cash: s.amount_sell_cash,
        amount_sell_card: s.amount_sell_card,
        amount_credit: s.amount_credit,
        amount_collection: s.amount_collection,
        user_id_start: s.user_id_start,
        user_id_end: s.user_id_end,
        comment: s.comment,
        spot_name: s.spot_name,
        spot_adress: s.spot_adress,
        table_num: s.table_num,
        restaurant_id: RESTAURANT_ID
      }));
      
      const { error } = await supabase
        .from('poster_cash_shifts')
        .upsert(mappedShifts, { onConflict: 'cash_shift_id' });
        
      if (!error) {
        this.stats.cashShifts = mappedShifts.length;
      } else {
        console.error('   ❌ Error:', error.message);
        this.stats.errors.push(error);
      }
      
    } catch (error) {
      console.error('❌ Error importando cortes de caja:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 9️⃣ IMPORTAR SUPPLIES (ÓRDENES DE COMPRA)
  async importSupplies(days = 365) {
    console.log(`\n📦 Importando órdenes de compra de ${days} días...`);
    
    try {
      // Primero obtener todos los supplies
      const supplies = await this.fetchFromPoster('storage.getSupplies', { per_page: 1000 });
      console.log(`   ✅ Encontrados ${supplies.length} supplies`);
      
      // Filtrar por fecha si es necesario
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const filteredSupplies = supplies.filter(s => {
        const supplyDate = new Date(s.date);
        return supplyDate >= cutoffDate;
      });
      
      console.log(`   📅 ${filteredSupplies.length} supplies en los últimos ${days} días`);
      
      // Procesar cada supply
      for (const supply of filteredSupplies) {
        try {
          // Insertar supply principal
          const mappedSupply = {
            supply_id: supply.supply_id,
            storage_id: supply.storage_id,
            supplier_id: supply.supplier_id,
            date: supply.date,
            supply_sum: supply.supply_sum,
            supply_sum_netto: supply.supply_sum_netto,
            supply_comment: supply.supply_comment,
            storage_name: supply.storage_name,
            supplier_name: supply.supplier_name,
            delete: supply.delete,
            account_id: supply.account_id,
            restaurant_id: RESTAURANT_ID
          };
          
          const { error: supplyError } = await supabase
            .from('poster_supplies')
            .upsert(mappedSupply, { onConflict: 'supply_id' });
            
          if (!supplyError) {
            this.stats.supplies++;
            
            // Obtener ingredientes del supply
            try {
              const ingredients = await this.fetchFromPoster('storage.getSupplyIngredients', {
                supply_id: supply.supply_id
              });
              
              if (ingredients && ingredients.length > 0) {
                const mappedIngredients = ingredients.map(i => ({
                  supply_id: supply.supply_id,
                  ingredient_id: i.ingredient_id,
                  ingredient_name: i.ingredient_name,
                  ingredient_unit: i.ingredient_unit,
                  supply_ingredient_num: i.supply_ingredient_num,
                  supply_ingredient_sum: i.supply_ingredient_sum,
                  supply_ingredient_sum_netto: i.supply_ingredient_sum_netto,
                  tax_id: i.tax_id,
                  restaurant_id: RESTAURANT_ID
                }));
                
                const { error: ingError } = await supabase
                  .from('poster_supply_ingredients')
                  .insert(mappedIngredients);
                  
                if (!ingError) {
                  this.stats.supplyIngredients += mappedIngredients.length;
                }
              }
            } catch (ingErr) {
              console.log(`   ⚠️ Error obteniendo ingredientes del supply ${supply.supply_id}`);
            }
          }
          
        } catch (err) {
          console.log(`   ⚠️ Error con supply ${supply.supply_id}:`, err.message);
        }
      }
      
      console.log(`   ✅ ${this.stats.supplies} supplies importados`);
      console.log(`   ✅ ${this.stats.supplyIngredients} ingredientes de supplies importados`);
      
    } catch (error) {
      console.error('❌ Error importando supplies:', error.message);
      this.stats.errors.push(error);
    }
  }

  // 🚀 EJECUTAR IMPORTACIÓN COMPLETA
  async runFullImport() {
    console.log('🚀 INICIANDO POSTER MIRROR IMPORTER');
    console.log('═'.repeat(60));
    console.log(`🏪 Restaurant: ${RESTAURANT_ID}`);
    console.log(`🔑 Access Token: ${ACCESS_TOKEN.substring(0, 10)}...`);
    console.log(`📅 Fecha: ${new Date().toISOString()}`);
    console.log('═'.repeat(60));
    
    const startTime = Date.now();
    
    try {
      // IMPORTAR EN ORDEN DE DEPENDENCIAS
      console.log('\n🎯 IMPORTANDO DATOS EN ORDEN CORRECTO...\n');
      
      // 1. Datos maestros (sin dependencias)
      await this.importCategories();
      await this.importEmployees();
      await this.importSuppliers();
      await this.importIngredients();
      
      // 2. Productos (depende de categorías)
      await this.importProducts();
      
      // 3. Clientes y sus direcciones
      await this.importClients();
      
      // 4. Transacciones (depende de productos y clientes)
      await this.importTransactions(30);
      
      // 5. Finanzas
      await this.importCashShifts(30);
      
      // 6. Inventario (depende de ingredientes y proveedores)
      await this.importSupplies(365);
      
      // Actualizar last_sync
      await supabase
        .from('restaurants')
        .update({ 
          last_sync: new Date().toISOString(),
          sync_status: 'completed'
        })
        .eq('id', RESTAURANT_ID);
      
    } catch (error) {
      console.error('💥 Error crítico:', error);
      this.stats.errors.push(error);
      
      // Marcar sync como fallido
      await supabase
        .from('restaurants')
        .update({ 
          sync_status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', RESTAURANT_ID);
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Mostrar resumen
    console.log('\n\n');
    console.log('═'.repeat(60));
    console.log('📊 RESUMEN DE IMPORTACIÓN ESPEJO');
    console.log('═'.repeat(60));
    console.log(`⏱️  Duración total: ${duration} segundos`);
    console.log(`📦 Productos: ${this.stats.products}`);
    console.log(`📁 Categorías: ${this.stats.categories}`);
    console.log(`💰 Transacciones: ${this.stats.transactions}`);
    console.log(`🛒 Items vendidos: ${this.stats.transactionProducts}`);
    console.log(`👥 Clientes: ${this.stats.clients}`);
    console.log(`📍 Direcciones: ${this.stats.clientAddresses}`);
    console.log(`👤 Empleados: ${this.stats.employees}`);
    console.log(`🥗 Ingredientes: ${this.stats.ingredients}`);
    console.log(`🚚 Proveedores: ${this.stats.suppliers}`);
    console.log(`💵 Cortes de caja: ${this.stats.cashShifts}`);
    console.log(`📦 Órdenes de compra: ${this.stats.supplies}`);
    console.log(`📦 Ingredientes comprados: ${this.stats.supplyIngredients}`);
    console.log(`❌ Errores: ${this.stats.errors.length}`);
    console.log('═'.repeat(60));
    
    if (this.stats.errors.length > 0) {
      console.log('\n⚠️  ERRORES ENCONTRADOS:');
      const uniqueErrors = [...new Set(this.stats.errors.map(e => e.message))];
      uniqueErrors.slice(0, 5).forEach((err, i) => {
        console.log(`${i + 1}. ${err}`);
      });
    }
    
    console.log('\n✅ IMPORTACIÓN ESPEJO COMPLETADA');
    console.log('🎯 Los datos están listos en las tablas poster_*');
    
    return {
      success: this.stats.errors.length === 0,
      stats: this.stats,
      duration: duration
    };
  }

  // 🔄 MÉTODO PARA SINCRONIZACIÓN INCREMENTAL (Futuro)
  async syncIncremental(hours = 24) {
    console.log(`🔄 Sincronización incremental de las últimas ${hours} horas`);
    
    // Por ahora solo sincronizar transacciones y cortes de caja
    const days = Math.ceil(hours / 24);
    
    await this.importTransactions(days);
    await this.importCashShifts(days);
    
    console.log('✅ Sincronización incremental completada');
  }
}

// Exportar
module.exports = { PosterMirrorImporter };

// Si se ejecuta directamente
if (require.main === module) {
  console.log('🔥 Iniciando POSTER MIRROR IMPORTER...');
  const importer = new PosterMirrorImporter();
  importer.runFullImport()
    .then(result => {
      console.log('\n🏁 Script finalizado');
      process.exit(result.success ? 0 : 1);
    })
    .catch(err => {
      console.error('\n💥 Error fatal:', err);
      process.exit(1);
    });
}