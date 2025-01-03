// src/components/sections/CategoryExercises.jsx
import React, { useState } from 'react';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const categories = [
  {
    title: "Beine",
    exercises: [
      { id: "legs1", image: "Beinheben.svg", category: ["Legs"] },
      { id: "legs2", image: "DehnungStandbeins.svg", category: ["Legs"] },
      { id: "legs3", image: "OberschenkelDehnung.svg", category: ["Legs"] },
      { id: "legs-hip1", image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
    ]
  },
  {
    title: "Schultern",
    exercises: [
      { id: "shoulders1", image: "BandSchulter.svg", category: ["Shoulders"] },
      { id: "shoulders2", image: "BandSchulterAussenDreher.svg", category: ["Shoulders"] },
      { id: "shoulders3", image: "BandSchulterInnenDreher.svg", category: ["Shoulders"] }
    ]
  },
  {
    title: "Rücken",
    exercises: [
      { id: "back1", image: "DehnungKindhaltung.svg", category: ["Back"] },
      { id: "back2", image: "NackenRolle.svg", category: ["Back"] },
      { id: "back3", image: "RueckenRolle.svg", category: ["Back"] },
      { id: "back4", image: "Vorbeuger.svg", category: ["Back"] }
    ]
  },
  {
    title: "Hüfte",
    exercises: [
      { id: "hip1", image: "HueftHebung.svg", category: ["Hip"] },
      { id: "legs-hip1", image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
    ]
  },
  {
    title: "Core",
    exercises: [
      { id: "core1", image: "RumpfDrehungBoden.svg", category: ["Core"] },
      { id: "core2", image: "RumpfDrehungWand.svg", category: ["Core"] }
    ]
  },
  {
    title: "Arme",
    exercises: [
      { id: "arms1", image: "Stabrotation.svg", category: ["Arms"] }
    ]
  }
];

const CategoryExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleCardClick = (exercise) => {
    setSelectedExercise({
      ...exercise,
      title: exercise.title || `${exercise.category[0]} Übung`
    });
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-physio-chocolate mb-4 text-left">
        Übungskarten nach Kategorien
      </h2>
      <div className="space-y-8">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-physio-cream rounded-lg shadow-md p-4">
            <h3 className="text-xl font-medium text-physio-chocolate mb-4 text-left">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.exercises.map((exercise) => (
                <CompactWorkoutCard
                  key={exercise.id}
                  {...exercise}
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