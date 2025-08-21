// hooks/useGameAudio.ts
import { useState, useCallback } from 'react';
import { getSongData } from '@/app/data/songData';

export const useGameAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDuration, setSongDuration] = useState(0);

  const stopSongAudio = useCallback(() => {
    console.log('Stopping audio...');
    if (currentAudio) {
      // Aggressive audio stopping
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.volume = 0;
      currentAudio.muted = true;
      currentAudio.src = '';
      currentAudio.removeAttribute('src');
      currentAudio.load();
      
      // Remove all event listeners
      const newAudio = currentAudio.cloneNode(true) as HTMLAudioElement;
      if (currentAudio.parentNode) {
        currentAudio.parentNode.replaceChild(newAudio, currentAudio);
      }
      
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  const playSongAudio = useCallback((
    level: number, 
    onTimeUpdate: (currentTime: number, progress: number) => void,
    onEnded: () => void
  ) => {
    const song = getSongData(level);
    if (typeof window !== 'undefined') {
      console.log('Audio playback disabled - visual only mode');
      
      // Stop and cleanup any existing audio first
      if (currentAudio) {
        stopSongAudio();
      }
      
      // Don't actually create or play any audio
      // Just simulate the time updates for the UI
      let startTime = Date.now();
      const duration = song.duration * 1000; // Convert to ms
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        const currentTime = (elapsed / 1000);
        
        onTimeUpdate(currentTime, progress);
        
        if (progress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          onEnded();
        }
      };
      
      updateProgress();
      
      // Set state to simulate playing
      setCurrentAudio(null);
      setIsPlaying(true);
      setSongDuration(song.duration);
    }
  }, [currentAudio, stopSongAudio]);

  const playNote = useCallback((note: string) => {
    // Simplified note playing - just use existing audio context if available
    if (typeof window === 'undefined' || !audioContext) return;
    
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain); 
      gain.connect(audioContext.destination);
      
      // Simple frequency map
      const frequencies: { [k: string]: number } = {
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 
        'G4': 392, 'A4': 440, 'B4': 493.88, 'C5': 523.25
      };
      
      osc.frequency.value = frequencies[note] ?? 440;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      osc.start(); 
      osc.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio context is not available
      console.log('Audio not available');
    }
  }, [audioContext]);

  return {
    audioContext,
    currentAudio,
    isPlaying,
    songDuration,
    playSongAudio,
    stopSongAudio,
    playNote
  };
};