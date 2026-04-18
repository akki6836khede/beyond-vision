"use server"

import { connectToQuizQuestionDB } from "./quizQuestiondb"
import { getQuizQuestionModel } from "@/models/QuizQuestionModel"

export async function getAllQuestionForUser(quizId) {
    const quizConn = await connectToQuizQuestionDB()
    const Quiz = getQuizQuestionModel(quizConn)

    const quizArray = await Quiz.find({ quizId: quizId });

    const arr = quizArray.map(quiz => ({
        ...quiz.toObject(),
        _id: quiz._id.toString(),
        adminId: quiz.adminId.toString(),
        quizId: quiz.quizId.toString(),
    }));

    const easyArray = arr.filter(item => {
        return item.difficulty === "easy"
    })

    const mediumArray = arr.filter(item => {
        return item.difficulty === "medium"
    })

    const hardArray = arr.filter(item => {
        return item.difficulty === "hard"
    })

    return { success: true, easyArray: easyArray, mediumArray: mediumArray, hardArray: hardArray };
}