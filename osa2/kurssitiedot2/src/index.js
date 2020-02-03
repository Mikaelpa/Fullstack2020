import React from 'react'
import ReactDOM from 'react-dom'
import Course from './course'


const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
    const courseList = () => courses.map(c =>
            <div>
                <Course course={c} />
                <Total course={c} />
            </div>
    )
    return (
        <div>
            {courseList()}
        </div>
    )
}

const Total = ({ course }) => {
    const exer = course.parts.map(p => p.exercises);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return (
        <div>
            <h3>
                Total of {exer.reduce(reducer)} exercises
            </h3>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))