import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import './sass/base.sass'

export default class App extends Component {
  // constructor(props){
  //   super(props)
  // }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}
