import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { AlertTriangle, CheckCircle2, XCircle, User } from "lucide-react";

const QuestionCard: React.FC = () => {
  const {
    players,
    currentPlayerIndex,
    currentQuestion,
    questionType,
    completeChallenge,
  } = useGame();
  const currentPlayer = players[currentPlayerIndex];
  const [isFlipped, setIsFlipped] = useState(false);

  // Animate card after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-2 flex justify-center">
        {currentPlayer.avatar ? (
          <img
            src={currentPlayer.avatar}
            alt={`${currentPlayer.name} avatar`}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={28} />
          </div>
        )}
      </div>
      <div className="mb-4 text-center">
        <h3 className="text-xl font-semibold text-white">
          {currentPlayer.name}'s {questionType === "truth" ? "Truth" : "Dare"}
        </h3>
      </div>

      <div
        className={`perspective-1000 relative w-full h-64 transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full rounded-xl p-6 flex items-center justify-center backface-hidden bg-gradient-to-br from-violet-700/80 to-indigo-900/80 border border-white/20 shadow-xl">
          <div className="text-center">
            <div className="inline-block rounded-full p-3 bg-white/10 mb-3">
              {questionType === "truth" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              )}
            </div>
            <p className="text-lg text-white font-medium">
              Revealing {questionType}...
            </p>
          </div>
        </div>

        <div className="absolute w-full h-full rounded-xl p-6 flex flex-col backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 border border-white/20 shadow-xl">
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white text-xl text-center font-medium">
              {currentQuestion}
            </p>
          </div>

          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={() => completeChallenge(true)}
              className="flex items-center gap-1 px-4 py-2 bg-green-600/80 hover:bg-green-700/80 text-white rounded-full text-sm font-semibold transition-all"
            >
              <CheckCircle2 size={16} />
              Completed
            </button>
            <button
              onClick={() => completeChallenge(false)}
              className="flex items-center gap-1 px-4 py-2 bg-red-600/80 hover:bg-red-700/80 text-white rounded-full text-sm font-semibold transition-all"
            >
              <XCircle size={16} />
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
