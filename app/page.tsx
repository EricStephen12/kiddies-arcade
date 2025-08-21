'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PremiumLoading from '@/components/PremiumLoading';
import PremiumBackground from '@/components/PremiumBackground';
import GameInfoSection from '@/components/GameInfoSection';
import GameCardsSection from '@/components/GameCardsSection';

interface Game {
  title: string;
  category: string;
  description: string;
  coverArt: string;
  difficulty: string;
  ageGroup: string;
}

const games: Game[] = [
  {
    title: "Kiddies Jump",
    category: "RHYTHM",
    description: "Jump on colorful tiles and help the kiddie character reach new heights! Challenge your timing and reflexes in this addictive jumping adventure.",
    coverArt: "/images/tiles.jpg",
    difficulty: "Easy",
    ageGroup: "4-8"
  },
  {
    title: "Word Search",
    category: "PUZZLE",
    description: "Find hidden words from Pastor Chris Oyakhilome's teachings in letter grids! Search horizontally, vertically, and diagonally.",
    coverArt: "/images/word.jpg",
    difficulty: "Medium",
    ageGroup: "8+"
  },
  {
    title: "Memory Match",
    category: "PUZZLE",
    description: "Match cards and test your memory with Pastor Chris's teachings! Find pairs of words, symbols, and Bible stories.",
    coverArt: "/images/memory.jpg",
    difficulty: "Easy",
    ageGroup: "6+"
  }
];

export default function MainMenu() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPremiumLoading, setShowPremiumLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterArcade = () => {
    setShowPremiumLoading(true);
    setTimeout(() => {
      router.push('/arcade');
    }, 3500);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
        <div className="min-h-screen bg-black/60 text-white relative overflow-hidden font-sans z-10">
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center z-50"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <PremiumBackground />

          {/* Main Content */}
          <div className="relative z-40 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 sm:gap-24 lg:gap-32 xl:gap-40 2xl:gap-48 items-center min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
              <GameInfoSection 
                currentGameIndex={currentGameIndex}
                games={games}
                onEnterArcade={handleEnterArcade}
              />
              
              <GameCardsSection 
                games={games}
                currentGameIndex={currentGameIndex}
                onGameSelect={setCurrentGameIndex}
              />
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-4 mt-16">
            {games.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentGameIndex(index)}
                className={`w-4 h-4 rounded-full border-none cursor-pointer transition-all duration-300 ${index === currentGameIndex ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/30'}`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium Loading Screen */}
      <PremiumLoading 
        isLoading={showPremiumLoading} 
        onComplete={() => setShowPremiumLoading(false)} 
      />
    </>
  );
}
