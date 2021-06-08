import React from 'react';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from '@ionic/react';
import { fastFood } from 'ionicons/icons';

import { useAuth } from 'contexts/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <IonHeader>
      <IonToolbar>
        <IonIcon icon={fastFood} className="icon ion-padding" />
        <IonButtons slot="primary">
          <IonButton onClick={logout}>Logout</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
