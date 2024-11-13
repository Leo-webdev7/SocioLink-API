import { Request, Response } from 'express';
import Thought from '../models/Thought';

// Add a reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        thought.reactions.push(req.body);
        await thought.save();

        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Remove a reaction
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== req.params.reactionId);
        await thought.save();

        res.json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};