import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import LoginMain from './components/loginMain'
import SignUpPage from './components/signUpPage'
import Styled from 'styled-components'

const AppDiv = Styled.div`
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
`

const renderRoutes = () => {
  return (
    <>
      <Route exact path="/" component={LoginMain}/>
      <Route path="/signUp" component={SignUpPage} />
    </>
  )
}

const App = () => {
  return (
    <AppDiv>
      {renderRoutes()}
    </AppDiv>
  )
}

export default withRouter(App)
