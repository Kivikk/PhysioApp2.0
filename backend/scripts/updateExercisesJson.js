// backend/scripts/updateExercisesJson.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoryMapping = {
  "Hip": "Hüfte",
  "Legs": "Beine",
  "Shoulder": "Schultern",
  "Back": "Rücken",
  "Arms": "Arme",
  "Core": "Wirbelsäule"
};

async function updateExercisesJson() {
  try {
    // Pfad zur exercises.json
    const exercisesPath = path.join(__dirname, '..', 'data', 'exercises.json');

    // Backup erstellen
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(__dirname, '..', 'backup', `exercises-backup-${timestamp}.json`);

    // Datei lesen
    const data = await fs.readFile(exercisesPath, 'utf8');
    const exercises = JSON.parse(data);

    // Backup speichern
    await fs.writeFile(backupPath, JSON.stringify(exercises, null, 2));
    console.log(`✅ Backup erstellt: ${backupPath}`);

    // Kategorien aktualisieren
    const updatedExercises = exercises.map(exercise => ({
      ...exercise,
      category: exercise.category.map(cat => categoryMapping[cat] || cat)
    }));

    // Aktualisierte Datei speichern
    await fs.writeFile(exercisesPath, JSON.stringify(updatedExercises, null, 2));
    console.log('✅ exercises.json erfolgreich aktualisiert');

    // Validierung
    console.log('\n📊 Kategorien nach Update:');
    const allCategories = new Set(updatedExercises.flatMap(ex => ex.category));
    console.log([...allCategories]);

  } catch (error) {
    console.error('❌ Fehler beim Update:', error);
  }
}

updateExercisesJson();