import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new thought
export const createThought =  async (req: Request, res: Response) => {
    const { thoughtText, username, userId } = req.body;
    const thought =  new Thought({ thoughtText, username });
    try {
        const newThought = await thought.save();
        // Update the user's thought array
        await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        // Optionally, remove the thought from the user`s thoughts array
        await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thought._id } });

        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};