export interface MemoryCard {
  id: string;
  content: string;
  type: 'text' | 'symbol';
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryLevel {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  unlocked: boolean;
  gridSize: number; // 4x4, 5x5, 6x6
  timeLimit: number; // in seconds
  bestTime?: number;
  bestMoves?: number;
  stars?: number;
  cards: MemoryCard[];
}

// Helper function to create card pairs
const createCardPairs = (pairs: Array<{ content: string; type: 'text' | 'symbol'; category: string }>): MemoryCard[] => {
  const cards: MemoryCard[] = [];
  pairs.forEach((pair, index) => {
    // Create two cards for each pair
    cards.push({
      id: `${index}-1`,
      content: pair.content,
      type: pair.type,
      category: pair.category,
      isFlipped: false,
      isMatched: false
    });
    cards.push({
      id: `${index}-2`,
      content: pair.content,
      type: pair.type,
      category: pair.category,
      isFlipped: false,
      isMatched: false
    });
  });
  return cards;
};

// Helper function to shuffle cards
export const shuffleCards = (cards: MemoryCard[]): MemoryCard[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const memoryLevels: MemoryLevel[] = [
  {
    id: 1,
    title: "Faith & Love",
    difficulty: "Easy",
    description: "Match the words of faith and love from Pastor Chris's teachings",
    unlocked: true,
    gridSize: 4,
    timeLimit: 120,
    cards: createCardPairs([
      { content: "Faith", type: "text", category: "spiritual" },
      { content: "Love", type: "text", category: "spiritual" },
      { content: "Grace", type: "text", category: "spiritual" },
      { content: "Hope", type: "text", category: "spiritual" },
      { content: "Prayer", type: "text", category: "spiritual" },
      { content: "Peace", type: "text", category: "spiritual" },
      { content: "Joy", type: "text", category: "spiritual" },
      { content: "Truth", type: "text", category: "spiritual" }
    ])
  },
  {
    id: 2,
    title: "Bible Stories",
    difficulty: "Easy",
    description: "Match characters from famous Bible stories",
    unlocked: false,
    gridSize: 4,
    timeLimit: 100,
    cards: createCardPairs([
      { content: "David", type: "text", category: "bible" },
      { content: "Goliath", type: "text", category: "bible" },
      { content: "Moses", type: "text", category: "bible" },
      { content: "Noah", type: "text", category: "bible" },
      { content: "Daniel", type: "text", category: "bible" },
      { content: "Lion", type: "text", category: "bible" },
      { content: "Jonah", type: "text", category: "bible" },
      { content: "Whale", type: "text", category: "bible" }
    ])
  },
  {
    id: 3,
    title: "Christian Symbols",
    difficulty: "Easy",
    description: "Match Christian symbols and their meanings",
    unlocked: false,
    gridSize: 4,
    timeLimit: 90,
    cards: createCardPairs([
      { content: "✝️", type: "symbol", category: "symbols" },
      { content: "Cross", type: "text", category: "symbols" },
      { content: "🕊️", type: "symbol", category: "symbols" },
      { content: "Dove", type: "text", category: "symbols" },
      { content: "🕯️", type: "symbol", category: "symbols" },
      { content: "Light", type: "text", category: "symbols" },
      { content: "📖", type: "symbol", category: "symbols" },
      { content: "Bible", type: "text", category: "symbols" }
    ])
  },
  {
    id: 4,
    title: "Pastor Chris Quotes",
    difficulty: "Medium",
    description: "Match inspiring quotes from Pastor Chris Oyakhilome",
    unlocked: false,
    gridSize: 5,
    timeLimit: 150,
    cards: createCardPairs([
      { content: "God's Word", type: "text", category: "quotes" },
      { content: "Transforms", type: "text", category: "quotes" },
      { content: "Your Life", type: "text", category: "quotes" },
      { content: "Through", type: "text", category: "quotes" },
      { content: "Faith", type: "text", category: "quotes" },
      { content: "In Christ", type: "text", category: "quotes" },
      { content: "You Are", type: "text", category: "quotes" },
      { content: "Blessed", type: "text", category: "quotes" },
      { content: "Walk In", type: "text", category: "quotes" },
      { content: "Victory", type: "text", category: "quotes" },
      { content: "God's Love", type: "text", category: "quotes" },
      { content: "Never Fails", type: "text", category: "quotes" },
      { content: "Prayer", type: "text", category: "quotes" },
      { content: "Changes", type: "text", category: "quotes" },
      { content: "Everything", type: "text", category: "quotes" },
      { content: "In Jesus", type: "text", category: "quotes" },
      { content: "Name", type: "text", category: "quotes" }
    ])
  },
  {
    id: 5,
    title: "Fruits of the Spirit",
    difficulty: "Medium",
    description: "Match the fruits of the Holy Spirit",
    unlocked: false,
    gridSize: 5,
    timeLimit: 120,
    cards: createCardPairs([
      { content: "Love", type: "text", category: "fruits" },
      { content: "Joy", type: "text", category: "fruits" },
      { content: "Peace", type: "text", category: "fruits" },
      { content: "Patience", type: "text", category: "fruits" },
      { content: "Kindness", type: "text", category: "fruits" },
      { content: "Goodness", type: "text", category: "fruits" },
      { content: "Faithfulness", type: "text", category: "fruits" },
      { content: "Gentleness", type: "text", category: "fruits" },
      { content: "Self-Control", type: "text", category: "fruits" },
      { content: "Humility", type: "text", category: "fruits" },
      { content: "Forgiveness", type: "text", category: "fruits" },
      { content: "Mercy", type: "text", category: "fruits" },
      { content: "Gratitude", type: "text", category: "fruits" },
      { content: "Compassion", type: "text", category: "fruits" },
      { content: "Wisdom", type: "text", category: "fruits" },
      { content: "Understanding", type: "text", category: "fruits" }
    ])
  },
  {
    id: 6,
    title: "Bible Verses",
    difficulty: "Medium",
    description: "Match Bible verse references with their themes",
    unlocked: false,
    gridSize: 5,
    timeLimit: 140,
    cards: createCardPairs([
      { content: "John 3:16", type: "text", category: "verses" },
      { content: "God's Love", type: "text", category: "verses" },
      { content: "Psalm 23", type: "text", category: "verses" },
      { content: "The Lord", type: "text", category: "verses" },
      { content: "My Shepherd", type: "text", category: "verses" },
      { content: "Philippians 4:13", type: "text", category: "verses" },
      { content: "I Can Do", type: "text", category: "verses" },
      { content: "All Things", type: "text", category: "verses" },
      { content: "Through Christ", type: "text", category: "verses" },
      { content: "Matthew 6:33", type: "text", category: "verses" },
      { content: "Seek First", type: "text", category: "verses" },
      { content: "God's Kingdom", type: "text", category: "verses" },
      { content: "Romans 8:28", type: "text", category: "verses" },
      { content: "All Things", type: "text", category: "verses" },
      { content: "Work Together", type: "text", category: "verses" },
      { content: "For Good", type: "text", category: "verses" }
    ])
  },
  {
    id: 7,
    title: "Christian Values",
    difficulty: "Hard",
    description: "Match Christian values and their meanings",
    unlocked: false,
    gridSize: 6,
    timeLimit: 180,
    cards: createCardPairs([
      { content: "Integrity", type: "text", category: "values" },
      { content: "Honesty", type: "text", category: "values" },
      { content: "Courage", type: "text", category: "values" },
      { content: "Bravery", type: "text", category: "values" },
      { content: "Perseverance", type: "text", category: "values" },
      { content: "Endurance", type: "text", category: "values" },
      { content: "Generosity", type: "text", category: "values" },
      { content: "Giving", type: "text", category: "values" },
      { content: "Humility", type: "text", category: "values" },
      { content: "Modesty", type: "text", category: "values" },
      { content: "Gratitude", type: "text", category: "values" },
      { content: "Thankfulness", type: "text", category: "values" },
      { content: "Compassion", type: "text", category: "values" },
      { content: "Mercy", type: "text", category: "values" },
      { content: "Forgiveness", type: "text", category: "values" },
      { content: "Pardon", type: "text", category: "values" },
      { content: "Wisdom", type: "text", category: "values" },
      { content: "Understanding", type: "text", category: "values" }
    ])
  },
  {
    id: 8,
    title: "Pastor Chris Ministries",
    difficulty: "Hard",
    description: "Match Pastor Chris's ministry activities and teachings",
    unlocked: false,
    gridSize: 6,
    timeLimit: 200,
    cards: createCardPairs([
      { content: "Christ Embassy", type: "text", category: "ministry" },
      { content: "Church", type: "text", category: "ministry" },
      { content: "Rhapsody of Realities", type: "text", category: "ministry" },
      { content: "Devotional", type: "text", category: "ministry" },
      { content: "Healing School", type: "text", category: "ministry" },
      { content: "Miracles", type: "text", category: "ministry" },
      { content: "LoveWorld TV", type: "text", category: "ministry" },
      { content: "Broadcasting", type: "text", category: "ministry" },
      { content: "InnerCity Mission", type: "text", category: "ministry" },
      { content: "Charity", type: "text", category: "ministry" },
      { content: "Pastor Chris Live", type: "text", category: "ministry" },
      { content: "Program", type: "text", category: "ministry" },
      { content: "Word of Faith", type: "text", category: "ministry" },
      { content: "Teaching", type: "text", category: "ministry" },
      { content: "Prayer Conference", type: "text", category: "ministry" },
      { content: "Gathering", type: "text", category: "ministry" },
      { content: "Youth Ministry", type: "text", category: "ministry" },
      { content: "Young People", type: "text", category: "ministry" }
    ])
  },
  {
    id: 9,
    title: "Biblical Places",
    difficulty: "Medium",
    description: "Match biblical locations and their significance",
    unlocked: false,
    gridSize: 5,
    timeLimit: 130,
    cards: createCardPairs([
      { content: "Jerusalem", type: "text", category: "places" },
      { content: "Holy City", type: "text", category: "places" },
      { content: "Bethlehem", type: "text", category: "places" },
      { content: "Birthplace", type: "text", category: "places" },
      { content: "Nazareth", type: "text", category: "places" },
      { content: "Hometown", type: "text", category: "places" },
      { content: "Mount Sinai", type: "text", category: "places" },
      { content: "Commandments", type: "text", category: "places" },
      { content: "Red Sea", type: "text", category: "places" },
      { content: "Crossing", type: "text", category: "places" },
      { content: "Jordan River", type: "text", category: "places" },
      { content: "Baptism", type: "text", category: "places" },
      { content: "Garden of Eden", type: "text", category: "places" },
      { content: "Paradise", type: "text", category: "places" },
      { content: "Mount Ararat", type: "text", category: "places" },
      { content: "Ark", type: "text", category: "places" }
    ])
  },
  {
    id: 10,
    title: "Christian Holidays",
    difficulty: "Easy",
    description: "Match Christian holidays and their meanings",
    unlocked: false,
    gridSize: 4,
    timeLimit: 110,
    cards: createCardPairs([
      { content: "Christmas", type: "text", category: "holidays" },
      { content: "🎄", type: "symbol", category: "holidays" },
      { content: "Easter", type: "text", category: "holidays" },
      { content: "🐰", type: "symbol", category: "holidays" },
      { content: "Good Friday", type: "text", category: "holidays" },
      { content: "✝️", type: "symbol", category: "holidays" },
      { content: "Pentecost", type: "text", category: "holidays" },
      { content: "🔥", type: "symbol", category: "holidays" }
    ])
  },
  {
    id: 11,
    title: "Bible Characters",
    difficulty: "Medium",
    description: "Match Bible characters with their roles",
    unlocked: false,
    gridSize: 5,
    timeLimit: 140,
    cards: createCardPairs([
      { content: "Abraham", type: "text", category: "characters" },
      { content: "Father", type: "text", category: "characters" },
      { content: "Sarah", type: "text", category: "characters" },
      { content: "Mother", type: "text", category: "characters" },
      { content: "Joseph", type: "text", category: "characters" },
      { content: "Dreamer", type: "text", category: "characters" },
      { content: "Ruth", type: "text", category: "characters" },
      { content: "Loyal", type: "text", category: "characters" },
      { content: "Esther", type: "text", category: "characters" },
      { content: "Queen", type: "text", category: "characters" },
      { content: "Peter", type: "text", category: "characters" },
      { content: "Rock", type: "text", category: "characters" },
      { content: "Paul", type: "text", category: "characters" },
      { content: "Apostle", type: "text", category: "characters" },
      { content: "Mary", type: "text", category: "characters" },
      { content: "Virgin", type: "text", category: "characters" }
    ])
  },
  {
    id: 12,
    title: "Christian Music",
    difficulty: "Easy",
    description: "Match Christian music terms and instruments",
    unlocked: false,
    gridSize: 4,
    timeLimit: 100,
    cards: createCardPairs([
      { content: "Hymn", type: "text", category: "music" },
      { content: "🎵", type: "symbol", category: "music" },
      { content: "Praise", type: "text", category: "music" },
      { content: "🙌", type: "symbol", category: "music" },
      { content: "Worship", type: "text", category: "music" },
      { content: "🎤", type: "symbol", category: "music" },
      { content: "Choir", type: "text", category: "music" },
      { content: "👥", type: "symbol", category: "music" }
    ])
  },
  {
    id: 13,
    title: "Pastor Chris Teachings",
    difficulty: "Hard",
    description: "Match Pastor Chris's key teaching concepts",
    unlocked: false,
    gridSize: 6,
    timeLimit: 190,
    cards: createCardPairs([
      { content: "Word of Faith", type: "text", category: "teachings" },
      { content: "Confession", type: "text", category: "teachings" },
      { content: "Divine Health", type: "text", category: "teachings" },
      { content: "Healing", type: "text", category: "teachings" },
      { content: "Prosperity", type: "text", category: "teachings" },
      { content: "Blessing", type: "text", category: "teachings" },
      { content: "Righteousness", type: "text", category: "teachings" },
      { content: "Right Standing", type: "text", category: "teachings" },
      { content: "Grace", type: "text", category: "teachings" },
      { content: "Favor", type: "text", category: "teachings" },
      { content: "Kingdom", type: "text", category: "teachings" },
      { content: "Reign", type: "text", category: "teachings" },
      { content: "Authority", type: "text", category: "teachings" },
      { content: "Power", type: "text", category: "teachings" },
      { content: "Victory", type: "text", category: "teachings" },
      { content: "Triumph", type: "text", category: "teachings" },
      { content: "Glory", type: "text", category: "teachings" },
      { content: "Honor", type: "text", category: "teachings" }
    ])
  },
  {
    id: 14,
    title: "Biblical Animals",
    difficulty: "Easy",
    description: "Match animals mentioned in the Bible",
    unlocked: false,
    gridSize: 4,
    timeLimit: 90,
    cards: createCardPairs([
      { content: "Lion", type: "text", category: "animals" },
      { content: "🦁", type: "symbol", category: "animals" },
      { content: "Dove", type: "text", category: "animals" },
      { content: "🕊️", type: "symbol", category: "animals" },
      { content: "Lamb", type: "text", category: "animals" },
      { content: "🐑", type: "symbol", category: "animals" },
      { content: "Fish", type: "text", category: "animals" },
      { content: "🐟", type: "symbol", category: "animals" }
    ])
  },
  {
    id: 15,
    title: "Christian Virtues",
    difficulty: "Medium",
    description: "Match Christian virtues and their opposites",
    unlocked: false,
    gridSize: 5,
    timeLimit: 150,
    cards: createCardPairs([
      { content: "Love", type: "text", category: "virtues" },
      { content: "Hate", type: "text", category: "virtues" },
      { content: "Peace", type: "text", category: "virtues" },
      { content: "War", type: "text", category: "virtues" },
      { content: "Joy", type: "text", category: "virtues" },
      { content: "Sorrow", type: "text", category: "virtues" },
      { content: "Faith", type: "text", category: "virtues" },
      { content: "Doubt", type: "text", category: "virtues" },
      { content: "Hope", type: "text", category: "virtues" },
      { content: "Despair", type: "text", category: "virtues" },
      { content: "Patience", type: "text", category: "virtues" },
      { content: "Impatience", type: "text", category: "virtues" },
      { content: "Kindness", type: "text", category: "virtues" },
      { content: "Cruelty", type: "text", category: "virtues" },
      { content: "Forgiveness", type: "text", category: "virtues" },
      { content: "Revenge", type: "text", category: "virtues" }
    ])
  },
  {
    id: 16,
    title: "Bible Books",
    difficulty: "Medium",
    description: "Match Bible book names with their categories",
    unlocked: false,
    gridSize: 5,
    timeLimit: 160,
    cards: createCardPairs([
      { content: "Genesis", type: "text", category: "books" },
      { content: "Law", type: "text", category: "books" },
      { content: "Psalms", type: "text", category: "books" },
      { content: "Poetry", type: "text", category: "books" },
      { content: "Matthew", type: "text", category: "books" },
      { content: "Gospel", type: "text", category: "books" },
      { content: "Acts", type: "text", category: "books" },
      { content: "History", type: "text", category: "books" },
      { content: "Romans", type: "text", category: "books" },
      { content: "Epistle", type: "text", category: "books" },
      { content: "Revelation", type: "text", category: "books" },
      { content: "Prophecy", type: "text", category: "books" },
      { content: "Exodus", type: "text", category: "books" },
      { content: "Law", type: "text", category: "books" },
      { content: "Proverbs", type: "text", category: "books" },
      { content: "Wisdom", type: "text", category: "books" }
    ])
  },
  {
    id: 17,
    title: "Christian Symbols Extended",
    difficulty: "Medium",
    description: "Match more Christian symbols and meanings",
    unlocked: false,
    gridSize: 5,
    timeLimit: 140,
    cards: createCardPairs([
      { content: "🕯️", type: "symbol", category: "symbols" },
      { content: "Light", type: "text", category: "symbols" },
      { content: "⛪", type: "symbol", category: "symbols" },
      { content: "Church", type: "text", category: "symbols" },
      { content: "🕊️", type: "symbol", category: "symbols" },
      { content: "Holy Spirit", type: "text", category: "symbols" },
      { content: "📖", type: "symbol", category: "symbols" },
      { content: "Scripture", type: "text", category: "symbols" },
      { content: "✝️", type: "symbol", category: "symbols" },
      { content: "Salvation", type: "text", category: "symbols" },
      { content: "💒", type: "symbol", category: "symbols" },
      { content: "Wedding", type: "text", category: "symbols" },
      { content: "🕯️", type: "symbol", category: "symbols" },
      { content: "Prayer", type: "text", category: "symbols" },
      { content: "⛪", type: "symbol", category: "symbols" },
      { content: "Worship", type: "text", category: "symbols" }
    ])
  },
  {
    id: 18,
    title: "Pastor Chris Ministries Extended",
    difficulty: "Hard",
    description: "Match more ministry activities and programs",
    unlocked: false,
    gridSize: 6,
    timeLimit: 210,
    cards: createCardPairs([
      { content: "Healing Streams", type: "text", category: "ministry" },
      { content: "Live Healing", type: "text", category: "ministry" },
      { content: "Pastor Chris Digital", type: "text", category: "ministry" },
      { content: "Online Ministry", type: "text", category: "ministry" },
      { content: "LoveWorld Radio", type: "text", category: "ministry" },
      { content: "Audio Ministry", type: "text", category: "ministry" },
      { content: "LoveWorld SAT", type: "text", category: "ministry" },
      { content: "Satellite TV", type: "text", category: "ministry" },
      { content: "LoveWorld USA", type: "text", category: "ministry" },
      { content: "American Network", type: "text", category: "ministry" },
      { content: "LoveWorld Networks", type: "text", category: "ministry" },
      { content: "Global Reach", type: "text", category: "ministry" },
      { content: "Pastor Chris Live", type: "text", category: "ministry" },
      { content: "Live Program", type: "text", category: "ministry" },
      { content: "Word of Faith", type: "text", category: "ministry" },
      { content: "Teaching Ministry", type: "text", category: "ministry" },
      { content: "Prayer Conference", type: "text", category: "ministry" },
      { content: "Global Gathering", type: "text", category: "ministry" }
    ])
  },
  {
    id: 19,
    title: "Biblical Numbers",
    difficulty: "Easy",
    description: "Match biblical numbers with their significance",
    unlocked: false,
    gridSize: 4,
    timeLimit: 120,
    cards: createCardPairs([
      { content: "7", type: "text", category: "numbers" },
      { content: "Perfect", type: "text", category: "numbers" },
      { content: "12", type: "text", category: "numbers" },
      { content: "Apostles", type: "text", category: "numbers" },
      { content: "40", type: "text", category: "numbers" },
      { content: "Testing", type: "text", category: "numbers" },
      { content: "3", type: "text", category: "numbers" },
      { content: "Trinity", type: "text", category: "numbers" }
    ])
  },
  {
    id: 20,
    title: "Christian Seasons",
    difficulty: "Medium",
    description: "Match Christian liturgical seasons",
    unlocked: false,
    gridSize: 5,
    timeLimit: 140,
    cards: createCardPairs([
      { content: "Advent", type: "text", category: "seasons" },
      { content: "Waiting", type: "text", category: "seasons" },
      { content: "Christmas", type: "text", category: "seasons" },
      { content: "Birth", type: "text", category: "seasons" },
      { content: "Lent", type: "text", category: "seasons" },
      { content: "Fasting", type: "text", category: "seasons" },
      { content: "Easter", type: "text", category: "seasons" },
      { content: "Resurrection", type: "text", category: "seasons" },
      { content: "Pentecost", type: "text", category: "seasons" },
      { content: "Holy Spirit", type: "text", category: "seasons" },
      { content: "Ordinary Time", type: "text", category: "seasons" },
      { content: "Growth", type: "text", category: "seasons" },
      { content: "Epiphany", type: "text", category: "seasons" },
      { content: "Revelation", type: "text", category: "seasons" },
      { content: "Holy Week", type: "text", category: "seasons" },
      { content: "Passion", type: "text", category: "seasons" }
    ])
  },
  {
    id: 21,
    title: "Bible Miracles",
    difficulty: "Hard",
    description: "Match biblical miracles and their performers",
    unlocked: false,
    gridSize: 6,
    timeLimit: 200,
    cards: createCardPairs([
      { content: "Water to Wine", type: "text", category: "miracles" },
      { content: "Jesus", type: "text", category: "miracles" },
      { content: "Parting Red Sea", type: "text", category: "miracles" },
      { content: "Moses", type: "text", category: "miracles" },
      { content: "Feeding 5000", type: "text", category: "miracles" },
      { content: "Jesus", type: "text", category: "miracles" },
      { content: "Walking on Water", type: "text", category: "miracles" },
      { content: "Jesus", type: "text", category: "miracles" },
      { content: "Raising Lazarus", type: "text", category: "miracles" },
      { content: "Jesus", type: "text", category: "miracles" },
      { content: "Stopping the Sun", type: "text", category: "miracles" },
      { content: "Joshua", type: "text", category: "miracles" },
      { content: "Fire from Heaven", type: "text", category: "miracles" },
      { content: "Elijah", type: "text", category: "miracles" },
      { content: "Healing Blind", type: "text", category: "miracles" },
      { content: "Jesus", type: "text", category: "miracles" },
      { content: "Resurrection", type: "text", category: "miracles" },
      { content: "Jesus", type: "text", category: "miracles" }
    ])
  },
  {
    id: 22,
    title: "Christian Leadership",
    difficulty: "Medium",
    description: "Match Christian leadership roles and responsibilities",
    unlocked: false,
    gridSize: 5,
    timeLimit: 150,
    cards: createCardPairs([
      { content: "Pastor", type: "text", category: "leadership" },
      { content: "Shepherd", type: "text", category: "leadership" },
      { content: "Elder", type: "text", category: "leadership" },
      { content: "Wisdom", type: "text", category: "leadership" },
      { content: "Deacon", type: "text", category: "leadership" },
      { content: "Service", type: "text", category: "leadership" },
      { content: "Bishop", type: "text", category: "leadership" },
      { content: "Overseer", type: "text", category: "leadership" },
      { content: "Apostle", type: "text", category: "leadership" },
      { content: "Sent One", type: "text", category: "leadership" },
      { content: "Prophet", type: "text", category: "leadership" },
      { content: "Spokesperson", type: "text", category: "leadership" },
      { content: "Evangelist", type: "text", category: "leadership" },
      { content: "Good News", type: "text", category: "leadership" },
      { content: "Teacher", type: "text", category: "leadership" },
      { content: "Instruction", type: "text", category: "leadership" }
    ])
  },
  {
    id: 23,
    title: "Biblical Geography",
    difficulty: "Hard",
    description: "Match biblical regions and their characteristics",
    unlocked: false,
    gridSize: 6,
    timeLimit: 180,
    cards: createCardPairs([
      { content: "Galilee", type: "text", category: "geography" },
      { content: "Northern", type: "text", category: "geography" },
      { content: "Judea", type: "text", category: "geography" },
      { content: "Southern", type: "text", category: "geography" },
      { content: "Samaria", type: "text", category: "geography" },
      { content: "Central", type: "text", category: "geography" },
      { content: "Jerusalem", type: "text", category: "geography" },
      { content: "Capital", type: "text", category: "geography" },
      { content: "Bethlehem", type: "text", category: "geography" },
      { content: "Birthplace", type: "text", category: "geography" },
      { content: "Nazareth", type: "text", category: "geography" },
      { content: "Hometown", type: "text", category: "geography" },
      { content: "Capernaum", type: "text", category: "geography" },
      { content: "Fishing Town", type: "text", category: "geography" },
      { content: "Mount Sinai", type: "text", category: "geography" },
      { content: "Mountain", type: "text", category: "geography" },
      { content: "Jordan River", type: "text", category: "geography" },
      { content: "River", type: "text", category: "geography" }
    ])
  },
  {
    id: 24,
    title: "Christian Worship",
    difficulty: "Medium",
    description: "Match elements of Christian worship",
    unlocked: false,
    gridSize: 5,
    timeLimit: 140,
    cards: createCardPairs([
      { content: "Praise", type: "text", category: "worship" },
      { content: "🙌", type: "symbol", category: "worship" },
      { content: "Prayer", type: "text", category: "worship" },
      { content: "🙏", type: "symbol", category: "worship" },
      { content: "Reading", type: "text", category: "worship" },
      { content: "📖", type: "symbol", category: "worship" },
      { content: "Singing", type: "text", category: "worship" },
      { content: "🎵", type: "symbol", category: "worship" },
      { content: "Offering", type: "text", category: "worship" },
      { content: "💰", type: "symbol", category: "worship" },
      { content: "Communion", type: "text", category: "worship" },
      { content: "🍞", type: "symbol", category: "worship" },
      { content: "Baptism", type: "text", category: "worship" },
      { content: "💧", type: "symbol", category: "worship" },
      { content: "Sermon", type: "text", category: "worship" },
      { content: "🎤", type: "symbol", category: "worship" }
    ])
  },
  {
    id: 25,
    title: "Pastor Chris Master",
    difficulty: "Hard",
    description: "Ultimate challenge with Pastor Chris's most important teachings",
    unlocked: false,
    gridSize: 6,
    timeLimit: 240,
    cards: createCardPairs([
      { content: "Word of Faith", type: "text", category: "master" },
      { content: "Confession", type: "text", category: "master" },
      { content: "Divine Health", type: "text", category: "master" },
      { content: "Healing", type: "text", category: "master" },
      { content: "Prosperity", type: "text", category: "master" },
      { content: "Blessing", type: "text", category: "master" },
      { content: "Righteousness", type: "text", category: "master" },
      { content: "Right Standing", type: "text", category: "master" },
      { content: "Grace", type: "text", category: "master" },
      { content: "Favor", type: "text", category: "master" },
      { content: "Kingdom", type: "text", category: "master" },
      { content: "Reign", type: "text", category: "master" },
      { content: "Authority", type: "text", category: "master" },
      { content: "Power", type: "text", category: "master" },
      { content: "Victory", type: "text", category: "master" },
      { content: "Triumph", type: "text", category: "master" },
      { content: "Glory", type: "text", category: "master" },
      { content: "Honor", type: "text", category: "master" }
    ])
  }
];

// Helper functions for game logic
export const unlockNextMemoryLevel = (completedLevelId: number): void => {
  const nextLevel = memoryLevels.find(level => level.id === completedLevelId + 1);
  if (nextLevel) {
    nextLevel.unlocked = true;
  }
};

export const resetAllMemoryLevels = (): void => {
  memoryLevels.forEach(level => {
    level.unlocked = level.id === 1;
    level.bestTime = undefined;
    level.bestMoves = undefined;
    level.stars = undefined;
  });
};

export const loadUnlockedMemoryLevels = (): Set<number> => {
  const unlocked = new Set<number>();
  memoryLevels.forEach(level => {
    if (level.unlocked) {
      unlocked.add(level.id);
    }
  });
  return unlocked;
};
