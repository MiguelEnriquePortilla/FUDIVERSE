-- 🧠 FUDI MEMORY SYSTEM - SUPABASE TABLES
-- Revolutionary Permission-Based Memory Architecture

-- ================================================================
-- TABLA 1: PERSONAL_MEMORY
-- Lo que Fudi sabe de la PERSONA (con permiso)
-- ================================================================
CREATE TABLE personal_memory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    user_id UUID, -- ID del dueño específico (futuro multi-user)
    
    -- Tipo y contenido de memoria
    memory_type TEXT NOT NULL CHECK (memory_type IN (
        'preference',           -- "Llámame Migue"
        'goal',                -- "Quiero llegar a $50K"
        'routine',             -- "Siempre reviso ventas a las 8am"
        'communication_style', -- "Dame datos directos"
        'priority_focus',      -- "Me importa más rentabilidad que ventas"
        'personal_detail'      -- "Cierro domingos", "Trabajo solo"
    )),
    
    memory_key TEXT NOT NULL,     -- 'preferred_name', 'sales_check_time', 'monthly_goal'
    memory_value JSONB NOT NULL,  -- Flexible data: {"name": "Migue"} o {"time": "08:00", "frequency": "daily"}
    
    -- Sistema de permisos CRÍTICO
    permission_granted BOOLEAN DEFAULT FALSE,
    permission_requested_at TIMESTAMP WITH TIME ZONE,
    permission_granted_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata de uso
    confidence_score FLOAT DEFAULT 0.8 CHECK (confidence_score >= 0 AND confidence_score <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_referenced TIMESTAMP WITH TIME ZONE,
    reference_count INTEGER DEFAULT 0,
    
    -- Índices únicos para evitar duplicados
    UNIQUE(restaurant_id, memory_type, memory_key)
);

-- ================================================================
-- TABLA 2: CONVERSATIONAL_ARCHIVE  
-- Lo que el USUARIO eligió guardar explícitamente
-- ================================================================
CREATE TABLE conversational_archive (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    
    -- Organización del archivo
    conversation_id UUID,                    -- Agrupa mensajes relacionados
    archive_type TEXT NOT NULL CHECK (archive_type IN (
        'strategy',      -- "Estrategia Marketing Tacos Pastor"
        'decision',      -- "Decidí cambiar precios viernes"
        'analysis',      -- "Análisis completo semana pasada"
        'reminder',      -- "Recordar: revisar inventario martes"
        'recipe',        -- "Receta salsa especial"
        'procedure',     -- "Proceso de cierre de caja"
        'contact',       -- "Proveedor nuevo: Juan 555-1234"
        'insight'        -- "Insight: clientes prefieren tacos grandes"
    )),
    
    -- Contenido
    title TEXT NOT NULL,                     -- "Estrategia Marketing Tacos Pastor"
    content TEXT NOT NULL,                   -- Conversación completa archivada
    summary TEXT,                            -- Resumen generado por Fudi
    tags TEXT[] DEFAULT '{}',                -- ["marketing", "pastor", "promocion"]
    
    -- Origen y permisos
    user_requested BOOLEAN DEFAULT TRUE,     -- Usuario pidió explícitamente guardarlo
    auto_suggested BOOLEAN DEFAULT FALSE,    -- Fudi sugirió guardarlo
    
    -- Metadata de uso
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed TIMESTAMP WITH TIME ZONE,
    access_count INTEGER DEFAULT 0,
    
    -- Clasificación automática
    importance_score FLOAT DEFAULT 0.5 CHECK (importance_score >= 0 AND importance_score <= 1),
    relevance_tags JSONB DEFAULT '{}',       -- Tags automáticos de ML
    
    -- Búsqueda
    search_vector TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('spanish', title || ' ' || content || ' ' || COALESCE(summary, ''))
    ) STORED
);

-- ================================================================
-- TABLA 3: WORKING_MEMORY
-- Contexto temporal de conversaciones actuales
-- ================================================================
CREATE TABLE working_memory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    
    -- Sesión y contexto
    session_id UUID NOT NULL,               -- ID de conversación actual
    context_type TEXT NOT NULL CHECK (context_type IN (
        'ongoing_topic',      -- "Estamos hablando de marketing"
        'pending_question',   -- "Fudi preguntó algo, esperando respuesta"
        'follow_up',         -- "Fudi debe hacer seguimiento"
        'user_preference',   -- "Usuario mostró preferencia temporal"
        'unresolved_issue',  -- "Problema mencionado sin resolver"
        'action_item',       -- "Acción que el usuario debe hacer"
        'context_bridge'     -- "Información que conecta conversaciones"
    )),
    
    -- Contenido flexible
    context_data JSONB NOT NULL,            -- Data específica del contexto
    context_summary TEXT,                   -- Resumen humano legible
    
    -- Gestión temporal
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL, -- Se limpia automáticamente
    priority_level INTEGER DEFAULT 5 CHECK (priority_level >= 1 AND priority_level <= 10),
    
    -- Estado
    is_active BOOLEAN DEFAULT TRUE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    -- Referencias
    related_conversation_id UUID,           -- Link a conversational_archive
    related_memory_id UUID REFERENCES personal_memory(id) ON DELETE SET NULL
);

