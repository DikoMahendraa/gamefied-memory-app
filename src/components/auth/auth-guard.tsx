"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { initializeAuth } = useAuthStore()
  const pathname = usePathname()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  // Don't show bottom navigation on login page
  const showBottomNav = pathname !== "/"

  return <>{children}</>
}
