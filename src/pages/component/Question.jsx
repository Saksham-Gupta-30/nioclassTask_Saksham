import PropTypes from 'prop-types'
import { MathJax } from 'better-react-mathjax'

const Question = ({ id, data }) => {
    // console.log(id, data)
    return (
        <>
            <div className='sm:text-2xl p-4 m-4 text-sm'>
                <MathJax
                    hideUntilTypeset={"first"}
                    inline
                    dynamic
                >
                    {id}: {data.question}
                </MathJax>
            </div>
        </>
    )
}

Question.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object
}

export default Question