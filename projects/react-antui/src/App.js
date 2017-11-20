import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// import { Router } from 'react-router';

// import Router from './router.js'

import { Router, Route } from 'react-router';
import index from './page/index.js'


class App extends Component {
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }
  render(){
    return ((<Router>
      <Route path="/a" component={index}/>
      {/* <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/> */}
    </Router>), document.getElementById('app'))
  }
}

export default App;
