import React, {useState, useEffect} from 'react';
import WeatherAPI from '../../api/WeatherAPI'


const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null)

  const {location, gardenID} = props

  const convertToF = (kelvin) => {
    let fahrenheit = (kelvin - 273.15) * 1.8 + 32
    return Math.round(fahrenheit)
  }

  useEffect(() => {
    const getWeather = async () => {
      try{
        const response = await WeatherAPI.fetchWeather(location)
        setWeatherData(response)
      }
      catch(err){
        console.error(err)
      }
    }
    if (!weatherData){
      getWeather()
    }
  }, [])


  let renderWeather = ()=> {
    if (weatherData !== null && gardenID === null) {
      return (
        <div>
          {
            weatherData
            ?
            <div>
              <p>Current Temp: {convertToF(weatherData.main.temp)}F. (Feels like: {convertToF(weatherData.main.feels_like)}F.)</p>
            </div>
            :
            "Loading Data..."
          }
          
        </div>
      )
    } else if(weatherData !== null && gardenID !== null){
      return (
        <div>Current Weather:
          {
            weatherData
            ?
            <div>
              <p>Description: {weatherData.weather[0].description}</p>
              <p>Current Temp: {convertToF(weatherData.main.temp)}F. (Feels like: {convertToF(weatherData.main.feels_like)}F.)</p>
              <p>High: {convertToF(weatherData.main.temp_max)}F.</p>
              <p>Low: {convertToF(weatherData.main.temp_min)}F.</p>
            </div>
            :
            "Loading Data..."
          }
          
        </div>
      )
    }
  }

  return (
    <div>
      {renderWeather()}
    </div>
  );
};

export default Weather;