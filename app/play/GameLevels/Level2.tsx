'use client';

import { useEffect } from 'react';
import { GameLevelProps } from '@/app/play/GameLevels/shared/GameLevelComponent';

export default function Level2({ level, onLevelComplete, onReturn }: GameLevelProps) {
  // Reuse Level1 structure with Level2 specific data
  const levelData = {
    level: 2,
    name: 'Colorful Balloons',
    emoji: '🎈',
    description: 'Catch 5 colorful balloons',
    collectibles: [
      { type: 'red-balloon', emoji: '🎈', count: 2 },
      { type: 'blue-balloon', emoji: '🎈', count: 3 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-300 via-pink-300 to-blue-300 flex flex-col items-center justify-center p-4">
      {/* Level 2 Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
          <h1 className="text-2xl font-bold text-red-600">Level 2: Balloon Party</h1>
          <p className="text-sm text-gray-600 mt-1">
            Collect colorful balloons: 🎈🎈🎈🎈🎈
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full max-w-4xl h-[500px] bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-100 to-blue-100"></div>
        
        {/* Balloon decorations */}
        <div className="absolute top-4 left-4 text-4xl animate-bounce">🎈</div>
        <div className="absolute top-8 right-8 text-3xl animate-pulse">🎊</div>
        <div className="absolute bottom-4 left-8 text-2xl animate-spin">🎁</div>

        {/* Game content would be rendered here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-center">
            <div className="mb-4">🎈</div>
            <p>Level 2: Balloon Party</p>
            <p className="text-sm">Collect 5 colorful balloons!</p>
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
