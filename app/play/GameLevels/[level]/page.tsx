'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import individual level components
import Level1 from '../Level1';
import Level2 from '../Level2';
import Level3 from '../Level3';
import Level4 from '../Level4';
import Level5 from '../Level5';
import Level6 from '../Level6';

// Create more levels dynamically
const Level7 = dynamic(() => import('../Level7'), { ssr: false });
const Level8 = dynamic(() => import('../Level8'), { ssr: false });
const Level9 = dynamic(() => import('../Level9'), { ssr: false });
const Level10 = dynamic(() => import('../Level10'), { ssr: false });

export default function LevelPage() {
  const router = useRouter();
  const params = useParams();
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    if (params.level) {
      const levelNum = parseInt(params.level as string, 10);
      if (levelNum >= 1 && levelNum <= 50) {
        setLevel(levelNum);
      } else {
        router.push('/play');
      }
    }
  }, [params.level, router]);

  const handleLevelComplete = (success: boolean, score: number, misses: number) => {
    // Save progress to localStorage
    if (typeof window !== 'undefined') {
      const progress = JSON.parse(localStorage.getItem('kiddieJumpProgress') || '{}');
      progress[level] = { success, score, misses };
      localStorage.setItem('kiddieJumpProgress', JSON.stringify(progress));
    }

    // Navigate back to level map or next level
    if (success && level < 50) {
      router.push(`/play/GameLevels/${level + 1}`);
    } else {
      router.push('/play');
    }
  };

  const handleReturnToMap = () => {
    router.push('/play');
  };

  // Map levels to components
  const renderLevel = () => {
    const levelProps = {
      level,
      onLevelComplete: handleLevelComplete,
      onReturn: handleReturnToMap
    };

    switch (level) {
      case 1:
        return <Level1 {...levelProps} />;
      case 2:
        return <Level2 {...levelProps} />;
      case 3:
        return <Level3 {...levelProps} />;
      case 4:
        return <Level4 {...levelProps} />;
      case 5:
        return <Level5 {...levelProps} />;
      case 6:
        return <Level6 {...levelProps} />;
      case 7:
        return <Level7 {...levelProps} />;
      case 8:
        return <Level8 {...levelProps} />;
      case 9:
        return <Level9 {...levelProps} />;
      case 10:
        return <Level10 {...levelProps} />;
      default:
        // For levels 11-50, use a generic component
        return <Level1 {...levelProps} />; // Reuse Level1 for now, can be expanded
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300">
      {renderLevel()}
    </div>
  );
}
