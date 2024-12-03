import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;
const MONGO_URI = process.env.DATABASE_URL;

export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(MONGO_URI!, {
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000
    });
    cachedConnection = cnx.connection;
    console.log("New mongodb connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
