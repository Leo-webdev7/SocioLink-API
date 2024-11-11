import { Schema, model, Document } from "mongoose";
import ReactionSchema from "./Reaction";

// Interface for TypeScript
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof ReactionSchema[];
    reactionCount?: number; // Virtual property
}

// Thought schema definition
const ThoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        dafault: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
    }, {
        toJSON: {
            virtuals: true,
            getters: true
        },
        toObject: {
            virtuals: true,
            getters: true
    }
});

// Create a virtual property `reactionCount` that gets the number of reactions
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);

export default Thought;