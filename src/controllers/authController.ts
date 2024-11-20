import { Request, Response } from 'express';
import User from '../models/User';

// Register new user
export const registerUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
        const newUser = new User({ username, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};


// Log in user
export const loginUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};