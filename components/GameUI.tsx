// components/GameUI.tsx
import React from 'react';
import { getSongData } from '@/app/data/songData';
import { levelGoals } from '@/app/data/songData';
import { useGameLogic } from '@/app/hooks/useGameLogic';

interface KaraokeDisplayProps {
  currentLevel: number;
  currentLyricIndex: number;
  highlightedWordIndex: number;
}

export const KaraokeDisplay: React.FC<KaraokeDisplayProps> = ({ 
  currentLevel, 
  currentLyricIndex, 
  highlightedWordIndex 
}) => {
  const songData = getSongData(currentLevel);
  
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      {/* Desktop Version */}
      <div className="hidden md:block bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-105">
        <div className="text-center">
          {currentLyricIndex >= 0 ? (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white animate-pulse">
                {songData.lyrics[currentLyricIndex].split(' ').map((word: string, index: number) => (
                  <span 
                    key={index}
                    className={`inline-block mx-1 px-2 py-1 rounded transition-all duration-200 ${
                      index === highlightedWordIndex 
                        ? 'bg-yellow-400 text-black scale-110 shadow-lg' 
                        : 'text-white hover:text-yellow-300'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="flex justify-center space-x-1">
                {[...Array(songData.lyrics[currentLyricIndex].split(' ').length)].map((_, i: number) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === highlightedWordIndex ? 'bg-yellow-400 scale-125' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-2xl mb-2">🎵🎤🎵</div>
              <div className="text-purple-200">Ready to sing!</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Version */}
      <div className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4">
        <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-2xl border border-white/20 max-w-[90vw]">
          <div className="text-center">
            {currentLyricIndex >= 0 ? (
              <div className="text-base font-bold text-white animate-pulse leading-tight">
                {songData.lyrics[currentLyricIndex].split(' ').map((word: string, index: number) => (
                  <span 
                    key={index}
                    className={`inline-block mx-1 px-2 py-1 rounded transition-all duration-200 ${
                      index === highlightedWordIndex 
                        ? 'bg-yellow-400 text-black scale-105' 
                        : 'text-white'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center text-white text-lg">🎵</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface GameStatsProps {
  score: number;
  misses: number;
  currentLevel: number;
  collectibles: Record<string, number>;
  powerUps: {
    doubleScore: boolean;
    slowMotion: boolean;
    rainbowTiles: boolean;
    shield: boolean;
    bombs: number;
  };
}

export const GameStats: React.FC<GameStatsProps> = ({ 
  score, 
  misses, 
  currentLevel, 
  collectibles, 
  powerUps 
}) => {
  return (
    <>
      {/* Desktop Stats */}
      <div className="absolute top-4 left-4 z-50 hidden sm:block">
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 space-y-2 shadow-xl border border-gray-200">
          {/* Score and Misses */}
          <div className="flex items-center gap-4 text-gray-800 text-sm font-bold">
            <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
              <span className="text-yellow-600">⭐</span>
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded">
              <span className="text-red-600">❌</span>
              <span>{misses}</span>
            </div>
          </div>
          
          {/* Collectibles */}
          {levelGoals[currentLevel]?.collectibles && (
            <div className="flex flex-col gap-1 text-xs">
              {levelGoals[currentLevel]?.collectibles?.map(item => {
                const collected = collectibles[item.id] || 0;
                const total = item.count;
                return (
                  <div key={item.id} className="flex items-center gap-2 bg-purple-100 px-2 py-1 rounded">
                    <span>{item.emoji}</span>
                    <span className="text-purple-800 font-bold">{collected}/{total}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Power-ups */}
          <div className="flex flex-col gap-1 text-xs">
            {powerUps.doubleScore && (
              <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-yellow-800 font-bold">
                <span>2x</span>
              </div>
            )}
            {powerUps.slowMotion && (
              <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded text-blue-800 font-bold">
                <span>🐌</span>
              </div>
            )}
            {powerUps.rainbowTiles && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 px-2 py-1 rounded text-white font-bold">
                <span>🌈</span>
              </div>
            )}
            {powerUps.shield && (
              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-green-800 font-bold">
                <span>🛡️</span>
              </div>
            )}
            {powerUps.bombs > 0 && (
              <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded text-red-800 font-bold">
                <span>💣</span>
                <span>{powerUps.bombs}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Stats */}
      <div className="absolute top-2 right-4 z-50 sm:hidden mb-2">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-lg border border-gray-200">
          {/* Score */}
          <div className="flex items-center gap-1 bg-yellow-100 px-1.5 py-0.5 rounded">
            <span className="text-yellow-600">⭐</span>
            <span className="text-gray-800 text-xs font-bold">{score}</span>
          </div>
          
          {/* Misses */}
          <div className="flex items-center gap-1 bg-red-100 px-1.5 py-0.5 rounded">
            <span className="text-red-600">❌</span>
            <span className="text-gray-800 text-xs font-bold">{misses}</span>
          </div>
          
          {/* Collectibles */}
          {levelGoals[currentLevel]?.collectibles && (
            <div className="flex items-center gap-1">
              {levelGoals[currentLevel]?.collectibles?.map(item => {
                const collected = collectibles[item.id] || 0;
                const total = item.count;
                return (
                  <div key={item.id} className="flex items-center gap-0.5 bg-purple-100 px-1 py-0.5 rounded">
                    <span className="text-[8px]">{item.emoji}</span>
                    <span className="text-purple-800 font-bold text-[9px]">{collected}/{total}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface SuccessDialogProps {
  currentLevel: number;
  score: number;
  misses: number;
  onContinue: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ 
  currentLevel, 
  score, 
  misses, 
  onContinue 
}) => {
  // Get calculateStars from useGameLogic
  const { calculateStars } = useGameLogic(currentLevel, 500); // 500 is a default height, adjust if needed
  // Trigger the celebration animation when component mounts
  React.useEffect(() => {
    // Trigger the celebration animation
    const celebrate = async () => {
      // Import the animation function dynamically to avoid server-side rendering issues
      const { celebrateCollectiblesAnimation } = await import('@/app/utils/GameAnimations');
      // Trigger with empty collectibles since we just want the visual effect
      celebrateCollectiblesAnimation(currentLevel, {});
    };
    
    const timer = setTimeout(celebrate, 100);
    return () => clearTimeout(timer);
  }, [currentLevel]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* The celebration animation will be rendered here by GameAnimations */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative z-50 text-center mb-8 bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl">
          <h2 className="text-6xl md:text-8xl font-bold text-yellow-300 mb-4 animate-bounce">
            Level Complete!
          </h2>
          <p className="text-2xl text-white/90 font-semibold mb-8">
            You've collected all the treasures! 🎉
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-white/20 rounded-full px-6 py-2">
              <span className="text-yellow-300 font-bold text-xl">★ {calculateStars(score, misses)}</span>
              <span className="text-white ml-1">Stars</span>
            </div>
            <div className="bg-white/20 rounded-full px-6 py-2">
              <span className="text-green-300 font-bold text-xl">{score}</span>
              <span className="text-white ml-1">Points</span>
            </div>
          </div>
          <button
            onClick={onContinue}
            className="relative z-50 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
          >
            Continue to Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

interface FailureDialogProps {
  currentLevel: number;
  score: number;
  misses: number;
  onReplay: () => void;
  onExit: () => void;
}

export const FailureDialog: React.FC<FailureDialogProps> = ({ 
  currentLevel, 
  score, 
  misses, 
  onReplay, 
  onExit 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-3xl font-bold text-red-600 mb-4">Try Again!</h2>
        <div className="bg-orange-100 rounded-lg p-3 mb-4">
          <h3 className="font-bold text-orange-800 mb-2">Level Goals:</h3>
          <p className="text-sm text-orange-700">
            {levelGoals[currentLevel]?.specialChallenge || "Keep practicing!"}
          </p>
        </div>
        <div className="text-lg font-bold text-purple-600 mb-4">
          Score: {score} | Misses: {misses}
        </div>
        <div className="flex flex-col space-y-3">
          <button
            onClick={onReplay}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onExit}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Levels
          </button>
        </div>
      </div>
    </div>
  );
};