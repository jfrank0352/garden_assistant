import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GardenPage from './pages/GardenPage'
import PlantPage from './pages/PlantPage'
import { getLoggedInUser, login } from './api/UserAPI'
import AddGardenPage from './pages/AddGardenPage'
import AddPlantPage from './pages/AddPlantPage'
import EditGardenPage from './pages/EditGardenPage'
import EditPlantPage from './pages/EditPlantPage'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      let auth_token = localStorage.getItem("auth-user")
      if (auth_token !== 'null') {
        let response = await getLoggedInUser(auth_token)
        let data = await response.json()
        if (data.username) {
          setIsLoggedIn(true)
          setAuthUser(data)
        }
      }
    }

    getUser()

  }, [user])


  const handleLogin = async (evt) => {
    evt.preventDefault()
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject)
    let data = await response.json()
    if (data.token) {
      console.log("data:", data)
      localStorage.setItem("auth-user", `${data.token}`)
      setIsLoggedIn(true)
      setUser(data.user)
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null)
    setIsLoggedIn(false)
    setUser(null)
  }

  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={authUser}
      />
    )
  }

  const renderHomePage = () => {
    console.log("App-user:", authUser)
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={authUser}
        handleLogout={handleLogout}
      />
    )
  }

  const renderGardenPage = (routeProps) => {
    console.log('render Garden:',authUser)
    return (
      <GardenPage
        {...routeProps}
        isLoggedIn={isLoggedIn}
        user={authUser}
      />
    )
  }

  const renderPlantPage = (routeProps) => {
    return (
      <PlantPage
        {...routeProps}
        isLoggedIn={isLoggedIn}
        user={authUser}
      />
    )
  }

  const renderAddGarden = (routeProps) => {
    return (
      <AddGardenPage
        {...routeProps}
        user={authUser}
      />
    )
  }

  const renderAddPlant = (routeProps) => {
    return (
      <AddPlantPage
        {...routeProps}
        user={authUser}
      />
    )
  }

  const renderEditGarden = (routeProps) => {
    return (
      <EditGardenPage
        {...routeProps}
        user={authUser}
      />
    )
  }

  const renderEditPlant = (routeProps) => {
    return (
      <EditPlantPage
        {...routeProps}
        user={authUser}
      />
    )
  }
  

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={renderHomePage} />
        <Route exact path="/login" render={renderLoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/new-garden" render={renderAddGarden} />
        <Route exact path="/:gardenID(\d+)" render={renderGardenPage} />
        <Route exact path="/:gardenID(\d+)/edit" render={renderEditGarden} />
        <Route exact path="/:gardenID(\d+)/new-plant" render={renderAddPlant} />
        <Route exact path="/:gardenID(\d+)/plants/:plantID(\d+)" render={renderPlantPage} />
        <Route exact path="/:gardenID(\d+)/plants/:plantID(\d+)/edit" render={renderEditPlant} />
      </Router>
    </div>
  );
}

export default App;