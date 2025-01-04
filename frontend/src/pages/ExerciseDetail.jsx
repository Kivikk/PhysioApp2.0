// src/pages/ExerciseDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from '../utils/icons';
import { images } from '../utils/imageImports';
import { categoryColorMap, defaultCategoryColor } from '../utils/categoryColors';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Diese Daten werden später von der API kommen
  const exerciseData = {
    id,
    title: "Übungstitel",
    image: 'PlaceholderPhysioApp.svg',
    category: ['Shoulders'],
    startingPosition: ['Aufrechter Stand', 'Arme seitlich'],
    execution: ['Führen Sie die Bewegung langsam aus'],
    endPosition: ['Zurück zur Ausgangsposition'],
    repetitions: '3x10',
    note: 'serh langsam ausführen',
  };

  const backgroundColorClass = exerciseData.category.length > 0
    ? categoryColorMap[exerciseData.category[0]]
    : defaultCategoryColor;

  return (
    <div className="min-h-screen bg-physio-cream/30">
      {/* Header Section */}
      <div className="w-full bg-physio-cream/40 shadow-md px-4 py-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-physio-chocolate">
            {exerciseData.title}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-physio-safari/60 rounded-full transition-colors"
            aria-label="Schließen"
          >
            <X className="w-6 h-6 text-physio-chocolate" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-physio-cream rounded-lg shadow-md overflow-hidden relative w-full max-w-xl mx-auto">
          <div className={`relative ${backgroundColorClass}`}>
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
              {exerciseData.category.map((cat, index) => (
                <span
                  key={index}
                  className="text-sm px-2 py-1 rounded bg-physio-cream/40 text-physio-chocolate"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="w-full h-64">
              <img
                src={images[exerciseData.image]}
                alt={exerciseData.title}
                className="w-full h-full object-contain scale-150"
              />
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-physio-chocolate text-left">
              {exerciseData.title}
            </h3>

            <div className="mt-4 space-y-4">
              {exerciseData.startingPosition.length > 0 && (
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">
                    Starting Position
                  </h4>
                  <ul className="pl-4 text-physio-amber text-left list-none">
                    {exerciseData.startingPosition.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exerciseData.execution.length > 0 && (
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">
                    Execution
                  </h4>
                  <ul className="pl-4 text-physio-amber text-left list-none">
                    {exerciseData.execution.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exerciseData.endPosition.length > 0 && (
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">
                    End Position
                  </h4>
                  <ul className="pl-4 text-physio-amber text-left list-none">
                    {exerciseData.endPosition.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4">
                <div>
                  <h4 className="font-medium text-physio-mocha text-left uppercase">
                    Repetitions
                  </h4>
                  <p className="text-physio-amber text-left pl-4">{exerciseData.repetitions}</p>
                </div>

                {exerciseData.note !== "N/A" && (
                  <div>
                    <h4 className="font-medium text-physio-mocha text-left uppercase">
                      Note
                    </h4>
                    <p className="text-physio-amber text-left pl-4">{exerciseData.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;