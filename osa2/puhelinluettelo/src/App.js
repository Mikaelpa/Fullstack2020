import React, {useState, useEffect} from 'react'
import personService from './services/noteService'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Notification from './components/notification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const person = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
        if (person) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = {...person, number: newNumber}
                
                personService
                    .update(changedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => 
                            p.id !== person.id ? p : updatedPerson
                        ))
                        setSuccessMessage(`Changed ${person.name} number`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(`Person ${person.name} was already removed`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        personService.create(newPerson).then(addedPerson => {
            setPersons(persons.concat(addedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Added ${addedPerson.name}`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        })
    }

    const removePerson = (person) => () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(res => {
                    const newPersons = [...persons]
                    newPersons.splice(newPersons.indexOf(person), 1)
                    setPersons(newPersons)
                    setSuccessMessage(`Deleted ${person.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Person ${person.name} already removed`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    }

    const filteredPersons = persons.filter(person => 
        person.name.toUpperCase().includes(filter.toUpperCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={successMessage} className='success'/>
            <Notification message={errorMessage} className='error'/>
            <Filter filter={filter} handleChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm handleSubmit={addPerson}
                        newName={newName}
                        newNumber={newNumber}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} handleRemove={removePerson}/>
        </div>
    )
}

export default App