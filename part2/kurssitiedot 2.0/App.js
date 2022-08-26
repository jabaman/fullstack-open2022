import Course from "./components/Course"
import { useState } from "react"

const App = () => {
  const [course, setCourses] = useState([])
  const [newCourse, setNewCourse] = useState(
    'a new note...'
  ) 
  const addCourse = (event) => {
    event.preventDefault()
    const courseObject = {
      content: newCourse,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: course.length + 1,
    }
  
    setCourses(course.concat(courseObject))
    setNewCourse('')
  }

  const handleCourseteChange = (event) => {
    console.log(event.target.value)
    setNewCourse(event.target.value)
  }

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
      id: 2,
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

  return (
    <div>
      <form onSubmit={addCourse}>
        <input value={newCourse}
        onChange={handleCourseteChange}
         />
        <button type="submit">add course</button>
      </form>
      {courses.map((course) => (
          <Course key={course.id} name= {course.name} parts={course.parts}  />
        ))}
    </div>
  )
}

export default App
