// services/brain/HumanizerUniversal.js
// 🎭 FUDIREST™️ TONE ENGINE - Transforma cualquier respuesta robótica en conversación humana

class HumanizerUniversal {
  constructor() {
    this.name = 'HumanizerUniversal';
    this.tone = 'FudiResto™️';
  }

  // 🪄 MÉTODO PRINCIPAL: Humanizar cualquier respuesta
  humanize(rawInsights, context = {}) {
    console.log('🎭 Humanizer: Transforming to FudiResto™️ tone...');
    
    if (!rawInsights || rawInsights.length === 0) {
      return this.generateFallbackResponse(context);
    }

    // 🔍 Analizar tipo de contenido
    const contentType = this.analyzeContentType(rawInsights);
    
    // 🎯 Extraer datos clave
    const dataPoints = this.extractDataPoints(rawInsights);
    
    // 🌟 Generar respuesta humanizada
    const humanResponse = this.buildHumanResponse(dataPoints, contentType, context);
    
    console.log('✨ Humanization complete - FudiResto™️ tone applied');
    return humanResponse;
  }

  // 🔍 Analizar qué tipo de contenido tenemos
  analyzeContentType(insights) {
    const text = insights.join(' ').toLowerCase();
    
    if (text.includes('efectivo') || text.includes('cash') || text.includes('tarjeta')) {
      return 'payments';
    }
    if (text.includes('producto') || text.includes('platillo') || text.includes('menú')) {
      return 'products';
    }
    if (text.includes('hora') || text.includes('pico') || text.includes('rush')) {
      return 'hours';
    }
    if (text.includes('venta') || text.includes('revenue') || text.includes('ticket')) {
      return 'sales';
    }
    
    return 'general';
  }

  // 🎯 Extraer puntos de datos específicos
  extractDataPoints(insights) {
    const dataPoints = {
      numbers: [],
      percentages: [],
      hours: [],
      amounts: [],
      trends: [],
      comparisons: []
    };

    insights.forEach(insight => {
      // Extraer números y percentajes
      const percentageMatches = insight.match(/(\d+\.?\d*)%/g);
      if (percentageMatches) {
        dataPoints.percentages.push(...percentageMatches);
      }

      // Extraer cantidades de dinero
      const amountMatches = insight.match(/\$(\d+\.?\d*)/g);
      if (amountMatches) {
        dataPoints.amounts.push(...amountMatches);
      }

      // Extraer horas
      const hourMatches = insight.match(/(\d{1,2}):00/g);
      if (hourMatches) {
        dataPoints.hours.push(...hourMatches);
      }

      // Extraer números generales
      const numberMatches = insight.match(/(\d+) de (\d+)/g);
      if (numberMatches) {
        dataPoints.numbers.push(...numberMatches);
      }

      // Detectar tendencias
      if (insight.includes('subió') || insight.includes('creció') || insight.includes('aumentó')) {
        dataPoints.trends.push('up');
      }
      if (insight.includes('bajó') || insight.includes('cayó') || insight.includes('disminuyó')) {
        dataPoints.trends.push('down');
      }

      // Detectar comparaciones
      if (insight.includes(' vs ') || insight.includes('dominio')) {
        dataPoints.comparisons.push(insight);
      }
    });

    return dataPoints;
  }

  // 🌟 Construir respuesta humanizada estilo FudiResto™️
  buildHumanResponse(dataPoints, contentType, context) {
    const now = new Date();
    const timeStamp = now.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    let response = '';

    // 📝 Header contextual
    response += this.buildContextualHeader(contentType, timeStamp);
    response += '\n\n';

    // 📊 Sección principal de datos
    response += this.buildMainDataSection(dataPoints, contentType);
    response += '\n\n';

    // 🔍 Interpretación operativa
    response += this.buildOperationalInsight(dataPoints, contentType);
    response += '\n\n';

    // 🎯 Call to action específico
    response += this.buildActionableClose(dataPoints, contentType);

    return response;
  }

  // 📝 Header contextual según tipo
  buildContextualHeader(contentType, timeStamp) {
    const headers = {
      payments: `**Reporte rápido de pagos – ${timeStamp}**`,
      products: `**Vista rápida de productos – ${timeStamp}**`,
      sales: `**Resumen de ventas – ${timeStamp}**`,
      hours: `**Análisis de horarios – ${timeStamp}**`,
      general: `**Reporte operativo – ${timeStamp}**`
    };

    return headers[contentType] || headers.general;
  }

  // 📊 Sección principal de datos
  buildMainDataSection(dataPoints, contentType) {
    let section = '';

    switch (contentType) {
      case 'payments':
        section += this.buildPaymentsSection(dataPoints);
        break;
      case 'products':
        section += this.buildProductsSection(dataPoints);
        break;
      case 'sales':
        section += this.buildSalesSection(dataPoints);
        break;
      default:
        section += this.buildGeneralSection(dataPoints);
    }

    return section;
  }

