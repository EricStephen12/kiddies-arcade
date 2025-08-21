'use client';

import React, { useState, useEffect } from 'react';
import { memoryLevels, MemoryLevel, unlockNextMemoryLevel, resetAllMemoryLevels, loadUnlockedMemoryLevels } from '@/app/data/memoryLevels';
import { Star, Lock, Play, Trophy, Clock, Zap } from 'lucide-react';

interface MemoryLevelMapProps {
  onLevelSelect: (level: MemoryLevel) => void;
  onReturn: () => void;
}

export default function MemoryLevelMap({ onLevelSelect, onReturn }: MemoryLevelMapProps) {
  const [unlockedLevels, setUnlockedLevels] = useState<Set<number>>(new Set());
  const [levelScores, setLevelScores] = useState<Record<number, { time: number; moves: number; stars: number }>>({});

  useEffect(() => {
    // Load unlocked levels from localStorage
    const savedUnlocked = localStorage.getItem('memoryUnlockedLevels');
    if (savedUnlocked) {
      setUnlockedLevels(new Set(JSON.parse(savedUnlocked)));
    } else {
      // Initialize with first level unlocked
      const initialUnlocked = new Set([1]);
      setUnlockedLevels(initialUnlocked);
      localStorage.setItem('memoryUnlockedLevels', JSON.stringify([1]));
    }

    // Load level scores
    const savedScores = localStorage.getItem('memoryLevelScores');
    if (savedScores) {
      setLevelScores(JSON.parse(savedScores));
    }
  }, []);

  const handleLevelClick = (level: MemoryLevel) => {
    if (unlockedLevels.has(level.id)) {
      onLevelSelect(level);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '😊';
      case 'Medium': return '🤔';
      case 'Hard': return '🧠';
      default: return '🎯';
    }
  };

  const renderStars = (stars: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden scrollbar-hide">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Gentle floating elements for memory theme */}
        <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }}>🧠</div>
        <div className="absolute top-20 right-16 text-3xl opacity-55 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>💭</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>🎯</div>
        
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

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <button
          onClick={onReturn}
          className="absolute top-0 left-0 text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2"
        >
          <span className="text-2xl">←</span>
          <span className="text-lg">Back</span>
        </button>

        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
          Memory Match
        </h1>
        <p className="text-white/70 text-sm sm:text-base">
          Match the cards and test your memory with Pastor Chris's teachings!
        </p>
      </div>

      {/* Levels Grid */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {memoryLevels.map((level) => {
            const isUnlocked = unlockedLevels.has(level.id);
            const score = levelScores[level.id];
            const isCompleted = score && score.stars > 0;

            return (
              <div
                key={level.id}
                onClick={() => handleLevelClick(level)}
                className={`
                  relative group cursor-pointer transform transition-all duration-300 hover:scale-105
                  ${isUnlocked 
                    ? 'hover:shadow-2xl hover:shadow-blue-500/25' 
                    : 'cursor-not-allowed opacity-60'
                  }
                `}
              >
                {/* Level Card */}
                                 <div className={`
                   bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-white shadow-lg border-2 border-white/30 hover:border-yellow-400
                   ${isUnlocked ? 'hover:scale-105' : ''}
                   ${isCompleted ? 'ring-2 ring-green-400' : ''}
                 `}>
                  {/* Level Number */}
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold">{level.id}</div>
                    <div className="text-sm opacity-90">{getDifficultyIcon(level.difficulty)}</div>
                  </div>

                  {/* Level Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-sm mb-1">{level.title}</h3>
                    <p className="text-xs opacity-80 mb-2">{level.difficulty}</p>
                    
                                         {/* Difficulty Badge */}
                     <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(level.difficulty)} mb-2`}>
                       {level.difficulty}
                     </div>

                     {/* Grid Size */}
                     <div className="flex items-center justify-center gap-1 mb-2">
                       <div className="text-xs opacity-80">
                         {level.gridSize}x{level.gridSize}
                       </div>
                     </div>

                     {/* Time Limit */}
                     <div className="flex items-center justify-center gap-1 mb-3">
                       <Clock size={12} className="opacity-80" />
                       <span className="text-xs opacity-80">{level.timeLimit}s</span>
                     </div>

                    {/* Stars or Lock */}
                    {isUnlocked ? (
                      <div className="flex justify-center">
                        {isCompleted ? (
                          renderStars(score.stars)
                        ) : (
                          <Play size={20} className="opacity-80" />
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Lock size={20} className="opacity-80" />
                      </div>
                    )}
                  </div>

                                     {/* Completion Badge */}
                   {isCompleted && (
                     <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                       <Trophy size={8} className="sm:w-3 sm:h-3" />
                     </div>
                   )}
                </div>

                {/* Hover Effect */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              resetAllMemoryLevels();
              setUnlockedLevels(new Set([1]));
              setLevelScores({});
              localStorage.setItem('memoryUnlockedLevels', JSON.stringify([1]));
              localStorage.removeItem('memoryLevelScores');
            }}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <Zap size={20} />
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}
