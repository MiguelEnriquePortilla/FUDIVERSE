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

    // Token simple
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      restaurantId: SHARED_RESTAURANT_ID,
      email: user.email
    })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      restaurant: { id: SHARED_RESTAURANT_ID, name: user.name }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}