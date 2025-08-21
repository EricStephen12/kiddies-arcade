// Universal shared data file for all songs, lyrics, and game data

export interface SongData {
  title: string;
  artist: string;
  audioUrl: string;
  duration: number;
  lyrics: string[];
  lyricTimings: number[];
  wordTimings?: number[][];
  level: number;
}

export interface LevelData {
  level: number;
  song: SongData;
  difficulty: 'easy' | 'medium' | 'hard';
  tileSpeed: number;
  spawnRate: number;
}

// Centralized song database with all data
export const songDatabase: Record<number, SongData> = {
  1: {
    level: 1,
    title: "Lord Your Name is Glorious",
    artist: "Worship Song",
    audioUrl: "/songs/level1-song.mp3",
    duration: 45,
    lyrics: [
      "All authority, supremacy",
      "Is bestowed on Your name, oh Lord",
      "For there is no greater power",
      "Than Your matchless name, Lord Jesus"
    ],
    lyricTimings: [3.0, 6.0, 9.0, 12.0],
    wordTimings: [
      [3.0, 3.5, 4.0],
      [6.0, 6.5, 7.0, 7.5, 8.0, 8.5],
      [9.0, 9.5, 10.0, 10.5, 11.0],
      [12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0]
    ]
  }
  // Add more songs as needed for levels 2-25
};

// Enhanced level goals with collectible items
export interface CollectibleItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  count: number;
  found: number;
}

export interface LevelGoals {
  requiredStars: number;
  requiredScore: number;
  maxMisses: number;
  specialChallenge?: string;
  reward: string;
  unlockMessage: string;
  collectibles: CollectibleItem[];
  winCondition: 'complete-song' | 'collect-items' | 'score-goal';
  obstacles?: string[];
  powerUps?: string[];
  specialMechanics?: string[];
}

// Theme definitions for every 5 levels
export interface ThemeData {
  name: string;
  description: string;
  backgroundColor: string;
  tileColors: string[];
  specialElements: string[];
  themeEmojis: string[];
  ambientSounds?: string[];
}

export const themes: Record<number, ThemeData> = {
  1: { // Levels 1-5: Enchanted Forest
    name: "Enchanted Forest",
    description: "Magical woodland adventure",
    backgroundColor: "from-green-200 via-emerald-200 to-lime-200",
    tileColors: ["from-green-400 to-green-600", "from-emerald-400 to-emerald-600", "from-lime-400 to-lime-600"],
    specialElements: ["🌲", "🍄", "🦋", "🌸", "🐿️"],
    themeEmojis: ["🌟", "🍃", "🌺", "🦋", "🐝"],
    ambientSounds: ["forest-birds.mp3", "wind-leaves.mp3"]
  },
  2: { // Levels 6-10: Ocean Depths
    name: "Ocean Depths",
    description: "Underwater treasure hunt",
    backgroundColor: "from-blue-200 via-cyan-200 to-teal-200",
    tileColors: ["from-blue-400 to-blue-600", "from-cyan-400 to-cyan-600", "from-teal-400 to-teal-600"],
    specialElements: ["🐠", "🐙", "🦈", "🐚", "🪸"],
    themeEmojis: ["🌊", "💎", "🐠", "🦀", "🐚"],
    ambientSounds: ["ocean-waves.mp3", "underwater-bubbles.mp3"]
  },
  3: { // Levels 11-15: Desert Oasis
    name: "Desert Oasis",
    description: "Sandy dunes and hidden treasures",
    backgroundColor: "from-yellow-200 via-orange-200 to-red-200",
    tileColors: ["from-yellow-400 to-yellow-600", "from-orange-400 to-orange-600", "from-red-400 to-red-600"],
    specialElements: ["🌵", "🐪", "🦂", "🏺", "💎"],
    themeEmojis: ["☀️", "🏺", "💰", "🐪", "🌵"],
    ambientSounds: ["desert-wind.mp3", "camel-bells.mp3"]
  },
  4: { // Levels 16-20: Space Galaxy
    name: "Space Galaxy",
    description: "Cosmic adventure among the stars",
    backgroundColor: "from-purple-200 via-indigo-200 to-black",
    tileColors: ["from-purple-400 to-purple-600", "from-indigo-400 to-indigo-600", "from-pink-400 to-pink-600"],
    specialElements: ["🚀", "👽", "🛸", "☄️", "🪐"],
    themeEmojis: ["⭐", "🌌", "🚀", "🛸", "👽"],
    ambientSounds: ["space-ambient.mp3", "rocket-engines.mp3"]
  },
  5: { // Levels 21-25: Crystal Caves
    name: "Crystal Caves",
    description: "Underground crystal mining adventure",
    backgroundColor: "from-gray-200 via-slate-200 to-stone-200",
    tileColors: ["from-purple-400 to-purple-600", "from-blue-400 to-blue-600", "from-pink-400 to-pink-600"],
    specialElements: ["💎", "⛏️", "🪨", "💍", "🔮"],
    themeEmojis: ["💎", "⛏️", "🪨", "💍", "✨"],
    ambientSounds: ["cave-drips.mp3", "crystal-chimes.mp3"]
  }
};

