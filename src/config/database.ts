import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
        console.error("DB_CONNECTION_STRING is not defined in environment variables");
        process.exit(1); // Exit process with failure
    }

    try {
        await mongoose.connect(connectionString);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
