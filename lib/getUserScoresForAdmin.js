"use server"

import { connectScoreDB } from "./scoredb";
import { getScoreModel } from "@/models/quizScore";

export async function getScores(id) {
    console.log("ye quiz id hai", id)
    const scoreConn = await connectScoreDB();
    const Score = getScoreModel(scoreConn);
    console.log("id is ", id)

    const quizArray = await Score.find({ quizId: id });

    const arr = quizArray.map(quiz => ({
        ...quiz.toObject(),
        _id: quiz._id.toString(),
        createdBy: quiz.createdBy.toString(),
        userId: quiz.userId.toString(),
    }));
    console.log(arr)

    return { success: true, arra: arr };
}