import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/cards/WorkoutCard';
import { useFavorites } from '../hooks/useFavorites';
import CloseHeader from '../components/navigation/CloseHeader';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getFavoriteExercises, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      const exercises = await getFavoriteExercises();
      setFavorites(exercises);
      setIsLoading(false);
    };
    loadFavorites();
  }, [getFavoriteExercises]);

  const handleFavoriteChange = (newFavoriteState, exerciseId) => {
    if (!newFavoriteState) {
      removeFromFavorites(exerciseId);
      // Sofortige lokale UI-Aktualisierung
      setFavorites(currentFavorites =>
        currentFavorites.filter(exercise => exercise._id !== exerciseId)
      );
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Lädt Favoriten...</div>;
  }

  return (
    <div>
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            Meine Favoriten
          </h1>


          <div className="bg-physio-cream/90 hover:bg-physio-cream rounded-full">
            <CloseHeader onClose={() => navigate('/')} />
          </div>
        </div>
      </div>

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
                key={exercise._id}
                exercise={exercise}
                showDetails={true}
                onFavoriteChange={(newState) =>
                  handleFavoriteChange(newState, exercise._id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;