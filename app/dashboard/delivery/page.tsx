'use client';

import React, { useState } from 'react';
import { 
  Package, DollarSign, Clock, TrendingUp, Phone, 
  CheckCircle, AlertCircle, Timer, Star, Truck,
  Play, MoreVertical, MapPin, Bell, Settings,
  Plus, Users, Activity
} from 'lucide-react';

// Import FUDIVERSE Components
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiSignature } from '@/components/fudiverse/FudiSignature';

// ==================== TYPES ====================
interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    avatar: string;
  };
  items: { name: string; quantity: number; price: number; }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  priority: 'low' | 'medium' | 'high';
  orderTime: string;
  estimatedTime: string;
}

interface Stats {
  todayRevenue: number;
  activeOrders: number;
  avgTime: number;
  satisfaction: number;
  completedOrders: number;
  cancelledOrders: number;
}

// ==================== MOCK DATA ====================
const mockStats: Stats = {
  todayRevenue: 2847,
  activeOrders: 8,
  avgTime: 28,
  satisfaction: 4.8,
  completedOrders: 23,
  cancelledOrders: 1
};

const mockOrders: Order[] = [
  {
    id: 'FD-2024-001',
    customer: {
      name: 'Carlos Hernández',
      phone: '+52 81 1234 5678',
      address: 'Av. Constitución 950, Centro',
      avatar: '👨‍💼'
    },
    items: [
      { name: 'Tacos de Pastor (3x)', quantity: 1, price: 75 },
      { name: 'Quesadilla Grande', quantity: 1, price: 55 }
    ],
    total: 130.00,
    status: 'confirmed',
    priority: 'high',
    orderTime: '14:30',
    estimatedTime: '15:15'
  },
  {
    id: 'FD-2024-002',
    customer: {
      name: 'María González',
      phone: '+52 81 9876 5432',
      address: 'Calle Morelos 234, Col. Centro',
      avatar: '👩‍🦱'
    },
    items: [
      { name: 'Combo Familiar', quantity: 1, price: 320 }
    ],
    total: 320.00,
    status: 'preparing',
    priority: 'medium',
    orderTime: '14:45',
    estimatedTime: '15:30'
  },
  {
    id: 'FD-2024-003',
    customer: {
      name: 'Ana Rodríguez',
      phone: '+52 81 1111 2222',
      address: 'Col. San Pedro, Calle Luna 456',
      avatar: '👩‍💻'
    },
    items: [
      { name: 'Bowl Saludable', quantity: 2, price: 120 }
    ],
    total: 240.00,
    status: 'ready',
    priority: 'medium',
    orderTime: '14:15',
    estimatedTime: '15:00'
  }
];

