import React, { useState } from 'react';
import { Heart, Clock } from '../../utils/icons';
import { images } from '../../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';


const WorkoutCard = ({
  image = 'PlaceholderPhysioApp.svg',
  title = "Placeholder Title",
  showDetails = true,
  startingPosition = [],
  execution = [],
  endPosition = [],
  repetitions = "N/A",
  note = "N/A",
  isFavorite: initialFavorite = false,
  isWorkoutPlan = false,
  category = [],
  onFavoriteChange = () => { },
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteChange(newFavoriteState);
  };

  const backgroundColorClass = category.length > 0
    ? categoryColorMap[category[0]]
    : defaultCategoryColor; // Fallback Farbe

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
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={handleFavoriteClick}
            className="transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-6 w-6 ${isFavorite
                ? "text-physio-terrakotta fill-current"
                : "text-physio-terrakotta hover:fill-current"
                }`}
            />
          </button>
          {isWorkoutPlan && (
            <Clock className="h-6 w-6 text-physio-sage" />
          )}
        </div>

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