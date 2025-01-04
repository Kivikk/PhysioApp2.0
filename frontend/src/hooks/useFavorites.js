import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const STORAGE_KEY = 'physioapp_favorites';

export const useFavorites = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      showToast('Fehler beim Laden der Favoriten', {
        type: 'error',
        duration: 5000
      });
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      showToast('Fehler beim Speichern der Favoriten', {
        type: 'error',
        duration: 5000
      });
    }
  }, [favorites, showToast]);

  const addToFavorites = useCallback(async (exerciseId, exerciseData) => {
    try {
      if (favorites[exerciseId]) {
        showToast('Diese Übung ist bereits in deinen Favoriten', {
          type: 'info',
          duration: 3000
        });
        return false;
      }

      setFavorites(prev => ({
        ...prev,
        [exerciseId]: exerciseData
      }));

      showToast('Übung erfolgreich zu Favoriten hinzugefügt', {
        type: 'success',
        duration: 3000
      });

      navigate('/favorites');
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      showToast('Fehler beim Hinzufügen zu Favoriten', {
        type: 'error',
        duration: 5000
      });
      return false;
    }
  }, [favorites, navigate, showToast]);

  const removeFromFavorites = useCallback((exerciseId) => {
    try {
      setFavorites(prev => {
        const { [exerciseId]: removed, ...rest } = prev;
        return rest;
      });

      showToast('Übung erfolgreich aus Favoriten entfernt', {
        type: 'success',
        duration: 3000
      });
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      showToast('Fehler beim Entfernen aus Favoriten', {
        type: 'error',
        duration: 5000
      });
      return false;
    }
  }, [showToast]);

  const isFavorite = useCallback((exerciseId) => {
    return Boolean(favorites[exerciseId]);
  }, [favorites]);

  const getFavoriteExercises = useCallback(() => {
    return Object.values(favorites);
  }, [favorites]);

  const getFavoriteCount = useCallback(() => {
    return Object.keys(favorites).length;
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteExercises,
    getFavoriteCount
  };
};