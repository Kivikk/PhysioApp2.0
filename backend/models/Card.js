import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EXERCISE_CATEGORIES = [
  'Hip',
  'Legs',
  'Shoulders',
  'Back',
  'Arms',
  'Core'
];

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: EXERCISE_CATEGORIES,
    trim: true
  },
  startingPosition: [{
    type: String,
    required: true,
    trim: true
  }],
  execution: [{
    type: String,
    required: true,
    trim: true
  }],
  endPosition: [{
    type: String,
    required: true,
    trim: true
  }],
  repetitions: {
    type: String,
    required: true,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export { EXERCISE_CATEGORIES };
export default mongoose.model('Card', cardSchema);