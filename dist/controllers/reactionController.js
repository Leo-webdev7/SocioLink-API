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
import { Types } from 'mongoose'; // For generating ObjectId
// Add a reaction
export const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        // Create a new instance of the Reaction model
        const reaction = new Reaction({
            _id: new Types.ObjectId(), // Generate new ObjectId for reaction
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            createdAt: new Date(),
        });
        // Push the new reaction instance into the reactions array
        thought.reactions.push(reaction);
        yield thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Remove a reaction
export const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findById(req.params.thoughtId);
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
        yield thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
