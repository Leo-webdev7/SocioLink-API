import { Schema, model } from "mongoose";
const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        virtuals: true, // Include virtuals when converting to JSON
        getters: true, // Enable getters
    },
    toObject: {
        virtuals: true, // Include virtuals when converting to object
        getters: true, // Enable getters
    },
    _id: true, // Disable automatic _id for subdocuments
});
// Virtual field to get the formatted date
ReactionSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString();
});
// Create and export the model
const Reaction = model('Reaction', ReactionSchema);
export default Reaction;