-- ================================================================
-- ÍNDICES PARA PERFORMANCE
-- ================================================================

-- Personal Memory
CREATE INDEX idx_personal_memory_restaurant ON personal_memory(restaurant_id);
CREATE INDEX idx_personal_memory_type ON personal_memory(memory_type);
CREATE INDEX idx_personal_memory_permission ON personal_memory(permission_granted, created_at);
CREATE INDEX idx_personal_memory_last_used ON personal_memory(last_referenced DESC NULLS LAST);

-- Conversational Archive  
CREATE INDEX idx_archive_restaurant ON conversational_archive(restaurant_id);
CREATE INDEX idx_archive_type ON conversational_archive(archive_type);
CREATE INDEX idx_archive_tags ON conversational_archive USING GIN(tags);
CREATE INDEX idx_archive_search ON conversational_archive USING GIN(search_vector);
CREATE INDEX idx_archive_created ON conversational_archive(created_at DESC);
CREATE INDEX idx_archive_relevance ON conversational_archive(importance_score DESC);

-- Working Memory
CREATE INDEX idx_working_memory_restaurant ON working_memory(restaurant_id);
CREATE INDEX idx_working_memory_session ON working_memory(session_id);
CREATE INDEX idx_working_memory_active ON working_memory(is_active, expires_at);
CREATE INDEX idx_working_memory_priority ON working_memory(priority_level DESC, created_at);

-- ================================================================
-- FUNCIONES DE LIMPIEZA AUTOMÁTICA
-- ================================================================

-- Función para limpiar working_memory expirada
CREATE OR REPLACE FUNCTION cleanup_expired_working_memory()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM working_memory 
    WHERE expires_at < NOW() 
    AND is_active = TRUE;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Programa la limpieza automática (ejecutar cada hora)
-- SELECT cron.schedule('cleanup-working-memory', '0 * * * *', 'SELECT cleanup_expired_working_memory();');

-- ================================================================
-- VISTAS ÚTILES
-- ================================================================

-- Vista de memoria personal activa
CREATE VIEW active_personal_memory AS
SELECT 
    pm.*,
    CASE 
        WHEN pm.last_referenced IS NULL THEN 'nunca_usado'
        WHEN pm.last_referenced > NOW() - INTERVAL '7 days' THEN 'reciente'
        WHEN pm.last_referenced > NOW() - INTERVAL '30 days' THEN 'moderado'
        ELSE 'antiguo'
    END as usage_frequency
FROM personal_memory pm
WHERE pm.permission_granted = TRUE
ORDER BY pm.confidence_score DESC, pm.last_referenced DESC NULLS LAST;

-- Vista de archivo conversacional relevante
CREATE VIEW relevant_archive AS
SELECT 
    ca.*,
    CASE 
        WHEN ca.access_count = 0 THEN 'no_usado'
        WHEN ca.access_count < 3 THEN 'poco_usado'
        WHEN ca.access_count < 10 THEN 'moderado'
        ELSE 'muy_usado'
    END as usage_level
FROM conversational_archive ca
WHERE ca.importance_score > 0.3
ORDER BY ca.importance_score DESC, ca.created_at DESC;

-- Vista de contexto de trabajo activo
CREATE VIEW active_working_context AS
SELECT 
    wm.*,
    EXTRACT(EPOCH FROM (wm.expires_at - NOW())) / 3600 as hours_until_expiry
FROM working_memory wm
WHERE wm.is_active = TRUE 
AND wm.expires_at > NOW()
ORDER BY wm.priority_level DESC, wm.created_at DESC;

-- ================================================================
-- COMENTARIOS FINALES
-- ================================================================

COMMENT ON TABLE personal_memory IS 'Memoria personal de Fudi sobre el usuario - requiere permisos explícitos';
COMMENT ON TABLE conversational_archive IS 'Archivo de conversaciones valiosas elegidas por el usuario';
COMMENT ON TABLE working_memory IS 'Contexto temporal de conversaciones activas - se limpia automáticamente';

COMMENT ON COLUMN personal_memory.confidence_score IS 'Qué tan seguro está Fudi de esta información (0-1)';
COMMENT ON COLUMN conversational_archive.search_vector IS 'Vector de búsqueda full-text en español';
COMMENT ON COLUMN working_memory.expires_at IS 'Cuándo se debe limpiar este contexto automáticamente';