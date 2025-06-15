'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Grid3x3, List, Filter, Command,
  Star, Clock, Eye, Edit3, Share2, Sparkles,
  ChefHat, BookOpen, BarChart3, TrendingUp, Users, Lightbulb,
  Activity, Zap, Crown, Gift, Trophy, Target,
  FileText, Calculator, DollarSign, Shield,
  Brain, Database, Rocket, Download, Copy, Heart
} from 'lucide-react';

// Import CSS styles
import '../../../styles/pages/FudiVault.css';

interface VaultItem {
  id: string;
  title: string;
  type: 'recipe' | 'form' | 'contract' | 'playbook' | 'intel' | 'template';
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  metrics?: {
    cost?: number;
    margin?: number;
    downloads?: number;
    roi?: number;
    saves?: number;
  };
  favorite: boolean;
  premium?: boolean;
  trending?: boolean;
}

export default function FudiVault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // REAL FUDIER CONTENT - The stuff they ACTUALLY need
  const vaultItems: VaultItem[] = [
    {
      id: '1',
      title: 'Receta Secreta: Salsa Taquera del Diablo',
      type: 'recipe',
      content: 'La salsa que hace que regresen los clientes. 47 ingredientes, técnica milenaria. Margen brutal: 89%.',
      tags: ['salsa', 'secreta', 'bestseller', 'high-margin'],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-15'),
      metrics: { cost: 12, margin: 89, downloads: 1847, saves: 456 },
      favorite: true,
      premium: true,
      trending: true
    },
    {
      id: '2',
      title: 'Formulario SAT R1 - Régimen Simplificado',
      type: 'form',
      content: 'Ya llenado con ejemplos reales. Solo cambias los datos y listo. Incluye tips para no cagarla.',
      tags: ['sat', 'fiscal', 'obligatorio', 'simplificado'],
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-12-10'),
      metrics: { downloads: 3421, saves: 892 },
      favorite: false,
      premium: false
    },
    {
      id: '3',
      title: 'Contrato de Trabajo - Cocinero',
      type: 'contract',
      content: 'Blindado legalmente. Incluye cláusulas anti-competencia y protección de recetas. Avalado por abogados.',
      tags: ['legal', 'cocinero', 'blindado', 'seguro'],
      createdAt: new Date('2024-10-15'),
      updatedAt: new Date('2024-12-05'),
      metrics: { downloads: 567, saves: 234 },
      favorite: true,
      premium: true
    },
    {
      id: '4',
      title: 'Playbook: Dominar Instagram para Taquerías',
      type: 'playbook',
      content: 'De 500 a 50K followers en 6 meses. Estrategia completa con ejemplos, horarios y hashtags ganadores.',
      tags: ['instagram', 'marketing', 'tacos', 'viral'],
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-12-20'),
      metrics: { roi: 340, downloads: 1560, saves: 423 },
      favorite: false,
      premium: true,
      trending: true
    },
    {
      id: '5',
      title: 'Intel: Precios de Competencia Dic 2024',
      type: 'intel',
      content: 'Espionaje de menús y precios de 147 restaurantes. Datos actualizados semanalmente. Ventaja competitiva pura.',
      tags: ['competencia', 'precios', 'intel', 'ventaja'],
      createdAt: new Date('2024-12-18'),
      updatedAt: new Date('2024-12-18'),
      metrics: { downloads: 234, saves: 89 },
      favorite: false,
      premium: true
    },
    {
      id: '6',
      title: 'Template: Calculadora de Costos de Platillos',
      type: 'template',
      content: 'Excel inteligente que calcula costos, márgenes y precios automáticamente. Solo agregas ingredientes.',
      tags: ['costos', 'excel', 'automatico', 'margenes'],
      createdAt: new Date('2024-08-10'),
      updatedAt: new Date('2024-11-30'),
      metrics: { downloads: 4120, saves: 1340 },
      favorite: true,
      premium: false
    },
    {
      id: '7',
      title: 'Formulario IMSS - Alta de Empleados',
      type: 'form',
      content: 'Pre-llenado con datos de ejemplo. Evita multas y problemas legales. Incluye checklist de documentos.',
      tags: ['imss', 'empleados', 'legal', 'checklist'],
      createdAt: new Date('2024-12-10'),
      updatedAt: new Date('2024-12-22'),
      metrics: { downloads: 892, saves: 345 },
      favorite: false,
      premium: false,
      trending: true
    },
    {
      id: '8',
      title: 'Receta Premium: Burger Gourmet Signature',
      type: 'recipe',
      content: 'La burger de $350 que se vende sola. Ingredientes premium, presentación Instagram-ready. ROI 285%.',
      tags: ['burger', 'premium', 'gourmet', 'instagram'],
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-12-01'),
      metrics: { cost: 89, margin: 75, downloads: 654, roi: 285 },
      favorite: true,
      premium: true
    }
  ];

  const categories = [
    { 
      id: 'all', 
      name: 'Todo', 
      icon: Grid3x3, 
      count: vaultItems.length,
      color: '#00ffff'
    },
    { 
      id: 'recipe', 
      name: 'Recetas', 
      icon: ChefHat, 
      count: vaultItems.filter(i => i.type === 'recipe').length,
      color: '#f97316'
    },
    { 
      id: 'form', 
      name: 'Formularios', 
      icon: FileText, 
      count: vaultItems.filter(i => i.type === 'form').length,
      color: '#10b981'
    },
    { 
      id: 'contract', 
      name: 'Contratos', 
      icon: Shield, 
      count: vaultItems.filter(i => i.type === 'contract').length,
      color: '#8b5cf6'
    },
    { 
      id: 'playbook', 
      name: 'Playbooks', 
      icon: TrendingUp, 
      count: vaultItems.filter(i => i.type === 'playbook').length,
      color: '#ec4899'
    },
    { 
      id: 'intel', 
      name: 'Intel', 
      icon: Brain, 
      count: vaultItems.filter(i => i.type === 'intel').length,
      color: '#ef4444'
    },
    { 
      id: 'template', 
      name: 'Templates', 
      icon: Database, 
      count: vaultItems.filter(i => i.type === 'template').length,
      color: '#eab308'
    }
  ];

  const typeConfig = {
    recipe: { color: '#f97316', icon: ChefHat, label: 'Receta' },
    form: { color: '#10b981', icon: FileText, label: 'Formulario' },
    contract: { color: '#8b5cf6', icon: Shield, label: 'Contrato' },
    playbook: { color: '#ec4899', icon: TrendingUp, label: 'Playbook' },
    intel: { color: '#ef4444', icon: Brain, label: 'Intel' },
    template: { color: '#eab308', icon: Database, label: 'Template' }
  };

  const filteredItems = selectedCategory === 'all'
    ? vaultItems
    : vaultItems.filter(item => item.type === selectedCategory);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'ahora';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="fudivault-container">
      {/* Neural Grid Background */}
      
      {/* Hero Banner - COMING SOON EPIC */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="coming-soon-badge">
            <Rocket size={16} />
            <span>PRÓXIMAMENTE Q3 2025</span>
          </div>
          
          <div className="hero-logo">fudiVAULT</div>
          <div className="hero-tagline">POWERED BY FUDIVERSE AI</div>
          <div className="hero-description">
            La OFICINA DIGITAL que todo FUDIER necesita • Recetas secretas • Formularios SAT • Contratos blindados • Intel de competencia • Templates automáticos
          </div>
          
          <div className="hero-cta-section">
            <button className="hero-cta-btn">ACCESO TEMPRANO VIP</button>
            <div className="hero-benefits">
              <span>🔐 Contenido exclusivo de FUDIERS</span>
              <span>📋 Formularios pre-llenados</span>
              <span>🧠 Intel actualizado semanalmente</span>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-value">1,247</span>
            <span className="stat-label">En acceso temprano</span>
          </div>
          <div className="hero-stat">
            <span className="stat-value">567</span>
            <span className="stat-label">Recursos listos</span>
          </div>
          <div className="hero-stat">
            <span className="stat-value">98%</span>
            <span className="stat-label">Problemas resueltos</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        
        {/* Left Sidebar */}
        <aside className="vault-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Tu Arsenal Neural</div>
            <div className="sidebar-subtitle">Todo lo que necesitas</div>
          </div>
          
          <div className="categories-list">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ '--category-color': cat.color } as React.CSSProperties}
              >
                <div className="category-icon">
                  <cat.icon size={24} />
                </div>
                <div className="category-info">
                  <div className="category-name">{cat.name}</div>
                  <div className="category-meta">{cat.count} recursos</div>
                </div>
              </button>
            ))}
          </div>

          <div className="quick-access">
            <div className="access-title">Acceso Rápido</div>
            <button className="access-item">
              <Star size={18} />
              <span>Favoritos</span>
              <span className="access-count">4</span>
            </button>
            <button className="access-item">
              <Trophy size={18} />
              <span>Premium</span>
              <span className="access-count">5</span>
            </button>
            <button className="access-item">
              <Zap size={18} />
              <span>Trending</span>
              <span className="access-count">3</span>
            </button>
          </div>

          <div className="vault-stats">
            <div className="stats-header">
              <Brain size={20} />
              <span>Neural Stats</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Total descargas</span>
              <span className="stat-value">12.8K</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Ahorro promedio</span>
              <span className="stat-value">$48K</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Tiempo ahorrado</span>
              <span className="stat-value">340h</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="vault-content">
          
          {/* Content Header */}
          <div className="content-header">
            <div className="search-section">
              <div className="search-container">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Buscar recetas, formularios, contratos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="search-hotkey">
                  <Command size={12} />
                  <span>K</span>
                </div>
              </div>
              
              <div className="content-controls">
                <div className="view-toggle">
                  <button 
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button 
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <button className="filter-btn">
                  <Filter size={16} />
                  <span>Filtros</span>
                </button>
              </div>
            </div>

            <div className="results-info">
              <h1 className="content-title">
                {selectedCategory === 'all' ? 'Todo tu Arsenal' : categories.find(c => c.id === selectedCategory)?.name}
              </h1>
              <span className="results-count">
                {filteredItems.length} recursos encontrados
              </span>
            </div>
          </div>

          {/* Vault Grid */}
          <div className={`vault-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredItems.map((item) => {
              const TypeIcon = typeConfig[item.type].icon;
              const typeColor = typeConfig[item.type].color;

              return (
                <div key={item.id} className="vault-card">
                  
                  {/* Card Badges */}
                  <div className="card-badges">
                    {item.premium && (
                      <div className="badge premium">
                        <Crown size={12} />
                        <span>Premium</span>
                      </div>
                    )}
                    {item.trending && (
                      <div className="badge trending">
                        <Zap size={12} />
                        <span>Trending</span>
                      </div>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div 
                    className="card-type"
                    style={{ backgroundColor: typeColor + '20', color: typeColor }}
                  >
                    <TypeIcon size={20} />
                    <span>{typeConfig[item.type].label}</span>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.content}</p>

                    {/* Tags */}
                    <div className="card-tags">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="tag">#{tag}</span>
                      ))}
                    </div>

                    {/* Metrics */}
                    {item.metrics && (
                      <div className="card-metrics">
                        {item.metrics.cost && (
                          <div className="metric">
                            <DollarSign size={14} />
                            <span>${item.metrics.cost}</span>
                            <span className="metric-label">Costo</span>
                          </div>
                        )}
                        {item.metrics.margin && (
                          <div className="metric success">
                            <TrendingUp size={14} />
                            <span>{item.metrics.margin}%</span>
                            <span className="metric-label">Margen</span>
                          </div>
                        )}
                        {item.metrics.roi && (
                          <div className="metric success">
                            <Target size={14} />
                            <span>{item.metrics.roi}%</span>
                            <span className="metric-label">ROI</span>
                          </div>
                        )}
                        {item.metrics.downloads && (
                          <div className="metric">
                            <Download size={14} />
                            <span>{formatNumber(item.metrics.downloads)}</span>
                            <span className="metric-label">Descargas</span>
                          </div>
                        )}
                        {item.metrics.saves && (
                          <div className="metric">
                            <Heart size={14} />
                            <span>{formatNumber(item.metrics.saves)}</span>
                            <span className="metric-label">Guardado</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <div className="card-meta">
                      <Clock size={12} />
                      <span>{timeAgo(item.updatedAt)}</span>
                      {item.favorite && (
                        <Star size={12} fill="currentColor" className="favorite-star" />
                      )}
                    </div>

                    <div className="card-actions">
                      <button className="action-btn primary">
                        <Download size={16} />
                        <span>Descargar</span>
                      </button>
                      <button className="action-btn secondary">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn secondary">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Right Sidebar - Quick Access */}
        <aside className="quick-sidebar">
          
          {/* Featured Content */}
          <div className="featured-section">
            <div className="featured-header">
              <Crown size={20} />
              <span>Contenido Destacado</span>
            </div>
            
            <div className="featured-item">
              <div className="featured-emoji">🌮</div>
              <div className="featured-info">
                <div className="featured-title">Receta Taco Supremo</div>
                <div className="featured-subtitle">+89% margen garantizado</div>
              </div>
              <div className="featured-badge">🔥</div>
            </div>
            
            <div className="featured-item">
              <div className="featured-emoji">📋</div>
              <div className="featured-info">
                <div className="featured-title">Kit Formularios SAT</div>
                <div className="featured-subtitle">Todo lo que necesitas</div>
              </div>
              <div className="featured-badge">⚡</div>
            </div>
            
            <div className="featured-item">
              <div className="featured-emoji">💼</div>
              <div className="featured-info">
                <div className="featured-title">Pack Contratos Legales</div>
                <div className="featured-subtitle">Blindado por abogados</div>
              </div>
              <div className="featured-badge">🛡️</div>
            </div>
          </div>

          {/* Neural Recommendations */}
          <div className="recommendations-section">
            <div className="recommendations-header">
              <Brain size={20} />
              <span>FUDI Recomienda</span>
            </div>
            
            <div className="recommendation-item">
              <span className="rec-emoji">🎯</span>
              <div className="rec-info">
                <div className="rec-title">Calculadora de Precios</div>
                <div className="rec-subtitle">Basado en tu actividad</div>
              </div>
            </div>
            
            <div className="recommendation-item">
              <span className="rec-emoji">📊</span>
              <div className="rec-info">
                <div className="rec-title">Intel de Competencia</div>
                <div className="rec-subtitle">Actualizado esta semana</div>
              </div>
            </div>
            
            <div className="recommendation-item">
              <span className="rec-emoji">⚡</span>
              <div className="rec-info">
                <div className="rec-title">Automatizaciones</div>
                <div className="rec-subtitle">Ahorra 5h/semana</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stats-header">
              <Activity size={20} />
              <span>Tu Progreso</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Recursos utilizados</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '67%'}}></div>
              </div>
              <span className="progress-value">67%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Ahorro acumulado</span>
              <span className="progress-value-large">$24,580</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}