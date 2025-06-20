import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json({ success: false, error: 'restaurantId requerido' }, { status: 400 });
    }

    // Get all conversations ordered by most recent
    const { data: conversations, error: fetchError } = await supabase
      .from('conversations')
      .select('id, last_activity')
      .eq('restaurant_id', restaurantId)
      .order('last_activity', { ascending: false });

    if (fetchError) {
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
    }

    const totalConversations = conversations?.length || 0;
    
    if (totalConversations <= 10) {
      return NextResponse.json({ 
        success: true, 
        message: `Solo hay ${totalConversations} conversaciones. No se eliminó nada.`,
        deletedCount: 0 
      });
    }

    // Keep only the 10 most recent, delete the rest
    const toDelete = conversations.slice(10);
    const idsToDelete = toDelete.map(conv => conv.id);

    const { error: deleteError } = await supabase
      .from('conversations')
      .delete()
      .in('id', idsToDelete);

    if (deleteError) {
      return NextResponse.json({ success: false, error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      deletedCount: idsToDelete.length,
      remaining: 10,
      totalBefore: totalConversations
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
  }
}