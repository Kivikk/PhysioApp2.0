import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';
import { getAllExercises } from '../../services/api/index.js';

const CategoryExercises = () => {
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

  // Übungen nach Kategorien gruppieren
  const exercisesByCategory = exercises.reduce((acc, exercise) => {
    // erste Kategorie für die Gruppierung
    const primaryCategory = exercise.category[0];
    if (!acc[primaryCategory]) {
      acc[primaryCategory] = [];
    }
    acc[primaryCategory].push({
      ...exercise,
      // Anzeige aller Kategorien auf der Karte
      allCategories: exercise.category
    });
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-semibold text-physio-chocolate mb-4 text-left">
        Übungskarten nach Kategorien
      </h2>
      <div className="space-y-8">
        {Object.entries(exercisesByCategory).map(([category, categoryExercises]) => (
          <div key={category} className="bg-physio-cream rounded-lg shadow-md p-4">
            <h3 className="text-xl font-medium text-physio-chocolate mb-4 text-left">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {categoryExercises.map((exercise) => (
                <CompactWorkoutCard
                  key={exercise._id}
                  exercise={exercise}
                  onClick={() => handleCardClick(exercise)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <ExerciseModal
        isOpen={selectedExercise !== null}
        onClose={handleCloseModal}
        {...selectedExercise}
      />
    </div>
  );
};

export default CategoryExercises;