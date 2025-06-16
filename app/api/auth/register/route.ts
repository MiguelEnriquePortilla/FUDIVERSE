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
      name,
      ownerName, 
      email, 
      password, 
      posType,
      phoneNumber 
    } = await request.json();

    const SHARED_RESTAURANT_ID = "13207c90-2ea6-4aa0-bfac-349753d24ea4";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Preservar "Chicken Chicanito" - solo actualizar datos del usuario
    const { error: restaurantError } = await supabase
      .from('restaurants')
      .update({
        name: name,
        owner_name: ownerName,
        email: email.toLowerCase(),
        phone: phoneNumber,
        pos_type: posType,
        updated_at: new Date().toISOString()
      })
      .eq('id', SHARED_RESTAURANT_ID);

    if (restaurantError) {
      console.error('Restaurant error:', restaurantError);
      return NextResponse.json({ error: 'Error al crear restaurante' }, { status: 500 });
    }

    const { data: user, error: userError } = await supabase
      .from('restaurant_owners')
      .insert({
        email: email.toLowerCase(),
        name: ownerName,
        created_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (userError) {
      console.error('User error:', userError);
      return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('name, owner_name')
      .eq('id', SHARED_RESTAURANT_ID)
      .single();

    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      restaurantId: SHARED_RESTAURANT_ID,
      email: email,
      restaurantName: restaurant?.name || 'Chicken Chicanito',
      ownerName: restaurant?.owner_name || ownerName
    })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      restaurant: { id: SHARED_RESTAURANT_ID }
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}