  // 💳 Sección específica de pagos
  buildPaymentsSection(dataPoints) {
    let section = '';
    
    // Método dominante
    if (dataPoints.percentages.length > 0) {
      const mainPercentage = dataPoints.percentages[0];
      if (parseFloat(mainPercentage) > 90) {
        section += `💵 **El efectivo sigue siendo el rey**\n`;
        section += `• ${dataPoints.numbers[0] || 'La mayoría'} se hacen en cash\n`;
      } else {
        section += `💳 **Mix equilibrado de pagos**\n`;
        section += `• ${mainPercentage} en método principal\n`;
      }
    }

    // Hora pico
    if (dataPoints.hours.length > 0) {
      section += `• Solo ${dataPoints.numbers[1] || 'pocas'} con tarjeta`;
      if (dataPoints.trends.includes('down')) {
        section += ` → tendencia a la baja esta semana`;
      }
      section += '\n\n';

      section += `📍**Tu hora fuerte sigue firme:**\n`;
      section += `• ${dataPoints.hours[0]} = tu momento de mayor flujo\n`;
      section += `• Tu operación está concentrada justo ahí`;
    }

    // Ticket promedio
    if (dataPoints.amounts.length > 0) {
      section += `\n\n📊 **Ticket promedio:**\n`;
      section += `• ${dataPoints.amounts[0]} — está en ese punto ideal: ni frena volumen, ni castiga margen`;
    }

    return section;
  }

  // 🍽️ Sección específica de productos
  buildProductsSection(dataPoints) {
    let section = `🍽️ **Tu menú en números claros**\n`;
    
    if (dataPoints.numbers.length > 0) {
      section += `• Tu plato estrella lidera con ${dataPoints.numbers[0]}\n`;
    }
    
    if (dataPoints.amounts.length > 0) {
      section += `• Generando ${dataPoints.amounts[0]} en ventas\n`;
    }

    if (dataPoints.trends.includes('up')) {
      section += `• Tendencia al alza — los clientes lo están pidiendo más`;
    }

    return section;
  }

  // 💰 Sección específica de ventas
  buildSalesSection(dataPoints) {
    let section = `💰 **Flujo de ventas actual**\n`;
    
    if (dataPoints.amounts.length > 0) {
      section += `• Total del período: ${dataPoints.amounts[0]}\n`;
    }
    
    if (dataPoints.trends.includes('up')) {
      section += `• Tendencia positiva — vas por buen camino`;
    } else if (dataPoints.trends.includes('down')) {
      section += `• Necesita atención — vamos a ajustar estrategia`;
    }

    return section;
  }

  // 🔄 Sección general
  buildGeneralSection(dataPoints) {
    let section = `📋 **Lo que están diciendo los números**\n`;
    
    if (dataPoints.percentages.length > 0) {
      section += `• Factor principal: ${dataPoints.percentages[0]} de concentración\n`;
    }
    
    if (dataPoints.amounts.length > 0) {
      section += `• Valor clave: ${dataPoints.amounts[0]}\n`;
    }

    return section;
  }

  // 🔍 Interpretación operativa
  buildOperationalInsight(dataPoints, contentType) {
    let insight = `📌 **¿Qué significa esto para ti?**\n`;

    switch (contentType) {
      case 'payments':
        if (dataPoints.percentages.length > 0 && parseFloat(dataPoints.percentages[0]) > 90) {
          insight += `→ Estás operando con un modelo claro: rápido, en efectivo, sin fricción\n`;
          insight += `→ Y ese dominio te da ventaja real: menos comisiones, más control`;
        } else {
          insight += `→ Tienes flexibilidad en pagos — aprovecha esa diversidad\n`;
          insight += `→ Cada método tiene su momento ideal del día`;
        }
        break;
        
      case 'products':
        insight += `→ Tu menú tiene un líder claro — aprovecha su popularidad\n`;
        insight += `→ Considera variaciones o combos del producto estrella`;
        break;
        
      case 'sales':
        if (dataPoints.trends.includes('up')) {
          insight += `→ El momentum está a tu favor — mantén la consistencia\n`;
          insight += `→ Buen momento para optimizar procesos`;
        } else {
          insight += `→ Hora de ajustar — identifica qué cambió\n`;
          insight += `→ Revisa horarios, productos o servicio`;
        }
        break;
        
      default:
        insight += `→ Los datos muestran patrones claros para optimizar\n`;
        insight += `→ Enfócate en lo que está funcionando mejor`;
    }

    return insight;
  }

  // 🎯 Call to action específico
  buildActionableClose(dataPoints, contentType) {
    const actionMap = {
      payments: [
        'preparemos una estrategia para días con baja tarjeta',
        'empujar promos específicas en hora pico',
        'optimizar el manejo de efectivo'
      ],
      products: [
        'crear variaciones del producto estrella',
        'ajustar el mix de menú',
        'promover productos complementarios'
      ],
      sales: [
        'potenciar las horas más fuertes',
        'revisar la estrategia de precios',
        'optimizar la operación'
      ],
      general: [
        'profundizar en los datos',
        'crear un plan de acción',
        'optimizar según estos patrones'
      ]
    };

    const actions = actionMap[contentType] || actionMap.general;
    const randomActions = actions.sort(() => 0.5 - Math.random()).slice(0, 2);

    return `¿Te gustaría que ${randomActions.join(' o ')}?`;
  }

  // 🛡️ Respuesta de fallback
  generateFallbackResponse(context) {
    const now = new Date();
    const timeStamp = now.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    return `**Reporte rápido – ${timeStamp}**

📋 **Los datos están procesándose**
• Mi sistema neural está analizando tu información
• En un momento tendrás insights específicos para tu operación

¿Hay algo particular que te gustaría que revise mientras proceso todo?`;
  }

  // 🧹 Limpiar duplicados y mejorar flow
  cleanAndOptimize(response) {
    // Remover duplicados
    const lines = response.split('\n');
    const uniqueLines = [...new Set(lines)];
    
    // Rejoin y optimizar espaciado
    return uniqueLines.join('\n').replace(/\n\n\n+/g, '\n\n');
  }
}

module.exports = HumanizerUniversal;F