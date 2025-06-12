'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  TrendingUp, TrendingDown, Activity, Zap,
  ArrowUp, ArrowDown, DollarSign, ShoppingCart,
  Clock, Calendar, Users, CreditCard, Store,
  Brain, AlertCircle, Sparkles, AlertTriangle,
  Crown, Gift, Flame, Trophy, Target, Star
} from 'lucide-react';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
/*import '@/styles/fudi-utilities.css'*/
import '@/styles/pages/dashboard.css';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RESTAURANT_ID = '13207c90-2ea6-4aa0-bfac-349753d24ea4';

interface RestaurantData {
  ventasHoy: number;
  ventasAyer: number;
  transaccionesHoy: number;
  ticketPromedio: number;
  ventasSemana: number;
  cambioVentas: number;
  esPositivo: boolean;
  gananciaHoy: number;
  comensalesHoy: number;
}

interface FudiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface TickerMessage {
  id: string;
  type: 'vip' | 'milestone' | 'alert' | 'trend' | 'record' | 'prediction' | 'celebration';
  icon: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export default function FudiDashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [data, setData] = useState<RestaurantData>({
    ventasHoy: 0,
    ventasAyer: 0,
    transaccionesHoy: 0,
    ticketPromedio: 0,
    ventasSemana: 0,
    cambioVentas: 0,
    esPositivo: true,
    gananciaHoy: 0,
    comensalesHoy: 0,
  });
  const [topProductos, setTopProductos] = useState<any[]>([]);
  const [ventasPorHora, setVentasPorHora] = useState<any[]>([]);
  const [ultimaSincronizacion, setUltimaSincronizacion] = useState<Date | null>(null);
  const [sinDatosHoy, setSinDatosHoy] = useState(false);
  
  // FUDI Visual Effects State
  const [particles, setParticles] = useState<FudiParticle[]>([]);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fudiEyeRef = useRef<HTMLDivElement>(null);

  // TICKER State
  const [tickerMessages, setTickerMessages] = useState<TickerMessage[]>([]);
  const [clientesVIP, setClientesVIP] = useState<any[]>([]);
  const [mesasCalientes, setMesasCalientes] = useState<any[]>([]);
  const [tendenciasPago, setTendenciasPago] = useState<any>(null);

