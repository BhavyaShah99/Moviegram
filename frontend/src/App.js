/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from './Components/Login';
import SignupScreen from './Components/Signup';
import NewsFeedScreen from './Components/NewsFeed'
import NewsFeedGeneric from './Components/NewsFeedGeneric'
import AddReview from './Components/AddReview'
import UserProfile from './Components/UserProfile'
import Movie from './Components/Movie'
import Admin from './Components/Admin'
import ProfileView from './Components/ProfileView'
import Genre from './Components/Genre'


import { readCookie } from './services/api.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this) // sees if a user is logged in.
  }
  state = {
    currentUser: null
  }

  render() {
    return (
        <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={(props) =>
                            (<Home {...props} />)}/>
            <Route exact path='/login' render={(props) =>
                            (<LoginScreen {...props} app={this} />)}/>
            <Route exact path='/signup' render={(props) =>
                            (<SignupScreen app={this} {...props} />)}/>
            <Route exact path='/NewsFeed' render={(props) =>
                            (<NewsFeedScreen app={this} {...props} />)}/>
            <Route exact path='/NewsFeedGeneric' render={(props) =>
                            (<NewsFeedGeneric app={this} {...props} />)}/>
            <Route exact path='/AddReview' render={(props) =>
                            (<AddReview app={this} {...props} />)}/>
            <Route exact path='/userProfile/' render={(props) =>
                            (<UserProfile app={this} {...props} />)}/>
            <Route exact path='/ProfileView/:id' render={(props) =>
                            (<ProfileView app={this} {...props} />)}/>
            <Route exact path='/admin' render={(props) =>
                            (<Admin app={this} {...props} />)}/>
            <Route path="/movie/:param1" app={this} component={Movie}></Route>
            <Route path="/genre/:genre" app={this} component={Genre}></Route>
            <Route render={() => <div>404 Not found</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
