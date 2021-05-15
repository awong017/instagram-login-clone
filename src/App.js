import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Context from './context'
import Landing from './components/landing'
import Home from './components/home'
import SignUpPage from './components/signUpPage'
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
      <Route path="/signUp" component={SignUpPage} />
      <Route path="/" component={Footer} />
    </>
  )
}

const App = (props) => {
  const [ users, setUsers ] = useState(
    [
      {
        id: 1,
        username: "awong017",
        email: "awong017@ucr.edu",
        phone: 7143081649,
        password: "password"
      }
    ]
  )

  const [ loginError, setLoginError ] = useState({usernameError: "", passwordError:""})
  
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
          username: userAccount.username,
          email: userAccount.email,
          phone: userAccount.phone,
          password: userAccount.password
        }
      )
      props.history.push("/home")
    }
  }

  const contextValue = {
    users: users,
    loginError: loginError,
    currentUser: currentUser,
    handleLogin: handleLogin
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
