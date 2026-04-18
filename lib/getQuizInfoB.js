"use server"

import { connectToQuizDB } from "./quiz"
import { getQuizModel } from "@/models/Quiz"
import mongoose from "mongoose";

export async function getQuizes(id) {
    const quizConn = await connectToQuizDB();
    const Quiz = getQuizModel(quizConn);
    console.log("id is ", id)

    const quizArray = await Quiz.find({ createdBy: id });

    const arr = quizArray.map(quiz => ({
        ...quiz.toObject(),
        _id: quiz._id.toString(),
        createdBy: quiz.createdBy.toString()
    }));

    return { success: true, arra: arr };
}