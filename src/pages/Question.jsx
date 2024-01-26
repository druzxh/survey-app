import React, { useState, useEffect } from 'react';

const Question = ({ data, number, question, options, answers, setAnswers, onAnswerFinish, onNextClick }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isFinish, setIsFinish] = useState(false);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        const answerIndex = answers.findIndex((item) => item.number === number);

        if (answerIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[answerIndex] = { number, question, answer };
            localStorage.setItem("answers", JSON.stringify(updatedAnswers));
            setAnswers(updatedAnswers);
        } else {
            const newAnswer = { number, question, answer };
            setAnswers((prevAnswers) => [...prevAnswers, { number, question, answer }]);
            localStorage.setItem("answers", JSON.stringify([...answers, newAnswer]));
        }
    };

    useEffect(() => {
        const selectedAnswerFromState = answers.find((item) => item.number === number);
        if (selectedAnswerFromState) {
            setSelectedAnswer(selectedAnswerFromState.answer);
        }
    }, [answers, number]);

    useEffect(() => {
        if (number === data.length) {
            setIsFinish(true)
        }
    }, [data]);

    return (
        <div className="my-auto bg-gradient-to-br from-indigo-400 to-teal-500 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-white mb-4">Quest {number}</h1>
            <h2 className="text-2xl font-bold text-white mb-4">{question}</h2>
            <div className="grid gap-4">
                {options.map((option, index) => (
                    <label key={index} className="block bg-white rounded p-2">
                        <input
                            type="radio"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => handleAnswerSelect(option)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ))}
            </div>
            <div className='grid '>
                {isFinish ? (
                    <button
                        onClick={onAnswerFinish}
                        className="bg-pink-500 text-white hover:bg-pink-700 rounded p-2 mt-4"
                        disabled={!selectedAnswer}
                    >
                        Finish
                    </button>
                ) : (
                    <button
                        onClick={onNextClick}
                        className="bg-pink-500 text-white hover:bg-pink-700 rounded p-2 mt-4"
                        disabled={!selectedAnswer}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Question;
