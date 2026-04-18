import { connectToDB } from "./userdb";
import { User } from "@/models/User";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function saveUser(data) {
    const userId = data.get("userId")
    const password = data.get("password")
    const hashedPassword = await bcrypt.hash(password, 10)
    const userName = data.get("userName")
    const role = data.get("role")
    const email = data.get("email")
    const contactNo = data.get("contactNo")
    const image = data.get("profileImage")
    let imageUrl = "";
    if (image && image.arrayBuffer) {
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'user_images' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        });
        imageUrl = uploadResult.secure_url;
    }
    const userdbconn = await connectToDB()
    const user = await User.findOneAndUpdate(
        { userId },
        {
            userId,
            password: hashedPassword,
            role,
            email,
            userName,
            contactNo,
            image: imageUrl
        },
        { new: true, upsert: true }
    );
    return { success: true }
}