"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface GameCardProps {
  card: {
    question: string
    answer: string
    hint?: string
  }
  showAnswer: boolean
  onAnswer: (answer: string) => void
  disabled: boolean
}

export default function GameCard({ card, showAnswer, onAnswer, disabled }: GameCardProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userAnswer.trim() && !disabled) {
      onAnswer(userAnswer.trim())
      setUserAnswer("")
      setIsFlipped(true)
    }
  }

  const isCorrect = showAnswer && userAnswer.toLowerCase().trim() === card.answer.toLowerCase().trim()

  return (
    <div className="perspective-1000">
      <Card
        className={cn(
          "transition-all duration-500 transform-style-preserve-3d min-h-[300px]",
          isFlipped && "rotate-y-180",
        )}
      >
        {!showAnswer ? (
          <CardContent className="p-6 flex flex-col justify-center items-center text-center min-h-[300px]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{card.question}</h2>

            {card.hint && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Hint: {card.hint}</p>}

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
              <Input
                type="text"
                placeholder="Type your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={disabled}
                className="text-center text-lg"
                autoFocus
              />
              <Button type="submit" disabled={!userAnswer.trim() || disabled} className="w-full">
                Submit Answer
              </Button>
            </form>
          </CardContent>
        ) : (
          <CardContent className="p-6 flex flex-col justify-center items-center text-center min-h-[300px]">
            <div className={cn("text-6xl mb-4", isCorrect ? "text-green-500" : "text-red-500")}>
              {isCorrect ? "✓" : "✗"}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {isCorrect ? "Correct!" : "Incorrect"}
            </h3>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              The answer was: <strong>{card.answer}</strong>
            </p>

            {!isCorrect && userAnswer && (
              <p className="text-sm text-gray-600 dark:text-gray-400">You answered: {userAnswer}</p>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
