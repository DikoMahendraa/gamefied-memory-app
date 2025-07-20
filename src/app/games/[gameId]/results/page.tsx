"use client";

import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/lib/stores/game-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Home, Eye } from "lucide-react";
import { useState } from "react";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { currentGame, gameHistory } = useGameStore();
  const [showDetailed, setShowDetailed] = useState(false);

  const gameId = params.gameId as string;
  const latestGame = gameHistory[gameHistory.length - 1];

  if (!latestGame) {
    router.push("/games");
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: "default" as const, text: "Excellent!" };
    if (score >= 60)
      return { variant: "secondary" as const, text: "Good Job!" };
    return { variant: "destructive" as const, text: "Keep Trying!" };
  };

  const handlePlayAgain = () => {
    router.push(`/games/${gameId}`);
  };

  const handleGoHome = () => {
    router.push("/dashboard");
  };

  const scoreBadge = getScoreBadge(latestGame.score);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <Trophy
          className={`h-16 w-16 mx-auto mb-4 ${getScoreColor(
            latestGame.score
          )}`}
        />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Game Complete!
        </h1>
        <Badge variant={scoreBadge.variant} className="text-lg px-4 py-2">
          {scoreBadge.text}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Your Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div
            className={`text-6xl font-bold mb-2 ${getScoreColor(
              latestGame.score
            )}`}
          >
            {latestGame.score}%
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {latestGame.correctAnswers} out of {latestGame.totalQuestions}{" "}
            correct
          </p>
        </CardContent>
      </Card>

      {showDetailed && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestGame.answers.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Question {index + 1}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your answer: {answer || "No answer"}
                    </p>
                  </div>
                  <Badge variant={answer ? "default" : "destructive"}>
                    {answer ? "✓" : "✗"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <Button
          onClick={() => setShowDetailed(!showDetailed)}
          variant="outline"
          className="w-full"
        >
          <Eye className="h-4 w-4 mr-2" />
          {showDetailed ? "Hide" : "View"} Detailed Results
        </Button>

        <Button onClick={handlePlayAgain} className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Play Again
        </Button>

        <Button
          onClick={handleGoHome}
          variant="outline"
          className="w-full bg-transparent"
        >
          <Home className="h-4 w-4 mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
}
