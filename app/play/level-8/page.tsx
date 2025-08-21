'use client';

import KiddieJumpGame from '../../play/tiles/page';

export default function Level8Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300">
      <KiddieJumpGame level={8} />
    </div>
  );
}
