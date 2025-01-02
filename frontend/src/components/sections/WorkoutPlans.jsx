import React, { useState } from 'react';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';

const workoutPlans = [
  {
    title: "Rückenübungen",
    exercises: [
      { image: "RueckenRolle.svg", category: ["Back"] },
      { image: "DehnungKindhaltung.svg", category: ["Back"] },
      { image: "Vorbeuger.svg", category: ["Back"] }
    ]
  },
  {
    title: "Schulter & Nacken",
    exercises: [
      { image: "BandSchulter.svg", category: ["Shoulders"] },
      { image: "NackenRolle.svg", category: ["Back"] }
    ]
  },
  {
    title: "Unterkörper",
    exercises: [
      { image: "Beinheben.svg", category: ["Legs"] },
      { image: "HueftHebung.svg", category: ["Hip"] },
      { image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
    ]
  }
];

const WorkoutPlans = () => {
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
        Vorgefertigte Übungspläne
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPlans.map((plan, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-medium text-physio-chocolate mb-4">
              {plan.title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {plan.exercises.map((exercise, index) => (
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

export default WorkoutPlans;