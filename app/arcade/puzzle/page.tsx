'use client'

import React, { useState, useEffect } from 'react';
import { puzzleLevels, PuzzleLevel, unlockNextLevel, resetAllLevels, loadUnlockedLevels } from '@/app/data/puzzleLevels';
import LevelMap from '@/app/components/LevelMap';
import SlidingPuzzleGame from '@/app/components/SlidingPuzzleGame';

const PuzzlePage = () => {
  const [currentView, setCurrentView] = useState<'levelMap' | 'game'>('levelMap');
  const [selectedLevel, setSelectedLevel] = useState<PuzzleLevel | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [levelScores, setLevelScores] = useState<Record<number, { moves: number; time: number; stars: number }>>({});

  // Load saved progress from localStorage
  useEffect(() => {
    const savedCompletedLevels = localStorage.getItem('puzzleCompletedLevels');
    const savedLevelScores = localStorage.getItem('puzzleLevelScores');
    
    if (savedCompletedLevels) {
      const completed = new Set(JSON.parse(savedCompletedLevels) as number[]);
      setCompletedLevels(completed);
      loadUnlockedLevels(completed);
    }
    
    if (savedLevelScores) {
      setLevelScores(JSON.parse(savedLevelScores));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (completedLevels: Set<number>, levelScores: Record<number, { moves: number; time: number; stars: number }>) => {
    localStorage.setItem('puzzleCompletedLevels', JSON.stringify(Array.from(completedLevels)));
    localStorage.setItem('puzzleLevelScores', JSON.stringify(levelScores));
  };

  const handleLevelSelect = (level: PuzzleLevel) => {
    setSelectedLevel(level);
    setCurrentView('game');
  };

  const handleLevelComplete = (levelId: number, moves: number, time: number) => {
    // Calculate stars based on performance
    const level = puzzleLevels.find(l => l.id === levelId);
    if (!level) return;

    const maxMoves = level.gridSize === 3 ? 50 : 100;
    const maxTime = level.gridSize === 3 ? 120 : 300; // seconds
    
    let stars = 3;
    if (moves > maxMoves * 0.7 || time > maxTime * 0.7) stars = 2;
    if (moves > maxMoves * 0.9 || time > maxTime * 0.9) stars = 1;

    // Update completed levels
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    setCompletedLevels(newCompletedLevels);

    // Update level scores
    const newLevelScores = { ...levelScores };
    const currentBest = newLevelScores[levelId];
    
    if (!currentBest || moves < currentBest.moves) {
      newLevelScores[levelId] = { moves, time, stars };
      setLevelScores(newLevelScores);
    }

    // Unlock next level
    unlockNextLevel(levelId);

    // Save progress
    saveProgress(newCompletedLevels, newLevelScores);
  };

  const handleBackToLevelMap = () => {
    setCurrentView('levelMap');
    setSelectedLevel(null);
  };

  const resetProgress = () => {
    setCompletedLevels(new Set());
    setLevelScores({});
    localStorage.removeItem('puzzleCompletedLevels');
    localStorage.removeItem('puzzleLevelScores');
    resetAllLevels();
  };

  if (currentView === 'game' && selectedLevel) {
    const bestScore = levelScores[selectedLevel.id];
    return (
      <SlidingPuzzleGame
        level={selectedLevel}
        onLevelComplete={handleLevelComplete}
        onBackToLevelMap={handleBackToLevelMap}
        bestMoves={bestScore?.moves}
        bestTime={bestScore?.time}
      />
    );
  }

  return (
    <div>
      <LevelMap
        levels={puzzleLevels}
        onLevelSelect={handleLevelSelect}
        completedLevels={completedLevels}
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

export default PuzzlePage;