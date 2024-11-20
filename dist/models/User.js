import { Schema, model, Types } from 'mongoose';
// User schema definition
const UserSchema = new Schema({
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
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', UserSchema);
export default User;
