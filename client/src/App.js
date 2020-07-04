import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from './container/Home/Home';
import Auth from './container/Auth/Auth';
import NewAccount from './components/Auth/SignInWithDifferentAccount';
import Users from './components/SearchUsers/UserProfile';
import UserList from './components/Github/GetUsersList/GetUsersList';
import GetSearchedUser from './components/Github/GetSearchedUser/GetSearchedUser';
import CreateRepo from './components/Github/CreateRepository/CreateRepository';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    login: false
  }

  componentDidMount() {
    this.init();
  }

  init(){
    const electron = window.require("electron");
    const ipcRenderer  = electron.ipcRenderer;
    ipcRenderer.on('github-oauth-reply', (event, { access_token }) => {
      console.log('hi', access_token);
      this.setState({ login: true });
    });
  }

  render() {
      let routes;

        routes = (
          <BrowserRouter>
            <Switch>
              <Route path='/newAcc' component={NewAccount} />
              <Route path='/createRepo' component={CreateRepo} />
              <Route path='/getUser' component={GetSearchedUser} />
              <Route path='/usersList' component={UserList} />
              <Route path='/users' component={Users} />
              <Route path='/home' component={Home} />
              <Route path='/' exact component={Auth} />
              <Redirect to='/' />
            </Switch>
          </BrowserRouter>
        );

    return (
      <div className="App">
          {routes}
      </div>
    );
  }
}

export default App;
