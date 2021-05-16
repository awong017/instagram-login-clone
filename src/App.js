import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Context from './context'
import uuid from 'uuid/dist/v4'
import Landing from './components/landing'
import Home from './components/home'
import SignUpMain from './components/signUpMain'
import LoginMain from './components/loginMain'
import Footer from './components/footer'
import Styled from 'styled-components'

const AppDiv = Styled.div`
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
`

const renderRoutes = () => {
  return (
    <>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/signUp" component={SignUpMain} />
      <Route path="/login" component={LoginMain} />
      <Route path="/" component={Footer} />
    </>
  )
}

const App = (props) => {
  const [ users, setUsers ] = useState(
    [
      {
        id: 1,
        email: "awong017@ucr.edu",
        firstname: "adam",
        lastname: "wong",
        username: "awong017",
        password: "password",
        phone: 5555555555
      }
    ]
  )

  const [ loginError, setLoginError ] = useState({usernameError: "", passwordError:""})

  const [ signUpError, setSignUpError ] = useState({error: ""})
  
  const [ currentUser, setCurrentUser ] = useState()

  // Method for logging in

  const handleLogin = (e, name, password) => {
    e.preventDefault()

    let userAccount = {};

    if (
      users.some(user => user.username === name) === false &&
      users.some(user => user.email === name) === false &&
      users.some(user => user.phone === parseInt(name.replace(/[\W]/g, ""))) === false
    ) {
      setLoginError(
        {
          usernameError: "The username you entered doesn't belong to an account. Please check your username and try again.",
          passwordError: ""
        }
      )
    }
    else {
      if (name.replace(/[\W]/g, "").length === name.split("").map(item => parseInt(item)).filter(Number.isInteger).length) {
        userAccount = users.find(user => user.phone === parseInt(name.replace(/[\W]/g, "")))
      }
      else if (name.includes("@")) {
        userAccount = users.find(user => user.email === name)
      }
      else {
        userAccount = users.find(user => user.username === name)
      }

      if (userAccount.password !== password) {
        setLoginError(
          {
            usernameError: "",
            passwordError: "Sorry, your password was incorrect. Please double-check your password."
          }
        )
      }
      else {
        setLoginError({usernameError: "", passwordError: ""})
        setCurrentUser(
          {
            id: userAccount.id,
            email: userAccount.email,
            username: userAccount.username,
            firstname: userAccount.firstname,
            lastname: userAccount.lastname,
            password: userAccount.password,
            phone: parseInt(userAccount.phone),
          }
        )
      props.history.push("/home")
      }
    }
  }

  // Method for signing up

  const handleSignUp = (e, contact, firstname, lastname, username, password) => {
    e.preventDefault()

    if ((!contact.includes("@") && !contact.includes(".com")) && contact.replace(/[\W]/g, "").length !== contact.split("").map(item => parseInt(item)).filter(Number.isInteger).length) {
        setSignUpError({error: "Please enter a valid Mobile Number or Email."})
      }
    else {
      if (users.some(user => user.email === contact) === true || users.some(user => user.phone === parseInt(contact.replace(/[\W]/g, ""))) === true) {
        setSignUpError({error: "Account has already been created."})
      }
      else if (users.some(user => user.username === username) === true) {
        setSignUpError({error: "This username isn't available. Please try another."})
      }
      else {
        if (contact.includes("@")) {
          const newUser = {
            id: uuid(),
            email: contact,
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
            phone: ""
          }
          setUsers([...users, newUser])
          props.history.push("/")
        }
        else {
          const newUser = {
            id: uuid(),
            email: "",
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
            phone: contact
            }
          setUsers([...users, newUser])
          props.history.push("/")
        }
      }
    }
  }

    // if (typeof contact === "number") {
    //   const newUser = {
    //     id: uuid(),
    //     email: "",
    //     username: username,
    //     firstname: firstname,
    //     lastname: lastname,
    //     password: password,
    //     phone: contact
    //   }
    //   setUsers([...users, newUser])
    // }
    // else {
    //   const newUser = {
    //     id: uuid(),
    //     email: contact,
    //     username: username,
    //     firstname: firstname,
    //     lastname: lastname,
    //     password: password,
    //     phone: ""
    //   }
    //   setUsers([...users, newUser])
    // }
    // props.history.push("/")

  // Method for signing out

  const handleSignOut = () => {
    setCurrentUser({})
    props.history.push("/")
  }

  const contextValue = {
    users: users,
    loginError: loginError,
    signUpError: signUpError,
    currentUser: currentUser,
    handleLogin: handleLogin,
    handleSignUp: handleSignUp,
    handleSignOut: handleSignOut
  }

  return (
    <Context.Provider value={contextValue}>
      <AppDiv>
        {renderRoutes()}
      </AppDiv>
    </Context.Provider>
  )
}

export default withRouter(App)
