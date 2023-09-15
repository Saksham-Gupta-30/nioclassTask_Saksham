import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import questionID from '../assets/questionID'

const Home = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [questions, setQuestions] = useState([])

    const handleName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const handleQuestions = (e, question) => {
        // e.preventDefault()
        if (e.target.checked) {
            setQuestions([...questions, question])
        } else {
            setQuestions(questions.filter((q) => q !== question))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimName = name.trim()
        if (trimName === '') {
            alert('Please Enter Your Name')
            setName('')
            return
        }
        if (questions.length === 0) {
            alert('Please Select Atleast One Question')
            return
        }
        window.localStorage.setItem('user', name)
        window.localStorage.setItem('questions', questions)
        window.localStorage.setItem('time', questions.length * 5 * 60)
        window.localStorage.setItem('submitted', false)
        navigate('/test')
    }

    useEffect(() => {
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('questions')
        window.localStorage.removeItem('time')
        window.localStorage.removeItem('question-time')
        window.localStorage.removeItem('submitted')
    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-screen gap-8 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600'>
            {/* <h1>nioclass Internship Task</h1> */}
            <div className='w-screen flex flex-col'>
                <input type="text" placeholder="Enter Your Name" value={name} onChange={handleName} className='border border-gray-900 p-2 rounded-lg sm:w-1/2 w-3/4 self-center pl-4 placeholder-gray-900 bg-gray-400 focus:outline-none'/>
            </div>
            <div className='flex flex-col items-start gap-4 border border-solid border-gray-900 rounded-lg w-3/4 pb-4 sm:w-1/2 bg-gray-200'>
                <h1 className='px-2 pt-2 self-center text-lg font-bold underline'>Select Questions</h1>
                <hr className='border-t w-full border-gray-900' />
                {questionID.map((question, id) => {
                    return (
                        <div key={id} className='px-4 overflow-hidden w-full'>
                            <label className='flex whitespace-normal w-auto'>
                                <input
                                    type="checkbox"
                                    value={question}
                                    checked={questions.includes(question)}
                                    onChange={(e) => handleQuestions(e, question)}
                                    className='mr-2'
                                />
                                <h4 className=''>{question}</h4>
                            </label>
                        </div>
                    )
                })}
            </div>
            <div className='flex w-full flex-col'>
                <button onClick={handleSubmit} className='border self-center uppercase bg-gray-400 p-2 border-gray-900 rounded-lg w-3/4 sm:w-1/2'>Start Test</button>
            </div>
        </div>
    )
}

export default Home