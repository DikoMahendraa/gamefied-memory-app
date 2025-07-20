// Static game data - in a real app, this would come from an API or database

interface GameCard {
  question: string;
  answer: string;
  hint?: string;
}

interface GameData {
  id: string;
  title: string;
  description: string;
  cards: GameCard[];
}

const gameData: Record<string, GameData> = {
  "basic-english": {
    id: "basic-english",
    title: "Basic English Vocabulary",
    description: "Learn fundamental English words and their meanings",
    cards: [
      {
        question: "What is the opposite of 'hot'?",
        answer: "cold",
        hint: "Think about temperature",
      },
      {
        question: "What do you call a large body of water surrounded by land?",
        answer: "lake",
        hint: "It's smaller than an ocean",
      },
      {
        question: "What is the past tense of 'go'?",
        answer: "went",
        hint: "It's an irregular verb",
      },
      {
        question: "What do you call the meal you eat in the morning?",
        answer: "breakfast",
        hint: "It 'breaks' your overnight 'fast'",
      },
      {
        question: "What is the plural of 'child'?",
        answer: "children",
        hint: "It's an irregular plural",
      },
    ],
  },
  "japanese-hiragana": {
    id: "japanese-hiragana",
    title: "Japanese Hiragana",
    description: "Learn basic Japanese hiragana characters",
    cards: [
      {
        question: "What is the hiragana for 'a'?",
        answer: "あ",
        hint: "First character in the hiragana chart",
      },
      {
        question: "What is the hiragana for 'ka'?",
        answer: "か",
        hint: "Starts with the 'k' sound",
      },
      {
        question: "What is the hiragana for 'sa'?",
        answer: "さ",
        hint: "Starts with the 's' sound",
      },
      {
        question: "What is the hiragana for 'ta'?",
        answer: "た",
        hint: "Starts with the 't' sound",
      },
      {
        question: "What is the hiragana for 'na'?",
        answer: "な",
        hint: "Starts with the 'n' sound",
      },
    ],
  },
  "memory-challenge": {
    id: "memory-challenge",
    title: "Memory Challenge",
    description: "Test your memory with number sequences and patterns",
    cards: [
      {
        question: "Remember this sequence: 2, 4, 6, 8, ?",
        answer: "10",
        hint: "Even numbers in order",
      },
      {
        question: "What comes next: A, C, E, G, ?",
        answer: "I",
        hint: "Skip one letter each time",
      },
      {
        question: "Complete the pattern: 1, 1, 2, 3, 5, ?",
        answer: "8",
        hint: "Each number is the sum of the two before it",
      },
      {
        question: "What's missing: Red, Orange, Yellow, ?, Blue",
        answer: "Green",
        hint: "Colors of the rainbow",
      },
      {
        question: "Continue: 100, 50, 25, 12.5, ?",
        answer: "6.25",
        hint: "Each number is half the previous",
      },
    ],
  },
};

export function getGameData(gameId: string): GameData | null {
  return gameData[gameId] || null;
}

export function getAllGames(): GameData[] {
  return Object.values(gameData);
}

// Commented Supabase integration functions
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fetchGameData(gameId: string) {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .single()
  
  if (error) {
    console.error('Error fetching game data:', error)
    return null
  }
  
  return data
}

export async function fetchAllGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (error) {
    console.error('Error fetching games:', error)
    return []
  }
  
  return data
}

export async function saveGameResult(result: GameResult) {
  const { data, error } = await supabase
    .from('game_results')
    .insert([result])
  
  if (error) {
    console.error('Error saving game result:', error)
    return false
  }
  
  return true
}
*/
