import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { User, Upload } from "lucide-react";

const PlayerSetup: React.FC = () => {
  const { players, setPlayers, startGame } = useGame();
  const [localPlayers, setLocalPlayers] = useState(players);

  const handleNameChange = (index: number, name: string) => {
    const updatedPlayers = [...localPlayers];
    updatedPlayers[index].name = name;
    setLocalPlayers(updatedPlayers);
  };

  const handleAvatarChange = (index: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const avatarData = reader.result as string;
      setLocalPlayers((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], avatar: avatarData };
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleStart = () => {
    setPlayers(localPlayers);
    startGame();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Player Setup
        </h2>

        <div className="space-y-6">
          {localPlayers.map((player, index) => (
            <div key={player.id} className="flex items-center space-x-3 group">
              <label
                htmlFor={`avatar-input-${player.id}`}
                className="cursor-pointer relative w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden shrink-0"
                title="Select Avatar"
              >
                {player.avatar ? (
                  <img
                    src={player.avatar}
                    alt={`${player.name} avatar`}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User size={32} className="text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  id={`avatar-input-${player.id}`}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    handleAvatarChange(
                      index,
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                />
                <div className="absolute bottom-0 right-0 bg-indigo-700 rounded-full p-1">
                  <Upload size={16} className="text-white" />
                </div>
              </label>

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
