// backend/scripts/seedDatabase.js
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Card from '../models/Card.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI nicht gefunden in .env');
  process.exit(1);
}

const normalizeExercise = (exercise) => {
  // Korrektur Erster Buchstabe groß, Rest klein
  const normalizeCategory = (cat) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
  };

  return {
    title: exercise.title,
    category: Array.isArray(exercise.category)
      ? exercise.category.map(cat => normalizeCategory(cat.trim()))
      : [normalizeCategory(exercise.category.trim())],
    startingPosition: exercise.startingPosition || exercise.start_position || [],
    execution: exercise.execution || [],
    endPosition: exercise.endPosition || exercise.end_position || [],
    repetitions: exercise.repetitions,
    note: Array.isArray(exercise.note) ? exercise.note.join(' ') : exercise.note || '',
    image: exercise.image
  };
};

const seedDatabase = async () => {
  try {
    console.log('Verbinde mit MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const exercisesPath = path.join(__dirname, '..', 'data', 'exercises.json');
    const jsonData = await fs.readFile(exercisesPath, 'utf-8');
    const exercises = JSON.parse(jsonData);

    await Card.deleteMany({});
    console.log('🗑️  Bestehende Übungen gelöscht');

    const normalizedExercises = exercises.map(normalizeExercise);
    const insertedExercises = await Card.insertMany(normalizedExercises);

    console.log(`✅ ${insertedExercises.length} Übungen erfolgreich importiert`);

    const categories = await Card.distinct('category');
    console.log('📊 Importierte Kategorien:', categories.sort());

    const stats = await Card.aggregate([
      {
        $unwind: '$category'
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log('📊 Übungen pro Kategorie:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} Übungen`);
    });

  } catch (error) {
    console.error('❌ Fehler beim Seeding:', error);
    console.error('Details:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📪 Datenbankverbindung geschlossen');
  }
};

seedDatabase();