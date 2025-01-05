import React from "react";
import AllExercises from "../components/sections/AllExercises";
import CategoryExercises from "../components/sections/CategoryExercises";
import WorkoutPlans from "../components/sections/WorkoutPlans";

const Landing = () => {
  console.log('Landing Page rendering');
  return (
    <div className="min-h-screen bg-red-100">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-3xl font-bold text-physio-chocolate text-center py-8">

        </h1>
      </div>

      {/* Übungen Übersicht */}
      <div className="container mx-auto px-4 mb-12 bg-blue-100">
        <AllExercises />
      </div>

      {/* Kategorien Section mit vollem Hintergrund */}
      <div className="w-full bg-physio-Petrol/60 py-12">
        <div className="container mx-auto px-4">
          <CategoryExercises />
        </div>
      </div>

      {/* Übungspläne */}
      <div className="container mx-auto px-4 my-12">
        <WorkoutPlans />
      </div>
    </div>
  );
};

export default Landing;