// Helper function to get theme for any level
export const getThemeForLevel = (level: number): ThemeData => {
  const themeNumber = Math.ceil(level / 5);
  return themes[themeNumber] || themes[1];
};

export const levelGoals: Record<number, LevelGoals> = {
  // 🌲 ENCHANTED FOREST THEME (Levels 1-5)
  1: {
    requiredStars: 1,
    requiredScore: 50,
    maxMisses: 3,
    specialChallenge: "Welcome to the forest! Collect 3 golden stars 🌟",
    reward: "Unlock Level 2",
    unlockMessage: "Great start! The forest welcomes you!",
    collectibles: [
      { id: 'golden-star', name: 'Golden Stars', emoji: '🌟', description: 'Magical golden stars', count: 3, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: [],
    powerUps: ['slow-motion'],
    specialMechanics: ['tutorial-mode']
  },
  2: {
    requiredStars: 2,
    requiredScore: 75,
    maxMisses: 2,
    specialChallenge: "Help the butterflies! Collect 4 butterflies and 2 flowers 🦋🌺",
    reward: "Unlock Level 3",
    unlockMessage: "The butterflies dance with joy!",
    collectibles: [
      { id: 'butterfly', name: 'Butterflies', emoji: '🦋', description: 'Beautiful forest butterflies', count: 4, found: 0 },
      { id: 'flower', name: 'Flowers', emoji: '🌺', description: 'Magical forest flowers', count: 2, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['falling-leaves'],
    powerUps: ['slow-motion', 'double-jump'],
    specialMechanics: ['butterfly-swarm']
  },
  3: {
    requiredStars: 2,
    requiredScore: 100,
    maxMisses: 2,
    specialChallenge: "Feed the squirrels! Collect 5 acorns while avoiding thorns 🐿️🌰",
    reward: "Unlock Level 4",
    unlockMessage: "The squirrels are happy and full!",
    collectibles: [
      { id: 'acorn', name: 'Acorns', emoji: '🌰', description: 'Nuts for forest friends', count: 5, found: 0 },
      { id: 'squirrel', name: 'Squirrels', emoji: '🐿️', description: 'Friendly forest squirrels', count: 2, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['thorny-vines', 'falling-branches'],
    powerUps: ['slow-motion', 'shield', 'acorn-magnet'],
    specialMechanics: ['squirrel-helpers']
  },
  4: {
    requiredStars: 3,
    requiredScore: 150,
    maxMisses: 1,
    specialChallenge: "Mushroom hunt! Find 3 magic mushrooms in the dark forest 🍄✨",
    reward: "Unlock Level 5",
    unlockMessage: "The magic mushrooms glow with power!",
    collectibles: [
      { id: 'magic-mushroom', name: 'Magic Mushrooms', emoji: '🍄', description: 'Glowing forest mushrooms', count: 3, found: 0 },
      { id: 'firefly', name: 'Fireflies', emoji: '🐝', description: 'Glowing forest lights', count: 6, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['dark-shadows', 'poison-ivy'],
    powerUps: ['glow-light', 'mushroom-boost', 'firefly-guide'],
    specialMechanics: ['dark-forest-mode']
  },
  5: {
    requiredStars: 3,
    requiredScore: 200,
    maxMisses: 0,
    specialChallenge: "Forest Guardian Boss! Perfect run to awaken the Ancient Tree 🌲👑",
    reward: "Unlock Ocean Theme",
    unlockMessage: "The Ancient Tree awakens! You're now a Forest Guardian!",
    collectibles: [
      { id: 'tree-crown', name: 'Tree Crowns', emoji: '👑', description: 'Crown of the Forest Guardian', count: 1, found: 0 },
      { id: 'ancient-leaf', name: 'Ancient Leaves', emoji: '🍃', description: 'Leaves of the Ancient Tree', count: 7, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['guardian-vines', 'wind-storms', 'root-traps'],
    powerUps: ['forest-blessing', 'nature-shield', 'tree-power'],
    specialMechanics: ['boss-battle', 'perfect-run-required', 'ancient-tree-mode']
  },

  // 🌊 OCEAN DEPTHS THEME (Levels 6-10)
  6: {
    requiredStars: 2,
    requiredScore: 100,
    maxMisses: 2,
    specialChallenge: "Dive deep! Collect 4 pearls from the ocean floor 🦪💎",
    reward: "Unlock Level 7",
    unlockMessage: "Welcome to the ocean depths!",
    collectibles: [
      { id: 'pearl', name: 'Pearls', emoji: '💎', description: 'Precious ocean pearls', count: 4, found: 0 },
      { id: 'seashell', name: 'Seashells', emoji: '🐚', description: 'Beautiful ocean shells', count: 3, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['sea-urchins'],
    powerUps: ['bubble-shield', 'pearl-magnet'],
    specialMechanics: ['underwater-physics']
  },
  7: {
    requiredStars: 2,
    requiredScore: 150,
    maxMisses: 2,
    specialChallenge: "Swimming with fish! Collect 6 tropical fish 🐠🌊",
    reward: "Unlock Level 8",
    unlockMessage: "The fish school follows you!",
    collectibles: [
      { id: 'tropical-fish', name: 'Tropical Fish', emoji: '🐠', description: 'Colorful ocean fish', count: 6, found: 0 },
      { id: 'coral', name: 'Coral Pieces', emoji: '🪸', description: 'Living coral reef', count: 4, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['jellyfish', 'strong-currents'],
    powerUps: ['fish-friend', 'current-rider', 'coral-boost'],
    specialMechanics: ['fish-school-bonus']
  },
  8: {
    requiredStars: 3,
    requiredScore: 200,
    maxMisses: 1,
    specialChallenge: "Treasure hunt! Find the sunken pirate treasure 💰⚓",
    reward: "Unlock Level 9",
    unlockMessage: "Ahoy! You found the pirate's treasure!",
    collectibles: [
      { id: 'gold-coin', name: 'Gold Coins', emoji: '💰', description: 'Pirate treasure coins', count: 8, found: 0 },
      { id: 'anchor', name: 'Anchors', emoji: '⚓', description: 'Sunken ship anchors', count: 2, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['sharks', 'whirlpools', 'ghost-pirates'],
    powerUps: ['treasure-map', 'shark-repel', 'pirate-luck'],
    specialMechanics: ['treasure-hunt-mode']
  },
  9: {
    requiredStars: 3,
    requiredScore: 250,
    maxMisses: 1,
    specialChallenge: "Octopus garden! Help the octopus collect 5 sea stars ⭐🐙",
    reward: "Unlock Level 10",
    unlockMessage: "The octopus dances in gratitude!",
    collectibles: [
      { id: 'sea-star', name: 'Sea Stars', emoji: '⭐', description: 'Magical sea stars', count: 5, found: 0 },
      { id: 'octopus', name: 'Octopus Friends', emoji: '🐙', description: 'Friendly octopi', count: 3, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['electric-eels', 'sea-storms', 'giant-waves'],
    powerUps: ['octopus-arms', 'electric-resist', 'wave-rider'],
    specialMechanics: ['octopus-garden-mode']
  },
  10: {
    requiredStars: 3,
    requiredScore: 300,
    maxMisses: 0,
    specialChallenge: "Ocean King Boss! Perfect run to claim the Trident of the Seas 🔱👑",
    reward: "Unlock Desert Theme",
    unlockMessage: "Hail the Ocean King! The seas bow to your command!",
    collectibles: [
      { id: 'trident', name: 'Trident', emoji: '🔱', description: 'Trident of the Ocean King', count: 1, found: 0 },
      { id: 'sea-crown', name: 'Sea Crown', emoji: '👑', description: 'Crown of Ocean Royalty', count: 1, found: 0 },
      { id: 'wave-crystal', name: 'Wave Crystals', emoji: '💎', description: 'Crystals of ocean power', count: 9, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['sea-monsters', 'tsunami-waves', 'whirlpool-vortex'],
    powerUps: ['ocean-blessing', 'tsunami-control', 'sea-monster-ally'],
    specialMechanics: ['boss-battle', 'perfect-run-required', 'ocean-king-mode']
  },

  // 🏜️ DESERT OASIS THEME (Levels 11-15)
  11: {
    requiredStars: 2,
    requiredScore: 125,
    maxMisses: 2,
    specialChallenge: "Desert survival! Find 4 water bottles in the scorching heat 🏺💧",
    reward: "Unlock Level 12",
    unlockMessage: "The desert heat cannot stop you!",
    collectibles: [
      { id: 'water-bottle', name: 'Water Bottles', emoji: '🏺', description: 'Life-saving desert water', count: 4, found: 0 },
      { id: 'cactus-flower', name: 'Cactus Flowers', emoji: '🌵', description: 'Rare desert blooms', count: 3, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['sandstorms', 'scorching-heat'],
    powerUps: ['desert-cloak', 'water-finder'],
    specialMechanics: ['desert-heat-mode']
  },
  12: {
    requiredStars: 2,
    requiredScore: 175,
    maxMisses: 2,
    specialChallenge: "Camel caravan! Help 3 camels find 6 dates 🐪🌴",
    reward: "Unlock Level 13",
    unlockMessage: "The caravan thanks you for your kindness!",
    collectibles: [
      { id: 'date-fruit', name: 'Dates', emoji: '🌴', description: 'Sweet desert dates', count: 6, found: 0 },
      { id: 'camel', name: 'Camels', emoji: '🐪', description: 'Desert caravan camels', count: 3, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['mirages', 'sand-dunes', 'desert-winds'],
    powerUps: ['camel-ride', 'oasis-vision', 'date-energy'],
    specialMechanics: ['camel-caravan-mode']
  },
  13: {
    requiredStars: 3,
    requiredScore: 225,
    maxMisses: 1,
    specialChallenge: "Pyramid secrets! Collect 5 golden scarabs from ancient tombs 🪲👑",
    reward: "Unlock Level 14",
    unlockMessage: "The pharaoh's secrets are revealed!",
    collectibles: [
      { id: 'golden-scarab', name: 'Golden Scarabs', emoji: '🪲', description: 'Sacred pharaoh beetles', count: 5, found: 0 },
      { id: 'hieroglyph', name: 'Hieroglyphs', emoji: '📜', description: 'Ancient desert writings', count: 4, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['mummy-guards', 'tomb-traps', 'cursed-sand'],
    powerUps: ['pharaoh-blessing', 'tomb-light', 'scarab-guide'],
    specialMechanics: ['pyramid-exploration']
  },
  14: {
    requiredStars: 3,
    requiredScore: 275,
    maxMisses: 1,
    specialChallenge: "Genie's wish! Find the magic lamp and 3 wish gems 🪔💎",
    reward: "Unlock Level 15",
    unlockMessage: "Your wishes have been granted!",
    collectibles: [
      { id: 'magic-lamp', name: 'Magic Lamp', emoji: '🪔', description: 'Genie\'s magical lamp', count: 1, found: 0 },
      { id: 'wish-gem', name: 'Wish Gems', emoji: '💎', description: 'Gems that grant wishes', count: 3, found: 0 },
      { id: 'genie-smoke', name: 'Genie Smoke', emoji: '💨', description: 'Magical genie essence', count: 7, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['djinn-spirits', 'magic-storms', 'wish-thieves'],
    powerUps: ['genie-power', 'wish-multiplier', 'magic-protection'],
    specialMechanics: ['genie-wishes-mode']
  },
  15: {
    requiredStars: 3,
    requiredScore: 350,
    maxMisses: 0,
    specialChallenge: "Desert Sultan Boss! Perfect run to claim the Crown of Sands 👑🏜️",
    reward: "Unlock Space Theme",
    unlockMessage: "All hail the Desert Sultan! The sands bow to your rule!",
    collectibles: [
      { id: 'sand-crown', name: 'Crown of Sands', emoji: '👑', description: 'Crown of the Desert Sultan', count: 1, found: 0 },
      { id: 'desert-scepter', name: 'Desert Scepter', emoji: '🏺', description: 'Scepter of desert power', count: 1, found: 0 },
      { id: 'sun-crystal', name: 'Sun Crystals', emoji: '☀️', description: 'Crystals of desert sun', count: 10, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['sand-titans', 'solar-flares', 'desert-storms'],
    powerUps: ['sultan-blessing', 'sun-control', 'sand-mastery'],
    specialMechanics: ['boss-battle', 'perfect-run-required', 'desert-sultan-mode']
  },

  // 🚀 SPACE GALAXY THEME (Levels 16-20)
  16: {
    requiredStars: 2,
    requiredScore: 150,
    maxMisses: 2,
    specialChallenge: "Space cadet! Collect 5 fuel cells to power your rocket 🚀⚡",
    reward: "Unlock Level 17",
    unlockMessage: "Houston, we have liftoff!",
    collectibles: [
      { id: 'fuel-cell', name: 'Fuel Cells', emoji: '⚡', description: 'Rocket fuel energy', count: 5, found: 0 },
      { id: 'space-helmet', name: 'Space Helmets', emoji: '👨‍🚀', description: 'Astronaut gear', count: 2, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['asteroids', 'space-debris'],
    powerUps: ['rocket-boost', 'gravity-control'],
    specialMechanics: ['zero-gravity-physics']
  },
  17: {
    requiredStars: 2,
    requiredScore: 200,
    maxMisses: 2,
    specialChallenge: "Alien encounter! Make friends with 4 aliens and collect 6 star maps 👽⭐",
    reward: "Unlock Level 18",
    unlockMessage: "The aliens welcome you to their galaxy!",
    collectibles: [
      { id: 'alien-friend', name: 'Alien Friends', emoji: '👽', description: 'Friendly space beings', count: 4, found: 0 },
      { id: 'star-map', name: 'Star Maps', emoji: '🗺️', description: 'Galactic navigation charts', count: 6, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['meteor-showers', 'alien-lasers', 'space-pirates'],
    powerUps: ['alien-tech', 'star-navigation', 'peace-treaty'],
    specialMechanics: ['alien-diplomacy-mode']
  },
  18: {
    requiredStars: 3,
    requiredScore: 275,
    maxMisses: 1,
    specialChallenge: "Planet hopping! Visit 3 planets and collect their unique crystals 🪐💎",
    reward: "Unlock Level 19",
    unlockMessage: "You're now a certified space explorer!",
    collectibles: [
      { id: 'mars-crystal', name: 'Mars Crystals', emoji: '🔴', description: 'Red planet crystals', count: 3, found: 0 },
      { id: 'jupiter-crystal', name: 'Jupiter Crystals', emoji: '🟠', description: 'Gas giant crystals', count: 2, found: 0 },
      { id: 'saturn-crystal', name: 'Saturn Crystals', emoji: '🪐', description: 'Ring planet crystals', count: 4, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['gravity-wells', 'cosmic-storms', 'planet-defense'],
    powerUps: ['planet-jumper', 'cosmic-shield', 'crystal-detector'],
    specialMechanics: ['planet-hopping-mode']
  },
  19: {
    requiredStars: 3,
    requiredScore: 325,
    maxMisses: 1,
    specialChallenge: "Black hole adventure! Collect 8 dark matter orbs near the event horizon ⚫🌌",
    reward: "Unlock Level 20",
    unlockMessage: "You survived the black hole! Space-time bends to your will!",
    collectibles: [
      { id: 'dark-matter', name: 'Dark Matter Orbs', emoji: '⚫', description: 'Mysterious space matter', count: 8, found: 0 },
      { id: 'time-crystal', name: 'Time Crystals', emoji: '⏰', description: 'Crystals that bend time', count: 3, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['black-hole-pull', 'time-distortion', 'gravity-waves'],
    powerUps: ['time-control', 'gravity-resist', 'dark-matter-boost'],
    specialMechanics: ['black-hole-physics']
  },
  20: {
    requiredStars: 3,
    requiredScore: 400,
    maxMisses: 0,
    specialChallenge: "Galactic Emperor Boss! Perfect run to claim the Crown of Stars ⭐👑",
    reward: "Unlock Crystal Theme",
    unlockMessage: "Long live the Galactic Emperor! The universe is yours!",
    collectibles: [
      { id: 'star-crown', name: 'Crown of Stars', emoji: '👑', description: 'Crown of the Galactic Emperor', count: 1, found: 0 },
      { id: 'cosmic-scepter', name: 'Cosmic Scepter', emoji: '🌟', description: 'Scepter of cosmic power', count: 1, found: 0 },
      { id: 'galaxy-crystal', name: 'Galaxy Crystals', emoji: '🌌', description: 'Crystals of galactic energy', count: 12, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['cosmic-dragons', 'supernova-blasts', 'galactic-storms'],
    powerUps: ['emperor-blessing', 'cosmic-control', 'galaxy-mastery'],
    specialMechanics: ['boss-battle', 'perfect-run-required', 'galactic-emperor-mode']
  },

  // 💎 CRYSTAL CAVES THEME (Levels 21-25)
  21: {
    requiredStars: 2,
    requiredScore: 175,
    maxMisses: 2,
    specialChallenge: "Crystal miner! Collect 6 precious gems from the cave walls 💎⛏️",
    reward: "Unlock Level 22",
    unlockMessage: "The crystals sing with your touch!",
    collectibles: [
      { id: 'ruby', name: 'Rubies', emoji: '🔴', description: 'Red precious gems', count: 2, found: 0 },
      { id: 'sapphire', name: 'Sapphires', emoji: '🔵', description: 'Blue precious gems', count: 2, found: 0 },
      { id: 'emerald', name: 'Emeralds', emoji: '🟢', description: 'Green precious gems', count: 2, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['cave-ins', 'crystal-spikes'],
    powerUps: ['gem-detector', 'crystal-shield'],
    specialMechanics: ['crystal-resonance']
  },
  22: {
    requiredStars: 2,
    requiredScore: 225,
    maxMisses: 2,
    specialChallenge: "Underground river! Follow 4 crystal fish through 5 water pools 🐟💎",
    reward: "Unlock Level 23",
    unlockMessage: "The crystal fish guide you deeper!",
    collectibles: [
      { id: 'crystal-fish', name: 'Crystal Fish', emoji: '🐟', description: 'Magical crystalline fish', count: 4, found: 0 },
      { id: 'water-crystal', name: 'Water Crystals', emoji: '💧', description: 'Crystals formed by water', count: 5, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['underground-rapids', 'crystal-barriers', 'cave-floods'],
    powerUps: ['water-walk', 'fish-friend', 'crystal-breath'],
    specialMechanics: ['underground-river-mode']
  },
  23: {
    requiredStars: 3,
    requiredScore: 300,
    maxMisses: 1,
    specialChallenge: "Crystal guardian! Awaken 3 crystal golems with 9 power stones 🗿💎",
    reward: "Unlock Level 24",
    unlockMessage: "The crystal guardians pledge their loyalty!",
    collectibles: [
      { id: 'crystal-golem', name: 'Crystal Golems', emoji: '🗿', description: 'Ancient crystal guardians', count: 3, found: 0 },
      { id: 'power-stone', name: 'Power Stones', emoji: '💎', description: 'Stones of awakening power', count: 9, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['golem-trials', 'crystal-maze', 'power-surges'],
    powerUps: ['golem-strength', 'crystal-sight', 'power-amplifier'],
    specialMechanics: ['crystal-guardian-mode']
  },
  24: {
    requiredStars: 3,
    requiredScore: 375,
    maxMisses: 1,
    specialChallenge: "Crystal heart! Find the legendary Heart of the Mountain 💖⛰️",
    reward: "Unlock Level 25",
    unlockMessage: "The mountain's heart beats with your courage!",
    collectibles: [
      { id: 'mountain-heart', name: 'Heart of the Mountain', emoji: '💖', description: 'The legendary crystal heart', count: 1, found: 0 },
      { id: 'heart-shard', name: 'Heart Shards', emoji: '💎', description: 'Fragments of the crystal heart', count: 8, found: 0 },
      { id: 'life-crystal', name: 'Life Crystals', emoji: '✨', description: 'Crystals pulsing with life', count: 6, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['heart-guardians', 'crystal-storms', 'mountain-rage'],
    powerUps: ['heart-power', 'life-force', 'mountain-blessing'],
    specialMechanics: ['mountain-heart-mode']
  },
  25: {
    requiredStars: 3,
    requiredScore: 500,
    maxMisses: 0,
    specialChallenge: "Crystal Master Boss! Perfect run to become the Ultimate Crystal Master 👑💎",
    reward: "Master of All Realms",
    unlockMessage: "LEGENDARY! You are the Ultimate Crystal Master! All realms bow to your power!",
    collectibles: [
      { id: 'master-crown', name: 'Master Crown', emoji: '👑', description: 'Crown of the Crystal Master', count: 1, found: 0 },
      { id: 'ultimate-crystal', name: 'Ultimate Crystal', emoji: '🔮', description: 'The most powerful crystal', count: 1, found: 0 },
      { id: 'realm-key', name: 'Realm Keys', emoji: '🗝️', description: 'Keys to all realms', count: 5, found: 0 },
      { id: 'master-gem', name: 'Master Gems', emoji: '💎', description: 'Gems of ultimate mastery', count: 15, found: 0 }
    ],
    winCondition: 'collect-items',
    obstacles: ['crystal-titans', 'realm-storms', 'master-trials'],
    powerUps: ['master-blessing', 'realm-control', 'crystal-mastery', 'ultimate-power'],
    specialMechanics: ['boss-battle', 'perfect-run-required', 'crystal-master-mode', 'final-boss']
  }
};

// Helper functions to access song data
export const getSongData = (level: number): SongData => {
  return songDatabase[level] || songDatabase[1];
};

export const getAllSongs = (): SongData[] => {
  return Object.values(songDatabase);
};

export const getSongCount = (): number => {
  return Object.keys(songDatabase).length;
};

// Export both song data and level data
export const getSongAndLevelData = (level: number) => {
  const song = getSongData(level);
  const goals = levelGoals[level];
  return {
    ...song,
    levelGoals: goals
  };
};
