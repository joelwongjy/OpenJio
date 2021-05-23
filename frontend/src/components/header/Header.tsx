import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>OpenJio</IonTitle>
        <IonButtons slot="secondary">
          <IonButton onClick={logout}>Logout</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
