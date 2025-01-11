// backend/scripts/updateCategories.js
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

// Kategorie-Mapping
const categoryMapping = {
  "Hip": "Hüfte",
  "Legs": "Beine",
  "Shoulder": "Schultern",
  "Back": "Rücken",
  "Arms": "Arme",
  "Core": "Wirbelsäule"
};

// Backup erstellen
const createBackup = async () => {
  try {
    const backupDir = path.join(__dirname, '..', 'backup');
    await fs.mkdir(backupDir, { recursive: true });

    const exercises = await Card.find({});
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `exercises-backup-${timestamp}.json`);

    await fs.writeFile(backupPath, JSON.stringify(exercises, null, 2));
    console.log(`✅ Backup erstellt: ${backupPath}`);
    return true;
  } catch (error) {
    console.error('❌ Fehler beim Backup:', error);
    return false;
  }
};

const updateCategories = async () => {
  try {
    console.log('📡 Verbinde mit MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Backup erstellen
    const backupSuccess = await createBackup();
    if (!backupSuccess) {
      console.error('❌ Backup fehlgeschlagen - Update wird abgebrochen');
      return;
    }

    console.log('🔄 Starte Kategorie-Update...');

    // Hole alle Übungen
    const exercises = await Card.find({});
    let updateCount = 0;

    // Update jede Übung einzeln wegen Array-Handling
    for (const exercise of exercises) {
      const updatedCategories = exercise.category.map(cat => categoryMapping[cat] || cat);
      if (JSON.stringify(exercise.category) !== JSON.stringify(updatedCategories)) {
        exercise.category = updatedCategories;
        await exercise.save();
        updateCount++;
      }
    }

    console.log(`✅ ${updateCount} Übungen aktualisiert`);

    // Statistiken nach Update
    const categories = await Card.distinct('category');
    console.log('\n📊 Aktualisierte Kategorien:', categories.sort());

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

    console.log('📊 Übungen pro Kategorie nach Update:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} Übungen`);
    });

  } catch (error) {
    console.error('❌ Fehler beim Update:', error);
    console.error('Details:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📪 Datenbankverbindung geschlossen');
  }
};

updateCategories();