"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr"
import QuestionForm from './QuestionForm'

const UserScoreCard = ({ user, quizId, setBool1, quiztitle }) => {
    const fetcher = async ([url, id]) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ quizId: id }),
        });

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        const data = await res.json();
        return data.data.arra;
    };
    const { data: quizArray = [], error, isLoading } = useSWR(
        user ? ["/api/getUserScoresForAdminQuiz", quizId] : null,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );
    console.log("These are user ke scores", quizArray)
    return (
        <div className='w-[50%] border-2 border-gray-500 h-[80%] rounded-2xl bg-black flex flex-col justify-evenly items-center absolute top-[50%] z-100 left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[95%] h-[10%] flex justify-start items-center">
                <button className='w-13 h-6 bg-red-500 text-white rounded-md' onClick={() => {
                    setBool1(prev => !prev)
                }}>
                    close
                </button>
            </div>
            <div className="upper text-white font-bold mb-2 flex justify-center items-center w-[100%] h-[10%]">
                {quiztitle}
            </div>
            <div className="w-[95%] flex-shrink-0 h-48 lg:h-[10%] relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex flexborder-amber-50 text-white justify-evenly items-center rounded-xl lg:rounded-md mb-1">
                <div className='w-[50%] flex bg-zinc-900 h-[100%] justify-center items-center'>
                    User name
                </div>
                <div className='w-[48%] text-green-400 h-[100%] bg-zinc-900 flex justify-center items-center'>
                    Percent score
                </div>
            </div>
            <div className="lower w-[95%] h-[75%] flex flex-col flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {quizArray
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 h-48 lg:h-12 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex flexborder-amber-50 text-white justify-evenly items-center rounded-xl lg:rounded-md">
                                <div className='w-[50%] h-[100%] bg-zinc-900 flex justify-center items-center'>
                                    {item.userName}
                                </div>
                                <div className='w-[48%] h-[100%] bg-zinc-900 text-green-400 flex justify-center items-center'>
                                    {item.percentScore}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default UserScoreCard
