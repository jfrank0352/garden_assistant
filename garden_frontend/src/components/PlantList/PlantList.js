import React from 'react';
import { Link } from 'react-router-dom'

const PlantList = (props) => {
  const {gardenID, plants} = props

  let renderPlants = ()=> {
    if (plants !== null) {
      return plants.map((plant, idx) => {
        return (
          <div>
            <Link key={idx} to={`/${gardenID}/plants/${plant.id}`} >{plant.plant_name}</Link>
          </div>
          
        )
      })
    } else {
      return ''
    }
  }

  return (
    <div>
      {renderPlants()}
    </div>
  );
};

export default PlantList;