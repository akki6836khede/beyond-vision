"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr"
import QuestionForm from './QuestionForm'
import UserScoreCard from './scoreForAdmin'

const QuizCard = ({ user }) => {
    const [bool, setBool] = useState(false)
    const [bool1, setBool1] = useState(false)
    const fetcher = async ([url, id]) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        const data = await res.json();
        return data.data;
    };
    const { data: quizArray = [], error, isLoading } = useSWR(
        user ? ["/api/fetchQuizInfo", user.id] : null,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );
    console.log("User is: ", user)
    console.log("ye quiz array hai latest wala", quizArray)
    const [it, setIt] = useState({})
    const [quizId, setQuizId] = useState(null)
    const [quizName, setQuizName] = useState(null)
    return (
        <div className='w-[100%] h-[80%] rounded-2xl bg-black flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            {
                bool &&
                <QuestionForm user={user} setBool={setBool} item={it}>

                </QuestionForm>
            }
            {
                bool1 &&
                <UserScoreCard user={user} setBool1={setBool1} quizId={quizId} quiztitle={quizName}>

                </UserScoreCard>
            }
            <div className="w-[95%] flex-shrink-0 h-[10%] lg:h-20 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex border-amber-50 font-bold text-white justify-between text-xl items-center rounded-xl lg:rounded-md">
                Available quizzes
            </div>
            <div className="w-[95%] flex-shrink-0 h-25 lg:h-25 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex border-amber-50 text-[15px] font-bold text-white justify-between items-center rounded-xl lg:rounded-md mb-2">
                <div className='w-[30%] rounded-md h-[100%] flex bg-zinc-900 justify-center items-center'>
                    Quiz name
                </div>
                <div className='w-[7%] rounded-md h-[100%] bg-zinc-900 flex justify-center items-center'>
                    Questions
                </div>
                <div className='w-[10%] rounded-md h-[100%] flex bg-zinc-900 justify-center items-center'>
                    Admin ID
                </div>
                <div className='w-[18%] rounded-md h-[100%] flex bg-zinc-900 justify-center items-center'>
                    Start time
                </div>
                <div className='w-[18%] rounded-md h-[100%] flex bg-zinc-900 justify-center items-center'>
                    End time
                </div>
                <div className='w-[15%] h-[100%] rounded-md bg-zinc-900 flex flex-col justify-evenly items-center items-center'>
                    Actions
                </div>
            </div>
            <div className="lower w-[95%] h-[77%] flex flex-col gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {quizArray
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 h-48 lg:h-25 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex flexborder-amber-50 text-white justify-between items-center rounded-xl lg:rounded-md">
                                <div className='w-[30%] rounded-md flex justify-center bg-zinc-900 h-[100%] items-center hover:bg-zinc-700'>
                                    {item.quiztitle}
                                </div>
                                <div className='w-[7%] rounded-md text-green-400 flex bg-zinc-900 h-[100%] justify-center items-center hover:bg-zinc-700'>
                                    {item.noofquestions}
                                </div>
                                <div className='w-[10%] rounded-md flex text-blue-500 bg-zinc-900 h-[100%] justify-center items-center hover:bg-zinc-700'>
                                    {item.uniqueId}
                                </div>
                                <div className='w-[18%] rounded-md flex bg-zinc-900 h-[100%] justify-center items-center hover:bg-zinc-700'>
                                    {item.createdAt ? new Date(item.startingTime).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Kolkata'
                                    }) : 'Pending'}
                                </div>
                                <div className='w-[18%] rounded-md bg-zinc-900 h-[100%] flex justify-center items-center hover:bg-zinc-700'>
                                    {item.createdAt ? new Date(item.endTime).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Kolkata'
                                    }) : 'Pending'}
                                </div>
                                <div className='w-[15%] rounded-md bg-zinc-900 h-[100%] h-23 flex flex-col justify-evenly items-center items-center hover:bg-zinc-700'>
                                    <button className='w-30 h-8 rounded-md bg-gradient-to-r from-blue-500 to-blue-800 font-bold text-white' onClick={() => {
                                        setQuizId(item._id)
                                        setQuizName(item.quiztitle)
                                        setBool1(prev => !prev)
                                    }}>
                                        View Scores
                                    </button>
                                    <button className='w-30 h-8 rounded-md bg-gradient-to-r from-blue-500 to-blue-800 font-bold text-white' onClick={() => {
                                        setIt(item)
                                        setBool(prev => !prev)
                                    }}>
                                        Add Questions
                                    </button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default QuizCard
