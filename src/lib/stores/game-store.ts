import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameResult {
  gameType: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: string[];
  completedAt: string;
  timeTaken: number;
}

interface GameState {
  currentGame: {
    gameType: string;
    startTime: number;
    answers: string[];
  } | null;
  gameHistory: GameResult[];
  startGame: (gameType: string) => void;
  submitAnswer: (answer: string) => void;
  completeGame: (score: number, answers: string[]) => void;
  getStats: () => {
    totalGames: number;
    averageScore: number;
    bestScore: number;
    totalTime: number;
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentGame: null,
      gameHistory: [],

      startGame: (gameType: string) => {
        set({
          currentGame: {
            gameType,
            startTime: Date.now(),
            answers: [],
          },
        });
      },

      submitAnswer: (answer: string) => {
        const { currentGame } = get();
        if (currentGame) {
          set({
            currentGame: {
              ...currentGame,
              answers: [...currentGame.answers, answer],
            },
          });
        }
      },

      completeGame: (score: number, answers: string[]) => {
        const { currentGame, gameHistory } = get();
        if (currentGame) {
          const timeTaken = (Date.now() - currentGame.startTime) / 1000;
          const correctAnswers = Math.round((score / 100) * answers.length);

          const gameResult: GameResult = {
            gameType: currentGame.gameType,
            score,
            totalQuestions: answers.length,
            correctAnswers,
            answers,
            completedAt: new Date().toISOString(),
            timeTaken,
          };

          set({
            gameHistory: [...gameHistory, gameResult],
            currentGame: null,
          });
        }
      },

      getStats: () => {
        const { gameHistory } = get();

        if (gameHistory.length === 0) {
          return {
            totalGames: 0,
            averageScore: 0,
            bestScore: 0,
            totalTime: 0,
          };
        }

        const totalGames = gameHistory.length;
        const averageScore = Math.round(
          gameHistory.reduce((sum, game) => sum + game.score, 0) / totalGames
        );
        const bestScore = Math.max(...gameHistory.map((game) => game.score));
        const totalTime = gameHistory.reduce(
          (sum, game) => sum + game.timeTaken,
          0
        );

        return {
          totalGames,
          averageScore,
          bestScore,
          totalTime,
        };
      },
    }),
    {
      name: "game-storage",
    }
  )
);
