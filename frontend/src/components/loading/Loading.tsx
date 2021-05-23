import React from "react";
import { IonSpinner, IonContent } from "@ionic/react";

const Loading: React.FunctionComponent = () => {
  return (
    <IonContent>
      <IonSpinner />
    </IonContent>
  );
};

export default Loading;
