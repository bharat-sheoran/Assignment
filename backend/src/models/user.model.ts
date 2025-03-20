import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firebase_uid: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['instructor', 'student'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);