import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Link } from 'react-router-dom'
import NavLeft from './page/part/navLeft'

// const navs = [
//     {
//         name: 'daohang1',
//         lists: [{name: 'zidaohang1'}, {name: 'zidaohang2'}]
//     },
//     {
//         name: 'daohang1',
//         lists: [{name: 'zidaohang1'}, {name: 'zidaohang2'}]
//     }
// ]

export default class App extends Component {
// export default class App extends Utils {
  constructor(){
      super();
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    );
  }
}
