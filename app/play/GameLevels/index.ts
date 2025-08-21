// Game Levels Index
// This file provides easy access to all level components

// Export individual level components
export { default as Level1 } from './Level1';
export { default as Level2 } from './Level2';
export { default as Level3 } from './Level3';
export { default as Level4 } from './Level4';
export { default as Level5 } from './Level5';
export { default as Level6 } from './Level6';

// Export shared components
export { default as GameLevelComponent } from './shared/GameLevelComponent';
export type { GameLevelProps } from './shared/GameLevelComponent';

// Level data configuration
export const levelConfigs = {
  1: {
    name: 'Golden Stars',
    emoji: '🌟',
    description: 'Collect 3 magical golden stars',
    difficulty: 1,
    collectibles: [{ type: 'golden-star', emoji: '🌟', count: 3 }]
  },
  2: {
    name: 'Colorful Balloons',
    emoji: '🎈',
    description: 'Catch 5 colorful balloons',
    difficulty: 1,
    collectibles: [
      { type: 'red-balloon', emoji: '🎈', count: 2 },
      { type: 'blue-balloon', emoji: '🎈', count: 3 }
    ]
  },
  3: {
    name: 'Farm Animals',
    emoji: '🐄',
    description: 'Find all the farm animals',
    difficulty: 2,
    collectibles: [
      { type: 'cow', emoji: '🐄', count: 2 },
      { type: 'pig', emoji: '🐖', count: 2 },
      { type: 'sheep', emoji: '🐑', count: 2 }
    ]
  },
  4: {
    name: 'Happy Faces',
    emoji: '😊',
    description: 'Collect all the happy faces',
    difficulty: 2,
    collectibles: [
      { type: 'smile', emoji: '😊', count: 4 },
      { type: 'star-face', emoji: '🤩', count: 2 }
    ]
  },
  5: {
    name: 'Wool Collection',
    emoji: '🧶',
    description: 'Gather all the wool items',
    difficulty: 3,
    collectibles: [
      { type: 'wool-ball', emoji: '🧶', count: 5 },
      { type: 'yarn', emoji: '🧵', count: 3 }
    ]
  },
  6: {
    name: 'Mary\'s Special',
    emoji: '🌸',
    description: 'Find Mary\'s special items',
    difficulty: 3,
    collectibles: [
      { type: 'lamb', emoji: '🐑', count: 3 },
      { type: 'flower', emoji: '🌸', count: 4 },
      { type: 'heart', emoji: '❤️', count: 2 }
    ]
  }
};

// Helper function to get level config
export const getLevelConfig = (level: number) => {
  return levelConfigs[level as keyof typeof levelConfigs] || levelConfigs[1];
};

// Export all level numbers
export const levelNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
