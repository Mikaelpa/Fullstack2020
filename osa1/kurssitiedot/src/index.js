import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
      <div>
        <p>
          {props.course}
        </p>
      </div>
      </h1>
    )
  }

  const Content = (props) => {
    return (
      <div>
          <p>
                <Part part={props.part1} exercises={props.exercises1}/>
                <Part part={props.part2} exercises={props.exercises2} />
                <Part part={props.part3} exercises={props.exercises3} />
            </p>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
          <p>
                {props.part} {props.exercises}
            </p>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
          <p>
                Total {props.teht} parts
            </p>
      </div>
    )
  }

const App = () => {
  const course = {
    name: 'Half Stack application developement',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
          <Header course={course.name} />
          <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
          <Total teht={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))