"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/lib/stores/game-store";
import { getGameData } from "@/lib/game-data";
import GameCard from "@/components/game/game-card";
import GameTimer from "@/components/game/game-timer";
import GameProgress from "@/components/game/game-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { startGame, submitAnswer, completeGame } = useGameStore();

  const gameId = params.gameId as string;
  const [gameData, setGameData] = useState<any>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const data = getGameData(gameId);
    if (data) {
      setGameData(data);
    } else {
      router.push("/games");
    }
  }, [gameId, router]);

  const handleStartGame = () => {
    setGameStarted(true);
    startGame(gameId);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowAnswer(true);
    // Auto-advance after showing answer
    setTimeout(() => {
      handleNextCard("");
    }, 2000);
  };

  const handleAnswer = (answer: string) => {
    if (timeUp) return;

    setShowAnswer(true);
    submitAnswer(answer);

    // Auto-advance after showing answer
    setTimeout(() => {
      handleNextCard(answer);
    }, 1500);
  };

  const handleNextCard = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentCardIndex < gameData.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
      setTimeUp(false);
    } else {
      // Game completed
      const score = calculateScore(newAnswers);
      completeGame(score, newAnswers);

      toast({
        title: "Game Completed!",
        description: `You scored ${score}%`,
      });

      router.push(`/games/${gameId}/results`);
    }
  };

  const calculateScore = (answers: string[]) => {
    if (!gameData) return 0;

    let correct = 0;
    answers.forEach((answer, index) => {
      if (
        answer &&
        answer.toLowerCase().trim() ===
          gameData.cards[index].answer.toLowerCase().trim()
      ) {
        correct++;
      }
    });

    return Math.round((correct / gameData.cards.length) * 100);
  };

  if (!gameData) {
    return <div className="p-4">Loading...</div>;
  }

  if (!gameStarted) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {gameData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {gameData.description}
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Game Rules:</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• You have 30 seconds per question</li>
              <li>• Type your answer and press Enter or click Submit</li>
              <li>• If time runs out, the question is skipped</li>
              <li>• Complete all 5 cards to see your results</li>
            </ul>
          </CardContent>
        </Card>

        <Button onClick={handleStartGame} className="w-full" size="lg">
          Start Game
        </Button>
      </div>
    );
  }

  const currentCard = gameData.cards[currentCardIndex];

  return (
    <div className="p-4 space-y-6">
      <GameProgress
        current={currentCardIndex + 1}
        total={gameData.cards.length}
      />

      <GameTimer
        duration={30}
        onTimeUp={handleTimeUp}
        reset={currentCardIndex}
        paused={showAnswer}
      />

      <GameCard
        card={currentCard}
        showAnswer={showAnswer}
        onAnswer={handleAnswer}
        disabled={timeUp || showAnswer}
      />
    </div>
  );
}
