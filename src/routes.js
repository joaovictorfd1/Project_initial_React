import React, { useEffect, useState } from 'react';
import { HashRouter, Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { isAuthenticated, getUserType } from './api/auth';
import notFoundImage from './not_found.png';
import styled from "styled-components";


const Login = React.lazy(() => import('./pages/Login'));
const Registry = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const PrivateRoute = ({ component: Component, accessLevel, ...rest }) => {
  if (isAuthenticated() && getUserType() === accessLevel) {
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


const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 50vw;
`;

const SpanText = styled.span`
  font-size: 20px;
  font-weigth: bold;
`

const NoMatchPage = () => {
  return (
    <Title>
      <Image src={notFoundImage} />
      <SpanText>Página não encontrada</SpanText>
    </Title>
  )
}

const Routes = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
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
            {
              isAuthenticated() ?
                <Redirect to="/dashboard" /> :
                <Login />
            }
          </Route>

          <Route path="/registry">
            {
              isAuthenticated() ?
                <Redirect to="/dashboard" /> :
                <Registry />
            }
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