import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserType } from './api/auth';


const Login = React.lazy(() => import('./pages/Login'));
const Registry = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
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

          <Route path="/registry">
            <Registry />
          </Route>

          <PrivateRoute path="/dashboard" accessLevel="USER">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default Routes;