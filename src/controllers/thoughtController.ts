import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id);

        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }

        res.json(thought);
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching thought', error: err.message });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  const { thoughtText, username } = req.body;

  if (!thoughtText || !username) {
    res.status(400).json({ message: "Thought text and username are required" });
    return;
  }

  try {
    // Create the new thought
    const thought = new Thought({ thoughtText, username });

    // Save the thought
    const newThought = await thought.save();

    // Find the user by username and update their thoughts array
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user's thoughts array with the new thought's ID
    user.thoughts.push(newThought._id);
    await user.save();

    // Respond with the new thought
    res.status(201).json(newThought);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);

        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return; // Exit early after sending the response
        }

        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
};

