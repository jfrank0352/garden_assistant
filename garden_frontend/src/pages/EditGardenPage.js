import { Form, Button } from 'react-bootstrap'
import GardenAPI from '../api/GardenAPI.js'
import React from 'react';

const EditGardenPage = (props) => {
  let gardenID = props.match.params.gardenID

  const handleSubmit = async (event) => {
    event.preventDefault()
    const gardenObject = {
      garden_name: event.target.garden_name.value,
      location: event.target.location.value,
      user: props.user.id,
    }
    try {
      let response = await GardenAPI.editGarden(gardenObject, gardenID, props.user.token)
        if (response.error){
          return `There was an error ${response.error}`
        }
      props.history.push('/')
    } catch(error){
      console.error(error)
    }
  
  }

  const renderForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="garden_name">
            <Form.Label>Garden Name:</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Location:</Form.Label>
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
          <h1>Edit your Garden:</h1>
          {renderForm()}
        </div>
        :
        "Please Login"
      }
    </div>
  );
};


export default EditGardenPage