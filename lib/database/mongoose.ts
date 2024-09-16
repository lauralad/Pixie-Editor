/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { 
        conn: null,
        promise: null
    };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if(!MONGODB_URL) {
        throw new Error('MONGODB_URL is not set');
    }
    cached.promise = 
        cached.promise || mongoose.connect(
            MONGODB_URL, 
            {
                dbName: 'pixie-editor',
                bufferCommands: false 
            }
        );
    
    cached.conn = await cached.promise;
    return cached.conn;
};