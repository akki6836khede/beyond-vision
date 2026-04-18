import { saveUserQuizScore } from "@/lib/saveUserScore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json()

        // ✅ FIX: use direct access (NOT .get())
        const suc = await saveUserQuizScore(
            data.easyScore,
            data.mediumScore,
            data.hardScore,
            data.quizInfo,
            data.user
        )

        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Quiz submitted successfully",
                    success: true
                },
                { status: 201 }
            )
        } else {
            return NextResponse.json(
                {
                    message: "Inappropriate data",
                    success: false
                },
                { status: 400 }
            )
        }

    } catch (error) {
        console.error("ERROR:", error) // ✅ VERY IMPORTANT

        return NextResponse.json(
            {
                message: "Server error",
                success: false
            },
            { status: 500 }
        )
    }
}