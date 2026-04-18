"use server"

import { connectScoreDB } from "./scoredb";
import { getScoreModel } from "@/models/quizScore";

export async function saveUserQuizScore(easyScore, mediumScore, hardScore, quizInfo, user) {
    const scoreConn = await connectScoreDB();
    const Score = getScoreModel(scoreConn);

    const total = quizInfo.noofquestions
    const totalScore =
        (total >= 1 ? 1 : 0) +
        (total >= 2 ? 3 : 0) +
        (total > 2 ? (total - 2) * 5 : 0);

    const userCore = (easyScore + mediumScore * 3 + hardScore * 5)

    const percentScore = (userCore / totalScore) * 100
    console.log("ye hai score:", percentScore)

    try {
        const saved = await Score.create({
            quiztitle: quizInfo.quiztitle,
            noofquestions: quizInfo.noofquestions,
            startingTime: quizInfo.startingTime,
            endTime: quizInfo.endTime,
            createdBy: quizInfo.createdBy,
            duration: quizInfo.duration,
            uniqueId: quizInfo.uniqueId,
            userId: user.id,
            easyScore: easyScore * 1,
            mediumScore: mediumScore * 3,
            hardScore: hardScore * 5,
            userName: user.userId,
            percentScore: percentScore,
            quizId: quizInfo._id
        });

        console.log("✅ Saved:", saved);

    } catch (err) {
        console.error("❌ Mongo Error:", err);
    }

    return { success: true, easyScore: easyScore, mediumScore: mediumScore, hardScore: hardScore };
}