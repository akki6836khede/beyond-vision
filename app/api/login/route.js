import { NextResponse } from "next/server"
import { loginUser } from "@/lib/login_validate"
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const body = await req.json()

        const suc = await loginUser({
            get: (key) => body[key]
        })

        if (!suc.success) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 }
            )
        }

        const token = jwt.sign(
            suc.user,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        const response = NextResponse.json({ user: suc.user })

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60,
            path: "/",
        })

        return response

    } catch (err) {
        console.error("LOGIN ERROR 👉", err);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        )
    }
}
