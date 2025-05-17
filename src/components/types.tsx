export interface Player {
  id: number;
  name: string;
  score: number;
  avatar?: string;
}

export type GameState = "setup" | "playing" | "answering";

export interface HistoryItem {
  playerId: number;
  playerName: string;
  questionType: "truth" | "dare";
  question: string;
  completed: boolean;
  round: number;
}

export type GameHistory = HistoryItem[];
