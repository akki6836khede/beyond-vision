import { getAdminQuizes } from "@/lib/getQuizeByAdminId";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json()
        const suc = await getAdminQuizes(data.id)
        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Admin quizzes fetched succesfully",
                    data: suc.arra,
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