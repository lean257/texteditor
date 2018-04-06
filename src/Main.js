import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Welcome from './Welcome'
import App from './App'

export default class Main extends Component {
  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/rooms/:roomName" component={App} />
        </Switch>
      </Router>
      </div>
    )
  }
}
