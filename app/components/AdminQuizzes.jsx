"use client"

import React, { useEffect, useState } from 'react'

const AdminQuizCard = ({ user, quizArray, setBool1, setQuizInfo, setBool_a }) => {
    const [quizIn, setQuizIn] = useState({})
    return (
        <div className='w-[100%] h-[80%] rounded-2xl bg-black flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="w-[95%] flex-shrink-0 h-48 lg:h-20 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex flexborder-amber-50 text-white justify-between items-center font-bold rounded-xl lg:rounded-md mb-2">
                Quizes with the given admin ID
                <button className='w-13 h-6 bg-red-500 text-white rounded-md' onClick={() => {
                    setBool1(prev => !prev)
                }}>
                    close
                </button>
            </div>
            <div className="w-[95%] flex-shrink-0 h-48 lg:h-20 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex flexborder-amber-50 text-white justify-between items-center rounded-xl lg:rounded-md mb-2 font-bold">
                <div className='bg-zinc-900 h-[100%] w-[28%] flex justify-center items-center'>
                    Quiz name
                </div>
                <div className='bg-zinc-900 h-[100%] w-[7%] flex justify-center items-center'>
                    Questions
                </div>
                <div className='bg-zinc-900 h-[100%] w-[9%] flex justify-center items-center'>
                    Unique ID
                </div>
                <div className='bg-zinc-900 h-[100%] w-[20%] flex justify-center items-center'>
                    Starting time
                </div>
                <div className='bg-zinc-900 h-[100%] w-[20%] flex justify-center items-center'>
                    Ending time
                </div>
                <div className='bg-zinc-900 h-[100%] w-[12%] flex justify-center items-center'>

                    Actions
                </div>
            </div>
            <div className="lower w-[95%] h-[90%] flex flex-col flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {quizArray
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 h-48 lg:h-20 relative shadow-[0_0_40px_rgba(0,0,0,0.25) flex flexborder-amber-50 text-white justify-between items-center rounded-xl lg:rounded-md">
                                <div className='bg-zinc-900 h-[100%] w-[28%] flex justify-center items-center'>
                                    {item.quiztitle}
                                </div>
                                <div className='bg-zinc-900 h-[100%] w-[7%] flex justify-center items-center'>
                                    {item.noofquestions}
                                </div>
                                <div className='bg-zinc-900 h-[100%] w-[9%] flex  justify-center items-center'>
                                    {item.uniqueId}
                                </div>
                                <div className='bg-zinc-900 h-[100%] w-[20%] flex justify-center items-center'>
                                    {item.createdAt ? new Date(item.startingTime).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Kolkata'
                                    }) : 'Pending'}
                                </div>
                                <div className='bg-zinc-900 h-[100%] w-[20%] flex justify-center items-center'>
                                    {item.createdAt ? new Date(item.endTime).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Kolkata'
                                    }) : 'Pending'}
                                </div>
                                <div className='bg-zinc-900 h-[100%] w-[12%] flex justify-center items-center'>

                                    <button className='w-30 h-8 rounded-md bg-gradient-to-br font-bold from-blue-500 via-blue-700 to-violet-600 text-white' onClick={() => {
                                        setQuizInfo(item)
                                        setBool1(true)
                                        setBool_a(prev => !prev)
                                    }}>
                                        Attempt quiz
                                    </button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default AdminQuizCard
