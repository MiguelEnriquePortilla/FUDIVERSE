import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

// Importar servicios de inteligencia
const { IntelligenceCoordinator } = require('../../../services/intelligence');
const { ProductPerformanceAnalyzer } = require('../../../services/intelligence');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Inicializar IntelligenceCoordinator y ProductPerformanceAnalyzer
const intelligence = new IntelligenceCoordinator(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const productAnalyzer = new ProductPerformanceAnalyzer(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 🧠 PERSONALIDAD FUDIFLOW COMPLETA (IGUAL QUE SERVER.JS)
const FUDIFLOW_SYSTEM_PROMPT = `
🧠 Eres **Fudi**, el copiloto inteligente para restaurantes.  
Hablas "FudiFlow" – un lenguaje cálido, directo y visual que conecta con restauranteros reales.  
Tu misión es entregar análisis con estilo, ayudar sin rodeos y sonar siempre útil.

---

🚨 **REGLA CRÍTICA #1 – USO OBLIGATORIO DE DATOS:**

NUNCA respondas sobre datos sin usar la herramienta \`analyze_with_intelligence()\` primero.

SI EL USUARIO PREGUNTA SOBRE:

• Productos / platillos / qué se vende / estrella / menú  
• Métodos de pago / efectivo / tarjetas / transferencias  
• Empleados / quién vende / personal / meseros  
• Tendencias / comparaciones / análisis  
• Inventario / stock / qué falta  
• Clientes / comensales / hábitos  

👉 **DEBES:**

1. Ejecutar \`analyze_with_intelligence()\`  
2. Esperar su respuesta  
3. Basar tu análisis en los datos recibidos  
4. Si no hay datos, explicar con claridad y sugerir siguiente paso

❌ PROHIBIDO: inventar datos, asumir tendencias o responder sin consultar.

---

🧠 **TU PERSONALIDAD FUDIFLOW™:**

- Eres como un **socio inteligente y relajado**
- Conectas con dueños, gerentes y equipo operativo
- Conoces palabras del gremio: mise en place, covers, merma, trancazo
- Celebras lo bueno y detectas lo que no está jalando
- Siempre propones algo para avanzar

---

📘 **FUDICCIONARIO – TU VOCABULARIO BASE:**

🧂 *Operación diaria:*  
• Rush / Trancazo → Hora pico  
• Covers → Servicios / clientes  
• Tirado → No está jalando  
• Jalando → Va bien  
• Sabroso → Buen momento operativo  
• Armado → Bien organizado

💸 *Ventas y dinero:*  
• Billete → Ingresos  
• Bajón / Subidón → Caída o pico  
• Aguanta vara → Soporta bajón  
• Cashito → Pago en efectivo

🧠 *Análisis:*  
• ¿Le metemos lupa? → ¿Analizamos más a fondo?  
• ¿Lo destapamos? → ¿Te muestro el detalle?  
• Pinta raro / pinta bien → Hay algo ahí  
• Podría jalar más → Hay potencial

🍽️ *Producto:*  
• Platillo estrella → Más vendido  
• Combo jalador → Promo que vende  
• Plot twist culinario → Sorpresa inesperada  
• Lo están dejando morir → Dejó de moverse

🧃 *Fudi vibes:*  
• ¡Al tiro! → Listo para ayudarte  
• ¡Vámonos recio! → Empezamos fuerte  
• ¡Se prendió esta madre! → Esto está jalando  
• ¡Lo armamos juntos! → Cierre colaborativo  
• Vamos con todo → Motivación activa

---

💬 **FORMATO OBLIGATORIO DE RESPUESTAS**  
Jamás uses párrafos. Usa estructura visual jerárquica y directa.

🎯 **ESTRUCTURA DE RESPUESTA PERFECTA:**

1️⃣ **SALUDO CONTEXTUAL (1 línea máximo)**  
> ¡Al tiro, vamos a destapar esos datos!

2️⃣ **HEADLINE PRINCIPAL (Insight clave)**  
> 💳 **Efectivo lidera con $487,520**  
> └─ Representa 68% de los pagos esta semana

3️⃣ **DATOS POR CATEGORÍA**

🔥 *Lo que está jalando sabroso:*  
• Cashito domina en horas pico  
• Ticket efectivo: **$138**  
• Viernes: día fuerte con tarjeta

⚠️ *Ojo con esto:*  
• Tarjeta bajó a 20%  
• Transferencias casi inexistentes  
• Terminal falla en horas clave

💡 *Plot twist del día:*  
• ¡Los pagos con tarjeta gastan 2.1x más!

4️⃣ **ANÁLISIS DETALLADO (si aplica)**

📊 *Breakdown por método:*  
├─ 💵 Efectivo: 68% ($487K)  
├─ 💳 Tarjeta: 20% ($152K)  
└─ 📱 Transferencias: 12% ($89K)

📈 *Tendencias detectadas:*  
├─ Tarjeta sube +15%  
├─ Efectivo baja -8%  
└─ Transferencias estables

5️⃣ **LLAMADO A LA ACCIÓN**

🎯 *¿Le metemos lupa?*  
→ Revisar terminal  
→ Buscar horario ideal para tarjeta  
→ Lanzar promo para empujar transferencias

> ¿Qué destapamos primero? 💪

6️⃣ **SEPARADOR FINAL (SIEMPRE al final)**  
---

---

📋 **REGLAS FINALES PARA RESPUESTA PERFECTA:**

✅ SIEMPRE:  
- Usa emojis estratégicos (mínimo 5 por respuesta)  
- Números clave en **negritas**  
- Viñetas • para listas simples  
- Árbol ├─ └─ para breakdowns  
- Flechas → para acciones  
- Líneas divisorias --- entre secciones

❌ NUNCA:  
- Escribir párrafos largos  
- Dar respuestas planas o sin estructura  
- Ignorar "analyze_with_intelligence()"
- Dejar un análisis sin CTA al final

---

📅 *Hoy es:* ${new Date().toLocaleDateString('es-MX')}  
🕒 *Hora actual:* ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}  
📌 *Recuerda:* Siempre habla FudiFlow™. Siempre aporta valor. Siempre cierra con dirección clara.
`;

// 🔧 HERRAMIENTAS DISPONIBLES (IGUALES QUE SERVER.JS)
const tools: any[] = [
  {
    name: "get_sales_data",
    description: "Obtiene datos de ventas del restaurante para un período específico",
    input_schema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Número de días hacia atrás para consultar"
        },
        specific_date: {
          type: "string",
          description: "Fecha específica en formato YYYY-MM-DD (opcional)"
        }
      },
      required: []
    }
  },
  {
    name: "get_inventory_status",
    description: "Revisa el estado actual del inventario",
    input_schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Categoría a revisar o 'all' para todo",
          enum: ["all", "proteins", "vegetables", "beverages", "supplies"]
        }
      },
      required: ["category"]
    }
  },
  {
    name: "get_best_sellers",
    description: "Obtiene los productos más vendidos",
    input_schema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Cantidad de productos top a mostrar"
        }
      },
      required: ["limit"]
    }
  },
  {
    name: "analyze_with_intelligence",
    description: "Analiza datos del restaurante usando inteligencia artificial para pagos, tendencias y patrones",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "La pregunta o análisis que se desea realizar"
        },
        context: {
          type: "object",
          description: "Contexto adicional si es necesario"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "get_product_performance",
    description: "Analiza el rendimiento de productos/platillos específicos del restaurante",
    input_schema: {
      type: "object",
      properties: {
        period: {
          type: "string",
          description: "Período de análisis",
          enum: ["today", "week", "month", "all"]
        },
        metric: {
          type: "string", 
          description: "Métrica a analizar",
          enum: ["sales", "profit", "popularity", "trend"]
        },
        product_name: {
          type: "string",
          description: "Nombre específico del producto (opcional)"
        }
      },
      required: ["period", "metric"]
    }
  }
];

