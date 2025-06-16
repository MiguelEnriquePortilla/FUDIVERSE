'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Search, Plus, BookOpen, FileText, DollarSign, Users,
  BarChart3, Archive, Settings, Brain, Clock, Star, Filter,
  ChefHat, Receipt, Briefcase, TrendingUp, AlertCircle, CheckCircle,
  Phone, Mail, MapPin, Globe, Zap, Crown, Target, Activity,
  PlusCircle, Edit3, Copy, Download, Share2, Heart, Eye,
  ArrowRight, ArrowLeft, MoreHorizontal, Mic, Bell, Sun, Moon
} from 'lucide-react';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import '@/styles/pages/FudiVault.css';

interface Section {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  urgent: number;
  description: string;
}

interface AgendaItem {
  time: string;
  title: string;
  type: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  fudiNote?: string;
  location?: string;
  contact?: string;
  phone?: string;
  documents?: string[];
  autoActions?: string[];
  linkedRecipes?: string[];
  candidates?: string[];
}

interface Suggestion {
  type: string;
  title: string;
  message: string;
  action: string;
  urgency: 'high' | 'medium' | 'low';
  icon: React.ComponentType<{ size?: number }>;
}

interface Document {
  name: string;
  type: string;
  section: string;
  modified: string;
  fudiTags: string[];
  size: string;
  status: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export default function FudiVaultFilofax() {
  const [activeSection, setActiveSection] = useState('agenda');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [fudiListening, setFudiListening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [fudiPanelOpen, setFudiPanelOpen] = useState(false);
  const [fudiPanelExpanded, setFudiPanelExpanded] = useState(false);

  // FUDI sections with smart organization
  const sections: Section[] = [
    {
      id: 'agenda',
      name: 'Agenda',
      icon: Calendar,
      color: '#00ffff',
      urgent: 3,
      description: 'Tu día organizado por FUDI'
    },
    {
      id: 'contratos',
      name: 'Contratos',
      icon: FileText,
      color: '#8b5cf6',
      urgent: 1,
      description: 'Documentos legales y acuerdos'
    },
    {
      id: 'facturas',
      name: 'Facturas',
      icon: Receipt,
      color: '#10b981',
      urgent: 0,
      description: 'Gastos e ingresos'
    },
    {
      id: 'recetas',
      name: 'Recetas',
      icon: ChefHat,
      color: '#f97316',
      urgent: 0,
      description: 'Tu arsenal culinario'
    },
    {
      id: 'finanzas',
      name: 'Finanzas',
      icon: DollarSign,
      color: '#eab308',
      urgent: 2,
      description: 'P&L y cash flow'
    },
    {
      id: 'staff',
      name: 'Staff',
      icon: Users,
      color: '#ec4899',
      urgent: 1,
      description: 'Tu equipo y recursos humanos'
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: Brain,
      color: '#06b6d4',
      urgent: 0,
      description: 'Análisis e inteligencia de FUDI'
    },
    {
      id: 'archivo',
      name: 'Archivo',
      icon: Archive,
      color: '#64748b',
      urgent: 0,
      description: 'Historial y documentos antiguos'
    }
  ];

  // Today's agenda items with FUDI intelligence
  const agendaItems: AgendaItem[] = [
    {
      time: '09:00',
      title: 'Reunión Proveedor Carne Premium',
      type: 'meeting',
      priority: 'urgent',
      fudiNote: 'FUDI sugiere: Negocia precios por volumen, el mercado está al alza',
      location: 'Oficina principal',
      contact: 'Carlos Mendoza',
      phone: '555-0123'
    },
    {
      time: '11:30',
      title: 'Revisar Costos Menú Diciembre',
      type: 'task',
      priority: 'high',
      fudiNote: 'Maíz subió 15%, considera ajustar precios de tacos',
      documents: ['Menu_Costs_Nov.xlsx', 'Supplier_Prices_Dec.pdf']
    },
    {
      time: '14:00',
      title: 'Entrevista Chef Asistente',
      type: 'interview',
      priority: 'medium',
      fudiNote: 'Candidato fuerte en parrilla, débil en repostería',
      candidates: ['María González', 'Roberto Silva']
    },
    {
      time: '16:00',
      title: '⚠️ SAT Deadline Reminder',
      type: 'deadline',
      priority: 'urgent',
      fudiNote: 'Formulario R1 listo en sección Contratos, solo falta firma',
      autoActions: ['Open SAT Form', 'Prepare Documents']
    },
    {
      time: '18:30',
      title: 'Planning Menú Navideño',
      type: 'planning',
      priority: 'medium',
      fudiNote: 'Basado en ventas 2023: Bacalao +340%, Romeritos +89%',
      linkedRecipes: ['Bacalao Navideño', 'Romeritos Premium', 'Ponche Especial']
    }
  ];

  // Recent documents with smart categorization
  const recentDocs: Document[] = [
    {
      name: 'Contrato_AcmeFoods_2024.pdf',
      type: 'contract',
      section: 'contratos',
      modified: '2 horas',
      fudiTags: ['proveedor', 'carne', 'urgente'],
      size: '2.4 MB',
      status: 'pending_signature'
    },
    {
      name: 'Receta_Taco_Supremo_v3.md',
      type: 'recipe',
      section: 'recetas',
      modified: '5 horas',
      fudiTags: ['bestseller', 'high-margin', 'trending'],
      size: '156 KB',
      status: 'updated'
    },
    {
      name: 'SAT_Formulario_R1_Dic2024.pdf',
      type: 'form',
      section: 'contratos',
      modified: '1 día',
      fudiTags: ['sat', 'deadline', 'ready'],
      size: '890 KB',
      status: 'ready'
    },
    {
      name: 'Análisis_Competencia_Local.xlsx',
      type: 'analysis',
      section: 'insights',
      modified: '3 días',
      fudiTags: ['intel', 'precios', 'competencia'],
      size: '4.1 MB',
      status: 'completed'
    }
  ];

  // FUDI smart suggestions
  const fudiSuggestions: Suggestion[] = [
    {
      type: 'alert',
      title: 'Costo de Maíz Subiendo',
      message: 'Impacto estimado: +$2,340/mes. ¿Ajustar precios de tacos?',
      action: 'Ver Análisis',
      urgency: 'high',
      icon: TrendingUp
    },
    {
      type: 'opportunity',
      title: 'Nueva Receta Trending',
      message: 'Tacos de Birria están viral. Margen potencial: 67%',
      action: 'Ver Receta',
      urgency: 'medium',
      icon: ChefHat
    },
    {
      type: 'reminder',
      title: 'Inventario Bajo',
      message: 'Chile guajillo: 3 días restantes. ¿Ordenar ahora?',
      action: 'Hacer Pedido',
      urgency: 'medium',
      icon: AlertCircle
    }
  ];

  // Quick stats for dashboard
  const quickStats: QuickStat[] = [
    { label: 'Ventas Hoy', value: '$24,580', change: '+12%', positive: true },
    { label: 'Margen Promedio', value: '68%', change: '+3%', positive: true },
    { label: 'Documentos Pendientes', value: '7', change: '-2', positive: true },
    { label: 'Próximo Deadline', value: '3 días', change: 'SAT R1', positive: false }
  ];

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Reset panel states on resize
      if (width >= 1024) {
        setFudiPanelOpen(false);
        setFudiPanelExpanded(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const navigateTo = (path: string) => {
    console.log('Navegating to:', path);
    // In real implementation, this would be router navigation
    if (path === '/dashboard/chat') {
      window.location.href = path;
    }
  };

  const formatTime = (timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch(status) {
      case 'pending_signature': return '⚠️';
      case 'updated': return '⭐';
      case 'ready': return '✅';
      case 'completed': return '✅';
      default: return '📄';
    }
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Close mobile panel when section changes
    if (isMobile) {
      setFudiPanelExpanded(false);
    }
  };

  const toggleFudiPanel = () => {
    if (isTablet) {
      setFudiPanelOpen(!fudiPanelOpen);
    } else if (isMobile) {
      setFudiPanelExpanded(!fudiPanelExpanded);
    }
  };

  const handleVoiceSearch = () => {
    setFudiListening(true);
    setSearchQuery('🎤 Escuchando...');
    
    // Simulate voice recognition
    setTimeout(() => {
      setFudiListening(false);
      setSearchQuery('contrato proveedor carne');
      
      // Simulate FUDI response
      setTimeout(() => {
        alert('🧠 FUDI: Encontré 3 contratos de proveedores de carne. ¿Te muestro el más reciente?');
        setSearchQuery('');
      }, 1000);
    }, 2000);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim();
      if (query && !fudiListening) {
        alert(`🧠 FUDI: Buscando "${query}"... Esta funcionalidad estará disponible pronto.`);
      }
    }
  };

  // Interactive functions
  const addNewItem = () => {
    alert('🎯 Esta función estará disponible en la versión completa de fudiVAULT');
  };

  const filterItems = () => {
    alert('🔍 Filtros inteligentes coming soon');
  };

  const openSettings = () => {
    alert('⚙️ Configuración de fudiVAULT coming soon');
  };

  const previousDay = () => {
    alert('📅 Navegación temporal estará disponible pronto');
  };

  const nextDay = () => {
    alert('📅 Navegación temporal estará disponible pronto');
  };

  const quickAddEvent = () => {
    alert('⚡ Quick add con AI estará disponible pronto');
  };

  const notifyWhenReady = (sectionName: string) => {
    alert(`🔔 ¡Perfecto! Te notificaremos cuando la sección ${sectionName} esté lista en fudiVAULT.`);
  };

  // Render section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'agenda':
        return (
          <div className="agenda-content">
            {/* Date Navigation */}
            <div className="date-nav">
              <button className="nav-arrow" onClick={previousDay}>
                <ArrowLeft size={16} />
              </button>
              <div className="current-date">
                <div className="date-main">Miércoles, 15 Junio 2025</div>
                <div className="date-sub">{agendaItems.length} eventos programados</div>
              </div>
              <button className="nav-arrow" onClick={nextDay}>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Agenda Items */}
            <div className="agenda-items">
              {agendaItems.map((item, idx) => (
                <div key={idx} className={`agenda-item ${item.priority}`}>
                  <div className="item-time">
                    <div className="time-main">{formatTime(item.time)}</div>
                    <div 
                      className="time-indicator" 
                      style={{ backgroundColor: getPriorityColor(item.priority) }}
                    ></div>
                  </div>
                  
                  <div className="item-content">
                    <div className="item-header">
                      <h4>{item.title}</h4>
                      <div className="item-type">{item.type}</div>
                    </div>
                    
                    {item.fudiNote && (
                      <div className="fudi-note">
                        <Brain size={14} />
                        <span>{item.fudiNote}</span>
                      </div>
                    )}
                    
                    {item.location && (
                      <div className="item-location">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    )}
                    
                    {item.contact && (
                      <div className="item-contact">
                        <Phone size={12} />
                        <span>{item.contact}</span>
                        {item.phone && <span> • {item.phone}</span>}
                      </div>
                    )}
                    
                    {item.documents && (
                      <div className="item-documents">
                        {item.documents.map((doc, docIdx) => (
                          <span key={docIdx} className="doc-link">{doc}</span>
                        ))}
                      </div>
                    )}
                    
                    {item.autoActions && (
                      <div className="auto-actions">
                        {item.autoActions.map((action, actionIdx) => (
                          <button key={actionIdx} className="auto-action">
                            <Zap size={12} />
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add */}
            <div className="quick-add">
              <button className="quick-add-btn" onClick={quickAddEvent}>
                <PlusCircle size={16} />
                <span>Agregar evento rápido</span>
              </button>
            </div>
          </div>
        );
        
      default:
        const section = sections.find(s => s.id === activeSection);
        const IconComponent = section?.icon || FileText;
        
        return (
          <div className="section-placeholder">
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>
              <IconComponent size={48} />
            </div>
            <h3>Sección {section?.name}</h3>
            <p>{section?.description}</p>
            <p>Esta sección estará disponible en la versión completa de fudiVAULT.</p>
            <button 
              className="notify-btn" 
              onClick={() => notifyWhenReady(section?.name || 'desconocida')}
            >
              <Bell size={16} />
              Notificarme cuando esté listo
            </button>
          </div>
        );
    }
  };

  return (
    <div className="vault-container">
      {/* FUDIVERSE Background */}
      <FudiBackground 
        variant="premium"
        theme="claude"
        intensity={0.15}
        opacity={1}
        fixed={true}
      />

      {/* Header - Consistent with Dashboard */}
      <header className="vault-header">
        <div className="header-content">
          <div className="header-left">
            <div className="fudi-logo">
              <div>
                <div className="fudi-title">fudiVAULT</div>
                <div className="fudi-subtitle">Tu Filofax inteligente</div>
              </div>
            </div>
            
            {/* Navigation Pills */}
            <nav className="header-navigation">
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/chat')}
              >
                fudiGPT
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard')}
              >
                fudiBOARD
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/discovery')}
              >
                fudiFLOW
              </button>
              
              <button className="nav-pill active">
                fudiVAULT
              </button>
              
              <button 
                className="nav-pill"
                onClick={() => navigateTo('/dashboard/pos')}
              >
                fudiMART
              </button>
            </nav>
          </div>
          
          <div className="header-right">
            <div className="live-indicator">
              <div className="live-dot"></div>
              Sistema inteligente
            </div>
            <div className="vault-status">
              Próximamente Q3 2025
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="vault-main">
        <div className="main-grid">
          {/* Coming Soon Section - Integrated in Feed */}
          <div className="coming-soon-section">
            <div className="vault-preview-card">
              <div className="vault-badge">
                <Brain size={16} />
                PRÓXIMAMENTE Q3 2025
              </div>
              
              <h3>🗂️ Tu FILOFAX Superinteligente</h3>
              <p>El organizador personal que todo FUDIER necesita para mantener su restaurante perfectamente organizado con inteligencia artificial</p>
              
              <div className="feature-grid">
                <div className="feature-item">
                  <strong>📋 Plantillas Listas</strong><br />
                  Formatos probados para contratos, recetas y más
                </div>
                <div className="feature-item">
                  <strong>🧠 FUDIVERSE.Ai</strong><br />
                  Genera y organiza contenido automáticamente
                </div>
                <div className="feature-item">
                  <strong>💰 Marketplace</strong><br />
                  Compra/vende plantillas con otros FUDIERs
                </div>
                <div className="feature-item">
                  <strong>📄 Export MD/PDF</strong><br />
                  Guarda todo en tu repositorio personal
                </div>
              </div>
              
              <button 
                className="vault-cta-button" 
                onClick={() => navigateTo('/dashboard/chat')}
              >
                💬 Pregúntale a FUDI qué plantillas necesitas
              </button>
            </div>
          </div>

          {/* Filofax Demo Section */}
          <div className="filofax-demo">
            <div className="filofax-layout-desktop">
              
              {/* Filofax Spine - Section Tabs */}
              <div className="filofax-spine">
                {!isMobile && (
                  <div className="spine-header">
                    <div className="filofax-logo">
                      <BookOpen size={20} />
                      <span>fudiVAULT</span>
                    </div>
                    <div className="powered-by">POWERED BY FUDIVERSE.AI</div>
                  </div>
                )}
                
                <div className="section-tabs">
                  {sections.map(section => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => handleSectionChange(section.id)}
                        style={{ '--section-color': section.color } as React.CSSProperties}
                        title={section.description}
                      >
                        <div className="tab-icon">
                          <IconComponent size={20} />
                          {section.urgent > 0 && (
                            <div className="urgent-indicator">{section.urgent}</div>
                          )}
                        </div>
                        <div className="tab-label">{section.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FUDI Assistant Panel */}
              <div className={`fudi-panel ${fudiPanelOpen ? 'open' : ''} ${fudiPanelExpanded ? 'expanded' : ''}`}>
                <div className="panel-header">
                  <Brain size={20} />
                  <span>FUDI Assistant</span>
                  <div className="fudi-status"></div>
                </div>
                
                <div className="fudi-search">
                  <Search size={16} />
                  <input 
                    type="text"
                    placeholder={fudiListening ? "🎤 Escuchando..." : "Hey FUDI, tráeme..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    disabled={fudiListening}
                  />
                  <button className="voice-search" onClick={handleVoiceSearch}>
                    <Mic size={14} />
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats">
                  <h4>📊 Resumen de Hoy</h4>
                  <div className="stats-grid">
                    {quickStats.map((stat, idx) => (
                      <div key={idx} className="stat-card">
                        <div className="stat-label">{stat.label}</div>
                        <div className="stat-value">{stat.value}</div>
                        <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                          {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FUDI Suggestions */}
                <div className="fudi-suggestions">
                  <h4>💡 Sugerencias Inteligentes</h4>
                  {fudiSuggestions.map((suggestion, idx) => {
                    const IconComponent = suggestion.icon;
                    return (
                      <div key={idx} className={`suggestion ${suggestion.urgency}`}>
                        <div className="suggestion-icon">
                          <IconComponent size={16} />
                        </div>
                        <div className="suggestion-content">
                          <div className="suggestion-title">{suggestion.title}</div>
                          <div className="suggestion-message">{suggestion.message}</div>
                          <button className="suggestion-action">{suggestion.action}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Documents */}
                <div className="recent-docs">
                  <h4>📄 Documentos Recientes</h4>
                  {recentDocs.slice(0, 4).map((doc, idx) => (
                    <div key={idx} className="doc-item">
                      <div className="doc-icon">
                        {getStatusIcon(doc.status)}
                      </div>
                      <div className="doc-info">
                        <div className="doc-name">{doc.name}</div>
                        <div className="doc-meta">
                          <span>{doc.modified}</span>
                          <span> • </span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="doc-tags">
                          {doc.fudiTags.slice(0, 2).map((tag, tagIdx) => (
                            <span key={tagIdx} className="doc-tag">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="doc-actions">
                        <button><Eye size={12} /></button>
                        <button><Download size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="main-content">
                {/* Page Header */}
                <div className="page-header">
                  <div className="page-title">
                    <h2>{sections.find(s => s.id === activeSection)?.name}</h2>
                    <p>{sections.find(s => s.id === activeSection)?.description}</p>
                  </div>
                  <div className="page-actions">
                    <button className="add-item" onClick={addNewItem}>
                      <Plus size={16} />
                      <span>Agregar</span>
                    </button>
                    <button onClick={filterItems}>
                      <Filter size={16} />
                      <span>Filtrar</span>
                    </button>
                    <button onClick={openSettings}>
                      <Settings size={16} />
                      <span>Config</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Content Based on Active Section */}
                {renderSectionContent()}
              </div>
            </div>
          </div>

          {/* Tablet FUDI Toggle */}
          {isTablet && (
            <button className="fudi-toggle" onClick={toggleFudiPanel}>
              <Brain size={24} />
            </button>
          )}

          {/* Mobile FUDI Panel Toggle */}
          {isMobile && (
            <button 
              className="fudi-toggle-mobile"
              onClick={toggleFudiPanel}
              style={{
                position: 'fixed',
                bottom: '2rem',
                right: '1rem',
                background: 'var(--glass-bg)',
                border: '2px solid var(--border-default)',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--fudi-secondary)',
                cursor: 'pointer',
                zIndex: 100,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(15px)',
                fontSize: '1.5rem'
              }}
            >
              🧠
            </button>
          )}
        </div>
      </main>
    </div>
  );
}