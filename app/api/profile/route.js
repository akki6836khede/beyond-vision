"use server"

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "No token found" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json(
            { user: decoded },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Session expired or invalid token" },
            { status: 401 }
        );
    }
}
