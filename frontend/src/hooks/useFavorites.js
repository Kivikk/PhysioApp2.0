import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import { getExerciseById } from '../services/api';

const STORAGE_KEY = 'physioapp_favorites';

export const useFavorites = () => {
  const { showToast } = useToast();
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsedFavorites = stored ? JSON.parse(stored) : {};

      // Ungültige IDs entfernen
      const cleanedFavorites = Object.entries(parsedFavorites).reduce((acc, [id, value]) => {
        // Erweiterte Validierung
        if (
          id &&
          id !== 'undefined' &&
          value &&
          typeof value === 'object' &&
          value._id &&
          value._id === id
        ) {
          acc[id] = value;
        } else {
          console.warn(`Invalid favorite entry removed: ID ${id}`);
        }
        return acc;
      }, {});

      // Counter initial setzen
      setFavoriteCount(Object.keys(cleanedFavorites).length);

      // Bereinigten Stand gleich im localStorage speichern
      if (Object.keys(cleanedFavorites).length !== Object.keys(parsedFavorites).length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedFavorites));
        showToast('Ungültige Favoriten wurden entfernt', {
          type: 'info',
          duration: 3000
        });
      }

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

  const isFavorite = useCallback((exerciseId) => {
    return Boolean(favorites[exerciseId]);
  }, [favorites]);

  const removeFromFavorites = useCallback((exerciseId) => {
    try {
      // Erst den aktuellen Stand aus dem localStorage holen
      const currentStorage = localStorage.getItem(STORAGE_KEY);
      const currentFavorites = currentStorage ? JSON.parse(currentStorage) : {};

      // Exercise aus den Favoriten entfernen
      delete currentFavorites[exerciseId];

      // Neuen Stand im localStorage speichern
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFavorites));

      // State aktualisieren
      setFavorites(currentFavorites);

      // Event triggern für Header-Update
      window.dispatchEvent(new Event('favoritesUpdated'));

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

      setFavorites(prev => {
        const newFavorites = {
          ...prev,
          [exerciseId]: exerciseWithId
        };

        // Update localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));

        // Update count
        setFavoriteCount(Object.keys(newFavorites).length);

        return newFavorites;
      });

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
        const success = removeFromFavorites(exerciseId);
        return !success; // Umkehrung des Rückgabewerts für den Toggle-Status
      } else {
        console.log('Exercise is not favorite, fetching from API...');
        const result = await getExerciseById(exerciseId);
        console.log('API fetch result:', result);

        if (result.success) {
          const success = await addToFavorites(exerciseId, result.data);
          return success;
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

  // Update FavoritesPage unmittelbar nach dem Entfernen
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

  // Getter für den Counter
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