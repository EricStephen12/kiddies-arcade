'use client'

import React, { useState, useEffect } from 'react';
import { wordSearchLevels, WordSearchLevel, unlockNextCrosswordLevel, resetAllCrosswordLevels, loadUnlockedCrosswordLevels } from '@/app/data/crosswordLevels';
import CrosswordLevelMap from '@/app/components/CrosswordLevelMap';
import CrosswordGame from '@/app/components/CrosswordGame';
import { useRouter } from 'next/navigation';

const CrosswordPage = () => {
  const [currentView, setCurrentView] = useState<'levelMap' | 'game'>('levelMap');
  const [selectedLevel, setSelectedLevel] = useState<WordSearchLevel | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [levelScores, setLevelScores] = useState<Record<number, { time: number; stars: number }>>({});
  const router = useRouter();

  // Load saved progress from localStorage
  useEffect(() => {
    const savedCompletedLevels = localStorage.getItem('crosswordCompletedLevels');
    const savedLevelScores = localStorage.getItem('crosswordLevelScores');
    
    if (savedCompletedLevels) {
      const completed = new Set(JSON.parse(savedCompletedLevels) as number[]);
      setCompletedLevels(completed);
      loadUnlockedCrosswordLevels(completed);
    }
    
    if (savedLevelScores) {
      setLevelScores(JSON.parse(savedLevelScores));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (completedLevels: Set<number>, levelScores: Record<number, { time: number; stars: number }>) => {
    localStorage.setItem('crosswordCompletedLevels', JSON.stringify(Array.from(completedLevels)));
    localStorage.setItem('crosswordLevelScores', JSON.stringify(levelScores));
  };

  const handleLevelSelect = (level: WordSearchLevel) => {
    setSelectedLevel(level);
    setCurrentView('game');
  };

  const handleLevelComplete = (levelId: number, time: number) => {
    // Calculate stars based on time
    const level = wordSearchLevels.find(l => l.id === levelId);
    if (!level) return;

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

    const stars = getStars(time, level.difficulty);

    // Update completed levels
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    setCompletedLevels(newCompletedLevels);

    // Update level scores
    const newLevelScores = { ...levelScores };
    const currentBest = newLevelScores[levelId];
    
    if (!currentBest || time < currentBest.time) {
      newLevelScores[levelId] = { time, stars };
      setLevelScores(newLevelScores);
    }

    // Unlock next level
    unlockNextCrosswordLevel(levelId);

    // Save progress
    saveProgress(newCompletedLevels, newLevelScores);
  };

  const handleBackToLevelMap = () => {
    setCurrentView('levelMap');
    setSelectedLevel(null);
  };

  const handleBackToMainMenu = () => {
    router.push('/arcade');
  };

  const resetProgress = () => {
    setCompletedLevels(new Set());
    setLevelScores({});
    localStorage.removeItem('crosswordCompletedLevels');
    localStorage.removeItem('crosswordLevelScores');
    resetAllCrosswordLevels();
  };

  if (currentView === 'game' && selectedLevel) {
    const bestScore = levelScores[selectedLevel.id];
    return (
      <CrosswordGame
        level={selectedLevel}
        onLevelComplete={handleLevelComplete}
        onBackToLevelMap={handleBackToLevelMap}
        bestTime={bestScore?.time}
      />
    );
  }

  return (
    <div>
      <CrosswordLevelMap
        onLevelSelect={handleLevelSelect}
        onBackToMainMenu={handleBackToMainMenu}
      />
      
      {/* Reset Progress Button - for development/testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={resetProgress}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
};

export default CrosswordPage;
