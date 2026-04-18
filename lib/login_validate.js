import { connectToDB } from "./userdb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs";

export async function loginUser(data) {
    const userId = data.get("userId")
    const password = data.get("password")

    await connectToDB()

    const doc = await User.findOne({ userId })

    if (!doc) {
        return { success: false }
    }

    const check = await bcrypt.compare(password, doc.password)

    if (!check) {
        return { success: false }
    }

    return {
        success: true,
        user: {
            id: doc._id,
            userId: doc.userId,
            role: doc.role || "user"
        }
    }
}
