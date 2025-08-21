'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import the exact same game from tiles page
const KiddieJumpGame = dynamic(() => import('../tiles/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 flex items-center justify-center"><div className="text-white text-xl">Loading Level 3...</div></div>
});
import { useState, useEffect } from 'react';

export default function Level3Page() {
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
        3: { score, stars: Math.max(3 - misses, 1), completed: true }
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
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-emerald-300 to-teal-300">
      <KiddieJumpGame 
        level={3}
        onLevelComplete={handleLevelComplete}
        onReturn={handleReturn}
      />
    </div>
  );
}
