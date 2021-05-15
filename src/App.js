import React from 'react'
import { Route, withRouter } from 'react-router-dom'
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
  return (
    <AppDiv>
      {renderRoutes()}
    </AppDiv>
  )
}

export default withRouter(App)
