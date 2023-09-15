/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Question from "./component/Question.jsx";
import Timer from "./component/Timer.jsx";

const Test = () => {
    const navigate = useNavigate()
    const totalTime = (window.localStorage.getItem('time'))
    // console.log(totalTime)
    const questionIDs = (window.localStorage.getItem('questions')?.split(',')) || []
    const [questions, setQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [time, setTime] = useState(totalTime);
    const submitted = window.localStorage.getItem('submitted')

    useEffect(() => {
        const user = window.localStorage.getItem('user')
        if (user == null) {
            navigate('/')
        }
        const fetchQuestions = async () => {
            const questions = [];
            for (let i = 0; i < questionIDs.length; i++) {
                const response = await axios.get(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionIDs[i]}`);
                const question = {
                    question: response.data[0].Question,
                    id: response.data[0].ChapterID,
                    time: 0,
                    questionId: response.data[0].QuestionID,
                };
                questions.push(question);
            }
            setQuestions(questions);
            window.localStorage.setItem('question-time', JSON.stringify(questions));
        };

        fetchQuestions();
        // console.log(questions)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const questionTimes = JSON.parse(window.localStorage.getItem('question-time')) || [];

            // if (!questionTimes[activeQuestion]) {
            //     questionTimes[activeQuestion] = { time: 0 };
            // }
            questionTimes[activeQuestion].time++;
            window.localStorage.setItem('question-time', JSON.stringify(questionTimes));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [activeQuestion]);


    const handleClick = (id) => {
        setActiveQuestion(id)
    }

    const handleSubmit = () => {
        window.localStorage.setItem('submitted', 'true')
        navigate('/result')
    }

    return (
        <div className="flex flex-col items-center w-screen h-screen">
            {submitted === 'false' ? <>
                <h1 className="text-2xl font-bold underline mt-4">Test</h1>
                <div className="self-end mt-4 mr-4">
                    <Timer time={time} setTime={setTime} />
                </div>
                <hr className="w-full mt-2 border-black" />
                <div className="flex flex-wrap justify-around w-screen ml-4 mr-4">
                    {questions.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`hover:underline cursor-pointer p-2 m-2 border-2 border-black-400 rounded-lg w-40 text-center border-gray-500 transition-transform transform hover:scale-105 ${(index === activeQuestion ? ' bg-blue-500 rounded-lg' : '')}`}
                            >
                                {item.id}
                            </div>
                        )
                    })}
                </div>
                <hr className="w-full mb-2 border-black" />
                <div className="flex flex-col items-center justify-around space-y-4 h-full">
                    {questions.length > 0 &&
                        <>
                            <div className="shadow-lg border-t-4 mr-4 ml-4">
                                <Question
                                    key={questions[activeQuestion].id}
                                    id={activeQuestion + 1}
                                    data={questions[activeQuestion]}
                                />
                            </div>
                            <div className="flex items-center space-x-8">
                                <button onClick={() => handleClick(activeQuestion - 1)} disabled={activeQuestion === 0} className={`border border-gray-500 p-2 rounded-lg w-32 + ${(0 === activeQuestion ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-300')}`}>Previous</button>
                                <button onClick={() => handleClick(activeQuestion + 1)} disabled={activeQuestion === questions.length - 1} className={`border border-gray-500 p-2 rounded-lg w-32 ${(questions.length - 1 === activeQuestion ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-green-300')}`}>Next</button>
                            </div>
                        </>
                    }
                </div>
                <div>
                    <button onClick={handleSubmit} className="bg-red-500 p-2 w-64 m-4 border border-gray-500 rounded-lg">Submit</button>
                </div>
            </> : <>
                <h1 className="text-2xl h-screen mt-8">Test Submitted</h1>
            </>}
        </div>
    )
}

export default Test