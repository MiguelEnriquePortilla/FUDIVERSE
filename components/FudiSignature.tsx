import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface FudiSignatureProps {
  content: string;
}

// FUDI SIGNATURE COMPONENT - TYPEWRITER ONLY
const FudiSignatureComponent: React.FC = () => {
  const [breathPhase, setBreathPhase] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  
  const fullText = 'JOIN_THE_FUDIVERSE';

  // Breathing animation for cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120); // 120ms per character

    return () => clearInterval(typingInterval);
  }, []);

  const cursorIntensity = 0.6 + Math.sin(breathPhase * 0.08) * 0.4;

  return (
    <div className="fudi-signature-container flex items-center justify-center py-6 mt-4">
      
      {/* TYPEWRITER TEXT + FLAME CURSOR */}
      <div className="flex items-center space-x-1">
        {/* Typewriter text */}
        <div 
          className="text-xs font-mono tracking-[0.15em] transition-all duration-300"
          style={{
            color: 'rgba(6, 182, 212, 0.8)',
            textShadow: '0 0 2px rgba(6, 182, 212, 0.3)'
          }}
        >
          {typewriterText}
        </div>
        
        {/* Animated Flame Cursor */}
        <div className="relative">
          <svg 
            width="12" 
            height="18" 
            viewBox="0 0 12 18" 
            className="transition-all duration-200"
            style={{
              opacity: cursorIntensity,
              filter: `drop-shadow(0 0 ${1 + cursorIntensity}px rgba(6, 182, 212, ${cursorIntensity * 0.8}))`,
              transform: `scale(${0.8 + cursorIntensity * 0.2}) translateY(${Math.sin(breathPhase * 0.06) * 0.5}px)`
            }}
          >
            {/* Flame cursor shape */}
            <path
              d="M6 1 C 4.5 3, 3 6, 3.5 9 C 4 12, 7.5 13.5, 9 10.5 C 9.5 9, 9 7.5, 8.5 6.75 C 8 6, 7.5 5.25, 6 1 Z"
              fill="url(#flameCursorGradient)"
              style={{ opacity: cursorIntensity }}
            />
            
            {/* Inner flame core */}
            <path
              d="M6 2.5 C 5.25 4.5, 4.5 6.75, 5 9 C 5.25 10.5, 7 11.25, 7.75 9.75 C 8 9, 7.75 8.25, 7.5 7.5 C 7.25 6.75, 7 6, 6 2.5 Z"
              fill="url(#innerFlameCursor)"
              style={{ opacity: cursorIntensity * 0.9 }}
            />

            {/* Cursor particle */}
            <circle 
              cx="6" 
              cy={11 + Math.sin(breathPhase * 0.09) * 0.8}
              r="0.4" 
              fill="rgba(255, 255, 255, 0.8)"
              style={{ opacity: Math.sin(breathPhase * 0.12) * 0.4 + 0.6 }}
            />

            {/* Gradients for cursor */}
            <defs>
              <linearGradient id="flameCursorGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 1)" />
                <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
                <stop offset="100%" stopColor="rgba(147, 197, 253, 0.7)" />
              </linearGradient>
              <linearGradient id="innerFlameCursor" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .fudi-signature-container {
          position: relative;
        }

        @media (max-width: 768px) {
          .fudi-signature-container {
            transform: scale(0.9);
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
          // CLAUDE-STYLE HEADERS
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

          // CLAUDE-STYLE PARAGRAPHS
          p: ({ children }) => (
            <p className="text-base text-gray-200 mb-4 leading-relaxed">
              {children}
            </p>
          ),

          // CLAUDE-STYLE LISTS
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

          // CLAUDE-STYLE EMPHASIS
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

          // CLAUDE-STYLE CODE
          code: ({ children }) => (
            <code className="bg-gray-800/60 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),

          // CLAUDE-STYLE BLOCKQUOTES
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gray-600 pl-4 py-2 my-4 bg-gray-800/30 rounded-r">
              <div className="text-gray-300 italic">
                {children}
              </div>
            </blockquote>
          )
        }}
      >
        {mainContent}
      </ReactMarkdown>

      {/* FUDI SIGNATURE - MINIMAL TYPEWRITER + FLAME CURSOR */}
      {hasSeparator && <FudiSignatureComponent />}

      <style jsx global>{`
        .claude-fudi-content {
          position: relative;
          line-height: 1.6;
        }

        .claude-fudi-content > * + * {
          margin-top: 1rem;
        }

        .claude-fudi-content p + p {
          margin-top: 1rem;
        }

        .claude-fudi-content ul + p,
        .claude-fudi-content ol + p {
          margin-top: 1rem;
        }

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