// 📊 FUNCIÓN DE ANÁLISIS SIMPLE
function analizarTendenciaSimple(ventasHoy: number, ventasAyer: number): string {
  if (!ventasAyer || ventasAyer === 0) return "Sin datos para comparar";
    
  const diferencia = ventasHoy - ventasAyer;
  const porcentaje = (diferencia / ventasAyer) * 100;
    
  if (porcentaje > 10) return `📈 Subiendo ${porcentaje.toFixed(1)}%`;
  if (porcentaje < -10) return `📉 Bajando ${Math.abs(porcentaje).toFixed(1)}%`;
  return "➡️ Estable";
}

// 📊 FUNCIONES DE HERRAMIENTAS (IGUALES QUE SERVER.JS)
async function executeToolFunction(toolName: string, toolInput: any, restaurantId: string) {
  console.log(`🔧 Ejecutando herramienta: ${toolName}`);
  
  switch(toolName) {
    case 'get_sales_data':
      console.log('📊 Datos recibidos:', toolInput);
      const { days, specific_date } = toolInput;
      
      // Si hay fecha específica, usarla
      if (specific_date) {
        console.log(`🔍 Buscando datos para fecha: ${specific_date}`);
        const { data: summaryData } = await supabase
          .from('daily_summaries')
          .select('*')
          .eq('restaurant_id', restaurantId)
          .eq('summary_date', specific_date)
          .single();

        console.log('📦 Resultado de Supabase:', { summaryData });

        if (summaryData) {
          // Encontrar hora pico
          const hourlyArray = Object.entries(summaryData.hourly_sales || {})
            .map(([hour, data]: [string, any]) => ({ hour: parseInt(hour), ...data }))
            .filter(h => h.total > 0)
            .sort((a, b) => b.count - a.count);
          
          // Intentar comparar con el día anterior
          let tendencia = "Sin comparación disponible";
          const fechaAnterior = new Date(summaryData.summary_date);
          fechaAnterior.setDate(fechaAnterior.getDate() - 1);
          const fechaAnteriorStr = fechaAnterior.toISOString().split('T')[0];

          const { data: dataAnterior } = await supabase
            .from('daily_summaries')
            .select('total_sales')
            .eq('restaurant_id', restaurantId)
            .eq('summary_date', fechaAnteriorStr)
            .single();

          if (dataAnterior) {
            tendencia = analizarTendenciaSimple(summaryData.total_sales, dataAnterior.total_sales);
            console.log('📈 Tendencia calculada:', tendencia);
          } else {
            console.log('❌ No hay datos del día anterior para comparar');
          }
        
          return {
            success: true,
            date: specific_date,
            total_sales: summaryData.total_sales,
            transaction_count: summaryData.transaction_count,
            avg_ticket: summaryData.avg_ticket,
            payment_methods: summaryData.payment_methods,
            employee_sales: summaryData.employee_sales,
            hourly_sales: summaryData.hourly_sales,
            peak_hours: hourlyArray.slice(0, 3),
            business_hours: {
              open: hourlyArray[0]?.hour || 10,
              close: hourlyArray[hourlyArray.length - 1]?.hour || 18
            },
            tendencia: tendencia
          };
        } else {
          // Si no hay datos para esa fecha, buscar los más recientes
          console.log('⚠️ No hay datos para esa fecha, buscando datos más recientes...');
          const { data: recentData } = await supabase
            .from('daily_summaries')
            .select('*')
            .eq('restaurant_id', restaurantId)
            .order('summary_date', { ascending: false })
            .limit(1)
            .single();
          
          if (recentData) {
            const hourlyArray = Object.entries(recentData.hourly_sales || {})
              .map(([hour, data]: [string, any]) => ({ hour: parseInt(hour), ...data }))
              .filter(h => h.total > 0)
              .sort((a, b) => b.count - a.count);

            return {
              success: true,
              date: recentData.summary_date,
              note: `No hay datos para ${specific_date}, mostrando datos del ${recentData.summary_date}`,
              total_sales: recentData.total_sales,
              transaction_count: recentData.transaction_count,
              avg_ticket: recentData.avg_ticket,
              payment_methods: recentData.payment_methods,
              employee_sales: recentData.employee_sales,
              hourly_sales: recentData.hourly_sales,
              peak_hours: hourlyArray.slice(0, 3),
              business_hours: {
                open: hourlyArray[0]?.hour || 10,
                close: hourlyArray[hourlyArray.length - 1]?.hour || 18
              }
            };
          }
          
          // Si tampoco hay datos recientes
          return {
            success: false,
            message: "No se encontraron datos de ventas para este restaurante"
          };
        }
      }

      // Si usa días, mantener el código original
      const { data: salesData } = await supabase
        .from('restaurant_data')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('type', 'sales')
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .order('date', { ascending: false });
      
      // Calcular totales y promedios
      if (!salesData || salesData.length === 0) {
        return {
          success: false,
          message: "No se encontraron datos de ventas para este restaurante en el período solicitado"
        };
      }
      const total = salesData.reduce((sum: number, day: any) => sum + (day.data.total || 0), 0);
      const average = total / salesData.length;
      
      return {
        success: true,
        period: `últimos ${days} días`,
        total_sales: total,
        average_daily: average,
        days_with_data: salesData.length,
        details: salesData.map((d: any) => ({
          date: d.date,
          total: d.data.total,
          transactions: d.data.transactions
        }))
      };
    
    case 'get_inventory_status':
      const { category } = toolInput;
      const { data: inventoryData } = await supabase
        .from('restaurant_data')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('type', 'inventory')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (!inventoryData || inventoryData.length === 0) {
        return {
          success: false,
          message: "No hay datos de inventario disponibles"
        };
      }
      
      const inventory = inventoryData[0].data;
      if (category === 'all') {
        return {
          success: true,
          inventory: inventory,
          last_updated: inventoryData[0].created_at
        };
      } else {
        return {
          success: true,
          category: category,
          items: inventory[category] || {},
          last_updated: inventoryData[0].created_at
        };
      }
    
    case 'get_best_sellers':
      const { limit } = toolInput;
      const { data: menuData } = await supabase
        .from('restaurant_data')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('type', 'sales')
        .order('date', { ascending: false })
        .limit(7); // Última semana
      
      if (!menuData || menuData.length === 0) {
        return {
          success: false,
          message: "No hay datos de ventas por producto"
        };
      }
      
      // Agregar ventas por producto
      const productSales: { [key: string]: number } = {};
      menuData.forEach((day: any) => {
        if (day.data.products) {
          Object.entries(day.data.products).forEach(([product, quantity]) => {
            productSales[product] = (productSales[product] || 0) + (quantity as number);
          });
        }
      });
      
      // Ordenar y limitar
      const topProducts = Object.entries(productSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([product, quantity]) => ({ product, quantity }));
      
      return {
        success: true,
        period: "última semana",
        top_products: topProducts
      };
    
    case 'get_product_performance':
      const { period, metric, product_name } = toolInput;
      console.log('📊 Analizando rendimiento de productos:', { period, metric, product_name });
      
      try {
        const productAnalysis = await productAnalyzer.analyzeProducts(restaurantId, {
          period: period,
          metric: metric,
          productName: product_name
        });
        
        return {
          success: true,
          analysis_type: 'product_performance',
          period: period,
          metric: metric,
          insights: productAnalysis.insights || [],
          top_products: productAnalysis.topProducts || [],
          trends: productAnalysis.trends || [],
          recommendations: productAnalysis.recommendations || []
        };
      } catch (error) {
        console.error('❌ Error en ProductPerformanceAnalyzer:', error);
        return {
          success: false,
          error: 'Error analizando rendimiento de productos',
          message: 'No se pudieron obtener datos de productos en este momento'
        };
      }
    
    case 'analyze_with_intelligence':
      const { query, context } = toolInput;
      console.log('🧠 Usando IntelligenceCoordinator para:', query);
      
      const intelligenceResult = await intelligence.analyzeQuery(query, restaurantId);
      
      return {
        success: true,
        analysis_type: intelligenceResult.intent,
        insights: intelligenceResult.insights,
        data: intelligenceResult.data
      };
    
    default:
      return {
        success: false,
        error: `Herramienta ${toolName} no encontrada`
      };
  }
}

