import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import {
  CREATE,
  HOME,
  JIOS,
  JOIN,
  ROOT,
  UNAUTHED_ROUTES,
} from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import Home from 'routes/home';
import Jio from 'routes/jios';
import CreateJio from 'routes/jios/create';
import JoinJio from 'routes/jios/join';

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
        <Route exact path={`${JIOS}${CREATE}`} component={CreateJio} />
        <Route exact path={`${JIOS}${JOIN}`} component={JoinJio} />
        <Route path={`${JIOS}/:id`} component={Jio} />
        <Route path="/" render={redirectToHome} />
      </Switch>
    </Router>
  );
};

export default App;
