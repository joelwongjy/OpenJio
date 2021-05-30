import React from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { add } from "ionicons/icons";

import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/header";
import "./Home.css";
import { useUser } from "contexts/UserContext";

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header></Header>
        <ExploreContainer name={`Welcome, ${user ? user.name : ""}!`} />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
