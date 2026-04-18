import { saveQuestions } from "@/lib/quizQuestionSave";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.formData()
        const suc = await saveQuestions(data)
        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Quiz questions added succesfully",
                    success: true
                },
                { status: 201 }
            )
        }
        else {
            return NextResponse.json(
                {
                    message: "Inappropriate question data",
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