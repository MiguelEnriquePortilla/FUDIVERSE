'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus, FileText, DollarSign, Users, Archive, Settings, Brain, 
  ChefHat, Receipt, Briefcase, Filter, Star, Clock, Eye, Download, 
  Share2, MoreHorizontal, MessageCircle, Sparkles, Folder, Grid3X3,
  List, SortDesc, Upload, Bookmark, Tag, Calendar, TrendingUp, Mic, 
  Send, X, Minimize2, Maximize2, Zap, Home, Building2, ClipboardList,
  Package, Shield, BarChart3, Wrench, Menu, Bell, UserCircle, AlertCircle
} from 'lucide-react';
import { FudiDashHeader } from '@/components/fudiverse/FudiDashHeader';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import '@/styles/pages/FudiVault.css';

export default function FudiVaultOffice() {
  // Main states
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents, setDocuments] = useState<any[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  
  // Mobile states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRightPanelOpen, setMobileRightPanelOpen] = useState(false);
  
  // ASK FUDI States
  const [isFudiOpen, setIsFudiOpen] = useState(false);
  const [fudiMessages, setFudiMessages] = useState<any[]>([]);
  const [fudiInput, setFudiInput] = useState('');
  const [isFudiTyping, setIsFudiTyping] = useState(false);
  
  const fudiInputRef = useRef<HTMLInputElement>(null);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    try {
      localStorage.removeItem('fudi_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('restaurant_data');
      localStorage.removeItem('dashboard_cache');
      console.log('Logout successful - redirecting to home');
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout process:', error);
      window.location.href = '/';
    }
  };

  // 🏢 CATEGORÍAS DE OFICINA - RESTAURANTE
  const officeCategories = [
    { 
      id: 'all', 
      label: 'Todos los documentos', 
      icon: Home, 
      count: 89,
      description: 'Vista general de todos los documentos'
    },
    { 
      id: 'operations', 
      label: 'Operaciones Diarias', 
      icon: ClipboardList, 
      count: 23,
      color: '#06b6d4',
      description: 'Checklists, procedimientos, turnos'
    },
    { 
      id: 'finances', 
      label: 'Finanzas & Contabilidad', 
      icon: DollarSign, 
      count: 18,
      color: '#10b981',
      description: 'Facturas, gastos, reportes, impuestos'
    },
    { 
      id: 'staff', 
      label: 'Personal & RH', 
      icon: Users, 
      count: 15,
      color: '#ec4899',
      description: 'Contratos, horarios, capacitaciones'
    },
    { 
      id: 'kitchen', 
      label: 'Cocina & Menú', 
      icon: ChefHat, 
      count: 31,
      color: '#f97316',
      description: 'Recetas, costos, especificaciones'
    },
    { 
      id: 'inventory', 
      label: 'Inventarios & Compras', 
      icon: Package, 
      count: 12,
      color: '#8b5cf6',
      description: 'Stock, pedidos, recibos, mermas'
    },
    { 
      id: 'legal', 
      label: 'Administración Legal', 
      icon: Shield, 
      count: 8,
      color: '#ef4444',
      description: 'Licencias, permisos, seguros'
    },
    { 
      id: 'reports', 
      label: 'Reportes & Control', 
      icon: BarChart3, 
      count: 14,
      color: '#06b6d4',
      description: 'Ventas, análisis, métricas'
    },
    { 
      id: 'maintenance', 
      label: 'Mantenimiento', 
      icon: Wrench, 
      count: 6,
      color: '#84cc16',
      description: 'Equipos, reparaciones, checklist'
    }
  ];

  // 📄 MOCK DOCUMENTS DATA - RESTAURANTE
  const generateOfficeDocuments = () => {
    return [
      {
        id: '1', 
        name: 'Manual de Apertura Diaria', 
        type: 'pdf', 
        category: 'operations',
        size: '2.1 MB', 
        modified: '2 horas', 
        preview: '/api/placeholder/400/300',
        description: 'Procedimientos estándar para apertura del restaurante. Incluye checklist de limpieza, verificación de equipos y preparación inicial.',
        tags: ['apertura', 'procedimientos', 'diario'], 
        status: 'active',
        author: 'Chef Miguel',
        views: 245,
        isStarred: true
      },
      {
        id: '2', 
        name: 'Receta Secreta - Salsa de la Casa', 
        type: 'markdown', 
        category: 'kitchen',
        size: '156 KB', 
        modified: '4 horas', 
        preview: '/api/placeholder/400/300',
        description: 'Receta exclusiva de la salsa de la casa. Tiempo de preparación: 45 min. Rendimiento: 2 litros.',
        tags: ['receta', 'secreta', 'salsa'], 
        status: 'confidential',
        author: 'Chef Ana',
        views: 89,
        isStarred: true
      },
      {
        id: '3', 
        name: 'Reporte Fiscal Diciembre 2024', 
        type: 'excel', 
        category: 'finances',
        size: '890 KB', 
        modified: '1 día', 
        preview: '/api/placeholder/400/300',
        description: 'Declaración fiscal mensual con desglose de ventas, gastos deducibles e impuestos.',
        tags: ['fiscal', 'diciembre', 'sat'], 
        status: 'pending',
        author: 'Contador López',
        views: 23,
        isStarred: false
      },
      {
        id: '4', 
        name: 'Contrato - Proveedor Carnes Premium', 
        type: 'pdf', 
        category: 'inventory',
        size: '1.2 MB', 
        modified: '3 días', 
        preview: '/api/placeholder/400/300',
        description: 'Contrato anual con CarnesSelect para suministro de cortes premium. Vigencia hasta dic 2025.',
        tags: ['contrato', 'proveedor', 'carnes'], 
        status: 'signed',
        author: 'Administración',
        views: 67,
        isStarred: false
      },
      {
        id: '5', 
        name: 'Horarios del Personal - Enero', 
        type: 'excel', 
        category: 'staff',
        size: '234 KB', 
        modified: '1 semana', 
        preview: '/api/placeholder/400/300',
        description: 'Programación de turnos para todo el personal del restaurante durante enero 2025.',
        tags: ['horarios', 'personal', 'enero'], 
        status: 'approved',
        author: 'RH - Carmen',
        views: 156,
        isStarred: false
      },
      {
        id: '6', 
        name: 'Licencia de Funcionamiento', 
        type: 'pdf', 
        category: 'legal',
        size: '1.8 MB', 
        modified: '2 semanas', 
        preview: '/api/placeholder/400/300',
        description: 'Licencia municipal vigente. Renovación automática. Próximo vencimiento: marzo 2026.',
        tags: ['licencia', 'funcionamiento', 'municipal'], 
        status: 'valid',
        author: 'Legal',
        views: 34,
        isStarred: true
      },
      {
        id: '7', 
        name: 'Análisis de Ventas - Semana 3', 
        type: 'pdf', 
        category: 'reports',
        size: '945 KB', 
        modified: '3 días', 
        preview: '/api/placeholder/400/300',
        description: 'Reporte semanal de ventas con comparativo vs semana anterior y análisis de platillos estrella.',
        tags: ['ventas', 'semanal', 'análisis'], 
        status: 'recent',
        author: 'Analytics',
        views: 78,
        isStarred: false
      },
      {
        id: '8', 
        name: 'Checklist Mantenimiento Enero', 
        type: 'excel', 
        category: 'maintenance',
        size: '423 KB', 
        modified: '5 días', 
        preview: '/api/placeholder/400/300',
        description: 'Lista de verificación mensual para mantenimiento preventivo de todos los equipos.',
        tags: ['mantenimiento', 'equipos', 'preventivo'], 
        status: 'in_progress',
        author: 'Mantenimiento',
        views: 45,
        isStarred: false
      }
    ];
  };

  // Initialize documents
  useEffect(() => {
    setDocuments(generateOfficeDocuments());
  }, []);

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get current category info
  const currentCategory = officeCategories.find(cat => cat.id === selectedCategory) || officeCategories[0];

  // Get file type icon and color
  const getFileTypeInfo = (type: string) => {
    switch (type) {
      case 'pdf': return { icon: '📄', color: '#ef4444' };
      case 'excel': return { icon: '📊', color: '#10b981' };
      case 'markdown': return { icon: '📝', color: '#06b6d4' };
      case 'word': return { icon: '📄', color: '#2563eb' };
      default: return { icon: '📄', color: '#6b7280' };
    }
  };

  // Get status info
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active': return { color: '#10b981', text: 'Activo' };
      case 'pending': return { color: '#f59e0b', text: 'Pendiente' };
      case 'confidential': return { color: '#ef4444', text: 'Confidencial' };
      case 'signed': return { color: '#06b6d4', text: 'Firmado' };
      case 'approved': return { color: '#10b981', text: 'Aprobado' };
      case 'valid': return { color: '#10b981', text: 'Vigente' };
      case 'recent': return { color: '#8b5cf6', text: 'Reciente' };
      case 'in_progress': return { color: '#f59e0b', text: 'En Proceso' };
      default: return { color: '#6b7280', text: 'Normal' };
    }
  };

  // Handle FUDI quick responses
  const handleFudiQuickResponse = (query: string) => {
    const responses = [
      "📊 Encontré 3 reportes de ventas de esta semana. ¿Cuál necesitas revisar?",
      "🍳 Tu receta de salsa secreta está en la carpeta de Cocina. ¿La abro?",
      "💰 Tienes 2 facturas pendientes de aprobar y 1 reporte fiscal por enviar.",
      "👥 El horario de enero ya está listo. ¿Necesitas hacer algún ajuste?",
      "📋 Faltan 3 items en el checklist de mantenimiento de esta semana."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // LEFT SIDEBAR - FACEBOOK STYLE
  const LeftSidebar = () => (
    <div className={`office-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* User Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          <UserCircle size={40} />
        </div>
        <div className="profile-info">
          <h3>Restaurante Los Compadres</h3>
          <p>Mikelon - Administrador</p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="sidebar-search">
        <div className="search-container">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="sidebar-actions">
        <button className="action-button primary">
          <Plus size={16} />
          <span>Nuevo Documento</span>
        </button>
        <button className="action-button secondary">
          <Upload size={16} />
          <span>Subir Archivo</span>
        </button>
      </div>

      {/* Categories Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section">
          <h4>Mi Oficina</h4>
          <div className="nav-items">
            {officeCategories.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  title={category.description}
                >
                  <div className="nav-icon" style={{ color: category.color || '#6b7280' }}>
                    <IconComponent size={20} />
                  </div>
                  <div className="nav-content">
                    <span className="nav-label">{category.label}</span>
                    <span className="nav-description">{category.description}</span>
                  </div>
                  <span className="nav-count">{category.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="nav-section">
          <h4>Actividad Reciente</h4>
          <div className="recent-items">
            <div className="recent-item">
              <div className="recent-icon">📄</div>
              <div className="recent-info">
                <span>Manual de Apertura</span>
                <small>Editado hace 2h</small>
              </div>
            </div>
            <div className="recent-item">
              <div className="recent-icon">📊</div>
              <div className="recent-info">
                <span>Reporte de Ventas</span>
                <small>Creado hace 1d</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="footer-button">
          <Settings size={16} />
          <span>Configuración</span>
        </button>
      </div>
    </div>
  );

  // DOCUMENT CARD - FACEBOOK POST STYLE
  const DocumentCard = ({ doc }: { doc: any }) => {
    const fileInfo = getFileTypeInfo(doc.type);
    const statusInfo = getStatusInfo(doc.status);
    
    return (
      <div className="document-card-office">
        {/* Card Header */}
        <div className="card-header">
          <div className="doc-author">
            <div className="author-avatar">
              <UserCircle size={32} />
            </div>
            <div className="author-info">
              <h4>{doc.author}</h4>
              <span className="doc-timestamp">Editado hace {doc.modified}</span>
            </div>
          </div>
          
          <div className="card-actions">
            <button className="action-btn">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="doc-preview-office">
          <div className="preview-container">
            <div className="preview-placeholder">
              <div className="file-type-indicator" style={{ color: fileInfo.color }}>
                <span className="file-icon">{fileInfo.icon}</span>
                <span className="file-type">{doc.type.toUpperCase()}</span>
              </div>
              <div className="preview-overlay">
                <button className="preview-action">
                  <Eye size={20} />
                  Ver documento
                </button>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="status-badge" style={{ backgroundColor: statusInfo.color }}>
            {statusInfo.text}
          </div>
        </div>

        {/* Document Info */}
        <div className="doc-content">
          <h3 className="doc-title">{doc.name}</h3>
          <p className="doc-description">{doc.description}</p>
          
          <div className="doc-meta">
            <div className="meta-item">
              <span className="meta-label">Tamaño:</span>
              <span className="meta-value">{doc.size}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Vistas:</span>
              <span className="meta-value">{doc.views}</span>
            </div>
          </div>

          <div className="doc-tags">
            {doc.tags.map((tag: string, idx: number) => (
              <span key={idx} className="tag-office">{tag}</span>
            ))}
          </div>
        </div>

        {/* Card Footer - Actions */}
        <div className="card-footer">
          <button className={`footer-action ${doc.isStarred ? 'starred' : ''}`}>
            <Star size={16} />
            <span>{doc.isStarred ? 'Destacado' : 'Destacar'}</span>
          </button>
          
          <button className="footer-action">
            <Share2 size={16} />
            <span>Compartir</span>
          </button>
          
          <button className="footer-action">
            <Download size={16} />
            <span>Descargar</span>
          </button>
          
          <button className="footer-action">
            <MessageCircle size={16} />
            <span>Comentar</span>
          </button>
        </div>
      </div>
    );
  };

  // RIGHT PANEL - ADMINISTRATIVE ASSISTANT MODULE
  const RightPanel = () => (
    <div className={`office-right-panel ${rightPanelCollapsed ? 'collapsed' : ''}`}>
      {/* Assistant Header */}
      <div className="assistant-header">
        <div className="assistant-avatar">
          <Brain size={24} />
        </div>
        <div className="assistant-info">
          <h3>Asistente Administrativo</h3>
          <p>FUDI Office AI</p>
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
        >
          <Minimize2 size={16} />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="office-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-number">89</span>
            <span className="stat-label">Documentos</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <span className="stat-number">3</span>
            <span className="stat-label">Pendientes</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <span className="stat-number">12</span>
            <span className="stat-label">Destacados</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="office-notifications">
        <h4>Notificaciones</h4>
        <div className="notification-list">
          <div className="notification-item urgent">
            <AlertCircle size={16} />
            <div className="notification-content">
              <span>Licencia municipal vence en 15 días</span>
              <small>Administración Legal</small>
            </div>
          </div>
          
          <div className="notification-item">
            <Clock size={16} />
            <div className="notification-content">
              <span>3 reportes fiscales pendientes</span>
              <small>Finanzas & Contabilidad</small>
            </div>
          </div>
          
          <div className="notification-item">
            <Users size={16} />
            <div className="notification-content">
              <span>Horarios de febrero por aprobar</span>
              <small>Personal & RH</small>
            </div>
          </div>
        </div>
      </div>

      {/* Quick FUDI Chat */}
      <div className="quick-fudi">
        <h4>Pregúntale a FUDI</h4>
        <div className="fudi-input-quick">
          <input 
            ref={fudiInputRef}
            type="text" 
            placeholder="¿Dónde está mi...?"
            value={fudiInput}
            onChange={(e) => setFudiInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuickFudi()}
          />
          <button onClick={handleQuickFudi}>
            <Send size={14} />
          </button>
        </div>
        
        {fudiMessages.length > 0 && (
          <div className="fudi-last-response">
            <p>{fudiMessages[fudiMessages.length - 1]?.content}</p>
          </div>
        )}
        
        <button 
          className="full-fudi-btn"
          onClick={() => window.location.href = '/dashboard/chat'}
        >
          <MessageCircle size={14} />
          Chat completo con FUDI
          <Sparkles size={12} />
        </button>
      </div>

      {/* Placeholder for future modules */}
      <div className="module-placeholder">
        <div className="placeholder-icon">🔧</div>
        <h4>Módulos Adicionales</h4>
        <p>Próximamente: Analytics avanzado, integración con proveedores, y más herramientas administrativas.</p>
      </div>
    </div>
  );

  // Handle quick FUDI interaction
  const handleQuickFudi = () => {
    if (!fudiInput.trim()) return;
    
    const response = {
      content: handleFudiQuickResponse(fudiInput),
      timestamp: new Date()
    };
    
    setFudiMessages(prev => [...prev, response]);
    setFudiInput('');
  };

  // MAIN CONTENT AREA
  const MainContent = () => (
    <div className="office-main-content">
      {/* Content Header */}
      <div className="content-header-office">
        <div className="header-left">
          <div className="category-indicator" style={{ color: currentCategory.color || '#6b7280' }}>
            {currentCategory.icon && <currentCategory.icon size={24} />}
          </div>
          <div className="header-info">
            <h1>{currentCategory.label}</h1>
            <p>{currentCategory.description} • {filteredDocuments.length} documentos</p>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
          
          <button className="filter-button">
            <Filter size={16} />
            Filtros
          </button>
          
          <button className="sort-button">
            <SortDesc size={16} />
            Ordenar
          </button>
        </div>
      </div>

      {/* Documents Feed */}
      <div className={`documents-feed ${viewMode}`}>
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))
        ) : (
          <div className="empty-office-state">
            <div className="empty-icon">📂</div>
            <h3>No hay documentos en esta categoría</h3>
            <p>Sube tu primer documento o cambia los filtros de búsqueda</p>
            <button className="empty-action-btn">
              <Plus size={16} />
              Agregar Documento
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => (
    <div className="mobile-bottom-nav">
      <button 
        className={`mobile-nav-btn ${!mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Home size={20} />
        <span>Inicio</span>
      </button>
      
      <button 
        className={`mobile-nav-btn ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu size={20} />
        <span>Menú</span>
      </button>
      
      <button className="mobile-nav-btn">
        <Search size={20} />
        <span>Buscar</span>
      </button>
      
      <button 
        className={`mobile-nav-btn ${mobileRightPanelOpen ? 'active' : ''}`}
        onClick={() => setMobileRightPanelOpen(!mobileRightPanelOpen)}
      >
        <Bell size={20} />
        <span>Avisos</span>
      </button>
    </div>
  );

  return (
    <div className="vault-office-container">
      <FudiBackground variant="minimal" theme="Light" intensity={0.03} opacity={1} fixed={true} />
      
      <FudiDashHeader 
        currentModule="vault" 
        userName="Mikelon" 
        userPlan="pro" 
        notifications={3} 
        onLogout={handleLogout} 
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <LeftSidebar />
          </div>
        </div>
      )}

      {/* Mobile Right Panel Overlay */}
      {mobileRightPanelOpen && (
        <div className="mobile-panel-overlay" onClick={() => setMobileRightPanelOpen(false)}>
          <div className="mobile-panel-content" onClick={(e) => e.stopPropagation()}>
            <RightPanel />
          </div>
        </div>
      )}

      {/* Main 3-Column Layout */}
      <div className="office-layout">
        <LeftSidebar />
        <MainContent />
        <RightPanel />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}