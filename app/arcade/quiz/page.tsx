'use client'

import React, { useState, useEffect } from 'react';
import { quizLevels, QuizLevel, unlockNextQuizLevel, resetAllQuizLevels, loadUnlockedQuizLevels } from '@/app/data/quizLevels';
import QuizLevelMap from '@/app/components/QuizLevelMap';
import QuizGame from '@/app/components/QuizGame';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const [currentView, setCurrentView] = useState<'levelMap' | 'game'>('levelMap');
  const [selectedLevel, setSelectedLevel] = useState<QuizLevel | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [levelScores, setLevelScores] = useState<Record<number, { score: number; time: number; stars: number }>>({});
  const router = useRouter();

  // Load saved progress from localStorage
  useEffect(() => {
    const savedCompletedLevels = localStorage.getItem('quizCompletedLevels');
    const savedLevelScores = localStorage.getItem('quizLevelScores');
    
    if (savedCompletedLevels) {
      const completed = new Set(JSON.parse(savedCompletedLevels) as number[]);
      setCompletedLevels(completed);
      loadUnlockedQuizLevels(completed);
    }
    
    if (savedLevelScores) {
      setLevelScores(JSON.parse(savedLevelScores));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (completedLevels: Set<number>, levelScores: Record<number, { score: number; time: number; stars: number }>) => {
    localStorage.setItem('quizCompletedLevels', JSON.stringify(Array.from(completedLevels)));
    localStorage.setItem('quizLevelScores', JSON.stringify(levelScores));
  };

  const handleLevelSelect = (level: QuizLevel) => {
    setSelectedLevel(level);
    setCurrentView('game');
  };

  const handleLevelComplete = (levelId: number, score: number, time: number) => {
    // Calculate stars based on score
    const getStars = (score: number) => {
      if (score >= 90) return 3;
      if (score >= 80) return 2;
      if (score >= 70) return 1;
      return 0;
    };

    const stars = getStars(score);

    // Update completed levels
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    setCompletedLevels(newCompletedLevels);

    // Update level scores
    const newLevelScores = { ...levelScores };
    const currentBest = newLevelScores[levelId];
    
    if (!currentBest || score > currentBest.score) {
      newLevelScores[levelId] = { score, time, stars };
      setLevelScores(newLevelScores);
    }

    // Unlock next level
    unlockNextQuizLevel(levelId);

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
    localStorage.removeItem('quizCompletedLevels');
    localStorage.removeItem('quizLevelScores');
    resetAllQuizLevels();
  };

  if (currentView === 'game' && selectedLevel) {
    const bestScore = levelScores[selectedLevel.id];
    return (
      <QuizGame
        level={selectedLevel}
        onLevelComplete={handleLevelComplete}
        onBackToLevelMap={handleBackToLevelMap}
        bestScore={bestScore?.score}
        bestTime={bestScore?.time}
      />
    );
  }

  return (
    <div>
      <QuizLevelMap
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

export default QuizPage;
