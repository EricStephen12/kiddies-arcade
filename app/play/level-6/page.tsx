'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Import the exact same game from tiles page
const KiddieJumpGame = dynamic(() => import('../tiles/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400 flex items-center justify-center"><div className="text-white text-xl">Loading Level 6...</div></div>
});

export default function Level6Page() {
  const router = useRouter();
  const [levelProgress, setLevelProgress] = useState<Record<number, any>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kiddieJumpProgress');
    if (saved) {
      setLevelProgress(JSON.parse(saved));
    }
  }, []);

  const handleLevelComplete = (success: boolean, score: number, misses: number) => {
    if (success) {
      const newProgress = {
        ...levelProgress,
        6: { score, stars: Math.max(3 - misses, 1), completed: true }
      };
      setLevelProgress(newProgress);
      localStorage.setItem('kiddieJumpProgress', JSON.stringify(newProgress));
      
      setTimeout(() => {
        router.push('/play');
      }, 1500);
    } else {
      router.push('/play');
    }
  };

  const handleReturn = () => {
    router.push('/play');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400">
      <KiddieJumpGame 
        level={6}
        onLevelComplete={handleLevelComplete}
        onReturn={handleReturn}
      />
    </div>
  );
}
