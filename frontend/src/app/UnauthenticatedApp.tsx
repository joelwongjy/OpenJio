import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { LOGIN, ROOT, SIGNUP } from 'constants/routes';
import Login from 'routes/login';
import Signup from 'routes/signup';

const redirectToLogin = (): React.ReactNode => <Redirect to={LOGIN} />;

const UnauthenticatedApp: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN}>
          <Login />
        </Route>
        <Route path={SIGNUP}>
          <Signup />
        </Route>
        <Route path={ROOT} render={redirectToLogin} />
      </Switch>
    </Router>
  );
};

export default UnauthenticatedApp;
