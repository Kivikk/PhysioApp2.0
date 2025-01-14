// src/pages/WorkoutPlanDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { workoutPlans } from '../data/workoutPlansData';
import { getAllExercises } from '../services/api';
import CloseHeader from '../components/navigation/CloseHeader';
import { images } from '../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../utils/categoryColors';

const WorkoutPlanDetails = () => {
  const { planId, exerciseId } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lade zuerst alle Übungen
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const result = await getAllExercises();
        if (result.success) {
          setAllExercises(result.data);
        }
      } catch (err) {
        console.error('Fehler beim Laden aller Übungen:', err);
      }
    };
    fetchAllExercises();
  }, []);

  // Finde spezifische Übung
  useEffect(() => {
    if (!exerciseId || !allExercises.length) return;

    const foundExercise = allExercises.find(e => e._id === exerciseId);
    if (foundExercise) {
      setExercise(foundExercise);
      setLoading(false);
    } else {
      setError('Übung nicht gefunden');
      setLoading(false);
    }
  }, [exerciseId, allExercises]);

  const selectedPlan = workoutPlans.find(plan => plan.id === planId);

  // Navigation zwischen Übungen
  const handleNavigation = (direction) => {
    if (!selectedPlan?.exercises || !exercise) return;

    // Debug der aktuellen Übung
    console.log('Current Exercise:', exercise.title);

    // Mehr Details zum Debug
    const matchingExercises = selectedPlan.exercises.map((e, idx) => ({
      index: idx,
      matches: e.title === exercise.title
    }));
    console.log('Matching exercises:', matchingExercises);

    // Exakter Vergleich mit dem Titel
    const currentPlanIndex = selectedPlan.exercises.findIndex(planExercise =>
      planExercise.title === exercise.title
    );

    // Debug des gefundenen Index
    console.log(`Found index for ${exercise.title}:`, currentPlanIndex);

    const newIndex = direction === 'next' ? currentPlanIndex + 1 : currentPlanIndex - 1;

    // Debug der Navigation
    console.log(`Navigation: ${currentPlanIndex} -> ${newIndex} (Total exercises: ${selectedPlan.exercises.length})`);

    if (newIndex >= 0 && newIndex < selectedPlan.exercises.length) {
      const nextPlanExercise = selectedPlan.exercises[newIndex];

      // Debug der nächsten Übung
      console.log('Next exercise from plan:', nextPlanExercise.title);

      const nextExercise = allExercises.find(e =>
        e.title === nextPlanExercise.title
      );

      if (nextExercise) {
        console.log('Found matching exercise in DB:', nextExercise.title);
        navigate(`/workout-plan/${planId}/exercise/${nextExercise._id}`);
      }
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] border border-dashed border-gray-300 rounded-lg">
        <Loader className="w-8 h-8 text-physio-mocha animate-spin" />
        <span className="ml-2">Laden...</span>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Übung nicht gefunden'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-physio-cream/80">
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            {exercise.title}
          </h1>
          <div>
            <CloseHeader onClose={() => navigate(`/workout-plan/${planId}`)} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-physio-cream rounded-lg shadow-md overflow-hidden">
          <div className={`relative h-96 ${categoryColorMap[exercise.category[0]] || defaultCategoryColor}`}>
            <img
              src={images[exercise.image]}
              alt={exercise.title}
              className="w-full h-full object-contain scale-175 "
              onError={(e) => {
                e.target.src = images['PlaceholderPhysioApp.svg'];
              }}
            />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {exercise.category.map((cat, index) => (
                <span
                  key={index}
                  className="text-sm px-2 py-1 rounded bg-white/40 text-physio-chocolate"
                >
                  {cat}
                </span>
              ))}
            </div>

            {exercise.startingPosition?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-physio-mocha mb-2">Ausgangsposition</h3>
                <ul className="list-none pl-4 space-y-2">
                  {exercise.startingPosition.map((step, index) => (
                    <li key={index} className="text-physio-amber">{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {exercise.execution?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-physio-mocha mb-2">Ausführung</h3>
                <ul className="list-none pl-4 space-y-2">
                  {exercise.execution.map((step, index) => (
                    <li key={index} className="text-physio-amber">{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {exercise.endPosition?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-physio-mocha mb-2">Endposition</h3>
                <ul className="list-none pl-4 space-y-2">
                  {exercise.endPosition.map((step, index) => (
                    <li key={index} className="text-physio-amber">{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {exercise.repetitions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-physio-mocha mb-2">Wiederholungen</h3>
                <p className="text-physio-amber pl-4">{exercise.repetitions}</p>
              </div>
            )}

            {exercise.note && exercise.note !== "N/A" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-physio-mocha mb-2">Hinweis</h3>
                <p className="text-physio-amber pl-4">{exercise.note}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleNavigation('prev')}
            className="p-2 rounded-full bg-white/40 text-physio-chocolate hover:bg-physio-cream"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="p-2 rounded-full bg-white/40 text-physio-chocolate hover:bg-physio-cream"
          >
            <ChevronRight className="w-6 h-6  text-physio-chocolate" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanDetails;