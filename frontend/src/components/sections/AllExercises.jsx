// src/components/sections/AllExercises.jsx
import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllExercises } from '../../services/api/index.js';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';

const AllExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const result = await getAllExercises();

        if (!result || !result.success) {
          throw new Error(result?.error || 'Failed to fetch exercises');
        }

        setExercises(result.data);
      } catch (err) {
        setError(err.message);
        toast.error('Fehler beim Laden der Übungen');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] border border-dashed border-gray-300 rounded-lg">
        <Loader className="w-8 h-8 text-physio-mocha animate-spin" />
        <span className="ml-2">Laden...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Ein Fehler ist aufgetreten: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-physio-mocha text-white rounded-md hover:bg-physio-chocolate"
        >
          Neu laden
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-semibold text-physio-chocolate mb-6">
        Alle Übungen
      </h2>
      <div className="bg-physio-cream rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {exercises.map((exercise) => (
            <CompactWorkoutCard
              key={exercise._id}
              id={exercise._id}
              image={exercise.image}
              category={exercise.category}
              onClick={() => handleCardClick(exercise)}
            />
          ))}
        </div>
      </div>
      <ExerciseModal
        isOpen={selectedExercise !== null}
        onClose={handleCloseModal}
        {...selectedExercise}
      />
    </div>
  );
};

export default AllExercises;