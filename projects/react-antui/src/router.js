// import Router from "react-router/Route";

import { Router, Route, hashHistory } from 'react-router';
import index from './page/index.js'

export default (<Router history={hashHistory}>
    <Route path="/" component={index}/>
    {/* <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/> */}
  </Router>)