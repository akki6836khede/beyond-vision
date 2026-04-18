
"use client"

import React, { useEffect, useState, useRef, } from 'react'

const Quiz = ({ user, quizArray, quizInfo }) => {

    const quizRef = useRef(null);
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [warning, setWarning] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                setTabSwitchCount(prev => prev + 1);
                setWarning("⚠️ Tab switch detected!");
            }
        };

        const handleBlur = () => {
            setTabSwitchCount(prev => prev + 1);
            setWarning("⚠️ Window focus lost!");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setWarning("⚠️ Fullscreen exited!");
                setTabSwitchCount(prev => prev + 1);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);


    useEffect(() => {
        if (!submitted) return;

        const text = `
        Quiz submitted successfully.
        Your scores are:
        Easy score ${easyScore}.
        Medium score ${mediumScore}.
        Hard score ${hardScore}.
    `;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.9;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);

    }, [submitted]);
    useEffect(() => {
        if (tabSwitchCount >= 3 && !submitted) {
            alert("Too many violations. Submitting quiz.");
            setSubmitted(true);
            setQuizVisibility(false);
            handleSubmit(easyScore, mediumScore, hardScore);
        }
    }, [tabSwitchCount]);


    const [easyArray, setEasyArray] = useState([])
    const [mediumArray, setMediumArray] = useState([])
    const [hardArray, setHardArray] = useState([])

    const [totalQuestion, setTotalQuestion] = useState(0)

    const [timer, setTimer] = useState(quizInfo.duration * 60 * 1000)
    const [quizVisibility, setQuizVisibility] = useState(true);

    const [easyIndex, setEasyIndex] = useState(0)
    const [mediumIndex, setMediumIndex] = useState(0)
    const [hardIndex, setHardIndex] = useState(0)

    const [easyScore, setEasyScore] = useState(0)
    const [mediumScore, setMediumScore] = useState(0)
    const [hardScore, setHardScore] = useState(0)

    const [currentArray, setCurrentArray] = useState([])
    const [iterator, setIterator] = useState(0)

    const [currentAnswer, setCurrentAnswer] = useState(null)

    const startListening = () => {
        console.log("🎤 Listening started...");

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Not supported");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            console.log("✅ Mic ON");
        };

        recognition.onresult = (event) => {
            console.log("🔥 RESULT EVENT TRIGGERED");
            console.log(event.results);

            const transcript = event.results[0][0].transcript;
            console.log("User said:", transcript);

            handleVoiceAnswer(transcript, currentArray[iterator]);
        };

        recognition.onerror = (err) => {
            console.error("❌ Error:", err);
        };

        recognition.onend = () => {
            console.log("🛑 Mic stopped");
        };

        recognition.start();
    };

    const handleVoiceAnswer = (transcript, question) => {
        if (!question) return;

        const cleaned = transcript.toLowerCase().trim();

        let selected = null;

        if (cleaned.includes("a")) selected = question.optionA;
        else if (cleaned.includes("b")) selected = question.optionB;
        else if (cleaned.includes("c")) selected = question.optionC;
        else if (cleaned.includes("d")) selected = question.optionD;

        if (selected) {
            setCurrentAnswer(selected);

            setTimeout(() => {
                handleNext(selected);
            }, 200);
        } else {
            alert("Say A, B, C or D");
        }
    };

    async function handleSubmit(easyScore, mediumScore, hardScore) {
        const res = await fetch("/api/submitUserQuiz", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                easyScore,
                mediumScore,
                hardScore,
                quizInfo,
                user
            }),
        })
        const data = await res.json()
        console.log("Submitted:", data)
    }

    const formatTime = (time) => {
        const totalSeconds = Math.floor(time / 1000)

        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1000) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1000
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const handleNext = (selectedAnswer) => {
        const currentQ = currentArray[iterator];
        if (!currentQ) return;

        setTotalQuestion(prev => prev + 1);

        let nextArray = currentArray;
        let nextIndex = iterator;

        const isCorrect = currentQ.correctOption === selectedAnswer;

        if (isCorrect) {
            if (currentQ.difficulty === "easy") {
                setEasyScore(prev => prev + 1);
                nextArray = mediumArray;
                nextIndex = mediumIndex;
                setEasyIndex(prev => prev + 1);
            }
            else if (currentQ.difficulty === "medium") {
                setMediumScore(prev => prev + 1);
                nextArray = hardArray;
                nextIndex = hardIndex;
                setMediumIndex(prev => prev + 1);
            }
            else {
                setHardScore(prev => prev + 1);
                nextArray = hardArray;
                nextIndex = hardIndex + 1;
                setHardIndex(prev => prev + 1);
            }
        } else {
            if (currentQ.difficulty === "easy") {
                nextArray = easyArray;
                nextIndex = easyIndex + 1;
                setEasyIndex(prev => prev + 1);
            }
            else if (currentQ.difficulty === "medium") {
                nextArray = easyArray;
                nextIndex = easyIndex;
                setMediumIndex(prev => prev + 1);
            }
            else {
                nextArray = mediumArray;
                nextIndex = mediumIndex;
                setHardIndex(prev => prev + 1);
            }
        }

        setCurrentArray(nextArray);
        setIterator(nextIndex);
        setCurrentAnswer(null);
    };

    // const speakFullQuestion = (q) => {
    //     if (!window.speechSynthesis || totalQuestion >= easyArray.length) return

    //     const text = `
    //     {totalQuestion + 1 > 1 ? Submitted}.
    //     ${q.question}.
    //     Option A: ${q.optionA}.
    //     Option B: ${q.optionB}.
    //     Option C: ${q.optionC}.
    //     Option D: ${q.optionD}.
    // `

    //     const utterance = new SpeechSynthesisUtterance(text)

    //     utterance.lang = "en-US"
    //     utterance.rate = 0.9
    //     utterance.pitch = 1

    //     window.speechSynthesis.cancel()
    //     window.speechSynthesis.speak(utterance)
    // }

    const speakFullQuestion = (q) => {
        if (!window.speechSynthesis || totalQuestion >= easyArray.length) return;

        const prefix = totalQuestion > 0 ? "Submitted... " : "";

        const text = `
        ${prefix}
        ${q.question}.
        Option A: ${q.optionA}.
        Option B: ${q.optionB}.
        Option C: ${q.optionC}.
        Option D: ${q.optionD}.
    `;

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";
        utterance.rate = 0.9;
        utterance.pitch = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };


    useEffect(() => {
        if (!easyArray.length) return;

        if ((timer <= 0 || totalQuestion >= easyArray.length) && !submitted) {
            setSubmitted(true);
            setQuizVisibility(false);
            handleSubmit(easyScore, mediumScore, hardScore);
        }
    }, [timer, totalQuestion, easyArray]);

    useEffect(() => {
        async function func() {
            const res = await fetch("/api/getQuizForUser", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quizId: quizInfo._id }),
            })
            const data = await res.json()

            setEasyArray(data.data.easyArray)
            setMediumArray(data.data.mediumArray)
            setHardArray(data.data.hardArray)
        }
        func()
    }, [])

    const micBtnRef = useRef(null);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === " ") {
                e.preventDefault();

                // 👉 real button click trigger
                micBtnRef.current?.click();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    useEffect(() => {
        if (easyArray.length > 0) {
            setCurrentArray(easyArray)
            setIterator(0)
        }
    }, [easyArray])

    const currentQ = currentArray[iterator]
    useEffect(() => {
        if (currentQ) {
            speakFullQuestion(currentQ)
        }
    }, [currentQ])
    if (!currentQ) {
        return <div className='text-white'>Loading or Quiz Finished...</div>
    }
    if (submitted) {
        return (
            <div className="w-full h-[80%] flex justify-center items-center">
                <div className="bg-black text-white p-8 rounded-2xl flex flex-col items-center gap-4 shadow-lg">
                    <h1 className="text-2xl font-bold text-green-400">
                        ✅ Quiz Submitted Successfully!
                    </h1>

                    <p className="text-lg">Thanks for attempting the quiz.</p>

                    <div className="text-sm text-gray-300 mt-2">
                        <p>Easy Score: {easyScore}</p>
                        <p>Medium Score: {mediumScore}</p>
                        <p>Hard Score: {hardScore}</p>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='w-[100%] h-[80%] rounded-2xl bg-black flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>

                {
                    quizVisibility &&
                    <div className="lower w-[95%] h-[90%] flex gap-2 justify-start items-center overflow-y-scroll scrollbar-hide font-bold text-white">
                        <div className="left w-[85%] flex flex-col gap-4 justify-start items-center h-[100%]">
                            <div className="question bg-zinc-900  w-[95%] h-40 pl-4 flex justify-start items-start pt-4 border-gray-400 rounded-sm"><span className='mr-2 text-blue-400'>[{totalQuestion + 1}]</span>{currentQ.question}</div>

                            <div className="options w-[95%] h-42 flex justify-between items-center flex-wrap">
                                <div className='bg-zinc-900 hover:bg-white cursor-pointer hover:text-black w-[49.5%] h-19 flex justify-start pl-4 items-center  border-gray-400 rounded-sm' onClick={() => setCurrentAnswer(currentQ.optionA)}>{currentQ.optionA}</div>
                                <div className='bg-zinc-900 hover:bg-white cursor-pointer hover:text-black w-[49.5%] h-19 flex justify-start pl-4 items-center  border-gray-400 rounded-sm' onClick={() => setCurrentAnswer(currentQ.optionB)}>{currentQ.optionB}</div>
                                <div className='bg-zinc-900 hover:bg-white cursor-pointer hover:text-black w-[49.5%] h-19 flex justify-start pl-4 items-center  border-gray-400 rounded-sm' onClick={() => setCurrentAnswer(currentQ.optionC)}>{currentQ.optionC}</div>
                                <div className='bg-zinc-900 hover:bg-white cursor-pointer hover:text-black w-[49.5%] h-19 flex justify-start pl-4 items-center border-gray-400 rounded-sm' onClick={() => setCurrentAnswer(currentQ.optionD)}>{currentQ.optionD}</div>
                            </div>

                            <div className='w-[95%] h-20 flex justify-start items-center'>

                            </div>
                            <button
                                disabled={!currentAnswer} className='text-white cursor-pointer w-30 h-10 rounded-md text-[15px] bg-gradient-to-br from-blue-500 to-violet-500'
                                onClick={() => {
                                    handleNext(currentAnswer)
                                }}
                            >
                                Save & next
                            </button>
                        </div>
                        <div className="right w-[15%] flex justify-center flex-col justify-start items-center items-center h-[100%]">
                            <div className="flex gap-2 flex-col justify-evenly items-center">
                                <div className="text-white text-2xl font-bold bg-black/40 px-4 py-2 rounded-md">
                                    Time left
                                </div>
                                <div className="text-white text-2xl font-bold bg-black/40 px-4 py-2 rounded-md mb-4">
                                    ⏱ {formatTime(timer)}
                                </div>
                                <button
                                    onClick={() => speakFullQuestion(currentQ)}
                                    className="bg-gradient-to-br from-green-500 via-green-700 to-green-400 text-white px-3 py-1 rounded-md w-25 h-15"
                                >
                                    🔊 Read
                                </button>

                                <button
                                    onClick={() => window.speechSynthesis.cancel()}
                                    className="bg-gradient-to-br from-red-500 via-red-700 to-red-400 text-white px-3 py-1 rounded-md w-25 h-15"
                                >
                                    ⏹ Stop
                                </button>
                                <button
                                    ref={micBtnRef}
                                    onClick={startListening}
                                    className="bg-gradient-to-br from-blue-500 via-blue-700 to-blue-400 text-white px-3 py-1 rounded-md w-25 h-15"
                                >
                                    🎤 Speak
                                </button>
                                <div className="w-40 h-20 mt-4 mb-4 text-right text-sm">
                                    <div className="text-red-400">{warning}</div>
                                    <div className="text-white">Tab switches: {tabSwitchCount}</div>
                                </div>
                                <div className="w-40 h-20 mt-4 text-green-500 mb-4 text-right text-sm">
                                    {currentQ.difficulty}
                                </div>
                            </div>
                        </div>


                    </div>
                }
            </div>
        )
    }


}

export default Quiz
