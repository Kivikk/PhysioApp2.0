import React, { useState } from 'react';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

const categories = [
  {
    title: "Beine",
    exercises: [
      { image: "Beinheben.svg", category: ["Legs"] },
      { image: "DehnungStandbeins.svg", category: ["Legs"] },
      { image: "OberschenkelDehnung.svg", category: ["Legs"] },
      { image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
    ]
  },
  {
    title: "Schultern",
    exercises: [
      { image: "BandSchulter.svg", category: ["Shoulders"] },
      { image: "BandSchulterAussenDreher.svg", category: ["Shoulders"] },
      { image: "BandSchulterInnenDreher.svg", category: ["Shoulders"] }
    ]
  },
  {
    title: "Rücken",
    exercises: [
      { image: "DehnungKindhaltung.svg", category: ["Back"] },
      { image: "NackenRolle.svg", category: ["Back"] },
      { image: "RueckenRolle.svg", category: ["Back"] },
      { image: "Vorbeuger.svg", category: ["Back"] }
    ]
  },
  {
    title: "Hüfte",
    exercises: [
      { image: "HueftHebung.svg", category: ["Hip"] },
      { image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
    ]
  },
  {
    title: "Core",
    exercises: [
      { image: "RumpfDrehungBoden.svg", category: ["Core"] },
      { image: "RumpfDrehungWand.svg", category: ["Core"] }
    ]
  },
  {
    title: "Arme",
    exercises: [
      { image: "Stabrotation.svg", category: ["Arms"] }
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.exercises.map((exercise, index) => (
                <CompactWorkoutCard
                  key={index}
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