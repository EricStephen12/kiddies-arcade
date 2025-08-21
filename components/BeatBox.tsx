'use client';

import { useEffect, useRef } from 'react';

interface MusicBoxProps {
  isPlaying: boolean;
  className?: string;
  size?: number;
  beatCount?: number; // Add beatCount to the interface
}

export const BeatBox: React.FC<MusicBoxProps> = ({ 
  isPlaying, 
  className = '',
  size = 80 // Increased default size from 40 to 80
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  // Simplified animation effect for better performance
  useEffect(() => {
    if (!isPlaying || !boxRef.current) return;
    
    const box = boxRef.current;
    let frame = 0;
    
    const animate = () => {
      if (!isPlaying) return;
      
      frame++;
      
      // Optimized for 60 FPS smooth animation
      if (frame % 2 !== 0) { // Only update every other frame for 30 FPS effect
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const time = frame * 0.015; // Optimized timing
      
      // Smooth pulsing effect
      const pulse = Math.sin(time * 3) * 0.08; // Slightly more visible
      const scale = 1 + pulse;
      
      if (box) {
        box.style.transform = `scale(${scale})`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Reset styles when animation stops
      if (box) {
        box.style.transform = '';
      }
    };
  }, [isPlaying]);
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        ref={boxRef}
        className={`rounded-2xl border-2 border-pink-400/50 flex items-center justify-center
          transition-all duration-300 ease-out transform-gpu`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: 'radial-gradient(circle at 30% 30%, #ec4899, #7e22ce 80%)',
          boxShadow: '0 0 15px 5px rgba(236, 72, 153, 0.3)',
          willChange: 'transform',
        }}
      >
        {/* Music note icon */}
        <svg 
          className="w-3/5 h-3/5 text-white/90" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-1.5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      </div>
    </div>
  );
};
