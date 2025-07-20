"use client"

import { Progress } from "@/components/ui/progress"

interface GameProgressProps {
  current: number
  total: number
}

export default function GameProgress({ current, total }: GameProgressProps) {
  const progress = (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {current} of {total}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
