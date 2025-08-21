'use client'

import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, Trophy, Timer, ArrowLeft, Star } from 'lucide-react';
import { PuzzleLevel } from '@/app/data/puzzleLevels';

interface SlidingPuzzleGameProps {
  level: PuzzleLevel;
  onLevelComplete: (levelId: number, moves: number, time: number) => void;
  onBackToLevelMap: () => void;
  bestMoves?: number;
  bestTime?: number;
}

const SlidingPuzzleGame: React.FC<SlidingPuzzleGameProps> = ({
  level,
  onLevelComplete,
  onBackToLevelMap,
  bestMoves,
  bestTime
}) => {
  const GRID_SIZE = level.gridSize;
  const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
  
  // Improved responsive tile size calculation
  const getTileSize = () => {
    if (typeof window === 'undefined') return 100;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate available space considering all UI elements
    const headerHeight = 120; // Approximate header height
    const controlsHeight = 200; // Approximate controls height
    const padding = 32; // Container padding
    const gaps = (GRID_SIZE - 1) * 4; // Gaps between tiles
    
    // Calculate available space
    const availableWidth = screenWidth - (padding * 2);
    const availableHeight = screenHeight - headerHeight - controlsHeight - (padding * 2);
    
    // Calculate tile size based on both width and height constraints
    const maxWidthTileSize = Math.floor((availableWidth - gaps) / GRID_SIZE);
    const maxHeightTileSize = Math.floor((availableHeight - gaps) / GRID_SIZE);
    
    // Use the smaller of the two to ensure it fits
    let tileSize = Math.min(maxWidthTileSize, maxHeightTileSize);
    
    // Apply minimum and maximum constraints
    const minTileSize = GRID_SIZE === 3 ? 60 : 50;
    const maxTileSize = GRID_SIZE === 3 ? 120 : 100;
    
    tileSize = Math.max(minTileSize, Math.min(maxTileSize, tileSize));
    
    // Ensure the grid doesn't exceed available space
    const totalGridSize = (tileSize * GRID_SIZE) + gaps;
    if (totalGridSize > availableWidth || totalGridSize > availableHeight) {
      // Recalculate with more conservative constraints
      const maxGridSize = Math.min(availableWidth, availableHeight);
      tileSize = Math.floor((maxGridSize - gaps) / GRID_SIZE);
      tileSize = Math.max(minTileSize, Math.min(maxTileSize, tileSize));
    }
    
    return tileSize;
  };

  const [tileSize, setTileSize] = useState(getTileSize());
  
  // Update tile size on window resize
  useEffect(() => {
    const handleResize = () => {
      setTileSize(getTileSize());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [GRID_SIZE]);
  
  // Get valid moves for empty space
  const getValidMoves = (emptyIndex: number): number[] => {
    const row = Math.floor(emptyIndex / GRID_SIZE);
    const col = emptyIndex % GRID_SIZE;
    const moves: number[] = [];

    if (row > 0) moves.push(emptyIndex - GRID_SIZE); // Up
    if (row < GRID_SIZE - 1) moves.push(emptyIndex + GRID_SIZE); // Down
    if (col > 0) moves.push(emptyIndex - 1); // Left
    if (col < GRID_SIZE - 1) moves.push(emptyIndex + 1); // Right

    return moves;
  };
  
  // Generate solved state (0 represents empty space)
  const generateSolvedState = () => {
    return Array.from({ length: TOTAL_TILES }, (_, i) => i);
  };

  // Generate a random solvable puzzle state
  const generateRandomState = () => {
    let state = generateSolvedState();
    
    // Perform random valid moves to ensure solvability
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = state.indexOf(0);
      const possibleMoves = getValidMoves(emptyIndex);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [state[emptyIndex], state[randomMove]] = [state[randomMove], state[emptyIndex]];
    }
    
    return state;
  };

  const [tiles, setTiles] = useState(generateRandomState());
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (startTime && !isWon) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, isWon]);

  // Preload the image
  useEffect(() => {
    console.log('Loading image for level:', level.id, 'Path:', level.image);
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded successfully:', level.image);
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load image:', level.image);
      setImageLoaded(true); // Continue anyway
    };
    img.src = level.image;
  }, [level.image, level.id]);

  // Check if puzzle is solved
  useEffect(() => {
    const solved = tiles.every((tile, index) => tile === index);
    if (solved && moves > 0 && !isWon) {
      setIsWon(true);
      setShowWinScreen(true);
      onLevelComplete(level.id, moves, elapsedTime);
    }
  }, [tiles, moves, isWon, elapsedTime, level.id, onLevelComplete]);

  // Get position for a tile
  const getTilePosition = (index: number) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    return {
      x: col * (tileSize + 4), // 4px gap
      y: row * (tileSize + 4)
    };
  };

  // Handle tile click with sliding animation
  const handleTileClick = (clickedIndex: number) => {
    if (isWon || isSliding) return;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);

    if (validMoves.includes(clickedIndex)) {
      setIsSliding(true);
      
      // Perform the move after a short delay for animation
      setTimeout(() => {
        const newTiles = [...tiles];
        [newTiles[emptyIndex], newTiles[clickedIndex]] = [newTiles[clickedIndex], newTiles[emptyIndex]];
        setTiles(newTiles);
        setMoves(moves + 1);
        setIsSliding(false);
      }, 200);
    }
  };

  // Shuffle puzzle
  const shufflePuzzle = () => {
    setTiles(generateRandomState());
    setMoves(0);
    setIsWon(false);
    setStartTime(null);
    setElapsedTime(0);
    setShowWinScreen(false);
  };

  // Reset to solved state
  const resetPuzzle = () => {
    setTiles(generateSolvedState());
    setMoves(0);
    setIsWon(false);
    setStartTime(null);
    setElapsedTime(0);
    setShowWinScreen(false);
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get image position for tile using CSS background-image
  const getImagePosition = (tileNumber: number) => {
    if (tileNumber === 0) return {};
    
    const correctIndex = tileNumber - 1;
    const row = Math.floor(correctIndex / GRID_SIZE);
    const col = correctIndex % GRID_SIZE;
    
    console.log(`Tile ${tileNumber}: row=${row}, col=${col}, position=(-${col * tileSize}px, -${row * tileSize}px)`);
    
    return {
      backgroundImage: `url("${level.image}")`,
      backgroundSize: `${GRID_SIZE * tileSize}px ${GRID_SIZE * tileSize}px`,
      backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#2a2a2a', // Fallback color
    };
  };

  // Calculate stars based on performance
  const calculateStars = () => {
    const maxMoves = GRID_SIZE === 3 ? 50 : 100;
    const maxTime = GRID_SIZE === 3 ? 120 : 300; // seconds
    
    let stars = 3;
    if (moves > maxMoves * 0.7 || elapsedTime > maxTime * 0.7) stars = 2;
    if (moves > maxMoves * 0.9 || elapsedTime > maxTime * 0.9) stars = 1;
    
    return stars;
  };

  // Calculate reference image size (responsive)
  const getReferenceImageSize = () => {
    return Math.max(80, Math.min(140, tileSize * 1.2));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 overflow-hidden">
      {/* Floating kid-friendly elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Gentle floating balloons */}
        <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }}>🎈</div>
        <div className="absolute top-20 right-16 text-3xl opacity-55 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>🎈</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>🎈</div>
        
        {/* Soft floating stars */}
        <div className="absolute top-32 right-24 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }}>⭐</div>
        <div className="absolute bottom-32 right-32 text-2xl opacity-55 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>⭐</div>
        
        {/* Gentle clouds */}
        <div className="absolute top-16 left-1/3 text-3xl opacity-45 animate-pulse" style={{ animationDuration: '8s' }}>☁️</div>
        <div className="absolute bottom-24 right-1/4 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>☁️</div>
        
        {/* Soft bubbles */}
        <div className="absolute top-1/3 left-8 text-2xl opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>🫧</div>
        <div className="absolute bottom-1/3 right-12 text-2xl opacity-55 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>🫧</div>
      </div>
      
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 w-full max-w-4xl mx-auto max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button
            onClick={onBackToLevelMap}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Levels</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
              Level {level.id}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">{level.title}</p>
          </div>
          <div className="w-10 sm:w-16"></div> {/* Spacer for centering */}
        </div>

        {/* Level Info */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-3 sm:mb-4 text-white">
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-base">Moves: {moves}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <Timer size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-base">{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-sm">{GRID_SIZE}x{GRID_SIZE}</span>
          </div>
        </div>

        {/* Best Scores */}
        {(bestMoves || bestTime) && (
          <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-white/70 text-xs sm:text-sm">
            {bestMoves && <span>Best Moves: {bestMoves}</span>}
            {bestTime && <span>Best Time: {formatTime(bestTime)}</span>}
          </div>
        )}

        {/* Win Screen */}
        {showWinScreen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center text-white border border-white/20 max-w-sm w-full">
              <div className="flex justify-center mb-4">
                {[...Array(calculateStars())].map((_, i) => (
                  <Star key={i} size={24} className="sm:w-8 sm:h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Level Complete!
              </h2>
              <p className="text-base sm:text-lg mb-4">
                Solved in {moves} moves and {formatTime(elapsedTime)}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={shufflePuzzle}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  Play Again
                </button>
                <button
                  onClick={onBackToLevelMap}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  Next Level
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Grid Container */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 items-center lg:items-start justify-center">
          {/* Main Game Grid */}
          <div className="relative bg-black/30 rounded-xl p-2 border-2 border-white/20 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 rounded-xl">
                <div className="text-white text-sm sm:text-lg">Loading image...</div>
              </div>
            )}
            <div 
              className="relative mx-auto"
              style={{
                width: GRID_SIZE * tileSize + (GRID_SIZE - 1) * 4,
                height: GRID_SIZE * tileSize + (GRID_SIZE - 1) * 4
              }}
            >
              {tiles.map((tile, index) => {
                const position = getTilePosition(index);
                
                if (tile === 0) return null; // Empty space
                
                return (
                  <div
                    key={tile}
                    onClick={() => handleTileClick(index)}
                    className="absolute cursor-pointer border-2 border-white/30 overflow-hidden shadow-xl hover:border-yellow-400 hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                    style={{
                      width: tileSize,
                      height: tileSize,
                      left: position.x,
                      top: position.y,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      ...getImagePosition(tile)
                    }}
                  >
                    {/* Tile number overlay for reference */}
                    <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 bg-black/60 text-white text-[10px] sm:text-xs px-0.5 sm:px-1 py-0.5 rounded font-bold shadow-lg z-10">
                      {tile}
                    </div>
                    
                    {/* Debug: Show coordinates (smaller on mobile) */}
                    <div className="absolute bottom-0.5 sm:bottom-1 right-0.5 sm:right-1 bg-black/60 text-white text-[8px] sm:text-xs px-0.5 py-0.5 rounded z-10">
                      {Math.floor((tile - 1) / GRID_SIZE) + 1},{((tile - 1) % GRID_SIZE) + 1}
                    </div>
                  </div>
                );
              })}
              
              {/* Empty space highlight */}
              {(() => {
                const emptyIndex = tiles.indexOf(0);
                const emptyPos = getTilePosition(emptyIndex);
                return (
                  <div
                    className="absolute border-2 border-dashed border-white/40 bg-white/5"
                    style={{
                      width: tileSize,
                      height: tileSize,
                      left: emptyPos.x,
                      top: emptyPos.y,
                    }}
                  />
                );
              })()}
            </div>
          </div>

          {/* Reference Image and Controls */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Reference Image */}
            <div className="text-center">
              <p className="text-white/70 text-xs sm:text-sm mb-2">Reference Image:</p>
              <div className="inline-block border-2 border-white/30 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={level.image} 
                  alt="Complete puzzle reference" 
                  className="object-cover"
                  style={{
                    width: Math.min(getReferenceImageSize(), 120),
                    height: Math.min(getReferenceImageSize(), 120)
                  }}
                  onError={(e) => {
                    console.error('Failed to load image:', level.image);
                    (e.target as HTMLImageElement).style.border = '2px solid red';
                  }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={shufflePuzzle}
                disabled={isSliding}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <Shuffle size={16} className="sm:w-5 sm:h-5" />
                Shuffle
              </button>
              <button
                onClick={resetPuzzle}
                disabled={isSliding}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <RotateCcw size={16} className="sm:w-5 sm:h-5" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-3 sm:mt-4 text-center text-white/70 text-xs sm:text-sm px-2 sm:px-4">
          Click on pieces next to the empty space to slide them into place.
        </div>
      </div>
    </div>
  );
};

export default SlidingPuzzleGame;