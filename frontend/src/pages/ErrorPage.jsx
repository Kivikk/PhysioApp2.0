import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '../utils/icons';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-physio-chocolate mb-4">404</h1>
        <h2 className="text-2xl text-physio-mocha mb-6">
          Diese Seite wurde nicht gefunden
        </h2>
        <p className="text-physio-amber mb-8 max-w-md mx-auto">
          Die von Ihnen gesuchte Seite existiert noch nicht oder wurde möglicherweise verschoben.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-6 py-3 bg-physio-sage text-white rounded-lg
                   hover:bg-physio-sage/90 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Zurück zur Startseite
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;