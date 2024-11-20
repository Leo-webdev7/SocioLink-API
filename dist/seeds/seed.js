var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Thought from '../models/Thought';
dotenv.config();
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');
        // Clear existing data
        yield User.deleteMany({});
        yield Thought.deleteMany({});
        console.log('Cleared existing data');
        // Seed users
        const users = [
            { username: 'lernantino', email: 'lernantino@gmail.com' },
            { username: 'john_doe', email: 'john.doe@example.com' },
            { username: 'jane_doe', email: 'jane.doe@example.com' },
        ];
        const createdUsers = yield User.insertMany(users);
        console.log('Seeded users');
        // Seed thoughts
        const thoughts = [
            { thoughtText: 'Here\'s a cool thought...', username: 'lernantino' },
            { thoughtText: 'I love coding!', username: 'john_doe' },
            { thoughtText: 'JavaScript is awesome!', username: 'jane_doe' },
        ];
        const createdThoughts = yield Thought.insertMany(thoughts);
        console.log('Seeded thoughts');
        // Associate thoughts with users
        yield Promise.all(createdThoughts.map((thought) => __awaiter(void 0, void 0, void 0, function* () {
            const user = createdUsers.find((user) => user.username === thought.username);
            if (user) {
                user.thoughts.push(thought._id);
                yield user.save();
            }
        })));
        console.log('Associated thoughts with users');
        console.log('Database seeding completed');
        mongoose.connection.close();
    }
    catch (error) {
        console.error('Error seeding the database:', error);
        mongoose.connection.close();
    }
});
seedDatabase();
