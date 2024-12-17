import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EXERCISE_CATEGROIES = [
  'Hip',
  'Legs',
  'Back',
  'Shoulders',
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
    enum: EXERCISE_CATEGROIES,
    trim: true
  },
  startingPosition: {
    type: String,
    required: true,
    validate: [(val) => val.length > 0]
  },
  execution: {
    type: String,
    required: true,
    validate: [(val) => val.length > 0]
  },
  endPosition: {
    type: String,
    required: true,
    validate: [(val) => val.length > 0]
  },
  repetitions: {
    type: Number,
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
},
  {
    timestamps: true
  });

export { EXERCISE_CATEGROIES };
export default mongoose.model('Card', cardSchema);