"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { BookOpen, Globe, Brain, Star } from "lucide-react";

const gameTypes = [
  {
    id: "basic-english",
    title: "Basic English",
    description: "Learn fundamental English vocabulary",
    icon: BookOpen,
    difficulty: "Beginner",
    color: "bg-blue-500",
  },
  {
    id: "japanese-hiragana",
    title: "Japanese Hiragana",
    description: "Master Japanese hiragana characters",
    icon: Globe,
    difficulty: "Intermediate",
    color: "bg-red-500",
  },
  {
    id: "memory-challenge",
    title: "Memory Challenge",
    description: "Test your memory with random patterns",
    icon: Brain,
    difficulty: "Advanced",
    color: "bg-purple-500",
  },
];

export default function GamesPage() {
  const router = useRouter();

  const handleStartGame = (gameId: string) => {
    router.push(`/games/${gameId}`);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Game
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Select a memory card game to start learning
        </p>
      </div>

      <div className="space-y-4">
        {gameTypes.map((game) => {
          const IconComponent = game.icon;
          return (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${game.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      <Badge variant="outline">{game.difficulty}</Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {game.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Star className="h-4 w-4" />
                    <span>5 cards • 30s per card</span>
                  </div>
                  <Button onClick={() => handleStartGame(game.id)}>
                    Start Game
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
