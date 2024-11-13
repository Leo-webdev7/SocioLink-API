import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    const user = new User({ username, email });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user and their associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usernot found' });

        await Thought.deleteMany({ username: user.username });

        res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.friends.push(req.params.friendId);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};