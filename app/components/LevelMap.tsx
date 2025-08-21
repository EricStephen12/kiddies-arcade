'use client'

import React from 'react';
import { Lock, Star, Trophy, Play } from 'lucide-react';
import { PuzzleLevel } from '@/app/data/puzzleLevels';

interface LevelMapProps {
  levels: PuzzleLevel[];
  onLevelSelect: (level: PuzzleLevel) => void;
  completedLevels: Set<number>;
}

const LevelMap: React.FC<LevelMapProps> = ({ levels, onLevelSelect, completedLevels }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getGridSizeText = (gridSize: number) => {
    return `${gridSize}x${gridSize}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Puzzle Levels
          </h1>
          <p className="text-white/80 text-lg">
            Complete levels to unlock new challenges!
          </p>
          <div className="flex justify-center items-center gap-6 mt-4 text-white">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Hard</span>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
          <div className="flex justify-between items-center text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">{completedLevels.size}</div>
              <div className="text-sm opacity-80">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{levels.length}</div>
              <div className="text-sm opacity-80">Total Levels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((completedLevels.size / levels.length) * 100)}%
              </div>
              <div className="text-sm opacity-80">Progress</div>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {levels.map((level) => {
            const isCompleted = completedLevels.has(level.id);
            const isUnlocked = level.unlocked;
            
            return (
              <div
                key={level.id}
                onClick={() => isUnlocked && onLevelSelect(level)}
                className={`
                  relative bg-white/10 backdrop-blur-lg rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer
                  ${isUnlocked 
                    ? 'border-white/30 hover:border-yellow-400 hover:bg-white/20 hover:scale-105' 
                    : 'border-gray-600 cursor-not-allowed opacity-50'
                  }
                  ${isCompleted ? 'ring-2 ring-green-400' : ''}
                `}
              >
                {/* Level Number */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {level.id}
                </div>

                {/* Lock Icon for locked levels */}
                {!isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                )}

                {/* Completion Status */}
                {isCompleted && (
                  <div className="absolute top-2 right-2">
                    <Trophy size={16} className="text-yellow-400" />
                  </div>
                )}

                {/* Level Image Preview */}
                <div className="w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-800 relative">
                  {isUnlocked ? (
                    <img
                      src={level.image}
                      alt={level.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock size={24} className="text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Level Info */}
                <div className="text-white">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {level.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs opacity-80">
                      {getGridSizeText(level.gridSize)}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(level.difficulty)}`}></div>
                  </div>

                  <p className="text-xs opacity-70 line-clamp-2 mb-3">
                    {level.description}
                  </p>

                  {/* Best Score */}
                  {isCompleted && level.bestMoves && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star size={12} />
                      <span>Best: {level.bestMoves} moves</span>
                    </div>
                  )}

                  {/* Play Button */}
                  {isUnlocked && (
                    <div className="flex items-center justify-center mt-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Play size={16} className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-200"
          >
            Back to Arcade
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;

