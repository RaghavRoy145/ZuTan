import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import View from './pages/View'
import Add from './pages/Add'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={View} />
          <Route exact path='/add' component={Add} />
        </Switch>
      </Fragment>
    </Router>
  )
}

export default App
