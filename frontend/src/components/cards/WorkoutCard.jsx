import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { images } from '../../utils/imageImports';
import { useFavorites } from '../../hooks/useFavorites';

const WorkoutCard = ({ exercise, showDetails = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  if (!exercise || !exercise._id) {
    console.error('Invalid exercise data provided');
    return null;
  }

  const {
    _id,
    title,
    category,
    startingPosition,
    execution,
    endPosition,
    repetitions,
    note,
    image
  } = exercise;

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      await toggleFavorite(_id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCardClick = () => {
    navigate(`/exercise/${_id}`);
  };

  const getCategoryColor = (cat) => {
    const colors = {
      'Arms': 'bg-physio-terrakotta',
      'Legs': 'bg-physio-sage',
      'Hip': 'bg-physio-bluegray',
      'Shoulder': 'bg-physio-Petrol',
      'Back': 'bg-physio-mocha',
      'Core': 'bg-physio-olive'
    };
    return colors[cat] || 'bg-physio-cream';
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={images[image] || images['PlaceholderPhysioApp.svg']}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = images['PlaceholderPhysioApp.svg'];
          }}
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
        >
          <Heart
            size={20}
            className={isFavorite(_id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {Array.isArray(category) && category.map((cat, index) => (
            <span
              key={`${_id}-${cat}-${index}`}
              className={`inline-block px-3 py-1 rounded-full text-sm text-white ${getCategoryColor(cat)}`}
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 text-physio-chocolate">{title}</h3>

        {showDetails && (
          <div className="mt-4 space-y-4">
            {startingPosition?.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  Starting Position
                </h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {startingPosition.map((step, index) => (
                    <li key={`${_id}-start-${index}`}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {execution?.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  Execution
                </h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {execution.map((step, index) => (
                    <li key={`${_id}-exec-${index}`}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {endPosition?.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  End Position
                </h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {endPosition.map((step, index) => (
                    <li key={`${_id}-end-${index}`}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4">
              {repetitions && (
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">
                    Repetitions
                  </h4>
                  <p className="text-physio-amber text-left pl-4">{repetitions}</p>
                </div>
              )}

              {note && note !== "N/A" && (
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">
                    Note
                  </h4>
                  <p className="text-physio-amber text-left pl-4">{note}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleCardClick}
          className="inline-block w-full px-4 py-2 bg-physio-cream text-physio-chocolate rounded-md hover:bg-physio-tan transition-colors duration-200"
        >
          Details anzeigen
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
