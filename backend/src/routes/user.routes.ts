import express from 'express';
import { createUser, getCurrentUser } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/me', authMiddleware, getCurrentUser);