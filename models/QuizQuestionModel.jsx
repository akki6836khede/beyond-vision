import mongoose from "mongoose"

const quizQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },

    optionA: {
        type: String,
        required: true,
        trim: true
    },

    optionB: {
        type: String,
        required: true,
        trim: true
    },

    optionC: {
        type: String,
        required: true,
        trim: true
    },

    optionD: {
        type: String,
        required: true,
        trim: true
    },

    correctOption: {
        type: String,
        required: true,
        trim: true
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },

    difficulty: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });

export function getQuizQuestionModel(connection) {
    return connection.models.QuizQuestion || connection.model("QuizQuestion", quizQuestionSchema)
}