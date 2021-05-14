import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Styled from 'styled-components'

const AppDiv = Styled.div``

const App = () => {
  return (
    <AppDiv>
      <h1>App Component</h1>
    </AppDiv>
  )
}

export default withRouter(App)
