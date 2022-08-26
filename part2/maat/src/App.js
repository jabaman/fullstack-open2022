import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter= ({filter, countries }) => {
  return (
    <div>
          find coutries: <input value={countries}
          onChange={filter}
           />
      </div> 
  )
}

const Country = ({filter}) => {
  if(filter.length>10) {
    return(
      'Too many matches, specify another filter'
    )
  }
  if(filter.length===0) {
    return(
      'no matches'
    )
  }

  if(filter.length===1) {
    return(
    <CountrySpesifics specs ={filter[0]}/>
    )
  }
  return filter.map((country) => (
    <div key={country.name.official}>
      {country.name.common}
      <button onClick={handleclick} specs = {filter[filter]} >show</button>
    </div>
    
    
  ))
}

const handleclick= ({specs }) => {
  console.log('clicked')
}

const CountrySpesifics = ({specs}) => {
  console.log({specs})
  return(
    <div>
      <h1> {specs.name.official}</h1>  
      <div>{specs.capital}</div> 
      <div>{specs.area}</div> 
      <div>Area: {specs.area} km²</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(specs.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={specs.flags.png} alt={`${specs.name.common} flag`} />   
      <Weather location = {specs.name.official}/>
    </div>
    )
}
 
const Weather= ({specs}) => {
  console.log(specs)

}


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [weather, setWeather] = useState([]) 
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log(countries)
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'country')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}')
      .then(response => {
        //console.log(countries)
        setWeather(response.data)
      })
  }, [])
  console.log('render', weather.length, 'weather')

  const handleFilter = (event) => {
  setFilter(event.target.value)
  console.log(filter)

  }

  const filterCountries = filter
    ? countries.filter(country => country.name.common.toLocaleLowerCase().includes(filter))
    : countries
  

  return (
    <div>
      <h1>Maat</h1>

      <Filter filter= {handleFilter} countries = {filter}/>
      <Country country={countries} filter ={filterCountries}/>
    </div>
    
  )

}

export default App
