import React from 'react';
import { Link } from 'react-router-dom'
import Weather from '../Weather/Weather';

const GardenList = (props) => {


  let renderGardens = ()=> {
    if (props.gardens !== null) {
      return props.gardens.map((garden, idx) => {
        return (
          <div>
            <Link key={idx} to={`${garden.id}/`} >{garden.garden_name}</Link>
            <p>{garden.location}</p>
            <Weather location={garden.location} gardenID={null} />
          </div>
          
        )
      })
    } else {
      return ''
    }
  }

  return (
    <div>
      {renderGardens()}
    </div>
  );
};

export default GardenList;