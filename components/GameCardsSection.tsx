'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Game {
  title: string;
  category: string;
  description: string;
  coverArt: string;
  difficulty: string;
  ageGroup: string;
}

interface GameCardsSectionProps {
  games: Game[];
  currentGameIndex: number;
  onGameSelect: (index: number) => void;
}

export default function GameCardsSection({ games, currentGameIndex, onGameSelect }: GameCardsSectionProps) {
  const router = useRouter();

  const navigateNext = () => {
    onGameSelect((currentGameIndex + 1) % games.length);
  };

  const navigatePrev = () => {
    onGameSelect((currentGameIndex - 1 + games.length) % games.length);
  };

  const navigateToGame = (gameTitle: string) => {
    switch (gameTitle.toLowerCase()) {
      case 'kiddies jump':
        router.push('/play');
        break;
      case 'word search':
        router.push('/arcade/crossword');
        break;
      case 'memory match':
        router.push('/arcade/memory');
        break;
      default:
        router.push('/arcade');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative flex justify-center order-last xl:order-last perspective-1000 xl:ml-8 2xl:ml-16 mt-16 lg:mt-0"
    >
      <div className="relative w-full max-w-4xl">
        {/* Navigation Arrows */}
        <button
          onClick={navigatePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hidden lg:block"
          aria-label="Previous game"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={navigateNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hidden lg:block"
          aria-label="Next game"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-between items-center mb-4 px-4">
          <button
            onClick={navigatePrev}
            className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 touch-manipulation"
            aria-label="Previous game"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-white text-sm font-semibold">
            {currentGameIndex + 1} / {games.length}
          </span>
          
          <button
            onClick={navigateNext}
            className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 touch-manipulation"
            aria-label="Next game"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop Cards Container */}
        <div className="hidden lg:flex gap-6 items-center justify-center">
          {games.map((game, index) => {
            const isActive = index === currentGameIndex;
            const offset = index - currentGameIndex;
            
            return (
              <motion.div
                key={index}
                onClick={() => navigateToGame(game.title)}
                className="relative cursor-pointer flex-shrink-0"
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.7,
                  y: 0,
                  rotateX: 0,
                  scale: isActive ? 1.05 : 0.85,
                  z: isActive ? 50 : 0,
                  x: offset * (isActive ? 0 : 15)
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: isActive ? 1.1 : 0.9,
                  rotateY: 3,
                  z: 100,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: isActive ? 10 : 1
                }}
              >
                {/* Glow Effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Main Card - GameLoft Style (Reduced Size) */}
                <div className={`
                  relative w-32 h-48 sm:w-36 sm:h-52 md:w-40 md:h-60 lg:w-48 lg:h-64 xl:w-56 xl:h-72
                  rounded-2xl sm:rounded-3xl overflow-hidden group
                  border-2 transition-all duration-500 touch-manipulation
                  ${isActive 
                    ? 'border-blue-400 shadow-2xl shadow-blue-500/50' 
                    : 'border-slate-700 shadow-xl shadow-black/50'
                  }
                `}>
                  {/* Game Image */}
                  <div className="absolute inset-0">
                    <Image 
                      src={game.coverArt}
                      alt={game.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Dark Overlay Gradient - GameLoft Style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                  {/* Content Section - Bottom Positioned */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Game Title */}
                    <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black text-white mb-1 drop-shadow-lg">
                      {game.title}
                    </h3>
                    
                    {/* Category Badge */}
                    <div className="inline-block bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs px-2 py-1 rounded-full mb-2">
                      {game.category}
                    </div>
                    
                    {/* Description - Only visible on larger cards */}
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 hidden md:block drop-shadow">
                      {game.description}
                    </p>
                    
                    {/* Game Info Tags */}
                    <div className="flex gap-1 flex-wrap">
                      <span className="bg-green-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {game.difficulty}
                      </span>
                      <span className="bg-purple-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {game.ageGroup}
                      </span>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  {isActive && (
                    <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden w-full">
          <div className="relative w-full max-w-[280px] mx-auto">
            {/* Mobile Card */}
            <motion.div
              key={currentGameIndex}
              onClick={() => navigateToGame(games[currentGameIndex].title)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-blue-400 shadow-2xl shadow-blue-500/50 cursor-pointer"
            >
              {/* Game Image */}
              <div className="absolute inset-0">
                <Image 
                  src={games[currentGameIndex].coverArt}
                  alt={games[currentGameIndex].title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

              {/* Content Section */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Game Title */}
                <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">
                  {games[currentGameIndex].title}
                </h3>
                
                {/* Category Badge */}
                <div className="inline-block bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs px-2 py-1 rounded-full mb-2">
                  {games[currentGameIndex].category}
                </div>
                
                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-3 drop-shadow">
                  {games[currentGameIndex].description}
                </p>
                
                {/* Game Info Tags */}
                <div className="flex gap-1 flex-wrap">
                  <span className="bg-green-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {games[currentGameIndex].difficulty}
                  </span>
                  <span className="bg-purple-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {games[currentGameIndex].ageGroup}
                  </span>
                </div>
              </div>

              {/* Play Button Overlay */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {games.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => onGameSelect(index)}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
                    index === currentGameIndex 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-white/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
