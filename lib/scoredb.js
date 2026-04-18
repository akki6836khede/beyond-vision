import mongoose from "mongoose"

const SCORE_DB_URI = process.env.SCORE_DB_URI

if (!SCORE_DB_URI) {
    throw new Error("Please define the SCORE_DB_URI environment variable")
}

let cachedScore = global.scoreConn
if (!cachedScore) {
    cachedScore = global.scoreConn = { conn: null, promise: null }
}

export async function connectScoreDB() {
    if (cachedScore.conn) return cachedScore.conn

    if (!cachedScore.promise) {
        const conn = mongoose.createConnection(SCORE_DB_URI, {
            bufferCommands: false,
        })

        cachedScore.promise = conn.asPromise()
    }

    cachedScore.conn = await cachedScore.promise
    return cachedScore.conn
}