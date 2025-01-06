// src/hooks/useFavorites.js

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { getExerciseById } from '../services/api';

const STORAGE_KEY = 'physioapp_favorites';

export const useFavorites = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsedFavorites = stored ? JSON.parse(stored) : {};

      // Ungültige IDs entfernen
      const cleanedFavorites = Object.entries(parsedFavorites).reduce((acc, [id, value]) => {
        if (id && id !== 'undefined' && value) {
          acc[id] = value;
        }
        return acc;
      }, {});

      return cleanedFavorites;
    } catch (error) {
      console.error('Error reading favorites:', error);
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

  const isFavorite = useCallback((exerciseId) => {
    return Boolean(favorites[exerciseId]);
  }, [favorites]);

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

  const addToFavorites = useCallback(async (exerciseId, exerciseData) => {
    try {
      if (!exerciseId || exerciseId === 'undefined') {
        console.error('Invalid exercise ID:', exerciseId);
        return false;
      }

      if (favorites[exerciseId]) {
        showToast('Diese Übung ist bereits in deinen Favoriten', {
          type: 'info',
          duration: 3000
        });
        return false;
      }

      const exerciseWithId = {
        _id: exerciseId,
        title: exerciseData.title,
        image: exerciseData.image,
        category: exerciseData.category,
        startingPosition: exerciseData.startingPosition || [],
        execution: exerciseData.execution || [],
        endPosition: exerciseData.endPosition || [],
        repetitions: exerciseData.repetitions || '',
        note: exerciseData.note || ''
      };

      setFavorites(prev => ({
        ...prev,
        [exerciseId]: exerciseWithId
      }));

      showToast('Übung erfolgreich zu Favoriten hinzugefügt', {
        type: 'success',
        duration: 3000
      });

      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  }, [favorites, showToast]);

  const toggleFavorite = useCallback(async (exerciseId) => {
    try {
      if (isFavorite(exerciseId)) {
        console.log('Exercise is already favorite, removing...');
        removeFromFavorites(exerciseId);
        return false;
      } else {
        console.log('Exercise is not favorite, fetching from API...');
        const result = await getExerciseById(exerciseId);
        console.log('API fetch result:', result);

        if (result.success) {
          await addToFavorites(exerciseId, result.data);
          return true;
        }
        throw new Error(`Übung konnte nicht geladen werden`);
      }
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      showToast('Fehler beim Aktualisieren der Favoriten', {
        type: 'error',
        duration: 5000
      });
      return false;
    }
  }, [isFavorite, removeFromFavorites, addToFavorites, showToast]);

  const getFavoriteExercises = useCallback(async () => {
    const favoriteIds = Object.keys(favorites);
    try {
      const exercisesPromises = favoriteIds.map(id => getExerciseById(id));
      const results = await Promise.all(exercisesPromises);
      return results
        .filter(result => result.success)
        .map(result => result.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  }, [favorites]);

  const getFavoriteCount = useCallback(() => {
    return Object.keys(favorites).length;
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteExercises,
    getFavoriteCount
  };
};