// 💬 ENDPOINT PRINCIPAL: CHAT (IGUAL QUE SERVER.JS)
export async function POST(request: NextRequest) {
  try {
    const { restaurantId, message, conversationId } = await request.json();
    const startTime = Date.now();
    
    if (!restaurantId || !message) {
      return NextResponse.json(
        { error: 'Faltan parámetros: restaurantId y message son requeridos' },
        { status: 400 }
      );
    }
    
    console.log(`\n🧠 FudiGPT activándose para restaurante: ${restaurantId}`);
    console.log(`💬 Mensaje: ${message}`);
    
    // Obtener o crear conversación
    let conversation;
    let messages = [];
    
    if (conversationId) {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();
      
      if (data) {
        conversation = data;
        messages = data.messages || [];
      }
    }
    
    if (!conversation) {
      const { data } = await supabase
        .from('conversations')
        .insert({
          restaurant_id: restaurantId,
          messages: []
        })
        .select()
        .single();
      
      conversation = data;
    }
    
    // Agregar mensaje del usuario
    messages.push({
      role: 'user',
      content: message
    });
    
    // Llamar a Claude con herramientas
    console.log('🤖 Consultando a Claude...');
    
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: FUDIFLOW_SYSTEM_PROMPT,
      messages: messages as any,
      tools: tools,
      tool_choice: { type: "auto" }
    });
    
    // Si Claude quiere usar herramientas
    if (response.stop_reason === 'tool_use') {
      console.log('🔧 Claude quiere usar herramientas');
      
      const toolUse = response.content.find(block => block.type === 'tool_use');
      if (toolUse && toolUse.type === 'tool_use') {
        console.log(`📞 Llamando a: ${toolUse.name}`);
        
        // Ejecutar la herramienta
        const toolResult = await executeToolFunction(
          toolUse.name,
          toolUse.input,
          restaurantId
        );
        
        // Agregar la respuesta de Claude y el resultado de la herramienta
        messages.push({
          role: 'assistant',
          content: response.content
        });
        
        messages.push({
          role: 'user',
          content: [{
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: JSON.stringify(toolResult)
          }]
        });
        
        // Obtener respuesta final de Claude
        const finalResponse = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: FUDIFLOW_SYSTEM_PROMPT,
          messages: messages as any
        });
        
        // Agregar respuesta final
        const finalText = finalResponse.content[0].type === 'text' 
          ? finalResponse.content[0].text 
          : 'Error procesando respuesta';
          
        messages.push({
          role: 'assistant',
          content: finalText
        });
        
        // Guardar conversación actualizada
        if (conversation?.id) {
          await supabase
            .from('conversations')
            .update({
              messages: messages,
              updated_at: new Date().toISOString()
            })
            .eq('id', conversation.id);
        }
        
        return NextResponse.json({
          success: true,
          response: finalText,
          conversationId: conversation?.id || 'temp-' + Date.now(),
          toolsUsed: [toolUse.name]
        });
      }
    }
    
    // Respuesta sin herramientas
    const assistantResponse = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Error procesando respuesta';
      
    messages.push({
      role: 'assistant',
      content: assistantResponse
    });
    
    // Guardar conversación
    if (conversation?.id) {
      await supabase
        .from('conversations')
        .update({
          messages: messages,
          updated_at: new Date().toISOString()
        })
        .eq('id', conversation.id);
    }
    
    console.log('✅ Respuesta enviada exitosamente');
    
    return NextResponse.json({
      success: true,
      response: assistantResponse,
      conversationId: conversation?.id || 'temp-' + Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
      return NextResponse.json({
        success: true,
        response: '😅 Ups, mi cerebro tuvo un cortocircuito. ¿Puedes repetir?\n\n---',
        error: true
      });
    }
  }