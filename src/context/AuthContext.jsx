import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/apiService';
import { getTelegramUser, getTelegramInitData, isTelegramWebApp } from '../utils/telegram';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверка токена и авторизация при загрузке
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Проверяем локальное хранилище
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      // Если запущено в Telegram - пытаемся авторизоваться через Telegram
      if (isTelegramWebApp()) {
        const initData = getTelegramInitData();
        const tgUser = getTelegramUser();
        
        if (initData && tgUser) {
          console.log('🔐 Telegram user detected:', tgUser);
          
          // Авторизуемся через Telegram
          const result = await loginWithTelegram(initData);
          
          if (result.success) {
            setLoading(false);
            return;
          }
        }
      }

      // Если есть сохранённый токен - проверяем его
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Проверяем валидность токена
        try {
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        } catch (err) {
          console.log('Token invalid, clearing...');
          logout();
        }
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Авторизация через Telegram
  const loginWithTelegram = async (initData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📱 Logging in with Telegram...');
      
      const response = await authAPI.loginWithTelegram(initData);
      
      if (response.success) {
        const { token, user } = response.data;
        
        setToken(token);
        setUser(user);
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('✅ Telegram login successful:', user);
        
        return { success: true };
      } else {
        throw new Error(response.message || 'Ошибка авторизации');
      }
    } catch (err) {
      const errorMessage = err.message || 'Не удалось авторизоваться через Telegram';
      setError(errorMessage);
      console.error('❌ Telegram login error:', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Обновить данные пользователя
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    error,
    loginWithTelegram,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isTelegramUser: isTelegramWebApp(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}