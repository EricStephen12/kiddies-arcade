'use client';

import dynamic from 'next/dynamic';

// Import the exact same game from tiles page
const KiddieJumpGame = dynamic(() => import('@/app/play/tiles/page'), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video/dolly_background.webm" type="video/webm" />
      </video>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-black/50 text-white text-xl p-6 rounded-lg">
          Loading Level 1...
        </div>
      </div>
    </div>
  )
});

export default function Level1Page() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300">
      <KiddieJumpGame />
    </div>
  );
}
