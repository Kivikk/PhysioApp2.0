// src/pages/ExerciseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/cards/WorkoutCard';
import CloseHeader from '../components/navigation/CloseHeader';
import { getExerciseById } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const ExerciseDetail = () => {
  const { id: urlId } = useParams();  // URL Parameter als urlId
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExercise = async () => {
      try {
        // Hier wird urlId als _id an die API übergeben
        const result = await getExerciseById(urlId);
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
  }, [urlId, showToast]);  // Dependency auf urlId geändert

  if (isLoading) {
    return <div className="text-center py-12">Lädt Übung...</div>;
  }

  return (
    <div className="min-h-screen bg-physio-cream/30">
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            {exercise?.title || 'Übungsdetails'}
          </h1>
          <div className="bg-physio-cream/90 hover:bg-physio-cream rounded-full">
            <CloseHeader onClose={() => navigate(-1)} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Angepasster Container für die WorkoutCard */}
        <div className="max-w-3xl mx-auto">  {/* Begrenzte Breite und zentriert */}
          {exercise && (
            <WorkoutCard
              exercise={exercise}
              showDetails={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default ExerciseDetail;