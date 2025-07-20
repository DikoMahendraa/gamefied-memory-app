"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface GameTimerProps {
  duration: number
  onTimeUp: () => void
  reset: number
  paused: boolean
}

export default function GameTimer({ duration, onTimeUp, reset, paused }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [reset, duration])

  useEffect(() => {
    if (paused || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp, paused])

  const progress = (timeLeft / duration) * 100
  const isLowTime = timeLeft <= 10

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Remaining</span>
        </div>
        <span className={`text-lg font-bold ${isLowTime ? "text-red-500" : "text-gray-900 dark:text-white"}`}>
          {timeLeft}s
        </span>
      </div>
      <Progress value={progress} className={`h-2 ${isLowTime ? "bg-red-100 dark:bg-red-900" : ""}`} />
    </div>
  )
}
