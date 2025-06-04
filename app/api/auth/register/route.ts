import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { 
      restaurantName, 
      ownerName, 
      email, 
      password, 
      posType,
      phoneNumber 
    } = await request.json();

    // 🔒 TESTING MODE: Todos usan el mismo restaurant_id
    const SHARED_RESTAURANT_ID = "13207c90-2ea6-4aa0-bfac-349753d24ea4";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

      // Crear/actualizar restaurante en testing mode
      const { error: restaurantError } = await supabase
        .from('restaurants')
        .upsert({
          id: SHARED_RESTAURANT_ID,
          name: restaurantName,
          owner_name: ownerName,
          email: email.toLowerCase(),
          phone: phoneNumber,
          pos_type: posType,
          updated_at: new Date().toISOString()
        });

      // Crear usuario
      const { data: user, error } = await supabase
        .from('restaurant_owners')
        .insert({
          email: email.toLowerCase(),
          name: ownerName,
          created_at: new Date().toISOString()
        })
        .select('id')
        .single();

    if (error) {
      return NextResponse.json({ error: 'Error al crear cuenta' }, { status: 500 });
    }

    // Obtener restaurant name
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('name, owner_name')
      .eq('id', SHARED_RESTAURANT_ID)
      .single();

    // Token completo
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      restaurantId: SHARED_RESTAURANT_ID,
      email: email,
      restaurantName: restaurant?.name || 'Mi Restaurante',
      ownerName: restaurant?.owner_name || ownerName || 'Usuario'
    })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      restaurant: { id: SHARED_RESTAURANT_ID }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}