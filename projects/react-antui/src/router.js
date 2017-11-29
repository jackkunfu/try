import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import App from './App'
import Saas from './page/saas'
import Login from './page/login'

import saLog from './page/saas/log'
import { OpLog } from './page/saas/log'
class Ru extends Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/" children={
                            ({ match, history }) => {
                                // console.log(match)
                                // console.log(history)
                                return (
                                    <Saas hy={history}>
                                        <Route exact path={`${match.url}sa-log1`} component={saLog}/>
                                        <Route exact path={`${match.url}sa-log`} component={OpLog}/>
                                    </Saas>
                                )
                            }
                        } />
                    </Switch>
                </App>
            </BrowserRouter>
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
