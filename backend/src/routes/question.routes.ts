import express from 'express';
import { createQuestion, getQuestions, updateQuestion } from '../controllers/question.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const questionRouter = express.Router();

questionRouter.post('/', authMiddleware, createQuestion);
questionRouter.get('/', authMiddleware, getQuestions);
questionRouter.put('/:id', authMiddleware, updateQuestion);