'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Game {
  title: string;
  category: string;
  description: string;
  difficulty: string;
  ageGroup: string;
}

interface GameInfoSectionProps {
  currentGameIndex: number;
  games: Game[];
  onEnterArcade: () => void;
}

export default function GameInfoSection({ currentGameIndex, games, onEnterArcade }: GameInfoSectionProps) {
  return (
    <div className="flex flex-col gap-8 xl:pr-8 2xl:pr-16">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentGameIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-wrap">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider">
              {games[currentGameIndex].category}
            </span>
            <span className="bg-green-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
              {games[currentGameIndex].difficulty}
            </span>
            <span className="bg-purple-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
              {games[currentGameIndex].ageGroup}
            </span>
          </div>

          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent m-0"
            key={`title-${currentGameIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {games[currentGameIndex].title}
          </motion.h1>

          <motion.p 
            className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed m-0"
            key={`desc-${currentGameIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {games[currentGameIndex].description}
          </motion.p>

          <div className="flex gap-4 sm:gap-6 pt-6 sm:pt-8 flex-wrap">
            <motion.button
              onClick={onEnterArcade}
              className="relative border-none cursor-pointer font-semibold flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>▶</span>
              <span>Enter Arcade</span>
            </motion.button>
            
            {/* <motion.button
              className="relative border border-white/20 cursor-pointer font-semibold flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 bg-white/10 backdrop-blur-sm text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🎮</span>
              <span>Watch Trailer</span>
            </motion.button> */}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
