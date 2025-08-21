// types/gameTypes.ts
export interface CollectibleTile {
    id: string;
    type: string;
    emoji: string;
    name: string;
  }
  
  export interface Tile {
    id: string;
    column: number;
    y: number;
    length: 'short' | 'medium' | 'long';
    color: string;
    sparkle?: boolean;
    powerUp?: boolean;
    obstacle?: string;
    powerUpType?: string;
    level?: number;
    collectible?: CollectibleTile | null;
  }
  
  export interface GameState {
    gameStarted: boolean;
    kidPosition: { x: number; y: number };
    currentTile: number | null;
    fallingTiles: Tile[];
    score: number;
    misses: number;
    gameOver: boolean;
    isJumping: boolean;
    gameAreaHeight: number;
    isMobile: boolean;
    kidOnTile: string | null;
    currentLevel: number;
    combo: number;
    particles: Array<{id: number; x: number; y: number; color: string}>;
    kidY: number;
    songProgress: number;
    currentSongTime: number;
    levelStars: Record<number, number>;
    completedLevels: Set<number>;
    levelProgress: Record<number, {score: number; stars: number; perfect: boolean}>;
    showLevelComplete: boolean;
    levelCompleteMessage: string;
    nextLevelUnlock: number | null;
    showSuccess: boolean;
    showFailure: boolean;
    musicStarted: boolean;
    currentLyrics: string[];
    currentLyricIndex: number;
    highlightedWordIndex: number;
    collectibles: Record<string, number>;
    collectibleItems: any[];
  }
  
  export interface PowerUps {
    doubleScore: boolean;
    slowMotion: boolean;
    rainbowTiles: boolean;
    shield: boolean;
    bombs: number;
  }
  
  export interface KiddieJumpGameProps {
    level?: number;
    onLevelComplete?: (success: boolean, score: number, misses: number) => void;
    onReturn?: () => void;
  }