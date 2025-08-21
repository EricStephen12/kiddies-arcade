'use client';

import { motion } from 'framer-motion';

export default function PremiumBackground() {
  return (
    <>
      {/* Ultra Premium Background with Image */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Background Image Layer - much clearer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/images/bg.jpeg?v=1')" }}
        />
        
        {/* Animated color-changing overlay */}
        <motion.div 
          className="absolute inset-0 mix-blend-overlay"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(255, 0, 150, 0.1), rgba(0, 255, 255, 0.1))',
              'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 255, 0, 0.1))',
              'linear-gradient(45deg, rgba(255, 255, 0, 0.1), rgba(255, 0, 255, 0.1))',
              'linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 150, 0.1))',
              'linear-gradient(45deg, rgba(0, 255, 150, 0.1), rgba(255, 0, 150, 0.1))',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Subtle shimmer overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Premium floating sparkle dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Floating images emerging from bottom edge of background image */}
        {/* Desktop: 15 images, Mobile: 8 images */}
        {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15 }).map((_, i) => (
          <motion.div
            key={`emerging-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${Math.random() * 85}%`,
              width: typeof window !== 'undefined' && window.innerWidth < 768 ? '45px' : '60px',
              height: typeof window !== 'undefined' && window.innerWidth < 768 ? '45px' : '60px',
              bottom: '-80px',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: ['0%', '-120vh'],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: "linear"
            }}
          >
            <img 
              src={['/images/tiles.jpg', '/images/word.jpg', '/images/quest.jpg'][i % 3]} 
              alt="floating memorial" 
              className="w-full h-full object-cover rounded-lg filter brightness-110 opacity-70"
              onError={(e) => {
                console.log('Image not found');
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
