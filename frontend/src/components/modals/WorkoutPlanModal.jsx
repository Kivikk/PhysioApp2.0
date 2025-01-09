// components/modals/WorkoutPlanModal.jsx
import React from 'react';
import { images } from '../../utils/imageImports';
import CloseHeader from '../navigation/CloseHeader';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const WorkoutPlanModal = ({
  isOpen,
  onClose,
  plan
}) => {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-physio-chocolate bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-physio-cream rounded-lg shadow-xl max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 bg-physio-cream/90 p-4 border-b border-physio-mocha/20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-physio-chocolate">
              {plan.title}
            </h2>
            <div className="bg-physio-cream/90 hover:bg-physio-cream rounded-full">
              <CloseHeader onClose={onClose} />
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.exercises.map((exercise, index) => {
            const backgroundColorClass = exercise.category.length > 0
              ? categoryColorMap[exercise.category[0]]
              : defaultCategoryColor;

            return (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`relative ${backgroundColorClass}`}>
                  <div className="w-full h-64">
                    <img
                      src={images[exercise.image]}
                      alt={exercise.title || "Übung"}
                      className="w-full h-full object-contain scale-150"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                    {exercise.category.map((cat, catIndex) => (
                      <span
                        key={catIndex}
                        className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium text-physio-chocolate">
                    {exercise.title || `${exercise.category[0]} Übung`}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanModal;