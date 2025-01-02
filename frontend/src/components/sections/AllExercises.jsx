import React, { useState } from 'react';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';

const exercises = [
  {
    image: "BandSchulter.svg",
    category: ["Shoulders"]
  },
  {
    image: "BandSchulterAussenDreher.svg",
    category: ["Shoulders"]
  },
  {
    image: "BandSchulterInnenDreher.svg",
    category: ["Shoulders"]
  },
  {
    image: "Beinheben.svg",
    category: ["Legs"]
  },
  {
    image: "DehnungKindhaltung.svg",
    category: ["Back"]
  },
  {
    image: "DehnungStandbeins.svg",
    category: ["Legs"]
  },
  {
    image: "HueftHebung.svg",
    category: ["Hip"]
  },
  {
    image: "NackenRolle.svg",
    category: ["Back"]
  },
  {
    image: "OberschenkelDehnung.svg",
    category: ["Legs"]
  },
  {
    image: "RueckenRolle.svg",
    category: ["Back"]
  },
  {
    image: "RumpfDrehungBoden.svg",
    category: ["Core"]
  },
  {
    image: "RumpfDrehungWand.svg",
    category: ["Core"]
  },
  {
    image: "Stabrotation.svg",
    category: ["Arms"]
  },
  {
    image: "Vorbeuger.svg",
    category: ["Back"]
  },
  {
    image: "WadenHueftDehnung.svg",
    category: ["Legs", "Hip"]
  }
];

const AllExercises = () => {
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
        Alle Übungskarten auf einen Blick
      </h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exercises.map((exercise, index) => (
            <CompactWorkoutCard
              key={index}
              {...exercise}
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