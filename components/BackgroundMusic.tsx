'use client';

import React, { useState, useEffect, useRef } from 'react';

const songs = [
  {
    name: 'Heart of Worship',
    file: '/songs/Heart-Of-Worship-Lerato-_-Farlon-LW-Singers-SA.mp3'
  },
  {
    name: 'You Are Great',
    file: '/songs/YOU-ARE-GREAT-BY-MARY-PN21.mp3'
  },
  {
    name: 'Level 1 Song',
    file: '/songs/level1-song.mp3'
  }
];

export default function BackgroundMusic() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio and start playing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Low volume by default
      audioRef.current.loop = false; // We'll handle looping manually for shuffle
      
      // Start playing automatically
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Auto-play prevented:', error);
          // Don't show error to user, just don't auto-play
        });
      }
    }
  }, []);

  // Handle song ending
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Play next song (shuffle)
      const nextIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(nextIndex);
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = songs[nextIndex].file;
          audioRef.current.play().catch(() => {
            // Ignore play errors
          });
        }
      }, 500);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].file}
        preload="auto"
      />

      {/* Subtle song name display */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-black/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
          <div className="text-white text-xs font-medium opacity-70">
            {songs[currentSongIndex].name}
          </div>
        </div>
      </div>
    </>
  );
}
