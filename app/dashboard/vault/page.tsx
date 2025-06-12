// This file is part of the Fudi project, a Next.js application for managing a restaurant knowledge vault.
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Grid3x3, List, Filter, Command,
  Star, Clock, Eye, Edit3, Share2, Sparkles,
  ChefHat, BookOpen, BarChart3, TrendingUp, Users, Lightbulb,
  Activity, Zap
} from 'lucide-react';

// Import FUDI Components
import { FudiEntity } from '@/components/fudiverse/FudiEntity';
import { FudiAura } from '@/components/fudiverse/FudiAura';
import { FudiChatGrid } from '@/components/fudiverse/FudiChatGrid';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiBackground } from '@/components/fudiverse/FudiBackground';

// Import styles
import '@/styles/pages/FudiVault.css';

interface VaultItem {
  id: string;
  title: string;
  type: 'recipe' | 'knowledge' | 'report' | 'playbook' | 'supplier' | 'idea';
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  metrics?: {
    cost?: number;
    margin?: number;
    views?: number;
    roi?: number;
  };
  favorite: boolean;
}

export default function FudiVaultPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data with more personality
  const vaultItems: VaultItem[] = [
    {
      id: '1',
      title: 'Burger Signature - El Arma Secreta',
      type: 'recipe',
      content: 'La receta que cambió el juego. Margen del 72% y clientes adictos.',
      tags: ['bestseller', 'game-changer', 'premium'],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-15'),
      metrics: { cost: 45, margin: 72, views: 1234 },
      favorite: true
    },
    {
      id: '2',
      title: 'Destruyendo a la Competencia Q4',
      type: 'report',
      content: 'Intel exclusivo: cómo superamos a todos en el último quarter.',
      tags: ['competencia', 'estrategia', 'winning'],
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-12-10'),
      metrics: { views: 892, roi: 340 },
      favorite: false
    },
    {
      id: '3',
      title: 'Playbook: Black Friday Legendario',
      type: 'playbook',
      content: 'La estrategia que nos dio +285% ROI. Incluye templates y cronogramas.',
      tags: ['marketing', 'viral', 'probado'],
      createdAt: new Date('2024-10-15'),
      updatedAt: new Date('2024-12-05'),
      metrics: { roi: 285, views: 567 },
      favorite: true
    },
    {
      id: '4',
      title: 'Red de Proveedores Elite',
      type: 'supplier',
      content: 'Solo los mejores. Negociaciones pre-hechas, descuentos exclusivos.',
      tags: ['proveedores', 'vip', 'exclusivo'],
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-12-20'),
      metrics: { views: 1560 },
      favorite: false
    },
    {
      id: '5',
      title: 'Menú del Futuro: Plant-Based 2025',
      type: 'idea',
      content: 'La próxima revolución. Proyecciones, recetas y estrategia completa.',
      tags: ['innovación', 'trending', 'futuro'],
      createdAt: new Date('2024-12-18'),
      updatedAt: new Date('2024-12-18'),
      metrics: { views: 234 },
      favorite: false
    },
    {
      id: '6',
      title: 'Sistema Operativo Perfecto',
      type: 'knowledge',
      content: 'El framework que garantiza consistencia. De cero a héroe en 30 días.',
      tags: ['sistema', 'escalable', 'probado'],
      createdAt: new Date('2024-08-10'),
      updatedAt: new Date('2024-11-30'),
      metrics: { views: 4120 },
      favorite: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todo', icon: Grid3x3, count: vaultItems.length },
    { id: 'recipe', name: 'Recetas', icon: ChefHat, count: vaultItems.filter(i => i.type === 'recipe').length },
    { id: 'knowledge', name: 'Knowledge', icon: BookOpen, count: vaultItems.filter(i => i.type === 'knowledge').length },
    { id: 'report', name: 'Intel', icon: BarChart3, count: vaultItems.filter(i => i.type === 'report').length },
    { id: 'playbook', name: 'Playbooks', icon: TrendingUp, count: vaultItems.filter(i => i.type === 'playbook').length },
    { id: 'supplier', name: 'Network', icon: Users, count: vaultItems.filter(i => i.type === 'supplier').length },
    { id: 'idea', name: 'Ideas', icon: Lightbulb, count: vaultItems.filter(i => i.type === 'idea').length }
  ];

  const typeConfig = {
    recipe: { color: '#f97316', icon: ChefHat },
    knowledge: { color: '#3b82f6', icon: BookOpen },
    report: { color: '#10b981', icon: BarChart3 },
    playbook: { color: '#8b5cf6', icon: TrendingUp },
    supplier: { color: '#eab308', icon: Users },
    idea: { color: '#ec4899', icon: Lightbulb }
  };

  const filteredItems = selectedCategory === 'all'
    ? vaultItems
    : vaultItems.filter(item => item.type === selectedCategory);

  // Format numbers with K notation
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Time ago formatter
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
    <div className="vault-container">
      {/* FUDI Background */}
      <FudiBackground variant="vault" opacity={0.4} />
      
      {/* Premium Header */}
      <header className="vault-header">
        <div className="vault-logo">
          <div className="vault-logo-icon">
            🔐
          </div>
          <div>
            <div className="vault-logo-text">fudiVAULT</div>
            <div className="vault-subtitle">Knowledge Nexus</div>
          </div>
        </div>

        {/* Search Command Center */}
        <div className="vault-search">
          <div className="search-container">
            <Search size={18} style={{ color: '#666' }} />
            <input
              type="text"
              placeholder="Busca recetas, playbooks, intel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-hotkey">
              <Command size={12} />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <FudiButton variant="primary" className="new-vault-btn">
            <Plus size={18} />
            <span>Nuevo</span>
          </FudiButton>
        </div>
      </header>

      {/* Main Layout */}
      <div className="vault-main">
        {/* Sidebar */}
        <aside className="vault-sidebar">
          <div className="sidebar-section">
            <div className="section-title">Biblioteca</div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                <cat.icon size={18} className="nav-icon" />
                <span>{cat.name}</span>
                <span className="nav-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-section">
            <div className="section-title">Acceso Rápido</div>
            <button className="nav-item">
              <Star size={18} className="nav-icon" />
              <span>Favoritos</span>
              <span className="nav-count">3</span>
            </button>
            <button className="nav-item">
              <Clock size={18} className="nav-icon" />
              <span>Recientes</span>
            </button>
            <button className="nav-item">
              <TrendingUp size={18} className="nav-icon" />
              <span>Trending</span>
            </button>
          </div>

          {/* Quick Stats */}
          <FudiCard variant="surface" className="sidebar-stats">
            <div className="stat-row">
              <div className="stat-label">
                <Activity size={14} />
                <span>Views totales</span>
              </div>
              <div className="stat-value">12.8K</div>
            </div>
            <div className="stat-row">
              <div className="stat-label">
                <Zap size={14} />
                <span>ROI promedio</span>
              </div>
              <div className="stat-value">285%</div>
            </div>
          </FudiCard>
        </aside>

        {/* Content Area */}
        <div className="vault-content">
          <div className="content-header">
            <div className="content-title">
              <h1>{selectedCategory === 'all' ? 'Todo tu Conocimiento' : categories.find(c => c.id === selectedCategory)?.name}</h1>

              <div className="view-controls">
                <div className="view-toggle">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'active' : ''}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'active' : ''}
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
          </div>

          {/* Vault Grid */}
          <div className={`vault-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredItems.map((item) => {
              const TypeIcon = typeConfig[item.type].icon;
              const typeColor = typeConfig[item.type].color;

              return (
                <FudiCard
                  key={item.id}
                  variant="subtle"
                  hoverable
                  className="vault-card"
                >
                  {/* Type Badge */}
                  <div
                    className={`card-type type-${item.type}`}
                    style={{ color: typeColor }}
                  >
                    <TypeIcon />
                  </div>

                  {/* Favorite */}
                  {item.favorite && (
                    <Star className="favorite-indicator" fill="currentColor" />
                  )}

                  <div className={viewMode === 'list' ? 'card-content' : undefined}>
                    {/* Title */}
                    <h3 className="card-title">{item.title}</h3>

                    {/* Description */}
                    <p className="card-description">{item.content}</p>

                    {/* Tags */}
                    <div className="card-tags">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    {item.metrics && (
                      <div className="card-metrics">
                        {item.metrics.cost && (
                          <div className="metric">
                            <div className="metric-value">${item.metrics.cost}</div>
                            <div className="metric-label">Costo</div>
                          </div>
                        )}
                        {item.metrics.margin && (
                          <div className="metric">
                            <div className="metric-value">{item.metrics.margin}%</div>
                            <div className="metric-label">Margen</div>
                          </div>
                        )}
                        {item.metrics.roi && (
                          <div className="metric">
                            <div className="metric-value">{item.metrics.roi}%</div>
                            <div className="metric-label">ROI</div>
                          </div>
                        )}
                        {item.metrics.views && (
                          <div className="metric">
                            <div className="metric-value">{formatNumber(item.metrics.views)}</div>
                            <div className="metric-label">Views</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="card-footer">
                    <div className="update-time">
                      <Clock size={12} />
                      <span>{timeAgo(item.updatedAt)}</span>
                    </div>

                    <div className="card-actions">
                      <button className="action-btn">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn">
                        <Edit3 size={16} />
                      </button>
                      <button className="action-btn">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </FudiCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* FUDI Entity observando */}
      <div className="fudi-container">
        <FudiAura 
          variant="combined"
          color="#fbbf24"
          intensity={0.7}
          size={400}
          pulseSpeed={3}
          particleCount={20}
        />
        <FudiEntity 
          variant="mini"
          mood="analyzing"
          followCursor={true}
          showDataStreams={true}
          showParticles={true}
          intensity={0.6}
        />
      </div>
    </div>
  );
}