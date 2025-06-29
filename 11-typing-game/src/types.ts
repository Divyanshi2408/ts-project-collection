export interface GameState {
  currentWord: string;
  userInput: string;
  score: number;
  timeLeft: number;
  isGameOver: boolean;
}
