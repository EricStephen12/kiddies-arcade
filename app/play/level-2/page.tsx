'use client';

import dynamic from 'next/dynamic';

// Import the exact same game from tiles page
const KiddieJumpGame = dynamic(() => import('../tiles/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 flex items-center justify-center"><div className="text-white text-xl">Loading Level 2...</div></div>
});

export default function Level2Page() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400">
      <KiddieJumpGame />
    </div>
  );
}
