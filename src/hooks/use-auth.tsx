"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "@/lib/types";
import { useLocalStorage } from "./use-local-storage";

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  signup: (username: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    "currentUser",
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  const login = (username: string) => {
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      setCurrentUser(userExists);
      return userExists;
    }
    return null;
  };

  const signup = (username: string) => {
    const userExists = users.find((u) => u.username === username);
    if (!userExists) {
      const newUser: User = { id: `user-${Date.now()}`, username };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      return newUser;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = { user: currentUser, login, logout, signup, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
