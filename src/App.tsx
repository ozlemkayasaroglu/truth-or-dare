import React from 'react';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-950 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <GameProvider>
        <GameBoard />
      </GameProvider>
    </div>
  );
}

export default App;