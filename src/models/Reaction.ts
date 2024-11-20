import { Schema, Types, Document, model, SchemaTypeOptions } from "mongoose";

// Reaction schema definition
export interface IReaction extends Document {
  _id: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
  formattedCreatedAt: string; // Virtual field to hold the formatted date
}

const ReactionSchema = new Schema<IReaction>(
  {
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
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
      getters: true,   // Enable getters
    },
    toObject: {
      virtuals: true, // Include virtuals when converting to object
      getters: true,  // Enable getters
    },
    _id: true, // Disable automatic _id for subdocuments
  }
);

// Virtual field to get the formatted date
ReactionSchema.virtual('formattedCreatedAt').get(function (this: IReaction) {
  return this.createdAt.toLocaleString();
});

// Create and export the model
const Reaction = model<IReaction>('Reaction', ReactionSchema);
export default Reaction;
