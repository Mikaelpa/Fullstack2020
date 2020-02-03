import React from 'react'

const Persons = ({persons, handleRemove}) => {
    const showPersons = () => persons.map(person => 
        <div key={person.id}>
            {person.name} {person.number} 
            <button onClick={handleRemove(person)}>delete</button>
        </div>
    )

    return (
        <div>
            {showPersons()}
        </div>
    )
}

export default Persons