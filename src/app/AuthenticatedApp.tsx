import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import {
  CREATE,
  ENTER_COSTS,
  HOME,
  JIOS,
  JOIN,
  ROOT,
  UNAUTHED_ROUTES,
} from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import Home from 'routes/home';
import CreateJio from 'routes/jios/create';
import EnterCosts from 'routes/jios/enterCosts';
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
    <Switch>
      <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
      <Route path={HOME} component={Home} />
      <Route exact path={`${JIOS}${CREATE}`} component={CreateJio} />
      <Route exact path={`${JIOS}${JOIN}`} component={JoinJio} />
      <Route path={`${JIOS}/:id${ENTER_COSTS}`} component={EnterCosts} />
      <Route path="/" render={redirectToHome} />
    </Switch>
  );
};

export default App;
