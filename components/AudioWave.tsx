'use client';

import { useEffect, useRef } from 'react';

interface AudioWaveProps {
  isPlaying: boolean;
  className?: string;
}

export const AudioWave: React.FC<AudioWaveProps> = ({ isPlaying, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simple animated wave effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const barCount = 20;
    const bars: HTMLDivElement[] = [];
    
    // Create bars
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'absolute bottom-0 bg-gradient-to-t from-pink-500 to-purple-600 rounded-t-md';
      bar.style.left = `${(i / barCount) * 100}%`;
      bar.style.width = `${(1 / barCount) * 60}%`;
      bar.style.height = '10%';
      bar.style.transition = 'height 0.3s ease-out';
      container.appendChild(bar);
      bars.push(bar);
    }
    
    // Animate bars
    const animate = () => {
      if (!isPlaying) {
        // Gentle pulsing when not playing
        bars.forEach((bar, i) => {
          const height = 10 + Math.sin(Date.now() * 0.002 + i * 0.3) * 5;
          bar.style.height = `${height}%`;
        });
      } else {
        // More active animation when playing
        bars.forEach((bar, i) => {
          const height = 10 + Math.sin(Date.now() * 0.005 + i * 0.5) * 30 + 
                        Math.sin(Date.now() * 0.01 + i) * 10;
          bar.style.height = `${Math.max(5, Math.min(95, height))}%`;
        });
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      bars.forEach(bar => bar.remove());
    };
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-16 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm ${className}`}
    />
  );
};
