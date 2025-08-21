export interface WordSearchWord {
  word: string;
  clue: string;
  startRow: number;
  startCol: number;
  direction: 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up';
  found: boolean;
}

export interface WordSearchLevel {
  id: number;
  title: string;
  gridSize: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  unlocked: boolean;
  words: WordSearchWord[];
  grid: string[][];
  bestTime?: number;
  stars?: number;
}

// Helper function to generate random letters
const getRandomLetter = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
};

// Helper function to place word in grid
const placeWordInGrid = (grid: string[][], word: string, startRow: number, startCol: number, direction: string): boolean => {
  const gridSize = grid.length;
  let deltaRow = 0, deltaCol = 0;
  
  switch (direction) {
    case 'horizontal': deltaCol = 1; break;
    case 'vertical': deltaRow = 1; break;
    case 'diagonal-down': deltaRow = 1; deltaCol = 1; break;
    case 'diagonal-up': deltaRow = -1; deltaCol = 1; break;
  }

  // Check if word fits and doesn't conflict with existing letters
  for (let i = 0; i < word.length; i++) {
    const row = startRow + (deltaRow * i);
    const col = startCol + (deltaCol * i);
    
    // Check bounds
    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return false;
    
    // Check if cell is already occupied by a different letter
    if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
      return false;
    }
  }

  // Place word (only if all checks passed)
  for (let i = 0; i < word.length; i++) {
    const row = startRow + (deltaRow * i);
    const col = startCol + (deltaCol * i);
    grid[row][col] = word[i];
  }
  
  return true;
};

// Helper function to create word search grid
const createWordSearchGrid = (gridSize: number, words: Omit<WordSearchWord, 'found' | 'startRow' | 'startCol' | 'direction'>[]): { grid: string[][], placedWords: WordSearchWord[] } => {
  const grid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  const placedWords: WordSearchWord[] = [];
  
  // Sort words by length (longer words first) for better placement
  const sortedWords = [...words].sort((a, b) => b.word.length - a.word.length);
  
  // Try to place each word
  sortedWords.forEach(wordInfo => {
    const { word } = wordInfo;
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 500) { // Increased attempts for better placement
      const directions = ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up'];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      let startRow = Math.floor(Math.random() * gridSize);
      let startCol = Math.floor(Math.random() * gridSize);
      
      // Adjust start position based on direction to ensure word fits
      switch (direction) {
        case 'horizontal':
          startCol = Math.max(0, Math.min(startCol, gridSize - word.length));
          break;
        case 'vertical':
          startRow = Math.max(0, Math.min(startRow, gridSize - word.length));
          break;
        case 'diagonal-down':
          startRow = Math.max(0, Math.min(startRow, gridSize - word.length));
          startCol = Math.max(0, Math.min(startCol, gridSize - word.length));
          break;
        case 'diagonal-up':
          startRow = Math.max(word.length - 1, Math.min(startRow, gridSize - 1));
          startCol = Math.max(0, Math.min(startCol, gridSize - word.length));
          break;
      }
      
      if (placeWordInGrid(grid, word, startRow, startCol, direction)) {
        placedWords.push({
          ...wordInfo,
          startRow,
          startCol,
          direction: direction as any,
          found: false
        });
        placed = true;
      }
      attempts++;
    }
    
    // If word couldn't be placed after many attempts, force place it in a clear area
    if (!placed) {
      console.warn(`Could not place word: ${word}`);
      // Try simpler horizontal placement in empty areas
      for (let row = 0; row < gridSize - 1; row++) {
        for (let col = 0; col <= gridSize - word.length; col++) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '') {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              grid[row][col + i] = word[i];
            }
            placedWords.push({
              ...wordInfo,
              startRow: row,
              startCol: col,
              direction: 'horizontal' as any,
              found: false
            });
            placed = true;
            break;
          }
        }
        if (placed) break;
      }
    }
  });
  
  // Fill empty cells with random letters
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = getRandomLetter();
      }
    }
  }
  
  return { grid, placedWords };
};

