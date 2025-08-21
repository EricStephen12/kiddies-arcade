'use client';

import { GameLevelProps } from '@/app/play/GameLevels/shared/GameLevelComponent';

export default function Level8({ level, onLevelComplete, onReturn }: GameLevelProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Level 8</h1>
        <p className="text-xl text-white">Coming Soon!</p>
        <button onClick={onReturn} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded">
          Back to Levels
        </button>
      </div>
    </div>
  );
}
