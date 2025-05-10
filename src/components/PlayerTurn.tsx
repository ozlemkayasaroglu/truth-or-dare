import React from 'react';
import { useGame } from '../context/GameContext';
import { User, Sparkles } from 'lucide-react';

const PlayerTurn: React.FC = () => {
  const { players, currentPlayerIndex, chooseOption, round } = useGame();
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center rounded-full bg-indigo-600/30 p-2 mb-2">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {currentPlayer.name}'s Turn
        </h2>
        <p className="text-violet-200 text-sm flex items-center justify-center gap-1">
          <Sparkles size={14} className="text-yellow-400" />
          Round {round}
        </p>
      </div>

      <p className="text-white/80 mb-8">Choose your challenge:</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => chooseOption('truth')}
          className="px-8 py-4 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Truth
        </button>
        <button
          onClick={() => chooseOption('dare')}
          className="px-8 py-4 bg-orange-500/80 hover:bg-orange-600/80 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Dare
        </button>
      </div>

      <div className="mt-4 text-white/60 text-sm">
        <p>Truth: Reveal a secret (+1 point)</p>
        <p>Dare: Complete a challenge (+2 points)</p>
      </div>
    </div>
  );
};

export default PlayerTurn;