import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface FudiSignatureProps {
  content: string;
}

// ENHANCED FUDI SIGNATURE COMPONENT - MATRIX DIGITAL REVEAL
const FudiSignatureComponent: React.FC = () => {
  const [mainText, setMainText] = useState('');
  const [subText, setSubText] = useState('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);
  const [glitchPhase, setGlitchPhase] = useState(0);
  
  const mainFullText = 'FudiGPT';
  const subFullText = 'join_the_fudiverse';
  const randomChars = '01フウディGPT人工知能×◊∆◇□■▣▤▥▦▧▨▩0101110011';

  // Glitch animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Matrix reveal effect for main text
  useEffect(() => {
    let currentIndex = 0;
    let revealedText = '';
    
    const revealInterval = setInterval(() => {
      if (currentIndex < mainFullText.length) {
        // Show random characters for 3-5 cycles before revealing
        let cycles = 0;
        const charReveal = setInterval(() => {
          if (cycles < 4) {
            const randomChar = randomChars[Math.floor(Math.random() * randomChars.length)];
            setMainText(revealedText + randomChar + mainFullText.substring(currentIndex + 1).split('').map(() => 
              Math.random() > 0.7 ? randomChars[Math.floor(Math.random() * randomChars.length)] : ' '
            ).join(''));
            cycles++;
          } else {
            revealedText += mainFullText[currentIndex];
            setMainText(revealedText + mainFullText.substring(currentIndex + 1).split('').map(() => ' ').join(''));
            currentIndex++;
            clearInterval(charReveal);
          }
        }, 80);
      } else {
        clearInterval(revealInterval);
        // Start subtitle after main text is done
        setTimeout(startSubtitle, 500);
      }
    }, 300);

    return () => clearInterval(revealInterval);
  }, []);

  const startSubtitle = () => {
    let currentIndex = 0;
    let revealedText = '';
    
    const revealInterval = setInterval(() => {
      if (currentIndex < subFullText.length) {
        let cycles = 0;
        const charReveal = setInterval(() => {
          if (cycles < 3) {
            const randomChar = randomChars[Math.floor(Math.random() * randomChars.length)];
            setSubText(revealedText + randomChar);
            cycles++;
          } else {
            revealedText += subFullText[currentIndex];
            setSubText(revealedText);
            currentIndex++;
            clearInterval(charReveal);
          }
        }, 60);
      } else {
        clearInterval(revealInterval);
      }
    }, 150);
  };

  // Particle system
  useEffect(() => {
    const particleInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now(),
          x: Math.random() * 300,
          y: Math.random() * 100,
          opacity: 1
        };
        
        setParticles(prev => [...prev.slice(-8), newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    }, 800);

    return () => clearInterval(particleInterval);
  }, []);

  const glitchIntensity = Math.sin(glitchPhase * 0.05) * 0.3 + 0.7;
  const shouldGlitch = Math.random() > 0.95;

  return (
    <div className="fudi-signature-container relative flex flex-col items-center justify-center py-4 mt-4 overflow-hidden">
      
      {/* Digital Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`,
          backgroundSize: '100px 100px',
          animation: 'float 20s infinite linear'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              animation: 'particleFloat 2s ease-out forwards',
              boxShadow: '0 0 4px rgba(6, 182, 212, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Main Title - FudiGPT */}
      <div className="relative mb-2">
        <div 
          className="text-lg font-bold tracking-wide font-mono transition-all duration-200"
          style={{
            color: 'rgba(6, 182, 212, 0.95)',
            textShadow: `
              0 0 8px rgba(6, 182, 212, 0.6),
              0 0 16px rgba(6, 182, 212, 0.4),
              0 0 24px rgba(6, 182, 212, 0.2)
            `,
            filter: shouldGlitch ? `hue-rotate(${Math.random() * 30}deg) saturate(${1.2 + Math.random() * 0.3})` : 'none',
            transform: shouldGlitch ? `translateX(${Math.random() * 2 - 1}px)` : 'none'
          }}
        >
          {mainText}
          
          {/* Scanning line effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)`,
              transform: `translateX(${Math.sin(glitchPhase * 0.02) * 200}%)`,
              opacity: glitchIntensity * 0.3
            }}
          />
        </div>
        
        {/* Glow effect behind main text */}
        <div 
          className="absolute inset-0 text-lg font-bold tracking-wide font-mono blur-sm -z-10"
          style={{
            color: 'rgba(6, 182, 212, 0.2)',
            transform: 'scale(1.05)'
          }}
        >
          {mainText}
        </div>
      </div>

      {/* Subtitle - join_the_fudiverse */}
      <div className="relative">
        <div 
          className="text-xs font-mono tracking-[0.15em] uppercase transition-all duration-300"
          style={{
            color: 'rgba(56, 189, 248, 0.7)',
            textShadow: '0 0 6px rgba(56, 189, 248, 0.3)',
            letterSpacing: '0.15em'
          }}
        >
          {subText}
          
          {/* Subtle flame cursor */}
          {subText && subText.length <= subFullText.length && (
            <svg 
              width="8" 
              height="12" 
              viewBox="0 0 8 12" 
              className="inline-block ml-1 transition-all duration-200"
              style={{
                opacity: Math.sin(glitchPhase * 0.1) * 0.4 + 0.6,
                filter: `drop-shadow(0 0 ${2 + Math.sin(glitchPhase * 0.08)}px rgba(6, 182, 212, 0.6))`,
                transform: `translateY(${Math.sin(glitchPhase * 0.06) * 0.3}px)`
              }}
            >
              <path
                d="M4 1 C 3 2.5, 2.5 4, 3 6 C 3.5 8, 5.5 8.5, 6 6.5 C 6.25 5.5, 6 4.5, 5.5 4 C 5 3.5, 4.75 3, 4 1 Z"
                fill="url(#miniFlameGradient)"
              />
              <path
                d="M4 2 C 3.5 3, 3.25 4.5, 3.5 6 C 3.75 7, 4.75 7.25, 5.25 6.25 C 5.5 5.75, 5.25 5.25, 5 4.75 C 4.75 4.25, 4.5 3.75, 4 2 Z"
                fill="url(#miniFlameInner)"
              />
              <defs>
                <linearGradient id="miniFlameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 1)" />
                  <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
                  <stop offset="100%" stopColor="rgba(147, 197, 253, 0.7)" />
                </linearGradient>
                <linearGradient id="miniFlameInner" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      </div>

      {/* Code streaming effect in corners */}
      <div className="absolute top-0 left-0 text-xs font-mono opacity-20 text-cyan-300">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} style={{
            transform: `translateY(${Math.sin(glitchPhase * 0.03 + i) * 10}px)`,
            opacity: Math.sin(glitchPhase * 0.02 + i) * 0.3 + 0.7
          }}>
            {randomChars.slice(i * 3, i * 3 + 8)}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 text-xs font-mono opacity-20 text-cyan-300">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i} style={{
            transform: `translateY(${Math.sin(glitchPhase * 0.025 + i + 10) * 8}px)`,
            opacity: Math.sin(glitchPhase * 0.03 + i + 10) * 0.3 + 0.7
          }}>
            {randomChars.slice(i * 4 + 10, i * 4 + 18)}
          </div>
        ))}
      </div>

      <style jsx>{`
        .fudi-signature-container {
          position: relative;
          min-height: 120px;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }

        @keyframes particleFloat {
          0% { 
            opacity: 1; 
            transform: translateY(0px) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translateY(-30px) scale(0.5);
          }
        }

        @media (max-width: 768px) {
          .fudi-signature-container {
            transform: scale(0.8);
            min-height: 100px;
          }
        }

        @media (max-width: 480px) {
          .fudi-signature-container {
            transform: scale(0.7);
            min-height: 90px;
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

      {/* ENHANCED FUDI SIGNATURE - MATRIX DIGITAL REVEAL */}
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