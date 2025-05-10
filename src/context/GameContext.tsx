import React, { createContext, useContext, useState, useEffect } from 'react';
import { truthQuestions, dareActions } from '../data/questions';
import { GameState, Player, GameHistory, HistoryItem } from '../types';

interface GameContextType {
  gameState: GameState;
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: string | null;
  questionType: 'truth' | 'dare' | null;
  history: GameHistory;
  round: number;
  setPlayers: (players: Player[]) => void;
  startGame: () => void;
  chooseOption: (option: 'truth' | 'dare') => void;
  completeChallenge: (completed: boolean) => void;
  resetGame: () => void;
  nextTurn: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', score: 0 },
    { id: 2, name: 'Player 2', score: 0 },
    { id: 3, name: 'Player 3', score: 0 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<'truth' | 'dare' | null>(null);
  const [history, setHistory] = useState<GameHistory>([]);
  const [round, setRound] = useState(1);
  const [usedQuestions, setUsedQuestions] = useState<{ [playerId: number]: { truth: string[], dare: string[] } }>({});

  const startGame = () => {
    setGameState('playing');
    setCurrentPlayerIndex(0);
    setRound(1);
    setHistory([]);
    // Initialize used questions for each player
    const initialUsedQuestions: { [playerId: number]: { truth: string[], dare: string[] } } = {};
    players.forEach(player => {
      initialUsedQuestions[player.id] = { truth: [], dare: [] };
    });
    setUsedQuestions(initialUsedQuestions);
  };

  const getRandomQuestion = (type: 'truth' | 'dare') => {
    const questions = type === 'truth' ? truthQuestions : dareActions;
    const currentPlayer = players[currentPlayerIndex];
    const playerUsedQuestions = usedQuestions[currentPlayer.id]?.[type] || [];
    
    // Filter out questions that this player has already seen
    let availableQuestions = questions.filter(q => !playerUsedQuestions.includes(q));
    
    if (availableQuestions.length === 0) {
      // If all questions have been used by this player, reset their used questions
      setUsedQuestions(prev => ({
        ...prev,
        [currentPlayer.id]: {
          ...prev[currentPlayer.id],
          [type]: []
        }
      }));
      availableQuestions = questions;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    // Add to this player's used questions
    setUsedQuestions(prev => ({
      ...prev,
      [currentPlayer.id]: {
        ...prev[currentPlayer.id],
        [type]: [...(prev[currentPlayer.id]?.[type] || []), selectedQuestion]
      }
    }));
    
    return selectedQuestion;
  };

  const chooseOption = (option: 'truth' | 'dare') => {
    const question = getRandomQuestion(option);
    setCurrentQuestion(question);
    setQuestionType(option);
    setGameState('answering');
  };

  const completeChallenge = (completed: boolean) => {
    if (currentQuestion && questionType) {
      // Add to history
      const historyItem: HistoryItem = {
        playerId: players[currentPlayerIndex].id,
        playerName: players[currentPlayerIndex].name,
        questionType,
        question: currentQuestion,
        completed,
        round,
      };
      
      setHistory(prev => [historyItem, ...prev]);
      
      // Update player score if completed
      if (completed) {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex].score += questionType === 'dare' ? 2 : 1;
        setPlayers(updatedPlayers);
      }
      
      nextTurn();
    }
  };

  const nextTurn = () => {
    // Reset current question
    setCurrentQuestion(null);
    setQuestionType(null);
    
    // Move to next player
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    
    // Increment round if we've gone through all players
    if (nextPlayerIndex === 0) {
      setRound(prev => prev + 1);
    }
    
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayers([
      { id: 1, name: 'Player 1', score: 0 },
      { id: 2, name: 'Player 2', score: 0 },
      { id: 3, name: 'Player 3', score: 0 },
    ]);
    setCurrentPlayerIndex(0);
    setCurrentQuestion(null);
    setQuestionType(null);
    setHistory([]);
    setRound(1);
    setUsedQuestions({});
  };

  const value = {
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
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};