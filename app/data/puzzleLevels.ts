export interface PuzzleLevel {
  id: number;
  title: string;
  image: string;
  gridSize: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  unlocked: boolean;
  bestMoves?: number;
  bestTime?: number;
  stars?: number;
}

export const puzzleLevels: PuzzleLevel[] = [
  {
    id: 1,
    title: "Pastor Chris - Honorary Doctorate",
    image: "/jigsaw/Pastor Chris Oyakhilome Receives Honorary Doctorate From His Alma Mater.jpg",
    gridSize: 3,
    difficulty: 'Easy',
    description: "Start your journey with this special moment",
    unlocked: true
  },
  {
    id: 2,
    title: "Divine Gifts",
    image: "/jigsaw/Pastor Chris Oyakhilome – The Three Cardinal Gifts Of God (The Gift Of The Holy Spirit ).jpg",
    gridSize: 3,
    difficulty: 'Easy',
    description: "Discover the three cardinal gifts of God",
    unlocked: false
  },
  {
    id: 3,
    title: "Rhapsody of Realities",
    image: "/jigsaw/Download Rhapsody of Realities December 2021 Free PDF » FLATIMES.jpg",
    gridSize: 3,
    difficulty: 'Easy',
    description: "Daily devotional wisdom",
    unlocked: false
  },
  {
    id: 4,
    title: "Benefits of Tithing",
    image: "/jigsaw/BENEFITS OF TITHINGS.jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "Learn about the blessings of tithing",
    unlocked: false
  },
  {
    id: 5,
    title: "Diligent Service",
    image: "/jigsaw/_When you give yourself to careful and diligent….jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "The rewards of careful and diligent service",
    unlocked: false
  },
  {
    id: 6,
    title: "Healing Streams Victory",
    image: "/jigsaw/The Healing Streams Victory Parade continues at Festival of Miracles.jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "Celebrate the victory of healing streams",
    unlocked: false
  },
  {
    id: 7,
    title: "Ministry of Angels",
    image: "/jigsaw/The Ministry of Angels_ Calling Forth Abundance __ Pastor Chris Oyakhilome.jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "Understanding angelic ministry",
    unlocked: false
  },
  {
    id: 8,
    title: "Sealed by the Holy Ghost",
    image: "/jigsaw/RHAPSODY OF REALITIES 1 JULY 2021 – SEALED BY THE HOLY GHOST » FLATIMES.jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "The sealing power of the Holy Spirit",
    unlocked: false
  },
  {
    id: 9,
    title: "Prosperity Benefits",
    image: "/jigsaw/LET OTHERS BENEFIT FROM YOUR PROSPERITY!.jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "Sharing your prosperity with others",
    unlocked: false
  },
  {
    id: 10,
    title: "Spiritual Progress",
    image: "/jigsaw/What Does Progress In Your Spiritual Life Means_ Pastor Chris Oyakhilome.jpg",
    gridSize: 4,
    difficulty: 'Medium',
    description: "Understanding spiritual growth",
    unlocked: false
  },
  {
    id: 11,
    title: "God's Vision",
    image: "/jigsaw/Pastor Chris Oyakhilome Takes His God-given Vision to the World with Christ Embassy.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Spreading God's vision worldwide",
    unlocked: false
  },
  {
    id: 12,
    title: "God Resides Within",
    image: "/jigsaw/Pastor Chris Oyakhilome_ \"God Resides Within You\".jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "The divine presence within",
    unlocked: false
  },
  {
    id: 13,
    title: "Healing Streams",
    image: "/jigsaw/Healing streams with pastor Chris (1).jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Experience divine healing",
    unlocked: false
  },
  {
    id: 14,
    title: "Divine Health",
    image: "/jigsaw/healing streams with pastor Chris.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Walking in divine health",
    unlocked: false
  },
  {
    id: 15,
    title: "Intercession",
    image: "/jigsaw/INTERCESSION_ YOUR DIVINE RESPONSIBILITY_ - Affirmation Train.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Your divine responsibility of intercession",
    unlocked: false
  },
  {
    id: 16,
    title: "Pastor's Biography",
    image: "/jigsaw/Biography of Pastor Chris Oyakhilome - The New Man….jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "The journey of the new man",
    unlocked: false
  },
  {
    id: 17,
    title: "Divine Abundance",
    image: "/jigsaw/9eb09728-c84e-430e-ad33-91e18e59bf21.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Experiencing divine abundance",
    unlocked: false
  },
  {
    id: 18,
    title: "Faith Journey",
    image: "/jigsaw/1a0dd4ee-42c0-4952-844f-56d1ea51ea05.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Your faith journey continues",
    unlocked: false
  },
  {
    id: 19,
    title: "Miraculous Healing",
    image: "/jigsaw/9526012d-2c28-4f0d-851d-4d36b2e26b4a.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Witness miraculous healing",
    unlocked: false
  },
  {
    id: 20,
    title: "Divine Wisdom",
    image: "/jigsaw/9f1abca4-f4b0-44d5-9370-a26957fd0ec9.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Accessing divine wisdom",
    unlocked: false
  },
  {
    id: 21,
    title: "Spiritual Growth",
    image: "/jigsaw/2822b480-2721-49ce-a39e-aedd87f84efb.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Growing in spiritual maturity",
    unlocked: false
  },
  {
    id: 22,
    title: "Health Confessions",
    image: "/jigsaw/Confissões de Saúde Divina 20 de julho de 2023….jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Divine health confessions",
    unlocked: false
  },
  {
    id: 23,
    title: "Divine Connection",
    image: "/jigsaw/4c4410a0-76b5-46f9-a8a4-d5b5ff512f57.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Your divine connection",
    unlocked: false
  },
  {
    id: 24,
    title: "Faithful Service",
    image: "/jigsaw/bc9ceada-6cfa-4fa2-99b1-61aa82eade2e.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "The rewards of faithful service",
    unlocked: false
  },
  {
    id: 25,
    title: "Divine Purpose",
    image: "/jigsaw/be57bd34-b9dc-4cec-87f7-a917aa84ee58.jpg",
    gridSize: 4,
    difficulty: 'Hard',
    description: "Discovering your divine purpose",
    unlocked: false
  }
];

export const getLevelById = (id: number): PuzzleLevel | undefined => {
  return puzzleLevels.find(level => level.id === id);
};

export const unlockNextLevel = (currentLevelId: number): void => {
  const nextLevel = puzzleLevels.find(level => level.id === currentLevelId + 1);
  if (nextLevel) {
    nextLevel.unlocked = true;
  }
};

export const resetAllLevels = (): void => {
  puzzleLevels.forEach(level => {
    level.unlocked = level.id === 1;
  });
};

export const loadUnlockedLevels = (completedLevels: Set<number>): void => {
  puzzleLevels.forEach(level => {
    if (level.id === 1) {
      level.unlocked = true; // First level is always unlocked
    } else {
      // Unlock level if previous level is completed
      level.unlocked = completedLevels.has(level.id - 1);
    }
  });
};
