const Course = ({name, parts }) => {
    /*console.log(name, parts)*/
    return (
      <div>
        <Header name={name} />
        <Content parts={parts}/>
        <Total parts={parts} />
      </div>
         
    )
  }


const Header= ({name}) => {
    /*console.log({name})*/
    return( 
        <h1> {name}</h1>
         )
  }
  
  const Content= ({ parts }) => {
   /*console.log(parts)*/

    return(
        <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exer={part.exercises} />
        ))}
      </div>
    )
  }
  
  
  const Part= ({name, exer}) => {
   /* console.log(name, exer)*/

    return(
        <p>
           {name} {exer}
        </p>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0)
  
    return <strong>total of {total} exercises</strong>
  }
  
export default Course