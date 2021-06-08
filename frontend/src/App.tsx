import React from 'react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import Loading from 'components/loading';
import { useUser } from 'contexts/UserContext';
import { retryPromise } from 'utils/promiseUtils';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* TailwindCSS */
import './theme/tailwind.css';
/* Theme variables */
import './theme/variables.css';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

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
