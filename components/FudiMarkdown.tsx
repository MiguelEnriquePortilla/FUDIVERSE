import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface FudiMarkdownProps {
  content: string;
}

// 🎬 SISTEMA DE SEPARADORES TEMÁTICOS
const separatorThemes = {
  matrix: {
    text: '\\_ENTER_THE_MATRIX_',
    brackets: ['<', '/>'],
    colors: ['#00ff00', '#00ffff'],
    animation: 'matrix-digital-rain',
    particles: true,
    sound: 'matrix-beep'
  },
  minecraft: {
    text: 'CRAFTING_SUCCESS_COMPLETE',
    brackets: ['[', ']'],
    colors: ['#8B4513', '#228B22'],
    animation: 'pixel-build',
    particles: false,
    sound: 'minecraft-ding'
  },
  cyberpunk: {
    text: 'WAKE_THE_F*CK_UP_SAMURAI',
    brackets: ['>>', '<<'],
    colors: ['#FF0080', '#00FFFF'],
    animation: 'cyberpunk-glitch',
    particles: true,
    sound: 'cyberpunk-synth'
  },
  starwars: {
    text: 'MAY_THE_GPT_BE_WITH_YOU',
    brackets: ['===', '==='],
    colors: ['#FFD700', '#0000FF'],
    animation: 'lightsaber-glow',
    particles: false,
    sound: 'lightsaber-hum'
  },
  // 💰 BRANDED SEPARATORS
  cocacola: {
    text: 'DESTAPA_LA_FELICIDAD',
    brackets: ['🥤', '🥤'],
    colors: ['#FF0000', '#FFFFFF'],
    animation: 'bubble-fizz',
    particles: true,
    sound: 'bottle-open'
  },
  netflix: {
    text: 'BINGE_YOUR_BUSINESS',
    brackets: ['📺', '📺'],
    colors: ['#E50914', '#000000'],
    animation: 'netflix-loading',
    particles: false,
    sound: 'netflix-tudum'
  }
};

// 🎯 TEMPORADAS AUTOMÁTICAS
const getSeasonalTheme = () => {
  const month = new Date().getMonth();
  const day = new Date().getDate();
  
  // Eventos especiales
  if (month === 11 && day >= 15) return 'matrix'; // Navidad tech
  if (month === 9) return 'cyberpunk'; // Octubre cyberpunk
  if (month === 4 && day === 4) return 'starwars'; // May 4th
  
  // Rotación diaria
  const themes = Object.keys(separatorThemes);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return themes[dayOfYear % themes.length];
};

