// import App from './App';
// import Index from './page/index';
//
// export default {
//     path: '/',
//     component: App,
//     childRoutes: [
//         {path: 'a', component: Index}
//     ]
// }

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App'
import index from './page/index'
import Login from './page/login'

// export {
//     App,
//     index
// }

class Ru extends Component {
    render() {
        return (
            <Router>
              <div>
                  <App>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={index}/>
                  </App>
              </div>
            </Router>
        )
    }
}

// const routes = [
//   { path: '/login',
//     component: Login
//   },
//   { path: '/',
//     component: App,
//     routes: [
//       { path: '/index',
//         component: index
//       },
//       // { path: '/tacos/cart',
//       //   component: Cart
//       // }
//     ]
//   }
// ]
//
//
// class Ru extends Component {
//     render() {
//         const RouteWithSubRoutes = (route) => (
//           <Route path={route.path} render={props => (
//             // pass the sub-routes down to keep nesting
//             <route.component {...props} routes={route.routes}/>
//           )}/>
//         )
//         return (
//             <Router>
//                 <div>
//                   {routes.map((route, i) => (
//                     <RouteWithSubRoutes key={i} {...route}/>
//                   ))}
//                 </div>
//               </Router>
//         )
//     }
// }


export default Ru
