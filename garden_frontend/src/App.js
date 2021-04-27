import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GardenPage from './pages/GardenPage'
import PlantPage from './pages/PlantPage'
import { getLoggedInUser, login } from './api/UserAPI'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      let auth_token = localStorage.getItem("auth-user")
      if (auth_token !== 'null') {
        let response = await getLoggedInUser(auth_token)
        let data = await response.json()
        if (data.username) {
          setIsLoggedIn(true)
          setUser(data)
        }
      }
    }
    if (!user) {
      getUser()
    } 
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
        user={user}
      />
    )
  }

  const renderHomePage = () => {
    console.log(user)
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
    )
  }

  const renderGardenPage = (routeProps) => {
    console.log('render Garden:',user)
    return (
      <GardenPage
        {...routeProps}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    )
  }

  const renderPlantPage = (routeProps) => {
    return (
      <PlantPage
        {...routeProps}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    )
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={renderHomePage} />
        <Route exact path="/login" render={renderLoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/:gardenID(\d+)" render={renderGardenPage} />
        <Route exact path="/:gardenID(\d+)/plants/:plantID(\d+)" render={renderPlantPage} />
      </Router>
    </div>
  );
}

export default App;