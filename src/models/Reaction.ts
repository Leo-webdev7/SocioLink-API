import { Schema } from "mongoose";

// Reaction schema definition

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Schema.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString()
    }
}, {
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    }
});

export default ReactionSchema;