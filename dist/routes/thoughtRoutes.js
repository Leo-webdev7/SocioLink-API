import express from 'express';
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought } from '../controllers/thoughtController.js';
import { addReaction, removeReaction } from '../controllers/reactionController.js';
import { validateThought } from '../middleware/validateThought.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
const router = express.Router();
// Routes
router.route('/')
    .get(getThoughts)
    .post(validateThought, createThought); // Use validateThought middleware
router.route('/:id')
    .get(validateObjectId, getThoughtById) // Validate ObjectId
    .put(validateObjectId, validateThought, updateThought) // Validate ObjectId
    .delete(validateObjectId, deleteThought); // Validate ObjectId
router.route('/:thoughtId/reactions')
    .post(validateObjectId, addReaction); // Validate ObjectId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(validateObjectId, removeReaction); // Validate ObjectId
export default router;
