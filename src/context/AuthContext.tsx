// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient(API.AUTH_SESSION, {
          method: 'GET',
        });
        if (res.ok) {
          const result = await res.json();
          if (result.isAuthenticated) {
            setUser(result.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        console.log('Catch and the Loading:', loading);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch(API.LOGOUT, {
        method: 'POST',
        credentials: 'include', //  ensure cookies are sent so server can clear them
      });

      setUser(null);
      window.location.href = '/auth/login';
    } catch {
      toast.error('Something went wrong and unable to logout');
    }
  };

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
