import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DashboardPage from './components/pages/DashboardPage/DashboardPage'
import './App.module.css'
import { withContext } from './context/with-context'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={DashboardPage} />
    </Switch>
  </Router>
)

export default withContext(App)