// Generate level grids with words placed randomly
const level1Data = createWordSearchGrid(8, [
  { word: 'FAITH', clue: 'Complete trust in God' },
  { word: 'GRACE', clue: "God's unmerited favor" },
  { word: 'PRAYER', clue: 'Talking to God' },
  { word: 'LOVE', clue: 'Divine affection' },
  { word: 'HOPE', clue: 'Confident expectation' }
]);

const level2Data = createWordSearchGrid(10, [
  { word: 'HEALING', clue: "God's supernatural restoration" },
  { word: 'MIRACLE', clue: 'Wonder-working power' },
  { word: 'HEALTH', clue: 'Complete wellness' },
  { word: 'JESUS', clue: "God's delivering power" },
  { word: 'POWER', clue: 'Divine strength' },
  { word: 'VICTORY', clue: 'Overcoming triumph' }
]);

const level3Data = createWordSearchGrid(12, [
  { word: 'SPIRIT', clue: 'Third person of Trinity' },
  { word: 'GIFTS', clue: 'Supernatural abilities' },
  { word: 'FRUIT', clue: 'Godly character traits' },
  { word: 'WISDOM', clue: 'Divine knowledge' },
  { word: 'PEACE', clue: 'Inner tranquility' },
  { word: 'JOY', clue: 'Spiritual happiness' },
  { word: 'GOODNESS', clue: 'Moral excellence' }
]);

const level4Data = createWordSearchGrid(14, [
  { word: 'PROSPERITY', clue: 'Biblical abundance' },
  { word: 'BLESSING', clue: "God's favor" },
  { word: 'TITHING', clue: 'Giving a tenth to God' },
  { word: 'OFFERING', clue: 'Generous giving' },
  { word: 'WEALTH', clue: 'Material abundance' },
  { word: 'SUCCESS', clue: 'Divine achievement' },
  { word: 'PROVISION', clue: "God's supply" },
  { word: 'INCREASE', clue: 'Divine multiplication' }
]);

const level5Data = createWordSearchGrid(16, [
  { word: 'CHARACTER', clue: 'Godly nature' },
  { word: 'INTEGRITY', clue: 'Moral wholeness' },
  { word: 'HUMILITY', clue: 'Quality of being humble' },
  { word: 'PATIENCE', clue: "Waiting on God's timing" },
  { word: 'KINDNESS', clue: 'Gentle compassion' },
  { word: 'VIRTUE', clue: 'Moral excellence' },
  { word: 'RIGHTEOUSNESS', clue: 'Right standing with God' },
  { word: 'HOLINESS', clue: 'Set apart for God' }
]);

const level6Data = createWordSearchGrid(18, [
  { word: 'MINISTRY', clue: 'Serving God' },
  { word: 'EVANGELISM', clue: 'Spreading the Gospel' },
  { word: 'DISCIPLESHIP', clue: "Teaching God's Word" },
  { word: 'LEADERSHIP', clue: 'Godly guidance' },
  { word: 'FELLOWSHIP', clue: 'Christian community' },
  { word: 'WORSHIP', clue: 'Praising God' },
  { word: 'INTERCESSION', clue: 'Praying for others' },
  { word: 'ANOINTING', clue: 'Divine empowerment' },
  { word: 'CALLING', clue: "God's purpose for life" }
]);

// Additional levels 7-25
const level7Data = createWordSearchGrid(10, [
  { word: 'TESTIMONY', clue: 'Personal witness' },
  { word: 'TRUTH', clue: "God's reality" },
  { word: 'LIGHT', clue: 'Divine illumination' },
  { word: 'SALVATION', clue: 'Divine rescue' },
  { word: 'FREEDOM', clue: 'Liberation in Christ' },
  { word: 'VICTORY', clue: 'Triumph over enemy' }
]);

const level8Data = createWordSearchGrid(12, [
  { word: 'COMMUNION', clue: 'Fellowship with God' },
  { word: 'REVELATION', clue: 'Divine disclosure' },
  { word: 'TRANSFORMATION', clue: 'Spiritual change' },
  { word: 'RENEWAL', clue: 'Making all things new' },
  { word: 'RESTORATION', clue: 'Bringing back to God' },
  { word: 'REGENERATION', clue: 'New birth in Christ' }
]);

