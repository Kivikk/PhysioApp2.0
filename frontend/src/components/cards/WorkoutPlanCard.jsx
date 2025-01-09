// src/components/cards/WorkoutPlanCard.jsx
import React from 'react';
import { images } from '../../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const WorkoutPlanCard = ({ exercise }) => {
  if (!exercise || !exercise._id) {
    console.error('Invalid exercise data provided');
    return null;
  }

  const {
    title,
    category,
    startingPosition,
    execution,
    endPosition,
    repetitions,
    note,
    image
  } = exercise;

  const getCategoryColor = (categories) => {
    if (categories && categories.length > 0) {
      return categoryColorMap[categories[0]] || defaultCategoryColor;
    }
    return defaultCategoryColor;
  };

  const backgroundColorClass = getCategoryColor(category);

  return (
    <div className="bg-physio-cream rounded-lg shadow-md overflow-hidden">
      <div className={`relative h-64 ${backgroundColorClass}`}>
        <img
          src={images[image] || images['PlaceholderPhysioApp.svg']}
          alt={title}
          className="w-full h-full object-contain scale-150"
          onError={(e) => {
            e.target.src = images['PlaceholderPhysioApp.svg'];
          }}
        />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          {Array.isArray(category) && category.map((cat, index) => (
            <span
              key={`${cat}-${index}`}
              className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-physio-chocolate">{title}</h3>

        <div className="mt-4 space-y-4">
          {startingPosition?.length > 0 && (
            <div>
              <h4 className="font-medium text-physio-mocha text-left uppercase">
                Starting Position
              </h4>
              <ul className="pl-4 text-physio-amber text-left list-none">
                {startingPosition.map((step, index) => (
                  <li key={`start-${index}`}>{step}</li>
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
                  <li key={`exec-${index}`}>{step}</li>
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
                  <li key={`end-${index}`}>{step}</li>
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
      </div>
    </div>
  );
};

export default WorkoutPlanCard;