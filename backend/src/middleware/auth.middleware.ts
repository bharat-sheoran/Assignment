import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebase-admin.js';
import { User } from '../models/user.model.js';

declare global {
    namespace Express {
        interface Request {
            user?: {
                uid: string;
                role: string;
                _id: string;
            };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const token = authHeader.split('Bearer ')[1];
            console.log(token);
            const decodedToken = await adminAuth.verifyIdToken(token);
            console.log(decodedToken);

            const user = await User.findOne({ firebase_uid: decodedToken.uid });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = {
                uid: decodedToken.uid,
                role: user.role,
                _id: user._id.toString(),
            };

            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    })();
};