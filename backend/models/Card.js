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
    type: [String],
    required: true,
    validate: {
      validator: function (categories) {
        return categories && categories.length > 0;
      },
      message: 'Mindestens eine Kategorie muss angegeben werden'
    }
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

cardSchema.index({ category: 1 });

cardSchema.pre('save', function (next) {
  if (this.isModified('category')) {
    // Entfernt Leerzeichen und Dup
    this.category = [...new Set(this.category.map(cat => cat.trim()))];
  }
  next();
});

export { EXERCISE_CATEGORIES };
export default mongoose.model('Card', cardSchema);