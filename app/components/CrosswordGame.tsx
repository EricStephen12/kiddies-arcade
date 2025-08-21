'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Timer, Trophy, Star, RotateCcw, Eye, CheckCircle } from 'lucide-react';
import { WordSearchLevel, WordSearchWord } from '@/app/data/crosswordLevels';

interface WordSearchGameProps {
  level: WordSearchLevel;
  onLevelComplete: (levelId: number, time: number) => void;
  onBackToLevelMap: () => void;
  bestTime?: number;
}

interface SelectedCell {
  row: number;
  col: number;
}

const WordSearchGame: React.FC<WordSearchGameProps> = ({
  level,
  onLevelComplete,
  onBackToLevelMap,
  bestTime
}) => {
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (startTime && !isCompleted) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, isCompleted]);

  // Check if puzzle is completed
  useEffect(() => {
    if (foundWords.size === level.words.length && foundWords.size > 0) {
      setIsCompleted(true);
      setShowWinScreen(true);
      onLevelComplete(level.id, elapsedTime);
    }
  }, [foundWords, level.words.length, level.id, onLevelComplete, elapsedTime]);

  // Start timer on first interaction
  const startTimerIfNeeded = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  // Check if selected cells form a valid word
  const checkSelectedWord = (): string | null => {
    if (selectedCells.length < 2) return null;
    
    // Form the word from selected cells in order
    const word = selectedCells.map(cell => level.grid[cell.row][cell.col]).join('');
    const reverseWord = word.split('').reverse().join('');
    
    // Check if word exists in the level's word list
    const foundWord = level.words.find(w => w.word === word || w.word === reverseWord);
    
    if (foundWord) {
      // Verify this is a valid selection by checking if selected cells form a straight line
      // and match the length of the found word
      if (selectedCells.length === foundWord.word.length) {
        // Check if selection forms a straight line
        const firstCell = selectedCells[0];
        const lastCell = selectedCells[selectedCells.length - 1];
        
        const deltaRow = lastCell.row - firstCell.row;
        const deltaCol = lastCell.col - firstCell.col;
        
        // Check if it's horizontal, vertical, or diagonal
        const isHorizontal = deltaRow === 0;
        const isVertical = deltaCol === 0;
        const isDiagonal = Math.abs(deltaRow) === Math.abs(deltaCol);
        
        if (isHorizontal || isVertical || isDiagonal) {
          return foundWord.word;
        }
      }
    }
    
    return null;
  };

  // Handle mouse down on cell
  const handleMouseDown = (row: number, col: number) => {
    startTimerIfNeeded();
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  // Handle mouse enter on cell
  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    
    const newCell = { row, col };
    const lastCell = selectedCells[selectedCells.length - 1];
    
    if (!lastCell) return;
    
    // Check if the new cell is in line with the selection
    const deltaRow = row - selectedCells[0].row;
    const deltaCol = col - selectedCells[0].col;
    
    // Allow horizontal, vertical, or diagonal lines
    const isValidLine = (
      deltaRow === 0 || // horizontal
      deltaCol === 0 || // vertical
      Math.abs(deltaRow) === Math.abs(deltaCol) // diagonal
    );
    
    if (isValidLine) {
      // Generate all cells between start and current position
      const startRow = selectedCells[0].row;
      const startCol = selectedCells[0].col;
      const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
      const stepRow = steps === 0 ? 0 : deltaRow / steps;
      const stepCol = steps === 0 ? 0 : deltaCol / steps;
      
      const newSelectedCells: SelectedCell[] = [];
      for (let i = 0; i <= steps; i++) {
        newSelectedCells.push({
          row: startRow + Math.round(stepRow * i),
          col: startCol + Math.round(stepCol * i)
        });
      }
      
      setSelectedCells(newSelectedCells);
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (!isSelecting) return;
    
    setIsSelecting(false);
    const foundWord = checkSelectedWord();
    
    if (foundWord && !foundWords.has(foundWord)) {
      setFoundWords(prev => new Set([...prev, foundWord]));
      
      // Show success feedback
      setShowSuccessMessage(foundWord);
      setTimeout(() => setShowSuccessMessage(null), 2000);
    }
    
    setSelectedCells([]);
  };

  // Handle touch start on cell
  const handleTouchStart = (row: number, col: number) => {
    startTimerIfNeeded();
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  // Handle touch move on cell
  const handleTouchMove = (row: number, col: number) => {
    if (!isSelecting) return;
    
    const newCell = { row, col };
    const lastCell = selectedCells[selectedCells.length - 1];
    
    if (!lastCell) return;
    
    // Check if the new cell is in line with the selection
    const deltaRow = row - selectedCells[0].row;
    const deltaCol = col - selectedCells[0].col;
    
    // Allow horizontal, vertical, or diagonal lines
    const isValidLine = (
      deltaRow === 0 || // horizontal
      deltaCol === 0 || // vertical
      Math.abs(deltaRow) === Math.abs(deltaCol) // diagonal
    );
    
    if (isValidLine) {
      // Generate all cells between start and current position
      const startRow = selectedCells[0].row;
      const startCol = selectedCells[0].col;
      const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
      const stepRow = steps === 0 ? 0 : deltaRow / steps;
      const stepCol = steps === 0 ? 0 : deltaCol / steps;
      
      const newSelectedCells: SelectedCell[] = [];
      for (let i = 0; i <= steps; i++) {
        newSelectedCells.push({
          row: startRow + Math.round(stepRow * i),
          col: startCol + Math.round(stepCol * i)
        });
      }
      
      setSelectedCells(newSelectedCells);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isSelecting) return;
    
    setIsSelecting(false);
    const foundWord = checkSelectedWord();
    
    if (foundWord && !foundWords.has(foundWord)) {
      setFoundWords(prev => new Set([...prev, foundWord]));
      
      // Show success feedback
      setShowSuccessMessage(foundWord);
      setTimeout(() => setShowSuccessMessage(null), 2000);
    }
    
    setSelectedCells([]);
  };

  // Check if cell is selected
  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  // Check if cell is part of a found word
  const isCellInFoundWord = (row: number, col: number): string | null => {
    for (const word of level.words) {
      if (foundWords.has(word.word)) {
        const { startRow, startCol, direction } = word;
        let deltaRow = 0, deltaCol = 0;
        
        switch (direction) {
          case 'horizontal': deltaCol = 1; break;
          case 'vertical': deltaRow = 1; break;
          case 'diagonal-down': deltaRow = 1; deltaCol = 1; break;
          case 'diagonal-up': deltaRow = -1; deltaCol = 1; break;
        }
        
        for (let i = 0; i < word.word.length; i++) {
          const checkRow = startRow + (deltaRow * i);
          const checkCol = startCol + (deltaCol * i);
          if (checkRow === row && checkCol === col) {
            return word.word;
          }
        }
      }
    }
    return null;
  };

  // Get color for found word
  const getWordColor = (wordName: string): string => {
    const colors = [
      'bg-green-200 text-green-800 border-green-400',
      'bg-blue-200 text-blue-800 border-blue-400', 
      'bg-purple-200 text-purple-800 border-purple-400',
      'bg-pink-200 text-pink-800 border-pink-400',
      'bg-yellow-200 text-yellow-800 border-yellow-400',
      'bg-indigo-200 text-indigo-800 border-indigo-400',
      'bg-red-200 text-red-800 border-red-400',
      'bg-cyan-200 text-cyan-800 border-cyan-400',
      'bg-orange-200 text-orange-800 border-orange-400',
      'bg-emerald-200 text-emerald-800 border-emerald-400'
    ];
    
    // Use word name to consistently get same color
    const index = wordName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // Reset puzzle
  const resetPuzzle = () => {
    setFoundWords(new Set());
    setSelectedCells([]);
    setIsSelecting(false);
    setIsCompleted(false);
    setStartTime(null);
    setElapsedTime(0);
    setShowWinScreen(false);
    setHighlightedWords(new Set());
    setShowHint(false);
    setShowSuccessMessage(null);
  };

  // Show hint
  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      // Highlight unfound words briefly
      const unfoundWords = level.words.filter(word => !foundWords.has(word.word));
      if (unfoundWords.length > 0) {
        const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
        setHighlightedWords(new Set([randomWord.word]));
        setTimeout(() => setHighlightedWords(new Set()), 2000);
      }
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate stars based on time
  const calculateStars = () => {
    const timeThresholds = {
      'Easy': { 3: 60, 2: 120, 1: 300 },
      'Medium': { 3: 120, 2: 240, 1: 480 },
      'Hard': { 3: 180, 2: 360, 1: 720 }
    };
    
    const thresholds = timeThresholds[level.difficulty as keyof typeof timeThresholds];
    if (elapsedTime <= thresholds[3]) return 3;
    if (elapsedTime <= thresholds[2]) return 2;
    return 1;
  };

  // Check if cell should be highlighted for hint
  const isCellHighlighted = (row: number, col: number): boolean => {
    for (const wordName of highlightedWords) {
      const word = level.words.find(w => w.word === wordName);
      if (!word) continue;
      
      const { startRow, startCol, direction } = word;
      let deltaRow = 0, deltaCol = 0;
      
      switch (direction) {
        case 'horizontal': deltaCol = 1; break;
        case 'vertical': deltaRow = 1; break;
        case 'diagonal-down': deltaRow = 1; deltaCol = 1; break;
        case 'diagonal-up': deltaRow = -1; deltaCol = 1; break;
      }
      
      for (let i = 0; i < word.word.length; i++) {
        const checkRow = startRow + (deltaRow * i);
        const checkCol = startCol + (deltaCol * i);
        if (checkRow === row && checkCol === col) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 overflow-hidden">
      {/* Floating kid-friendly elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }}>📝</div>
        <div className="absolute top-20 right-16 text-3xl opacity-55 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>🔍</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>💭</div>
        <div className="absolute top-32 right-24 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }}>⭐</div>
        <div className="absolute bottom-32 right-32 text-2xl opacity-55 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute top-16 left-1/3 text-3xl opacity-45 animate-pulse" style={{ animationDuration: '8s' }}>☁️</div>
        <div className="absolute bottom-24 right-1/4 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>☁️</div>
        <div className="absolute top-1/3 left-8 text-2xl opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>🧠</div>
        <div className="absolute bottom-1/3 right-12 text-2xl opacity-55 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>📚</div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 w-full max-w-7xl mx-auto max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button
            onClick={onBackToLevelMap}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Levels</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-base sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
              Level {level.id}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">{level.title}</p>
          </div>
          <div className="w-10 sm:w-16"></div>
        </div>

        {/* Game Info */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-3 sm:mb-4 text-white">
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <Timer size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-base">{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-sm">Found: {foundWords.size}/{level.words.length}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-sm">{level.difficulty}</span>
          </div>
          {bestTime && (
            <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
              <span className="text-xs sm:text-sm">Best: {formatTime(bestTime)}</span>
            </div>
          )}
        </div>

        {/* Success Message for Found Word */}
        {showSuccessMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
              <CheckCircle size={24} className="text-white" />
              <div>
                <div className="font-bold text-lg">Word Found!</div>
                <div className="text-green-100">"{showSuccessMessage}"</div>
              </div>
            </div>
          </div>
        )}

        {/* Win Screen */}
        {showWinScreen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center text-white border border-white/20 max-w-sm w-full">
              <div className="flex justify-center mb-4">
                {[...Array(calculateStars())].map((_, i) => (
                  <Star key={i} size={24} className="sm:w-8 sm:h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                All Words Found!
              </h2>
              <p className="text-base sm:text-lg mb-4">
                Completed in {formatTime(elapsedTime)}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={resetPuzzle}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  Play Again
                </button>
                <button
                  onClick={onBackToLevelMap}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  Next Level
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Container */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Word Search Grid */}
          <div className="flex-1 flex justify-center">
            <div 
              className="grid gap-1 bg-white/5 p-4 rounded-xl border border-white/20 select-none touch-manipulation"
              style={{ 
                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${level.gridSize}, 1fr)`
              }}
              onMouseLeave={() => setIsSelecting(false)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleTouchEnd();
              }}
            >
              {level.grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => {
                                      const isSelected = isCellSelected(rowIndex, colIndex);
                    const foundWordName = isCellInFoundWord(rowIndex, colIndex);
                    const isHighlighted = isCellHighlighted(rowIndex, colIndex);
                    
                    let cellClasses = `
                      relative w-8 h-8 sm:w-10 sm:h-10 border-2 cursor-pointer
                      transition-all duration-300 flex items-center justify-center text-sm sm:text-lg font-bold
                      hover:bg-blue-100
                    `;
                    
                    if (isSelected) {
                      cellClasses += ' bg-yellow-300 text-gray-800 border-yellow-500 shadow-lg transform scale-105';
                    } else if (foundWordName) {
                      cellClasses += ` ${getWordColor(foundWordName)} shadow-md`;
                    } else if (isHighlighted) {
                      cellClasses += ' bg-red-200 text-red-800 border-red-400 animate-pulse';
                    } else {
                      cellClasses += ' bg-white text-gray-800 border-gray-400';
                    }
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          handleTouchStart(rowIndex, colIndex);
                        }}
                        onTouchMove={(e) => {
                          e.preventDefault();
                          // Get the touch position and find the cell
                          const touch = e.touches[0];
                          const element = e.currentTarget.parentElement;
                          if (element) {
                            const rect = element.getBoundingClientRect();
                            const x = touch.clientX - rect.left;
                            const y = touch.clientY - rect.top;
                            const cellSize = rect.width / level.grid[0].length;
                            const touchRow = Math.floor(y / cellSize);
                            const touchCol = Math.floor(x / cellSize);
                            
                            if (touchRow >= 0 && touchRow < level.grid.length && 
                                touchCol >= 0 && touchCol < level.grid[0].length) {
                              handleTouchMove(touchRow, touchCol);
                            }
                          }
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          handleTouchEnd();
                        }}
                        className={`${cellClasses} touch-manipulation select-none`}
                      >
                        <span className="font-extrabold tracking-wide">{letter}</span>
                        {foundWordName && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>
                    );
                })
              )}
            </div>
          </div>

          {/* Words Panel */}
          <div className="lg:w-80 space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={resetPuzzle}
                className="flex items-center gap-2 px-3 py-2 bg-gray-500/80 text-white rounded-lg hover:bg-gray-600/80 transition-colors text-sm"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                onClick={toggleHint}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80 transition-colors text-sm"
              >
                <Eye size={16} />
                Hint
              </button>
            </div>

            {/* Words to Find */}
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                Words to Find: 
                <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                  {foundWords.size}/{level.words.length}
                </span>
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
                {level.words.map((word, index) => {
                  const isFound = foundWords.has(word.word);
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 border-2 ${
                        isFound 
                          ? `${getWordColor(word.word)} border-current transform scale-105 shadow-lg` 
                          : 'bg-white/5 text-white/80 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {isFound ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-sm ${isFound ? 'line-through opacity-75' : ''}`}>
                          {word.word}
                        </div>
                        <div className="text-xs opacity-80 mt-1">{word.clue}</div>
                      </div>
                      {isFound && (
                        <div className="flex-shrink-0 text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full">
                          ✓ FOUND
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-white/70 text-xs sm:text-sm px-2">
          Click and drag to select words in the grid. Words can be horizontal, vertical, or diagonal!
        </div>
      </div>
    </div>
  );
};

export default WordSearchGame;