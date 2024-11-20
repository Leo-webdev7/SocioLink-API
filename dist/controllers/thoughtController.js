var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Thought from '../models/Thought.js';
import User from '../models/User.js';
import { Types } from 'mongoose';
// Get all thoughts
export const getThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get a single thought by ID
export const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching thought', error: err.message });
    }
});
// Create a new thought
export const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtText, username } = req.body;
    if (!thoughtText || !username) {
        res.status(400).json({ message: "Thought text and username are required" });
        return;
    }
    try {
        // Create the new thought
        const thought = new Thought({ thoughtText, username });
        // Save the thought
        const newThought = yield thought.save();
        // Find the user by username and update their thoughts array
        const user = yield User.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Update the user's thoughts array with the new thought's ID
        user.thoughts.push(newThought._id);
        yield user.save();
        // Respond with the new thought
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Update a thought
export const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract the thought ID from the URL params
    const { thoughtText } = req.body; // Extract the new thought text from the request body
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid Thought ID format' });
        return;
    }
    try {
        // Find the thought by ID and update it with the new data
        const updatedThought = yield Thought.findByIdAndUpdate(id, { thoughtText }, // Only update the `thoughtText` field
        { new: true } // Return the updated document
        );
        // If the thought was not found, return a 404 error
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        // Return the updated thought as a response
        res.json(updatedThought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Delete a thought
export const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return; // Exit early after sending the response
        }
        res.status(200).json({ message: 'Thought deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
});
