import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface FudiMarkdownProps {
  content: string;
}

const FudiMarkdown: React.FC<FudiMarkdownProps> = ({ content }) => {
  const [separatorVisible, setSeparatorVisible] = useState(false);
  
  // Detectar el separador
  const parts = content.split('---');
  const mainContent = parts[0];
  const hasSeparator = parts.length > 1;

  // Animación elegante del separador
  useEffect(() => {
    if (hasSeparator) {
      const showTimer = setTimeout(() => {
        setSeparatorVisible(true);
      }, 300);

      return () => clearTimeout(showTimer);
    }
  }, [hasSeparator, content]);

  return (
    <div className="fudimarkdown-container">
      <ReactMarkdown
        components={{
          // 🔥 HEADLINES PRINCIPALES
          h1: ({ children }) => (
            <div className="headline-beast mb-6">
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight">
                {children}
              </h1>
            </div>
          ),
          
          // 🎯 HEADLINES SECUNDARIOS
          h2: ({ children }) => (
            <div className="headline-secondary mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 leading-snug">
                {children}
              </h2>
            </div>
          ),

          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-3 leading-relaxed">
              {children}
            </h3>
          ),

          // 💬 PÁRRAFOS CON JERARQUÍA VISUAL
          p: ({ children }) => {
            const text = children?.toString() || '';
            
            // 🚨 SALUDO CONTEXTUAL
            if (text.includes('Hay algo que quiero mostrarte') || text.includes('Necesito un momento')) {
              return (
                <div className="saludo-contextual mb-6 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/10 rounded-xl border border-cyan-500/30">
                  <p className="text-xl md:text-2xl font-medium text-cyan-300 italic">
                    {children}
                  </p>
                </div>
              );
            }

            // 💰 INSIGHTS PRINCIPALES
            if (text.includes('$') && (text.includes('**') || text.includes('total'))) {
              return (
                <div className="insight-principal mb-6 p-6 bg-gradient-to-br from-yellow-900/40 via-orange-900/30 to-red-900/20 rounded-2xl border-2 border-yellow-500/50 shadow-xl">
                  <p className="text-3xl md:text-4xl font-black text-yellow-300 leading-tight tracking-wide drop-shadow-lg">
                    {children}
                  </p>
                </div>
              );
            }

            // 🎯 CALL TO ACTION
            if (text.includes('¿Exploramos más profundo?') || text.includes('¿Qué más necesitas')) {
              return (
                <div className="cta-section mb-6 p-5 bg-gradient-to-r from-purple-900/30 to-pink-900/20 rounded-xl border border-purple-500/30">
                  <p className="text-lg md:text-xl font-semibold text-purple-300">
                    {children}
                  </p>
                </div>
              );
            }

            return (
              <p className="text-base md:text-lg text-gray-200 mb-4 leading-relaxed font-medium tracking-wide">
                {children}
              </p>
            );
          },

          // 🔥 LISTAS CON JERARQUÍA VISUAL
          ul: ({ children }) => (
            <ul className="fudilist space-y-3 mb-6 ml-2">
              {children}
            </ul>
          ),

          li: ({ children }) => {
            const text = children?.toString() || '';
            
            // 🔥 LO QUE ESTÁ JALANDO
            if (text.includes('jalando') || text.includes('sabroso') || text.includes('activ')) {
              return (
                <li className="jalando-item flex items-start space-x-3 p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/20 rounded-lg border-l-4 border-green-400">
                  <span className="text-green-400 text-xl">⚡</span>
                  <span className="text-lg font-semibold text-green-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // ⚠️ PRECAUCIONES
            if (text.includes('Recalibrando') || text.includes('Reiniciando') || text.includes('Ajustando')) {
              return (
                <li className="precaucion-item flex items-start space-x-3 p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/20 rounded-lg border-l-4 border-yellow-400">
                  <span className="text-yellow-400 text-xl">🧠</span>
                  <span className="text-lg font-semibold text-yellow-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // 💡 INSIGHTS
            if (text.includes('Capacidades') || text.includes('neural') || text.includes('Inteligencia')) {
              return (
                <li className="insight-item flex items-start space-x-3 p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/20 rounded-xl border-2 border-cyan-400/30">
                  <span className="text-cyan-400 text-xl">💭</span>
                  <span className="text-lg font-semibold text-cyan-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // 📊 BREAKDOWN ITEMS
            if (text.includes('├─') || text.includes('└─')) {
              return (
                <li className="breakdown-item flex items-start space-x-2 p-2 bg-gray-800/50 rounded-md font-mono">
                  <span className="text-cyan-400 text-sm font-bold tracking-wider">
                    {children}
                  </span>
                </li>
              );
            }

            // → ACCIONES
            if (text.includes('→')) {
              return (
                <li className="accion-item group flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-900/30 to-indigo-900/20 rounded-lg border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300">
                  <span className="text-purple-400 text-lg">→</span>
                  <span className="text-lg font-medium text-purple-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            return (
              <li className="normal-item flex items-start space-x-3 p-2">
                <span className="text-cyan-400 text-base">•</span>
                <span className="text-base text-gray-300 leading-relaxed">
                  {children}
                </span>
              </li>
            );
          },

          strong: ({ children }) => (
            <strong className="font-black text-yellow-400 text-lg drop-shadow-md">
              {children}
            </strong>
          ),

          code: ({ children }) => (
            <code className="bg-gray-900/80 text-green-400 px-2 py-1 rounded font-mono text-sm border border-green-500/30">
              {children}
            </code>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-400 bg-gradient-to-r from-cyan-900/20 to-transparent pl-6 py-4 my-6 rounded-r-lg">
              <div className="text-lg text-cyan-300 font-medium italic">
                {children}
              </div>
            </blockquote>
          )
        }}
      >
        {mainContent}
      </ReactMarkdown>

      {/* ◊ SEPARADOR ELEGANTE EX MACHINA ◊ */}
      {hasSeparator && (
        <div className={`separator-container mt-8 mb-4 flex justify-center transition-all duration-500 ${
          separatorVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="neural-separator flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent rounded-full border border-cyan-500/30">
            <div className="neural-dot w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 text-sm font-mono tracking-widest opacity-70">
              neural_pathways_active
            </span>
            <div className="neural-dot w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .neural-dot {
          animation: neural-pulse 2s ease-in-out infinite;
        }

        @keyframes neural-pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }

        .neural-separator:hover .neural-dot {
          animation-duration: 0.8s;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .neural-separator {
            padding: 0.5rem 1rem;
          }
          
          .neural-separator span {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FudiMarkdown;