'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import the premium KiddiesJumpLevelMap component
const KiddiesJumpLevelMap = dynamic(() => import('@/components/KiddiesJumpLevelMap'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 flex items-center justify-center">
      <div className="text-white text-xl">Loading level map...</div>
    </div>
  )
});

export default function PlayPage() {
  const router = useRouter();

  const handleLevelSelect = (level: number) => {
    router.push(`/play/level-${level}`);
  };

  return <KiddiesJumpLevelMap onLevelSelect={handleLevelSelect} />;
}
