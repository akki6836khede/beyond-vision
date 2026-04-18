import { getAllQuestionForUser } from "@/lib/getAllQuestions";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json()
        const suc = await getAllQuestionForUser(data.quizId)
        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Quiz fetched succesfully",
                    data: {
                        easyArray: suc.easyArray,
                        mediumArray: suc.mediumArray,
                        hardArray: suc.hardArray
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