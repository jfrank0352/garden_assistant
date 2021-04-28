import React, {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'
import GardenAPI from '../api/GardenAPI'
import GardenList from '../components/GardenList/GardenList'

const HomePage = ({ isLoggedIn, user, handleLogout }) => {
  const [gardens, setGardens] = useState(null)

  useEffect(() => {
    const getGardens = async () => {
      try{
        const response = await GardenAPI.fetchAllGardens(user.token)
        setGardens(response)
      }catch (error) {
        console.error(error)
      }
    }
    if (!gardens){
      getGardens()
    }
  }, [user])

  const renderGardenList = () =>{
    if(user && gardens !== null){
      return (
        <GardenList gardens={gardens} />
      )
    }else {
      return "Error!"
    }
  }

  return (
    <div>
      Home Page
      {
        user &&
        <div>
          <h2>Hi {user.username}</h2>
        </div>
      }
      {
        !isLoggedIn
        ?
        <div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>

        :
        
        <div>
          <Link to="/new-garden">Create a new Garden</Link>
          <br/>
          <button onClick={handleLogout}>Logout</button>
          
          
          <hr/>
          {renderGardenList()}
        </div>
               
      }
    </div>
  );
};

export default HomePage;