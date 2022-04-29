import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserType } from './api/auth';


const Login = React.lazy(() => import('./pages/Login'));
//const NotFound = React.lazy(() => import('./pages/NotFound'));
const PrivateRoute = ({ component: Component, accessLevel, ...rest }) => {

  if (isAuthenticated() && getUserType() !== accessLevel) {
    {/* 
    <NotFound />
    */}
  } else if (isAuthenticated() && getUserType() === accessLevel) {
    return (
      <Route
        {...rest}
        render={props =>
          <Component {...props} />
        }
      />
    );
  } else if (!isAuthenticated()) {
    return (
      <Redirect to="/login" />
    )
  }
}

const Routes = () => {
  return (
    <HashRouter>
      <React.Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/" exact>
            {
              isAuthenticated() ?
                <Redirect to="/dashboard" /> :
                <Login />
            }
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/dashboard" accessLevel="USER">
            {/* 
            <HortazShop />
            */}
          </PrivateRoute>
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default Routes;