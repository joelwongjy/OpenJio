import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { fastFood } from "ionicons/icons";

import { useAuth } from "contexts/AuthContext";

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <IonHeader>
      <IonToolbar>
        <IonIcon icon={fastFood} className="icon ion-padding"></IonIcon>
        <IonButtons slot="primary">
          <IonButton onClick={logout}>Logout</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
