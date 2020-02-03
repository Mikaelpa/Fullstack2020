import React from 'react'

const Header = (props) => {
    return (
        <h1>
            <div>
                    {props.course}
            </div>
        </h1>
    )
}

const Content = ({ course }) => {
    const rows2 = () => course.parts.map(p => <React.Fragment key={p.id}>{p.name} {p.exercises}<br></br></React.Fragment>)

    return (
        rows2()
    )
}

const Course = ({ course }) => {
    return (
        <React.Fragment>
            <Header course={course.name} />
            <Content course={course} />
        </React.Fragment>
    )
}

export default Course
