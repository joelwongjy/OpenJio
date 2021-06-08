import React, { useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
} from '@ionic/react';
import { fastFood } from 'ionicons/icons';

import { useAuth } from 'contexts/AuthContext';

import './Login.css';

const Login: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showLoading, setShowLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const clearError = () => {
    setIsError(false);
    setErrorMessage('');
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await login({ username, password });
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className="form ion-padding-horizontal">
          <IonLoading
            isOpen={showLoading}
            message="Logging in"
            onDidDismiss={() => setShowLoading(false)}
          />
          <IonRow>
            <IonIcon icon={fastFood} className="icon" />
          </IonRow>
          <IonText className="text">Log In to Open Jio</IonText>
          {isError ? (
            <div
              style={{
                color: 'red',
                marginTop: '0.5rem',
                visibility: isError ? 'visible' : 'hidden',
                height: '1rem',
              }}
            >
              {errorMessage}
            </div>
          ) : (
            <div />
          )}
          <form onSubmit={handleLogin}>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => {
                    clearError();
                    setUsername(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>
            <IonCol className="ion-padding-bottom">
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => {
                    clearError();
                    setPassword(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonCol>

            <IonButton class="button" expand="block" type="submit">
              Log in
            </IonButton>
          </form>
          <IonRow class="ion-padding-vertical">
            <IonRouterLink href="/register">Forgot password?</IonRouterLink>
          </IonRow>
          <IonRow>
            <IonText>Don`&apos;`t have an account?</IonText>
            <IonRouterLink href="/signup">Sign up</IonRouterLink>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
