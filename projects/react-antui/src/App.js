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
import Utils from './page/utils'

// export default class App extends Component {
export default class App extends Utils {
  constructor(){
      super();
      this.navs = [];
  }

  async getNavs(){
      var req = await this.ajax('get', '/permission/homeList')
      console.log(req);
      return req ? req : [];
  }

  async componentDidMount(){
      this.navs = await this.getNavs();
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
        <NavLeft navs={this.navs}></NavLeft>
        {this.props.children}
      </div>
    );
  }
}
