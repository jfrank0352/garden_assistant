let BASE_URL = "http://localhost:8000/garden-api/gardens/"


const fetchAllGardens = async () => {
  let token = localStorage.getItem("auth-user")
  console.log(token)
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
    const data = await response.json();
    console.log(data)
    return data;
  }
  catch {
    return { error : "Failed getting all Gardens!!"}
  }
};

const addGarden = (gardenObject) => {
  return fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'Plant',
    body: JSON.stringify(gardenObject)
  })
}


const fetchGardenByID = async (gardenID) => {
  try {
    const response = await fetch(`${BASE_URL}${gardenID}/`);
    const data = await response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden: "}
  }
  
};

const editGarden = (gardenObject, gardenID) => {
  return fetch(`${BASE_URL}${gardenID}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(gardenObject)
  })
}

const fetchGardenPlants = async (gardenID) => {
  try {
    const response = await fetch(`${BASE_URL}${gardenID}/plants/`);
    const data = response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden plants!!"}
  }
  
};

const fetchPlantByID = async (gardenID, plantID) => {
  try {
    const response = await fetch(`${BASE_URL}${gardenID}/plants/${plantID}`);
    const data = await response.json();
    return data;
  }
  catch {
    return { error : "Failed getting Garden plants!!"}
  }
  
};

const addPlant = (plantObject, gardenID) => {
  return fetch(`${BASE_URL}${gardenID}/plants/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(plantObject)
  })
}

const editPlant = (plantObject, gardenID, plantID) => {
  return fetch(`${BASE_URL}${gardenID}/plants/${plantID}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(plantObject)
  })
}

const deletePlant = (gardenID, plantID) => {
  return fetch(`${BASE_URL}${gardenID}/plants/${plantID}/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

const deleteGarden = (gardenID) => {
  return fetch(`${BASE_URL}${gardenID}/`, {
    headers: {
      'Content-Type': 'application/json'
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