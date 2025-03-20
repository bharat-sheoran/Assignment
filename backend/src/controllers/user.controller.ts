import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
    (async () => {
        try {
            const { email, firebase_uid, role } = req.body;
            console.log(email, firebase_uid, role);

            const existingUser = await User.findOne({ firebase_uid });
            console.log(existingUser);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({
                email,
                firebase_uid,
                role,
            });
            console.log(user);

            const savedUser = await user.save();
            console.log(savedUser);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
            console.log(error);
        }
    })();
};

export const getCurrentUser = async (req: Request, res: Response) => {
    (async () => {
        try {
            const user = await User.findOne({ firebase_uid: req.user?.uid });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    })();
};