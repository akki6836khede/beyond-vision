import { NextResponse } from "next/server";
import { getQuizes } from "@/lib/getQuizInfoB";

export async function POST(req) {
    try {
        const data = await req.json();
        const id = data.id;
        console.log("server id ", id)

        const suc = await getQuizes(id);

        if (suc.success === true) {
            return NextResponse.json(
                {
                    message: "Quizes fetched successfully",
                    success: true,
                    data: suc.arra
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                message: "Inappropriate data",
                success: false
            },
            { status: 400 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "Server error",
                success: false
            },
            { status: 500 }
        );
    }
}