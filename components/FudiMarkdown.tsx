import React from 'react';
import ReactMarkdown from 'react-markdown';

interface FudiMarkdownProps {
  content: string;
}

const FudiMarkdown: React.FC<FudiMarkdownProps> = ({ content }) => {
  // Detectar el separador animado
  const parts = content.split('---');
  const mainContent = parts[0];
  const hasSeparator = parts.length > 1;

  return (
    <div className="fudimarkdown-container">
      <ReactMarkdown
        components={{
          // 🔥 HEADLINES PRINCIPALES - TAMAÑO BESTIA
          h1: ({ children }) => (
            <div className="headline-beast mb-6">
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight">
                {children}
              </h1>
            </div>
          ),
          
          // 🎯 HEADLINES SECUNDARIOS - TAMAÑO GRANDE
          h2: ({ children }) => (
            <div className="headline-secondary mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 leading-snug">
                {children}
              </h2>
            </div>
          ),

          // 📊 HEADLINES TERCIARIOS
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-3 leading-relaxed">
              {children}
            </h3>
          ),

          // 💬 PÁRRAFOS CON JERARQUÍA VISUAL
          p: ({ children }) => {
            const text = children?.toString() || '';
            
            // 🚨 SALUDO CONTEXTUAL - SUPER GRANDE
            if (text.includes('¡Al tiro') || text.includes('¡Órale') || text.includes('¡Vámonos')) {
              return (
                <div className="saludo-contextual mb-6 p-4 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-xl border border-green-500/30">
                  <p className="text-2xl md:text-3xl font-bold text-green-400 animate-pulse">
                    {children}
                  </p>
                </div>
              );
            }

            // 💰 INSIGHTS PRINCIPALES - MUY GRANDE CON EFECTOS
            if (text.includes('$') && (text.includes('**') || text.includes('total'))) {
              return (
                <div className="insight-principal mb-6 p-6 bg-gradient-to-br from-yellow-900/40 via-orange-900/30 to-red-900/20 rounded-2xl border-2 border-yellow-500/50 shadow-2xl">
                  <p className="text-3xl md:text-4xl font-black text-yellow-300 leading-tight tracking-wide drop-shadow-lg">
                    {children}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent animate-pulse rounded-2xl"></div>
                </div>
              );
            }

            // 🎯 CALL TO ACTION - GRANDE Y DESTACADO
            if (text.includes('¿Le metemos lupa?') || text.includes('¿Qué destapamos')) {
              return (
                <div className="cta-section mb-6 p-5 bg-gradient-to-r from-purple-900/40 to-pink-900/30 rounded-xl border border-purple-500/40">
                  <p className="text-xl md:text-2xl font-bold text-purple-300 animate-bounce">
                    {children}
                  </p>
                </div>
              );
            }

            // 📊 TEXTO NORMAL CON MEJORES TIPOGRAFÍAS
            return (
              <p className="text-base md:text-lg text-gray-200 mb-4 leading-relaxed font-medium tracking-wide">
                {children}
              </p>
            );
          },

          // 🔥 LISTAS CON JERARQUÍA VISUAL BRUTAL
          ul: ({ children }) => (
            <ul className="fudilist space-y-3 mb-6 ml-2">
              {children}
            </ul>
          ),

          li: ({ children }) => {
            const text = children?.toString() || '';
            
            // 🔥 LO QUE ESTÁ JALANDO - VERDE BRILLANTE
            if (text.includes('jalando') || text.includes('sabroso') || text.includes('Rush')) {
              return (
                <li className="jalando-item flex items-start space-x-3 p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/20 rounded-lg border-l-4 border-green-400">
                  <span className="text-green-400 text-xl animate-pulse">🔥</span>
                  <span className="text-lg font-semibold text-green-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // ⚠️ OJO CON ESTO - AMARILLO/ROJO ALERTA
            if (text.includes('Ojo con') || text.includes('bajó') || text.includes('problema')) {
              return (
                <li className="ojo-item flex items-start space-x-3 p-3 bg-gradient-to-r from-yellow-900/30 to-red-900/20 rounded-lg border-l-4 border-yellow-400">
                  <span className="text-yellow-400 text-xl animate-bounce">⚠️</span>
                  <span className="text-lg font-semibold text-yellow-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // 💡 PLOT TWIST - CYAN BRILLANTE
            if (text.includes('Plot twist') || text.includes('insight')) {
              return (
                <li className="plot-twist-item flex items-start space-x-3 p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/30 rounded-xl border-2 border-cyan-400/50">
                  <span className="text-cyan-400 text-xl animate-spin">💡</span>
                  <span className="text-xl font-bold text-cyan-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // 📊 BREAKDOWN ITEMS - ESTRUCTURA ÁRBOL
            if (text.includes('├─') || text.includes('└─')) {
              return (
                <li className="breakdown-item flex items-start space-x-2 p-2 bg-gray-800/50 rounded-md font-mono">
                  <span className="text-cyan-400 text-sm font-bold tracking-wider">
                    {children}
                  </span>
                </li>
              );
            }

            // → ACCIONES - PURPLE CON HOVER
            if (text.includes('→')) {
              return (
                <li className="accion-item group flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-900/30 to-indigo-900/20 rounded-lg border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 cursor-pointer">
                  <span className="text-purple-400 text-lg group-hover:animate-bounce">→</span>
                  <span className="text-lg font-medium text-purple-300 group-hover:text-purple-200 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // • ITEMS NORMALES - MEJORADOS
            return (
              <li className="normal-item flex items-start space-x-3 p-2">
                <span className="text-cyan-400 text-base">•</span>
                <span className="text-base text-gray-300 leading-relaxed">
                  {children}
                </span>
              </li>
            );
          },

          // 💪 TEXTO EN NEGRITAS - MÁS DRAMÁTICO
          strong: ({ children }) => (
            <strong className="font-black text-yellow-400 text-lg drop-shadow-md">
              {children}
            </strong>
          ),

          // 📋 TABLAS CON ESTILO FUTURISTA
          table: ({ children }) => (
            <div className="table-container mb-6 overflow-hidden rounded-xl border border-cyan-500/30 bg-gray-900/50">
              <table className="w-full">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="px-4 py-3 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-300 font-bold text-left border-b border-cyan-500/30">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-4 py-3 text-gray-300 border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
              {children}
            </td>
          ),

          // 📝 CÓDIGO CON TEMA FUTURISTA
          code: ({ children }) => (
            <code className="bg-gray-900/80 text-green-400 px-2 py-1 rounded font-mono text-sm border border-green-500/30">
              {children}
            </code>
          ),

          // 🔗 BLOCKQUOTES ÉPICOS
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

      {/* 🚀 SEPARADOR ANIMADO MATRIX MEJORADO */}
      {hasSeparator && (
        <div className="separator-container mt-8 mb-4 relative overflow-hidden">
          <div className="matrix-rain-enhanced relative">
            {/* Efecto Matrix mejorado */}
            <div className="matrix-line-enhanced">
              <span className="matrix-char-enhanced">{'<'}</span>
              <span className="matrix-text-enhanced animate-pulse">
                \_JOIN_THE_FUDIVERSE_
              </span>
              <span className="matrix-char-enhanced">{'/>'}</span>
            </div>
            
            {/* Efectos adicionales */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-bounce"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .matrix-rain-enhanced {
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
          padding: 1rem 0;
          text-align: center;
          position: relative;
          border-top: 1px solid rgba(0, 255, 255, 0.3);
          border-bottom: 1px solid rgba(0, 255, 255, 0.3);
        }

        .matrix-line-enhanced {
          font-family: 'Courier New', monospace;
          font-size: 1.2rem;
          font-weight: bold;
          color: #00ffff;
          text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
          animation: matrix-glow 2s ease-in-out infinite alternate;
        }

        .matrix-char-enhanced {
          color: #00ff00;
          font-size: 1.4rem;
          animation: matrix-flicker 1s infinite;
        }

        .matrix-text-enhanced {
          margin: 0 0.5rem;
          background: linear-gradient(45deg, #00ffff, #00ff00, #ffff00, #00ffff);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: matrix-rainbow 3s ease-in-out infinite;
        }

        @keyframes matrix-glow {
          from { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff; }
          to { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff; }
        }

        @keyframes matrix-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes matrix-rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .matrix-line-enhanced {
            font-size: 1rem;
          }
          .matrix-char-enhanced {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FudiMarkdown;