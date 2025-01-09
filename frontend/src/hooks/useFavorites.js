import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import { getExerciseById } from '../services/api';

const STORAGE_KEY = 'physioapp_favorites';

export const useFavorites = () => {
  const { showToast } = useToast();
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return {};

      const parsedFavorites = JSON.parse(stored);

      const validFavorites = Object.entries(parsedFavorites).reduce((acc, [id, value]) => {
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
          console.warn(`Invalid favorite entry removed: ${id}`);
        }
        return acc;
      }, {});


      if (Object.keys(validFavorites).length !== Object.keys(parsedFavorites).length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validFavorites));
        showToast('Ungültige Favoriten wurden entfernt', {
          type: 'info',
          duration: 3000
        });
      }

      // Bei der Initialisierung bereits ein Event auslösen
      setTimeout(() => {
        emitFavoritesUpdate(validFavorites);
      }, 0);

      return validFavorites;
    } catch (error) {
      console.error('Error initializing favorites:', error);
      showToast('Fehler beim Laden der Favoriten', {
        type: 'error',
        duration: 5000
      });
      return {};
    }
  });


  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newFavorites = JSON.parse(e.newValue) || {};
          setFavorites(newFavorites);
        } catch (error) {
          console.error('Error handling storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      const currentFavoritesString = JSON.stringify(favorites);

      if (storedFavorites !== currentFavoritesString) {
        localStorage.setItem(STORAGE_KEY, currentFavoritesString);
        console.log('Favorites synchronized with localStorage:', favorites);
      }
    } catch (error) {
      console.error('Error synchronizing favorites:', error);
    }
  }, [favorites]);


  // Neue Funktion für Event-Emission
  const emitFavoritesUpdate = useCallback((updatedFavorites) => {
    const event = new CustomEvent('favoritesUpdated', {
      detail: {
        favorites: updatedFavorites,
        count: Object.keys(updatedFavorites).length,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);
  }, []);

  const isFavorite = useCallback((exerciseId) => {
    return Boolean(favorites[exerciseId]);
  }, [favorites]);




  const removeFromFavorites = useCallback(async (exerciseId) => {
    try {
      // Aktuellen Stand aus localStorage holen
      const currentStorage = localStorage.getItem(STORAGE_KEY);
      const currentFavorites = currentStorage ? JSON.parse(currentStorage) : {};

      // Übung entfernen
      delete currentFavorites[exerciseId];

      // Synchrone Operationen in dieser Reihenfolge
      setFavorites(currentFavorites);  // React State aktualisieren
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFavorites));  // localStorage aktualisieren

      // Event mit aktualisierten Daten auslösen
      const event = new CustomEvent('favoritesUpdated', {
        detail: {
          favorites: currentFavorites,
          count: Object.keys(currentFavorites).length,
          timestamp: Date.now(),
          action: 'remove',
          id: exerciseId,
          source: 'removeFromFavorites'
        }
      });
      window.dispatchEvent(event);

      // Log für Debugging
      console.log('Removed from favorites:', {
        exerciseId,
        currentStorageAfterRemove: localStorage.getItem(STORAGE_KEY),
        remainingFavorites: currentFavorites
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

      const updatedFavorites = {
        ...favorites,
        [exerciseId]: exerciseWithId
      };

      // Erst State aktualisieren
      setFavorites(updatedFavorites);

      // Dann localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

      // Dann Event auslösen
      emitFavoritesUpdate(updatedFavorites);

      showToast('Übung erfolgreich zu Favoriten hinzugefügt', {
        type: 'success',
        duration: 3000
      });

      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  }, [favorites, showToast, emitFavoritesUpdate]);



  const toggleFavorite = useCallback(async (exerciseId) => {
    try {
      console.log('Toggle favorite for exercise:', exerciseId);
      console.log('Current favorites state:', favorites);

      if (favorites[exerciseId]) {
        console.log('Removing from favorites...');
        return await removeFromFavorites(exerciseId);
      } else {
        console.log('Adding to favorites...');
        const result = await getExerciseById(exerciseId);

        if (result.success) {
          return await addToFavorites(exerciseId, result.data);
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
  }, [favorites, removeFromFavorites, addToFavorites, showToast]);



  const getFavoriteExercises = useCallback(async () => {
    // Erstelle eine Map für Request-Tracking
    const requestMap = new Map();
    const favoriteIds = Object.keys(favorites);

    try {
      // Verarbeite jede ID nur einmal
      for (const id of favoriteIds) {
        if (!requestMap.has(id)) {
          const result = await getExerciseById(id);
          if (result.success) {
            requestMap.set(id, result.data);
          }
        }
      }

      // Konvertiere Map zu Array
      return Array.from(requestMap.values());
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