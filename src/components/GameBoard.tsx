import React from 'react';
import { useGame } from '../context/GameContext';
import PlayerSetup from './PlayerSetup';
import PlayerTurn from './PlayerTurn';
import QuestionCard from './QuestionCard';
import GameHistory from './GameHistory';
import GameStats from './GameStats';

const GameBoard: React.FC = () => {
  const { gameState, resetGame } = useGame();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/10 to-indigo-900/20 z-0" />
        
        <div className="relative z-10">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Truth <span className="text-orange-400">or</span> Dare
            </h1>
            <p className="text-violet-200 text-sm md:text-base">
              Choose wisely, reveal secrets or face challenges
            </p>
          </header>

          {gameState === 'setup' && <PlayerSetup />}
          
          {gameState === 'playing' && <PlayerTurn />}
          
          {gameState === 'answering' && <QuestionCard />}

          {gameState !== 'setup' && (
            <div className="mt-8 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <GameStats />
              </div>
              <div className="md:w-1/2">
                <GameHistory />
              </div>
            </div>
          )}

          {gameState !== 'setup' && (
            <div className="mt-8 text-center">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500/80 hover:bg-red-600/80 text-white rounded-full font-semibold text-sm transition-all"
              >
                Reset Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;