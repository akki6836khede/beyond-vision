import { getAllQuestionForUser } from "@/lib/getAllQuestions";
import { NextResponse } from "next/server";
import { getScores } from "@/lib/getUserScoresForAdmin";

export async function POST(req) {
    try {
        const data = await req.json()
        const suc = await getScores(data.quizId)
        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Scores for quizes fetched succesfully",
                    data: {
                        arra: suc.arra,
                    },
                    success: true
                },
                { status: 200 }
            )
        }
        else {
            return NextResponse.json(
                {
                    message: "Inappropriate data",
                    success: false
                },
                { status: 400 }
            )
        }
    }
    catch (error) {
        return NextResponse.json(
            {
                message: "Server error",
                success: false
            },
            { status: 500 }
        )
    }
}