// src/components/cards/WorkoutCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { images } from '../../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';
import { useFavorites } from '../../hooks/useFavorites';

const WorkoutCard = ({ exercise }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(_id);
  };

  const handleCardClick = () => {
    navigate(`/exercise/${_id}`);
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Arms': 'bg-physio-terrakotta',
      'Legs': 'bg-physio-sage',
      'Hip': 'bg-physio-bluegray',
      'Shoulder': 'bg-physio-Petrol',
      'Back': 'bg-physio-mocha',
      'Core': 'bg-physio-olive'
    };
    return colors[categoryName] || 'bg-physio-cream';
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
        />
        <button
          onClick={handleFavoriteClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          {category.map((cat, index) => (
            <span
              key={index}
              className={`inline-block px-3 py-1 rounded-full text-sm text-white ${getCategoryColor(cat)}`}
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 text-physio-chocolate">{title}</h3>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {startingPosition[0]}
            {startingPosition.length > 1 && '...'}
          </p>
        </div>

        <p className="text-sm text-physio-mocha mb-4">{repetitions}</p>

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