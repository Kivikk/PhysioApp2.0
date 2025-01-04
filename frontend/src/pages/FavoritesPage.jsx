// src/pages/FavoritesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/cards/WorkoutCard';
import { useFavorites } from '../hooks/useFavorites';
import { X } from '../utils/icons';

const FavoritesPage = () => {
  const { getFavoriteExercises, removeFromFavorites } = useFavorites();
  const favorites = getFavoriteExercises();
  const navigate = useNavigate();

  const handleFavoriteChange = (newFavoriteState, exerciseId) => {
    if (!newFavoriteState) {
      removeFromFavorites(exerciseId);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            Meine Favoriten
          </h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-physio-safari/60 rounded-full transition-colors"
            aria-label="Schließen"
          >
            <X className="w-6 h-6 text-physio-chocolate" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-physio-chocolate text-lg">
              Du hast noch keine Favoriten gespeichert.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((exercise) => (
              <WorkoutCard
                key={exercise.id}
                {...exercise}
                showDetails={true}
                onFavoriteChange={(newState) => handleFavoriteChange(newState, exercise.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;