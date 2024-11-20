var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { Types } from 'mongoose';
// Get all users
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get a single user by ID
export const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Getting user by ID:', req.params.id); // Log the ID parameter
    try {
        const userId = new Types.ObjectId(req.params.id); // Convert string to ObjectId
        const user = yield User.findById(userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop execution after sending the response
        }
        res.json(user); // Send the found user
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a new user
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const user = new User({ username, email });
    try {
        const newUser = yield user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Update a user by ID
export const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new Types.ObjectId(req.params.id); // Convert string to ObjectId
        const user = yield User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true } // Return the updated document and validate
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop execution after sending the response
        }
        res.json(user); // Send the updated user
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete a user and their associated thoughts
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new Types.ObjectId(req.params.id); // Convert string to ObjectId
        const user = yield User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop further execution after sending the response
        }
        // Delete all associated thoughts
        yield Thought.deleteMany({ username: user.username });
        res.json({ message: 'User and associated thoughts deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Add a friend
export const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new Types.ObjectId(req.params.userId); // Convert string to ObjectId
        const friendId = new Types.ObjectId(req.params.friendId); // Convert string to ObjectId
        const user = yield User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop further execution after sending the response
        }
        user.friends.push(friendId);
        yield user.save();
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Remove a friend
export const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new Types.ObjectId(req.params.userId); // Convert string to ObjectId
        const friendId = new Types.ObjectId(req.params.friendId); // Convert string to ObjectId
        const user = yield User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Stop further execution
        }
        // Filter out the friendId
        user.friends = user.friends.filter(id => id.toString() !== friendId.toString());
        yield user.save();
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
