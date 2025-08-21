'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MemoryLevel, MemoryCard, shuffleCards } from '@/app/data/memoryLevels';
import { Star, Clock, RotateCcw, Home, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface MemoryGameProps {
  level: MemoryLevel;
  onLevelComplete: (success: boolean, time: number, moves: number) => void;
  onReturn: () => void;
}

export default function MemoryGame({ level, onLevelComplete, onReturn }: MemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [lastMatchedContent, setLastMatchedContent] = useState('');

  // Initialize game
  useEffect(() => {
    const shuffledCards = shuffleCards(level.cards);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setGameStarted(false);
    setGameCompleted(false);
    setTimeElapsed(0);
    setMoves(0);
    setShowSuccess(false);
    setShowFailure(false);
  }, [level]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted && timeElapsed < level.timeLimit) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          if (newTime >= level.timeLimit) {
            setGameCompleted(true);
            setShowFailure(true);
            onLevelComplete(false, newTime, moves);
            return newTime;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, timeElapsed, level.timeLimit, moves, onLevelComplete]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs.size === level.cards.length / 2 && !gameCompleted) {
      setGameCompleted(true);
      setShowSuccess(true);
      const stars = calculateStars(timeElapsed, moves, level);
      onLevelComplete(true, timeElapsed, moves);
      
      // Save progress
      const savedScores = JSON.parse(localStorage.getItem('memoryLevelScores') || '{}');
      const currentBest = savedScores[level.id];
      if (!currentBest || stars > currentBest.stars || (stars === currentBest.stars && timeElapsed < currentBest.time)) {
        savedScores[level.id] = { time: timeElapsed, moves, stars };
        localStorage.setItem('memoryLevelScores', JSON.stringify(savedScores));
      }

      // Unlock next level
      const savedUnlocked = JSON.parse(localStorage.getItem('memoryUnlockedLevels') || '[1]');
      if (!savedUnlocked.includes(level.id + 1)) {
        savedUnlocked.push(level.id + 1);
        localStorage.setItem('memoryUnlockedLevels', JSON.stringify(savedUnlocked));
      }
    }
  }, [matchedPairs, level, gameCompleted, timeElapsed, moves, onLevelComplete]);

  const calculateStars = (time: number, moves: number, level: MemoryLevel): number => {
    const maxTime = level.timeLimit;
    const maxMoves = level.cards.length * 2; // Theoretical worst case
    
    const timeScore = Math.max(0, 1 - (time / maxTime));
    const movesScore = Math.max(0, 1 - (moves / maxMoves));
    const totalScore = (timeScore + movesScore) / 2;
    
    if (totalScore >= 0.8) return 3;
    if (totalScore >= 0.6) return 2;
    return 1;
  };

  const handleCardClick = useCallback((card: MemoryCard) => {
    if (gameCompleted || card.isMatched || flippedCards.length >= 2) return;
    
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Don't allow clicking the same card twice
    if (flippedCards.find(c => c.id === card.id)) return;

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for match
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [card1, card2] = newFlippedCards;
             if (card1.content === card2.content) {
         // Match found
         setMatchedPairs(prev => new Set([...prev, card1.content]));
         setLastMatchedContent(card1.content);
         setShowMatchAnimation(true);
         
         // Mark these cards as matched and keep them flipped
         setCards(prevCards => prevCards.map(card => 
           card.id === card1.id || card.id === card2.id 
             ? { ...card, isMatched: true }
             : card
         ));
         setFlippedCards([]);
         
         // Hide match animation after 2 seconds
         setTimeout(() => {
           setShowMatchAnimation(false);
         }, 2000);
       } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [gameCompleted, flippedCards, gameStarted]);

  const resetGame = () => {
    const shuffledCards = shuffleCards(level.cards);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setGameStarted(false);
    setGameCompleted(false);
    setTimeElapsed(0);
    setMoves(0);
    setShowSuccess(false);
    setShowFailure(false);
  };

  const isCardFlipped = (card: MemoryCard) => {
    return card.isMatched || flippedCards.find(c => c.id === card.id);
  };

  const getCardColor = (card: MemoryCard) => {
    if (card.isMatched) return 'bg-green-500';
    if (flippedCards.find(c => c.id === card.id)) return 'bg-blue-500';
    return 'bg-gradient-to-br from-purple-500 to-pink-500';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-10 left-10 text-2xl sm:text-4xl opacity-20 animate-bounce" style={{ animationDuration: '6s' }}>🧠</div>
        <div className="absolute top-20 right-20 text-xl sm:text-3xl opacity-15 animate-pulse" style={{ animationDuration: '7s' }}>💭</div>
        <div className="absolute bottom-20 left-20 text-2xl sm:text-4xl opacity-25 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>🎯</div>
        <div className="absolute bottom-32 right-32 text-xl sm:text-3xl opacity-20 animate-pulse" style={{ animationDuration: '8s' }}>⭐</div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
        <button
          onClick={onReturn}
          className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span>Back</span>
        </button>

        <div className="text-center order-first sm:order-none">
          <h1 className="text-lg sm:text-xl font-bold text-white mb-1">{level.title}</h1>
          <p className="text-white/70 text-xs sm:text-sm hidden sm:block">{level.description}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 text-white">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-mono">{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-white">
            <span className="text-xs sm:text-sm">Moves: {moves}</span>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <div className="text-white text-center">
              <div className="text-xs sm:text-sm opacity-80">Time Limit</div>
              <div className="font-bold text-sm sm:text-base">{formatTime(level.timeLimit)}</div>
            </div>
            <div className="text-white text-center">
              <div className="text-xs sm:text-sm opacity-80">Grid Size</div>
              <div className="font-bold text-sm sm:text-base">{level.gridSize}x{level.gridSize}</div>
            </div>
            <div className="text-white text-center">
              <div className="text-xs sm:text-sm opacity-80">Pairs Found</div>
              <div className="font-bold text-sm sm:text-base">{matchedPairs.size}/{level.cards.length / 2}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={resetGame}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <RotateCcw size={14} className="sm:w-4 sm:h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={onReturn}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Home size={14} className="sm:w-4 sm:h-4" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-2 sm:px-0">
        <div 
          className="grid gap-2 sm:gap-3 w-full"
          style={{ 
            gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
            aspectRatio: '1'
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleCardClick(card);
              }}
                             className={`
                 aspect-square rounded-lg sm:rounded-xl cursor-pointer transform transition-all duration-300 touch-manipulation select-none
                 ${isCardFlipped(card) 
                   ? card.isMatched 
                     ? 'bg-green-100 shadow-lg border-2 border-green-400 rotate-y-180 ring-2 ring-green-500 ring-opacity-75' 
                     : 'bg-white shadow-lg border-2 border-gray-200 rotate-y-180'
                   : `${getCardColor(card)} shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95`
                 }
                 ${flippedCards.find(c => c.id === card.id) ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
               `}
            >
              <div className="w-full h-full flex items-center justify-center p-1 sm:p-2">
                                 {isCardFlipped(card) ? (
                   <div className="text-center w-full rotate-y-180 relative">
                     <div className={`font-bold ${card.type === 'symbol' ? 'text-lg sm:text-2xl' : 'text-xs sm:text-sm'} text-gray-800 leading-tight`}>
                       {card.content}
                     </div>
                     {card.isMatched && (
                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                     )}
                   </div>
                 ) : (
                   <div className="text-white text-lg sm:text-2xl">❓</div>
                 )}
              </div>
            </div>
          ))}
        </div>
             </div>

       {/* Match Animation */}
       {showMatchAnimation && (
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
           <div className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 animate-bounce mx-4">
             <div className="text-xl sm:text-2xl">🎉</div>
             <div>
               <div className="font-bold text-base sm:text-lg">Match Found!</div>
               <div className="text-green-100 text-sm sm:text-base">"{lastMatchedContent}"</div>
             </div>
           </div>
         </div>
       )}

       {/* Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
            <div className="text-4xl sm:text-6xl mb-4">🎉</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Level Complete!</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Great job! You found all the pairs!</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-bold">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex justify-between">
                <span>Moves:</span>
                <span className="font-bold">{moves}</span>
              </div>
              <div className="flex justify-between">
                <span>Stars:</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={star <= calculateStars(timeElapsed, moves, level) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={onReturn}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Next Level
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Failure Dialog */}
      {showFailure && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
            <div className="text-4xl sm:text-6xl mb-4">⏰</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Time's Up!</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Don't worry, you can try again!</p>
            
            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                Try Again
              </button>
              <button
                onClick={onReturn}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
