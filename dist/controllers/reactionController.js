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
import Reaction from '../models/Reaction.js'; // Ensure you're importing the model here
// Add a reaction to a thought
export const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        // Find the thought by ID
        const thought = yield Thought.findById(thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        // Create a new reaction (this will automatically generate an _id for the reaction)
        const reaction = new Reaction({
            reactionBody,
            username,
        });
        // Save the reaction document
        const savedReaction = yield reaction.save();
        // After saving the reaction, push the reaction ID into the thought's reactions array
        thought.reactions.push(savedReaction._id);
        // Save the updated thought
        yield thought.save();
        // Respond with the newly added reaction
        res.status(201).json(savedReaction);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Remove a reaction from a thought
export const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId, reactionId } = req.params; // Get thoughtId and reactionId from the URL parameters
    console.log('Received request to remove reaction');
    console.log('Thought ID:', thoughtId);
    console.log('Reaction ID:', reactionId);
    // Check if thoughtId and reactionId are valid
    if (!thoughtId || !reactionId) {
        console.log('Invalid thoughtId or reactionId');
        res.status(400).json({ message: 'Invalid thoughtId or reactionId' });
        return;
    }
    try {
        // Find the thought by ID
        const thought = yield Thought.findById(thoughtId);
        if (!thought) {
            console.log('Thought not found');
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        console.log('Found thought:', thought);
        // Ensure that the thought has reactions and find the reaction to remove
        const reactionIndex = thought.reactions.findIndex((reaction) => reaction.toString() === reactionId);
        if (reactionIndex === -1) {
            console.log('Reaction not found in this thought');
            res.status(404).json({ message: 'Reaction not found in this thought' });
            return;
        }
        console.log('Found reaction at index:', reactionIndex);
        // Remove the reaction ID from the thought's reactions array
        thought.reactions.splice(reactionIndex, 1);
        console.log('Updated reactions array:', thought.reactions);
        // Save the updated thought with the modified reactions
        const updatedThought = yield thought.save();
        console.log('Updated thought after saving:', updatedThought);
        // Optionally, delete the reaction document from the Reaction collection
        yield Reaction.findByIdAndDelete(reactionId);
        console.log('Reaction removed from Reaction collection');
        res.status(200).json({ message: 'Reaction removed successfully' });
    }
    catch (err) {
        console.error('Error:', err); // Log the error for debugging
        res.status(500).json({ message: err.message });
    }
});
