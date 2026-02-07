'use client';

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Define logout function before useEffect to avoid hoisting issues
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(storedToken);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const isAuthenticated = !!user && !!token;

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
};