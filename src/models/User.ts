import { Schema, model, Document, Types } from 'mongoose';

// Interface for TypeScript
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount?: number; // Virtual property
}

// User schema definition
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON: {
        virtuals: true,
    }, 
    toObject: {
        virtuals: true,
    }
});

// Create a virtual property `friendCount` that gets the number of friends
UserSchema.virtual('friendCount').get(function(this: IUser) {
    return this.friends.length;
});

const User = model<IUser>('User', UserSchema);

export default User;