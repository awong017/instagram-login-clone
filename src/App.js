import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Context from './context'
import Landing from './components/landing'
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
      <Route path="/signUp" component={SignUpPage} />
      <Route path="/" component={Footer} />
    </>
  )
}

const App = () => {
  const [ users, setUsers ] = useState(
    [
      {
        id: 1,
        userName: "awong017",
        email: "awong017@ucr.edu",
        phone: 7143081649,
        password: "password"
      }
    ]
  )

  const contextValue = {
    users: users
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
