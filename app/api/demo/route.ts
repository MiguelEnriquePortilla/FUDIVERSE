// app/api/demo/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vdcqwjodfuwrthcuvzfr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3F3am9kZnV3cnRoY3V2emZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDI5MzcsImV4cCI6MjA2MzY3ODkzN30.NoBLGk0FqvjOf_8D4F-yJgiXoZTL1-TDY9tMdW2ZXs4'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('demo_requests')
      .insert([
        {
          restaurant_name: body.restaurantName,
          owner_name: body.ownerName,
          email: body.email,
          phone: body.phone,
          country: body.country,
          pain_points: body.painPoints,
          preferred_language: body.preferredLanguage || 'es',
          demo_date: body.demoDate,
          demo_time: body.demoTime,
          current_pos: body.currentPOS
        }
      ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Demo agendado exitosamente'
    });

  } catch (error: any) {
    console.error('Demo API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Error al agendar demo'
    }, { status: 500 });
  }
}