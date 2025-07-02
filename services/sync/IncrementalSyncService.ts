// services/sync/IncrementalSyncService.ts
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Configuración
const POSTER_API_BASE = 'https://joinposter.com/api';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Stats {
  transactions: number;
  transactionProducts: number;
  cashShifts: number;
  newClients: number;
  duration: number;
  errors: string[];
}

interface RestaurantConfig {
  accessToken: string;
  lastSync: string | null;
}

interface SyncResult {
  success: boolean;
  stats: Stats;
  fromDate?: string;
  toDate?: string;
  error?: string;
}

export class IncrementalSyncService {
  private restaurantId: string;
  private accessToken: string = '';
  private stats: Stats;

  constructor(restaurantId: string) {
    this.restaurantId = restaurantId;
    this.stats = {
      transactions: 0,
      transactionProducts: 0,
      cashShifts: 0,
      newClients: 0,
      duration: 0,
      errors: []
    };
  }

  // Obtener configuración del restaurante
  async getRestaurantConfig(): Promise<RestaurantConfig> {
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .select('poster_access_token, last_sync')
      .eq('id', this.restaurantId)
      .single();

    if (error || !restaurant) {
      throw new Error('Restaurant not found or no Poster config');
    }

    return {
      accessToken: restaurant.poster_access_token,
      lastSync: restaurant.last_sync
    };
  }

  // Calcular desde cuándo sincronizar
  getFromDate(lastSync: string | null): Date {
    if (!lastSync) {
      // Primera vez: últimos 7 días
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    }

    // Sync incremental: desde última vez
    const lastSyncDate = new Date(lastSync);
    
    // Agregar 1 minuto de buffer para evitar duplicados
    lastSyncDate.setMinutes(lastSyncDate.getMinutes() + 1);
    
    return lastSyncDate;
  }

  // Sincronización rápida (solo lo nuevo)
  async syncIncremental(): Promise<SyncResult> {
    const startTime = Date.now();
    
    try {
      console.log(`🔄 Starting incremental sync for restaurant ${this.restaurantId}`);
      
      // 1. Obtener configuración
      const config = await this.getRestaurantConfig();
      this.accessToken = config.accessToken;
      
      // 2. Calcular rango de fechas
      const fromDate = this.getFromDate(config.lastSync);
      const toDate = new Date();
      
      const dateFromStr = fromDate.toISOString().split('T')[0];
      const dateToStr = toDate.toISOString().split('T')[0];
      
      console.log(`📅 Syncing from ${dateFromStr} to ${dateToStr}`);
      
      // 3. Sincronizar solo datos críticos que cambian frecuentemente
      
      // TRANSACCIONES (lo más importante)
      await this.syncTransactions(dateFromStr, dateToStr);
      
      // CORTES DE CAJA
      await this.syncCashShifts(dateFromStr, dateToStr);
      
      // CLIENTES NUEVOS
      await this.syncNewClients(fromDate);
      
      // 4. Actualizar last_sync
      await this.updateLastSync();
      
      this.stats.duration = Date.now() - startTime;
      
      console.log(`✅ Incremental sync completed in ${this.stats.duration}ms`);
      console.log(`📊 Stats:`, this.stats);
      
      return {
        success: true,
        stats: this.stats,
        fromDate: dateFromStr,
        toDate: dateToStr
      };
      
    } catch (error) {
      console.error('❌ Incremental sync failed:', error);
      this.stats.errors.push((error as Error).message);
      
      return {
        success: false,
        error: (error as Error).message,
        stats: this.stats
      };
    }
  }

