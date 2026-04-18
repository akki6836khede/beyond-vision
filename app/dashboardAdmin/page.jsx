"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import Image from 'next/image'
import FormCreateQuiz from '../components/FormCreateQuiz'
import QuizCard from '../components/quizCard'
import UserScoreCard from '../components/scoreForAdmin'

const page = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [bool, setBool] = useState(false)
    const [bool_n, setBool_n] = useState(1)
    async function logout() {
        await fetch("/api/logout", { method: "POST" })
    }
    useEffect(() => {
        async function getinfo() {
            const res = await fetch("/api/profile", {
                headers: { "Content-Type": "application/json" },
                method: "GET",
                credentials: "include",
            })
            if (!res.ok) {
                router.push("/login")
            } else {
                const data = await res.json()
                setUser(data.user)
            }
        }
        getinfo();
    }, [])
    console.log(user)
    return (
        <div className="lg:w-full h-[100vh] w-[100vw] lg:min-h-screen flex justify-center items-center bg-gradient-to-br from-zinc-900 via-blue-900 to-zinc-800 min-h-screen relative">
            <div className='w-[100%] lg:container h-screen mx-0 lg:mx-auto flex flex-col justify-between lg:justify-evenly items-center'>
                <div className="nav w-full lg:w-[100%] h-[10%] border-b-1 border-gray-400 relative flex lg:flex-row flex-col justify-start rounded-full lg:justify-between pr-8 mt-2 pl-8 items-center border-b-sky-100">
                    <Image src="/FullLogo_Transparent (2).png" width={120} height={120} alt="pharma logo" />
                    <button className='rounded-md w-22 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                        setBool_n(1)
                    }}>Current Quizes</button>
                    <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                        setBool_n(0)
                    }}>Create Quiz</button>
                    <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={logout}>Logout</button>
                </div>
                <div className="lower w-[100%] h-[90%] flex justify-center items-center relative">
                    {
                        user && bool_n == 0 &&
                        <FormCreateQuiz user={user}>

                        </FormCreateQuiz>
                    }
                    {
                        user && bool_n == 1 &&
                        <QuizCard user={user}>

                        </QuizCard>
                    }
                    {/* {
                        user &&
                        <UserScoreCard user={user}>

                        </UserScoreCard>
                    } */}
                </div>
            </div>
        </div>
    )
}

export default page