// ==================== MAIN COMPONENT ====================
export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('fudi_token');
    window.location.href = '/';
  };

  // Status helpers
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'preparing': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'ready': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'delivered': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmado', 
      'preparing': 'Preparando',
      'ready': 'Listo',
      'delivered': 'Entregado'
    };
    return statusMap[status] || status;
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
      color: 'rgba(255, 255, 255, 0.98)',
      background: 'transparent'
    }}>
      
      {/* Background */}
      <FudiBackground 
        variant="gradient"
        theme="business"
        opacity={1}
        fixed={true}
      />

      {/* Header */}
      <FudiDashHeader 
        currentModule="delivery" 
        userName="Chef Pro"
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main style={{
        marginTop: '70px',
        padding: '1rem',
        maxWidth: '900px',
        margin: '70px auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>

        {/* Header Section */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '18px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <FudiSignature size="large" showPulse={true} animated={true} />
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: '800',
            margin: '1rem 0 0.5rem 0',
            background: 'linear-gradient(135deg, #ff6b35, #00bcd4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            fudi-delivery
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            Centro de Control • {orders.filter(o => o.status !== 'delivered').length} órdenes activas
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem'
        }}>
          {/* Revenue */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Ventas Hoy</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#10b981' }}>${mockStats.todayRevenue.toLocaleString()}</p>
              </div>
              <DollarSign size={20} style={{ color: '#10b981' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', width: '75%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Active Orders */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Órdenes Activas</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#ff6b35' }}>{mockStats.activeOrders}</p>
              </div>
              <Package size={20} style={{ color: '#ff6b35' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b35, #e55a2b)', width: '60%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Average Time */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Tiempo Promedio</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#3b82f6' }}>{mockStats.avgTime}m</p>
              </div>
              <Clock size={20} style={{ color: '#3b82f6' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #2563eb)', width: '70%', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Satisfaction */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 0.25rem 0' }}>Satisfacción</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#f59e0b' }}>{mockStats.satisfaction}★</p>
              </div>
              <Star size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)', width: '96%', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} style={{ color: '#ff6b35' }} />
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Órdenes en Tiempo Real</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#3b82f6',
              cursor: 'pointer'
            }}>
              <Bell size={16} />
            </button>
            <button style={{
              background: 'rgba(255, 107, 53, 0.1)',
              border: '1px solid rgba(255, 107, 53, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#ff6b35',
              cursor: 'pointer'
            }}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Orders Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
            >
              {/* Order Header */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>{order.id}</h3>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: '1px solid',
                        ...(() => {
                          const colors = getStatusColor(order.status);
                          return { background: colors.split(' ')[0].replace('bg-', ''), color: colors.split(' ')[1].replace('text-', ''), borderColor: colors.split(' ')[2].replace('border-', '') };
                        })()
                      }}>
                        {getStatusText(order.status)}
                      </span>
                      {order.priority === 'high' && (
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <AlertCircle size={10} />
                          Urgente
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{order.customer.avatar}</span>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>{order.customer.name}</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>{order.customer.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Total</p>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '700' }}>${order.total.toFixed(2)}</p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px'
                    }}>
                      <Clock size={12} />
                      <span>{order.orderTime} → {order.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'confirmed');
                        }}
                        style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#10b981',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <CheckCircle size={14} />
                        Confirmar
                      </button>
                      <button style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Rechazar
                      </button>
                    </>
                  )}
                  
                  {order.status === 'confirmed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order.id, 'preparing');
                      }}
                      style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        color: '#3b82f6',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Play size={14} />
                      Iniciar Preparación
                    </button>
                  )}
                  
                  {order.status === 'preparing' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order.id, 'ready');
                      }}
                      style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#f59e0b',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <CheckCircle size={14} />
                      Marcar Listo
                    </button>
                  )}
                  
                  {order.status === 'ready' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order.id, 'delivered');
                      }}
                      style={{
                        background: 'rgba(139, 92, 246, 0.15)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        color: '#8b5cf6',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Truck size={14} />
                      Entregado
                    </button>
                  )}

                  <button style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Phone size={14} />
                  </button>
                  <button style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOrder === order.id && (
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '600' }}>Artículos</h5>
                    {order.items.map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '6px',
                        marginBottom: '0.25rem',
                        fontSize: '0.85rem'
                      }}>
                        <span>{item.name}</span>
                        <span style={{ color: '#ff6b35', fontWeight: '600' }}>${item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    padding: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px'
                  }}>
                    <MapPin size={14} style={{ color: '#00bcd4' }} />
                    <span>{order.customer.address}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom spacing for mobile */}
        <div style={{ height: '2rem' }}></div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div style={{
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.75rem',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100
      }}>
        <button style={{ background: 'transparent', border: 'none', color: '#ff6b35', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Package size={20} />
          Órdenes
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Truck size={20} />
          Entregas
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Activity size={20} />
          Análisis
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem' }}>
          <Settings size={20} />
          Config
        </button>
      </div>

      {/* Floating Action Button */}
      <button style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1.5rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff6b35, #00bcd4)',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <Plus size={24} />
      </button>
    </div>
  );
}