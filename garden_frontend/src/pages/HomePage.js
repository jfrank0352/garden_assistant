import React from 'react';
import { Link } from 'react-router-dom';
import GardenList from '../components/GardenList/GardenList'

const HomePage = ({ isLoggedIn, user, handleLogout }) => {

  // if(user){
  //   console.log(user.gardens)
  // }

  return (
    <div>
      Home Page
      {
        user &&
        <div>
          Hi {user.username}
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
          <button onClick={handleLogout}>Logout</button>
          <hr/>
          <GardenList gardens={user.gardens} />
          {/* <Link to="/gardens">View your Gardens</Link> */}
        </div>
               
      }
    </div>
  );
};

export default HomePage;