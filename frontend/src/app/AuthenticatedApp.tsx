import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import { HOME, ROOT, UNAUTHED_ROUTES } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import Home from 'routes/home';

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToHome = (): React.ReactNode => <Redirect to={HOME} />;

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { setHasError } = useError();

  useEffect(() => {
    setHasError(false);
  }, [pathname, setHasError]);

  return (
    <Router>
      <Switch>
        <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
        <Route path={HOME} component={Home} />
        <Route path="/" render={redirectToHome} />
      </Switch>
    </Router>
  );
};

export default App;
