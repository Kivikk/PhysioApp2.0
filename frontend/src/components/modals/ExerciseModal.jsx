// src/components/modals/ExerciseModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ZoomIn } from 'lucide-react';
import { images } from '../../utils/imageImports';
import CloseHeader from '../navigation/CloseHeader';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';
import { useFavorites } from '../../hooks/useFavorites';

const ExerciseModal = ({
  isOpen,
  onClose,
  _id,
  image = 'PlaceholderPhysioApp.svg',
  title = "Placeholder Title",
  category = [],
}) => {
  // States
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  // Hooks
  const { addToFavorites } = useFavorites();
  const navigate = useNavigate();

  // Early return
  if (!isOpen) return null;

  // Event Handler
  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (_id) {
      onClose();
      navigate(`/exercise/${_id}`);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      const success = await addToFavorites(_id, {
        _id,
        image,
        title,
        category
      });
      if (success) {
        onClose();
        navigate('/favorites');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const backgroundColorClass = category.length > 0
    ? categoryColorMap[category[0]]
    : defaultCategoryColor;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-physio-chocolate bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-physio-cream rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className={`relative ${backgroundColorClass}`}>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-4">

            <button
              onClick={handleDetailClick}
              className="bg-physio-cream/90 hover:bg-physio-cream rounded-full p-2 transition-all duration-200 hover:scale-110 relative group"
            >
              <ZoomIn className="w-6 h-6 text-physio-terrakotta" />
              <span className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-physio-cream">
                Details
              </span>
            </button>

            <button
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              onClick={handleFavoriteClick}
              className="bg-physio-cream/90 hover:bg-physio-cream rounded-full p-2 transition-all duration-200 hover:scale-110 relative group"
            >
              <Heart
                className={`w-6 h-6 text-physio-terrakotta ${isHeartHovered ? 'fill-current' : ''}`}
              />
              <span className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-physio-cream">
                Favoriten
              </span>
            </button>

            <div className="bg-physio-cream/90 hover:bg-physio-cream rounded-full">
              <CloseHeader onClose={onClose} />
            </div>
          </div>

          <div className="w-full h-64">
            <img
              src={images[image]}
              alt={title}
              className="w-full h-full object-contain scale-200"
            />
          </div>
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
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-physio-chocolate">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;