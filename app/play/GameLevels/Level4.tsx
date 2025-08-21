'use client';

import { GameLevelProps } from '@/app/play/GameLevels/shared/GameLevelComponent';

export default function Level4({ level, onLevelComplete, onReturn }: GameLevelProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
          <h1 className="text-2xl font-bold text-indigo-600">Level 4: Happy Faces</h1>
          <p className="text-sm text-gray-600 mt-1">Collect all the happy faces! 😊🤩</p>
        </div>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-100"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-center">
            <div className="mb-4">😊🤩</div>
            <p>Level 4: Happy Faces</p>
            <p className="text-sm">Collect all the happy faces!</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 flex space-x-4">
        <button onClick={onReturn} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors">
          Back to Levels
        </button>
      </div>
    </div>
  );
}
