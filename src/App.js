import React, { Component } from 'react';
import { Login } from './components/login';
import { SignUp } from './components/signup';
import { AddHobby } from './components/addhobby';
import { Dashboard } from './components/dashboard';
import { Delete } from './components/delete';
import { Edit } from './components/edithobby';
import { Logout } from './components/logout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-136786925-1');
ReactGA.pageview(window.location.pathname + window.location.search);


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Login}></Route>
          <Route path={'/register'} component={SignUp}></Route>
          <Route path={'/addhobby'} component={AddHobby}></Route>
          <Route path={'/dashboard'} component={Dashboard}></Route>
          <Route path={'/delete/:id'} component={Delete}></Route>
          <Route path={'/edit/:id'} component={Edit}></Route>
          <Route path={'/update'} component={Dashboard}></Route>
          <Route path={'/delete'} component={Dashboard}></Route>
          <Route path={'/edit'} component={Dashboard}></Route>
          <Route path={'/logout'} component={Logout}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
