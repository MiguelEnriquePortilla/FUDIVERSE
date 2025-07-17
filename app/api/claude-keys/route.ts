import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

// =============================================
// SUPABASE CONFIGURATION
// =============================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// =============================================
// INTERFACES
// =============================================
interface ApiKeyRecord {
  id: string;
  user_id: string;
  restaurant_id: string;
  api_key: string;
  key_name: string;
  is_active: boolean;
  created_at: string;
  last_used_at?: string;
  usage_count: number;
}

interface CreateKeyRequest {
  restaurantId: string;
  keyName?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  apiKey?: string;
  configuration?: object;
  error?: string;
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Generate a secure API key with restaurant prefix
 */
function generateApiKey(restaurantId: string): string {
  const prefix = 'fudi';
  const restaurantPrefix = restaurantId.substring(0, 8);
  const randomSuffix = nanoid(32);
  const timestamp = Date.now().toString(36);
  
  return `${prefix}_${restaurantPrefix}_${timestamp}_${randomSuffix}`;
}

/**
 * Validate JWT token and extract user data
 */
function validateToken(token: string): { userId: string; restaurantId: string; ownerName: string } | null {
  try {
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace('Bearer ', '');
    
    // In production, use proper JWT validation
    // For now, decode the base64 token (as used in the app)
    const decoded = JSON.parse(atob(cleanToken));
    
    if (decoded && decoded.userId && decoded.restaurantId && decoded.ownerName) {
      return {
        userId: decoded.userId,
        restaurantId: decoded.restaurantId,
        ownerName: decoded.ownerName
      };
    }
    
    return null;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

/**
 * Generate Claude Desktop configuration
 */
function generateClaudeConfig(apiKey: string): object {
  return {
    mcpServers: {
      fudiverse: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-fetch", "https://fudiverse.com/api/mcp"],
        env: {
          API_KEY: apiKey
        }
      }
    }
  };
}

// =============================================
// POST: CREATE NEW API KEY
// =============================================
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Validate authorization
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
    const token = authHeader || request.headers.get('x-fudi-token');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token de autorización requerido',
        error: 'MISSING_TOKEN'
      }, { status: 401 });
    }

    // 2. Validate and decode token
    const userData = validateToken(token);
    if (!userData) {
      return NextResponse.json({
        success: false,
        message: 'Token inválido',
        error: 'INVALID_TOKEN'
      }, { status: 401 });
    }

    // 3. Parse request body
    const body: CreateKeyRequest = await request.json();
    const { restaurantId, keyName = 'Claude Desktop Key' } = body;

    // 4. Validate restaurant ownership
    if (restaurantId !== userData.restaurantId) {
      return NextResponse.json({
        success: false,
        message: 'No autorizado para este restaurante',
        error: 'UNAUTHORIZED_RESTAURANT'
      }, { status: 403 });
    }

    // 5. Check if user already has an active key
    const { data: existingKeys, error: checkError } = await supabase
      .from('claude_api_keys')
      .select('*')
      .eq('user_id', userData.userId)
      .eq('restaurant_id', restaurantId)
      .eq('is_active', true);

    if (checkError) {
      console.error('Database check error:', checkError);
      return NextResponse.json({
        success: false,
        message: 'Error verificando claves existentes',
        error: 'DATABASE_ERROR'
      }, { status: 500 });
    }

    // 6. Deactivate existing keys (allow only one active key per restaurant)
    if (existingKeys && existingKeys.length > 0) {
      const { error: deactivateError } = await supabase
        .from('claude_api_keys')
        .update({ is_active: false })
        .eq('user_id', userData.userId)
        .eq('restaurant_id', restaurantId);

      if (deactivateError) {
        console.error('Error deactivating existing keys:', deactivateError);
      }
    }

    // 7. Generate new API key
    const newApiKey = generateApiKey(restaurantId);

    // 8. Save to database
    const { data: createdKey, error: createError } = await supabase
      .from('claude_api_keys')
      .insert({
        id: nanoid(),
        user_id: userData.userId,
        restaurant_id: restaurantId,
        api_key: newApiKey,
        key_name: keyName,
        is_active: true,
        created_at: new Date().toISOString(),
        usage_count: 0
      })
      .select()
      .single();

    if (createError) {
      console.error('Database insert error:', createError);
      return NextResponse.json({
        success: false,
        message: 'Error creando la clave API',
        error: 'CREATE_ERROR'
      }, { status: 500 });
    }

    // 9. Generate Claude configuration
    const claudeConfig = generateClaudeConfig(newApiKey);

    // 10. Return success response
    return NextResponse.json({
      success: true,
      message: 'Clave API creada exitosamente',
      apiKey: newApiKey,
      configuration: claudeConfig
    }, { status: 201 });

  } catch (error) {
    console.error('API Key creation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

// =============================================
// GET: LIST USER'S API KEYS
// =============================================
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Validate authorization
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
    const token = authHeader || request.headers.get('x-fudi-token');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token de autorización requerido',
        error: 'MISSING_TOKEN'
      }, { status: 401 });
    }

    // 2. Validate and decode token
    const userData = validateToken(token);
    if (!userData) {
      return NextResponse.json({
        success: false,
        message: 'Token inválido',
        error: 'INVALID_TOKEN'
      }, { status: 401 });
    }

    // 3. Get URL parameters
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    if (!restaurantId) {
      return NextResponse.json({
        success: false,
        message: 'Restaurant ID requerido',
        error: 'MISSING_RESTAURANT_ID'
      }, { status: 400 });
    }

    // 4. Validate restaurant ownership
    if (restaurantId !== userData.restaurantId) {
      return NextResponse.json({
        success: false,
        message: 'No autorizado para este restaurante',
        error: 'UNAUTHORIZED_RESTAURANT'
      }, { status: 403 });
    }

    // 5. Fetch user's API keys
    const { data: apiKeys, error: fetchError } = await supabase
      .from('claude_api_keys')
      .select('id, key_name, is_active, created_at, last_used_at, usage_count')
      .eq('user_id', userData.userId)
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Database fetch error:', fetchError);
      return NextResponse.json({
        success: false,
        message: 'Error obteniendo las claves API',
        error: 'FETCH_ERROR'
      }, { status: 500 });
    }

    // 6. Return keys (without exposing actual API key values)
    return NextResponse.json({
      success: true,
      message: 'Claves API obtenidas exitosamente',
      keys: apiKeys || []
    });

  } catch (error) {
    console.error('API Keys fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

// =============================================
// DELETE: REVOKE API KEY
// =============================================
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Validate authorization
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
    const token = authHeader || request.headers.get('x-fudi-token');
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Token de autorización requerido',
        error: 'MISSING_TOKEN'
      }, { status: 401 });
    }

    // 2. Validate and decode token
    const userData = validateToken(token);
    if (!userData) {
      return NextResponse.json({
        success: false,
        message: 'Token inválido',
        error: 'INVALID_TOKEN'
      }, { status: 401 });
    }

    // 3. Parse request body
    const { keyId } = await request.json();

    if (!keyId) {
      return NextResponse.json({
        success: false,
        message: 'ID de clave requerido',
        error: 'MISSING_KEY_ID'
      }, { status: 400 });
    }

    // 4. Verify key ownership
    const { data: keyData, error: verifyError } = await supabase
      .from('claude_api_keys')
      .select('user_id, restaurant_id')
      .eq('id', keyId)
      .single();

    if (verifyError || !keyData) {
      return NextResponse.json({
        success: false,
        message: 'Clave API no encontrada',
        error: 'KEY_NOT_FOUND'
      }, { status: 404 });
    }

    if (keyData.user_id !== userData.userId) {
      return NextResponse.json({
        success: false,
        message: 'No autorizado para esta clave',
        error: 'UNAUTHORIZED_KEY'
      }, { status: 403 });
    }

    // 5. Deactivate the key (don't delete, for audit trail)
    const { error: deactivateError } = await supabase
      .from('claude_api_keys')
      .update({ 
        is_active: false,
        deactivated_at: new Date().toISOString()
      })
      .eq('id', keyId);

    if (deactivateError) {
      console.error('Database deactivate error:', deactivateError);
      return NextResponse.json({
        success: false,
        message: 'Error desactivando la clave API',
        error: 'DEACTIVATE_ERROR'
      }, { status: 500 });
    }

    // 6. Return success response
    return NextResponse.json({
      success: true,
      message: 'Clave API desactivada exitosamente'
    });

  } catch (error) {
    console.error('API Key deletion error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

// =============================================
// OPTIONS: CORS HEADERS
// =============================================
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-fudi-token',
    },
  });
}