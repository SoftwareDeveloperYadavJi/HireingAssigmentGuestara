import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGOURI) {
      throw new Error("MONGOURI is not defined in environment variables.");
    }

    // Connect to MongoDB with proper options
    const connection = await mongoose.connect(process.env.MONGOURI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

// Graceful shutdown to close the connection
const handleShutdown = (signal) => {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Closing MongoDB connection.`);
    await mongoose.connection.close();
    console.log("MongoDB connection closed. Exiting process.");
    process.exit(0);
  });
};

// Attach graceful shutdown signals
["SIGINT", "SIGTERM"].forEach(handleShutdown);

export default connectDB;