  useEffect(() => {
    // Load user data
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('fudi_token');
        if (token) {
          const decoded = JSON.parse(atob(token));
          setUserData({
            restaurantName: decoded.restaurantName || 'RESTAURANTE',
            ownerName: decoded.ownerName || 'OPERADOR',
            restaurantId: decoded.restaurantId || RESTAURANT_ID
          });
        } else {
          // Si no hay token, usar valores por defecto
          setUserData({
            restaurantName: 'RESTAURANTE',
            ownerName: 'OPERADOR',
            restaurantId: RESTAURANT_ID
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // En caso de error, usar valores por defecto
        setUserData({
          restaurantName: 'RESTAURANTE',
          ownerName: 'OPERADOR',
          restaurantId: RESTAURANT_ID
        });
      }
    };

    loadUserData();
  }, []);

  // Cargar datos cuando userData esté listo
  useEffect(() => {
    if (userData && userData.restaurantId) {
      console.log('Cargando datos para restaurante:', userData.restaurantId);
      cargarDatos();
    }
  }, [userData]);

  // Cargar datos inteligentes cuando tengamos los datos básicos
  useEffect(() => {
    if (userData && userData.restaurantId && data.ventasHoy > 0) {
      console.log('Cargando datos inteligentes...');
      cargarDatosInteligentes();
    }
  }, [userData, data.ventasHoy, topProductos.length]);

  // Actualizar cada 30 segundos
  useEffect(() => {
    if (!userData?.restaurantId) return;
    
    const interval = setInterval(() => {
      cargarDatos();
      cargarDatosInteligentes();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [userData]);

  // Forzar actualización al hacer login
  useEffect(() => {
    // Detectar si es un login fresco
    const isNewLogin = sessionStorage.getItem('fudi_fresh_login');
    if (isNewLogin === 'true') {
      console.log('Login detectado - forzando sincronización...');
      cargarDatos();
      cargarDatosInteligentes();
      sessionStorage.removeItem('fudi_fresh_login');
    }
  }, []);

  // Initialize particle system
  useEffect(() => {
    const initParticles = [];
    for (let i = 0; i < 50; i++) { 
      initParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    setParticles(initParticles);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;
        
        particle.vx = Math.max(-2, Math.min(2, particle.vx));
        particle.vy = Math.max(-2, Math.min(2, particle.vy));

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fbbf24';
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles]);

  // FUDI Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!fudiEyeRef.current) return;

      const eye = fudiEyeRef.current;
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(10, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const pupil = eye.querySelector('.fudi-pupil') as HTMLElement;
      if (pupil) {
        pupil.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cargarDatosInteligentes = async () => {
    try {
      const restaurantId = userData?.restaurantId || RESTAURANT_ID;
      const hoy = new Date();
      const hoyStr = hoy.toISOString().split('T')[0];
      
      console.log('Iniciando carga de datos inteligentes para:', restaurantId);
      
      // 1. CLIENTES VIP Y CUMPLEAÑOS
      const { data: clientesData, error: clientesError } = await supabase
        .from('customers')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .or(`visit_count.gte.10,total_spent.gte.5000`)
        .order('total_spent', { ascending: false })
        .limit(20);

      console.log('Clientes VIP encontrados:', clientesData?.length || 0);
      if (clientesError) console.error('Error cargando clientes:', clientesError);

      if (clientesData && clientesData.length > 0) {
        setClientesVIP(clientesData);
        
        // Verificar cumpleaños
        const cumpleaneros = clientesData.filter(c => {
          if (!c.birthday) return false;
          const cumple = new Date(c.birthday);
          return cumple.getDate() === hoy.getDate() && cumple.getMonth() === hoy.getMonth();
        });

        cumpleaneros.forEach(cliente => {
          agregarMensajeTicker({
            type: 'celebration',
            icon: '🎂',
            text: `CUMPLEAÑOS HOY: ${cliente.name} (Cliente VIP) • Regalo: Postre gratis • Visita #${cliente.visit_count}`,
            priority: 'high'
          });
        });

        // Agregar mensaje de cliente top
        if (clientesData[0]) {
          const topCliente = clientesData[0];
          agregarMensajeTicker({
            type: 'vip',
            icon: '👑',
            text: `CLIENTE TOP: ${topCliente.name} • ${topCliente.visit_count} visitas • Total histórico: ${formatMoney(topCliente.total_spent)}`,
            priority: 'medium'
          });
        }
      }

      // 2. MESAS CALIENTES (múltiples órdenes)
      const { data: transaccionesMesa } = await supabase
        .from('poster_transactions')
        .select('table_id, payed_sum, date_close')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${hoyStr} 00:00:00`)
        .not('table_id', 'is', null);

      if (transaccionesMesa && transaccionesMesa.length > 0) {
        const mesasAgrupadas: { [key: string]: { count: number, total: number, lastOrder: string } } = {};
        
        transaccionesMesa.forEach(t => {
          const mesa = t.table_id.toString();
          if (!mesasAgrupadas[mesa]) {
            mesasAgrupadas[mesa] = { count: 0, total: 0, lastOrder: t.date_close };
          }
          mesasAgrupadas[mesa].count++;
          mesasAgrupadas[mesa].total += parseFloat(t.payed_sum);
          if (new Date(t.date_close) > new Date(mesasAgrupadas[mesa].lastOrder)) {
            mesasAgrupadas[mesa].lastOrder = t.date_close;
          }
        });

        // Detectar mesas calientes (3+ órdenes)
        Object.entries(mesasAgrupadas).forEach(([mesa, data]) => {
          if (data.count >= 3) {
            const tiempoUltimaOrden = (Date.now() - new Date(data.lastOrder).getTime()) / 60000;
            if (tiempoUltimaOrden < 60) { // Última orden hace menos de 1 hora
              agregarMensajeTicker({
                type: 'alert',
                icon: '🔥',
                text: `MESA CALIENTE: Mesa ${mesa} • ${data.count} órdenes • Revenue: ${formatMoney(data.total)} • Activa hace ${Math.round(tiempoUltimaOrden)}min`,
                priority: 'medium'
              });
            }
          }
        });
      }

      // 3. TENDENCIAS DE PAGO
      const { data: pagosHoy } = await supabase
        .from('poster_transactions')
        .select('payed_cash, payed_card')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${hoyStr} 00:00:00`);

      if (pagosHoy && pagosHoy.length > 0) {
        let efectivo = 0, tarjeta = 0;
        pagosHoy.forEach(p => {
          efectivo += parseFloat(p.payed_cash || '0');
          tarjeta += parseFloat(p.payed_card || '0');
        });
        
        const total = efectivo + tarjeta;
        const porcTarjeta = total > 0 ? (tarjeta / total * 100) : 0;
        const porcEfectivo = total > 0 ? (efectivo / total * 100) : 0;
        
        agregarMensajeTicker({
          type: 'trend',
          icon: '💳',
          text: `TENDENCIA PAGOS: ${porcTarjeta.toFixed(0)}% tarjeta, ${porcEfectivo.toFixed(0)}% efectivo • Total procesado: ${formatMoney(total)}`,
          priority: 'low'
        });
      }

      // 4. PROPINAS EXCEPCIONALES
      const { data: propinasHoy } = await supabase
        .from('poster_transactions')
        .select('table_id, tips_cash, tips_card, payed_sum, client_id')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${hoyStr} 00:00:00`)
        .or('tips_cash.gt.0,tips_card.gt.0');

      if (propinasHoy && propinasHoy.length > 0) {
        let totalPropinas = 0;
        propinasHoy.forEach(t => {
          const propina = parseFloat(t.tips_cash || '0') + parseFloat(t.tips_card || '0');
          totalPropinas += propina;
          const total = parseFloat(t.payed_sum || '0');
          const porcentaje = total > 0 ? (propina / total * 100) : 0;
          
          if (porcentaje > 20 && propina > 100) {
            agregarMensajeTicker({
              type: 'celebration',
              icon: '💰',
              text: `PROPINA EXCEPCIONAL: Mesa ${t.table_id} dejó ${porcentaje.toFixed(0)}% (${formatMoney(propina)}) • Agradecer al salir`,
              priority: 'high'
            });
          }
        });
        
        if (totalPropinas > 0) {
          agregarMensajeTicker({
            type: 'milestone',
            icon: '💵',
            text: `PROPINAS HOY: ${formatMoney(totalPropinas)} • ${propinasHoy.length} mesas dejaron propina`,
            priority: 'low'
          });
        }
      }

      // 5. RÉCORDS Y PREDICCIONES
      if (data.transaccionesHoy > 0) {
        const velocidadOrdenes = data.transaccionesHoy / (new Date().getHours() || 1);
        agregarMensajeTicker({
          type: 'record',
          icon: '⚡',
          text: `VELOCIDAD: ${velocidadOrdenes.toFixed(1)} órdenes/hora • ${data.transaccionesHoy} órdenes totales hoy`,
          priority: 'medium'
        });
      }

      // 6. PROYECCIONES
      if (data.ventasHoy > 0) {
        const horasRestantes = Math.max(0, 22 - new Date().getHours()); // Asumiendo cierre a las 10pm
        const ventasPorHora = data.ventasHoy / (new Date().getHours() - 8 || 1); // Asumiendo apertura 8am
        const proyeccion = data.ventasHoy + (ventasPorHora * horasRestantes);
        
        agregarMensajeTicker({
          type: 'prediction',
          icon: '📈',
          text: `PROYECCIÓN CIERRE: ${formatMoney(proyeccion)} • ${data.cambioVentas > 0 ? '+' : ''}${data.cambioVentas.toFixed(0)}% vs ayer`,
          priority: 'low'
        });
      }

      // 7. PRODUCTO ESTRELLA DEL DÍA
      if (topProductos && topProductos.length > 0) {
        const estrella = topProductos[0];
        agregarMensajeTicker({
          type: 'milestone',
          icon: '🌟',
          text: `PRODUCTO ESTRELLA: ${estrella.nombre} • ${estrella.cantidad} vendidos • ${formatMoney(estrella.ventas)} en ventas`,
          priority: 'medium'
        });
      }

      // 8. MARGEN DE GANANCIA
      if (data.ventasHoy > 0 && data.gananciaHoy > 0) {
        const margen = (data.gananciaHoy / data.ventasHoy) * 100;
        agregarMensajeTicker({
          type: margen > 30 ? 'milestone' : 'alert',
          icon: margen > 30 ? '✅' : '⚠️',
          text: `MARGEN OPERATIVO: ${margen.toFixed(1)}% • Ganancia: ${formatMoney(data.gananciaHoy)} de ${formatMoney(data.ventasHoy)}`,
          priority: margen > 30 ? 'low' : 'high'
        });
      }

      console.log('Datos inteligentes cargados completamente');

    } catch (error) {
      console.error('Error cargando datos inteligentes:', error);
    }
  };

  const agregarMensajeTicker = (mensaje: Omit<TickerMessage, 'id' | 'timestamp'>) => {
    const nuevoMensaje: TickerMessage = {
      ...mensaje,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    
    setTickerMessages(prev => {
      // Mantener máximo 20 mensajes, eliminar los más viejos
      const nuevos = [...prev, nuevoMensaje].sort((a, b) => {
        // Ordenar por prioridad y luego por timestamp
        const prioridadOrden = { high: 0, medium: 1, low: 2 };
        if (prioridadOrden[a.priority] !== prioridadOrden[b.priority]) {
          return prioridadOrden[a.priority] - prioridadOrden[b.priority];
        }
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      
      // Filtrar duplicados basados en texto similar
      const unicos = nuevos.filter((msg, index, self) =>
        index === self.findIndex((m) => 
          m.text.substring(0, 30) === msg.text.substring(0, 30) &&
          (msg.timestamp.getTime() - m.timestamp.getTime()) < 300000 // 5 minutos
        )
      );
      
      return unicos.slice(0, 20);
    });
  };

  const cargarDatos = async () => {
    try {
      const restaurantId = userData?.restaurantId || RESTAURANT_ID;
      
      // Usar fechas reales
      const hoy = new Date();
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      
      const hoyStr = hoy.toISOString().split('T')[0];
      const ayerStr = ayer.toISOString().split('T')[0];
      
      // Verificar si hay datos para hoy
      const { data: verificarHoy } = await supabase
        .from('poster_transactions')
        .select('transaction_id, date_close')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${hoyStr} 00:00:00`)
        .limit(1);
      
      let fechaTrabajo = hoy;
      let fechaAyerTrabajo = ayer;
      
      if (!verificarHoy || verificarHoy.length === 0) {
        // No hay datos de hoy, buscar última fecha con datos
        const { data: ultimaFechaData } = await supabase
          .from('poster_transactions')
          .select('date_close')
          .eq('restaurant_id', restaurantId)
          .order('date_close', { ascending: false })
          .limit(1);
        
        if (ultimaFechaData && ultimaFechaData.length > 0) {
          fechaTrabajo = new Date(ultimaFechaData[0].date_close);
          fechaAyerTrabajo = new Date(fechaTrabajo);
          fechaAyerTrabajo.setDate(fechaAyerTrabajo.getDate() - 1);
          setSinDatosHoy(true);
        }
      } else {
        setSinDatosHoy(false);
      }
      
      // Actualizar fecha de última sincronización
      setUltimaSincronizacion(fechaTrabajo);
      
      const trabajoHoyStr = fechaTrabajo.toISOString().split('T')[0];
      const trabajoAyerStr = fechaAyerTrabajo.toISOString().split('T')[0];
      
      // Today's sales (o última fecha con datos)
      const { data: ventasHoyData } = await supabase
        .from('poster_transactions')
        .select('payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoHoyStr} 00:00:00`)
        .lt('date_close', `${trabajoHoyStr} 23:59:59`);

      const totalHoy = ventasHoyData?.reduce((sum, t) => sum + parseFloat(t.payed_sum), 0) || 0;
      const transaccionesHoy = ventasHoyData?.length || 0;
      const ticketPromedio = transaccionesHoy > 0 ? totalHoy / transaccionesHoy : 0;

      // Yesterday's sales
      const { data: ventasAyerData } = await supabase
        .from('poster_transactions')
        .select('payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoAyerStr} 00:00:00`)
        .lt('date_close', `${trabajoAyerStr} 23:59:59`);

      const totalAyer = ventasAyerData?.reduce((sum, t) => sum + parseFloat(t.payed_sum), 0) || 0;

      // Week sales
      const inicioSemana = new Date(fechaTrabajo);
      inicioSemana.setDate(inicioSemana.getDate() - 7);
      
      const { data: ventasSemanaData } = await supabase
        .from('poster_transactions')
        .select('payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', inicioSemana.toISOString().split('T')[0]);

      const totalSemana = ventasSemanaData?.reduce((sum, t) => sum + parseFloat(t.payed_sum), 0) || 0;

      // Calculate change
      const cambioVentas = totalAyer > 0 ? ((totalHoy - totalAyer) / totalAyer * 100) : 0;
      const esPositivo = cambioVentas >= 0;

      // Calculate profits
      const { data: transaccionesCompletas } = await supabase
        .from('poster_transactions')
        .select('total_profit')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoHoyStr} 00:00:00`)
        .lt('date_close', `${trabajoHoyStr} 23:59:59`);

      const gananciaHoy = transaccionesCompletas?.reduce((sum, t) => sum + (t.total_profit / 100), 0) || 0;
      const comensalesHoy = Math.floor(transaccionesHoy * 1.2);

      setData({
        ventasHoy: totalHoy,
        ventasAyer: totalAyer,
        transaccionesHoy,
        ticketPromedio,
        ventasSemana: totalSemana,
        cambioVentas,
        esPositivo,
        gananciaHoy,
        comensalesHoy
      });

      // Top Products
      const { data: productosVendidos } = await supabase
        .from('poster_transaction_products')
        .select('product_id, product_sum')
        .eq('restaurant_id', restaurantId)
        .gte('imported_at', inicioSemana.toISOString());

      const productosAgrupados: { [key: string]: { ventas: number, transacciones: number, nombre?: string } } = {};
      
      productosVendidos?.forEach(item => {
        const id = item.product_id.toString();
        if (!productosAgrupados[id]) {
          productosAgrupados[id] = { ventas: 0, transacciones: 0 };
        }
        productosAgrupados[id].ventas += parseFloat(item.product_sum);
        productosAgrupados[id].transacciones += 1;
      });

      const productIds = Object.keys(productosAgrupados);
      if (productIds.length > 0) {
        const { data: productos } = await supabase
          .from('poster_products')
          .select('product_id, product_name')
          .in('product_id', productIds);

        productos?.forEach(p => {
          if (productosAgrupados[p.product_id]) {
            productosAgrupados[p.product_id].nombre = p.product_name;
          }
        });
      }

      const topProductosArray = Object.entries(productosAgrupados)
        .map(([id, data]) => ({
          nombre: data.nombre || `Producto ${id}`,
          cantidad: data.transacciones,
          ventas: data.ventas
        }))
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 10);

      const maxVentas = topProductosArray[0]?.ventas || 1;
      const topProductosConPorcentaje = topProductosArray.map(p => ({
        ...p,
        porcentaje: (p.ventas / maxVentas) * 100
      }));

      setTopProductos(topProductosConPorcentaje);

      // Sales by hour
      const { data: ventasPorHoraData } = await supabase
        .from('poster_transactions')
        .select('date_close, payed_sum')
        .eq('restaurant_id', restaurantId)
        .gte('date_close', `${trabajoHoyStr} 00:00:00`)
        .lt('date_close', `${trabajoHoyStr} 23:59:59`);

      const ventasPorHoraMap: { [key: string]: number } = {};
      for (let h = 0; h < 24; h++) {
        ventasPorHoraMap[h.toString()] = 0;
      }

      ventasPorHoraData?.forEach(t => {
        const hora = new Date(t.date_close).getHours();
        ventasPorHoraMap[hora.toString()] += parseFloat(t.payed_sum);
      });

      const ventasPorHoraArray = Object.entries(ventasPorHoraMap)
        .map(([hora, ventas]) => ({
          hora,
          ventas
        }))
        .filter(h => h.ventas > 0);

      setVentasPorHora(ventasPorHoraArray);

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-MX').format(num);
  };

  const getMaxSales = () => Math.max(...ventasPorHora.map(h => h.ventas));

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">INICIALIZANDO FUDI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* FUDI Chat Grid Background */}
      <FudiChatGrid 
        opacity={0.03} 
        gridSize={80} 
        animated={true}
        color="#fbbf24"
      />

      {/* FUDI Particle Field */}
      <canvas 
        ref={particleCanvasRef} 
        className="particle-canvas"
      />

      {/* FUDI Entity observando con Aura */}
      <div className="dashboard-entity">
        <FudiAura 
          variant="combined"
          color="#fbbf24"
          intensity={0.8}
          size={400}
          pulseSpeed={2}
          particleCount={25}
        />
        <FudiEntity 
          variant="mini" 
          mood="watching"
          followCursor={true}
          showDataStreams={true}
          showParticles={true}
          intensity={0.7}
        />
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="dashboard-greeting">
            <h1>
              Dashboard <span className="dashboard-username">{userData?.restaurantName}</span>
            </h1>
            <p className="dashboard-subtitle">
              Sistema Neural Activo • {ultimaSincronizacion ? (
                <>
                  {sinDatosHoy && <span className="alert-sync">⚠️ Mostrando: </span>}
                  {ultimaSincronizacion.toLocaleDateString('es-MX', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </>
              ) : (
                'Sincronizando...'
              )}
            </p>
          </div>
          <div className="header-stats">
            <span className="live-indicator">
              <span className="live-dot"></span>
              FUDI ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* FUDI INTELLIGENCE TICKER */}
        <div className="fudi-ticker">
          <div className="ticker-glow"></div>
          <div className="ticker-header">
            <div className="ticker-badge">
              <Brain className="ticker-icon" />
              <span className="ticker-label">FUDI INTELLIGENCE</span>
            </div>
            <div className="ticker-live">
              <span className="ticker-dot"></span>
              <span className="ticker-text">NEURAL ACTIVO</span>
            </div>
          </div>
          
          <div className="ticker-container">
            <div className="ticker-track">
              <div className="ticker-content">
                {/* Duplicamos los mensajes para efecto continuo */}
                {tickerMessages.length > 0 ? (
                  [...tickerMessages, ...tickerMessages].map((msg, index) => (
                    <div 
                      key={`${msg.id}-${index}`} 
                      className={`ticker-item ${msg.type}`}
                      data-priority={msg.priority}
                    >
                      <span className="ticker-item-icon">{msg.icon}</span>
                      <span className="ticker-item-text">{msg.text}</span>
                      <span className="ticker-item-separator">•</span>
                    </div>
                  ))
                ) : (
                  // Mensajes por defecto mientras carga
                  <>
                    <div className="ticker-item trend">
                      <span className="ticker-item-icon">🔄</span>
                      <span className="ticker-item-text">ANALIZANDO PATRONES DE DATOS...</span>
                      <span className="ticker-item-separator">•</span>
                    </div>
                    <div className="ticker-item prediction">
                      <span className="ticker-item-icon">📊</span>
                      <span className="ticker-item-text">SISTEMA NEURAL PROCESANDO...</span>
                      <span className="ticker-item-separator">•</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="main-grid">
          {/* Hero Card - Ingresos */}
          <div className="hero-card">
            <div className="hero-icon">
              <DollarSign size={28} />
            </div>
            <div className="hero-label">
              INGRESOS HOY
            </div>
            <div className="hero-number">
              {formatMoney(data.ventasHoy)}
            </div>
            <div className={`hero-trend ${data.esPositivo ? 'trend-positive' : 'trend-negative'}`}>
              {data.esPositivo ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
              <span>{data.esPositivo ? '+' : ''}{data.cambioVentas.toFixed(1)}%</span>
              <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>vs ayer</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="metric-grid">
            {/* Ganancias */}
            <div className="metric-card green">
              <div className="metric-icon">
                <TrendingUp size={28} />
              </div>
              <p className="metric-label">GANANCIAS</p>
              <p className="metric-value">
                {formatMoney(data.gananciaHoy)}
              </p>
              <p className="metric-trend">
                <ArrowUp size={14} /> +14%
              </p>
            </div>

            {/* Órdenes */}
            <div className="metric-card">
              <div className="metric-icon">
                <ShoppingCart size={28} />
              </div>
              <p className="metric-label">ÓRDENES</p>
              <p className="metric-value">
                {data.transaccionesHoy}
              </p>
              <p className="metric-trend">
                <ArrowUp size={14} /> +14%
              </p>
            </div>

            {/* Comensales */}
            <div className="metric-card purple">
              <div className="metric-icon">
                <Users size={28} />
              </div>
              <p className="metric-label">COMENSALES</p>
              <p className="metric-value">
                {data.comensalesHoy}
              </p>
              <p className="metric-trend">
                <ArrowUp size={14} /> +12%
              </p>
            </div>

            {/* Ticket Promedio */}
            <div className="metric-card gold">
              <div className="metric-icon">
                <Activity size={28} />
              </div>
              <p className="metric-label">TICKET PROMEDIO</p>
              <p className="metric-value">
                {formatMoney(data.ticketPromedio)}
              </p>
              <p className="metric-trend">
                <ArrowUp size={14} /> +1%
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="chart-section">
            {/* Ventas por Hora */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <Clock size={16} />
                  FLUJO DE VENTAS • POR HORA
                </h3>
                <span className="live-indicator">
                  <span className="live-dot"></span>
                  TIEMPO REAL
                </span>
              </div>
              
              <div className="chart-container">
                <div className="chart-grid">
                  {ventasPorHora.map((hora, index) => (
                    <div
                      key={index}
                      className="chart-bar"
                      style={{
                        height: `${(hora.ventas / getMaxSales()) * 100}%`
                      }}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar === index && (
                        <div className="chart-tooltip">
                          {formatMoney(hora.ventas)}
                        </div>
                      )}
                      <span className="chart-label">
                        {hora.hora}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Productos */}
            <div className="products-list">
              <h3 className="products-header">
                <TrendingUp size={16} />
                PRODUCTOS TOP
              </h3>
              <p className="products-subtext">
                Últimos 7 días • Por ingresos
              </p>
              
              {topProductos.slice(0, 7).map((producto, index) => (
                <div key={index} className="product-row">
                  <div className={`rank-badge ${index === 0 ? 'top' : ''}`}>
                    #{index + 1}
                  </div>
                  <div className="product-info">
                    <p className="product-name">
                      {producto.nombre}
                    </p>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${index === 0 ? 'gold' : ''}`}
                        style={{ width: `${producto.porcentaje}%` }}
                      />
                    </div>
                  </div>
                  <div className="product-metrics">
                    <div className={`product-value ${index === 0 ? 'gold' : ''}`}>
                      {producto.cantidad}
                      <span className="product-unit">ventas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="bottom-stats">
            {/* Métodos de Pago */}
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <CreditCard />
              </div>
              <h4 className="stat-label">
                MÉTODOS DE PAGO
              </h4>
              <div className="stat-value" style={{ color: '#10b981' }}>
                97.7%
              </div>
              <p className="stat-subtext">Efectivo</p>
            </div>

            {/* Plataforma */}
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00ffff' }}>
                <Store />
              </div>
              <h4 className="stat-label">
                PLATAFORMA
              </h4>
              <div className="stat-value" style={{ color: '#00ffff' }}>
                100%
              </div>
              <p className="stat-subtext">En Sucursal</p>
            </div>

            {/* Semana */}
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                <Calendar />
              </div>
              <h4 className="stat-label">
                ACUMULADO SEMANA
              </h4>
              <div className="stat-value" style={{ color: '#a855f7' }}>
                {formatMoney(data.ventasSemana)}
              </div>
              <p className="stat-subtext">7 días</p>
            </div>
          </div>
        </div>
      </main>

      {/* FUDI Consciousness Indicator */}
      <div className="fudi-presence">
        <div ref={fudiEyeRef} className="fudi-eye">
          <div className="fudi-pupil" />
        </div>
      </div>
    </div>
  );
}