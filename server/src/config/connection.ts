// ----- FILE COMPLETE -----
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected.");
    return mongoose.connection;
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Database connection failed.");
  }
};

export default db;