'use client';

import { useEffect } from 'react';
import GameLevelComponent from '@/app/play/GameLevels/shared/GameLevelComponent';
import { GameLevelProps } from '@/app/play/GameLevels/shared/GameLevelComponent'

export default function Level1({ level, onLevelComplete, onReturn }: GameLevelProps) {
  const game = GameLevelComponent({ level: 1, onLevelComplete, onReturn });

  const {
    fallingTiles,
    score,
    misses,
    collectibles,
    gameOver,
    handleTileClick,
    resetGame,
    levelData,
    checkLevelCompletion
  } = game;

  // Level 1 specific: Collect 3 Golden Stars
  const requiredStars = 3;
  const collectedStars = collectibles['golden-star'] || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300 flex flex-col items-center justify-center p-4">
      {/* Level 1 Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
          <h1 className="text-2xl font-bold text-purple-600">Level 1: Golden Stars</h1>
          <p className="text-sm text-gray-600 mt-1">
            Collect {collectedStars}/{requiredStars} 🌟 Golden Stars
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-4xl h-[500px] bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-orange-100"></div>
        
        {/* Stars decoration */}
        <div className="absolute top-4 left-4 text-4xl animate-pulse">⭐</div>
        <div className="absolute top-8 right-8 text-3xl animate-bounce">✨</div>
        <div className="absolute bottom-4 left-8 text-2xl animate-spin">🌟</div>

        {/* Game Content - Same as tiles/page.tsx */}
        <div className="relative w-full h-full">
          {/* Falling Tiles */}
          {fallingTiles.map((tile) => (
            <div
              key={tile.id}
              className={`absolute w-1/4 h-12 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                tile.color
              } ${tile.collectible ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
              style={{
                left: `${tile.column * 25}%`,
                bottom: `${500 - tile.y}px`,
                height: tile.length === 'short' ? '40px' : tile.length === 'medium' ? '50px' : '60px'
              }}
              onClick={() => handleTileClick(tile.id, tile.column)}
            >
              <div className="flex items-center justify-center h-full text-white font-bold">
                {tile.collectible ? (
                  <span className="text-2xl">{tile.collectible.emoji}</span>
                ) : (
                  <span className="text-sm">Click!</span>
                )}
              </div>
            </div>
          ))}

          {/* Score Display */}
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-white text-lg font-bold">Score: {score}</div>
            <div className="text-white text-sm">Misses: {misses}/3</div>
          </div>

          {/* Collectible Progress */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2 text-white">
              <span>🌟 Stars:</span>
              <span className="font-bold">{collectedStars}/{requiredStars}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Restart Level
        </button>
        <button
          onClick={onReturn}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Levels
        </button>
      </div>

      {/* Level Complete Modal */}
      {checkLevelCompletion() && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Level 1 Complete!</h2>
            <p className="text-lg mb-4">You found all {requiredStars} golden stars! ⭐</p>
            <div className="text-lg mb-4">Final Score: {score}</div>
            <button
              onClick={() => onLevelComplete(true, score, misses)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold mb-4">Try Again!</h2>
            <p className="text-lg mb-4">You collected {collectedStars} stars</p>
            <div className="flex space-x-4">
              <button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onReturn}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Levels
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
