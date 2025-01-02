import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { images } from '../../utils/imageImports';
import CloseHeader from '../navigation/CloseHeader';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const ExerciseModal = ({
  isOpen,
  onClose,
  image,
  title = "Übung",
  category = [],
  initialFavorite = false
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  if (!isOpen) return null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const backgroundColorClass = category.length > 0
    ? categoryColorMap[category[0]]
    : defaultCategoryColor;

  const CustomCloseHeader = () => (
    <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
      <button
        onClick={handleFavoriteClick}
        className="bg-physio-cream/90 hover:bg-physio-cream rounded-full p-2 
                   transition-all duration-200 hover:scale-110"
      >
        <Heart
          className={`w-6 h-6 ${isFavorite
            ? "text-physio-terrakotta fill-current"
            : "text-physio-terrakotta hover:fill-current"
            }`}
        />
      </button>

      <div className="bg-physio-cream/90 hover:bg-physio-cream rounded-full">
        <CloseHeader onClose={onClose} />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-physio-chocolate bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-physio-cream rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className={`relative ${backgroundColorClass}`}>
          <CustomCloseHeader />

          {/* Image */}
          <div className="w-full h-64">
            <img
              src={images[image]}
              alt={title}
              className="w-full h-full object-contain scale-150"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-physio-chocolate mb-6">
            {title}
          </h2>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-physio-sage text-white py-2 px-4 rounded
                       hover:bg-physio-sage/90 transition-colors duration-200"
            >
              Zum Übungsplan hinzufügen
            </button>
            <button
              className="flex-1 bg-physio-terrakotta text-white py-2 px-4 rounded
                       hover:bg-physio-terrakotta/90 transition-colors duration-200"
            >
              Persönliches Journal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;