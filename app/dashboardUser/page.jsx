// "use client"

// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { useRouter } from "next/navigation"
// import Image from 'next/image'
// import Form from 'next/form'
// import useSWR from 'swr'
// import AdminQuizCard from '../components/AdminQuizzes'
// import Quiz from '../components/QuizComponent'

// const page = () => {
//     const [user, setUser] = useState(null);
//     const [uid, setUid] = useState(null);
//     const [quizInfo, setQuizInfo] = useState({})
//     const router = useRouter();
//     async function logout() {
//         await fetch("/api/logout", { method: "POST" })
//     }
//     useEffect(() => {
//         async function getinfo() {
//             const res = await fetch("/api/profile", {
//                 headers: { "Content-Type": "application/json" },
//                 method: "GET",
//                 credentials: "include",
//             })
//             if (!res.ok) {
//                 router.push("/login")
//             } else {
//                 const data = await res.json()
//                 setUser(data.user)
//             }
//         }
//         getinfo();
//     }, [])
//     console.log("Ye user hai ", user)

//     const fetcher = async ([url, uid]) => {
//         const res = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({ id: uid }),
//         });

//         if (!res.ok) {
//             throw new Error("Something went wrong");
//         }

//         const data = await res.json();
//         return data.data;
//     };
//     const { data: quizAdminArray = [], error, isLoading } = useSWR(
//         user && uid ? ["/api/getAdminQuizes", uid] : null,
//         fetcher,
//         {
//             revalidateOnFocus: true,
//             revalidateOnReconnect: true,
//         }
//     );
//     console.log("User is: ", user)
//     console.log(quizAdminArray)
//     const [it, setIt] = useState({})

//     console.log(user)
//     function handleSubmit(e) {
//         e.preventDefault()
//         const formdata = new FormData(e.target)
//         setUid(formdata.get("uniqueId"))
//         setBool(prev => !prev)
//     }
//     console.log("Abhi wala array: ", quizAdminArray)
//     const [bool, setBool] = useState(false)
//     const [bool1, setBool1] = useState(false)
//     return (
//         <div className="lg:w-full h-[100vh] w-[100vw] lg:min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-gray-900 to-black relative">
//             <div className='w-[100%] lg:container h-screen mx-0 lg:mx-auto flex flex-col justify-between lg:justify-evenly items-center'>
//                 <div className="nav w-full lg:w-[100%] h-[10%] border-b-1 border-gray-400 relative flex lg:flex-row flex-col justify-start rounded-full lg:justify-between pr-8 mt-2 pl-8 items-center border-b-sky-100">
//                     <Image src="/FullLogo_Transparent (2).png" width={140} height={140} alt="pharma logo" />
//                     <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={logout}>Logout</button>
//                 </div>
//                 <div className="lower w-[100%] h-[90%] flex justify-center items-center relative">
//                     {
//                         user && bool &&
//                         <AdminQuizCard user={user} setQuizInfo={setQuizInfo} quizArray={quizAdminArray} item={it} bool1={bool} setBool1={setBool} setBool_a={setBool1}>

//                         </AdminQuizCard>
//                     }
//                     {
//                         user && bool1 &&
//                         <Quiz user={user} item={it} quizInfo={quizInfo} setBool1={setBool1} >

//                         </Quiz>
//                     }
//                     <Form onSubmit={handleSubmit} className='bg-black w-100 h-60 flex flex-col justify-evenly items-center rounded-2xl text-white'>
//                         <input
//                             type="text"
//                             name={`uniqueId`}
//                             placeholder={`Enter unique admin id`}
//                             className='w-[70%] h-10 rounded-md bg-zinc-900 border border-gray-300 text-gray-100 pl-2 font-bold'
//                         />
//                         <button className='bg-white rounded-md font-bold h-8 w-25 text-black'>
//                             get Quizzes
//                         </button>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default page

"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import Image from 'next/image'
import Form from 'next/form'
import useSWR from 'swr'
import AdminQuizCard from '../components/AdminQuizzes'
import Quiz from '../components/QuizComponent'

const page = () => {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [quizInfo, setQuizInfo] = useState({})
    const router = useRouter();

    /* ==============================
       🔒 PROCTORING: FULLSCREEN START
    ============================== */
    const [bool, setBool] = useState(false)
    const [bool1, setBool1] = useState(false)

    const startQuizHandler = () => {
        const el = document.documentElement;

        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => { });
        }

        // 🔥 WAIT till quizInfo is set
        setTimeout(() => {
            setBool1(true);
        }, 300); // small delay
    };

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

    const fetcher = async ([url, uid]) => {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ id: uid }),
        });

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        const data = await res.json();
        return data.data;
    };

    const { data: quizAdminArray = [] } = useSWR(
        user && uid ? ["/api/getAdminQuizes", uid] : null,
        fetcher
    );

    const [it, setIt] = useState({})

    function handleSubmit(e) {
        e.preventDefault()
        const formdata = new FormData(e.target)
        setUid(formdata.get("uniqueId"))
        setBool(prev => !prev)
    }

    return (
        <div className="lg:w-full h-[100vh] w-[100vw] lg:min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-gray-900 to-black relative">
            <div className='w-[100%] lg:container h-screen mx-0 lg:mx-auto flex flex-col justify-between lg:justify-evenly items-center'>

                <div className="nav w-full lg:w-[100%] h-[10%] border-b-1 border-gray-400 relative flex lg:flex-row flex-col justify-start rounded-full lg:justify-between pr-8 mt-2 pl-8 items-center border-b-sky-100">
                    <Image src="/FullLogo_Transparent (2).png" width={140} height={140} alt="pharma logo" />
                    <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={logout}>Logout</button>
                </div>

                <div className="lower w-[100%] h-[90%] flex justify-center items-center relative">

                    {
                        user && bool &&
                        <AdminQuizCard
                            user={user}
                            setQuizInfo={setQuizInfo}
                            quizArray={quizAdminArray}
                            item={it}
                            bool1={bool}
                            setBool1={startQuizHandler}  // ✅ CHANGED HERE
                            setBool_a={setBool1}
                        />
                    }

                    {/* ==============================
                       🔒 QUIZ FULLSCREEN OVERLAY
                    ============================== */}
                    {
                        user && bool1 &&
                        <div className="absolute inset-0 z-[999] bg-black">
                            <Quiz user={user} item={it} quizInfo={quizInfo} setBool1={setBool1} />
                        </div>
                    }

                    <Form onSubmit={handleSubmit} className='bg-black w-100 h-60 flex flex-col justify-evenly items-center rounded-2xl text-white'>
                        <input
                            type="text"
                            name={`uniqueId`}
                            placeholder={`Enter unique admin id`}
                            className='w-[70%] h-10 rounded-md bg-zinc-900 border border-gray-300 text-gray-100 pl-2 font-bold'
                        />
                        <button className='bg-white rounded-md font-bold h-8 w-25 text-black'>
                            get Quizzes
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default page