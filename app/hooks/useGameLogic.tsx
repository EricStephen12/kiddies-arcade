// hooks/useGameLogic.ts
import { useState, useEffect, useCallback } from 'react';
import { Tile, CollectibleTile, GameState, PowerUps } from '@/app/types/gametypes';
import { levelGoals, getThemeForLevel } from '@/app/data/songData';

export const useGameLogic = (currentLevel: number, gameAreaHeight: number) => {
  const [gameState, setGameState] = useState<Partial<GameState>>({
    gameStarted: true,
    kidPosition: { x: 50, y: 80 },
    currentTile: null,
    fallingTiles: [],
    score: 0,
    misses: 0,
    gameOver: false,
    isJumping: false,
    kidOnTile: null,
    combo: 0,
    particles: [],
    kidY: 0,
    songProgress: 0,
    currentSongTime: 0,
    levelStars: {},
    completedLevels: new Set(),
    levelProgress: {},
    showLevelComplete: false,
    levelCompleteMessage: '',
    nextLevelUnlock: null,
    showSuccess: false,
    showFailure: false,
    musicStarted: false,
    currentLyrics: [],
    currentLyricIndex: -1,
    highlightedWordIndex: 0,
    collectibles: {},
    collectibleItems: []
  });

  const [powerUps, setPowerUps] = useState<PowerUps>({ 
    doubleScore: false, 
    slowMotion: false, 
    rainbowTiles: false, 
    shield: false, 
    bombs: 0 
  });

  const generateCollectibleTile = useCallback((level: number): CollectibleTile | null => {
    const levelGoal = levelGoals[level];
    if (!levelGoal?.collectibles) return null;

    const collectibleTypes = levelGoal.collectibles;
    const selectedType = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];

    return {
      // Use stable id equal to type id so tracking aligns with UI and goals
      id: selectedType.id,
      type: selectedType.id,
      emoji: selectedType.emoji,
      name: selectedType.name
    };
  }, []);

  const generateTile = useCallback((): Tile => {
    const column = Math.floor(Math.random() * 4);
    const length = ['short', 'medium', 'long'][Math.floor(Math.random() * 3)] as 'short' | 'medium' | 'long';
    
    // SMART COMPETITIVE TILE GENERATION - Challenge through variety, not speed!
    const random = Math.random();
    let tileType = 'normal';
    let color = 'from-pink-400 to-pink-600';
    
    // Progressive mechanic complexity (not speed!)
    const mechanicComplexity = Math.min(currentLevel / 5, 1); // 0 to 1 progression
    
    if (random < 0.20) { // Slightly more collectibles for fun
      tileType = 'collectible';
      color = 'from-green-400 to-green-600';
    } else if (random < 0.20 + (mechanicComplexity * 0.15)) { // More power-ups in later levels
      tileType = 'powerup';
      color = 'from-yellow-400 to-yellow-600';
    } else if (random < 0.20 + (mechanicComplexity * 0.25)) { // Strategic obstacles (not speed bumps!)
      tileType = 'obstacle';
      color = 'from-red-500 to-red-700';
    } else {
      // Beautiful theme-based colors for visual variety
      const colorIndex = currentLevel % 5;
      const themeColors = [
        'from-blue-400 to-blue-600',
        'from-purple-400 to-purple-600', 
        'from-pink-400 to-pink-600',
        'from-green-400 to-green-600',
        'from-orange-400 to-orange-600'
      ];
      color = themeColors[colorIndex];
    }
    
    return {
      id: `tile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      column,
      y: -100,
      length,
      color,
      sparkle: tileType === 'collectible',
      powerUp: tileType === 'powerup',
      obstacle: tileType === 'obstacle' ? 'spike' : undefined,
      powerUpType: tileType === 'powerup' ? 'doubleScore' : undefined,
      level: currentLevel,
      collectible: tileType === 'collectible' ? generateCollectibleTile(currentLevel) : null
    };
  }, [currentLevel, generateCollectibleTile]);

  const calculateStars = useCallback((finalScore: number, finalMisses: number): number => {
    const levelGoal = levelGoals[currentLevel];
    let stars = 0;

    if (finalScore >= levelGoal.requiredScore) stars++;
    if (finalMisses <= levelGoal.maxMisses) stars++;
    if (finalMisses === 0 && finalScore >= levelGoal.requiredScore * 1.5) stars++;

    return Math.min(stars, 3);
  }, [currentLevel]);

  const resetGame = useCallback(() => {
    setGameState({
      gameStarted: true,
      score: 0,
      misses: 0,
      fallingTiles: [],
      gameOver: false,
      isJumping: false,
      combo: 0,
      currentTile: null,
      kidOnTile: null,
      particles: [],
      showLevelComplete: false,
      nextLevelUnlock: null,
      collectibles: {},
      collectibleItems: [],
      musicStarted: false,
      kidY: 0
    });
    setPowerUps({ doubleScore: false, slowMotion: false, rainbowTiles: false, shield: false, bombs: 0 });
  }, []);

  // Removed duplicate game loop - using main game loop for better performance

  return {
    gameState,
    setGameState,
    powerUps,
    setPowerUps,
    generateTile,
    generateCollectibleTile,
    calculateStars,
    resetGame
  };
};