import React from 'react';
import { images } from '../../utils/imageImports';
import { ChevronRight } from 'lucide-react';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const CompactWorkoutCard = ({ exercise, onClick = () => { } }) => {
  if (!exercise) {
    console.error('No exercise data provided to CompactWorkoutCard');
    return null;
  }

  const { image = 'PlaceholderPhysioApp.svg', category = [] } = exercise;

  const backgroundColorClass = category.length > 0
    ? categoryColorMap[category[0]]
    : defaultCategoryColor;

  return (
    <div
      onClick={() => onClick(exercise)}
      className="group bg-white rounded shadow-md overflow-hidden relative w-full cursor-pointer transition-all duration-200 hover:shadow-lg"
    >
      <div className={`relative ${backgroundColorClass} transition-all duration-200 group-hover:brightness-90`}>
        <div className="w-full h-48">
          <img
            src={images[image]}
            alt="Exercise illustration"
            className="w-full h-full object-contain scale-150"
            onError={(e) => {
              e.target.src = images['PlaceholderPhysioApp.svg'];
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/40 rounded-full p-2">
            <ChevronRight className="w-6 h-6 text-physio-chocolate" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactWorkoutCard;