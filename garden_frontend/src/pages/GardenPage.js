import React, {useState, useEffect} from 'react';
// import PostList from '../components/PostList/PostList'
import GardenAPI from "../api/GardenAPI"
import { Link } from 'react-router-dom'
import PlantList from '../components/PlantList/PlantList';
import Weather from '../components/Weather/Weather';

const GardenPage = (props) => {
  const [deleted, setDeleted] = useState(false)
  const [plants, setPlants] = useState(null)
  const [garden, setGarden] = useState(null)

  const {user} = props
  let gardenID = props.match.params.gardenID

  useEffect(() => {
    const getGarden = async () => {
      try{
        const response = await GardenAPI.fetchGardenByID(gardenID, user.token)
        setGarden(response)
      }catch (error) {
        console.error(error)
      }
    }
    if (!garden){
      getGarden()
    }
  }, [])
   
  useEffect(() => {
    const getPlants = async () => {
      try{
        const response = await GardenAPI.fetchGardenPlants(gardenID, user.token)
        setPlants(response)
      }catch (error) {
        console.error(error)
      }
    }
    if (!plants){
      getPlants()
    }
  }, [])

  //Deletes Garden
  const handleClick = () =>{
    try {
      GardenAPI.deleteGarden(gardenID, user.token)
      setDeleted(true)
    } catch (err) {
      console.error(err)
    }
  }

  const renderGarden = () => {
    if(user && plants !== null){
      if(garden !== null && deleted === false){
        return (
          <div>
            <h1>Garden: {garden.garden_name}</h1>
            <p>Location: {garden.location}</p>
            <Weather location={garden.location} gardenID={garden.id}/>
            <hr/>
            <div> Plants:
              {
                plants
                ?
                <PlantList plants={plants} gardenID={gardenID}/>
                :
                "loading"
              }
              
            </div>
            <Link to={`/${gardenID}/new-plant`}>New Plant &nbsp;|&nbsp;</Link>
            <Link to={`/${gardenID}/edit`}>Edit Garden</Link>
            <br />
            <br />
            <Link to={`/`}>Home</Link>
            <input type='button' value='Delete' onClick={handleClick}></input>
            <hr/>
          </div>
        )
      }else if(deleted === true){
        return (
          <div>
            <p>This Garden has been deleted</p>
            <Link to={`/`}>Home</Link>
          </div>
        )
      } else {
        return ""
      }
    }
  }

  return (
    <div>
      {renderGarden()}
    </div>
  );
};

export default GardenPage;