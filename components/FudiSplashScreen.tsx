'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function FudiSplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeOut 0.8s ease-out 2s forwards'
    }}>
      <Image
        src="/favicon.png"
        alt="FUDI"
        width={500}
        height={500}
        priority
        style={{ 
          borderRadius: '32px',
          filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.5))'
        }}
      />
    </div>
  );
}