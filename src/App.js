import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Context from './context'
import Landing from './components/landing'
import Home from './components/home'
import SignUp from './components/signUp'
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
      <Route path="/signUp" component={SignUp} />
      <Route path="/" component={Footer} />
    </>
  )
}

const App = (props) => {
  const [ users, setUsers ] = useState(
    [
      {
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

  const [ signUpError, setSignUpError ] = useState({usernameError: "", passwordError:""})
  
  const [ currentUser, setCurrentUser ] = useState()

  // Method for logging in

  const handleLogin = (e, name, password) => {
    e.preventDefault()

    if (
      users.some(user => user.username === name) === false &&
      users.some(user => user.email === name) === false &&
      users.some(user => user.password === name) === false
    ) {
      setLoginError(
        {
          usernameError: "The username you entered doesn't belong to an account. Please check your username and try again.",
          passwordError: ""
        }
      )
    }
    else if (!password) {
      setLoginError(
        {
          usernameError: "",
          passwordError: "Sorry, your password was incorrect. Please double-check your password."
        }
      )
    }
    else {
      let userAccount = users.find(user => user.username === name)
      setLoginError({usernameError: "", passwordError: ""})
      setCurrentUser(
        {
          email: userAccount.email,
          username: userAccount.username,
          firstname: userAccount.firstname,
          lastname: userAccount.lastname,
          password: userAccount.password,
          phone: userAccount.phone,
        }
      )
      props.history.push("/home")
    }
  }

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
