import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  if(text==="positive"){
    return(  
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>   
    )
  }
  return(
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
  )
}

const Statistics = (props) => {

  if (props.all === 0){
    return(
    <div>
      No feedback given
    </div>
  )
}
    return(
    <table>
      <tbody>
        <StatisticsLine text ="good" value = {props.good}/>
        <StatisticsLine text ="neutral" value = {props.neutral}/>
        <StatisticsLine text ="bad" value = {props.bad}/>
        <StatisticsLine text ="all" value = {props.all}/>
        <StatisticsLine text ="average" value = {(props.good - props.bad)/props.all}/>
        <StatisticsLine text ="positive" value = {props.good/props.all *100}/>  
      </tbody>
    </table>
    )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <br></br>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        



    </div>
  )
}

export default App
