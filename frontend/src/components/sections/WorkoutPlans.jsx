import React, { useState } from 'react';
import CompactWorkoutCard from '../cards/CompactWorkoutCard';
import ExerciseModal from '../modals/ExerciseModal';

const workoutPlans = [
  {
    id: "plan1",
    title: "Rückenübungen",
    exercises: [
      { id: "back3", image: "RueckenRolle.svg", category: ["Back"] },
      { id: "back1", image: "DehnungKindhaltung.svg", category: ["Back"] },
      { id: "back4", image: "Vorbeuger.svg", category: ["Back"] }
    ]
  },
  {
    id: "plan2",
    title: "Schulter & Nacken",
    exercises: [
      { id: "shoulders1", image: "BandSchulter.svg", category: ["Shoulders"] },
      { id: "back2", image: "NackenRolle.svg", category: ["Back"] }
    ]
  },
  {
    id: "plan3",
    title: "Unterkörper",
    exercises: [
      { id: "legs1", image: "Beinheben.svg", category: ["Legs"] },
      { id: "hip1", image: "HueftHebung.svg", category: ["Hip"] },
      { id: "legs-hip1", image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
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
        {workoutPlans.map((plan) => (
          <div key={plan.id} className="bg-physio-cream rounded-lg shadow-md p-4">
            <h3 className="text-xl font-medium text-physio-chocolate mb-4">
              {plan.title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {plan.exercises.map((exercise) => (
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

export default WorkoutPlans;