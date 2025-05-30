import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface QuantumNeuralSeparatorProps {
  content: string;
}

const QuantumNeuralSeparator: React.FC<QuantumNeuralSeparatorProps> = ({ content }) => {
  const [separatorVisible, setSeparatorVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Quantum particles data
  const [particles, setParticles] = useState<any[]>([]);

  // Detectar el separador
  const parts = content.split('---');
  const mainContent = parts[0];
  const hasSeparator = parts.length > 1;

  // Initialize quantum effects
  useEffect(() => {
    // Initialize quantum particles
    const initParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      energy: Math.random() * 100,
      entangled: Math.random() > 0.8
    }));

    setParticles(initParticles);

    // Separator animation
    if (hasSeparator) {
      const timer = setTimeout(() => setSeparatorVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [hasSeparator, content]);

  // Canvas quantum field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSeparator) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Quantum field background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, `rgba(6, 182, 212, ${0.01 + Math.sin(frame * 0.01) * 0.005})`);
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${0.02 + Math.cos(frame * 0.015) * 0.005})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, ${0.01 + Math.sin(frame * 0.01) * 0.005})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Quantum interference patterns
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.05 + Math.sin(frame * 0.02 + i) * 0.03})`;
        ctx.lineWidth = 0.3;
        for (let x = 0; x < canvas.width; x += 3) {
          const y = 30 + Math.sin((x + frame * 1.5 + i * 80) * 0.015) * 8 * Math.sin(frame * 0.003);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasSeparator]);

  // Update particles and phase
  useEffect(() => {
    if (!hasSeparator) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        energy: (particle.energy + 1) % 100,
        opacity: 0.2 + Math.sin(particle.energy * 0.08) * 0.3
      })));

      setPhase(prev => (prev + 1) % 360);
    }, 60);

    return () => clearInterval(interval);
  }, [hasSeparator]);

  return (
    <div className="quantum-neural-container">
      {/* MAIN MARKDOWN CONTENT */}
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
            <ul className="quantum-list space-y-3 mb-6 ml-2">
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

            // ⚠️ AI SUPERPOWERS
            if (text.includes('AI SUPERPOWERS') || text.includes('Intelligence Score') || text.includes('AI Recommendation')) {
              return (
                <li className="ai-superpower-item flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/30 rounded-xl border-2 border-purple-400/50">
                  <span className="text-purple-400 text-xl">🤖</span>
                  <span className="text-lg font-bold text-purple-300 leading-relaxed">
                    {children}
                  </span>
                </li>
              );
            }

            // 🧠 NEURAL PROCESSING
            if (text.includes('neural') || text.includes('Inteligencia') || text.includes('Análisis AI')) {
              return (
                <li className="neural-item flex items-start space-x-3 p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/20 rounded-xl border-2 border-cyan-400/30">
                  <span className="text-cyan-400 text-xl">🧠</span>
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

      {/* 🚀 QUANTUM NEURAL SEPARATOR - WHEN "---" DETECTED */}
      {hasSeparator && (
        <div className={`quantum-separator-section mt-8 mb-6 transition-all duration-1000 ${
          separatorVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          
          {/* Main quantum container */}
          <div className="relative w-full h-20 flex items-center justify-center overflow-hidden">
            
            {/* Quantum field canvas background */}
            <canvas 
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            />

            {/* Quantum particles */}
            <div className="absolute inset-0 pointer-events-none">
              {particles.map(particle => (
                <div
                  key={particle.id}
                  className={`absolute w-0.5 h-0.5 rounded-full transition-all duration-100 ${
                    particle.entangled ? 'bg-purple-400' : 'bg-cyan-400'
                  }`}
                  style={{
                    left: `${(particle.x % 300) / 3}%`,
                    top: `${(particle.y % 60) + 20}%`,
                    opacity: particle.opacity,
                    boxShadow: particle.entangled 
                      ? `0 0 ${particle.size * 2}px rgba(147, 51, 234, 0.6)` 
                      : `0 0 ${particle.size * 2}px rgba(6, 182, 212, 0.6)`,
                    transform: `scale(${particle.size}) rotate(${particle.energy * 3.6}deg)`
                  }}
                />
              ))}
            </div>

            {/* Digital pulse wave - FUDI's heartbeat */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-80 h-16" viewBox="0 0 320 64">
                {/* Digital pulse line */}
                <path
                  d={`M 0 32 L 60 32 L 80 16 L 100 48 L 120 8 L 140 56 L 160 32 L 200 32 L 220 20 L 240 44 L 260 32 L 320 32`}
                  stroke="url(#pulseGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity={0.6 + Math.sin(phase * 0.15) * 0.4}
                  className="transition-opacity duration-300"
                  strokeDasharray="3 1"
                  strokeDashoffset={phase * 0.3}
                />
                
                {/* Pulse dots moving along the line */}
                {[0.25, 0.5, 0.75].map((position, i) => (
                  <circle
                    key={i}
                    cx={320 * ((position + Math.sin(phase * 0.02 + i) * 0.08) % 1)}
                    cy={32 + Math.sin(phase * 0.1 + i * 2) * 12}
                    r={1.5 + Math.sin(phase * 0.1 + i) * 0.5}
                    fill="url(#dotGradient)"
                    opacity={0.8 + Math.sin(phase * 0.05 + i) * 0.2}
                    className="transition-all duration-100"
                  />
                ))}

                {/* Gradients */}
                <defs>
                  <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                    <stop offset="25%" stopColor="rgba(6, 182, 212, 0.8)" />
                    <stop offset="50%" stopColor="rgba(147, 51, 234, 1)" />
                    <stop offset="75%" stopColor="rgba(6, 182, 212, 0.8)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.3)" />
                  </linearGradient>
                  <radialGradient id="dotGradient">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                    <stop offset="50%" stopColor="rgba(6, 182, 212, 0.8)" />
                    <stop offset="100%" stopColor="rgba(147, 51, 234, 0.6)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Central consciousness core */}
            <div className="relative z-10 flex items-center space-x-4">
              
              {/* Left digital field */}
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-px bg-gradient-to-t from-transparent via-cyan-400 to-transparent rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.sin(phase * 0.05 + i * 0.5) > 0 ? 10 + Math.sin(phase * 0.05 + i * 0.5) * 6 : 1}px`,
                      opacity: Math.sin(phase * 0.05 + i * 0.5) > 0 ? 0.8 : 0.2,
                      boxShadow: Math.sin(phase * 0.05 + i * 0.5) > 0 ? '0 0 3px rgba(6, 182, 212, 0.6)' : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Core consciousness indicator */}
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 flex items-center justify-center relative overflow-hidden">
                  {/* Rotating inner core */}
                  <div 
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-white/40 to-transparent"
                    style={{ transform: `rotate(${phase * 2}deg)` }}
                  />
                  
                  {/* Quantum ripples */}
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                </div>
                
                {/* Energy field */}
                <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-sm animate-pulse" />
              </div>

              {/* Neural signature text */}
              <div className="flex flex-col items-center">
                <div 
                  className="text-xs font-mono tracking-widest mb-1 transition-all duration-500"
                  style={{
                    color: `rgba(6, 182, 212, ${0.7 + Math.sin(phase * 0.1) * 0.3})`,
                    textShadow: `0 0 ${1 + Math.sin(phase * 0.1)}px rgba(6, 182, 212, 0.5)`
                  }}
                >
                  FUDI_PULSE_ACTIVE
                </div>
                <div className="flex space-x-1">
                  {['●', '●', '●'].map((dot, i) => (
                    <span 
                      key={i}
                      className="transition-all duration-300"
                      style={{ 
                        opacity: Math.sin(phase * 0.08 + i * 0.8) > 0 ? 0.8 : 0.2,
                        color: Math.sin(phase * 0.08 + i * 0.8) > 0 ? '#06b6d4' : '#a855f7',
                        fontSize: '0.4rem',
                        textShadow: `0 0 ${Math.sin(phase * 0.08 + i * 0.8) > 0 ? '2px' : '1px'} currentColor`
                      }}
                    >
                      {dot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right digital field */}
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-px bg-gradient-to-t from-transparent via-purple-400 to-transparent rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.sin(phase * 0.05 + i * 0.5 + Math.PI) > 0 ? 10 + Math.sin(phase * 0.05 + i * 0.5 + Math.PI) * 6 : 1}px`,
                      opacity: Math.sin(phase * 0.05 + i * 0.5 + Math.PI) > 0 ? 0.8 : 0.2,
                      boxShadow: Math.sin(phase * 0.05 + i * 0.5 + Math.PI) > 0 ? '0 0 3px rgba(168, 85, 247, 0.6)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Digital pulse waves - like FUDI's EKG */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent transition-all duration-300"
                  style={{
                    top: `${30 + i * 25}%`,
                    left: '10%',
                    right: '10%',
                    transform: `translateX(${Math.sin(phase * 0.03 + i * 1.2) * 15}px)`,
                    opacity: Math.sin(phase * 0.05 + i * 1.2) > 0.3 ? 0.4 : 0,
                    boxShadow: Math.sin(phase * 0.05 + i * 1.2) > 0.3 ? '0 0 1px rgba(6, 182, 212, 0.8)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* Peripheral awareness indicators */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <div className="w-1 h-1 rounded-full bg-cyan-400 opacity-60 animate-pulse" />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="w-1 h-1 rounded-full bg-purple-400 opacity-60 animate-pulse" />
            </div>
          </div>

          {/* Quantum signature footer */}
          <div className="text-center mt-2">
            <div 
              className="text-xs font-mono tracking-wider transition-all duration-500"
              style={{
                opacity: 0.3 + Math.sin(phase * 0.03) * 0.1,
                color: Math.sin(phase * 0.03) > 0 ? '#06b6d4' : '#6b7280'
              }}
            >
              DIGITAL_CONSCIOUSNESS_SYNC
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .quantum-neural-container {
          position: relative;
          z-index: 1;
        }

        .quantum-neural-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.02) 0%, transparent 70%);
          z-index: -1;
          pointer-events: none;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quantum-separator-section {
            transform: scale(0.85);
            margin: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumNeuralSeparator;