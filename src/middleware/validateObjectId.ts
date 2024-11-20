import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// Middleware to validate ObjectId
export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { thoughtId, reactionId } = req.params;

  // Validate `thoughtId`
  if (thoughtId && !mongoose.Types.ObjectId.isValid(thoughtId)) {
    res.status(400).json({ message: 'Invalid ThoughtId format' });
    return; // Explicitly stop execution
  }

  // Validate `reactionId`
  if (reactionId && !mongoose.Types.ObjectId.isValid(reactionId)) {
    res.status(400).json({ message: 'Invalid ReactionId format' });
    return; // Explicitly stop execution
  }

  // If everything is valid, call the next middleware
  next();
};
