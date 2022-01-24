import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Join from '../components/Join';
import Favorite from '../components/Favorite';
import Login from '../components/Login';
import Main from '../components/Main';
import Movies from '../components/Movies';
import NewContent from '../components/NewContent';
import SearchMovie from '../components/SearchMovie';

class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/login" component={Login} />
              <Route path="/join" component={Join} />
              <Route path="/movie" component={Movies} />
              <Route path="/searchMovie" component={SearchMovie} />
              <Route path="/myContent" component={Favorite} />
              <Route path="/newContent" component={NewContent} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Router;
