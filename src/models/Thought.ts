import { Schema, model, Document, Types } from "mongoose";
import ReactionSchema, { IReaction } from "./Reaction";

// Thought interface
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Types.DocumentArray<IReaction>; // Use DocumentArray for subdocuments
}

const ThoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [{
            type: Types.ObjectId,
            ref: 'Reaction',  // Reference the Reaction model
    }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

const Thought = model<IThought>("Thought", ThoughtSchema);
export default Thought;
