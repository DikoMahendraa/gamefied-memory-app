"use client";

import { useAuthStore } from "@/lib/stores/auth-store";
import { useGameStore } from "@/lib/stores/game-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { gameHistory, getStats } = useGameStore();
  const stats = getStats();

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your learning progress
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGames}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bestScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.totalTime / 60)}m
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Games</CardTitle>
          <CardDescription>Your latest game sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gameHistory
              .slice(-5)
              .reverse()
              .map((game, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{game.gameType}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(game.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      game.score >= 80
                        ? "default"
                        : game.score >= 60
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {game.score}%
                  </Badge>
                </div>
              ))}
            {gameHistory.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No games played yet. Start your first game!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
