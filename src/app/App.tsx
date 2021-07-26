import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from 'components/loading';
import { JIO, JIOS, SIGNUP } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import Jio from 'routes/jios';
import Signup from 'routes/signup';
import { retryPromise } from 'utils/promiseUtils';

import '../index.css';

// Code splitting with React.lazy and Suspense
type ModuleType = typeof import('app/AuthenticatedApp');

const loadAuthenticatedApp = (): Promise<ModuleType> =>
  import('app/AuthenticatedApp');
const AuthenticatedApp = React.lazy(
  () => retryPromise(loadAuthenticatedApp) as Promise<ModuleType>
);
const UnauthenticatedApp = React.lazy(() => import('app/UnauthenticatedApp'));

const App: React.FunctionComponent = () => {
  // user will be undefined when not logged in or when jwt expires
  const { user } = useUser();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route path={SIGNUP}>
            <Signup />
          </Route>
          <Route exact path={`${JIOS}${JIO}/:id`} component={Jio} />
          {/* Renders the appropriate app */}
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </Switch>
      </Router>
    </React.Suspense>
  );
};

export default App;