const level9Data = createWordSearchGrid(14, [
  { word: 'MISSIONS', clue: 'Global Gospel spread' },
  { word: 'HARVEST', clue: 'Gathering souls' },
  { word: 'KINGDOM', clue: "God's reign" },
  { word: 'AUTHORITY', clue: 'Divine power' },
  { word: 'DOMINION', clue: 'Ruling with Christ' },
  { word: 'MANDATE', clue: 'Divine commission' },
  { word: 'PURPOSE', clue: "God's plan" }
]);

const level10Data = createWordSearchGrid(16, [
  { word: 'BREAKTHROUGH', clue: 'Breaking barriers' },
  { word: 'MIRACLE', clue: 'Supernatural wonder' },
  { word: 'SUPERNATURAL', clue: 'Beyond natural' },
  { word: 'MANIFESTATION', clue: 'Making visible' },
  { word: 'DEMONSTRATION', clue: 'Showing power' },
  { word: 'EXHIBITION', clue: 'Divine display' },
  { word: 'GLORY', clue: "God's splendor" }
]);

const level11Data = createWordSearchGrid(8, [
  { word: 'EXCELLENCE', clue: 'Superior quality' },
  { word: 'HONOR', clue: 'Giving respect' },
  { word: 'DIGNITY', clue: 'Noble worth' },
  { word: 'RESPECT', clue: 'High regard' },
  { word: 'ESTEEM', clue: 'Value highly' }
]);

const level12Data = createWordSearchGrid(10, [
  { word: 'COMMITMENT', clue: 'Dedicated pledge' },
  { word: 'FAITHFULNESS', clue: 'Loyal reliability' },
  { word: 'LOYALTY', clue: 'Steadfast devotion' },
  { word: 'DEVOTION', clue: 'Loving dedication' },
  { word: 'CONSISTENCY', clue: 'Steady behavior' },
  { word: 'RELIABILITY', clue: 'Dependable nature' }
]);

const level13Data = createWordSearchGrid(12, [
  { word: 'ABUNDANCE', clue: 'Overflowing plenty' },
  { word: 'OVERFLOW', clue: 'Exceeding measure' },
  { word: 'MULTIPLICATION', clue: 'Divine increase' },
  { word: 'FRUITFULNESS', clue: 'Productive results' },
  { word: 'PRODUCTIVITY', clue: 'Effective output' },
  { word: 'EFFICIENCY', clue: 'Optimized results' }
]);

const level14Data = createWordSearchGrid(14, [
  { word: 'RIGHTEOUSNESS', clue: 'Right standing' },
  { word: 'SANCTIFICATION', clue: 'Being set apart' },
  { word: 'JUSTIFICATION', clue: 'Declared righteous' },
  { word: 'REDEMPTION', clue: 'Bought back' },
  { word: 'RECONCILIATION', clue: 'Restored relationship' },
  { word: 'ATONEMENT', clue: 'Payment for sin' }
]);

const level15Data = createWordSearchGrid(16, [
  { word: 'PARTNERSHIP', clue: 'Working together' },
  { word: 'COLLABORATION', clue: 'Joint effort' },
  { word: 'COOPERATION', clue: 'Mutual assistance' },
  { word: 'TEAMWORK', clue: 'Group coordination' },
  { word: 'UNITY', clue: 'Oneness in spirit' },
  { word: 'HARMONY', clue: 'Perfect agreement' },
  { word: 'SYNERGY', clue: 'Combined power' }
]);

const level16Data = createWordSearchGrid(18, [
  { word: 'ADMINISTRATION', clue: 'Organized management' },
  { word: 'STEWARDSHIP', clue: 'Faithful management' },
  { word: 'GOVERNANCE', clue: 'Wise leadership' },
  { word: 'MANAGEMENT', clue: 'Effective control' },
  { word: 'ORGANIZATION', clue: 'Structured order' },
  { word: 'COORDINATION', clue: 'Harmonious arrangement' },
  { word: 'SUPERVISION', clue: 'Oversight guidance' }
]);

const level17Data = createWordSearchGrid(10, [
  { word: 'COMPASSION', clue: 'Deep sympathy' },
  { word: 'MERCY', clue: 'Loving kindness' },
  { word: 'TENDERNESS', clue: 'Gentle care' },
  { word: 'GENTLENESS', clue: 'Mild strength' },
  { word: 'KINDNESS', clue: 'Friendly nature' },
  { word: 'GOODNESS', clue: 'Moral excellence' }
]);

const level18Data = createWordSearchGrid(12, [
  { word: 'PERSEVERANCE', clue: 'Persistent endurance' },
  { word: 'ENDURANCE', clue: 'Lasting strength' },
  { word: 'PERSISTENCE', clue: 'Continued effort' },
  { word: 'DETERMINATION', clue: 'Firm resolve' },
  { word: 'RESILIENCE', clue: 'Bouncing back' },
  { word: 'FORTITUDE', clue: 'Mental strength' }
]);

const level19Data = createWordSearchGrid(14, [
  { word: 'INSPIRATION', clue: 'Divine motivation' },
  { word: 'MOTIVATION', clue: 'Inner drive' },
  { word: 'ENCOURAGEMENT', clue: 'Uplifting support' },
  { word: 'EMPOWERMENT', clue: 'Giving power' },
  { word: 'ENABLEMENT', clue: 'Making able' },
  { word: 'STRENGTHENING', clue: 'Building power' },
  { word: 'REINFORCEMENT', clue: 'Adding support' }
]);

const level20Data = createWordSearchGrid(16, [
  { word: 'TRANSFORMATION', clue: 'Complete change' },
  { word: 'METAMORPHOSIS', clue: 'Total transformation' },
  { word: 'TRANSFIGURATION', clue: 'Divine change' },
  { word: 'CONVERSION', clue: 'Turning around' },
  { word: 'REFORMATION', clue: 'Corrective change' },
  { word: 'REVOLUTION', clue: 'Radical change' },
  { word: 'EVOLUTION', clue: 'Gradual development' }
]);

const level21Data = createWordSearchGrid(18, [
  { word: 'ESTABLISHMENT', clue: 'Firm foundation' },
  { word: 'FOUNDATION', clue: 'Basic structure' },
  { word: 'CONSTRUCTION', clue: 'Building process' },
  { word: 'DEVELOPMENT', clue: 'Growth process' },
  { word: 'ADVANCEMENT', clue: 'Moving forward' },
  { word: 'PROGRESSION', clue: 'Forward movement' },
  { word: 'IMPROVEMENT', clue: 'Making better' },
  { word: 'ENHANCEMENT', clue: 'Adding value' }
]);

const level22Data = createWordSearchGrid(12, [
  { word: 'CELEBRATION', clue: 'Joyful observance' },
  { word: 'JUBILATION', clue: 'Great rejoicing' },
  { word: 'REJOICING', clue: 'Expressing joy' },
  { word: 'THANKSGIVING', clue: 'Grateful praise' },
  { word: 'GRATITUDE', clue: 'Thankful heart' },
  { word: 'APPRECIATION', clue: 'Recognizing value' }
]);

const level23Data = createWordSearchGrid(14, [
  { word: 'MANIFESTATION', clue: 'Visible display' },
  { word: 'DEMONSTRATION', clue: 'Clear showing' },
  { word: 'EXHIBITION', clue: 'Public display' },
  { word: 'PRESENTATION', clue: 'Formal showing' },
  { word: 'REVELATION', clue: 'Divine unveiling' },
  { word: 'DISCLOSURE', clue: 'Making known' },
  { word: 'EXPRESSION', clue: 'Outward showing' }
]);

const level24Data = createWordSearchGrid(16, [
  { word: 'ESTABLISHMENT', clue: 'Setting up firmly' },
  { word: 'CONSOLIDATION', clue: 'Strengthening unity' },
  { word: 'STABILIZATION', clue: 'Making steady' },
  { word: 'FORTIFICATION', clue: 'Building strength' },
  { word: 'REINFORCEMENT', clue: 'Adding support' },
  { word: 'STRENGTHENING', clue: 'Increasing power' },
  { word: 'EMPOWERMENT', clue: 'Giving authority' }
]);

