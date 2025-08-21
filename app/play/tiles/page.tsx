'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KiddieJumpGame() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '4s' }}>🔧</div>
        <div className="absolute top-20 right-20 text-5xl opacity-15 animate-pulse" style={{ animationDuration: '6s' }}>⚙️</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-25 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>🛠️</div>
        <div className="absolute bottom-32 right-32 text-5xl opacity-20 animate-pulse" style={{ animationDuration: '7s' }}>🔨</div>
        <div className="absolute top-1/2 left-1/4 text-3xl opacity-15 animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }}>📐</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-25 animate-pulse" style={{ animationDuration: '5s' }}>🎮</div>
      </div>

      {/* Main maintenance content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Maintenance Icon */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-pulse">🚧</div>
          <div className="text-6xl mb-2 animate-bounce" style={{ animationDuration: '2s' }}>🎮</div>
      </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          Kiddies Jump
        </h1>

        {/* Maintenance Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🛠️ Under Maintenance
          </h2>
          
          <p className="text-lg text-white/90 mb-6 leading-relaxed">
            We're working hard to make Kiddies Jump even more awesome! 
            The game is getting a major upgrade with better performance, 
            smoother gameplay, and tons of new features.
          </p>

          <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 font-semibold">
              ⏰ Coming back soon with:
            </p>
            <ul className="text-yellow-100 text-left mt-2 space-y-1">
              <li>✨ Ultra-smooth 60 FPS gameplay</li>
              <li>🎯 Perfect touch responsiveness</li>
              <li>🏆 Enhanced scoring system</li>
              <li>🎨 Beautiful new animations</li>
              <li>🚀 Better performance</li>
            </ul>
          </div>
          
          <div className="text-sm text-white/70">
            <p>💡 In the meantime, try our other awesome games!</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/arcade')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span className="text-xl">🎮</span>
            Back to Arcade
          </button>

          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span className="text-xl">🏠</span>
            Go Home
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full animate-pulse"
              style={{ 
                width: '75%',
                animationDuration: '2s'
              }}
            ></div>
          </div>
          <p className="text-white/80 text-sm mt-2">Progress: 75% Complete</p>
          </div>
          
        {/* Fun Facts */}
        <div className="mt-8 text-white/60 text-sm">
          <p>🎯 Did you know? We're optimizing every pixel for the best gaming experience!</p>
        </div>
      </div>
    </div>
  );
}