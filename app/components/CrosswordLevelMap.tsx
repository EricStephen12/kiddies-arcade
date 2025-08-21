'use client'

import React, { useState, useEffect } from 'react';
import { Star, Lock, Trophy, Timer, Brain, ArrowLeft } from 'lucide-react';
import { WordSearchLevel, wordSearchLevels, loadUnlockedCrosswordLevels } from '@/app/data/crosswordLevels';

interface CrosswordLevelMapProps {
  onLevelSelect: (level: WordSearchLevel) => void;
  onBackToMainMenu: () => void;
}

interface LevelProgress {
  completed: boolean;
  bestTime?: number;
  stars: number;
}

const CrosswordLevelMap: React.FC<CrosswordLevelMapProps> = ({ onLevelSelect, onBackToMainMenu }) => {
  const [levelProgress, setLevelProgress] = useState<Map<number, LevelProgress>>(new Map());

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('crosswordProgress');
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      const progressMap = new Map();
      Object.entries(progressData).forEach(([levelId, progress]) => {
        progressMap.set(parseInt(levelId), progress as LevelProgress);
      });
      setLevelProgress(progressMap);
      
      // Update unlocked levels based on completed levels
      const completedLevels = new Set<number>();
      progressMap.forEach((progress, levelId) => {
        if (progress.completed) {
          completedLevels.add(levelId);
        }
      });
      loadUnlockedCrosswordLevels(completedLevels);
    }
  }, []);

  const saveProgress = (newProgress: Map<number, LevelProgress>) => {
    const progressObj: Record<number, LevelProgress> = {};
    newProgress.forEach((progress, levelId) => {
      progressObj[levelId] = progress;
    });
    localStorage.setItem('crosswordProgress', JSON.stringify(progressObj));
  };

  const handleLevelComplete = (levelId: number, time: number) => {
    const newProgress = new Map(levelProgress);
    const currentProgress = newProgress.get(levelId);
    
    // Calculate stars based on time (example logic)
    const getStars = (completionTime: number, difficulty: string) => {
      const timeThresholds = {
        'Easy': { 3: 60, 2: 120, 1: 300 },
        'Medium': { 3: 120, 2: 240, 1: 480 },
        'Hard': { 3: 180, 2: 360, 1: 720 }
      };
      
      const thresholds = timeThresholds[difficulty as keyof typeof timeThresholds];
      if (completionTime <= thresholds[3]) return 3;
      if (completionTime <= thresholds[2]) return 2;
      return 1;
    };

    const level = wordSearchLevels.find(l => l.id === levelId);
    const stars = level ? getStars(time, level.difficulty) : 1;
    
    const updatedProgress: LevelProgress = {
      completed: true,
      bestTime: currentProgress?.bestTime ? Math.min(currentProgress.bestTime, time) : time,
      stars: currentProgress?.stars ? Math.max(currentProgress.stars, stars) : stars
    };
    
    newProgress.set(levelId, updatedProgress);
    setLevelProgress(newProgress);
    saveProgress(newProgress);
    
    // Unlock next level
    const nextLevel = wordSearchLevels.find(l => l.id === levelId + 1);
    if (nextLevel) {
      nextLevel.unlocked = true;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTotalStats = () => {
    const completed = Array.from(levelProgress.values()).filter(p => p.completed).length;
    const totalStars = Array.from(levelProgress.values()).reduce((sum, p) => sum + (p.stars || 0), 0);
    return { completed, totalStars, total: wordSearchLevels.length };
  };

  const stats = getTotalStats();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 overflow-hidden">
      {/* Floating kid-friendly elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Gentle floating elements for word search theme */}
        <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }}>📝</div>
        <div className="absolute top-20 right-16 text-3xl opacity-55 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>🔍</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>💭</div>
        
        {/* Soft floating stars */}
        <div className="absolute top-32 right-24 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }}>⭐</div>
        <div className="absolute bottom-32 right-32 text-2xl opacity-55 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>⭐</div>
        
        {/* Gentle clouds */}
        <div className="absolute top-16 left-1/3 text-3xl opacity-45 animate-pulse" style={{ animationDuration: '8s' }}>☁️</div>
        <div className="absolute bottom-24 right-1/4 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>☁️</div>
        
        {/* Brain and book emojis for learning theme */}
        <div className="absolute top-1/3 left-8 text-2xl opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>🧠</div>
        <div className="absolute bottom-1/3 right-12 text-2xl opacity-55 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>📚</div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 w-full max-w-6xl mx-auto max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={onBackToMainMenu}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Menu</span>
            <span className="sm:hidden">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Word Search
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">Pastor Chris Oyakhilome Messages</p>
          </div>

          <div className="text-right text-white/90 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Trophy size={12} className="sm:w-4 sm:h-4 text-yellow-400" />
              <span>{stats.completed}/{stats.total}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Star size={12} className="sm:w-4 sm:h-4 text-yellow-400" />
              <span>{stats.totalStars}</span>
            </div>
          </div>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {wordSearchLevels.map((level) => {
            const progress = levelProgress.get(level.id);
            const isUnlocked = level.unlocked;
            const isCompleted = progress?.completed || false;

            return (
              <div
                key={level.id}
                onClick={() => isUnlocked && onLevelSelect(level)}
                className={`
                  relative aspect-square rounded-xl p-2 sm:p-3 lg:p-4 text-center transition-all duration-300 cursor-pointer
                  ${isUnlocked 
                    ? 'bg-white/10 hover:bg-white/20 hover:scale-105 border-2 border-white/30 hover:border-yellow-400' 
                    : 'bg-gray-500/20 border-2 border-gray-400/30 cursor-not-allowed opacity-60'
                  }
                  ${isCompleted ? 'ring-2 ring-green-400' : ''}
                `}
              >
                {/* Level Number and Icon */}
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex items-center justify-center mb-1 sm:mb-2">
                    {isUnlocked ? (
                      <Brain size={16} className="sm:w-6 sm:h-6 text-blue-400" />
                    ) : (
                      <Lock size={14} className="sm:w-5 sm:h-5 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                    {level.id}
                  </div>
                  
                  <div className="text-[10px] sm:text-xs text-white/80 line-clamp-2 mb-1 sm:mb-2">
                    {level.title}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-semibold text-white ${getDifficultyColor(level.difficulty)} mb-1`}>
                    {level.difficulty}
                  </div>

                  {/* Progress Info */}
                  {isCompleted && progress && (
                    <div className="mt-1 sm:mt-2 space-y-1">
                      {/* Stars */}
                      <div className="flex justify-center gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={8} 
                            className={`sm:w-3 sm:h-3 ${i < progress.stars ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                          />
                        ))}
                      </div>
                      
                      {/* Best Time */}
                      {progress.bestTime && (
                        <div className="flex items-center justify-center gap-1 text-[8px] sm:text-xs text-white/70">
                          <Timer size={8} className="sm:w-3 sm:h-3" />
                          <span>{formatTime(progress.bestTime)}</span>
                        </div>
                      )}
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
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-4 sm:mt-6 text-center text-white/70 text-xs sm:text-sm px-2 sm:px-4">
          <p className="mb-2">Find hidden words from Pastor Chris Oyakhilome's teachings in the letter grid!</p>
          <p>Complete levels to unlock new challenges and earn stars based on your solving time.</p>
        </div>
      </div>
    </div>
  );
};

export default CrosswordLevelMap;
