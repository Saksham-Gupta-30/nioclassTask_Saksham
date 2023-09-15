/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

const Timer = ({ time, setTime }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevSeconds) => {
                window.localStorage.setItem('time', prevSeconds - 1);
                setTime(prevSeconds - 1);
            });
        }, 1000);
    
        return () => {
            clearInterval(interval);
            if (time === 0) {
                navigate('/result');
            }
        };
    }, [navigate]);

    const remainingMinutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return (
        <div className='border border-black p-2 rounded-lg bg-green-500 text-white'>
            <h1>Time Remaining: {remainingMinutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</h1>
        </div>
    )
}

Timer.propTypes = {
    time: propTypes.number,
    setTime: propTypes.func
}

export default Timer