'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the exact same game from tiles page
const KiddieJumpGame = dynamic(() => import('../tiles/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 flex items-center justify-center"><div className="text-white text-xl">Loading Level 5...</div></div>
});
import { useState, useEffect } from 'react';

export default function Level5Page() {
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
        5: { score, stars: Math.max(3 - misses, 1), completed: true }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-violet-300 to-pink-300">
      <KiddieJumpGame 
        level={5}
        onLevelComplete={handleLevelComplete}
        onReturn={handleReturn}
      />
    </div>
  );
}
