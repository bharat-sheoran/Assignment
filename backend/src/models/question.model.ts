import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correct_answer: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Question = mongoose.model('Question', questionSchema);