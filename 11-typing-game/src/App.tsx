import { useEffect, useState } from 'react';
import { words } from './words';
import type { GameState } from './types';

const getRandomWord = () => {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
};

export default function App() {
  const [game, setGame] = useState<GameState>({
    currentWord: getRandomWord(),
    userInput: "",
    score: 0,
    timeLeft: 30,
    isGameOver: false,
  });

  // Timer logic
  useEffect(() => {
    if (game.isGameOver || game.timeLeft <= 0) return;

    const interval = setInterval(() => {
      setGame(prev => {
        if (prev.timeLeft <= 1) {
          return { ...prev, isGameOver: true, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [game.isGameOver, game.timeLeft]);

  // Input change handler (fixed with correct state access)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setGame(prev => {
      if (value === prev.currentWord) {
        return {
          ...prev,
          score: prev.score + 1,
          currentWord: getRandomWord(),
          userInput: "",
        };
      }

      return {
        ...prev,
        userInput: value,
      };
    });
  };

  const resetGame = () => {
    setGame({
      currentWord: getRandomWord(),
      userInput: "",
      score: 0,
      timeLeft: 30,
      isGameOver: false,
    });
  };

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>🧠 Typing Game</h2>
      <h3>{game.isGameOver ? "Game Over" : "Type the word below"}</h3>
      <h1 style={{ color: "#007acc" }}>{game.currentWord}</h1>

      {!game.isGameOver && (
        <input
          type="text"
          value={game.userInput}
          onChange={handleChange}
          placeholder="Start typing..."
          autoFocus
        />
      )}

      <div style={{ marginTop: 20 }}>
        <p>⏳ Time Left: {game.timeLeft}s</p>
        <p>🏆 Score: {game.score}</p>
        {game.isGameOver && <button onClick={resetGame}>🔁 Restart</button>}
      </div>
    </div>
  );
}
