let BASE_URL = "http://localhost:8000/garden-api/gardens/"


const fetchAllGardens = async (token) => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
    const data = await response.json();
    return data;
  }
  catch {
    return { error : "Failed getting all Gardens!!"}
  }
};

const addGarden =  async (gardenObject, token) => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      method: 'POST',
      body: JSON.stringify(gardenObject)
    })
    const data = response.json()
    if (data.error){
      return {'message': data.error.message, 'statusCode': 404}
    }else {
      return data
    }
  } catch (error) {
    console.error(error)
  }
  
}

const fetchGardenByID = async (gardenID, token) => {
  try {
    const response = await fetch(`${BASE_URL}${gardenID}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    const data = await response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden: "}
  }
  
};

const editGarden = (gardenObject, gardenID, token) => {
  return fetch(`${BASE_URL}${gardenID}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: 'PATCH',
    body: JSON.stringify(gardenObject)
  })
}

const fetchGardenPlants = async (gardenID, token) => {
  try {
    const response = await fetch(`${BASE_URL}${gardenID}/plants/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    const data = response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden plants!!"}
  }
  
};

const fetchPlantByID = async (gardenID, plantID, token) => {
  try {
    const response = await fetch(`${BASE_URL}${gardenID}/plants/${plantID}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    const data = await response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden plants!!"}
  }
  
};

const addPlant = (plantObject, gardenID, token) => {
  return fetch(`${BASE_URL}${gardenID}/plants/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: 'POST',
    body: JSON.stringify(plantObject)
  })
}

const editPlant = (plantObject, gardenID, plantID, token) => {
  return fetch(`${BASE_URL}${gardenID}/plants/${plantID}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: 'PATCH',
    body: JSON.stringify(plantObject)
  })
}

const deletePlant = (gardenID, plantID, token) => {
  return fetch(`${BASE_URL}${gardenID}/plants/${plantID}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: 'DELETE',
  })
}

const deleteGarden = (gardenID, token) => {
  return fetch(`${BASE_URL}${gardenID}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: 'DELETE',
  })
}

const fetchPlantData = async (plant) => {
  try {
    const response = await fetch(`https://openfarm.cc/api/v1/crops/?filter="${plant}"`);
    const data = response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden plants!!"}
  }
}

const exports = {
  fetchAllGardens,
  addGarden,
  fetchGardenByID,
  editGarden,
  fetchGardenPlants,
  fetchPlantByID,
  addPlant,
  editPlant,
  deletePlant,
  deleteGarden,
  fetchPlantData,
}
export default exports;