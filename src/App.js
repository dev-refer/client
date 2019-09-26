import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { PrivateRoute } from './privateRoute';

import { login } from './redux/actions/auth.action.js';

import routes from './routes';
import Login from './pages/login/Login.jsx';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';

// const createBrowserHistory = require('history').createBrowserHistory;
// export const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {

  }

  render() {
    const mainLayout = (
      <React.Fragment>
        <div style={{ display: 'flex' }}>
          <Header />
          <Sidebar />
          <Content>
            {
              routes.map((val, index) => {
                return <PrivateRoute exact path={val.path} component={val.component} key={index} />
              })
            }
          </Content>
        </div>
      </React.Fragment>
    )

    return (
      <Switch>
        <Route exact path='/login' component={Login} />
        {mainLayout}
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (data) => dispatch(login('hafrizresa@gmail.com', '123')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

