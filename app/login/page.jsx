"use client"

import Image from "next/image"
import Form from 'next/form'
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = e.target.userId.value
        const password = e.target.password.value
        const res = await fetch("/api/login",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ userId, password })
            }
        )
        if (!res.ok) {
            let errorMessage = "Something went wrong"

            try {
                const error = await res.json()
                errorMessage = error.message
            } catch (err) {
                console.log("No JSON body in error response")
            }

            alert(errorMessage)
            return
        }


        const data = await res.json()

        if (data.user.role === "user") {
            router.push("/dashboardUser")
        } else {
            router.push("/dashboardAdmin")
        }
    }
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-gradient-to-r from-zinc-500 to-gray-300'>
            <div className="mainbox w-[70%] h-[70%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
              shadow-2xl shadow-2xl rounded-3xl flex justify-evenly items-center">
                <div className="h-[100%] w-[60%] relative rounded-3xl">
                    <Image
                        src="/loginimage.png"
                        alt="pharma logo"
                        fill
                        className="object-cover rounded-l-3xl"
                    />
                </div>
                <Form onSubmit={handleSubmit} className="h-[100%] w-[40%] flex flex-col justify-evenly items-center">
                    <Image src="/FullLogo_Transparent (2).png" width={200} height={200} alt="pharma logo" />
                    <input type="text" name='userId' placeholder='Enter product name here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 text-gray-400 pl-2 font-bold flex justify-center items-center' />
                    <input type="password" name='password' placeholder='Enter product price here' className='w-[70%] h-10 rounded-md border-1 border-gray-300 pl-2 text-gray-400 font-bold flex justify-center items-center' />
                    <button type='submit' className='w-[70%] h-10 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white rounded-lg flex justify-center items-center font-bold'>Login</button>
                    <div className="text-blue-400 mb-4 cursor-pointer text-[15px]" onClick={() => {
                        router.push("/register")
                    }}>
                        New user? Create Your Account
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default page
