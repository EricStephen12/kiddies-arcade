'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumLoadingProps {
  isLoading: boolean;
  onComplete: () => void;
}

export default function PremiumLoading({ isLoading, onComplete }: PremiumLoadingProps) {
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3500); // 3.5 seconds for full premium loading experience

      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Loveworld Kiddies Logo Animation */}
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Logo */}
              <motion.div
                className="w-32 h-32 mx-auto mb-8 relative"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl shadow-yellow-500/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-white">JC</span>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
              </motion.div>

              {/* Brand Name */}
              <motion.h1
                className="text-5xl md:text-6xl font-black text-white mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Joycall
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Kiddies
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl text-white/80 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Gaming for Champions
              </motion.p>
            </motion.div>

            {/* Loading Progress */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <div className="text-center mb-6">
                <motion.p
                  className="text-white/70 text-lg mb-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Setting up your experience...
                </motion.p>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, delay: 1.8, ease: "easeInOut" }}
                />
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-white/60 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
