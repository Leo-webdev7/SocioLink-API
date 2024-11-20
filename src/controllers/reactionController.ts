import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import Reaction from '../models/Reaction.js';  // Ensure you're importing the model here
import { Types } from 'mongoose';  // For generating ObjectId

// Add a reaction
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }

        // Create a new instance of the Reaction model
        const reaction = new Reaction({
            _id: new Types.ObjectId(),  // Generate new ObjectId for reaction
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            createdAt: new Date(),
        });

        // Push the new reaction instance into the reactions array
        thought.reactions.push(reaction);

        await thought.save();

        res.status(200).json(thought);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// Remove a reaction
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }

        // Find the reaction by ID
        const reaction = thought.reactions.id(req.params.reactionId);
        if (!reaction) {
            res.status(404).json({ message: 'Reaction not found' });
            return;
        }

        // Remove the reaction by filtering it out
        thought.reactions.pull(req.params.reactionId); // Use `pull` to remove the subdocument
        await thought.save();

        res.status(200).json(thought);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
