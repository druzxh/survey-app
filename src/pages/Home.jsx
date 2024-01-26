import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';

const Home = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState(localStorage.getItem('mode') || "");
    const [currentQuest, setCurrentQuest] = useState(0);
    const [finishQuest, setFinishQuest] = useState(false);
    const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('answers')) || []);

    // Dummy Quests 
    const questionData = [
        {
            number: 1,
            question: "How often do you exercise?",
            options: ["Every day", "2-3 times/week", "Rarely or never"]
        },
        {
            number: 2,
            question: "What is your preferred mode of transportation?",
            options: ["Car", "Public transportation", "Bicycle or walking"]
        },
        {
            number: 3,
            question: "How do you prefer to relax after a long day?",
            options: ["Watching TV or movies", "Reading a book", "Listening to music"]
        },
        {
            number: 4,
            question: "What type of cuisine do you enjoy the most?",
            options: ["Italian", "Asian", "Mediterranean"]
        },
        {
            number: 5,
            question: "How do you stay informed about current events?",
            options: ["News websites/apps", "Social media", "Newspapers or magazines"]
        },
        {
            number: 6,
            question: "What is your favorite leisure activity?",
            options: ["Playing sports", "Gaming", "Arts and crafts"]
        },
        {
            number: 7,
            question: "How do you handle stress?",
            options: ["Exercise", "Meditation or mindfulness", "Talking to friends/family"]
        },
        {
            number: 8,
            question: "What is your preferred season of the year?",
            options: ["Spring", "Summer", "Fall or Winter"]
        },
        {
            number: 9,
            question: "How do you prefer to learn new things?",
            options: ["Online courses", "Books", "Hands-on experience"]
        },
        {
            number: 10,
            question: "What type of music do you enjoy the most?",
            options: ["Pop", "Rock", "Electronic or Hip-hop"]
        },
    ];

    const [totalTime, setTotalTime] = useState(questionData.length * 60);
    const [remainingTime, setRemainingTime] = useState(totalTime);

    const handleStartClick = () => {
        setMode("quest");
        localStorage.setItem("mode", "quest")
        localStorage.removeItem("answers")
        setAnswers([])
        setTotalTime(questionData.length * 60);
        setRemainingTime(totalTime);
        const countdownInterval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(countdownInterval);
                    setFinishQuest(true);
                    return 0;
                }
            });
        }, 1000);
    };

    const handleAnswerSubmit = () => {
        localStorage.setItem("answers", JSON.stringify(answers));
        if (finishQuest) {
            navigate("/results", { state: { answers, questionData } });
        }
        setMode("")
        localStorage.removeItem("answers")
        localStorage.removeItem("mode")
    };

    const handleNextQuest = () => {
        setCurrentQuest((prevQuest) => {
            const notAnswerFind = answers.find((item) => item.number === questionData[currentQuest].number);
            if (prevQuest < questionData.length - 1) {
                localStorage.setItem("answers", JSON.stringify(answers));
                if (!notAnswerFind) {
                    return prevQuest
                }
                return prevQuest + 1;
            } else {
                setFinishQuest(true);
                return prevQuest;

            }
        });
    };

    useEffect(() => {
        if (currentQuest === questionData.length - 1) {
            setFinishQuest(true)
        }
    }, [currentQuest])

    useEffect(() => {
        if (remainingTime === 0) {
            navigate("/results", { state: { answers, questionData } });
        }
    }, [remainingTime])

    return (
        <div className='flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-pink-500'>
            {mode === "quest" ? (
                <div className=' min-h-screen flex flex-col justify-between px-5'>
                    <div className="flex items-center justify-center mt-4 mb-8">
                        {Array.from({ length: questionData.length }, (_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-4 mx-1 ${currentQuest === index ? 'bg-blue-500' : 'bg-white'}`}
                            ></div>
                        ))}
                    </div>
                    <Question
                        data={questionData}
                        number={questionData[currentQuest].number}
                        question={questionData[currentQuest].question}
                        options={questionData[currentQuest].options}
                        answers={answers}
                        setAnswers={setAnswers}
                        onAnswerFinish={handleAnswerSubmit}
                        onNextClick={handleNextQuest}
                    />
                    <div className="">
                        <h2 className="text-center text-2xl font-bold text-white m-2">{Math.floor(remainingTime / 60) + "m"}:{(remainingTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</h2>
                    </div>
                    <div className="mb-4 mt-auto text-white text-center">
                        &copy; 2024 Badrudin
                    </div>
                </div>
            ) : (
                <div className='grid lg:grid-cols-1 lg:mx-32 lg:px-32'>
                    <div className='md:flex md:flex-col mt-5 md:mb-1 mb-3'>
                        <div className='grid'>
                            <h1 className='text-white text-2xl md:text-4xl font-bold  md:mb-2'>Survey App</h1>
                        </div>
                        <div className='grid lg:grid-cols-1 p-4'>
                            <button
                                className="bg-sky-500 text-white hover:bg-sky-700 rounded p-2"
                                onClick={handleStartClick}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;
