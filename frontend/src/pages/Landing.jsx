import React from "react";
import AllExercises from "../components/sections/AllExercises";
import CategoryExercises from "../components/sections/CategoryExercises";
import WorkoutPlans from "../components/sections/WorkoutPlans";

const Landing = () => {
  console.log('Landing Page rendering');
  return (
    <div className="min-h-screen bg-physio-cream/80">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-0">
        <h1 className="text-3xl font-bold text-physio-chocolate text-center py-8">
          {/* Überschrift optional */}
        </h1>
      </div>

      {/* Übungen Übersicht */}
      <div className="container mx-auto px-4 mb-12">
        <AllExercises />
      </div>

      {/* Kategorien voller Hintergrund */}
      <div className="w-full bg-physio-Petrol/80 py-12">
        <div className="container mx-auto px-4">
          <CategoryExercises />
        </div>
      </div>

      {/* Übungspläne voller Hintergrund */}
      <div className="w-full bg-physio-mocha/80 py-12">
        <div className="container mx-auto px-4 my-12">
          <WorkoutPlans />
        </div>
      </div>
    </div>
  );
};

export default Landing;