const FudiMarkdown: React.FC<FudiMarkdownProps> = ({ content }) => {
  const [separatorVisible, setSeparatorVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(getSeasonalTheme());
  const [particlesActive, setParticlesActive] = useState(false);
  
  // Detectar el separador animado
  const parts = content.split('---');
  const mainContent = parts[0];
  const hasSeparator = parts.length > 1;

  // Animación aparece/desaparece
  useEffect(() => {
    if (hasSeparator) {
      // Aparece después de 500ms
      const showTimer = setTimeout(() => {
        setSeparatorVisible(true);
        setParticlesActive(true);
      }, 500);

      // Desaparece después de 4 segundos
      const hideTimer = setTimeout(() => {
        setSeparatorVisible(false);
        setParticlesActive(false);
      }, 4000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [hasSeparator, content]);

  const theme = separatorThemes[currentTheme as keyof typeof separatorThemes];

  return (
    <div className="fudimarkdown-container">
      <ReactMarkdown
        components={{
          // ... (todo el código anterior de componentes)
          
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
                <div className="insight-principal mb-6 p-6 bg-gradient-to-br from-yellow-900/40 via-orange-900/30 to-red-900/20 rounded-2xl border-2 border-yellow-500/50 shadow-2xl relative overflow-hidden">
                  <p className="text-3xl md:text-4xl font-black text-yellow-300 leading-tight tracking-wide drop-shadow-lg relative z-10">
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

      {/* 🚀 SEPARADOR TEMÁTICO ÉPICO CON APARICIÓN/DESAPARICIÓN */}
      {hasSeparator && (
        <div className={`separator-container mt-8 mb-4 relative overflow-hidden transition-all duration-1000 ${
          separatorVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className={`themed-separator-${currentTheme} relative`}>
            {/* Partículas de fondo */}
            {particlesActive && theme.particles && (
              <div className="absolute inset-0 particles-container">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="particle absolute w-1 h-1 bg-white rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Separador principal */}
            <div className={`separator-line-${currentTheme} relative z-10`}>
              <span className="separator-bracket-left" style={{ color: theme.colors[0] }}>
                {theme.brackets[0]}
              </span>
              <span 
                className="separator-text animate-pulse mx-2"
                style={{ 
                  background: `linear-gradient(45deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {theme.text}
              </span>
              <span className="separator-bracket-right" style={{ color: theme.colors[1] }}>
                {theme.brackets[1]}
              </span>
            </div>

            {/* Efectos específicos por tema */}
            <div className={`theme-effects theme-effects-${currentTheme}`}>
              {currentTheme === 'matrix' && (
                <div className="matrix-rain">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="matrix-column" style={{ left: `${i * 10}%` }}>
                      <div className="matrix-char animate-matrix-fall">{'01'[Math.floor(Math.random() * 2)]}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {currentTheme === 'minecraft' && (
                <div className="pixel-border">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`pixel-block pixel-block-${i} animate-pixel-build`} />
                  ))}
                </div>
              )}
              
              {currentTheme === 'cyberpunk' && (
                <div className="cyberpunk-glitch">
                  <div className="glitch-line glitch-line-1"></div>
                  <div className="glitch-line glitch-line-2"></div>
                  <div className="glitch-line glitch-line-3"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* 🎬 ANIMACIONES POR TEMA */
        
        /* MATRIX THEME */
        .themed-separator-matrix {
          background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
          padding: 1.5rem 0;
          text-align: center;
          border-top: 1px solid rgba(0, 255, 0, 0.3);
          border-bottom: 1px solid rgba(0, 255, 0, 0.3);
          font-family: 'Courier New', monospace;
        }

        .separator-line-matrix {
          font-size: 1.2rem;
          font-weight: bold;
          text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
        }

        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .matrix-column {
          position: absolute;
          top: -20px;
          bottom: -20px;
          width: 2px;
        }

        .matrix-char {
          color: #00ff00;
          font-size: 12px;
          font-family: monospace;
          position: absolute;
        }

        /* MINECRAFT THEME */
        .themed-separator-minecraft {
          background: linear-gradient(90deg, #8B4513, #228B22, #8B4513);
          padding: 1rem 0;
          text-align: center;
          border: 4px solid #654321;
          font-family: 'Minecraft', monospace;
          image-rendering: pixelated;
        }

        .separator-line-minecraft {
          font-size: 1.1rem;
          font-weight: bold;
          text-shadow: 2px 2px 0 #000;
        }

        .pixel-border {
          position: absolute;
          inset: 0;
        }

        .pixel-block {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #228B22;
          border: 1px solid #32CD32;
        }

        .pixel-block-0 { top: 0; left: 0; }
        .pixel-block-1 { top: 0; right: 0; }
        .pixel-block-2 { bottom: 0; left: 0; }
        .pixel-block-3 { bottom: 0; right: 0; }

        /* CYBERPUNK THEME */
        .themed-separator-cyberpunk {
          background: linear-gradient(90deg, #FF0080, #00FFFF, #FF0080);
          padding: 1.5rem 0;
          text-align: center;
          border-top: 2px solid #FF0080;
          border-bottom: 2px solid #00FFFF;
          position: relative;
          overflow: hidden;
        }

        .separator-line-cyberpunk {
          font-size: 1.3rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px #FF0080, 0 0 20px #00FFFF;
        }

        .cyberpunk-glitch {
          position: absolute;
          inset: 0;
        }

        .glitch-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF0080, transparent);
          animation: glitch-move 2s linear infinite;
        }

        .glitch-line-1 { top: 20%; animation-delay: 0s; }
        .glitch-line-2 { top: 50%; animation-delay: 0.5s; }
        .glitch-line-3 { top: 80%; animation-delay: 1s; }

        /* STAR WARS THEME */
        .themed-separator-starwars {
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
          padding: 1.5rem 0;
          text-align: center;
          border-top: 1px solid #FFD700;
          border-bottom: 1px solid #FFD700;
        }

        .separator-line-starwars {
          font-size: 1.2rem;
          font-weight: bold;
          text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        }

        /* BRANDED THEMES */
        .themed-separator-cocacola {
          background: linear-gradient(90deg, #FF0000, #FFFFFF, #FF0000);
          padding: 1rem 0;
          text-align: center;
          border: 2px solid #FF0000;
        }

        .themed-separator-netflix {
          background: linear-gradient(90deg, #E50914, #000000, #E50914);
          padding: 1rem 0;
          text-align: center;
          border: 2px solid #E50914;
        }

        /* ANIMACIONES */
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }

        @keyframes pixel-build {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes glitch-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-matrix-fall {
          animation: matrix-fall 3s linear infinite;
        }

        .animate-pixel-build {
          animation: pixel-build 1s ease-out infinite;
        }

        .particle {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .separator-line-matrix,
          .separator-line-minecraft,
          .separator-line-cyberpunk,
          .separator-line-starwars {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FudiMarkdown;