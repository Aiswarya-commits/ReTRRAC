import React, { useEffect, useState } from 'react';

/**
 * FloatingElements renders ambient floating orbs, rings, and translucent particles
 * in soft purple and frosted white that gently drift and react to mouse movement.
 */
export default function FloatingElements({ count = 8, theme = 'light' }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Soft dampening
      const x = (e.clientX - window.innerWidth / 2) * 0.02;
      const y = (e.clientY - window.innerHeight / 2) * 0.02;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. Large Frosted White-Purple Floating Orb (Top-Right) */}
      <div 
        className="absolute top-12 right-[12%] w-32 h-32 rounded-full animate-float-slow"
        style={{
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0) 100%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(255, 255, 255, 0.1) 60%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'blur(8px)',
          transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      />

      {/* 2. Floating Delicate Purple Ring (Top-Left) */}
      <div 
        className="absolute top-28 left-[8%] w-24 h-24 rounded-full border-2 border-purple-300/40 animate-float-medium"
        style={{
          transform: `translate(${-mouseOffset.x * 1.2}px, ${-mouseOffset.y * 1.2}px)`,
          transition: 'transform 0.4s ease-out',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
        }}
      />

      {/* 3. Translucent Frosted Bubble with Glow (Center-Right) */}
      <div 
        className="absolute top-1/2 right-[6%] w-20 h-20 rounded-full animate-float-reverse"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(216, 180, 254, 0.3) 100%)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.18)',
          backdropFilter: 'blur(10px)',
          transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* 4. Small Electric Cyan-Purple Floating Sphere (Bottom-Left) */}
      <div 
        className="absolute bottom-20 left-[14%] w-16 h-16 rounded-full animate-float-drift"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(147, 197, 253, 0.4) 40%, rgba(168, 85, 247, 0.3) 100%)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 10px 25px rgba(99, 102, 241, 0.2)',
          transform: `translate(${-mouseOffset.x * 2}px, ${-mouseOffset.y * 2}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* 5. Minimalist Geometric Diamond Ring (Center-Left) */}
      <div 
        className="absolute top-1/3 left-[4%] w-10 h-10 border border-purple-400/50 rotate-45 animate-float-slow"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px) rotate(45deg)`,
          transition: 'transform 0.4s ease-out'
        }}
      />

      {/* 6. Soft Translucent White Disc (Bottom-Right) */}
      <div 
        className="absolute bottom-12 right-[18%] w-14 h-14 rounded-full border border-white/60 bg-white/40 backdrop-blur-md animate-float-medium"
        style={{
          boxShadow: '0 6px 20px rgba(124, 58, 237, 0.12)',
          transform: `translate(${-mouseOffset.x * 1.3}px, ${-mouseOffset.y * 1.3}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      />

    </div>
  );
}
