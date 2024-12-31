import React, { useState } from 'react';
import { Heart, Clock } from '../../utils/icons';
import { images } from '../../utils/imageImports';

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
  onFavoriteChange = () => { },
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteChange(newFavoriteState);
  };

  return (
    <div className="bg-white rounded shadow-md overflow-hidden relative w-full max-w-md mx-auto">
      <div className="relative bg-physio-olive">
        <div className="absolute top-2 right-2 p-2 z-10 pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            <button
              onClick={handleFavoriteClick}
              className="transition-transform duration-200 hover:scale-110 focus:outline-none"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-6 w-6 ${isFavorite
                  ? "text-physio-tan fill-current"
                  : "text-physio-tan hover:fill-current"
                  }`}
              />
            </button>
            {isWorkoutPlan && <Clock className="h-6 w-6 text-physio-sage" />}
          </div>
        </div>
        <div className="relative">
          <div className="w-full h-96  ">
            <img
              src={images[image]}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold text-physio-chocolate text-left uppercase">{title}</h3>

        {showDetails && (
          <div className="mt-4 space-y-4">
            {startingPosition.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">Starting Position</h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {startingPosition.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {execution.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">Execution</h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {execution.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {endPosition.length > 0 && (
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">End Position</h4>
                <ul className="pl-4 text-physio-amber text-left list-none">
                  {endPosition.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <div>
                <h4 className="font-medium text-physio-mocha text-left uppercase">Repetitions</h4>
                <p className="text-physio-amber text-left pl-4">{repetitions}</p>
              </div>
              {note !== "N/A" && (
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">Note</h4>
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