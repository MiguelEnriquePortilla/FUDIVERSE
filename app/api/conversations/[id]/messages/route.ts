import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await params;

    const { data: conversation, error } = await supabase
      .from('conversations')
      .select('messages, title')
      .eq('id', conversationId)
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    let messages = [];
    if (conversation.messages) {
      try {
        messages = JSON.parse(conversation.messages);
      } catch (parseError) {
        messages = [];
      }
    }

    return NextResponse.json({
      success: true,
      messages: messages,
      title: conversation.title
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
  }
}