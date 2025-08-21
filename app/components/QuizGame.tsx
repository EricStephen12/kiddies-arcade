'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Timer, Trophy, Star, RotateCcw, CheckCircle, XCircle, Brain } from 'lucide-react';
import { QuizLevel, QuizQuestion } from '@/app/data/quizLevels';

interface QuizGameProps {
  level: QuizLevel;
  onLevelComplete: (levelId: number, score: number, time: number) => void;
  onBackToLevelMap: () => void;
  bestScore?: number;
  bestTime?: number;
}

const QuizGame: React.FC<QuizGameProps> = ({
  level,
  onLevelComplete,
  onBackToLevelMap,
  bestScore,
  bestTime
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(level.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(level.timeLimit);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const currentQuestion = level.questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    let interval: NodeJS.Timeout | undefined;
    if (timeLeft > 0 && !showResult && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, showResult, isCompleted]);

  // Update total time
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (startTime && !isCompleted) {
      interval = setInterval(() => {
        setTotalTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, isCompleted]);

  const handleTimeUp = () => {
    if (!showResult) {
      setSelectedAnswer(null);
      handleAnswerSubmit();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
    
    // Auto advance after 3 seconds
    setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < level.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(level.timeLimit);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setIsCompleted(true);
    const finalScore = Math.round((score / level.questions.length) * 100);
    
    if (finalScore >= level.passingScore) {
      setShowWinScreen(true);
      onLevelComplete(level.id, finalScore, totalTime);
    } else {
      setShowWinScreen(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(level.questions.length).fill(null));
    setTimeLeft(level.timeLimit);
    setIsCompleted(false);
    setShowWinScreen(false);
    setTotalTime(0);
    setStartTime(Date.now());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateStars = () => {
    const finalScore = Math.round((score / level.questions.length) * 100);
    if (finalScore >= 90) return 3;
    if (finalScore >= 80) return 2;
    if (finalScore >= level.passingScore) return 1;
    return 0;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= level.passingScore) return 'text-blue-400';
    return 'text-red-400';
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 overflow-hidden">
      {/* Floating kid-friendly elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0s' }}>📚</div>
        <div className="absolute top-20 right-16 text-3xl opacity-55 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>❓</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>💡</div>
        <div className="absolute top-32 right-24 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '4s' }}>⭐</div>
        <div className="absolute bottom-32 right-32 text-2xl opacity-55 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute top-16 left-1/3 text-3xl opacity-45 animate-pulse" style={{ animationDuration: '8s' }}>☁️</div>
        <div className="absolute bottom-24 right-1/4 text-2xl opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}>☁️</div>
        <div className="absolute top-1/3 left-8 text-2xl opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>🧠</div>
        <div className="absolute bottom-1/3 right-12 text-2xl opacity-55 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>✏️</div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 w-full max-w-4xl mx-auto">
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

        {/* Progress and Stats */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-3 sm:mb-4 text-white">
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-base">Question: {currentQuestionIndex + 1}/{level.questions.length}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <Timer size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-base">{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-base">Score: {score}/{level.questions.length}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-sm">{level.difficulty}</span>
          </div>
        </div>

        {/* Best Scores */}
        {(bestScore || bestTime) && (
          <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-white/70 text-xs sm:text-sm">
            {bestScore && <span>Best Score: {bestScore}%</span>}
            {bestTime && <span>Best Time: {formatTime(bestTime)}</span>}
          </div>
        )}

        {/* Win Screen */}
        {showWinScreen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center text-white border border-white/20 max-w-md w-full">
              <div className="flex justify-center mb-4">
                {calculateStars() > 0 ? (
                  [...Array(calculateStars())].map((_, i) => (
                    <Star key={i} size={24} className="sm:w-8 sm:h-8 text-yellow-400 fill-current" />
                  ))
                ) : (
                  <XCircle size={48} className="text-red-400" />
                )}
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${calculateStars() > 0 ? 'bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent' : 'text-red-400'}`}>
                {calculateStars() > 0 ? 'Quiz Complete!' : 'Try Again!'}
              </h2>
              <p className="text-base sm:text-lg mb-2">
                Score: <span className={getScoreColor(Math.round((score / level.questions.length) * 100))}>{Math.round((score / level.questions.length) * 100)}%</span>
              </p>
              <p className="text-sm sm:text-base mb-4">
                {calculateStars() > 0 
                  ? `Completed in ${formatTime(totalTime)}`
                  : `You need ${level.passingScore}% to pass`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  Try Again
                </button>
                <button
                  onClick={onBackToLevelMap}
                  className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  {calculateStars() > 0 ? 'Next Level' : 'Back to Levels'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        {!isCompleted && (
          <div className="bg-white/5 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Brain size={20} className="text-blue-400" />
              <span className="text-white/80 text-sm font-semibold">
                {currentQuestion.category}
              </span>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="grid gap-3 sm:gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = `
                  w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 font-medium
                  ${!showResult && selectedAnswer === index 
                    ? 'bg-blue-500/30 border-blue-400 text-white' 
                    : 'bg-white/5 border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40'
                  }
                `;

                if (showResult) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass = 'bg-green-500/30 border-green-400 text-green-100';
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    buttonClass = 'bg-red-500/30 border-red-400 text-red-100';
                  } else {
                    buttonClass = 'bg-white/5 border-white/20 text-white/60';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-current flex items-center justify-center text-xs sm:text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm sm:text-base">{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle size={20} className="text-green-400 ml-auto" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <XCircle size={20} className="text-red-400 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!showResult && selectedAnswer !== null && (
              <div className="mt-4 sm:mt-6 text-center">
                <button
                  onClick={handleAnswerSubmit}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Explanation */}
            {showResult && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/10 rounded-lg">
                <h3 className="font-bold text-white mb-2">Explanation:</h3>
                <p className="text-white/80 text-sm sm:text-base">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3 sm:gap-4">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gray-500/80 text-white rounded-lg font-semibold hover:bg-gray-600/80 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
          >
            <RotateCcw size={16} />
            Reset Quiz
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-white/70 text-xs sm:text-sm px-2">
          Select your answer and click Submit. You have {level.timeLimit} seconds per question.
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
