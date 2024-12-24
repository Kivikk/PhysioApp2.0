/** @format */

import React from 'react';
import {Heart, Clock} from '../../utils/icons';
import {images} from '../../utils/imageImports';

interface WorkoutCardProps {
  image: keyof typeof images;
  title?: string;
  showDetails?: boolean;
  startingPosition?: string[];
  execution?: string[];
  endPosition?: string[];
  repetitions?: string;
  note?: string;
  isFavorite?: boolean;
  isWorkoutPlan?: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  image = 'PlaceholderPhysioApp.svg',
  title = 'Placeholder Title',
  showDetails = true,
  startingPosition = [],
  execution = [],
  endPosition = [],
  repetitions = 'N/A',
  note = 'N/A',
  isFavorite = false,
  isWorkoutPlan = false
}) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden relative'>
      <div className='absolute top-2 right-2 flex gap-2'>
        {isFavorite && (
          <Heart className='h-6 w-6 text-physio-terrakotta fill-current' />
        )}
        {isWorkoutPlan && <Clock className='h-6 w-6 text-physio-sage' />}
      </div>

      <img
        src={images[image]}
        alt={title}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-physio-chocolate'>{title}</h3>

        {showDetails && (
          <div className='mt-4 space-y-4'>
            {startingPosition.length > 0 && (
              <div>
                <h4 className='font-medium text-physio-mocha'>
                  Ausgangsposition
                </h4>
                <ul className='list-disc pl-4 text-physio-amber'>
                  {startingPosition.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {execution.length > 0 && (
              <div>
                <h4 className='font-medium text-physio-mocha'>Ausführung</h4>
                <ul className='list-disc pl-4 text-physio-amber'>
                  {execution.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {endPosition.length > 0 && (
              <div>
                <h4 className='font-medium text-physio-mocha'>Endposition</h4>
                <ul className='list-disc pl-4 text-physio-amber'>
                  {endPosition.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className='mt-4'>
              <p className='text-physio-mocha'>
                <span className='font-medium'>Wiederholungen:</span>{' '}
                {repetitions}
              </p>
              {note !== 'N/A' && (
                <p className='text-physio-mocha mt-2'>
                  <span className='font-medium'>Hinweis:</span> {note}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
