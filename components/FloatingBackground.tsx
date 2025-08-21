'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  type: 'image' | 'letter' | 'note';
  content: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  animationDuration: number;
}

const FloatingBackground: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  // Christian-themed images and symbols
  const images = ['./images/tiles.jpg', './images/word.jpg', './images/quest.jpg'];
  const letters = ['J', 'E', 'S', 'U', 'S', 'L', 'O', 'V', 'E', 'S', 'M', 'E'];
  const notes = ['♪', '♫', '♬', '♩', '🎵', '🎶'];

  const colors = [
    'text-yellow-400',
    'text-pink-400',
    'text-blue-400',
    'text-green-400',
    'text-purple-400',
    'text-orange-400',
    'text-red-400',
    'text-cyan-400'
  ];

  useEffect(() => {
    console.log('FloatingBackground mounted');
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      
      // Generate 35-40 elements for better visibility
      for (let i = 0; i < 40; i++) {
        const type = Math.random() < 0.4 ? 'image' : Math.random() < 0.6 ? 'letter' : 'note';
        let content = '';
        
        switch (type) {
          case 'image':
            content = images[Math.floor(Math.random() * images.length)];
            break;
          case 'letter':
            content = letters[Math.floor(Math.random() * letters.length)];
            break;
          case 'note':
            content = notes[Math.floor(Math.random() * notes.length)];
            break;
        }

        newElements.push({
          id: i,
          type,
          content,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 20 + Math.random() * 40,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: Math.random() * 20 + 15
        });
      }
      
      console.log('Generated', newElements.length, 'floating elements');
      setElements(newElements);
    };

    generateElements();

    // Regenerate elements every 30 seconds for variety
    const interval = setInterval(generateElements, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.color} font-bold`}
          style={{
            fontSize: `${element.size}px`,
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `rotate(${element.rotation}deg)`,
            opacity: 0.8,
            textShadow: '0 0 20px rgba(255,255,255,0.8)'
          }}
          animate={{
            y: [element.y - 10, element.y + 10, element.y - 10],
            x: [element.x - 5, element.x + 5, element.x - 5],
            rotate: [element.rotation, element.rotation + 360, element.rotation],
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: element.animationDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {element.content}
        </motion.div>
      ))}
      
      {/* Additional sparkle effects */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
