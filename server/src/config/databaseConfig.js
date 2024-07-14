import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
};

export default connectToDb;