import { connectToQuizDB } from "./quiz"
import { getQuizModel } from "@/models/Quiz"



export async function createQuiz(data) {
    const quizConn = await connectToQuizDB()
    const Quiz = getQuizModel(quizConn)

    const quiztitle = data.get("quiztitle")
    const noofquestions = data.get("noofquestions")
    const startingTime = data.get("startingTime")
    const endTime = data.get("endTime")
    const adminId = data.get("adminId")
    const duration = data.get("duration")

    function saferCodeFromId(id) {
        const str = BigInt("0x" + id.toString()).toString(36);
        return (
            str.slice(0, 3) +
            "@" +
            str.slice(3, 6) +
            "$" +
            str.slice(6, 8)
        );
    }

    const uniqueId = saferCodeFromId(adminId)

    await Quiz.create({
        quiztitle,
        noofquestions,
        startingTime,
        endTime,
        createdBy: adminId,
        duration,
        uniqueId
    })

    return { success: true }
}