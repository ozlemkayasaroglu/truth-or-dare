import React from 'react';
import { useGame } from '../context/GameContext';
import { History, CheckCircle, XCircle } from 'lucide-react';

const GameHistory: React.FC = () => {
  const { history } = useGame();

  if (history.length === 0) {
    return (
      <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <History size={16} className="text-violet-300" />
          <h3 className="text-lg font-semibold text-white">History</h3>
        </div>
        <p className="text-violet-200 text-sm text-center py-4">
          Game history will appear here...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <History size={16} className="text-violet-300" />
        <h3 className="text-lg font-semibold text-white">History</h3>
      </div>
      
      <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
        <div className="space-y-2">
          {history.slice(0, 10).map((item, index) => (
            <div 
              key={index} 
              className="rounded-lg p-2 bg-white/5 border border-white/10 text-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-white">{item.playerName}</span>
                  <span className="text-xs text-violet-300 ml-2">Round {item.round}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    item.questionType === 'truth' ? 'bg-blue-600/50 text-blue-100' : 'bg-orange-600/50 text-orange-100'
                  }`}>
                    {item.questionType}
                  </span>
                  {item.completed ? (
                    <CheckCircle size={14} className="text-green-400 ml-1" />
                  ) : (
                    <XCircle size={14} className="text-red-400 ml-1" />
                  )}
                </div>
              </div>
              <p className="text-violet-200 text-xs mt-1 line-clamp-2">{item.question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHistory;