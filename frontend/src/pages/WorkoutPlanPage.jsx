// src/pages/WorkoutPlanPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { workoutPlans } from '../components/sections/WorkoutPlans';
import { getAllExercises } from '../services/api/index.js';
import CloseHeader from '../components/navigation/CloseHeader';
import { images } from '../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../utils/categoryColors';

const WorkoutPlanPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedPlan = workoutPlans.find(plan => plan.id === planId);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!selectedPlan) {
        setError('Plan nicht gefunden');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getAllExercises();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch exercises');
        }

        const planExercises = selectedPlan.exercises.map(planExercise => {
          const fullExercise = result.data.find(e => e.image === planExercise.image);
          return fullExercise;
        }).filter(Boolean);

        setExercises(planExercises);
      } catch (err) {
        setError(err.message);
        toast.error('Fehler beim Laden der Übungen');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedPlan]);

  const handleExerciseClick = (exercise) => {
    navigate(`/workout-plan/${planId}/exercise/${exercise._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] border border-dashed border-gray-300 rounded-lg">
        <Loader className="w-8 h-8 text-physio-mocha animate-spin" />
        <span className="ml-2">Laden...</span>
      </div>
    );
  }

  if (error || !selectedPlan) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          {error || 'Plan nicht gefunden'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-physio-cream/80">
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            {selectedPlan.title}
          </h1>
          <div>
            <CloseHeader onClose={() => navigate('/')} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div
              key={exercise._id}
              onClick={() => handleExerciseClick(exercise)}
              className="group bg-physio-cream rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center p-4">
                <div className={`w-32 h-32 rounded overflow-hidden ${categoryColorMap[exercise.category[0]] || defaultCategoryColor}`}>
                  <img
                    src={images[exercise.image]}
                    alt={exercise.title}
                    className="w-full h-full object-contain scale-150"
                    onError={(e) => {
                      e.target.src = images['PlaceholderPhysioApp.svg'];
                    }}
                  />
                </div>

                <div className="flex-1 ml-6">
                  <h3 className="text-xl font-medium text-physio-chocolate mb-2">
                    {exercise.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.category.map((cat, index) => (
                      <span
                        key={`${exercise._id}-${cat}-${index}`}
                        className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-physio-cream/40 rounded-full p-2">
                    <ChevronRight className="w-6 h-6 text-physio-chocolate" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanPage;