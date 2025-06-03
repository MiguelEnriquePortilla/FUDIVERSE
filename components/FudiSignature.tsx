import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface FudiSignatureProps {
  content: string;
}

// FUDI SIGNATURE COMPONENT
const FudiSignatureComponent: React.FC = () => {
  const [breathPhase, setBreathPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const breathIntensity = 0.8 + Math.sin(breathPhase * 0.05) * 0.2;
  const glowIntensity = 0.3 + Math.sin(breathPhase * 0.03) * 0.1;

  return (
    <div className="fudi-signature-container flex flex-col items-center justify-center py-6 mt-4">
      
      {/* Minimalist Digital Flame */}
      <div className="relative flex items-center justify-center mb-3">
        <svg 
          width="32" 
          height="48" 
          viewBox="0 0 32 48" 
          className="transition-all duration-300"
          style={{
            opacity: breathIntensity,
            filter: `drop-shadow(0 0 ${2 + glowIntensity * 3}px rgba(6, 182, 212, ${glowIntensity}))`
          }}
        >
          <path
            d="M16 4 C 12 8, 8 16, 10 24 C 12 32, 20 36, 24 28 C 26 24, 24 20, 22 18 C 20 16, 18 14, 16 4 Z"
            fill="url(#flameGradient)"
            className="transition-all duration-500"
            style={{ opacity: breathIntensity }}
          />
          
          <path
            d="M16 8 C 14 12, 12 18, 14 24 C 15 28, 19 30, 21 26 C 22 24, 21 22, 20 20 C 19 18, 18 16, 16 8 Z"
            fill="url(#innerFlame)"
            className="transition-all duration-700"
            style={{ opacity: breathIntensity * 0.8 }}
          />

          <circle 
            cx="16" 
            cy={30 + Math.sin(breathPhase * 0.08) * 2}
            r="1" 
            fill="rgba(6, 182, 212, 0.6)"
            style={{ opacity: Math.sin(breathPhase * 0.1) * 0.5 + 0.5 }}
          />
          <circle 
            cx="18" 
            cy={26 + Math.sin(breathPhase * 0.06 + 1) * 1.5}
            r="0.5" 
            fill="rgba(147, 51, 234, 0.4)"
            style={{ opacity: Math.sin(breathPhase * 0.08 + 2) * 0.3 + 0.4 }}
          />

          <defs>
            <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.9)" />
              <stop offset="50%" stopColor="rgba(56, 189, 248, 0.7)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0.5)" />
            </linearGradient>
            <linearGradient id="innerFlame" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* FUDI Brand Mark */}
      <div 
        className="text-xs font-mono tracking-[0.2em] transition-all duration-500"
        style={{
          color: `rgba(6, 182, 212, ${0.6 + glowIntensity})`,
          textShadow: `0 0 ${1 + glowIntensity * 2}px rgba(6, 182, 212, 0.3)`,
          letterSpacing: '0.15em'
        }}
      >
        JOIN_THE_FUDIVERSE
      </div>

      {/* Subtle connection line */}
      <div className="mt-2 flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-px transition-all duration-300"
            style={{
              backgroundColor: `rgba(6, 182, 212, ${
                Math.sin(breathPhase * 0.04 + i * 0.5) > 0 ? glowIntensity * 0.8 : glowIntensity * 0.3
              })`,
              boxShadow: Math.sin(breathPhase * 0.04 + i * 0.5) > 0 
                ? `0 0 1px rgba(6, 182, 212, ${glowIntensity})` 
                : 'none'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .fudi-signature-container {
          position: relative;
        }

        .fudi-signature-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 80px;
          background: radial-gradient(ellipse, rgba(6, 182, 212, 0.02) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .fudi-signature-container svg {
            width: 28px;
            height: 42px;
          }
        }
      `}</style>
    </div>
  );
};

const FudiSignature: React.FC<FudiSignatureProps> = ({ content }) => {
  // Detectar el separador
  const parts = content.split('---');
  const mainContent = parts[0];
  const hasSeparator = parts.length > 1;

  return (
    <div className="claude-fudi-content">
      {/* MAIN CONTENT WITH CLAUDE-STYLE FORMATTING */}
      <ReactMarkdown
        components={{
          // 🎯 CLAUDE-STYLE HEADERS
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold text-white mb-4 leading-relaxed">
              {children}
            </h1>
          ),
          
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-white mb-3 leading-relaxed">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-gray-200 mb-3 leading-relaxed">
              {children}
            </h3>
          ),

          // 💬 CLAUDE-STYLE PARAGRAPHS
          p: ({ children }) => (
            <p className="text-base text-gray-200 mb-4 leading-relaxed">
              {children}
            </p>
          ),

          // 🔥 CLAUDE-STYLE LISTS
          ul: ({ children }) => (
            <ul className="space-y-2 mb-4 ml-2">
              {children}
            </ul>
          ),

          li: ({ children }) => (
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 text-sm mt-1">•</span>
              <span className="text-base text-gray-200 leading-relaxed">
                {children}
              </span>
            </li>
          ),

          // 🎯 CLAUDE-STYLE EMPHASIS
          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-gray-300">
              {children}
            </em>
          ),

          // 💻 CLAUDE-STYLE CODE
          code: ({ children }) => (
            <code className="bg-gray-800/60 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),

          // 📋 CLAUDE-STYLE BLOCKQUOTES
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gray-600 pl-4 py-2 my-4 bg-gray-800/30 rounded-r">
              <div className="text-gray-300 italic">
                {children}
              </div>
            </blockquote>
          ),

          // 📊 CLAUDE-STYLE TABLES
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-600 rounded-lg">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border border-gray-600 px-4 py-2 bg-gray-800 text-left font-medium text-gray-200">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-gray-600 px-4 py-2 text-gray-300">
              {children}
            </td>
          )
        }}
      >
        {mainContent}
      </ReactMarkdown>

      {/* 🔥 FUDI SIGNATURE - MINIMAL & ELEGANT */}
      {hasSeparator && <FudiSignatureComponent />}

      <style jsx global>{`
        .claude-fudi-content {
          position: relative;
          line-height: 1.6;
        }

        /* Ensure clean spacing */
        .claude-fudi-content > * + * {
          margin-top: 1rem;
        }

        /* Clean paragraph spacing */
        .claude-fudi-content p + p {
          margin-top: 1rem;
        }

        /* Clean list spacing */
        .claude-fudi-content ul + p,
        .claude-fudi-content ol + p {
          margin-top: 1rem;
        }

        /* Clean header spacing */
        .claude-fudi-content h1 + p,
        .claude-fudi-content h2 + p,
        .claude-fudi-content h3 + p {
          margin-top: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default FudiSignature;