const level25Data = createWordSearchGrid(20, [
  { word: 'TRANSFORMATION', clue: 'Complete change' },
  { word: 'MANIFESTATION', clue: 'Divine display' },
  { word: 'DEMONSTRATION', clue: 'Powerful showing' },
  { word: 'ESTABLISHMENT', clue: 'Firm foundation' },
  { word: 'MULTIPLICATION', clue: 'Divine increase' },
  { word: 'ADMINISTRATION', clue: 'Wise management' },
  { word: 'SUPERNATURAL', clue: 'Beyond natural' },
  { word: 'RIGHTEOUSNESS', clue: 'Right standing' },
  { word: 'SANCTIFICATION', clue: 'Set apart' },
  { word: 'GLORIFICATION', clue: 'Final perfection' }
]);

export const wordSearchLevels: WordSearchLevel[] = [
  {
    id: 1,
    title: "Faith Foundations",
    gridSize: 8,
    difficulty: 'Easy',
    description: "Find words about faith and trust in God",
    unlocked: true,
    words: level1Data.placedWords,
    grid: level1Data.grid
  },
  {
    id: 2,
    title: "Divine Healing",
    gridSize: 10,
    difficulty: 'Easy',
    description: "Discover words about God's healing power",
    unlocked: false,
    words: level2Data.placedWords,
    grid: level2Data.grid
  },
  {
    id: 3,
    title: "Holy Spirit Power",
    gridSize: 12,
    difficulty: 'Easy',
    description: "Find words about the Spirit's work",
    unlocked: false,
    words: level3Data.placedWords,
    grid: level3Data.grid
  },
  {
    id: 4,
    title: "Prosperity Principles",
    gridSize: 14,
    difficulty: 'Easy',
    description: "Search for biblical prosperity words",
    unlocked: false,
    words: level4Data.placedWords,
    grid: level4Data.grid
  },
  {
    id: 5,
    title: "Christian Character",
    gridSize: 16,
    difficulty: 'Easy',
    description: "Look for godly character traits",
    unlocked: false,
    words: level5Data.placedWords,
    grid: level5Data.grid
  },
  {
    id: 6,
    title: "Ministry & Service",
    gridSize: 18,
    difficulty: 'Medium',
    description: "Find words about serving God",
    unlocked: false,
    words: level6Data.placedWords,
    grid: level6Data.grid
  },
  {
    id: 7,
    title: "Truth & Light",
    gridSize: 10,
    difficulty: 'Medium',
    description: "Seek words about God's truth",
    unlocked: false,
    words: level7Data.placedWords,
    grid: level7Data.grid
  },
  {
    id: 8,
    title: "Divine Communion",
    gridSize: 12,
    difficulty: 'Medium',
    description: "Find words about fellowship with God",
    unlocked: false,
    words: level8Data.placedWords,
    grid: level8Data.grid
  },
  {
    id: 9,
    title: "Kingdom Authority",
    gridSize: 14,
    difficulty: 'Medium',
    description: "Search for words about God's kingdom",
    unlocked: false,
    words: level9Data.placedWords,
    grid: level9Data.grid
  },
  {
    id: 10,
    title: "Supernatural Breakthrough",
    gridSize: 16,
    difficulty: 'Medium',
    description: "Find miraculous words",
    unlocked: false,
    words: level10Data.placedWords,
    grid: level10Data.grid
  },
  {
    id: 11,
    title: "Excellence & Honor",
    gridSize: 8,
    difficulty: 'Medium',
    description: "Discover words about excellence",
    unlocked: false,
    words: level11Data.placedWords,
    grid: level11Data.grid
  },
  {
    id: 12,
    title: "Faithful Commitment",
    gridSize: 10,
    difficulty: 'Medium',
    description: "Find words about faithfulness",
    unlocked: false,
    words: level12Data.placedWords,
    grid: level12Data.grid
  },
  {
    id: 13,
    title: "Divine Abundance",
    gridSize: 12,
    difficulty: 'Medium',
    description: "Search for abundance words",
    unlocked: false,
    words: level13Data.placedWords,
    grid: level13Data.grid
  },
  {
    id: 14,
    title: "Righteous Standing",
    gridSize: 14,
    difficulty: 'Hard',
    description: "Find righteousness words",
    unlocked: false,
    words: level14Data.placedWords,
    grid: level14Data.grid
  },
  {
    id: 15,
    title: "Unity & Partnership",
    gridSize: 16,
    difficulty: 'Hard',
    description: "Discover unity words",
    unlocked: false,
    words: level15Data.placedWords,
    grid: level15Data.grid
  },
  {
    id: 16,
    title: "Wise Administration",
    gridSize: 18,
    difficulty: 'Hard',
    description: "Find management words",
    unlocked: false,
    words: level16Data.placedWords,
    grid: level16Data.grid
  },
  {
    id: 17,
    title: "Loving Compassion",
    gridSize: 10,
    difficulty: 'Hard',
    description: "Search for compassion words",
    unlocked: false,
    words: level17Data.placedWords,
    grid: level17Data.grid
  },
  {
    id: 18,
    title: "Enduring Perseverance",
    gridSize: 12,
    difficulty: 'Hard',
    description: "Find perseverance words",
    unlocked: false,
    words: level18Data.placedWords,
    grid: level18Data.grid
  },
  {
    id: 19,
    title: "Divine Inspiration",
    gridSize: 14,
    difficulty: 'Hard',
    description: "Discover inspiration words",
    unlocked: false,
    words: level19Data.placedWords,
    grid: level19Data.grid
  },
  {
    id: 20,
    title: "Total Transformation",
    gridSize: 16,
    difficulty: 'Hard',
    description: "Find transformation words",
    unlocked: false,
    words: level20Data.placedWords,
    grid: level20Data.grid
  },
  {
    id: 21,
    title: "Firm Establishment",
    gridSize: 18,
    difficulty: 'Hard',
    description: "Search for foundation words",
    unlocked: false,
    words: level21Data.placedWords,
    grid: level21Data.grid
  },
  {
    id: 22,
    title: "Joyful Celebration",
    gridSize: 12,
    difficulty: 'Hard',
    description: "Find celebration words",
    unlocked: false,
    words: level22Data.placedWords,
    grid: level22Data.grid
  },
  {
    id: 23,
    title: "Divine Manifestation",
    gridSize: 14,
    difficulty: 'Hard',
    description: "Discover manifestation words",
    unlocked: false,
    words: level23Data.placedWords,
    grid: level23Data.grid
  },
  {
    id: 24,
    title: "Strengthened Consolidation",
    gridSize: 16,
    difficulty: 'Hard',
    description: "Find strengthening words",
    unlocked: false,
    words: level24Data.placedWords,
    grid: level24Data.grid
  },
  {
    id: 25,
    title: "Ultimate Glorification",
    gridSize: 20,
    difficulty: 'Hard',
    description: "Master level - find all divine words",
    unlocked: false,
    words: level25Data.placedWords,
    grid: level25Data.grid
  }
];

export const getCrosswordLevelById = (id: number): WordSearchLevel | undefined => {
  return wordSearchLevels.find(level => level.id === id);
};

export const unlockNextCrosswordLevel = (currentLevelId: number): void => {
  const nextLevel = wordSearchLevels.find(level => level.id === currentLevelId + 1);
  if (nextLevel) {
    nextLevel.unlocked = true;
  }
};

export const resetAllCrosswordLevels = (): void => {
  wordSearchLevels.forEach(level => {
    level.unlocked = level.id === 1;
  });
};

export const loadUnlockedCrosswordLevels = (completedLevels: Set<number>): void => {
  wordSearchLevels.forEach(level => {
    if (level.id === 1) {
      level.unlocked = true; // First level is always unlocked
    } else {
      // Unlock level if previous level is completed
      level.unlocked = completedLevels.has(level.id - 1);
    }
  });
};

// For backward compatibility, export as crosswordLevels too
export const crosswordLevels = wordSearchLevels;