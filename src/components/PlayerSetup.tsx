import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const PlayerSetup: React.FC = () => {
  const { players, setPlayers, startGame } = useGame();
  const [localPlayers, setLocalPlayers] = useState(players);

  const handleNameChange = (index: number, name: string) => {
    const updatedPlayers = [...localPlayers];
    updatedPlayers[index].name = name;
    setLocalPlayers(updatedPlayers);
  };

  const handleStart = () => {
    setPlayers(localPlayers);
    startGame();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Player Setup</h2>
        
        <div className="space-y-4">
          {localPlayers.map((player, index) => (
            <div key={player.id} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                {index + 1}
              </div>
              <input
                type="text"
                value={player.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                maxLength={15}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleStart}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;