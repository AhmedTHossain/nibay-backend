// Define a global type for caching the connection in the Node.js global object
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Augment the NodeJS Global interface to include the mongoose cache
  namespace NodeJS {
    interface Global {
      mongoose: MongooseCache;
    }
  }
}
