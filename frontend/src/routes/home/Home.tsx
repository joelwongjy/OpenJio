import React from 'react';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from '@ionic/react';
import { add } from 'ionicons/icons';

import { CREATE } from 'constants/routes';
import { useUser } from 'contexts/UserContext';

import './Home.css';

import ExploreContainer from '../../components/ExploreContainer';
import Header from '../../components/header';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <ExploreContainer name={`Welcome, ${user ? user.name : ''}!`} />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={`${CREATE}`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
