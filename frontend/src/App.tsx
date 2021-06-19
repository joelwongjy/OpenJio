import React from 'react';

import Loading from 'components/loading';
import { useUser } from 'contexts/UserContext';
import { retryPromise } from 'utils/promiseUtils';

import './index.css';

// Code splitting with React.lazy and Suspense
type ModuleType = typeof import('app/AuthenticatedApp');

const loadAuthenticatedApp = (): Promise<ModuleType> => import('app/AuthenticatedApp');
const AuthenticatedApp = React.lazy(
  () => retryPromise(loadAuthenticatedApp) as Promise<ModuleType>,
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
      {/* Renders the appropriate app */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
