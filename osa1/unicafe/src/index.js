import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const rateGood = () => {
        setGood(good + 1)
    }

    const rateNeutral = () => {
        setNeutral(neutral + 1)
    }

    const rateBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={rateGood} text='good' />
            <Button handleClick={rateNeutral} text='neutral' />
            <Button handleClick={rateBad} text='bad' />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 & neutral === 0 & bad === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <div>
            <Statistic message = {`good: ${good}`}/>
            <Statistic message = {`neutral: ${neutral}`}/>
            <Statistic message = {`bad: ${bad}`}/>
            <Statistic message = {`all: ${good + bad + neutral}`}/>
            <Statistic message = {`average: ${(((good) - (bad)) / (good + bad + neutral))}`}/>
            <Statistic message = {`positive: ${(((good)) / (bad + neutral + good)) * 100}%`}/>
    </div>
    )
}

const Statistic = ({ message }) => {
    return(
    <div>{message}<br></br><br></br></div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
