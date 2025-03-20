import { Request, Response } from 'express';
import { Question } from '../models/question.model.js';
import { User } from '../models/user.model.js';

export const createQuestion = (req: Request, res: Response) => {
    (async () => {
        try {
            const user = await User.findOne({ firebase_uid: req.user?.uid });
            if (!user || user.role !== 'instructor') {
                return res.status(403).json({ message: 'Only instructors can create questions' });
            }

            const { question_text, options, correct_answer } = req.body;

            const question = new Question({
                question_text,
                options,
                correct_answer,
                created_by: user._id,
            });

            await question.save();
            res.status(201).json(question);
        } catch (error) {
            res.status(500).json({ message: 'Error creating question', error });
        }
    })();
};

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find().populate('created_by', 'email');
        console.log(questions);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};

export const updateQuestion = async (req: Request, res: Response) => {
    (async () => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ firebase_uid: req.user?.uid });

            const question = await Question.findById(id);
            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }

            if (!user || (user.role !== 'instructor' || question.created_by.toString() !== user._id.toString())) {
                return res.status(403).json({ message: 'Unauthorized to update this question' });
            }

            const updatedQuestion = await Question.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            res.json(updatedQuestion);
        } catch (error) {
            res.status(500).json({ message: 'Error updating question', error });
        }
    })();
};