// src/pages/ExerciseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { images } from '../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../utils/categoryColors';
import { getExerciseById } from '../services/api';
import { useToast } from '../contexts/ToastContext';
import CloseHeader from '../components/navigation/CloseHeader';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExercise = async () => {
      try {
        const result = await getExerciseById(id);
        if (result.success) {
          setExercise(result.data);
        } else {
          throw new Error('Übung konnte nicht geladen werden');
        }
      } catch (error) {
        showToast('Fehler beim Laden der Übung', {
          type: 'error',
          duration: 5000
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadExercise();
  }, [id, showToast]);

  if (isLoading) {
    return <div className="text-center py-12">Lädt Übung...</div>;
  }

  if (!exercise) {
    return <div className="text-center py-12">Übung nicht gefunden</div>;
  }

  const backgroundColorClass = exercise.category?.length > 0
    ? categoryColorMap[exercise.category[0]]
    : defaultCategoryColor;

  return (
    <div className="min-h-screen bg-physio-cream/30">
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            {exercise.title}
          </h1>
          <div className="bg-physio-cream/90 hover:bg-physio-cream rounded-full">
            <CloseHeader />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-physio-cream rounded-lg shadow-md overflow-hidden">
            {/* Image Section */}
            <div className={`relative ${backgroundColorClass}`}>
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                {Array.isArray(exercise.category) && exercise.category.map((cat, index) => (
                  <span
                    key={`${exercise._id}-${cat}-${index}`}
                    className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="w-full h-96">
                <img
                  src={images[exercise.image] || images['PlaceholderPhysioApp.svg']}
                  alt={exercise.title}
                  className="w-full h-full object-contain scale-150"
                  onError={(e) => {
                    e.target.src = images['PlaceholderPhysioApp.svg'];
                  }}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="space-y-6">
                {exercise.startingPosition?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-physio-mocha text-left uppercase">
                      Starting Position
                    </h4>
                    <ul className="pl-4 text-physio-amber text-left list-none mt-2">
                      {exercise.startingPosition.map((step, index) => (
                        <li key={`${exercise._id}-start-${index}`} className="mb-1">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exercise.execution?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-physio-mocha text-left uppercase">
                      Execution
                    </h4>
                    <ul className="pl-4 text-physio-amber text-left list-none mt-2">
                      {exercise.execution.map((step, index) => (
                        <li key={`${exercise._id}-exec-${index}`} className="mb-1">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exercise.endPosition?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-physio-mocha text-left uppercase">
                      End Position
                    </h4>
                    <ul className="pl-4 text-physio-amber text-left list-none mt-2">
                      {exercise.endPosition.map((step, index) => (
                        <li key={`${exercise._id}-end-${index}`} className="mb-1">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-4">
                  {exercise.repetitions && (
                    <div>
                      <h4 className="font-medium text-physio-mocha text-left uppercase">
                        Repetitions
                      </h4>
                      <p className="text-physio-amber text-left pl-4 mt-2">{exercise.repetitions}</p>
                    </div>
                  )}

                  {exercise.note && exercise.note !== "N/A" && (
                    <div>
                      <h4 className="font-medium text-physio-mocha text-left uppercase">
                        Note
                      </h4>
                      <p className="text-physio-amber text-left pl-4 mt-2">{exercise.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;