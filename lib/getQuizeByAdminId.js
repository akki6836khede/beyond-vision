"use server"

import { connectToQuizDB } from "./quiz"
import { getQuizModel } from "@/models/Quiz"

export async function getAdminQuizes(id) {
    const quizConn = await connectToQuizDB();
    const Quiz = getQuizModel(quizConn);

    const now = new Date();

    const quizArray = await Quiz.find({
        uniqueId: id,
        startingTime: { $lte: now },
        endTime: { $gte: now }
    });

    const arr = quizArray.map(quiz => ({
        ...quiz.toObject(),
        _id: quiz._id.toString(),
        createdBy: quiz.createdBy.toString()
    }));

    console.log("ye hai id ", id, "ye hai admin quiz list", arr)

    return { success: true, arra: arr };
}