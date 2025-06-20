// app/api/conversations/save-interaction/route.ts
// 🧠 REAL MEMORY SAVING - USER + FUDI RESPONSES

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { 
      restaurantId, 
      conversationId, 
      userMessage, 
      fudiResponse,
      responseTime 
    } = await request.json();

    if (!restaurantId || !conversationId || !userMessage || !fudiResponse) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Faltan parámetros requeridos' 
        },
        { status: 400 }
      );
    }

    console.log(`💾 Saving interaction for conversation: ${conversationId}`);

    // 1. GET current conversation data
    const { data: currentConversation, error: fetchError } = await supabase
      .from('conversations')
      .select('messages, title')
      .eq('id', conversationId)
      .eq('restaurant_id', restaurantId)
      .single();

    if (fetchError) {
      console.error('Error fetching conversation:', fetchError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Conversación no encontrada' 
        },
        { status: 404 }
      );
    }

    // 2. PARSE existing messages (if any)
    let existingMessages = [];
    if (currentConversation.messages) {
      try {
        existingMessages = JSON.parse(currentConversation.messages);
      } catch (parseError) {
        console.error('Error parsing existing messages:', parseError);
        existingMessages = [];
      }
    }

    // 3. CREATE new messages array with USER + ASSISTANT
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };

    const newAssistantMessage = {
      role: 'assistant', 
      content: fudiResponse,
      timestamp: new Date().toISOString(),
      responseTime: responseTime || null
    };

    // 4. ADD both messages to the conversation
    const updatedMessages = [
      ...existingMessages,
      newUserMessage,
      newAssistantMessage
    ];

    // 5. UPDATE conversation in Supabase with COMPLETE messages
    const { data: updatedConversation, error: updateError } = await supabase
      .from('conversations')
      .update({
        messages: JSON.stringify(updatedMessages),
        updated_at: new Date().toISOString(),
        last_activity: new Date().toISOString()
      })
      .eq('id', conversationId)
      .eq('restaurant_id', restaurantId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating conversation:', updateError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error guardando la conversación' 
        },
        { status: 500 }
      );
    }

    // 6. SAVE to fudi_interactions for analytics
    try {
      const { error: interactionError } = await supabase
        .from('fudi_interactions')
        .insert({
          restaurant_id: restaurantId,
          conversation_id: conversationId,
          user_message: userMessage,
          fudi_response: fudiResponse,
         response_time: responseTime,
          created_at: new Date().toISOString()
        });

      if (interactionError) {
        console.warn('Warning: Could not save to fudi_interactions:', interactionError);
        // Don't fail the main operation for this
      }
    } catch (analyticsError) {
      console.warn('Analytics save failed:', analyticsError);
      // Continue anyway
    }

    console.log(`✅ Interaction saved successfully. Total messages: ${updatedMessages.length}`);

    return NextResponse.json({
      success: true,
      conversation: updatedConversation,
      messageCount: updatedMessages.length,
      metadata: {
        userMessageSaved: true,
        fudiResponseSaved: true,
        totalMessages: updatedMessages.length,
        conversationId: conversationId
      }
    });

  } catch (error) {
    console.error('❌ Save interaction error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}