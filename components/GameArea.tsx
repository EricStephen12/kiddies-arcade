// components/GameArea.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { Tile } from '@/app/types/gametypes';
import { getThemeForLevel, ThemeData } from '@/app/data/songData';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-12 h-16 bg-pink-200 rounded-full animate-pulse" />
});

interface GameAreaProps {
  fallingTiles: Tile[];
  kidPosition: { left: string; bottom: string; transform: string };
  isJumping: boolean;
  kidOnTile: string | null;
  gameAreaHeight: number;
  onTileClick: (tileId: string, column: number) => void;
  jumpingGirlAnimation: any;
  currentLevel: number;
}

export const GameArea: React.FC<GameAreaProps> = React.memo(({
  fallingTiles,
  kidPosition,
  isJumping,
  kidOnTile,
  gameAreaHeight,
  onTileClick,
  jumpingGirlAnimation,
  currentLevel
}) => {
  const currentTheme = getThemeForLevel(currentLevel);
  
  const renderThemeBackground = () => {
    // Simplified theme backgrounds for better performance
    const themeGradients = {
      'Enchanted Forest': 'bg-gradient-to-b from-green-300/30 via-emerald-300/20 to-lime-300/30',
      'Ocean Depths': 'bg-gradient-to-b from-blue-300/30 via-cyan-300/20 to-teal-300/30',
      'Desert Oasis': 'bg-gradient-to-b from-yellow-300/30 via-orange-300/20 to-red-300/30',
      'Space Galaxy': 'bg-gradient-to-b from-purple-400/30 via-indigo-400/20 to-black/30',
      'Crystal Caves': 'bg-gradient-to-b from-gray-400/30 via-slate-400/20 to-stone-400/30'
    };
    
    const gradientClass = themeGradients[currentTheme.name as keyof typeof themeGradients] || 
                         'bg-gradient-to-b from-green-300/30 via-emerald-300/20 to-lime-300/30';
    
    return (
      <div className={`absolute inset-0 ${gradientClass}`} />
    );
  };
  
  return (
    <div className="relative w-full h-[70vh] sm:h-[600px] max-w-lg sm:max-w-xl mx-auto mt-16 sm:mt-24">
      <div className={`relative w-full h-full bg-gradient-to-br ${currentTheme.backgroundColor} backdrop-blur-sm rounded-3xl overflow-hidden border-4 border-green-400 shadow-2xl`}>
        {/* Dynamic Theme Background */}
        <div className="absolute inset-0 overflow-hidden">
          {renderThemeBackground()}
        </div>
        
        {/* Kid */}
        <div 
          className="absolute z-40 transition-all duration-300 ease-out transform-gpu will-change-transform" 
          style={kidPosition}
        >
          <div className={`transform transition-all duration-300 transform-gpu will-change-transform ${isJumping ? 'scale-125 -translate-y-4 drop-shadow-2xl' : 'scale-100'}`}>
            <Lottie 
              animationData={jumpingGirlAnimation} 
              loop 
              style={{ width: 80, height: 110 }} 
              className={`object-contain ${isJumping ? 'animate-bounce' : ''}`}
            />
            {/* Jump effect */}
            {isJumping && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xl animate-pulse">✨</div>
              </div>
            )}
          </div>
        </div>

        {/* Tiles - Optimized rendering */}
        {fallingTiles.map(tile => {
          const h = tile.length === 'short' ? 'h-20' : tile.length === 'medium' ? 'h-28' : 'h-36';
          const riding = kidOnTile === tile.id;
          const leftPos = (tile.column * 25) + 12.5;
          
          return (
            <div 
              key={tile.id} 
              className={`absolute w-16 ${h} bg-gradient-to-br ${tile.color} rounded-full shadow-lg cursor-pointer hover:scale-110 active:scale-75 border-2 border-white/50 transition-all duration-200 transform-gpu will-change-transform ${riding ? 'ring-4 ring-yellow-400' : ''}`}
              style={{ 
                top: tile.y, 
                left: `${leftPos}%`, 
                transform: 'translateX(-50%)' 
              }} 
              onClick={() => onTileClick(tile.id, tile.column)}
              onTouchStart={(e) => {
                e.preventDefault();
                onTileClick(tile.id, tile.column);
              }}
              data-tile-id={tile.id}
            >
              <div className="absolute bottom-1 right-1 text-lg">
                {tile.obstacle ? '💣' : tile.powerUpType ? '⚡' : tile.collectible ? tile.collectible.emoji : '✨'}
              </div>
              <div className="absolute top-1 right-1 text-sm">
                {tile.obstacle ? '⚠️' : tile.powerUpType ? '🎁' : tile.column === 0 ? '💙' : tile.column === 1 ? '💚' : tile.column === 2 ? '💛' : '💜'}
              </div>
            </div>
          );
        })}

        {/* Particles - Ultra-optimized */}
        {fallingTiles.filter(tile => tile.collectible).slice(0, 5).map(tile => (
          <div 
            key={`particle-${tile.id}`}
            className="absolute w-3 h-3 bg-yellow-300 rounded-full opacity-60 animate-pulse transform-gpu will-change-transform"
            style={{ 
              left: `${(tile.column * 25) + 12.5}%`, 
              top: tile.y - 10,
              transform: 'translateX(-50%)'
            }}
          />
        ))}

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500 opacity-50"/>
      </div>
    </div>
  );
});