# 🔍 Análisis de Conexiones - FUDI Chat

## 🎯 CONEXIÓN PRINCIPAL DETECTADA

### 1. Frontend → Backend API
```
Frontend (page.tsx) 
    ↓ 
/api/claude-mcp 
    ↓ 
Claude MCP Server 
    ↓ 
Base de Datos
```

## 📁 ARCHIVOS CRÍTICOS A REVISAR

### 🚨 **PRIORIDAD ALTA - Revisar INMEDIATAMENTE:**

#### 1. `/api/claude-mcp/route.ts` (o .js)
**Ubicación:** `pages/api/claude-mcp.js` o `app/api/claude-mcp/route.ts`
**Función:** Maneja las peticiones del chat
**Buscar:**
- ¿Cómo obtiene los datos del restaurante?
- ¿Tiene limitaciones en las consultas SQL?
- ¿Filtra por `restaurantId` correctamente?

#### 2. `/lib/api.ts` (fudiAPI)
**Ubicación:** `lib/api.ts`
**Función:** Maneja todas las conexiones con Supabase
**Buscar:**
- Funciones de `conversations`
- Permisos de acceso a datos
- Configuración de Supabase

#### 3. Configuración MCP
**Ubicación:** Archivo de configuración MCP
**Función:** Define qué datos puede ver Claude
**Buscar:**
- Herramientas disponibles
- Permisos de base de datos
- Limitaciones de consultas

### 📊 **REVISIÓN DE BASE DE DATOS:**

#### 4. Esquema de Supabase
**Tablas críticas:**
- `restaurants` - Datos del restaurante
- `conversations` - Conversaciones guardadas
- `sales` - Datos de ventas
- `products` - Productos del menú
- `orders` - Órdenes/pedidos

#### 5. Row Level Security (RLS)
**Buscar en Supabase:**
- Políticas RLS por tabla
- Filtros por `restaurant_id`
- Permisos de lectura/escritura

## 🔧 POSIBLES PROBLEMAS IDENTIFICADOS

### ❌ **Problema #1: Filtrado Limitado**
```javascript
// En /api/claude-mcp podría estar así (MALO):
const salesData = await supabase
  .from('sales')
  .select('*')
  .limit(100); // ← Solo ve 100 registros!

// Debería ser así (BUENO):
const salesData = await supabase
  .from('sales')
  .select('*')
  .eq('restaurant_id', restaurantId)
  .order('created_at', { ascending: false });
```

### ❌ **Problema #2: MCP Tools Limitadas**
```json
// En configuración MCP podría faltar:
{
  "tools": [
    "query_sales", // ¿Está disponible?
    "query_products", // ¿Está disponible?
    "query_inventory", // ¿Está disponible?
    "query_analytics" // ¿Está disponible?
  ]
}
```

### ❌ **Problema #3: Permisos RLS**
```sql
-- En Supabase podría estar mal configurado:
CREATE POLICY "Users can only see their restaurant data" ON sales
FOR SELECT USING (restaurant_id = auth.jwt() ->> 'restaurant_id');
```

## 🎯 PLAN DE INVESTIGACIÓN

### Paso 1: Revisar Backend API
1. Buscar `/api/claude-mcp/route.ts`
2. Verificar cómo obtiene datos
3. Confirmar filtros por restaurantId

### Paso 2: Revisar fudiAPI
1. Abrir `/lib/api.ts`
2. Verificar funciones de consulta
3. Revisar conexión con Supabase

### Paso 3: Revisar Base de Datos
1. Entrar a Supabase Dashboard
2. Verificar Row Level Security
3. Probar consultas manualmente

### Paso 4: Revisar Configuración MCP
1. Buscar archivo de configuración MCP
2. Verificar herramientas disponibles
3. Confirmar permisos de datos

## 🚀 DESPUÉS: MEJORAS PLANEADAS

Una vez solucionado el problema de conexión:

### 📸 **Análisis de Imágenes**
```javascript
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('restaurantId', userData.restaurantId);
  
  const response = await fetch('/api/analyze-image', {
    method: 'POST',
    body: formData
  });
};
```

### 📄 **Análisis de Documentos**
```javascript
const handleDocumentUpload = async (file) => {
  // Subir menús, facturas, reportes
  // Claude puede analizarlos y extraer datos
};
```

### 📊 **Dashboard en Tiempo Real**
```javascript
const LiveDashboard = () => {
  // Gráficas que se actualizan automáticamente
  // Conectadas directamente a la base de datos
};
```