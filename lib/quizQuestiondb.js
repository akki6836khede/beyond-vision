import mongoose from "mongoose"

const QUIZ_QUESTION_DB_URI = process.env.QUIZ_QUESTION_DB_URI

if (!QUIZ_QUESTION_DB_URI) {
    throw new Error("Please define the QUIZ_QUESTION_DB_URI environment variable")
}

let cached = global.medicineConn1
if (!cached) {
    cached = global.medicineConn1 = { conn: null, promise: null }
}

export async function connectToQuizQuestionDB() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        const conn = mongoose.createConnection(QUIZ_QUESTION_DB_URI, {
            bufferCommands: false,
        })

        cached.promise = conn.asPromise()
    }

    cached.conn = await cached.promise
    return cached.conn
}