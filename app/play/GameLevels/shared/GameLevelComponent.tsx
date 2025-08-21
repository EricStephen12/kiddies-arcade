'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Reuse the exact same interfaces from tiles/page.tsx
interface CollectibleTile {
  id: string;
  type: string;
  emoji: string;
  name: string;
}

interface Tile {
  id: string;
  column: number;
  y: number;
  length: 'short' | 'medium' | 'long';
  color: string;
  sparkle?: boolean;
  powerUp?: boolean;
  level?: number;
  collectible?: CollectibleTile | null;
}

// Props for individual level components
export interface GameLevelProps {
  level: number;
  onLevelComplete: (success: boolean, score: number, misses: number) => void;
  onReturn: () => void;
}

// Import the centralized data
import { getSongData, levelGoals } from '../../../data/songData';

// Dynamically import Lottie component
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-12 h-16 bg-pink-200 rounded-full animate-pulse" />
});

export default function GameLevelComponent({ level, onLevelComplete, onReturn }: GameLevelProps) {
  const [gameStarted, setGameStarted] = useState(true);
  const [kidPosition, setKidPosition] = useState({ x: 50, y: 80 });
  const [currentTile, setCurrentTile] = useState<number | null>(null);
  const [fallingTiles, setFallingTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [gameAreaHeight] = useState(500);
  const [kidOnTile, setKidOnTile] = useState<string | null>(null);
  const [combo, setCombo] = useState(0);
  const [cameraY, setCameraY] = useState(0);
  const [kidY, setKidY] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState<string[]>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [collectibles, setCollectibles] = useState<Record<string, number>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  // Level-specific data
  const currentLevel = level;
  const levelData = levelGoals[currentLevel];

  // Stop song audio
  const stopSongAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = '';
      currentAudio.load();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  // Play note sound
  const playNote = (note: string) => {
    if (typeof window === 'undefined' || !(window as any).AudioContext) return;
    const ctx = new (window as any).AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    const freq: { [k: string]: number } = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392, 'A4': 440, 'B4': 493.88, 'C5': 523.25
    };
    osc.frequency.value = freq[note] ?? 440;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start(); osc.stop(ctx.currentTime + 0.5);
  };

  // Generate collectible tiles based on level
  const generateCollectibleTile = () => {
    const levelGoal = levelGoals[currentLevel];
    if (!levelGoal?.collectibles) return null;

    const collectibleTypes = levelGoal.collectibles;
    const selectedType = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];

    return {
      id: `${selectedType.id}-${Date.now()}-${Math.random()}`,
      type: selectedType.id,
      emoji: selectedType.emoji,
      name: selectedType.name
    };
  };

  // Generate tiles
  const generateTile = () => {
    if (!gameStarted || gameOver) return;

    const columns = [0, 1, 2, 3];
    const lengths: ('short' | 'medium' | 'long')[] = ['short', 'medium', 'long'];
    const levelColors = [
      'from-purple-400 to-violet-500',
      'from-blue-400 to-cyan-500',
      'from-green-400 to-emerald-500',
      'from-orange-400 to-amber-500',
      'from-red-400 to-pink-500',
      'from-yellow-400 to-orange-500',
      'from-indigo-400 to-purple-500'
    ];

    const col = Math.floor(Math.random() * 4);
    const tilesInColumn = fallingTiles.filter(t => t.column === col);
    const minY = tilesInColumn.length > 0 ? Math.min(...tilesInColumn.map(t => t.y)) : -100;
    const spawnY = Math.min(-120, minY - 150);

    // Adjust collectible chance based on level
    const baseChance = 0.15;
    const collectibleChance = Math.min(baseChance + (currentLevel * 0.02), 0.3);
    const hasCollectible = Math.random() < collectibleChance;
    const collectible = hasCollectible ? generateCollectibleTile() : null;

    const newTile: Tile = {
      id: Date.now().toString() + Math.random(),
      column: col,
      y: spawnY,
      length: lengths[Math.floor(Math.random() * lengths.length)],
      color: levelColors[Math.floor(Math.random() * levelColors.length)],
      level: currentLevel,
      sparkle: Math.random() < 0.1,
      powerUp: Math.random() < 0.1,
      collectible: collectible
    };

    setFallingTiles(prev => [...prev, newTile]);
  };

  // Handle tile click
  const handleTileClick = (tileId: string, column: number) => {
    if (isJumping) return;
    const tile = fallingTiles.find(t => t.id === tileId);
    if (!tile) return;

    playNote('C4');
    setCombo(c => c + 1);
    setTimeout(() => setCombo(0), 3000);

    const pts = Math.min(combo + 1, 5);
    setScore(s => s + pts);
    setCurrentTile(column);
    setIsJumping(true);
    setKidOnTile(tileId);

    // Handle collectible collection
    if (tile.collectible) {
      const collectible = tile.collectible;
      setCollectibles(prev => ({
        ...prev,
        [collectible.type]: (prev[collectible.type] || 0) + 1
      }));

      // Show collection effect
      const effect = document.createElement('div');
      effect.className = 'fixed pointer-events-none z-50 text-2xl';
      effect.innerHTML = collectible.emoji;
      effect.style.cssText = `
        position: fixed;
        left: ${25 + column * 20}%;
        bottom: ${250}px;
        animation: collectEffect 1s ease-out forwards;
        color: #FFD700;
        font-weight: bold;
      `;
      document.body.appendChild(effect);
      setTimeout(() => effect.remove(), 1000);
    }

    setTimeout(() => {
      setFallingTiles(f => f.filter(t => t.id !== tileId));
      setKidOnTile(null);
      setIsJumping(false);
    }, 500);
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    setMisses(0);
    setFallingTiles([]);
    setGameOver(false);
    setGameStarted(true);
    setIsJumping(false);
    setCombo(0);
    setCurrentTile(null);
    setKidOnTile(null);
    setCollectibles({});
    stopSongAudio();
  };

  // Check level completion
  const checkLevelCompletion = () => {
    const levelGoal = levelGoals[currentLevel];
    if (!levelGoal) return false;

    // Check collectible completion
    const collectiblesComplete = levelGoal.collectibles?.every(item =>
      (collectibles[item.id] || 0) >= item.count
    ) ?? true;

    // Check win condition based on level type
    if (levelGoal.winCondition === 'collect-items') {
      return collectiblesComplete && misses <= levelGoal.maxMisses;
    } else {
      return score >= levelGoal.requiredScore && misses <= levelGoal.maxMisses;
    }
  };

  // Game effects
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const int = setInterval(generateTile, 1200);
    return () => clearInterval(int);
  }, [gameStarted, gameOver, currentLevel]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const int = setInterval(() => {
      setFallingTiles(prev => {
        const speed = 5;
        const next = prev.map(t => ({ ...t, y: t.y + speed }));

        if (kidOnTile) {
          const ride = next.find(t => t.id === kidOnTile);
          if (ride && ride.y > 500 + 100) {
            setGameOver(true);
            stopSongAudio();
            return next;
          }
        }

        const missed = next.filter(t => t.y > 500 + 100 && t.id !== kidOnTile);
        if (missed.length) {
          setMisses(m => {
            const newMiss = m + missed.length;
            if (newMiss >= 3) {
              setGameOver(true);
              stopSongAudio();
            }
            return newMiss;
          });
        }

        return next.filter(t => t.y <= 500 + 100);
      });
    }, 50);
    return () => clearInterval(int);
  }, [gameStarted, gameOver, kidOnTile]);

  // Return the component with all necessary props
  return {
    level: currentLevel,
    levelData,
    fallingTiles,
    score,
    misses,
    collectibles,
    gameOver,
    handleTileClick,
    resetGame,
    checkLevelCompletion,
    onReturn: onReturn
  };
}
