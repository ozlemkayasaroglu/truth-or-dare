import React, { createContext, useContext, useState } from "react";
import { Player, GameState, GameHistory, HistoryItem } from "../types";
import { truthQuestions, dareActions } from "../data/questions";

interface GameContextType {
  gameState: GameState;
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: string | null;
  questionType: "truth" | "dare" | null;
  history: GameHistory;
  round: number;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  startGame: () => void;
  chooseOption: (option: "truth" | "dare") => void;
  completeChallenge: (completed: boolean) => void;
  resetGame: () => void;
  nextTurn: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", score: 0, avatar: undefined },
    { id: 2, name: "Player 2", score: 0, avatar: undefined },
    { id: 3, name: "Player 3", score: 0, avatar: undefined },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<"truth" | "dare" | null>(
    null
  );
  const [history, setHistory] = useState<GameHistory>([]);
  const [round, setRound] = useState(1);
  const [usedQuestions, setUsedQuestions] = useState<{
    [playerId: number]: { truth: string[]; dare: string[] };
  }>({});

  const startGame = () => {
    setGameState("playing");
    setCurrentPlayerIndex(0);
    setRound(1);
    setHistory([]);
    const initialUsedQuestions: {
      [playerId: number]: { truth: string[]; dare: string[] };
    } = {};
    players.forEach((player) => {
      initialUsedQuestions[player.id] = { truth: [], dare: [] };
    });
    setUsedQuestions(initialUsedQuestions);
  };

  const getRandomQuestion = (type: "truth" | "dare") => {
    const questions = type === "truth" ? truthQuestions : dareActions;
    const currentPlayer = players[currentPlayerIndex];
    const playerUsedQuestions = usedQuestions[currentPlayer.id]?.[type] || [];

    let availableQuestions = questions.filter(
      (q) => !playerUsedQuestions.includes(q)
    );

    if (availableQuestions.length === 0) {
      setUsedQuestions((prev) => ({
        ...prev,
        [currentPlayer.id]: {
          ...prev[currentPlayer.id],
          [type]: [],
        },
      }));
      availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    setUsedQuestions((prev) => ({
      ...prev,
      [currentPlayer.id]: {
        ...prev[currentPlayer.id],
        [type]: [...(prev[currentPlayer.id]?.[type] || []), selectedQuestion],
      },
    }));

    return selectedQuestion;
  };

  const chooseOption = (option: "truth" | "dare") => {
    const question = getRandomQuestion(option);
    setCurrentQuestion(question);
    setQuestionType(option);
    setGameState("answering");
  };

  const completeChallenge = (completed: boolean) => {
    if (currentQuestion && questionType) {
      const historyItem: HistoryItem = {
        playerId: players[currentPlayerIndex].id,
        playerName: players[currentPlayerIndex].name,
        questionType,
        question: currentQuestion,
        completed,
        round,
      };

      setHistory((prev) => [historyItem, ...prev]);

      if (completed) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === players[currentPlayerIndex].id
              ? {
                  ...player,
                  score: player.score + (questionType === "dare" ? 2 : 1),
                }
              : player
          )
        );
      }

      nextTurn();
    }
  };

  const nextTurn = () => {
    setCurrentQuestion(null);
    setQuestionType(null);
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    if (nextPlayerIndex === 0) {
      setRound((prev) => prev + 1);
    }
    setGameState("playing");
  };

  const resetGame = () => {
    setGameState("setup");
    setPlayers([
      { id: 1, name: "Player 1", score: 0, avatar: undefined },
      { id: 2, name: "Player 2", score: 0, avatar: undefined },
      { id: 3, name: "Player 3", score: 0, avatar: undefined },
    ]);
    setCurrentPlayerIndex(0);
    setCurrentQuestion(null);
    setQuestionType(null);
    setHistory([]);
    setRound(1);
    setUsedQuestions({});
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        players,
        currentPlayerIndex,
        currentQuestion,
        questionType,
        history,
        round,
        setPlayers,
        startGame,
        chooseOption,
        completeChallenge,
        resetGame,
        nextTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
