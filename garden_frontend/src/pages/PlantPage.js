import React, {useState, useEffect} from 'react'
import GardenAPI from "../api/GardenAPI"
import { Link, Redirect } from 'react-router-dom'


const PlantPage = (props) => {
  const [deleted, setDeleted] = useState(false)
  const [plantData, setPlantData] = useState(null)
  const {user} = props

  let gardenID = props.match.params.gardenID
  let plantID = props.match.params.plantID

  useEffect(() => {

    const getPlantData = async () => {
      try {
        let plant = user.gardens[gardenID -1].plants[plantID -1].plant_name
        const response = await GardenAPI.fetchPlantData(plant);
        console.log("response: ",response.data[0])
        setPlantData(response.data[0].attributes);
      } catch (error) {
        console.error('Error occurred fetching data: ', error);
      }
      console.log("plant data: ",plantData)
    }
    if (plantData == null) {
      getPlantData()
    } 
  }, [plantData])

  //Deletes Garden
  const handleClick = (gardenID, plantID) =>{
    try {
      GardenAPI.deletePlant(gardenID, plantID)
      setDeleted(true)
    } catch (err) {
      console.error(err)
    }
  }

  const renderPlant = (plantID) => {
    if(user && user.gardens[gardenID -1].plants !== null){
      let plant = user.gardens[gardenID -1].plants[plantID -1]
      return (
        <div>
          <h1>{plant.plant_name}</h1>
          <Link to={`/`}>Home</Link>
          <input type='button' value='Delete' onClick={handleClick}></input>
          <hr/>
          {
            plantData
            ?
            <div>
              <img src={plantData.main_image_path}/>
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
          <Link to={`/`}>Home</Link>
        </div>
      )
    } else {
      return (
        <Redirect  to='/login' />
      )
    }
  } 

  return (
    <div>
      {renderPlant(plantID)}
    </div>
  );
};

export default PlantPage;