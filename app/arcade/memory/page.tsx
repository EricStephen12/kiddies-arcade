'use client'

import React, { useState, useEffect } from 'react';
import { memoryLevels, MemoryLevel, unlockNextMemoryLevel, resetAllMemoryLevels, loadUnlockedMemoryLevels } from '@/app/data/memoryLevels';
import MemoryLevelMap from '@/app/components/MemoryLevelMap';
import MemoryGame from '@/app/components/MemoryGame';
import { useRouter } from 'next/navigation';

const MemoryPage = () => {
  const [currentView, setCurrentView] = useState<'levelMap' | 'game'>('levelMap');
  const [selectedLevel, setSelectedLevel] = useState<MemoryLevel | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [levelScores, setLevelScores] = useState<Record<number, { time: number; moves: number; stars: number }>>({});
  const router = useRouter();

  useEffect(() => {
    // Load completed levels from localStorage
    const savedCompleted = localStorage.getItem('memoryCompletedLevels');
    if (savedCompleted) {
      setCompletedLevels(new Set(JSON.parse(savedCompleted)));
    }

    // Load level scores
    const savedScores = localStorage.getItem('memoryLevelScores');
    if (savedScores) {
      setLevelScores(JSON.parse(savedScores));
    }
  }, []);

  const handleLevelSelect = (level: MemoryLevel) => {
    setSelectedLevel(level);
    setCurrentView('game');
  };

  const handleLevelComplete = (success: boolean, time: number, moves: number) => {
    if (success && selectedLevel) {
      // Add to completed levels
      const newCompleted = new Set(completedLevels);
      newCompleted.add(selectedLevel.id);
      setCompletedLevels(newCompleted);
      localStorage.setItem('memoryCompletedLevels', JSON.stringify([...newCompleted]));

      // Unlock next level
      unlockNextMemoryLevel(selectedLevel.id);
      
      // Update unlocked levels in localStorage
      const savedUnlocked = JSON.parse(localStorage.getItem('memoryUnlockedLevels') || '[1]');
      if (!savedUnlocked.includes(selectedLevel.id + 1)) {
        savedUnlocked.push(selectedLevel.id + 1);
        localStorage.setItem('memoryUnlockedLevels', JSON.stringify(savedUnlocked));
      }
    }

    // Return to level map after a short delay
    setTimeout(() => {
      setCurrentView('levelMap');
      setSelectedLevel(null);
    }, 2000);
  };

  const handleReturn = () => {
    setCurrentView('levelMap');
    setSelectedLevel(null);
  };

  const handleBackToArcade = () => {
    router.push('/arcade');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'levelMap' ? (
        <MemoryLevelMap
          onLevelSelect={handleLevelSelect}
          onReturn={handleBackToArcade}
        />
      ) : selectedLevel ? (
        <MemoryGame
          level={selectedLevel}
          onLevelComplete={handleLevelComplete}
          onReturn={handleReturn}
        />
      ) : null}
    </div>
  );
};

export default MemoryPage;
