import { createQuiz } from "@/lib/saveQuiz";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.formData()
        const suc = await createQuiz(data)
        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Quiz created succesfully",
                    success: true
                },
                { status: 201 }
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