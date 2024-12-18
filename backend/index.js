import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cardRoutes from './routes/cardRoutes.js';

dotenv.config();

// Test ob env geladen wird
// console.log('MongoDB URI:', process.env.MONGODB_URI);

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes registrieren
app.use('/api/cards', cardRoutes);

// Test Route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});