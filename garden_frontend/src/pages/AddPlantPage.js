import { Form, Button } from 'react-bootstrap'
import GardenAPI from '../api/GardenAPI.js'
import React from 'react';

const AddPlantPage = (props) => {


  const handleSubmit = async (event) => {
    event.preventDefault()
    let gardenID = props.match.params.gardenID
    const plantObject = {
      plant_name: event.target.plant_name.value,
      garden: gardenID,
    }
    try {
      let response = await GardenAPI.addPlant(plantObject, gardenID, props.user.token)
        if (response.error){
          return `There was an error ${response.error}`
        }
      props.history.push(`/${gardenID}`)
    } catch(error){
      console.log(error)
    }
  
  }

  const renderForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="plant_name">
            <Form.Label>Plant Name:</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }

  return (
    <div>
      {
        props.user
        ?
        <div>
          <h1>Add a new Plant:</h1>
          {renderForm()}
        </div>
        :
        "Please Login"
      }
    </div>
  );
};


export default AddPlantPage