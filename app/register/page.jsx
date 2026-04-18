"use client"

import Image from "next/image"
import Form from 'next/form'
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);

        const res = await fetch("/api/register_user", {
            method: "POST",
            credentials: "include",
            body: formdata,
        });

        const data = await res.json();
        console.log(data);
    };
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-gradient-to-r from-zinc-500 to-gray-300'>
            <div className="mainbox w-[60%] h-[70%] bg-black
              shadow-2xl border border-white/10 rounded-3xl flex flex-col justify-evenly items-center">
                <Image src="/FullLogo_Transparent (2).png" width={200} height={200} alt="pharma logo" />
                <Form onSubmit={handleSubmit} className="h-[70%] w-[100%] flex flex justify-evenly items-center">
                    <div className="w-[50%] h-[100%] flex flex-col justify-evenly items-center">
                        <input type="text" name='userId' placeholder='Enter userId here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 text-gray-400 pl-2 font-bold flex justify-center items-center' />
                        <input type="password" name='password' placeholder='Enter password here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 pl-2 text-gray-400 font-bold flex justify-center items-center' />
                        <input type="text" name='userName' placeholder='Enter user`s name here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 text-gray-400 pl-2 font-bold flex justify-center items-center' />
                        <input
                            type="file"
                            accept="image/*"
                            name="profileImage"
                            className="w-[70%] px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 text-white file:text-blue-700 hover:file:bg-blue-200"
                        />
                    </div>
                    <div className="w-[50%] h-[100%] flex flex-col justify-evenly items-center">
                        <input type="text" name='email' placeholder='Enter email here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 pl-2 text-gray-400 font-bold flex justify-center items-center' />
                        <input type="text" name='contactNo' placeholder='Enter contact no. here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 text-gray-400 pl-2 font-bold flex justify-center items-center' />
                        <select
                            name="role"
                            className="w-[70%] h-10 rounded-md border-1 border-gray-300 text-gray-400 pl-2 font-bold flex justify-center items-center"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type='submit' className='w-30 h-10 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white rounded-lg flex justify-center items-center font-bold cursor-pointer'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default page

