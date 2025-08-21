import React, { useState, useEffect } from 'react';
import { Star, Lock, Play, Trophy, Music, Crown, Zap } from 'lucide-react';
import { getSongData, getThemeForLevel, levelGoals } from '../app/data/songData';

interface LevelProgress {
  level: number;
  unlocked: boolean;
  stars: number;
  completed: boolean;
  songTitle: string;
  bestScore: number;
  difficulty: number;
  isSpecial?: boolean;
}

interface KiddiesJumpLevelMapProps {
  onLevelSelect: (level: number) => void;
}

const KiddiesJumpLevelMap: React.FC<KiddiesJumpLevelMapProps> = ({ onLevelSelect }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [levels, setLevels] = useState<LevelProgress[]>([]);
  
  // Refresh levels when component mounts or when returning from game
  const refreshLevels = () => {
    let savedProgress: any = {};
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kiddieJumpProgress');
        if (saved) {
          savedProgress = JSON.parse(saved);
        }
      } catch (error) {
        console.log('Error loading progress:', error);
      }
    }

    const updatedLevels = Array.from({ length: 25 }, (_, index) => {
      const levelNum = index + 1;
      const difficulty = Math.min(5, Math.ceil(levelNum / 5));
      const isSpecial = levelNum % 5 === 0;
      
      // Support multiple schemas for backward compatibility
      const levelData = (savedProgress.levels?.[levelNum])
        || (savedProgress.levelProgress?.[levelNum])
        || (savedProgress[levelNum])
        || {};
      
      let unlocked = levelNum === 1;
      if (levelNum > 1) {
        const prevSchema = (savedProgress.levels?.[levelNum - 1])
          || (savedProgress.levelProgress?.[levelNum - 1])
          || (savedProgress[levelNum - 1])
          || {};
        const previousLevelCompleted = !!prevSchema.completed
          || Array.isArray(savedProgress.completedLevels) && savedProgress.completedLevels.includes(levelNum - 1);
        unlocked = previousLevelCompleted;
      }
      
      return {
        level: levelNum,
        unlocked: unlocked,
        stars: levelData.stars || 0,
        completed: !!levelData.completed,
        songTitle: getSongTitle(levelNum),
        bestScore: levelData.score || 0,
        difficulty: difficulty,
        isSpecial: isSpecial
      };
    });
    
    setLevels(updatedLevels);
  };

  // Refresh levels when component mounts
  useEffect(() => {
    refreshLevels();
  }, []);

  // Get song titles from centralized data
  const getSongTitle = (level: number) => {
    try {
      return getSongData(level).title;
    } catch {
      return `Song ${level}`;
    }
  };

  // Get level challenge description
  const getLevelChallenge = (level: number) => {
    try {
      const goals = levelGoals[level];
      return goals?.specialChallenge || `Level ${level}`;
    } catch {
      return `Level ${level}`;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-purple-500';
      case 5: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyName = (difficulty: number) => {
    const names = ['Forest', 'Ocean', 'Desert', 'Space', 'Crystal'];
    return names[difficulty - 1] || 'Unknown';
  };

  const handleLevelClick = (level: LevelProgress) => {
    if (level.unlocked) {
      setSelectedLevel(level.level);
      setTimeout(() => {
        onLevelSelect(level.level);
      }, 300);
    }
  };

  const completedLevels = levels.filter(level => level.completed).length;
  const totalLevels = levels.length;
  const progressPercentage = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 sm:p-3 rounded-full mr-2 sm:mr-4">
              <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Kiddies Jump
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-lg mb-2 sm:mb-4">
            Jump to the rhythm and complete all 25 levels!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 text-white text-xs sm:text-base">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded"></div>
              <span>Forest</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
              <span>Ocean</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded"></div>
              <span>Desert</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded"></div>
              <span>Space</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded"></div>
              <span>Crystal</span>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-6 mb-4 sm:mb-8 border border-white/20">
          <div className="grid grid-cols-2 sm:flex sm:justify-between items-center text-white gap-2 sm:gap-0">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold">{completedLevels}</div>
              <div className="text-xs sm:text-sm opacity-80">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold">{totalLevels}</div>
              <div className="text-xs sm:text-sm opacity-80">Total Levels</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold">{progressPercentage}%</div>
              <div className="text-xs sm:text-sm opacity-80">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold">
                {levels.reduce((total, level) => total + level.stars, 0)}
              </div>
              <div className="text-xs sm:text-sm opacity-80">Total Stars</div>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {levels.map((level) => {
            const isCompleted = level.completed;
            const isUnlocked = level.unlocked;
            
            return (
              <div
                key={level.level}
                onClick={() => handleLevelClick(level)}
                className={`
                  relative bg-white/10 backdrop-blur-lg rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer
                  ${isUnlocked 
                    ? 'border-white/30 hover:border-yellow-400 hover:bg-white/20 hover:scale-105' 
                    : 'border-gray-600 cursor-not-allowed opacity-50'
                  }
                  ${isCompleted ? 'ring-2 ring-green-400' : ''}
                  ${level.isSpecial ? 'ring-2 ring-yellow-400' : ''}
                `}
              >
                {/* Level Number */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {level.level}
                </div>

                {/* Special Level Crown */}
                {level.isSpecial && isUnlocked && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-full">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

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

                {/* Level Preview */}
                <div className="w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-800 relative flex items-center justify-center">
                  {isUnlocked ? (
                    <div className={`w-full h-full bg-gradient-to-br ${getDifficultyColor(level.difficulty).replace('bg-', 'from-')} to-gray-800 flex items-center justify-center`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{level.level}</div>
                        <div className="text-xs text-white/80">{getDifficultyName(level.difficulty)}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock size={24} className="text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Level Info */}
                <div className="text-white">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {level.songTitle}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs opacity-80">
                      {getDifficultyName(level.difficulty)}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(level.difficulty)}`}></div>
                  </div>

                  <p className="text-xs opacity-70 line-clamp-2 mb-3">
                    {getLevelChallenge(level.level)}
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={level.stars >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                      />
                    ))}
                  </div>

                  {/* Best Score */}
                  {isCompleted && level.bestScore > 0 && (
                    <div className="flex items-center gap-1 text-xs text-cyan-400 mb-2">
                      <span>Best: {(level.bestScore / 1000).toFixed(1)}K</span>
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

export default KiddiesJumpLevelMap;