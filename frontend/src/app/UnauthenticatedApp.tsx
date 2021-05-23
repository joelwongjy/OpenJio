import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import { LOGIN, ROOT } from "constants/routes";
import Login from "routes/login";

const redirectToLogin = (): React.ReactNode => <Redirect to={LOGIN} />;

const UnauthenticatedApp: React.FunctionComponent = () => {
  return (
    <IonReactRouter>
      <Switch>
        <Route path={LOGIN}>
          <Login />
        </Route>
        <Route path={ROOT} render={redirectToLogin} />
      </Switch>
    </IonReactRouter>
  );
};

export default UnauthenticatedApp;
