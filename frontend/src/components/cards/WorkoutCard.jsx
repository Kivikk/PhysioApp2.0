import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

const WorkoutCard = ({ exercise }) => {
  const { isFavorite, toggleFavorite } = useFavorites();


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


  const getCategoryColor = (categoryName) => {
    const colors = {
      'Arms': 'bg-physio-terrakotta',
      'Legs': 'bg-physio-sage',
      'Hip': 'bg-physio-bluegray',
      'Shoulders': 'bg-physio-Petrol',
      'Back': 'bg-physio-mocha',
      'Core': 'bg-physio-olive'
    };
    return colors[categoryName] || 'bg-physio-cream';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">

      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => toggleFavorite(_id)}
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

        {/* Titel */}
        <h3 className="text-xl font-bold mb-2 text-physio-chocolate">{title}</h3>


        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {startingPosition[0]}
            {startingPosition.length > 1 && '...'}
          </p>
        </div>


        <p className="text-sm text-physio-mocha mb-4">{repetitions}</p>


        <Link
          to={`/exercise/${_id}`}
          className="inline-block px-4 py-2 bg-physio-cream text-physio-chocolate rounded-md hover:bg-physio-tan transition-colors duration-200"
        >
          Details anzeigen
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;