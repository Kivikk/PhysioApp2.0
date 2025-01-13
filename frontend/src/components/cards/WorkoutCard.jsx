import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ZoomIn, Plus } from 'lucide-react';
import { images } from '../../utils/imageImports';
import { useFavorites } from '../../hooks/useFavorites';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const WorkoutCard = ({ exercise, showDetails = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [isHeartHovered, setIsHeartHovered] = useState(false);

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

  const getCategoryColor = (categories) => {
    if (categories && categories.length > 0) {
      return categoryColorMap[categories[0]] || defaultCategoryColor;
    }
    return defaultCategoryColor;
  };

  const backgroundColorClass = getCategoryColor(category);

  return (
    <div
      onClick={showDetails ? undefined : handleCardClick}
      className="bg-physio-cream rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className={`relative h-64 ${backgroundColorClass}`}>
        <img
          src={images[image] || images['PlaceholderPhysioApp.svg']}
          alt={title}
          className="w-full h-full object-contain scale-150"
          onError={(e) => {
            e.target.src = images['PlaceholderPhysioApp.svg'];
          }}
        />
        <div className="absolute top-2 right-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/error');
            }}
            className="p-2 bg-physio-cream/90 hover:bg-physio-cream rounded-full transition-all duration-200 hover:scale-110 relative group"
          >
            <Plus className="w-6 h-6 text-physio-terrakotta" />
            <span className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-physio-cream">
              Zum Plan
            </span>
          </button>

          {showDetails ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(e);
              }}
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              className="p-2 bg-physio-cream/90 hover:bg-physio-cream rounded-full transition-all duration-200 hover:scale-110 relative group"
            >
              <Heart className={`w-6 h-6 text-physio-terrakotta ${isFavorite ? 'fill-current' : ''}`} />
              <span className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-physio-cream">
                Entfernen
              </span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(e);
              }}
              className="p-2 bg-physio-cream/90 hover:bg-physio-cream rounded-full transition-all duration-200 hover:scale-110"
            >
              <Heart className="w-6 h-6 text-physio-terrakotta" />
            </button>
          )}
        </div>

        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          {Array.isArray(category) && category.map((cat, index) => (
            <span
              key={`${_id}-${cat}-${index}`}
              className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
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



        <div className="flex justify-center mt-6">
          <button
            onClick={handleCardClick}
            className=" text-physio-mocha hover:text-physio-safari rounded-full transition-colors duration-200"
          >
            <ZoomIn className="w-12 h-12" />
          </button>
        </div>
      </div>
    </div>

  );
};

export default WorkoutCard;