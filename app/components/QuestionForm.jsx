"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr"
import Form from 'next/form'

const QuestionForm = ({ user, setBool, item }) => {
    const [message, setMessage] = useState("");
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const formdata = new FormData(e.target)
    //     const res = await fetch("/api/saveQuizQuestions", {
    //         method: "POST",
    //         credentials: "include",
    //         body: formdata,
    //     })
    //     const data = await res.json()
    //     console.log(data)
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);

        try {
            const res = await fetch("/api/saveQuizQuestions", {
                method: "POST",
                credentials: "include",
                body: formdata,
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setMessage("✅ Questions submitted successfully!");
                e.target.reset(); // optional
            } else {
                setMessage("❌ Failed to submit questions");
            }

        } catch (err) {
            console.error(err);
            setMessage("❌ Something went wrong");
        }
    };
    const n = item.noofquestions;
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return (
        <div className='w-[100%] h-[100%] rounded-2xl bg-black flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform border-1 -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[95%] h-[10%] flex justify-start items-center">
                <button className='w-12 h-8 bg-red-500 text-white rounded-md' onClick={() => {
                    setBool(prev => !prev)
                }}>
                    close
                </button>
            </div>
            <div className="lower w-[95%] h-[85%] overflow-y-scroll flex flex-col justify-evenly scrollbar-custom items-center flex-shrink-0" style={{ scrollbarGutter: 'stable' }}>
                <Form onSubmit={handleSubmit} className='h-240 w-[100%] flex flex-col justify-evenly items-center'>

                    <input type="hidden" name='quizId' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center' value={item._id} />

                    <input type="hidden" name='adminId' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center' value={item.createdBy} />

                    <input type="hidden" name='noofquestions' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center' value={item.noofquestions} />

                    <div className="h-[30%] w-[100%] flex flex-col justify-evenly items-center overflow-y-scroll gap-2 flex-shrink-0" style={{ scrollbarGutter: 'stable' }}>
                        <div className='w-[99%] rounded-md text-2xl flex justify-start items-center pl-4 h-15 sticky top-0 bg-black text-white font-bold flex-shrink-0'>Easy questions</div>
                        {arr.map((num) => (
                            <div className='w-[100%] flex flex-col justify-evenly items-center' key={`easy-${num}`} >
                                <input
                                    type="text"
                                    name={`easy-quiztitle-${num}`}
                                    placeholder={`Enter easy Question no. ${num + 1}`}
                                    className='flex-shrink-0 w-[98%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                />
                                <div className='w-[98%] flex justify-between mt-2 items-center'>
                                    <input
                                        type="text"
                                        name={`easy-quiz-op-A-${num}`}
                                        placeholder={`option A`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`easy-quiz-op-B-${num}`}
                                        placeholder={`option B`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`easy-quiz-op-C-${num}`}
                                        placeholder={`option C`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`easy-quiz-op-D-${num}`}
                                        placeholder={`option D`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    />
                                </div>
                                <input
                                    type="text"
                                    name={`easy-correct-${num}`}
                                    placeholder={`Enter correct option here`}
                                    className='flex-shrink-0 w-[98%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 mt-2 font-bold'
                                />
                                <div className='w-[98%] h-2 bg-zinc-700 rounded-full mt-2'>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="h-[30%] w-[100%] flex flex-col justify-evenly items-center overflow-y-scroll gap-2 flex-shrink-0" style={{ scrollbarGutter: 'stable' }}>
                        <div className='w-[99%] rounded-md text-2xl flex justify-start items-center pl-4 h-15 sticky top-0 bg-black text-white font-bold flex-shrink-0'>Medium questions</div>
                        {arr.map((num) => (
                            <div className='w-[100%] flex flex-col justify-evenly items-center' key={`medium-${num}`}>
                                <input
                                    type="text"
                                    name={`medium-quiztitle-${num}`}
                                    placeholder={`Enter medium Question no. ${num + 1}`}
                                    className='flex-shrink-0 w-[98%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                />
                                <div className='w-[98%] flex justify-between mt-2 items-center'>
                                    <input
                                        type="text"
                                        name={`medium-quiz-op-A-${num}`}
                                        placeholder={`option A`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`medium-quiz-op-B-${num}`}
                                        placeholder={`option B`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`medium-quiz-op-C-${num}`}
                                        placeholder={`option C`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`medium-quiz-op-D-${num}`}
                                        placeholder={`option D`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    />
                                </div>
                                <input
                                    type="text"
                                    name={`medium-correct-${num}`}
                                    placeholder={`Enter correct option here`}
                                    className='flex-shrink-0 w-[98%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 mt-2 font-bold'
                                />
                                <div className='w-[98%] h-2 bg-zinc-700 rounded-full mt-2'>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="h-[30%] w-[100%] flex flex-col justify-evenly items-center overflow-y-scroll gap-2 flex-shrink-0" style={{ scrollbarGutter: 'stable' }}>
                        <div className='w-[99%] rounded-md text-2xl flex justify-start items-center pl-4 h-15 sticky top-0 bg-black text-white font-bold flex-shrink-0'>Hard questions</div>
                        {arr.map((num) => (
                            <div className='w-[100%] flex flex-col justify-evenly items-center' key={`hard-${num}`}>
                                <input
                                    type="text"
                                    name={`hard-quiztitle-${num}`}
                                    placeholder={`Enter hard Question no. ${num + 1}`}
                                    className='flex-shrink-0 w-[98%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                />
                                <div className='w-[98%] flex justify-between mt-2 items-center'>
                                    <input
                                        type="text"
                                        name={`hard-quiz-op-A-${num}`}
                                        placeholder={`option A`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`hard-quiz-op-B-${num}`}
                                        placeholder={`option B`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`hard-quiz-op-C-${num}`}
                                        placeholder={`option C`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    /><input
                                        type="text"
                                        name={`hard-quiz-op-D-${num}`}
                                        placeholder={`option D`}
                                        className='flex-shrink-0 w-[24.4%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 font-bold'
                                    />
                                </div>
                                <input
                                    type="text"
                                    name={`hard-correct-${num}`}
                                    placeholder={`Enter correct option here`}
                                    className='flex-shrink-0 w-[98%] h-15 rounded-md border border-gray-300 text-gray-100 pl-2 mt-2 font-bold'
                                />
                                <div className='w-[98%] h-2 bg-zinc-700 rounded-full mt-2'>

                                </div>
                            </div>
                        ))}
                    </div>
                    <button type='submit' className='w-30 h-10 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white rounded-lg flex justify-center mb-4 mt-4 items-center font-bold'>Submit</button>
                    {message && (
                        <div className="text-green-400 font-bold text-lg">
                            {message}
                        </div>
                    )}
                </Form>
            </div >

        </div >
    )
}

export default QuestionForm
