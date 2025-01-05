import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllExercises } from '../../services/api/index.js';
import WorkoutCard from '../cards/WorkoutCard';

const AllExercises = () => {
  console.log('AllExercises Component rendering');  // Test-Log
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        console.log('Starting fetch...');
        setLoading(true);

        const result = await getAllExercises();
        console.log('API Response:', result);
        console.log('Example exercise:', result.data[0]); // Neuer Log hinzugefügt

        if (!result || !result.success) {
          throw new Error(result?.error || 'Failed to fetch exercises');
        }

        console.log('Setting exercises:', result.data);
        setExercises(result.data);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        toast.error('Fehler beim Laden der Übungen');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    console.log('Loading state is true');  // Debug log
    return (
      <div className="flex items-center justify-center min-h-[200px] border border-dashed border-gray-300 rounded-lg">
        <Loader className="w-8 h-8 text-physio-mocha animate-spin" />
        <span className="ml-2">Laden...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Ein Fehler ist aufgetreten: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-physio-mocha text-white rounded-md hover:bg-physio-chocolate"
        >
          Neu laden
        </button>
      </div>
    );
  }

  return (
    <section className="py-8 bg-gray-50"> {/* Hintergrund hinzugefügt */}
      <h2 className="text-2xl font-bold mb-6 text-physio-chocolate">Alle Übungen</h2>
      {exercises.length === 0 ? (
        <p className="text-center text-gray-500">Keine Übungen verfügbar</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <WorkoutCard
              key={exercise._id}
              exercise={exercise}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllExercises;