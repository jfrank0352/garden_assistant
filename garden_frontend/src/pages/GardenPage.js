import React, {useState, useEffect} from 'react';
// import PostList from '../components/PostList/PostList'
import GardenAPI from "../api/GardenAPI"
import { Link, Redirect } from 'react-router-dom'
import PlantList from '../components/PlantList/PlantList';

const GardenPage = (props) => {
  // const [garden, setGarden] = useState(null)
  const [deleted, setDeleted] = useState(false)

   const {user} = props

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     try {
  //       let gardenID = props.match.params.gardenID
  //       const jsonResponse = await GardenAPI.fetchGardenByID(gardenID);
  //       console.log(jsonResponse)
  //       setGarden(jsonResponse);
  //     } catch (error) {
  //       console.error('Error occurred fetching data: ', error);
  //     }
  //   };

  //   if (garden === null) {
  //     fetchDataAsync();
  //   }

  // }, [garden]);

  //Deletes Garden
  const handleClick = () =>{
    try {
      let gardenID = props.match.params.gardenID
      GardenAPI.deleteGarden(gardenID)
      setDeleted(true)
    } catch (err) {
      console.error(err)
    }
  }

  const renderGarden = () => {
    if(user && user.gardens !== null){
      let gardenID = props.match.params.gardenID
      if(user.gardens[gardenID -1] !== null && deleted === false){
        return (
          <div>
            <h1>Garden: {user.gardens[gardenID -1].garden_name}</h1>
            <p>Location: {user.gardens[gardenID -1].location}</p>
            <hr/>
            <div> Plants:
              <PlantList plants={user.gardens[gardenID -1].plants} gardenID={gardenID}/>
            </div>
            <Link to={`/plants/new`}>New Plant &nbsp;|&nbsp;</Link>
            <Link to={`/edit`}>Edit Garden</Link>
            <br />
            <br />
            <Link to={`/`}>Home</Link>
            <input type='button' value='Delete' onClick={handleClick}></input>
            <hr/>
            {/* <h2>Plants: </h2>
            <PostList prefix='posts/' posts={posts.posts} /> */}
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