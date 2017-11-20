import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import {
    App, index
} from './router'
// ReactDOM.render(<Router routes={routes} />, document.getElementById('root'));

ReactDOM.render((
  <BrowserRouter>
      <Route path="/" component={App}>
        <Route path="index" component={index} />
      </Route>
  </BrowserRouter>
), document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
