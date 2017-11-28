import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './App'
import Saas from './page/saas'
import Login from './page/login'

import saLog from './page/saas/log'
class Ru extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Route exact path="/login" component={Login} />
                    {/* <Route exact path="/" component={Index}/> */}
                    {/* <Route exact path="/sa-log" component={saLog}/> */}
                    <Route path="/" children={
                        ({ match, history }) => {
                            // console.log(match)
                            // console.log(history)
                            return (
                                <Saas hy={history}>
                                    {/* <Route exact path={`${match.url}`} component={Saas}/> */}
                                    <Route exact path="/" component={Saas}/>
                                    <Route path={`${match.url}sa-log`} component={saLog}/>
                                </Saas>
                            )
                        }
                    }/>
                </App>
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
