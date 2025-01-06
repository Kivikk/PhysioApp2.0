import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkoutPlans = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-physio-chocolate mb-4">
        Vorgefertigte Übungspläne
      </h2>
      <div className="bg-physio-cream rounded-lg p-6 text-center">
        <p className="text-physio-chocolate">
          Übungspläne werden in Kürze verfügbar sein.
        </p>
      </div>
    </div>
  );
};

export default WorkoutPlans;