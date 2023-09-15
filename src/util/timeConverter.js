const minAndSec = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const extraSeconds = seconds % 60;
    return `${minutes}:${extraSeconds < 10 ? `0${extraSeconds}` : extraSeconds}`;
}

export { minAndSec }