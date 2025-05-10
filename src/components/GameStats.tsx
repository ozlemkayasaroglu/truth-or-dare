import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Medal } from 'lucide-react';

const GameStats: React.FC = () => {
  const { players } = useGame();
  
  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <Trophy size={16} className="text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Scoreboard</h3>
      </div>
      
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="flex items-center">
            {index === 0 && player.score > 0 && (
              <Medal size={16} className="text-yellow-400 mr-2" />
            )}
            {index !== 0 && (
              <span className="w-4 h-4 mr-2 text-center text-xs text-white/60">{index + 1}</span>
            )}
            <div className="flex-1">
              <div className="h-8 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full flex items-center px-3"
                  style={{ 
                    width: `${Math.max(player.score * 10, 20)}%`,
                    background: index === 0 
                      ? 'linear-gradient(90deg, rgba(79,70,229,0.8) 0%, rgba(124,58,237,0.8) 100%)' 
                      : 'rgba(255,255,255,0.05)'
                  }}
                >
                  <span className="text-white font-medium text-sm truncate">{player.name}</span>
                </div>
              </div>
            </div>
            <span className="ml-2 font-bold text-white min-w-8 text-center">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStats;