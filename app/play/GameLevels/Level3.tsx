'use client';

import { useEffect } from 'react';
import { GameLevelProps } from './shared/GameLevelComponent';

export default function Level3({ level, onLevelComplete, onReturn }: GameLevelProps) {
  const levelData = {
    level: 3,
    name: 'Farm Animals',
    emoji: '🐄',
    description: 'Find all the farm animals',
    collectibles: [
      { type: 'cow', emoji: '🐄', count: 2 },
      { type: 'pig', emoji: '🐖', count: 2 },
      { type: 'sheep', emoji: '🐑', count: 2 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-lime-300 to-yellow-300 flex flex-col items-center justify-center p-4">
      {/* Level 3 Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
          <h1 className="text-2xl font-bold text-green-600">Level 3: Farm Fun</h1>
          <p className="text-sm text-gray-600 mt-1">
            Find all the farm animals! 🐄🐖🐑
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-4xl h-[500px] bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-yellow-100"></div>
        
        {/* Farm decorations */}
        <div className="absolute top-4 left-4 text-4xl">🚜</div>
        <div className="absolute top-8 right-8 text-3xl">🌾</div>
        <div className="absolute bottom-4 left-8 text-2xl">🏡</div>

        {/* Game content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-center">
            <div className="mb-4">🐄🐖🐑</div>
            <p>Level 3: Farm Fun</p>
            <p className="text-sm">Find all the farm animals!</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 flex space-x-4">
        <button
          onClick={onReturn}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Back to Levels
        </button>
      </div>
    </div>
  );
}
