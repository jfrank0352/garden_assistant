import React from 'react';
import { Link } from 'react-router-dom'

const GardenList = (props) => {

  let renderPlants = (garden) => {
    return garden.plants.map((plant, idx) => {
      return (
        <div>
          <p key={idx}>{plant.plant_name}</p>
          {/* <Link key={idx} to={`${plant.id}/`} >{plant.plant_name}</Link> */}
        </div>
        
      )
    })
  }

  let renderGardens = ()=> {
    if (props.gardens !== null) {
      return props.gardens.map((garden, idx) => {
        return (
          <div>
            <Link key={idx} to={`${garden.id}/`} >{garden.garden_name}</Link>
            {renderPlants(garden)}
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