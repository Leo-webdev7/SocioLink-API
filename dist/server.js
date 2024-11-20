import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectDB(); // Establish the database connection
// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
