import React, { Component } from 'react';
import Login from './pages/login/Login.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './privateRoute';

// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' component={Login} exact />
            <PrivateRoute
            path='/dashboard'
            component={Dashboard}
            />
            <Route component={() => <h1>404 not found</h1>} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
