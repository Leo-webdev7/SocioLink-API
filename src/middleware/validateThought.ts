import { Request, Response, NextFunction } from 'express';

export const validateThought = (req: Request, res: Response, next: NextFunction) => {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || thoughtText.length < 1 || thoughtText.length > 280) {
        return res.status(400).json({ message: 'Thought text must be between 1 and 280 characters' });
    }

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    next();
};