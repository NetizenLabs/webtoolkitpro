'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SubscriptionContextType = {
  isLoggedIn: boolean;
  isPro: boolean;
  login: () => void;
  logout: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPro, setIsPro] = useState(false);

  // Load mock state from localStorage on mount
  useEffect(() => {
    try {
      const authState = localStorage.getItem('wtkpro_auth');
      if (authState === 'PRO') {
        setIsLoggedIn(true);
        setIsPro(true);
      } else if (authState === 'FREE') {
        setIsLoggedIn(true);
        setIsPro(false);
      }
    } catch (e) {
      console.error('Failed to load auth state:', e);
    }
  }, []);

  const login = () => {
    // Scaffold for actual Whop OAuth flow.
    // window.location.href = 'https://whop.com/oauth/...';
    
    // For local testing, we simulate a successful PRO login
    setIsLoggedIn(true);
    setIsPro(true);
    localStorage.setItem('wtkpro_auth', 'PRO');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsPro(false);
    localStorage.removeItem('wtkpro_auth');
  };

  return (
    <SubscriptionContext.Provider value={{ isLoggedIn, isPro, login, logout }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
