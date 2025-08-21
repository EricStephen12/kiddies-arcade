'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Game {
  id: string;
  title: string;
  category: string;
  description: string;
  coverArt: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ageGroup: string;
}

const games: Game[] = [
  {
    id: 'jump',
    title: 'Kiddies Jump',
    category: 'RHYTHM',
    description: 'Jump on colorful tiles and help the kiddie character reach new heights! Challenge your timing and reflexes in this addictive jumping adventure.',
    coverArt: '/images/tiles.jpg',
    difficulty: 'Easy',
    ageGroup: '4-8'
  },
  {
    id: 'puzzle',
    title: 'Image Sliding Puzzle',
    category: 'PUZZLE',
    description: 'Slide and arrange beautiful biblical and inspirational images to complete the puzzle! Test your spatial reasoning and patience with multiple difficulty levels.',
    coverArt: '/jigsaw/1a0dd4ee-42c0-4952-844f-56d1ea51ea05.jpg',
    difficulty: 'Easy',
    ageGroup: '3+'
  },
  {
    id: 'crossword',
    title: 'Word Search',
    category: 'PUZZLE',
    description: 'Find hidden words from Pastor Chris Oyakhilome\'s teachings in letter grids! Search horizontally, vertically, and diagonally.',
    coverArt: '/images/word.jpg',
    difficulty: 'Medium',
    ageGroup: '8+'
  },
  {
    id: 'quiz',
    title: 'Word Quiz',
    category: 'EDUCATION',
    description: 'Test your knowledge of Pastor Chris Oyakhilome\'s teachings with multiple choice questions! Learn while you play.',
    coverArt: '/images/quest.jpg',
    difficulty: 'Medium',
    ageGroup: '10+'
  },
  {
    id: 'memory',
    title: 'Memory Match',
    category: 'PUZZLE',
    description: 'Match cards and test your memory with Pastor Chris\'s teachings! Find pairs of words, symbols, and Bible stories.',
    coverArt: '/images/memory.jpg',
    difficulty: 'Easy',
    ageGroup: '6+'
  }
];

export default function GameArcade() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const router = useRouter();

  const categories = ['ALL', 'RHYTHM', 'ADVENTURE', 'ACTION', 'PUZZLE', 'EDUCATION'];

  const filteredGames = selectedCategory === 'ALL' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const handlePlayGame = (gameId: string) => {
    if (gameId === 'jump') {
      router.push('/play/tiles/levels');
    } else if (gameId === 'puzzle') {
      router.push('/arcade/puzzle');
    } else if (gameId === 'crossword') {
      router.push('/arcade/crossword');
    } else if (gameId === 'quiz') {
      router.push('/arcade/quiz');
    } else if (gameId === 'memory') {
      router.push('/arcade/memory');
    } else {
      router.push(`/play/${gameId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white pt-20">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Game Arcade
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">Choose your adventure and start playing!</p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              onClick={() => handlePlayGame(game.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              {/* Game Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={game.coverArt}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Game Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">{game.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-2">{game.description}</p>
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {game.category}
                    </span>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {game.difficulty}
                    </span>
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      {game.ageGroup}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
