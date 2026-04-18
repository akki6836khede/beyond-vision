import mongoose from "mongoose"

const quizSchema = new mongoose.Schema({
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
}, { timestamps: true });

export function getQuizModel(connection) {
    return connection.models.Quiz || connection.model("Quiz", quizSchema)
}