let BASE_URL = "http://api/openweathermap.com/data/2.5/"
let KEY = 'afd1695da9d89705290497719effc086'

const fetchWeather = async (location) => {
  try{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}`)
    const data = await response.json();
    return data;
  }
  catch(err) {
    return{ error : "Failed getting Weather!!"}
  }
}

// const fetchPlantData = async (plant) => {
//   try {
//     const response = await fetch(`https://openfarm.cc/api/v1/crops/?filter="${plant}"`);
//     const data = response.json();
//     return data;
//   }
//   catch {
//     return { error : "Failed getting Garden plants!!"}
//   }
// }

const exports = {
  fetchWeather,
}
export default exports;