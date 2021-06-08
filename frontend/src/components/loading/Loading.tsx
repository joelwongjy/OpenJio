import React from 'react';
import { IonContent, IonSpinner } from '@ionic/react';

const Loading: React.FunctionComponent = () => {
  return (
    <IonContent>
      <IonSpinner />
    </IonContent>
  );
};

export default Loading;
