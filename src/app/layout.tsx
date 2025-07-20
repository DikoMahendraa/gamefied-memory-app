import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/query-provider";
import AuthGuard from "@/components/auth/auth-guard";
import BottomNavigation from "@/components/navigation/bottom-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory Cards - Learn with Interactive Games",
  description: "Challenge your memory with interactive card games",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthGuard>
              <div className="min-h-screen bg-background">
                <main className="pb-16">{children}</main>
                <BottomNavigation />
              </div>
            </AuthGuard>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
