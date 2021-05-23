import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/header";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header></Header>
        <ExploreContainer name="Logged In" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
