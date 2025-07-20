import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  initializeAuth: () => void;
}

// Dummy users for demo
const dummyUsers: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        // In a real app, this would make an API call
        // For demo, accept any email/password combination
        const user: User = {
          id: Date.now().toString(),
          name:
            email.split("@")[0].charAt(0).toUpperCase() +
            email.split("@")[0].slice(1),
          email,
          createdAt: new Date().toISOString(),
        };

        set({ user, isAuthenticated: true });
        return true;
      },

      register: (name: string, email: string, password: string) => {
        // Check if user already exists (dummy check)
        const existingUser = dummyUsers.find((u) => u.email === email);
        if (existingUser) {
          return false;
        }

        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          createdAt: new Date().toISOString(),
        };

        // Add to dummy users
        dummyUsers.push(user);
        set({ user, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      initializeAuth: () => {
        // This would typically check for a valid token
        // For demo, we rely on persisted state
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Commented Supabase integration functions
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabaseAuth = {
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}
*/
