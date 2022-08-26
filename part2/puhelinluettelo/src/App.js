import { useState, useEffect } from 'react'
import personservices from './services/personservices'
import axios from 'axios'

const Button = ({ handleClick, text,name, id}) => (
  <button onClick={() => {handleClick({name, id})}}>
    {text}
  </button>
  
)

const removePerson = ({name,id}) => {
  console.log(name)
  if (window.confirm(`Do you really want to delete? ${name}`))
   {
    
    personservices.deleteName({id})

    window.location.reload()
    
  }
  
  
}

const Print = ({name, number, id }) => {
  /*console.log(name, parts)*/
  return (
    <div>{name} {number} 
    <Button handleClick={removePerson} name = {name} id= {id} text='deleteä'/>
    </div>
    
  )
}

const Filter= ({name, handle }) => {
  return (
    <div>
          filter show with: <input value={name}
          onChange={handle}
           />
      </div> 
  )
}

const PersonForm= ({add, name, number, newName,newNumber }) => {
  return (
    <form onSubmit={add}>
        <div>
          name: <input value={newName}
          onChange={name}
           />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={number}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Ihmiset = ({filter}) => {

  return(
     <div>
        {filter.map((person) => (
          <Print key={person.name} name={person.name} number={person.number} id= {person.id} />
        ))}
</div>
  )
 
}

const Notification = ({ message }) => {
  if (message === "") {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === "") {
    return null
  }

  return (
    <div className="errormessage">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [Message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personservices
      .getAll()
      .then( thisPerson => {
        setPersons(thisPerson)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
  if(persons.some(person => person.name === nameObject.name)){

    if (window.confirm(`${nameObject.name} is alraedy added to phonebook, replace old number with new one?`))
        {
          const toggleImportanceOf = id => {
            const persona = persons.find(n => n.id === id)
            const changedNumber = { ...persona, number: persona.number }
        
            personservices
              .update(id, changedNumber)
                .then(returnedNumber => {
                setPersons(persons.map(persona => persona.id !== id ? persona : returnedNumber))
              })
          }

        setNewName('')
        setNewNumber('')
    }
    
  }else{

  
    personservices
      .create(nameObject)
        .then(returnedName => {
        setPersons(persons.concat(returnedName))

        setMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setMessage("")
        }, 2000)

        setNewName('')
        setNewNumber('')
      })
      
      

  }}

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
  setFilter(event.target.value)

  }

  const filterPeople = filter

    ? persons.filter(person => person.name.toLocaleLowerCase().includes(filter))
    : persons

  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={Message} />
      <ErrorNotification message={errorMessage} />
      <Filter name={filter} handle = {handleFilter}/>
      
      <h3>Add a new</h3>

      <PersonForm 
        newname={newName}
        newnumber={newNumber}
        add={addName} 
        name={handleNameChange} 
        number={handleNumberChange} />

      <h3>Numbers</h3>

      <Ihmiset filter = {filterPeople} />
      
      
    </div>
    
  )

}

export default App