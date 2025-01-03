import React from 'react';
import WorkoutCard from '../components/cards/WorkoutCard';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesPage = () => {
  const { getFavoriteExercises, removeFromFavorites } = useFavorites();
  const favorites = getFavoriteExercises();

  const handleFavoriteChange = (newFavoriteState, exerciseId) => {
    if (!newFavoriteState) {
      removeFromFavorites(exerciseId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-physio-chocolate mb-6">
        Meine Favoriten
      </h1>

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
  );
};

export default FavoritesPage;