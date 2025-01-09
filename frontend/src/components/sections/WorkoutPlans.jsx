// src/components/sections/WorkoutPlans.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../utils/imageImports';
import { ChevronRight } from 'lucide-react';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';

export const workoutPlans = [
  {
    id: '5-min-routine',
    title: "5 Minuten Routine",
    exercises: [
      { image: "RueckenRolle.svg", category: ["Core"] },
      { image: "DehnungKindhaltung.svg", category: ["Back"] },
      { image: "Vorbeuger.svg", category: ["Back"] }
    ]
  },
  {
    id: 'after-work',
    title: "After-Work Routine",
    exercises: [
      { image: "BandSchulter.svg", category: ["Shoulder"] },
      { image: "NackenRolle.svg", category: ["Back"] }
    ]
  },
  {
    id: 'complete',
    title: "Komplett Routine",
    exercises: [
      { image: "Beinheben.svg", category: ["Legs"] },
      { image: "HueftHebung.svg", category: ["Hip"] },
      { image: "WadenHueftDehnung.svg", category: ["Legs", "Hip"] }
    ]
  }
];

const WorkoutPlans = () => {
  const navigate = useNavigate();

  const handlePlanClick = (planId) => {
    navigate(`/workout-plan/${planId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-physio-chocolate mb-4 text-left">
        Vorgefertigte Übungspläne
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPlans.map((plan) => (
          <div
            key={plan.id}
            className="relative group bg-physio-cream rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handlePlanClick(plan.id)}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-medium text-physio-chocolate mb-4">
                {plan.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {plan.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`w-full h-32 rounded overflow-hidden ${categoryColorMap[exercise.category[0]] || defaultCategoryColor}`}
                  >
                    <img
                      src={images[exercise.image]}
                      alt="Exercise preview"
                      className="w-full h-full object-contain scale-150"
                      onError={(e) => {
                        e.target.src = images['PlaceholderPhysioApp.svg'];
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white/40 rounded-full p-2">
                <ChevronRight className="w-6 h-6 text-physio-chocolate" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlans;