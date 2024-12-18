import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Types } from 'mongoose';


// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    console.log('Getting user by ID:', req.params.id);  // Log the ID parameter
    try {
        const userId = new Types.ObjectId(req.params.id); // Convert string to ObjectId
        const user = await User.findById(userId)
            .populate('thoughts')
            .populate('friends');
            
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop execution after sending the response
        }

        res.json(user); // Send the found user
    } catch (err: any) {
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
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = new Types.ObjectId(req.params.id); // Convert string to ObjectId
        const user = await User.findByIdAndUpdate(
            userId, 
            req.body, 
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop execution after sending the response
        }

        res.json(user); // Send the updated user
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user and their associated thoughts
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = new Types.ObjectId(req.params.id); // Convert string to ObjectId
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop further execution after sending the response
        }

        // Delete all associated thoughts
        await Thought.deleteMany({ username: user.username });

        res.json({ message: 'User and associated thoughts deleted' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = new Types.ObjectId(req.params.userId); // Convert string to ObjectId
        const friendId = new Types.ObjectId(req.params.friendId); // Convert string to ObjectId

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop further execution after sending the response
        }

        user.friends.push(friendId);
        await user.save();

        res.json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = new Types.ObjectId(req.params.userId); // Convert string to ObjectId
        const friendId = new Types.ObjectId(req.params.friendId); // Convert string to ObjectId

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop further execution
        }

        // Filter out the friendId
        user.friends = user.friends.filter(id => id.toString() !== friendId.toString());
        await user.save();

        res.json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
