import React, {Component} from 'react';
import logo from './logo.svg';
import Header from './components/header/header'
import { Router, Route, IndexRoute,  Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import Whiskeys from './components/whiskeys/index'
import ShowWhiskey from './components/whiskeys/show'
import CreateWhiskey from './components/whiskeys/create'


class App extends Component {
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Whiskeys}/>
          <Route path="/whiskeys/:id" component={ShowWhiskey}/>
          <Route path="/create-whiskey" component={CreateWhiskey}/>
        </Switch>
      </div>
    );
  }
  
}

export default App;
