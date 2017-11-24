import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

export default class App extends Component {
// export default class App extends Utils {

  render() {
    return (
      <div>
        {/* <h1>App</h1> */}
        {this.props.children}
      </div>
    );
  }

}
