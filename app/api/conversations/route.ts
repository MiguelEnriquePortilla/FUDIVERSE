// app/api/conversations/route.ts
// 🆕 CREATE NEW CONVERSATIONS

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🆕 POST - Create new conversation
export async function POST(request: NextRequest) {
  try {
    const { restaurantId, title, firstMessage } = await request.json();

    if (!restaurantId || !title) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'restaurantId y title son requeridos' 
        },
        { status: 400 }
      );
    }

    console.log(`🆕 Creating new conversation for restaurant: ${restaurantId}`);
    console.log(`📝 Title: "${title}"`);

    // Generate conversation ID
   const conversationId = crypto.randomUUID();

    // Prepare initial messages array
    let initialMessages: string | any[] = [];
    if (firstMessage) {
      initialMessages = [{
        role: 'user',
        content: firstMessage,
        timestamp: new Date().toISOString()
      }];
    }

    // Create conversation in Supabase
    const { data: newConversation, error: createError } = await supabase
      .from('conversations')
      .insert({
        id: conversationId,
        restaurant_id: restaurantId,
        title: title,
        messages: JSON.stringify(initialMessages),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_activity: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Error creating conversation:', createError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error creando la conversación',
          details: process.env.NODE_ENV === 'development' ? createError.message : undefined
        },
        { status: 500 }
      );
    }

    console.log(`✅ Conversation created successfully: ${conversationId}`);

    return NextResponse.json({
      success: true,
      conversation: {
        id: newConversation.id,
        title: newConversation.title,
        created_at: newConversation.created_at,
        last_activity: newConversation.last_activity
      },
      metadata: {
        hasFirstMessage: !!firstMessage,
        messageCount: initialMessages.length
      }
    });

  } catch (error) {
    console.error('❌ Create conversation error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}

// 📥 GET - Get all conversations for a restaurant
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'restaurantId es requerido' 
        },
        { status: 400 }
      );
    }

    console.log(`📥 Getting conversations for restaurant: ${restaurantId}`);

    // Get conversations from Supabase
    const { data: conversations, error: fetchError } = await supabase
      .from('conversations')
      .select('id, title, created_at, updated_at, last_activity, messages')
      .eq('restaurant_id', restaurantId)
      .order('last_activity', { ascending: false })
      .limit(50); // Limit to last 50 conversations

    if (fetchError) {
      console.error('❌ Error fetching conversations:', fetchError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error obteniendo conversaciones',
          details: process.env.NODE_ENV === 'development' ? fetchError.message : undefined
        },
        { status: 500 }
      );
    }

    // Format conversations for frontend
    const formattedConversations = conversations?.map(conv => {
      let messageCount = 0;
      let lastMessage = 'Sin mensajes';
      
      try {
        if (conv.messages) {
          const messages = JSON.parse(conv.messages);
          messageCount = messages.length;
          
          if (messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            lastMessage = lastMsg.role === 'user' 
              ? `Tú: ${lastMsg.content.substring(0, 50)}...`
              : `FUDI: ${lastMsg.content.substring(0, 50)}...`;
          }
        }
      } catch (parseError) {
        console.warn('Warning: Could not parse messages for conversation:', conv.id);
      }

      return {
        id: conv.id,
        title: conv.title,
        lastMessage: lastMessage,
        timestamp: conv.last_activity || conv.updated_at,
        messageCount: messageCount,
        last_activity: conv.last_activity
      };
    }) || [];

    console.log(`✅ Found ${formattedConversations.length} conversations`);

    return NextResponse.json({
      success: true,
      conversations: formattedConversations,
      count: formattedConversations.length
    });

  } catch (error) {
    console.error('❌ Get conversations error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      conversations: [],
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}