import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "routes/home";
import { HOME, ROOT, UNAUTHED_ROUTES } from "constants/routes";
import { useError } from "contexts/ErrorContext";

const redirectToRoot = (): React.ReactNode => <Redirect to={ROOT} />;
const redirectToHome = (): React.ReactNode => <Redirect to={HOME} />;

const App: React.FC = () => {
  const { pathname } = useLocation();
  const { setHasError } = useError();

  useEffect(() => {
    setHasError(false);
  }, [pathname, setHasError]);

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path={UNAUTHED_ROUTES} render={redirectToRoot} />
          <Route path={HOME} component={Home} />
          <Route path="/" render={redirectToHome} />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
