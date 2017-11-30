import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import App from './App'
import Saas from './page/saas'
import Login from './page/login'

import saLog from './page/saas/basic/log'
import { OpLog } from './page/saas/basic/log'
import { OpAccount } from './page/saas/basic/account'
import { OpReportStaff } from './page/saas/basic/report/staff'
class Ru extends Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/" children={   // 不能加exact否则都匹配二级的
                            ({ match, history }) => {
                                // console.log(match)
                                // console.log(history)
                                return (
                                    <Saas hy={history}>
                                        <Route exact path={`${match.url}sa-log1`} component={saLog}/>
                                        <Route exact path={`${match.url}sa-log`} component={OpLog}/>
                                        <Route exact path={`${match.url}sa-account`} component={OpAccount}/>
                                        <Route exact path={`${match.url}form-staff`} component={OpReportStaff}/>
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
