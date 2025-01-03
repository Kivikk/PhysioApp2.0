import React, { useState } from 'react';
import { Heart, Clock } from 'lucide-react';
import { images } from '../../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';
import { useFavorites } from '../../hooks/useFavorites';

const WorkoutCard = ({
  id,
  image = 'PlaceholderPhysioApp.svg',
  title = "Placeholder Title",
  showDetails = true,
  startingPosition = [],
  execution = [],
  endPosition = [],
  repetitions = "N/A",
  note = "N/A",
  isWorkoutPlan = false,
  category = [],
  onFavoriteChange
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite } = useFavorites();
  const isInFavorites = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isInFavorites && onFavoriteChange) {
      onFavoriteChange(false);
    }
  };

  const backgroundColorClass = category.length > 0
    ? categoryColorMap[category[0]]
    : defaultCategoryColor;

  return (
    <div className="bg-physio-cream rounded shadow-md overflow-hidden relative w-full max-w-md mx-auto">
      <div className={`relative ${backgroundColorClass}`}>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          {category.map((cat, index) => (
            <span
              key={index}
              className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
            >
              {cat}
            </span>
          ))}
        </div>
        {isInFavorites && (
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 p-2 transition-transform duration-200 hover:scale-110"
          >
            <Heart
              className={`w-6 h-6 text-physio-terrakotta ${isHovered ? '' : 'fill-current'
                }`}
            />
          </button>
        )}

        <div className="w-full h-64">
          <img
            src={images[image]}
            alt={title}
            className="w-full h-full object-contain scale-150"
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-physio-chocolate text-left">
          {title}
        </h3>

        {showDetails && (
          <div className="mt-4 space-y-4">
            {startingPosition.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  Starting Position
                </h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {startingPosition.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {execution.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  Execution
                </h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {execution.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {endPosition.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  End Position
                </h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {endPosition.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">
                  Repetitions
                </h4>
                <p className="text-physio-amber text-left pl-4">{repetitions}</p>
              </div>
              {note !== "N/A" && (
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
      </div>
    </div>
  );
};

export default WorkoutCard;