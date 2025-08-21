'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the exact same game from tiles page
const KiddieJumpGame = dynamic(() => import('../tiles/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-purple-400 via-indigo-400 to-pink-400 flex items-center justify-center"><div className="text-white text-xl">Loading Level 4...</div></div>
});
import { useState, useEffect } from 'react';

export default function Level4Page() {
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
        4: { score, stars: Math.max(3 - misses, 1), completed: true }
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
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300">
      <KiddieJumpGame 
        level={4}
        onLevelComplete={handleLevelComplete}
        onReturn={handleReturn}
      />
    </div>
  );
}
