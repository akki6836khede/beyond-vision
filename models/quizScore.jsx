import mongoose from "mongoose"

const scoreSchema = new mongoose.Schema({
    quiztitle: {
        type: String,
        required: true,
        trim: true
    },

    noofquestions: {
        type: Number,
        required: true,
        min: 1
    },

    startingTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    uniqueId: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    easyScore: {
        type: Number,
        required: true,
        min: 0
    },
    mediumScore: {
        type: Number,
        required: true,
        min: 0
    },
    hardScore: {
        type: Number,
        required: true,
        min: 0
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    percentScore: {
        type: Number,
        required: true,
        min: 0
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
}, { timestamps: true });

export function getScoreModel(connection) {
    return connection.models.Score || connection.model("Score", scoreSchema)
}