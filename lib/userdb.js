import mongoose from 'mongoose';

const MONGO_DB_URI = process.env.MONGO_DB_URI;

if (!MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI is not defined in environment variables');
}

let cached = global.mongooseMainDB || { conn: null, promise: null };
global.mongooseMainDB = cached;

export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_DB_URI, {
            bufferCommands: false
        }).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}