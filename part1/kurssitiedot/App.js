const Header= (props) => {
  return(
    <div>
      <p>Course is {props.coursename}</p>
    </div>
  )
}

const Content= (cont) => {
  console.log(cont)
  return(
    <div>
      <Part
        part={cont.parts[0].name}
        exercise={cont.parts[0].exercises}
      />
      <Part
        part={cont.parts[1].name}
        exercise={cont.parts[1].exercises}
      />
      <Part
        part={cont.parts[2].name}
        exercise={cont.parts[2].exercises}
      />
    </div>
  )
}

const Part= (cont) => {
  console.log(cont)
  return(
    <div>
      <p>
           {cont.part} {cont.exercise}
      </p>
    </div>
  )
}

const Total= (all) => {
  return(
    <div>
      <p>
        Number of exercisesss {all.total[0].exercises+
        all.total[1].exercises + all.total[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
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
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total total = {course.parts}/>
    </div>
  )
}

export default App