// src/components/sections/WorkoutPlans.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../utils/imageImports';
import { ChevronRight } from 'lucide-react';
import { categoryColorMap, defaultCategoryColor } from '../../utils/categoryColors';
import { workoutPlans } from '../../data/workoutPlansData';

const WorkoutPlans = () => {
  const navigate = useNavigate();

  const handlePlanClick = (planId) => {
    navigate(`/workout-plan/${planId}`);
  };

  return (
    <div className='py-8 px-4'>
      <h2 className="text-2xl font-semibold text-physio-chocolate mb-6">
        Vorgefertigte Übungspläne
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPlans.map((plan) => (
          <div
            key={plan.id}
            className="relative group bg-physio-cream rounded-lg shadow-md p-4 cursor-pointer hover:brightness-90"
            onClick={() => handlePlanClick(plan.id)}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-medium text-physio-chocolate mb-4">
                {plan.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {plan.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`w-full h-40 rounded overflow-hidden ${categoryColorMap[exercise.category[0]] || defaultCategoryColor}`}
                  >
                    <img
                      src={images[exercise.image]}
                      alt="Exercise preview"
                      className="w-full h-40 object-contain scale-150"
                      onError={(e) => {
                        e.target.src = images['PlaceholderPhysioApp.svg'];
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white/80 rounded-full p-2 z-20">
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