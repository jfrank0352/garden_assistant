import React, {useState, useEffect} from 'react'
import GardenAPI from "../api/GardenAPI"
import { Link } from 'react-router-dom'


const PlantPage = (props) => {
  const [deleted, setDeleted] = useState(false)
  const [plant, setPlant] = useState(null)
  const [plantData, setPlantData] = useState(null)
  const {user} = props

  let gardenID = props.match.params.gardenID
  let plantID = props.match.params.plantID

  useEffect(() => {
    const getPlant = async () => {
      try{
        const response = await GardenAPI.fetchPlantByID(gardenID, plantID, user.token)
        setPlant(response)
      }catch (error) {
        console.error(error)
      }
    }
    if (!plant){
      getPlant()
    }
  }, [])

  useEffect(() => {

    const getPlantData = async () => {
      try {
        const dataResponse = await GardenAPI.fetchPlantData(plant.plant_name);
        setPlantData(dataResponse.data[0].attributes);
      } catch (error) {
        console.error('Error occurred fetching data: ', error);
      }

    }
    if (plant) {
      getPlantData()
    } 
  }, [plant])

  //Deletes Plant
  const handleClick = () =>{
    try {
      GardenAPI.deletePlant(gardenID, plantID, user.token)
      setDeleted(true)
    } catch (err) {
      console.error(err)
    }
  }

  const renderPlant = () => {
    if(user && plant && deleted === false){
      return (
        <div>
          <h1>{plant.plant_name}</h1>
          <Link to={`/${gardenID}`}>Garden</Link>
          <br/>
          <Link to={`/${gardenID}/plants/${plantID}/edit`}>Edit Plant &nbsp;|&nbsp;</Link>
          <input type='button' value='Delete' onClick={handleClick}></input>
          <hr/>
          {
            plantData
            ?
            <div>
              <img src={plantData.main_image_path} alt='plant_image'/>
              <h3>Description:</h3>
              <p>{plantData.description}</p>
              <p>Sun Requirement: {plantData.sun_requirements}</p>
              <p>Planting: {plantData.sowing_method}</p>
            </div>
            :
            <p>Loading Data...</p>
          }
        </div>

      )
    }else if(deleted === true){
      return (
        <div>
          <p>This plant has been deleted</p>
          <Link to={`/${gardenID}`}>Back to Garden</Link>
        </div>
      )
    } else {
      return ""
    }
  } 

  return (
    <div>
      {renderPlant()}
    </div>
  );
};

export default PlantPage;