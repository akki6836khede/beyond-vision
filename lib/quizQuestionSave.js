import { connectToQuizQuestionDB } from "./quizQuestiondb"
import { getQuizQuestionModel } from "@/models/QuizQuestionModel"

export async function saveQuestions(data) {
    const quizConn = await connectToQuizQuestionDB()
    const Quiz = getQuizQuestionModel(quizConn)

    const noOfQuestions = Number(data.get("noofquestions"))

    const arr = [];

    for (let i = 0; i < noOfQuestions; i++) {
        arr.push(i);
    }

    function buildQuestionArray(level) {
        return arr
            .map((num) => {
                const question = data.get(`${level}-quiztitle-${num}`)
                if (!question) return null

                return {
                    question,
                    optionA: data.get(`${level}-quiz-op-A-${num}`),
                    optionB: data.get(`${level}-quiz-op-B-${num}`),
                    optionC: data.get(`${level}-quiz-op-C-${num}`),
                    optionD: data.get(`${level}-quiz-op-D-${num}`),
                    correctOption: data.get(`${level}-correct-${num}`),
                    adminId: data.get("adminId"),
                    quizId: data.get("quizId"),
                    difficulty: level,
                }
            })
            .filter(Boolean)
    }

    const easy = buildQuestionArray("easy")
    const medium = buildQuestionArray("medium")
    const hard = buildQuestionArray("hard")

    const questions = [...easy, ...medium, ...hard]

    console.log("Questions ye hai ", questions)

    if (questions.length === 0) {
        return { success: false, message: "No questions provided" }
    }

    await Quiz.insertMany(questions)

    return { success: true }
}