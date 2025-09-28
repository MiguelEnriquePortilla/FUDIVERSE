// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vdcqwjodfuwrthcuvzfr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3F3am9kZnV3cnRoY3V2emZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDI5MzcsImV4cCI6MjA2MzY3ODkzN30.NoBLGk0FqvjOf_8D4F-yJgiXoZTL1-TDY9tMdW2ZXs4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función simple para enviar demo requests
export async function submitDemoRequest(demoData: {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  country?: string;
  painPoints?: string[];
  preferredLanguage?: string;
  demoDate?: string;
  demoTime?: string;
  currentPOS?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('demo_requests')
      .insert([
        {
          restaurant_name: demoData.restaurantName,
          owner_name: demoData.ownerName,
          email: demoData.email,
          phone: demoData.phone,
          country: demoData.country,
          pain_points: demoData.painPoints,
          preferred_language: demoData.preferredLanguage || 'es',
          demo_date: demoData.demoDate,
          demo_time: demoData.demoTime,
          current_pos: demoData.currentPOS
        }
      ]);

    if (error) throw error;

    return {
      success: true,
      message: 'Demo agendado exitosamente. Te contactaremos en 24 horas.'
    };
  } catch (error: any) {
    console.error('Demo submission error:', error);
    return {
      success: false,
      error: error.message || 'Error al agendar demo'
    };
  }
}