import React, { createContext, useContext, useState, useEffect } from 'react';
import { favoritesAPI } from '../services/apiService';

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверка авторизации и загрузка избранного
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    if (token) {
      loadFavorites();
    } else {
      // Если не авторизован, загружаем из localStorage
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (err) {
          console.error('Error loading favorites:', err);
        }
      }
    }
  }, []);

  // Сохранение в localStorage для неавторизованных пользователей
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await favoritesAPI.get();
      
      if (response.success) {
        // API возвращает массив favorites с вложенным product
        const favoritesData = response.data.map(fav => fav.product || fav);
        setFavorites(favoritesData);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (item) => {
    // Оптимистичное обновление UI
    setFavorites((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev;
      }
      return [...prev, item];
    });

    // Синхронизация с сервером для авторизованных пользователей
    if (isAuthenticated) {
      try {
        await favoritesAPI.add(item.id);
      } catch (error) {
        console.error('Error adding to favorites:', error);
        // Откат изменений при ошибке
        setFavorites((prev) => prev.filter((i) => i.id !== item.id));
      }
    }
  };

  const removeFavorite = async (id) => {
    // Оптимистичное обновление UI
    const previousFavorites = [...favorites];
    setFavorites((prev) => prev.filter((item) => item.id !== id));

    // Синхронизация с сервером для авторизованных пользователей
    if (isAuthenticated) {
      try {
        await favoritesAPI.remove(id);
      } catch (error) {
        console.error('Error removing from favorites:', error);
        // Откат изменений при ошибке
        setFavorites(previousFavorites);
      }
    }
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        totalFavorites,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