  // Sincronizar solo transacciones nuevas
  async syncTransactions(dateFrom: string, dateTo: string): Promise<void> {
    try {
      const response = await axios.get(`${POSTER_API_BASE}/transactions.getTransactions`, {
        params: {
          token: this.accessToken,
          date_from: dateFrom,
          date_to: dateTo,
          per_page: 1000
        }
      });
      
      const data = response.data.response;
      if (!data || !data.data || data.data.length === 0) {
        console.log('   No new transactions');
        return;
      }
      
      const transactions = data.data;
      console.log(`   Found ${transactions.length} new transactions`);
      
      // Procesar transacciones
      for (const transaction of transactions) {
        // Insertar transacción
        const { error: txError } = await supabase
          .from('poster_transactions')
          .upsert({
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
            restaurant_id: this.restaurantId
          }, { onConflict: 'transaction_id' });
          
        if (!txError) {
          this.stats.transactions++;
          
          // Insertar productos
          if (transaction.products && transaction.products.length > 0) {
            const products = transaction.products.map((p: any) => ({
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
              restaurant_id: this.restaurantId
            }));
            
            const { error: prodError } = await supabase
              .from('poster_transaction_products')
              .insert(products);
              
            if (!prodError) {
              this.stats.transactionProducts += products.length;
            }
          }
        }
      }
      
    } catch (error) {
      console.error('Error syncing transactions:', (error as Error).message);
      this.stats.errors.push(`Transactions: ${(error as Error).message}`);
    }
  }

  // Sincronizar cortes de caja nuevos
  async syncCashShifts(dateFrom: string, dateTo: string): Promise<void> {
    try {
      const response = await axios.get(`${POSTER_API_BASE}/finance.getCashShifts`, {
        params: {
          token: this.accessToken,
          date_from: dateFrom,
          date_to: dateTo
        }
      });
      
      const shifts = response.data.response || [];
      if (shifts.length === 0) {
        console.log('   No new cash shifts');
        return;
      }
      
      console.log(`   Found ${shifts.length} new cash shifts`);
      
      const mappedShifts = shifts.map((s: any) => ({
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
        restaurant_id: this.restaurantId
      }));
      
      const { error } = await supabase
        .from('poster_cash_shifts')
        .upsert(mappedShifts, { onConflict: 'cash_shift_id' });
        
      if (!error) {
        this.stats.cashShifts = mappedShifts.length;
      }
      
    } catch (error) {
      console.error('Error syncing cash shifts:', (error as Error).message);
      this.stats.errors.push(`Cash shifts: ${(error as Error).message}`);
    }
  }

  // Sincronizar clientes nuevos
  async syncNewClients(fromDate: Date): Promise<void> {
    try {
      // Poster no tiene filtro por fecha en clientes, 
      // así que obtenemos todos y filtramos localmente
      const response = await axios.get(`${POSTER_API_BASE}/clients.getClients`, {
        params: {
          token: this.accessToken,
          per_page: 1000
        }
      });
      
      const allClients = response.data.response || [];
      
      // Filtrar clientes nuevos
      const newClients = allClients.filter((client: any) => {
        if (!client.date_activale) return false;
        const clientDate = new Date(client.date_activale);
        return clientDate >= fromDate;
      });
      
      if (newClients.length === 0) {
        console.log('   No new clients');
        return;
      }
      
      console.log(`   Found ${newClients.length} new clients`);
      
      // Insertar clientes nuevos
      for (const client of newClients) {
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
          restaurant_id: this.restaurantId
        };
        
        const { error } = await supabase
          .from('poster_clients')
          .upsert(mappedClient, { onConflict: 'client_id' });
          
        if (!error) {
          this.stats.newClients++;
        }
      }
      
    } catch (error) {
      console.error('Error syncing clients:', (error as Error).message);
      this.stats.errors.push(`Clients: ${(error as Error).message}`);
    }
  }

  // Actualizar última sincronización
  async updateLastSync(): Promise<void> {
    const { error } = await supabase
      .from('restaurants')
      .update({ 
        last_sync: new Date().toISOString(),
        sync_status: 'completed'
      })
      .eq('id', this.restaurantId);
      
    if (error) {
      console.error('Error updating last_sync:', error);
    }
  }
}