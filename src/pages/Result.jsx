import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { minAndSec } from "../util/timeConverter"

const TimeTakenPerQuestion = () => {
    const timePerQuestion = JSON.parse(window.localStorage.getItem('question-time')) || []

    return (
        <tbody>
            <tr>
                <td className="sm:w-1/4 w-1/5 text-center font-semibold border border-gray-900" colSpan="1">No.</td>
                <td className="sm:w-1/2 w-3/5 text-center font-semibold border border-gray-900" colSpan="2">Question ID</td>
                <td className="sm:w-1/4 2-1/5 text-center font-semibold border border-gray-900" colSpan="1">Time Taken</td>
            </tr>
            {timePerQuestion.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="sm:w-1/4 w-1/5 text-center" colSpan="1">{index + 1}</td>
                        <td className="sm:w-1/2 w-3/5 text-center border-l border-gray-900" colSpan="2">{item.questionId}</td>
                        <td className="sm:w-1/4 2-1/5 text-center border-l border-gray-900" colSpan="1">{minAndSec(item.time)}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

const Result = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const user = window.localStorage.getItem('user')
        if (!user) {
            navigate('/')
        }
    }, [navigate])

    const totalTime = window.localStorage.getItem('questions')?.split(',').length * 5 * 60 || []
    const timeRemaining = window.localStorage.getItem('time')
    const timeTaken = totalTime - timeRemaining

    return (
        <div className="flex flex-col h-screen items-center bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600">
            <h1 className="text-4xl text-center m-4">
                Test Completed
            </h1>
            <hr className="border w-screen" />
            <h2 className="text-2xl mt-8 mb-8">Name: {window.localStorage.getItem('user')}</h2>
            <table className="w-3/4 h-1/2 border border-gray-900">
                <thead>
                    <tr>
                        <th className="w-1/2 border border-gray-900 p-2" colSpan="2">
                            <h2>Total Time: {minAndSec(totalTime)}</h2>
                        </th>
                        <th className="w-1/2 border border-gray-900 p-2" colSpan="2">
                            <h2>Time Taken: {minAndSec(timeTaken)}</h2>
                        </th>
                    </tr>
                    <tr>
                        <th className="w-full text-center border border-gray-900 p-2" colSpan="4">
                            <h2>Time Taken On Each Question</h2>
                        </th>
                    </tr>
                </thead>
                <TimeTakenPerQuestion />
            </table>
        </div>
    )
}

export default Result