import React from 'react'
import Form from 'next/form'
import { useState } from 'react';

const FormCreateQuiz = ({ user }) => {
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const formdata = new FormData(e.target)
    //     const res = await fetch("/api/saveQuizInfo", {
    //         method: "POST",
    //         credentials: "include",
    //         body: formdata,
    //     })
    //     const data = await res.json()
    //     console.log(data)
    // }
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);

        try {
            const res = await fetch("/api/saveQuizInfo", {
                method: "POST",
                credentials: "include",
                body: formdata,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ Quiz created successfully!");
                e.target.reset(); // optional: clears form
            } else {
                setMessage("❌ Failed to create quiz");
            }

        } catch (err) {
            console.error(err);
            setMessage("❌ Something went wrong");
        }
    };
    console.log(user)
    return (
        <div className='w-[65%] lg:w-[60%] h-[80%] rounded-2xl bg-black to-slate-800 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className='w-[80%] text-gray-100 text-3xl font-bold flex justify-start items-center'>
                Enter the details below
            </div>
            <Form onSubmit={handleSubmit} className="h-[80%] w-[100%] flex flex-col justify-evenly items-center">
                <input type="text" name='quiztitle' placeholder='Enter quiz title here' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center bg-zinc-900' />
                <input type="hidden" name='adminId' placeholder='Enter quiz title here' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center bg-zinc-900' value={user.id} />
                <input type="number" name='noofquestions' placeholder='Enter total no. of questions here' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center bg-zinc-900' />
                <input type="number" name='duration' placeholder='Enter duration of quiz here' className='w-[80%] h-10 rounded-md border-1 border-gray-300 text-gray-100 pl-2 font-bold flex justify-center items-center bg-zinc-900' />
                <div className='w-[80%] flex justify-between items-center'>
                    <label className="text-gray-100 text-[15px]">Starting time:</label>
                    <input type="datetime-local" name='startingTime' placeholder='Enter starting time here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 pl-2 text-gray-400 font-bold flex justify-center items-center bg-zinc-900' />
                </div>
                <div className='w-[80%] flex justify-between items-center'>
                    <label className="text-gray-100 text-[15px]">Ending time:</label>
                    <input type="datetime-local" name='endTime' placeholder='Enter ending time here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 pl-2 text-gray-400 font-bold flex justify-center items-center bg-zinc-900' />
                </div>
                <button type='submit' className='w-30 h-10 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white rounded-lg flex justify-center items-center font-bold'>Proceed</button>
                {message && (
                    <div className="text-green-400 font-bold text-lg">
                        {message}
                    </div>
                )}
            </Form>
        </div>
    )
}

export default FormCreateQuiz
