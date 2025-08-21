'use client';

import { useRouter } from 'next/navigation';
import KiddiesJumpLevelMap from '@/components/KiddiesJumpLevelMap';

export default function KiddiesJumpLevelsPage() {
  const router = useRouter();

  const handleLevelSelect = (level: number) => {
    router.push(`/play/level-${level}`);
  };

  return (
    <div className="min-h-screen">
      <KiddiesJumpLevelMap onLevelSelect={handleLevelSelect} />
    </div>
  );
}
