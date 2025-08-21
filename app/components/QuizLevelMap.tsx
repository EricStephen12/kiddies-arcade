'use client'

import React, { useState, useEffect } from 'react';
import { Star, Lock, Trophy, Timer, Brain, ArrowLeft, BookOpen } from 'lucide-react';
import { QuizLevel, quizLevels, loadUnlockedQuizLevels } from '@/app/data/quizLevels';

interface QuizLevelMapProps {
  onLevelSelect: (level: QuizLevel) => void;
  onBackToMainMenu: () => void;
}

interface LevelProgress {
  completed: boolean;
  bestScore?: number;
  bestTime?: number;
  stars: number;
}

const QuizLevelMap: React.FC<QuizLevelMapProps> = ({ onLevelSelect, onBackToMainMenu }) => {
  const [levelProgress, setLevelProgress] = useState<Map<number, LevelProgress>>(new Map());

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('quizProgress');
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
      loadUnlockedQuizLevels(completedLevels);
    }
  }, []);

  const saveProgress = (newProgress: Map<number, LevelProgress>) => {
    const progressObj: Record<number, LevelProgress> = {};
    newProgress.forEach((progress, levelId) => {
      progressObj[levelId] = progress;
    });
    localStorage.setItem('quizProgress', JSON.stringify(progressObj));
  };

  const handleLevelComplete = (levelId: number, score: number, time: number) => {
    const newProgress = new Map(levelProgress);
    const currentProgress = newProgress.get(levelId);
    
    // Calculate stars based on score
    const getStars = (score: number) => {
      if (score >= 90) return 3;
      if (score >= 80) return 2;
      return 1;
    };

    const stars = getStars(score);
    
    const updatedProgress: LevelProgress = {
      completed: true,
      bestScore: currentProgress?.bestScore ? Math.max(currentProgress.bestScore, score) : score,
      bestTime: currentProgress?.bestTime ? Math.min(currentProgress.bestTime, time) : time,
      stars: currentProgress?.stars ? Math.max(currentProgress.stars, stars) : stars
    };
    
    newProgress.set(levelId, updatedProgress);
    setLevelProgress(newProgress);
    saveProgress(newProgress);
    
    // Unlock next level
    const nextLevel = quizLevels.find(l => l.id === levelId + 1);
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
    const averageScore = Array.from(levelProgress.values())
      .filter(p => p.bestScore)
      .reduce((sum, p, _, arr) => sum + (p.bestScore || 0) / arr.length, 0);
    return { completed, totalStars, total: quizLevels.length, averageScore: Math.round(averageScore) };
  };

  const stats = getTotalStats();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 overflow-hidden">
      {/* Floating kid-friendly elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Quiz-themed floating elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }}>📚</div>
        <div className="absolute top-20 right-16 text-3xl opacity-55 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>❓</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>💡</div>
        
        {/* Soft floating stars */}
        <div className="absolute top-32 right-24 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }}>⭐</div>
        <div className="absolute bottom-32 right-32 text-2xl opacity-55 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>⭐</div>
        
        {/* Gentle clouds */}
        <div className="absolute top-16 left-1/3 text-3xl opacity-45 animate-pulse" style={{ animationDuration: '8s' }}>☁️</div>
        <div className="absolute bottom-24 right-1/4 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>☁️</div>
        
        {/* Learning-themed elements */}
        <div className="absolute top-1/3 left-8 text-2xl opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>🧠</div>
        <div className="absolute bottom-1/3 right-12 text-2xl opacity-55 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>✏️</div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 w-full max-w-6xl mx-auto max-h-screen overflow-y-auto scrollbar-hide">
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
              Word Quiz
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">Pastor Chris Oyakhilome Messages</p>
          </div>

          <div className="text-right text-white/90 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Trophy size={12} className="sm:w-4 sm:h-4 text-yellow-400" />
              <span>{stats.completed}/{stats.total}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <Star size={12} className="sm:w-4 sm:h-4 text-yellow-400" />
              <span>{stats.totalStars}</span>
            </div>
            {stats.averageScore > 0 && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-green-400">📊</span>
                <span>{stats.averageScore}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {quizLevels.map((level) => {
            const progress = levelProgress.get(level.id);
            const isUnlocked = level.unlocked;
            const isCompleted = progress?.completed || false;

            return (
              <div
                key={level.id}
                onClick={() => isUnlocked && onLevelSelect(level)}
                className={`
                  relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 cursor-pointer border-2
                  ${isUnlocked 
                    ? 'hover:bg-white/20 hover:scale-105 border-white/30 hover:border-yellow-400' 
                    : 'border-gray-400/30 cursor-not-allowed opacity-60'
                  }
                  ${isCompleted ? 'ring-2 ring-green-400' : ''}
                `}
              >
                {/* Level Icon and Status */}
                <div className="flex items-center justify-center mb-3">
                  {isUnlocked ? (
                    <BookOpen size={24} className="sm:w-8 sm:h-8 text-blue-400" />
                  ) : (
                    <Lock size={20} className="sm:w-6 sm:h-6 text-gray-400" />
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {level.id}
                  </div>
                  
                  <div className="text-sm sm:text-base text-white/90 font-semibold mb-2 line-clamp-2">
                    {level.title}
                  </div>
                  
                  <div className="text-xs sm:text-sm text-white/70 mb-3 line-clamp-2">
                    {level.description}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white ${getDifficultyColor(level.difficulty)} mb-3`}>
                    {level.difficulty}
                  </div>

                  {/* Quiz Stats */}
                  <div className="text-xs sm:text-sm text-white/70 mb-3">
                    <div>{level.questions.length} Questions</div>
                    <div>{level.timeLimit}s per question</div>
                    <div>Pass: {level.passingScore}%</div>
                  </div>
                </div>

                {/* Progress Info */}
                {isCompleted && progress && (
                  <div className="space-y-2">
                    {/* Stars */}
                    <div className="flex justify-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={`sm:w-4 sm:h-4 ${i < progress.stars ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                    
                    {/* Best Score */}
                    {progress.bestScore && (
                      <div className="text-xs sm:text-sm text-green-400 font-semibold">
                        Best: {progress.bestScore}%
                      </div>
                    )}

                    {/* Best Time */}
                    {progress.bestTime && (
                      <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-blue-400">
                        <Timer size={10} className="sm:w-3 sm:h-3" />
                        <span>{formatTime(progress.bestTime)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Trophy size={12} className="sm:w-4 sm:h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-6 sm:mt-8 text-center text-white/70 text-xs sm:text-sm px-2 sm:px-4">
          <p className="mb-2">Test your knowledge of Pastor Chris Oyakhilome's teachings!</p>
          <p>Answer questions correctly to earn stars and unlock new levels.</p>
        </div>
      </div>
    </div>
  );
};

export default QuizLevelMap;
