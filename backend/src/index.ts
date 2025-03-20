import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { questionRouter } from './routes/question.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:admin@localhost:27017/mcq_app?authSource=admin')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
// Routes
app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});