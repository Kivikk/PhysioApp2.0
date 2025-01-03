import React, { useState } from 'react';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';

const exercises = [
  {
    id: "1",
    image: "BandSchulter.svg",
    category: ["Shoulders"]
  },
  {
    id: "2",
    image: "BandSchulterAussenDreher.svg",
    category: ["Shoulders"]
  },
  {
    id: "3",
    image: "BandSchulterInnenDreher.svg",
    category: ["Shoulders"]
  },
  {
    id: "4",
    image: "Beinheben.svg",
    category: ["Legs"]
  },
  {
    id: "5",
    image: "DehnungKindhaltung.svg",
    category: ["Back"]
  },
  {
    id: "6",
    image: "DehnungStandbeins.svg",
    category: ["Legs"]
  },
  {
    id: "7",
    image: "HueftHebung.svg",
    category: ["Hip"]
  },
  {
    id: "8",
    image: "NackenRolle.svg",
    category: ["Back"]
  },
  {
    id: "9",
    image: "OberschenkelDehnung.svg",
    category: ["Legs"]
  },
  {
    id: "10",
    image: "RueckenRolle.svg",
    category: ["Back"]
  },
  {
    id: "11",
    image: "RumpfDrehungBoden.svg",
    category: ["Core"]
  },
  {
    id: "12",
    image: "RumpfDrehungWand.svg",
    category: ["Core"]
  },
  {
    id: "13",
    image: "Stabrotation.svg",
    category: ["Arms"]
  },
  {
    id: "14",
    image: "Vorbeuger.svg",
    category: ["Back"]
  },
  {
    id: "15",
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
      <div className="bg-physio-cream rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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