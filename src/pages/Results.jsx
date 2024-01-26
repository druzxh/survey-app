import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { answers, questionData } = location.state || {};

    useEffect(() => {
        if (!answers || answers.length === 0) {
            navigate('/');
        }
    }, [answers, navigate]);

    const handleRestart = () => {
        localStorage.removeItem('answers');
        navigate('/');
    }

    return (
        <div className='flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500'>
            <div className='min-h-screen flex flex-col justify-between px-5'>
                <h1 className='text-white text-2xl md:text-4xl font-bold md:mb-2 text-center mt-2'>Survey Results</h1>

                <div className="mt-4 mb-4 text-center">
                    <button
                        className="bg-green-500 text-white hover:bg-green-700 rounded p-3"
                        onClick={handleRestart}
                    >
                        Restart Survey
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {questionData.map((question) => {
                        const answer = answers.find((item) => item.number === question.number);
                        return (
                            <div key={question.number} className="bg-gradient-to-br from-indigo-400 to-teal-500 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-white mb-4">{`Quest ${question.number}`}</h2>
                                <p className="text-white">{`Question: ${question.question}`}</p>
                                <p className={answer ? "text-white font-bold" : "text-yellow-400 font-bold"}>{`Answer: ${answer ? answer.answer : 'Not answered'}`}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mb-4 mt-auto text-white text-center">
                    &copy; 2024 Badrudin
                </div>
            </div>
        </div>
    );
};

export default Results;
