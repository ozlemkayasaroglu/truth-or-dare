import React from "react";
import { useGame } from "../context/GameContext";
import { Trophy, Medal, Plus } from "lucide-react";

const GameStats: React.FC = () => {
  const { players, setPlayers } = useGame();

  // Skoru artırma fonksiyonu
  const increaseScore = (playerId: number) => {
    console.log("Skor artırılıyor, playerId:", playerId);
    console.log("Mevcut oyuncular:", players);

    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, score: player.score + 1 } : player
    );

    console.log("Güncellenmiş oyuncular:", updatedPlayers);

    setPlayers(updatedPlayers);
  };

  // Skora göre sıralama (yüksekten düşüğe)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={20} className="text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Scoreboard</h3>
      </div>

      <div className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="flex items-center gap-2">
            {/* Sıra veya madalya */}
            {index === 0 && player.score > 0 ? (
              <Medal size={18} className="text-yellow-400" />
            ) : (
              <span className="w-5 text-xs text-white/60">{index + 1}</span>
            )}

            {/* İsim ve skor barı */}
            <div className="flex-1">
              <div className="h-8 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full flex items-center px-3 rounded-full"
                  style={{
                    width: `${Math.min(player.score * 10, 100)}%`,
                    background:
                      index === 0
                        ? "linear-gradient(90deg, rgba(79,70,229,0.8), rgba(124,58,237,0.8))"
                        : "rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-white text-sm font-medium truncate">
                    {player.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Skor değeri ve buton */}
            <div className="flex items-center gap-1">
              <span className="text-white font-bold w-6 text-right">
                {player.score}
              </span>
              <button
                onClick={() => increaseScore(player.id)}
                className="p-1 hover:bg-white/10 rounded-full transition"
                title="Puan ver"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStats;
