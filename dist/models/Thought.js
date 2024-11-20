import { Schema, model, Types } from "mongoose";
const ThoughtSchema = new Schema({
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
            ref: 'Reaction', // Reference the Reaction model
        }],
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
const Thought = model("Thought", ThoughtSchema);
export default Thought;
