import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Thought from '../models/Thought';
import { Types } from 'mongoose';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!);

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log('Cleared existing data');

    // Seed users
    const users = [
      { username: 'lernantino', email: 'lernantino@gmail.com' },
      { username: 'john_doe', email: 'john.doe@example.com' },
      { username: 'jane_doe', email: 'jane.doe@example.com' },
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Seeded users');

    // Seed thoughts
    const thoughts = [
      { thoughtText: 'Here\'s a cool thought...', username: 'lernantino' },
      { thoughtText: 'I love coding!', username: 'john_doe' },
      { thoughtText: 'JavaScript is awesome!', username: 'jane_doe' },
    ];

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Seeded thoughts');

    // Associate thoughts with users
    await Promise.all(
      createdThoughts.map(async (thought: any) => {
        const user = createdUsers.find((user) => user.username === thought.username);
        if (user) {
          user.thoughts.push(thought._id);
          await user.save();
        }
      })
    );

    console.log('Associated thoughts with users');

    console.log('Database seeding completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
