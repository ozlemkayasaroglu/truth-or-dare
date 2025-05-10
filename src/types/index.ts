export type GameState = 'setup' | 'playing' | 'answering';

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface HistoryItem {
  playerId: number;
  playerName: string;
  questionType: 'truth' | 'dare';
  question: string;
  completed: boolean;
  round: number;
}

export type GameHistory = HistoryItem[];