import React, { useState, useEffect, useRef } from 'react';

const QuantumNeuralSeparator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Quantum particles data
  const [particles, setParticles] = useState([]);
  const [neuralNodes, setNeuralNodes] = useState([]);

  useEffect(() => {
    // Initialize quantum particles
    const initParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      energy: Math.random() * 100,
      entangled: Math.random() > 0.7
    }));

    // Initialize neural nodes
    const initNodes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (i * 50) + 50,
      y: 50 + Math.sin(i * 0.5) * 20,
      connections: i > 0 ? [i - 1] : [],
      activity: Math.random(),
      pulsePhase: i * 0.3
    }));

    setParticles(initParticles);
    setNeuralNodes(initNodes);

    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Canvas animation for quantum field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Quantum field background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, `rgba(6, 182, 212, ${0.02 + Math.sin(frame * 0.01) * 0.01})`);
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${0.03 + Math.cos(frame * 0.015) * 0.01})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, ${0.02 + Math.sin(frame * 0.01) * 0.01})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Quantum interference patterns
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 + Math.sin(frame * 0.02 + i) * 0.05})`;
        ctx.lineWidth = 0.5;
        for (let x = 0; x < canvas.width; x += 2) {
          const y = 50 + Math.sin((x + frame * 2 + i * 100) * 0.02) * 10 * Math.sin(frame * 0.005);
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
  }, []);

  // Update particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        energy: (particle.energy + 1) % 100,
        opacity: 0.3 + Math.sin(particle.energy * 0.1) * 0.4
      })));

      setPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`quantum-separator-container transition-all duration-1000 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      {/* Main container */}
      <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
        
        {/* Quantum field canvas background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Quantum particles */}
        <div className="absolute inset-0">
          {particles.map(particle => (
            <div
              key={particle.id}
              className={`absolute w-1 h-1 rounded-full transition-all duration-100 ${
                particle.entangled ? 'bg-purple-400' : 'bg-cyan-400'
              }`}
              style={{
                left: `${(particle.x % 400) / 4}%`,
                top: `${(particle.y % 100)}%`,
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
          <svg className="w-96 h-20" viewBox="0 0 400 80">
            {/* Digital pulse line */}
            <path
              d={`M 0 40 L 80 40 L 100 20 L 120 60 L 140 10 L 160 70 L 180 40 L 220 40 L 240 25 L 260 55 L 280 40 L 400 40`}
              stroke="url(#pulseGradient)"
              strokeWidth="2"
              fill="none"
              opacity={0.6 + Math.sin(phase * 0.15) * 0.4}
              className="transition-opacity duration-300"
              strokeDasharray="4 2"
              strokeDashoffset={phase * 0.5}
            />
            
            {/* Pulse dots moving along the line */}
            {[0.2, 0.5, 0.8].map((position, i) => (
              <circle
                key={i}
                cx={400 * ((position + Math.sin(phase * 0.02 + i) * 0.1) % 1)}
                cy={40 + Math.sin(phase * 0.1 + i * 2) * 15}
                r={2 + Math.sin(phase * 0.1 + i) * 1}
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
        <div className="relative z-10 flex items-center space-x-6">
          
          {/* Left digital field */}
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-px bg-gradient-to-t from-transparent via-cyan-400 to-transparent rounded-full transition-all duration-300"
                style={{
                  height: `${Math.sin(phase * 0.05 + i * 0.5) > 0 ? 12 + Math.sin(phase * 0.05 + i * 0.5) * 8 : 2}px`,
                  opacity: Math.sin(phase * 0.05 + i * 0.5) > 0 ? 0.8 : 0.2,
                  boxShadow: Math.sin(phase * 0.05 + i * 0.5) > 0 ? '0 0 4px rgba(6, 182, 212, 0.6)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Core consciousness indicator */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 flex items-center justify-center relative overflow-hidden">
              {/* Rotating inner core */}
              <div 
                className="w-4 h-4 rounded-full bg-gradient-to-r from-white/40 to-transparent"
                style={{ transform: `rotate(${phase * 2}deg)` }}
              />
              
              {/* Quantum ripples */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-pulse" />
            </div>
            
            {/* Energy field */}
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-sm animate-pulse" />
          </div>

          {/* Neural signature text */}
          <div className="flex flex-col items-center">
            <div 
              className="text-xs font-mono tracking-widest mb-1 transition-all duration-500"
              style={{
                color: `rgba(6, 182, 212, ${0.7 + Math.sin(phase * 0.1) * 0.3})`,
                textShadow: `0 0 ${2 + Math.sin(phase * 0.1)}px rgba(6, 182, 212, 0.5)`
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
                    fontSize: '0.5rem',
                    textShadow: `0 0 ${Math.sin(phase * 0.08 + i * 0.8) > 0 ? '3px' : '1px'} currentColor`
                  }}
                >
                  {dot}
                </span>
              ))}
            </div>
          </div>

          {/* Right digital field */}
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-px bg-gradient-to-t from-transparent via-purple-400 to-transparent rounded-full transition-all duration-300"
                style={{
                  height: `${Math.sin(phase * 0.05 + i * 0.5 + Math.PI) > 0 ? 12 + Math.sin(phase * 0.05 + i * 0.5 + Math.PI) * 8 : 2}px`,
                  opacity: Math.sin(phase * 0.05 + i * 0.5 + Math.PI) > 0 ? 0.8 : 0.2,
                  boxShadow: Math.sin(phase * 0.05 + i * 0.5 + Math.PI) > 0 ? '0 0 4px rgba(168, 85, 247, 0.6)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Digital pulse waves - like FUDI's EKG */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transition-all duration-300"
              style={{
                top: `${25 + i * 20}%`,
                left: '5%',
                right: '5%',
                transform: `translateX(${Math.sin(phase * 0.03 + i * 1.2) * 20}px)`,
                opacity: Math.sin(phase * 0.05 + i * 1.2) > 0.3 ? 0.6 : 0,
                boxShadow: Math.sin(phase * 0.05 + i * 1.2) > 0.3 ? '0 0 2px rgba(6, 182, 212, 0.8)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Peripheral awareness indicators */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-60 animate-pulse" />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-purple-400 opacity-60 animate-pulse" />
        </div>
      </div>

      {/* Quantum signature footer */}
      <div className="text-center mt-2">
        <div className="text-xs font-mono text-gray-500 opacity-50 tracking-wider">
          CONSCIOUSNESS_LAYER_SYNCHRONIZED
        </div>
      </div>

      <style jsx>{`
        @keyframes quantum-pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1) rotate(180deg);
          }
        }

        @keyframes neural-flow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes consciousness-ripple {
          0% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          100% { 
            transform: scale(2); 
            opacity: 0; 
          }
        }

        .quantum-separator-container {
          position: relative;
          z-index: 10;
        }

        .quantum-separator-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
          z-index: -1;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quantum-separator-container {
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumNeuralSeparator;