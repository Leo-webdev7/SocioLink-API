var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionString = process.env.DB_CONNECTION_STRING;
    if (!connectionString) {
        console.error("DB_CONNECTION_STRING is not defined in environment variables");
        process.exit(1); // Exit process with failure
    }
    try {
        yield mongoose.connect(connectionString);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process with failure
    }
});
export default connectDB;
