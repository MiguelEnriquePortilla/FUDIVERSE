// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 🔒 TESTING MODE: Todos usan el mismo restaurant_id
    const SHARED_RESTAURANT_ID = "13207c90-2ea6-4aa0-bfac-349753d24ea4";

    // Buscar usuario
    const { data: user, error } = await supabase
      .from('restaurant_owners')
      .select('id, email, name')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Email o contraseña incorrectos' }, { status: 401 });
    }

    // Obtener restaurant info incluyendo last_sync
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('name, owner_name, last_sync')
      .eq('id', SHARED_RESTAURANT_ID)
      .single();

    // Verificar si necesita sincronización
    const lastSync = restaurant?.last_sync ? new Date(restaurant.last_sync) : null;
    const hoursSinceSync = lastSync 
      ? (Date.now() - lastSync.getTime()) / (1000 * 60 * 60)
      : 999; // Si nunca se ha sincronizado

    // 🔄 SINCRONIZACIÓN INCREMENTAL
    try {

      console.log(`[Login] Hours since last sync: ${hoursSinceSync}`);

      // Solo sincronizar si:
      // 1. Nunca se ha sincronizado (lastSync === null)
      // 2. Han pasado más de 1 hora desde el último sync
      if (hoursSinceSync > 1) {
        console.log(`[Login] Triggering incremental sync for restaurant ${SHARED_RESTAURANT_ID}`);
        
        // Importar el servicio de sincronización
        const { IncrementalSyncService } = require('../../../../../services/sync/IncrementalSyncService.js');
        
        // Crear instancia del servicio
        const syncService = new IncrementalSyncService(SHARED_RESTAURANT_ID);
        
        // Ejecutar sincronización en background (no bloquear el login)
        syncService.syncIncremental()
          .then((result: any) => {
            console.log('[Login] Sync completed:', result);
          })
          .catch((error: any) => {
            console.error('[Login] Sync failed:', error);
            // No fallar el login si el sync falla
          });
        
        // Indicar que hay un sync en progreso
        await supabase
          .from('restaurants')
          .update({ sync_status: 'syncing' })
          .eq('id', SHARED_RESTAURANT_ID);
      } else {
        console.log(`[Login] Skip sync - synced ${hoursSinceSync.toFixed(1)} hours ago`);
      }
    } catch (syncError) {
      // No fallar el login si hay error en el sync
      console.error('[Login] Sync error (non-fatal):', syncError);
    }

    // Token completo
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      restaurantId: SHARED_RESTAURANT_ID,
      email: user.email,
      restaurantName: restaurant?.name || 'Mi Restaurante',
      ownerName: restaurant?.owner_name || user.name,
      lastSync: restaurant?.last_sync || null
    })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      restaurant: { 
        id: SHARED_RESTAURANT_ID, 
        name: restaurant?.name || 'Mi Restaurante',
        syncStatus: hoursSinceSync > 1 ? 'syncing' : 'synced',
        lastSync: restaurant?.last_sync
      }
    });

  } catch (error) {
    console.error('[Login] Error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}